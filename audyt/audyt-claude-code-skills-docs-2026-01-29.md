# Audyt contentu: Claude Code Skills Documentation

**URL:** https://code.claude.com/docs/en/skills
**Data audytu:** 2026-01-29

## Kontekst semantyczny
| Element | Wartość |
|---------|---------|
| Central Entity | Claude Code Skills |
| Source Context | Oficjalna dokumentacja techniczna Anthropic |
| Central Search Intent | "how to create and use Claude Code skills" / "Claude Code custom commands" |

---

## Podsumowanie

### Content Quality Score: 8.1/10

| Wymiar | Score | Status |
|--------|-------|--------|
| Information Density | 9/10 | ✅ |
| EAV Structure | 8/10 | ✅ |
| BLUF | 7/10 | 🟡 |
| Chunk Optimization | 8/10 | ✅ |
| Cost of Retrieval | 9/10 | ✅ |
| TF-IDF | 9/10 | ✅ |
| Semantic Roles | 8/10 | ✅ |
| Attribute Classification | 7/10 | 🟡 |

**AI Citability Score:** Wysoki

---

## TOP 3 problemów do naprawy

### 1. Brak BLUF w sekcji otwierającej
**Wymiar:** BLUF
**Fragment:** "Skills extend what Claude can do. Create a `SKILL.md` file with instructions, and Claude adds it to its toolkit."
**Problem:** Wstęp jest ogólnikowy - nie mówi CZYM są skills ani JAKIE problemy rozwiązują. Brakuje definicji w pierwszym zdaniu.
**Rekomendacja:** "Claude Code skills are reusable instruction sets stored in SKILL.md files that extend Claude's capabilities with custom commands, workflows, and domain knowledge. Create a skill by writing a SKILL.md file with YAML frontmatter and markdown instructions."
**Wpływ:** AI Search często cytuje pierwsze 50 słów - obecna wersja nie daje pełnej odpowiedzi na "what are Claude Code skills?"

### 2. Sekcja "Where skills live" bez definicji BLUF
**Wymiar:** BLUF
**Fragment:** "Where you store a skill determines who can use it:"
**Problem:** Zdanie wprowadzające nie daje odpowiedzi - wymusza czytanie tabeli. AI może nie zacytować właściwej odpowiedzi.
**Rekomendacja:** "Skills can be stored in 4 locations: enterprise (all org users), personal (~/.claude/skills/), project (.claude/skills/), or plugin. Enterprise overrides personal, personal overrides project."
**Wpływ:** Sub-query "where to put Claude skills" nie otrzyma bezpośredniej odpowiedzi.

### 3. Brak hierarchii atrybutów UNIQUE
**Wymiar:** Attribute Classification
**Fragment:** Całość dokumentu
**Problem:** Dokumentacja nie eksponuje UNIQUE atrybutów skills na początku (np. że skills to jedyny sposób na custom slash commands, że działa cross-project).
**Rekomendacja:** Dodać sekcję "Key capabilities" po wstępie z UNIQUE atrybutami: "Skills are the only way to: create custom /commands, share prompts across projects, define tool restrictions, run isolated subagents."
**Wpływ:** Użytkownicy szukający wyróżników Claude Code vs konkurencja nie dostaną jasnej odpowiedzi.

---

## Szczegółowa analiza

### 1. Information Density [9/10]
**Mocne strony:**
- Konkretne ścieżki plików (`~/.claude/skills/<skill-name>/SKILL.md`)
- Precyzyjne wartości (15,000 characters budget)
- Kompletne przykłady kodu z działającym kodem
- Tabele z konkretnymi danymi

**Problemy:**
| Fragment | Problem | Sugestia |
|----------|---------|----------|
| "This supports monorepo setups where packages have their own skills" | Ogólnik bez przykładu | "Example: `packages/frontend/.claude/skills/` for React-specific skills" |
| "Keep SKILL.md under 500 lines" | Brak uzasadnienia | "Keep SKILL.md under 500 lines (larger files increase context loading time)" |

### 2. EAV Structure [8/10]
**Zidentyfikowane encje:** Skills, SKILL.md, frontmatter, subagents, plugins, hooks, permissions
**Trójki EAV:** ~45

| Entity | Attribute | Value | Kompletność |
|--------|-----------|-------|-------------|
| SKILL.md | location-personal | `~/.claude/skills/<name>/SKILL.md` | ✅ |
| SKILL.md | location-project | `.claude/skills/<name>/SKILL.md` | ✅ |
| frontmatter.name | max-length | 64 characters | ✅ |
| frontmatter.name | allowed-chars | lowercase, numbers, hyphens | ✅ |
| context | value-fork | runs in isolated subagent | ✅ |
| skill-descriptions | char-budget | 15,000 characters | ✅ |
| SKILL.md | recommended-max-lines | 500 | ✅ |

### 3. BLUF [7/10]
**Analiza sekcji H2:**

| Sekcja | BLUF? | Pierwsze 50 słów | Problem |
|--------|-------|------------------|---------|
| Getting started | Tak | "Create your first skill" - jasne | OK |
| Where skills live | Nie | "Where you store a skill determines..." | Brak odpowiedzi bezpośredniej |
| Configure skills | Nie | "Skills are configured through YAML frontmatter..." | OK ale ogólne |
| Control who invokes | Tak | "By default, both you and Claude can invoke any skill..." | Dobry BLUF |
| Run skills in subagent | Nie | "Add context: fork to your frontmatter when..." | Brak "what is subagent" najpierw |

### 4. Chunk Optimization [8/10]
**Mapa dystrybucji terminów:**
```
Getting started:     ██████████ (12 terminów: skill, SKILL.md, frontmatter, description)
Where skills live:   ████████░░ (10 terminów: enterprise, personal, project, plugin)
Configure skills:    ██████████ (15 terminów: frontmatter, allowed-tools, context, agent)
Advanced patterns:   ██████████ (14 terminów: fork, subagent, inject, dynamic)
Troubleshooting:     ██████░░░░ (6 terminów)
```

**Autonomiczność sekcji:**
| Sekcja | Autonomiczna? | Problem |
|--------|---------------|---------|
| Getting started | Tak | - |
| Frontmatter reference | Tak | - |
| Run skills in subagent | Nie | "For the inverse... see Subagents" - wymaga kontekstu |
| Share skills | Nie | Zbyt krótka sekcja (<50 słów bez przykładu) |

### 5. Cost of Retrieval [9/10]
**Elementy obniżające koszt:**
- Czysta hierarchia H1→H2→H3
- Tabele z parametrami frontmatter
- Bloki kodu z syntax highlighting
- Note/Tip/Warning callouts
- Konkretne przykłady inline

**Elementy zwiększające koszt:**
- Sekcja "Generate visual output" bardzo długa (~200 linii kodu)
- Brak summary/TL;DR dla całego dokumentu

### 6. TF-IDF [9/10]
**Terminy wysokie IDF:**
- `SKILL.md`, `frontmatter`, `disable-model-invocation`, `user-invocable`, `context: fork`, `$ARGUMENTS`, `allowed-tools`, `agent`, `subagent`

**Terminy niskie IDF (do usunięcia):**
- "powerful pattern" (linia o visual output)
- "keeps SKILL.md focused on the essentials"

**Brakujące terminy branżowe:**
- "prompt injection" (w kontekście bezpieczeństwa)
- "token budget" (zamiast "character budget")

### 7. Semantic Roles [8/10]
**Dominujący Agent:** "You" (użytkownik) i "Claude"
**Zgodność z CE:** Tak - skills jako obiekt działań

| Zdanie | Agent | Patient | Rekomendacja |
|--------|-------|---------|--------------|
| "Skills extend what Claude can do" | Skills | Claude's capabilities | OK - skills jako agent |
| "You can type /skill-name to invoke it" | You | skill | OK |
| "Claude can load it automatically" | Claude | skill | OK |

### 8. Attribute Classification [7/10]
**Hierarchia atrybutów:**

| Typ | Atrybut | Pozycja w tekście | Status |
|-----|---------|-------------------|--------|
| UNIQUE | Custom slash commands | Intro | OK |
| UNIQUE | Cross-project sharing | Where skills live | Średnio eksponowany |
| UNIQUE | Tool restrictions (allowed-tools) | Configure skills | Dobrze |
| ROOT | YAML frontmatter | Configure skills | OK |
| ROOT | Markdown content | Configure skills | OK |
| RARE | Agent Skills standard | Intro (note) | Za wcześnie |
| RARE | CLAUDE_SESSION_ID | String substitutions | OK |

---

## Rekomendacje priorytetyzowane

| Priorytet | Akcja | Wymiar | Wpływ na AI Citability |
|-----------|-------|--------|------------------------|
| 🔴 Wysoki | Przepisać intro na format BLUF z definicją | BLUF | AI będzie cytować poprawną definicję skills |
| 🔴 Wysoki | Dodać "Key capabilities" z UNIQUE atrybutami | Attribute Classification | Odpowiedzi na "what can Claude skills do" |
| 🟡 Średni | Dodać BLUF do "Where skills live" | BLUF | Lepsza odpowiedź na "where to put skills" |
| 🟡 Średni | Rozbudować sekcję "Share skills" | Chunk Optimization | Autonomiczny chunk o dystrybucji |
| 🟢 Niski | Dodać TL;DR na górze | Cost of Retrieval | Szybsza ekstrakcja dla AI |
| 🟢 Niski | Usunąć "powerful pattern" | Information Density | Mniej puchu |

---

## Quick wins (do wdrożenia od razu)

1. **Przepisać pierwsze zdanie** - "Claude Code skills are reusable SKILL.md files that add custom /commands, tool restrictions, and shared workflows to Claude."
2. **Dodać BLUF do "Where skills live"** - "Store skills in ~/.claude/skills/ (personal) or .claude/skills/ (project). Enterprise > personal > project priority."
3. **Usunąć "powerful pattern"** z sekcji visual output - zamienić na "This pattern works for..."
