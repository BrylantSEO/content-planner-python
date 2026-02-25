# CLAUDE.md — Szablon dla e-commerce

<!-- Instrukcja: Zastąp wartości w nawiasach <> własnymi danymi. -->

# Projekt: <NAZWA_SKLEPU>

Semantic-OS skonfigurowany dla sklepu <NAZWA_SKLEPU>.

---

## Klient

**CE:** <NAZWA_SKLEPU> — sklep internetowy z <KATEGORIA_PRODUKTÓW>
**SC:** E-commerce sprzedający <PRODUKTY> do <GRUPY_DOCELOWEJ> w Polsce
**CSI:** <PERSONA> szukający <PRODUKTU/USŁUGI> przez internet, z naciskiem na <GŁÓWNA_KORZYŚĆ> zamiast <BÓLU_DO_ROZWIĄZANIA>

**Przykład uzupełniony:**
```
CE: SportowySklep.pl — sklep internetowy z odzieżą sportową
SC: E-commerce sprzedający odzież i obuwie sportowe do aktywnych Polaków w wieku 25-45 lat
CSI: Aktywne osoby szukające dobrej jakości odzieży sportowej w przystępnej cenie,
     które chcą kupować online z szybką dostawą i łatwym zwrotem
```

---

## Dane sklepu

| Pole | Wartość |
|------|---------|
| URL | https://<DOMENA>.pl/ |
| Platforma | <WooCommerce / Shopify / PrestaShop / Magento> |
| Kategorie główne | <LISTA_KATEGORII> |
| Bestsellery | <TOP_3_PRODUKTY> |
| USP (wyróżnik) | <CO_ODRÓŻNIA_OD_KONKURENCJI> |

---

## REGUŁA OBOWIĄZKOWA — Przed każdym content briefem

Wykonaj **w tej kolejności**, bez wyjątków:

1. **Supabase** (`mcp__supabase__execute_sql`) — analiza podobnych wpisów → kanibalizacja + internal linking
2. **Senuto** (`get_groups` + `get_questions` + `get_positions_data`) — grupy semantyczne, pytania kupujących, aktualne pozycje
3. **Synteza** — odróżnij artykuł od istniejących, wpleć internal links do kategorii/produktów

Brief musi zawierać:
- `## Analiza istniejących treści` — URL | Similarity | Rekomendacja
- `## Propozycje internal linkingu` — 3–5 URL z anchor textem (priorytety: strony kategorii i produktów)
- `## Dane Senuto` — wolumen, KD, CPC
- `## Pytania użytkowników` — FAQ z get_questions

---

## Supabase

```
project_ref: <TWÓJ_PROJECT_REF>
tabela: blog_vectors_<NAZWA_SKLEPU>
```

---

## Priorytety contentowe (e-commerce)

**Typy treści wysokiego priorytetu:**
1. Poradniki zakupowe — "Jak wybrać <PRODUKT>" (intencja komercyjna)
2. Porównania produktów — "<PRODUKT_A> vs <PRODUKT_B>"
3. Recenzje / rankingi — "Najlepsze <PRODUKTY> 2025"
4. Treści sezonowe — Back to school, Black Friday, święta
5. Problemy do rozwiązania — "Co zrobić gdy <PROBLEM>"

**Intencje do obsługi w sklepie:**
- Informacyjna: "jak wybrać", "co to jest", "co warto wiedzieć"
- Komercyjna: "najlepszy", "ranking", "porównanie", "opinie"
- Transakcyjna: "kup", "cena", "gdzie kupić", "sklep online"

---

## Wskazówki branżowe

- Każdy artykuł powinien mieć CTA do kategorii lub konkretnego produktu
- Internal linki do stron produktowych zwiększają crawl budget dla ważnych stron
- Sezonowość: zaplanuj treści 6–8 tygodni przed szczytem sprzedaży
- EAV dla produktów: marka, materiał, rozmiar, zastosowanie, cena, dostępność

---

## Struktura Semantic-OS

| Ścieżka | Zawartość |
|---------|-----------|
| `.claude/skills/` | Skills semantycznego SEO |
| `.claude/agents/` | Pipeline'y (clustering, content-planner, auditor) |
| `data/` | Dane robocze (keywords/, clusters/, briefs/, audits/) |
| `.env` | API keys: GEMINI_API_KEY, NODESHUB_API_KEY |
