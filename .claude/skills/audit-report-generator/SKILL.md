---
name: audit-report-generator
description: >
  Generuje kompletny raport audytowy z CQS 0-100, AI Citability Score 0-10
  i priorytetyzowanymi rekomendacjami BEFORE/AFTER. Czyta scores.md (surowe dane)
  + benchmark.md + source.md i generuje pełny dashboard z Diagnozą i Action Plan.
  Twórczo generuje AFTER, SRL transformacje, strukturę H1/H2/H3, BLUF per H2,
  ready-to-paste EEAT, TF-IDF mapowanie. Ostatni krok pipeline audytowego.
  Użyj podając scores.md i opcjonalnie benchmark.md + source.md.
  Triggery: raport audytowy, CQS score, content quality score, rekomendacje audytu,
  priorytetyzacja poprawek, BEFORE AFTER, wygeneruj raport.
---

# Audit Report Generator

Kompiluj surowe dane z scores.md w raport z CQS 0-100 i priorytetyzowanymi rekomendacjami.

**Zasada kluczowa:** audit.md = jedyny dashboard dla copywritera. Czytaj `scores.md` + `benchmark.md` (jeśli istnieje) + `source.md`. Raport musi być samowystarczalny.

## Input

| Plik | Zawartość | Wymagany |
|------|-----------|----------|
| `scores.md` | 9 wymiarów, CSI, PAA, EAV artykułu, chunk analysis, problematyczne fragmenty, SRL instances, brakujące terminy, EEAT sygnały | Tak |
| `benchmark.md` | EAV Matrix konkurentów, URR, gaps P1-P4, Content Format Intelligence | Opcjonalny (tryb Full) |
| `source.md` | Treść artykułu (markdown) | Opcjonalny (do kontekstu AFTER) |

## Creative Generation

Na bazie surowych danych z scores.md, GENERUJ (nie kopiuj):

1. **BEFORE/AFTER** — czytaj cytaty z "Problematyczne fragmenty" w scores.md, generuj AFTER wykorzystując kontekst z benchmark.md (terminologia, wzorce z SERP)
2. **SRL transformacje** — czytaj "SRL Patient instances", transformuj każde zdanie tak by CE był Agent (nie Patient)
3. **Struktura H1/H2/H3** — na bazie "Chunk Analysis" + gaps z benchmark.md, proponuj [OK]/[ZMIEŃ]/[NOWA] z uzasadnieniem
4. **BLUF per H2** — generuj sugerowane pierwsze zdanie każdej sekcji (odpowiedź na pytanie z nagłówka)
5. **Ready-to-paste EEAT** — na bazie "EEAT sygnały" generuj gotowe bloki: bio autora, disclaimer, cytowania, data aktualizacji
6. **TF-IDF mapowanie** — mapuj "Brakujące terminy TF-IDF" na konkretne sekcje docelowe
7. **Rekomendacje** — grupuj KRYTYCZNE/WYSOKIE/ŚREDNIE z danymi SERP z benchmark.md

## Content Quality Score (CQS) — formuła

```
CQS = (CSI × 0.25 + CoR × 0.20 + Density × 0.15 + SRL × 0.10 + TF-IDF × 0.10 + EEAT × 0.20) × 10
```

Każdy wymiar 0-10, CQS normalizowany do 0-100. EEAT = średnia z 4 wymiarów E-E-A-T.

CSI = średnia z (CSI Alignment + BLUF + Chunk Quality + URR Placement) / 4.

## Interpretacja CQS

| CQS | Interpretacja | Akcja |
|-----|--------------|-------|
| 80-100 | Gotowa do publikacji | Drobne szlify |
| 60-79 | Wymaga poprawek | Popraw top 3 rekomendacje |
| 40-59 | Wymaga znaczących zmian | Popraw top 5 + rozszerz |
| 0-39 | Zalecane przepisanie | Zacznij od nowa z briefem |

## AI Citability Score (0-10)

Szansa na zacytowanie przez AI Search. Uwzględnij:
- BLUF w H1/H2 (odpowiedź na górze)
- Atomic claims (weryfikowalne, niepodzielne)
- Tabele i listy z danymi
- Terminologia branżowa
- EAV coverage vs benchmark

## Priorytetyzacja rekomendacji

```
Priorytet = Impact × (1 / Effort)
```

**UWAGA:** Priorytet rekomendacji (KRYTYCZNE/WYSOKIE/ŚREDNIE) to inny system niż priorytet gapów (P1-P4) z benchmarku. NIE używaj prefixu "P" dla rekomendacji. NIE dodawaj ram czasowych — wszystkie poprawki wdrażane od razu, kolejność wynika z priorytetu.

| Impact | Effort | Priorytet rekomendacji | Przykład |
|--------|--------|----------------------|----------|
| Wysoki | Niski | **KRYTYCZNE** | Dodanie BLUF (5 min) |
| Wysoki | Średni | **WYSOKIE** | Przekształcenie CE na Agenta |
| Wysoki | Wysoki | **ŚREDNIE** | Dopisanie brakującej sekcji |
| Niski | Niski | **BONUS** | Poprawienie pogrubień |
| Niski | Wysoki | **POMIŃ** | Przepisanie artykułu od zera |

## Format raportu

```markdown
# Audyt semantyczny: [tytuł / URL]
Data: [data] | Audytor: Claude (content-auditor-pipeline)
URL: [url] | Fraza: [fraza] | Tryb: [Full/Content-only/Quick]

---

## 1. Executive Summary

**Content Quality Score: XX/100**
**AI Citability Score: X/10**

| Wymiar | Score | Status | Top Problem |
|--------|-------|--------|-------------|
| CSI Alignment | X/10 | ok/warn/critical | [najważniejszy problem] |
| Cost of Retrieval | X/10 | ok/warn/critical | ... |
| Information Density | X/10 | ok/warn/critical | ... |
| SRL Salience | X/10 | ok/warn/critical | ... |
| TF-IDF Quality | X/10 | ok/warn/critical | ... |
| E-E-A-T: Experience | X/10 | ok/warn/critical | ... |
| E-E-A-T: Expertise | X/10 | ok/warn/critical | ... |
| E-E-A-T: Authority | X/10 | ok/warn/critical | ... |
| E-E-A-T: Trust | X/10 | ok/warn/critical | ... |

Statusy: ok (8-10) | warn (5-7) | critical (0-4)

### CQS Formula

CQS = (CSI×0.25 + CoR×0.20 + Density×0.15 + SRL×0.10 + TF-IDF×0.10 + EEAT×0.20) × 10
[step-by-step obliczenie]

**Interpretacja:** XX/100 = [kategoria]. [Verdict i zalecana akcja]

---

## 2. Diagnoza

### 2.1 CSI & Pokrycie tematyczne

**CSI (inferowane z artykułu):**

| Element | Wartość |
|---------|---------|
| **CE** | [Central Entity] |
| **SC** | [Source Context] |
| **Predicate** | [KNOW/DO/BUY/...] |

**Walidacja SERP:**
- PAA #1: "[pytanie]" ✅/❌
- PAA #2: "[pytanie]" ✅/❌
- [kolejne]

**EAV Coverage:** X/Y atrybutów pokrytych (Z%)

**Gap summary:**

| Priorytet | Atrybuty |
|-----------|----------|
| **P1** | [lista atrybutów ROOT u 7+/9, brak w artykule] |
| **P2** | [lista] |
| **P3** | [lista] |
| **P4** | [lista] |

**PAA coverage:**
- ✅ Pokryte: [lista PAA odpowiedzianych]
- ❌ Brakujące: [lista PAA bez odpowiedzi]

### 2.2 Jakość treści (4 wymiary)

Per wymiar: score, top problem, najgorszy fragment z BEFORE/AFTER.
**AFTER generowany na bazie cytatu BEFORE z scores.md + kontekst benchmark.md.**

#### Cost of Retrieval — X/10
[Top problem]
**BEFORE:** "[cytat z scores.md → Problematyczne fragmenty]"
**AFTER:** "[WYGENEROWANY — poprawka z terminologią z benchmark.md]"

#### Information Density — X/10
[Top problem]
**BEFORE:** "[cytat]"
**AFTER:** "[WYGENEROWANY]"

#### SRL Salience — X/10
CE jako Agent: X% | CE jako Patient: Y% (cel: <30%)
[Top problem + 1 przykład BEFORE/AFTER]

#### TF-IDF Quality — X/10
Obecne high-IDF: X | Brakujące: Y
[Top 3 brakujące terminy z freq u konkurencji]

### 2.3 E-E-A-T

Per wymiar: score, obecne sygnały, brakujące sygnały.

| Wymiar | Score | Obecne sygnały | Brakujące |
|--------|-------|---------------|-----------|
| Experience | X/10 | [sygnały] | [braki] |
| Expertise | X/10 | [sygnały] | [braki] |
| Authority | X/10 | [sygnały] | [braki] |
| Trust | X/10 | [sygnały] | [braki] |

**Porównanie z Top 3 SERP:**

| Sygnał | Nasz artykuł | #1 SERP | #2 SERP | #3 SERP |
|--------|-------------|---------|---------|---------|
| Autor z bio | ✅/❌ | ... | ... | ... |
| Disclaimer | ✅/❌ | ... | ... | ... |
| Cytaty badań | ✅/❌ | ... | ... | ... |
| Data aktualizacji | ✅/❌ | ... | ... | ... |

### 2.4 Benchmark vs SERP

[Jeśli dostępny benchmark]

**Pełna tabela EAV:**

| Atrybut | URR | Freq SERP | Nasz artykuł | Status |
|---------|-----|-----------|--------------|--------|
| [atrybut] | ROOT/UNIQUE/RARE | X/Y | ✅/❌/⚠️ | OK/GAP P1-P4 |
| ... | ... | ... | ... | ... |

**Content Format Intelligence:**

| Format | Freq SERP | Nasz artykuł | Status |
|--------|-----------|--------------|--------|
| Tabele | X/Y | ✅/❌ | ... |
| Listy punktowane | X/Y | ✅/❌ | ... |
| Infografiki | X/Y | ✅/❌ | ... |
| Bibliografia naukowa | X/Y | ✅/❌ | ... |

---

## 3. Action Plan

### 3.1 Docelowa struktura artykułu

**GENERUJ na bazie chunk analysis z scores.md + gaps z benchmark.md.**

Pełny spis H1/H2/H3 z oznaczeniami:

H1: [tytuł]
Lead: [BLUF — 1 zdanie podsumowujące]

H2: [sekcja] [OK]
H2: [sekcja] [ZMIEŃ] — [co zmienić]
  H3: [podsekcja] [NOWA]
H2: [sekcja] [NOWA] — [dlaczego]
  H3: [podsekcja] [NOWA]
  H3: [podsekcja] [NOWA]

Oznaczenia:
- **[OK]** = sekcja bez zmian
- **[ZMIEŃ]** = sekcja do przebudowania (z wyjaśnieniem co zmienić)
- **[NOWA]** = sekcja do dodania

**BLUF per H2** (GENERUJ — 1 zdanie, sugerowane pierwsze zdanie każdej sekcji):

| Sekcja H2 | Sugerowany BLUF |
|-----------|-----------------|
| [nazwa] | "[1 zdanie odpowiadające na pytanie z nagłówka]" |
| ... | ... |

### 3.2 Rekomendacje

**GENERUJ BEFORE/AFTER na bazie cytatów z scores.md + kontekst benchmark.md.**

Grupowane: KRYTYCZNE → WYSOKIE → ŚREDNIE. Per rekomendacja:

#### KRYTYCZNE

##### 1. [nazwa rekomendacji] (Impact: X, Effort: Y)
**Kontekst (dane SERP):** [np. "8/9 konkurentów pokrywa, PAA #2"]
**BEFORE:**
> "[cytat z scores.md → Problematyczne fragmenty]"

**AFTER:**
> "[WYGENEROWANY — z terminologią i wzorcami z benchmark.md]"

**Szacowany wpływ:** +X pkt CQS

##### 2. [kolejna]
...

#### WYSOKIE
...

#### ŚREDNIE
...

### 3.3 Brakujące terminy do dodania

**GENERUJ mapowanie** — czytaj terminy z scores.md, przypisz do sekcji docelowych:

| Termin | W jakiej sekcji dodać | Freq u konkurencji |
|--------|-----------------------|--------------------|
| [termin high-IDF] | [H2 gdzie pasuje] | X/Y |
| ... | ... | ... |

### 3.4 Transformacje SRL (CE Patient → Agent)

**GENERUJ transformacje** — czytaj Patient instances z scores.md, przekształć na Agent:

| # | BEFORE (Patient) | AFTER (Agent) | Sekcja |
|---|------------------|---------------|--------|
| 1 | "[cytat z scores.md]" | "[WYGENEROWANY]" | [H2] |
| 2 | ... | ... | ... |

### 3.5 E-E-A-T — elementy do wdrożenia

**GENERUJ ready-to-paste bloki** na bazie "EEAT sygnały" z scores.md + kontekst artykułu:

**Bio autora** (do wstawienia na górze artykułu):
> [WYGENEROWANY blok tekstu — autor, kwalifikacje, weryfikacja]

**Disclaimer** (do wstawienia pod tytułem):
> [WYGENEROWANY blok tekstu]

**Cytowania badań** (do wstawienia w odpowiednich sekcjach):
> [WYGENEROWANY blok per sekcja]

**Data aktualizacji:**
> [WYGENEROWANY blok]

### 3.6 Checklist

Grouped by priorytet rekomendacji (KRYTYCZNE / WYSOKIE / ŚREDNIE):

#### KRYTYCZNE
- [ ] [rekomendacja 1] → +X pkt CQS
- [ ] [rekomendacja 2] → +X pkt CQS

#### WYSOKIE
- [ ] [rekomendacja 3] → +X pkt CQS
- [ ] [rekomendacja 4] → +X pkt CQS

#### ŚREDNIE
- [ ] [rekomendacja 5] → +X pkt CQS
- [ ] [dodatkowe poprawki z benchmarku]

**CQS target po wdrożeniu:** XX/100 (obecne XX + szacowane +XX)
**AI Citability target:** X/10

---

## 4. Pliki audytu

| Krok | Plik | Zawartość |
|------|------|-----------|
| 0 | `source.md` | Treść artykułu |
| 1 | `benchmark.md` | EAV Matrix, URR, gaps P1-P4, Content Format Intelligence |
| 2 | `scores.md` | 9 wymiarów, CSI, PAA, EAV artykułu, chunk analysis, fragmenty, SRL, TF-IDF, EEAT |
| 3 | `audit.md` | Ten raport |
```
