# L44 — Content Planning Pipeline — hands-on

**Moduł:** 4 — Trzy pipeline'y: teoria i praktyka
**Czas:** ~40 min
**Format:** Screencast + ćwiczenie

---

## Cel lekcji

Uruchamiasz `/content-planner`, konfigurujesz MCP i czytasz gotowy brief.md.

---

## Wymagania przed uruchomieniem

1. MCP Supabase skonfigurowane w `.mcp.json` ✓
2. MCP Senuto skonfigurowane w `.mcp.json` ✓
3. Claude Code zrestartowany po edycji `.mcp.json` ✓
4. Tabela `blog_vectors_double` ma przynajmniej kilka rekordów ✓

---

## Konfiguracja .mcp.json

Plik `.mcp.json` w katalogu projektu (sprawdź czy istnieje):

```json
{
  "mcpServers": {
    "supabase": {
      "command": "npx",
      "args": ["-y", "@supabase/mcp-server-supabase@latest", "--project-ref", "wbxrvveebxscbmxshkyc"],
      "env": {
        "SUPABASE_ACCESS_TOKEN": "<twój-token>"
      }
    },
    "senuto": {
      "command": "npx",
      "args": ["senuto-mcp"],
      "env": {
        "SENUTO_API_KEY": "<twój-jwt-token>"
      }
    }
  }
}
```

Po edycji — **zrestartuj Claude Code** (`Ctrl+C` → `claude`).

---

## Uruchomienie

W Claude Code:

```
> /content-planner
```

Claude zapyta:

```
Podaj temat artykułu:
> Jak wybrać agencję Google Ads dla e-commerce

Podaj Source Context:
> Agencja performance marketingu dla e-commerce i leadgen B2B w Polsce.
  Specjalizacja: Google Ads, Meta Ads, SEO AI, GA4/BigQuery, CRO.
```

---

## Sekwencja kroków (obserwuj w czasie rzeczywistym)

```
[1/7] Supabase — sprawdzam podobne treści...
      → Znaleziono 3 powiązane artykuły
      → google-ads-dla-ecommerce.pl (similarity: 0.82) → internal link
      → jak-wybrac-agencje.pl (similarity: 0.91) → UWAGA: kanibalizacja

[2/7] Senuto get_groups — grupy semantyczne dla "agencja Google Ads"...
      → Klaster 1: zarządzanie kampaniami Google Ads
      → Klaster 2: Google Ads e-commerce / Shopping
      → Klaster 3: Koszt kampanii, cennik agencji

[3/7] Senuto get_questions — pytania użytkowników...
      → "Ile kosztuje agencja Google Ads?"
      → "Jak sprawdzić wyniki agencji Google Ads?"
      → "Agencja Google Ads czy samodzielne kampanie?"

[4/7] topic-researcher — CSI + Frame Semantics + Query Fanout...

[5/7] competitor-gap-analyzer — EAV z SERP + URR...

[6/7] contextual-vector-builder — H1/H2/H3 + BLUF...

[7/7] content-brief-generator — zapisuję brief.md...
      → data/briefs/jak-wybrac-agencje-google-ads_brief.md
```

---

## Czytanie briefu

Otwórz `data/briefs/jak-wybrac-agencje-google-ads_brief.md`.

### Sekcja 2 — Analiza istniejących treści

```markdown
## Analiza istniejących treści DD

| URL | Similarity | Rekomendacja |
|-----|-----------|-------------|
| /blog/google-ads-dla-ecommerce | 0.82 | Idealny internal link |
| /blog/jak-wybrac-agencje | 0.91 | ⚠️ RYZYKO KANIBALIZACJI — różnicuj temat |

→ Nowy artykuł: fokus na "kryteria wyboru SPECYFICZNE dla e-commerce"
   (stary artykuł był ogólny — e-commerce jako wyróżnik)
```

### Sekcja 3 — Propozycje internal linkingu

```markdown
## Propozycje internal linkingu

1. /blog/google-ads-dla-ecommerce
   Anchor: "jak prowadzić kampanie Google Ads dla e-commerce"
   Miejsce: sekcja H2 "Jak sprawdzić czy agencja zna e-commerce"

2. /blog/roas-jak-mierzyc
   Anchor: "jak mierzyć ROAS z kampanii Google Ads"
   Miejsce: sekcja H2 "Na co zwrócić uwagę w raportowaniu"
```

### Sekcja 7 — Struktura artykułu

```markdown
## Struktura artykułu

**H1:** Jak wybrać agencję Google Ads dla e-commerce — 7 kryteriów

**H2: 7 kryteriów wyboru agencji Google Ads dla e-commerce**
BLUF: Dobra agencja Google Ads dla e-commerce musi mieć: doświadczenie z Google Shopping (nie tylko Search), portfolio z ROAS 400%+, i dostęp do Twojego konta reklamowego — nie własnego.
→ H3: Google Shopping vs Google Search — dlaczego to ważne
→ H3: Case studies z branży — czerwone flagi i zielone flagi

**H2: Ile kosztuje agencja Google Ads dla e-commerce**
BLUF: Agencja Google Ads dla e-commerce kosztuje 2 500–8 000 zł/mc + success fee od ROAS.
→ H3: Modele rozliczeń (ryczałt vs success fee vs % budżetu)
→ H3: Na co idą pieniądze — transparentna kalkulacja

[...]
```

---

## Ćwiczenie

1. Uruchom `/content-planner` dla tematu z Twojej branży

2. Sprawdź sekcję 2 (Supabase) — czy jest ryzyko kanibalizacji?

3. Przejrzyj sekcję 3 — 3 propozycje internal linków z anchor textem

4. Sprawdź sekcję 7 — czy struktura H2 odpowiada na sub-queries z PAA?

5. Przekaż brief copywriterowi (lub sami napisz artykuł używając go)

---

**Następna lekcja:** L45 — Keyword Clustering Pipeline — teoria
