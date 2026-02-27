# Topic Research: Audyt SEO

## 1. CSI Definition

| Element | Wartość |
|---------|---------|
| CE | Audyt SEO |
| SC | Double Digital — polska agencja performance marketingu (Google Partner, 25+ krajów). Specjalizacja: Google Ads, Meta Ads, SEO AI, GA4/BigQuery, CRO. Perspektywa eksperta: data-driven, mierzalne wyniki, e-commerce + B2B. |
| CSI | Zrozumienie czym jest audyt SEO, co obejmuje, ile kosztuje i jak go przeprowadzić — z perspektywy agencji dostarczającej mierzalne wyniki dla e-commerce i B2B |
| Predykaty | przeprowadzić, zlecić, ocenić, naprawić, poprawić |

**SERP landscape (top_titles):** Tytuły dominujące w SERP to "darmowy audyt SEO" i "kompleksowy audyt SEO" — sygnał, że SERP jest zdominowany przez oferty usługowe (lead gen). DD może wyróżnić się merytorycznym, edukacyjnym podejściem z perspektywy eksperta — co audyt powinien zawierać, jak go ocenić i kiedy warto go zlecić profesjonalnie.

## 2. Ramka semantyczna

| Element | Definicja | Sub-query | Priorytet |
|---------|-----------|-----------|-----------|
| Agent | Kto przeprowadza audyt SEO? | "kto robi audyt SEO — agencja czy samodzielnie" | CORE |
| Patient | Czego dotyczy audyt — strona, sklep, B2B? | "audyt SEO strony internetowej / sklepu" | CORE |
| Instrument | Narzędzia do audytu SEO | "narzędzia do audytu SEO — Screaming Frog, Ahrefs, Semrush" | CORE |
| Purpose | Po co przeprowadzać audyt SEO? | "po co audyt SEO — korzyści" | CORE |
| Cause | Co powoduje konieczność audytu? | "kiedy potrzebny audyt SEO — spadki pozycji, nowa strona" | CORE |
| Result | Jakie efekty daje audyt SEO? | "co zyska firma po audycie SEO" | CORE |
| Location | Audyt lokalny vs zdalny / rynek | "audyt SEO dla rynku zagranicznego" | OUTER |
| Time | Kiedy i jak często robić audyt SEO? | "jak często audyt SEO — raz w roku czy częściej" | CORE |
| Manner | Jak przebiega audyt SEO krok po kroku? | "jak przeprowadzić audyt SEO — metodologia" | CORE |
| Beneficiary | Dla kogo audyt SEO? (e-commerce, B2B, małe firmy) | "audyt SEO dla e-commerce / sklepu / B2B" | CORE |
| Source | Skąd dane do audytu? | "audyt SEO — dane z Google Search Console, Analytics" | OUTER |
| Quantity | Koszt i zakres audytu SEO | "audyt SEO cena — ile kosztuje" | CORE |
| Condition | Audyt po migracji, po karze Google | "audyt SEO po migracji strony / po karze Google" | OUTER |
| Comparison | Audyt SEO vs analiza konkurencji / vs monitoring | "audyt SEO vs analiza konkurencji — różnice" | OUTER |
| Negation | Co audyt SEO NIE obejmuje / błędy | "co audyt SEO nie zawiera — typowe błędy w audycie" | OUTER |

## 3. Query Fanout

| # | Sub-query | Typ API / Element ramki | Conf | P | Pokrycie |
|---|-----------|------------------------|------|---|----------|
| 1 | darmowy audyt SEO | implicit / Purpose | 95% | P1 | Do pokrycia (kontekst: kiedy darmowy, kiedy płatny) |
| 2 | audyt SEO cena | implicit / Quantity | 92% | P1 | Do pokrycia (zakres cenowy, co wpływa na cenę) |
| 3 | co zawiera audyt SEO | implicit / Manner | 89% | P1 | Do pokrycia (lista elementów audytu) |
| 4 | jak przeprowadzić audyt SEO strony | reformulation / Manner | 90% | P1 | Do pokrycia (metodologia krok po kroku) |
| 5 | jak poprawić wyniki po audycie SEO | entailment / Result | 89% | P1 | Do pokrycia (wdrożenie rekomendacji) |
| 6 | narzędzia do audytu SEO | related / Instrument | 88% | P1 | Do pokrycia (top narzędzia z opisem) |
| 7 | audyt SEO techniczny | specification / Instrument | 88% | P1 | Do pokrycia (crawl, indeksacja, Core Web Vitals) |
| 8 | audyt SEO on-page | specification / Patient | 88% | P1 | Do pokrycia (treść, meta tagi, struktura) |
| 9 | audyt SEO dla sklepu internetowego | specification / Beneficiary | 87% | P1 | Do pokrycia (e-commerce specifics) |
| 10 | audyt SEO dla strony B2B | specification / Beneficiary | 86% | P1 | Do pokrycia (lead gen specifics) |
| 11 | audyt SEO off-page | specification / Patient | 87% | P1 | Do pokrycia (linki zewnętrzne, autorytet) |
| 12 | raport z audytu SEO | related / Result | 85% | P2 | Jak wygląda raport, co powinien zawierać |
| 13 | audyt SEO dla małych firm | specification / Beneficiary | 87% | P2 | SMB perspective |
| 14 | audyt SEO vs analiza konkurencji | comparative / Comparison | 85% | P2 | Różnice, kiedy co wybrać |
| 15 | jak często audyt SEO | (własny) / Time | — | P2 | Regularność audytu |

## 4. Terminologia rozszerzona

| Relacja | Terminy |
|---------|---------|
| Synonimy | analiza SEO, ocena strony SEO, przegląd SEO, health check SEO, inspekcja SEO |
| Hiperonimy | analiza strony internetowej, optymalizacja strony, strategie SEO, działania marketingowe |
| Hiponimy | audyt techniczny SEO, audyt on-page, audyt off-page, audyt treści, audyt UX SEO, audyt lokalny SEO |
| Meronimy | analiza crawlability, analiza indeksacji, sprawdzenie Core Web Vitals, analiza linków wewnętrznych, analiza profilu backlinków, analiza meta tagów, analiza struktury URL, analiza sitemap, analiza robots.txt |
| Antonimy / kontrasty | brak optymalizacji, ignorowanie błędów SEO, przypadkowe działania SEO |
| Related terms | Screaming Frog, Ahrefs, Semrush, Google Search Console, Google Analytics 4, PageSpeed Insights, Majestic, Moz, crawl budget, indeksacja, Core Web Vitals, CWV, canonical, hreflang, schema.org, robots.txt, sitemap.xml, anchor text, Domain Rating, Page Authority, bounce rate, CTR, organic traffic |

## 5. Podsumowanie dla kolejnych kroków

- **CE:** Audyt SEO
- **Kluczowe atrybuty do zbadania:** zakres audytu (tech/on-page/off-page), metodologia, narzędzia, cena, wdrożenie rekomendacji, e-commerce specifics, B2B specifics
- **Top 3 sub-queries:** "co zawiera audyt SEO", "jak przeprowadzić audyt SEO", "audyt SEO cena"
- **Terminy obowiązkowe:** Core Web Vitals, crawlability, indeksacja, backlinki, Domain Rating, robots.txt, sitemap, meta tagi, Screaming Frog, Google Search Console
