# Pipelines — Pełne Flows

## 1. Keyword Clustering Pipeline

**Agent:** `keyword-clustering-pipeline`
**Dane wejściowe:** seed keyword + Source Context
**Dane wyjściowe:** topical map CORE/OUTER w `data/clusters/`

```
keyword-expander (300+ keywords)
  → keyword-clusterer (embeddingi + K-means/DBSCAN)
  → cluster-namer (nazwy + CE + canonical query)
  → cluster-mapper (CORE/OUTER + formaty)
  → cluster-validator (SERP coherence + overlap)
  → content-gap-detector (gaps P1–P4)
```

---

## 2. Content Planning Pipeline

**Agent:** `content-planner`
**Dane wejściowe:** temat artykułu + Source Context
**Dane wyjściowe:** content brief w `data/briefs/`

```
1. Supabase: get_similar_posts()         ← kanibalizacja + internal linking
2. Senuto: get_groups() + get_questions() ← grupy semantyczne + FAQ
3. Senuto: get_positions_data()           ← aktualne pozycje DD
4. topic-researcher                       ← CSI + Frame Semantics + Fanout
5. competitor-gap-analyzer                ← SERP + EAV + URR + gaps
6. contextual-vector-builder              ← H1/H2/H3 + BLUF per sekcja
7. content-brief-generator                ← 8 sekcji + checklist → data/briefs/
```

**Brief musi zawierać:**
- `## Analiza istniejących treści DD` (Supabase similarity)
- `## Propozycje internal linkingu` (3–5 URL z anchor textem)
- `## Dane Senuto` (wolumen, KD, CPC)
- `## Pytania użytkowników` (z get_questions)

---

## 3. Content Audit Pipeline

**Agent:** `content-auditor-pipeline`
**Dane wejściowe:** URL artykułu + fraza kluczowa
**Dane wyjściowe:** raport audytowy w `data/audits/<slug>/`

```
1. BD MCP scrape_as_markdown     ← URL → markdown (treść artykułu) [fallback: jina-reader]
2. competitor-gap-analyzer       ← benchmark SERP (top 10 konkurentów, BD scrape_batch)
3. Merged analysis → scores.md   ← CSI + CoR + Density + SRL + TF-IDF + EEAT
4. audit-report-generator        ← CQS 0–100 + BEFORE/AFTER + rekomendacje
```

**Pliki wyjściowe:**
- `scores.md` — surowe wyniki wszystkich wymiarów
- `benchmark.md` — dane SERP i EAV konkurencji
- `source.md` — oryginalna treść
- `report.md` — finalny raport z CQS, AI Citability Score, Action Plan

---

---

## 4. Źródła danych webowych

| Narzędzie | Zastosowanie | Typ |
|-----------|-------------|-----|
| **Bright Data MCP** (`scrape_as_markdown`, `scrape_batch`) | Scraping URL→markdown (primary) | MCP native |
| **Bright Data MCP** (`search_engine`) | SERP — opcjonalna alternatywa NodeHub dla batch | MCP native |
| **Jina Reader** (`jina_reader.py`) | Scraping URL→markdown (fallback) | Python script |
| **NodeHub** (`nodeshub_search.py`, `query_fanout.py`) | SERP + Query Fanout (primary) | Python script |
| **Gemini API** | Embeddingi tekstowe | Python script |

Priorytet scrape: BD MCP → Jina Reader → poproś użytkownika o wklejenie treści.
NodeHub wymagany dla `/v1/query-fanout` (BD nie ma odpowiednika).

---

## Struktura katalogów danych

```
data/
├── keywords/     ← listy słów kluczowych (CSV)
├── clusters/     ← wyniki klasteryzacji + topical map
├── embeddings/   ← cache embeddingów Gemini
├── briefs/       ← content briefy (MD)
└── audits/       ← raporty audytowe (MD per slug)
```
