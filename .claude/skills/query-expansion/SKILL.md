---
name: query-expansion
description: >
  Rozszerza pojedyncze słowo kluczowe na listę powiązanych fraz, synonimów, wariantów i pytań.
  Podstawowy krok w budowaniu map tematycznych. Użyj podając jedno centralne pojęcie/keyword.
  Triggery: rozszerz keyword, mapa tematyczna, powiązane frazy, jakie pytania zadają użytkownicy,
  klasteryzacja tematów.
---

# Query Expansion

Wykonuj query expansion - przekształcaj pojedyncze słowo kluczowe w bogaty zestaw powiązanych fraz i pytań (naśladuje Google keyword-to-query transformation).

## 7 typów rozszerzenia

### 1. Synonimy i warianty leksykalne
Różne formy, potoczne i formalne. Np. samochód → auto, pojazd, wóz.

### 2. Koncepcje szersze (hiperonimiczne)
Kategorie nadrzędne. Np. samochód → pojazd mechaniczny, środek transportu.

### 3. Koncepcje węższe (hiponimiczne)
Typy, rodzaje, warianty. Np. samochód → sportowy, elektryczny, SUV, sedan.

### 4. Powiązane pojęcia techniczne
Komponenty, atrybuty, cechy. Np. samochód → silnik, skrzynia biegów, zawieszenie.

### 5. Pytania 5W1H
Kto, Co, Gdzie, Kiedy, Dlaczego, Jak.

### 6. Porównania
X vs Y. Np. samochód elektryczny vs hybrydowy.

### 7. Intencje użytkowników
Informacyjne (co to, jak działa), transakcyjne (kupić, cena), nawigacyjne (marka, serwis), komercyjne (najlepszy, ranking).

## Format wyjściowy

```markdown
## Query Expansion: [keyword]
Język: [X] | Kategoria: [X]

### Synonimy i warianty
| Termin | Typ |
|--------|-----|

### Koncepcje szersze ↑ i węższe ↓
| Kierunek | Termin | Relacja |
|----------|--------|---------|

### Pojęcia techniczne
| Termin | Relacja do głównego |
|--------|---------------------|

### Pytania (5W1H)
| Pytanie | Intencja |
|---------|----------|

### Frazy long-tail
[10-20 fraz: keyword + modyfikatory ceny/jakości/lokalizacji/czasu/grupy docelowej]

### Podsumowanie
Synonimy: X | Szersze: X | Węższe: X | Powiązane: X | Pytania: X | Long-tail: X
RAZEM: X fraz do dalszej analizy SERP
```

## Wskazówki

1. Myśl jak użytkownik - jakie pytania zadałby ktoś eksplorujący temat?
2. Pokryj pełne spektrum intencji - od awareness do purchase.
3. Uwzględnij kontekst polski - lokalne zwyczaje językowe.
4. Lepiej więcej niż mniej - można odfiltrować.
