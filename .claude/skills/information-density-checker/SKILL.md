---
name: information-density-checker
description: >
  Audytuje gęstość informacyjną tekstu - stosunek faktów do "puchu" (ogólników, słów modalnych).
  Użyj do oceny jakości contentu pod kątem information gain, identyfikacji fragmentów do zagęszczenia,
  i transformacji ogólników na konkrety. Triggery: sprawdź gęstość, ile faktów, za dużo puchu,
  zagęść tekst, oceń information gain.
---

# Information Density Checker

Analizuj tekst pod kątem gęstości informacyjnej: stosunek konkretnych faktów do ogólników.

> **Fakty > Przymiotniki | Liczby > "wiele/kilka" | Encje i wartości > Słowa modalne**

## Co obniża gęstość (eliminuj)

- **Słowa modalne:** "powinieneś", "musisz", "warto", "najlepszy", "świetny"
- **Puste frazy:** "Nie da się ukryć...", "Warto wiedzieć...", "Jest wiele powodów..."
- **Przymiotniki bez wartości:** "duży aquapark" → "aquapark 5000 m²"
- **Opinie zamiast faktów:** "świetne miejsce" → "3 strefy dla dzieci 3-12 lat"

## Co zwiększa gęstość (dodawaj)

- **Atomic claims:** zdania weryfikowalne jako prawda/fałsz
- **Konkretne liczby:** wymiary, ilości, ceny, daty, statystyki
- **Nazwy własne (encje):** lokalizacje, organizacje, produkty
- **Trójki EAV:** [Encja] → [Atrybut] → [Wartość]

## Proces analizy

1. **Podziel na zdania.**
2. **Klasyfikuj:** FAKT (+1, weryfikowalne) | OPINIA (0, subiektywne) | PUCH (-1, retoryka).
3. **Policz:** liczby/wartości, encje, słowa modalne, przymiotniki wartościujące.
4. **Oblicz metryki:** Gęstość = Fakty/Zdania, Konkretność = (Liczby+Encje)/(Modalne+Przymiotniki).
5. **Wskaż problemy** z konkretnymi sugestiami zagęszczenia.

## Format odpowiedzi

```markdown
## Audyt gęstości informacyjnej

### Podsumowanie
| Metryka | Wartość | Ocena |
|---------|---------|-------|
| Zdań | X | - |
| Zdania faktyczne | Y | [dobrze/słabo] |
| Gęstość faktyczna | Y/X | [%] |
| Liczby/wartości | Z | [dobrze/słabo] |
| Słowa modalne | W | [dobrze/słabo] |

### Ocena: [X/10]

### Problematyczne fragmenty
| # | Fragment | Problem | Sugestia |
|---|----------|---------|----------|
| 1 | "[tekst]" | [brak konkretu] | "[propozycja]" |

### Pozytywne przykłady
[zdania o wysokiej gęstości z tekstu]

### Rekomendacje
1. [konkretna rekomendacja]
```

## Słownik transformacji

| Niska gęstość | → Wysoka gęstość |
|---------------|------------------|
| wiele/kilka | [konkretna liczba] |
| duży/mały | [wymiary w jednostkach] |
| drogi/tani | [cena w PLN] |
| popularny | [liczba odwiedzających] |
| nowoczesny | [rok budowy/otwarcia] |
| blisko | [odległość w km/min] |
| szybki | [czas w jednostkach] |

## Skala ocen

| Score | Charakterystyka |
|-------|-----------------|
| 9-10 | Każde zdanie to fakt z wartością |
| 7-8 | Większość faktyczna, pojedyncze opinie |
| 5-6 | Mix faktów i ogólników |
| 3-4 | Dużo "puchu", mało konkretów |
| 1-2 | Głównie retoryka bez faktów |
