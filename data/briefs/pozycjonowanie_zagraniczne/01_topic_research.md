# Topic Research: Pozycjonowanie zagraniczne
# Data: 2026-02-25
# Tryb: A (z 00_query_fanout.json)

## 1. CSI Definition

| Element | Wartość |
|---------|---------|
| **CE** | Pozycjonowanie zagraniczne (SEO międzynarodowe) |
| **SC** | Double Digital — polska agencja performance marketingu dla e-commerce i leadgen B2B, 25+ krajów zasięgu, Google Partner |
| **CSI** | Właściciel e-commerce lub marketer B2B szuka kompleksowej strategii pozycjonowania zagranicznego z naciskiem na mierzalne wyniki (ROAS, leady) i dane, nie tylko pozycje |
| **Predykaty** | planować / wdrożyć / wybierać / optymalizować / mierzyć efekty |
| **Canonical query** | pozycjonowanie zagraniczne |

**Uzasadnienie SC:** DD ma unikalną pozycję — łączy SEO zagraniczne z performance marketingiem (Google Ads, Meta Ads) w 25+ krajach. To przewaga nad czystymi agencjami SEO: możliwość synergii SEO + paid na rynkach zagranicznych.

## 2. Ramka semantyczna

| Element | Definicja | Sub-query | Priorytet |
|---------|-----------|-----------|-----------|
| **Agent** | Kto realizuje SEO zagraniczne? | agencja SEO pozycjonowanie zagraniczne | CORE |
| **Patient** | Czyja strona jest pozycjonowana? | pozycjonowanie zagraniczne e-commerce / B2B | CORE |
| **Instrument** | Narzędzia i techniki | hreflang, ccTLD, link building zagraniczny, native content | CORE |
| **Purpose** | Po co pozycjonować za granicą? | skuteczne pozycjonowanie zagraniczne wyniki | CORE |
| **Cause** | Dlaczego warto ekspandować? | dlaczego pozycjonowanie zagraniczne dla e-commerce | CORE |
| **Result** | Jaki efekt? | wzrost sprzedaży pozycjonowanie zagraniczne | CORE |
| **Location** | Na jakich rynkach? | pozycjonowanie stron w Niemczech, UK, USA, Francji | CORE |
| **Time** | Jak długo trwa? | ile trwa pozycjonowanie zagraniczne kiedy efekty | OUTER |
| **Manner** | Jak to robić skutecznie? | jak pozycjonować stronę za granicą | CORE |
| **Beneficiary** | Dla kogo? | pozycjonowanie zagraniczne dla małych firm, e-commerce | CORE |
| **Source** | Skąd wiedza o rynku? | analiza rynku zagranicznego SEO | OUTER |
| **Quantity** | Ile to kosztuje? | pozycjonowanie zagraniczne cennik ceny | CORE |
| **Condition** | Kiedy warto? | kiedy zacząć pozycjonowanie zagraniczne | OUTER |
| **Comparison** | SEO zagraniczne vs krajowe | pozycjonowanie zagraniczne vs krajowe różnice | OUTER |
| **Negation** | Czego unikać? | błędy pozycjonowanie zagraniczne automatyczne tłumaczenie | OUTER |

## 3. Query Fanout (z 00_query_fanout.json — Tryb A)

| # | Sub-query | Typ API / Element ramki | Conf | P | Status SERP |
|---|-----------|------------------------|------|---|-------------|
| 1 | jak pozycjonować stronę za granicą | reformulation / Manner | 92% | P1 | [PREDICTED] |
| 2 | SEO dla rynków zagranicznych | specification / Instrument | 90% | P1 | [PREDICTED] |
| 3 | skuteczne pozycjonowanie zagraniczne | implicit / Result | 93% | P1 | [CONFIRMED — SERP #1 tytuł] |
| 4 | agencja SEO pozycjonowanie zagraniczne | implicit / Agent | 91% | P1 | [CONFIRMED — SERP #5 NON.agency] |
| 5 | strategia SEO dla rynków zagranicznych | specification / Instrument | 89% | P1 | [PREDICTED] |
| 6 | pozycjonowanie zagraniczne dla e-commerce | specification / Patient | 89% | P1 | [PREDICTED] |
| 7 | optymalizacja SEO dla różnych krajów | reformulation / Manner | 87% | P1 | [PREDICTED] |
| 8 | pozycjonowanie zagraniczne cennik | follow_up / Quantity | 85% | P1 | [SERP-ONLY gap] |
| 9 | jak zacząć pozycjonowanie zagraniczne | follow_up / Condition | 90% | P1 | [PREDICTED] |
| 10 | pozycjonowanie zagraniczne vs krajowe | comparative / Comparison | 86% | P1 | [PREDICTED] |
| 11 | pozycjonowanie stron w Niemczech / UK / USA | entity_expanded / Location | 88% | P1 | [PREDICTED — niszowe rynki] |
| 12 | międzynarodowe SEO | related / Synonymy | 95% | P1 | [CONFIRMED — SERP tytuły] |

**SERP-ONLY gaps (PAA):**
- "Czy SEO ma jeszcze sens?" → okazja do H2 o ROI/ROAS SEO zagranicznego
- "Ile kosztuje pozycjonowanie stron www?" → powiązane z sekcją cennika
- "Na czym polega SEO?" → FAQ podstawowe

**Top titles z query_fanout (wzorce):**
- Wzorzec tytułów: "Pozycjonowanie zagraniczne — [przymiotnik] SEO" → fraza główna + qualifier
- NON.agency wyróżnia się "Optymalizacja AI" jako unikalny element
- Większość tytułów to oferty usługi, mniej przewodników/artykułów informacyjnych

## 4. Terminologia rozszerzona

| Relacja | Terminy |
|---------|---------|
| **Synonimy CE** | SEO międzynarodowe, SEO zagraniczne, międzynarodowe pozycjonowanie, pozycjonowanie globalne, international SEO |
| **Hiperonimy** | marketing cyfrowy, performance marketing, SEO, pozycjonowanie stron, digital marketing |
| **Hiponimy** | SEO dla Niemiec (DE), SEO dla UK, SEO dla USA, SEO dla Francji, local SEO na rynkach zagranicznych, e-commerce SEO zagraniczne |
| **Meronimy** | hreflang, ccTLD (domeny krajowe), subdomena, podkatalog, link building zagraniczny, native content, keyword research lokalny, Google Search Console geotargeting |
| **Antonimy / kontrasty** | pozycjonowanie krajowe/lokalne, SEO polska, pozycjonowanie lokalne |
| **Related terms** | Core Web Vitals, techniczna optymalizacja SEO, analiza konkurencji zagranicznej, native speaker copywriting, Google Business Profile, SimilarWeb, Ahrefs, Search Console |

## 5. Podsumowanie dla kolejnych kroków

- **CE:** Pozycjonowanie zagraniczne (SEO międzynarodowe)
- **Kluczowe atrybuty do zbadania:** hreflang / struktura domeny (ccTLD vs subdomena vs podkatalog) / link building zagraniczny / keyword research lokalny / native content / analiza rynku / koszty
- **Top 3 sub-queries:** "agencja SEO pozycjonowanie zagraniczne", "jak pozycjonować stronę za granicą", "pozycjonowanie zagraniczne dla e-commerce"
- **Terminy obowiązkowe:** hreflang, ccTLD, link building zagraniczny, native content, analiza rynku, Google Search Console, ROI/ROAS
- **Angle DD:** performance marketing + SEO zagraniczne = synergia (Google Ads + organika na tym samym rynku zagranicznym) — unikalny wyróżnik
