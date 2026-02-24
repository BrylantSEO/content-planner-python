# MCP Workflow — Content Brief (OBOWIĄZKOWY)

Wykonaj **w tej kolejności** przed każdym content briefem (ręcznie lub przez pipeline).

---

## Krok 1 — Supabase: Analiza kanibalizacji

Narzędzie: `mcp__supabase__execute_sql`
Tabela: `blog_vectors_double` (projekt: `wbxrvveebxscbmxshkyc`)

```sql
-- Znajdź podobne wpisy przez cosine similarity (proxy przez URL keyword)
SELECT url, 1 - (vector <=> (
  SELECT vector FROM blog_vectors_double WHERE url ILIKE '%SLOWO_KLUCZ%' LIMIT 1
)) AS similarity
FROM blog_vectors_double
ORDER BY similarity DESC
LIMIT 10;
```

### Interpretacja similarity

| Próg | Znaczenie | Akcja |
|------|-----------|-------|
| > 0.90 | Bardzo podobna strona | **RYZYKO KANIBALIZACJI** — oceń czy nowy artykuł potrzebny |
| 0.75–0.90 | Powiązana | Idealny **internal link** |
| 0.50–0.75 | Luźno powiązana | Możliwy dodatkowy link |
| < 0.50 | Brak ryzyka | Można tworzyć swobodnie |

### Wymagane sekcje w briefie

- `## Analiza istniejących treści` — tabela: URL | Similarity | Rekomendacja
- `## Propozycje internal linkingu` — 3–5 URL z anchor textem i uzasadnieniem

---

## Krok 2 — Senuto: Dane słów kluczowych

### a) Aktualne pozycje DD na target keyword

```
mcp__senuto__get_positions_data(
  domain="double-digital.pl",
  fetch_mode="topLevelDomain",
  country_id="200"
)
```

### b) Grupy semantyczne

```
mcp__senuto__get_groups(keyword="<target keyword>", country_id="1")
```
→ Uzupełnij sub-queries i propozycje H2/H3 w briefie.

### c) Pytania użytkowników (PAA / FAQ)

```
mcp__senuto__get_questions(keyword="<target keyword>", country_id="1")
```
→ Dodaj jako H3 lub sekcję FAQ w briefie.

### d) Analiza konkurencji

```
mcp__senuto__get_competitors(
  domain="double-digital.pl",
  fetch_mode="topLevelDomain",
  country_id="200"
)
```

> **Uwaga country_id:** `"200"` dla pozycji i konkurencji (Base 2.0), `"1"` dla grup i pytań.

### Wymagane sekcje w briefie

- `## Dane Senuto` — wolumen, KD, CPC dla target keywords
- `## Pytania użytkowników` — z get_questions → gotowe H3 lub FAQ
- `## Pozycje DD na powiązane frazy` — jeśli domena już rankuje

---

## Krok 3 — Synteza

1. **Odróżnij** nowy artykuł od podobnych istniejących (inna intencja, głębszy fokus)
2. **Wpleć internal links** w strukturę briefu (anchor text + target URL + sekcja)
3. **Priorytetyzuj keywords** wg wolumenu i KD z Senuto
