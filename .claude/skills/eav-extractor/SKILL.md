---
name: eav-extractor
description: >
  Ekstrahuje strukturę Entity-Attribute-Value (EAV) z tekstu - trójki faktyczne służące jako fundamentalny model danych
  w semantycznym SEO i Knowledge Graphs. Użyj do analizy artykułów, opisów produktów lub stron pod kątem
  semantycznej zawartości faktycznej, identyfikacji brakujących atrybutów i oceny pokrycia tematycznego.
  Triggery: wyciągnij EAV, analiza encji, struktura faktów, co mówi tekst o encji.
---

# EAV Extractor

Wydobywaj strukturę Entity-Attribute-Value (EAV) z tekstu - trójki [Encja] → [Atrybut] → [Wartość].

## Typy atrybutów

| Typ | Opis | Przykład |
|-----|------|----------|
| Prosty | Pojedyncza wartość | kolor: czerwony |
| Złożony | Wiele powiązanych wartości | adres: {ulica, miasto, kod} |
| Pochodny | Obliczony z innych | BMI (z wagi i wzrostu) |
| Kluczowy | Identyfikujący encję | PESEL, NIP |
| Wielo-wartościowy | Wiele wartości | języki obce |

## Proces ekstrakcji

1. **Identyfikuj encje** - Rzeczowniki własne, konkretne byty, koncepty (test Wikipedii).
2. **Ekstrahuj atrybuty** - Właściwości wprost, wynikające z kontekstu, relacje z innymi encjami.
3. **Przypisz wartości** - Konkretna wartość + typ (liczba, tekst, data, encja). Oznacz `[brak]` gdy atrybut bez wartości.

## Format odpowiedzi

```markdown
## Analiza EAV: [tytuł/opis tekstu]

### Zidentyfikowane encje
1. **[Encja główna]** - [krótki opis]
2. **[Encja 2]** - [krótki opis]

### Tabela EAV

| Entity | Attribute | Value | Typ |
|--------|-----------|-------|-----|
| [E1] | [atrybut] | [wartość] | [typ] |

### Relacje między encjami
- [E1] --[relacja]--> [E2]

### Statystyki
- Encje: X | Atrybuty: Y | Wartości liczbowe: Z
- Gęstość faktyczna: Y/liczba zdań
```

## Przykład

**Input:** "Aquapark Kraków to największy park wodny w Małopolsce. Posiada 8 zjeżdżalni, basen olimpijski 50m i strefę SPA. Temperatura wody: 28°C. Bilety od 45 zł/h."

| Entity | Attribute | Value | Typ |
|--------|-----------|-------|-----|
| Aquapark Kraków | typ | park wodny | prosty |
| Aquapark Kraków | ranking | największy w Małopolsce | pochodny |
| Aquapark Kraków | zjeżdżalnie | 8 | prosty |
| Aquapark Kraków | temperatura wody | 28°C | prosty |
| Aquapark Kraków | cena min | 45 zł/h | prosty |
| Basen olimpijski | długość | 50 m | prosty |
| Basen olimpijski | część | Aquapark Kraków | relacja |

Relacje: Aquapark Kraków --lokalizacja--> Małopolska, Basen --część--> Aquapark, SPA --część--> Aquapark

Statystyki: 4 encje, 9 atrybutów, 4 wartości liczbowe, gęstość: 2.25 fakty/zdanie
