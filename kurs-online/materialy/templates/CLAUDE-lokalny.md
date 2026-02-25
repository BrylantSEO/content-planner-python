# CLAUDE.md — Szablon dla lokalnego biznesu

<!-- Instrukcja: Zastąp wartości w nawiasach <> własnymi danymi. -->

# Projekt: <NAZWA_BIZNESU>

Semantic-OS skonfigurowany dla <NAZWA_BIZNESU>.

---

## Klient

**CE:** <NAZWA_BIZNESU> — <TYP_BIZNESU> w <MIASTO/REGION>
**SC:** Lokalny <BRANŻA> obsługujący klientów z <OBSZAR_DZIAŁANIA>
**CSI:** Mieszkańcy <MIASTO/REGION> szukający <USŁUGI/PRODUKTU> blisko domu, z naciskiem na <GŁÓWNA_KORZYŚĆ> (szybkość, cena, zaufanie, specjalizacja)

**Przykład uzupełniony:**
```
CE: Stomatologia Uśmiech — gabinet stomatologiczny w Krakowie
SC: Prywatny gabinet stomatologiczny w centrum Krakowa,
    specjalizacja: stomatologia estetyczna i implanty
CSI: Krakowianie szukający dentysty w centrum miasta, bez kolejek NFZ,
     z możliwością umówienia wizyty online i płatności ratalnej
```

---

## Dane biznesu

| Pole | Wartość |
|------|---------|
| URL | https://<DOMENA>.pl/ |
| Adres | <ULICA, MIASTO> |
| Obszar obsługi | <DZIELNICE/GMINY> |
| Godziny pracy | <GODZINY> |
| USP (wyróżnik) | <CO_ODRÓŻNIA_OD_KONKURENCJI> |
| Google Moja Firma | <LINK_DO_GMF> |

---

## REGUŁA OBOWIĄZKOWA — Przed każdym content briefem

Wykonaj **w tej kolejności**, bez wyjątków:

1. **Supabase** (`mcp__supabase__execute_sql`) — analiza podobnych wpisów → kanibalizacja + internal linking
2. **Senuto** (`get_groups` + `get_questions` + `get_positions_data`) — grupy semantyczne, pytania lokalnych użytkowników, aktualne pozycje
3. **Synteza** — zawsze dodaj lokalizację do title i H1; wpleć linki do podstron usług lokalnych

Brief musi zawierać:
- `## Analiza istniejących treści` — URL | Similarity | Rekomendacja
- `## Propozycje internal linkingu` — 3–5 URL (priorytety: strony usług + Google Moja Firma)
- `## Dane Senuto` — wolumen fraz lokalnych, KD
- `## Pytania użytkowników` — z get_questions, często z pytaniami lokalnymi

---

## Supabase

```
project_ref: <TWÓJ_PROJECT_REF>
tabela: blog_vectors_<NAZWA_BIZNESU>
```

---

## Priorytety contentowe (lokalny biznes)

**Typy fraz o najwyższym priorytecie:**

| Typ frazy | Przykład | Intencja |
|-----------|---------|---------|
| Lokalna transakcyjna | "dentysta kraków centrum" | Gotowy do zakupu |
| Lokalna + usługa | "wybielanie zębów kraków" | Specyficzna usługa |
| Lokalna + pilność | "dentysta kraków nagły przypadek" | Pilna potrzeba |
| Pytania lokalne | "ile kosztuje implant kraków" | Badanie ceny |
| Porównawcze | "dentysta kraków prywatny vs nfz" | Porównanie opcji |

**Struktura treści dla lokalnego SEO:**
- H1: zawiera miasto + usługę (bez wyjątków)
- Wzmianki lokalne: dzielnice, zabytki, okolice — sygnały lokalności
- Schema markup: LocalBusiness, breadcrumbs, FAQ
- NAP consistency: Nazwa, Adres, Telefon — identyczne wszędzie
- Google Moja Firma: uzupełniona w 100%, zdjęcia co miesiąc

---

## Wskazówki branżowe

- Google Local Pack (mapy) = często ważniejszy niż wyniki organiczne dla lokalnych fraz
- Reviews (opinie) = największy czynnik rankingowy w GMF — proś klientów aktywnie
- "Blisko mnie" (near me) — frazy rosnące, Google lokalizuje automatycznie
- Mobile first: 70%+ lokalnych wyszukiwań na telefonie — sprawdzaj UI na mobile
- Sezonowość lokalna: wakacje, ferie, lokalne eventy → odpowiednie treści + posty GMF

---

## Struktura Semantic-OS

| Ścieżka | Zawartość |
|---------|-----------|
| `.claude/skills/` | Skills semantycznego SEO |
| `.claude/agents/` | Pipeline'y (clustering, content-planner, auditor) |
| `data/` | Dane robocze (keywords/, clusters/, briefs/, audits/) |
| `.env` | API keys: GEMINI_API_KEY, NODESHUB_API_KEY |
