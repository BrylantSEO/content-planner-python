# L53 — Najczęstsze problemy i jak je debugować

**Moduł:** 5 — Wdrożenie i systematyzacja
**Czas:** ~30 min
**Format:** Przewodnik debugowania

---

## Cel lekcji

Diagnozujesz i rozwiązujesz 10 najczęstszych problemów w pipeline'ach Semantic-OS.

---

## Problem 1: URL nie pobiera przez Jina Reader

**Objawy:** Puste wyjście, błąd 403, "0 znaków"

**Przyczyny i rozwiązania:**

| Przyczyna | Sygnał | Rozwiązanie |
|-----------|--------|------------|
| Paywall | "Zaloguj się" w output | Wklej tekst ręcznie w Claude Code |
| Heavy JS (React/Vue) | Strona pusta w Markdown | Użyj Crawl4AI lub Firecrawl |
| IP block | Błąd 403 | Spróbuj za 30 min lub zmień narzędzie |
| Strona wymaga logowania | Redirect do login | Wklej tekst ręcznie |

**Wklejanie tekstu ręcznie:**
```
> /content-auditor-pipeline
Wklej treść artykułu (zamiast URL):
[wklej markdown lub HTML]
```

---

## Problem 2: Klasteryzacja daje 2–3 klastry zamiast 8+

**Objawy:** Wszystkie frazy w 2 klasterach, silhouette score < 0.05

**Przyczyny i rozwiązania:**

```bash
# Zbyt mało danych? Sprawdź liczbę fraz
wc -l twoja_lista.csv

# Mniej niż 50 fraz → prawdopodobnie za mało
# Rozwiązanie: użyj keyword-expander najpierw

# Za mały k? Wymuś więcej klastrów
python3 .claude/skills/keyword-clusterer/cluster.py input.csv output.csv --k 8

# Frazy za jednorodne? Spróbuj DBSCAN
python3 .claude/skills/keyword-clusterer/cluster.py input.csv output.csv --algorithm dbscan --min-samples 3
```

---

## Problem 3: Supabase nie zwraca wyników

**Objawy:** SQL zwraca 0 wierszy, MCP nie odpowiada

**Diagnostyka:**
```sql
-- Sprawdź ile rekordów jest w bazie
SELECT COUNT(*) FROM blog_vectors_double;

-- Sprawdź czy kolumna vector ma dane
SELECT url, vector IS NULL as brak_wektora FROM blog_vectors_double LIMIT 5;
```

**Przyczyny:**
- Tabela pusta → wgraj artykuły przez `upload_to_supabase.py`
- Zły `project_ref` w `.mcp.json` → sprawdź Supabase Dashboard Settings
- MCP nie załadowany → zrestartuj Claude Code po edycji `.mcp.json`

---

## Problem 4: Senuto brak danych dla frazy

**Objawy:** `get_groups` zwraca pustą listę, `get_questions` bez wyników

**Przyczyny:**
- Fraza zbyt niszowa → spróbuj ogólniejszego seed keyword
- Zły country_id → `get_groups` i `get_questions` wymagają `"1"`, nie `"200"`
- Fraza angielska w bazie PL → użyj polskiego odpowiednika

**Rozwiązanie:**
```python
# Zamiast frazy niszowej:
get_groups(keyword="monitoring kampanii google ads", country_id="1")  # może być puste

# Użyj ogólniejszego:
get_groups(keyword="google ads", country_id="1")  # więcej wyników
```

---

## Problem 5: Claude Code nie widzi MCP

**Objawy:** "Nie mam dostępu do Supabase", MCP nie jest listowane w `/help`

**Rozwiązanie:**
1. Sprawdź plik `.mcp.json` — czy JSON jest poprawny?
2. Zwaliduj JSON online (jsonlint.com)
3. **Zrestartuj Claude Code** — ZAWSZE po edycji `.mcp.json`
4. Sprawdź czy Node.js jest zainstalowany (dla npx)
5. Sprawdź logi: `claude --debug`

**Typowy błąd w .mcp.json:**
```json
// BŁĄD (przecinek po ostatnim elemencie):
{
  "mcpServers": {
    "supabase": {...},   ← ten przecinek jest błędem!
  }
}

// POPRAWNIE:
{
  "mcpServers": {
    "supabase": {...}
  }
}
```

---

## Problem 6: Pipeline zawiesza się w połowie

**Objawy:** Claude przestał odpowiadać, brak postępu przez >5 minut

**Rozwiązanie:**
1. Naciśnij `Ctrl+C` — przerywa bieżący krok
2. Sprawdź `data/` — jakie pliki zostały już zapisane?
3. Uruchom pipeline ponownie — wykryje istniejące pliki i wznowi

```bash
ls data/audits/artykul-slug/
# source.md   ← zapisane (krok 1 gotowy)
# benchmark.md← zapisane (krok 2 gotowy)
# brak scores.md → wznów od kroku 3
```

---

## Problem 7: Embeddingi Gemini się nie generują

**Objawy:** Błąd 400 lub 401 przy wywołaniu Gemini API

**Diagnostyka:**
```bash
python3 -c "
import os, requests
from dotenv import load_dotenv
load_dotenv()
key = os.getenv('GEMINI_API_KEY')
print(f'Klucz: {key[:10]}...' if key else 'BRAK KLUCZA!')
"
```

**Przyczyny:**
- Brak GEMINI_API_KEY w `.env` → dodaj klucz
- Klucz jest zablokowany (limit API) → sprawdź dashboard aistudio.google.com
- Tekst zbyt długi → skróć do 8000 znaków

---

## Problem 8: CQS artykułu jest zawsze > 70 (zbyt optymistyczny)

**Objawy:** Każdy audyt zwraca CQS 70–80+, ale artykuły są słabe

**Przyczyna:** Claude jest z natury "życzliwy" przy ocenie. Pipeline kalibruje względem benchmarku SERP — bez benchmarku oceny są wyższe.

**Rozwiązanie:** Zawsze podawaj frazę kluczową przy audycie (pełny tryb, nie quick):
```
/content-auditor-pipeline
URL: https://...
Fraza: jak wybrać agencję SEO   ← WAŻNE dla kalibracji benchmarkowej
```

---

## Problem 9: Batch Jina Reader pomija wiele URL

**Objawy:** `_quality_report.txt` pokazuje wiele błędów 403

**Przyczyny:**
- Rate limit (20 RPM bez klucza) → batch trwa zbyt długo, timeout
- Blokada IP → zmień sieć lub użyj Crawl4AI

**Rozwiązanie:**
```bash
# Zmniejsz workers i dodaj opóźnienie
python3 .claude/skills/jina-reader/jina_reader.py \
  --batch urls.txt \
  --workers 2 \        ← mniej równoległych (default 5)
  --output data/       ← zapisz co się udało
```

---

## Problem 10: content-planner nie generuje internal linków

**Objawy:** Brief.md ma pustą sekcję "Propozycje internal linkingu"

**Przyczyny:**
- Supabase puste → wgraj artykuły najpierw
- Similarity za niska dla wszystkich artykułów (< 0.50) → norma dla nowych tematów
- MCP Supabase nie załadowane

**Test MCP:**
```
> Sprawdź czy możesz wykonać SQL na Supabase: SELECT COUNT(*) FROM blog_vectors_double
```

Jeśli Claude nie może → MCP problem. Zrestartuj Claude Code.

---

## Szybki checklist debugowania

```
[ ] Sprawdź .env — czy wszystkie klucze są wpisane?
[ ] Sprawdź czy Claude Code był zrestartowany po zmianie .mcp.json?
[ ] Sprawdź czy tabela Supabase ma dane (SELECT COUNT)?
[ ] Sprawdź country_id w Senuto — "1" dla get_groups, "200" dla pozycji
[ ] Sprawdź pliki w data/ — co zostało już zapisane?
[ ] Sprawdź _quality_report.txt po batch Jina — ile błędów?
[ ] Dla klasteryzacji: czy jest min 50 fraz w CSV?
```

---

## Gratulacje — ukończyłeś kurs!

Po tej lekcji masz:
- Działające środowisko Semantic-OS z wszystkimi API keys
- Bazę Supabase z treściami własnego bloga
- Topical map z priorytetami P1–P4
- Plan 90 dni z KPI
- Umiejętność debugowania najczęstszych problemów

**Następny krok:** Uruchom pipeline na prawdziwym projekcie klienta i zmierz CQS przed/po.

---

**Koniec kursu. Powodzenia!**
