---
name: csi-alignment-checker
description: >
  Sprawdza zgodność treści z Central Search Intent. Inferuje CSI z artykułu,
  ekstrahuje EAV, porównuje z benchmarkiem SERP (top 10) i waliduje strukturę
  (BLUF, chunki, URR placement). Orkiestruje logikę csi-definition-helper +
  eav-extractor + attribute-classifier + chunk-optimizer + bluf-generator.
  Użyj podając tekst artykułu i opcjonalnie dane benchmarku SERP.
  Triggery: sprawdź CSI, alignment check, pokrycie atrybutów, EAV gaps,
  zgodność z intencją, BLUF check, walidacja chunków, URR placement.
---

# CSI Alignment Checker

Audytuj zgodność treści z Central Search Intent. Inferuj CSI, ekstrahuj EAV, porównaj z benchmarkiem SERP, waliduj strukturę.

## Wymagane inputy

- **Tekst artykułu** (markdown)
- **Benchmark SERP** (opcjonalnie) — EAV Matrix z top 10, URR, gaps P1-P4 (z competitor-gap-analyzer)

## Proces audytu

### 1. Zdefiniuj CSI z artykułu

Inferuj z treści:
- **Central Entity (CE):** główna encja
- **Source Context (SC):** perspektywa/odbiorca
- **Predicate:** know / visit / apply / buy

Jeśli dostępny benchmark → waliduj CSI danymi SERP (PAA, Related Searches).

### 2. Ekstrakcja EAV z artykułu

Wyodrębnij trójki Entity-Attribute-Value z tekstu. Klasyfikuj każdy atrybut:

| Typ | Kryterium | Gdzie powinien być |
|-----|-----------|-------------------|
| **UNIQUE** | Wyróżniający, 1-2/10 konkurentów | H1 + Lead + BLUF |
| **ROOT** | Podstawowy, 5+/10 | Dedykowane H2 |
| **RARE** | Rzadki, 3-4/10 | H3 + FAQ |

### 3. Gap Analysis vs Benchmark SERP

Jeśli dostępny benchmark, porównaj:

| Status | Definicja | Priorytet |
|--------|-----------|-----------|
| **POKRYTE** | Atrybut w artykule i u konkurencji | OK |
| **BRAKUJĄCE P1** | ROOT u 7+/10, brak u nas | CRITICAL |
| **BRAKUJĄCE P2** | ROOT u 5-6/10 + PAA | HIGH |
| **BRAKUJĄCE P3** | RARE w PAA | MEDIUM |
| **BRAKUJĄCE P4** | RARE u 1-2/10 | LOW |
| **NADMIAROWE** | U nas jest, u konkurencji nie | Potencjalny UNIQUE |

Bez benchmarku → pomiń gap analysis, oceń EAV coverage na podstawie wiedzy LLM.

### 4. BLUF Check

- Czy pierwsze 50 słów odpowiada na CSI?
- Czy zawiera UNIQUE attribute?
- Czy zawiera dane/liczby?

### 5. Chunk Validation (per sekcja H2)

Per H2 sprawdź:
- **Długość:** 200-500 słów?
- **Autonomia:** zrozumiała bez reszty artykułu?
- **BLUF sekcji:** odpowiedź w pierwszym zdaniu (max 25 słów)?
- **CE repeat:** CE powtórzona min 2x w sekcji?

### 6. URR Placement Verification

Sprawdź czy atrybuty są we właściwych lokalizacjach:
- UNIQUE → H1/Lead/BLUF
- ROOT → dedykowane H2
- RARE → H3/FAQ

## Format odpowiedzi

```markdown
# CSI Alignment: [tytuł artykułu]

## CSI (inferowany)
| Element | Wartość |
|---------|---------|
| CE | [encja] |
| SC | [perspektywa] |
| Predicate | [know/visit/apply/buy] |

## CSI Alignment Score: X/10

## EAV Coverage
Artykuł vs Top 10: X/Y atrybutów pokrytych (Z%)

| Atrybut | Wartość w artykule | URR | Pokrycie SERP | Status |
|---------|--------------------|-----|---------------|--------|
| [atr] | [wartość] | ROOT | 8/10 | POKRYTE |
| [atr] | - | ROOT | 7/10 | BRAKUJĄCE P1 |

## BLUF Score: X/10
[Analiza pierwszych 50 słów]

## Chunk Quality: X/10
| Sekcja H2 | Słów | Autonomia | BLUF | CE repeat | Status |
|-----------|------|-----------|------|-----------|--------|
| [H2] | [N] | ok/warn | ok/warn | ok/warn | ok/warn |

## URR Placement: X/10
| Atrybut | Typ URR | Aktualna lokalizacja | Poprawna lokalizacja | Status |
|---------|---------|---------------------|---------------------|--------|
| [atr] | UNIQUE | H3 | H1/Lead | PRZENIEŚ |
```
