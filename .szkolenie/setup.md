# Setup techniczny — instrukcja dla trenera

Wykonaj **dzień przed** szkoleniem na każdym laptopie uczestnika.

---

## Wymagania systemowe

| Wymaganie | Minimalne |
|-----------|-----------|
| Python | 3.10+ |
| Node.js | 18+ |
| Claude Code | najnowsza wersja |
| RAM | 8 GB |
| Dysk | 2 GB wolnego miejsca |
| Internet | wymagany przez cały dzień |

---

## Krok 1: Klonowanie repozytorium

```bash
git clone <URL_REPO> semantic-os
cd semantic-os
```

---

## Krok 2: API Keys

```bash
cp .env.example .env
```

Uzupełnij `.env`:

```ini
GEMINI_API_KEY=<klucz od klienta>
NODESHUB_API_KEY=<klucz od klienta>
```

> **Uwaga:** Nie commituj `.env`. Plik jest w `.gitignore`.

Klucze Claude Code (Anthropic API) — każdy uczestnik loguje się na własne konto lub używamy konta agencji.

---

## Krok 3: Instalacja zależności Python

```bash
pip install -r .claude/skills/keyword-clusterer/requirements.txt
pip install requests python-dotenv
```

Weryfikacja:
```bash
python3 -c "import numpy, sklearn, matplotlib; print('OK')"
```

---

## Krok 4: Konfiguracja MCP

Sprawdź czy `.mcp.json` istnieje w katalogu projektu:

```bash
cat .mcp.json
```

Powinien zawierać wpisy dla `senuto` i `supabase`. Jeśli nie ma pliku — skopiuj z przykładu:

```bash
cp .mcp.json.example .mcp.json
```

Uzupełnij tokeny w `.mcp.json`:
- `SENUTO_API_KEY` — JWT token Senuto
- Supabase: project URL i anon key

---

## Krok 5: Test połączeń

Uruchom wszystkie testy — każdy powinien zwrócić dane (nie błąd):

```bash
# Test Jina Reader (pobieranie URL)
python3 .claude/skills/jina-reader/jina_reader.py "https://double-digital.pl/"

# Test NodeHub Search (Google SERP)
python3 .claude/skills/nodeshub-search/nodeshub_search.py "agencja seo"

# Test klasteryzacji (embeddingi + ML)
python3 .claude/skills/keyword-clusterer/cluster.py \
  data/keywords/test_keywords.csv \
  data/clusters/test_output.csv

# Test Python imports
python3 -c "import numpy, sklearn, matplotlib, requests, dotenv; print('Wszystkie importy OK')"
```

---

## Krok 6: Przygotowanie plików demo

### Pre-generowany expanded CSV

Umieść w `data/keywords/agencja_marketingowa_expanded.csv`:
- Plik powinien mieć kolumny: `keyword, volume, difficulty`
- Min. 100 keywords
- Temat: "agencja marketingowa" i powiązane

### Pre-cache embeddingów

```bash
python3 .claude/skills/keyword-clusterer/cluster.py \
  data/keywords/agencja_marketingowa_expanded.csv \
  data/clusters/agencja_marketingowa_clusters.csv \
  --save-embeddings
```

Cache zostanie zapisany do `data/embeddings/`. Następnie klasteryzacja nie będzie wymagać generowania embeddingów ponownie.

---

## Krok 7: "Bezpieczne" URL do ćwiczeń

Przetestuj te URL przed szkoleniem — powinny działać z Jina Reader:

```bash
# Test URL (zamień na rzeczywiste URL backup)
python3 .claude/skills/jina-reader/jina_reader.py "https://double-digital.pl/blog/google-ads/"
python3 .claude/skills/jina-reader/jina_reader.py "https://double-digital.pl/blog/seo/"
```

Przygotuj 5 URL które:
- Są publicznie dostępne (brak logowania)
- Nie wymagają JavaScript do renderowania treści
- Mają >500 słów treści
- Dotyczą tematu SEO lub marketingu cyfrowego

---

## Krok 8: Weryfikacja end-to-end

```bash
# Pełny test pipeline audytowego na jednym URL
# W Claude Code:
# /content-auditor-pipeline
# Podaj URL: https://double-digital.pl/
```

Sprawdź czy generuje:
- `data/audits/<timestamp>/scores.md`
- `data/audits/<timestamp>/audit.md`

---

## Troubleshooting setup

| Problem | Polecenie diagnostyczne |
|---------|------------------------|
| `pip` nie znaleziony | `python3 -m pip install ...` |
| Błąd SSL przy pip | `pip install --trusted-host pypi.org ...` |
| `cluster.py` brak modułu | `pip install scikit-learn matplotlib numpy` |
| Claude Code nie widzi MCP | Uruchom `claude` od nowa po edycji `.mcp.json` |
| Jina Reader timeout | Spróbuj krótszego URL lub innej strony |
| NodeHub 429 (rate limit) | Poczekaj 30 sek, retry |

---

## Konfiguracja sieci (sala szkoleniowa)

- Upewnij się że firewall nie blokuje: `r.jina.ai`, `api.senuto.com`, `nodeshub.io`
- Alternatywnie: przygotuj lokalny cache odpowiedzi API dla offline demo
- Sprawdź ping do API przed szkoleniem: `curl -s https://r.jina.ai/ping`
