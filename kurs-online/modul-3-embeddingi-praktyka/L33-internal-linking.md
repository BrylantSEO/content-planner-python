# L33 — Internal linking oparty na semantyce

**Moduł:** 3 — Embeddingi w praktyce
**Czas:** ~30 min
**Format:** Demo z MCP workflow

---

## Cel lekcji

Budujesz internal linking oparty na cosine similarity zamiast ręcznego wyszukiwania.

---

## Stary vs nowy sposób

**Stary sposób (ręczny):**
1. Piszesz artykuł o "agencji Google Ads"
2. Otwierasz Google: `site:twoja-strona.pl Google Ads`
3. Przeglądasz 5–10 wyników, decydujesz które linkować
4. Wpisujesz anchor text ręcznie
5. Powtarzasz przy każdym nowym artykule

**Nowy sposób (semantyczny):**
1. Generujesz embedding nowego artykułu
2. SQL query zwraca TOP 5 podobnych artykułów z similarity score
3. Similarity 0.75–0.90 = automatyczna lista do linkowania
4. Anchor text bazuje na CSI powiązanego artykułu

---

## Progi dla internal linking

```
similarity > 0.90  → KANIBALIZACJA (nie linkuj, oceń merge)
similarity 0.75–0.90 → IDEALNY INTERNAL LINK (linkuj!)
similarity 0.50–0.75 → OPCJONALNY LINK (jeśli pasuje kontekstowo)
similarity < 0.50    → BRAK LINKU (zbyt luźne powiązanie)
```

---

## SQL — lista internal links dla nowego artykułu

```sql
-- Zastąp wektor embeddingiem tematu nowego artykułu
SELECT
    url,
    ROUND(CAST(1 - (vector <=> '<EMBEDDING>'::vector) AS numeric), 3) AS similarity,
    CASE
        WHEN 1 - (vector <=> '<EMBEDDING>'::vector) > 0.90 THEN 'KANIBALIZACJA'
        WHEN 1 - (vector <=> '<EMBEDDING>'::vector) > 0.75 THEN 'INTERNAL LINK'
        WHEN 1 - (vector <=> '<EMBEDDING>'::vector) > 0.50 THEN 'OPCJONALNY'
        ELSE 'BRAK'
    END AS rekomendacja
FROM blog_vectors_moj_projekt
ORDER BY similarity DESC
LIMIT 10;
```

---

## Anchor text oparty na CSI

Dobry anchor text to nie "kliknij tutaj" ani "dowiedz się więcej" — to opis **czego użytkownik się dowie** klikając.

**Formula:** `[głowna korzyść artykułu docelowego dla Twojego czytelnika]`

**Przykłady:**

| Artykuł docelowy | Anchor text |
|-----------------|-------------|
| "Jak wybrać agencję Google Ads" | "jak wybrać agencję Google Ads dla e-commerce" |
| "Ile kosztuje kampania Google Ads" | "typowe koszty kampanii Google Ads w Polsce" |
| "Jak mierzyć ROAS w GA4" | "jak śledzić ROAS kampanii w Google Analytics 4" |

**Zasada:** Anchor text musi być naturalny w zdaniu i trafnie opisywać docelowy artykuł.

---

## MCP workflow w content-planner

Kiedy używasz `/content-planner`, ten krok jest automatyczny.

**Co Claude robi pod maską (z CLAUDE.md):**

```python
# Krok 1: Supabase (MCP call)
sql = """
SELECT url, 1 - (vector <=> '<embedding tematu>'::vector) AS similarity
FROM blog_vectors_double
ORDER BY similarity DESC LIMIT 10
"""
results = mcp_supabase_execute_sql(sql)

# Krok 2: Filtruj według progów
internal_links = [r for r in results if 0.75 <= r.similarity <= 0.90]
cannibalization = [r for r in results if r.similarity > 0.90]

# Krok 3: Wpleć do briefu
# - sekcja "Analiza istniejących treści" (kanibalizacja)
# - sekcja "Propozycje internal linkingu" (linki z anchor textem)
```

---

## Ćwiczenie: ręczny MCP workflow

W Claude Code uruchom:

```
> Sprawdź bazę Supabase i zaproponuj internal links dla artykułu o "jak mierzyć efektywność kampanii Google Ads w GA4"
```

Claude:
1. Wygeneruje embedding dla tematu
2. Wywoła `mcp__supabase__execute_sql`
3. Przefiltruje wyniki
4. Zaproponuje linki z anchor textem

---

## Plan aktualizacji istniejących artykułów

Semantic internal linking możesz też używać do **retrospektywnego** dodawania linków:

```python
# Dla każdego artykułu w bazie:
# 1. Weź jego embedding
# 2. Szukaj artykułów z similarity 0.75–0.90
# 3. Sprawdź czy już mają link do siebie
# 4. Jeśli nie — dodaj do listy "linki do dodania"
```

Wynik: lista par artykułów do połączenia linkami. Raz na miesiąc uruchom i zaktualizuj treści.

---

**Następna lekcja:** L34 — Porównanie treści z konkurencją przez embeddingi
