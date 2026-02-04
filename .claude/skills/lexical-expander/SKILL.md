---
name: lexical-expander
description: >
  Generuje drzewo relacji leksykalnych dla słowa kluczowego - synonimy, hiponimy, hiperonimy, meronimy, antonimy.
  Pomaga rozszerzyć matching z zapytaniami i pokryć sub-queries w AI Search.
  Użyj podając słowo kluczowe. Triggery: relacje leksykalne, synonimy, hiponimy, drzewo pojęć,
  pokrycie semantyczne, meronimy, części składowe tematu.
---

# Lexical Expander

Generuj drzewo relacji leksykalnych dla słów kluczowych. Każda relacja pełni inną funkcję w AI Search i query fanout.

## 5 typów relacji

| Relacja | Definicja | Wpływ na AI Search |
|---------|-----------|-------------------|
| **Synonimy** | Podobne znaczenie | Szerszy matching z wariantami zapytań |
| **Antonimy** | Przeciwne znaczenie | Pokrycie pytań porównawczych "X vs Y" |
| **Hiperonimy** | Pojęcie nadrzędne | Hierarchia H1→H2→H3, kontekst w intro |
| **Hiponimy** | Pojęcie podrzędne | Odpowiedzi na konkretne sub-queries, sekcje H2 |
| **Meronimy** | Część całości | Kompletność tematu = wyższy Topical Coverage |

## Format wyjściowy

```markdown
## Relacje leksykalne: [słowo]
Kategoria: [rzeczownik/czasownik] | Branża: [kontekst]

### Synonimy
| Synonim | Kontekst użycia | Pokrywa zapytania |
|---------|-----------------|-------------------|

### Hiperonimy (↑ nadrzędne)
[hiperonim 2]
  └── [hiperonim 1]
        └── [SŁOWO KLUCZOWE]

### Hiponimy (↓ podrzędne)
[SŁOWO]
  ├── [hiponim 1]
  ├── [hiponim 2]
  └── [hiponim 3]

| Hiponim | Sub-query | Sugerowany H2 |
|---------|-----------|---------------|

### Meronimy (części)
[SŁOWO]
  ├── [meronim 1]
  ├── [meronim 2]
  └── [meronim 3]

| Meronim | Aspekt tematu | Sub-query |
|---------|---------------|-----------|

### Antonimy
| Antonim | Pytanie porównawcze |
|---------|---------------------|

### Mapa pokrycia query fanout
| Typ relacji | Pokrywa sub-queries | Przykład |
|-------------|---------------------|----------|

### Rekomendacje
1. [akcja]
```

## Zasady

1. **Kontekst ma znaczenie** - "jaguar" = inne relacje w samochodach vs zwierzętach.
2. **Priorytetyzuj popularne** - synonimy i hiponimy używane w zapytaniach.
3. **Meronimy = kompletność** - im więcej pokrytych części, tym lepiej dla AI.
4. **Antonimy = porównania** - każdy antonim to potencjalna sekcja "X vs Y".
