---
name: contextual-vector-builder
description: >
  Buduje wektor kontekstowy artykułu: H1/H2/H3, BLUF per sekcja, optymalizacja chunków RAG.
  Mapuje atrybuty URR na hierarchię nagłówków. Trzeci krok pipeline planowania treści.
  Użyj podając wyniki topic-researcher i competitor-gap-analyzer.
  Triggery: zbuduj strukturę artykułu, wektor kontekstowy, H1 H2 H3, BLUF sekcji,
  chunki RAG, mapowanie URR na nagłówki.
---

# Contextual Vector Builder

Buduj strukturę artykułu zoptymalizowaną pod RAG i AI Search: nagłówki, BLUF per sekcja, autonomiczne chunki.

## Wymagane inputy

- **CSI** z topic-researcher (CE, SC, predykaty)
- **URR Matrix** z competitor-gap-analyzer (atrybuty UNIQUE/ROOT/RARE)
- **Sub-queries** z topic-researcher
- **Gaps P1-P4** z competitor-gap-analyzer

## Proces budowy

### 1. H1 = CE + UNIQUE + Contextual Domain

Skomponuj H1 łącząc:
- **Central Entity** (obowiązkowa)
- **Najsilniejszy atrybut UNIQUE** (wyróżnik)
- **Domena kontekstowa z SC** (perspektywa)

Wzór: `[CE] - [UNIQUE atrybut]: [kontekst SC]`

Przykład: "Kortyzol - hormon stresu: kompletny przewodnik dla pacjentów"

### 2. BLUF artykułu (Lead)

Napisz BLUF całego artykułu:
- **Max 50 słów, 3 zdania**
- Zdanie 1: Odpowiedź na CSI (co + definicja)
- Zdanie 2: Kluczowy fakt UNIQUE (wyróżnik)
- Zdanie 3: Kontekst SC (dla kogo, dlaczego)

### 3. Mapowanie URR → H2/H3

| Typ atrybutu | Poziom nagłówka | Funkcja w artykule |
|--------------|-----------------|-------------------|
| **UNIQUE** | H1/Lead | Wyróżnik, hook, powód do czytania |
| **ROOT** | H2 | Główne sekcje, obowiązkowe |
| **RARE** | H3 pod ROOT lub FAQ | Pogłębienie, niszowe pytania |
| **GAP P1** | Dedykowany H2 | Obowiązkowy, brak u nas = strata |
| **GAP P2** | H2 lub H3 | Ważny, PAA potwierdza intencję |
| **GAP P3-P4** | H3 lub FAQ | Nice-to-have |

Kolejność H2:
1. ROOT atrybuty z najwyższym pokryciem (5/5 → 3/5)
2. GAP P1 (krytyczne braki)
3. GAP P2 (ważne braki z PAA)
4. ROOT z niższym pokryciem
5. FAQ z RARE + GAP P3-P4

### 4. BLUF per sekcja H2

Dla każdego H2 napisz:
- **1 zdanie BLUF** (max 25 słów) - bezpośrednia odpowiedź
- CE musi być wymieniona (powtarzalność = salience)
- Konkretna wartość/liczba jeśli dostępna

Wzór: `[CE] [predykat] [konkret] [kontekst].`

Przykład: "Kortyzol osiąga najwyższy poziom rano (6:00-8:00) - 10-20 µg/dl, i spada do <5 µg/dl wieczorem."

### 5. Walidacja chunków RAG

Dla każdej sekcji H2 sprawdź:

| Kryterium | Target | Jak naprawić |
|-----------|--------|-------------|
| **Długość** | 200-500 słów | Podziel >500, rozbuduj <200 |
| **Autonomiczność** | Czytelna bez kontekstu | Dodaj CE + definicję na początku |
| **BLUF** | Odpowiedź w 1. zdaniu | Przenieś odpowiedź na górę |
| **CE repeat** | CE w każdej sekcji | Dodaj CE do 1. zdania |
| **Terminy branżowe** | Min 2-3 per sekcja | Dodaj z listy terminologii |
| **Brak referencji** | Bez "jak wspomniano wyżej" | Każdy chunk = samodzielny |

## Format wyjściowy

Najpierw pokaż **spis nagłówków** jako kompaktową strukturę (szybki podgląd całości), potem rozwiń każdy H2/H3 z detalami.

```markdown
# Contextual Vector: [temat]

## H1
**[pełny H1]**

## BLUF artykułu (Lead)
[3 zdania, max 50 słów]

## Spis nagłówków (struktura)

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

## Szczegóły nagłówków (BLUF + wytyczne)

### H2: [nazwa sekcji]
**BLUF:** [1 zdanie]
**Zawartość:** [opis co pokryć, 200-500 słów]
**Sub-queries pokrywane:** [lista]
**Terminy obowiązkowe:** [2-3 terminy branżowe]

#### H3: [podsekcja]
**Zawartość:** [opis]

### H2: [nazwa sekcji #2] ...

### H2: [temat gap P1]
**BLUF:** [1 zdanie]
**Zawartość:** [opis]
**Dlaczego gap:** [pokrycie u konkurencji]

### FAQ
| Pytanie | Źródło |
|---------|--------|
| [pytanie z PAA] | SERP PAA |
| [pytanie z ramki] | Frame Semantics |

## Chunk Validation Summary
| Sekcja | Słowa | Autonomiczna | BLUF | CE repeat |
|--------|-------|-------------|------|-----------|
| H2: [nazwa] | ~350 | OK | OK | OK |

## Podsumowanie
- **Sekcji H2:** X
- **Sekcji H3:** Y
- **FAQ pytań:** Z
- **Pokrycie ROOT:** X/Y (100%?)
- **Pokrycie GAP P1:** X/Y
- **Szacowana długość artykułu:** ~N słów
```

## Wskazówki

- **Nie umieszczaj oznaczeń URR/pokrycia w nagłówkach** — URR to dane wewnętrzne pipeline, nie instrukcja dla copywritera. Nazwy H2/H3 powinny być czytelne i naturalne
- Każdy H2 = autonomiczny chunk w RAG. Musi działać wyrwany z kontekstu
- CE w pierwszym zdaniu każdego H2 = gwarancja salience w embeddingu
- UNIQUE atrybut w H1 i Lead = wyróżnik w AI Search (powód do cytowania TEN artykuł)
- FAQ pokrywa "długi ogon" pytań z ramki semantycznej i PAA
- Nie pisz treści - buduj szkielet z BLUFami i wytycznymi dla copywritera
