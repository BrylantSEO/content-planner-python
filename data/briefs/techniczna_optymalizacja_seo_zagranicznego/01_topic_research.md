# Topic Research: Techniczna optymalizacja SEO zagranicznego

## 1. CSI Definition

| Element | Wartość |
|---------|---------|
| CE | Techniczna optymalizacja SEO zagranicznego |
| SC | Double Digital — agencja performance marketingu dla e-commerce i leadgen B2B, 25+ krajów, Google Partner |
| CSI | Właściciel e-commerce lub marketer B2B chce zrozumieć, jak technicznie skonfigurować stronę pod SEO na rynkach zagranicznych (ccTLD, hreflang, geotargeting, CWV), żeby nie tracić budżetu na ekspansji przez błędy konfiguracyjne |
| Predykaty | skonfigurować, wdrożyć, sprawdzić, zoptymalizować, unikać błędów |

## 2. Ramka semantyczna

| Element | Definicja | Sub-query | Priorytet |
|---------|-----------|-----------|-----------|
| Agent | Kto wdraża? | "agencja SEO zagraniczna vs in-house" | OUTER |
| Patient | Na co wpływa? | "widoczność strony na rynkach zagranicznych" | CORE |
| Instrument | Narzędzia i tagi | "hreflang implementacja", "hreflang checker" | CORE |
| Purpose | Po co optymalizować technicznie? | "jak techniczna optymalizacja wpływa na ranking zagraniczny" | CORE |
| Cause | Błędy techniczne powodują | "błędy hreflang skutki", "kanibalizacja treści zagranicznych" | CORE |
| Result | Efekt optymalizacji | "wzrost widoczności na google.de google.co.uk" | CORE |
| Location | Gdzie konfigurować? | "geotargeting Google Search Console", "serwer CDN lokalizacja" | CORE |
| Time | Kiedy wdrożyć? | "przed wejściem na rynek zagraniczny checklist" | CORE |
| Manner | Jak? | "jak wdrożyć hreflang krok po kroku", "ccTLD vs subdomena vs katalog" | CORE |
| Beneficiary | Dla kogo? | "e-commerce ekspansja zagraniczna", "sklep wielojęzyczny SEO" | CORE |
| Source | Skąd wytyczne? | "Google Search Console geotargeting", "Google wytyczne hreflang" | OUTER |
| Quantity | Ile? | "Core Web Vitals progi LCP FID CLS", "czas ładowania strona zagraniczna" | CORE |
| Condition | Pod jakim warunkiem? | "kiedy ccTLD opłaca się zamiast subdomeny", "hreflang kiedy wymagany" | CORE |
| Comparison | Vs alternatywy | "ccTLD vs subdomena vs podkatalog porównanie" | CORE |
| Negation | Czego NIE robić | "błędy hreflang automatyczne przekierowanie IP" | CORE |

## 3. Query Fanout (z 00_query_fanout.json + SERP grounding)

| # | Sub-query | Typ API / Element ramki | Conf | P | Pokrycie SERP |
|---|-----------|------------------------|------|---|---------------|
| 1 | optymalizacja techniczna SEO dla rynków zagranicznych | reformulation / Synonimy | 92% | P1 | [CONFIRMED] — top titles |
| 2 | jak poprawić techniczne SEO strony na rynki zagraniczne | implicit / Purpose | 88% | P1 | [CONFIRMED] — PAA |
| 3 | strategia technicznego SEO dla ekspansji zagranicznej | specification / Condition | 87% | P1 | [CONFIRMED] — organic |
| 4 | techniczne SEO dla stron wielojęzycznych | specification / Instrument | 88% | P1 | [CONFIRMED] — organic |
| 5 | ccTLD vs subdomena vs katalog porównanie | specification / Comparison | 86% | P1 | [CONFIRMED] — wszyscy konkurenci |
| 6 | hreflang implementacja krok po kroku | specification / Manner | 85% | P1 | [CONFIRMED] — Semidea, Eactive |
| 7 | optymalizacja szybkości ładowania stron zagranicznych | specification / Quantity | 91% | P1 | [CONFIRMED] — Widoczni |
| 8 | geotargeting Google Search Console konfiguracja | follow_up / Location | 87% | P1 | [PREDICTED] — brak w top 10 |
| 9 | narzędzia do technicznej optymalizacji SEO zagranicznego | follow_up / Instrument | 84% | P2 | [PREDICTED] |
| 10 | błędy hreflang jak sprawdzić i naprawić | implicit / Cause | 85% | P1 | [PREDICTED] — gap |

**[SERP-ONLY] pytania z PAA:**
- "Jak przeprowadzić SEO w różnych krajach?" → GAP P1
- "Czy techniczne SEO jest trudne?" → FAQ

## 4. Terminologia rozszerzona

| Relacja | Terminy |
|---------|---------|
| Synonimy CE | International SEO, SEO techniczne zagraniczne, techniczne pozycjonowanie zagraniczne, SEO wielojęzyczne |
| Hiperonimy | pozycjonowanie zagraniczne, International SEO, SEO, digital marketing |
| Hiponimy | hreflang implementation, geotargeting, ccTLD SEO, multilingual SEO, CDN optimization |
| Meronimy | tag hreflang, x-default, canonical URL, robots.txt, XML sitemap, Core Web Vitals (LCP, CLS, FID/INP) |
| Antonimy / kontrasty | automatyczne przekierowanie IP (błąd), single-market SEO, lokalne SEO |
| Related terms | Google Search Console, PageSpeed Insights, CDN, hreflang checker, schema.org LocalBusiness, NAP, struktury URL, ccTLD |

## 5. Podsumowanie dla kolejnych kroków

- **CE:** Techniczna optymalizacja SEO zagranicznego
- **Kluczowe atrybuty do zbadania:** struktura domeny (ccTLD/subdomena/katalog), hreflang implementacja, geotargeting GSC, Core Web Vitals per rynek, CDN, robots.txt/sitemap wielojęzyczna
- **Top 3 sub-queries:** ccTLD vs subdomena vs katalog | hreflang krok po kroku | geotargeting GSC konfiguracja
- **Terminy obowiązkowe:** hreflang, ccTLD, x-default, geotargeting, Core Web Vitals, LCP, GSC, CDN, canonical, robots.txt, sitemap
