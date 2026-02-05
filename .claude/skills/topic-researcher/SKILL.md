---
name: topic-researcher
description: >
  Bada temat artykułu od strony semantycznej: definiuje CSI, generuje ramkę semantyczną,
  rozkłada na sub-queries (query fanout) i rozszerza terminologię. Pierwszy krok pipeline
  planowania treści. Użyj podając temat artykułu i Source Context serwisu.
  Triggery: zbadaj temat, research tematu, analiza semantyczna tematu,
  CSI + ramka + sub-queries, przygotuj temat do briefu.
---

# Topic Researcher

Przeprowadzaj pełny research semantyczny tematu artykułu. Łączysz analizy z 5 perspektyw w spójny obraz tematu.

## Wymagane inputy

- **Temat artykułu** (np. "Kortyzol - hormon stresu")
- **Source Context** (np. "portal medyczny dla pacjentów")

## Proces analizy

### 1. Definicja CSI

Zdefiniuj fundamenty semantyczne:

| Element | Opis |
|---------|------|
| **Central Entity (CE)** | Główna encja tematu (test Wikipedii, powtarzalność) |
| **Source Context (SC)** | Perspektywa serwisu: tożsamość, monetyzacja, unikalność SERP |
| **CSI** | CE + SC → predykat + encja + kontekst |
| **Predykaty** | 3-5 czasowników opisujących intencje użytkownika |

### 2. Ramka semantyczna (Frame Semantics)

Wygeneruj 15 elementów ramki semantycznej dla CE:

| Element ramki | Definicja | Sub-query |
|---------------|-----------|-----------|
| Agent | Kto/co wywołuje? | "[CE] przyczyny" |
| Patient | Na kogo/co wpływa? | "wpływ [CE] na organizm" |
| Instrument | Za pomocą czego? | "badania [CE]" |
| Purpose | Po co/dlaczego? | "dlaczego [CE] jest ważny" |
| Cause | Co powoduje? | "co powoduje wysoki [CE]" |
| Result | Jaki efekt? | "skutki [CE]" |
| Location | Gdzie? | "gdzie produkowany [CE]" |
| Time | Kiedy? | "kiedy badać [CE]" |
| Manner | Jak? | "jak obniżyć [CE]" |
| Beneficiary | Dla kogo? | "[CE] u dzieci / u kobiet" |
| Source | Skąd? | "skąd się bierze [CE]" |
| Quantity | Ile? | "norma [CE]" |
| Condition | Pod jakim warunkiem? | "[CE] a stres" |
| Comparison | W porównaniu z? | "[CE] vs adrenalina" |
| Negation | Co jeśli brak? | "niedobór [CE] objawy" |

### 3. Query Fanout (5-10 sub-queries)

Symuluj dekompozycję AI Search. Dla CSI wygeneruj sub-queries:

```
CSI: "Zrozumienie kortyzolu jako hormonu stresu"

Sub-queries:
1. "czym jest kortyzol definicja"
2. "kortyzol funkcje w organizmie"
3. "kortyzol normy laboratoryjne"
4. "objawy wysokiego kortyzolu"
5. "jak obniżyć kortyzol naturalnie"
6. "kortyzol a stres przewlekły"
7. "badanie poziomu kortyzolu"
8. "kortyzol a inne hormony"
```

### 4. Rozszerzenie terminologii

Wygeneruj drzewo relacji leksykalnych dla CE:

| Relacja | Terminy |
|---------|---------|
| **Synonimy** | hydrokortyzol, hormon stresu |
| **Hiperonimy** | glikokortykosteroidy, hormony steroidowe, hormony |
| **Hiponimy** | kortyzol wolny, kortyzol w ślinie, kortyzol całkowity |
| **Meronimy** | oś HPA, nadnercza, kora nadnerczy |
| **Antonimy / kontrasty** | relaksacja, melatonina, DHEA |
| **Related terms** | ACTH, syndrom Cushinga, choroба Addisona |

## Format wyjściowy

```markdown
# Topic Research: [temat]

## 1. CSI Definition
| Element | Wartość |
|---------|---------|
| CE | [encja] |
| SC | [perspektywa] |
| CSI | [pełne sformułowanie] |
| Predykaty | [lista] |

## 2. Ramka semantyczna
| Element | Definicja | Sub-query | Priorytet |
|---------|-----------|-----------|-----------|
| Agent | ... | ... | CORE/OUTER |
[15 elementów]

## 3. Query Fanout
| # | Sub-query | Element ramki | Pokrycie |
|---|-----------|---------------|----------|
| 1 | [query] | [element] | Do pokrycia |
[5-10 queries]

## 4. Terminologia rozszerzona
| Relacja | Terminy |
|---------|---------|
| Synonimy | ... |
[6 relacji]

## 5. Podsumowanie dla kolejnych kroków
- **CE:** [encja]
- **Kluczowe atrybuty do zbadania:** [lista z ramki]
- **Top 3 sub-queries:** [najważniejsze]
- **Terminy obowiązkowe:** [z TF-IDF perspective]
```

## Wskazówki

- Priorytetyzuj elementy ramki: CORE = bezpośrednio związane z SC, OUTER = kontekstowe
- Sub-queries powinny pokrywać pełne spektrum intencji: informacyjne, transakcyjne, nawigacyjne
- Terminologia rozszerzona = fundament późniejszej analizy TF-IDF w content-brief-generator
- Wynik tego kroku jest inputem dla competitor-gap-analyzer i contextual-vector-builder
