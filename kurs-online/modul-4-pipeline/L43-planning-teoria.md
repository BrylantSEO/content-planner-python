# L43 — Content Planning Pipeline — teoria

**Moduł:** 4 — Trzy pipeline'y: teoria i praktyka
**Czas:** ~30 min
**Format:** Flow diagram + struktura briefu

---

## Cel lekcji

Rozumiesz sekwencję kroków Content Planning Pipeline i wiesz co zawiera każda z 9 sekcji briefu.

---

## Flow wizualny

```
INPUT: temat artykułu + Source Context
             │
             ▼
     ┌─────────────────────────┐
     │  Supabase               │  → Analiza istniejących treści
     │  (kanibalizacja +       │     Propozycje internal linkingu
     │   internal linking)     │
     └───────┬─────────────────┘
             │ OBOWIĄZKOWY KROK
             ▼
     ┌─────────────────────────┐
     │  Senuto MCP             │  → Grupy semantyczne (get_groups)
     │  get_groups()           │     Pytania użytkowników (get_questions)
     │  get_questions()        │     Aktualne pozycje DD
     │  get_positions_data()   │
     └───────┬─────────────────┘
             │ OBOWIĄZKOWY KROK
             ▼
     ┌─────────────────────────┐
     │  topic-researcher       │  → CSI artykułu
     │                         │     Frame Semantics
     │                         │     Query Fanout (sub-queries)
     └───────┬─────────────────┘
             ▼
     ┌─────────────────────────┐
     │  competitor-gap-analyzer│  → EAV konkurentów
     │                         │     URR klasyfikacja
     │                         │     Content gaps P1–P4
     └───────┬─────────────────┘
             ▼
     ┌─────────────────────────┐
     │  contextual-vector-     │  → H1/H2/H3 struktura
     │  builder                │     BLUF per sekcja
     │                         │     Optymalizacja chunków
     └───────┬─────────────────┘
             ▼
     ┌─────────────────────────┐
     │  content-brief-         │  → brief.md (9 sekcji + checklist)
     │  generator              │     Zapis do data/briefs/
     └─────────────────────────┘
OUTPUT: data/briefs/temat_brief.md
```

---

## Obowiązkowe kroki MCP

**Supabase (country_id nie dotyczy):**
```
mcp__supabase__execute_sql → tabela blog_vectors_double
```

**Senuto (uwaga na country_id!):**
```
get_groups(keyword, country_id="1")          ← PL baza legacy
get_questions(keyword, country_id="1")       ← PL baza legacy
get_positions_data(domain, country_id="200") ← Base 2.0
```

**Dlaczego różne country_id?**
- `"1"` = stara baza Senuto (obowiązkowa dla get_groups i get_questions)
- `"200"` = Base 2.0 (nowsza, dla pozycji i statystyk domeny)

Błąd z `"200"` przy get_groups = częsty problem. Zawsze `"1"` dla grup i pytań.

---

## 9 sekcji briefu

| # | Sekcja | Zawartość |
|---|--------|-----------|
| 1 | Meta | Temat, fraza główna, URL slug, CSI |
| 2 | Analiza istniejących treści DD | Supabase similarity tabela + kanibalizacja |
| 3 | Propozycje internal linkingu | 3–5 URL z anchor textem i uzasadnieniem |
| 4 | Dane Senuto | Wolumen, KD, CPC, grupy semantyczne |
| 5 | Pytania użytkowników | Z get_questions → gotowe H3 lub FAQ |
| 6 | EAV Matrix | Encje, atrybuty, wartości z UNIQUE/ROOT/RARE |
| 7 | Struktura artykułu | H1/H2/H3 z BLUF per sekcja |
| 8 | Checklist jakości | 15 punktów do weryfikacji przed publikacją |
| 9 | Pozycje DD | Aktualne pozycje na powiązane frazy |

---

## Brief jako instrukcja dla copywritera

Brief.md to **nie** gotowy artykuł. To instrukcja która mówi copywriterowi:
- Co napisać (struktura, sub-queries do pokrycia)
- Jak pisać (BLUF, CoR niski, terminologia)
- Czego nie pisać (co już pokrywają inne artykuły)
- Gdzie linkować (internal links z anchor textem)

**Copywriter nie musi rozumieć RAG ani embeddingów.** Dostaje brief i pisze.

---

**Następna lekcja:** L44 — Content Planning Pipeline — hands-on
