# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

Semantic-OS is a collection of Claude AI skills for semantic SEO analysis and AI Search optimization. The skills help with content optimization, query understanding, and entity-based semantic analysis.

## Repository Structure

- **`/skills/`** - Main skills directory containing 13 `.skill` files (ZIP archives with Markdown documentation)
- **`/.claude/skills/`** - Legacy skills directory with Python-based integrations
- **`/.claude/settings.local.json`** - Claude permissions configuration

## Skills Architecture

Each `.skill` file is a ZIP archive containing Markdown-based skill definitions. Skills are self-contained tools that can be loaded directly into Claude Code sessions. They don't have interdependencies - use them independently or in sequence.

**Core Semantic Analysis:**
- `csi-definition-helper.skill` - Central Entity, Source Context, Central Search Intent definitions
- `eav-extractor.skill` - Entity-Attribute-Value structure extraction
- `attribute-classifier.skill` - Classifies attributes as Unique/Root/Rare

**Content Optimization:**
- `bluf-generator.skill` - Bottom Line Up Front format conversion
- `chunk-optimizer.skill` - Article structure optimization for RAG systems
- `cost-of-retrieval-optimizer.skill` - Query processing cost reduction
- `information-density-checker.skill` - Fact-to-filler ratio auditing
- `tfidf-analyzer.skill` - Specialized vs generic terminology analysis

**Query Understanding:**
- `query-expansion.skill` - Keyword expansion into related phrases
- `query-fanout.skill` - AI Search query decomposition simulation
- `frame-semantics.skill` - Semantic frames mapping to sub-queries
- `lexical-expander.skill` - Synonym/antonym/hypernym relationship trees
- `semantic-role-labels-parser.skill` - Agent/Predicate/Patient/Beneficiary role parsing

## Python Integration

SerpData Search skill (`.claude/skills/serpdata-search/`) provides Google Search API integration:

```bash
python3 ".claude/skills/serpdata-search/serpdata_search.py" "KEYWORD" [hl] [gl]
```

- `hl` - language (default: `pl`)
- `gl` - country/location (default: `pl`)

Returns top 10 organic results + People Also Ask + Related Searches.

## Key Domain Concepts

- **Entity-Attribute-Value (EAV)**: Semantic data structure fundamental to Knowledge Graphs
- **Query Fanout**: How AI Search decomposes user questions into 5-10 sub-queries
- **Information Density**: Facts per sentence ratio (higher = better AI citability)
- **BLUF Format**: Answer first, context after - optimized for AI citation
- **Semantic Roles**: Agent, Predicate, Patient, Beneficiary in sentence structure
- **CSI (Central Search Intent)**: Core query intent that a content piece satisfies
