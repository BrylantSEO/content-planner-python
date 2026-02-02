---
name: attribute-classifier
description: Klasyfikuje atrybuty encji na Unique, Root i Rare. Użyj do priorytetyzacji contentu, planowania struktury artykułów i określania hierarchii nagłówków.
---

# Attribute Classifier

Klasyfikujesz atrybuty encji według ich znaczenia i unikalności, co pozwala na priorytetyzację contentu i planowanie struktury artykułów.

## Klasyfikacja atrybutów

### UNIQUE (Unikalny)
**Definicja:** Atrybut pojawia się TYLKO dla tej konkretnej encji.

**Charakterystyka:**
- Różnicuje encję od innych w tej samej kategorii
- Stanowi główny powód, dla którego użytkownik szuka tej encji
- Jest "unique selling point" encji

**Test:** Czy ten atrybut występuje tylko przy tej encji, a nie przy innych podobnych?

**Przykłady:**
- iPhone → Face ID (tylko Apple)
- Tesla → Autopilot (tylko Tesla)
- Aquapark Kraków → [konkretna atrakcja unikalna dla tego obiektu]

### ROOT (Podstawowy)
**Definicja:** Atrybut zawsze obecny, nigdy się nie zmienia - definiuje istotę encji.

**Charakterystyka:**
- Bez tego atrybutu encja przestaje być sobą
- Jest częścią definicji encji
- Występuje u wszystkich instancji danego typu encji

**Test:** Czy usunięcie tego atrybutu zmieni definicję encji?

**Przykłady:**
- Samochód → liczba kół (zawsze 4)
- Aquapark → baseny (bez basenów to nie aquapark)
- Restauracja → serwuje jedzenie

### RARE (Rzadki)
**Definicja:** Atrybut czasami się pojawia, ale nie zawsze - jest opcjonalny.

**Charakterystyka:**
- Nie definiuje encji
- Występuje tylko u niektórych instancji
- Może być interesujący dla segmentu użytkowników

**Test:** Czy każda instancja tego typu encji ma ten atrybut?

**Przykłady:**
- Hotel → basen (nie każdy hotel ma)
- Aquapark → strefa SPA (opcjonalna)
- Samochód → panoramiczny dach

---

## Proces klasyfikacji

### Krok 1: Lista atrybutów
Zbierz wszystkie atrybuty encji (możesz użyć EAV Extractor)

### Krok 2: Test dla każdego atrybutu
Dla każdego atrybutu odpowiedz na trzy pytania:

| Pytanie | Jeśli TAK → |
|---------|-------------|
| Czy występuje TYLKO przy tej encji? | UNIQUE |
| Czy jest ZAWSZE obecny i definiuje encję? | ROOT |
| Czy występuje tylko CZASAMI? | RARE |

### Krok 3: Priorytetyzacja
Posortuj atrybuty: UNIQUE → ROOT → RARE

### Krok 4: Rekomendacje contentowe
Na podstawie klasyfikacji zaproponuj:
- Co powinno być w nagłówkach (UNIQUE, ROOT)
- Co może być w dodatkowych sekcjach (RARE)
- Co pomijać (atrybuty nieistotne dla SC)

---

## Format odpowiedzi

```markdown
## Klasyfikacja atrybutów: [nazwa encji]

### Podsumowanie
- **UNIQUE:** X atrybutów (różnicujące)
- **ROOT:** Y atrybutów (definiujące)
- **RARE:** Z atrybutów (opcjonalne)

### UNIQUE (Unikalne - priorytet 1)
| Atrybut | Wartość | Dlaczego unikalny |
|---------|---------|-------------------|
| [atr] | [wartość] | [uzasadnienie] |

### ROOT (Podstawowe - priorytet 2)
| Atrybut | Wartość | Dlaczego podstawowy |
|---------|---------|---------------------|
| [atr] | [wartość] | [uzasadnienie] |

### RARE (Rzadkie - priorytet 3)
| Atrybut | Wartość | Dlaczego rzadki |
|---------|---------|-----------------|
| [atr] | [wartość] | [uzasadnienie] |

### Rekomendacje contentowe
**Nagłówki (H2/H3):** [lista atrybutów UNIQUE + ROOT]
**Najważniejsze:** [atrybuty UNIQUE]
**Mniej ważne:** [atrybuty ROOT + wybrane RARE]
**Do pominięcia:** [atrybuty poza SC]
```

---

## Przykład

**Input:**
Encja: Aquapark Kraków
Atrybuty: baseny, zjeżdżalnie, strefa SPA, lokalizacja, godziny otwarcia, ceny, temperatura wody, największa zjeżdżalnia w Polsce, parking, szatnie, kawiarnia

**Output:**

### Podsumowanie
- **UNIQUE:** 1 atrybut (różnicujący)
- **ROOT:** 5 atrybutów (definiujące)
- **RARE:** 5 atrybutów (opcjonalne)

### UNIQUE (Unikalne - priorytet 1)
| Atrybut | Wartość | Dlaczego unikalny |
|---------|---------|-------------------|
| Największa zjeżdżalnia w Polsce | [X metrów] | Tylko ten aquapark ma tę atrakcję |

### ROOT (Podstawowe - priorytet 2)
| Atrybut | Wartość | Dlaczego podstawowy |
|---------|---------|---------------------|
| Baseny | [liczba] | Bez basenów to nie aquapark |
| Zjeżdżalnie | [liczba] | Podstawowa atrakcja aquaparku |
| Lokalizacja | Kraków | Definiuje który to aquapark |
| Godziny otwarcia | [godziny] | Każdy obiekt ma godziny |
| Ceny | [cennik] | Każdy obiekt ma ceny |

### RARE (Rzadkie - priorytet 3)
| Atrybut | Wartość | Dlaczego rzadki |
|---------|---------|-----------------|
| Strefa SPA | tak | Nie każdy aquapark ma SPA |
| Temperatura wody | 28°C | Nie zawsze komunikowane |
| Parking | [pojemność] | Nie każdy obiekt ma parking |
| Szatnie | [liczba] | Opcjonalna informacja |
| Kawiarnia | tak | Nie każdy aquapark ma kawiarnię |

### Rekomendacje contentowe
**Nagłówki (H2/H3):**
- "Największa zjeżdżalnia w Polsce" (UNIQUE - wyróżnik)
- "Baseny i zjeżdżalnie" (ROOT - podstawa)
- "Cennik i godziny otwarcia" (ROOT - praktyczne)

**Najważniejsze:**
- Największa zjeżdżalnia (UNIQUE)
- Lista atrakcji wodnych (ROOT)

**Mniej ważne:**
- Strefa SPA (RARE ale interesujące)
- Informacje praktyczne: parking, szatnie (RARE)

**Do pominięcia:**
- Kawiarnia (mało istotne dla SC turysty/rodziny)

---

## Zastosowanie w strukturze artykułu

Klasyfikacja UNIQUE → ROOT → RARE mapuje się na strukturę treści:

```
[Artykuł o encji]
├── Intro (CE + CSI)
├── UNIQUE sections (wyróżniki)
│   └── H2: Największa zjeżdżalnia w Polsce
├── ROOT sections (podstawowe info)
│   ├── H2: Atrakcje wodne
│   ├── H2: Cennik
│   └── H2: Godziny i lokalizacja
└── RARE sections (dodatkowe)
    ├── H3: Strefa SPA
    └── H3: Parking i dojazd
```

Ta struktura zapewnia:
1. Wyróżniki na początku (UNIQUE) - odpowiedź na "dlaczego ten?"
2. Podstawowe info w środku (ROOT) - odpowiedź na "co to jest?"
3. Dodatki na końcu (RARE) - odpowiedź na "co jeszcze?"
