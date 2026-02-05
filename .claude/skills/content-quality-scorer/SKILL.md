---
name: content-quality-scorer
description: >
  Mierzy 4 wymiary jakości treści z ocenami 0-10: Cost of Retrieval, Information Density,
  SRL Salience i TF-IDF Quality. Wskazuje problematyczne fragmenty z sugestią poprawki
  (BEFORE/AFTER). Orkiestruje logikę cost-of-retrieval-optimizer + information-density-checker
  + semantic-role-labels-parser + tfidf-analyzer.
  Użyj podając tekst artykułu do oceny jakości.
  Triggery: oceń jakość treści, quality score, CoR + density + SRL + TF-IDF,
  scoring contentu, 4 wymiary jakości, problematyczne fragmenty.
---

# Content Quality Scorer

Mierz 4 wymiary jakości treści (0-10 każdy). Wskazuj problematyczne fragmenty z BEFORE/AFTER.

## Wymiar 1: Cost of Retrieval (0-10)

Jak łatwo wyszukiwarka przetworzy treść. Sumuj punkty:

| Element | Waga |
|---------|------|
| Hierarchia H1 → H2 → H3 | +2 |
| Pogrubienia kluczowych faktów | +1 |
| Listy punktowane/numerowane | +1 |
| Tabele z danymi | +2 |
| TL;DR / sekcja podsumowania | +1 |
| Brak "ścian tekstu" (>300 słów bez formatowania) | +1 |
| Internal links w kontekście | +1 |
| Brak ogólnikowych wstępów | +1 |

## Wymiar 2: Information Density (0-10)

Klasyfikuj zdania jako FAKT (weryfikowalna informacja) lub PUCH (ogólnik, filler).

```
Score = (zdania faktyczne / wszystkie zdania) × 10
```

**Elementy obniżające (puch):**

| Typ | Waga kary |
|-----|-----------|
| Słowa modalne ("może", "powinien", "chyba") | -0.5 |
| Puste frazesy ("Warto zaznaczyć, że...") | -1.0 |
| Przymiotniki ocenne ("ogromne znaczenie") | -0.5 |
| Pytania retoryczne ("Co warto wiedzieć?") | -0.5 |

**Elementy zwiększające (fakty):**

| Typ | Waga bonusu |
|-----|-------------|
| Konkretne liczby ("67%", "20-40 uderzeń/min") | +1.0 |
| Nazwy własne i encje | +0.5 |
| Wartości atrybutów EAV (daty, wymiary) | +1.0 |
| Atomic claims (niepodzielne, weryfikowalne) | +1.0 |

## Wymiar 3: SRL Salience (0-10)

Sprawdź rolę gramatyczną Central Entity w zdaniach:

| Rola CE | Punkty |
|---------|--------|
| Agent (CE działa) | +1.0 |
| Patient (CE jest odbiorcą) | +0.5 |
| CE nieobecne w zdaniu | 0 |

```
Score = (suma punktów / max punktów) × 10
```

Cel: CE jako Agent w >70% zdań.

## Wymiar 4: TF-IDF Quality (0-10)

Identyfikuj terminologię:
- **HIGH IDF:** terminy specjalistyczne, branżowe (dobrze)
- **LOW IDF:** terminy generyczne, potoczne (neutralne)
- **MISSING:** oczekiwane terminy branżowe nieobecne (źle)

```
Score = (high_idf_terms / oczekiwane_terms) × 10
```

## Format odpowiedzi

```markdown
# Content Quality Score: [tytuł]

## Podsumowanie

| Wymiar | Score | Status | Top Problem |
|--------|-------|--------|-------------|
| Cost of Retrieval | X/10 | ok/warn/bad | [problem] |
| Information Density | X/10 | ok/warn/bad | [problem] |
| SRL Salience | X/10 | ok/warn/bad | [problem] |
| TF-IDF Quality | X/10 | ok/warn/bad | [problem] |

Statusy: ok (8-10) | warn (5-7) | bad (0-4)

## Wymiar 1: Cost of Retrieval — X/10
[Checklist elementów obecnych/brakujących]

## Wymiar 2: Information Density — X/10
Zdania faktyczne: X/Y (Z%)

BEFORE (puch):
"[cytat z artykułu]"

AFTER (fakt):
"[sugestia poprawki]"

[Top 3-5 problematycznych fragmentów z BEFORE/AFTER]

## Wymiar 3: SRL Salience — X/10
CE jako Agent: X% | Patient: Y% | Nieobecne: Z%

BEFORE (CE jako Patient):
"[cytat]"

AFTER (CE jako Agent):
"[sugestia]"

## Wymiar 4: TF-IDF Quality — X/10
HIGH IDF: [lista terminów obecnych]
MISSING: [lista terminów oczekiwanych ale brakujących]
```
