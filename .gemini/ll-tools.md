# Project Context: Landlord Tools App

## 1. Project Overview
I am building a lightweight, local web application for landlord management tasks (tracking tenants, leases, and payments). The application is bundled into a single executable (`.exe`) that runs locally on the user's machine without requiring any external dependencies or cloud databases.

## 2. Tech Stack
* **Frontend:** React, TypeScript, Vite
* **Backend:** Python, Flask
* **Database:** SQLite (embedded, local `.db` file)
* **Bundler:** PyInstaller (packages the Python backend, SQLite logic, and compiled React static files into a single `.exe`)
* **UI/UX Vibe:** Clean, minimal, featuring a sidebar navigation system.

## 3. Project Structure
```text
landlord-tools/
├── backend/
│   ├── app.py                 # Flask API, SQLite DB initialization, and static file serving
│   └── requirements.txt       # Flask==3.0.0, PyInstaller>=6.13.0
├── frontend/
│   ├── src/
│   │   ├── types.ts           # TS interfaces (Tenant, Lease, Payment)
│   │   ├── App.tsx            # Main React UI & Sidebar navigation
│   │   └── main.tsx           # React entry point
│   ├── package.json           # Node dependencies
│   └── vite.config.ts         # Vite proxy config (proxies /api to [http://127.0.0.1:5000](http://127.0.0.1:5000))
└── build.py                   # Automation script: builds React, then runs PyInstaller