#!/usr/bin/env python3
"""
NodeHub Query Fanout - keyword variants with types and SERP titles via NodeHub API

Usage:
    python3 query_fanout.py "KEYWORD" [hl] [gl] [--output PATH]

Arguments:
    keyword   - Seed keyword (required)
    hl        - Language code (default: pl)
    gl        - Country code (default: pl)
    --output  - Output JSON path (default: data/briefs/[slug]/00_query_fanout.json)
    --json    - Print raw JSON to stdout

Examples:
    python3 query_fanout.py "pozycjonowanie sklepu"
    python3 query_fanout.py "pressure washer" en us
    python3 query_fanout.py "baseny ogrodowe" --output /tmp/fanout.json

Requires:
    NODESHUB_API_KEY in .env
    pip install requests python-dotenv
"""

import os
import sys
import json
import re
import time
import argparse
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

# Load .env from project root (3 levels up: skills/nodeshub-search -> skills -> .claude -> root)
env_path = Path(__file__).resolve().parents[3] / ".env"
load_dotenv(env_path)

API_BASE = "https://api.nodeshub.io/v1/query-fanout"

# Mapping: API variant type → Frame Semantics element + priority
TYPE_FRAME_MAP = {
    "specification":    {"frame_element": "Instrument / Quantity / Condition", "priority": "ROOT"},
    "reformulation":    {"frame_element": "Synonymy / Alternative CSI",        "priority": "ROOT"},
    "implicit":         {"frame_element": "Purpose / Result / Beneficiary",    "priority": "ROOT"},
    "comparative":      {"frame_element": "Comparison / Negation",             "priority": "RARE"},
    "entity_expanded":  {"frame_element": "CE powiązane / Location",           "priority": "RARE"},
    "follow_up":        {"frame_element": "Cause / Time / Manner",             "priority": "OUTER"},
}


def get_api_key():
    key = os.environ.get("NODESHUB_API_KEY")
    if not key:
        print("ERROR: NODESHUB_API_KEY not found. Add it to .env file.")
        sys.exit(1)
    return key


def slugify(text):
    text = text.lower()
    # Polish chars
    replacements = {
        "ą": "a", "ć": "c", "ę": "e", "ł": "l", "ń": "n",
        "ó": "o", "ś": "s", "ź": "z", "ż": "z",
    }
    for src, dst in replacements.items():
        text = text.replace(src, dst)
    text = re.sub(r"[^a-z0-9]+", "_", text)
    text = text.strip("_")
    return text


def query_fanout(keyword, hl="pl", gl="pl", max_retries=3):
    api_key = get_api_key()
    headers = {"Authorization": f"Bearer {api_key}"}
    params = {
        "keyword": keyword,
        "hl": hl,
        "mode": "standard",
        "add_questions": "true",
        "add_topic_leaders": "false",
        "include_reasoning": "false",
    }

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


def print_variants_table(data):
    """Print formatted table of variants for Claude to consume."""
    variants = data.get("generated_variants", [])
    top_titles = data.get("top_titles", [])
    keyword = data.get("keyword", "")

    print(f"\n{'='*70}")
    print(f"QUERY FANOUT: {keyword}")
    print(f"{'='*70}")

    if variants:
        print(f"\n--- WARIANTY KEYWORD ({len(variants)}) ---\n")
        print(f"  {'#':<3} {'Keyword':<40} {'Typ':<18} {'Conf':>6}  Priorytet / Frame")
        print(f"  {'-'*3} {'-'*40} {'-'*18} {'-'*6}  {'-'*30}")
        for i, v in enumerate(variants, 1):
            kw = v.get("keyword", "")
            vtype = v.get("type", "unknown")
            conf = v.get("confidence", 0)
            conf_pct = f"{conf:.0%}" if isinstance(conf, float) else str(conf)

            frame_info = TYPE_FRAME_MAP.get(vtype, {"frame_element": "—", "priority": "—"})
            priority = frame_info["priority"]
            frame_el = frame_info["frame_element"]

            # Confidence-based priority override
            if isinstance(conf, float):
                if conf >= 0.85:
                    p_label = "P1"
                elif conf >= 0.75:
                    p_label = "P2"
                else:
                    p_label = "P3"
            else:
                p_label = "P?"

            print(f"  {i:<3} {kw:<40} {vtype:<18} {conf_pct:>6}  {p_label} / {priority} [{frame_el}]")
        print()

    if top_titles:
        print(f"--- TOP SERP TITLES ({len(top_titles)}) ---\n")
        for i, t in enumerate(top_titles, 1):
            print(f"  {i}. {t}")
        print()

    total = len(variants)
    by_type = {}
    for v in variants:
        t = v.get("type", "unknown")
        by_type[t] = by_type.get(t, 0) + 1
    if by_type:
        summary_parts = [f"{t}: {n}" for t, n in sorted(by_type.items())]
        print(f"Typy: {', '.join(summary_parts)}")

    resp_time = data.get("totalResponseTime")
    if resp_time:
        print(f"Response time: {resp_time}ms")


def resolve_output_path(keyword, output_arg):
    """Resolve output JSON path, creating parent dirs if needed."""
    if output_arg:
        path = Path(output_arg)
    else:
        slug = slugify(keyword)
        # Resolve relative to project root (3 levels up from this script)
        project_root = Path(__file__).resolve().parents[3]
        path = project_root / "data" / "briefs" / slug / "00_query_fanout.json"

    path.parent.mkdir(parents=True, exist_ok=True)
    return path


def main():
    parser = argparse.ArgumentParser(description="NodeHub Query Fanout API")
    parser.add_argument("keyword", help="Seed keyword")
    parser.add_argument("hl", nargs="?", default="pl", help="Language (default: pl)")
    parser.add_argument("gl", nargs="?", default="pl", help="Country (default: pl)")
    parser.add_argument("--output", help="Output JSON path (overrides default data/briefs/[slug]/00_query_fanout.json)")
    parser.add_argument("--json", action="store_true", help="Print raw JSON to stdout (still saves file)")
    args = parser.parse_args()

    print(f"Query fanout: '{args.keyword}' (hl={args.hl}, gl={args.gl})...")
    data = query_fanout(args.keyword, args.hl, args.gl)

    # Save JSON
    out_path = resolve_output_path(args.keyword, args.output)
    with open(out_path, "w", encoding="utf-8") as f:
        json.dump(data, f, ensure_ascii=False, indent=2)
    print(f"Zapisano: {out_path}")

    if args.json:
        print(json.dumps(data, ensure_ascii=False, indent=2))
    else:
        print_variants_table(data)


if __name__ == "__main__":
    main()
