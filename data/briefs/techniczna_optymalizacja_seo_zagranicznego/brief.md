# Content Brief: Techniczna optymalizacja SEO zagranicznego

**Data:** 2026-02-26
**Pipeline:** topic-researcher → competitor-gap-analyzer → contextual-vector-builder → content-brief-generator
**CE:** Techniczna optymalizacja SEO zagranicznego | **SC:** Double Digital — agencja performance marketingu, 25+ krajów | **CSI:** Właściciel e-commerce / marketer B2B chce technicznie skonfigurować stronę pod SEO zagraniczne i nie tracić budżetu na błędach konfiguracyjnych

---

## Analiza istniejących treści DD (Supabase)

### Ryzyko kanibalizacji

| URL | Similarity | Uwaga |
|-----|-----------|-------|
| /blog/audyt-techniczny-strony-i-eliminacja-bledow-ktore-szkodza-twojemu-seo/ | ~1.00 (proxy) | PARTIAL OVERLAP — skupiony na krajowym SEO. Nowy artykuł musi fokusować się na zagranicznym kontekście. Linkuj do niego jako "bazowy audyt przed ekspansją". |
| /blog/szybkosc-ladowania-strony-a-parametry-core-web-vitals/ | 0.904 | Internal link, NIE duplikuj — odsyłaj anchor "Core Web Vitals" |

### Propozycje internal linkingu

| URL docelowy | Anchor text | Sekcja w artykule |
|--------------|-------------|-------------------|
| /blog/audyt-techniczny-strony-i-eliminacja-bledow-ktore-szkodza-twojemu-seo/ | "bazowy audyt techniczny SEO" | H2: Audyt przed ekspansją |
| /blog/szybkosc-ladowania-strony-a-parametry-core-web-vitals/ | "Core Web Vitals" | H2: Page Speed per rynek |
| /blog/pagespeed-insights-co-to-jest-i-jak-uzywac/ | "PageSpeed Insights" | H2: Page Speed per rynek |
| /blog/co-to-jest-przekierowanie-301/ | "przekierowania 301" | H3: migracja / błędy hreflang |
| /blog/konstrukcja-adresow-url-w-jaki-sposob-tworzyc-przyjazne-adresy-url/ | "struktura URL" | H2: Struktura domeny |
| /blog/linkowanie-zewnetrzne-czy-ma-coraz-mniejszy-wplyw-na-pozycjonowanie/ | "linkbuilding zagraniczny" | H2: Link building (wzmianka) |

### Strategia odróżnienia od istniejących treści

Artykuł MUSI:
1. Fokusować się wyłącznie na zagranicznym kontekście — hreflang, ccTLD, geotargeting GSC, wielojęzyczność
2. Mieć format checklisty technicznej krok po kroku (brak takiego formatu u konkurencji i w DD)
3. Podawać konkretne rynki: Niemcy (.de), UK (.co.uk), USA z przykładami kodu
4. Linkować do /blog/audyt-techniczny-strony/ jako "bazowy krok przed ekspansją"

---

## Dane Senuto

| Keyword | Vol. | CPC | Priorytet |
|---------|------|-----|-----------|
| hreflangs | 390 | 2,41 PLN | Wysoki — pokryj jako termin techniczny |
| hreflang | 320 | 1,53 PLN | Wysoki — primary technical term |
| pozycjonowanie zagraniczne | 90 | 17,64 PLN | Wysoki — secondary |
| hreflang checker | 70 | 0 PLN | Średni — w sekcji narzędzi |
| pozycjonowanie stron za granicą | 50 | 22,89 PLN | Wysoki CPC |
| pozycjonowanie za granicą | 40 | 19,10 PLN | Wysoki CPC |
| hreflang tags / hreflang tag | 40 | 0 PLN | W sekcji technicznej |
| html meta language | 20 | 0 PLN | Kontekstowy |
| canonical and hreflang | 10 | 0 PLN | H3 o konflikcie |

**Pozycje DD:** Brak — zielone pole, pełna szansa na zbudowanie pozycji od zera.

---

## Pytania użytkowników (FAQ)

Pytania z PAA SERP + ramki semantycznej (Senuto — brak wyników dla tej niszy):

1. Jak przeprowadzić SEO w różnych krajach? *(PAA)*
2. Czy techniczne SEO jest trudne? *(PAA)*
3. Ile kosztuje optymalizacja SEO zagranicznego? *(PAA)*
4. Kiedy stosować hreflang, a kiedy canonical?
5. Czy subdomena niszczy moc domeny głównej?
6. Co się stanie, jeśli nie skonfiguruje hreflang?
7. Jak długo trwa efekt technicznej optymalizacji SEO zagranicznego?
8. Jakie narzędzia do sprawdzenia błędów hreflang?

---

## 1. CSI & Fundamenty

| Element | Wartość |
|---------|---------|
| CE | Techniczna optymalizacja SEO zagranicznego |
| SC | Double Digital — agencja performance marketingu (Google Partner, 25+ krajów, od 2022) |
| CSI | Właściciel e-commerce lub marketer B2B chce technicznie skonfigurować stronę pod SEO na rynkach zagranicznych — ccTLD, hreflang, geotargeting — żeby nie tracić budżetu na ekspansji przez błędy konfiguracyjne |
| Predykaty | skonfigurować, wdrożyć, sprawdzić, zoptymalizować, unikać błędów |
| Canonical query | techniczna optymalizacja SEO zagranicznego |
| URL docelowy | /blog/techniczna-optymalizacja-seo-zagraniczne/ |
| Format | Poradnik z checklistą + H2 "jak" (featured snippet) |

### Ramka semantyczna (priorytetyzowana)

**CORE (bezpośrednio związane z SC):**

| Element | Sub-query kluczowe |
|---------|--------------------|
| Instrument / Narzędzia | hreflang implementacja, hreflang checker, ccTLD, GSC geotargeting |
| Manner / Jak | hreflang krok po kroku, ccTLD vs subdomena vs katalog |
| Cause / Błędy | błędy hreflang, kanibalizacja treści zagranicznych, automatyczne przekierowania IP |
| Result / Efekt | wzrost widoczności google.de google.co.uk |
| Location / Gdzie | geotargeting Google Search Console, lokalizacja serwera CDN |
| Quantity / Ile | Core Web Vitals progi LCP FID CLS, czas ładowania |
| Condition / Kiedy | kiedy ccTLD opłaca się, kiedy hreflang wymagany |
| Comparison | ccTLD vs subdomena vs podkatalog porównanie |
| Negation | błędy hreflang, automatyczne przekierowanie IP |

**OUTER (kontekstowe):**

| Element | Sub-query kluczowe |
|---------|--------------------|
| Agent | agencja SEO vs in-house |
| Source | Google wytyczne hreflang, GSC dokumentacja |
| Time | przed wejściem na rynek zagraniczny — checklist |
| Beneficiary | e-commerce ekspansja zagraniczna, sklep wielojęzyczny |

---

## 2. EAV Matrix & Klasyfikacja URR

| Atrybut | Typ URR | K1 | K2 | K3 | K4 | K5 | K6 | K7 | K8 | K9 | K10 | Pokrycie |
|---------|---------|----|----|----|----|----|----|----|----|----|----|----------|
| Analiza słów kluczowych per rynek | ROOT | ✓ | ✓ | ✓ | ✓ | ✓ | ✓ | ✓ | ✓ | ✓ | ✓ | 10/10 |
| Tłumaczenia / lokalizacja treści | ROOT | ✓ | ✓ | ✓ | ✓ | ✓ | ✓ | ✓ | ✓ | ✓ | ✓ | 10/10 |
| Analiza rynku i konkurencji zagranicznej | ROOT | ✓ | ✓ | ✓ | ✓ | ✓ | ✓ | ✓ | ✓ | ✓ | ✓ | 10/10 |
| Link building lokalny (zagraniczne domeny) | ROOT | ✓ | ✓ | ✓ | ✓ | ✓ | ✓ | ✓ | ✓ | — | ✓ | 9/10 |
| Monitoring i raportowanie per kraj | ROOT | ✓ | ✓ | ✓ | — | ✓ | ✓ | — | ✓ | — | ✓ | 7/10 |
| Audyt techniczny SEO przed ekspansją | ROOT | ✓ | ✓ | — | ✓ | — | — | — | ✓ | ✓ | ✓ | 6/10 |
| Implementacja tagów hreflang | ROOT | ✓ | ✓ | — | ✓ | — | — | ✓ | — | — | ✓ | 5/10 |
| Struktura domeny (ccTLD / subdomena / katalog) | ROOT | ✓ | ✓ | — | ✓ | — | — | ✓ | — | — | ✓ | 5/10 |
| Struktura URL per język/kraj | RARE | ✓ | ✓ | — | ✓ | — | — | ✓ | — | — | ✓ | 5/10 |
| Core Web Vitals / Page Speed per rynek | RARE | ✓ | ✓ | — | ✓ | — | — | — | — | — | — | 3/10 |
| Robots.txt i sitemap wielojęzyczna | RARE | — | ✓ | — | ✓ | — | — | ✓ | — | — | — | 3/10 |
| Wybór rynku docelowego (ROI analiza) | RARE | — | — | — | — | — | — | — | ✓ | ✓ | ✓ | 3/10 |
| Geotargeting w Google Search Console | UNIQUE | ✓ | — | — | — | — | — | — | — | — | — | 1/10 |
| CDN i lokalizacja serwera | UNIQUE | ✓ | — | — | — | — | — | — | — | — | — | 1/10 |
| Duplikacja treści / canonical tag | UNIQUE | ✓ | — | — | — | — | — | — | — | — | — | 1/10 |
| Unikanie automatycznych przekierowań IP | UNIQUE | ✓ | — | — | — | — | — | — | — | — | — | 1/10 |
| Google Moja Firma / NAP lokalne | UNIQUE | — | ✓ | — | — | — | — | — | — | — | — | 1/10 |
| Checklist techniczna step-by-step | UNIQUE | — | — | — | — | — | — | — | — | — | — | 0/10 |
| KPI i metryki ROI per rynek | UNIQUE | — | — | — | — | — | — | — | ✓ | — | — | 1/10 |
| Błędy hreflang typowe + naprawa | UNIQUE | — | — | — | — | — | — | — | — | — | — | 0/10 |
| Case study konkretny rynek (DE, UK) | UNIQUE | — | — | — | — | — | — | — | — | — | — | 0/10 |
| Specyfika wyszukiwarek per kraj | RARE | — | — | ✓ | — | — | — | — | — | — | — | 1/10 |

**Podsumowanie URR:**
- ROOT: 8 atrybutów (obowiązkowe w artykule)
- RARE: 5 atrybutów (opcjonalne / H3 / FAQ)
- UNIQUE: 9 atrybutów — potencjalne wyróżniki DD

---

## 3. Content Gaps & Priorytety

### P1 — Krytyczne (musisz pokryć — brak = strata rankingu)

| Gap | Pokrycie u konkurencji | Format |
|-----|----------------------|--------|
| Checklist techniczna SEO zagranicznego krok po kroku | 0/10 | H2 + tabela/checkboxy |
| Błędy hreflang typowe + jak naprawić narzędziami | 0/10 | H3 pod hreflang |
| Geotargeting GSC — konfiguracja krok po kroku | 1/10 | H2 z workflow |
| Automatyczne przekierowania IP — dlaczego to błąd | 1/10 | H3 pod hreflang |

### P2 — Wysokie

| Gap | Pokrycie | Format |
|-----|---------|--------|
| CDN i lokalizacja serwera a LCP za granicą | 1/10 | H3 pod Page Speed |
| Core Web Vitals per rynek — różne wartości | 3/10 | H3 pod Page Speed |
| KPI i ROI technicznego SEO zagranicznego | 1/10 | H2 końcowy |
| Duplikacja treści + canonical w wersjach językowych | 1/10 | H3 pod hreflang |

### P3 — Średnie

| Gap | Pokrycie | Format |
|-----|---------|--------|
| Robots.txt i sitemap wielojęzyczna | 3/10 | H2 krótki |
| Specyfika wyszukiwarek per kraj | 1/10 | FAQ |

### P4 — Niskie

| Gap | Format |
|-----|--------|
| Google Moja Firma / NAP lokalne zagraniczne | Wzmianka w FAQ |

### UNIQUE Opportunities

| Atrybut UNIQUE | Dlaczego szansa |
|----------------|-----------------|
| Checklist techniczna | 0/10 — absolutna luka, wszystkie landing pages agencji, żadnego artykułu poradnikowego |
| Błędy hreflang + naprawa | 0/10 — diagnostyczny gap, wysokie zapotrzebowanie w PAA |
| Geotargeting GSC workflow | 1/10 — nikt nie opisuje procesu krok po kroku |
| Case study DE/UK (perspektywa DD) | 0/10 — angle unikalna dla agencji z doświadczeniem 25+ krajów |

---

## 4. Struktura artykułu (Contextual Vector)

### Spis nagłówków

```
H1: Techniczna optymalizacja SEO zagranicznego: kompletna checklist dla e-commerce [ccTLD, hreflang, GSC]

  Lead BLUF (3 zdania, max 50 słów)

  H2: Od czego zacząć — audyt techniczny przed wejściem na rynek zagraniczny
    H3: Checklist przedstartowa (10 punktów)

  H2: Struktura domeny — ccTLD vs subdomena vs podkatalog: co wybrać?
    H3: Kiedy ccTLD (.de, .co.uk) to jedyna słuszna decyzja
    H3: Subdomena vs podkatalog — wady, zalety, pułapki

  H2: Implementacja hreflang — jak zrobić to poprawnie krok po kroku
    H3: Typowe błędy hreflang i jak je wykryć narzędziami
    H3: Hreflang a canonical i x-default — co ważniejsze?

  H2: Geotargeting w Google Search Console — konfiguracja
    H3: Jak ustawić geotargeting dla subdomeny i katalogu

  H2: Page Speed i Core Web Vitals per rynek zagraniczny
    H3: CDN — jak lokalizacja serwera wpływa na LCP za granicą

  H2: Robots.txt i XML sitemap dla wersji wielojęzycznych

  H2: Jak mierzyć wyniki techniczne SEO zagranicznego — KPI i raportowanie

  H2: FAQ — Pytania i odpowiedzi
```

---

### Szczegóły nagłówków (BLUF + wytyczne dla copywritera)

---

#### H1

**Techniczna optymalizacja SEO zagranicznego: kompletna checklist dla e-commerce [ccTLD, hreflang, GSC]**

---

#### Lead BLUF (3 zdania, max 50 słów)

Techniczna optymalizacja SEO zagranicznego to konfiguracja struktury domeny, tagów hreflang i geotargetingu w GSC, która decyduje, czy Google pokaże Twoją stronę właściwym użytkownikom za granicą. Większość e-commerce traci widoczność nie przez brak treści, ale przez błędy techniczne — niepoprawny hreflang lub brak x-default. Ten artykuł to krok po kroku checklist sprawdzona przez Double Digital na 25+ rynkach.

---

#### H2: Od czego zacząć — audyt techniczny przed wejściem na rynek zagraniczny

**BLUF:** Techniczna optymalizacja SEO zagranicznego zaczyna się od audytu obecnej strony — zanim wydasz budżet na ekspansję, musisz wiedzieć, czy Twoja witryna spełnia techniczne minimum.

**Wytyczne (~300 słów):**
- Wyjaśnij, dlaczego audyt to krok zero (nie opcja), zanim zainwestujesz w ekspansję
- Wymień 8-10 kluczowych punktów do sprawdzenia: szybkość ładowania, CWV, crawlability, obecne błędy canonicala, duplikaty, istniejące hreflang (lub ich brak), sitemap, GSC coverage, GA4 segmenty geo
- Format: checkboxy lub tabela Tak/Nie/Do poprawy
- **Internal link:** anchor "bazowy audyt techniczny SEO" → /blog/audyt-techniczny-strony-i-eliminacja-bledow-ktore-szkodza-twojemu-seo/
- Terminy obowiązkowe: audyt techniczny, crawlability, Core Web Vitals, indeksacja, coverage

##### H3: Checklist przedstartowa (10 punktów)

**Wytyczne (~200 słów):**
- Tabela lub lista numerowana: 10 punktów kontrolnych przed ekspansją zagraniczną
- Każdy punkt: co sprawdzić + narzędzie (GSC, PageSpeed Insights, Screaming Frog, itp.)
- Skala priorytetu: Krytyczne / Ważne / Opcjonalne

---

#### H2: Struktura domeny — ccTLD vs subdomena vs podkatalog: co wybrać?

**BLUF:** Wybór między ccTLD (.de), subdomeną (de.domena.com) a podkatalogiem (domena.com/de) to jedna z najważniejszych decyzji technicznych — wpływa na geotargeting, moc SEO i koszty utrzymania.

**Wytyczne (~450 słów):**
- Tabela porównawcza 3 opcji (kolumny): geotargeting, authority, koszty wdrożenia, trudność, zalety, wady
- ccTLD: jednoznaczne geotargeting, wyższe zaufanie lokalne, wymaga oddzielnego link buildingu
- Subdomena: szybsze wdrożenie, można używać geotargetingu GSC, ryzyko kary dla całej domeny
- Podkatalog: jeden autorytet domeny, trudniejszy geotargeting dla Google, ryzyko kary globalnej
- **Rekomendacja Double Digital:** e-commerce → ccTLD dla DE i UK, podkatalog dla mniejszych rynków (podaj uzasadnienie z doświadczenia agencji)
- Terminy obowiązkowe: ccTLD, country code TLD, subdomena, podkatalog, geotargeting, authority domeny, DR

##### H3: Kiedy ccTLD (.de, .co.uk) to jedyna słuszna decyzja

**Wytyczne (~200 słów):**
- Kryteria wyboru ccTLD: e-commerce premium, rynek z wysokim zaufaniem do lokalnych domen (DE, AT, UK), duże budżety na link building, długoterminowa strategia
- Przykład: sklep B2B w Niemczech — Niemcy preferują .de, trust jest kluczowy

##### H3: Subdomena vs podkatalog — wady, zalety, pułapki

**Wytyczne (~200 słów):**
- Tabela: subdomena vs podkatalog — kiedy co wybrać
- Typowe pułapki: split autorytetu przy subdomenie, błędna interpretacja katalogu przez Googlebot
- **Internal link:** anchor "struktura URL" → /blog/konstrukcja-adresow-url-w-jaki-sposob-tworzyc-przyjazne-adresy-url/

---

#### H2: Implementacja hreflang — jak zrobić to poprawnie krok po kroku

**BLUF:** Tag hreflang informuje Google, która wersja językowa strony ma być pokazywana użytkownikom w danym kraju — błędna implementacja powoduje, że polska wersja wyświetla się na google.de.

**Wytyczne (~500 słów):**
- Co to hreflang i dlaczego to fundament technicznej optymalizacji SEO zagranicznego
- 3 miejsca implementacji: `<head>` HTML, sitemap XML, nagłówki HTTP — kiedy co stosować
- Krok 1: Zidentyfikuj wszystkie wersje językowe strony
- Krok 2: Wygeneruj atrybuty hreflang (format: `lang-COUNTRY`, np. `de`, `en-gb`, `en-us`)
- Krok 3: Dodaj x-default dla wersji fallback (bez konkretnego kraju)
- Krok 4: Weryfikacja (hreflang checker, GSC → Raport hreflang)
- **Blok kodu:**
  ```html
  <link rel="alternate" hreflang="pl" href="https://example.com/pl/"/>
  <link rel="alternate" hreflang="de" href="https://example.de/"/>
  <link rel="alternate" hreflang="en-gb" href="https://example.co.uk/"/>
  <link rel="alternate" hreflang="x-default" href="https://example.com/"/>
  ```
- Tabela: rynek → kod hreflang → przykład URL
- Terminy obowiązkowe: hreflang, x-default, link rel alternate, hreflang checker, international SEO, hreflangs

##### H3: Typowe błędy hreflang i jak je wykryć narzędziami

**Wytyczne (~300 słów):**
- Lista 5 typowych błędów (każdy z wyjaśnieniem + jak naprawić):
  1. Brak x-default → strona bez języka domyślnego (Google wybiera losowo)
  2. Niesymetryczny hreflang — A wskazuje na B, ale B nie wskazuje na A
  3. Hreflang na stronach z błędem 404 lub po przekierowaniu 301
  4. Canonical konflikuje z hreflang (canonical wskazuje inną stronę niż hreflang)
  5. Automatyczne przekierowanie po IP — narzuca użytkownikowi wersję bez możliwości wyboru
- Narzędzia: Google Search Console (raport hreflang), Screaming Frog (hreflang tab), hreflang.online
- **Internal link:** anchor "przekierowania 301" → /blog/co-to-jest-przekierowanie-301/
- Bold na nazwach błędów

##### H3: Hreflang a canonical i x-default — co ważniejsze?

**Wytyczne (~200 słów):**
- Hierarchia sygnałów: canonical > hreflang w przypadku konfliktu (Google preferuje canonical)
- Najlepsze praktyki: canonical wskazuje sam na siebie (self-referencing canonical), hreflang uzupełnia
- Kiedy x-default: strona globalna, brak dedykowanej wersji językowej, strona główna

---

#### H2: Geotargeting w Google Search Console — konfiguracja

**BLUF:** Geotargeting w Google Search Console pozwala wskazać Google docelowy kraj dla subdomeny lub katalogu — bez tej konfiguracji Google sam zgaduje kierowanie i często się myli.

**Wytyczne (~400 słów):**
- Co to geotargeting w GSC i kiedy go ustawić: ccTLD nie wymaga (Google sam rozpoznaje), subdomena i katalog — wymagane
- Krok po kroku: Właściwość GSC → Ustawienia → Kraj docelowy → wybierz kraj → Zapisz
- Ważna uwaga: geotargeting to uzupełnienie hreflang, nie zamiennik
- Tabela: typ struktury domeny → czy ustawić geotargeting
  - ccTLD (.de): Nie potrzeba
  - Subdomena (de.domena.com): Tak — ustaw
  - Katalog (domena.com/de): Tak — ustaw
- Weryfikacja: GSC → Wydajność → filtr kraju → sprawdź CTR i kliknięcia z docelowego rynku
- Terminy obowiązkowe: geotargeting, Google Search Console, właściwość GSC, International Targeting

##### H3: Jak ustawić geotargeting dla subdomeny i katalogu

**Wytyczne (~200 słów):**
- Dokładny workflow z interfejsem GSC (opis kroków)
- Dla subdomeny: osobna właściwość GSC per subdomena, ustawienie kraju
- Dla katalogu: właściwość domeny głównej (Domain property) + prefiks URL jako osobna właściwość

---

#### H2: Page Speed i Core Web Vitals per rynek zagraniczny

**BLUF:** Strona ładująca się w 2 sekundy w Polsce może osiągać 5+ sekund w Niemczech — fizyczna odległość od serwera bezpośrednio wpływa na LCP i ranking w lokalnym Google.

**Wytyczne (~400 słów):**
- Dlaczego CWV różnią się per rynek — latency fizyczne, lokalizacja serwera, CDN
- Progi Core Web Vitals (bold):
  - **LCP:** <2,5 s (dobry), 2,5–4 s (wymaga poprawy), >4 s (słaby)
  - **CLS:** <0,1 (dobry), 0,1–0,25 (wymaga poprawy), >0,25 (słaby)
  - **INP:** <200 ms (dobry), 200–500 ms (wymaga poprawy), >500 ms (słaby)
- Jak sprawdzić CWV per kraj: PageSpeed Insights (wklej URL zagranicznej wersji), GSC → Core Web Vitals per właściwość
- Quick wins: kompresja obrazów AVIF/WebP, lazy loading, minimize/defer JS, reduce server response time
- **Internal link:** anchor "Core Web Vitals" → /blog/szybkosc-ladowania-strony-a-parametry-core-web-vitals/
- **Internal link:** anchor "PageSpeed Insights" → /blog/pagespeed-insights-co-to-jest-i-jak-uzywac/
- Terminy obowiązkowe: LCP, CLS, INP, Core Web Vitals, PageSpeed Insights, latency, server response time

##### H3: CDN — jak lokalizacja serwera wpływa na LCP za granicą

**Wytyczne (~250 słów):**
- Co to CDN (Content Delivery Network) i jak działa edge caching
- Przykład: serwer w Warszawie → LCP dla użytkownika z Niemiec = 4–6 ms ping vs 300+ ms bez CDN
- Popularne CDN: Cloudflare (Free/Pro), Fastly, AWS CloudFront, Bunny CDN
- Jak wybrać CDN pod rynki zagraniczne: lokalizacja edge nodes, wsparcie dla języków europejskich
- Terminy: CDN, edge caching, edge node, Time to First Byte (TTFB), latency

---

#### H2: Robots.txt i XML sitemap dla wersji wielojęzycznych

**BLUF:** Plik robots.txt i sitemap XML muszą uwzględniać wszystkie wersje językowe strony — bez poprawnej konfiguracji Googlebot może pomijać zagraniczne podstrony.

**Wytyczne (~300 słów):**
- Sitemap wielojęzyczna: jak dodać `xhtml:link` dla wersji językowych
- **Blok kodu:**
  ```xml
  <url>
    <loc>https://example.com/pl/</loc>
    <xhtml:link rel="alternate" hreflang="pl" href="https://example.com/pl/"/>
    <xhtml:link rel="alternate" hreflang="de" href="https://example.de/"/>
    <xhtml:link rel="alternate" hreflang="x-default" href="https://example.com/"/>
  </url>
  ```
- Robots.txt: co blokować (np. duplicate search result pages), a czego nie (wersje językowe)
- Jak linkować sitemap w GSC per właściwość: dodaj sitemap per wersja językowa
- Terminy obowiązkowe: sitemap XML, robots.txt, xhtml:link, hreflang sitemap, crawl budget

---

#### H2: Jak mierzyć wyniki techniczne SEO zagranicznego — KPI i raportowanie

**BLUF:** Techniczna optymalizacja SEO zagranicznego bez pomiaru to działanie w ciemno — Double Digital mierzy 6 KPI per rynek, które jednoznacznie wskazują, czy techniczne fundamenty działają.

**Wytyczne (~350 słów):**
- Dlaczego mierzenie per rynek (nie globalnie) jest kluczowe — każdy rynek = osobna właściwość GSC
- **6 KPI technicznych SEO zagranicznego** (bold każdy):
  1. **Pokrycie indeksu (%)** per właściwość GSC — cel: <5% stron z błędami
  2. **Liczba błędów hreflang** w GSC — cel: 0
  3. **LCP per rynek** (PageSpeed Insights) — cel: <2,5 s
  4. **CTR organiczny per kraj** (GSC → Wydajność → filtr kraju) — benchmark po 3 mies.
  5. **Widoczność organiczna per rynek** (Semrush/Ahrefs) — trend wzrostowy
  6. **Czas do indeksacji nowej strony** — cel: <2 tygodnie
- Narzędzia do raportowania: GSC (wielowłaściwościowy), GA4 z segmentami geo, Looker Studio dashboard
- Jak Double Digital raportuje: miesięczny raport per rynek z trendem traffic + błędy + CWV
- ROI benchmark: wzrost ruchu organicznego z DE po 6 miesiącach poprawnej konfiguracji technicznej
- Terminy: KPI, coverage GSC, CTR organiczny, widoczność SERP, Looker Studio

---

#### H2: FAQ — Pytania i odpowiedzi

Odpowiedz na każde pytanie w 2-4 zdaniach. Format: pytanie pogrubione, odpowiedź pod spodem (no-click answer).

1. **Jak przeprowadzić SEO w różnych krajach?**
2. **Czy techniczne SEO zagraniczne jest trudne?**
3. **Ile kosztuje techniczna optymalizacja SEO zagranicznego?**
4. **Kiedy stosować hreflang, a kiedy canonical?**
5. **Czy subdomena niszczy moc domeny głównej?**
6. **Co się stanie, jeśli nie skonfiguruje hreflang?**
7. **Jak długo trwa efekt technicznej optymalizacji SEO zagranicznego?**
8. **Jakie narzędzia do sprawdzenia błędów hreflang?**

---

## 5. Metryki jakości

### TF-IDF — Terminy branżowe obowiązkowe (min 10 w artykule)

| Termin | Gęstość docelowa | Sekcje |
|--------|-----------------|--------|
| hreflang | 8–12× | Lead, H2 hreflang, H3 błędy, FAQ |
| ccTLD | 4–6× | H2 struktura, H3 ccTLD, Tabela |
| geotargeting | 4–5× | H2 GSC, H3 konfiguracja |
| Core Web Vitals | 3–4× | H2 page speed, Checklist |
| LCP | 3–4× | H2 page speed, H3 CDN, Tabela KPI |
| x-default | 3–4× | H2 hreflang, H3 x-default |
| Google Search Console | 4–6× | H2 GSC, KPI |
| canonical | 3–4× | H3 hreflang+canonical, FAQ |
| sitemap XML | 2–3× | H2 robots.txt, Kody |
| CDN | 3–4× | H3 CDN, Checklist |
| international SEO | 3–4× | Lead, H1, sekcje |
| pozycjonowanie zagraniczne | 3–4× | Lead, H1, sekcje ogólne |

**Stosunek specjalistyczne:generyczne:** target >1:3

### Information Density — Fakty weryfikowalne per H2

- Każdy H2 musi zawierać **min 3 fakty weryfikowalne** (liczby, progi, przykłady konkretnych rynków)
- Przykład: LCP <2,5 s = dobry; serwer w PL → 300+ ms latency do DE; 0/10 konkurentów ma checklistę techniczną
- Brak zdań typu "warto pamiętać, że...", "ważne jest..." bez konkretów

---

## 6. Checklist dla copywritera

### Struktura i format
- [ ] H1 zawiera CE ("Techniczna optymalizacja SEO zagranicznego") + UNIQUE atrybut ("kompletna checklist") + kontekst [ccTLD, hreflang, GSC]
- [ ] Lead/BLUF: 3 zdania, max 50 słów, odpowiedź na CSI już w pierwszym zdaniu
- [ ] Każdy H2 zaczyna się od BLUF (1 zdanie z konkretną odpowiedzią)
- [ ] Sekcje H2: 200–500 słów (optymalny chunk RAG)

### Treść merytoryczna
- [ ] ROOT atrybuty pokryte w dedykowanych H2 (struktura domeny, hreflang, monitoring, audyt)
- [ ] GAP P1 pokryte: checklist techniczna, błędy hreflang, geotargeting GSC krok po kroku
- [ ] UNIQUE atrybut wyeksponowany w Lead: "brakujaca checklist techniczna w polskim internecie"
- [ ] Tabele: ccTLD vs subdomena vs katalog (porównanie), błędy hreflang (lista), KPI (6 wskaźników)
- [ ] Bloki kodu HTML/XML dla hreflang i sitemap

### Optymalizacja AI Search
- [ ] FAQ pokrywa PAA pytania z SERP ("Jak przeprowadzić SEO w różnych krajach?")
- [ ] Brak cross-references ("jak wspomniano wyżej") — każdy H2 autonomiczny
- [ ] Min 10 terminów branżowych (hreflang, ccTLD, geotargeting, LCP, CLS, INP, x-default, canonical, CDN, crawl budget)
- [ ] Min 3 weryfikowalne fakty per H2 (liczby, progi, przykłady DE/UK)
- [ ] Bold na kluczowych wartościach: progi LCP, nazwy błędów hreflang, 6 KPI

### Long-tail i internal linking
- [ ] Internal links wplecione naturalnie (6 URL z anchor textami z briefu)
- [ ] CE "Techniczna optymalizacja SEO zagranicznego" powtórzona min 2× w każdym H2

### Długość i format
- [ ] Szacowana długość artykułu: 3 800–4 200 słów
- [ ] Bloki kodu dla hreflang HTML i sitemap XML (minimum 2)
- [ ] Minimum 3 tabele (ccTLD, KPI, błędy hreflang)

---

## 7. TOP 3 Content Gaps P1-P2 — wyróżniki artykułu

### Gap 1: Checklist techniczna krok po kroku (P1 — UNIQUE)

**Pokrycie u konkurencji:** 0/10 — ZERO. Wszyscy konkurenci w TOP 10 to landing pages agencji opisujące usługę, żaden nie daje czytelnemu checklisty technicznej.

**Szansa:** Artykuł poradnikowy z konkretną checklistą będzie jedynym takim dokumentem w polskim internecie. Dla AI Search (Gemini, Perplexity, ChatGPT) to idealny format do cytowania — lista kroków = wysoka citation uniqueness.

**Przewaga DD:** Double Digital ma doświadczenie z 25+ rynków — checklist może zawierać praktyczne wskazówki "z trenchu" niedostępne u agencji bez tego doświadczenia.

---

### Gap 2: Błędy hreflang — diagnostyka i naprawa (P1 — UNIQUE)

**Pokrycie u konkurencji:** 0/10. Nikt nie opisuje typowych błędów hreflang i jak je naprawić — wszyscy mówią "wdrożymy hreflang", nikt nie mówi "oto 5 błędów i jak je wykryć w GSC".

**Szansa:** Zapotrzebowanie jest wysokie — hreflang to najtrudniejszy technicznie element SEO zagranicznego, a Senuto wskazuje 390 wyszukiwań/mies. na "hreflangs". Sekcja diagnostyczna przyciągnie ruch z long-tail (np. "hreflang błędy", "hreflang checker").

**Przewaga DD:** Agencja z 25+ rynkami widzi powtarzające się błędy klientów — to autorski materiał z realnych projektów.

---

### Gap 3: Geotargeting GSC — konfiguracja krok po kroku (P1)

**Pokrycie u konkurencji:** 1/10 (tylko Widoczni wzmiankuje, nikt nie opisuje workflow).

**Szansa:** Geotargeting w GSC to kluczowy element technicznej optymalizacji dla subdomen i katalogów, a żaden z 9 pozostałych konkurentów go nie opisuje. Featured snippet opportunity: pytanie "jak ustawić geotargeting GSC" jest bez dedykowanej odpowiedzi.

**Przewaga DD:** Agencja data-driven może pokazać workflow GSC z real-world przykładem per typ struktury domeny.

---

## 8. UNIQUE wyróżniki do wyeksponowania

| # | Atrybut UNIQUE | Angle Double Digital |
|---|----------------|---------------------|
| 1 | Checklist techniczna krok po kroku | DD to agencja z 25+ rynków — checklist to destylacja doświadczeń z dziesiątek klientów e-commerce; brak u konkurencji w SERP |
| 2 | Błędy hreflang typowe + naprawa | Perspektywa praktyka: "te błędy widzimy najczęściej w audytach nowych klientów" — autorski materiał z realnych projektów |
| 3 | Geotargeting GSC workflow | DD jako Google Partner ma dostęp do najnowszych zmian w GSC i może dawać wytyczne zgodne z obecnym interfejsem |
| 4 | KPI i ROI per rynek | DD jako agencja data-driven (GA4/BigQuery) może pokazać 6 konkretnych KPI i benchmark "wzrost ruchu DE po 6 mies." |

---

## 9. Keywords & Terminy

| Kategoria | Terminy |
|-----------|---------|
| **Primary keyword** | techniczna optymalizacja SEO zagranicznego |
| **Secondary keywords** | optymalizacja techniczna SEO dla rynków zagranicznych, techniczne SEO zagraniczne, SEO techniczne zagraniczne checklist |
| **Cluster hreflang (vol. 710+)** | hreflang, hreflangs, hreflang tester, hreflang checker, hreflang plugin wordpress, hreflang html, hreflang tags, canonical and hreflang, link rel alternate |
| **Cluster pozycjonowanie (vol. 230+)** | pozycjonowanie zagraniczne, pozycjonowanie stron za granicą, pozycjonowanie za granicą, pozycjonowanie zagraniczne stron internetowych |
| **Terminy techniczne (TF-IDF)** | ccTLD, subdomena, podkatalog, geotargeting, geolokalizacja, x-default, Core Web Vitals, LCP, CLS, INP, CDN, robots.txt, sitemap XML, crawl budget, TTFB, canonical, Google Search Console |
| **Synonimy CE** | International SEO, SEO wielojęzyczne, SEO międzynarodowe, pozycjonowanie na rynki zagraniczne |
| **Long-tail (FAQ)** | jak przeprowadzić SEO w różnych krajach, jak ustawić hreflang krok po kroku, ccTLD vs subdomena SEO, błędy hreflang jak naprawić, geotargeting GSC konfiguracja |
| **PAA / Related (SERP)** | Jak przeprowadzić SEO w różnych krajach?, Czy techniczne SEO jest trudne?, Ile kosztuje optymalizacja SEO? |

---

**Szacowana długość artykułu:** 3 800–4 200 słów
**Liczba H2:** 7
**Liczba H3:** 8
**FAQ pytań:** 8
**Poziom pipeline:** Full (QueryFanout + SERP + Jina batch + LLM analysis)
