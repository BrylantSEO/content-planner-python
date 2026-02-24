# Skills Catalog

Każdy skill w `.claude/skills/<skill-name>/` zawiera `SKILL.md` + opcjonalne `references/`, `scripts/`, `assets/`.

---

## Core Semantic Analysis

| Skill | Funkcja |
|-------|---------|
| `csi-definition-helper` | Definiuje CE, Source Context, CSI |
| `eav-extractor` | Ekstrahuje trójki Entity-Attribute-Value |
| `attribute-classifier` | Klasyfikuje atrybuty jako Unique / Root / Rare |

## Content Optimization

| Skill | Funkcja |
|-------|---------|
| `bluf-generator` | Konwersja do formatu BLUF (answer first) |
| `chunk-optimizer` | Optymalizacja struktury dla RAG |
| `cost-of-retrieval-optimizer` | Redukcja kosztu ekstrakcji przez wyszukiwarki |
| `information-density-checker` | Audyt stosunku fakty/puch |
| `tfidf-analyzer` | Terminologia specjalistyczna vs generyczna |

## Query Understanding

| Skill | Funkcja |
|-------|---------|
| `query-expansion` | Rozszerzenie keywordu na powiązane frazy |
| `query-fanout` | Symulacja dekompozycji zapytania w AI Search |
| `frame-semantics` | Ramki semantyczne → sub-queries |
| `lexical-expander` | Drzewo: synonimy, hiponimy, hiperonimy, meronimy |
| `semantic-role-labels-parser` | Role Agent/Predicate/Patient/Beneficiary |

## Keyword Clustering Pipeline

| Skill | Funkcja |
|-------|---------|
| `keyword-expander` | Ekspansja seed keyword (Token Insertion + SERP), cel: 300+ keywords |
| `keyword-clusterer` | Klasteryzacja embeddingami (Gemini + K-means/DBSCAN/hierarchical) |
| `cluster-namer` | Nazwy klastrów + Central Entity + canonical query |
| `cluster-mapper` | Topical map CORE/OUTER + rekomendacje formatów |
| `cluster-validator` | Walidacja SERP (overlap, coherence) |
| `content-gap-detector` | Gaps vs SERP (COVERED/GAP/UNIQUE), priorytet P1–P4 |
| **`keyword-clustering-pipeline`** (agent) | Orkiestruje cały flow z walidacją |

## Content Planning Pipeline

| Skill | Funkcja |
|-------|---------|
| `topic-researcher` | CSI + Frame Semantics + Query Fanout + terminologia |
| `competitor-gap-analyzer` | SERP + EAV per competitor + URR + gap P1–P4 |
| `contextual-vector-builder` | H1/H2/H3 z URR, BLUF per sekcja, walidacja chunków |
| `content-brief-generator` | Kompletny brief (8 sekcji), zapis do `data/briefs/` |
| `jina-reader` | URL → markdown (Jina Reader API) |
| **`content-planner`** (agent) | Orkiestruje: Supabase → Senuto → 4 skills → brief |

## Content Audit Pipeline

| Skill | Funkcja |
|-------|---------|
| `csi-alignment-checker` | Audyt CSI: EAV, SERP benchmark, BLUF/chunks/URR |
| `content-quality-scorer` | 4 wymiary (CoR + Density + SRL + TF-IDF), 0–10 |
| `eeat-evaluator` | E-E-A-T (Experience/Expertise/Authority/Trust), 0–10 |
| `audit-report-generator` | Raport CQS 0–100, BEFORE/AFTER, z `data/audits/` |
| **`content-auditor-pipeline`** (agent) | Orkiestruje: jina → gap → scores → raport |

## Search Integration

| Skill | Funkcja |
|-------|---------|
| `nodeshub-search` | Google SERP via NodeHub API (organic, PAA, related, chips) |

## Meta

| Skill | Funkcja |
|-------|---------|
| `content-auditor` | Szybki audyt 8-wymiarowy (CQS 1–10, paste text) |
| `skill-creator` | Tworzenie i optymalizacja nowych skills |
