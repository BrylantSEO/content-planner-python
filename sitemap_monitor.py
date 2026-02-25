#!/usr/bin/env python3
"""
sitemap_monitor.py — Codzienne monitorowanie sitemap Double Digital
Sprawdza nowe artykuły i dodaje je do Supabase (blog_vectors_double).

Flow:
  1. Pobierz oba XML sitemap
  2. Wyciągnij wszystkie URL <loc>
  3. Sprawdź w Supabase które już istnieją
  4. Dla nowych: Jina Reader → Gemini embedding → INSERT
  5. Zapisz log do data/logs/sitemap_monitor.log

Konfiguracja crona (1:00 czasu polskiego):
  crontab -e
  0 1 * * * TZ=Europe/Warsaw /usr/bin/python3 /ścieżka/do/sitemap_monitor.py >> /ścieżka/do/data/logs/cron.log 2>&1

Wymagania (pip install):
  requests python-dotenv

Konfiguracja .env:
  GEMINI_API_KEY=...
  SUPABASE_URL=https://xxxxx.supabase.co
  SUPABASE_ANON_KEY=eyJ...
  JINA_API_KEY=...  (opcjonalne, wyższy rate limit)
"""

import os
import sys
import json
import time
import logging
import xml.etree.ElementTree as ET
from datetime import datetime
from pathlib import Path

import requests
from dotenv import load_dotenv

# ── Konfiguracja ───────────────────────────────────────────────────────────────

load_dotenv()

GEMINI_API_KEY    = os.getenv("GEMINI_API_KEY")
SUPABASE_URL      = os.getenv("SUPABASE_URL")
SUPABASE_ANON_KEY = os.getenv("SUPABASE_ANON_KEY")

JINA_BASE         = "https://r.jina.ai/"
GEMINI_EMBED_URL  = "https://generativelanguage.googleapis.com/v1beta/models/gemini-embedding-001:embedContent"
TABLE_NAME        = "blog_vectors_double"

SITEMAPS = [
    "https://double-digital.pl/article-sitemap.xml",
    "https://double-digital.pl/blog-sitemap.xml",
]

LOG_DIR  = Path("data/logs")
LOG_FILE = LOG_DIR / "sitemap_monitor.log"

# ── Logger ─────────────────────────────────────────────────────────────────────

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

# ── Krok 0: Pobierz i sparsuj sitemap ─────────────────────────────────────────

def fetch_sitemap_urls(sitemap_url: str) -> list[str]:
    """Pobiera sitemap XML i zwraca listę URL z tagów <loc>."""
    log.info(f"Pobieram sitemap: {sitemap_url}")
    try:
        resp = requests.get(sitemap_url, timeout=30, headers={"User-Agent": "Mozilla/5.0"})
        resp.raise_for_status()
    except Exception as e:
        log.error(f"Błąd pobierania sitemap {sitemap_url}: {e}")
        return []

    # Namespace XML — sitemap schema
    ns = {"sm": "http://www.sitemaps.org/schemas/sitemap/0.9"}
    try:
        root = ET.fromstring(resp.content)
    except ET.ParseError as e:
        log.error(f"Błąd parsowania XML {sitemap_url}: {e}")
        return []

    # Wyciągnij <loc> — sprawdź z namespace i bez
    urls = [el.text.strip() for el in root.findall(".//sm:loc", ns) if el.text]
    if not urls:
        # Fallback: bez namespace
        urls = [el.text.strip() for el in root.findall(".//loc") if el.text]

    log.info(f"  Znaleziono {len(urls)} URL w {sitemap_url.split('/')[-1]}")
    return urls


def collect_all_sitemap_urls() -> list[str]:
    """Zbiera URL ze wszystkich sitemap, deduplikuje."""
    all_urls: list[str] = []
    for sitemap_url in SITEMAPS:
        all_urls.extend(fetch_sitemap_urls(sitemap_url))

    # Deduplikacja z zachowaniem kolejności
    seen = set()
    unique = []
    for url in all_urls:
        if url not in seen:
            seen.add(url)
            unique.append(url)

    log.info(f"Łącznie unikalnych URL ze wszystkich sitemap: {len(unique)}")
    return unique


# ── Krok 1: Sprawdź które URL już są w Supabase ───────────────────────────────

def get_existing_urls() -> set[str]:
    """Pobiera wszystkie URL już zapisane w blog_vectors_double."""
    if not SUPABASE_URL or not SUPABASE_ANON_KEY:
        log.error("Brak SUPABASE_URL lub SUPABASE_ANON_KEY w .env")
        sys.exit(1)

    existing: set[str] = set()
    page_size = 1000
    offset = 0

    while True:
        endpoint = (
            f"{SUPABASE_URL}/rest/v1/{TABLE_NAME}"
            f"?select=url&limit={page_size}&offset={offset}"
        )
        headers = {
            "apikey": SUPABASE_ANON_KEY,
            "Authorization": f"Bearer {SUPABASE_ANON_KEY}",
        }
        try:
            resp = requests.get(endpoint, headers=headers, timeout=30)
            resp.raise_for_status()
        except Exception as e:
            log.error(f"Błąd pobierania istniejących URL z Supabase: {e}")
            sys.exit(1)

        batch = resp.json()
        for row in batch:
            if row.get("url"):
                existing.add(row["url"])

        if len(batch) < page_size:
            break  # ostatnia strona
        offset += page_size

    log.info(f"W Supabase już istnieje {len(existing)} URL")
    return existing


# ── Krok 2: Jina Reader → Markdown ────────────────────────────────────────────

def fetch_markdown(url: str) -> str:
    """Pobiera treść strony jako Markdown przez Jina Reader."""
    jina_url = JINA_BASE + url
    headers = {"Accept": "text/plain"}

    jina_key = os.getenv("JINA_API_KEY")
    if jina_key:
        headers["Authorization"] = f"Bearer {jina_key}"

    headers["X-Remove-Selector"] = "nav, header, footer, .sidebar, .ads"

    resp = requests.get(jina_url, headers=headers, timeout=60)
    resp.raise_for_status()

    content = resp.text
    if len(content) > 8000:
        content = content[:8000]

    if len(content) < 100:
        raise ValueError(f"Za mało treści ({len(content)} znaków) — możliwy paywall lub JS block")

    log.info(f"    Jina: {len(content)} znaków")
    return content


# ── Krok 3: Gemini → embedding ────────────────────────────────────────────────

def generate_embedding(text: str) -> list[float]:
    """Generuje 3072-wymiarowy embedding (Gemini gemini-embedding-001)."""
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

    values = resp.json()["embedding"]["values"]
    log.info(f"    Embedding: {len(values)} wymiarów")
    return values


# ── Krok 4: INSERT do Supabase ────────────────────────────────────────────────

def insert_to_supabase(url: str, embedding: list[float]) -> int:
    """Wstawia (url, vector) do blog_vectors_double. Zwraca ID rekordu."""
    endpoint = f"{SUPABASE_URL}/rest/v1/{TABLE_NAME}"
    headers = {
        "apikey": SUPABASE_ANON_KEY,
        "Authorization": f"Bearer {SUPABASE_ANON_KEY}",
        "Content-Type": "application/json",
        "Prefer": "return=representation",
    }

    vector_str = "[" + ",".join(str(v) for v in embedding) + "]"
    payload = {"url": url, "vector": vector_str}

    resp = requests.post(endpoint, json=payload, headers=headers, timeout=30)
    resp.raise_for_status()

    result = resp.json()
    record_id = result[0].get("id", "?")
    log.info(f"    Supabase INSERT OK — ID: {record_id}")
    return record_id


# ── Pipeline dla jednego URL ──────────────────────────────────────────────────

def process_new_url(url: str) -> bool:
    """Pełny flow dla nowego URL. Zwraca True jeśli sukces."""
    log.info(f"  Przetwarzam: {url}")
    try:
        markdown  = fetch_markdown(url)
        time.sleep(0.3)  # rate limit Jina (20 RPM bez klucza)

        embedding = generate_embedding(markdown)
        time.sleep(0.2)  # safety margin

        insert_to_supabase(url, embedding)
        return True

    except requests.HTTPError as e:
        log.warning(f"    HTTP {e.response.status_code} — pomijam: {url}")
        return False
    except ValueError as e:
        log.warning(f"    {e} — pomijam: {url}")
        return False
    except Exception as e:
        log.error(f"    Nieoczekiwany błąd [{type(e).__name__}]: {e} — pomijam: {url}")
        return False


# ── Raport końcowy ─────────────────────────────────────────────────────────────

def save_run_summary(new_urls: list[str], added: int, failed: int):
    """Zapisuje JSON z podsumowaniem ostatniego uruchomienia."""
    summary_file = LOG_DIR / "last_run.json"
    summary = {
        "timestamp": datetime.now().isoformat(),
        "sitemaps": SITEMAPS,
        "new_urls_found": len(new_urls),
        "successfully_added": added,
        "failed": failed,
        "new_urls": new_urls,
    }
    summary_file.write_text(json.dumps(summary, indent=2, ensure_ascii=False))
    log.info(f"Podsumowanie zapisano: {summary_file}")


# ── Main ───────────────────────────────────────────────────────────────────────

def main():
    log.info("=" * 60)
    log.info("Sitemap Monitor — start")
    log.info(f"Czas: {datetime.now().strftime('%Y-%m-%d %H:%M:%S')}")
    log.info("=" * 60)

    # 0. Zbierz URL ze wszystkich sitemap
    sitemap_urls = collect_all_sitemap_urls()
    if not sitemap_urls:
        log.warning("Brak URL w sitemap — sprawdź połączenie z double-digital.pl")
        return

    # 1. Sprawdź co już jest w Supabase
    existing_urls = get_existing_urls()

    # 2. Wyfiltruj nowe URL
    new_urls = [u for u in sitemap_urls if u not in existing_urls]
    log.info(f"Nowych URL do dodania: {len(new_urls)}")

    if not new_urls:
        log.info("Brak nowych artykułów — zakończono bez zmian.")
        save_run_summary([], 0, 0)
        return

    # 3. Przetwórz nowe URL
    added  = 0
    failed = 0

    for i, url in enumerate(new_urls, 1):
        log.info(f"[{i}/{len(new_urls)}]")
        success = process_new_url(url)
        if success:
            added += 1
        else:
            failed += 1

        # Pauza między URL (Jina rate limit: 20 RPM bez klucza = 3s)
        if i < len(new_urls):
            jina_key = os.getenv("JINA_API_KEY")
            pause = 1.0 if jina_key else 3.0
            time.sleep(pause)

    # 4. Podsumowanie
    log.info("=" * 60)
    log.info(f"Gotowe! Dodano: {added} | Błędy: {failed} | Pominięto (już były): {len(sitemap_urls) - len(new_urls)}")
    log.info("=" * 60)

    save_run_summary(new_urls, added, failed)


if __name__ == "__main__":
    main()
