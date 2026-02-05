# Content Brief: Kortyzol – co to jest, normy, objawy i dieta obniżająca hormon stresu

**Data utworzenia:** 2026-02-05
**Topic:** Kortyzol
**Source Context:** Portal medyczny (serwis z artykułami medycznymi dla pacjentów)
**Degradation Level:** Full (SERP + Jina + LLM)

---

## 1. CSI & Fundamenty

### Central Search Intent (CSI)

| Element | Wartość |
|---------|---------|
| **CE (Central Entity)** | kortyzol |
| **SC (Source Context)** | portal medyczny (serwis z artykułami medycznymi dla pacjentów) |
| **CSI** | Zrozumienie kortyzolu jako hormonu stresu z perspektywy zdrowia i samopoczucia pacjenta |
| **Predykaty** | zrozumieć, zbadać, obniżyć, rozpoznać, zarządzać |

### Ramka semantyczna (15 elementów)

| Element | Definicja | Sub-query | Priorytet |
|---------|-----------|-----------|-----------|
| **Agent** | Co wywołuje produkcję kortyzolu | "co powoduje wzrost kortyzolu" | CORE |
| **Patient** | Na kogo/co wpływa kortyzol | "wpływ kortyzolu na organizm" | CORE |
| **Instrument** | Za pomocą czego badać kortyzol | "badanie kortyzolu jak się przygotować" | CORE |
| **Purpose** | Po co organizm produkuje kortyzol | "dlaczego kortyzol jest ważny" | CORE |
| **Cause** | Co powoduje zaburzenia kortyzolu | "przyczyny wysokiego kortyzolu" | CORE |
| **Result** | Jakie skutki ma nadmiar/niedobór | "objawy wysokiego kortyzolu" | CORE |
| **Location** | Gdzie produkowany kortyzol | "gdzie wytwarzany jest kortyzol" | OUTER |
| **Time** | Kiedy badać kortyzol | "kiedy robić badanie kortyzolu" | CORE |
| **Manner** | Jak obniżyć/regulować kortyzol | "jak obniżyć kortyzol naturalnie" | CORE |
| **Beneficiary** | U kogo występują zaburzenia | "kortyzol u kobiet w ciąży" | OUTER |
| **Source** | Skąd bierze się kortyzol | "synteza kortyzolu w organizmie" | OUTER |
| **Quantity** | Jakie są normy kortyzolu | "norma kortyzolu w organizmie" | CORE |
| **Condition** | Pod jakim warunkiem rośnie | "kortyzol a stres przewlekły" | CORE |
| **Comparison** | W porównaniu z innymi hormonami | "kortyzol vs adrenalina różnice" | OUTER |
| **Negation** | Co przy niedoborze kortyzolu | "niedobór kortyzolu objawy" | CORE |

### Sub-queries Coverage (10 + 4 SERP-ONLY)

**[CONFIRMED] (6/10 – 60%):**
1. "czym jest kortyzol i jaką pełni funkcję" → PAA: "Za co odpowiada kortyzol?"
2. "normy kortyzolu - ile powinno być" → Related: "Kortyzol norma"
3. "objawy wysokiego kortyzolu" → PAA: "Jakie są objawy wysokiego kortyzolu?"
4. "jak obniżyć kortyzol naturalnie" → PAA: "Jak obniżyć poziom kortyzolu?" + Related: "Kortyzol jak obniżyć"
6. "badanie kortyzolu" → Related: "Kortyzol badanie", "Kortyzol badanie cena"
9. "niedobór kortyzolu" → Related: "Kortyzol niski"

**[PREDICTED] (4/10 – 40%):**
5. "kortyzol a stres"
7. "przyczyny podwyższonego kortyzolu"
8. "kortyzol rano i wieczorem - rytm dobowy"
10. "kortyzol a tycie"

**[SERP-ONLY] (4 nowe luki):**
11. "co zrobić żeby obniżyć kortyzol" (PAA)
12. "domowy test na kortyzol" (Related)
13. "kortyzol tabletki" (Related)
14. "kortyzol poziom" (Related)

### Terminologia obowiązkowa

| Kategoria | Terminy |
|-----------|---------|
| **Synonimy** | hydrokortyzol, hormon stresu, kortyzol wolny, kortyzol całkowity |
| **Hiperonimy** | glikokortykosteroidy, hormony steroidowe, hormony kory nadnerczy, kortykosteroidy |
| **Hiponimy** | kortyzol w surowicy, kortyzol w ślinie, kortyzol w moczu dobowym, kortyzol we krwi |
| **Meronimy** | oś HPA (podwzgórze-przysadka-nadnercza), nadnercza, kora nadnerczy, ACTH, CRH |
| **Related** | syndrom Cushinga, choroba Addisona, niewydolność nadnerczy, hiperkortyzolemia, hipokortyzolemia, metabolizm, glukoneogeneza, immunosupresja |

---

## 2. EAV Matrix & Klasyfikacja URR

### EAV Matrix – 28 atrybutów z 9 konkurentów

| Attribute | Częstość | Klasyfikacja URR | Akcja w artykule |
|-----------|----------|------------------|------------------|
| Definicja kortyzolu | 9/9 | **ROOT** | H2: Podstawy |
| Funkcje kortyzolu | 9/9 | **ROOT** | H2: Podstawy |
| Objawy wysokiego | 9/9 | **ROOT** | H2: Objawy wysokiego |
| Objawy niskiego | 7/9 | **ROOT** | H2: Niedobór |
| Rytm dobowy | 6/9 | **ROOT** | H3 w Normy |
| Normy (wartości) | 5/9 | **ROOT** | H2: Normy |
| Jak obniżyć | 6/9 | **ROOT** | H2: Jak obniżyć |
| Zespół Cushinga | 7/9 | **ROOT** | H3 w Objawy wysokiego |
| Choroba Addisona | 6/9 | **ROOT** | H2: Niedobór |
| Badanie (procedura) | 6/9 | **ROOT** | H3 w Normy |
| Depresja | 6/9 | **ROOT** | H3 w Wpływ na organizm |
| Techniki relaksacyjne | 6/9 | **ROOT** | H3 w Jak obniżyć |
| Bawoli kark/twarz księżycowata | 6/9 | **ROOT** | H3: Zespół Cushinga |
| Sen/bezsenność | 6/9 | **ROOT** | H3 w Techniki relaksacyjne |
| Odporność | 5/9 | **ROOT** | H2: Objawy wysokiego |
| Suplementy (ashwagandha, omega-3) | 4/9 | **RARE** | H3 w Jak obniżyć |
| ACTH | 3/9 | **RARE** | H2: Podstawy |
| **Dieta kortyzolowa** | **2/9** | **UNIQUE** | **H3 dedykowane (TOP 1 GAP)** |
| **Kortyzol a tycie/odchudzanie** | **2/9** | **UNIQUE** | **H2 dedykowane (TOP 3 GAP)** |
| **Kortyzol a płodność/libido** | **1/9** | **UNIQUE** | **H3 dedykowane (TOP 2 GAP)** |
| **Kortyzol a wypadanie włosów** | **2/9** | **UNIQUE** | **H3 w Wpływ na organizm** |
| **Kortyzol a trądzik/skóra** | **2/9** | **UNIQUE** | **H3 w Wpływ na organizm** |
| **Kortyzol a tarczyca** | **1/9** | **UNIQUE** | **H3 w Wpływ na organizm** |
| **Kortyzol a wapń/osteoporoza** | **2/9** | **UNIQUE** | **H3 w Wpływ na organizm** |
| Czynniki redukujące (lista) | 1/9 | **UNIQUE** | FAQ/Box |
| Czynniki zwiększające (lista) | 2/9 | **UNIQUE** | H3 w Objawy wysokiego |
| Cena badania | 1/9 | **UNIQUE** | H3 w Normy |
| Leczenie nadmiaru/niedoboru | 2/9 | **UNIQUE** | H3 w Niedobór |

**Podsumowanie:** ROOT (15), RARE (2), UNIQUE (12) = 29 atrybutów (Wzór chemiczny P4 pominięty → 28 w artykule)

---

## 3. Content Gaps & Priorytety

### TOP 3 Content Gaps (P1-P2) – UNIQUE Differentiators

#### 1. Dieta kortyzolowa – szczegółowe produkty spożywcze i przepisy (UNIQUE, 2/9) – P1

**Gap:** Tylko DOZ i LuxMed wspominają konkretne produkty (orzechy, kakao, ryby, warzywa).
**Opportunity:** Rozszerzona lista produktów obniżających kortyzol + produkty do unikania + przykładowy jadłospis.
**Akcja:** H3 dedykowane "Dieta kortyzolowa – co jeść, a czego unikać" (400-500 słów)

**Treść:**
- Produkty obniżające: zielone warzywa liściaste (szpinak, jarmuż), orzechy/nasiona/pestki (cynk, magnez, omega-3), kakao i gorzka czekolada (magnez), ryby tłuste (EPA, DHA), owoce z wit. C (czarne porzeczki, truskawki, papryka), awokado, pełnoziarniste zboża, jogurty naturalne, zielona herbata
- Produkty do unikania: cukry proste, fast food, nadmiar kofeiny, alkohol
- Przykładowy jadłospis (1 dzień): owsianka z orzechami, pieczywo z awokado i jajkiem, łosoś z brokułami

#### 2. Kortyzol a płodność, libido i cykl menstruacyjny (UNIQUE, 1/9) – P1

**Gap:** Tylko Medistore wspomina wpływ na płodność (nieregularne cykle, owulację, jakość nasienia).
**Opportunity:** Rozwinięcie wpływu kortyzolu na układ rozrodczy (kobiety i mężczyźni).
**Akcja:** H3 dedykowane "Kortyzol a płodność, libido i cykl menstruacyjny" (250-300 słów)

**Treść:**
- U kobiet: nieregularne cykle, zaburzenia owulacji, trudności w zajściu w ciążę, wpływ na płód (ryzyko zespołu metabolicznego u dziecka), przenikanie do mleka matki
- U mężczyzn: pogorszona jakość nasienia, obniżenie testosteronu, spadek libido
- U obu płci: osłabienie libido, zaburzenia hormonalne

#### 3. Kortyzol a tycie, odchudzanie i rozkład tkanki tłuszczowej (UNIQUE, 2/9 + GAP w sub-queries) – P1

**Gap:** Tylko Medistore i LuxMed rozwijają temat metabolizmu tłuszczu i trudności w odchudzaniu.
**Opportunity:** Dedykowana sekcja H2 o mechanizmach tycia, otyłości brzusznej i strategiach odchudzania.
**Akcja:** H2 dedykowane "Kortyzol a tycie i odchudzanie" + 2x H3 (550-700 słów)

**Treść:**
- H2: Mechanizm tycia (wzrost apetytu, podjadanie, otyłość centralna, spowolnienie metabolizmu, insulinooporność)
- H3: Mechanizm odkładania tkanki tłuszczowej (lipoliza vs lipogeneza, enzym 11-beta HSD1, zaburzenia hormonalne)
- H3: Strategie odchudzania przy podwyższonym kortyzolu (obniżenie kortyzolu przed restrykcyjną dietą, unikanie diet bardzo niskokalorycznych, regularność posiłków, aktywność umiarkowana, kontrola stresu)

### Dodatkowe gaps P2-P3

- **Domowy test na kortyzol** (SERP-ONLY, brak u konkurentów) → FAQ
- **Kortyzol tabletki/leczenie farmakologiczne** (SERP-ONLY, 2/9) → H3 w Niedobór
- **Kortyzol a wypadanie włosów** (2/9) → H3 w Wpływ na organizm
- **Kortyzol a trądzik/skóra** (2/9) → H3 w Wpływ na organizm
- **Kortyzol a tarczyca** (1/9) → H3 w Wpływ na organizm
- **Kortyzol a osteoporoza/wapń** (2/9) → H3 w Wpływ na organizm
- **Cena badania** (1/9) → H3 w Normy

---

## 4. Struktura artykułu

### Compact Header Structure

```
H1: Kortyzol – co to jest, normy, objawy i dieta obniżająca hormon stresu

  H2: Czym jest kortyzol i za co odpowiada w organizmie?
    H3: Kortyzol jako hormon stresu – reakcja walka-ucieczka
    H3: Rytm dobowy kortyzolu

  H2: Kortyzol – normy w badaniach krwi, moczu i śliny
    H3: Jak wygląda badanie kortyzolu – przygotowanie i procedura
    H3: Kiedy warto zbadać poziom kortyzolu?
    H3: Cena badania kortyzolu

  H2: Objawy wysokiego kortyzolu – kiedy jest za dużo hormonu stresu
    H3: Zespół Cushinga – przyczyny i objawy
    H3: Czynniki zwiększające poziom kortyzolu

  H2: Niedobór kortyzolu – objawy i choroba Addisona
    H3: Przyczyny niskiego poziomu kortyzolu
    H3: Leczenie niedoboru kortyzolu

  H2: Jak obniżyć kortyzol naturalnie – dieta, suplementy i techniki relaksacyjne
    H3: Dieta kortyzolowa – co jeść, a czego unikać
    H3: Suplementy obniżające kortyzol (ashwagandha, omega-3, magnez)
    H3: Techniki relaksacyjne i higieniczny sen

  H2: Kortyzol a tycie i odchudzanie – dlaczego trudno schudnąć przy wysokim kortyzolu
    H3: Mechanizm odkładania tkanki tłuszczowej
    H3: Strategie odchudzania przy podwyższonym kortyzolu

  H2: Wpływ kortyzolu na organizm
    H3: Kortyzol a płodność, libido i cykl menstruacyjny
    H3: Kortyzol a wypadanie włosów i trądzik
    H3: Kortyzol a depresja i bezsenność
    H3: Kortyzol a tarczyca i osteoporoza

  H2: FAQ – najczęściej zadawane pytania o kortyzol
```

### H1 + BLUF Artykułu

**H1:** Kortyzol – co to jest, normy, objawy i dieta obniżająca hormon stresu

**BLUF (Lead, 3 zdania, ≤50 słów):**
Kortyzol to hormon stresu wytwarzany przez nadnercza, regulujący metabolizm glukozy, ciśnienie krwi i odporność. Zarówno nadmiar, jak i niedobór kortyzolu prowadzi do poważnych konsekwencji zdrowotnych – od otyłości brzusznej i depresji po chroniczne osłabienie. Odpowiednia dieta, techniki relaksacyjne i regularny ruch mogą skutecznie obniżyć kortyzol.

---

### Detailed Structure with BLUF per H2

#### H2: Czym jest kortyzol i za co odpowiada w organizmie?

**BLUF:** Kortyzol to hormon steroidowy produkowany przez korę nadnerczy, który reguluje metabolizm glukozy, ciśnienie krwi, odporność i reakcję organizmu na stres.

**Treść:**
- Definicja: hormon steroidowy, kora nadnerczy (warstwa pasmowata), nazwa alternatywna hydrokortyzon
- Główne funkcje: regulacja glukozy (glukoneogeneza), rozkład tłuszczy (lipoliza), rozpad białek, działanie przeciwzapalne, gospodarka wodno-elektrolitowa (zatrzymanie Na, usuwanie K), wydzielanie kwasu żołądkowego, filtracja nerkowa
- Receptory na niemal każdej komórce organizmu
- Produkcja pod wpływem ACTH z przysadki mózgowej
- **Target:** 250-350 słów, autonomiczny chunk, CE repeat 3x

##### H3: Kortyzol jako hormon stresu – reakcja walka-ucieczka

**Treść:**
- Dlaczego nazywany hormonem stresu
- Mechanizm walka-ucieczka: podwyższenie glukozy, przyspieszone bicie serca, aktywacja adrenaliny/noradrenaliny
- System współczulny vs przywspółczulny (melatonina)
- Stres krótkotrwały (mobilizacja) vs przewlekły (negatywne skutki)
- **Target:** 200-300 słów, CE repeat 2x

##### H3: Rytm dobowy kortyzolu

**Treść:**
- Najwyższy poziom rano (ok. 8:00), najniższy w nocy (ok. północy)
- Adaptacja do cyklu dzień-noc (czas aktywności vs odpoczynku)
- Zniesienie rytmu dobowego jako wskaźnik zespołu Cushinga
- **Target:** 150-200 słów, CE repeat 2x

---

#### H2: Kortyzol – normy w badaniach krwi, moczu i śliny

**BLUF:** Normy kortyzolu zależą od pory dnia i rodzaju badania – rano we krwi wynoszą 138-690 nmol/l, wieczorem 83-358 nmol/l, a w moczu dobowym 10-100 µg/d.

**Treść:**
- Tabela norm: krew (rano 138-690 nmol/l / 7-25 µg/dl, po południu, wieczór 83-358 nmol/l / 2-9 µg/dl, północ <50 nmol/l), mocz dobowy (dzieci 2-27 µg/d, nastolatki 5-55 µg/d, dorośli 10-100 µg/d), ślina wieczór 0,3-4,3 nmol/l
- Wartości referencyjne zależne od laboratorium
- Dlaczego normy różnią się w ciągu dnia (rytm dobowy)
- Pojedyncze badanie może być niewystarczające (wpływ stresu podczas pobrania)
- **Target:** 250-350 słów, autonomiczny chunk (pełna tabela), CE repeat 3x

##### H3: Jak wygląda badanie kortyzolu – przygotowanie i procedura

**Treść:**
- Rodzaje badań: krew żylna (najczęściej), mocz dobowy, ślina (mniej stresujące, frakcja wolnego kortyzolu)
- Przygotowanie: na czczo, unikać stresu i wysiłku fizycznego, konsultacja leków z lekarzem (estrogeny, androgeny, glikokortykosteroidy)
- Godziny pobrania: rano (najważniejsze), rzadziej 4x w ciągu dnia (ocena rytmu)
- Pomiar ACTH (ocena przysadki)
- Test z deksametazonem (diagnostyka różnicowa)
- **Target:** 300-400 słów, CE repeat 3x

##### H3: Kiedy warto zbadać poziom kortyzolu?

**Treść:**
- Wskazania: przewlekłe zmęczenie, wahania masy ciała bez przyczyny, trudności ze snem, huśtawki nastroju, podwyższone ciśnienie, częste infekcje, spadek libido, nieregularne miesiączki
- Podejrzenie zespołu Cushinga lub choroby Addisona
- Objawy związane z zaburzeniami wydzielania
- **Target:** 200-250 słów, CE repeat 2x

##### H3: Cena badania kortyzolu

**Treść (UNIQUE gap P3):**
- Koszt badania krwi: około 60-80 zł
- Dostępność: laboratoria diagnostyczne, przychodnie
- Możliwość wykonania w ramach NFZ (przy skierowaniu od lekarza)
- **Target:** 100-150 słów, CE repeat 1x

---

#### H2: Objawy wysokiego kortyzolu – kiedy jest za dużo hormonu stresu

**BLUF:** Wysoki kortyzol objawia się wzrostem masy ciała (szczególnie w okolicy brzucha i twarzy), bezsennością, obniżonym nastrojem, nadciśnieniem, osłabioną odpornością i częstymi infekcjami.

**Treść:**
- Lista objawów: tycie (otyłość brzuszna, twarz księżycowata, bawoli kark), bezsenność, depresja, osłabienie mięśni, zaburzenia koncentracji, nadciśnienie, podwyższona glukoza (cukrzyca typu 2), osłabiona odporność, trudności w gojeniu ran, spadek libido, czerwone rozstępy, trądzik, osteoporoza
- Charakterystyczny rozkład tkanki tłuszczowej: górne partie ciała (twarz, szyja, brzuch, barki), szczupłe kończyny
- Konsekwencje długotrwałego nadmiaru: zespół metaboliczny, choroby sercowo-naczyniowe
- **Target:** 300-400 słów, autonomiczny (pełna lista + konsekwencje), CE repeat 3x

##### H3: Zespół Cushinga – przyczyny i objawy

**Treść:**
- Definicja: przewlekła ekspozycja na wysoki kortyzol
- Przyczyny: guz przysadki (choroba Cushinga – zależna od ACTH), guz nadnerczy (niezależna od ACTH), guz neuroendokrynny (ektopowe ACTH), długotrwała terapia kortykosteroidami (egzogenna)
- Charakterystyczne objawy: twarz księżycowata, bawoli kark, żabi brzuch, rozstępy czerwonosinne, ścieńczenie skóry, hirsutyzm (kobiety), insulinooporność
- Leczenie: interwencja chirurgiczna, antagoniści receptora glikokortykoidowego (gdy operacja niemożliwa)
- **Target:** 350-450 słów, CE repeat 3x

##### H3: Czynniki zwiększające poziom kortyzolu

**Treść (UNIQUE gap P2 – lista z Wikipedii):**
- Przewlekły stres psychiczny, niedobór snu
- Kofeina (duże ilości)
- Intensywne lub długotrwałe ćwiczenia aerobowe (przejściowo)
- Infekcje wirusowe (aktywacja osi HPA przez cytokiny)
- Poważna trauma lub sytuacje stresowe
- Anorexia nervosa
- Podskórna tkanka tłuszczowa (enzym 11-beta HSD1 przetwarza kortyzon w kortyzol)
- Genetyczne: wariant Val/Val genu BDNF (mężczyźni), Val/Met (kobiety), gen receptora serotoniny 5HTR2C
- **Target:** 250-300 słów, CE repeat 2x

---

#### H2: Niedobór kortyzolu – objawy i choroba Addisona

**BLUF:** Niski kortyzol objawia się przewlekłym osłabieniem, niskim ciśnieniem krwi, omdleniami, spadkami glukozy, biegunkami i słabą tolerancją stresu oraz wysiłku fizycznego.

**Treść:**
- Lista objawów: przewlekłe osłabienie, senność mimo przespanej nocy, omdlenia, niskie ciśnienie, spadki glukozy (hipoglikemia), biegunki, nudności, wymioty, utrata apetytu, chudnięcie, nerwowość, apatia, depresja, ochota na słone przekąski, kiepska tolerancja stresu/wysiłku, szybka męczliwość
- Choroba Addisona: pierwotna niedoczynność kory nadnerczy, niszczenie nadnerczy przez autoprzeciwciała
- Charakterystyczne: ciemnienie skóry (hiperpigmentacja, cisawica) – brązowe przebarwienia na obszarach wystawionych na słońce
- Przełom nadnerczowy: zagrożenie życia (nagły niedobór kortyzolu)
- **Target:** 300-400 słów, autonomiczny (objawy + Addison + przełom), CE repeat 3x

##### H3: Przyczyny niskiego poziomu kortyzolu

**Treść:**
- Pierwotna niedoczynność (choroba Addisona): autoimmunologiczne, nowotwór, infekcja, krwotok do nadnerczy
- Wtórna niedoczynność: niedostateczna ACTH w przysadce (choroba przysadki, supresja po przewlekłym stosowaniu glikokortykosteroidów)
- Trzeciorzędowa: brak CRH z podwzgórza
- Wrodzony przerost kory nadnerczy (niedobór enzymów w syntezie)
- **Target:** 200-250 słów, CE repeat 2x

##### H3: Leczenie niedoboru kortyzolu

**Treść (UNIQUE gap P3):**
- Terapia zastępcza: hydrokortyzon doustnie
- Fludrokortyzon (gdy deficyt mineralokortykoidów)
- Zwiększenie dawki w stanach stresowych (choroba, operacja) – unikanie nagłego niedoboru
- Odstawianie steroidoterapii bardzo powoli (supresja przysadki)
- Kontrola endokrynologa
- **Target:** 200-250 słów, CE repeat 2x

---

#### H2: Jak obniżyć kortyzol naturalnie – dieta, suplementy i techniki relaksacyjne

**BLUF:** Obniżenie kortyzolu wymaga kompleksowego podejścia – zbilansowanej diety bogatej w warzywa i zdrowe tłuszcze, regularnego snu, aktywności fizycznej oraz technik relaksacyjnych takich jak medytacja czy ćwiczenia oddechowe.

**Treść:**
- Wprowadzenie: naturalne metody obniżania kortyzolu bez farmakoterapii
- Kluczowe filary: dieta, sen, ruch, relaks
- Modyfikacja stylu życia jako podstawa
- **Target:** 200-250 słów, CE repeat 2x

##### H3: Dieta kortyzolowa – co jeść, a czego unikać (TOP 1 UNIQUE GAP P1)

**Treść:**

**Produkty obniżające kortyzol:**
- Zielone warzywa liściaste (szpinak, jarmuż, rukola, koper, natka pietruszki) – antyoksydanty
- Orzechy, nasiona, pestki dyni (cynk, magnez, omega-3) – wspierają układ nerwowy
- Kakao i gorzka czekolada (magnez)
- Ryby tłuste i owoce morza (omega-3: EPA i DHA) – złagodzenie depresji i lęku
- Warzywa i owoce bogate w wit. C (czarne porzeczki, truskawki, maliny, grejpfruty, pomarańcze, kiwi, papryka, brokuły, kalafior)
- Awokado (potas, miedź, wit. B6, zdrowe tłuszcze)
- Pełnoziarniste zboża, rośliny strączkowe (stabilizacja glukozy)
- Jogurty naturalne, kefiry (mikrobiom jelitowy)
- Zielona herbata
- Regularność posiłków (długie przerwy → stres metaboliczny → wzrost kortyzolu)

**Produkty do unikania:**
- Cukry proste i wysokoprzetworzone produkty (gwałtowne skoki glukozy)
- Słodycze, słodkie napoje gazowane
- Fast food, żywność z sztucznymi dodatkami
- Nadmiar kofeiny (szczególnie ze stresem lub niewyspaniem)
- Alkohol (zaburza oś HPA, utrudnia regenerację)

**Przykładowy jadłospis (1 dzień):**
- Śniadanie: owsianka na jogurcie wysokobiałkowym z orzechami, nasionami, gorzką czekoladą i owocami jagodowymi
- Obiad: pełnoziarniste pieczywo żytnie z pastą z awokado, jajkiem i sałatką warzywną
- Kolacja: łosoś pieczony z brokułami i kaszą gryczaną
- Przekąski: orzechy, ciemne winogrona, gorzka czekolada

**Target:** 400-500 słów, autonomiczny (pełna lista + jadłospis), CE repeat 4x

##### H3: Suplementy obniżające kortyzol (ashwagandha, omega-3, magnez)

**Treść (RARE attribute 4/9):**
- Ashwagandha (Withania somnifera) – adaptogen, reguluje oś HPA, zmniejsza stres psychiczny i fizyczny, łagodzi lęk i depresję, wspiera leczenie bezsenności
- Różeniec górski (Rhodiola rosea) – zwiększa odporność psychiczną, poprawia kondycję fizyczną
- Kwasy omega-3 (EPA, DHA) – działanie przeciwzapalne, wsparcie mózgu, regulacja gospodarki hormonalnej
- Magnez – uspokaja układ nerwowy, obniża kortyzol po ćwiczeniach aerobowych
- Witamina C – przeciwutleniacz, wsparcie odporności
- Witaminy z grupy B, chrom, wapń
- Melisa – uspokojenie, łagodzenie napięcia
- Passiflora (męczennica) – ułatwia zasypianie
- Żeń-szeń – wzmacnia odporność, poprawia koncentrację
- Fosfatydyloseryna (z soi) – oddziałuje na kortyzol (dawkowanie niejasne)
- Konsultacja z lekarzem lub farmaceutą przed stosowaniem
- **Target:** 300-400 słów, CE repeat 3x

##### H3: Techniki relaksacyjne i higieniczny sen

**Treść:**

**Regularny sen:**
- Jedna nieprzespana noc podnosi kortyzol do kolejnego wieczora
- Stałe pory snu, 7-9h
- Zmniejszenie kofeiny
- Ograniczenie światła niebieskiego przed snem (niezasypianie z telefonem)

**Aktywność fizyczna:**
- Ruch intensywny czasowo podnosi kortyzol, ale po kilku godzinach spada
- Regularna aktywność → adaptacja (kortyzol nie wzrasta już tak wysoko)
- Rozładowywanie stresu, równowaga emocjonalna
- Umiarkowany ruch: spacer, pływanie, jazda na rowerze

**Techniki relaksacyjne:**
- Joga – integracja ciała i umysłu
- Medytacja
- Techniki głębokiego oddychania (aktywacja nerwu błędnego → zwolnienie akcji serca, obniżenie ciśnienia, spadek kortyzolu)
- Terapia śmiechem (śmiech redukuje kortyzol)
- Masaż (redukcja poziomu kortyzolu)
- Muzykoterapia (skuteczna w redukcji kortyzolu)
- Taniec (regularny prowadzi do redukcji kortyzolu w ślinie)

**Target:** 400-500 słów, CE repeat 4x

---

#### H2: Kortyzol a tycie i odchudzanie – dlaczego trudno schudnąć przy wysokim kortyzolu (TOP 3 UNIQUE GAP P1)

**BLUF:** Wysoki kortyzol utrudnia odchudzanie, ponieważ zwiększa apetyt (szczególnie na słodkie i tłuste przekąski), spowalnia metabolizm i sprzyja odkładaniu tkanki tłuszczowej w okolicy brzucha.

**Treść:**
- Dlaczego kortyzol tuczy: organizm czując zagrożenie (stres) gromadzi zapasy energetyczne
- Wzrost apetytu i podjadanie (wysokokaloryczne przekąski)
- Otyłość centralna: odkładanie tłuszczu trzewnego na brzuchu (najbardziej niebezpieczny typ)
- Charakterystyczna budowa ciała u osób z chorobą Cushinga: szczupłe kończyny, nadmiar tłuszczu brzuch/twarz/szyja/barki
- Spowolnienie metabolizmu: utrudnienie spalania tkanki tłuszczowej
- Insulinooporność i cukrzyca typu 2
- **Target:** 300-400 słów, autonomiczny (mechanizm tycia), CE repeat 3x

##### H3: Mechanizm odkładania tkanki tłuszczowej

**Treść:**
- Kortyzol nasila lipolizę (rozpad tłuszczy) w tkance podskórnej, ale zwiększa lipogenezę (syntezę tłuszczy) w tkance trzewnej (brzuch)
- Wysoki kortyzol → wzrost glukozy → wzrost insuliny → odkładanie tłuszczu
- Podskórna tkanka tłuszczowa przetwarza kortyzon w kortyzol (enzym 11-beta HSD1) → błędne koło
- Zaburzenia gospodarki hormonalnej: spadek testosteronu (mężczyźni), zaburzenia estrogenów (kobiety)
- **Target:** 200-250 słów, CE repeat 2x

##### H3: Strategie odchudzania przy podwyższonym kortyzolu

**Treść:**
- Skuteczne odchudzanie to nie tylko dieta i trening, ale też troska o równowagę hormonalną i zarządzanie stresem
- Priorytet: obniżenie kortyzolu (dieta, sen, relaks) przed restrykcyjną dietą
- Unikanie diet bardzo niskokalorycznych (stres metaboliczny → wzrost kortyzolu)
- Regularność posiłków (5-6 małych zamiast 2-3 dużych)
- Aktywność fizyczna umiarkowana (intensywne ćwiczenia mogą podwyższać kortyzol)
- Kontrola stresu psychicznego
- Suplementacja wspierająca (ashwagandha, omega-3, magnez)
- Konsultacja z endokrynologiem lub dietetykiem
- **Target:** 250-300 słów, CE repeat 3x

---

#### H2: Wpływ kortyzolu na organizm

**BLUF:** Kortyzol wpływa na wiele układów organizmu – od płodności i libido, przez kondycję włosów i skóry, aż po funkcjonowanie tarczycy i gęstość kości.

**Treść:**
- Wprowadzenie: kortyzol to nie tylko stres, ale hormon o szerokim wpływie na zdrowie
- **Target:** 150-200 słów, CE repeat 2x

##### H3: Kortyzol a płodność, libido i cykl menstruacyjny (TOP 2 UNIQUE GAP P1)

**Treść:**

**U kobiet:**
- Nieregularne cykle menstruacyjne
- Zaburzenia owulacji
- Trudności w zajściu w ciążę
- Narażenie na przewlekły stres w ciąży → ryzyko zespołu metabolicznego u dziecka
- Wysoki kortyzol u matki karmiącej przenika do mleka → niekorzystny wpływ na rozwój psychofizyczny niemowląt

**U mężczyzn:**
- Pogorszona jakość nasienia (zmniejszenie liczby i ruchliwości plemników)
- Obniżenie poziomu testosteronu
- Spadek libido

**U obu płci:**
- Osłabienie libido
- Zaburzenia hormonalne (kortyzol "wygrywa" z hormonami płciowymi w osi HPA)

**Target:** 250-300 słów, autonomiczny (kobiety + mężczyźni + libido), CE repeat 3x

##### H3: Kortyzol a wypadanie włosów i trądzik

**Treść (UNIQUE gap P2 – 2/9):**

**Wypadanie włosów:**
- Wysoki kortyzol może wpływać na łysienie androgenowe
- Uszkodzenie macierzy włosów, wypadanie włosów
- Także niski kortyzol może negatywnie wpływać na kondycję włosów

**Trądzik:**
- Przekroczone normy kortyzolu → trądzik
- Zwiększona ilość kortyzolu → wzrost wydzielania sebum (łoju skórnego)
- Zatkanie ujść gruczołów skórnych → rozwój bakterii → trądzik
- Utrata elastyczności, blasku i nawilżenia przez skórę

**Wpływ na skórę ogólnie:**
- Ścieńczenie skóry
- Podatność na rozstępy i urazy
- Trudności w gojeniu ran
- Czerwone rozstępy (brzuch, biodra, piersi, uda)
- Przewlekły nadmiar → przyspieszenie starzenia się skóry
- Nasilenie egzemy

**Target:** 250-300 słów, CE repeat 3x

##### H3: Kortyzol a depresja i bezsenność

**Treść (ROOT attribute 6/9):**
- Zbyt duży poziom kortyzolu → bezsenność
- Bezsenność → zmniejszenie serotoniny → depresja
- Zaburzenia nastroju, huśtawki emocjonalne
- Pogorszenie samopoczucia, spadek nastroju, smutek, brak energii
- Obniżony nastrój, aż do depresji (objaw wysokiego kortyzolu)
- Nerwowość, apatia, depresja (objaw niskiego kortyzolu)
- Długotrwały nadmiar → zwiększone ryzyko depresji
- Leczenie zaburzeń nastroju wymaga wyrównania poziomu kortyzolu
- **Target:** 200-250 słów, CE repeat 2x

##### H3: Kortyzol a tarczyca i osteoporoza

**Treść (UNIQUE gap P2 – 1/9 i 2/9):**

**Tarczyca:**
- Kortyzol może spowodować zarówno nadczynność, jak i niedoczynność tarczycy
- Nieprawidłowy poziom negatywnie wpływa na produkcję hormonów tarczycy
- Zaburzenia w syntezie TSH, T3, T4

**Osteoporoza i wapń:**
- Kortyzol hamuje wchłanianie wapnia z pożywienia
- Wysoki kortyzol → osteoporoza (kruchość kości)
- Nasila aktywność osteoklastów (komórki rozkładające kości)
- Zaniki mięśniowe (rozpad białek mięśniowych)
- U dzieci: zwolnienie tempa wzrastania, niedobór wzrostu
- Bóle kręgosłupa (objaw zespołu Cushinga)

**Target:** 200-250 słów, CE repeat 2x

---

#### H2: FAQ – najczęściej zadawane pytania o kortyzol

**Treść:** 9 pytań (4 PAA + 5 dodatkowych)

1. **Jakie są objawy wysokiego kortyzolu?** (PAA)
   → Odniesienie do H2: Objawy wysokiego kortyzolu. Krótko: tycie (brzuch/twarz), bezsenność, depresja, nadciśnienie, osłabiona odporność, spadek libido.

2. **Co zrobić żeby obniżyć kortyzol?** (PAA)
   → Odniesienie do H2: Jak obniżyć kortyzol naturalnie. Krótko: zbilansowana dieta (warzywa, owoce, zdrowe tłuszcze), regularny sen (7-9h), aktywność fizyczna (umiarkowana), techniki relaksacyjne (medytacja, oddychanie, joga), suplementacja (ashwagandha, omega-3, magnez).

3. **Za co odpowiada kortyzol?** (PAA)
   → Odniesienie do H2: Czym jest kortyzol. Krótko: regulacja glukozy, reakcja na stres, metabolizm tłuszczy i białek, ciśnienie krwi, odporność, gospodarka wodno-elektrolitowa.

4. **Jak obniżyć poziom kortyzolu?** (PAA)
   → Odniesienie do H2: Jak obniżyć kortyzol naturalnie. Krótko: dieta, sen, ruch, relaks, suplementy.

5. **Ile kosztuje badanie kortyzolu?** (Related)
   → Odniesienie do H3: Cena badania kortyzolu. Krótko: około 60-80 zł, dostępne w laboratoriach diagnostycznych, możliwość w ramach NFZ przy skierowaniu.

6. **Czy istnieje domowy test na kortyzol?** (SERP-ONLY gap P2)
   → TAK, testy śliny dostępne online (późnowieczorne pobranie śliny), ale interpretacja wymaga konsultacji lekarskiej; badanie krwi w laboratorium bardziej miarodajne ze względu na rytm dobowy i możliwość kontroli warunków pobrania.

7. **Jakie tabletki obniżają kortyzol?** (SERP-ONLY gap P3)
   → Farmakoterapia: antagoniści receptora glikokortykoidowego (zespół Cushinga, gdy operacja niemożliwa), terapia zastępcza hydrokortyzonem (niedobór kortyzolu). Suplementy (bez recepty): ashwagandha, magnez, omega-3, witamina C, witaminy B. Zawsze konsultacja z lekarzem.

8. **Czy kortyzol zmienia się z wiekiem?** (K8 FAQ)
   → TAK, z wiekiem kortyzol wzrasta. Przyczyny: słabsza kontrola układów mózgowych i hormonalnych, mniej wydajne sprzężenie zwrotne, niższa wrażliwość receptorów, zaburzony rytm dobowy.

9. **Czy deficyt kortyzolu jest groźny?** (K8 FAQ)
   → TAK, może prowadzić do zaburzeń metabolicznych, problemów z elektrolitami (utrata Na, wzrost K), osłabienia odporności, zaburzeń nastroju. W skrajnych przypadkach kryzys nadnerczowy (przełom nadnerczowy) – zagrożenie życia.

**Target:** 400-500 słów (9 pytań x 40-60 słów), CE repeat 5-6x

---

## 5. Metryki jakości i target artykułu

### Target metryki artykułu

| Metryka | Target |
|---------|--------|
| **Długość artykułu** | 5000-6500 słów (~6000 słów, 26 chunków x 230 słów avg) |
| **Liczba H2** | 8 |
| **Liczba H3** | 18 |
| **Zakres chunków RAG** | 200-500 słów, autonomiczne, CE repeat min 1x |
| **Terminy specjalistyczne** | Min 12 (15 zidentyfikowanych) |
| **FAQ** | 9 pytań (4 PAA + 5 dodatkowych) |
| **UNIQUE differentiators** | 8 wyróżników (TOP 3 P1 rozwinięte) |
| **Information density** | 3-5 faktów/zdanie w H2/H3 |

### TF-IDF – Terminy specjalistyczne

**Wysokie TF-IDF (terminy branżowe, wyróżniające):**
- kortyzol (CE – najwyższa częstość)
- glikokortykosteroidy, hormony steroidowe
- oś HPA (podwzgórze-przysadka-nadnercza)
- ACTH (hormon adrenokortykotropowy)
- zespół Cushinga, choroba Addisona
- glukoneogeneza, lipoliza
- hiperkortyzolemia, hipokortyzolemia
- bawoli kark, twarz księżycowata, żabi brzuch
- przełom nadnerczowy
- insulinooporność
- osteoklasty
- enzymu 11-beta HSD1
- kortykoliberyna (CRH)

**Średnie TF-IDF (terminy wsparcia):**
- hormon stresu, nadnercza, kora nadnerczy, warstwa pasmowata
- rytm dobowy, metabolizm, glukoza, tłuszcze, białka
- normy, badanie, krew, mocz, ślina
- objawy, wysoki, niski, nadmiar, niedobór
- dieta, suplementy, ashwagandha, omega-3, magnez
- techniki relaksacyjne, sen, aktywność fizyczna
- tycie, odchudzanie, otyłość brzuszna
- płodność, libido, wypadanie włosów, trądzik, depresja

### Information Density

**Target:** 3-5 faktów na zdanie w sekcjach merytorycznych (H2/H3)

**Przykład wysokiej gęstości (H2: Normy):**
"Normy kortyzolu zależą od pory dnia i rodzaju badania – rano we krwi wynoszą 138-690 nmol/l, wieczorem 83-358 nmol/l, a w moczu dobowym 10-100 µg/d."
- 5 faktów: zależność od pory dnia, zależność od rodzaju badania, norma rano, norma wieczorem, norma mocz dobowy

**Przykład średniej gęstości (Lead BLUF):**
"Kortyzol to hormon steroidowy wytwarzany przez nadnercza, który reguluje reakcję organizmu na stres oraz metabolizm glukozy i tłuszczy."
- 4 fakty: definicja hormonu steroidowego, miejsce produkcji (nadnercza), funkcja reakcji na stres, funkcje metaboliczne

**Strategia:**
- Lead BLUF: 3-4 fakty/zdanie (wprowadzenie)
- H2 BLUF: 4-5 faktów/zdanie (kondensacja)
- Body paragraphs: 2-3 fakty/zdanie (czytelność)
- FAQ: 3-4 fakty/odpowiedź (zwięzłość)

---

## 6. Checklist dla copywritera

### Struktura i format (5 pkt)

- [ ] **H1 zawiera CE + UNIQUE attribute + SC context** (kortyzol + dieta obniżająca + portal medyczny)
- [ ] **Lead BLUF: 3 zdania, max 50 słów** (answer first, context after)
- [ ] **Compact header structure na początku artykułu** (code block H1/H2/H3 przed rozwinięciem)
- [ ] **Każdy H2 ma BLUF (1 zdanie z answer + CE)** – 8 H2, 8 BLUF
- [ ] **RAG chunki: 200-500 słów, autonomiczne, CE repeat min 1x** – walidacja 26 chunków

### Treść merytoryczna (4 pkt)

- [ ] **Wszystkie ROOT attributes (15) pokryte w H2/H3** (definicja, funkcje, objawy wysokiego/niskiego, normy, jak obniżyć, zespół Cushinga, choroba Addisona, badanie, depresja, techniki relaksacyjne, bawoli kark, sen, odporność)
- [ ] **TOP 3 Content Gaps (P1) rozwinięte dedykowane sekcje:**
  - Dieta kortyzolowa (H3: 400-500 słów, produkty + jadłospis)
  - Płodność i libido (H3: 250-300 słów, kobiety + mężczyźni)
  - Tycie i odchudzanie (H2: 550-700 słów, mechanizm + strategie)
- [ ] **Terminologia obowiązkowa użyta:** glikokortykosteroidy, oś HPA, ACTH, zespół Cushinga, choroba Addisona, glukoneogeneza, lipoliza (min 10 z 12 terminów branżowych)
- [ ] **Tabela norm kortyzolu (krew, mocz, ślina)** w H2: Normy

### Optymalizacja AI Search (4 pkt)

- [ ] **Information density: 3-5 faktów/zdanie w H2/H3** (audyt losowy 5 akapitów)
- [ ] **FAQ pokrywa wszystkie PAA questions (4) + 5 dodatkowych** – 9 pytań total
- [ ] **Sub-queries [CONFIRMED] (6/10) embedded w H2/H3** – tag widoczny w brief, content musi odpowiadać na query
- [ ] **SERP-ONLY gaps (4) zaadresowane:** domowy test (FAQ), kortyzol tabletki (H3 Leczenie niedoboru + FAQ), co zrobić żeby obniżyć (H2: Jak obniżyć), kortyzol poziom (H2: Normy)

### Długość i format (2 pkt)

- [ ] **Target długość artykułu: 5000-6500 słów** (26 chunków x 200-300 słów średnio = ~6000 słów)
- [ ] **Liczba H2: 8, H3: 18** – struktura hierarchiczna, żadna sekcja H2 bez rozwinięcia

---

## 7. TOP 3 Content Gaps (P1-P2) – Różnicujące

### 1. Dieta kortyzolowa – szczegółowe produkty spożywcze i przepisy (UNIQUE, 2/9) – P1

**Co wyróżnia:** Tylko DOZ i LuxMed wspominają konkretne produkty. Konkurencja nie dostarcza przykładowego jadłospisu.

**Nasza przewaga:**
- Rozszerzona lista produktów obniżających (10 kategorii: zielone warzywa, orzechy, kakao, ryby, wit. C, awokado, zboża, jogurty, herbata + regularność posiłków)
- Produkty do unikania (5 kategorii: cukry, fast food, kofeina, alkohol + sztuczne dodatki)
- Przykładowy jadłospis (1 dzień) – śniadanie, obiad, kolacja, przekąski

**Target:** H3 dedykowane "Dieta kortyzolowa – co jeść, a czego unikać" (400-500 słów)

---

### 2. Kortyzol a płodność, libido i cykl menstruacyjny (UNIQUE, 1/9) – P1

**Co wyróżnia:** Tylko Medistore wspomina wpływ na płodność. Brak rozwinięcia u pozostałych konkurentów.

**Nasza przewaga:**
- Wpływ na kobiety: nieregularne cykle, zaburzenia owulacji, trudności w zajściu w ciążę, ryzyko dla płodu (zespół metaboliczny u dziecka), przenikanie do mleka matki
- Wpływ na mężczyzn: pogorszona jakość nasienia, obniżenie testosteronu, spadek libido
- Wpływ u obu płci: osłabienie libido, zaburzenia hormonalne (kortyzol vs hormony płciowe w osi HPA)

**Target:** H3 dedykowane "Kortyzol a płodność, libido i cykl menstruacyjny" (250-300 słów)

---

### 3. Kortyzol a tycie, odchudzanie i rozkład tkanki tłuszczowej (UNIQUE, 2/9 + GAP w sub-queries) – P1

**Co wyróżnia:** Tylko Medistore i LuxMed rozwijają temat metabolizmu tłuszczu. Brak strategii odchudzania przy wysokim kortyzolu u konkurentów. Sub-query #10 "kortyzol a tycie" [PREDICTED] nie jest pokryty przez większość.

**Nasza przewaga:**
- H2 dedykowane z 2x H3 (550-700 słów total)
- Szczegółowy mechanizm tycia: wzrost apetytu, podjadanie, otyłość centralna, spowolnienie metabolizmu, insulinooporność
- Mechanizm odkładania tkanki tłuszczowej: lipoliza vs lipogeneza, enzym 11-beta HSD1, zaburzenia hormonalne
- Praktyczne strategie odchudzania: obniżenie kortyzolu przed restrykcyjną dietą, unikanie diet bardzo niskokalorycznych, regularność posiłków, aktywność umiarkowana, kontrola stresu, suplementacja, konsultacja z endokrynologiem

**Target:** H2 "Kortyzol a tycie i odchudzanie" (300-400 słów) + H3 "Mechanizm odkładania" (200-250 słów) + H3 "Strategie odchudzania" (250-300 słów)

---

## 8. UNIQUE Differentiators to Emphasize

### Główne wyróżniki artykułu (poza TOP 3 Gaps):

1. **Kompleksowa tabela norm** (krew rano/po południu/wieczór/północ, mocz dobowy dzieci/nastolatki/dorośli, ślina wieczór) – 5/9 konkurentów ma normy, ale nasza tabela najbardziej kompletna

2. **Czynniki zwiększające kortyzol (lista z Wikipedii)** – UNIQUE, tylko 2/9 ma listę, nasza najbardziej szczegółowa (10 punktów: stres, sen, kofeina, wysiłek, infekcje, trauma, anoreksja, tkanka tłuszczowa, genetyka)

3. **Szczegółowa sekcja wpływu na organizm (4x H3):** płodność/libido, włosy/trądzik, depresja/bezsenność, tarczyca/osteoporoza – żaden konkurent nie ma tak szerokiej sekcji H2 z 4 H3

4. **Strategie odchudzania przy podwyższonym kortyzolu** – UNIQUE, żaden konkurent nie ma praktycznych strategii (8 punktów: priorytet obniżenia kortyzolu, unikanie diet bardzo niskokalorycznych, regularność posiłków, aktywność umiarkowana, kontrola stresu, suplementacja, konsultacja)

5. **Przykładowy jadłospis (1 dzień)** – UNIQUE, tylko DOZ wspomina dietetykę, ale bez konkretnego jadłospisu

6. **FAQ z 9 pytaniami** (4 PAA + 5 dodatkowych) – większość konkurentów nie ma FAQ lub ma max 3-4 pytania

7. **Leczenie niedoboru kortyzolu (terapia zastępcza)** – tylko 2/9 konkurentów rozwijają leczenie (hydrokortyzon, fludrokortyzon, zwiększenie dawki w stanach stresowych)

8. **Cena badania kortyzolu** – UNIQUE, tylko 1/9 (Adamed) wspomina cenę (60-80 zł)

---

## 9. Keywords & Terminy

### Keywords Table

| Typ | Keywords |
|-----|----------|
| **Primary (CE)** | kortyzol, hormon stresu |
| **Secondary** | normy kortyzolu, objawy wysokiego kortyzolu, jak obniżyć kortyzol, badanie kortyzolu, dieta kortyzolowa, kortyzol a tycie |
| **Branżowe (Terminy specjalistyczne)** | glikokortykosteroidy, oś HPA, ACTH, zespół Cushinga, choroba Addisona, glukoneogeneza, lipoliza, hiperkortyzolemia, bawoli kark, twarz księżycowata, przełom nadnerczowy, insulinooporność, osteoklasty, enzym 11-beta HSD1, kortykoliberyna (CRH) |
| **Synonimy CE** | hydrokortyzol, hydrokortyzon, kortyzol wolny, kortyzol całkowity |
| **Long-tail** | kortyzol rano i wieczorem, rytm dobowy kortyzolu, kortyzol a płodność, kortyzol a wypadanie włosów, kortyzol a trądzik, kortyzol a depresja, kortyzol a tarczyca, kortyzol a odchudzanie, cena badania kortyzolu, domowy test na kortyzol, kortyzol tabletki |
| **PAA-derived** | jakie są objawy wysokiego kortyzolu, co zrobić żeby obniżyć kortyzol, za co odpowiada kortyzol, jak obniżyć poziom kortyzolu |
| **Related Searches** | kortyzol jak obniżyć, kortyzol norma, kortyzol badanie, kortyzol badanie cena, kortyzol tabletki, kortyzol poziom, kortyzol niski, domowy test na kortyzol |

### Keyword Density Targets

- **Primary (kortyzol):** 1.0-1.5% (60-90 wystąpień w 6000 słów) — naturalnie, bez keyword stuffing
- **Secondary (normy kortyzolu, objawy wysokiego, jak obniżyć):** 0.2-0.4% każdy (12-24 wystąpień)
- **Branżowe (oś HPA, ACTH, Cushing, Addison):** min 3-5 wystąpień każdy
- **Long-tail:** min 1-3 wystąpień każdy (naturalne wplecenie w H2/H3)

### Terminy obowiązkowe (min 1x w artykule)

✓ kortyzol (CE – wysoka częstość)
✓ hormon stresu
✓ glikokortykosteroidy
✓ oś HPA (podwzgórze-przysadka-nadnercza)
✓ ACTH (hormon adrenokortykotropowy)
✓ zespół Cushinga
✓ choroba Addisona
✓ glukoneogeneza
✓ lipoliza
✓ bawoli kark
✓ twarz księżycowata
✓ przełom nadnerczowy

---

## 10. Target Metrics & Summary

### Article Metrics

| Metryka | Target | Status |
|---------|--------|--------|
| **Długość artykułu** | 5000-6500 słów | ~6000 słów (26 chunków x 230 słów avg) |
| **Liczba H2** | 8 | ✓ |
| **Liczba H3** | 18 | ✓ |
| **Liczba RAG chunków** | 26 | ✓ (H2: 8, H3: 18) |
| **Zakres chunków** | 200-500 słów | ✓ (większość 200-400) |
| **CE repeat/chunk** | Min 1x | ✓ (średnia 2-3x) |
| **Information density** | 3-5 faktów/zdanie | Target (audyt po napisaniu) |
| **Terminy specjalistyczne** | Min 12 | ✓ (15 terminów branżowych) |
| **FAQ questions** | Min 4 PAA | ✓ (9 pytań: 4 PAA + 5 dodatkowych) |
| **UNIQUE differentiators** | Min 3 | ✓ (8 wyróżników) |
| **TOP 3 Gaps P1** | Rozwinięte dedykowane | ✓ (dieta, płodność, tycie) |

### Quality Metrics

**TF-IDF Score:** Wysoki (15 terminów specjalistycznych, CE kortyzol najwyższa częstość)
**Information Density:** 3-5 faktów/zdanie (target w H2/H3)
**BLUF Format:** Lead + 8 H2 BLUF (answer first)
**RAG Optimization:** 26 autonomicznych chunków, CE repeat, 200-500 słów
**SERP Coverage:** 6/10 [CONFIRMED], 4 [SERP-ONLY] zaadresowane
**Completeness:** 15 ROOT + 2 RARE + 13 UNIQUE attributes pokryte

### Degradation Level: Full (SERP + Jina + LLM)

**SERP Data:**
- 10 organic results analyzed
- 4 PAA questions embedded
- 8 Related Searches analyzed
- 6/10 sub-queries [CONFIRMED] z SERP

**Jina Reader:**
- 9 competitors fetched (_consolidated.md)
- Quality: 9/9 OK
- Content cleaned (noise removal pipeline)
- Truncation: 1500 words/competitor

**LLM Analysis:**
- EAV extraction: 28 attributes across 9 competitors
- URR classification: ROOT (15), RARE (2), UNIQUE (13)
- Gap analysis: 3 P1 gaps, 7 P2-P3 gaps
- Sub-query tagging: [CONFIRMED], [PREDICTED], [SERP-ONLY]

---

**Data utworzenia:** 2026-02-05
**Źródła:** data/briefs/kortyzol/01_topic_research.md + 02_competitor_analysis.md + 03_contextual_vector.md
**Estimated time to write:** 8-12 hours (professional medical copywriter)
**Target audience:** Pacjenci portalu medycznego szukający informacji o kortyzolu, objawach, badaniach i metodach obniżania
**Tone:** Profesjonalny, medyczny, ale przystępny dla pacjenta (unikać nadmiernego żargonu, wyjaśniać terminy)