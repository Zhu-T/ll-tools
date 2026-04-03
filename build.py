#!/usr/bin/env python3
"""
build.py — One-command build script.

Steps:
  1. npm install      (install frontend deps)
  2. npm run build    (TypeScript check + Vite compile → backend/static/)
  3. pyinstaller      (bundle everything into dist/myapp.exe)
"""

import subprocess
import sys
import os

ROOT = os.path.dirname(os.path.abspath(__file__))
FRONTEND = os.path.join(ROOT, "frontend")


def run(cmd: list[str], cwd: str | None = None) -> None:
    print(f"\n▶  {' '.join(cmd)}")
    result = subprocess.run(cmd, cwd=cwd or ROOT)
    if result.returncode != 0:
        print(f"\n✖  Failed: {' '.join(cmd)}")
        sys.exit(1)


print("=" * 52)
print("  Building MyApp (Flask + React/TS + SQLite)")
print("=" * 52)

print("\n[1/3] Installing frontend dependencies...")
run(["npm", "install"], cwd=FRONTEND)

print("\n[2/3] Type-checking & building React frontend...")
run(["npm", "run", "build"], cwd=FRONTEND)

print("\n[3/3] Bundling with PyInstaller...")
run(["pyinstaller", "--clean", "myapp.spec"])

print("\n✔  Done! Executable is at: dist/myapp.exe")
print("    The database.db will be created next to the .exe on first run.\n")
