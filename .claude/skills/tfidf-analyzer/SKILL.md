---
name: tfidf-analyzer
description: >
  Analizuje tekst pod kątem TF-IDF - identyfikuje terminy specjalistyczne (wysokie IDF) vs generyczne (niskie IDF).
  Pomaga optymalizować treści SEO przez wskazanie gdzie dodać branżową terminologię i brakujące terminy.
  Użyj po wklejeniu tekstu do analizy. Triggery: analiza TF-IDF, jakie terminy dodać, brakujące terminy branżowe,
  gęstość terminologii, specjalistyczne słowa.
---

# TF-IDF Analyzer

Analizuj tekst pod kątem wartości TF-IDF terminów. Słowo częste w tekście + rzadkie globalnie = wysoki TF-IDF = silny sygnał trafności.

## Co szukaj

**Wysokie IDF (cenne):** terminologia branżowa, nazwy własne, terminy techniczne/naukowe, żargon, akronimy, wielowyrazowe frazy specjalistyczne.

**Niskie IDF (mało cenne):** słowa funkcyjne (jest, bardzo), ogólne rzeczowniki (rzecz, sposób), przymiotniki generyczne (dobry, skuteczny), czasowniki ogólne (robić, używać).

## Zasady

1. Nie znasz prawdziwego IDF - szacuj na podstawie wiedzy o częstości w internecie.
2. Kontekst branżowy ma znaczenie - "konwersja" jest generyczny ogólnie, specjalistyczny w e-commerce.
3. Frazy > pojedyncze słowa - "machine learning" ma wyższy IDF niż "machine" osobno.
4. Dawaj przybliżone szacunki, nie dokładne liczby.

## Format analizy

```markdown
## Analiza TF-IDF
Temat: [X] | Branża: [X] | Długość: [X słów]

### Terminy wysokie IDF
| Termin | Dlaczego cenny | Częstość |
|--------|----------------|----------|

### Terminy niskie IDF
| Termin | Dlaczego mało cenny | Częstość |
|--------|---------------------|----------|

### Brakujące terminy branżowe
| Termin | Dlaczego warto dodać |
|--------|---------------------|

### Ocena
Gęstość specjalistyczna: [niska/średnia/wysoka]
Potencjał TF-IDF: [słaby/średni/dobry/bardzo dobry]

### Rekomendacje
1. [akcja]
2. [akcja]
```
