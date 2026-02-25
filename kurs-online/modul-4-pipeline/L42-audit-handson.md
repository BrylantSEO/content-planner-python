# L42 — Content Audit Pipeline — hands-on

**Moduł:** 4 — Trzy pipeline'y: teoria i praktyka
**Czas:** ~40 min
**Format:** Screencast + ćwiczenie z dwoma artykułami

---

## Cel lekcji

Uruchamiasz `/content-auditor-pipeline` na własnym artykule, czytasz scores.md i wskazujesz 3 zmiany KRYTYCZNE z raportu.

---

## Uruchomienie — pełny tryb

W Claude Code:

```
> /content-auditor-pipeline
```

Claude zapyta:

```
Podaj URL artykułu do audytu (lub wklej tekst):
> https://twoj-blog.pl/artykul-o-agencji-seo

Podaj frazę kluczową (opcjonalnie, ale zalecane):
> jak wybrać agencję SEO
```

Pipeline uruchamia się — zobaczysz postęp krok po kroku.

---

## Ćwiczenie z sample article

Użyj gotowego artykułu z kursu:

```
> /content-auditor-pipeline
```

Gdy Claude zapyta o URL/tekst, wklej treść z pliku:
```
> [wklej zawartość kurs-online/materialy/exercise-files/sample_article_do_audytu.md]

Fraza kluczowa: marketing internetowy dla firm
```

---

## Co zobaczysz po uruchomieniu

### 1. source.md — treść artykułu

Markdown artykułu. Sprawdź czy jest poprawnie pobrana (brak nawigacji, stopki).

### 2. benchmark.md — EAV konkurentów

```markdown
## Benchmark SERP — "marketing internetowy dla firm"

### Competitor 1: example1.pl
- (Entity) Firma — (Attribute) Kanały digital — (Value) Google Ads, Meta Ads, SEO
- (Entity) Marketing B2B — (Attribute) ROI — (Value) 3× wyższy niż tradycyjny
- (Entity) E-commerce marketing — (Attribute) ROAS — (Value) średnio 450%

### Competitor 2: example2.pl
...

### Atrybuty UNIQUE (brak u Ciebie, mają top konkurenci)
- Konkretne liczby ROI z datą badania
- Porównanie kanałów: Google vs Meta vs SEO
- Kalkulatory budżetu
```

### 3. scores.md — surowe wyniki

```markdown
## Scores — "marketing internetowy dla firm"

| Wymiar | Wynik | Maks | Uzasadnienie |
|--------|-------|------|-------------|
| CSI Alignment | 3 | 10 | Artykuł zbyt ogólny, brak dopasowania do konkretnej persony |
| BLUF | 2 | 10 | Odpowiedzi na końcu sekcji, nie na początku |
| Chunk Quality | 4 | 10 | Sekcje nie są autonomiczne — odwołania do "poprzedniej sekcji" |
| URR Placement | 3 | 10 | UNIQUE atrybuty (liczby) brak, ROOT atrybuty zbyt ogólne |
| CoR | 2 | 10 | "bardzo ważny", "stosunkowo tani" — zero konkretów |
| Information Density | 1 | 10 | ~5% faktów, 95% ogólników |
| SRL Salience | 5 | 10 | Mix Agent/Patient, nie zawsze firma jest bohaterem |
| TF-IDF | 3 | 10 | Brak terminologii branżowej: ROAS, CPL, CTR, konwersja |
| EEAT | 2 | 10 | Brak autora, brak danych, brak cytowań |

**CQS = 25/100** — Do przepisania
```

### 4. report.md — finalny raport

```markdown
## Raport Audytowy — CQS 25/100

### Diagnoza
Artykuł jest typowym "SEO content" pisanym pod keyword stuffing.
Brakuje: faktów, liczb, struktury BLUF, terminologii branżowej.

### 3 Zmiany KRYTYCZNE (implementuj natychmiast)

**1. BLUF w każdej sekcji H2**
BEFORE: "Marketing internetowy jest bardzo ważny z wielu różnych powodów..."
AFTER:  "Firmy z digital marketingiem rosną 23% szybciej (Deloitte 2024). Główne powody..."

**2. Podmień ogólniki na liczby (Information Density)**
BEFORE: "jest stosunkowo tani w porównaniu do tradycyjnych form reklamy"
AFTER:  "kosztuje 3–10× mniej niż reklama TV przy 5× wyższym ROI (Nielsen 2024)"

**3. Dodaj sekcję E-E-A-T**
BEFORE: [brak sygnałów autorytetu]
AFTER:  "Artykuł napisała [Imię Nazwisko], strateg digital z 8 lat doświadczenia.
         Dane: GUS 2024, Deloitte Digital Report 2024."

### Dalsze optymalizacje (kolejne 2 tygodnie)
4. Przepisz H2 jako pytania (sub-queries)
5. Dodaj tabelę porównania kanałów (ROAS per kanał)
6. Rozbuduj sekcję FAQ (min. 5 pytań z PAA Google)
```

---

## Jak czytać raport efektywnie

1. **CQS** — ogólna ocena, gdzie jesteś
2. **scores.md** — które wymiary są najniższe = gdzie pracować najpierw
3. **3 Zmiany KRYTYCZNE** — implementuj je w pierwszej kolejności, reszta poczeka
4. **BEFORE/AFTER** — kopiuj-wklej dla copywritera, nie tłumacz teorii

---

## Ćwiczenie końcowe

1. Uruchom audyt na `sample_article_do_audytu.md`
2. Zanotuj CQS i trzy najniższe wymiary
3. Wskaż 3 zmiany KRYTYCZNE z raportu
4. Opcjonalnie: uruchom audyt na własnym artykule i porównaj CQS

---

**Następna lekcja:** L43 — Content Planning Pipeline — teoria
