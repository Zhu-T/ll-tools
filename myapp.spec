# myapp.spec — PyInstaller config
# Run with: pyinstaller myapp.spec

block_cipher = None

a = Analysis(
    ["main.py"],
    pathex=["."],
    binaries=[],
    datas=[
        ("backend/static", "backend/static"),  # Compiled React app
    ],
    hiddenimports=[
        "flask",
        "flask_cors",
        "sqlite3",
    ],
    hookspath=[],
    runtime_hooks=[],
    excludes=[],
    cipher=block_cipher,
)

pyz = PYZ(a.pure, a.zipped_data, cipher=block_cipher)

exe = EXE(
    pyz,
    a.scripts,
    a.binaries,
    a.datas,
    [],
    name="myapp",
    debug=False,
    bootloader_ignore_signals=False,
    strip=False,
    upx=True,
    console=False,   # Set True to show terminal window (useful for debugging)
    icon=None,       # Replace with "icon.ico" to add a custom app icon
)
