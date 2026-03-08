#!/usr/bin/env python3
"""
backfill_metadata.py — Jednorazowy skrypt uzupełniający metadane
w istniejących rekordach blog_vectors_double.

Dla każdego URL bez title/h1:
  1. Fetch via crawl4ai (PruningContentFilter)
  2. Extract title + h1
  3. UPDATE row w Supabase

Użycie:
  python3 backfill_metadata.py          # backfill all rows missing metadata
  python3 backfill_metadata.py --dry    # preview only, no writes
"""

import asyncio
import os
import re
import sys
import time
import json
import logging
from datetime import datetime

import requests
from dotenv import load_dotenv

load_dotenv()

SUPABASE_URL      = os.getenv("SUPABASE_URL")
SUPABASE_ANON_KEY = os.getenv("SUPABASE_ANON_KEY")
TABLE_NAME        = "blog_vectors_double"

logging.basicConfig(level=logging.INFO, format="%(asctime)s [%(levelname)s] %(message)s")
log = logging.getLogger(__name__)


def detect_page_type(url: str) -> str:
    path = url.replace("https://double-digital.pl", "")
    if "/blog/" in path or "/artykul/" in path:
        return "blog"
    if "/uslugi/" in path or "/service" in path:
        return "service"
    if "/case-stud" in path:
        return "case_study"
    return "landing"


def extract_metadata(markdown: str) -> dict:
    title = ""
    h1 = ""
    title_match = re.search(r"^Title:\s*(.+)$", markdown, re.MULTILINE)
    if title_match:
        title = title_match.group(1).strip()
    h1_match = re.search(r"^#\s+(.+)$", markdown, re.MULTILINE)
    if h1_match:
        h1 = h1_match.group(1).strip()
    if not title and h1:
        title = h1
    return {"title": title, "h1": h1}


def get_rows_missing_metadata() -> list[dict]:
    """Get all rows where title IS NULL."""
    headers = {
        "apikey": SUPABASE_ANON_KEY,
        "Authorization": f"Bearer {SUPABASE_ANON_KEY}",
    }
    rows = []
    offset = 0
    page_size = 100

    while True:
        endpoint = (
            f"{SUPABASE_URL}/rest/v1/{TABLE_NAME}"
            f"?select=id,url&title=is.null&limit={page_size}&offset={offset}"
        )
        resp = requests.get(endpoint, headers=headers, timeout=30)
        resp.raise_for_status()
        batch = resp.json()
        rows.extend(batch)
        if len(batch) < page_size:
            break
        offset += page_size

    return rows


async def _crawl4ai_fetch(url: str) -> str:
    """Pobiera treść strony przez crawl4ai z PruningContentFilter."""
    from crawl4ai import AsyncWebCrawler, BrowserConfig, CrawlerRunConfig, CacheMode
    from crawl4ai.content_filter_strategy import PruningContentFilter
    from crawl4ai.markdown_generation_strategy import DefaultMarkdownGenerator

    pruning_filter = PruningContentFilter(threshold=0.45, threshold_type="fixed", min_word_threshold=10)
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
    # Backfill potrzebuje tylko title/h1 — przytnij do 4000 znaków
    return content.strip()[:4000]


def fetch_markdown(url: str) -> str:
    """Synchroniczny wrapper — uruchamia crawl4ai przez asyncio.run()."""
    return asyncio.run(_crawl4ai_fetch(url))


def update_row(row_id: int, title: str, h1: str, page_type: str):
    endpoint = f"{SUPABASE_URL}/rest/v1/{TABLE_NAME}?id=eq.{row_id}"
    headers = {
        "apikey": SUPABASE_ANON_KEY,
        "Authorization": f"Bearer {SUPABASE_ANON_KEY}",
        "Content-Type": "application/json",
    }
    payload = {
        "title": title or None,
        "h1": h1 or None,
        "page_type": page_type,
        "indexed_at": datetime.now().isoformat(),
    }
    resp = requests.patch(endpoint, json=payload, headers=headers, timeout=30)
    resp.raise_for_status()


def main():
    dry_run = "--dry" in sys.argv

    log.info("=" * 60)
    log.info(f"Backfill Metadata {'(DRY RUN)' if dry_run else ''}")
    log.info("=" * 60)

    rows = get_rows_missing_metadata()
    log.info(f"Rows missing metadata: {len(rows)}")

    if not rows:
        log.info("Nothing to backfill!")
        return

    updated = 0
    failed = 0

    for i, row in enumerate(rows, 1):
        url = row["url"]
        row_id = row["id"]
        log.info(f"[{i}/{len(rows)}] {url}")

        try:
            markdown = fetch_markdown(url)
            meta = extract_metadata(markdown)
            page_type = detect_page_type(url)

            if dry_run:
                log.info(f"  DRY: title='{meta['title'][:60]}' h1='{meta['h1'][:60]}' type={page_type}")
            else:
                update_row(row_id, meta["title"], meta["h1"], page_type)
                log.info(f"  ✓ Updated: title='{meta['title'][:50]}' type={page_type}")
            updated += 1

        except Exception as e:
            log.warning(f"  ✗ Failed: {e}")
            failed += 1

        if i < len(rows):
            time.sleep(1.0)  # krótka pauza między requestami crawl4ai

    log.info("=" * 60)
    log.info(f"Done! Updated: {updated} | Failed: {failed}")


if __name__ == "__main__":
    main()
