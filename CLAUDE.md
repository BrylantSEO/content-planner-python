# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

Semantic-OS is a collection of Claude AI skills for semantic SEO analysis and AI Search optimization. The skills help with content optimization, query understanding, and entity-based semantic analysis.

## Repository Structure

- **`/skills/`** - Original `.skill` files (ZIP archives) and `optimized/` directory with optimized versions
- **`/.claude/skills/`** - Active skills directory (28 semantic SEO skills + skill-creator + nodeshub-search + jina-reader)
- **`/.claude/agents/`** - Sub-agents (keyword-clustering-pipeline, content-planner, content-auditor-pipeline)
- **`/.claude/settings.local.json`** - Claude permissions configuration
- **`/data/`** - Working data directory (keywords/, clusters/, embeddings/, briefs/, audits/)
- **`.env`** - API keys (GEMINI_API_KEY, NODESHUB_API_KEY) - not tracked in git

## Skills Architecture

Each skill lives in `.claude/skills/<skill-name>/` with a required `SKILL.md` and optional `references/`, `scripts/`, `assets/` directories. Skills are self-contained - use them independently or in sequence.

Packaged `.skill` files (ZIP archives) are in `/skills/optimized/` for distribution.

### Core Semantic Analysis (3 skills)
- **csi-definition-helper** - Central Entity, Source Context, Central Search Intent definitions
- **eav-extractor** - Entity-Attribute-Value structure extraction from text
- **attribute-classifier** - Classifies attributes as Unique/Root/Rare for content prioritization

### Content Optimization (5 skills)
- **bluf-generator** - Bottom Line Up Front format conversion (has `references/transformations.md`)
- **chunk-optimizer** - Article structure optimization for RAG systems
- **cost-of-retrieval-optimizer** - Query processing cost reduction
- **information-density-checker** - Fact-to-filler ratio auditing
- **tfidf-analyzer** - Specialized vs generic terminology analysis

### Query Understanding (5 skills)
- **query-expansion** - Keyword expansion into related phrases and questions
- **query-fanout** - AI Search query decomposition simulation
- **frame-semantics** - Semantic frames mapping to sub-queries
- **lexical-expander** - Synonym/antonym/hypernym/hyponym/meronym relationship trees
- **semantic-role-labels-parser** - Agent/Predicate/Patient/Beneficiary role parsing

### Keyword Clustering Pipeline (6 skills + 1 sub-agent)
- **keyword-expander** - Seed keyword expansion via Token Insertion + Query Expansion + SERP enrichment (PAA, Related, Chips, Filter Sidebar), target 300+ keywords
- **keyword-clusterer** - Embedding-based clustering with `cluster.py` (Gemini API + K-means/DBSCAN/hierarchical), embedding cache, metadata logging
- **cluster-namer** - Cluster naming, Central Entity + canonical query identification (LLM)
- **cluster-mapper** - CORE/OUTER topical map based on attribute type vs Source Context + SERP Intelligence (content format recommendations)
- **cluster-validator** - SERP-based cluster validation (overlap detection, coherence checking)
- **content-gap-detector** - Compares clusters with SERP to identify content gaps (COVERED/GAP/UNIQUE), prioritized P1-P4
- **keyword-clustering-pipeline** (sub-agent) - Orchestrates skills with SERP enrichment, inter-step validation and error recovery

### Content Planning Pipeline (4 skills + 1 tool + 1 sub-agent)
- **topic-researcher** - Semantic topic research: CSI definition, Frame Semantics, Query Fanout, terminology expansion
- **competitor-gap-analyzer** - SERP + content extraction: EAV per competitor, URR classification, gap analysis P1-P4
- **contextual-vector-builder** - Article structure: H1/H2/H3 from URR mapping, BLUF per section, RAG chunk validation
- **content-brief-generator** - Complete brief compilation: 8 sections, quality metrics, checklist, saves to `data/briefs/`
- **jina-reader** - URL to markdown via Jina Reader API (`jina_reader.py`), single + batch mode
- **content-planner** (sub-agent) - Orchestrates topic-researcher → competitor-gap-analyzer → contextual-vector-builder → content-brief-generator

### Search Integration (1 skill)
- **nodeshub-search** - Google SERP results via NodeHub API (organic, PAA, related searches, refine chips, videos, filters)

### Content Audit Pipeline (4 skills + 1 sub-agent)
- **csi-alignment-checker** - CSI alignment audit: infer CSI, extract EAV, compare with SERP benchmark, validate BLUF/chunks/URR placement (standalone use)
- **content-quality-scorer** - 4-dimension quality scoring (CoR + Density + SRL + TF-IDF), each 0-10 with BEFORE/AFTER (standalone use)
- **eeat-evaluator** - E-E-A-T evaluation (Experience + Expertise + Authority + Trust), each 0-10 with suggestions (standalone use)
- **audit-report-generator** - Final audit report: reads scores.md + benchmark.md + source.md, generates CQS 0-100, BEFORE/AFTER, SRL transformations, structure, EEAT blocks
- **content-auditor-pipeline** (sub-agent) - Orchestrates 4 steps: jina-reader → competitor-gap-analyzer → merged analysis (scores.md) → audit report in `data/audits/`

### Meta (2 skills)
- **content-auditor** - Quick 8-dimension content audit (single skill, paste text, CQS 1-10)
- **skill-creator** - Meta-skill for creating and optimizing new skills

## Python Integration

### Keyword Clusterer

```bash
python3 .claude/skills/keyword-clusterer/cluster.py INPUT.csv OUTPUT.csv [options]
```

Options: `--algorithm kmeans|dbscan|hierarchical`, `--k N`, `--visualize`, `--min-samples N`, `--eps FLOAT`, `--no-cache`

Features: embedding cache (`data/embeddings/`), metadata logging (`_metadata.json`), keyword preprocessing, API retry with backoff, k-distance DBSCAN auto-tuning.

Requires: `GEMINI_API_KEY` in `.env`, `pip install -r .claude/skills/keyword-clusterer/requirements.txt`

### NodeHub Search

NodeHub Search skill (`.claude/skills/nodeshub-search/`) provides Google SERP via NodeHub API:

```bash
python3 .claude/skills/nodeshub-search/nodeshub_search.py "KEYWORD" [hl] [gl]
```

- `hl` - language (default: `pl`)
- `gl` - country/location (default: `pl`)
- `--json` - raw JSON output

Returns top 10 organic results + People Also Ask + Related Searches + Refine Chips + Videos + Filter Sidebar.

Requires: `NODESHUB_API_KEY` in `.env`, `pip install requests python-dotenv`

### Jina Reader

Jina Reader skill (`.claude/skills/jina-reader/`) converts URLs to markdown via Jina Reader API:

```bash
python3 .claude/skills/jina-reader/jina_reader.py "URL"
python3 .claude/skills/jina-reader/jina_reader.py --batch urls.txt --output data/competitor_content
```

- `--clean` - apply noise cleaning (nav, images, boilerplate removal) in single URL mode
- `--json` - raw JSON output
- `--batch` - batch mode from file with URLs (parallel, 5 workers)
- `--output` - output directory for batch mode
- `--no-consolidate` - skip quality report and consolidated file generation
- `--workers N` - number of parallel workers (default: 5)

Batch mode auto-generates: individual `.md` files + `_quality_report.txt` (OK/SKIP/ERROR per URL) + `_consolidated.md` (all OK content in one file, max 1500 words/competitor).

Returns title, content (markdown), source URL. Works without API key (20 RPM limit).

Requires: `pip install requests python-dotenv`. Optional: `JINA_API_KEY` in `.env`

## Skill Packaging

To package a skill for distribution:

```bash
python3 .claude/skills/skill-creator/scripts/package_skill.py .claude/skills/<skill-name> skills/optimized
```

To validate a skill without packaging:

```bash
python3 .claude/skills/skill-creator/scripts/quick_validate.py .claude/skills/<skill-name>
```

## Key Domain Concepts

- **Entity-Attribute-Value (EAV)**: Semantic data structure fundamental to Knowledge Graphs
- **Query Fanout**: How AI Search decomposes user questions into 5-10 sub-queries
- **Information Density**: Facts per sentence ratio (higher = better AI citability)
- **BLUF Format**: Answer first, context after - optimized for AI citation
- **Cost of Retrieval (CoR)**: Computational cost for search engine to extract value from a page
- **Semantic Roles**: Agent, Predicate, Patient, Beneficiary in sentence structure
- **CSI (Central Search Intent)**: Core query intent = Central Entity + Source Context
- **Attribute Classification**: UNIQUE (differentiators) > ROOT (essential) > RARE (optional)
