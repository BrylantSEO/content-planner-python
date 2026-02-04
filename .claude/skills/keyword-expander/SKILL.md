---
name: keyword-expander
description: >
  Rozszerza seed keyword o synonimy, warianty semantyczne, pytania i powiązane frazy
  metodami Token Insertion i Query Expansion. Użyj podając główne słowo kluczowe
  i kontekst źródłowy (Source Context).
  Triggery: rozszerz keyword, ekspansja słów kluczowych, warianty keyword, token insertion,
  generuj frazy, synonimy i pytania dla keyword.
---

# Keyword Expander

Rozszerzaj seed keyword o warianty semantyczne. **Cel: minimum 300 unikalnych keywords** (target: 300-500).

## Kroki

### Krok 0: SERP Seed Enrichment (opcjonalnie)

Pobierz SERP dla seed keyword via `nodeshub_search.py`:

```bash
python3 .claude/skills/nodeshub-search/nodeshub_search.py "SEED_KEYWORD"
```

Wyciągnij z wyników i zapisz w pamięci:

| Źródło SERP | Użycie | Typ w CSV |
|---|---|---|
| **PAA pytania** | Baza dla kroku 3 (5W1H) - priorytet nad wygenerowanymi | `paa_question` |
| **Related Searches** | Dodaj bezpośrednio jako keywords | `related_search` |
| **Refine Chips** | Dodatkowe tokeny w kroku 2 (Token Insertion) | `refine_chip` |
| **Filter Sidebar** | Nowe kategorie tokenów (np. Marka, Materiał, Cena) | `filter_sidebar` |
| **Organic titles** | Wyciągnij wzorce tematyczne → identyfikuj brakujące kategorie | `serp_pattern` |

**SERP Hop (opcjonalnie, +1-2 calls):** Jeśli Related Searches z seed SERP zawierają frazy z nowym kontekstem (np. seed "baseny ogrodowe" → related "baseny stelażowe ranking") → pobierz SERP dla 1-2 najbardziej obiecujących Related Searches. Wyciągnij z nich dodatkowe PAA, Related, Chips → dorzuć do puli. To rozszerza kontekst wejściowy poza bezpośrednie otoczenie seed keyword.

Jeśli `nodeshub-search` niedostępny (brak API key, błąd) → pomiń krok 0, kontynuuj LLM-only.

### Krok 1: Seed + Source Context

Przyjmij seed keyword (= Central Entity) i Source Context.

### Krok 2: Token Insertion

Zastosuj **Token Insertion** systematycznie przez kategorie:

   | Kategoria tokenu | Przykłady dla "baseny ogrodowe" |
   |---|---|
   | Przymiotnik (cecha) | tanie, duże, małe, okrągłe, głębokie |
   | Atrybut (spec) | z filtracją, z podgrzewaniem, z obudową |
   | Use-case | do ogrodu, do dzieci, na działkę, na lato |
   | Audience | dla rodzin, dla dzieci, dla dorosłych |
   | Lokalizacja | Warszawa, Kraków, polska, allegro, OBI |
   | Czas/sezon | 2024, letnie, całoroczne, na zimę |
   | Cena/jakość | premium, budżetowe, najlepsze, polecane |
   | Materiał | stelażowe, nadmuchiwane, drewniane, kompozytowe |
   | **Refine Chips** (z SERP) | tokeny z Google Refine Chips - priorytet |
   | **Filter Sidebar** (z SERP) | kategorie z filtrów Google (marka, cena, sklep) |

   Jeśli krok 0 dostarczył Refine Chips i Filter Sidebar → użyj ich jako **dodatkowych kategorii tokenów z priorytetem** nad LLM-generated (realne sygnały użytkowników).

   Pozycje tokenów:
   - `[TOKEN] + CE` → "tanie baseny ogrodowe"
   - `CE + [TOKEN]` → "baseny ogrodowe cennik"
   - Tokeny między słowami CE → "baseny duże ogrodowe"

### Krok 3: Pytania 5W1H

Wygeneruj **pytania 5W1H** (minimum 30 pytań):

   Jeśli krok 0 dostarczył PAA pytania → użyj ich jako **bazy** i rozszerz o warianty. PAA = realne pytania użytkowników, priorytet nad wygenerowanymi.

   | Formuła | Przykład |
   |---|---|
   | Co to jest [CE]? | co to jest basen ogrodowy |
   | Jak [process] [CE]? | jak zamontować basen ogrodowy |
   | Ile kosztuje [CE]? | ile kosztuje basen ogrodowy |
   | Gdzie kupić [CE]? | gdzie kupić basen ogrodowy |
   | Kiedy [CE]? | kiedy rozkładać basen ogrodowy |
   | Który [CE] wybrać? | który basen ogrodowy wybrać |
   | Dlaczego [CE]? | dlaczego warto mieć basen ogrodowy |
   | Czy [CE]? | czy basen ogrodowy się opłaca |

   Dla każdego typu pytania generuj 4-6 wariantów z różnymi predykatami.

### Krok 4-7: Rozszerzenia

4. Dodaj **synonimy i hiponimy** (warianty potoczne, formalne, regionalne)
5. Dodaj **porównania** (X vs Y dla głównych wariantów i konkurencyjnych typów)
6. Dodaj **powiązane koncepcje** (akcesoria, komponenty, procesy, problemy)
7. Dodaj **long-tail** przez kombinację modyfikatorów:
   - CE + cena → "basen ogrodowy cena", "basen ogrodowy ile kosztuje"
   - CE + jakość → "najlepszy basen ogrodowy ranking"
   - CE + lokalizacja → "basen ogrodowy sklep Warszawa"
   - CE + czas → "basen ogrodowy sezon 2024"
   - CE + grupa docelowa → "basen ogrodowy dla 4-osobowej rodziny"

## Format wyjściowy

Zapisz wynik jako CSV w `data/keywords/[seed]_expanded.csv`:

```csv
keyword,typ
baseny ogrodowe,seed
pływalnie przydomowe,synonim
tanie baseny ogrodowe,token_before
baseny ogrodowe cennik,token_after
jak zbudować basen,pytanie_process
ile kosztuje basen ogrodowy,pytanie_cost
basen stelażowy vs nadmuchiwany,porównanie
chemia basenowa,powiązane
basen ogrodowy dla dzieci opinie,long_tail
jaki basen do ogrodu wybrać,paa_question
baseny ogrodowe ranking,related_search
stelażowe,refine_chip
Bestway baseny ogrodowe,filter_sidebar
baseny ogrodowe poradnik,serp_pattern
```

## Podsumowanie na końcu

Wyświetl tabelę z liczbą keywords per typ i łączną sumę. Jeśli suma < 300 → dodaj więcej wariantów z niedoreprezentowanych kategorii.

## Wskazówki

- Myśl jak użytkownik - od awareness do purchase
- Uwzględnij kontekst polski (lokalne zwyczaje językowe)
- Lepiej więcej niż mniej - kolejny krok (klasteryzacja) odfiltruje szum
- Source Context wpływa na dobór wariantów (sklep → cennik/opinie, poradnik → jak/dlaczego)
- Każda kategoria tokenu powinna dać minimum 20 keywords
- Pytania 5W1H × warianty predykatów = solidna baza pytań (30-50)
