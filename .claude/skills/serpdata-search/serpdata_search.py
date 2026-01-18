#!/usr/bin/env python3
"""
SerpData Search - wyszukiwanie w Google za pomocą API serpdata.io
"""

import sys
import json
import subprocess
import urllib.parse


API_URL = "https://api.serpdata.io/v1/search"
API_TOKEN = "serpdata_f47588d84dc79e09244f26727465123d-4917FNQ73jA"


def search(keyword: str, hl: str = "pl", gl: str = "pl") -> dict:
    """
    Wykonuje wyszukiwanie w Google przez API serpdata.io

    Args:
        keyword: Słowo kluczowe do wyszukania
        hl: Język wyników (domyślnie: pl)
        gl: Kraj/lokalizacja (domyślnie: pl)

    Returns:
        dict: Odpowiedź z API
    """
    params = urllib.parse.urlencode({
        "keyword": keyword,
        "hl": hl,
        "gl": gl
    })

    url = f"{API_URL}?{params}"

    try:
        result = subprocess.run(
            [
                "curl", "--silent", "--request", "GET",
                "--url", url,
                "--header", f"Authorization: Bearer {API_TOKEN}"
            ],
            capture_output=True,
            text=True,
            timeout=30
        )

        if result.returncode != 0:
            return {"error": f"Curl error: {result.stderr}"}

        return json.loads(result.stdout)
    except subprocess.TimeoutExpired:
        return {"error": "Request timeout (30s)"}
    except json.JSONDecodeError as e:
        return {"error": f"JSON Decode Error: {e}"}
    except Exception as e:
        return {"error": f"Unexpected error: {e}"}


def format_results(data: dict, keyword: str) -> str:
    """
    Formatuje wyniki wyszukiwania jako tabelę Markdown

    Args:
        data: Odpowiedź z API
        keyword: Słowo kluczowe (do nagłówka)

    Returns:
        str: Sformatowana tabela Markdown
    """
    if "error" in data:
        return f"Błąd: {data['error']}"

    try:
        organic_results = data["data"]["results"]["organic_results"]
    except (KeyError, TypeError):
        return "Błąd: Nie udało się pobrać wyników organicznych z odpowiedzi API"

    if not organic_results:
        return f"Brak wyników organicznych dla: {keyword}"

    lines = [
        f"## Wyniki wyszukiwania dla: {keyword}",
        "",
        "| # | Tytuł | Domena | URL |",
        "|---|-------|--------|-----|"
    ]

    for result in organic_results[:10]:
        pos = result.get("pos", result.get("rank_inner", "?"))
        title = result.get("title", "Brak tytułu")
        domain = result.get("domain", "?")
        url = result.get("url", "#")
        lines.append(f"| {pos} | {title} | {domain} | {url} |")

    # Dodatkowe informacje z SERP
    try:
        snippets = data["data"]["results"]["snippets"]

        # People Also Ask
        if "people_also_ask" in snippets and snippets["people_also_ask"]:
            paa = snippets["people_also_ask"]
            if "questions" in paa and paa["questions"]:
                lines.append("")
                lines.append("**People Also Ask:**")
                for q in paa["questions"][:4]:
                    lines.append(f"- {q.get('text', '?')}")

        # Related Searches
        if "related_searches" in snippets and snippets["related_searches"]:
            rs = snippets["related_searches"]
            if "queries" in rs and rs["queries"]:
                lines.append("")
                lines.append(f"**Related searches:** {', '.join(rs['queries'][:8])}")
    except (KeyError, TypeError):
        pass

    return "\n".join(lines)


def main():
    if len(sys.argv) < 2:
        print("Użycie: python serpdata_search.py <słowo_kluczowe> [hl] [gl]")
        print("  słowo_kluczowe - fraza do wyszukania")
        print("  hl - język wyników (domyślnie: pl)")
        print("  gl - kraj/lokalizacja (domyślnie: pl)")
        sys.exit(1)

    keyword = sys.argv[1]
    hl = sys.argv[2] if len(sys.argv) > 2 else "pl"
    gl = sys.argv[3] if len(sys.argv) > 3 else "pl"

    data = search(keyword, hl, gl)
    output = format_results(data, keyword)
    print(output)


if __name__ == "__main__":
    main()
