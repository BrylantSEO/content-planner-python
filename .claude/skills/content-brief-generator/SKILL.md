---
name: content-brief-generator
description: >
  Kompiluje kompletny content brief z wyników pipeline: CSI, URR, wektor kontekstowy.
  Waliduje metryki jakości (TF-IDF, density). Zapisuje brief do data/briefs/.
  Czwarty (finalny) krok pipeline planowania treści.
  Triggery: wygeneruj brief, content brief, brief artykułu, skompiluj brief,
  finalizuj brief, zapisz brief.
allowed-tools: Write
---

# Content Brief Generator

Kompiluj kompletny content brief na podstawie wyników 3 poprzednich kroków pipeline. Waliduj metryki i zapisz do pliku.

## Wymagane inputy

- **CSI + terminologia** z topic-researcher
- **URR Matrix + Gaps** z competitor-gap-analyzer
- **Contextual Vector** (H1/H2/H3 + BLUF) z contextual-vector-builder

## Sekcje briefu (9)

### 1. CSI & Fundamenty

| Element | Wartość |
|---------|---------|
| CE | [Central Entity] |
| SC | [Source Context] |
| CSI | [Central Search Intent] |
| Predykaty | [3-5 czasowników] |
| Canonical query | [główna fraza] |

Ramka semantyczna (priorytetyzowana) — elementy z topic-researcher z podziałem na CORE/OUTER.

### 2. EAV Matrix & Klasyfikacja URR

Z competitor-gap-analyzer:
- Pełna tabela EAV z pokryciem (ilu z N konkurentów pokrywa dany atrybut)
- Klasyfikacja URR per atrybut (UNIQUE 1-2/N, ROOT 5+/N, RARE 3-4/N)
- Podsumowanie: ile ROOT / RARE / UNIQUE

### 3. Content Gaps & Priorytety

Z competitor-gap-analyzer:
- Gaps P1 → dedykowane H2 (obowiązkowe)
- Gaps P2 → H2 lub H3
- Gaps P3-P4 → H3/FAQ
- UNIQUE opportunities → wyróżniki w Lead/H1

### 4. Struktura artykułu

Najpierw pokaż **spis nagłówków** w bloku kodu jako kompaktowy podgląd całej struktury, potem rozwiń każdy H2/H3 z detalami.

```markdown
### Spis nagłówków (struktura)

```
H1: [tytuł]
  Lead BLUF
  H2: [sekcja 1]
    H3: [podsekcja]
  H2: [sekcja 2]
  H2: [sekcja 3]
    H3: [podsekcja]
  ...
  H2: FAQ
```

### Szczegóły nagłówków (BLUF + wytyczne)
[H1 + BLUF artykułu + każdy H2 z BLUF, szacowaną długością i sub-queries + H3]
```

**Nie pokazuj oznaczeń URR ani pokrycia przy nagłówkach** — to dane wewnętrzne pipeline, nie instrukcja dla copywritera.

### 5. Metryki jakości (walidacja)

Oceń planowany artykuł pod kątem 2 metryk:

**TF-IDF Score:**
- Lista terminów branżowych obowiązkowych (z topic-researcher terminologia)
- Target: min 10 terminów specjalistycznych w artykule
- Stosunek specjalistyczne:generyczne > 1:3

**Information Density:**
- Target per sekcja: min 3 fakty weryfikowalne
- Brak zdań "puchowych" w BLUF
- Każdy H2 = min 1 konkretna liczba/wartość

### 6. Checklist dla copywritera

```
### Struktura i format
[ ] H1 zawiera CE + UNIQUE atrybut
[ ] Lead/BLUF: 3 zdania, max 50 słów, odpowiedź na CSI
[ ] Każdy H2 zaczyna się od BLUF (1 zdanie z odpowiedzią)
[ ] Sekcje H2: 200-500 słów (optymalny chunk RAG)
[ ] CE powtórzona min 2× w każdym H2 (salience)
### Treść merytoryczna
[ ] ROOT atrybuty pokryte w dedykowanych H2
[ ] GAP P1 pokryte (obowiązkowe)
[ ] UNIQUE atrybut wyeksponowany w Lead
[ ] Tabele tam gdzie konieczne (normy, porównania metod)
### Optymalizacja AI Search
[ ] FAQ pokrywa PAA pytania z SERP
[ ] Brak "jak wspomniano wyżej" (autonomiczność chunków)
[ ] Min 10 terminów branżowych (TF-IDF)
[ ] Min 3 weryfikowalne fakty per H2 (information density)
[ ] Bold na kluczowych wartościach (Cost of Retrieval)
### Długość i format
[ ] Szacowana długość artykułu podana
```

### 7. TOP 3 Content Gaps (P1-P2) — wyróżniki artykułu

Wypisz 3 najważniejsze luki P1-P2 z gap analysis jako wyróżniki planowanego artykułu vs konkurencja. Każdy gap z uzasadnieniem dlaczego to szansa i jak SC daje przewagę.

### 8. UNIQUE wyróżniki do wyeksponowania

Tabela UNIQUE atrybutów z angle specyficznym dla SC:

| # | Atrybut UNIQUE | Angle [SC] |
|---|---------------|------------|
| 1 | [atrybut] | [jak SC pozwala to rozwinąć lepiej niż konkurencja] |

### 9. Keywords & Terminy

| Kategoria | Terminy |
|-----------|---------|
| **Primary keyword** | [canonical query] |
| **Secondary keywords** | [sub-queries top 5] |
| **Branżowe (TF-IDF)** | [terminologia specjalistyczna] |
| **Synonimy CE** | [z lexical-expander] |
| **Long-tail (FAQ)** | [pytania z PAA + ramki] |
| **PAA / Related** | [pytania z SERP] |

## Format wyjściowy

Zapisz brief jako `data/briefs/[slug]/brief.md`:

```markdown
# Content Brief: [temat]

**Data:** [YYYY-MM-DD]
**Pipeline:** topic-researcher → competitor-gap-analyzer → contextual-vector-builder → content-brief-generator
**CE:** [encja] | **SC:** [perspektywa] | **CSI:** [intencja]

---

## 1. CSI & Fundamenty
[tabela + ramka semantyczna]

## 2. EAV Matrix & Klasyfikacja URR
[pełna tabela EAV z pokryciem i URR + podsumowanie]

## 3. Content Gaps & Priorytety
[gaps P1-P4 + UNIQUE]

## 4. Struktura artykułu (Contextual Vector)

### Spis nagłówków
[lista H1/H2/H3 jako szybki podgląd]

### Szczegóły nagłówków (BLUF + wytyczne)
[H1 z BLUF artykułu + każdy H2 z BLUF, szacowaną długością + H3]

## 5. Metryki jakości
[TF-IDF + density targets]

## 6. Checklist dla copywritera
[lista kontrolna — 15 punktów w 4 kategoriach]

## 7. TOP 3 Content Gaps (P1-P2) — wyróżniki artykułu
[3 najważniejsze luki z uzasadnieniem]

## 8. UNIQUE wyróżniki do wyeksponowania
[tabela UNIQUE atrybutów z angle SC]

## 9. Keywords & Terminy
[tabela terminów]
```

## Konwencja nazewnictwa

`data/briefs/[slug]/brief.md`

- Slug: lowercase, spacje → underscore, bez polskich znaków
- Przykład: `data/briefs/kortyzol/brief.md`

## Wskazówki

- Brief to NIE artykuł - to instrukcja dla copywritera
- Każda sekcja briefu musi być actionable (co zrobić, nie co wiedzieć)
- BLUF w briefie = BLUF w artykule (przepisz dosłownie)
- Checklist = minimalne kryteria akceptacji
- Metryki = cele do zmierzenia po napisaniu artykułu
