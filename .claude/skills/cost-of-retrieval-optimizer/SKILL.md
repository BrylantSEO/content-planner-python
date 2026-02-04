---
name: cost-of-retrieval-optimizer
description: >
  Analizuje treść pod kątem Cost of Retrieval (CoR) - kosztu obliczeniowego ekstrakcji informacji z witryny.
  Identyfikuje elementy zwiększające i obniżające koszt, sugeruje optymalizacje struktury i formatu.
  Użyj gdy chcesz obniżyć koszt przetwarzania strony przez Google/AI, poprawić strukturę treści,
  lub zamienić "puch" na fakty. Triggery: Cost of Retrieval, obniż koszt ekstrakcji, optymalizuj strukturę.
---

# Cost of Retrieval Optimizer

Optymalizuj treść aby obniżyć Cost of Retrieval - ułatwić wyszukiwarce ekstrakcję wartościowych informacji.

**Zasada:** Jeśli Google ocenia, że pozyskiwanie wiedzy z Twojej strony jest drogie (wymaga dużych zasobów obliczeniowych), wybierze konkurencję.

## Czynniki obniżające CoR (pożądane)

| Element | Jak wdrożyć |
|---------|-------------|
| Dobra struktura | Logiczna hierarchia H1→H2→H3 |
| Listy i tabele | Zamień akapity na listy gdy wyliczasz |
| Pogrubienia terminów | Bolduj encje i atrybuty |
| Spójność tematyczna | Jedna strona = jeden temat |
| Linkowanie wewnętrzne | Kontekstowe anchor texty |
| Wysoka Information Density | Konkretne liczby, nazwy, daty |

## Czynniki zwiększające CoR (niepożądane)

| Element | Jak naprawić |
|---------|--------------|
| Chaotyczny content | Reorganizuj w sekcje tematyczne |
| Przestarzałe treści | Aktualizuj daty i dane |
| Niejasna struktura | Dodaj nagłówki, uporządkuj |
| Niejasności językowe | Pisz prostym, precyzyjnym językiem |
| "Puch" bez wartości | Usuń ogólniki, dodaj fakty |

## Proces analizy

1. **Ocena struktury** - Hierarchia nagłówków? Sekcje rozdzielone? Linkowanie kontekstowe?
2. **Ocena formatu** - Listy i tabele? Boldy na terminach? Akapity nie za długie?
3. **Ocena Information Density** - Ile EAV w akapicie? Fragmenty "puchu"? Ogólniki do zamiany?
4. **Ocena spójności** - Jeden temat? Brak dygresji? CE wyraźnie obecna?

## Format odpowiedzi

```markdown
## Analiza Cost of Retrieval

### Ogólna ocena
**CoR:** [Niski/Średni/Wysoki] | **Information Density:** [X/10]

### Elementy obniżające koszt ✅
- [element]

### Elementy zwiększające koszt ❌
| Problem | Lokalizacja | Wpływ |
|---------|-------------|-------|
| [opis] | [gdzie] | [niski/średni/wysoki] |

### Rekomendacje (priorytetyzowane)
#### Priorytet 1: [nazwa]
**Obecny stan:** [fragment]
**Rekomendacja:** [zmiana]
**Uzasadnienie:** [dlaczego obniży CoR]

### Podsumowanie
[1-2 zdania o głównych zmianach]
```
