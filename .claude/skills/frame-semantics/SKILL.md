---
name: frame-semantics
description: Generuje ramkę semantyczną (Frame Semantics) dla tematu z mapowaniem elementów na potencjalne sub-queries. Pomaga budować treści pokrywające query fanout. Użyj podając temat lub predykat (np. "kupować samochód", "leasing").
---

# Frame Semantics Generator - Mapa sub-queries dla query fanout

Generujesz **ramki semantyczne** dla tematów użytkownika. Ramka semantyczna to sieć pojęć powiązanych z centralnym predykatem - każdy element ramki odpowiada potencjalnemu sub-query w mechanizmie query fanout.

## Kontekst teoretyczny

**Frame Semantics** to reverse engineering query fanout:
- AI rozbija pytanie użytkownika na 5-10 sub-queries
- Ramka semantyczna daje mapę tych elementów Z GÓRY
- Zamiast zgadywać jakie sub-queries wygeneruje AI, budujesz strukturę pokrywającą je wszystkie

**Dlaczego to działa:**
- Query fanout szuka odpowiedzi na różne aspekty pytania
- Twoja treść pokrywająca elementy ramki = odpowiedzi na sub-queries
- Więcej pokrytych sub-queries = większa szansa na retrieval i cytowanie

## Elementy ramki semantycznej

Dla każdego predykatu/tematu identyfikujesz:

| Element ramki | Rola | Typowe sub-query |
|---------------|------|------------------|
| **Agent** | Kto wykonuje akcję? | "Kto może X?" |
| **Patient** | Co jest przedmiotem? | "Co jest X?" |
| **Instrument** | Czym/jak? | "Jak X?", "Czym X?" |
| **Location** | Gdzie? | "Gdzie X?" |
| **Time** | Kiedy? | "Kiedy X?" |
| **Cause** | Dlaczego? | "Dlaczego X?" |
| **Purpose** | Po co? | "Po co X?", "Czy warto X?" |
| **Manner** | W jaki sposób? | "Jak najlepiej X?" |
| **Result** | Co jest efektem? | "Co po X?" |
| **Condition** | Pod jakim warunkiem? | "Kiedy można X?" |
| **Beneficiary** | Dla kogo? | "Dla kogo X?" |
| **Source** | Skąd? | "Skąd wziąć X?" |
| **Cost** | Ile kosztuje? | "Ile kosztuje X?" |
| **Alternative** | Co zamiast? | "X vs Y?", "Alternatywy dla X?" |
| **Part** | Z czego się składa? | "Elementy X?", "Części X?" |

## Format wyjściowy

### 1. Identyfikacja tematu

```
Temat: [temat użytkownika]
Centralny predykat: [główny czasownik/akcja]
Perspektywa: [z czyjej perspektywy - kupujący, sprzedający, ekspert]
```

### 2. Ramka semantyczna

| Element | Wartość | Sub-query | Priorytet |
|---------|---------|-----------|-----------|
| [element] | [konkretna wartość] | [pytanie] | [wysoki/średni/niski] |

### 3. Mapa query fanout

```
Pytanie główne: [pytanie użytkownika]

Sub-queries pokryte przez ramkę:
├── [sub-query 1] ← Element: [nazwa]
├── [sub-query 2] ← Element: [nazwa]
├── [sub-query 3] ← Element: [nazwa]
└── ...
```

### 4. Sugerowana struktura H2

| H2 | Pokrywa element | Typ pytania |
|----|-----------------|-------------|
| [nagłówek] | [element ramki] | [definitional/process/cost/comparative] |

### 5. Powiązane ramki

Lista ramek semantycznych powiązanych z głównym tematem (do rozbudowy treści):

| Powiązana ramka | Relacja | Potencjalne rozszerzenie |
|-----------------|---------|-------------------------|
| [ramka] | [hiperonim/hiponim/meronim] | [sugestia] |

## Typy pytań generowane z ramek

| Typ pytania | Wzorzec | Element ramki |
|-------------|---------|---------------|
| **Definitional** | Co to jest X? | Patient |
| **Boolean** | Czy X jest Y? | Condition |
| **Grouping** | Jakie są rodzaje X? | Part |
| **Comparative** | X vs Y? | Alternative |
| **Process** | Jak zrobić X? | Instrument, Manner |
| **Cost** | Ile kosztuje X? | Cost |
| **Causal** | Dlaczego X? | Cause, Purpose |
| **Temporal** | Kiedy X? | Time, Condition |
| **Locative** | Gdzie X? | Location, Source |
| **Resultative** | Co po X? | Result |

## Przykład

**Input:** "kupować samochód"

### Identyfikacja tematu

```
Temat: Kupowanie samochodu
Centralny predykat: KUPOWAĆ
Perspektywa: Kupujący (osoba fizyczna)
```

### Ramka semantyczna

| Element | Wartość | Sub-query | Priorytet |
|---------|---------|-----------|-----------|
| Agent | Kupujący | "Kto może kupić samochód?" | niski |
| Patient | Samochód | "Jaki samochód kupić?" | wysoki |
| Source | Salon, komis, prywatnie | "Gdzie kupić samochód?" | wysoki |
| Cost | Cena, finansowanie | "Ile kosztuje samochód?" | wysoki |
| Instrument | Gotówka, kredyt, leasing | "Jak finansować zakup samochodu?" | wysoki |
| Condition | Dokumenty, wymagania | "Jakie dokumenty do kupna samochodu?" | średni |
| Purpose | Transport, prestiż | "Czy warto kupić samochód?" | średni |
| Time | Kiedy najlepiej | "Kiedy kupić samochód?" | niski |
| Result | Własność, rejestracja | "Co po zakupie samochodu?" | średni |
| Alternative | Leasing vs kredyt | "Leasing czy kredyt na samochód?" | wysoki |
| Part | Silnik, nadwozie, wyposażenie | "Na co zwrócić uwagę przy zakupie?" | wysoki |

### Mapa query fanout

```
Pytanie główne: "Jak kupić samochód?"

Sub-queries pokryte przez ramkę:
├── "Gdzie kupić samochód?" ← Source
├── "Ile kosztuje samochód?" ← Cost
├── "Jak finansować zakup?" ← Instrument
├── "Co sprawdzić przed kupnem?" ← Part
├── "Jakie dokumenty potrzebne?" ← Condition
├── "Leasing czy kredyt?" ← Alternative
└── "Co po zakupie?" ← Result
```

### Sugerowana struktura H2

| H2 | Pokrywa element | Typ pytania |
|----|-----------------|-------------|
| Gdzie kupić samochód - salon vs komis vs prywatnie | Source | Comparative |
| Ile kosztuje samochód w 2026 roku | Cost | Informational |
| Finansowanie samochodu - kredyt vs leasing | Instrument, Alternative | Comparative |
| Na co zwrócić uwagę przy zakupie | Part | Process |
| Dokumenty potrzebne do zakupu samochodu | Condition | Process |
| Co zrobić po zakupie - rejestracja krok po kroku | Result | Process |

### Powiązane ramki

| Powiązana ramka | Relacja | Potencjalne rozszerzenie |
|-----------------|---------|-------------------------|
| SPRZEDAWAĆ | Antonimy perspektywy | Artykuł dla sprzedających |
| FINANSOWAĆ | Hiponim | Osobny artykuł o finansowaniu |
| UBEZPIECZAĆ | Następstwo | Artykuł o ubezpieczeniu po zakupie |
| SERWISOWAĆ | Następstwo | Artykuł o serwisie i utrzymaniu |

## Zasady generowania ramek

1. **Perspektywa ma znaczenie** - ta sama ramka "KUPOWAĆ" wygląda inaczej z perspektywy kupującego vs sprzedającego
2. **Nie wszystkie elementy są równie ważne** - priorytetyzuj na podstawie typowych intencji wyszukiwania
3. **Elementy się łączą** - Cost + Instrument = "Ile kosztuje i jak finansować"
4. **Ramki są zagnieżdżone** - "FINANSOWAĆ" to osobna ramka wewnątrz "KUPOWAĆ"
5. **Kontekst branżowy** - ramka "KUPOWAĆ" dla samochodu vs mieszkania będzie różna

## Kiedy użytkownik nie podał tematu

Poproś o:
1. **Temat/predykat** - główna akcja lub rzeczownik (np. "kupować samochód", "kredyt hipoteczny")
2. **Opcjonalnie: perspektywa** - z czyjego punktu widzenia (kupujący, sprzedający, ekspert)
3. **Opcjonalnie: branża** - dla lepszego dopasowania elementów ramki

## Ton odpowiedzi

- Konkretny, praktyczny
- Tabele dla przejrzystości
- Gotowe struktury do wykorzystania w Content Brief
- Fokus na sub-queries i pokrycie query fanout
