---
name: query-expansion
description: Rozszerza pojedyncze słowo kluczowe na listę powiązanych fraz, synonimów, wariantów i pytań. Podstawowy krok w budowaniu map tematycznych. Użyj podając jedno centralne pojęcie/keyword.
---

# Query Expansion - Rozszerzanie zapytań

Wykonujesz **query expansion** - kluczowy pierwszy krok w budowaniu mapy tematycznej. Przekształcasz pojedyncze słowo kluczowe w bogaty zestaw powiązanych fraz i pytań, które lepiej oddają intencje użytkowników i strukturę tematu.

## Kontekst teoretyczny

**Query expansion** naśladuje proces, który zachodzi w wyszukiwarce Google - tzw. *keyword-to-query transformation*. Google rzadko traktuje jednowyrazowe zapytanie dosłownie, lecz przepisuje je na bardziej szczegółowe frazy na podstawie intencji i kontekstu.

**Cel:** Wyjść poza analizę pojedynczego słowa i zbudować szeroki zestaw powiązanych fraz, które posłużą do:
- Budowania mapy tematycznej
- Analizy SERP dla wielu zapytań
- Identyfikacji klastrów tematycznych
- Zrozumienia konsensusu Google na temat kategorii

## Zasady rozszerzania

Dla podanego słowa kluczowego generujesz:

### 1. Synonimy i warianty leksykalne
- Różne formy tego samego pojęcia
- Potoczne i formalne określenia
- Przykład: samochód → auto, pojazd, wóz

### 2. Koncepcje szersze (hiperonimiczne)
- Kategorie nadrzędne
- Przykład: samochód → pojazd mechaniczny, środek transportu

### 3. Koncepcje węższe (hiponimiczne)
- Typy, rodzaje, warianty
- Przykład: samochód → samochód sportowy, samochód elektryczny, SUV, sedan

### 4. Powiązane pojęcia techniczne
- Komponenty, atrybuty, cechy
- Przykład: samochód → silnik, skrzynia biegów, zawieszenie

### 5. Pytania 5W1H
- **Kto** - Who
- **Co** - What
- **Gdzie** - Where
- **Kiedy** - When
- **Dlaczego** - Why
- **Jak** - How

### 6. Porównania
- X vs Y
- X versus Y
- Przykład: samochód elektryczny vs samochód hybrydowy

### 7. Intencje użytkowników
- Informacyjne (co to jest, jak działa)
- Transakcyjne (kupić, cena, gdzie)
- Nawigacyjne (marka, model, serwis)
- Komercyjne (najlepszy, ranking, opinie)

## Format wyjściowy

### 1. Informacje wejściowe

```
Słowo kluczowe: [podane przez użytkownika]
Język: [zidentyfikowany język]
Kategoria: [zidentyfikowana kategoria tematyczna]
```

### 2. Synonimy i warianty

| Termin | Typ wariantu |
|--------|--------------|
| [termin] | Synonim/Potoczny/Formalny |

### 3. Koncepcje szersze i węższe

| Kierunek | Termin | Relacja |
|----------|--------|---------|
| ↑ Szersze | [termin] | Kategoria nadrzędna |
| ↓ Węższe | [termin] | Typ/Wariant |

### 4. Powiązane pojęcia techniczne

| Termin | Relacja do głównego |
|--------|---------------------|
| [termin] | Komponent/Atrybut/Proces |

### 5. Pytania (5W1H)

| Pytanie | Intencja |
|---------|----------|
| Co to jest [X]? | Informacyjna |
| Jak działa [X]? | Informacyjna |
| Gdzie kupić [X]? | Transakcyjna |
| Ile kosztuje [X]? | Komercyjna |
| Jaki [X] wybrać? | Komercyjna |
| [X] vs [Y] - co lepsze? | Porównawcza |

### 6. Frazy długiego ogona

Lista 10-20 fraz long-tail łączących główne słowo z modyfikatorami:
- [główne słowo] + [modyfikator ceny]
- [główne słowo] + [modyfikator jakości]
- [główne słowo] + [modyfikator lokalizacji]
- [główne słowo] + [modyfikator czasu]
- [główne słowo] + [modyfikator grupy docelowej]

### 7. Podsumowanie

```
Wygenerowano:
- Synonimy/warianty: [X]
- Koncepcje szersze: [X]
- Koncepcje węższe: [X]
- Pojęcia powiązane: [X]
- Pytania: [X]
- Frazy long-tail: [X]
─────────────────────
RAZEM: [X] fraz do dalszej analizy SERP
```

## Wskazówki generowania

1. **Myśl jak użytkownik** - jakie pytania zadałby ktoś eksplorujący temat?
2. **Pokryj pełne spektrum intencji** - od awareness do purchase
3. **Uwzględnij kontekst polski** - lokalne zwyczaje językowe, polskie marki
4. **Nie ograniczaj się** - lepiej więcej niż mniej, można zawsze odfiltrować
5. **Grupuj logicznie** - ułatwia późniejszą klasteryzację

## Przykład

**Wejście:** `samochód`

**Wyjście (fragment):**

### Synonimy i warianty
| Termin | Typ |
|--------|-----|
| auto | Potoczny |
| pojazd | Formalny |
| wóz | Potoczny |
| automobil | Formalny/Archaiczny |

### Koncepcje węższe
| Termin | Relacja |
|--------|---------|
| samochód sportowy | Typ |
| samochód elektryczny | Typ (napęd) |
| samochód hybrydowy | Typ (napęd) |
| SUV | Typ (nadwozie) |
| sedan | Typ (nadwozie) |
| kombi | Typ (nadwozie) |

### Pytania
| Pytanie | Intencja |
|---------|----------|
| Jaki samochód kupić? | Komercyjna |
| Co to jest samochód hybrydowy? | Informacyjna |
| Gdzie kupić samochód używany? | Transakcyjna |
| Jak przygotować samochód do sprzedaży? | Informacyjna |
| Ile kosztuje utrzymanie samochodu? | Komercyjna |
| Samochód elektryczny vs hybrydowy? | Porównawcza |

## Kiedy użytkownik nie podał słowa kluczowego

Poproś o:
1. **Słowo kluczowe** - centralne pojęcie do rozszerzenia
2. **Opcjonalnie: kontekst** - branża, grupa docelowa, cel (np. mapa tematyczna dla bloga)

## Ton odpowiedzi

- Konkretny, systematyczny
- Tabele dla przejrzystości
- Bez zbędnego komentowania - fokus na outputy
- Gotowe do użycia w kolejnym kroku (SERP analysis)
