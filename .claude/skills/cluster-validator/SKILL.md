---
name: cluster-validator
description: >
  Waliduje klastry słów kluczowych przez porównanie wyników SERP (Google Search).
  Sprawdza czy klastry są spójne (SERP coherence) i czy nie powinny być połączone (SERP overlap).
  Wykorzystuje nodeshub-search do pobrania wyników wyszukiwania.
  Triggery: waliduj klastry, SERP walidacja, sprawdź klastry, overlap klastrów,
  czy klastry są poprawne, merge klastrów, split klastra.
---

# Cluster Validator (SERP-based)

Waliduj klastry keywords porównując wyniki Google Search. Sprawdź czy Google zgadza się z Twoimi klastrami.

## Input

Plik CSV z klastrami (output cluster-namer): `keyword,cluster_id,cluster_name,canonical_query`

## Procedura

### 1. Pobierz SERP dla canonical queries

Dla każdego klastra weź `canonical_query` i uruchom:

```bash
python3 .claude/skills/nodeshub-search/nodeshub_search.py "CANONICAL_QUERY" pl pl
```

Zapisz top 10 wyników organicznych (URL + tytuł) dla każdego klastra.

### 2. Oblicz SERP overlap między klastrami

Dla każdej pary klastrów porównaj URL-e z top 10:

```
overlap(A, B) = |URLs_A ∩ URLs_B| / min(|URLs_A|, |URLs_B|)
```

### 3. Oblicz SERP coherence wewnątrz klastra

Dla klastrów z >10 keywords: weź 3 losowe keywords (nie canonical) → pobierz SERP → porównaj z canonical:

```
coherence(cluster) = avg(overlap(canonical, sample_kw))
```

### 4. Generuj rekomendacje

| Sytuacja | Próg | Rekomendacja |
|----------|------|--------------|
| 2 klastry mają wysoki overlap | >50% | **MERGE** - Google traktuje je jako jeden temat |
| Klaster ma niski coherence | <30% | **SPLIT** - klaster miesza różne intencje |
| Klaster ma wysoki coherence | >60% | **OK** - klaster jest spójny |
| Overlap 30-50% | 30-50% | **REVIEW** - sprawdź ręcznie |

## Format wyjściowy

### Tabela overlap (top pary)

| Klaster A | Klaster B | Overlap | Rekomendacja |
|-----------|-----------|---------|--------------|
| Typy basenów | Baseny stelażowe | 70% | MERGE |
| Budowa basenu | Akcesoria basenowe | 15% | OK |

### Tabela coherence

| Klaster | Coherence | Rekomendacja |
|---------|-----------|--------------|
| Typy basenów | 72% | OK |
| Budowa basenu | 18% | SPLIT |

### Podsumowanie akcji

Lista konkretnych rekomendacji: które klastry mergować, które splitować, które OK.

## Ograniczenia

- Wymaga działającego nodeshub-search (NODESHUB_API_KEY)
- Rate limit: nie więcej niż 1 request/sekundę
- Dla >15 klastrów: waliduj tylko top 10 największych + losowe 5 mniejszych
- SERP wyniki zmieniają się w czasie - traktuj jako snapshot
