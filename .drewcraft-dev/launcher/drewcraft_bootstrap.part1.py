#!/usr/bin/env python3
"""DrewCraft friend-facing bootstrap/update/repair launcher.

Prism remains the Minecraft authentication/launch engine. This bootstrapper owns
only DrewCraft's managed application directory and release convergence.
"""
from __future__ import annotations

import argparse
import hashlib
import json
import os
import pathlib
import platform
import re
import shutil
import subprocess
import sys
import tarfile
import tempfile
import urllib.request
import zipfile

APP_VERSION = "0.1.0"
PRESERVED_USER_PATHS = ("screenshots", "resourcepacks", "shaderpacks", "saves", "options.txt")


def sha256_bytes(data: bytes) -> str:
    return hashlib.sha256(data).hexdigest()


def sha256_file(path: pathlib.Path) -> str:
    h = hashlib.sha256()
    with path.open("rb") as fh:
        for chunk in iter(lambda: fh.read(1024 * 1024), b""):
            h.update(chunk)
    return h.hexdigest()


def fetch_bytes(url: str) -> bytes:
    req = urllib.request.Request(url, headers={"User-Agent": f"DrewCraft-Launcher/{APP_VERSION}"})
    with urllib.request.urlopen(req, timeout=120) as response:
        return response.read()


def fetch_json(url: str) -> dict:
    return json.loads(fetch_bytes(url).decode("utf-8"))


def platform_key() -> str:
    system = platform.system().lower()
    machine = platform.machine().lower()
    if system == "windows" and machine in ("amd64", "x86_64"):
        return "windows-x86_64"
    if system == "darwin" and machine in ("arm64", "aarch64"):
        return "macos-arm64"
    raise RuntimeError(f"Unsupported DrewCraft launcher platform: {system}/{machine}")


def default_app_dir() -> pathlib.Path:
    if platform.system() == "Windows":
        return pathlib.Path(os.environ.get("LOCALAPPDATA", pathlib.Path.home())) / "DrewCraft"
    if platform.system() == "Darwin":
        return pathlib.Path.home() / "Library" / "Application Support" / "DrewCraft"
    return pathlib.Path.home() / ".local" / "share" / "DrewCraft"


def _safe_rel(value: str) -> pathlib.PurePosixPath:
    p = pathlib.PurePosixPath(value)
    if p.is_absolute() or ".." in p.parts or "." in p.parts or not p.parts:
        raise RuntimeError(f"unsafe managed path: {value}")
    return p


def _version_tuple(value: str) -> tuple[int, ...]:
    numbers = [int(x) for x in re.findall(r"\d+", value)]
    if not numbers:
        raise RuntimeError(f"invalid version string: {value!r}")
    return tuple(numbers)


def validate_manifest(manifest: dict) -> None:
    if manifest.get("schemaVersion") != 1:
        raise RuntimeError("Unsupported DrewCraft release manifest")
    if manifest.get("java", {}).get("major") != 21:
        raise RuntimeError("DrewCraft release does not declare Java 21")
    if not manifest.get("packVersion") or not isinstance(manifest.get("files"), list):
        raise RuntimeError("Malformed DrewCraft release manifest")
    loader = manifest.get("loader", {})
    if loader.get("id") != "neoforge" or not loader.get("version"):
        raise RuntimeError("DrewCraft V1 requires an exact NeoForge loader version")
    if not manifest.get("minecraftVersion"):
        raise RuntimeError("DrewCraft release is missing minecraftVersion")
    minimum = manifest.get("minimumLauncherVersion", "0")
    if _version_tuple(APP_VERSION) < _version_tuple(minimum):
        raise RuntimeError(
            f"This DrewCraft launcher is too old ({APP_VERSION}); release requires {minimum} or newer"
        )
    for entry in manifest["files"]:
        _safe_rel(entry["path"])
        if entry["side"] not in ("common", "client", "server"):
            raise RuntimeError("Malformed release side")


def atomic_json(path: pathlib.Path, value: dict) -> None:
    path.parent.mkdir(parents=True, exist_ok=True)
    fd, tmp = tempfile.mkstemp(prefix=path.name + ".", dir=path.parent)
    try:
        with os.fdopen(fd, "w", encoding="utf-8") as fh:
            json.dump(value, fh, sort_keys=True, separators=(",", ":"))
            fh.write("\n")
        os.replace(tmp, path)
    finally:
        if os.path.exists(tmp):
            os.unlink(tmp)


def verify_entry(path: pathlib.Path, entry: dict) -> bool:
    return path.is_file() and path.stat().st_size == entry["size"] and sha256_file(path) == entry["sha256"]


def selected_files(manifest: dict) -> list[dict]:
    return [e for e in manifest["files"] if e["side"] in ("common", "client")]


def download_verified(url: str, expected_sha: str, destination: pathlib.Path, expected_size: int | None = None) -> None:
    destination.parent.mkdir(parents=True, exist_ok=True)
    payload = fetch_bytes(url)
    if expected_size is not None and len(payload) != expected_size:
        raise RuntimeError(f"download size mismatch for {url}")
    got = sha256_bytes(payload)
    if got != expected_sha:
        raise RuntimeError(f"download hash mismatch for {url}: expected {expected_sha} got {got}")
    destination.write_bytes(payload)


def _reuse_existing(entry: dict, app_dir: pathlib.Path, destination: pathlib.Path) -> bool:
    rel = pathlib.Path(*_safe_rel(entry["path"]).parts)
    releases = app_dir / "releases"
    if not releases.exists():
        return False
    for candidate in sorted(releases.glob("*/instance"), reverse=True):
        source = candidate / rel
        if verify_entry(source, entry):
            destination.parent.mkdir(parents=True, exist_ok=True)
            shutil.copy2(source, destination)
            return True
    return False


def install_pack(manifest: dict, app_dir: pathlib.Path) -> pathlib.Path:
    validate_manifest(manifest)
    version = manifest["packVersion"]
    release = app_dir / "releases" / version / "instance"
    stage = app_dir / "staging" / f"{version}.partial"
    if stage.exists():
        shutil.rmtree(stage)
    stage.mkdir(parents=True, exist_ok=True)

    for entry in selected_files(manifest):
        target = stage / pathlib.Path(*_safe_rel(entry["path"]).parts)
        if not _reuse_existing(entry, app_dir, target):
            download_verified(entry["url"], entry["sha256"], target, entry["size"])

    for entry in selected_files(manifest):
        target = stage / pathlib.Path(*_safe_rel(entry["path"]).parts)
        if not verify_entry(target, entry):
            raise RuntimeError(f"staged pack verification failed: {entry['path']}")

    if release.parent.exists():
        shutil.rmtree(release.parent)
    release.parent.mkdir(parents=True, exist_ok=True)
    os.replace(stage, release)
    return release


def _extract_archive(archive: pathlib.Path, destination: pathlib.Path, kind: str) -> None:
    if destination.exists():
        shutil.rmtree(destination)
    destination.mkdir(parents=True)
