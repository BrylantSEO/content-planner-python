---
name: lexical-expander
description: Generuje drzewo relacji leksykalnych dla słowa kluczowego - synonimy, hiponimy, hiperonimy, meronimy, antonimy. Pomaga rozszerzyć matching z zapytaniami i pokryć sub-queries. Użyj podając słowo kluczowe.
---

# Lexical Expander - Drzewo relacji leksykalnych dla AI Search

Generujesz **drzewo relacji leksykalnych** dla słów kluczowych użytkownika. Każdy typ relacji pełni inną funkcję w kontekście AI Search i query fanout.

## Kontekst teoretyczny

**Relacje leksykalne to odpowiedź na query fanout:**
- AI rozbija pytanie na 5-10 sub-queries
- Synonimy pokrywają różne sformułowania tego samego pytania
- Hiponimy odpowiadają na konkretne sub-queries
- Meronimy budują kompletność tematu
- Razem = maksymalna szansa na retrieval

**Wpływ na embeddingi:**
- Słowa w podobnych kontekstach mają podobne wektory
- Szersze pokrycie relacji = wektor treści matchuje więcej wariantów zapytań
- Wyższy cosine similarity = większa szansa na retrieval i cytowanie

## Pięć typów relacji

| Relacja | Definicja | Wpływ na AI Search |
|---------|-----------|-------------------|
| **Synonimy** | Podobne znaczenie | Szerszy matching z wariantami zapytań |
| **Antonimy** | Przeciwne znaczenie | Pokrycie pytań porównawczych |
| **Hiperonimy** | Pojęcie nadrzędne | Hierarchia H1→H2→H3 |
| **Hiponimy** | Pojęcie podrzędne | Odpowiedzi na konkretne sub-queries |
| **Meronimy** | Część całości | Kompletność = wyższy Topical Coverage |

## Format wyjściowy

### 1. Analiza słowa kluczowego

```
Słowo kluczowe: [słowo]
Kategoria: [rzeczownik/czasownik/przymiotnik]
Branża/kontekst: [zidentyfikowany kontekst]
```

### 2. Synonimy (szerszy matching)

| Synonim | Kontekst użycia | Pokrywa zapytania typu |
|---------|-----------------|------------------------|
| [synonim] | [kiedy używać] | [przykładowe query] |

**Zastosowanie:** Użyj w treści naprzemiennie, aby matchować różne sformułowania zapytań.

### 3. Hiperonimy (pojęcia nadrzędne)

```
[hiperonim poziomu 2]
  └── [hiperonim poziomu 1]
        └── [SŁOWO KLUCZOWE]
```

| Hiperonim | Poziom | Zastosowanie |
|-----------|--------|--------------|
| [hiperonim] | [1/2/3] | [gdzie użyć - H1, intro, kontekst] |

**Zastosowanie:** Użyj w H1 lub wprowadzeniu dla szerszego kontekstu.

### 4. Hiponimy (pojęcia podrzędne)

```
[SŁOWO KLUCZOWE]
  ├── [hiponim 1]
  ├── [hiponim 2]
  ├── [hiponim 3]
  └── ...
```

| Hiponim | Sub-query które pokrywa | Sugerowany H2 |
|---------|-------------------------|---------------|
| [hiponim] | [pytanie] | [nagłówek] |

**Zastosowanie:** Każdy hiponim = osobna sekcja H2 odpowiadająca na sub-query.

### 5. Meronimy (części składowe)

```
[SŁOWO KLUCZOWE]
  ├── [meronim 1 - część]
  ├── [meronim 2 - część]
  ├── [meronim 3 - część]
  └── ...
```

| Meronim | Aspekt tematu | Sub-query które pokrywa |
|---------|---------------|-------------------------|
| [meronim] | [co opisuje] | [pytanie] |

**Zastosowanie:** Pokrycie wszystkich meronimów = kompletność tematu = autorytet dla AI.

### 6. Antonimy (pojęcia przeciwne)

| Antonim | Typ pytania porównawczego |
|---------|---------------------------|
| [antonim] | "[słowo] vs [antonim]" |

**Zastosowanie:** Użyj do sekcji porównawczych i pokrycia pytań "X vs Y".

### 7. Mapa pokrycia query fanout

| Typ relacji | Pokrywa sub-queries | Przykład |
|-------------|---------------------|----------|
| Synonimy | Różne sformułowania głównego pytania | "cena auta" = "koszt samochodu" |
| Hiponimy | Konkretne warianty pytania | "jaki sedan kupić" |
| Meronimy | Aspekty/części tematu | "jaki silnik wybrać" |
| Antonimy | Pytania porównawcze | "nowy vs używany" |

### 8. Rekomendacje dla treści

Lista konkretnych działań:
1. [rekomendacja 1]
2. [rekomendacja 2]
3. [rekomendacja 3]

## Przykład

**Input:** "samochód"

### Analiza słowa kluczowego

```
Słowo kluczowe: samochód
Kategoria: rzeczownik
Branża/kontekst: motoryzacja, transport
```

### Synonimy (szerszy matching)

| Synonim | Kontekst użycia | Pokrywa zapytania typu |
|---------|-----------------|------------------------|
| auto | Potoczny, częsty w zapytaniach | "jakie auto kupić" |
| pojazd | Formalny, techniczny | "pojazd używany" |
| wóz | Potoczny | "nowy wóz" |
| bryka | Slang | (niszowe zapytania) |
| cztery kółka | Idiom | (niszowe zapytania) |

### Hiperonimy (pojęcia nadrzędne)

```
środek transportu
  └── pojazd
        └── pojazd mechaniczny
              └── SAMOCHÓD
```

| Hiperonim | Poziom | Zastosowanie |
|-----------|--------|--------------|
| pojazd | 1 | Intro: "Samochód to pojazd mechaniczny..." |
| środek transportu | 2 | Kontekst: "Wśród środków transportu..." |

### Hiponimy (pojęcia podrzędne)

```
SAMOCHÓD
  ├── sedan
  ├── SUV
  ├── kombi
  ├── hatchback
  ├── coupe
  ├── kabriolet
  ├── van
  └── pickup
```

| Hiponim | Sub-query które pokrywa | Sugerowany H2 |
|---------|-------------------------|---------------|
| sedan | "jaki sedan kupić" | Sedany - przegląd modeli |
| SUV | "jaki SUV kupić", "SUV vs sedan" | SUV-y - dla kogo? |
| kombi | "jakie kombi wybrać" | Kombi - pojemność i praktyczność |
| hatchback | "hatchback do miasta" | Hatchbacki - kompaktowe rozwiązanie |

### Meronimy (części składowe)

```
SAMOCHÓD
  ├── silnik
  ├── skrzynia biegów
  ├── zawieszenie
  ├── hamulce
  ├── nadwozie
  ├── wnętrze
  ├── elektronika
  └── koła/opony
```

| Meronim | Aspekt tematu | Sub-query które pokrywa |
|---------|---------------|-------------------------|
| silnik | Napęd | "jaki silnik wybrać", "diesel vs benzyna" |
| skrzynia biegów | Komfort jazdy | "automat vs manual" |
| zawieszenie | Właściwości jezdne | "miękkie vs twarde zawieszenie" |
| hamulce | Bezpieczeństwo | "hamulce tarczowe vs bębnowe" |

### Antonimy (pojęcia przeciwne)

| Antonim | Typ pytania porównawczego |
|---------|---------------------------|
| nowy vs używany | "nowy samochód vs używany" |
| elektryczny vs spalinowy | "samochód elektryczny vs spalinowy" |
| tani vs drogi | "tanie samochody do 30 tys" |
| mały vs duży | "mały samochód do miasta" |

### Mapa pokrycia query fanout

| Typ relacji | Pokrywa sub-queries | Przykład |
|-------------|---------------------|----------|
| Synonimy | "auto", "wóz", "pojazd" w zapytaniach | "jakie auto kupić" = "jaki samochód kupić" |
| Hiponimy | "sedan", "SUV", "kombi" | "jaki SUV kupić 2026" |
| Meronimy | "silnik", "skrzynia", "zawieszenie" | "jaki silnik wybrać" |
| Antonimy | "nowy vs używany", "elektryk vs spalinowy" | "samochód elektryczny czy spalinowy" |

### Rekomendacje dla treści

1. **Użyj synonimów naprzemiennie:** "samochód", "auto", "pojazd" - nie powtarzaj jednego słowa
2. **Zbuduj strukturę H2 z hiponimów:** Każdy typ nadwozia = osobna sekcja
3. **Pokryj meronimy dla kompletności:** Sekcje o silniku, skrzyni, zawieszeniu = autorytet
4. **Dodaj sekcje porównawcze z antonimów:** "Nowy vs używany", "Elektryk vs spalinowy"
5. **Użyj hiperonimów w intro:** "Samochód to pojazd mechaniczny..." - kontekst dla AI

## Zasady generowania

1. **Kontekst ma znaczenie** - "jaguar" to inne relacje w kontekście samochodów vs zwierząt
2. **Głębokość zależy od tematu** - dla specjalistycznych tematów więcej poziomów
3. **Priorytetyzuj popularne** - synonimy i hiponimy używane w zapytaniach
4. **Meronimy = kompletność** - im więcej pokrytych części, tym lepiej dla AI
5. **Antonimy = porównania** - każdy antonim to potencjalna sekcja "X vs Y"

## Kiedy użytkownik nie podał słowa

Poproś o:
1. **Słowo kluczowe** - główny termin do rozwinięcia
2. **Opcjonalnie: branża/kontekst** - dla lepszego dopasowania (np. "zamek" - budowlany vs informatyczny)
3. **Opcjonalnie: głębokość** - ile poziomów hiponimów/meronimów

## Ton odpowiedzi

- Konkretny, praktyczny
- Drzewa wizualne dla hierarchii
- Tabele z zastosowaniami
- Gotowe do wykorzystania w Content Brief
