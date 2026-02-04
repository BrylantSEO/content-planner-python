---
name: frame-semantics
description: >
  Generuje ramkę semantyczną (Frame Semantics) dla tematu z mapowaniem elementów na potencjalne sub-queries.
  Pomaga budować treści pokrywające query fanout. Użyj podając temat lub predykat (np. "kupować samochód", "leasing").
  Triggery: ramka semantyczna, mapa sub-queries, pokryj query fanout, jakie pytania pokryć, elementy tematu.
---

# Frame Semantics Generator

Generuj ramki semantyczne dla tematów - sieć pojęć powiązanych z centralnym predykatem, gdzie każdy element odpowiada potencjalnemu sub-query w query fanout.

**Cel:** Zamiast zgadywać jakie sub-queries wygeneruje AI, zbuduj strukturę pokrywającą je z góry. Więcej pokrytych elementów ramki = większa szansa na retrieval.

## 15 elementów ramki

| Element | Rola | Typowe sub-query |
|---------|------|------------------|
| **Agent** | Kto wykonuje? | "Kto może X?" |
| **Patient** | Co jest przedmiotem? | "Co jest X?" |
| **Instrument** | Czym/jak? | "Jak X?", "Czym X?" |
| **Location** | Gdzie? | "Gdzie X?" |
| **Time** | Kiedy? | "Kiedy X?" |
| **Cause** | Dlaczego? | "Dlaczego X?" |
| **Purpose** | Po co? | "Czy warto X?" |
| **Manner** | W jaki sposób? | "Jak najlepiej X?" |
| **Result** | Efekt? | "Co po X?" |
| **Condition** | Pod jakim warunkiem? | "Kiedy można X?" |
| **Beneficiary** | Dla kogo? | "Dla kogo X?" |
| **Source** | Skąd? | "Skąd wziąć X?" |
| **Cost** | Ile kosztuje? | "Ile kosztuje X?" |
| **Alternative** | Co zamiast? | "X vs Y?" |
| **Part** | Z czego się składa? | "Elementy X?" |

## Typy pytań z ramek

| Typ | Wzorzec | Element |
|-----|---------|---------|
| Definitional | Co to jest X? | Patient |
| Boolean | Czy X jest Y? | Condition |
| Grouping | Jakie rodzaje X? | Part |
| Comparative | X vs Y? | Alternative |
| Process | Jak zrobić X? | Instrument, Manner |
| Cost | Ile kosztuje X? | Cost |
| Causal | Dlaczego X? | Cause, Purpose |

## Format wyjściowy

```markdown
## Ramka semantyczna: [temat]
Predykat: [X] | Perspektywa: [kupujący/sprzedający/ekspert]

### Ramka
| Element | Wartość | Sub-query | Priorytet |
|---------|---------|-----------|-----------|

### Mapa query fanout
Pytanie główne: [X]
├── [sub-query 1] ← Element
├── [sub-query 2] ← Element
└── ...

### Sugerowana struktura H2
| H2 | Pokrywa element | Typ pytania |
|----|-----------------|-------------|

### Powiązane ramki
| Ramka | Relacja | Potencjalne rozszerzenie |
|-------|---------|-------------------------|
```

## Zasady

1. **Perspektywa ma znaczenie** - "KUPOWAĆ" wygląda inaczej z perspektywy kupującego vs sprzedającego.
2. **Priorytetyzuj** na podstawie typowych intencji wyszukiwania.
3. **Elementy się łączą** - Cost + Instrument = "Ile kosztuje i jak finansować".
4. **Ramki są zagnieżdżone** - "FINANSOWAĆ" to osobna ramka wewnątrz "KUPOWAĆ".
