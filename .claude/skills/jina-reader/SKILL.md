---
name: jina-reader
description: >
  Konwertuje URL na markdown przez Jina Reader API (r.jina.ai).
  Pobiera treść stron konkurencji do analizy. Single URL lub batch mode.
  Użyj do pobrania treści artykułów, analizy konkurencji, ekstrakcji contentu.
  Triggery: pobierz stronę, URL na markdown, treść konkurencji,
  fetch URL, jina reader, pobierz artykuł.
allowed-tools: Bash(python3 *), Read, Write
---

# Jina Reader

Pobieraj treść stron WWW jako markdown przez Jina Reader API.

## Użycie

```bash
# Pojedynczy URL
python3 .claude/skills/jina-reader/jina_reader.py "URL"

# Batch mode (lista URLs z pliku)
python3 .claude/skills/jina-reader/jina_reader.py --batch urls.txt --output data/competitor_content

# Surowy JSON
python3 .claude/skills/jina-reader/jina_reader.py "URL" --json

# Batch bez konsolidacji
python3 .claude/skills/jina-reader/jina_reader.py --batch urls.txt --output DIR --no-consolidate

# Zmiana liczby workerów (domyślnie 5)
python3 .claude/skills/jina-reader/jina_reader.py --batch urls.txt --output DIR --workers 3
```

## Batch mode — co generuje

| Plik | Opis |
|------|------|
| `*.md` (per URL) | Indywidualne pliki markdown — backup |
| `_quality_report.txt` | Status OK/SKIP/ERROR + word count per URL + summary |
| `_consolidated.md` | Treść WSZYSTKICH OK konkurentów w jednym pliku (max 1500 słów per konkurent) |

Format `_consolidated.md`:
```
## K1: [tytuł]
**Source:** URL
**Words:** N

[treść]
---
## K2: [tytuł]
...
```

Pliki < 200 słów oznaczone SKIP (nie trafiają do `_consolidated.md`). Warning jeśli < 7 OK.

## Parallel fetching

Batch mode używa 5 workerów (ThreadPoolExecutor) z thread-safe rate limiterem:
- Bez API key: 18 RPM (safety margin od limitu 20 RPM)
- Z API key: 200 RPM

## Przykłady

```bash
# Pobranie artykułu
python3 .claude/skills/jina-reader/jina_reader.py "https://pl.wikipedia.org/wiki/Kortyzol"

# Batch: top 10 konkurentów z parallel fetch + auto-konsolidacja
python3 .claude/skills/jina-reader/jina_reader.py --batch data/briefs/kortyzol/urls.txt --output data/briefs/kortyzol/competitors/
```

## Wymagania

- `pip install requests python-dotenv`
- Opcjonalnie: `JINA_API_KEY` w `.env` (bez klucza: limit 20 RPM)
