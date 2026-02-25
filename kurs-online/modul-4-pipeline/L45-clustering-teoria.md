# L45 — Keyword Clustering Pipeline — teoria

**Moduł:** 4 — Trzy pipeline'y: teoria i praktyka
**Czas:** ~35 min
**Format:** Flow diagram + wyjaśnienie CORE/OUTER i Silhouette score

---

## Cel lekcji

Rozumiesz jak działa pipeline klasteryzacji od seed keyword do topical map CORE/OUTER. Interpretujesz silhouette score i wiesz kiedy MERGE vs SPLIT klastra.

---

## Flow wizualny

```
INPUT: seed keyword + Source Context
             │
             ▼
     ┌─────────────────────────┐
     │  keyword-expander       │  → 300+ keywords (CSV)
     │  NodeHub SERP           │     PAA + Related + Fanout
     └───────┬─────────────────┘
             │
             ▼
     ┌─────────────────────────┐
     │  cluster.py             │  → embeddingi Gemini
     │  K-means / DBSCAN       │     klastry z cluster_id
     │  Gemini API             │     silhouette score
     └───────┬─────────────────┘
             │
             ▼
     ┌─────────────────────────┐
     │  cluster-namer          │  → nazwy klastrów
     │                         │     Central Entity per klaster
     │                         │     canonical query
     └───────┬─────────────────┘
             │
             ▼
     ┌─────────────────────────┐
     │  cluster-validator      │  → SERP overlap check
     │  (NodeHub SERP)         │     MERGE / SPLIT / OK
     └───────┬─────────────────┘
             │
             ▼
     ┌─────────────────────────┐
     │  cluster-mapper         │  → CORE / OUTER
     │                         │     pillar pages
     │                         │     kolejność publikacji
     └───────┬─────────────────┘
             │
             ▼
     ┌─────────────────────────┐
     │  content-gap-detector   │  → COVERED / GAP / UNIQUE
     │  (NodeHub SERP)         │     priorytety P1–P4
     └─────────────────────────┘
OUTPUT: topical_map.md + gaps.md w data/clusters/
```

---

## Silhouette Score — miara jakości klastrów

**Silhouette score** = jak dobrze każdy punkt "pasuje" do swojego klastra vs innych.

| Wartość | Interpretacja | Akcja |
|---------|--------------|-------|
| > 0.50 | Doskonała klasteryzacja | Gotowe |
| 0.15–0.50 | Dobra klasteryzacja | Sensowne wyniki |
| 0.00–0.15 | Słaba | Zmień algorytm lub parametry |
| < 0.00 | Złe | Klastry nakładają się — DBSCAN lub inne k |

**Dla danych keyword:** silhouette > 0.15 = sensowne klastry. Nie oczekuj 0.80 — frazy keyword są z natury wieloznaczne.

---

## CORE vs OUTER — nie chodzi o wolumen

**Błędne myślenie:** CORE = duże wolumeny, OUTER = małe wolumeny

**Prawidłowe:** CORE i OUTER to typ atrybutu względem **Source Context**:

```
SC: Agencja performance marketingu dla e-commerce i leadgen B2B

CORE klastry (bezpośrednio o CE/SC):
├── "kampanie Google Ads e-commerce"     ← to czym agencja się zajmuje
├── "agencja digital marketing"          ← to czym agencja jest
├── "performance marketing wyniki ROAS"  ← kluczowy atrybut agencji
└── "zarządzanie kampaniami płatnymi"    ← core usługa

OUTER klastry (peryferyjne, ale powiązane):
├── "jak mierzyć efektywność kampanii"   ← narzędzia, nie usługi agencji
├── "marketing automation"               ← obszar, nie core biznes
├── "tworzenie treści social media"      ← poza specjalizacją
└── "seo organiczne"                     ← inna usługa, OUTER dla performance
```

**Zasada:** Jeśli klaster opisuje CO ROBI agencja → CORE. Jeśli opisuje kontekst / narzędzia / inne obszary → OUTER.

---

## MERGE vs SPLIT vs OK

Po klasteryzacji, `cluster-validator` sprawdza SERP dla canonical query każdego klastra:

**MERGE (połącz klastry):**
- Klaster A i Klaster B mają 60%+ overlap w TOP 10 SERP
- → Google traktuje je jako ten sam temat → połącz w jeden artykuł

**SPLIT (rozdziel klaster):**
- W jednym klastrze są frazy z bardzo różnymi SERP (różne intencje)
- Np. klaster "agencja marketing" zawiera: informacyjne ("co to agencja") + transakcyjne ("zatrudnij agencję")
- → rozdziel na dwa artykuły

**OK:**
- SERP overlap < 40% → klastry dobrze rozdzielone → każdy = osobna strona

---

## Content Gaps P1–P4

`content-gap-detector` porównuje Twoje klastry z SERP top 10 i klasyfikuje:

| Status | Definicja | Priorytet |
|--------|-----------|-----------|
| COVERED | Masz treść pokrywającą ten klaster | Monitoruj, aktualizuj |
| GAP | Brak treści, konkurencja ma | P1 lub P2 zależnie od wolumenu |
| UNIQUE | Masz treść, konkurencja nie ma | Wzmocnij — to Twój wyróżnik |

**Priorytety GAP:**

| Priorytet | Warunek | Akcja |
|-----------|---------|-------|
| **P1** | GAP + wysoki wolumen + konkurent TOP 3 ma | Pisz natychmiast |
| **P2** | GAP + średni wolumen | Plan: następny miesiąc |
| **P3** | GAP + niski wolumen | Backlog |
| **P4** | UNIQUE + nie pokryte przez nikogo | Zdecyduj — niszowa szansa lub brak popytu |

---

**Następna lekcja:** L46 — Keyword Clustering Pipeline — hands-on
