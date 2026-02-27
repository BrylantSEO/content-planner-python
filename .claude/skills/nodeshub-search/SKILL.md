---
name: nodeshub-search
description: >
  Pobiera wyniki wyszukiwania Google (SERP) przez NodeHub API (nodeshub.io).
  Zwraca organic results, People Also Ask, Related Searches, refine chips, videos, filter sidebar.
  Użyj do analizy SERP, walidacji klastrów, badania konkurencji, identyfikacji intencji wyszukiwania.
  Triggery: wyszukaj w Google, sprawdź SERP, wyniki wyszukiwania, Google results,
  co jest w top 10, analiza SERP, nodeshub search.
allowed-tools: Bash(python3 *), Read
---

# NodeHub Search

Pobieraj wyniki Google Search przez NodeHub API.

> **Alternatywa SERP:** BD MCP `search_engine` (lepsze dla batch queries, async mode).
> NodeHub wymagany dla: `/v1/query-fanout` (brak odpowiednika w BD).

## Użycie

```bash
python3 .claude/skills/nodeshub-search/nodeshub_search.py "KEYWORD" [hl] [gl]
```

- `hl` - język (domyślnie: `pl`)
- `gl` - kraj (domyślnie: `pl`)
- `--json` - surowy JSON zamiast sformatowanego outputu

## Przykłady

```bash
# Polski SERP
python3 .claude/skills/nodeshub-search/nodeshub_search.py "baseny ogrodowe"

# Angielski SERP (US)
python3 .claude/skills/nodeshub-search/nodeshub_search.py "pressure washer" en us

# Surowy JSON
python3 .claude/skills/nodeshub-search/nodeshub_search.py "keyword" --json
```

## Co zwraca

- **Organic results** (top 10): pozycja, tytuł, URL, domena, opis
- **People Also Ask**: pytania powiązane
- **Related Searches**: powiązane wyszukiwania
- **Refine Chips**: filtry sugerowane przez Google
- **Videos**: wyniki wideo (YouTube)
- **Filter Sidebar**: kategorie filtrów (cena, marka, sklep)
- **Answer Box**: jeśli obecny

## Wymagania

- `NODESHUB_API_KEY` w `.env`
- `pip install requests python-dotenv`

## Rate limit

Nie więcej niż 1 request/sekundę. Skrypt ma wbudowany retry z backoff dla 429.
