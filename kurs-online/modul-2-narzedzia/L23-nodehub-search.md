# L23 — NodeHub Search — Google SERP jako dane

**Moduł:** 2 — Narzędzia do pobierania danych
**Czas:** ~30 min
**Format:** Demo + interpretacja SERP

---

## Cel lekcji

Interpretujesz dane SERP (People Also Ask, Related Searches, Refine Chips) jako sygnały intencji i sub-queries. Konfirmujesz query fanout danymi z Google.

---

## Co SERP mówi o intencji

Google SERP to nie tylko "lista linków". Każdy element mówi coś o tym, jak ludzie szukają danego tematu:

| Element SERP | Co mówi |
|-------------|---------|
| **Organic Top 10** | "Najlepsze odpowiedzi według Google" — co musisz przetworzyć |
| **People Also Ask (PAA)** | Sub-queries które użytkownicy faktycznie wpisują |
| **Related Searches** | Szersza mapa tematyczna — o co jeszcze pytają |
| **Refine Chips** | Kategorie tematu — aspekty do pokrycia |
| **Filter Sidebar** | Specyficzne segmenty (lokalizacja, czas, typ) |
| **Videos** | Tematy gdzie video dominuje — trudniej rankować z artykułem |

---

## Demo: nodeshub_search.py

```bash
python3 .claude/skills/nodeshub-search/nodeshub_search.py "agencja SEO"
```

**Output:**

```
=== SERP: "agencja SEO" (pl, pl) ===

--- ORGANIC TOP 10 ---
1. senuto.com/blog/...     | Ranking agencji SEO w Polsce 2024
2. semcore.pl/...          | Jak wybrać agencję SEO — poradnik
3. whitepress.pl/...       | Najlepsze agencje SEO 2024 — ranking
...

--- PEOPLE ALSO ASK ---
Q: Ile kosztuje agencja SEO?
Q: Jak wybrać agencję SEO?
Q: Co robi agencja SEO?
Q: Agencja SEO czy freelancer — co wybrać?
Q: Jak sprawdzić skuteczność agencji SEO?

--- RELATED SEARCHES ---
agencja seo warszawa
agencja seo cennik
najlepsza agencja seo
agencja seo opinie
pozycjonowanie stron agencja

--- REFINE CHIPS ---
Warszawa | Kraków | Wrocław | Gdańsk | Cennik | Ranking | Opinie

--- VIDEOS ---
(brak dla tej frazy)
```

---

## Tryb --json dla automatyzacji

```bash
python3 .claude/skills/nodeshub-search/nodeshub_search.py "agencja SEO" --json
```

Zwraca strukturę JSON — przydatne gdy SERP jest wejściem do innego skryptu lub Claude.

---

## SERP jako grounding dla Query Fanout

W lekcji L12 uruchomiłeś `/query-fanout` który przewiduje sub-queries. SERP z NodeHub **potwierdza lub obala** te przewidywania.

**Workflow:**

1. Query Fanout → lista predicted sub-queries
2. SERP (PAA) → lista confirmed sub-queries
3. Porównaj: gdzie się pokrywają = CONFIRMED, gdzie się różnią = PREDICTED

**Przykład:**

```
Query Fanout przewiduje:
├── "ile kosztuje agencja SEO" → CONFIRMED (jest w PAA)
├── "agencja SEO umowa" → PREDICTED (nie ma w PAA)
├── "jak sprawdzić agencję SEO" → CONFIRMED (jest w PAA)
└── "agencja SEO vs in-house" → PREDICTED (nie ma w PAA)
```

**Interpretacja:**
- CONFIRMED = twoi użytkownicy na pewno tego szukają → H2 obowiązkowe
- PREDICTED = może warto, ale niższy priorytet → H3 lub opcjonalne

---

## Interpretacja Refine Chips

Refine Chips (filtry boczne w SERP) to Google's sposób na powiedzenie "to są główne kategorie tego tematu".

**Dla "agencja SEO":**
`Warszawa | Kraków | Cennik | Ranking | Opinie`

**Interpretacja:**
- Lokalizacja (Warszawa, Kraków) → "agencja SEO [miasto]" to osobne frazy z lokalnym intent
- Cennik → użytkownicy bardzo chcą wiedzieć ile kosztuje → UNIQUE atrybut do pokrycia
- Ranking / Opinie → intencja porównawcza → format artykułu: porównanie/ranking

---

## Interpretacja Related Searches

Related Searches = szersza mapa tematyczna. Używaj ich do:
1. Ekspansji listy słów kluczowych (seed → związane frazy)
2. Identyfikacji "sąsiednich klastrów" w topical map
3. Odkrycia fraz których nie miałeś w swoim CSV

---

## Praktyczne użycie w pipeline'ach

**Content Planning Pipeline:**
SERP jest automatycznie pobierany przez `competitor-gap-analyzer` i `nodeshub-search` skill. Nie musisz uruchamiać ręcznie — pipeline robi to sam.

**Keyword Clustering Pipeline:**
SERP używany przez `cluster-validator` do sprawdzenia SERP coherence — czy frazy w klastrze mają podobne top 10 wyniki.

**Manualnie (debug / research):**
Uruchom gdy chcesz sprawdzić "co jest w top 10 dla tej frazy zanim zacznę pisać".

---

## Ćwiczenie

1. Uruchom SERP dla frazy kluczowej z Twojej branży:
   ```bash
   python3 .claude/skills/nodeshub-search/nodeshub_search.py "twoja fraza"
   ```

2. Wypisz wszystkie PAA questions (People Also Ask)

3. Porównaj z output `/query-fanout` dla tej samej frazy:
   - Ile PAA questions pokrywa się z predicted sub-queries?
   - Ile jest w PAA, ale nie w query-fanout?
   - Ile jest w query-fanout, ale nie w PAA?

4. Stwórz listę H2 dla artykułu opartą na CONFIRMED sub-queries

---

**Następna lekcja:** L24 — Supabase — vector database dla treści
