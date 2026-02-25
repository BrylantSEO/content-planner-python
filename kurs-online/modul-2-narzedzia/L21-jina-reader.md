# L21 — Jina Reader — pobieranie treści URL

**Moduł:** 2 — Narzędzia do pobierania danych
**Czas:** ~30 min
**Format:** Screencast + demo

---

## Cel lekcji

Pobierasz treść dowolnego URL jako Markdown i wiesz kiedy używać trybu single vs batch.

---

## Jak działa r.jina.ai

Jina Reader to darmowe proxy które:
1. Pobiera stronę (z renderowaniem JS opcjonalnie)
2. Filtruje boilerplate (nawigacja, stopka, reklamy)
3. Zwraca czysty Markdown

**Format URL:**
```
https://r.jina.ai/https://twoja-strona.pl/artykul
```

**W terminalu:**
```bash
curl https://r.jina.ai/https://example.com
```

Lub przez skrypt:
```bash
python3 .claude/skills/jina-reader/jina_reader.py "https://example.com"
```

---

## Single URL — podstawowe użycie

```bash
# Pobierz artykuł jako Markdown
python3 .claude/skills/jina-reader/jina_reader.py "https://double-digital.pl/blog/google-ads"

# Z flagą --clean (usuwa nawigację, CTAs, boilerplate)
python3 .claude/skills/jina-reader/jina_reader.py "https://example.com/artykul" --clean

# Format JSON (z metadanymi: title, url, wordCount)
python3 .claude/skills/jina-reader/jina_reader.py "https://example.com/artykul" --json
```

**Output bez --json:** czysty tekst Markdown w stdout
**Output z --json:** obiekt JSON z polami `title`, `url`, `content`, `wordCount`

---

## Batch mode — wiele URL naraz

Utwórz plik `urls.txt`:
```
https://competitor-a.pl/artykul-1
https://competitor-a.pl/artykul-2
# Linie z # są pomijane
https://competitor-b.pl/artykul-1
```

Uruchom batch:
```bash
python3 .claude/skills/jina-reader/jina_reader.py \
  --batch urls.txt \
  --output data/competitor_content \
  --workers 5
```

**Output w katalogu `data/competitor_content/`:**
- `competitor-a_artykul-1.md` — treść artykułu 1
- `competitor-a_artykul-2.md` — treść artykułu 2
- `competitor-b_artykul-1.md` — treść artykułu 3
- `_quality_report.txt` — statystyki (słowa, status pobierania)
- `_consolidated.md` — wszystkie treści w jednym pliku (max 1500 słów/source)

---

## Rate limits

| Tryb | Limit | Kiedy |
|------|-------|-------|
| Bez JINA_API_KEY | 20 requestów/min | Testowanie, małe projekty |
| Z JINA_API_KEY (darmowy) | 200 requestów/min | Regularne pipeline'y |
| JINA_API_KEY (płatny) | 1000+ req/min | Masowe crawlowanie |

**Dla kursu:** bez klucza (20 RPM) wystarcza do ćwiczeń.

Batch mode automatycznie dodaje opóźnienia żeby nie przekroczyć limitu.

---

## Ograniczenia Jina Reader

| Problem | Sytuacja | Obejście |
|---------|---------|---------|
| Błąd 403 / brak treści | Strona wymaga logowania | Wklej tekst ręcznie w Claude Code |
| Pusta treść | Heavy JavaScript (SPA) | Firecrawl lub Crawl4AI (L22) |
| Paywall | Premium content | Nie dostępne — Jina nie omija |
| IP block | Strona blokuje headless requests | Firecrawl z Playwright |

---

## Demo screencast

**Sekwencja do nagrania:**

1. Pobierz artykuł z bloga Double Digital:
   ```bash
   python3 .claude/skills/jina-reader/jina_reader.py \
     "https://double-digital.pl/blog/" \
     --clean
   ```

2. Utwórz `competitor_urls.txt` z 3 URL z bloga konkurenta

3. Uruchom batch:
   ```bash
   python3 .claude/skills/jina-reader/jina_reader.py \
     --batch competitor_urls.txt \
     --output data/competitor_content
   ```

4. Sprawdź `_quality_report.txt` — ile słów, który artykuł pobrany poprawnie

---

## Ćwiczenie

1. Pobierz jeden artykuł z bloga konkurenta w Twojej branży:
   ```bash
   python3 .claude/skills/jina-reader/jina_reader.py "URL_ARTYKULU" --clean
   ```

2. Utwórz plik z 5 URL z bloga konkurenta i uruchom batch mode

3. Otwórz `_consolidated.md` — sprawdź czy treści są czytelne

4. Opcjonalnie: pobierz swój własny artykuł i porównaj HTML (źródło strony) z outputem Markdown

---

**Następna lekcja:** L22 — Firecrawl i Crawl4AI — kiedy Jina nie wystarczy
