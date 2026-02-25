# L40 — Architektura pipeline'ów — jak agenty orkiestrują skills

**Moduł:** 4 — Trzy pipeline'y: teoria i praktyka
**Czas:** ~25 min
**Format:** Diagram + przegląd struktury

---

## Cel lekcji

Rozumiesz różnicę między agentem a skillem i wiesz jak pipeline'y obsługują błędy i wznowienia.

---

## Skill vs Agent — różnica

**Skill** (`.claude/skills/`) = specjalistyczna "umiejętność" Claude:
- Jeden konkretny task: wygeneruj BLUF, oceń CoR, wyciągnij EAV
- Aktywowany przez trigger keywords w konwersacji
- Nie wywołuje innych skills samodzielnie

**Agent** (`.claude/agents/`) = orkiestrator pipeline'u:
- Czyta instrukcje sekwencyjne (kroki 1, 2, 3...)
- Wywołuje skills i narzędzia w odpowiedniej kolejności
- Przekazuje output kroku N jako input do kroku N+1
- Obsługuje błędy: graceful degradation, fallbacki

---

## Trzy agenty w Semantic-OS

| Agent | Plik | Uruchomienie |
|-------|------|-------------|
| Keyword Clustering | `.claude/agents/keyword-clustering-pipeline.md` | `/keyword-clustering-pipeline` |
| Content Planning | `.claude/agents/content-planner.md` | `/content-planner` |
| Content Audit | `.claude/agents/content-auditor-pipeline.md` | `/content-auditor-pipeline` |

---

## Graceful degradation

Pipeline'y są zaprojektowane tak, żeby działać nawet gdy jeden krok się nie uda.

```
Przykład: Content Planning Pipeline

Krok 1: Supabase similarity
├── API dostępne → pełna analiza kanibalizacji
└── Brak połączenia → "Pomiń Supabase, kontynuuj bez internal linking"

Krok 2: Senuto groups
├── API dostępne → grupy semantyczne + PAA
└── Brak API → "Użyj LLM do wygenerowania grup semantycznych na podstawie CSI"

Krok 3: Senuto positions
├── API dostępne → aktualne pozycje DD
└── Brak API → "Pomiń sekcję pozycji w briefie"

...każdy krok ma fallback!
```

Oznacza to: **pipeline nigdy nie "crashuje" — zawsze zwraca wynik**, choć może być mniej kompletny.

---

## Wznawialność — pliki pośrednie

Każdy krok pipeline zapisuje swój output do pliku w `data/`:

```
Content Audit Pipeline dla URL X:

data/audits/artykul-slug/
├── source.md      ← krok 1: treść artykułu (jina reader)
├── benchmark.md   ← krok 2: EAV konkurentów (SERP + jina)
├── scores.md      ← krok 3: surowe wyniki 9 wymiarów
└── report.md      ← krok 4: finalny raport CQS + rekomendacje
```

Jeśli pipeline zatrzyma się po kroku 2 (np. limit API):
- Uruchom ponownie ten sam pipeline
- Claude wykryje istniejące pliki i **wznowi od kroku 3**
- Nie tracisz pracy wykonanej w krokach 1–2

---

## Struktura katalogu danych

```
data/
├── keywords/         ← listy keywords (CSV)
│   └── agencja_marketingowa_expanded.csv
├── clusters/         ← wyniki klasteryzacji
│   ├── agencja_output.csv
│   ├── agencja_output_metadata.json
│   └── topical_map.md
├── embeddings/       ← cache embeddingów Gemini
│   └── keywords_cache.json
├── briefs/           ← content briefy
│   └── jak-wybrac-agencje-seo_brief.md
└── audits/           ← raporty audytowe
    └── artykul-slug/
        ├── source.md
        ├── benchmark.md
        ├── scores.md
        └── report.md
```

---

## Ćwiczenie: przejrzyj strukturę

```bash
ls .claude/skills/      # lista skills
ls .claude/agents/      # lista agentów
ls data/                # katalogi robocze
```

W Claude Code:
```
> Wyjaśnij mi jak działa content-auditor-pipeline krok po kroku
```

Claude przeczyta `.claude/agents/content-auditor-pipeline.md` i wytłumaczy flow.

---

**Następna lekcja:** L41 — Content Audit Pipeline — teoria
