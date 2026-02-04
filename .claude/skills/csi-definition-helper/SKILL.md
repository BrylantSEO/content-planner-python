---
name: csi-definition-helper
description: >
  Definiuje Central Entity (CE), Source Context (SC) i Central Search Intent (CSI) dla witryny lub biznesu.
  Użyj gdy zaczynasz nowy projekt semantycznego SEO, potrzebujesz zdefiniować fundamenty strategii contentowej,
  lub chcesz określić główną encję i intencję wyszukiwania dla serwisu.
  Triggery: zdefiniuj CSI, co jest CE, strategia SEO, fundament contentu.
---

# CSI Definition Helper

Zdefiniuj trzy kluczowe elementy semantycznego SEO dla witryny lub biznesu.

## Definicje

### Central Entity (CE)
**"What is your website mainly about?"**

Encja powtarzająca się na całej witrynie (site-wide) - "główny bohater" strony.

**Kryteria:** powtarzalność site-wide, test Wikipedii (czy mogłaby mieć stronę?), stabilność w czasie.

**Typy CE:** pojedyncza encja (Tesla Motors), typ encji (samochody elektryczne), wielokrotne encje (samochody elektryczne i hybrydowe).

### Source Context (SC)
**"Why are you covering this topic?"**

Perspektywa, z jakiej marka mówi o CE. Trzy pytania:
1. **Kim jest marka?** - producent, sklep, portal, blog?
2. **Jak zarabia?** - sprzedaż, reklamy, subskrypcje?
3. **Dlaczego jest potrzebna w SERP?** - co oferuje, czego nie ma konkurencja?

### Central Search Intent (CSI)
**Formuła:** CSI = CE + SC

Połączenie Central Entity z Source Context definiujące główną intencję wyszukiwania.

**Struktura:** Predykat (visiting, buying, learning...) + CE + kontekst SC.

## Proces analizy

Gdy użytkownik poda opis biznesu/witryny:

1. **Identyfikuj CE** - Jaka encja pojawia się najczęściej? Test Wikipedii? Jaki typ CE?
2. **Zdefiniuj SC** - Tożsamość, monetyzacja, unikalność w SERP.
3. **Sformułuj CSI** - [Predykat] + [CE] + [kontekst SC], np. "Kupowanie sukienek ślubnych od projektanta".
4. **Podaj 3-5 alternatywnych SC** - Pokaż jak zmiana perspektywy wpływa na strategię.

## Format odpowiedzi

```markdown
## Analiza CSI dla [nazwa biznesu]

### Central Entity (CE)
**Encja:** [nazwa] | **Typ:** [pojedyncza/typ/wielokrotna]
**Uzasadnienie:** [powtarzalność, rozpoznawalność]

### Source Context (SC)
**Tożsamość:** [kim jest marka]
**Monetyzacja:** [jak zarabia]
**Unikalność SERP:** [dlaczego potrzebna]

### Central Search Intent (CSI)
**CSI:** [pełne sformułowanie]
**Predykaty:** [lista czasowników]

### Alternatywne Source Contexts
| SC | Perspektywa | Wpływ na content |
|----|-------------|------------------|
| SC1 | [opis] | [jaki content] |
```

## Przykład

**Input:** "Sklep internetowy sprzedający sukienki ślubne od polskich projektantów"

- **CE:** Sukienki ślubne (typ encji) - pojawia się na każdej stronie
- **SC:** Sklep e-commerce z polskimi projektantami | Sprzedaż sukienek | Polscy projektanci, unikalne wzory
- **CSI:** "Kupowanie unikalnych sukienek ślubnych od polskich projektantów"
- **Predykaty:** buying, choosing, comparing, fitting, ordering
- **Alternatywne SC:** Blog ślubny (inspiracje), Projektant (portfolio), Salon sukien (doświadczenie zakupowe)
