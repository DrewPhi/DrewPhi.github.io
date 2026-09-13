    live = fetch_json(live_url)
    payload = fetch_bytes(live["manifestUrl"])
    if sha256_bytes(payload) != live["manifestSha256"]:
        return ["manifest hash mismatch"]
    manifest = json.loads(payload.decode("utf-8"))
    validate_manifest(manifest)

    release_root = app_dir / "releases" / manifest["packVersion"] / "instance"
    prism_instance = pathlib.Path(state["prismRoot"]) / "instances" / state["instanceId"]
    prism_minecraft = prism_instance / "minecraft"
    failures: set[str] = set()
    for entry in selected_files(manifest):
        rel = pathlib.Path(*_safe_rel(entry["path"]).parts)
        if not verify_entry(release_root / rel, entry) or not verify_entry(prism_minecraft / rel, entry):
            failures.add(entry["path"])
    if not (prism_instance / "mmc-pack.json").is_file():
        failures.add("prism:mmc-pack.json")
    if not (prism_instance / "instance.cfg").is_file():
        failures.add("prism:instance.cfg")
    return sorted(failures)


def server_ready(state: dict) -> tuple[bool, str]:
    health_url = state.get("server", {}).get("healthUrl")
    if not health_url:
        return True, "no health URL configured"
    try:
        health = fetch_json(health_url)
    except Exception as exc:
        return False, f"server offline/unreachable: {exc}"
    if health.get("status") != "ready":
        return False, f"server status is {health.get('status', 'unknown')}"
    if health.get("protocolVersion") != state["protocolVersion"]:
        return False, "server/client protocol mismatch"
    if health.get("packVersion") != state["packVersion"]:
        return False, "server/client pack mismatch"
    return True, "ready"


def launch(app_dir: pathlib.Path) -> int:
    state = json.loads((app_dir / "state.json").read_text("utf-8"))
    ok, message = server_ready(state)
    if not ok:
        raise RuntimeError(message)
    prism = state.get("prismExecutable")
    if not prism:
        raise RuntimeError("managed Prism runtime is not configured")
    cmd = [prism, "--dir", state["prismRoot"], "--launch", state["instanceId"]]
    address = state.get("server", {}).get("address")
    if address:
        cmd += ["--server", address]
    return subprocess.call(cmd)


def main() -> int:
    parser = argparse.ArgumentParser(prog="DrewCraft")
    parser.add_argument("--app-dir", default=str(default_app_dir()))
    parser.add_argument("--live-url")
    sub = parser.add_subparsers(dest="command", required=True)
    sub.add_parser("install")
    sub.add_parser("update")
    sub.add_parser("repair")
    sub.add_parser("verify")
    sub.add_parser("launch")
    sub.add_parser("status")
    args = parser.parse_args()
    app_dir = pathlib.Path(args.app_dir)

    if args.command in ("install", "update", "repair"):
        live_url = args.live_url
        if not live_url and (app_dir / "state.json").exists():
            live_url = json.loads((app_dir / "state.json").read_text("utf-8")).get("liveUrl")
        if not live_url:
            raise RuntimeError("--live-url is required for first install")
        state = converge(live_url, app_dir)
        print(json.dumps({"ok": True, "packVersion": state["packVersion"]}))
        return 0
    if args.command == "verify":
        failures = verify_local(app_dir, args.live_url)
        print(json.dumps({"ok": not failures, "failures": failures}))
        return 0 if not failures else 2
    if args.command == "launch":
        return launch(app_dir)
    if args.command == "status":
        state = json.loads((app_dir / "state.json").read_text("utf-8"))
        ok, message = server_ready(state)
        print(json.dumps({"ok": ok, "message": message, **state}, sort_keys=True))
        return 0 if ok else 3
    return 2


if __name__ == "__main__":
    try:
        raise SystemExit(main())
    except Exception as exc:
        print(f"DrewCraft: {exc}", file=sys.stderr)
        raise SystemExit(1)
