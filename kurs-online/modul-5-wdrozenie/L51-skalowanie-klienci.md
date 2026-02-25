# L51 — Praca z wieloma klientami — skalowanie

**Moduł:** 5 — Wdrożenie i systematyzacja
**Czas:** ~25 min
**Format:** Architektura repozytoriów + template CLAUDE.md

---

## Cel lekcji

Masz plan organizacji Semantic-OS dla wielu klientów jednocześnie (jako agencja lub freelancer).

---

## Dwa podejścia do wielu klientów

### Opcja A: Osobne repozytoria (rekomendowane)

```
~/projekty/
├── semantic-os-double-digital/    ← fork dla DD
│   ├── CLAUDE.md                 ← klient-specyficzne
│   ├── .mcp.json                 ← Supabase projektu DD
│   ├── .env                      ← klucze DD
│   └── data/                     ← dane DD
│
├── semantic-os-klient-b/         ← fork dla klienta B
│   ├── CLAUDE.md
│   ├── .mcp.json
│   ├── .env
│   └── data/
│
└── semantic-os-template/         ← template bazowy (źródło aktualizacji)
    ├── .claude/skills/           ← tu trzymasz skills
    └── kurs-online/              ← materiały kursu
```

**Zalety:**
- Pełna izolacja danych klientów
- Każdy projekt ma własne Supabase + Senuto
- Git history per klient
- Łatwo udostępnić klientowi dostęp do jego repo

**Wady:**
- Aktualizacja skills wymaga pull z template do każdego repo
- Więcej katalogów do zarządzania

### Opcja B: Jeden repo, wiele klientów

```
semantic-os/
├── .claude/skills/           ← wspólne skills dla wszystkich
├── clients/
│   ├── double-digital/
│   │   ├── CLAUDE.md
│   │   ├── .mcp.json
│   │   └── data/
│   ├── klient-b/
│   │   ├── CLAUDE.md
│   │   ├── .mcp.json
│   │   └── data/
│   └── klient-c/
│       └── ...
└── kurs-online/
```

**Zalety:** Jeden repo, łatwa aktualizacja skills
**Wady:** Dane klientów w jednym miejscu (ryzyko), wymaga uwagi przy commit

---

## Supabase — osobna tabela vs osobny projekt

| Podejście | Supabase | Kiedy |
|----------|---------|-------|
| Osobna tabela per klient | `blog_vectors_dd`, `blog_vectors_klient_b` | Mało klientów, darmowy plan |
| Osobny projekt per klient | Osobny Supabase project_ref | Klientów 5+, klient płaci za własny |

**Dla agencji:** Osobne projekty Supabase per klient → każdy klient może mieć dostęp do swoich danych bez dostępu do innych.

---

## API Keys — organizacja .env

**Nie commituj .env!** Upewnij się że `.gitignore` zawiera `.env`:

```
# .gitignore
.env
*.env
.env.local
```

**Wzorzec .env.example** (commituj, bez wartości):

```bash
# Anthropic (wymagane)
ANTHROPIC_API_KEY=sk-ant-...

# Gemini (wymagane dla klasteryzacji)
GEMINI_API_KEY=AIzaSy...

# NodeHub SERP (wymagane dla pipeline'ów)
NODESHUB_API_KEY=nub_...

# Supabase (wymagane dla content planning)
SUPABASE_URL=https://xxxxx.supabase.co
SUPABASE_ANON_KEY=eyJ...

# Jina Reader (opcjonalne, wyższy limit)
# JINA_API_KEY=jina_...
```

---

## Aktualizacja skills po forku

Gdy wyda się nowa wersja skill w template repo:

```bash
# Dodaj template jako remote
git remote add template https://github.com/double-digital/semantic-os-template

# Pobierz aktualizacje
git fetch template

# Merge tylko katalogu skills
git checkout template/main -- .claude/skills/

# Lub konkretny skill
git checkout template/main -- .claude/skills/bluf-generator/
```

---

## CLAUDE.md per klient — co zmienić

Każdy fork ma własny CLAUDE.md. Użyj szablonów z `kurs-online/materialy/templates/`:

```bash
# Dla e-commerce:
cp kurs-online/materialy/templates/CLAUDE-ecommerce.md CLAUDE.md

# Dla B2B SaaS:
cp kurs-online/materialy/templates/CLAUDE-b2b-saas.md CLAUDE.md
```

Uzupełnij pola `<>` własnymi danymi klienta.

---

## Ćwiczenie

1. Stwórz katalog `clients/moj-projekt/` w repozytorium
2. Skopiuj odpowiedni szablon CLAUDE.md do tego katalogu
3. Uzupełnij CE, SC i CSI dla fikcyjnego lub rzeczywistego projektu
4. Zastanów się: Supabase — jedna tabela czy osobny projekt?

---

**Następna lekcja:** L52 — Plan 90 dni — systematyczne wdrożenie
