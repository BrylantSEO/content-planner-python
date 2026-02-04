---
name: chunk-optimizer
description: >
  Analizuje strukturę artykułu pod kątem optymalizacji chunków dla RAG i AI Search.
  Sprawdza BLUF w H2, dystrybucję terminów, autonomiczność sekcji, długość chunków.
  Użyj wklejając tekst artykułu w markdown. Triggery: optymalizuj chunki, analiza struktury RAG,
  czy artykuł jest gotowy pod AI, sprawdź autonomiczność sekcji.
---

# Chunk Optimizer

Analizuj strukturę artykułów pod kątem optymalizacji dla systemów RAG (chunki ~200-500 słów, osobno wektoryzowane).

## Klucze do dobrych chunków

1. **BLUF w każdym H2** - odpowiedź w pierwszych 50 słowach sekcji
2. **Autonomiczność** - każda sekcja zrozumiała bez kontekstu (bez "jak wspomniano", "ten obiekt")
3. **Dystrybucja terminów** - kluczowe słowa rozłożone równomiernie, brak "pustych" chunków
4. **Jeden temat = jeden chunk** - H2 odpowiada na jedno sub-query

## 5 obszarów analizy

### 1. Struktura nagłówków
Hierarchia H1→H2→H3? H2 odpowiadają na sub-queries? Nagłówki opisowe (nie "Więcej informacji")?

### 2. BLUF w sekcjach H2
Każdy H2 zaczyna się od bezpośredniej odpowiedzi? Fakty/liczby w pierwszych 50 słowach?

### 3. Autonomiczność chunków
Sekcja zrozumiała bez poprzednich? Powtarza podmiot (nie zaimki)? Wystarczający kontekst?

### 4. Dystrybucja terminów
Terminy kluczowe rozłożone? Brak "pustych semantycznie" chunków?

### 5. Długość chunków
Sekcje ~200-500 słów? Nie za krótkie (mało kontekstu) i nie za długie (cięcie)?

## Format wyjściowy

```markdown
## Podsumowanie
Temat: [X] | Sekcji H2: [X] | Słów: [X] | Średnia sekcja: [X słów]

## Struktura nagłówków
H1: [tytuł]
├── H2: [sekcja 1] ✅/⚠️/❌
└── H2: [sekcja 2] ✅/⚠️/❌

## BLUF w sekcjach
| Sekcja H2 | BLUF? | Problem |
|-----------|-------|---------|

## Autonomiczność
| Sekcja H2 | Autonomiczna? | Problem |
|-----------|---------------|---------|

## Dystrybucja terminów
Sekcja 1: ████████░░ (8 terminów)
Sekcja 2: ██░░░░░░░░ (2) ⚠️ MAŁO

## Długość chunków
| Sekcja | Słów | Status | Rekomendacja |
|--------|------|--------|--------------|

## Chunk Readiness Score: [X/10]

## Rekomendacje
| Priorytet | Rekomendacja | Wpływ na RAG |
|-----------|--------------|--------------|
| 🔴 | [akcja] | [efekt] |
| 🟡 | [akcja] | [efekt] |
```

## Skala ocen

| Score | Znaczenie |
|-------|-----------|
| 9-10 | Gotowe pod RAG |
| 7-8 | Drobne poprawki |
| 5-6 | Wymaga pracy |
| 3-4 | Znaczące braki |
| 1-2 | Przepisać strukturę |
