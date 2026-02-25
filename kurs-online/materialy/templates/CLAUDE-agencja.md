# CLAUDE.md — Szablon dla agencji marketingowej

<!-- Instrukcja: Zastąp wartości w nawiasach <> własnymi danymi. -->

# Projekt: <NAZWA_AGENCJI>

Semantic-OS skonfigurowany dla agencji <NAZWA_AGENCJI>.

---

## Klient

**CE:** <NAZWA_AGENCJI> — polska agencja <TYP_AGENCJI> (digital / performance / SEO / kreatywna)
**SC:** Agencja <SPECJALIZACJA> dla <SEGMENTY_KLIENTÓW> w Polsce
**CSI:** <PERSONA> (właściciele firm / marketerzy / menedżerowie) szukający agencji, która dostarcza <GŁÓWNA_KORZYŚĆ> zamiast <BÓLU_DO_ROZWIĄZANIA>

**Przykład uzupełniony:**
```
CE: Double Digital — polska agencja performance marketingu
SC: Agencja performance marketingu dla e-commerce i leadgen B2B w Polsce.
    Specjalizacja: Google Ads, Meta Ads, SEO AI, GA4/BigQuery, CRO.
CSI: Właściciele e-commerce i marketerzy B2B szukający agencji digital marketingu,
     która dostarcza mierzalne wyniki (ROAS, wzrost sprzedaży) poprzez performance
     marketing oparty na danych — zamiast ogólnych usług bez gwarancji efektów.
```

---

## Dane agencji

| Pole | Wartość |
|------|---------|
| URL | https://<DOMENA>.pl/ |
| Rok założenia | <ROK> |
| Lokalizacja | <MIASTO> / Polska / remote |
| Specjalizacje | <LISTA_USŁUG> |
| USP (wyróżnik) | <CO_ODRÓŻNIA_OD_KONKURENCJI> |
| Social proof | <WYNIKI_KLIENTÓW_LICZBY> |

---

## REGUŁA OBOWIĄZKOWA — Przed każdym content briefem

Wykonaj **w tej kolejności**, bez wyjątków:

1. **Supabase** (`mcp__supabase__execute_sql`) — analiza podobnych wpisów → kanibalizacja + internal linking
2. **Senuto** (`get_groups` + `get_questions` + `get_positions_data`) — grupy semantyczne, pytania potencjalnych klientów, aktualne pozycje agencji
3. **Synteza** — pozycjonuj artykuł jako "ekspert" (EEAT wysoki), wpleć linki do case studies

Brief musi zawierać:
- `## Analiza istniejących treści` — URL | Similarity | Rekomendacja
- `## Propozycje internal linkingu` — 3–5 URL (priorytety: case studies, strony usług)
- `## Dane Senuto` — wolumen, KD, CPC
- `## Pytania użytkowników` — z get_questions

---

## Supabase

```
project_ref: <TWÓJ_PROJECT_REF>
tabela: blog_vectors_<NAZWA_AGENCJI>
```

---

## Priorytety contentowe (agencja marketingowa)

**Główne klastry tematyczne:**

| Klaster | Typ | Cel |
|---------|-----|-----|
| Edukacja (TOFU) | Poradniki "jak", definicje | Ruch organiczny, budowanie autorytetu |
| Porównania (MOFU) | "Agencja vs freelancer", "Agencja A vs B" | Capture intencji zakupowej |
| Case studies (MOFU/BOFU) | Konkretne wyniki z liczbami | Konwersja, social proof |
| Usługi (BOFU) | Landing pages usług | Konwersja bezpośrednia |
| Branżowe (MOFU) | Marketing dla <BRANŻY> | Niszowe frazy long-tail |

**Formaty z najwyższym EEAT dla agencji:**
- Case study: "Jak zwiększyliśmy ROAS o X% dla klienta z branży Y"
- Przewodniki: "Jak wybrać agencję <USŁUGA>" — własne ekspertyzy
- Dane branżowe: raporty, badania, statystyki z źródłem
- Opinie ekspertów: cytaty od pracowników z bio

---

## Wskazówki branżowe

- Agencje marketingowe mają wysoko konkurencyjne frazy (KD 70+) — celuj w long-tail
- "Agencja [USŁUGA] [MIASTO]" — frazy lokalne są mniej konkurencyjne
- Frazy z [BRANŻA] w middle: "agencja google ads dla e-commerce" — targeting branżowy
- E-E-A-T krytyczne: Google sprawdza autorytety agencji (Google Partner, certyfikaty)
- Competitor content: "X vs Y" generuje ruch od klientów rozważających wybór

---

## Struktura Semantic-OS

| Ścieżka | Zawartość |
|---------|-----------|
| `.claude/skills/` | Skills semantycznego SEO |
| `.claude/agents/` | Pipeline'y (clustering, content-planner, auditor) |
| `data/` | Dane robocze (keywords/, clusters/, briefs/, audits/) |
| `.env` | API keys: GEMINI_API_KEY, NODESHUB_API_KEY |
