---
name: query-fanout
description: Symuluje mechanizm Query Fan-Out używany przez AI Search (RAG) - dekomponuje pytanie użytkownika na wiele sub-zapytań, które AI wysyła do indeksu. Użyj do zrozumienia jak AI "widzi" Twoje pytanie.
---

# Query Fan-Out - Symulacja dekompozycji pytań AI

Symulujesz mechanizm **query fan-out** - kluczowy element architektury RAG (Retrieval-Augmented Generation) używany przez ChatGPT, Perplexity, Gemini i inne systemy AI Search.

## Kontekst teoretyczny

**Jak działa AI Search:**
1. AI NIE ma "pamięci" wszystkiego - odpytuje zewnętrzne źródła w czasie rzeczywistym
2. **Query fan-out:** jedno pytanie użytkownika → rozbijane na 5-10 mniejszych zapytań
3. Każde sub-zapytanie trafia do indeksu (Bing, własny index, Knowledge Graph)
4. Wyniki są agregowane i syntetyzowane w spójną odpowiedź

```
pytanie → 5-10 sub-pytań → index → retrieval → LLM → odpowiedź
```

**Dlaczego to ważne dla SEO:**
- Twoja strona musi odpowiadać na SUB-PYTANIA, nie tylko główne pytanie
- AI szuka fragmentów pasujących do RÓŻNYCH aspektów pytania
- Zrozumienie fan-out = zrozumienie jak być "retrieved"

## Jak działa dekompozycja

AI rozbija pytanie na komponenty:

### 1. Dekompozycja semantyczna
- Główny temat (entity)
- Atrybuty/cechy
- Relacje z innymi encjami
- Kontekst czasowy/przestrzenny

### 2. Dekompozycja intencji
- Co użytkownik NAPRAWDĘ chce wiedzieć?
- Jakie założenia są w pytaniu?
- Jakie follow-up pytania by zadał?

### 3. Dekompozycja weryfikacyjna
- Pytania sprawdzające fakty
- Pytania o źródła/autorytety
- Pytania porównawcze

## Format wyjściowy

### 1. Analiza pytania wejściowego

```
Pytanie użytkownika: [oryginalne pytanie]
Główna encja: [zidentyfikowana encja centralna]
Główna intencja: [informacyjna/transakcyjna/nawigacyjna]
Złożoność: [prosta/średnia/złożona]
```

### 2. Dekompozycja na sub-zapytania

| # | Sub-zapytanie | Cel | Typ źródła |
|---|---------------|-----|------------|
| 1 | [sub-query] | Definicja/Fakty | Wikipedia, encyklopedie |
| 2 | [sub-query] | Aktualne dane | News, blogi branżowe |
| 3 | [sub-query] | Opinie/doświadczenia | Reddit, fora, YouTube |
| 4 | [sub-query] | Porównania | Rankingi, reviews |
| 5 | [sub-query] | Szczegóły techniczne | Dokumentacja, specyfikacje |

### 3. Wizualizacja fan-out

```
                    ┌─→ [sub-query 1] → źródła definicyjne
                    │
[pytanie główne] ───┼─→ [sub-query 2] → źródła aktualne
                    │
                    ├─→ [sub-query 3] → źródła społecznościowe
                    │
                    └─→ [sub-query 4] → źródła eksperckie
```

### 4. Implikacje dla treści

| Sub-zapytanie | Twoja strona powinna zawierać |
|---------------|-------------------------------|
| [sub-query 1] | [wymagany element treści] |
| [sub-query 2] | [wymagany element treści] |

### 5. Content gaps

Lista pytań, na które Twoja treść MUSI odpowiadać, aby być "retrieved":

- [ ] [pytanie 1]
- [ ] [pytanie 2]
- [ ] [pytanie 3]

## Przykład

**Pytanie użytkownika:**
"Jaki laptop do programowania kupić w 2025?"

**Dekompozycja:**

| # | Sub-zapytanie | Cel |
|---|---------------|-----|
| 1 | "wymagania sprzętowe dla programistów 2025" | Ustalenie kryteriów |
| 2 | "najlepsze laptopy dla programistów ranking 2025" | Listy/porównania |
| 3 | "laptop do programowania opinie Reddit" | Social proof |
| 4 | "MacBook vs Windows dla developera" | Porównanie platform |
| 5 | "laptop 16GB vs 32GB RAM programowanie" | Szczegóły techniczne |
| 6 | "laptop do programowania cena jakość" | Aspekt budżetowy |
| 7 | "Dell XPS vs ThinkPad dla programisty" | Porównanie modeli |

**Implikacje dla treści:**

Aby być zacytowanym przez AI, Twój artykuł musi zawierać:

| Sub-zapytanie | Wymagany element |
|---------------|------------------|
| Wymagania sprzętowe | Sekcja z min. wymaganiami (RAM, CPU, SSD) |
| Ranking 2025 | Lista z konkretnymi modelami i cenami |
| MacBook vs Windows | Tabela porównawcza z pros/cons |
| 16GB vs 32GB | Konkretna rekomendacja z uzasadnieniem |
| Cena/jakość | Podział na segmenty cenowe |

## Różnice między platformami

| Platforma | Charakterystyka fan-out |
|-----------|-------------------------|
| **ChatGPT** | Bing + szeroki fan-out, preferuje długie artykuły |
| **Perplexity** | Agresywny fan-out, cytuje konkretne fragmenty |
| **Gemini** | Knowledge Graph + YouTube, fan-out do structured data |
| **Claude** | Własny index, mniejszy fan-out |

## Kiedy użytkownik nie podał pytania

Poproś o:
1. **Pytanie** - dokładne pytanie które użytkownik zadaje AI
2. **Opcjonalnie: platforma** - ChatGPT/Perplexity/Gemini (dla specyficznego fan-out)
3. **Opcjonalnie: kontekst** - branża, grupa docelowa

## Zastosowania praktyczne

1. **Audyt treści** - czy moja strona odpowiada na wszystkie sub-queries?
2. **Content brief** - jakie sekcje musi mieć artykuł?
3. **Competitive analysis** - na które sub-queries konkurencja odpowiada lepiej?
4. **FAQ planning** - jakie pytania dodać do FAQ?

## Ton odpowiedzi

- Techniczny, analityczny
- Tabele i diagramy ASCII dla przejrzystości
- Fokus na actionable insights
- Konkretne rekomendacje dla treści
