# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

Semantic-OS is a collection of Claude AI skills for semantic SEO analysis and AI Search optimization. The skills help with content optimization, query understanding, and entity-based semantic analysis.

## Repository Structure

- **`/skills/`** - Original `.skill` files (ZIP archives) and `optimized/` directory with optimized versions
- **`/.claude/skills/`** - Active skills directory (14 semantic SEO skills + skill-creator + serpdata-search)
- **`/.claude/settings.local.json`** - Claude permissions configuration

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

### Meta (2 skills)
- **content-auditor** - Comprehensive 8-dimension content audit combining all semantic SEO criteria
- **skill-creator** - Meta-skill for creating and optimizing new skills

## Python Integration

SerpData Search skill (`.claude/skills/serpdata-search/`) provides Google Search API integration:

```bash
python3 ".claude/skills/serpdata-search/serpdata_search.py" "KEYWORD" [hl] [gl]
```

- `hl` - language (default: `pl`)
- `gl` - country/location (default: `pl`)

Returns top 10 organic results + People Also Ask + Related Searches.

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
