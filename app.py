#!/usr/bin/env python3
"""
Content Planner — Web UI
Uruchom: python3 app.py
Otwórz:  http://localhost:5000

Wymaga: pip install flask requests python-dotenv
"""

import json
import os
import queue
import subprocess
import sys
import threading
import time
from pathlib import Path

try:
    from flask import Flask, Response, jsonify, render_template, request, stream_with_context
except ImportError:
    print("ERROR: flask not installed. Run: pip install flask")
    sys.exit(1)

app = Flask(__name__)

# Nagłówki CORS dla każdej odpowiedzi (potrzebne gdy przeglądarka wysyła preflight OPTIONS)
@app.after_request
def add_cors(response):
    response.headers["Access-Control-Allow-Origin"]  = "*"
    response.headers["Access-Control-Allow-Headers"] = "Content-Type"
    response.headers["Access-Control-Allow-Methods"] = "GET, POST, OPTIONS"
    return response

@app.route("/api/config", methods=["OPTIONS"])
@app.route("/api/run", methods=["OPTIONS"])
def options_handler():
    return "", 204

BASE_DIR    = Path(__file__).parent
CONFIG_FILE = BASE_DIR / "config.json"
PLANNER     = BASE_DIR / "content_planner.py"
BRIEFS_DIR  = BASE_DIR / "data" / "briefs"

_jobs: dict[str, dict] = {}  # job_id → {queue, done, slug}


# ─── Config ───────────────────────────────────────────────────────────────────

def load_config() -> dict:
    if CONFIG_FILE.exists():
        try:
            return json.loads(CONFIG_FILE.read_text(encoding="utf-8"))
        except Exception:
            return {}
    return {}


def save_config(data: dict):
    CONFIG_FILE.write_text(json.dumps(data, indent=2, ensure_ascii=False),
                           encoding="utf-8")


# ─── Pipeline runner ──────────────────────────────────────────────────────────

def _slugify(text: str) -> str:
    import re
    pl = {"ą":"a","ć":"c","ę":"e","ł":"l","ń":"n","ó":"o","ś":"s","ź":"z","ż":"z"}
    t = text.lower()
    for k, v in pl.items():
        t = t.replace(k, v)
    t = re.sub(r"[^a-z0-9]+", "_", t)
    return t.strip("_")[:60]


def run_pipeline(job_id: str, topic: str, source_context: str,
                 lang: str, country: str, llm_only: bool, config: dict):
    q    = _jobs[job_id]["queue"]
    slug = _slugify(topic)
    _jobs[job_id]["slug"] = slug

    env = os.environ.copy()
    env.update({k: v for k, v in config.items() if v})

    cmd = [sys.executable, str(PLANNER), topic, source_context,
           "--lang", lang, "--country", country]
    if llm_only:
        cmd.append("--llm-only")

    try:
        proc = subprocess.Popen(
            cmd, env=env,
            stdout=subprocess.PIPE, stderr=subprocess.STDOUT,
            text=True, bufsize=1, encoding="utf-8", errors="replace"
        )
        for line in proc.stdout:
            line = line.rstrip()
            if line:
                q.put({"type": "log", "msg": line})
        proc.wait()
        if proc.returncode == 0:
            brief_path = BRIEFS_DIR / slug / "brief.md"
            q.put({"type": "done", "slug": slug,
                   "brief_exists": brief_path.exists()})
        else:
            q.put({"type": "error",
                   "msg": f"Pipeline zakończył się błędem (kod {proc.returncode})"})
    except Exception as e:
        q.put({"type": "error", "msg": str(e)})
    finally:
        _jobs[job_id]["done"] = True


# ─── Routes ───────────────────────────────────────────────────────────────────

@app.route("/")
def index():
    return render_template("index.html")


@app.route("/api/config", methods=["GET"])
def get_config():
    config = load_config()
    result = {}
    for k in ["OPENROUTER_API_KEY", "NODESHUB_API_KEY", "JINA_API_KEY"]:
        val = config.get(k, "")
        if val and len(val) > 8:
            result[k] = val[:4] + "•" * 8 + val[-4:]
        elif val:
            result[k] = "•" * len(val)
        else:
            result[k] = ""
    return jsonify(result)


@app.route("/api/config", methods=["POST"])
def set_config():
    try:
        data = request.get_json(force=True, silent=True) or {}
        config = load_config()
        changed = 0
        for k in ["OPENROUTER_API_KEY", "NODESHUB_API_KEY", "JINA_API_KEY"]:
            v = (data.get(k) or "").strip()
            # Pomijamy puste i zamaskowane placeholdery (same kropki)
            if v and not all(c == "\u2022" for c in v):
                config[k] = v
                changed += 1
        save_config(config)
        return jsonify({"ok": True, "saved": changed})
    except Exception as e:
        return jsonify({"ok": False, "error": str(e)}), 500


@app.route("/api/run", methods=["POST"])
def api_run():
    data           = request.json or {}
    topic          = (data.get("topic") or "").strip()
    source_context = (data.get("source_context") or "").strip()
    lang           = data.get("lang", "pl")
    country        = data.get("country", "pl")
    llm_only       = bool(data.get("llm_only", False))

    if not topic:
        return jsonify({"error": "Podaj temat artykułu"}), 400
    if not source_context:
        return jsonify({"error": "Podaj opis firmy / Source Context"}), 400

    config = load_config()
    if not config.get("OPENROUTER_API_KEY"):
        return jsonify({"error": "Brak klucza OpenRouter. Uzupełnij w Ustawieniach ⚙"}), 400

    job_id = f"{int(time.time() * 1000)}"
    _jobs[job_id] = {"queue": queue.Queue(), "done": False, "slug": None}

    threading.Thread(
        target=run_pipeline,
        args=(job_id, topic, source_context, lang, country, llm_only, config),
        daemon=True
    ).start()

    return jsonify({"job_id": job_id})


@app.route("/api/stream/<job_id>")
def api_stream(job_id: str):
    if job_id not in _jobs:
        return jsonify({"error": "Job nie znaleziony"}), 404

    def generate():
        job = _jobs[job_id]
        while True:
            try:
                msg = job["queue"].get(timeout=1)
                yield f"data: {json.dumps(msg, ensure_ascii=False)}\n\n"
                if msg.get("type") in ("done", "error"):
                    break
            except queue.Empty:
                if job["done"]:
                    break
                yield "data: {\"type\":\"ping\"}\n\n"

    return Response(
        stream_with_context(generate()),
        mimetype="text/event-stream",
        headers={"Cache-Control": "no-cache", "X-Accel-Buffering": "no"}
    )


@app.route("/api/brief/<slug>")
def get_brief(slug: str):
    brief_path = BRIEFS_DIR / slug / "brief.md"
    if not brief_path.exists():
        return jsonify({"error": "Brief nie znaleziony"}), 404
    return Response(brief_path.read_text(encoding="utf-8"),
                    mimetype="text/plain; charset=utf-8")


@app.route("/api/files/<slug>")
def get_files(slug: str):
    brief_dir = BRIEFS_DIR / slug
    if not brief_dir.exists():
        return jsonify({"files": []})
    files = []
    for f in sorted(brief_dir.rglob("*")):
        if f.is_file() and not f.name.startswith("."):
            rel = str(f.relative_to(BRIEFS_DIR))
            files.append({"name": f.name, "path": rel, "size": f.stat().st_size})
    return jsonify({"files": files})


if __name__ == "__main__":
    from dotenv import load_dotenv
    load_dotenv()
    port = int(os.environ.get("PORT", 5000))
    print("╔══════════════════════════════════════╗")
    print("  Content Planner UI")
    print(f"  → http://localhost:{port}")
    print("╚══════════════════════════════════════╝")
    app.run(debug=False, port=port, threaded=True)
