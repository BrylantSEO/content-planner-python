# L50 — Claude Code jako centrum operacyjne

**Moduł:** 5 — Wdrożenie i systematyzacja
**Czas:** ~25 min
**Format:** Przegląd workflow + porównanie VS Code

---

## Cel lekcji

Rozumiesz jak Claude Code, CLAUDE.md, MCP i skills tworzą zintegrowane środowisko pracy dla SEO.

---

## Cztery warstwy Claude Code

```
┌──────────────────────────────────────────────────────────┐
│                    CLAUDE CODE                           │
│                                                          │
│  ┌─────────────┐  CLAUDE.md = "Konstytucja projektu"    │
│  │ Memory      │  Co Claude wie o kliencie (CE, SC, CSI)│
│  └─────────────┘  Reguły obowiązkowe (Supabase → Senuto)│
│                                                          │
│  ┌─────────────┐  MCP = "Super-narzędzia"               │
│  │ Tools (MCP) │  Supabase: vector search               │
│  └─────────────┘  Senuto: dane SEO                      │
│                                                          │
│  ┌─────────────┐  Skills = "Rozszerzenia"               │
│  │ Skills      │  28+ skills (bluf, eav, tfidf...)      │
│  └─────────────┘  Trigger keywords aktywują automatycznie│
│                                                          │
│  ┌─────────────┐  Agents = "Orkiestratorzy"             │
│  │ Agents      │  3 pipeline'y: audit, planning, cluster│
│  └─────────────┘  Sekwencje kroków + graceful degradation│
└──────────────────────────────────────────────────────────┘
```

---

## CLAUDE.md — jak aktualizować

CLAUDE.md jest czytane przy każdej sesji. Możesz go edytować w trakcie projektu:

**Co dodawać:**
- Nowe case studies klienta (EAV: wyniki, liczby)
- Nowe usługi do zakresu
- Zmiany w strategii contentowej
- Nowe tabele Supabase gdy dostajesz nowych klientów

**Przykład aktualizacji:**
```markdown
## Wyniki (zaktualizowane Q1 2025)

- ROAS kampanii e-commerce: 1066% (było 850%)
- Nowe case study: klient X — wzrost sprzedaży 280% w 4 miesiące
- Nowa usługa: AI Content Audit (od marca 2025)
```

---

## Skills — jak wyszukiwać dostępne

```bash
ls .claude/skills/
```

Lub w Claude Code:
```
> Jakie skills są dostępne do analizy jakości treści?
```

Claude przeszuka `.claude/skills/` i wylistuje relevantne.

**Trigger keywords działają automatycznie** — jeśli napiszesz "przepisz na BLUF", Claude automatycznie aktywuje bluf-generator bez jawnego wywołania.

---

## /help w Claude Code

```
> /help
```

Wyświetla:
- Listę dostępnych poleceń
- Status MCP (które są połączone, które nie)
- Shortcuty klawiszowe

---

## Alternatywa: VS Code + Claude extension

VS Code z rozszerzeniem Claude Code ma dostęp do tych samych skills, ale:

| Feature | Claude Code CLI | VS Code extension |
|---------|----------------|-----------------|
| MCP servers (Supabase, Senuto) | TAK | Ograniczone / brak |
| Terminal commands (cluster.py) | TAK (wbudowany terminal) | TAK (osobny terminal) |
| File editing | TAK | Lepszy (IDE features) |
| Syntax highlighting | Podstawowy | Pełny |
| Skills i agents | TAK | TAK |

**Rekomendacja:** Używaj Claude Code CLI dla pipeline'ów (MCP jest kluczowe). VS Code dla edycji plików i przeglądania kodu.

---

## Ćwiczenie

1. Otwórz CLAUDE.md projektu
2. Dodaj jeden nowy fakt o kliencie (lub o sobie jako projekcie ćwiczeniowym)
3. Uruchom `claude` i sprawdź czy Claude "widzi" tę nową informację
4. Wpisz trigger keyword skilla bez `/` — sprawdź czy aktywuje automatycznie

---

**Następna lekcja:** L51 — Praca z wieloma klientami — skalowanie
