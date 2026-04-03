import sys
import os
from flask import Flask, jsonify, request, send_from_directory
from flask_cors import CORS
import sqlite3
from datetime import datetime

# Determine base path (works both in dev and bundled .exe)
if getattr(sys, 'frozen', False):
    BASE_DIR = os.path.dirname(sys.executable)
else:
    BASE_DIR = os.path.dirname(os.path.abspath(__file__))

DB_PATH     = os.path.join(BASE_DIR, "database.db")
STATIC_DIR  = os.path.join(BASE_DIR, "static")

app = Flask(__name__, static_folder=STATIC_DIR, static_url_path="/")
CORS(app)


# ── Database Initialization ───────────────────────────────────────────────────

def get_db() -> sqlite3.Connection:
    conn = sqlite3.connect(DB_PATH)
    conn.row_factory = sqlite3.Row
    return conn

def init_db() -> None:
    with get_db() as conn:
        # Properties
        conn.execute("""
            CREATE TABLE IF NOT EXISTS properties (
                id               INTEGER  PRIMARY KEY AUTOINCREMENT,
                address          TEXT     NOT NULL,
                city             TEXT     DEFAULT 'Pennsylvania',
                notes            TEXT,
                created_at       DATETIME DEFAULT CURRENT_TIMESTAMP
            )
        """)
        # Tenants
        conn.execute("""
            CREATE TABLE IF NOT EXISTS tenants (
                id               INTEGER  PRIMARY KEY AUTOINCREMENT,
                name             TEXT     NOT NULL,
                email            TEXT,
                phone            TEXT,
                created_at       DATETIME DEFAULT CURRENT_TIMESTAMP
            )
        """)
        # Leases
        conn.execute("""
            CREATE TABLE IF NOT EXISTS leases (
                id               INTEGER  PRIMARY KEY AUTOINCREMENT,
                property_id      INTEGER  NOT NULL,
                tenant_id        INTEGER  NOT NULL,
                start_date       DATE     NOT NULL,
                end_date         DATE,
                monthly_rent     REAL     NOT NULL,
                security_deposit REAL     DEFAULT 0,
                rent_due_day     INTEGER  DEFAULT 1,
                late_fee_base    REAL     DEFAULT 50,
                late_fee_daily   REAL     DEFAULT 10,
                status           TEXT     DEFAULT 'active',
                created_at       DATETIME DEFAULT CURRENT_TIMESTAMP,
                FOREIGN KEY (property_id) REFERENCES properties (id),
                FOREIGN KEY (tenant_id)   REFERENCES tenants (id)
            )
        """)
        # Payments
        conn.execute("""
            CREATE TABLE IF NOT EXISTS payments (
                id               INTEGER  PRIMARY KEY AUTOINCREMENT,
                lease_id         INTEGER  NOT NULL,
                amount           REAL     NOT NULL,
                date_received    DATE     NOT NULL,
                payment_type     TEXT     DEFAULT 'rent',
                notes            TEXT,
                created_at       DATETIME DEFAULT CURRENT_TIMESTAMP,
                FOREIGN KEY (lease_id) REFERENCES leases (id)
            )
        """)
        # Events (Taxes, Renewals, etc.)
        conn.execute("""
            CREATE TABLE IF NOT EXISTS property_events (
                id               INTEGER  PRIMARY KEY AUTOINCREMENT,
                property_id      INTEGER  NOT NULL,
                title            TEXT     NOT NULL,
                due_date         DATE     NOT NULL,
                recurring        TEXT     DEFAULT 'none',
                is_completed     INTEGER  DEFAULT 0,
                notes            TEXT,
                created_at       DATETIME DEFAULT CURRENT_TIMESTAMP,
                FOREIGN KEY (property_id) REFERENCES properties (id)
            )
        """)
        conn.commit()


# ── API Routes (Basic CRUD for all models) ───────────────────────────────────

@app.route("/api/properties", methods=["GET", "POST"])
def manage_properties():
    if request.method == "GET":
        with get_db() as conn:
            rows = conn.execute("SELECT * FROM properties ORDER BY address").fetchall()
        return jsonify([dict(r) for r in rows])
    
    data = request.get_json()
    with get_db() as conn:
        cur = conn.execute("INSERT INTO properties (address, city, notes) VALUES (?, ?, ?)",
                         (data["address"], data.get("city"), data.get("notes")))
        conn.commit()
        row = conn.execute("SELECT * FROM properties WHERE id = ?", (cur.lastrowid,)).fetchone()
    return jsonify(dict(row)), 201

@app.route("/api/tenants", methods=["GET", "POST"])
def manage_tenants():
    if request.method == "GET":
        with get_db() as conn:
            rows = conn.execute("SELECT * FROM tenants ORDER BY name").fetchall()
        return jsonify([dict(r) for r in rows])
    
    data = request.get_json()
    with get_db() as conn:
        cur = conn.execute("INSERT INTO tenants (name, email, phone) VALUES (?, ?, ?)",
                         (data["name"], data.get("email"), data.get("phone")))
        conn.commit()
        row = conn.execute("SELECT * FROM tenants WHERE id = ?", (cur.lastrowid,)).fetchone()
    return jsonify(dict(row)), 201

@app.route("/api/leases", methods=["GET", "POST"])
def manage_leases():
    if request.method == "GET":
        with get_db() as conn:
            rows = conn.execute("""
                SELECT l.*, p.address as property_address, t.name as tenant_name 
                FROM leases l
                JOIN properties p ON l.property_id = p.id
                JOIN tenants t ON l.tenant_id = t.id
                ORDER BY l.start_date DESC
            """).fetchall()
        return jsonify([dict(r) for r in rows])
    
    data = request.get_json()
    with get_db() as conn:
        cur = conn.execute("""
            INSERT INTO leases (property_id, tenant_id, start_date, end_date, monthly_rent, security_deposit)
            VALUES (?, ?, ?, ?, ?, ?)
        """, (data["property_id"], data["tenant_id"], data["start_date"], 
              data.get("end_date"), data["monthly_rent"], data.get("security_deposit")))
        conn.commit()
        row = conn.execute("SELECT * FROM leases WHERE id = ?", (cur.lastrowid,)).fetchone()
    return jsonify(dict(row)), 201

@app.route("/api/events", methods=["GET", "POST"])
def manage_events():
    if request.method == "GET":
        with get_db() as conn:
            rows = conn.execute("""
                SELECT e.*, p.address as property_address 
                FROM property_events e
                JOIN properties p ON e.property_id = p.id
                ORDER BY e.due_date ASC
            """).fetchall()
        return jsonify([dict(r) for r in rows])
    
    data = request.get_json()
    with get_db() as conn:
        cur = conn.execute("""
            INSERT INTO property_events (property_id, title, due_date, recurring, notes)
            VALUES (?, ?, ?, ?, ?)
        """, (data["property_id"], data["title"], data["due_date"], 
              data.get("recurring", "none"), data.get("notes")))
        conn.commit()
        row = conn.execute("SELECT * FROM property_events WHERE id = ?", (cur.lastrowid,)).fetchone()
    return jsonify(dict(row)), 201

@app.route("/api/payments", methods=["GET", "POST"])
def manage_payments():
    if request.method == "GET":
        lease_id = request.args.get("lease_id")
        query = "SELECT * FROM payments"
        params = []
        if lease_id:
            query += " WHERE lease_id = ?"
            params.append(lease_id)
        query += " ORDER BY date_received DESC"
        with get_db() as conn:
            rows = conn.execute(query, params).fetchall()
        return jsonify([dict(r) for r in rows])
    
    data = request.get_json()
    with get_db() as conn:
        cur = conn.execute("""
            INSERT INTO payments (lease_id, amount, date_received, payment_type, notes)
            VALUES (?, ?, ?, ?, ?)
        """, (data["lease_id"], data["amount"], data["date_received"], 
              data.get("payment_type", "rent"), data.get("notes")))
        conn.commit()
        row = conn.execute("SELECT * FROM payments WHERE id = ?", (cur.lastrowid,)).fetchone()
    return jsonify(dict(row)), 201


# ── Serve React ───────────────────────────────────────────────────────────────

@app.route("/", defaults={"path": ""})
@app.route("/<path:path>")
def serve_react(path: str):
    full = os.path.join(STATIC_DIR, path)
    if path and os.path.exists(full):
        return send_from_directory(STATIC_DIR, path)
    return send_from_directory(STATIC_DIR, "index.html")

if __name__ == "__main__":
    init_db()
    app.run(port=5000, debug=True)
