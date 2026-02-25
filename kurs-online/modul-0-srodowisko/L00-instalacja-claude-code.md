# L00 — Instalacja i konfiguracja Claude Code

**Moduł:** 0 — Środowisko pracy
**Czas:** ~30 min
**Format:** Screencast + hands-on

---

## Cel lekcji

Po tej lekcji masz działające środowisko: Claude Code w terminalu, repozytorium Semantic-OS sklonowane, pierwszy pipeline uruchomiony.

---

## Co zainstalujemy

1. Claude Code CLI (główne narzędzie)
2. Python 3.10+ (dla skryptów cluster.py, upload_to_supabase.py)
3. Node.js 18+ (dla MCP servers)
4. Git (klonowanie repo)

---

## Krok 1 — Instalacja Claude Code

Claude Code to narzędzie CLI od Anthropic. Instalujesz je przez npm:

```bash
npm install -g @anthropic-ai/claude-code
```

Sprawdź instalację:

```bash
claude --version
# Powinno wyświetlić: claude vX.Y.Z
```

Jeśli nie masz Node.js, pobierz najpierw ze strony nodejs.org (wersja 18+).

---

## Krok 2 — Anthropic API Key

1. Wejdź na **console.anthropic.com**
2. Zaloguj się lub utwórz konto
3. Przejdź do **API Keys** → **Create Key**
4. Skopiuj klucz (zaczyna się od `sk-ant-...`)

Skonfiguruj klucz:

```bash
export ANTHROPIC_API_KEY="sk-ant-twój-klucz-tutaj"
```

Lub trwale przez Claude Code:

```bash
claude config set apiKey sk-ant-twój-klucz-tutaj
```

---

## Krok 3 — Klonowanie repozytorium Semantic-OS

```bash
git clone <url-repozytorium> semantic-os
cd semantic-os
```

Struktura którą zobaczysz:

```
semantic-os/
├── .claude/
│   ├── skills/      ← 28+ skills (rozszerzenia Claude)
│   └── agents/      ← pipeline'y (keyword-clustering, content-planner, auditor)
├── data/            ← tutaj trafiają wyniki
├── references/      ← dokumentacja i słowniki
├── kurs-online/     ← materiały tego kursu
├── CLAUDE.md        ← "konstytucja projektu" — co Claude wie o kliencie
└── .env.example     ← wzorzec konfiguracji API keys
```

---

## Krok 4 — Konfiguracja API keys

```bash
cp .env.example .env
```

Otwórz `.env` w edytorze i uzupełnij:

```
GEMINI_API_KEY=AIzaSy...        # do embeddingów (klasteryzacja)
NODESHUB_API_KEY=nub_...        # do Google SERP
# JINA_API_KEY=jina_...         # opcjonalny, wyższy limit
```

Gdzie zdobyć klucze — w lekcji L01.

---

## Krok 5 — Pierwsze uruchomienie Claude Code

```bash
claude
```

Claude Code uruchamia się w trybie interaktywnym. Zobaczysz prompt:

```
Claude Code v1.x.x — /help for help
>
```

Wpisz:

```
> Powiedz mi co wiesz o tym projekcie na podstawie CLAUDE.md
```

Claude automatycznie czyta CLAUDE.md i odpowiada w kontekście Double Digital. To jest **memory projektu** — Claude wie kim jest klient, jakie ma usługi i jak działają pipeline'y.

---

## CLAUDE.md jako "pamięć projektu"

CLAUDE.md to specjalny plik czytany automatycznie przez Claude Code przy każdej sesji. Zawiera:

- Kim jest klient (CE, SC, CSI)
- Jak działają obowiązkowe kroki (Supabase → Senuto → synteza)
- Ścieżki do kluczowych plików
- Reguły których Claude musi przestrzegać

**Twój projekt:** Kiedy zaczniesz własny projekt, skopiujesz jeden z szablonów z `kurs-online/materialy/templates/` i wypełnisz własnymi danymi.

---

## Weryfikacja instalacji

```bash
# Sprawdź wersje
python3 --version   # 3.10+
node --version      # 18+
claude --version    # dowolna

# Sprawdź strukturę projektu
ls .claude/skills/  # powinna wyświetlić 28+ katalogów
ls .claude/agents/  # 3 katalogi: keyword-clustering-pipeline, content-planner, content-auditor-pipeline
```

---

## Ćwiczenie

1. Zainstaluj Claude Code i skonfiguruj API key Anthropic
2. Sklonuj repozytorium Semantic-OS
3. Uruchom `claude` i zapytaj: "Jakie pipeline'y są dostępne w tym projekcie?"
4. Odczytaj odpowiedź — Claude powinien wymienić 3 główne pipeline'y z CLAUDE.md

---

## Rozwiązywanie problemów

| Problem | Rozwiązanie |
|---------|------------|
| `claude: command not found` | `npm install -g @anthropic-ai/claude-code` ponownie; sprawdź PATH |
| `Authentication error` | Sprawdź ANTHROPIC_API_KEY; klucz musi zaczynać się od `sk-ant-` |
| `Python not found` | Zainstaluj Python 3.10+ z python.org |
| CLAUDE.md nie jest czytane | Upewnij się że uruchamiasz `claude` z katalogu projektu |

---

**Następna lekcja:** L01 — API Keys — mapa zależności (które klucze do czego)
