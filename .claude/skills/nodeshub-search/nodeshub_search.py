#!/usr/bin/env python3
"""
NodeHub Search - Google SERP results via NodeHub API (nodeshub.io)

Usage:
    python3 nodeshub_search.py "KEYWORD" [hl] [gl]

Arguments:
    keyword  - Search query (required)
    hl       - Language code (default: pl)
    gl       - Country code (default: pl)

Examples:
    python3 nodeshub_search.py "baseny ogrodowe"
    python3 nodeshub_search.py "pressure washer" en us

Requires:
    NODESHUB_API_KEY in .env
    pip install requests python-dotenv
"""

import os
import sys
import json
import time
import argparse
import urllib.parse
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

API_BASE = "https://api.nodeshub.io/v1/search"


def get_api_key():
    key = os.environ.get("NODESHUB_API_KEY")
    if not key:
        print("ERROR: NODESHUB_API_KEY not found. Add it to .env file.")
        sys.exit(1)
    return key


def search(keyword, hl="pl", gl="pl", max_retries=3):
    api_key = get_api_key()
    headers = {"Authorization": f"Bearer {api_key}"}
    params = {"keyword": keyword, "hl": hl, "gl": gl}

    for attempt in range(max_retries):
        try:
            resp = requests.get(API_BASE, headers=headers, params=params, timeout=30)
            if resp.status_code == 200:
                return resp.json()
            elif resp.status_code == 429:
                wait = 2 ** (attempt + 1)
                print(f"Rate limited. Waiting {wait}s...")
                time.sleep(wait)
            else:
                print(f"ERROR: API returned {resp.status_code}: {resp.text}")
                sys.exit(1)
        except requests.exceptions.Timeout:
            if attempt < max_retries - 1:
                print(f"Timeout. Retrying ({attempt + 2}/{max_retries})...")
                time.sleep(2)
            else:
                print("ERROR: API timeout after all retries.")
                sys.exit(1)
        except requests.exceptions.RequestException as e:
            print(f"ERROR: Request failed: {e}")
            sys.exit(1)

    print("ERROR: Max retries exceeded.")
    sys.exit(1)


def format_results(data):
    results = data.get("data", {}).get("results", {})
    if not results.get("success"):
        print("ERROR: Search was not successful.")
        return

    query = results.get("query", "")
    snippets = results.get("snippets", {})
    organic = results.get("organic_results", [])

    print(f"\n{'='*60}")
    print(f"QUERY: {query}")
    print(f"{'='*60}")

    # Organic results
    if organic:
        print(f"\n--- ORGANIC RESULTS ({len(organic)}) ---\n")
        for r in organic:
            pos = r.get("pos", "?")
            title = r.get("title", "")
            url = r.get("url", "")
            domain = r.get("domain", "")
            desc = r.get("description", "")
            print(f"  {pos}. {title}")
            print(f"     {url}")
            if desc:
                print(f"     {desc[:200]}")
            print()

    # People Also Ask
    paa = snippets.get("people_also_ask", {})
    questions = paa.get("questions", [])
    if questions:
        print(f"--- PEOPLE ALSO ASK ({len(questions)}) ---\n")
        for q in questions:
            print(f"  - {q.get('text', '')}")
        print()

    # Related Searches
    related = snippets.get("related_searches", {})
    queries = related.get("queries", [])
    if queries:
        print(f"--- RELATED SEARCHES ({len(queries)}) ---\n")
        for q in queries:
            print(f"  - {q}")
        print()

    # Refine Chips
    chips = snippets.get("refine_chips", {})
    items = chips.get("items", [])
    if items:
        print(f"--- REFINE CHIPS ({len(items)}) ---\n")
        chip_texts = [item.get("text", "") for item in items if item.get("text")]
        print(f"  {', '.join(chip_texts)}")
        print()

    # Videos
    videos_pack = snippets.get("videos_pack", [])
    if videos_pack:
        videos = videos_pack[0].get("videos", []) if videos_pack else []
        if videos:
            print(f"--- VIDEOS ({len(videos)}) ---\n")
            for v in videos:
                title = v.get("title", "")
                channel = v.get("channel", "")
                url = v.get("url", "")
                print(f"  - {title} ({channel})")
                print(f"    {url}")
            print()

    # Filter Sidebar
    sidebar = snippets.get("filter_sidebar", {})
    categories = sidebar.get("categories", [])
    if categories:
        print(f"--- FILTER CATEGORIES ({len(categories)}) ---\n")
        for cat in categories:
            title = cat.get("title", "")
            options = cat.get("options", [])
            print(f"  {title}: {', '.join(options)}")
        print()

    # Answer Box
    answer_box = snippets.get("answer_box", [])
    if answer_box:
        print("--- ANSWER BOX ---\n")
        for ab in answer_box:
            print(f"  {json.dumps(ab, ensure_ascii=False)}")
        print()

    # Snippets found summary
    found = results.get("snippets_found", [])
    if found:
        print(f"--- SNIPPETS FOUND: {', '.join(found)} ---")

    # Response time
    resp_time = data.get("totalResponseTime")
    if resp_time:
        print(f"\nResponse time: {resp_time}ms")


def main():
    parser = argparse.ArgumentParser(description="NodeHub Google Search API")
    parser.add_argument("keyword", help="Search query")
    parser.add_argument("hl", nargs="?", default="pl", help="Language (default: pl)")
    parser.add_argument("gl", nargs="?", default="pl", help="Country (default: pl)")
    parser.add_argument("--json", action="store_true", help="Output raw JSON")
    args = parser.parse_args()

    print(f"Searching: '{args.keyword}' (hl={args.hl}, gl={args.gl})...")
    data = search(args.keyword, args.hl, args.gl)

    if args.json:
        print(json.dumps(data, ensure_ascii=False, indent=2))
    else:
        format_results(data)


if __name__ == "__main__":
    main()
