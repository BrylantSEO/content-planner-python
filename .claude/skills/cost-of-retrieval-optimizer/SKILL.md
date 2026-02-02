---
name: cost-of-retrieval-optimizer
description: Analizuje treść pod kątem Cost of Retrieval - kosztu, jaki wyszukiwarka ponosi na przetworzenie strony. Identyfikuje elementy zwiększające i obniżające koszt, sugeruje optymalizacje struktury i formatu.
---

# Cost of Retrieval Optimizer

Pomagasz zoptymalizować treść, aby obniżyć Cost of Retrieval - czyli ułatwić wyszukiwarce ekstrakcję wartościowych informacji.

## Definicja

**Cost of Retrieval** to wydatek obliczeniowy i zasobów związanych z uzyskaniem określonej informacji z witryny w odpowiedzi na zapytanie.

**Kluczowa zasada:** Jeśli Google ocenia, że pozyskiwanie wiedzy z Twojej strony jest drogie (wymaga dużych zasobów obliczeniowych), wybierze konkurencję.

---

## Czynniki wpływające na Cost of Retrieval

### Elementy OBNIŻAJĄCE koszt (pożądane)

| Element | Dlaczego obniża koszt | Jak wdrożyć |
|---------|----------------------|-------------|
| Dobra struktura strony | Łatwiejsze crawlowanie i indeksowanie | Logiczna hierarchia H1→H2→H3 |
| Listy i tabele | Łatwa ekstrakcja wiedzy | Zamieniaj akapity na listy gdy wyliczasz |
| Pogrubienia kluczowych terminów | Jasne sygnały ważności | Bolduj encje i atrybuty |
| Spójność tematyczna | Mniej niejednoznaczności | Jedna strona = jeden temat |
| Linkowanie wewnętrzne | Jasna architektura informacji | Kontekstowe anchor texty |
| Wysoka Information Density | Więcej faktów per zdanie | Konkretne liczby, nazwy, daty |

### Elementy ZWIĘKSZAJĄCE koszt (niepożądane)

| Element | Dlaczego zwiększa koszt | Jak naprawić |
|---------|------------------------|--------------|
| Chaotyczny content | Trudna ekstrakcja informacji | Reorganizuj w sekcje tematyczne |
| Przestarzałe treści | Wymaga weryfikacji aktualności | Aktualizuj daty i dane |
| Niejasna struktura | Trudne zrozumienie hierarchii | Dodaj nagłówki, uporządkuj |
| Niejasności językowe | Zwiększony koszt NLP | Pisz prostym, precyzyjnym językiem |
| "Puch" bez wartości | Zwiększa objętość bez informacji | Usuń ogólniki, dodaj fakty |

---

## Proces analizy

Gdy użytkownik poda treść do analizy:

### Krok 1: Ocena struktury
- Czy hierarchia nagłówków jest logiczna?
- Czy sekcje są wyraźnie rozdzielone?
- Czy linkowanie wewnętrzne jest obecne i kontekstowe?

### Krok 2: Ocena formatu
- Czy wykorzystano listy i tabele gdzie to możliwe?
- Czy kluczowe terminy są wyróżnione (bold)?
- Czy akapity nie są zbyt długie?

### Krok 3: Ocena Information Density
- Ile konkretnych faktów (EAV) jest w każdym akapicie?
- Czy są fragmenty "puchu" bez wartości informacyjnej?
- Czy można zamienić ogólniki na konkrety?

### Krok 4: Ocena spójności
- Czy treść jest skupiona na jednym temacie?
- Czy nie ma dygresji rozpraszających?
- Czy Central Entity jest wyraźnie obecna?

---

## Format odpowiedzi

```markdown
## Analiza Cost of Retrieval

### Ogólna ocena
**Poziom CoR:** [Niski/Średni/Wysoki]
**Information Density:** [X/10]

### Elementy obniżające koszt ✅
- [element 1]
- [element 2]

### Elementy zwiększające koszt ❌
| Problem | Lokalizacja | Wpływ na CoR |
|---------|-------------|--------------|
| [opis] | [gdzie] | [niski/średni/wysoki] |

### Rekomendacje optymalizacji

#### Priorytet 1: [nazwa]
**Obecny stan:**
[fragment tekstu]

**Rekomendacja:**
[jak zmienić]

**Uzasadnienie:** [dlaczego to obniży CoR]

#### Priorytet 2: [nazwa]
...

### Podsumowanie
[1-2 zdania o głównych zmianach do wprowadzenia]
```

---

## Przykład

**Input:**
```
Nasz aquapark jest naprawdę świetnym miejscem. Oferujemy wiele różnych atrakcji dla całej rodziny. Mamy baseny, zjeżdżalnie i inne atrakcje wodne. Ceny są przystępne. Zapraszamy!
```

**Output:**

## Analiza Cost of Retrieval

### Ogólna ocena
**Poziom CoR:** Wysoki (trudna ekstrakcja wartości)
**Information Density:** 1/10

### Elementy obniżające koszt ✅
- Brak (treść wymaga pełnej optymalizacji)

### Elementy zwiększające koszt ❌
| Problem | Lokalizacja | Wpływ na CoR |
|---------|-------------|--------------|
| Brak konkretów | Cały tekst | Wysoki |
| Ogólniki bez wartości | "świetnym miejscem", "wiele różnych" | Wysoki |
| Brak struktur danych | Brak list/tabel | Średni |
| Brak wyróżnień | Brak boldów | Niski |

### Rekomendacje optymalizacji

#### Priorytet 1: Zamień ogólniki na fakty (EAV)
**Obecny stan:**
"Oferujemy wiele różnych atrakcji dla całej rodziny."

**Rekomendacja:**
"Oferujemy 8 zjeżdżalni (w tym 120-metrową rywalizacyjną), 3 baseny (25m sportowy, rekreacyjny, brodzik dla dzieci) i strefę SPA."

**Uzasadnienie:** Konkretne liczby i nazwy tworzą trójki EAV łatwe do ekstrakcji.

#### Priorytet 2: Dodaj strukturę danych
**Obecny stan:**
Tekst ciągły bez formatowania.

**Rekomendacja:**
```markdown
| Atrakcja | Ilość | Szczegóły |
|----------|-------|-----------|
| Zjeżdżalnie | 8 | w tym 120m rywalizacyjna |
| Baseny | 3 | sportowy 25m, rekreacyjny, brodzik |
| Strefa SPA | 1 | sauny, jacuzzi |

**Cennik:**
- Bilet normalny: 45 zł/h
- Bilet rodzinny (2+2): 150 zł/3h
```

**Uzasadnienie:** Tabele i listy umożliwiają natychmiastową ekstrakcję bez parsowania zdań.

### Podsumowanie
Treść wymaga fundamentalnej przebudowy: zamiana "puchu" na konkretne fakty w formacie łatwym do ekstrakcji (tabele, listy, boldy). Obecna wersja ma zerową wartość retrieval.
