# Komendy — Semantic-OS Reference

> Drukuj A4, 1 per uczestnik.

---

## Pipeline'y (agenty orkiestrujące)

### Content Audit Pipeline
```
/content-auditor-pipeline
```
Input: URL artykułu lub tekst wklejony ręcznie
Output: `data/audits/<timestamp>/audit.md` (CQS 0–100, BEFORE/AFTER)
Czas: ~3–5 min

### Content Planning Pipeline
```
/content-planner
```
Input: temat artykułu + Source Context
Output: `data/briefs/<slug>/brief.md` (H1–H3, EAV matrix, checklist)
Czas: ~5–8 min

### Keyword Clustering Pipeline
```
/keyword-clustering-pipeline
```
Input: seed keyword + Source Context
Output: `data/clusters/<slug>/topical_map.md` + wykres t-SNE
Czas: ~10–15 min (w tym ekspansja) lub 3–5 min (pre-generowany CSV)

---

## Python CLI — narzędzia

### Klasteryzacja
```bash
python3 .claude/skills/keyword-clusterer/cluster.py \
  <input.csv> \
  <output.csv> \
  [--k 8] \
  [--algorithm kmeans|dbscan|hierarchical] \
  [--visualize] \
  [--save-embeddings]
```

Opcje:
- `--k 8` — wymuś 8 klastrów (gdy auto daje za mało)
- `--algorithm dbscan` — gdy keywords mają różną gęstość
- `--visualize` — generuj wykres t-SNE (PNG)
- `--save-embeddings` — zapisz cache embeddingów

### Pobieranie treści URL
```bash
python3 .claude/skills/jina-reader/jina_reader.py "<URL>"

# Batch mode (wiele URL)
python3 .claude/skills/jina-reader/jina_reader.py \
  --batch urls.txt --output data/
```

### Wyszukiwanie Google (SERP)
```bash
python3 .claude/skills/nodeshub-search/nodeshub_search.py "<fraza kluczowa>"
```

---

## Skills indywidualne (Claude Code)

### Analiza semantyczna
```
/csi-definition-helper     → CE, SC, CSI dla projektu
/eav-extractor             → EAV trójki z tekstu
/attribute-classifier      → URR klasyfikacja atrybutów
/frame-semantics           → ramka semantyczna tematu
/query-fanout              → dekompozycja pytania na sub-queries
```

### Optymalizacja treści
```
/bluf-generator            → przepisanie na format BLUF
/chunk-optimizer           → analiza struktury pod RAG
/information-density-checker → audyt gęstości informacyjnej
/cost-of-retrieval-optimizer → redukcja CoR
/tfidf-analyzer            → terminologia specjalistyczna
/semantic-role-labels-parser → role Agent/Patient/Predicate
```

### Ocena jakości
```
/content-quality-scorer    → CQS 4 wymiary (CoR+Density+SRL+TF-IDF)
/eeat-evaluator            → E-E-A-T ocena (0–10 per wymiar)
/content-auditor           → szybki audyt 8-wymiarowy (paste text)
/csi-alignment-checker     → zgodność z CSI + EAV gaps
```

### Klasteryzacja i mapa tematyczna
```
/keyword-expander          → ekspansja seed keyword
/keyword-clusterer         → klasteryzacja embeddingami
/cluster-namer             → nazwy klastrów + canonical query
/cluster-mapper            → CORE/OUTER topical map
/cluster-validator         → walidacja SERP (overlap, coherence)
/content-gap-detector      → gaps vs SERP (P1–P4)
```

### Meta
```
/skill-creator             → tworzenie nowych skills
/nodeshub-search           → Google SERP (organic, PAA, related)
/jina-reader               → URL → markdown
/query-expansion           → powiązane frazy i pytania
/lexical-expander          → synonimy, hiponimy, meronimy
```

---

## Parametry Senuto (MCP)

| Parametr | Wartość | Użycie |
|----------|---------|--------|
| `country_id` | `"1"` | Grupy semantyczne, pytania (legacy PL) |
| `country_id` | `"200"` | Pozycje, konkurencja (Base 2.0 PL) |
| `fetch_mode` | `"topLevelDomain"` | Tylko główna domena |
| `fetch_mode` | `"subdomain"` | Wszystkie subdomeny |

---

## Lokalizacje outputów

| Pipeline | Output |
|----------|--------|
| Audyt | `data/audits/<timestamp>/audit.md` |
| Brief | `data/briefs/<slug>/brief.md` |
| Topical map | `data/clusters/<slug>/topical_map.md` |
| Klastry CSV | `data/clusters/<slug>_clusters.csv` |
| Embeddingi | `data/embeddings/<slug>_cache.json` |
| Wykres t-SNE | `data/clusters/<slug>_visualization.png` |
