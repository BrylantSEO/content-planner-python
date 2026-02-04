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

## SERP Grounding (opcjonalnie)

Pobierz SERP dla pytania głównego via `nodeshub_search.py`:

```bash
python3 .claude/skills/nodeshub-search/nodeshub_search.py "PYTANIE_GŁÓWNE"
```

Porównaj wygenerowane sub-zapytania z PAA i Related Searches z SERP. Oznacz każde sub-zapytanie:

| Tag | Znaczenie | Akcja |
|---|---|---|
| `[CONFIRMED]` | Sub-zapytanie pokrywa się z PAA/Related | Wysoki priorytet - potwierdzone przez Google |
| `[PREDICTED]` | Tylko dekompozycja LLM, brak w SERP | Niższy priorytet - może być ważne, ale brak potwierdzenia |
| `[SERP-ONLY]` | W SERP (PAA/Related) ale nie w dekompozycji LLM | **DODAJ** jako content gap - realne pytanie pominięte przez LLM |

`[SERP-ONLY]` = potwierdzone content gaps. To realne pytania użytkowników których LLM nie wygenerował → gotowa lista luk do pokrycia.

Jeśli `nodeshub-search` niedostępny → pomiń grounding, wszystkie sub-zapytania bez tagów.

## Format wyjściowy

```markdown
## Query Fan-Out
Pytanie: [oryginalne] | Encja: [główna] | Intencja: [typ] | Złożoność: [prosta/średnia/złożona]

### Sub-zapytania
| # | Sub-zapytanie | Cel | Typ źródła | Grounding |
|---|---------------|-----|------------|-----------|
| 1 | [sub-query] | Definicja | Wikipedia, encyklopedie | [CONFIRMED] |
| 2 | [sub-query] | Aktualne dane | News, blogi | [PREDICTED] |
| 3 | [sub-query] | Opinie | Reddit, fora | [SERP-ONLY] |

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
