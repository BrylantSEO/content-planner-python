#!/usr/bin/env python3
"""
Content Planner Pipeline — Standalone
======================================
Pipeline planowania treści zoptymalizowanej pod AI Search i semantyczne SEO.

Użycie:
    python3 content_planner.py "TEMAT ARTYKUŁU" "SOURCE CONTEXT"
    python3 content_planner.py "pozycjonowanie sklepu" "Agencja SEO dla e-commerce"
    python3 content_planner.py "TEMAT" "SC" --lang pl --country pl --output-dir ./briefs

Argumenty:
    topic           Temat artykułu (wymagany)
    source_context  Kontekst serwisu / biznesu (wymagany)
    --lang          Język SERP (domyślnie: pl)
    --country       Kraj SERP (domyślnie: pl)
    --output-dir    Katalog główny dla danych (domyślnie: data/briefs)
    --no-resume     Pomiń wznawianie i uruchom pipeline od nowa
    --llm-only      Pomiń SERP/Jina, użyj tylko LLM

Wymagane pakiety:
    pip install requests python-dotenv

Zmienne środowiskowe (.env lub system):
    OPENROUTER_API_KEY   — wymagany (LLM via OpenRouter)
    NODESHUB_API_KEY     — wymagany dla SERP (NodeHub)
    JINA_API_KEY         — opcjonalny (bez klucza: 20 RPM)
"""

import os
import sys
import json
import re
import time
import argparse
import threading
from collections import Counter
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

# ─── Załaduj .env ─────────────────────────────────────────────────────────────
# Szuka .env w katalogu skryptu, potem w bieżącym katalogu
_env_candidates = [Path(__file__).parent / ".env", Path(".env")]
for _ep in _env_candidates:
    if _ep.exists():
        load_dotenv(_ep)
        break

# ─── Konfiguracja ─────────────────────────────────────────────────────────────
OPENROUTER_API_KEY = os.environ.get("OPENROUTER_API_KEY", "")
NODESHUB_API_KEY   = os.environ.get("NODESHUB_API_KEY", "")
JINA_API_KEY       = os.environ.get("JINA_API_KEY", "")

LLM_MODEL         = "anthropic/claude-sonnet-4-6"
LLM_MAX_TOKENS    = 8000
OPENROUTER_BASE   = "https://openrouter.ai/api/v1/chat/completions"

NODESHUB_SEARCH_URL  = "https://api.nodeshub.io/v1/search"
NODESHUB_FANOUT_URL  = "https://api.nodeshub.io/v1/query-fanout"
JINA_BASE            = "https://r.jina.ai/"

# ─── Helpers ──────────────────────────────────────────────────────────────────

def slugify(text: str) -> str:
    pl = {"ą":"a","ć":"c","ę":"e","ł":"l","ń":"n","ó":"o","ś":"s","ź":"z","ż":"z"}
    t = text.lower()
    for k, v in pl.items():
        t = t.replace(k, v)
    t = re.sub(r"[^a-z0-9]+", "_", t)
    return t.strip("_")[:60]


def read_file(path: Path) -> str:
    return path.read_text(encoding="utf-8") if path.exists() else ""


def write_file(path: Path, content: str):
    path.parent.mkdir(parents=True, exist_ok=True)
    path.write_text(content, encoding="utf-8")
    print(f"  → Zapisano: {path}")


def log(msg: str):
    print(f"\n{'─'*60}\n{msg}")


# ─── LLM (OpenRouter) ─────────────────────────────────────────────────────────

def llm_call(system: str, user: str, model: str = LLM_MODEL,
             max_tokens: int = LLM_MAX_TOKENS) -> str:
    """Wywołuje LLM przez OpenRouter API. Zwraca odpowiedź jako string."""
    if not OPENROUTER_API_KEY:
        print("ERROR: OPENROUTER_API_KEY nie ustawiony. Dodaj do .env")
        sys.exit(1)

    headers = {
        "Authorization": f"Bearer {OPENROUTER_API_KEY}",
        "Content-Type": "application/json",
        "HTTP-Referer": "https://github.com/semantic-os",
        "X-Title": "Content Planner Pipeline",
    }
    payload = {
        "model": model,
        "max_tokens": max_tokens,
        "messages": [
            {"role": "system", "content": system},
            {"role": "user",   "content": user},
        ],
    }

    for attempt in range(3):
        try:
            resp = requests.post(OPENROUTER_BASE, headers=headers,
                                 json=payload, timeout=120)
            if resp.status_code == 200:
                data = resp.json()
                return data["choices"][0]["message"]["content"]
            elif resp.status_code == 429:
                wait = 2 ** (attempt + 2)
                print(f"  Rate limited. Czekam {wait}s...")
                time.sleep(wait)
            else:
                print(f"  LLM ERROR {resp.status_code}: {resp.text[:300]}")
                sys.exit(1)
        except requests.exceptions.Timeout:
            print(f"  LLM timeout. Próba {attempt + 2}/3...")
            time.sleep(5)
        except Exception as e:
            print(f"  LLM błąd: {e}")
            sys.exit(1)
    print("ERROR: LLM max retries exceeded.")
    sys.exit(1)


# ─── NodeHub Query Fanout ─────────────────────────────────────────────────────

_TYPE_FRAME_MAP = {
    "specification":   {"frame": "Instrument/Quantity/Condition", "priority": "ROOT"},
    "reformulation":   {"frame": "Synonymy/Alternative CSI",      "priority": "ROOT"},
    "implicit":        {"frame": "Purpose/Result/Beneficiary",    "priority": "ROOT"},
    "comparative":     {"frame": "Comparison/Negation",           "priority": "RARE"},
    "entity_expanded": {"frame": "CE powiązane/Location",         "priority": "RARE"},
    "follow_up":       {"frame": "Cause/Time/Manner",             "priority": "OUTER"},
}


def nodeshub_query_fanout(keyword: str, hl: str = "pl", gl: str = "pl") -> dict | None:
    if not NODESHUB_API_KEY:
        print("  WARN: NODESHUB_API_KEY brak — pomijam query fanout")
        return None
    params = {"keyword": keyword, "hl": hl, "mode": "standard",
              "add_questions": "true", "add_topic_leaders": "false",
              "include_reasoning": "false"}
    for attempt in range(3):
        try:
            resp = requests.get(
                NODESHUB_FANOUT_URL,
                headers={"Authorization": f"Bearer {NODESHUB_API_KEY}"},
                params=params, timeout=30
            )
            if resp.status_code == 200:
                return resp.json()
            elif resp.status_code == 429:
                time.sleep(2 ** (attempt + 1))
            else:
                print(f"  NodeHub fanout ERROR {resp.status_code}")
                return None
        except Exception as e:
            print(f"  NodeHub fanout błąd: {e}")
            return None
    return None


def format_fanout(data: dict) -> str:
    variants = data.get("generated_variants", [])
    top_titles = data.get("top_titles", [])
    lines = [f"## Query Fanout: {data.get('keyword', '')}",
             "", f"### Warianty ({len(variants)})", ""]
    for v in variants:
        kw = v.get("keyword", "")
        vtype = v.get("type", "")
        conf = v.get("confidence", 0)
        conf_pct = f"{conf:.0%}" if isinstance(conf, float) else str(conf)
        fi = _TYPE_FRAME_MAP.get(vtype, {"frame": "—", "priority": "—"})
        p = "P1" if isinstance(conf, float) and conf >= 0.85 else "P2" if isinstance(conf, float) and conf >= 0.75 else "P3"
        lines.append(f"- **{kw}** ({vtype}, {conf_pct}) → {p}/{fi['priority']} [{fi['frame']}]")
    if top_titles:
        lines += ["", f"### Top SERP Titles ({len(top_titles)})"]
        for i, t in enumerate(top_titles, 1):
            lines.append(f"{i}. {t}")
    return "\n".join(lines)


# ─── NodeHub SERP ─────────────────────────────────────────────────────────────

def nodeshub_search(keyword: str, hl: str = "pl", gl: str = "pl") -> dict | None:
    if not NODESHUB_API_KEY:
        print("  WARN: NODESHUB_API_KEY brak — pomijam SERP")
        return None
    for attempt in range(3):
        try:
            resp = requests.get(
                NODESHUB_SEARCH_URL,
                headers={"Authorization": f"Bearer {NODESHUB_API_KEY}"},
                params={"keyword": keyword, "hl": hl, "gl": gl},
                timeout=30
            )
            if resp.status_code == 200:
                return resp.json()
            elif resp.status_code == 429:
                time.sleep(2 ** (attempt + 1))
            else:
                print(f"  NodeHub search ERROR {resp.status_code}")
                return None
        except Exception as e:
            print(f"  NodeHub search błąd: {e}")
            return None
    return None


def extract_serp_data(data: dict) -> dict:
    """Wyciąga organic URLs, PAA, Related Searches z odpowiedzi NodeHub."""
    results = data.get("data", {}).get("results", {})
    snippets = results.get("snippets", {})
    organic = results.get("organic_results", [])

    urls = [r.get("url", "") for r in organic if r.get("url")]
    paa = [q.get("text", "") for q in snippets.get("people_also_ask", {}).get("questions", [])]
    related = snippets.get("related_searches", {}).get("queries", [])
    chips = [i.get("text", "") for i in snippets.get("refine_chips", {}).get("items", [])]

    return {"urls": urls[:10], "paa": paa, "related": related, "chips": chips,
            "organic": organic}


def format_serp_summary(serp: dict) -> str:
    lines = ["## SERP Overview", ""]
    if serp["organic"]:
        lines += ["### Organic Results", ""]
        for r in serp["organic"][:10]:
            lines.append(f"{r.get('pos', '?')}. [{r.get('title','')}]({r.get('url','')})")
    if serp["paa"]:
        lines += ["", "### People Also Ask", ""]
        lines += [f"- {q}" for q in serp["paa"]]
    if serp["related"]:
        lines += ["", "### Related Searches", ""]
        lines += [f"- {q}" for q in serp["related"]]
    if serp["chips"]:
        lines += ["", f"### Refine Chips: {', '.join(serp['chips'])}"]
    return "\n".join(lines)


# ─── Jina Reader ──────────────────────────────────────────────────────────────

class _RateLimiter:
    def __init__(self, rpm):
        self.interval = 60.0 / rpm
        self.lock = threading.Lock()
        self.last = 0.0

    def wait(self):
        with self.lock:
            now = time.monotonic()
            w = self.last + self.interval - now
            if w > 0:
                time.sleep(w)
            self.last = time.monotonic()


def _sanitize_filename(url: str) -> str:
    name = re.sub(r"https?://", "", url)
    name = re.sub(r"[^a-zA-Z0-9_-]", "_", name)
    name = re.sub(r"_+", "_", name)
    return name.strip("_")[:100]


def _clean_content(text: str) -> str:
    text = re.sub(r'\[!\[[^\]]*\]\([^\)]*\)\]\([^\)]*\)', '', text)
    text = re.sub(r'!\[[^\]]*\]\([^\)]*\)', '', text)
    lines = text.split('\n')
    cleaned, nav_buf = [], []
    for line in lines:
        s = line.strip()
        is_nav = bool(re.match(r'^[*\-]\s+\[', s))
        if is_nav:
            nav_buf.append(line)
        else:
            if len(nav_buf) < 3:
                cleaned.extend(nav_buf)
            nav_buf = []
            cleaned.append(line)
    if len(nav_buf) < 3:
        cleaned.extend(nav_buf)
    text = '\n'.join(cleaned)
    lines = [l for l in text.split('\n') if len(re.findall(r'\[[^\]]*\]\([^\)]*\)', l)) < 3]
    text = '\n'.join(lines)
    text = re.sub(r'\[([^\]]*)\]\([^\)]*\)', r'\1', text)
    boiler = re.compile(
        r'do koszyka|zaloguj się|cookie|polityka prywatności|regulamin|'
        r'edytuj kod|edytuj sekcję|strony specjalne|ostatnie zmiany|'
        r'^\s*zamknij\s*$|^\s*menu\s*$|^\s*szukaj\s*$|^\s*logowanie\s*$',
        re.IGNORECASE
    )
    lines = [l for l in text.split('\n') if not boiler.search(l)]
    lines = [l for l in lines if not re.match(r'^\s*[-=]{3,}\s*$', l)]
    text = '\n'.join(lines)
    text = re.sub(r'\n{3,}', '\n\n', text)
    return text.strip()


def _truncate_content(text: str, max_words: int = 1500) -> str:
    words = text.split()
    if len(words) <= max_words:
        return text
    return ' '.join(words[:max_words]) + '\n\n[... treść skrócona do 1500 słów ...]'


def _jina_fetch_single(url: str) -> dict | None:
    headers = {"Accept": "application/json", "X-Return-Format": "markdown"}
    if JINA_API_KEY:
        headers["Authorization"] = f"Bearer {JINA_API_KEY}"
    for attempt in range(3):
        try:
            resp = requests.get(f"{JINA_BASE}{url}", headers=headers, timeout=60)
            if resp.status_code == 200:
                return resp.json()
            elif resp.status_code == 429:
                time.sleep(2 ** (attempt + 1))
            else:
                return None
        except Exception:
            time.sleep(2)
    return None


def _jina_fetch_task(url, output_dir, idx, total, rl):
    rl.wait()
    print(f"  [{idx}/{total}] {url[:70]}...", file=sys.stderr)
    result = {"url": url, "filename": None, "title": "", "word_count": 0,
              "status": "ERROR", "error": None}
    data = _jina_fetch_single(url)
    if not data:
        result["error"] = "fetch failed"
        return result
    title   = data.get("data", {}).get("title", "")
    content = data.get("data", {}).get("content", "")
    wc      = len(content.split())
    fname   = _sanitize_filename(url) + ".md"
    fpath   = output_dir / fname
    fpath.write_text(f"# {title}\n\nSource: {url}\n\n{content}", encoding="utf-8")
    result.update({"filename": fname, "title": title, "word_count": wc,
                   "status": "OK" if wc >= 200 else "SKIP"})
    print(f"  {'OK' if wc >= 200 else 'SKIP'} ({wc} words)", file=sys.stderr)
    return result


def jina_batch_fetch(urls: list, output_dir: Path, workers: int = 5) -> list:
    rpm = 200 if JINA_API_KEY else 18
    rl  = _RateLimiter(rpm)
    total = len(urls)
    results = []
    with ThreadPoolExecutor(max_workers=min(workers, total)) as ex:
        futures = {ex.submit(_jina_fetch_task, url, output_dir, i, total, rl): url
                   for i, url in enumerate(urls, 1)}
        for f in as_completed(futures):
            try:
                results.append(f.result())
            except Exception as e:
                results.append({"url": futures[f], "filename": None, "title": "",
                                "word_count": 0, "status": "ERROR", "error": str(e)})
    url_order = {url: i for i, url in enumerate(urls)}
    results.sort(key=lambda r: url_order.get(r["url"], 999))
    return results


def build_consolidated(results: list, output_dir: Path) -> Path:
    ok = [r for r in results if r["status"] == "OK"]
    lines = ["# Consolidated Competitor Content", "", f"Competitors: {len(ok)} OK", ""]
    for i, r in enumerate(ok, 1):
        fpath = output_dir / r["filename"]
        if not fpath.exists():
            continue
        raw = fpath.read_text(encoding="utf-8")
        # strip header
        pos = raw.find("\n\n", raw.find("\n\n") + 1)
        raw = raw[pos + 2:] if pos > 0 else raw
        cleaned = _clean_content(raw)
        truncated = _truncate_content(cleaned, 1500)
        lines += [f"## K{i}: {r['title']}", f"**Source:** {r['url']}", "",
                  truncated, "", "---", ""]
    out = output_dir / "_consolidated.md"
    out.write_text('\n'.join(lines), encoding="utf-8")
    return out


def build_quality_report(results: list, output_dir: Path) -> Path:
    ok_c = sum(1 for r in results if r["status"] == "OK")
    skip_c = sum(1 for r in results if r["status"] == "SKIP")
    err_c = sum(1 for r in results if r["status"] == "ERROR")
    lines = ["# Quality Report", f"OK: {ok_c}", f"SKIP: {skip_c}", f"ERROR: {err_c}"]
    if ok_c < 7:
        lines.append(f"WARNING: tylko {ok_c} OK konkurentów (< 7). Jakość analizy obniżona.")
    for r in results:
        lines.append(f"{r['status']:<8} {r['word_count']:>6}  {r['url']}")
    out = output_dir / "_quality_report.txt"
    out.write_text('\n'.join(lines), encoding="utf-8")
    return out


# ─── Classify URR (deterministyczny) ─────────────────────────────────────────

def _is_covered(val: str) -> bool:
    v = str(val).strip().lower()
    if not v or v in {"", "-", "—", "–", "brak", "no", "0", "false", "n/a", "nd"}:
        return False
    return True


def _classify_urr_val(coverage: int, n: int) -> str:
    if n == 0:
        return "—"
    if coverage >= 5:
        return "ROOT"
    elif 3 <= coverage <= 4:
        return "RARE"
    return "UNIQUE"


def classify_urr_from_markdown(md_text: str) -> str:
    """Parsuje EAV Matrix z Markdown i dodaje kolumnę typ_urr."""
    lines = md_text.splitlines()
    table_lines = []
    for line in lines:
        s = line.strip()
        if s.startswith("|") and "|" in s[1:]:
            table_lines.append(s)

    if len(table_lines) < 3:
        return "Brak tabeli EAV do klasyfikacji URR."

    def split_row(l):
        return [c.strip() for c in l.strip("|").split("|")]

    headers = split_row(table_lines[0])
    rows = [split_row(l) for l in table_lines[2:] if not re.match(r'^\|[-| :]+\|$', l)]

    # Wykryj kolumnę atrybutu i kolumny konkurentów
    attr_col = 0
    for i, h in enumerate(headers):
        if h.lower() in {"atrybut", "attribute", "attr", "nazwa", "name", "element"}:
            attr_col = i
            break
    excluded = {"atrybut", "attribute", "attr", "nazwa", "name", "element",
                "typ", "urr", "typ_urr", "priorytet", "coverage", "n", "gap", "status"}
    comp_cols = [i for i, h in enumerate(headers) if i != attr_col and h.lower() not in excluded]
    n = len(comp_cols)

    results = []
    for row in rows:
        if not row or len(row) <= attr_col:
            continue
        attr = row[attr_col].strip()
        if not attr or attr.startswith("-"):
            continue
        cov = sum(1 for ci in comp_cols if ci < len(row) and _is_covered(row[ci]))
        urr = _classify_urr_val(cov, n)
        prio = {"UNIQUE": "Lead/H2", "ROOT": "H2", "RARE": "H3/FAQ"}.get(urr, "—")
        results.append((attr, cov, n, urr, prio))

    if not results:
        return "Brak danych do klasyfikacji."

    out_lines = [
        "| Atrybut | Coverage | N | typ_urr | Priorytet |",
        "|---------|----------|---|---------|-----------|",
    ]
    for attr, cov, n, urr, prio in results:
        out_lines.append(f"| {attr} | {cov}/{n} | {n} | **{urr}** | {prio} |")
    counts = Counter(r[3] for r in results)
    out_lines += ["", f"**Łącznie:** {len(results)} — ROOT: {counts.get('ROOT',0)}, "
                     f"RARE: {counts.get('RARE',0)}, UNIQUE: {counts.get('UNIQUE',0)}"]
    return "\n".join(out_lines)



# ════════════════════════════════════════════════════════════════════════════════
# PIPELINE STEPS
# ════════════════════════════════════════════════════════════════════════════════

def step0_query_fanout(topic: str, output_dir: Path, lang: str, country: str) -> dict | None:
    out_file = output_dir / "00_query_fanout.json"
    if out_file.exists():
        print("  [pomiń] 00_query_fanout.json istnieje")
        with open(out_file) as f:
            return json.load(f)

    log("KROK 0: Query Fanout")
    data = nodeshub_query_fanout(topic, lang, country)
    if data:
        write_file(out_file, json.dumps(data, ensure_ascii=False, indent=2))
        print(format_fanout(data))
        return data
    else:
        print("  Query fanout niedostępny — kontynuuję bez.")
        return None



def step1_topic_research(topic: str, source_context: str, output_dir: Path,
                         fanout_data: dict | None) -> str:
    out_file = output_dir / "01_topic_research.md"
    if out_file.exists():
        print("  [pomiń] 01_topic_research.md istnieje")
        return read_file(out_file)

    log("KROK 1: Topic Research (semantic analysis)")

    fanout_section = format_fanout(fanout_data) if fanout_data else ""

    system = """Jesteś ekspertem semantycznego SEO i AI Search optimization.
Twoje analizy są precyzyjne, konkretne i operacyjne — gotowe do użycia przez copywritera."""

    user = f"""Przeprowadź pełny research semantyczny dla artykułu.

**TEMAT:** {topic}
**SOURCE CONTEXT (SC):** {source_context}

{f"**DANE QUERY FANOUT:**\\n{fanout_section}" if fanout_section else ""}

Wykonaj dokładnie te 4 zadania i zapisz w podanym formacie Markdown:

---

## 1. Definicja CSI

Zdefiniuj:
- **Central Entity (CE):** główna encja artykułu
- **Source Context (SC):** kontekst serwisu/biznesu (użyj podanego SC)
- **Central Search Intent (CSI):** 1-2 zdania opisujące intencję użytkownika

---

## 2. Ramka semantyczna

Wygeneruj min. 12 elementów ramki semantycznej (Frame Semantics). Dla każdego elementu:
- Nazwa elementu (Agent, Patient, Instrument, Purpose, Cause, Result, Location, Time, Manner, Beneficiary, Source, Quantity, Condition, Comparison, Negation)
- Konkretna wartość dla tego tematu
- 1-2 sub-queries które ten element generuje

Format tabeli Markdown:
| Element | Wartość | Sub-queries |

---

## 3. Query Fanout (sub-queries)

Lista 7-12 konkretnych sub-queries które AI Search wygeneruje dla tego tematu.
Każde sub-query z tagiem: [CONFIRMED] (jeśli pokryte przez fanout API) lub [PREDICTED]
i priorytetem P1/P2/P3.

Format:
- P1 [CONFIRMED] sub-query tekst
- P2 [PREDICTED] sub-query tekst

---

## 4. Rozszerzenie terminologii

Min. 6 relacji leksykalnych dla głównej encji:
- **Synonimy:** lista
- **Hiponimy:** (bardziej szczegółowe pojęcia)
- **Hiperonimy:** (pojęcia nadrzędne)
- **Meronimy:** (części składowe)
- **Antonimy/Negacje:** lista
- **Related terms:** powiązane pojęcia branżowe

---

Walidacja:
- [ ] CSI zdefiniowane
- [ ] Min 12 elementów ramki z sub-queries
- [ ] Min 7 sub-queries z priorytetami
- [ ] Min 6 relacji leksykalnych"""

    result = llm_call(system, user)
    write_file(out_file, result)
    return result


def step2_competitor_analysis(topic: str, output_dir: Path,
                               topic_research: str, lang: str, country: str,
                               llm_only: bool = False) -> str:
    out_file = output_dir / "02_competitor_analysis.md"
    if out_file.exists():
        print("  [pomiń] 02_competitor_analysis.md istnieje")
        return read_file(out_file)

    log("KROK 2: Competitor Gap Analysis")

    competitors_dir = output_dir / "competitors"
    consolidated_file = competitors_dir / "_consolidated.md"
    urls_file = output_dir / "urls.txt"

    serp_summary = ""
    consolidated_content = ""

    # 2.1 SERP fetch
    if not llm_only and not consolidated_file.exists():
        print("  2.1 NodeHub SERP fetch...")
        serp_data = nodeshub_search(topic, lang, country)
        if serp_data:
            serp = extract_serp_data(serp_data)
            serp_summary = format_serp_summary(serp)
            if serp["urls"]:
                write_file(urls_file, "\n".join(serp["urls"]))
                print(f"  Znaleziono {len(serp['urls'])} URLs")
        else:
            print("  SERP niedostępny — przechodzę do LLM-only mode.")
            llm_only = True

    # 2.2 Batch fetch konkurentów
    if not llm_only and urls_file.exists() and not consolidated_file.exists():
        print("  2.2 Jina Reader batch fetch...")
        urls = [l.strip() for l in urls_file.read_text().splitlines() if l.strip()]
        if urls:
            competitors_dir.mkdir(parents=True, exist_ok=True)
            results = jina_batch_fetch(urls, competitors_dir)
            ok_count = sum(1 for r in results if r["status"] == "OK")
            print(f"  Pobrano {ok_count}/{len(urls)} OK")
            build_quality_report(results, competitors_dir)
            build_consolidated(results, competitors_dir)
        else:
            print("  Brak URLs — LLM-only mode.")
            llm_only = True

    # Wczytaj consolidated
    if consolidated_file.exists():
        consolidated_content = read_file(consolidated_file)
        # Ogranicz do ~6000 słów żeby zmieścić się w kontekście
        words = consolidated_content.split()
        if len(words) > 6000:
            consolidated_content = ' '.join(words[:6000]) + "\n\n[... skrócono ...]"

    # 2.3 LLM analiza
    log("  2.3 LLM: EAV extraction + URR classification + Gap Analysis")

    system = """Jesteś strategiem treści specjalizującym się w semantycznym SEO.
Analizujesz content konkurentów, wyciągasz trójki EAV i identyfikujesz luki contentowe.
Twoja analiza jest precyzyjna, tabelaryczna i gotowa do działania."""

    competitor_section = (
        f"**TREŚĆ KONKURENTÓW (consolidated):**\n\n{consolidated_content}"
        if consolidated_content
        else "**Tryb LLM-only:** Brak danych konkurentów. Wygeneruj EAV na podstawie wiedzy o temacie."
    )

    user = f"""Przeprowadź pełną analizę konkurencji dla artykułu.

**TEMAT:** {topic}
**SERP OVERVIEW:**
{serp_summary if serp_summary else "(brak danych SERP)"}

**RESEARCH TEMATU (krok 1):**
{topic_research[:2000]}

---

{competitor_section}

---

Wykonaj dokładnie:

## SERP Intelligence

Na podstawie SERP overview:
- Porównaj sub-queries z kroku 1 z PAA i Related Searches
  - [CONFIRMED] jeśli pokrywa się z PAA/Related
  - [PREDICTED] jeśli nie ma w SERP
  - [SERP-ONLY] jeśli jest w SERP ale nie ma w sub-queries → dodaj jako gap
- Wnioski z Refine Chips i tytułów organicznych

## EAV Matrix

Dla każdego konkurenta wyciągnij Entity-Attribute-Value trójki.
Następnie utwórz zbiorczą tabelę z kolumnami: Atrybut | K1 | K2 | K3 | K4 | K5 | ... | KN
Użyj ✓ = pokryty, — = brak.

Min. 15 atrybutów. Przykłady atrybutów: definicja, zastosowania, korzyści, wady,
cena/koszt, porównanie z alternatywami, przykłady/case studies, FAQ, proces/kroki,
wymagania, narzędzia/zasoby, metryki/wyniki, docelowi odbiorcy, najczęstsze błędy.

## URR Classification

Na podstawie tabeli EAV, dla każdego atrybutu:
- UNIQUE: pokryty przez 1-2 konkurentów → wyróżnik artykułu
- RARE: pokryty przez 3-4 → warto poszerzyć
- ROOT: pokryty przez 5+ → obowiązkowy

Dodaj kolumnę typ_urr do tabeli.

## Gap Analysis

Lista luk content gaps z priorytetami:
- P1 (KRYTYCZNY): gap potwierdzony SERP, wysoki wolumen, nie pokryty
- P2 (WYSOKI): gap z SERP, średni wolumen
- P3 (NISKI): gap tylko z LLM/wiedzy modelu
- P4 (OPCJONALNY): nice-to-have

Format: `P1 GAP: [nazwa] — [uzasadnienie]`

## UNIQUE wyróżniki

2-3 atrybuty UNIQUE które artykuł powinien wyeksponować."""

    result = llm_call(system, user, max_tokens=10000)

    # Uruchom deterministyczną klasyfikację URR
    urr_classified = classify_urr_from_markdown(result)
    if "Brak tabeli" not in urr_classified and "Brak danych" not in urr_classified:
        result += f"\n\n---\n\n## URR Classification (deterministyczna)\n\n{urr_classified}"

    write_file(out_file, result)
    return result


def step3_contextual_vector(topic: str, source_context: str, output_dir: Path,
                             topic_research: str, competitor_analysis: str) -> str:
    out_file = output_dir / "03_contextual_vector.md"
    if out_file.exists():
        print("  [pomiń] 03_contextual_vector.md istnieje")
        return read_file(out_file)

    log("KROK 3: Contextual Vector (struktura artykułu)")

    system = """Jesteś architektem treści specjalizującym się w strukturze artykułów pod AI Search.
Twoje struktury są zoptymalizowane pod RAG: każdy chunk autonomiczny, CE powtarzane,
BLUF na początku każdej sekcji."""

    user = f"""Zbuduj kompletną strukturę artykułu na podstawie research i analizy konkurencji.

**TEMAT:** {topic}
**SOURCE CONTEXT:** {source_context}

**TOPIC RESEARCH (krok 1):**
{topic_research[:2000]}

**COMPETITOR ANALYSIS (krok 2):**
{competitor_analysis[:3000]}

---

Wykonaj dokładnie:

## H1

Jeden nagłówek H1 zawierający:
- Central Entity
- Atrybut UNIQUE (wyróżnik artykułu)
- Kontekst SC (opcjonalnie)

## BLUF artykułu (Lead)

3 zdania, max 50 słów. Zawiera kluczową odpowiedź na CSI od razu w pierwszych słowach.
Format BLUF: [Główna teza z liczbą/faktem]. [Kontekst i mechanizm]. [Korzyść dla użytkownika].

## Spis nagłówków (kompaktowa struktura)

```
H1: [tytuł]
  H2: [sekcja 1]
    H3: [podsekcja]
    H3: [podsekcja]
  H2: [sekcja 2]
    H3: [podsekcja]
  H2: [FAQ — People Also Ask]
    H3: [pytanie 1]
    H3: [pytanie 2]
```

Reguły mapowania URR:
- UNIQUE → Lead/H2 pierwsze (wyróżnik)
- ROOT → H2 obowiązkowe
- RARE → H3 lub FAQ
- GAP P1 → dedykowany H2

## Szczegóły nagłówków

Dla każdego H2 podaj:
- **BLUF sekcji:** 1 zdanie z odpowiedzią + CE (max 25 słów)
- **Target sub-queries:** które sub-queries pokrywa (z etykietami P1/P2)
- **Typ URR:** ROOT/RARE/UNIQUE
- **Szacowana długość:** słowa (200-500)
- **Kluczowe fakty/dane:** 3 bullet points co powinno być w sekcji

## Walidacja chunków RAG

Sprawdź dla każdego H2:
- [ ] Długość 200-500 słów
- [ ] BLUF w pierwszym zdaniu
- [ ] CE powtarzane min. 2x w sekcji
- [ ] Sekcja autonomiczna (zrozumiała bez kontekstu)

## Metryki struktury

- Liczba H2: X
- Liczba H3: X
- Szacowana długość całości: X słów
- Pokrycie sub-queries: X/Y
- Pokrycie PAA: X pytań"""

    result = llm_call(system, user, max_tokens=8000)
    write_file(out_file, result)
    return result


def step4_content_brief(topic: str, source_context: str, output_dir: Path,
                         topic_research: str, competitor_analysis: str,
                         contextual_vector: str) -> str:
    out_file = output_dir / "brief.md"
    if out_file.exists():
        print("  [pomiń] brief.md istnieje")
        return read_file(out_file)

    log("KROK 4: Content Brief (finalizacja)")

    system = """Jesteś senior content strategist. Kompilujesz finalny content brief dla copywritera.
Brief musi być kompletny, operacyjny i jednoznaczny — copywriter nie może mieć wątpliwości."""

    user = f"""Skompiluj finalny content brief na podstawie wszystkich zebranych danych.

**TEMAT:** {topic}
**SOURCE CONTEXT:** {source_context}

**TOPIC RESEARCH:**
{topic_research[:1500]}

**COMPETITOR ANALYSIS:**
{competitor_analysis[:2000]}

**CONTEXTUAL VECTOR (struktura):**
{contextual_vector[:3000]}

---

Stwórz kompletny brief zawierający dokładnie te 9 sekcji:

---

# Content Brief: {topic}

## 1. CSI & Fundamenty

- CE (Central Entity):
- SC (Source Context):
- CSI (Central Search Intent): [pełne zdanie opisujące intencję]
- Primary keyword:
- Secondary keywords: (3-5)
- Język i ton:

## 2. EAV Matrix & Klasyfikacja URR

[Tabela atrybutów z URR i priorytetami — wyciągnij z analizy kroku 2]
Kolumny: Atrybut | Coverage | typ_urr | Priorytet w artykule

## 3. Content Gaps & Priorytety

[Lista P1-P4 z kroku 2 — min. 5 gaps]

## 4. Struktura artykułu

[Pełna struktura H1/H2/H3 z BLUF per H2 — z kroku 3]
Dla każdego H2 podaj: nagłówek + BLUF (1 zdanie) + 3 kluczowe punkty do zawarcia

## 5. Metryki jakości target

- Docelowa długość: X słów
- Min. liczba H2: X
- TF-IDF: min 10 terminów branżowych (lista)
- Information Density: min 3 fakty/dane per H2
- CE repeat: min 2x per chunk

## 6. Checklist dla copywritera

(15 punktów do odhaczenia przed oddaniem artykułu)

- [ ] H1 zawiera CE + UNIQUE atrybut
- [ ] Lead BLUF: odpowiedź w pierwszych 50 słowach
- [ ] Każdy H2 zaczyna się od BLUF (1 zdanie z odpowiedzią)
- [ ] CE powtarzane min. 2x w każdej sekcji H2
- [ ] Min. 10 terminów branżowych z listy TF-IDF
- [ ] FAQ pokrywa PAA pytania z SERP
- [ ] Każdy chunk 200-500 słów
- [ ] Brak "puchu" — każde zdanie niesie fakt lub dane
- [ ] Internal linki wplecione naturalnie
- [ ] Źródła/dane faktyczne dla każdego twierdzenia
- [ ] H3 pokrywają atrybuty RARE z EAV Matrix
- [ ] Unikanie kanibalizacji z istniejącymi artykułami
- [ ] Struktura autonomiczna (każda sekcja zrozumiała osobno)
- [ ] Tone of voice zgodny z SC
- [ ] Meta description (155 znaków) z CE + CSI

## 7. TOP 3 Content Gaps P1-P2

[Trzy najważniejsze luki które wyróżnią artykuł od konkurencji — z uzasadnieniem]

## 8. UNIQUE wyróżniki

[2-3 atrybuty UNIQUE z SC-specific perspective — co artykuł ma powiedzieć czego nie mówi konkurencja]

## 9. Keywords & Terminy

| Typ | Keyword | Vol. est. | KD est. | Uwagi |
|-----|---------|-----------|---------|-------|
| Primary | | | | |
| Secondary | | | | |
| Branżowe | | | | |
| Synonimy CE | | | | |
| Long-tail | | | | |
| PAA/Related | | | | |

---

**Walidacja briefu:**
- [ ] Wszystkie 9 sekcji wypełnione
- [ ] Checklist kompletny (15 punktów)
- [ ] Keywords table wypełniona
- [ ] Struktura H1/H2/H3 kompletna"""

    result = llm_call(system, user, max_tokens=10000)
    write_file(out_file, result)
    return result


# ════════════════════════════════════════════════════════════════════════════════
# MAIN
# ════════════════════════════════════════════════════════════════════════════════

def main():
    parser = argparse.ArgumentParser(
        description="Content Planner Pipeline — AI Search & Semantic SEO",
        formatter_class=argparse.RawDescriptionHelpFormatter,
        epilog="""
Przykłady:
  python3 content_planner.py "pozycjonowanie sklepu internetowego" "Agencja SEO dla e-commerce"
  python3 content_planner.py "jak dobrać roletki" "Sklep z roletkami i żaluzjami" --lang pl
  python3 content_planner.py "google ads optymalizacja" "Agencja PPC B2B" --llm-only
        """
    )
    parser.add_argument("topic", help="Temat artykułu")
    parser.add_argument("source_context", help="Source Context (opis serwisu/biznesu)")
    parser.add_argument("--lang",       default="pl", help="Język SERP (domyślnie: pl)")
    parser.add_argument("--country",    default="pl", help="Kraj SERP (domyślnie: pl)")
    parser.add_argument("--output-dir", default="data/briefs",
                        help="Katalog główny dla plików (domyślnie: data/briefs)")
    parser.add_argument("--no-resume",  action="store_true",
                        help="Nie wznawiaj — uruchom pipeline od nowa")
    parser.add_argument("--llm-only",   action="store_true",
                        help="Pomiń SERP i Jina Reader, użyj tylko LLM")
    args = parser.parse_args()

    topic          = args.topic
    source_context = args.source_context
    slug           = slugify(topic)
    output_dir     = Path(args.output_dir) / slug

    output_dir.mkdir(parents=True, exist_ok=True)

    # Jeśli --no-resume, usuń pliki pośrednie
    if args.no_resume:
        for f in output_dir.glob("*.md"):
            f.unlink()
        for f in output_dir.glob("*.json"):
            f.unlink()
        print("  Pliki pośrednie usunięte — pipeline od nowa.")

    print(f"""
╔══════════════════════════════════════════════════════════════╗
  Content Planner Pipeline
  Temat: {topic}
  SC:    {source_context}
  Slug:  {slug}
  Dir:   {output_dir}
  Model: {LLM_MODEL}
╚══════════════════════════════════════════════════════════════╝
""")

    # ── Krok 0: Query Fanout ──────────────────────────────────────────────────
    fanout_data = step0_query_fanout(topic, output_dir, args.lang, args.country)

    # ── Krok 1: Topic Research ────────────────────────────────────────────────
    topic_research = step1_topic_research(
        topic, source_context, output_dir, fanout_data
    )

    # ── Krok 2: Competitor Analysis ───────────────────────────────────────────
    competitor_analysis = step2_competitor_analysis(
        topic, output_dir, topic_research, args.lang, args.country, args.llm_only
    )

    # ── Krok 3: Contextual Vector ─────────────────────────────────────────────
    contextual_vector = step3_contextual_vector(
        topic, source_context, output_dir, topic_research, competitor_analysis
    )

    # ── Krok 4: Content Brief ─────────────────────────────────────────────────
    brief = step4_content_brief(
        topic, source_context, output_dir,
        topic_research, competitor_analysis, contextual_vector
    )

    # ── Podsumowanie ──────────────────────────────────────────────────────────
    print(f"""
╔══════════════════════════════════════════════════════════════╗
  ✓ Pipeline zakończony!

  Pliki:
  ├── {output_dir}/00_query_fanout.json
  ├── {output_dir}/01_topic_research.md
  ├── {output_dir}/urls.txt
  ├── {output_dir}/competitors/_consolidated.md
  ├── {output_dir}/02_competitor_analysis.md
  ├── {output_dir}/03_contextual_vector.md
  └── {output_dir}/brief.md   ← FINALNY BRIEF

╚══════════════════════════════════════════════════════════════╝
""")


if __name__ == "__main__":
    main()
