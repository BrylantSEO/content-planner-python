#!/usr/bin/env python3
"""
Jina Reader - URL to Markdown via Jina Reader API (r.jina.ai)

Usage:
    python3 jina_reader.py URL
    python3 jina_reader.py --batch urls.txt --output DIR

Arguments:
    url      - URL to convert to markdown (required in single mode)

Examples:
    python3 jina_reader.py "https://pl.wikipedia.org/wiki/Kortyzol"
    python3 jina_reader.py --batch urls.txt --output data/competitor_content
    python3 jina_reader.py "https://example.com" --json

Requires:
    pip install requests python-dotenv
    Optional: JINA_API_KEY in .env (without key: 20 RPM limit)
"""

import os
import sys
import json
import time
import re
import argparse
import threading
from concurrent.futures import ThreadPoolExecutor, as_completed
from pathlib import Path

try:
    import requests
except ImportError:
    print("ERROR: requests not installed. Run: pip install requests")
    sys.exit(1)

try:
    from dotenv import load_dotenv
except ImportError:
    print("ERROR: python-dotenv not installed. Run: pip install python-dotenv")
    sys.exit(1)

# Load .env from project root
env_path = Path(__file__).resolve().parents[3] / ".env"
load_dotenv(env_path)

API_BASE = "https://r.jina.ai/"


class RateLimiter:
    """Thread-safe token bucket rate limiter."""

    def __init__(self, rpm):
        self.interval = 60.0 / rpm  # seconds between requests
        self.lock = threading.Lock()
        self.last_request = 0.0

    def wait(self):
        with self.lock:
            now = time.monotonic()
            wait_time = self.last_request + self.interval - now
            if wait_time > 0:
                time.sleep(wait_time)
            self.last_request = time.monotonic()


def get_api_key():
    """Return API key or None (works without key at 20 RPM)."""
    return os.environ.get("JINA_API_KEY")


def sanitize_filename(url):
    """Convert URL to safe filename."""
    # Remove protocol
    name = re.sub(r'https?://', '', url)
    # Replace non-alphanumeric with underscore
    name = re.sub(r'[^a-zA-Z0-9_-]', '_', name)
    # Collapse multiple underscores
    name = re.sub(r'_+', '_', name)
    # Trim and limit length
    return name.strip('_')[:100]


def fetch_url(url, max_retries=3, raise_on_error=False):
    """Fetch URL content as markdown via Jina Reader API.

    Args:
        url: URL to fetch
        max_retries: Number of retries on failure
        raise_on_error: If True, return None on error instead of sys.exit(1).
                        Used in parallel batch mode for graceful error handling.
    """
    headers = {
        "Accept": "application/json",
        "X-Return-Format": "markdown",
    }

    api_key = get_api_key()
    if api_key:
        headers["Authorization"] = f"Bearer {api_key}"

    request_url = f"{API_BASE}{url}"

    for attempt in range(max_retries):
        try:
            resp = requests.get(request_url, headers=headers, timeout=60)
            if resp.status_code == 200:
                return resp.json()
            elif resp.status_code == 429:
                wait = 2 ** (attempt + 1)
                print(f"Rate limited. Waiting {wait}s...", file=sys.stderr)
                time.sleep(wait)
            else:
                msg = f"ERROR: API returned {resp.status_code}: {resp.text}"
                print(msg, file=sys.stderr)
                if raise_on_error:
                    return None
                sys.exit(1)
        except requests.exceptions.Timeout:
            if attempt < max_retries - 1:
                print(f"Timeout. Retrying ({attempt + 2}/{max_retries})...", file=sys.stderr)
                time.sleep(2)
            else:
                msg = "ERROR: API timeout after all retries."
                print(msg, file=sys.stderr)
                if raise_on_error:
                    return None
                sys.exit(1)
        except requests.exceptions.RequestException as e:
            msg = f"ERROR: Request failed: {e}"
            print(msg, file=sys.stderr)
            if raise_on_error:
                return None
            sys.exit(1)

    msg = "ERROR: Max retries exceeded."
    print(msg, file=sys.stderr)
    if raise_on_error:
        return None
    sys.exit(1)


def count_words(text):
    """Count words in text."""
    return len(text.split())


def clean_content(text):
    """Strip navigation, images, boilerplate from extracted markdown for cleaner analysis.

    Applied during consolidation to reduce noise before EAV extraction.
    """
    # 1. Remove linked images: [![alt](img-url)](link-url)
    text = re.sub(r'\[!\[[^\]]*\]\([^\)]*\)\]\([^\)]*\)', '', text)
    # 2. Remove standalone images: ![alt](url)
    text = re.sub(r'!\[[^\]]*\]\([^\)]*\)', '', text)

    # 3. Remove navigation blocks: 3+ consecutive list items that are links
    lines = text.split('\n')
    cleaned_lines = []
    nav_buffer = []

    for line in lines:
        stripped = line.strip()
        is_nav_item = bool(re.match(r'^[*\-]\s+\[', stripped)) or bool(re.match(r'^\*\s+\[', stripped))

        if is_nav_item:
            nav_buffer.append(line)
        else:
            if len(nav_buffer) >= 3:
                pass  # drop navigation block
            else:
                cleaned_lines.extend(nav_buffer)
            nav_buffer = []
            cleaned_lines.append(line)

    if len(nav_buffer) < 3:
        cleaned_lines.extend(nav_buffer)

    text = '\n'.join(cleaned_lines)

    # 4. Remove high-link-density lines (3+ links = navigation/menu)
    lines = text.split('\n')
    lines = [l for l in lines if len(re.findall(r'\[[^\]]*\]\([^\)]*\)', l)) < 3]
    text = '\n'.join(lines)

    # 5. Convert markdown links to plain text: [text](url) → text
    text = re.sub(r'\[([^\]]*)\]\([^\)]*\)', r'\1', text)

    # 6. Remove boilerplate lines (Polish + generic UI patterns)
    boilerplate = re.compile(
        r'do koszyka|zaloguj się|zaloguj$|utwórz konto|załóż konto|cookie|'
        r'polityka prywatności|regulamin serwisu|'
        r'edytuj kod źródłowy|edytuj sekcję|edytuj linki|'
        r'strony specjalne|ostatnie zmiany|'
        r'prześlij plik|wersja do druku|'
        r'narzędzia osobiste|menu główne|'
        r'przejdź do zawartości|spis treści|'
        r'przypnij ukryj|przełącz podsekcję|przełącz stan|'
        r'linkujące|zmiany w linkowanych|'
        r'cytowanie tego|skrócony adres|pobierz kod qr|'
        r'utwórz książkę|pobierz jako pdf|'
        r'multimedia w wikimedia|hasło w wikisłowniku|'
        r'element wikidanych|w innych projektach|'
        r'wyszukaj produkt|brak podpowiedzi|pokaż wszystkie|'
        r'darmowa dostawa|zamknij menu|'
        r'^\s*zamknij\s*$|^\s*menu\s*$|^\s*szukaj\s*$|'
        r'portal pacjenta|umów wizytę|'
        r'zobacz pełną listę|katalog wszystkich|'
        r'strona główna$|poradnik o zdrowiu$|'
        r'aplikacja mobilna|zlecenia nfz|szczepienia online|'
        r'wspomóż wikipedię|dla wikipedystów|'
        r'nawigacja\s*$|dla czytelników\s*$|'
        r'^\s*\- \[x\]|'
        r'^\s*logowanie\s*$|^\s*wygląd\s*$|'
        r'^\s*\d+\s+języ',
        re.IGNORECASE
    )
    lines = text.split('\n')
    lines = [l for l in lines if not boilerplate.search(l)]

    # 7. Remove lines that are only separator characters
    lines = [l for l in lines if not re.match(r'^\s*[-=]{3,}\s*$', l)]

    # 8. Remove empty table rows and standalone pipe characters
    lines = [l for l in lines if not re.match(r'^\s*\|[\s\-|]*\|\s*$', l)]

    # 9. Remove very short lines (<=2 words) that look like UI fragments
    #    but keep headings (# ...) and legitimate short content
    def is_ui_fragment(line):
        s = line.strip()
        if not s or s.startswith('#'):
            return False
        words = s.split()
        if len(words) <= 2 and not any(c.isdigit() for c in s):
            # Short line without numbers - likely UI element
            # Keep if it has special chars suggesting data (units, ranges)
            if any(c in s for c in '°%±≤≥<>'):
                return False
            return True
        return False

    lines = [l for l in lines if not is_ui_fragment(l)]

    text = '\n'.join(lines)

    # 10. Collapse 3+ blank lines to 2
    text = re.sub(r'\n{3,}', '\n\n', text)

    return text.strip()


def truncate_content(content, max_words=1500):
    """Truncate content to max_words, preserving whole words."""
    words = content.split()
    if len(words) <= max_words:
        return content
    return ' '.join(words[:max_words]) + '\n\n[... treść skrócona do 1500 słów ...]'


def fetch_url_task(url, output_dir, index, total, rate_limiter):
    """Fetch a single URL, save to file, return result metadata.

    Returns dict with keys: url, filename, title, word_count, status, error
    """
    rate_limiter.wait()
    print(f"[{index}/{total}] {url}...", file=sys.stderr)

    result = {
        "url": url,
        "filename": None,
        "title": "",
        "word_count": 0,
        "status": "ERROR",
        "error": None,
    }

    data = fetch_url(url, raise_on_error=True)
    if data is None:
        result["error"] = "Fetch failed"
        print(f"  ERROR: fetch failed", file=sys.stderr)
        return result

    title = data.get("data", {}).get("title", "")
    content = data.get("data", {}).get("content", "")
    word_count = count_words(content)

    filename = sanitize_filename(url) + ".md"
    filepath = output_dir / filename

    md_content = f"# {title}\n\nSource: {url}\n\n{content}"
    filepath.write_text(md_content, encoding="utf-8")

    result["filename"] = filename
    result["title"] = title
    result["word_count"] = word_count

    if word_count < 200:
        result["status"] = "SKIP"
        print(f"  SKIP ({word_count} words < 200) → {filepath}", file=sys.stderr)
    else:
        result["status"] = "OK"
        print(f"  OK ({word_count} words) → {filepath}", file=sys.stderr)

    return result


def generate_quality_report(results, output_dir):
    """Generate _quality_report.txt with per-file stats and summary."""
    lines = []
    lines.append("# Quality Report")
    lines.append(f"# Generated: {time.strftime('%Y-%m-%d %H:%M:%S')}")
    lines.append(f"# Directory: {output_dir}")
    lines.append("")
    lines.append(f"{'Status':<8} {'Words':>6}  {'URL'}")
    lines.append(f"{'-'*8} {'-'*6}  {'-'*50}")

    ok_count = 0
    skip_count = 0
    error_count = 0
    total_words = 0

    for r in results:
        status = r["status"]
        words = r["word_count"]
        url = r["url"]
        lines.append(f"{status:<8} {words:>6}  {url}")

        if status == "OK":
            ok_count += 1
            total_words += words
        elif status == "SKIP":
            skip_count += 1
        else:
            error_count += 1

    lines.append("")
    lines.append(f"# Summary")
    lines.append(f"OK:    {ok_count}")
    lines.append(f"SKIP:  {skip_count} (< 200 words)")
    lines.append(f"ERROR: {error_count}")
    lines.append(f"Total words (OK only): {total_words}")

    if ok_count < 7:
        lines.append("")
        lines.append(f"WARNING: Only {ok_count} OK competitors (< 7). Analysis quality may be degraded.")

    report_path = output_dir / "_quality_report.txt"
    report_path.write_text('\n'.join(lines), encoding="utf-8")
    print(f"\nQuality report → {report_path}", file=sys.stderr)
    return report_path


def generate_consolidated(results, output_dir, max_words_per_competitor=1500):
    """Generate _consolidated.md with all OK competitor content in one file."""
    lines = []
    lines.append("# Consolidated Competitor Content")
    lines.append("")

    ok_results = [r for r in results if r["status"] == "OK"]

    if not ok_results:
        lines.append("No OK competitors to consolidate.")
        consolidated_path = output_dir / "_consolidated.md"
        consolidated_path.write_text('\n'.join(lines), encoding="utf-8")
        return consolidated_path

    lines.append(f"Competitors: {len(ok_results)} OK")
    lines.append("")

    for i, r in enumerate(ok_results, 1):
        filepath = output_dir / r["filename"]
        if not filepath.exists():
            continue

        full_content = filepath.read_text(encoding="utf-8")
        # Strip the "# title\n\nSource: url\n\n" header we added during save
        # and re-add in consolidated format
        # Find content after the header
        content_start = full_content.find("\n\n", full_content.find("\n\n") + 1)
        if content_start > 0:
            raw_content = full_content[content_start + 2:]
        else:
            raw_content = full_content

        cleaned = clean_content(raw_content)
        truncated = truncate_content(cleaned, max_words_per_competitor)

        lines.append(f"## K{i}: {r['title']}")
        lines.append(f"**Source:** {r['url']}")
        lines.append(f"**Words:** {r['word_count']}")
        lines.append("")
        lines.append(truncated)
        lines.append("")
        lines.append("---")
        lines.append("")

    consolidated_path = output_dir / "_consolidated.md"
    consolidated_path.write_text('\n'.join(lines), encoding="utf-8")
    print(f"Consolidated → {consolidated_path}", file=sys.stderr)
    return consolidated_path


def format_result(data):
    """Format Jina Reader response for display."""
    title = data.get("data", {}).get("title", "")
    content = data.get("data", {}).get("content", "")
    url = data.get("data", {}).get("url", "")

    print(f"\n{'='*60}")
    print(f"TITLE: {title}")
    print(f"URL: {url}")
    print(f"{'='*60}\n")
    print(content)


def main():
    parser = argparse.ArgumentParser(description="Jina Reader - URL to Markdown")
    parser.add_argument("url", nargs="?", help="URL to convert to markdown")
    parser.add_argument("--batch", help="File with URLs (one per line)")
    parser.add_argument("--output", default="data/competitor_content",
                        help="Output directory for batch mode (default: data/competitor_content)")
    parser.add_argument("--json", action="store_true", help="Output raw JSON")
    parser.add_argument("--no-consolidate", action="store_true",
                        help="Skip generating quality report and consolidated file")
    parser.add_argument("--workers", type=int, default=5,
                        help="Number of parallel workers for batch mode (default: 5)")
    args = parser.parse_args()

    if not args.url and not args.batch:
        parser.error("Provide a URL or use --batch with a file of URLs")

    # Single URL mode (unchanged behavior)
    if args.url:
        print(f"Fetching: {args.url}...", file=sys.stderr)
        data = fetch_url(args.url)

        if args.json:
            print(json.dumps(data, ensure_ascii=False, indent=2))
        else:
            format_result(data)
        return

    # Batch mode (parallel)
    if args.batch:
        batch_path = Path(args.batch)
        if not batch_path.exists():
            print(f"ERROR: File not found: {args.batch}")
            sys.exit(1)

        output_dir = Path(args.output)
        output_dir.mkdir(parents=True, exist_ok=True)

        urls = [line.strip() for line in batch_path.read_text().splitlines() if line.strip()]
        total = len(urls)

        # Rate limiter: 18 RPM without key (safety margin from 20), higher with key
        api_key = get_api_key()
        rpm = 200 if api_key else 18
        rate_limiter = RateLimiter(rpm)

        workers = min(args.workers, total)
        print(f"Processing {total} URLs → {output_dir}/ (parallel, {workers} workers, {rpm} RPM)", file=sys.stderr)

        results = []
        with ThreadPoolExecutor(max_workers=workers) as executor:
            futures = {
                executor.submit(fetch_url_task, url, output_dir, i, total, rate_limiter): url
                for i, url in enumerate(urls, 1)
            }
            for future in as_completed(futures):
                try:
                    result = future.result()
                    results.append(result)
                except Exception as e:
                    url = futures[future]
                    print(f"  EXCEPTION for {url}: {e}", file=sys.stderr)
                    results.append({
                        "url": url, "filename": None, "title": "",
                        "word_count": 0, "status": "ERROR", "error": str(e),
                    })

        # Sort results by original URL order
        url_order = {url: i for i, url in enumerate(urls)}
        results.sort(key=lambda r: url_order.get(r["url"], 999))

        ok = sum(1 for r in results if r["status"] == "OK")
        skip = sum(1 for r in results if r["status"] == "SKIP")
        err = sum(1 for r in results if r["status"] == "ERROR")
        print(f"\nDone. {ok} OK, {skip} SKIP, {err} ERROR → {output_dir}/", file=sys.stderr)

        if not args.no_consolidate:
            generate_quality_report(results, output_dir)
            generate_consolidated(results, output_dir)


if __name__ == "__main__":
    main()
