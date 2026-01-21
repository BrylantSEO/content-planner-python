---
name: csi-definition-helper
description: Definiuje Central Entity, Source Context i Central Search Intent dla witryny lub biznesu. Użyj gdy zaczynasz nowy projekt semantycznego SEO lub potrzebujesz zdefiniować fundamenty strategii contentowej.
---

# CSI Definition Helper

Pomagasz zdefiniować trzy kluczowe elementy semantycznego SEO dla witryny lub biznesu.

## Definicje

### Central Entity (CE)
**Pytanie:** "What is your website mainly about?"

Central Entity to encja, która powtarza się na całej witrynie (site-wide). Jest to "główny bohater" całej strony.

**Kryteria identyfikacji CE:**
- Powtarzalność na całej witrynie (pojawia się w większości kontekstów)
- Rozpoznawalność jako encja (test Wikipedia: czy mogłaby mieć stronę w Wikipedii?)
- Stabilność - nie zmienia się z czasem

**Typy CE:**
1. **Pojedyncza encja** - np. "Tesla Motors", "iPhone"
2. **Typ encji** - np. "samochody elektryczne", "smartfony"
3. **Wielokrotne encje** - np. "samochody elektryczne i hybrydowe"

### Source Context (SC)
**Pytanie:** "Why are you covering this topic?"

Source Context definiuje perspektywę, z jakiej marka mówi o CE. Określa tożsamość i cel istnienia marki.

**Trzy pytania pomocnicze:**
1. **Kim jest marka?** (tożsamość) - producent, sklep, portal informacyjny, blog ekspercki?
2. **Jak marka zarabia?** (monetyzacja) - sprzedaż produktów, reklamy, subskrypcje?
3. **Dlaczego marka jest potrzebna w SERP?** (unikalność) - co oferuje, czego nie ma konkurencja?

**Przykłady różnych SC dla tej samej CE "Aquapark Kraków":**
- SC (turysta): "zwiedzanie z rodziną", "atrakcje turystyczne Krakowa"
- SC (mieszkaniec): "rozrywka weekendowa", "aktywności dla dzieci"
- SC (organizator eventów): "imprezy firmowe", "wynajem basenu"
- SC (influencer): "recenzje atrakcji", "vlogi podróżnicze"

### Central Search Intent (CSI)
**Formuła:** CSI = CE + SC

CSI to połączenie Central Entity z Source Context, które definiuje główną intencję wyszukiwania dla całej witryny.

**Struktura CSI:**
- Predykaty (czasowniki): visiting, knowing, learning, managing, finding, buying
- Rzeczowniki: CE + atrybuty encji

**Przykład:** Aquapark Kraków (CE) + turysta (SC) = "odwiedzanie aquaparku w Krakowie z rodziną" (CSI)

---

## Proces analizy

Gdy użytkownik poda opis biznesu/witryny:

### Krok 1: Identyfikacja CE
Odpowiedz na pytania:
- Jaka encja pojawia się najczęściej na stronie?
- Czy ta encja przeszłaby "test Wikipedii"?
- Jaki typ CE to jest? (pojedyncza/typ/wielokrotna)

### Krok 2: Definicja SC
Odpowiedz na pytania:
- Kim jest marka? (tożsamość)
- Jak zarabia? (monetyzacja)
- Dlaczego jest potrzebna w SERP? (unikalność)

### Krok 3: Sformułowanie CSI
Połącz CE + SC w formie:
- [Predykat] + [CE] + [kontekst z SC]
- Przykład: "Kupowanie sukienek ślubnych od projektanta"

### Krok 4: Warianty SC
Podaj 3-5 alternatywnych SC, które mogłyby istnieć dla tej samej CE, pokazując jak zmiana perspektywy wpływa na strategię contentową.

---

## Format odpowiedzi

```markdown
## Analiza CSI dla [nazwa biznesu]

### Central Entity (CE)
**Encja:** [nazwa encji]
**Typ:** [pojedyncza / typ encji / wielokrotna]
**Uzasadnienie:** [dlaczego to jest CE - powtarzalność, rozpoznawalność]

### Source Context (SC)
**Tożsamość marki:** [kim jest marka]
**Model monetyzacji:** [jak zarabia]
**Unikalność w SERP:** [dlaczego jest potrzebna]

### Central Search Intent (CSI)
**Formuła:** [CE] + [SC]
**CSI:** [pełne sformułowanie CSI]
**Główne predykaty:** [lista czasowników definiujących intencje]

### Alternatywne Source Contexts
| SC | Perspektywa | Wpływ na content |
|----|-------------|------------------|
| SC1 | [opis] | [jaki content by powstał] |
| SC2 | [opis] | [jaki content by powstał] |
| SC3 | [opis] | [jaki content by powstał] |
```

---

## Przykład

**Input:** "Sklep internetowy sprzedający sukienki ślubne od polskich projektantów"

**Output:**

### Central Entity (CE)
**Encja:** Sukienki ślubne
**Typ:** Typ encji (kategoria produktów)
**Uzasadnienie:** Pojawia się na każdej stronie - listingi, produkty, blog, FAQ

### Source Context (SC)
**Tożsamość marki:** Sklep e-commerce z polskimi projektantami
**Model monetyzacji:** Sprzedaż sukienek ślubnych
**Unikalność w SERP:** Polscy projektanci, unikalne wzory, lokalna produkcja

### Central Search Intent (CSI)
**Formuła:** Sukienki ślubne + sklep polskich projektantów
**CSI:** "Kupowanie unikalnych sukienek ślubnych od polskich projektantów"
**Główne predykaty:** buying, choosing, comparing, fitting, ordering

### Alternatywne Source Contexts
| SC | Perspektywa | Wpływ na content |
|----|-------------|------------------|
| Blog ślubny | Inspiracje i porady | Artykuły o trendach, stylizacje |
| Projektant | Portfolio i proces twórczy | Behind-the-scenes, custom design |
| Salon sukien | Doświadczenie zakupowe | Przymierzalnia, konsultacje |