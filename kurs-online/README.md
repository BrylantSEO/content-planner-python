# Kurs online: Semantic-OS — od fundamentów do pipeline'ów

**Dla kogo:** Marketerzy, SEO-wcy i właściciele firm chcący przygotować treści pod AI Search (Google AI Overviews, Perplexity, ChatGPT).
**Wymagania wstępne:** Umiesz otwierać terminal. Reszta wyjaśniona od zera.
**Czas:** ~12–15h materiału wideo + ćwiczenia praktyczne

---

## Czego nauczysz się po kursie

1. Wyjaśniasz RAG i query fanout bez technicznego żargonu
2. Konfigurujesz Supabase vector DB i wgrywasz treści własnego bloga
3. Wykrywasz kanibalizację treści przez cosine similarity
4. Uruchamiasz `/content-auditor-pipeline` i wskazujesz 3 zmiany KRYTYCZNE
5. Uruchamiasz `/content-planner` i przekazujesz brief.md copywriterowi
6. Uruchamiasz `/keyword-clustering-pipeline` i budujesz plan publikacji P1–P4
7. Modyfikujesz istniejący skill dopasowując go do swojej branży

---

## Struktura kursu

| Moduł | Temat | Lekcje | Czas |
|-------|-------|--------|------|
| [Moduł 0](modul-0-srodowisko/) | Środowisko pracy | 2 | ~1h |
| [Moduł 1](modul-1-ai-search/) | Jak działa AI Search | 5 | ~2.5h |
| [Moduł 2](modul-2-narzedzia/) | Narzędzia do pobierania danych | 5 | ~2.5h |
| [Moduł 3](modul-3-embeddingi-praktyka/) | Embeddingi w praktyce | 5 | ~2.5h |
| [Moduł 4](modul-4-pipeline/) | Trzy pipeline'y: teoria i praktyka | 9 | ~4.5h |
| [Moduł 5](modul-5-wdrozenie/) | Wdrożenie i systematyzacja | 4 | ~2h |

---

## Materiały praktyczne

```
materialy/
├── scripts/
│   └── upload_to_supabase.py       ← wgraj 10 artykułów do Supabase (URL → embedding → INSERT)
├── exercise-files/
│   ├── agencja_marketingowa_expanded.csv   ← 300+ keywords gotowych do klasteryzacji
│   ├── sample_article_do_audytu.md         ← artykuł z celowo niskim CQS (<40)
│   └── embeddings_cache_sample.json        ← cache embeddingów (skip Gemini API wait)
└── templates/
    ├── CLAUDE-ecommerce.md         ← CLAUDE.md dla e-commerce
    ├── CLAUDE-b2b-saas.md          ← CLAUDE.md dla B2B SaaS
    ├── CLAUDE-agencja.md           ← CLAUDE.md dla agencji marketingowej
    └── CLAUDE-lokalny.md           ← CLAUDE.md dla lokalnego biznesu
```

---

## Szybki start (po instalacji Claude Code)

```bash
# Klonuj repozytorium
git clone <url-repozytorium> semantic-os
cd semantic-os

# Skonfiguruj API keys
cp .env.example .env
# Edytuj .env: GEMINI_API_KEY, NODESHUB_API_KEY

# Sprawdź środowisko
python3 --version   # 3.10+
claude --version    # Claude Code CLI

# Uruchom pierwszy pipeline
claude
# Następnie w Claude Code:
# /content-auditor-pipeline
```

---

## Rekomendowana ścieżka nauki

```
Moduł 0 (środowisko) → Moduł 1 (teoria AI) → Moduł 2 (narzędzia)
    ↓
Moduł 3 (Supabase + embeddingi)
    ↓
Moduł 4 (pipeline'y — uruchom wszystkie 3)
    ↓
Moduł 5 (wdrożenie dla klienta)
```

**Jeśli już znasz RAG i embeddingi:** zacznij od Modułu 2 lub 3.
**Jeśli jesteś SEO-wcem z doświadczeniem:** Moduł 1 L10–L12 możesz skrócić, skup się na L13–L14.

---

## Wymagania techniczne

| Narzędzie | Wersja | Do czego |
|-----------|--------|---------|
| Python | 3.10+ | skrypty cluster.py, upload_to_supabase.py |
| Claude Code CLI | najnowsza | główne środowisko pracy |
| Git | dowolna | klonowanie repozytorium |
| Node.js | 18+ | MCP servers (Senuto) |

### API Keys

| Klucz | Wymagany | Do czego |
|-------|----------|---------|
| `ANTHROPIC_API_KEY` | TAK | Claude Code |
| `GEMINI_API_KEY` | TAK | embeddingi (klasteryzacja) |
| `NODESHUB_API_KEY` | TAK | Google SERP |
| Supabase URL + anon key | TAK | vector database |
| `JINA_API_KEY` | NIE | wyższy limit (200 RPM vs 20) |

---

## Wsparcie

Problemy techniczne → GitHub Issues w repozytorium Semantic-OS
Pytania merytoryczne → materiały w katalogu każdego modułu
