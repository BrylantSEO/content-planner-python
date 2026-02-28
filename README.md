# Content Planner — AI Search Pipeline

Automatyczny pipeline tworzenia content briefów zoptymalizowanych pod AI Search i semantyczne SEO.

**Wpisz temat artykułu + opis firmy → dostaniesz gotowy brief z analizą konkurencji, EAV matrix, strukturą H1/H2/H3 i BLUF per sekcja.**

---

## Jak to działa

```
Temat + Source Context
        │
        ▼
 Krok 0 — Query Fanout (NodeHub)
        │  warianty keyword, top SERP titles
        ▼
 Krok 1 — Topic Research (LLM)
        │  CSI, ramka semantyczna, sub-queries, terminologia
        ▼
 Krok 2 — Competitor Analysis (NodeHub + Jina + LLM)
        │  SERP top 10, scraping konkurentów, EAV matrix, URR, gap analysis
        ▼
 Krok 3 — Contextual Vector (LLM)
        │  H1/H2/H3, BLUF per sekcja, chunki RAG
        ▼
 Krok 4 — Content Brief (LLM)
        │  9 sekcji: CSI, EAV, gaps, struktura, checklist, keywords
        ▼
   brief.md — gotowy do przekazania copywriterowi
```

Model LLM: **claude-sonnet-4-6** via [OpenRouter](https://openrouter.ai).

---

## Wymagania

- Python 3.10+
- Konto [OpenRouter](https://openrouter.ai) (wymagane)
- Konto [NodeHub](https://nodeshub.io) (opcjonalne — bez niego pipeline działa w trybie LLM-only)

---

## Instalacja

```bash
git clone https://github.com/BrylantSEO/content-planner-python.git
cd content-planner-python
pip install -r requirements.txt
```

---

## Uruchomienie — interfejs webowy

```bash
python3 app.py
```

Otwórz **http://localhost:5000** w przeglądarce.

1. Kliknij **Ustawienia ⚙** i wklej klucze API
2. Wpisz temat artykułu i opis firmy
3. Kliknij **Uruchom pipeline**
4. Pobierz wygenerowany `brief.md`

Klucze API zapisywane są lokalnie w pliku `config.json` — **nigdy nie opuszczają Twojego komputera**.

---

## Uruchomienie — CLI (bez UI)

```bash
python3 content_planner.py "temat artykułu" "opis firmy / source context"

# Przykłady:
python3 content_planner.py "pozycjonowanie sklepu internetowego" "Agencja SEO dla e-commerce"
python3 content_planner.py "jak dobrać roletki" "Sklep z roletkami i żaluzjami" --lang pl
python3 content_planner.py "google ads optymalizacja" "Agencja PPC B2B" --llm-only

# Opcje:
#   --lang pl/en/de      język SERP (domyślnie: pl)
#   --country pl/us/gb   kraj SERP (domyślnie: pl)
#   --llm-only           pomiń SERP i scraping, użyj tylko LLM
#   --no-resume          zacznij od nowa (domyślnie: wznawia od ostatniego kroku)
#   --output-dir PATH    katalog docelowy (domyślnie: data/briefs)
```

Klucze API podaj przez plik `.env` w katalogu projektu:

```env
OPENROUTER_API_KEY=sk-or-v1-...
NODESHUB_API_KEY=nh-...
JINA_API_KEY=jina_...        # opcjonalny
```

---

## Klucze API

| Klucz | Wymagany | Do czego |
|-------|----------|----------|
| `OPENROUTER_API_KEY` | **tak** | LLM (claude-sonnet-4-6) — analiza, brief, EAV |
| `NODESHUB_API_KEY` | opcjonalny | Google SERP — top 10, PAA, Related Searches |
| `JINA_API_KEY` | opcjonalny | Scraping treści konkurentów (bez klucza: 20 req/min) |

Bez `NODESHUB_API_KEY` pipeline automatycznie przechodzi w tryb **LLM-only** — brief wciąż powstaje, ale bez danych z realnego SERP.

---

## Pliki wyjściowe

Każdy pipeline zapisuje wyniki w `data/briefs/<slug>/`:

```
data/briefs/pozycjonowanie_sklepu_internetowego/
├── 00_query_fanout.json       warianty keyword, top SERP titles
├── 01_topic_research.md       CSI, ramka semantyczna, sub-queries
├── urls.txt                   top 10 URLs z SERP
├── competitors/
│   ├── _consolidated.md       treść konkurentów (oczyszczona)
│   └── _quality_report.txt    status OK/SKIP/ERROR per URL
├── 02_competitor_analysis.md  EAV matrix, URR, gap analysis
├── 03_contextual_vector.md    H1/H2/H3, BLUF per sekcja
└── brief.md                   ← FINALNY BRIEF
```

Pipeline jest **wznawialny** — jeśli plik pośredni istnieje, krok jest pomijany. Możesz przerwać i kontynuować od miejsca przerwania.

---

## Tryby degradacji

| Tryb | Dostępne narzędzia | Jakość |
|------|-------------------|--------|
| **Full** | QueryFanout + SERP + Jina + LLM | Najwyższa |
| **SERP-only** | SERP + LLM (bez Jina) | Wysoka |
| **LLM-only** | Tylko LLM | Dobra — bez danych realnego SERP |

Pipeline automatycznie degraduje do niższego poziomu przy niedostępności API.

---

## Licencja

MIT
