# L41 — Content Audit Pipeline — teoria

**Moduł:** 4 — Trzy pipeline'y: teoria i praktyka
**Czas:** ~30 min
**Format:** Diagram flow + opis 9 wymiarów

---

## Cel lekcji

Rozumiesz jak działa Content Audit Pipeline i co mierzy każdy z 9 wymiarów scores.md.

---

## Flow wizualny

```
INPUT: URL artykułu + fraza kluczowa
             │
             ▼
     ┌───────────────┐
     │  jina-reader  │  → source.md (treść artykułu jako Markdown)
     └───────┬───────┘
             │
             ▼
     ┌───────────────────────────────────┐
     │  nodeshub-search + jina batch     │  → benchmark.md
     │  (top 10 SERP + EAV konkurentów)  │     (co pisze konkurencja)
     └───────┬───────────────────────────┘
             │
             ▼
     ┌───────────────────────────────────┐
     │  scores.md generator              │
     │  9 wymiarów × 0–10                │
     └───────┬───────────────────────────┘
             │
             ▼
     ┌───────────────────────────────────┐
     │  audit-report-generator           │
     │  CQS 0–100 + BEFORE/AFTER         │
     └───────────────────────────────────┘
OUTPUT: report.md (pełny raport z Action Plan)
```

---

## 9 wymiarów scores.md

| # | Wymiar | Co mierzy | Waga |
|---|--------|-----------|------|
| 1 | **CSI Alignment** | Czy artykuł odpowiada na Central Search Intent serwisu | 20% |
| 2 | **BLUF** | Czy każda sekcja H2 zaczyna się od odpowiedzi (Bottom Line Up Front) | 15% |
| 3 | **Chunk Quality** | Czy sekcje H2 są autonomiczne (można zrozumieć bez kontekstu) | 15% |
| 4 | **URR Placement** | Czy UNIQUE atrybuty są w H2, ROOT w H3, RARE w H3/FAQ | 10% |
| 5 | **CoR** | Cost of Retrieval — łatwość wyciągnięcia faktów przez AI | 15% |
| 6 | **Information Density** | Stosunek faktów do ogólników | 10% |
| 7 | **SRL Salience** | Czy Central Entity jest "bohaterem" zdań (Agent vs Patient) | 5% |
| 8 | **TF-IDF** | Pokrycie terminologii branżowej vs generycznej | 5% |
| 9 | **EEAT** | Experience, Expertise, Authoritativeness, Trustworthiness | 5% |

---

## CQS 0-100 — jak liczone

```
CQS = Σ (wynik_wymiaru × waga_wymiaru)

Przykład:
CSI Alignment:      7/10 × 0.20 = 1.40
BLUF:               5/10 × 0.15 = 0.75
Chunk Quality:      6/10 × 0.15 = 0.90
URR Placement:      4/10 × 0.10 = 0.40
CoR:                6/10 × 0.15 = 0.90
Information Density: 5/10 × 0.10 = 0.50
SRL Salience:       7/10 × 0.05 = 0.35
TF-IDF:             6/10 × 0.05 = 0.30
EEAT:               4/10 × 0.05 = 0.20
                               ────────
CQS = 57.0 / 100 → "Wymaga poprawy"
```

---

## Przedziały CQS

| CQS | Interpretacja | Akcja |
|-----|--------------|-------|
| 80–100 | Gotowy pod AI Search | Monitoring, aktualizacje sezonowe |
| 60–79 | Dobry, drobne poprawki | Wdrożenie 1–3 rekomendacji KRYTYCZNYCH |
| 40–59 | Wymaga poprawy | 3–5 zmian, priorytet BLUF i Chunk Quality |
| < 40 | Do przepisania | Rozważ rewrite lub merge z innym artykułem |

Plik `sample_article_do_audytu.md` ma CQS ~25–35 (celowo nisko).

---

## BEFORE/AFTER w raporcie

Najcenniejsza część raportu — gotowe przepisane fragmenty:

**BEFORE (oryginał):**
```
Marketing internetowy jest bardzo ważny dla każdej firmy. Coraz więcej osób
korzysta z internetu, dlatego firmy muszą być obecne w sieci.
```

**AFTER (po optymalizacji):**
```
Polskie firmy z digital marketingiem zwiększają przychody o 23% szybciej niż
firmy bez niego (Deloitte 2024). Obecność online to nie opcja — 88% zakupów B2B
zaczyna się od wyszukiwania Google.
```

Copywriter dostaje **gotowe zdania do wklejenia** — nie musi rozumieć teorii.

---

## Tryby pracy

| Tryb | Input | Kiedy użyć |
|------|-------|-----------|
| Full | URL + fraza kluczowa | Audyt kompletny z benchmarkiem SERP |
| Content-only | URL (bez frazy) | Szybka ocena jakości bez kontekstu SERP |
| Quick | Wklejony tekst | Szybki test bez pobierania URL |

---

**Następna lekcja:** L42 — Content Audit Pipeline — hands-on
