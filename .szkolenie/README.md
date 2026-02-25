# Semantic-OS — Program szkolenia stacjonarnego

Materiały dla trenera i uczestników szkolenia z semantycznego SEO opartego na Semantic-OS.

---

## Wersje szkolenia

| Wersja | Czas | Opis |
|--------|------|------|
| [Wersja A — 1 dzień](program-1day.md) | 8h (9:00–17:00) | Fundamenty + 3 pipeline'y. Każdy uczestnik wychodzi z gotowym `audit.md`. |
| [Wersja B — 2 dni](program-2day-extra.md) | 2 × 7h | Dzień 1 = Wersja A w wolniejszym tempie. Dzień 2 = zaawansowane + customizacja. |

---

## Struktura katalogu

```
szkolenie/
├── README.md                      ← ten plik
├── program-1day.md                ← harmonogram + notatki trenera (dzień 1)
├── program-2day-extra.md          ← bloki dnia 2 (dla wersji B)
├── setup.md                       ← setup techniczny przed szkoleniem
└── materialy/
    ├── karta-projektu.md          ← A5, drukuj: 1 per uczestnik
    ├── slownik-pojec.md           ← A5, drukuj: 1 per uczestnik
    ├── mcp-workflow-ref.md        ← A5, drukuj: 1 per uczestnik
    ├── interpretacja-cqs.md       ← A4, drukuj: 1 per uczestnik
    ├── komendy.md                 ← A4, drukuj: 1 per uczestnik
    └── plan-90-dni.md             ← A4, drukuj: 1 per uczestnik (wersja B)
```

---

## Checklist przed szkoleniem

### 1 tydzień przed
- [ ] Ustal listę uczestników i ich projekty klientów
- [ ] Zbierz 3–5 "bezpiecznych" URL artykułów do ćwiczeń (polskie, publiczne, bez JS-render)
- [ ] Wygeneruj pre-cache embeddingów: `data/embeddings/agencja_marketingowa_cache.json`
- [ ] Wygeneruj `_expanded.csv` dla "agencja marketingowa" (skip ekspansji podczas szkolenia)
- [ ] Wydrukuj materiały (6 rodzajów × liczba uczestników)

### Dzień przed
- [ ] Setup techniczny na każdym laptopie → patrz [setup.md](setup.md)
- [ ] Przygotuj 5 "bezpiecznych" URL na backup (pipeline fallback)
- [ ] Przetestuj end-to-end: `/content-auditor-pipeline` na testowym URL
- [ ] Przygotuj przykładowe outputy: `audit.md`, `brief.md`, `topical_map.md`

### Rano szkolenia (08:45)
- [ ] Weryfikacja środowiska na każdym laptopie uczestnika (15 min)
- [ ] Koffee + materiały na miejscach

---

## Weryfikacja — testy kompetencji uczestnika

Po szkoleniu uczestnik powinien umieć:

1. Zdefiniować CE/SC/CSI dla nieznanego biznesu w < 5 min
2. Uruchomić `/content-auditor-pipeline` na dowolnym URL i zinterpretować CQS
3. Wskazać 3 zmiany BEFORE→AFTER z raportu audytowego
4. Uruchomić `/content-planner` i wyjaśnić strukturę wygenerowanego briefu
5. Uruchomić `cluster.py` i zaklasyfikować klastry jako CORE lub OUTER
6. Opisać plan contentu P1–P4 z content gaps bez technicznego języka

---

## Kontakt i pliki krytyczne

- Pełny kontekst klienta: `references/client.md`
- Pipeline audytowy: `.claude/agents/content-auditor-pipeline.md`
- Pipeline content plannera: `.claude/agents/content-planner.md`
- Pipeline klasteryzacji: `.claude/agents/keyword-clustering-pipeline.md`
- Słownik pojęć: `references/domain-concepts.md`
- MCP workflow: `references/mcp-workflow.md`
