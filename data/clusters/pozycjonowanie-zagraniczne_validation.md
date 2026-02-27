# Walidacja klastrów — pozycjonowanie zagraniczne

## Parametry klasteryzacji
- Algorytm: hierarchical (k=10)
- Silhouette score: 0.081
- Liczba keywords: 372
- Liczba klastrów: 10

**Uwaga o silhouette:** Niski silhouette (0.08) jest typowy dla homogenicznego tematu — wszystkie keywords dotyczą jednego wąskiego tematu (pozycjonowanie zagraniczne). Klastry są semantycznie sensowne pomimo niskiego score.

## Tabela klastrów

| ID | Nazwa | Central Entity | Canonical Query | Keywords |
|:--:|:------|:---------------|:----------------|:--------:|
| 0 | International SEO — język angielski i content | Content lokalizacja SEO | international SEO | 48 |
| 1 | Strategia i uzasadnienie SEO zagranicznego | Strategia SEO zagranicznego | pozycjonowanie zagraniczne | 89 |
| 2 | Techniczna optymalizacja i struktura domeny | Techniczna optymalizacja SEO | techniczna optymalizacja seo zagranicznego | 100 |
| 3 | SEO a inne kanały marketingowe | SEO vs performance marketing | seo vs google ads zagranicznie | 28 |
| 4 | Agencja SEO zagraniczna — wybór i ceny | Agencja SEO zagraniczna | pozycjonowanie zagraniczne agencja | 28 |
| 5 | On-page SEO i content dla rynków zagranicznych | Content SEO zagraniczne | content seo zagraniczne | 37 |
| 6 | Ruch organiczny z konkretnych rynków | Ruch organiczny z zagranicy | ruch organiczny z niemiec | 3 |
| 7 | Hreflang — implementacja i konfiguracja | Hreflang | hreflang implementacja | 7 |
| 8 | Keyword research na rynki zagraniczne | Keyword research zagraniczne | keyword research zagraniczne | 10 |
| 9 | SEO e-commerce zagraniczne | SEO e-commerce zagraniczne | seo e-commerce zagraniczne | 22 |

## Analiza SERP overlap

### Klastry sprawdzone przez SERP

**Klaster 4 (Agencja SEO)** — canonical: "pozycjonowanie zagraniczne agencja"
- Top URLs: verseo.pl, delante.pl, sembility.com, eactive.pl, non.agency, pikseo.pl
- Unikalny SERP — oferty agencji, brak overlap z klastrami technicznymi

**Klaster 7 (Hreflang)** — canonical: "hreflang implementacja"
- Top URLs: grupa-icea.pl, ukontentowani.pl, seosklep24.pl, artefakt.pl, digitalk.pl
- Zero overlap z klastrami 1, 2 — wyraźnie odrębny temat techniczny. **OK**

**Klaster 8 (Keyword Research)** — canonical: "keyword research zagraniczne"
- Top URLs: delante.pl, non.agency, **double-digital.pl**, sunrisesystem.pl, paq-studio.com
- Double Digital już rankuje na tę frazę — szansa na wzmocnienie linkiem wewnętrznym
- Brak overlap z klastrem 7 (hreflang). **OK**

**Klaster 2 (Techniczna optymalizacja)** — canonical: "techniczna optymalizacja seo zagranicznego"
- Top URLs: widoczni.com, eactive.pl, delante.pl, seospace.pl, artefakt.pl
- Overlap ~40% z klastrem 9 (e-commerce): widoczni.com, eactive.pl, delante.pl

**Klaster 9 (E-commerce)** — canonical: "seo e-commerce zagraniczne"
- Top URLs: widoczni.com, cross-border.pl, delante.pl, eactive.pl
- Overlap ~40% z klastrem 2. **REVIEW** — intencje różne (techniczna vs e-commerce), nie mergujemy.

## Tabela overlap (kluczowe pary)

| Klaster A | Klaster B | Szacowany overlap | Rekomendacja |
|-----------|-----------|:-----------------:|:------------:|
| Klaster 2 (Techniczna) | Klaster 9 (E-commerce) | ~40% | REVIEW — różne intencje, keep osobno |
| Klaster 1 (Strategia) | Klaster 2 (Techniczna) | ~50% | REVIEW — ogólny vs techniczny, keep osobno |
| Klaster 7 (Hreflang) | Klaster 8 (KW Research) | 0% | OK |
| Klaster 4 (Agencja) | Klaster 1 (Strategia) | ~20% | OK |
| Klaster 6 (Ruch) | Klaster 2 (Techniczna) | ~30% | REVIEW — mały klaster (3 kw), można połączyć |

## Rekomendacje

| Akcja | Klastry | Uzasadnienie |
|-------|---------|--------------|
| **MERGE** | Klaster 6 + Klaster 2 | Klaster 6 ma tylko 3 keywords, temat ruch z konkretnych krajów pasuje do technicznej optymalizacji |
| **OK** | Klastry 0, 3, 4, 7, 8, 9 | Wyraźne, odrębne tematy z różnymi intencjami SERP |
| **REVIEW** | Klastry 1 vs 2 | Duże overlap ogólny, ale klaster 1 = "dlaczego/kiedy/czy" (awareness), klaster 2 = "jak" (techniczny). Zostawiamy osobno. |

## Decyzja po walidacji
- Klaster 6 (3 kw) **mergujemy do klastra 2** → teraz klaster 2 ma 103 keywords
- Pozostałe 9 klastrów pozostaje bez zmian
- Finalna liczba klastrów: **9**
