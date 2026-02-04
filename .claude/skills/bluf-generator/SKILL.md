---
name: bluf-generator
description: >
  Przekształca tekst na format BLUF (Bottom Line Up Front) zoptymalizowany pod cytowanie przez AI Search i RAG.
  Używaj gdy użytkownik chce przepisać tekst by AI go cytowało, zoptymalizować treść pod wyszukiwarki AI,
  stworzyć odpowiedź z kluczową informacją w pierwszych 50 słowach, usunąć watę słowną z tekstu SEO,
  lub zamienić ogólniki na konkretne liczby. Triggery: przepisz na BLUF, zoptymalizuj pod AI, odpowiedź na górze,
  usuń watę, zagęść tekst.
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

1. **Zidentyfikuj pytanie** - na co tekst odpowiada (jawnie lub domyślnie).
2. **Znajdź odpowiedź** - zlokalizuj właściwą odpowiedź w tekście.
3. **Przepisz w BLUF** - odpowiedź na początek, dodaj liczby, usuń wstępy i ogólniki.
4. **Zwróć wynik** z analizą i tabelą struktury.

## Format wyniku

```
## Analiza
- Pytanie: [zidentyfikowane pytanie]
- Problem: [gdzie ukryta odpowiedź, brak liczb, itp.]

## Transformacja BLUF
[przepisany tekst]

## Struktura
| Element | Treść |
|---------|-------|
| Odpowiedź | [zdanie główne] |
| Dowód | [liczby/dane] |
| Kontekst | [rozwinięcie] |
```

## Przykład

**Przed:** "W dzisiejszych czasach e-commerce rozwija się w zawrotnym tempie. Coraz więcej firm przenosi działalność do internetu. Jednym z kluczowych wyzwań jest optymalizacja konwersji..."

**Po BLUF:** "Aby zwiększyć konwersję w sklepie online, skróć czas ładowania do <3s, uprość checkout do 3 kroków i dodaj social proof. Te zmiany podnoszą konwersję o 20-35% (Baymard Institute 2024)."

## Kluczowe transformacje

| Ogólnik | → Precyzja |
|---------|------------|
| "wiele" | konkretna liczba |
| "często" | "w X% przypadków" |
| "szybko" | "w ciągu X dni/godzin" |
| "znacząco" | "o X%" |

| Eliminuj | Przykład |
|----------|----------|
| Wstępy | "W dzisiejszych czasach..." |
| Zapowiedzi | "W tym artykule..." |
| Puste przymiotniki | "najlepszy", "innowacyjny" |

Szczegółowe zasady transformacji → `references/transformations.md`
