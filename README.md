# Semantic-OS

Kolekcja skilli Claude AI do semantycznego SEO i optymalizacji pod AI Search (RAG, ChatGPT, Perplexity, Google AI Overviews).

---

## 🚀 Content Planner UI

Web UI do generowania content briefów przez pipeline AI (Query Fanout → Topic Research → Competitor Analysis → Contextual Vector → Content Brief).

### Uruchomienie lokalne

```bash
# 1. Zainstaluj zależności
pip install flask requests python-dotenv

# 2. Uruchom serwer
python3 app.py

# 3. Otwórz w przeglądarce
open http://localhost:5000
```

### Konfiguracja kluczy API

Po otwarciu `http://localhost:5000` kliknij **⚙ Ustawienia** i uzupełnij:

| Klucz | Gdzie zdobyć | Wymagany |
|-------|-------------|----------|
| `OPENROUTER_API_KEY` | [openrouter.ai/keys](https://openrouter.ai/keys) | ✅ tak — LLM (Claude Sonnet 4.6) |
| `NODESHUB_API_KEY` | [nodeshub.io](https://nodeshub.io) | opcjonalny — SERP Google |
| `JINA_API_KEY` | [jina.ai](https://jina.ai) | opcjonalny — scraping konkurencji (20 req/min bez klucza) |

> Klucze zapisywane są lokalnie w `config.json`. Bez `NODESHUB_API_KEY` pipeline działa w trybie **LLM-only** (bez danych SERP).

---

## Skille

### Analiza semantyczna
| Skill | Opis |
|-------|------|
| `csi-definition-helper` | Definiuje Central Entity, Source Context i Central Search Intent |
| `eav-extractor` | Ekstrahuje strukturę Entity-Attribute-Value z tekstu |
| `attribute-classifier` | Klasyfikuje atrybuty encji na Unique, Root i Rare |
| `semantic-role-labels-parser` | Analizuje role semantyczne: Agent, Predicate, Patient, Beneficiary |
| `frame-semantics` | Generuje ramki semantyczne z mapowaniem na sub-queries |

### Optymalizacja contentu
| Skill | Opis |
|-------|------|
| `bluf-generator` | Konwertuje tekst na format BLUF (Bottom Line Up Front) |
| `chunk-optimizer` | Optymalizuje strukturę artykułu pod systemy RAG |
| `cost-of-retrieval-optimizer` | Redukuje koszt przetwarzania strony przez wyszukiwarki |
| `information-density-checker` | Audytuje stosunek faktów do "puchu" |
| `tfidf-analyzer` | Identyfikuje terminologię specjalistyczną vs generyczną |

### Zrozumienie zapytań
| Skill | Opis |
|-------|------|
| `query-expansion` | Rozszerza keyword na powiązane frazy i warianty |
| `query-fanout` | Symuluje dekompozycję zapytań przez AI Search |
| `lexical-expander` | Generuje drzewo relacji leksykalnych (synonimy, hiponimy, antonimy) |

### Keyword Clustering Pipeline
| Skill | Opis |
|-------|------|
| `keyword-expander` | Rozszerza seed keyword o synonimy, pytania i frazy z SERP (PAA, Related, Chips) |
| `keyword-clusterer` | Klasteryzuje keywords embeddingami (Gemini API + K-means/DBSCAN/hierarchiczna) |
| `cluster-namer` | Nazywa klastry, identyfikuje Central Entity i canonical query |
| `cluster-mapper` | Mapuje klastry na topical map CORE/OUTER z rekomendacjami formatu |
| `cluster-validator` | Waliduje klastry przez porównanie SERP (overlap, coherence) |
| `content-gap-detector` | Identyfikuje luki w contencie vs konkurencja z SERP |

Pipeline orchestrowany przez sub-agenta `keyword-clustering-pipeline` z walidacją międzykrokową i SERP enrichment.

### Content Planning Pipeline
| Skill | Opis |
|-------|------|
| `topic-researcher` | Bada temat semantycznie: CSI, ramka semantyczna, query fanout, terminologia |
| `competitor-gap-analyzer` | Analiza konkurencji: SERP + ekstrakcja treści, EAV, klasyfikacja URR, gap analysis |
| `contextual-vector-builder` | Buduje strukturę artykułu: H1/H2/H3 z mapowania URR, BLUF per sekcja, chunki RAG |
| `content-brief-generator` | Kompiluje kompletny brief: 9 sekcji, metryki jakości, checklist 15-punktowy |
| `jina-reader` | Konwertuje URL na markdown przez Jina Reader API (single + batch mode) |

Pipeline orchestrowany przez sub-agenta `content-planner`: topic-researcher → competitor-gap-analyzer → contextual-vector-builder → content-brief-generator. Briefs zapisywane do `data/briefs/`.

### Integracja z wyszukiwarką
| Skill | Opis |
|-------|------|
| `nodeshub-search` | Wyniki Google SERP przez NodeHub API (organic, PAA, related, chips, videos) |

### Meta
| Skill | Opis |
|-------|------|
| `content-auditor` | Kompleksowy audyt contentu przez pryzmat 8 kryteriów semantycznego SEO |
| `skill-creator` | Tworzy i optymalizuje nowe skille Claude |

## Użycie

Skille działają w Claude Code. Wywołaj je przez slash command:

```
/query-expansion "kredyt hipoteczny"
/bluf-generator [wklej tekst do optymalizacji]
/content-auditor [wklej artykuł w markdown]
/keyword-expander "baseny ogrodowe"
/nodeshub-search "baseny ogrodowe"
```

### Keyword Clustering Pipeline

Pełny pipeline od seed keyword do topical map:

```
/keyword-expander "baseny ogrodowe"
/keyword-clusterer [CSV z keywords]
/cluster-namer [CSV z klastrami]
/cluster-validator [CSV z nazwanymi klastrami]
/cluster-mapper [CSV z nazwanymi klastrami]
/content-gap-detector [CSV z nazwanymi klastrami]
```

Lub automatycznie przez sub-agenta:
```
Uruchom keyword-clustering-pipeline dla "baseny ogrodowe"
```

### Content Planning Pipeline

Od tematu do gotowego content briefu:

```
/topic-researcher "kortyzol" (Source Context: portal medyczny)
/competitor-gap-analyzer "kortyzol" (+ wynik topic-researcher)
/contextual-vector-builder (+ wyniki poprzednich kroków)
/content-brief-generator (+ wyniki poprzednich kroków)
```

Lub automatycznie przez sub-agenta:
```
Uruchom content-planner dla "kortyzol" (Source Context: portal medyczny)
```

## Python

### Keyword Clusterer

```bash
python3 .claude/skills/keyword-clusterer/cluster.py INPUT.csv OUTPUT.csv [options]
```

Opcje: `--algorithm kmeans|dbscan|hierarchical`, `--k N`, `--visualize`, `--min-samples N`, `--eps FLOAT`, `--no-cache`

Wymaga: `GEMINI_API_KEY` w `.env`, `pip install -r .claude/skills/keyword-clusterer/requirements.txt`

### NodeHub Search

```bash
python3 .claude/skills/nodeshub-search/nodeshub_search.py "KEYWORD" [hl] [gl] [--json]
```

Wymaga: `NODESHUB_API_KEY` w `.env`, `pip install requests python-dotenv`

### Jina Reader

```bash
python3 .claude/skills/jina-reader/jina_reader.py "URL"
python3 .claude/skills/jina-reader/jina_reader.py --batch urls.txt --output data/competitor_content
```

Opcje: `--batch` (batch mode z pliku URL), `--output` (katalog wyjściowy), `--workers N` (domyślnie 5), `--no-consolidate`, `--json`

Batch mode generuje: pliki `.md` + `_quality_report.txt` + `_consolidated.md` (max 1500 słów/konkurent, z czyszczeniem szumu).

Wymaga: `pip install requests python-dotenv`. Opcjonalnie: `JINA_API_KEY` w `.env`

## Pakowanie skilli

```bash
# Pakowanie
python3 .claude/skills/skill-creator/scripts/package_skill.py .claude/skills/<skill-name> skills/optimized

# Walidacja
python3 .claude/skills/skill-creator/scripts/quick_validate.py .claude/skills/<skill-name>
```

## Struktura repozytorium

```
├── .claude/skills/          # Definicje skilli Claude (27 skilli)
├── .claude/agents/          # Sub-agenty (keyword-clustering-pipeline, content-planner)
├── skills/optimized/        # Spakowane .skill do dystrybucji
├── data/                    # Dane robocze (keywords/, clusters/, embeddings/, briefs/)
├── audyt/                   # Dokumentacja procesu audytu AI Search
├── ai-semantic-seo-full.md  # Materiały kursowe
└── CLAUDE.md                # Instrukcje dla Claude Code
```

## Kluczowe koncepcje

- **Entity-Attribute-Value (EAV)** - struktura danych fundamentalna dla Knowledge Graphs
- **CSI (Central Search Intent)** - główna intencja = Central Entity + Source Context
- **Query Fanout** - dekompozycja pytania użytkownika na 5-10 sub-zapytań przez AI
- **Information Density** - stosunek faktów do słów (wyższy = lepsze cytowanie przez AI)
- **BLUF Format** - odpowiedź na początku, kontekst potem - optymalny dla AI
- **Cost of Retrieval (CoR)** - koszt obliczeniowy ekstrakcji informacji ze strony
- **Semantic Roles** - Agent, Predicate, Patient, Beneficiary w strukturze zdania
- **Attribute Classification** - UNIQUE (wyróżniki) > ROOT (esencja) > RARE (opcjonalne)

## Licencja

MIT
# SEO-OS-DD
