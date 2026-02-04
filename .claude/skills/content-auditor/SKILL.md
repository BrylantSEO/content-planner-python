---
name: content-auditor
description: >
  Kompleksowy audyt contentu pod kątem AI Search i semantycznego SEO.
  Analizuje tekst przez pryzmat 8 kryteriów: Information Density, EAV, BLUF,
  Chunk Optimization, Cost of Retrieval, TF-IDF, Semantic Roles i Attribute Classification.
  Użyj gdy użytkownik chce wykonać pełny audyt artykułu, zoptymalizować treść pod AI,
  ocenić jakość contentu, lub sprawdzić gotowość treści do cytowania przez AI Search.
  Triggery: audyt contentu, audyt artykułu, sprawdź content, oceń treść, analiza SEO,
  pełna analiza, gotowość pod AI.
---

# Content Auditor

Przeprowadzaj pełny audyt contentu pod kątem AI Search. Oceniaj gotowość treści do cytowania przez AI (ChatGPT, Perplexity, AI Overviews).

> W AI Search liczy się bycie **zacytowanym**, nie klikniętym. Treść musi być łatwa do ekstrakcji, bogata w fakty i zoptymalizowana pod RAG.

## 8 wymiarów audytu

| # | Wymiar | Co sprawdzać | Sygnały problemów |
|---|--------|-------------|-------------------|
| 1 | **Information Density** | Fakty vs puch, weryfikowalne twierdzenia, konkretne liczby | "wiele", "najlepszy" bez dowodów, puste frazy |
| 2 | **EAV Structure** | Encje, atrybuty z wartościami, relacje | Brak encji, "duży obiekt" zamiast "5000 m²" |
| 3 | **BLUF** | Odpowiedź w pierwszych 50 słowach H2, Odpowiedź→Dowód→Kontekst | Wstępy "W dzisiejszych czasach...", odpowiedź na końcu |
| 4 | **Chunk Optimization** | Autonomiczność H2, długość ~200-500 słów, dystrybucja terminów | "jak wspomniano", sekcje <100 lub >600 słów |
| 5 | **Cost of Retrieval** | Struktura H1→H2→H3, listy/tabele, boldy | Brak nagłówków, długie akapity bez formatowania |
| 6 | **TF-IDF** | Terminologia branżowa, stosunek specjalistyczne/generyczne | Tylko ogólne słowa, brak żargonu |
| 7 | **Semantic Roles** | Agent = CE?, salience CE, spójność perspektywy | CE jako Patient, niespójna narracja |
| 8 | **Attribute Classification** | UNIQUE na początku, hierarchia UNIQUE→ROOT→RARE | ROOT przed UNIQUE, brak wyróżników |

## Proces audytu

1. **Kontekst** - Określ CE, SC, CSI tekstu.
2. **Analiza 8 wymiarów** - Każdy wymiar: ocena 1-10, problemy z cytatami z tekstu.
3. **Agregacja** - Content Quality Score (CQS, średnia z 8), AI Citability Score, TOP 3 problemów.
4. **Rekomendacje** - Dla każdego problemu: co źle (cytat), jak powinno być, dlaczego ważne.

## Format odpowiedzi

```markdown
# Audyt contentu: [tytuł]

## Kontekst
| Element | Wartość |
|---------|---------|
| CE | [encja] |
| SC | [perspektywa] |
| CSI | [intencja] |

## Content Quality Score: X.X/10

| Wymiar | Score | Status |
|--------|-------|--------|
| Information Density | X/10 | ✅/🟡/🔴 |
| EAV Structure | X/10 | ✅/🟡/🔴 |
| BLUF | X/10 | ✅/🟡/🔴 |
| Chunk Optimization | X/10 | ✅/🟡/🔴 |
| Cost of Retrieval | X/10 | ✅/🟡/🔴 |
| TF-IDF | X/10 | ✅/🟡/🔴 |
| Semantic Roles | X/10 | ✅/🟡/🔴 |
| Attribute Classification | X/10 | ✅/🟡/🔴 |

**AI Citability:** [Niski/Średni/Wysoki/Bardzo wysoki]

## TOP 3 problemów
### 1. [Problem]
**Wymiar:** [X] | **Fragment:** "[cytat]"
**Rekomendacja:** "[jak powinno być]"
**Wpływ:** [dlaczego ważne]

## Rekomendacje priorytetyzowane
| Priorytet | Akcja | Wymiar | Wpływ |
|-----------|-------|--------|-------|
| 🔴 | [akcja] | [wymiar] | [opis] |
| 🟡 | [akcja] | [wymiar] | [opis] |

## Quick wins
1. [akcja]
2. [akcja]
```

## Statusy: ✅ 8-10 | 🟡 5-7 | 🔴 1-4

## Zapis wyników

Zapisuj wynik audytu do pliku `audyt/audyt-[nazwa]-[YYYY-MM-DD].md`. Utwórz katalog `audyt/` jeśli nie istnieje.
