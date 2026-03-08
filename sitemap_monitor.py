#!/usr/bin/env python3
"""
sitemap_monitor.py — Codzienne monitorowanie sitemap Double Digital
Sprawdza nowe artykuły i strony usług, dodaje je do Supabase (blog_vectors_double).

Flow:
  1. Pobierz XML sitemap (article, blog, service, case-study)
  2. Wyciągnij wszystkie URL <loc>
  3. Sprawdź w Supabase które już istnieją
  4. Dla nowych: crawl4ai (PruningContentFilter) → extract metadata → Gemini embedding → INSERT
  5. Zapisz log do data/logs/sitemap_monitor.log

Konfiguracja crona (1:00 czasu polskiego):
  crontab -e
  0 1 * * * TZ=Europe/Warsaw /usr/bin/python3 /ścieżka/do/sitemap_monitor.py >> /ścieżka/do/data/logs/cron.log 2>&1

Wymagania (pip install):
  requests python-dotenv crawl4ai

Konfiguracja .env:
  GEMINI_API_KEY=...
  SUPABASE_URL=https://xxxxx.supabase.co
  SUPABASE_ANON_KEY=eyJ...
"""

import asyncio
import os
import re
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

GEMINI_EMBED_URL  = "https://generativelanguage.googleapis.com/v1beta/models/gemini-embedding-001:embedContent"
TABLE_NAME        = "blog_vectors_double"

# All DD sitemaps — blog, articles, services, case studies
SITEMAPS = [
    "https://double-digital.pl/article-sitemap.xml",
    "https://double-digital.pl/blog-sitemap.xml",
    "https://double-digital.pl/service-sitemap.xml",
    "https://double-digital.pl/case-study-sitemap.xml",
]

# Key landing pages not in any sitemap
EXTRA_PAGES = [
    "https://double-digital.pl/",
    "https://double-digital.pl/pozycjonowanie-stron/",
    "https://double-digital.pl/pozycjonowanie-lokalne-seo/",
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

# ── Helpers ────────────────────────────────────────────────────────────────────

def detect_page_type(url: str) -> str:
    """Determine page_type from URL pattern."""
    path = url.replace("https://double-digital.pl", "")
    if "/blog/" in path or "/artykul/" in path:
        return "blog"
    if "/uslugi/" in path or "/service" in path:
        return "service"
    if "/case-stud" in path:
        return "case_study"
    return "landing"


def extract_metadata(markdown: str) -> dict:
    """Extract title and h1 from crawl4ai markdown output."""
    title = ""
    h1 = ""

    # crawl4ai może zwracać "Title: ..." na początku (podobnie jak Jina)
    title_match = re.search(r"^Title:\s*(.+)$", markdown, re.MULTILINE)
    if title_match:
        title = title_match.group(1).strip()

    # First # heading = H1
    h1_match = re.search(r"^#\s+(.+)$", markdown, re.MULTILINE)
    if h1_match:
        h1 = h1_match.group(1).strip()

    # Fallback: use H1 as title if no Title: line
    if not title and h1:
        title = h1

    return {"title": title, "h1": h1}


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
    """Zbiera URL ze wszystkich sitemap + EXTRA_PAGES, deduplikuje."""
    all_urls: list[str] = []
    for sitemap_url in SITEMAPS:
        all_urls.extend(fetch_sitemap_urls(sitemap_url))

    # Add extra landing pages
    all_urls.extend(EXTRA_PAGES)

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


# ── Krok 2: crawl4ai → fit_markdown ───────────────────────────────────────────

async def _crawl4ai_fetch(url: str) -> str:
    """Pobiera treść strony przez crawl4ai z PruningContentFilter. Zwraca fit_markdown."""
    from crawl4ai import AsyncWebCrawler, BrowserConfig, CrawlerRunConfig, CacheMode
    from crawl4ai.content_filter_strategy import PruningContentFilter
    from crawl4ai.markdown_generation_strategy import DefaultMarkdownGenerator

    pruning_filter = PruningContentFilter(
        threshold=0.45,
        threshold_type="fixed",
        min_word_threshold=10,
    )
    md_generator = DefaultMarkdownGenerator(
        content_filter=pruning_filter,
        options={"ignore_links": False, "ignore_images": True},
    )
    browser_config = BrowserConfig(headless=True, viewport_width=1280, viewport_height=900, verbose=False)
    crawler_config = CrawlerRunConfig(
        cache_mode=CacheMode.BYPASS,
        markdown_generator=md_generator,
        excluded_tags=["nav", "header", "footer", "aside", "script", "style"],
        remove_overlay_elements=True,
        page_timeout=40000,
        screenshot=False,
    )

    async with AsyncWebCrawler(config=browser_config) as crawler:
        result = await crawler.arun(url=url, config=crawler_config)

    if not result.success:
        raise ValueError(f"crawl4ai error: {result.error_message}")

    md_obj = result.markdown
    content = (md_obj.fit_markdown if hasattr(md_obj, "fit_markdown") and md_obj.fit_markdown
               else md_obj.raw_markdown if hasattr(md_obj, "raw_markdown") else str(md_obj))
    content = content.strip()

    if len(content) < 100:
        raise ValueError(f"Za mało treści ({len(content)} znaków) po pruning — możliwy JS block")

    log.info(f"    crawl4ai fit_markdown: {len(content)} znaków")
    return content


def fetch_markdown(url: str) -> str:
    """Synchroniczny wrapper dla _crawl4ai_fetch — używany przez cron."""
    return asyncio.run(_crawl4ai_fetch(url))


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

def insert_to_supabase(url: str, embedding: list[float], title: str = "", h1: str = "", page_type: str = "blog") -> int:
    """Wstawia (url, vector, metadata) do blog_vectors_double. Zwraca ID rekordu."""
    endpoint = f"{SUPABASE_URL}/rest/v1/{TABLE_NAME}"
    headers = {
        "apikey": SUPABASE_ANON_KEY,
        "Authorization": f"Bearer {SUPABASE_ANON_KEY}",
        "Content-Type": "application/json",
        "Prefer": "return=representation",
    }

    vector_str = "[" + ",".join(str(v) for v in embedding) + "]"
    payload = {
        "url": url,
        "vector": vector_str,
        "title": title or None,
        "h1": h1 or None,
        "page_type": page_type,
        "indexed_at": datetime.now().isoformat(),
    }

    resp = requests.post(endpoint, json=payload, headers=headers, timeout=30)
    resp.raise_for_status()

    result = resp.json()
    record_id = result[0].get("id", "?")
    log.info(f"    Supabase INSERT OK — ID: {record_id} [{page_type}]")
    return record_id


# ── Pipeline dla jednego URL ──────────────────────────────────────────────────

def process_new_url(url: str) -> bool:
    """Pełny flow dla nowego URL. Zwraca True jeśli sukces."""
    log.info(f"  Przetwarzam: {url}")
    try:
        markdown = fetch_markdown(url)

        # Extract metadata from markdown
        meta = extract_metadata(markdown)
        page_type = detect_page_type(url)

        embedding = generate_embedding(markdown)
        time.sleep(0.2)  # safety margin

        insert_to_supabase(
            url, embedding,
            title=meta.get("title", ""),
            h1=meta.get("h1", ""),
            page_type=page_type,
        )
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

    # 0. Zbierz URL ze wszystkich sitemap + extra pages
    sitemap_urls = collect_all_sitemap_urls()
    if not sitemap_urls:
        log.warning("Brak URL w sitemap — sprawdź połączenie z double-digital.pl")
        return

    # 1. Sprawdź co już jest w Supabase
    existing_urls = get_existing_urls()

    # 2. Wyfiltruj nowe URL
    new_urls = [u for u in sitemap_urls if u not in existing_urls]

    # Log breakdown by page type
    by_type = {}
    for u in new_urls:
        pt = detect_page_type(u)
        by_type[pt] = by_type.get(pt, 0) + 1
    log.info(f"Nowych URL do dodania: {len(new_urls)} ({by_type})")

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

        # Krótka pauza między URL (crawl4ai uruchamia przeglądarkę per request)
        if i < len(new_urls):
            time.sleep(1.0)

    # 4. Podsumowanie
    log.info("=" * 60)
    log.info(f"Gotowe! Dodano: {added} | Błędy: {failed} | Pominięto (już były): {len(sitemap_urls) - len(new_urls)}")
    log.info("=" * 60)

    save_run_summary(new_urls, added, failed)


if __name__ == "__main__":
    main()
