#!/usr/bin/env python3
"""
Classify URR — deterministyczna klasyfikacja UNIQUE/ROOT/RARE atrybutów EAV Matrix.

Parsuje tabelę EAV Matrix (Markdown lub CSV), zlicza coverage per atrybut
i przypisuje typ URR wg progów:
    UNIQUE  — atrybut pokryty przez 1-2 konkurentów z N
    RARE    — atrybut pokryty przez 3-4 konkurentów z N
    ROOT    — atrybut pokryty przez 5+ konkurentów z N

Zwalnia LLM z liczenia coverage — LLM zajmuje się tylko ekstrakcją EAV i interpretacją gaps.

Usage:
    python3 classify_urr.py PATH [--n N] [--output PATH] [--format md|csv]

Arguments:
    PATH        - Ścieżka do pliku CSV lub Markdown z EAV Matrix
    --n         - Liczba konkurentów N (domyślnie: wykrywana automatycznie z danych)
    --output    - Ścieżka wyjściowa (domyślnie: wydruk na stdout)
    --format    - Format wyjścia: md (Markdown table) lub csv (domyślnie: md)

Input format (Markdown table):
    Skrypt szuka tabeli z kolumnami: Atrybut, K1, K2, ... KN (lub Entity, Attribute, K1...)
    Wartości: ✓ / x / — / tak / nie lub dowolny tekst niepusty = "pokryty"

Input format (CSV):
    Kolumny: attribute,k1,k2,...,kN
    Pierwsza kolumna = nazwa atrybutu, pozostałe = konkurenci

Examples:
    python3 classify_urr.py data/briefs/pozycjonowanie_sklepu/02_competitor_analysis.md
    python3 classify_urr.py eav.csv --n 10 --format csv
    python3 classify_urr.py eav.md --output urr_classified.md

Output:
    Tabela Markdown/CSV z kolumnami: Atrybut | Coverage | N | typ_urr | Priorytet
"""

import sys
import re
import csv
import argparse
from pathlib import Path


# Progi klasyfikacji URR (liczba konkurentów pokrywających atrybut)
UNIQUE_MAX = 2   # 1-2 → UNIQUE
RARE_MIN   = 3   # 3-4 → RARE
RARE_MAX   = 4
ROOT_MIN   = 5   # 5+  → ROOT


# Wartości interpretowane jako "pokryty" (case-insensitive)
COVERED_VALUES = {"✓", "x", "tak", "yes", "1", "true", "+", "●", "•"}


def is_covered(value):
    """Zwraca True jeśli wartość oznacza pokrycie atrybutu przez konkurenta."""
    v = str(value).strip().lower()
    if not v or v in {"", "-", "—", "–", "brak", "no", "0", "false", "n/a", "nd"}:
        return False
    # Dowolny niepusty tekst inny niż znaki braku = pokryty
    return True


def classify_urr(coverage, n):
    """Klasyfikuje atrybut wg coverage i N konkurentów."""
    if n == 0:
        return "—"
    if coverage >= ROOT_MIN:
        return "ROOT"
    elif RARE_MIN <= coverage <= RARE_MAX:
        return "RARE"
    else:  # 0, 1, 2
        return "UNIQUE"


def priority_from_urr(urr):
    """Zwraca sugerowany priorytet w strukturze artykułu."""
    return {"UNIQUE": "Lead/H2", "ROOT": "H2", "RARE": "H3/FAQ"}.get(urr, "—")


# ---------------------------------------------------------------------------
# Parsery
# ---------------------------------------------------------------------------

def parse_markdown_table(lines):
    """
    Parsuje pierwszą tabelę Markdown znalezioną w liniach.
    Zwraca (headers, rows) gdzie każda row to lista stringów.
    """
    table_lines = []
    in_table = False

    for line in lines:
        stripped = line.strip()
        if stripped.startswith("|") and "|" in stripped[1:]:
            in_table = True
            table_lines.append(stripped)
        elif in_table:
            # Koniec tabeli gdy linia nie zaczyna się od |
            if table_lines:
                break

    if len(table_lines) < 2:
        return None, None

    def split_row(line):
        parts = [c.strip() for c in line.strip("|").split("|")]
        return parts

    headers = split_row(table_lines[0])
    rows = []
    for line in table_lines[2:]:  # pomijamy separator (---|----|...)
        if re.match(r"^\|[-| :]+\|$", line):
            continue
        rows.append(split_row(line))

    return headers, rows


def parse_csv_file(path):
    """Parsuje CSV, zwraca (headers, rows)."""
    with open(path, newline="", encoding="utf-8") as f:
        reader = csv.reader(f)
        rows = list(reader)
    if not rows:
        return None, None
    return rows[0], rows[1:]


def detect_attribute_column(headers):
    """
    Wykrywa która kolumna to nazwa atrybutu.
    Szuka: 'atrybut', 'attribute', 'name', 'nazwa', 'entity'
    """
    candidates = ["atrybut", "attribute", "attrybut", "attr", "nazwa", "name", "element"]
    for i, h in enumerate(headers):
        if h.strip().lower() in candidates:
            return i
    # Fallback: pierwsza kolumna
    return 0


def detect_competitor_columns(headers, attr_col):
    """
    Wykrywa kolumny konkurentów (K1, K2... lub wzorzec cyfra/konkurent).
    Wyklucza kolumny: atrybut, typ, urr, priorytet, coverage, n, pokrycie, gap.
    """
    excluded = {"atrybut", "attribute", "attrybut", "attr", "nazwa", "name",
                "element", "typ", "type", "urr", "typ_urr", "priorytet", "priority",
                "coverage", "pokrycie", "n", "gap", "status", "wartość", "value"}
    competitor_cols = []
    for i, h in enumerate(headers):
        if i == attr_col:
            continue
        if h.strip().lower() in excluded:
            continue
        # Kolumny K1, K2... lub competitor_1... lub domeny
        competitor_cols.append(i)
    return competitor_cols


# ---------------------------------------------------------------------------
# Główna logika
# ---------------------------------------------------------------------------

def process_eav(headers, rows, n_override=None):
    """
    Przetwarza EAV Matrix i zwraca listę rekordów z URR.
    Każdy rekord: {"attribute", "coverage", "n", "urr", "priority"}
    """
    attr_col = detect_attribute_column(headers)
    comp_cols = detect_competitor_columns(headers, attr_col)

    if not comp_cols:
        print("WARN: Nie znaleziono kolumn konkurentów. Sprawdź format tabeli.")
        return []

    # N: liczba konkurentów
    n = n_override if n_override else len(comp_cols)

    results = []
    for row in rows:
        if not row or len(row) <= attr_col:
            continue

        attr_name = row[attr_col].strip()
        if not attr_name or attr_name.startswith("-"):
            continue

        # Zlicz pokrycie
        coverage = 0
        for ci in comp_cols:
            if ci < len(row) and is_covered(row[ci]):
                coverage += 1

        urr = classify_urr(coverage, n)
        prio = priority_from_urr(urr)

        results.append({
            "attribute": attr_name,
            "coverage": coverage,
            "n": n,
            "urr": urr,
            "priority": prio,
        })

    return results


def format_markdown(results):
    """Formatuje wyniki jako tabela Markdown."""
    lines = [
        "| Atrybut | Coverage | N | typ_urr | Priorytet |",
        "|---------|----------|---|---------|-----------|",
    ]
    for r in results:
        lines.append(
            f"| {r['attribute']} | {r['coverage']}/{r['n']} | {r['n']} "
            f"| **{r['urr']}** | {r['priority']} |"
        )

    # Podsumowanie
    from collections import Counter
    counts = Counter(r["urr"] for r in results)
    total = len(results)
    lines.append("")
    lines.append(f"**Łącznie:** {total} atrybutów — "
                 f"ROOT: {counts.get('ROOT', 0)}, "
                 f"RARE: {counts.get('RARE', 0)}, "
                 f"UNIQUE: {counts.get('UNIQUE', 0)}")
    return "\n".join(lines)


def format_csv(results):
    """Formatuje wyniki jako CSV."""
    import io
    buf = io.StringIO()
    writer = csv.DictWriter(buf, fieldnames=["attribute", "coverage", "n", "urr", "priority"])
    writer.writeheader()
    writer.writerows(results)
    return buf.getvalue()


# ---------------------------------------------------------------------------
# CLI
# ---------------------------------------------------------------------------

def main():
    parser = argparse.ArgumentParser(
        description="Klasyfikacja URR dla EAV Matrix (UNIQUE/ROOT/RARE)"
    )
    parser.add_argument("path", help="Ścieżka do pliku CSV lub Markdown z EAV Matrix")
    parser.add_argument("--n", type=int, default=None,
                        help="Liczba konkurentów N (domyślnie: wykrywana z danych)")
    parser.add_argument("--output", default=None,
                        help="Ścieżka wyjściowa (domyślnie: stdout)")
    parser.add_argument("--format", choices=["md", "csv"], default="md",
                        help="Format wyjścia: md lub csv (domyślnie: md)")
    args = parser.parse_args()

    path = Path(args.path)
    if not path.exists():
        print(f"ERROR: Plik nie istnieje: {path}")
        sys.exit(1)

    # Wykryj format wejścia
    suffix = path.suffix.lower()
    headers, rows = None, None

    if suffix == ".csv":
        headers, rows = parse_csv_file(path)
    else:
        # Markdown lub dowolny plik tekstowy — szukamy tabeli
        with open(path, encoding="utf-8") as f:
            lines = f.readlines()
        headers, rows = parse_markdown_table(lines)

    if headers is None:
        print("ERROR: Nie znaleziono tabeli w pliku. Sprawdź format (Markdown | lub CSV).")
        sys.exit(1)

    results = process_eav(headers, rows, n_override=args.n)

    if not results:
        print("ERROR: Brak danych do klasyfikacji.")
        sys.exit(1)

    # Formatuj output
    if args.format == "csv":
        output_text = format_csv(results)
    else:
        output_text = format_markdown(results)

    # Zapisz lub wydrukuj
    if args.output:
        out_path = Path(args.output)
        out_path.parent.mkdir(parents=True, exist_ok=True)
        with open(out_path, "w", encoding="utf-8") as f:
            f.write(output_text)
        print(f"Zapisano: {out_path}")
    else:
        print(output_text)


if __name__ == "__main__":
    main()
