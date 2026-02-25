# MCP Workflow — Reference Card

> Drukuj A5, 1 per uczestnik.
> OBOWIĄZKOWY przy każdym content briefie.

---

## Kolejność kroków

```
1. SUPABASE  → kanibalizacja + internal links
2. SENUTO    → grupy semantyczne + pytania + pozycje
3. SYNTEZA   → odróżnij artykuł, wpleć linki, priorytetyzuj
```

---

## Krok 1: Supabase — kanibalizacja

```sql
SELECT url,
  1 - (vector <=> (
    SELECT vector FROM blog_vectors_double
    WHERE url ILIKE '%SLOWO_KLUCZ%' LIMIT 1
  )) AS similarity
FROM blog_vectors_double
ORDER BY similarity DESC
LIMIT 10;
```

**Narzędzie:** `mcp__supabase__execute_sql`
**Tabela:** `blog_vectors_double`

### Interpretacja similarity

| Próg | Znaczenie | Akcja |
|------|-----------|-------|
| **> 0.90** | Bardzo podobna | RYZYKO KANIBALIZACJI — zastanów się czy nowy artykuł potrzebny |
| **0.75–0.90** | Powiązana | Idealny **internal link** |
| **0.50–0.75** | Luźno powiązana | Możliwy dodatkowy link |
| **< 0.50** | Brak ryzyka | Można tworzyć swobodnie |

---

## Krok 2: Senuto

### a) Grupy semantyczne → H2 suggestions
```
get_groups(keyword="<target>", country_id="1")
```

### b) Pytania użytkowników → gotowe FAQ
```
get_questions(keyword="<target>", country_id="1")
```

### c) Pozycje DD na target keyword
```
get_positions_data(
  domain="double-digital.pl",
  fetch_mode="topLevelDomain",
  country_id="200"
)
```

> **Ważne:** `country_id="1"` dla grup i pytań (legacy).
> `country_id="200"` dla pozycji i konkurencji (Base 2.0).

---

## Krok 3: Synteza

1. Sprawdź similarity — czy nowy artykuł się różni od istniejących?
2. Wpleć internal links w brief (anchor text + URL + sekcja)
3. Priorytetyzuj keywords wg wolumenu i KD z Senuto

---

## Wymagane sekcje w briefie

- `## Analiza istniejących treści DD` — tabela URL | Similarity | Rekomendacja
- `## Propozycje internal linkingu` — 3–5 URL z anchor textem
- `## Dane Senuto` — wolumen, KD, CPC
- `## Pytania użytkowników` — z get_questions → H3 lub FAQ
