# Competitor Gap Analysis: Remarketing YouTube Ads

**Data:** 2026-02-25
**Analizowanych konkurentów:** 8 OK (8/8 URL — pełna jakość)
**Łącznie atrybutów:** 18

---

## SERP Overview

| Element | Dane |
|---------|------|
| Query 1 | "remarketing YouTube Ads" (PL, 9 wyników organic) |
| Query 2 | "remarketing youtube" (PL, 8 wyników organic) |
| PAA | "Can you retarget YouTube ads?", "How to do remarketing ads?", "Is remarketing the same as retargeting?", "What is remarketing?" |
| Related Searches | brak w raw output (niszowa fraza PL) |
| Dominujące domeny | fabrykamarketingu.pl, beeffective.pl, strategiczni.pl, support.google.com, linxdigital.com, sempire.pl |

**Wzorce tytułów SERP:**
- Artykuły "jak ustawić/jak zrobić" dominują (how-to)
- Brak artykułu z perspektywy "dlaczego warto + case/wyniki dla e-commerce" (GAP)
- Brak artykułu łączącego remarketinig YouTube z performance marketing / ROAS measurement (GAP Double Digital)
- Jeden artykuł o nowej funkcji remarketingu filmów innych twórców (marcinwsol.pl) — niszowy temat

---

## SERP Grounding (walidacja sub-queries)

| # | Sub-query | Status | Pokrycie SERP |
|---|-----------|--------|---------------|
| 1 | "jak skonfigurować remarketing YouTube Ads" | [CONFIRMED] | PAA + 5/8 konkurentów |
| 2 | "listy remarketingowe YouTube — segmentacja" | [CONFIRMED] | 6/8 konkurentów |
| 3 | "formaty reklam remarketingowych YouTube" | [CONFIRMED] | 7/8 konkurentów |
| 4 | "remarketing YouTube vs Display — różnice" | [PREDICTED] | 1/8 (sempire.pl — ogólnie) |
| 5 | "wyniki i ROAS dla e-commerce" | [PREDICTED] | 0/8 — GAP P1 dla DD |
| 6 | "warunki techniczne remarketingu YouTube" | [CONFIRMED] | support.google.com |
| 7 | "remarketing widzów vs odwiedzających stronę" | [CONFIRMED] | linxdigital.com |
| 8 | "frequency capping i wykluczenia" | [PREDICTED] | 2/8 |
| 9 | "remarketing filmów innych twórców" | [CONFIRMED] | marcinwsol.pl |
| 10 | "customer list remarketing YouTube" | [CONFIRMED] | linxdigital.com |

**[SERP-ONLY] gaps dodane z PAA:**
- "Czy remarketing i retargeting to to samo?" → FAQ gap
- "Czy można retargetować reklamy YouTube?" → FAQ gap

---

## EAV Matrix (ekstrakcja z _consolidated.md)

### Legenda konkurentów
- K1: fabrykamarketingu.pl
- K2: support.google.com
- K3: marcinwsol.pl
- K4: strategiczni.pl
- K5: beeffective.pl
- K6: linxdigital.com
- K7: sempire.pl
- K8: kompan.pl

| # | Atrybut | Typ URR | K1 | K2 | K3 | K4 | K5 | K6 | K7 | K8 | Pokrycie |
|---|---------|---------|----|----|----|----|----|----|----|----|----------|
| 1 | Definicja remarketingu YouTube (co to jest) | ROOT | + | + | - | + | + | + | + | + | 7/8 |
| 2 | Jak działa (mechanizm śledzenia, listy) | ROOT | + | + | - | + | + | + | + | - | 6/8 |
| 3 | Typy list remarketingowych (widzowie, subskrybenci, odwiedzający stronę) | ROOT | + | + | - | + | + | + | - | - | 5/8 |
| 4 | Konfiguracja krok po kroku (połączenie YT z Google Ads) | ROOT | + | + | - | + | + | + | - | - | 5/8 |
| 5 | Formaty reklam (In-Stream, Bumper, Discovery) | ROOT | + | - | - | + | - | + | + | - | 4/8 |
| 6 | Segmentacja list remarketingowych (stopień zaangażowania) | ROOT | + | - | - | + | + | + | - | - | 4/8 |
| 7 | Membership duration (maks. 540 dni) | ROOT | - | + | + | - | + | + | - | - | 4/8 |
| 8 | Korzyści / zalety remarketingu YouTube | ROOT | + | + | - | + | - | + | + | - | 5/8 |
| 9 | Frequency capping (limit wyświetleń) | RARE | - | - | - | + | - | + | - | - | 2/8 |
| 10 | Customer Match (remarketing do listy email) | RARE | - | - | - | - | - | + | - | - | 1/8 |
| 11 | Wykluczenia (exclusion targeting) | RARE | - | - | - | - | - | + | - | - | 1/8 |
| 12 | Remarketing filmów innych twórców YT (nowa funkcja) | UNIQUE | - | - | + | - | - | - | - | - | 1/8 |
| 13 | Remarketing do odwiedzających stronę (website visitors) | ROOT | - | + | - | - | + | + | + | - | 4/8 |
| 14 | Wymagania techniczne (min. 11 sek., Shorts 10 sek.) | RARE | - | + | - | - | - | + | - | - | 2/8 |
| 15 | ROAS / wyniki / case study dla e-commerce | UNIQUE | - | - | - | - | - | - | - | - | 0/8 |
| 16 | Lejek remarketingowy (sekwencja kampanii ad #1 → ad #2) | RARE | - | - | - | - | - | + | - | - | 1/8 |
| 17 | Porównanie z innymi kanałami (Meta, Display, RLSA) | RARE | - | - | - | - | - | - | + | - | 1/8 |
| 18 | Testowanie A/B formatów / miniatur | RARE | - | - | - | + | - | + | - | - | 2/8 |

**Podsumowanie klasyfikacji:**
- ROOT (5+/8): atrybuty #1, #2, #3, #4, #5, #6, #7, #8, #13 — razem **9 ROOT**
- RARE (2-4/8): atrybuty #9, #14, #18, #5, #6, #7, #13 — razem **5 RARE** (uwzględniając pogranicze 4/8)
- UNIQUE (0-1/8): atrybuty #10, #11, #12, #15, #16, #17 — razem **6 UNIQUE/RARE**

*Korekta progów dla N=8: ROOT = 5+/8, RARE = 3-4/8, UNIQUE = 1-2/8*

---

## Gap Analysis

### P1 — Krytyczne (musisz pokryć)

| Gap | Typ URR | Pokrycie SERP | Akcja |
|-----|---------|---------------|-------|
| Definicja remarketingu YouTube | ROOT | 7/8 | H2 obowiązkowy |
| Jak działa mechanizm (listy, śledzenie) | ROOT | 6/8 | H2 obowiązkowy |
| Konfiguracja krok po kroku | ROOT | 5/8 | H2 obowiązkowy (step-by-step) |
| Typy list remarketingowych | ROOT | 5/8 | H2 obowiązkowy |
| Korzyści remarketingu YouTube | ROOT | 5/8 | H2 obowiązkowy |
| ROAS / wyniki e-commerce | UNIQUE | 0/8 — brak u WSZYSTKICH | GAP P1 dla DD — dedykowany H2 |

### P2 — Wysokie (PAA potwierdza intencję)

| Gap | Typ URR | Pokrycie SERP | Akcja |
|-----|---------|---------------|-------|
| Formaty reklam (In-Stream, Bumper, Discovery) | ROOT | 4/8 + PAA | H2 lub H3 |
| Segmentacja list remarketingowych | ROOT | 4/8 | H2 lub H3 |
| Membership duration (540 dni) | ROOT | 4/8 | H3 lub sekcja w konfiguracji |
| Remarketing widzów vs odwiedzających stronę | ROOT | 4/8 | H2 lub sekcja |

### P3 — Średnie

| Gap | Typ URR | Pokrycie SERP | Akcja |
|-----|---------|---------------|-------|
| Frequency capping | RARE | 2/8 | H3 / najlepsze praktyki |
| Wymagania techniczne (min. 11 sek.) | RARE | 2/8 | H3 |
| Testowanie A/B formatów | RARE | 2/8 | H3 / najlepsze praktyki |
| Lejek remarketingowy (sekwencja reklam) | RARE | 1/8 | H3 — UNIQUE angle DD |

### P4 — Niskie (nice-to-have)

| Gap | Typ URR | Pokrycie SERP | Akcja |
|-----|---------|---------------|-------|
| Customer Match remarketing | UNIQUE | 1/8 | FAQ / wzmianka |
| Porównanie z Meta / RLSA | RARE | 1/8 | FAQ |
| Remarketing filmów innych twórców | UNIQUE | 1/8 | UNIQUE angle DD |

---

## UNIQUE Opportunities (wyróżniki)

| Atrybut | Dlaczego unikalny | Rekomendacja dla DD |
|---------|-------------------|---------------------|
| ROAS / wyniki e-commerce z remarketingu YouTube | 0/8 konkurentów — ŻADEN nie podaje wyników, benchmarków, case study | Lead + dedykowany H2 "Remarketing YouTube a wyniki sprzedaży — co mierzą agencje?" |
| Lejek remarketingowy (sekwencja ad #1 → ad #2) | Tylko 1/8 (linxdigital EN) opisuje strategię sekwencyjną | H2/H3 — angle: "remarketing jako część lejka performance" |
| Perspektywa agencji performance + e-commerce angle | 0/8 artykułów PL opisuje remarketing YT z perspektywy kampanii performance marketingowych z ROAS | Unikalna perspektywa Double Digital — Google Partner |
| Remarketing filmów innych twórców YT | Nowa funkcja (2024), tylko 1/8 opisuje | H3 / sekcja "nowości" |

---

## Podsumowanie dla kolejnych kroków

- **ROOT atrybuty (obowiązkowe H2):** Definicja, Jak działa, Konfiguracja krok po kroku, Typy list, Formaty reklam, Korzyści
- **UNIQUE wyróżniki (Lead/H1):** ROAS/wyniki e-commerce (GAP u 100% konkurencji), perspektywa agencji performance, lejek remarketingowy
- **Top 3 gaps P1:** (1) ROAS/wyniki e-commerce, (2) Konfiguracja step-by-step, (3) Typy list remarketingowych
- **Rekomendowane H3/FAQ z RARE:** frequency capping, wymagania techniczne, testowanie A/B, FAQ z PAA ("remarketing vs retargeting")
