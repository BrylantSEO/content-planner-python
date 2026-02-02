---
name: information-density-checker
description: Audytuje gęstość informacyjną tekstu - stosunek faktów do "puchu". Użyj do oceny jakości contentu pod kątem information gain i identyfikacji fragmentów do zagęszczenia.
---

# Information Density Checker

Analizujesz tekst pod kątem gęstości informacyjnej - stosunku konkretnych faktów do ogólnikowych sformułowań. Wysoka gęstość = wysoki information gain dla użytkownika.

## Zasada fundamentalna

> **Fakty > Przymiotniki**
> **Konkretne liczby > "Wiele", "kilka"**
> **Encje i wartości > Słowa modalne**

Google (i AI Search) preferuje treści, które dostarczają weryfikowalnych informacji zamiast ogólnych opinii.

---

## Co obniża gęstość informacyjną

### 1. Słowa modalne (bez wartości)
```
❌ "powinieneś", "musisz", "warto", "trzeba"
❌ "najlepszy", "świetny", "rewelacyjny"
❌ "wiele", "kilka", "niektóre", "różne"
```

### 2. Puste frazy retoryczne
```
❌ "Nie da się ukryć, że..."
❌ "Warto wiedzieć, że..."
❌ "Każdy wie, że..."
❌ "Jest wiele powodów, dla których..."
```

### 3. Przymiotniki bez wartości
```
❌ "duży aquapark" → ✅ "aquapark o powierzchni 5000 m²"
❌ "popularne miejsce" → ✅ "500 000 odwiedzających rocznie"
❌ "ciepła woda" → ✅ "temperatura wody 28°C"
```

### 4. Opinie zamiast faktów
```
❌ "To świetne miejsce dla rodzin"
✅ "Obiekt posiada 3 strefy dla dzieci w wieku 3-12 lat"
```

---

## Co zwiększa gęstość informacyjną

### 1. Atomic claims (niepodzielne twierdzenia)
Zdania, które można zweryfikować jako prawda/fałsz:
```
✅ "Aquapark Kraków ma 8 zjeżdżalni"
✅ "Temperatura wody wynosi 28°C"
✅ "Bilet kosztuje 45 zł za godzinę"
```

### 2. Konkretne liczby
```
✅ Wymiary: 50 m, 5000 m²
✅ Ilości: 8 zjeżdżalni, 3 baseny
✅ Ceny: 45 zł, 120 zł
✅ Daty: otwarty od 2015, czynny 8:00-22:00
✅ Statystyki: 500 000 odwiedzających
```

### 3. Nazwy własne (encje)
```
✅ Lokalizacje: Kraków, ul. Dobrego Pasterza 126
✅ Organizacje: Park Wodny Kraków Sp. z o.o.
✅ Produkty: Strefa SPA, Zjeżdżalnia Kamikaze
```

### 4. Wartości atrybutów EAV
```
✅ [Aquapark] → [temperatura wody] → [28°C]
✅ [Basen] → [długość] → [50 metrów]
✅ [Zjeżdżalnia] → [wysokość] → [18 metrów]
```

---

## Proces analizy

### Krok 1: Podział na zdania
Podziel tekst na pojedyncze zdania.

### Krok 2: Klasyfikacja każdego zdania

| Typ | Opis | Wartość |
|-----|------|---------|
| FAKT | Weryfikowalne twierdzenie | +1 |
| OPINIA | Subiektywna ocena | 0 |
| PUCH | Pusta retoryka | -1 |

### Krok 3: Zliczenie elementów

Policz w tekście:
- Liczby/wartości
- Encje (nazwy własne)
- Słowa modalne
- Przymiotniki wartościujące

### Krok 4: Obliczenie metryk

```
Gęstość faktyczna = Liczba faktów / Liczba zdań
Stosunek konkretności = (Liczby + Encje) / (Modalne + Przymiotniki)
```

### Krok 5: Identyfikacja problemów

Wskaż zdania do poprawy z konkretnymi sugestiami zagęszczenia.

---

## Format odpowiedzi

```markdown
## Audyt gęstości informacyjnej

### Podsumowanie
| Metryka | Wartość | Ocena |
|---------|---------|-------|
| Liczba zdań | X | - |
| Zdania faktyczne | Y | [dobrze/słabo] |
| Gęstość faktyczna | Y/X | [%] |
| Liczby/wartości | Z | [dobrze/słabo] |
| Słowa modalne | W | [dobrze/słabo] |

### Ocena ogólna: [X/10]

### Problematyczne fragmenty

| # | Fragment | Problem | Sugestia zagęszczenia |
|---|----------|---------|----------------------|
| 1 | "[tekst]" | [brak konkretu] | "[propozycja]" |
| 2 | "[tekst]" | [słowo modalne] | "[propozycja]" |

### Pozytywne przykłady
[Lista zdań o wysokiej gęstości z tekstu]

### Rekomendacje
1. [konkretna rekomendacja]
2. [konkretna rekomendacja]
```

---

## Przykład

**Input:**
```
Aquapark Kraków to świetne miejsce dla całej rodziny. Jest wiele powodów,
dla których warto je odwiedzić. Obiekt posiada kilka basenów i zjeżdżalni.
Temperatura wody jest przyjemna, a ceny przystępne. To jeden z największych
aquaparków w Polsce.
```

**Output:**

### Audyt gęstości informacyjnej

### Podsumowanie
| Metryka | Wartość | Ocena |
|---------|---------|-------|
| Liczba zdań | 5 | - |
| Zdania faktyczne | 0 | słabo |
| Gęstość faktyczna | 0% | bardzo słabo |
| Liczby/wartości | 0 | bardzo słabo |
| Słowa modalne | 4 (warto, kilka, przystępne, największych) | za dużo |

### Ocena ogólna: 2/10

### Problematyczne fragmenty

| # | Fragment | Problem | Sugestia zagęszczenia |
|---|----------|---------|----------------------|
| 1 | "świetne miejsce dla całej rodziny" | przymiotnik wartościujący | "obiekt z 3 strefami dla dzieci 3-12 lat" |
| 2 | "Jest wiele powodów" | pusta retoryka | usunąć lub zastąpić konkretami |
| 3 | "kilka basenów i zjeżdżalni" | nieokreślona ilość | "4 baseny i 8 zjeżdżalni" |
| 4 | "Temperatura wody jest przyjemna" | brak wartości | "Temperatura wody: 28°C" |
| 5 | "ceny przystępne" | brak wartości | "bilety od 45 zł/h" |
| 6 | "jeden z największych" | nieokreślony ranking | "3. największy w Polsce (5000 m²)" |

### Pozytywne przykłady
Brak - tekst nie zawiera zdań faktycznych.

### Rekomendacje
1. Dodaj konkretne liczby do każdego zdania
2. Usuń "Jest wiele powodów" - to pusta fraza
3. Zamień przymiotniki na wartości (świetne → 3 strefy, przyjemna → 28°C)
4. Podaj ranking i powierzchnię zamiast "jeden z największych"

---

## Benchmark gęstości

| Score | Ocena | Charakterystyka |
|-------|-------|-----------------|
| 9-10 | Doskonały | Każde zdanie to fakt z wartością |
| 7-8 | Dobry | Większość zdań faktyczna, pojedyncze opinie |
| 5-6 | Średni | Mix faktów i ogólników |
| 3-4 | Słaby | Dużo "puchu", mało konkretów |
| 1-2 | Bardzo słaby | Głównie retoryka bez faktów |

---

## Słownik transformacji

| Niska gęstość | Wysoka gęstość |
|---------------|----------------|
| wiele | [konkretna liczba] |
| kilka | [konkretna liczba] |
| duży/mały | [wymiary w jednostkach] |
| drogi/tani | [cena w PLN] |
| popularny | [liczba użytkowników/odwiedzających] |
| nowoczesny | [rok budowy/otwarcia] |
| blisko | [odległość w km/min] |
| szybki | [czas w jednostkach] |
| wysoki/niski | [wysokość w jednostkach] |
| świetny/zły | [konkretne cechy/metryki] |
