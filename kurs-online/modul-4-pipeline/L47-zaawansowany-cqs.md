# L47 — Zaawansowany CQS — głęboka analiza wymiarów

**Moduł:** 4 — Trzy pipeline'y: teoria i praktyka
**Czas:** ~35 min
**Format:** Demo z `/semantic-role-labels-parser` i `/tfidf-analyzer`

---

## Cel lekcji

Rozumiesz SRL Salience i TF-IDF na poziomie praktycznym. Używasz odpowiednich skills do głębokiej analizy tych wymiarów.

---

## SRL Salience — kto jest "bohaterem"?

**SRL** = Semantic Role Labels — role semantyczne w zdaniu:
- **Agent** = kto wykonuje akcję
- **Predicate** = co robi
- **Patient** = kto jest obiektem akcji
- **Beneficiary** = kto korzysta

**Salience** = jak "centralnie" Central Entity jest traktowana w zdaniu.

### Agent (wysoka salience)

```
Double Digital [Agent] zarządzała [Predicate] kampanią [Patient]
i zwiększyła ROAS o 340% w 6 miesięcy [Result].
```

CE = Agent = bohater zdania = wysoka salience ✓

### Patient (niska salience)

```
Kampania [Agent] była zarządzana przez agencję [Patient].
```

CE = Patient = drugoplanowa = niska salience ✗

**Dlaczego to ważne:** Google i AI Search oceniają o czym jest artykuł przez role semantyczne. Jeśli Twoja CE jest zawsze w roli Patient — artykuł "mówi o kimś innym, nie o Tobie".

---

## Demo: /semantic-role-labels-parser

W Claude Code:

```
> /semantic-role-labels-parser
[wklej fragment artykułu]
```

Output:

```markdown
## Analiza ról semantycznych

### Zdania z CE jako AGENT (salience: wysoka)
- "Double Digital przeprowadziła audyt kampanii i wykryła 3 krytyczne błędy"
- "Agencja wdrożyła strategię Performance Max w Q1 2024"

### Zdania z CE jako PATIENT (salience: niska)
- "Kampania była zarządzana przez Double Digital" → BEFORE
  AFTER: "Double Digital zarządzała kampanią"
- "Klient zdecydował się współpracować z agencją" → BEFORE
  AFTER: "Double Digital wygrała przetarg z 3 innymi agencjami"

### Zdania neutralne / bez CE
- 4 zdania nie wspominają CE — rozważ przepisanie

### Salience Score
Agent ratio: 40% zdań | Patient ratio: 35% zdań | Neutral: 25%
Rekomendacja: Agent ratio < 50% — przepisz zdania Patient na Agent
```

---

## Transformacje Agent/Patient — ćwiczenie

Przepisz zdania z Patient na Agent:

| BEFORE (Patient) | AFTER (Agent) |
|-----------------|--------------|
| "Kampania była prowadzona przez agencję" | "Agencja prowadziła kampanię" |
| "Budżet był zarządzany przez team" | "Team zarządzał budżetem 120 000 zł" |
| "Wyniki zostały dostarczone przez firmę X" | "Firma X dostarczyła ROAS 850% w 3 miesiące" |
| "Strategia została opracowana" | "Strategeś opracowali plan 12-miesięczny" |

**Zasada:** Szukaj "była/był/zostały/jest X-owany przez Y" → zamień na "Y X-ował Y".

---

## TF-IDF Quality — terminologia branżowa

**TF-IDF** mierzy jak specjalistyczna jest terminologia w artykule:

- **Wysokie IDF** (rzadkie w korpusie) = terminologia branżowa = dobrze
- **Niskie IDF** (częste, ogólne) = "puch" językowy = źle

### Demo: /tfidf-analyzer

```
> /tfidf-analyzer
[wklej tekst artykułu]
```

Output:

```markdown
## Analiza TF-IDF

### Terminy wysokiego IDF (branżowe) — OBECNE:
- ROAS (return on ad spend) — IDF: 8.2 — OK
- CTR (click-through rate) — IDF: 7.8 — OK
- Performance Max — IDF: 8.9 — OK

### Terminy wysokiego IDF — BRAKUJĄCE (są u konkurencji):
- Smart Bidding — powinien być, brak
- Target CPA / Target ROAS — powinien być, brak
- Auction Insights — powinien być, brak

### Terminy niskiego IDF (ogólniki) — DO USUNIĘCIA:
- "bardzo" (IDF: 1.2) — usuń
- "wiele" (IDF: 1.5) — zastąp liczbą
- "różne" (IDF: 1.3) — zastąp konkretami
- "stosunkowo" (IDF: 1.1) — usuń

### Rekomendacja
TF-IDF Score: 4/10 — dodaj 5–8 terminów branżowych
Najważniejsze do dodania: Smart Bidding, Auction Insights, PMAX
```

---

## EEAT — sygnały autorytetu

**E-E-A-T** = Experience, Expertise, Authoritativeness, Trustworthiness.

Nie algorytm, ale kryteria Quality Raters Google przy ocenie artykułów.

### Demo: /eeat-evaluator

```
> /eeat-evaluator
[wklej tekst artykułu]
```

Output:

```markdown
## Ocena E-E-A-T

### Experience (1/10) — Brakuje!
- Artykuł nie zawiera przykładów z własnej praktyki
- Brak case studies z liczbami
SUGESTIA: "W kampaniach które prowadzimy, najczęstszy błąd to..."

### Expertise (5/10) — Partial
- Artykuł używa terminologii branżowej (ROAS, CTR)
- Brak autora z bio i potwierdzonym doświadczeniem
SUGESTIA: Dodaj sekcję "O autorze" z linkiem do LinkedIn i 3 case studies

### Authoritativeness (3/10) — Słaby
- Brak zewnętrznych cytowań (raporty, badania)
- Brak backlinków z autorytatywnych stron
SUGESTIA: Dodaj 2–3 cytowania: "Według raportu IAB Polska 2024..."

### Trustworthiness (4/10) — Partial
- Artykuł nie ma daty ani aktualizacji
- Brak informacji o firmie/autorze
SUGESTIA: Dodaj datę "Aktualizacja: styczeń 2025" + stopka z danymi firmy
```

---

## Integracja w pipeline audytowym

Te skills są automatycznie wywoływane przez `content-auditor-pipeline`. Możesz je też uruchomić ręcznie gdy chcesz deep-dive w jeden wymiar bez pełnego audytu.

---

## Ćwiczenie

1. Uruchom `/semantic-role-labels-parser` na fragmencie artykułu (swój lub sample)
2. Wypisz 2 zdania z CE jako Patient i przepisz je na Agent
3. Uruchom `/tfidf-analyzer` — jakie 3 terminy branżowe brakują?
4. Uruchom `/eeat-evaluator` — który wymiar EEAT jest najniższy?

---

**Następna lekcja:** L48 — Customizacja skills i tworzenie własnych
