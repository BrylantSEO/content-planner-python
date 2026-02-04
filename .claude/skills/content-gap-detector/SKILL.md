---
name: content-gap-detector
description: >
  Porównuje klastry słów kluczowych z wynikami SERP (Google) by zidentyfikować content gaps -
  tematy pokrywane przez konkurencję ale nieobecne w klastrach. Wymaga nodeshub-search.
  Użyj po nazwaniu klastrów (cluster-namer) podając CSV z named clusters.
  Triggery: content gaps, luki w contencie, co pokrywa konkurencja, brakujące tematy,
  analiza SERP vs klastry, gap analysis.
allowed-tools: Bash(python3 *)
---

# Content Gap Detector

Porównuj klastry z SERP by znaleźć content gaps - tematy które konkurencja pokrywa a Ty nie.

## Wymagane inputy

- CSV z named clusters (output cluster-namer): `cluster_id, cluster_name, central_entity, canonical_query, keyword`
- **Source Context** serwisu

## Proces

Dla każdego klastra CORE (3-5 klastrów, po 1 SERP call):

1. Pobierz SERP dla canonical query:
   ```bash
   python3 .claude/skills/nodeshub-search/nodeshub_search.py "CANONICAL_QUERY"
   ```

2. Wyciągnij tematy z SERP:
   - **Organic titles + descriptions** → wyodrębnij kluczowe tematy/atrybuty
   - **PAA pytania** → realne pytania użytkowników
   - **Related Searches** → powiązane frazy
   - **Filter Sidebar** → ważne atrybuty (marka, cena, materiał)

3. Porównaj z keywords w klastrze → oznacz każdy temat SERP:

| Status | Definicja | Akcja |
|---|---|---|
| `COVERED` | Temat obecny w keywords klastra | Brak akcji |
| `GAP` | Temat w SERP ale brak w keywords | Dodaj keyword(s) do klastra |
| `UNIQUE` | Keyword w klastrze ale brak w SERP | Potencjalny wyróżnik lub szum |

## Priorytetyzacja gaps

| Priorytet | Kryterium | Przykład |
|---|---|---|
| **P1** (krytyczny) | Temat w >3 tytułach organic | "ranking basenów" w 5 z 10 tytułów |
| **P2** (wysoki) | Temat w PAA | PAA: "ile kosztuje basen stelażowy?" |
| **P3** (średni) | Temat w Related Searches | Related: "baseny ogrodowe opinie" |
| **P4** (niski) | Temat w 1-2 tytułach | Jeden wynik o "basen zimowy" |

## Format wyjściowy

Zapisz jako `data/clusters/[seed]_content_gaps.md`:

```markdown
## Content Gap Analysis: [seed keyword]

### Podsumowanie
- Klastrów analizowanych: X
- SERP calls: Y
- Gaps znalezionych: Z (P1: a, P2: b, P3: c, P4: d)

### Gaps per klaster

#### Klaster: [nazwa] (canonical: "[query]")

| # | Gap | Źródło SERP | Priorytet | Sugerowane keywords |
|---|-----|-------------|-----------|---------------------|
| 1 | Ranking basenów 2024 | 5/10 tytułów | P1 | ranking basenów, najlepsze baseny 2024 |
| 2 | Ile kosztuje basen? | PAA | P2 | cena basenu ogrodowego, ile kosztuje basen |

### UNIQUE keywords (w klastrach, brak w SERP)

| Keyword | Klaster | Ocena |
|---------|---------|-------|
| basen kompozytowy | Rodzaje | Niszowy wyróżnik - zachowaj |

### Rekomendacje
1. **P1 gaps** → natychmiastowe uzupełnienie keywords i planowanie contentu
2. **P2 gaps** → dodaj jako supporting content / FAQ
3. **UNIQUE** → potencjalne wyróżniki lub do usunięcia jeśli irrelevant
```

## Wskazówki

- Analizuj tylko klastry CORE (OUTER mają niższy priorytet)
- 1 SERP call per klaster, max 5-10 calls łącznie
- P1 gaps = najważniejsze okazje contentowe (Google CLEARLY preferuje te tematy)
- UNIQUE keywords to nie zawsze problem - mogą być wyróżnikami vs konkurencja
- Jeśli `nodeshub-search` niedostępny → skill nie może działać (wymaga SERP)
