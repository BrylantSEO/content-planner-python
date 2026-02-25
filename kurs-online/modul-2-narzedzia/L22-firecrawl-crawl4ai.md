# L22 — Firecrawl i Crawl4AI — kiedy Jina nie wystarczy

**Moduł:** 2 — Narzędzia do pobierania danych
**Czas:** ~35 min
**Format:** Demo + porównanie narzędzi

---

## Cel lekcji

Wiesz kiedy Jina Reader nie wystarczy i jak użyć Firecrawl (API) lub Crawl4AI (self-hosted) do crawlowania całych serwisów lub stron JS-heavy.

---

## Drzewo decyzji: które narzędzie?

```
Chcę pobrać treść URL
        │
        ▼
Czy to prosty artykuł lub statyczna strona?
   TAK → Jina Reader (najszybsze, darmowe)
   NIE ↓
        ▼
Czy strona wymaga JavaScript do wyświetlenia treści?
   NIE → Jina Reader z --clean
   TAK ↓
        ▼
Czy chcę pobrać CAŁY serwis / wiele stron?
   TAK → Firecrawl (API) lub Crawl4AI (self-hosted)
   NIE → Firecrawl single page (API)
        │
        ▼
Czy masz budżet na API?
   TAK → Firecrawl (łatwiejszy setup)
   NIE → Crawl4AI (free, Docker)
```

---

## Firecrawl — API do crawlowania serwisów

**Co to jest:** Płatne API które używa Playwright (headless browser) do renderowania stron JavaScript i zwraca czysty Markdown.

**Instalacja Python SDK:**
```bash
pip install firecrawl-py
```

**Konfiguracja w .env:**
```
FIRECRAWL_API_KEY=fc-...   # z app.firecrawl.dev
```

### Single URL (JS rendering)

```python
from firecrawl import FirecrawlApp

app = FirecrawlApp(api_key="fc-twój-klucz")

# Pobierz jedną stronę z renderowaniem JS
result = app.scrape_url(
    "https://competitor.pl/artykul",
    params={"formats": ["markdown"]}
)
print(result["markdown"])
```

### Crawl całego bloga (sitemap-based)

```python
# Crawl wszystkich URL z domeny
crawl_result = app.crawl_url(
    "https://competitor.pl/blog/",
    params={
        "limit": 50,           # max stron
        "scrapeOptions": {"formats": ["markdown"]}
    }
)

for page in crawl_result["data"]:
    print(f"URL: {page['metadata']['sourceURL']}")
    print(page["markdown"][:500])
    print("---")
```

**Przypadki użycia:**
- Pobierz cały blog konkurenta (50–200 artykułów)
- Strony React/Vue/Angular gdzie Jina zwraca pusty content
- E-commerce z dynamicznie ładowanymi cenami

**Cennik:** ~$0.002/stronę (starter plan). 50 artykułów = ~$0.10.

---

## Crawl4AI — open-source, self-hosted

**Co to jest:** Darmowa alternatywa dla Firecrawl, uruchamiana lokalnie przez Docker lub pip.

**Instalacja (pip):**
```bash
pip install crawl4ai
python -m playwright install chromium
```

**Instalacja (Docker):**
```bash
docker pull unclecode/crawl4ai
docker run -p 11235:11235 unclecode/crawl4ai
```

### Single URL z Crawl4AI

```python
import asyncio
from crawl4ai import AsyncWebCrawler

async def crawl_url(url):
    async with AsyncWebCrawler() as crawler:
        result = await crawler.arun(url=url)
        return result.markdown

# Uruchom
markdown = asyncio.run(crawl_url("https://example.com/artykul"))
print(markdown)
```

### Batch crawlowanie

```python
import asyncio
from crawl4ai import AsyncWebCrawler

urls = [
    "https://competitor.pl/artykul-1",
    "https://competitor.pl/artykul-2",
    "https://competitor.pl/artykul-3",
]

async def crawl_batch(urls):
    async with AsyncWebCrawler() as crawler:
        results = await crawler.arun_many(urls=urls)
        return [(r.url, r.markdown) for r in results if r.success]

results = asyncio.run(crawl_batch(urls))
for url, markdown in results:
    print(f"\n### {url}\n")
    print(markdown[:500])
```

---

## Demo: Firecrawl na blog Double Digital

**Cel demo:** Pobierz mapę treści całego bloga DD.

```python
from firecrawl import FirecrawlApp
import json

app = FirecrawlApp(api_key="fc-...")

# Crawl bloga
result = app.crawl_url(
    "https://double-digital.pl/blog/",
    params={
        "limit": 30,
        "scrapeOptions": {"formats": ["markdown", "links"]}
    }
)

# Wylistuj wszystkie artykuły z tytułami
for page in result["data"]:
    title = page["metadata"].get("title", "brak tytułu")
    url = page["metadata"]["sourceURL"]
    words = len(page["markdown"].split())
    print(f"{words:4d} słów | {title[:60]:60s} | {url}")
```

**Output pokazuje:** tytuły, URL, długość artykułów → gotowa mapa treści do analizy kanibalizacji.

---

## Porównanie narzędzi

| Kryterium | Jina Reader | Firecrawl | Crawl4AI |
|-----------|------------|-----------|---------|
| Cena | Darmowy | ~$0.002/stronę | Bezpłatny |
| Setup | Zero konfiguracji | Rejestracja API | Docker / pip + Playwright |
| JS rendering | Podstawowy | Pełny (Playwright) | Pełny (Playwright) |
| Crawl całego serwisu | Nie | Tak (sitemap) | Tak (manualne) |
| Rate limit (free) | 20 RPM | 500 req/min | Bez limitu (local) |
| Batch mode | Tak | Tak | Tak |
| Paywall bypass | Nie | Nie | Nie |

---

## Kiedy użyć czego

| Scenariusz | Narzędzie |
|-----------|----------|
| Pobierz 1 artykuł do audytu | Jina Reader |
| Pobierz 5–10 artykułów konkurenta | Jina Reader batch |
| Pobierz cały blog (50+ artykułów) | Firecrawl (jeśli budżet) |
| Strona SPA / React / Vue | Crawl4AI lub Firecrawl |
| Regularne masowe crawlowanie | Crawl4AI (self-hosted) |
| Testowanie przed zakupem | Crawl4AI (darmowy) |

---

## Ćwiczenie

1. Zainstaluj Crawl4AI lokalnie:
   ```bash
   pip install crawl4ai
   python -m playwright install chromium
   ```

2. Pobierz jeden artykuł przez Crawl4AI:
   ```python
   import asyncio
   from crawl4ai import AsyncWebCrawler
   async def main():
       async with AsyncWebCrawler() as c:
           r = await c.arun("https://double-digital.pl/blog/")
           print(r.markdown[:1000])
   asyncio.run(main())
   ```

3. Porównaj output z Jina Reader dla tego samego URL

4. Opcjonalnie: Zarejestruj się na firecrawl.dev (darmowy plan) i pobierz 5 stron

---

**Następna lekcja:** L23 — NodeHub Search — Google SERP jako dane
