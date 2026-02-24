# CLAUDE.md

Semantic-OS — zestaw skills Claude do semantycznego SEO i optymalizacji pod AI Search, skrojony dla agencji **Double Digital** (double-digital.pl).

---

## Klient

**CE:** Double Digital — polska agencja performance marketingu (Google Partner, 25+ krajów, od 2022).
**SC:** Performance marketing dla e-commerce i leadgen B2B. Specjalizacja: Google Ads, Meta Ads, SEO AI, GA4/BigQuery, CRO.
**CSI:** Właściciele e-commerce i marketerzy B2B szukający mierzalnych wyników (ROAS, leady) przez data-driven performance marketing.

→ Pełny kontekst klienta: [`references/client.md`](references/client.md)

---

## REGUŁA OBOWIĄZKOWA — Przed każdym content briefem

Wykonaj **w tej kolejności**, bez wyjątków:

1. **Supabase** (`mcp__supabase__execute_sql`) — analiza podobnych wpisów w `blog_vectors_double` → kanibalizacja + internal linking
2. **Senuto** (`get_groups` + `get_questions` + `get_positions_data`) — grupy semantyczne, pytania użytkowników (FAQ), aktualne pozycje DD
3. **Synteza** — odróżnij artykuł od istniejących, wpleć internal links, priorytetyzuj keywords wg KD/wolumenu

Brief musi zawierać: `## Analiza istniejących treści DD` · `## Propozycje internal linkingu` · `## Dane Senuto` · `## Pytania użytkowników`

→ Pełny workflow z SQL i przykładami: [`references/mcp-workflow.md`](references/mcp-workflow.md)

---

## Struktura repozytorium

| Ścieżka | Zawartość |
|---------|-----------|
| `.claude/skills/` | 28+ skills semantycznego SEO |
| `.claude/agents/` | Sub-agenty pipeline (clustering, content-planner, content-auditor) |
| `data/` | Dane robocze: keywords/, clusters/, embeddings/, briefs/, audits/ |
| `skills/optimized/` | Spakowane `.skill` ZIP do dystrybucji |
| `.env` | API keys: GEMINI_API_KEY, NODESHUB_API_KEY |

---

## On-Demand Context

Czytaj te pliki gdy potrzebujesz szczegółów dla danego zadania:

| Temat | Plik |
|-------|------|
| Pełny kontekst klienta, usługi, filozofia | [`references/client.md`](references/client.md) |
| MCP workflow — SQL, progi similarity, format output | [`references/mcp-workflow.md`](references/mcp-workflow.md) |
| Katalog wszystkich skills (28+) z opisami | [`references/skills.md`](references/skills.md) |
| CLI: cluster.py, nodeshub_search.py, jina_reader.py | [`references/python-tools.md`](references/python-tools.md) |
| Flow pipeline: clustering, content planning, audit | [`references/pipelines.md`](references/pipelines.md) |
| Słownik: EAV, BLUF, CoR, Query Fanout, CSI, URR | [`references/domain-concepts.md`](references/domain-concepts.md) |
