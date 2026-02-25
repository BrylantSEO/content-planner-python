# L01 — API Keys — mapa zależności

**Moduł:** 0 — Środowisko pracy
**Czas:** ~25 min
**Format:** Diagram + hands-on

---

## Cel lekcji

Wiesz które klucze są wymagane do których pipeline'ów i jak je przetestować zanim zaczniesz.

---

## Mapa zależności API Keys

```
┌─────────────────────────────────────────────────────────────┐
│                    Co chcesz zrobić?                        │
└─────────────────────────────────────────────────────────────┘
          │                    │                    │
          ▼                    ▼                    ▼
  Klasteryzacja         Planowanie              Audyt
  słów kluczowych       treści                  treści
          │                    │                    │
          ▼                    ▼                    ▼
  GEMINI_API_KEY      GEMINI_API_KEY          (żaden wymagany)
  NODESHUB_API_KEY    NODESHUB_API_KEY        NODESHUB_API_KEY
                      SUPABASE_URL            NODESHUB_API_KEY
                      SUPABASE_ANON_KEY
                      Senuto MCP (JWT)
```

---

## Tabela kluczy

| Klucz | Wymagany | Pipeline | Gdzie zdobyć |
|-------|----------|---------|--------------|
| `ANTHROPIC_API_KEY` | TAK (zawsze) | Wszystkie | console.anthropic.com |
| `GEMINI_API_KEY` | TAK | Klasteryzacja, upload Supabase | aistudio.google.com |
| `NODESHUB_API_KEY` | TAK | Klasteryzacja, planowanie, audyt | nodeshub.io |
| `SUPABASE_URL` | TAK | Content planning, upload | app.supabase.com |
| `SUPABASE_ANON_KEY` | TAK | Content planning, upload | app.supabase.com |
| Senuto JWT | TAK | Content planning | app.senuto.com |
| `JINA_API_KEY` | NIE | Pobieranie URL | jina.ai/api-key |

---

## Krok po kroku — zdobycie każdego klucza

### GEMINI_API_KEY (Google AI Studio)

1. Wejdź na **aistudio.google.com**
2. Zaloguj się kontem Google
3. Kliknij **Get API key** → **Create API key**
4. Skopiuj klucz (zaczyna się od `AIzaSy...`)

Darmowy tier: 1 milion tokenów/miesiąc — wystarczy na kurs i mały projekt.

### NODESHUB_API_KEY (Google SERP)

1. Wejdź na **nodeshub.io**
2. Zarejestruj się (jest darmowy plan startowy)
3. Dashboard → **API Keys** → kopiuj klucz

### SUPABASE_URL i SUPABASE_ANON_KEY

1. Wejdź na **app.supabase.com**
2. **New Project** → wybierz nazwę i hasło bazy danych
3. Po utworzeniu: **Settings** → **API**
4. Skopiuj: `Project URL` (SUPABASE_URL) i `anon public` (SUPABASE_ANON_KEY)

Darmowy plan: 500MB bazy, 2GB transfer — więcej niż wystarczy.

### Senuto JWT (MCP)

1. Wejdź na **app.senuto.com**
2. Twój profil → **API** → **Generate token**
3. Token używany w konfiguracji MCP (nie w `.env`)

### JINA_API_KEY (opcjonalny)

Bez klucza Jina Reader działa, ale z limitem 20 requestów/minutę.
Z kluczem: 200 requestów/minutę.

1. Wejdź na **jina.ai** → **API Key**
2. Darmowy plan: 1M tokenów

---

## Konfiguracja .env

Edytuj plik `.env` w głównym katalogu projektu:

```bash
# Wymagane zawsze
ANTHROPIC_API_KEY=sk-ant-...

# Wymagane dla klasteryzacji i upload
GEMINI_API_KEY=AIzaSy...

# Wymagane dla SERP i pipeline'ów
NODESHUB_API_KEY=nub_...

# Wymagane dla Supabase
SUPABASE_URL=https://xxxx.supabase.co
SUPABASE_ANON_KEY=eyJ...

# Opcjonalne — wyższy limit Jina Reader
# JINA_API_KEY=jina_...
```

**Bezpieczeństwo:** `.env` jest w `.gitignore` — nigdy nie trafia do repozytorium. Plik `.env.example` (bez wartości) można commitować.

---

## Test każdego połączenia

### Test Gemini

```bash
python3 -c "
import requests, os
from dotenv import load_dotenv
load_dotenv()
key = os.getenv('GEMINI_API_KEY')
resp = requests.post(
    f'https://generativelanguage.googleapis.com/v1beta/models/text-embedding-004:embedContent?key={key}',
    json={'model': 'models/text-embedding-004', 'content': {'parts': [{'text': 'test'}]}}
)
data = resp.json()
dims = len(data['embedding']['values'])
print(f'[OK] Gemini — {dims} wymiarów')
"
```

### Test NodeHub

```bash
python3 .claude/skills/nodeshub-search/nodeshub_search.py "test query"
# Powinno wyświetlić top 10 wyników Google
```

### Test Jina Reader

```bash
python3 .claude/skills/jina-reader/jina_reader.py "https://example.com"
# Powinno wyświetlić treść example.com jako markdown
```

### Test Supabase

```bash
python3 kurs-online/materialy/scripts/upload_to_supabase.py --test
# Wyświetli: [OK] dla każdego połączenia
```

---

## Konfiguracja MCP — Senuto

MCP (Model Context Protocol) to protokół rozszerzeń Claude Code. Senuto MCP dodaje narzędzia do analizy pozycji, grup semantycznych i pytań użytkowników.

Plik `.mcp.json` w katalogu projektu (już skonfigurowany):

```json
{
  "mcpServers": {
    "senuto": {
      "command": "npx",
      "args": ["senuto-mcp"],
      "env": {
        "SENUTO_API_KEY": "twój-jwt-token"
      }
    }
  }
}
```

Uzupełnij `SENUTO_API_KEY` swoim tokenem JWT z app.senuto.com.

Po edycji `.mcp.json`: **zrestartuj Claude Code** (wyjdź `Ctrl+C` i uruchom `claude` ponownie).

---

## Weryfikacja końcowa

Uruchom `claude` i wpisz:

```
> Sprawdź czy mam wszystkie wymagane API keys skonfigurowane
```

Claude przejrzy `.env` i poinformuje co brakuje.

---

## Ćwiczenie

1. Zdobądź i skonfiguruj minimum: GEMINI_API_KEY + NODESHUB_API_KEY
2. Uruchom test każdego klucza
3. Opcjonalnie: skonfiguruj Supabase (będzie potrzebny w Module 3)

---

**Następna lekcja:** L10 — RAG — dlaczego AI nie "rankuje" stron, tylko cytuje fragmenty
