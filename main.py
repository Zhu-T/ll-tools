"""
main.py — Entry point for the bundled .exe
Starts Flask, then opens the app in the user's default browser.
"""

import sys
import os
import threading
import webbrowser
import time

if getattr(sys, 'frozen', False):
    sys.path.insert(0, sys._MEIPASS)

from backend.app import app, init_db

PORT = 5000

def open_browser() -> None:
    time.sleep(1.5)
    webbrowser.open(f"http://localhost:{PORT}")

if __name__ == "__main__":
    init_db()
    threading.Thread(target=open_browser, daemon=True).start()
    app.run(port=PORT, debug=False, use_reloader=False)
