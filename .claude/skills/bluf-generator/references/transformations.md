# Szczegółowe zasady transformacji BLUF

Konsultuj ten plik dla zaawansowanych przypadków transformacji.

## Dlaczego BLUF działa w AI Search

- Systemy RAG dzielą treści na chunki (~200-500 słów)
- Każdy chunk jest osobno oceniany pod kątem przydatności
- Chunk z odpowiedzią na początku ma wyższy score
- Treści z BLUF są cytowane w ~62% jako główne źródło
- Fakty i liczby zwiększają szansę cytowania 4.5x

## Pełna lista eliminacji

| Wzorzec | Przykłady |
|---------|-----------|
| Wstępy budujące napięcie | "W dzisiejszych czasach...", "Żyjemy w erze...", "Nie od dziś wiadomo..." |
| Zapowiedzi | "Zanim przejdziemy do...", "W tym artykule...", "Poniżej przedstawiamy..." |
| Ogólniki | "Jest wiele powodów...", "Istnieje szereg czynników..." |
| Puste przymiotniki | "najlepszy", "skuteczny", "innowacyjny", "kompleksowy", "profesjonalny" |
| SEO fluff | "kompleksowe rozwiązania", "wieloletnie doświadczenie", "indywidualne podejście" |
| Kwalifikatory | "zasadniczo", "w pewnym sensie", "można powiedzieć, że" |
| Meta-komentarze | "warto zauważyć", "należy podkreślić", "co ciekawe" |

## Pełna lista transformacji ogólników

| Ogólnik | → | Precyzja |
|---------|---|----------|
| "wiele" | → | konkretna liczba lub zakres (5-10, kilkanaście) |
| "często" | → | "w X% przypadków", "średnio co Y dni" |
| "szybko" | → | "w ciągu X dni/godzin/minut" |
| "znacząco" | → | "o X%", "X-krotnie" |
| "regularnie" | → | "co X dni/tygodni" |
| "większość" | → | "X na Y", "ponad X%" |
| "niedawno" | → | konkretna data lub okres |
| "tanio/drogo" | → | konkretna kwota lub zakres |
| "duży/mały" | → | konkretny wymiar/wielkość |
| "długo/krótko" | → | konkretny czas |

## Pytania proste vs złożone

**Zasada:** Długość odpowiedzi proporcjonalna do złożoności pytania.

**Pytanie proste:** "Ile kosztuje X?"
```
✅ BLUF: "X kosztuje od 500 do 2000 zł w zależności od wariantu."
❌ NIE: "Cena X zależy od wielu czynników, takich jak jakość, dostawca..."
```

**Pytanie złożone:** "Jak wdrożyć strategię content marketingu?"
```
✅ BLUF: "Wdrożenie content marketingu wymaga 4 kroków: audytu (2 tyg.), 
strategii (1 mies.), produkcji (ongoing) i dystrybucji. Budżet startowy 
to 5-15k PLN/mies. dla średniej firmy."
```

## Brak danych liczbowych

Gdy nie masz konkretnych liczb:
- Użyj zakresów: "3-5 dni", "od 500 zł"
- Użyj proporcji: "1 na 3", "co drugi"
- Użyj porównań: "2x więcej niż średnia branżowa"
- Zanotuj w analizie: "Brak danych - zalecam dodanie statystyk"

## Struktura dla długich tekstów

Dla tekstów >300 słów zastosuj hierarchiczny BLUF:

```
[BLUF główny - odpowiedź w 1-2 zdaniach]

## Sekcja 1
[Mini-BLUF sekcji]
[Rozwinięcie]

## Sekcja 2  
[Mini-BLUF sekcji]
[Rozwinięcie]
```

## Checklist jakości

Po transformacji sprawdź:
- [ ] Odpowiedź w pierwszych 50 słowach
- [ ] Bezpośrednia odpowiedź (bez budowania napięcia)
- [ ] Minimum 1 liczba/statystyka
- [ ] Konkretne terminy zamiast ogólników
- [ ] Źródło/dowód jeśli dostępne
- [ ] Brak SEO fluff i pustych przymiotników
