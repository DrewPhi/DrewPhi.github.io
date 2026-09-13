    if kind == "zip":
        with zipfile.ZipFile(archive) as zf:
            target = destination.resolve()
            for info in zf.infolist():
                resolved = (destination / info.filename).resolve()
                if target not in resolved.parents and resolved != target:
                    raise RuntimeError("unsafe runtime ZIP path")
            zf.extractall(destination)
    elif kind in ("tar.gz", "tgz"):
        with tarfile.open(archive, "r:gz") as tf:
            target = destination.resolve()
            for member in tf.getmembers():
                resolved = (destination / member.name).resolve()
                if target not in resolved.parents and resolved != target:
                    raise RuntimeError("unsafe runtime archive path")
            tf.extractall(destination)
    else:
        raise RuntimeError(f"unsupported runtime archive: {kind}")


def _find_runtime_executable(root: pathlib.Path, spec: dict) -> pathlib.Path:
    exact = spec.get("executable")
    if exact:
        candidate = root / pathlib.Path(*_safe_rel(exact).parts)
        if candidate.is_file():
            return candidate
    basename = spec.get("executableBasename")
    if not basename or pathlib.PurePath(basename).name != basename:
        raise RuntimeError("runtime spec requires executable or a safe executableBasename")
    matches = sorted(p for p in root.rglob(basename) if p.is_file())
    if len(matches) != 1:
        raise RuntimeError(f"runtime executable {basename!r} resolved to {len(matches)} files under {root}")
    return matches[0]


def ensure_runtime_component(app_dir: pathlib.Path, name: str, spec: dict) -> pathlib.Path:
    version = str(spec["version"])
    root = app_dir / "runtime" / name / version
    marker = root / ".drewcraft-runtime.json"
    if marker.is_file():
        executable = _find_runtime_executable(root, spec)
        return executable
    downloads = app_dir / "downloads"
    downloads.mkdir(parents=True, exist_ok=True)
    archive = downloads / f"{name}-{version}.{spec['archive'].replace('.', '-')}"
    if not archive.is_file() or sha256_file(archive) != spec["sha256"]:
        download_verified(spec["url"], spec["sha256"], archive, spec.get("size"))
    _extract_archive(archive, root, spec["archive"])
    executable = _find_runtime_executable(root, spec)
    if platform.system() != "Windows":
        executable.chmod(executable.stat().st_mode | 0o111)
    atomic_json(marker, {
        "name": name,
        "version": version,
        "archiveSha256": spec["sha256"],
        "executable": str(executable.relative_to(root)),
    })
    return executable


def ensure_runtime(manifest: dict, app_dir: pathlib.Path) -> dict:
    runtime = manifest.get("runtime", {})
    if not runtime:
        return {}
    platform_spec = runtime.get(platform_key())
    if not platform_spec:
        raise RuntimeError(f"release has no runtime bundle for {platform_key()}")
    java = ensure_runtime_component(app_dir, "java", platform_spec["java"])
    prism = ensure_runtime_component(app_dir, "prism", platform_spec["prism"])
    return {"java": str(java), "prism": str(prism)}


def _copy_preserved_user_data(previous_minecraft: pathlib.Path | None, target_minecraft: pathlib.Path) -> None:
    if previous_minecraft is None or not previous_minecraft.is_dir():
        return
    for rel in PRESERVED_USER_PATHS:
        source = previous_minecraft / rel
        target = target_minecraft / rel
        if not source.exists() or target.exists():
            continue
        if source.is_dir():
            shutil.copytree(source, target)
        elif source.is_file():
            target.parent.mkdir(parents=True, exist_ok=True)
            shutil.copy2(source, target)


def configure_prism_instance(instance_root: pathlib.Path, java_path: str | None, manifest: dict) -> str:
    instance_root.mkdir(parents=True, exist_ok=True)
    instance_id = instance_root.name
    cfg = instance_root / "instance.cfg"
    lines = [
        "InstanceType=OneSix",
        f"name=DrewCraft {manifest['packVersion']}",
        "MCLaunchMethod=LauncherPart",
    ]
    if java_path:
        lines.extend(["OverrideJavaLocation=true", f"JavaPath={java_path}"])
    cfg.write_text("\n".join(lines) + "\n", encoding="utf-8")

    mmc_pack = {
        "formatVersion": 1,
        "components": [
            {"uid": "net.minecraft", "version": manifest["minecraftVersion"], "important": True},
            {"uid": "net.neoforged", "version": manifest["loader"]["version"]},
        ],
    }
    atomic_json(instance_root / "mmc-pack.json", mmc_pack)
    return instance_id


def _previous_instance_minecraft(app_dir: pathlib.Path) -> pathlib.Path | None:
    state_path = app_dir / "state.json"
    if not state_path.is_file():
        return None
    try:
        state = json.loads(state_path.read_text("utf-8"))
        instance_id = state.get("instanceId")
        prism_root = state.get("prismRoot")
        if not instance_id or not prism_root:
            return None
        return pathlib.Path(prism_root) / "instances" / instance_id / "minecraft"
    except Exception:
        return None


def converge(live_url: str, app_dir: pathlib.Path) -> dict:
    app_dir.mkdir(parents=True, exist_ok=True)
    live = fetch_json(live_url)
    manifest_payload = fetch_bytes(live["manifestUrl"])
    got = sha256_bytes(manifest_payload)
    if got != live["manifestSha256"]:
        raise RuntimeError(f"release manifest hash mismatch expected={live['manifestSha256']} got={got}")
    manifest = json.loads(manifest_payload.decode("utf-8"))
    validate_manifest(manifest)
    if manifest["packVersion"] != live["packVersion"]:
        raise RuntimeError("stable pointer and manifest pack versions disagree")

    previous_minecraft = _previous_instance_minecraft(app_dir)
    release_instance = install_pack(manifest, app_dir)
    runtime = ensure_runtime(manifest, app_dir)
    prism_root = app_dir / "prism-data"
    instances_root = prism_root / "instances"
    instances_root.mkdir(parents=True, exist_ok=True)
    instance_id = f"DrewCraft-{manifest['packVersion']}"
    managed_instance = instances_root / instance_id
    stage_instance = instances_root / f".{instance_id}.partial"
    if stage_instance.exists():
        shutil.rmtree(stage_instance)
    shutil.copytree(release_instance, stage_instance / "minecraft")
    _copy_preserved_user_data(previous_minecraft, stage_instance / "minecraft")
    configure_prism_instance(stage_instance, runtime.get("java"), manifest)

    if managed_instance.exists():
        shutil.rmtree(managed_instance)
    os.replace(stage_instance, managed_instance)

    state = {
        "launcherVersion": APP_VERSION,
        "packVersion": manifest["packVersion"],
        "protocolVersion": manifest["protocolVersion"],
        "manifestSha256": got,
        "liveUrl": live_url,
        "prismRoot": str(prism_root),
        "instanceId": instance_id,
        "prismExecutable": runtime.get("prism"),
        "javaExecutable": runtime.get("java"),
        "server": manifest.get("server", {}),
    }
    atomic_json(app_dir / "state.json", state)
    return state


def verify_local(app_dir: pathlib.Path, live_url: str | None = None) -> list[str]:
    state_path = app_dir / "state.json"
    if not state_path.exists():
        return ["state.json missing"]
    state = json.loads(state_path.read_text("utf-8"))
    if live_url is None:
        live_url = state["liveUrl"]
