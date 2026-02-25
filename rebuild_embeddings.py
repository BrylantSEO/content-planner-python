#!/usr/bin/env python3
"""
rebuild_embeddings.py — Przebudowuje embeddingi w blog_vectors_double.

Po migracji z text-embedding-004 (deprecated) na gemini-embedding-001,
wszystkie wektory w bazie muszą być przeliczone na nowy model.

Flow:
  1. Pobierz listę URL z Supabase
  2. Dla każdego URL: Jina Reader → Gemini embedding (gemini-embedding-001)
  3. UPDATE vector w Supabase

Użycie:
  python3 rebuild_embeddings.py              # przebuduj wszystkie
  python3 rebuild_embeddings.py --dry-run    # tylko pokaż co by się zmieniło
  python3 rebuild_embeddings.py --limit 5    # przebuduj tylko 5 pierwszych (test)

Wymagania (pip install): requests python-dotenv
"""

import os
import sys
import time
import logging
from pathlib import Path

import requests
from dotenv import load_dotenv

load_dotenv()

GEMINI_API_KEY    = os.getenv("GEMINI_API_KEY")
SUPABASE_URL      = os.getenv("SUPABASE_URL")
SUPABASE_ANON_KEY = os.getenv("SUPABASE_ANON_KEY")

JINA_BASE         = "https://r.jina.ai/"
GEMINI_EMBED_URL  = "https://generativelanguage.googleapis.com/v1beta/models/gemini-embedding-001:embedContent"
TABLE_NAME        = "blog_vectors_double"

LOG_DIR  = Path("data/logs")
LOG_FILE = LOG_DIR / "rebuild_embeddings.log"

LOG_DIR.mkdir(parents=True, exist_ok=True)

logging.basicConfig(
    level=logging.INFO,
    format="%(asctime)s [%(levelname)s] %(message)s",
    datefmt="%Y-%m-%d %H:%M:%S",
    handlers=[
        logging.FileHandler(LOG_FILE, encoding="utf-8"),
        logging.StreamHandler(sys.stdout),
    ],
)
log = logging.getLogger(__name__)


def get_all_urls() -> list[dict]:
    """Pobiera id i url wszystkich rekordów z blog_vectors_double."""
    if not SUPABASE_URL or not SUPABASE_ANON_KEY:
        log.error("Brak SUPABASE_URL lub SUPABASE_ANON_KEY w .env")
        sys.exit(1)

    records = []
    page_size = 1000
    offset = 0

    while True:
        endpoint = (
            f"{SUPABASE_URL}/rest/v1/{TABLE_NAME}"
            f"?select=id,url&limit={page_size}&offset={offset}&order=id"
        )
        headers = {
            "apikey": SUPABASE_ANON_KEY,
            "Authorization": f"Bearer {SUPABASE_ANON_KEY}",
        }
        resp = requests.get(endpoint, headers=headers, timeout=30)
        resp.raise_for_status()

        batch = resp.json()
        records.extend(batch)

        if len(batch) < page_size:
            break
        offset += page_size

    log.info(f"Pobrano {len(records)} rekordów z bazy")
    return records


def fetch_markdown(url: str) -> str:
    """Pobiera treść strony jako Markdown przez Jina Reader."""
    jina_url = JINA_BASE + url
    headers = {"Accept": "text/plain", "X-Remove-Selector": "nav, header, footer, .sidebar, .ads"}

    jina_key = os.getenv("JINA_API_KEY")
    if jina_key:
        headers["Authorization"] = f"Bearer {jina_key}"

    resp = requests.get(jina_url, headers=headers, timeout=60)
    resp.raise_for_status()

    content = resp.text
    if len(content) > 8000:
        content = content[:8000]

    if len(content) < 100:
        raise ValueError(f"Za mało treści ({len(content)} znaków)")

    return content


def generate_embedding(text: str) -> list[float]:
    """Generuje 3072-wymiarowy embedding (Gemini gemini-embedding-001, RETRIEVAL_DOCUMENT)."""
    if not GEMINI_API_KEY:
        log.error("Brak GEMINI_API_KEY w .env")
        sys.exit(1)

    payload = {
        "model": "models/gemini-embedding-001",
        "content": {"parts": [{"text": text}]},
        "taskType": "RETRIEVAL_DOCUMENT",
    }
    resp = requests.post(
        f"{GEMINI_EMBED_URL}?key={GEMINI_API_KEY}",
        json=payload,
        timeout=30,
    )
    resp.raise_for_status()
    return resp.json()["embedding"]["values"]


def update_vector(record_id: int, embedding: list[float]) -> None:
    """UPDATE vector dla danego rekordu w Supabase."""
    endpoint = f"{SUPABASE_URL}/rest/v1/{TABLE_NAME}?id=eq.{record_id}"
    headers = {
        "apikey": SUPABASE_ANON_KEY,
        "Authorization": f"Bearer {SUPABASE_ANON_KEY}",
        "Content-Type": "application/json",
        "Prefer": "return=minimal",
    }

    vector_str = "[" + ",".join(str(v) for v in embedding) + "]"
    payload = {"vector": vector_str}

    resp = requests.patch(endpoint, json=payload, headers=headers, timeout=30)
    resp.raise_for_status()


def main():
    args = sys.argv[1:]
    dry_run = "--dry-run" in args
    limit = None

    for i, arg in enumerate(args):
        if arg == "--limit" and i + 1 < len(args):
            limit = int(args[i + 1])

    log.info("=" * 60)
    log.info(f"Rebuild Embeddings — {'DRY RUN' if dry_run else 'LIVE'}")
    log.info(f"Model: gemini-embedding-001 (RETRIEVAL_DOCUMENT)")
    log.info("=" * 60)

    records = get_all_urls()
    if limit:
        records = records[:limit]
        log.info(f"Ograniczono do {limit} rekordów")

    success = 0
    errors = 0

    for i, record in enumerate(records, 1):
        url = record["url"]
        record_id = record["id"]
        log.info(f"[{i}/{len(records)}] {url}")

        if dry_run:
            log.info("  [DRY RUN] Pominięto")
            continue

        try:
            content = fetch_markdown(url)
            time.sleep(0.3)

            embedding = generate_embedding(content)
            log.info(f"  Embedding: {len(embedding)} wymiarów")
            time.sleep(0.2)

            update_vector(record_id, embedding)
            log.info(f"  UPDATE OK (id={record_id})")
            success += 1

        except requests.HTTPError as e:
            log.warning(f"  HTTP {e.response.status_code} — pominięto")
            errors += 1
        except ValueError as e:
            log.warning(f"  {e} — pominięto")
            errors += 1
        except Exception as e:
            log.error(f"  [{type(e).__name__}]: {e} — pominięto")
            errors += 1

    log.info("=" * 60)
    log.info(f"Gotowe! Zaktualizowano: {success} | Błędy: {errors}")
    log.info("=" * 60)


if __name__ == "__main__":
    main()
