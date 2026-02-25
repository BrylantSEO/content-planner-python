# L12 — Query Fanout — jak AI rozbija jedno pytanie na 7 sub-queries

**Moduł:** 1 — Jak działa AI Search
**Czas:** ~30 min
**Format:** Demo w Claude Code + diagram

---

## Cel lekcji

Rozumiesz mechanizm Query Fanout i wiesz jak pisać treści które odpowiadają na każde sub-query autonomicznie.

---

## Mechanizm Query Fanout

Kiedy użytkownik wpisuje pytanie w AI Search, system **nie szuka odpowiedzi na to jedno pytanie**. Zamiast tego:

1. Rozkłada pytanie na 5–10 sub-queries
2. Każde sub-query trafia do indeksu osobno
3. Dla każdego sub-query szuka najlepszego fragmentu (chunka)
4. LLM syntezuje odpowiedź z zebranych fragmentów

```
Pytanie: "Jak wybrać agencję SEO?"
          │
          ▼ Query Fanout
          │
  ┌───────┴──────────────────────────────────┐
  │                                          │
  ▼         ▼         ▼         ▼           ▼
"na co    "ile      "jakie    "agencja   "jak
 zwrócić   kosztuje  pytania    SEO vs    sprawdzić
 uwagę"    agencja   zadać"     freelancer" wyniki"
  │         SEO"      │          │           │
  │         │         │          │           │
  ▼         ▼         ▼          ▼           ▼
Chunk A    Chunk B   Chunk C   Chunk D    Chunk E
(twoja     (strona   (blog     (artykuł   (twój
 strona)   konkurenta)poradnik) porównawczy)artykuł)
```

**Kluczowa obserwacja:** Każdy sub-query może trafić na **inną stronę**. Artykuł nie musi odpowiadać na wszystko — ale każda sekcja H2 musi odpowiadać na SWOJE sub-query.

---

## Demo w Claude Code: /query-fanout

Uruchom `claude`, następnie:

```
> /query-fanout "jak wybrać agencję SEO"
```

Claude wykona skill `query-fanout` i zwróci listę sub-queries. Przykładowy output:

```markdown
## Query Fanout — "jak wybrać agencję SEO"

### Sub-queries CONFIRMED (z SERP PAA)
1. "Na co zwrócić uwagę przy wyborze agencji SEO?"
2. "Ile kosztuje agencja SEO miesięcznie?"
3. "Jak sprawdzić skuteczność agencji SEO?"
4. "Agencja SEO czy freelancer — co wybrać?"

### Sub-queries PREDICTED (semantyczne rozszerzenie)
5. "Jakie pytania zadać agencji SEO przed podpisaniem umowy?"
6. "Jak długo trwa pozycjonowanie przez agencję?"
7. "Czerwone flagi przy wyborze agencji SEO?"

### Rekomendacja struktury artykułu
H2: Na co zwrócić uwagę przy wyborze agencji SEO [sub-query 1]
H2: Ile kosztuje agencja SEO — cennik i modele rozliczeń [sub-query 2]
H2: Jak weryfikować wyniki agencji SEO [sub-query 3]
H2: Agencja SEO vs freelancer — kiedy co wybrać [sub-query 4]
H2: 7 pytań do zadania agencji SEO przed umową [sub-query 5]
H2: Czerwone flagi — kiedy uciec od agencji SEO [sub-query 7]
```

---

## CONFIRMED vs PREDICTED

Skill `query-fanout` rozróżnia dwa typy sub-queries:

**CONFIRMED** — potwierdzone danymi SERP:
- People Also Ask (PAA) w Google
- Related Searches
- Refine Chips (filtry boczne)

Są to pytania które **prawdziwi użytkownicy** wpisują w Google po głównej frazie.

**PREDICTED** — przewidywane semantycznie:
- Wynikają z Frame Semantics (ramki pojęciowej tematu)
- Nie mają potwierdzenia w PAA, ale logicznie powinny być obecne w artykule

Priorytet: CONFIRMED > PREDICTED. Zacznij od CONFIRMED.

---

## Chunk jako jednostka odpowiedzi

**Zasada:** Każdy H2 = jeden chunk = jedna autonomiczna odpowiedź na jedno sub-query.

**Zły chunk** (nie autonomiczny):
```markdown
## Koszty

Jak wspominaliśmy wcześniej w sekcji o rodzajach agencji, ceny mogą się różnić.
Zazwyczaj zależy to od wielu czynników, które omówimy poniżej...
```

Problemy:
- "jak wspominaliśmy wcześniej" — brak kontekstu bez poprzedniej sekcji
- "omówimy poniżej" — odpowiedź nie jest na górze (brak BLUF)
- "wiele czynników" — ogólnik, nie fakt

**Dobry chunk** (autonomiczny, BLUF):
```markdown
## Ile kosztuje agencja SEO — cennik i modele rozliczeń

Agencja SEO kosztuje w Polsce 2 000–15 000 zł/miesiąc w zależności od zakresu.
Małe projekty (1 serwis, podstawowe działania): 2 000–4 000 zł/mc.
Średnie projekty (e-commerce, blog, linkbuilding): 4 000–8 000 zł/mc.
Duże projekty (wielojęzyczne, enterprise): 8 000–15 000 zł/mc+.

**Modele rozliczeń:**
- Ryczałt miesięczny (najpopularniejszy) — stała opłata za pakiet działań
- Success fee — % od wzrostu ruchu (rzadkie, ryzykowne dla agencji)
- Godzinowy — od 150 do 400 zł/h dla konsultantów

**Uwaga:** Agencje poniżej 1 500 zł/mc zazwyczaj oferują automatyczne linki
(spamowe) bez analityki. Red flag.
```

Ten chunk:
- Odpowiada na "ile kosztuje agencja SEO" bez czytania reszty artykułu
- Zaczyna od konkretnej liczby (BLUF)
- Zawiera fakty zamiast ogólników
- Ma strukturę (listy, **pogrubienia**) obniżającą CoR

---

## Praktyczna konsekwencja dla struktury artykułu

**Przed:** Piszesz artykuł jako esej (wstęp → rozwinięcie → zakończenie)
**Po:** Piszesz artykuł jako bazę danych odpowiedzi (H2 = query, treść = odpowiedź)

Każda sekcja H2 powinna:
1. Zadawać pytanie (H2 jako pytanie lub fraza pytająca)
2. Odpowiadać w pierwszych 2 zdaniach (BLUF)
3. Rozwijać z faktami, liczbami, listami
4. Nie odsyłać do "poprzedniej sekcji"

---

## Ćwiczenie

1. W Claude Code uruchom: `/query-fanout "jak wybrać [usługa z twojej branży]"`
2. Wypisz wszystkie CONFIRMED sub-queries
3. Dopasuj je do H2 w jednym ze swoich istniejących artykułów
4. Które sub-queries nie mają odpowiadającego H2? → To są content gaps

---

**Następna lekcja:** L13 — Chunk Quality — co robi treść "godną cytowania"
