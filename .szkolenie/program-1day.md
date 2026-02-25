# Program szkolenia — Wersja A (1 dzień, 8h)

> **Filozofia:** 20% teorii daje 80% wartości. Uczestnicy ROBIĄ, nie słuchają.

---

## Metafory techniczne (do użycia przez trenera)

| Pojęcie | Metafora |
|---------|---------|
| **RAG** | Bibliotekarz który cytuje konkretne strony książek zamiast wymyślać odpowiedź z głowy. Twój artykuł = jedna z książek. Chaos = nie znajdzie właściwej strony. |
| **Query Fanout** | Użytkownik pyta jedno pytanie, AI rozkłada je na 7 sub-puzzli i wysyła każde oddzielnie do indeksu. Twój artykuł musi odpowiadać na każde puzzle osobno. |
| **Embeddingi** | Każde słowo to punkt w 768-wymiarowej przestrzeni. "Basen" i "pływalnia" leżą blisko. "Basen" i "kredyt" — daleko. Klasteryzacja to grupowanie punktów w chmury. |
| **Chunk** | Wycinek artykułu wycięty nożyczkami. AI czyta wycinki, nie całe strony. Każdy wycinek musi mieć sens sam w sobie. |
| **BLUF** | Zasada wojskowych briefingów: odpowiedź najpierw, uzasadnienie potem. Zły: "Reklama w Google jest ważna bo...". Dobry: "Google Ads daje ROAS 300–500%. Aby osiągnąć ten wynik..." |
| **CoR** | Ile wysiłku musi włożyć AI żeby wyciągnąć fakt. "Wyniki były świetne" — CoR nieskończony (nie można zacytować). "ROAS wzrósł o 340% w 6 miesięcy" — CoR niski. |
| **Silhouette score** | Miara jakości klasteryzacji 0–1. >0.15 = klasteryzacja ma sens. <0.1 = keywords są za podobne lub za różne. |

---

## 08:45 — Setup (15 min)

**[TRENER]** Weryfikacja środowiska — każdy laptop przed wejściem uczestników.

```bash
# Test minimalny
python3 .claude/skills/jina-reader/jina_reader.py "https://double-digital.pl/"
python3 .claude/skills/nodeshub-search/nodeshub_search.py "agencja seo"
```

Jeśli cokolwiek nie działa → patrz [setup.md](setup.md) + miej backup URL gotowy.

---

## 09:00–09:30 | Blok 0: Dlaczego SEO się zmienia (30 min)

**Cel:** Uczestnicy rozumieją dlaczego ich praca musi się zmienić — bez strachu, z ciekawością.

### Aktywność: "Rozbieramy AI Overview" (15 min)

1. Każdy uczestnik wpisuje frazę branżową klienta do Perplexity lub Google (AI Overview)
2. Obserwują co jest cytowane: czy to ich artykuły? Dlaczego nie?
3. Dyskusja 5 min: co mają cytowane strony, a czego brakuje reszcie?

### Wprowadzenie: Query Fanout (15 min)

- Narysuj na tablicy: `[pytanie użytkownika] → [7 strzałek] → [7 sub-queries]`
- **NIE używaj słowa "RAG"** — powiedz "wyszukiwarka AI działa jak bardzo szczegółowy bibliotekarz"
- Kluczowe przesłanie (powiedz dosłownie):

> "Google AI cytuje fragmenty, nie rankuje strony. Wasza praca to pisać fragmenty godne cytowania."

---

## 09:30–10:30 | Blok 1: Fundamenty semantyczne (60 min)

**Cel:** Każdy uczestnik ma wypełnioną Kartę projektu dla swojego klienta.

### Wykład interaktywny (20 min)

Idź przez każde pojęcie — po każdym zadaj pytanie ustne całej grupie:

| Pojęcie | Pytanie do grupy |
|---------|-----------------|
| **CE** (Central Entity) | "Jaka jest Central Entity waszego klienta? Powiedz jednym słowem lub wyrażeniem." |
| **SC** (Source Context) | "Czym wasza agencja różni się od 10 konkurentów? Co was wyróżnia?" |
| **CSI** (Central Search Intent) | "Gdyby klient miał jeden artykuł do przeczytania — co by chciał wiedzieć?" |
| **EAV** | Napisz na tablicy: `(Google Ads, ROAS, 300–500%)`. "Kto poda trójkę EAV dla swojego klienta?" |
| **URR** | "Co jest UNIKALNE w waszej ofercie? Czego nie ma u konkurencji?" |

### Hands-on (40 min)

**Krok 1** (15 min): Uruchom `/csi-definition-helper` razem z grupą na przykładzie Double Digital.
```
/csi-definition-helper
```
Pokaż output — jak wygląda karta CE/SC/CSI. Omów każde pole.

**Krok 2** (25 min): Każdy uczestnik uruchamia:
```
/csi-definition-helper   → Karta CE/SC/CSI dla ich klienta
/eav-extractor           → EAV + URR z własnego artykułu klienta (wklejają tekst)
```

### Output bloku
- **Karta projektu** (wydruk A5) wypełniona przez każdego uczestnika
- Każdy potrafi powiedzieć głośno: "Moim CE jest X, SC to Y, CSI to Z"

---

## 10:30–10:45 | Przerwa

---

## 10:45–12:15 | Blok 2: Content Audit Pipeline (90 min)

> **To jest serce dnia 1.** Audyt daje natychmiastowy, wartościowy wynik dla każdego SEO.

**Cel:** Każdy uczestnik ma gotowy `audit.md` z CQS i 3 rekomendacjami KRYTYCZNYMI.

### Architektura pipeline (15 min)

Narysuj na tablicy (flow → po strzałkach):

```
URL
  → jina-reader (pobiera treść jako markdown)
  → nodeshub-search (szuka top 10 dla tematu artykułu)
  → jina-reader --batch (pobiera treść konkurentów)
  → competitor-gap-analyzer (EAV gaps)
  → content-quality-scorer (CQS 0–100, 9 wymiarów)
  → audit.md (raport BEFORE/AFTER)
```

Wyjaśnij każdy krok jednym zdaniem. Zatrzymaj się przy `content-quality-scorer` — powiedz:
> "To jest obiektywna ocena jakości. Nie opinia, tylko liczba. Po audycie wiecie dokładnie CO zmienić."

### Demo live (20 min)

Uruchom na przygotowanym artykule:
```
/content-auditor-pipeline
```

**Co komentować podczas demo:**
- Przy pobieraniu URL: "Jina Reader usuwa wszystkie reklamy i sidebary — zostaje sam tekst"
- Przy SERP: "Teraz sprawdzamy co Google uważa za najlepszą odpowiedź"
- Przy `scores.md`: omów każdy z 9 wymiarów — co to znaczy, jak się mierzy
- Przy `audit.md`: pokaż sekcję BEFORE/AFTER — "To jest gotowy prompt dla copywritera"

### Hands-on (55 min)

```
/content-auditor-pipeline
```

Każdy uczestnik podaje URL własnego artykułu klienta. Trener krąży i pomaga.

**Czas per uczestnik:** pipeline trwa ~3–5 min — uczestnicy mogą czytać output równolegle.

#### Fallbacki (miej gotowe):
| Problem | Rozwiązanie |
|---------|-------------|
| URL chroniony (paywall, JS rendering) | Wklej tekst artykułu ręcznie jako input |
| Brak NODESHUB | Pipeline automatycznie przechodzi w tryb Content-only |
| Pipeline nie startuje | Użyj jednego z 3 "bezpiecznych" URL backup |

### Output bloku
- `audit.md` z CQS (0–100) dla każdego uczestnika
- 3 rekomendacje KRYTYCZNE zidentyfikowane przez każdego uczestnika (ustnie do grupy: 2 min)

---

## 12:15–13:00 | Przerwa obiadowa

---

## 13:00–14:30 | Blok 3: Content Planning Pipeline (90 min)

**Cel:** Każdy uczestnik ma gotowy `brief.md` dla wybranego tematu.

### Query Fanout + Frame Semantics (20 min)

**Ćwiczenie fizyczne (5 min):**
- Napisz na tablicy: `"jak wybrać agencję SEO"`
- Poproś uczestników żeby zgłaszali pytania SZCZEGÓŁOWE, które zadałby ktoś szukający tego hasła
- Zbierz 7–10 pytań na tablicy
- Powiedz: "To jest query fanout. AI robi to automatycznie dla KAŻDEGO zapytania."

**Demo `/query-fanout` (15 min):**
```
/query-fanout
```
Pokaż jak skill rozkłada to samo pytanie na sub-queries. Porównaj z tablicą — co pasuje, co pominęliście.

### MCP Workflow obowiązkowy (20 min)

Wyjaśnij (z wydruku A5 MCP Workflow):

**Supabase — kanibalizacja:**
```sql
SELECT url, 1 - (vector <=> (...)) AS similarity
FROM blog_vectors_double ORDER BY similarity DESC LIMIT 10;
```
- >0.90 = RYZYKO kanibalizacji (nie pisz nowego artykułu!)
- 0.75–0.90 = idealny internal link
- <0.75 = można pisać swobodnie

**Senuto — dane keywords:**
- `get_groups` (country_id="1") → grupy semantyczne = H2 suggestions
- `get_questions` (country_id="1") → pytania użytkowników = gotowe FAQ
- `get_positions_data` (country_id="200") → gdzie DD już rankuje

> "Te dane są już wbudowane w pipeline. Jeśli MCP jest skonfigurowane — dzieje się automatycznie."

### Demo + Hands-on (50 min)

```
/content-planner
```

**Demo (15 min):** Trener uruchamia `/content-planner` na przygotowanym temacie. Omawia strukturę outputu:
- H1 → H2 → H3 (dlaczego taka hierarchia?)
- EAV matrix (co musi być w treści?)
- Checklist wdrożenia (konkretne zadania dla copywritera)

**Hands-on (35 min):** Każdy uczestnik uruchamia `/content-planner` dla własnego tematu.

### Output bloku
- `brief.md` gotowy do przekazania copywriterowi lub do samodzielnego pisania

---

## 14:30–14:45 | Przerwa

---

## 14:45–15:45 | Blok 4: Keyword Clustering (60 min)

**Cel:** Uczestnik rozumie topical map i potrafi uruchomić klasteryzację samodzielnie.

### Embeddingi bez matematyki (15 min)

**Ćwiczenie fizyczne:**
1. Przygotuj kartki z keywords: "SEO", "pozycjonowanie", "agencja SEO", "Google Ads", "kampania PPC", "kredyt hipoteczny", "ROAS", "konwersja"
2. Poproś 2 uczestników żeby pogrupowali kartki na podłodze — "połóżcie razem te które są o tym samym"
3. Omów wyniki — dlaczego tak pogrupowali?
4. Pokaż wykres t-SNE z poprzedniej klasteryzacji z `data/clusters/`
5. Powiedz: "To jest to samo co zrobiliście, tylko w 768 wymiarach zamiast 2."

### Demo pipeline (35 min)

**Krok 1: Agent orkiestrujący (15 min)**
```
/keyword-clustering-pipeline
```
Pokaż na pre-generowanym pliku `_expanded.csv` (agencja marketingowa).
Omów output: CORE vs OUTER, content gaps P1–P4.

**Krok 2: Python CLI (20 min)**
```bash
python3 .claude/skills/keyword-clusterer/cluster.py \
  data/keywords/agencja_marketingowa_expanded.csv \
  data/clusters/agencja_marketingowa_clusters.csv \
  --visualize
```
Pokaż wykres t-SNE który się generuje. Omów jak interpretować chmury.

> **Uwaga:** Nie czekamy na ekspansję keywords — używamy pre-generowanego `_expanded.csv`.

### Interpretacja (10 min)

Omów razem z grupą:
- **CORE** = klastry blisko Central Entity → pillar pages → pierwszeństwo publikacji
- **OUTER** = klastry peryferyjne → supporting pages → długi ogon
- **Content Gaps P1–P4** = priorytety: P1 = wysokie KD + wysoka pokrycie przez konkurencję = pisz TERAZ

---

## 15:45–16:45 | Blok 5: Własny projekt (60 min)

**Cel:** Każdy audytuje artykuł klienta samodzielnie. Trener coachuje, nie demonstruje.

**Instrukcja dla uczestników:**
```
1. Wybierz artykuł klienta który chcesz poprawić
2. Uruchom /content-auditor-pipeline
3. Zidentyfikuj 3 zmiany KRYTYCZNE
4. Napisz 1 zdanie BLUF dla H1 artykułu
```

**Rola trenera:** Krąż i pomagaj 1:1. Nie pokazuj — zadawaj pytania:
- "Co mówi CQS? Co to znaczy dla tego artykułu?"
- "Który wymiar jest najniższy? Jak byś go poprawił?"
- "Znajdź jedno zdanie BEFORE w raporcie — przepisz je AFTER."

---

## 16:45–17:00 | Blok 6: Plan wdrożenia + Zamknięcie (15 min)

### Karta "Co zrobię w poniedziałek" (5 min)

Każdy uczestnik wypełnia ustnie (lub na kartce):
- Który artykuł zaauduję pierwszy?
- Jaki temat briefa zbuduję?
- Co muszę skonfigurować (API keys, środowisko)?

### Runda zamknięcia (10 min)

5 osób — każda jednym zdaniem:

> "Dziś nauczyłem/am się że..."

**[TRENER]** Zakończ podsumowaniem:
> "Każdy z was ma dziś narzędzia, które jeszcze rano nie były dostępne dla większości specjalistów SEO w Polsce. Użyjcie ich w poniedziałek — nie w przyszłym miesiącu."

---

## Najczęstsze problemy podczas szkolenia

| Problem | Przyczyna | Rozwiązanie |
|---------|-----------|-------------|
| Pipeline nie pobiera URL | URL chroniony (paywall, JS rendering) | Wklej treść ręcznie jako tekst |
| Klasteryzacja daje 2 klastry | Keywords zbyt podobne | Dodaj `--k 8` lub użyj `--algorithm dbscan` |
| Supabase nie zwraca wyników | Brak artykułów w bazie | Pomiń krok Supabase, skoncentruj na Senuto |
| Senuto brak danych dla frazy | Fraza zbyt długa/niszowa | Użyj ogólniejszego seed keyword |
| Uczestnik utyka przy SC | Nie potrafi opisać niszy klienta | Pytania pomocnicze: "Dla kogo piszecie? Co klient ma zrobić po przeczytaniu? Czym jesteś lepszy od 10 konkurentów?" |
| Pipeline zawiesza się | API timeout | Ctrl+C, uruchom ponownie z krótszym tekstem |
| Uczestnik nie ma artykułu klienta | Brak przygotowania | Daj URL jednego z 3 backup artykułów + zaproponuj temat demo |
