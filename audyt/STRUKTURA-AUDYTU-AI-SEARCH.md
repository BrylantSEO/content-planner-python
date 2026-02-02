# Struktura Audytu Contentu pod AI Search

## Spis treści
1. [Wprowadzenie](#wprowadzenie)
2. [Faza 0: Przygotowanie](#faza-0-przygotowanie)
3. [Faza 1: Strategia (Pre-Audit)](#faza-1-strategia-pre-audit)
4. [Faza 2: Audyt 8-wymiarowy](#faza-2-audyt-8-wymiarowy)
5. [Faza 3: Agregacja i raportowanie](#faza-3-agregacja-i-raportowanie)
6. [Szablony i checklisty](#szablony-i-checklisty)
7. [Workflow użycia skilli](#workflow-użycia-skilli)

---

## Wprowadzenie

### Cel audytu
Audyt contentu pod AI Search ma na celu ocenę i optymalizację treści pod kątem **cytowalności przez systemy AI** (ChatGPT, Perplexity, Google AI Overviews, Bing Copilot).

### Kluczowe metryki końcowe
- **Content Quality Score** (1-10) - średnia z 8 wymiarów
- **AI Citability Score** (1-10) - szansa na cytowanie przez AI Search

### Skala ocen
| Ocena | Interpretacja |
|-------|---------------|
| 1-2 | Krytyczny - wymaga pilnej przebudowy |
| 3-4 | Słaby - znaczące braki |
| 5-6 | Średni - wymaga optymalizacji |
| 7-8 | Dobry - drobne poprawki |
| 9-10 | Doskonały - wzorcowy content |

---

## Faza 0: Przygotowanie

### Checklist przed audytem

- [ ] Określ cel audytu (pojedynczy artykuł / cały serwis / kategoria)
- [ ] Przygotuj tekst w formacie Markdown
- [ ] Zidentyfikuj główne słowo kluczowe / temat
- [ ] Ustal docelową grupę odbiorców
- [ ] Określ intencję wyszukiwania (informacyjna / transakcyjna / nawigacyjna)

### Dane wejściowe

```
Artykuł/URL: _______________
Główne słowo kluczowe: _______________
Docelowa intencja: _______________
Typ contentu: _______________
```

---

## Faza 1: Strategia (Pre-Audit)

### 1.1 Definicja CSI (Central Search Intent)

**Skill:** `/csi-definition-helper`

Zdefiniuj trzy fundamenty:

| Element | Definicja | Przykład |
|---------|-----------|----------|
| **Central Entity (CE)** | Główna encja/temat treści | "Kredyt hipoteczny" |
| **Source Context (SC)** | Perspektywa/autorytet źródła | "Bank / Doradca finansowy" |
| **Central Search Intent (CSI)** | Główne pytanie które content odpowiada | "Jak uzyskać kredyt hipoteczny?" |

### 1.2 Query Understanding

**Skille:** `/query-expansion`, `/query-fanout`, `/frame-semantics`, `/lexical-expander`

#### A) Query Expansion
Rozszerz główne słowo kluczowe na warianty:
- Synonimy
- Pytania (jak, co, dlaczego, ile)
- Long-tail
- Lokalne warianty

#### B) Query Fanout
Zdekomponuj CSI na sub-queries (5-10), które AI Search będzie szukać:

```
CSI: "Jak uzyskać kredyt hipoteczny?"
├── Sub-query 1: "Jakie dokumenty do kredytu hipotecznego?"
├── Sub-query 2: "Jaka zdolność kredytowa potrzebna?"
├── Sub-query 3: "Ile wynosi oprocentowanie kredytu hipotecznego?"
├── Sub-query 4: "Jak długo trwa proces kredytowy?"
└── Sub-query 5: "Jaki wkład własny wymagany?"
```

#### C) Frame Semantics
Zmapuj elementy ramki semantycznej:

| Element ramki | Wartość | Potencjalne sub-query |
|---------------|---------|----------------------|
| Agent | Kredytobiorca | Kto może wziąć kredyt? |
| Obiekt | Kredyt hipoteczny | Co to jest kredyt hipoteczny? |
| Cel | Zakup nieruchomości | Na co można wziąć kredyt? |
| Warunki | Zdolność, wkład własny | Jakie warunki kredytu? |

#### D) Lexical Expansion
Drzewo relacji leksykalnych:

```
KREDYT HIPOTECZNY
├── Hiperonimy: kredyt, finansowanie, pożyczka
├── Hiponimy: kredyt na dom, kredyt na mieszkanie
├── Meronimy: rata, oprocentowanie, prowizja, RRSO
├── Synonimy: kredyt mieszkaniowy, kredyt na nieruchomość
└── Antonimy: wynajem, gotówka
```

---

## Faza 2: Audyt 8-wymiarowy

### Wymiar 1: Information Density

**Skill:** `/information-density-checker`

**Co sprawdzamy:**
- Stosunek faktów do "puchu" (opinii, retoryki)
- Konkretność: liczby, daty, wymiary vs ogólniki
- Weryfikowalność twierdzeń

**Kryteria oceny:**

| Ocena | Kryteria |
|-------|----------|
| 9-10 | >80% zdań zawiera weryfikowalne fakty |
| 7-8 | 60-80% faktów, minimalne opinie |
| 5-6 | 40-60% faktów, zauważalny puch |
| 3-4 | 20-40% faktów, dominują ogólniki |
| 1-2 | <20% faktów, sama retoryka |

**Sygnały problemów:**
- ❌ "Najlepszy na rynku" (bez dowodu)
- ❌ "Bardzo korzystne warunki" (bez liczb)
- ❌ "Szybko i sprawnie" (bez konkretów)
- ✅ "Oprocentowanie od 7,5% RRSO"
- ✅ "Decyzja w 48h roboczych"

**Szablon analizy:**

| Zdanie | Typ (Fakt/Opinia/Puch) | Ocena |
|--------|------------------------|-------|
| ... | ... | ... |

---

### Wymiar 2: EAV Structure

**Skill:** `/eav-extractor`

**Co sprawdzamy:**
- Liczba trójek Entity-Attribute-Value
- Kompletność atrybutów encji
- Relacje między encjami

**Kryteria oceny:**

| Ocena | Kryteria |
|-------|----------|
| 9-10 | Wszystkie encje mają kompletne atrybuty z wartościami |
| 7-8 | Większość atrybutów ma wartości |
| 5-6 | Podstawowe atrybuty obecne, braki w wartościach |
| 3-4 | Encje bez atrybutów lub atrybuty bez wartości |
| 1-2 | Brak struktury EAV |

**Szablon analizy:**

| Entity | Attribute | Value | Status |
|--------|-----------|-------|--------|
| Kredyt hipoteczny | oprocentowanie | 7,5% RRSO | ✅ Kompletne |
| Kredyt hipoteczny | okres spłaty | brak | ❌ Brak wartości |

---

### Wymiar 3: BLUF (Bottom Line Up Front)

**Skill:** `/bluf-generator`

**Co sprawdzamy:**
- Czy odpowiedź jest w pierwszych 50 słowach sekcji
- Struktura: Odpowiedź → Dowód → Kontekst
- Czy każdy H2 ma bezpośrednią odpowiedź

**Kryteria oceny:**

| Ocena | Kryteria |
|-------|----------|
| 9-10 | Każda sekcja zaczyna się od odpowiedzi z liczbami |
| 7-8 | Większość sekcji ma BLUF, sporadyczne wstępy |
| 5-6 | ~50% sekcji ma odpowiedź na początku |
| 3-4 | Odpowiedzi ukryte w środku/końcu sekcji |
| 1-2 | Ogólne wstępy, brak bezpośrednich odpowiedzi |

**Struktura BLUF:**
```
[ODPOWIEDŹ] - pierwszych 50 słów z kluczową informacją
[DOWÓD] - dane, statystyki, źródła
[KONTEKST] - tło, wyjaśnienia, wyjątki
```

**Sygnały problemów:**
- ❌ "W dzisiejszych czasach coraz więcej osób..." (wstęp ogólny)
- ❌ "Zanim odpowiemy na to pytanie..." (odraczanie)
- ✅ "Minimalny wkład własny wynosi 10% wartości nieruchomości."

---

### Wymiar 4: Chunk Optimization

**Skill:** `/chunk-optimizer`

**Co sprawdzamy:**
- Autonomiczność sekcji (zrozumiałe bez kontekstu)
- Długość sekcji (optymalnie 200-500 słów)
- Dystrybucja kluczowych terminów

**Kryteria oceny:**

| Ocena | Kryteria |
|-------|----------|
| 9-10 | Każda sekcja autonomiczna, optymalna długość |
| 7-8 | Sekcje w większości autonomiczne |
| 5-6 | Niektóre sekcje wymagają kontekstu |
| 3-4 | Sekcje silnie zależne od siebie |
| 1-2 | Brak logicznego podziału na sekcje |

**Sygnały problemów:**
- ❌ "Jak wspomniano wyżej..." (zaimki łamiące autonomiczność)
- ❌ "Ten produkt..." (bez określenia o czym mowa)
- ❌ Sekcje <100 słów lub >800 słów
- ✅ Każda sekcja powtarza kluczowe terminy
- ✅ H2 zawiera główne słowo kluczowe

**Szablon analizy:**

| Sekcja (H2) | Słów | Autonomiczna? | Terminy kluczowe | Ocena |
|-------------|------|---------------|------------------|-------|
| ... | ... | Tak/Nie | ... | ... |

---

### Wymiar 5: Cost of Retrieval

**Skill:** `/cost-of-retrieval-optimizer`

**Co sprawdzamy:**
- Struktura nagłówków (H1→H2→H3)
- Formatowanie (listy, tabele, wyróżnienia)
- Łatwość ekstrakcji informacji

**Kryteria oceny:**

| Ocena | Kryteria |
|-------|----------|
| 9-10 | Idealna struktura, tabele, listy, wyróżnienia |
| 7-8 | Dobra struktura, formatowanie pomocne |
| 5-6 | Podstawowa struktura, brak tabel/list |
| 3-4 | Chaotyczna struktura, ściana tekstu |
| 1-2 | Brak nagłówków, nieczytelne |

**Elementy obniżające Cost of Retrieval:**
- ✅ Tabele porównawcze
- ✅ Listy punktowane/numerowane
- ✅ Bold dla kluczowych terminów
- ✅ Jasna hierarchia nagłówków
- ✅ Krótkie akapity (3-5 zdań)

**Elementy zwiększające Cost of Retrieval:**
- ❌ Długie akapity (>10 zdań)
- ❌ Brak formatowania
- ❌ Niespójna hierarchia nagłówków
- ❌ Informacje ukryte w tekście ciągłym

---

### Wymiar 6: TF-IDF Analysis

**Skill:** `/tfidf-analyzer`

**Co sprawdzamy:**
- Obecność terminologii specjalistycznej (wysoki IDF)
- Gęstość terminów branżowych
- Brakujące terminy które powinny być

**Kryteria oceny:**

| Ocena | Kryteria |
|-------|----------|
| 9-10 | Bogata terminologia specjalistyczna, wszystkie kluczowe terminy |
| 7-8 | Dobra terminologia, drobne braki |
| 5-6 | Podstawowe terminy, brak specjalistycznych |
| 3-4 | Przewaga słów generycznych |
| 1-2 | Tylko słowa ogólne, brak żargonu |

**Szablon analizy:**

| Termin | TF (w tekście) | IDF (specjalistyczność) | Status |
|--------|----------------|-------------------------|--------|
| RRSO | Wysoki | Wysoki | ✅ Dobrze |
| kredyt | Wysoki | Niski | ⚠️ Generyczny |
| marża | Brak | Wysoki | ❌ Brakuje |

---

### Wymiar 7: Semantic Roles

**Skill:** `/semantic-role-labels-parser`

**Co sprawdzamy:**
- Czy Central Entity jest Agentem zdania
- Spójność perspektywy (czyja historia?)
- Hierarchia prominencji encji

**Kryteria oceny:**

| Ocena | Kryteria |
|-------|----------|
| 9-10 | CE konsekwentnie jako Agent, spójna perspektywa |
| 7-8 | CE dominuje jako Agent, sporadyczne przesunięcia |
| 5-6 | CE czasem jako Patient, niespójna perspektywa |
| 3-4 | CE rzadko jako Agent |
| 1-2 | CE nieobecna lub tylko jako Patient |

**Role semantyczne:**
- **Agent** - kto wykonuje akcję (najwyższa prominencja)
- **Predicate** - akcja/stan
- **Patient** - na kim/czym wykonywana akcja
- **Beneficiary** - kto odnosi korzyść

**Przykład analizy:**
```
Zdanie: "Bank udzieli Ci kredytu hipotecznego."
Agent: Bank
Predicate: udzieli
Patient: kredytu hipotecznego
Beneficiary: Ci (kredytobiorca)

Problem: CE (kredyt hipoteczny) jest Patient, nie Agent
Rekomendacja: "Kredyt hipoteczny pozwala sfinansować zakup nieruchomości."
```

---

### Wymiar 8: Attribute Classification

**Skill:** `/attribute-classifier`

**Co sprawdzamy:**
- Hierarchia atrybutów: UNIQUE → ROOT → RARE
- Czy wyróżniki (UNIQUE) są na początku
- Pokrycie wszystkich istotnych atrybutów CE

**Typy atrybutów:**

| Typ | Definicja | Pozycja w treści |
|-----|-----------|------------------|
| **UNIQUE** | Wyróżniające, unikalne dla encji | Na początku, w intro |
| **ROOT** | Fundamentalne, wspólne dla kategorii | W środku, sekcje główne |
| **RARE** | Specjalistyczne, niszowe | Na końcu, dla ekspertów |

**Kryteria oceny:**

| Ocena | Kryteria |
|-------|----------|
| 9-10 | UNIQUE na początku, pełne pokrycie ROOT, RARE dla ekspertów |
| 7-8 | Dobra hierarchia, drobne przesunięcia |
| 5-6 | ROOT przed UNIQUE, niekompletne pokrycie |
| 3-4 | Chaotyczna kolejność atrybutów |
| 1-2 | Brak wyróżników, tylko ROOT |

---

## Faza 3: Agregacja i raportowanie

### 3.1 Szablon raportu audytu

```markdown
# Audyt Contentu: [Tytuł artykułu]
Data: [YYYY-MM-DD]
Audytor: [Imię/Claude]

## Kontekst semantyczny
- **Central Entity:** [...]
- **Source Context:** [...]
- **Central Search Intent:** [...]

## Podsumowanie

| Wymiar | Ocena | Uwagi |
|--------|-------|-------|
| 1. Information Density | X/10 | ... |
| 2. EAV Structure | X/10 | ... |
| 3. BLUF | X/10 | ... |
| 4. Chunk Optimization | X/10 | ... |
| 5. Cost of Retrieval | X/10 | ... |
| 6. TF-IDF | X/10 | ... |
| 7. Semantic Roles | X/10 | ... |
| 8. Attribute Classification | X/10 | ... |
| **Content Quality Score** | **X/10** | Średnia |
| **AI Citability Score** | **X/10** | Szansa na cytowanie |

## TOP 3 Problemy

### Problem 1: [Nazwa]
- **Wymiar:** #X
- **Fragment:** "[cytat z tekstu]"
- **Wpływ na AI Search:** [...]
- **Rekomendacja:** [...]

### Problem 2: [...]
### Problem 3: [...]

## Szczegółowa analiza

### Wymiar 1: Information Density
**Ocena: X/10**

**Mocne strony:**
- ...

**Problemy:**
| Fragment | Problem | Rekomendacja |
|----------|---------|--------------|
| ... | ... | ... |

[Powtórz dla każdego wymiaru]

## Rekomendacje priorytetyzowane

### 🔴 Wysoki priorytet
1. ...
2. ...

### 🟡 Średni priorytet
1. ...
2. ...

### 🟢 Niski priorytet
1. ...
2. ...

## Quick Wins (szybkie wdrożenie)
1. ...
2. ...
3. ...
```

### 3.2 Interpretacja wyników

| Content Quality Score | Interpretacja | Akcja |
|-----------------------|---------------|-------|
| 9-10 | Wzorcowy content | Monitoruj, nie zmieniaj |
| 7-8 | Dobry content | Drobne optymalizacje |
| 5-6 | Średni content | Zaplanuj poprawki |
| 3-4 | Słaby content | Pilna przebudowa |
| 1-2 | Krytyczny | Napisz od nowa |

---

## Szablony i checklisty

### Checklist szybkiego audytu (15 min)

- [ ] Czy odpowiedź jest w pierwszych 50 słowach?
- [ ] Czy są konkretne liczby/daty?
- [ ] Czy nagłówki H2 zawierają słowo kluczowe?
- [ ] Czy sekcje są autonomiczne (zrozumiałe osobno)?
- [ ] Czy są tabele/listy?
- [ ] Czy CE jest Agentem zdań?
- [ ] Czy wyróżniki (UNIQUE) są na początku?

### Checklist przed publikacją

- [ ] Content Quality Score ≥ 7/10
- [ ] Wszystkie H2 mają BLUF
- [ ] Brak zdań typu "Jak wspomniano wyżej"
- [ ] Terminologia branżowa obecna
- [ ] Struktura nagłówków logiczna
- [ ] Sekcje 200-500 słów

---

## Workflow użycia skilli

### Pełny audyt (45-60 min)

```
1. /csi-definition-helper
   └── Definiuj: CE, SC, CSI

2. /query-fanout [CSI]
   └── Uzyskaj: 5-10 sub-queries

3. /content-auditor
   └── Wklej tekst artykułu
   └── Otrzymaj: Pełny raport 8-wymiarowy

4. Zapisz raport:
   └── audyt/audyt-[nazwa]-[data].md
```

### Szybki audyt (15 min)

```
1. /information-density-checker
   └── Oceń gęstość faktów

2. /bluf-generator
   └── Sprawdź strukturę odpowiedzi

3. /chunk-optimizer
   └── Oceń autonomiczność sekcji
```

### Audyt głęboki jednego wymiaru

```
/[nazwa-skilla]
└── Szczegółowa analiza konkretnego aspektu
```

---

## Appendix: Mapa skilli

```
STRATEGIA (Pre-Audit)
├── csi-definition-helper → CE, SC, CSI
├── query-expansion → warianty słów kluczowych
├── query-fanout → sub-queries
├── frame-semantics → ramka semantyczna
└── lexical-expander → relacje leksykalne

AUDYT (8 wymiarów)
├── information-density-checker → Wymiar #1
├── eav-extractor → Wymiar #2
├── bluf-generator → Wymiar #3
├── chunk-optimizer → Wymiar #4
├── cost-of-retrieval-optimizer → Wymiar #5
├── tfidf-analyzer → Wymiar #6
├── semantic-role-labels-parser → Wymiar #7
└── attribute-classifier → Wymiar #8

ORKIESTRACJA
└── content-auditor → Wszystkie 8 wymiarów + raport

WSPARCIE
└── serpdata-search → Analiza SERP
```

---

*Wygenerowano: 2026-01-29*
*Semantic-OS v1.0*
