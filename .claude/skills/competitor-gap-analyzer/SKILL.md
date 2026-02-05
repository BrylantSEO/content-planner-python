---
name: competitor-gap-analyzer
description: >
  Analizuje konkurencję przez SERP + ekstrakcję treści: pobiera top wyniki, wyciąga EAV,
  klasyfikuje atrybuty (URR) i identyfikuje content gaps. Drugi krok pipeline planowania treści.
  Użyj podając temat, Source Context i opcjonalnie wynik topic-researcher.
  Triggery: analiza konkurencji, gap analysis, EAV konkurencji, co pokrywa konkurencja,
  URR z SERP, zbadaj konkurentów.
allowed-tools: Bash(python3 *), Read, Write
---

# Competitor Gap Analyzer

Analizuj konkurencję: SERP → treść → EAV → klasyfikacja URR → gap analysis.

## Wymagane inputy

- **Temat / CE** z topic-researcher
- **Source Context** serwisu
- **Sub-queries** z topic-researcher (opcjonalnie - wzbogacają analizę)

## Proces analizy

### 1. Pobranie SERP (nodeshub-search)

```bash
python3 .claude/skills/nodeshub-search/nodeshub_search.py "TEMAT"
```

Zapisz:
- **Top 10 URLs** z organic results
- **PAA pytania** → tematy do pokrycia
- **Related Searches** → synonimy/warianty CE, konteksty boczne
- **Refine Chips** → potencjalne atrybuty do sprawdzenia w EAV Matrix
- **Filter Sidebar** → kategorie/aspekty CE do uwzględnienia w strukturze

Jeśli API niedostępny → poproś użytkownika o ręczne podanie 3-5 URLs konkurentów.

### 1b. Walidacja sub-queries z SERP (SERP grounding)

Jeśli otrzymano sub-queries z topic-researcher, porównaj je z danymi SERP:

| Status | Kryterium | Priorytet |
|--------|-----------|-----------|
| **[CONFIRMED]** | Sub-query pokrywa się z PAA | P1 |
| **[CONFIRMED]** | Sub-query pokrywa się z Related Searches | P1 |
| **[PREDICTED]** | Sub-query nie występuje w SERP | P2 |
| **[SERP-ONLY]** | Pytanie z PAA/Related nie pokryte przez sub-queries | DODAJ jako nowy gap |

Dodaj tagi [CONFIRMED]/[PREDICTED] do sub-queries. Pytania [SERP-ONLY] dodaj do listy gaps.

### 1c. Wzbogacenie z SERP

- **Related Searches** → dodaj do terminologii (synonimy/warianty CE)
- **Refine Chips** → potencjalne atrybuty do sprawdzenia w EAV Matrix
- **Filter Sidebar** → kategorie/aspekty CE do uwzględnienia w strukturze

### 2. Ekstrakcja treści (jina-reader)

Pobierz treść **wszystkich top 10** z organic results (batch mode z auto-konsolidacją):

```bash
# Zapisz URLs do pliku (jeden URL per linia)
# Uruchom batch (parallel fetch + quality report + consolidated output):
python3 .claude/skills/jina-reader/jina_reader.py --batch urls.txt --output data/briefs/[slug]/competitors/
```

Batch automatycznie generuje:
- `_quality_report.txt` — status OK/SKIP/ERROR + word count per URL
- `_consolidated.md` — treść wszystkich OK konkurentów w jednym pliku (max 1500 słów/konkurent)
- Indywidualne pliki `.md` — backup

**Primary input do dalszej analizy:** `_consolidated.md` (czytaj zamiast indywidualnych plików).

Jeśli jina-reader całkowicie niedostępny → poproś użytkownika o wklejenie treści konkurentów.

### 2b. Walidacja jakości ekstrakcji

Sprawdź `_quality_report.txt` — raport generowany automatycznie przez batch mode:
- Pliki < 200 słów → SKIP (nie trafiają do `_consolidated.md`)
- < 7 OK konkurentów → warning w raporcie, dodaj notę o obniżonej jakości analizy

### 3. EAV Extraction per konkurent (analiza LLM — czytaj tekst, wyciągaj trójki)

Czytaj `_consolidated.md` i wyciągnij trójki Entity-Attribute-Value bezpośrednio z tekstu. NIE uruchamiaj skryptów Python — to analiza językowa wykonywana przez LLM:

| Entity | Attribute | Value | Źródło |
|--------|-----------|-------|--------|
| [CE] | [atrybut] | [wartość] | Konkurent #1 |

Zlicz pokrycie: ile konkurentów pokrywa dany atrybut.

### 4. Klasyfikacja URR (UNIQUE / ROOT / RARE)

Klasyfikuj każdy atrybut na podstawie pokrycia:

| Typ | Kryterium | Priorytet w treści |
|-----|-----------|-------------------|
| **UNIQUE** | W 1-2 z 10 konkurentów lub brak u nikogo | H1/Lead - wyróżnik |
| **ROOT** | W 5+ z 10 konkurentów | H2 - obowiązkowy |
| **RARE** | W 3-4 konkurentów, niszowy | H3/FAQ - opcjonalny |

### 5. Gap Analysis: COVERED / GAP / UNIQUE

Porównaj atrybuty konkurencji z planowaną treścią:

| Status | Definicja | Akcja |
|--------|-----------|-------|
| **COVERED** | Atrybut obecny u konkurencji i w planie | Pokryj na poziomie ROOT minimum |
| **GAP** | Atrybut u konkurencji, brak w planie | Dodaj do briefu (priorytet wg URR) |
| **UNIQUE** | Atrybut brak u konkurencji | Potencjalny wyróżnik → H1/Lead |

Priorytetyzacja gaps:
- **P1**: ROOT atrybut w 7+ z 10 konkurentów (musisz mieć)
- **P2**: ROOT atrybut w 5-6 konkurentów + PAA (Google potwierdza intencję)
- **P3**: RARE atrybut z PAA/Related (dodatkowa wartość)
- **P4**: RARE atrybut w 1-2 konkurentów (nice-to-have)

## Format wyjściowy

```markdown
# Competitor Gap Analysis: [temat]

## SERP Overview
- Query: [temat]
- Analizowanych konkurentów: X
- Łącznie atrybutów: Y

## EAV Matrix

| Atrybut | Typ URR | K1 | K2 | K3 | K4 | K5 | K6 | K7 | K8 | K9 | K10 | Pokrycie |
|---------|---------|----|----|----|----|----|----|----|----|----|----|----------|
| [atr] | UNIQUE | - | - | - | - | - | - | - | - | - | + | 1/10 |
| [atr] | ROOT | + | + | + | + | + | + | + | + | - | - | 8/10 |
| [atr] | RARE | + | - | + | - | + | - | - | - | - | - | 3/10 |

## Gap Analysis

### P1 - Krytyczne (musisz pokryć)
| Gap | Typ | Pokrycie SERP | Akcja |
|-----|-----|---------------|-------|
| [atrybut] | ROOT | 4/5 | Dedykowana sekcja H2 |

### P2 - Wysokie
...

### P3 - Średnie
...

### P4 - Niskie
...

## UNIQUE Opportunities (wyróżniki)
| Atrybut | Dlaczego unikalny | Rekomendacja |
|---------|-------------------|--------------|
| [atr] | Brak u konkurencji | Lead/H1 wyróżnik |

## Podsumowanie dla kolejnych kroków
- **ROOT atrybuty (obowiązkowe H2):** [lista]
- **UNIQUE wyróżniki (Lead/H1):** [lista]
- **Top 3 gaps P1:** [lista]
- **Rekomendowane H3/FAQ z RARE:** [lista]
```

## Graceful degradation

| Brak | Fallback |
|------|----------|
| nodeshub-search API | Poproś o ręczne URLs lub pomiń SERP |
| jina-reader / API | Poproś o wklejenie treści konkurentów |
| Oba narzędzia | Generuj EAV na podstawie wiedzy LLM + sub-queries z topic-researcher |

## Wskazówki

- Pobieraj treść wszystkich top 10 z SERP (pełne pokrycie konkurencji)
- ROOT atrybuty = non-negotiable w treści. Brak = gorszy ranking
- UNIQUE = największa szansa na wyróżnienie w AI Search (citation uniqueness)
- PAA z SERP to walidacja intencji użytkownika - traktuj jako P2 minimum
