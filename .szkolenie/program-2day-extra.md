# Program szkolenia — Wersja B, Dzień 2

> Dzień 1 = Wersja A w wolniejszym tempie (patrz `program-1day.md`).
> Ten plik opisuje tylko bloki dodatkowe Dnia 2.

---

## 3 zasady na wynos (powiedz na koniec dnia 2)

1. **Jeden artykuł audytuj przed poprawką** — nie zgaduj, mierz CQS
2. **Jeden brief przed każdym nowym artykułem** — nie pisz bez mapy
3. **Jeden klaster miesięcznie** — topical authority buduje się systematycznie

---

## Harmonogram Dnia 2

---

## 09:00–09:30 | Blok 6: Powtórka (30 min)

### Quiz 5 pytań (15 min)

Zadawaj pytania na głos — kto pierwszy odpowie poprawnie, wygrywa punkt:

1. Co to jest BLUF i dlaczego AI go preferuje?
2. Jaki próg similarity w Supabase oznacza ryzyko kanibalizacji?
3. Jakie 4 wymiary mierzy `content-quality-scorer`?
4. Co to jest CORE w topical map?
5. Jaka jest różnica między `country_id="1"` a `"200"` w Senuto?

**Odpowiedzi:**
1. Bottom Line Up Front — odpowiedź na górze → AI może zacytować bez czytania całości
2. >0.90
3. CoR + Information Density + SRL Salience + TF-IDF Quality
4. Klastry blisko Central Entity (pillar pages)
5. "1" = legacy PL (grupy, pytania), "200" = Base 2.0 PL (pozycje, konkurencja)

### Wątpliwości z dnia 1 (15 min)

Otwarta dyskusja. Typowe pytania:
- "Czy muszę zawsze uruchamiać wszystkie 3 pipeline'y?"
- "Co jeśli klient ma za mało artykułów w Supabase?"
- "Jak często aktualizować topical map?"

---

## 09:30–11:00 | Blok 7: Zaawansowany CQS (90 min)

**Cel:** Uczestnicy rozumieją każdy z 4 wymiarów CQS i potrafią je poprawiać ręcznie.

### SRL — Semantic Role Labels (25 min)

**Teoria (10 min):**

Role semantyczne w zdaniu:
- `Agent` — kto robi akcję
- `Predicate` — co robi
- `Patient` — na czym/kim
- `Beneficiary` — dla kogo
- `Instrument` — czym
- `Location` — gdzie

**Kluczowe:** "Twoja Central Entity (CE) powinna być Agentem, nie Patientem."

Zły przykład: "Reklamy są zarządzane przez agencję." (CE = Patient)
Dobry przykład: "Agencja zarządza reklamami." (CE = Agent)

**Ćwiczenie (15 min):**
```
/semantic-role-labels-parser
```
Każdy wkleja 5 zdań z własnego artykułu. Identyfikuje które zdania mają CE jako Patient i przepisuje je.

### CoR + Information Density (30 min)

**Demo `/information-density-checker` (10 min):**
Wklej fragment artykułu. Pokaż jak narzędzie identyfikuje "puch":
- słowa modalne (może, prawdopodobnie, warto)
- ogólniki bez liczb ("znaczny wzrost", "lepsza jakość")
- zdania bez faktów

**Ćwiczenie (20 min):** Każdy audytuje jeden akapit własnego artykułu. Cel: zamienić min. 3 "puchy" na konkrety.

| BEFORE | AFTER |
|--------|-------|
| "Wyniki kampanii były bardzo dobre" | "CTR wzrósł z 2.1% do 4.8% w 30 dni" |
| "Agencja ma duże doświadczenie" | "Agencja prowadzi kampanie od 2018 r. dla 200+ klientów" |

### TF-IDF + EEAT (35 min)

**TF-IDF (15 min):**
```
/tfidf-analyzer
```
Demo na artykule o Google Ads. Pokaż:
- Terminy wysokie IDF = specjalistyczne = dobrze
- Terminy niskie IDF = generyczne = zastąp specjalistycznymi

**EEAT (20 min):**
```
/eeat-evaluator
```
Demo + ćwiczenie. Uczestnicy oceniają własny artykuł w 4 wymiarach.

Gdzie szukać sygnałów EEAT:
- Experience: case studies, własne dane, zdjęcia z realizacji
- Expertise: certyfikaty, nomenklatura branżowa, precyzja
- Authoritativeness: cytowania, linki zewnętrzne, wzmianki medialne
- Trust: dane kontaktowe, polityka prywatności, recenzje Google

---

## 11:00–11:15 | Przerwa

---

## 11:15–12:30 | Blok 8: Customizacja skills (75 min)

**Cel:** Uczestnik wie jak zmodyfikować istniejący skill i rozumie kiedy tworzyć nowy.

### Anatomia SKILL.md (20 min)

Otwórz przykładowy skill, np. `.claude/skills/bluf-generator/SKILL.md`:

```
Struktura każdego SKILL.md:
1. Nazwa i trigger keywords (kiedy skill się aktywuje)
2. Input format (co przekazujesz)
3. Processing logic (co skill robi krok po kroku)
4. Output format (co dostajesz)
5. Examples (BEFORE/AFTER)
```

**Kluczowa zasada:** "Trigger keywords to słowa w Twoim promcie, które aktywują skill. Dobre triggery = skill działa zawsze kiedy chcesz."

### Modyfikacja istniejącego skilla (20 min)

**Ćwiczenie:** Każdy otwiera skill `bluf-generator/SKILL.md` i modyfikuje:
1. Dodaje trigger keyword w swoim języku/branży
2. Dodaje przykład BEFORE/AFTER z branży klienta
3. Zapisuje — natychmiast działa w Claude Code

Omów: "Nie musicie tworzyć skillów od zera. 80% przypadków to modyfikacja istniejącego."

### Demo `/skill-creator` (35 min)

Tworzenie "local-seo-checker" razem z grupą:

```
/skill-creator
```

Wejście razem z grupą:
- Nazwa: `local-seo-checker`
- Cel: sprawdza czy artykuł o lokalnym SEO ma wszystkie wymagane elementy
- Input: tekst artykułu + lokalizacja
- Output: lista checklist (co jest, czego brakuje)

Zapisz wynik jako nowy skill. Uruchom na testowym artykule.

> **Wniosek:** "W ciągu 10 minut stworzyliście specjalistyczne narzędzie dostosowane do waszej pracy."

---

## 12:30–13:15 | Przerwa obiadowa

---

## 13:15–14:30 | Blok 9: Topical Map jako deliverable (75 min)

**Cel:** Uczestnik potrafi przygotować i zaprezentować topical map klientowi.

### Pełny run `/keyword-clustering-pipeline` (45 min)

```
/keyword-clustering-pipeline
```

Każdy uruchamia pipeline dla swojego projektu (temat z dnia 1 lub nowy).

Podczas oczekiwania omów:
- Jak interpretować silhouette score
- Dlaczego OUTER klastry to nie "gorsze" — to długi ogon

Output: gotowa topical map w `data/clusters/`

### Ćwiczenie: "Tłumacz bez technicznego języka" (30 min)

**Pairs exercise:** Uczestnik A pokazuje topical map uczestnikowi B. Uczestnik B odgrywa rolę klienta który NIE rozumie SEO.

Uczestnik A musi wyjaśnić:
- Co to jest CORE bez używania słowa "embedding" lub "klaster"
- Co klient powinien zrobić z P1 content gaps (konkretna akcja)
- Jak topical map przełoży się na ruch i leady

Potem zamiana ról. Feedback od grupy.

**Sugestia wyjaśnienia dla klienta:**
> "Ta mapa pokazuje 3 obszary tematyczne, którymi Google uznaje was za ekspertów. Czerwone tematy to miejsca gdzie konkurencja was bije — jeśli opublikujecie 4 artykuły w tym obszarze w ciągu 2 miesięcy, Google zacznie traktować was jako autorytet."

---

## 14:30–14:45 | Przerwa

---

## 14:45–16:00 | Blok 10: Własny projekt (75 min)

**Cel:** Uczestnicy wychodzą z gotowym deliverable dla klienta.

### Wybierz ścieżkę

**Ścieżka A — Nowy projekt:**
1. Topical map (klasteryzacja seed keyword klienta)
2. Content brief (1 artykuł z mapy)
3. Audyt (1 istniejący artykuł klienta)

**Ścieżka B — Istniejący projekt:**
1. Audyt 2–3 artykułów klienta z CQS
2. Plan priorytetów (które artykuły najpierw poprawić)
3. 1 brief dla najważniejszego brakującego tematu

### Rola trenera

Min. 10 min 1:1 z każdym uczestnikiem:
- Co zrobiłeś/łaś?
- Jaki jest CQS twojego artykułu i co to znaczy konkretnie?
- Jak to przekażesz klientowi?

---

## 16:00–17:00 | Blok 11: Prezentacje + Plan 90-dniowy (60 min)

### Prezentacje deliverable (30 min)

5–6 osób × 3 min każda:
- Pokaż swój output (audit.md lub brief.md lub topical map)
- Powiedz 1 kluczowe odkrycie
- Powiedz co zrobisz z tym w poniedziałek

Feedback od grupy (1 min per prezentacja): "Co mi się podobało / co bym zrobił/a inaczej?"

### Arkusz "Plan 90 dni" (15 min)

Każdy wypełnia arkusz (wydruk A4):

```
TYDZIEŃ 1-2: Quick wins
- Artykuł do audytu: _____________
- Przewidywany CQS: ___
- 3 zmiany KRYTYCZNE które wdrożę: 1. ___ 2. ___ 3. ___

MIESIĄC 1: Pierwsze briefa
- Temat nowego artykułu: _____________
- Seed keyword dla klasteryzacji: _____________
- Gdzie opublikuję?: _____________

MIESIĄC 2-3: Systematyzacja
- Klastry do pokrycia (P1 gaps): _____________
- Ile artykułów per miesiąc?: ___
- Kto w zespole korzysta z narzędzi?: _____________
```

### Zamknięcie — 3 zasady (15 min)

Trener mówi dosłownie:

> "Wyniesecie dziś 3 zasady które zmienią jak pracujecie z contentem.
> Pierwsza: jeden artykuł audytuj przed poprawką — nie zgaduj, mierz.
> Druga: jeden brief przed każdym nowym artykułem — nie pisz bez mapy.
> Trzecia: jeden klaster miesięcznie — topical authority buduje się systematycznie.
>
> To nie jest rewolucja. To jest systematyczność. Zróbcie to przez 90 dni i wróćcie z danymi."

Runda zamknięcia: każdy jednym zdaniem "W poniedziałek zacznę od..."
