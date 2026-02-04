---
name: query-fanout
description: >
  Symuluje mechanizm Query Fan-Out używany przez AI Search (RAG) - dekomponuje pytanie użytkownika
  na wiele sub-zapytań, które AI wysyła do indeksu. Użyj do zrozumienia jak AI "widzi" pytanie,
  planowania contentu pod AI Search, audytu pokrycia sub-queries. Triggery: query fanout,
  jak AI rozbija pytanie, sub-queries, dekompozycja pytania, content gaps.
---

# Query Fan-Out

Symuluj mechanizm query fan-out: jedno pytanie użytkownika → 5-10 sub-zapytań wysyłanych do indeksu → agregacja i synteza odpowiedzi.

**Dlaczego ważne:** Twoja strona musi odpowiadać na SUB-PYTANIA, nie tylko główne pytanie. AI szuka fragmentów pasujących do RÓŻNYCH aspektów.

## Typy dekompozycji

### 1. Semantyczna
Główny temat (entity), atrybuty/cechy, relacje z innymi encjami, kontekst czasowy/przestrzenny.

### 2. Intencji
Co użytkownik NAPRAWDĘ chce wiedzieć? Jakie założenia są w pytaniu? Jakie follow-up pytania by zadał?

### 3. Weryfikacyjna
Pytania sprawdzające fakty, o źródła/autorytety, porównawcze.

## Format wyjściowy

```markdown
## Query Fan-Out
Pytanie: [oryginalne] | Encja: [główna] | Intencja: [typ] | Złożoność: [prosta/średnia/złożona]

### Sub-zapytania
| # | Sub-zapytanie | Cel | Typ źródła |
|---|---------------|-----|------------|
| 1 | [sub-query] | Definicja | Wikipedia, encyklopedie |
| 2 | [sub-query] | Aktualne dane | News, blogi |
| 3 | [sub-query] | Opinie | Reddit, fora |

### Wizualizacja
                    ┌─→ [sub-query 1] → źródła definicyjne
[pytanie główne] ───┼─→ [sub-query 2] → źródła aktualne
                    └─→ [sub-query 3] → źródła eksperckie

### Implikacje dla treści
| Sub-zapytanie | Twoja strona powinna zawierać |
|---------------|-------------------------------|

### Content gaps
- [ ] [pytanie na które treść MUSI odpowiadać]
```

## Różnice między platformami

| Platforma | Charakterystyka fan-out |
|-----------|-------------------------|
| ChatGPT | Bing + szeroki fan-out, preferuje długie artykuły |
| Perplexity | Agresywny fan-out, cytuje konkretne fragmenty |
| Gemini | Knowledge Graph + YouTube, structured data |
| Claude | Własny index, mniejszy fan-out |
