---
name: attribute-classifier
description: >
  Klasyfikuje atrybuty encji na Unique, Root i Rare. Użyj do priorytetyzacji contentu,
  planowania struktury artykułów, określania hierarchii nagłówków H2/H3 i identyfikacji
  wyróżników encji. Triggery: sklasyfikuj atrybuty, priorytetyzacja contentu, co jest unikalne,
  hierarchia nagłówków, struktura artykułu wg atrybutów.
---

# Attribute Classifier

Klasyfikuj atrybuty encji według znaczenia i unikalności → priorytetyzacja contentu i struktura artykułów.

## Trzy klasy atrybutów

### UNIQUE - tylko ta encja ma ten atrybut
Różnicuje encję od innych w kategorii. Główny powód, dla którego użytkownik szuka tej encji.
**Test:** Czy ten atrybut występuje tylko przy tej encji?
**Przykład:** Tesla → Autopilot, iPhone → Face ID

### ROOT - zawsze obecny, definiuje istotę encji
Bez tego atrybutu encja przestaje być sobą. Występuje u wszystkich instancji typu.
**Test:** Czy usunięcie zmieni definicję encji?
**Przykład:** Aquapark → baseny, Samochód → 4 koła

### RARE - opcjonalny, czasami się pojawia
Nie definiuje encji. Występuje u niektórych instancji. Interesujący dla segmentu użytkowników.
**Test:** Czy każda instancja tego typu ma ten atrybut?
**Przykład:** Hotel → basen, Aquapark → strefa SPA

## Proces klasyfikacji

1. **Zbierz atrybuty** encji (możesz użyć EAV Extractor).
2. **Testuj każdy atrybut** - Tylko ta encja? → UNIQUE. Zawsze obecny? → ROOT. Czasami? → RARE.
3. **Priorytetyzuj:** UNIQUE → ROOT → RARE.
4. **Rekomenduj strukturę contentu:** UNIQUE i ROOT w nagłówkach H2, RARE w dodatkowych sekcjach H3.

## Format odpowiedzi

```markdown
## Klasyfikacja atrybutów: [encja]

**UNIQUE:** X | **ROOT:** Y | **RARE:** Z

### UNIQUE (priorytet 1)
| Atrybut | Wartość | Dlaczego unikalny |
|---------|---------|-------------------|

### ROOT (priorytet 2)
| Atrybut | Wartość | Dlaczego podstawowy |
|---------|---------|---------------------|

### RARE (priorytet 3)
| Atrybut | Wartość | Dlaczego rzadki |
|---------|---------|-----------------|

### Rekomendowana struktura artykułu
[Artykuł]
├── Intro (CE + CSI)
├── H2: [UNIQUE - wyróżniki]
├── H2: [ROOT - podstawowe info]
└── H3: [RARE - dodatki]
```

## Przykład

**Encja:** Aquapark Kraków
**Atrybuty:** baseny, zjeżdżalnie, SPA, lokalizacja, godziny, ceny, największa zjeżdżalnia w PL, parking, szatnie

- **UNIQUE:** Największa zjeżdżalnia w Polsce → H2 wyróżnik
- **ROOT:** Baseny, zjeżdżalnie, lokalizacja, godziny, ceny → H2 podstawowe
- **RARE:** SPA, parking, szatnie → H3 dodatki

Struktura: UNIQUE na początku (dlaczego ten?), ROOT w środku (co to jest?), RARE na końcu (co jeszcze?).
