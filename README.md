# MyApp — Flask + React (TypeScript) + SQLite

A locally-running web app bundled as a single `.exe`.

## Stack

| Layer    | Technology                          |
|----------|-------------------------------------|
| Frontend | React 18 + TypeScript 5 + Vite      |
| Backend  | Python + Flask                      |
| Database | SQLite (single `.db` file on disk)  |
| Bundler  | PyInstaller                         |

---

## Project Structure

```
myapp/
├── backend/
│   ├── app.py              # Flask API + SQLite logic
│   ├── requirements.txt    # Python dependencies
│   └── static/             # React build output (auto-generated, do not edit)
├── frontend/
│   ├── src/
│   │   ├── api/
│   │   │   └── items.ts    # Typed API service layer
│   │   ├── types/
│   │   │   └── index.ts    # Shared TypeScript types
│   │   ├── App.tsx         # Main React component
│   │   ├── App.css         # Styles
│   │   └── main.tsx        # React entry point
│   ├── index.html
│   ├── package.json
│   ├── tsconfig.json
│   ├── tsconfig.app.json
│   ├── tsconfig.node.json
│   └── vite.config.ts
├── main.py                 # .exe entry point
├── myapp.spec              # PyInstaller config
├── build.py                # One-command build script
└── README.md
```

---

## Prerequisites

- Python 3.11+
- Node.js 18+
- pip

---

## Development (hot reload)

**Terminal 1 — Backend:**
```bash
pip install -r backend/requirements.txt
python backend/app.py
# Flask on http://localhost:5000
```

**Terminal 2 — Frontend:**
```bash
cd frontend
npm install
npm run dev
# Vite on http://localhost:5173 (proxies /api → Flask)
```

Open http://localhost:5173. Changes to `.tsx` files hot-reload instantly.

Run the TypeScript compiler without building:
```bash
cd frontend && npm run typecheck
```

---

## Build the .exe

```bash
pip install -r backend/requirements.txt
python build.py
```

Output: `dist/myapp.exe`

- Fully self-contained — no Python or Node needed on the target machine
- `database.db` is created next to the `.exe` on first run
- Ship app updates by replacing the `.exe` — user data in `database.db` is untouched

---

## Extending the App

### Add a new API route
1. Add a route in `backend/app.py`
2. Add the type + fetch call in `frontend/src/api/items.ts`
3. Add the matching TypeScript type in `frontend/src/types/index.ts`

### Add a database table
Add a `CREATE TABLE IF NOT EXISTS` block in `init_db()` inside `backend/app.py`.

### Add a custom app icon
Replace `icon=None` in `myapp.spec` with `icon="icon.ico"` and place `icon.ico` in the project root.
