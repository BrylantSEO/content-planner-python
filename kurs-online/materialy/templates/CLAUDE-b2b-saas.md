# CLAUDE.md — Szablon dla B2B SaaS

<!-- Instrukcja: Zastąp wartości w nawiasach <> własnymi danymi. -->

# Projekt: <NAZWA_PRODUKTU_SAAS>

Semantic-OS skonfigurowany dla <NAZWA_PRODUKTU_SAAS>.

---

## Klient

**CE:** <NAZWA_PRODUKTU_SAAS> — <TYP_NARZĘDZIA> dla <GRUPY_DOCELOWEJ>
**SC:** SaaS B2B oferujący <OPIS_PRODUKTU> dla firm z branży <BRANŻA>
**CSI:** <PERSONA_B2B> (stanowisko: <STANOWISKO>) szukający <ROZWIĄZANIA_PROBLEMU> w firmach <WIELKOŚĆ_FIRMY> w Polsce

**Przykład uzupełniony:**
```
CE: InvoiceFlow — oprogramowanie do fakturowania dla małych firm
SC: SaaS B2B z automatycznym wystawianiem faktur i integracją z bankami dla MŚP w Polsce
CSI: Właściciele i księgowi małych firm (do 50 pracowników) szukający
     prostego narzędzia do fakturowania i rozliczeń VAT, które zastąpi Excel i
     zaoszczędzi 3+ godziny tygodniowo na papierkowej robocie
```

---

## Dane produktu

| Pole | Wartość |
|------|---------|
| URL | https://<DOMENA>.pl/ |
| Model | SaaS / freemium / PLG / sales-led |
| ICP (Ideal Customer Profile) | <OPIS_IDEALNEGO_KLIENTA> |
| Pain point główny | <NAJWIĘKSZY_BÓL_KLIENTA> |
| Konkurenci | <LISTA_KONKURENTÓW> |
| Differentiatory | <LISTA_WYRÓŻNIKÓW> |

---

## REGUŁA OBOWIĄZKOWA — Przed każdym content briefem

Wykonaj **w tej kolejności**, bez wyjątków:

1. **Supabase** (`mcp__supabase__execute_sql`) — analiza podobnych wpisów → kanibalizacja + internal linking
2. **Senuto** (`get_groups` + `get_questions` + `get_positions_data`) — grupy semantyczne, pytania decydentów B2B, aktualne pozycje
3. **Synteza** — dopasuj intencję do etapu lejka B2B (TOFU/MOFU/BOFU)

Brief musi zawierać:
- `## Analiza istniejących treści` — URL | Similarity | Rekomendacja
- `## Propozycje internal linkingu` — 3–5 URL z anchor textem
- `## Dane Senuto` — wolumen, KD, CPC
- `## Pytania użytkowników` — z get_questions

---

## Supabase

```
project_ref: <TWÓJ_PROJECT_REF>
tabela: blog_vectors_<NAZWA_PRODUKTU>
```

---

## Priorytety contentowe (B2B SaaS)

**Lejek B2B — priorytety per etap:**

| Etap | Intencja | Typy treści | Przykłady |
|------|----------|-------------|-----------|
| TOFU | Edukacja, awareness | Poradniki, definicje, rankingi | "Co to jest <PROBLEM>", "Jak zautomatyzować <PROCES>" |
| MOFU | Porównanie, evaluacja | Comparison, case studies, ROI | "Najlepszy <TYP_NARZĘDZIA> dla firm 2025", "Case study" |
| BOFU | Decyzja, zakup | Landing pages, pricing, FAQ | "Cennik <PRODUKT>", "<PRODUKT> vs <KONKURENT>" |

**Formaty B2B o najwyższym E-E-A-T:**
- Case study z konkretnymi liczbami (oszczędność X godzin, wzrost Y%)
- Porównania funkcji: tabela z checkbox
- Przewodniki "krok po kroku" (obniżają CoR)
- Treści od "głosu eksperta" (autora z bio + LinkedIn)

---

## Wskazówki branżowe

- ICP powinien być obecny w każdym artykule jako "Dla kogo jest ten artykuł"
- Competitor comparisons generują duży ruch z intencją zakupową — priorytet MOFU/BOFU
- Treści B2B mają dłuższy czas decyzji — zaplanuj nurturing przez internal linking
- Słowa kluczowe typu "ROI z X", "ile kosztuje X" mają bardzo wysoką intencję zakupową

---

## Struktura Semantic-OS

| Ścieżka | Zawartość |
|---------|-----------|
| `.claude/skills/` | Skills semantycznego SEO |
| `.claude/agents/` | Pipeline'y (clustering, content-planner, auditor) |
| `data/` | Dane robocze (keywords/, clusters/, briefs/, audits/) |
| `.env` | API keys: GEMINI_API_KEY, NODESHUB_API_KEY |
