---
name: bluf-generator
description: >
  Przekształca tekst na format BLUF (Bottom Line Up Front) zoptymalizowany pod cytowanie przez AI Search i RAG. 
  Używaj gdy użytkownik chce przepisać tekst by AI go cytowało, zoptymalizować treść pod wyszukiwarki AI, 
  stworzyć odpowiedź z kluczową informacją w pierwszych 50 słowach, usunąć watę słowną z tekstu SEO, 
  lub zamienić ogólniki na konkretne liczby. Triggery - przepisz na BLUF, zoptymalizuj pod AI, odpowiedź na górze.
---

# BLUF Generator

Przekształcaj treści na format **BLUF (Bottom Line Up Front)** - odpowiedź w pierwszych 50 słowach, potem dowody i kontekst.

## Struktura BLUF

```
Zdanie 1: ODPOWIEDŹ - bezpośrednia odpowiedź na pytanie
Zdanie 2: DOWÓD - kluczowe liczby/dane
Reszta:   KONTEKST - rozwinięcie, przykłady
```

## Workflow

### 1. Zidentyfikuj pytanie
Określ na jakie pytanie odpowiada tekst (jawnie lub domyślnie).

### 2. Znajdź odpowiedź
Zlokalizuj gdzie w tekście jest właściwa odpowiedź.

### 3. Przepisz w strukturze BLUF
- Przenieś odpowiedź na początek
- Dodaj konkretne liczby (zakresy jeśli brak dokładnych)
- Usuń wstępy i ogólniki

### 4. Zwróć wynik

```
## Analiza
- Pytanie: [zidentyfikowane pytanie]
- Problem: [gdzie była ukryta odpowiedź, brak liczb, itp.]

## Transformacja BLUF

[przepisany tekst]

## Struktura
| Element | Treść |
|---------|-------|
| Odpowiedź | [zdanie główne] |
| Dowód | [liczby/dane] |
| Kontekst | [rozwinięcie] |
```

## Przykład transformacji

**❌ Wejście (typowy artykuł SEO):**
```
W dzisiejszych czasach e-commerce rozwija się w zawrotnym tempie. 
Coraz więcej firm przenosi swoją działalność do internetu. Jednym 
z kluczowych wyzwań jest optymalizacja konwersji. W tym artykule 
przyjrzymy się najlepszym praktykom...
```

**✅ Wyjście BLUF:**
```
Aby zwiększyć konwersję w sklepie online, skup się na trzech 
obszarach: skróć czas ładowania do poniżej 3 sekund, uprość 
checkout do 3 kroków i dodaj social proof. Te zmiany podnoszą 
konwersję o 20-35% według Baymard Institute 2024.
```

## Transformacje kluczowe

| Ogólnik | → Precyzja |
|---------|------------|
| "wiele" | konkretna liczba |
| "często" | "w X% przypadków" |
| "szybko" | "w ciągu X dni/godzin" |
| "znacząco" | "o X%" |
| "regularnie" | "co X dni" |

| Eliminuj | Przykład |
|----------|----------|
| Wstępy | "W dzisiejszych czasach..." |
| Zapowiedzi | "W tym artykule..." |
| Puste przymiotniki | "najlepszy", "innowacyjny" |

Szczegółowe zasady transformacji → `references/transformations.md`

## Brak tekstu od użytkownika

Poproś o:
1. Tekst do transformacji, lub
2. Pytanie/temat do wygenerowania odpowiedzi BLUF
