# Competitor Analysis: Kortyzol

## 1. SERP Grounding – Sub-query Tagging

### Sub-queries z Topic Research z tagami:

| # | Sub-query | Tag | Źródło SERP | Priorytet |
|---|-----------|-----|-------------|-----------|
| 1 | "czym jest kortyzol i jaką pełni funkcję" | **[CONFIRMED]** | PAA: "Za co odpowiada kortyzol?" | **P1** |
| 2 | "normy kortyzolu - ile powinno być" | **[CONFIRMED]** | Related: "Kortyzol norma" | **P1** |
| 3 | "objawy wysokiego kortyzolu u kobiet i mężczyzn" | **[CONFIRMED]** | PAA: "Jakie są objawy wysokiego kortyzolu?" | **P1** |
| 4 | "jak obniżyć kortyzol naturalnie dieta suplementy" | **[CONFIRMED]** | PAA: "Jak obniżyć poziom kortyzolu?" + Related: "Kortyzol jak obniżyć" | **P1** |
| 5 | "kortyzol a stres - jak stres wpływa na kortyzol" | **[PREDICTED]** | Brak bezpośredniego matcha | **P2** |
| 6 | "badanie kortyzolu - przygotowanie i interpretacja" | **[CONFIRMED]** | Related: "Kortyzol badanie", "Kortyzol badanie cena" | **P1** |
| 7 | "przyczyny podwyższonego kortyzolu" | **[PREDICTED]** | Brak bezpośredniego matcha | **P2** |
| 8 | "kortyzol rano i wieczorem - rytm dobowy" | **[PREDICTED]** | Brak bezpośredniego matcha | **P2** |
| 9 | "niedobór kortyzolu - objawy i leczenie" | **[CONFIRMED]** | Related: "Kortyzol niski" | **P1** |
| 10 | "kortyzol a tycie - czy kortyzol tuczy" | **[PREDICTED]** | Brak bezpośredniego matcha | **P2** |

### Nowe sub-queries z SERP [SERP-ONLY]:

| # | Sub-query | Źródło | Priorytet |
|---|-----------|--------|-----------|
| 11 | "co zrobić żeby obniżyć kortyzol" | **[SERP-ONLY]** | PAA | **P1** |
| 12 | "domowy test na kortyzol" | **[SERP-ONLY]** | Related | **P2** |
| 13 | "kortyzol tabletki" | **[SERP-ONLY]** | Related | **P3** |
| 14 | "kortyzol poziom" | **[SERP-ONLY]** | Related | **P2** |

**Podsumowanie tagowania:**
- **[CONFIRMED]**: 6/10 sub-queries (60%)
- **[PREDICTED]**: 4/10 sub-queries (40%)
- **[SERP-ONLY]**: 4 nowe luki z PAA/Related

---

## 2. EAV Extraction – Macierz konkurentów

Analiza 9 konkurentów (K1-K9) – ekstrakcja Entity-Attribute-Value z _consolidated.md:

### K1 (DOZ.pl – Dieta kortyzolowa)

| Entity | Attribute | Value |
|--------|-----------|-------|
| kortyzol | definicja | hormon steroidowy produkowany przez korę nadnerczy |
| kortyzol | funkcje | regulacja poziomu glukozy, reakcja na stres, wpływ na ciśnienie, działanie przeciwzapalne |
| kortyzol | wpływ na zdrowie | długotrwale podwyższony osłabia odporność, zaburza węglowodany, obciąża serce |
| kortyzol | dieta obniżająca | zielone warzywa, orzechy, kakao, gorzka czekolada, ryby tłuste, owoce z wit. C |
| kortyzol | produkty do unikania | cukry proste, żywność przetworzona, nadmiar kofeiny, alkohol |
| kortyzol | sposoby obniżania | regularny sen, techniki relaksacyjne, aktywność fizyczna, ashwagandha |
| kortyzol | objawy wysokiego | wzrost masy ciała, lęk, pogorszona pamięć, nadciśnienie, częste infekcje |

### K2 (Wikipedia – Kortyzol)

| Entity | Attribute | Value |
|--------|-----------|-------|
| kortyzol | nazwa alternatywna | hydrokortyzon, hydrocortisonum |
| kortyzol | miejsce produkcji | kora nadnerczy, warstwa pasmowata |
| kortyzol | wzór chemiczny | C21H30O5, masa 362,47 g/mol |
| kortyzol | czynniki redukujące | suplementacja magnezem, muzykoterapia, masaż, śmiech, fosfatydyloseryna, taniec, Withania somnifera |
| kortyzol | czynniki zwiększające | infekcje wirusowe, kofeina, niedobór snu, intensywne ćwiczenia aerobowe, trauma, tkanka tłuszczowa, anorexia nervosa |
| kortyzol | zespół Cushinga | przemieszczenie depozytów tłuszczu (bawoli kark, twarz księżyc w pełni), otyłość brzuszna, ścieńczenie skóry, trądzik, insulinooporność |

### K3 (Synevo – Hormon stresu)

| Entity | Attribute | Value |
|--------|-----------|-------|
| kortyzol | definicja | hormon steroidowy z warstwy pasmowatej kory nadnerczy |
| kortyzol | funkcje | zwiększenie glukozy w odpowiedzi na stres, wpływ na gospodarkę cukrową |
| kortyzol | normy (krew, 8:00) | 138-635 nmol/l |
| kortyzol | normy (krew, 16:00) | 80-440 nmol/l |
| kortyzol | normy (krew, 20:00) | poniżej 50% wartości porannej |
| kortyzol | normy (krew, 24:00) | poniżej 50 nmol/l (najniższa wartość) |
| kortyzol | normy (mocz dobowy, dorośli) | 10-100 µg/d |
| kortyzol | normy (ślina, wieczór) | 0,3-4,3 nmol/l |
| kortyzol | objawy wysokiego | nadmiar tkanki tłuszczowej na tułowiu/karku/barkach, bawoli kark, nadciśnienie, depresja, zmiana kompozycji sylwetki |
| kortyzol | objawy niskiego | osłabienie, niskie ciśnienie, omdlenia, spadki glukozy, biegunki, nerwowość, szybka męczliwość |
| kortyzol | choroby | zespół Cushinga (wysoki), choroba Addisona (niski) |
| kortyzol | jak obniżyć | techniki relaksacyjne, higiena snu, rytm dobowy, ograniczenie stresu, aktywność fizyczna |

### K4 (Diag – Hormon stresu)

| Entity | Attribute | Value |
|--------|-----------|-------|
| kortyzol | budowa | hormon sterydowy z cholesterolu |
| kortyzol | receptory | na niemalże każdej komórce organizmu |
| kortyzol | funkcje metaboliczne | regulacja węglowodanów, białek, tłuszczy; produkcja glukozy w wątrobie/mięśniach |
| kortyzol | funkcje dodatkowe | gospodarka Na/K, hamowanie stanu zapalnego, działanie przeciwalergiczne |
| kortyzol | nadczynność nadnerczy | hiperglikemia, nadciśnienie, częste infekcje, twarz księżyc w pełni, bawoli kark, żabi brzuch |
| kortyzol | niedoczynność nadnerczy | osłabienie, hipoglikemia, nudności, wymioty, biegunka, przebarwienia skóry brązowe (cisawica) |
| kortyzol | zespół Cushinga | guz przysadki lub nadnerczy |
| kortyzol | choroba Addisona | niszczenie nadnerczy przez autoprzeciwciała |
| kortyzol | diagnostyka | pomiar stężenia kortyzolu we krwi rano (najwyższe ok. 8:00) |

### K5 (Medistore – Norma, objawy, badanie)

| Entity | Attribute | Value |
|--------|-----------|-------|
| kortyzol | definicja | hormon steroidowy z nadnerczy, najaktywniejszy glikokortykosteroid |
| kortyzol | rytm dobowy | najwyższy nad ranem, spada w nocy |
| kortyzol | funkcje | regulacja glukozy, lipoliza, hamowanie stanu zapalnego, wspomaganie trawienia, regulacja ciśnienia, wpływ na układ nerwowy i nastrój |
| kortyzol | wpływ na układ nerwowy | koncentracja, funkcje poznawcze (w małych dawkach mobilizuje, w dużych blokuje) |
| kortyzol | wpływ na nastrój | długotrwały nadmiar → bezsenność, chroniczne zmęczenie, zaburzenia nastroju, depresja |
| kortyzol | wapń | hamuje wchłanianie wapnia → osteoporoza, zaniki mięśniowe |
| kortyzol | gospodarka wodno-elektrolitowa | zatrzymanie Na i wody, usuwanie K z moczem, albuminuria |
| kortyzol | stres | uruchamia mechanizmy adaptacyjne, przyspiesza bicie serca, aktywacja adrenaliny/noradrenaliny |
| kortyzol | płodność | u kobiet: nieregularne cykle, zaburzenia owulacji; u mężczyzn: pogorszona jakość nasienia |
| kortyzol | tycie | wzrost masy ciała, przyrost tkanki tłuszczowej (twarz, szyja, tułów) |
| kortyzol | wypadanie włosów | łysienie androgenowe, uszkodzenie macierzy włosów |
| kortyzol | trądzik | wzrost wydzielania sebum, zatkanie gruczołów skórnych |
| kortyzol | depresja | bezsenność → zmniejszenie serotoniny |
| kortyzol | tarczyca | może wywołać nadczynność lub niedoczynność |
| kortyzol | objawy niskiego | niska tolerancja na stres, ciągłe zmęczenie, omdlenia, niskie ciśnienie, szybkie męczenie, częste biegunki, chęć na słone jedzenie, utrata masy ciała |
| kortyzol | objawy wysokiego | pogorszenie samopoczucia, spadek nastroju, zwiększony apetyt (słodycze), tycie (brzuch/biodra), osłabiona odporność, spadek libido, nadmierne pragnienie, częste oddawanie moczu, podwyższona glukoza |
| kortyzol | badanie krwi | próbka krwi (najczęściej), ślina (mniej stresujące), mocz (frakcja wolnego kortyzolu) |
| kortyzol | normy (rano) | wartości referencyjne zależne od laboratorium |

### K6 (Adamed Expert – Jak obniżyć)

| Entity | Attribute | Value |
|--------|-----------|-------|
| kortyzol | definicja | hormon steroidowy z kory nadnerczy, hormon stresu |
| kortyzol | funkcje | reakcja na stres, metabolizm tłuszczów/białek/węglowodanów, regulacja ciśnienia/glukozy/odporności |
| kortyzol | mechanizm walka-ucieczka | gwałtowny wyrzut w sytuacjach stresowych |
| kortyzol | normy (rano) | 138-690 nmol/l |
| kortyzol | normy (wieczór) | 83-358 nmol/l |
| kortyzol | badanie | na czczo, krew żylna, pomiar ACTH |
| kortyzol | nadmiar | przewlekły stres, choroba endokrynologiczna, zespół Cushinga |
| kortyzol | objawy nadmiaru | tycie (twarz/brzuch), bezsenność, depresja, osłabienie mięśni, zaburzenia koncentracji, nadciśnienie, wdowi garb, wzrost cukru, insulinooporność, obniżenie odporności, spadek libido |
| kortyzol | przyczyny nadmiaru | guzy nadnerczy lub przysadki |
| kortyzol | niedobór | choroba Addisona |
| kortyzol | objawy niedoboru | osłabienie, spadek ciśnienia, hipoglikemia, brak apetytu, chudnięcie, apatia, depresja, przełom nadnerczowy (zagrożenie życia) |
| kortyzol | cena badania | 60-80 zł |
| kortyzol | leczenie nadmiaru | farmakoterapia, operacja neurochirurgiczna, radioterapia (guz ACTH), terapia substytucyjna (niedobór) |
| kortyzol | wsparcie dodatkowe | obniżenie stresu, poprawa snu, aktywność fizyczna, suplementacja (ashwagandha, różeniec, melisa, omega-3, passiflora, żeń-szeń) |
| kortyzol | leczenie niedoboru | hydrokortyzon doustnie, fludrokortyzon |
| kortyzol | kontrola lekarska | endokrynolog |

### K7 (LuxMed Lublin Lab – Badanie)

| Entity | Attribute | Value |
|--------|-----------|-------|
| kortyzol | definicja | hormon z warstwy pasmowatej kory nadnerczy |
| kortyzol | funkcje | metabolizm glukozy, rozkład kwasów tłuszczowych, regulacja soli, przeciwzapalne |
| kortyzol | hormon stresu | poziom zwiększa się w sytuacjach stresowych (psychicznych i fizycznych) |
| kortyzol | produkcja | pod wpływem ACTH (hormon adrenokortykotropowy) |
| kortyzol | rytm dobowy | najwyższy rano, najniższy około północy |
| kortyzol | cel badania | diagnostyka zaburzeń wydzielania, choroba Cushinga, zaburzenia nadnerczy/przysadki |
| kortyzol | nazwa alternatywna | hydrokortyzon |
| kortyzol | objawy wysokiego | spadek wydolności, utrata sił, obniżenie nastroju, bezsenność, depresja, wzrost glukozy, nadciśnienie, obniżenie libido, nieregularne miesiączki, częste infekcje, charakterystyczny rozkład tłuszczu (górne partie ciała), cienka skóra, czerwone rozstępy, utrata masy mięśniowej |
| kortyzol | przyczyny wysokiego | depresja, długotrwały stres, choroba alkoholowa, kortykosteroidy, choroba Cushinga, nowotwory, gruczolaki przysadki, guzy nadnerczy, anoreksja |
| kortyzol | przyczyny niskiego | niedoczynność nadnerczy (choroba Addisona), wrodzony przerost kory nadnerczy, niedoczynność przysadki/podwzgórza |
| kortyzol | normy (przed południem) | 37-194 ng/ml |
| kortyzol | normy (po południu) | 29-173 ng/ml |
| kortyzol | jak obniżyć | ćwiczenia oddechowe, zdrowy styl życia, techniki relaksacyjne, ćwiczenia fizyczne, suplementacja (omega-3, wit. C, wit. B, magnez, chrom, wapń) |

### K8 (Apteka Rosa – Co to jest kortyzol)

| Entity | Attribute | Value |
|--------|-----------|-------|
| kortyzol | definicja | hormon steroidowy z kory nadnerczy, hormon stresu |
| kortyzol | regulacja | przysadka mózgowa przez ACTH |
| kortyzol | funkcje | reakcja na stres, metabolizm tłuszczów/białek/węglowodanów, regulacja ciśnienia/glukozy/odporności |
| kortyzol | rytm dobowy | najwyższy rano 138-690 nmol/l, najniższy wieczorem 83-358 nmol/l |
| kortyzol | badanie | na czczo, krew żylna, pomiar ACTH |
| kortyzol | nadmiar | zespół Cushinga |
| kortyzol | objawy nadmiaru | tycie (twarz/brzuch), bezsenność, depresja, osłabienie mięśni, zaburzenia koncentracji, nadciśnienie, wdowi garb, wzrost cukru, insulinooporność, spadek libido |
| kortyzol | niedobór | choroba Addisona |
| kortyzol | objawy niedoboru | osłabienie, spadek ciśnienia, hipoglikemia, brak apetytu, chudnięcie, apatia, depresja |
| kortyzol | leczenie | farmakoterapia, operacja, radioterapia, hydrokortyzon, fludrokortyzon |
| kortyzol | suplementy obniżające | ashwagandha, różeniec górski, melisa, omega-3, passiflora, żeń-szeń |
| kortyzol | pytania FAQ | czy zmienia się z wiekiem (TAK - wzrasta), czy wpływa na skórę (TAK - sebum, elastyczność, starzenie, trądzik, egzema), czy deficyt jest groźny (TAK - zaburzenia metaboliczne, kryzys nadnerczowy) |

### K9 (LuxMed – Hormon stresu)

| Entity | Attribute | Value |
|--------|-----------|-------|
| kortyzol | definicja | naturalny hormon steroidowy, hormon stresu, z warstwy pasmowatej kory nadnerczy |
| kortyzol | produkcja | pod wpływem hormonu z przysadki mózgowej |
| kortyzol | funkcje | reakcja walka-ucieczka, podwyższenie glukozy, zwiększenie częstości skurczu serca, efekt przeciwzapalny, uwalnianie kwasów tłuszczowych, rozpad białek, wydzielanie kwasu żołądkowego, podniesienie ciśnienia, filtracja w nerkach, gospodarka wodno-elektrolitowa |
| kortyzol | rytm dobowy | wysoki rano, najniższy wieczorem/w nocy (sprzyja zasypianiu) |
| kortyzol | normy (rano) | 7-25 µg/dl |
| kortyzol | normy (wieczór) | 2-9 µg/dl |
| kortyzol | kiedy badać | przewlekłe zmęczenie, wahania masy ciała bez przyczyny, trudności ze snem, huśtawki nastroju, podwyższone ciśnienie |
| kortyzol | badanie | krew (najczęściej), rzadziej mocz dobowy |
| kortyzol | przygotowanie do badania | unikać stresu, ograniczyć intensywny wysiłek, odstawić leki (konsultacja z lekarzem) |
| kortyzol | hiperkortyzolemią | otyłość, cukrzyca typu 2, spadek odporności, trudności w gojeniu ran, nadciśnienie, zaburzenia nastroju, bezsenność, osłabienie kości, osłabienie mięśni, zachwiana gospodarka hormonalna |
| kortyzol | choroba Cushinga | guz przysadki, wtórna nadczynność nadnerczy |
| kortyzol | objawy Cushinga | otyłość (szczupłe kończyny, nadmiar tłuszczu brzuch), twarz księżycowata, rozstępy czerwonosinne (brzuch/biodra/piersi/uda), zaniki mięśni, zwiększona podatność na infekcje, osteoporoza |
| kortyzol | jak obniżyć | regularny sen, aktywność fizyczna, zbilansowana dieta (warzywa, owoce, zdrowe tłuszcze roślinne, pełnoziarniste zboża, rośliny strączkowe, jogurty, kefiry, gorzka czekolada, zielona herbata), techniki relaksacyjne (joga, medytacja, głębokie oddychanie, terapia śmiechem) |
| kortyzol | niski poziom | choroba Addisona (pierwotna niedoczynność kory nadnerczy) |
| kortyzol | objawy niskiego | przewlekłe osłabienie, senność, omdlenia, niskie ciśnienie, biegunki, ochota na słone przekąski, kiepska tolerancja stresu/wysiłku |
| kortyzol | kortyzol a odchudzanie | nadmiar kortyzolu → wzrost apetytu, podjadanie, gromadzenie tłuszczu trzewnego na brzuchu, spowolnienie metabolizmu |

---

## 3. Attribute Classification (URR)

Klasyfikacja atrybutów na podstawie częstości wystąpień u 9 konkurentów:

| Attribute | K1 | K2 | K3 | K4 | K5 | K6 | K7 | K8 | K9 | Częstość | Klasyfikacja |
|-----------|----|----|----|----|----|----|----|----|----|---------:|--------------|
| Definicja kortyzolu | ✓ | ✓ | ✓ | ✓ | ✓ | ✓ | ✓ | ✓ | ✓ | 9/9 | **ROOT** |
| Funkcje kortyzolu (glukoza, metabolizm) | ✓ | ✓ | ✓ | ✓ | ✓ | ✓ | ✓ | ✓ | ✓ | 9/9 | **ROOT** |
| Objawy wysokiego kortyzolu | ✓ | ✓ | ✓ | ✓ | ✓ | ✓ | ✓ | ✓ | ✓ | 9/9 | **ROOT** |
| Objawy niskiego kortyzolu | — | — | ✓ | ✓ | ✓ | ✓ | ✓ | ✓ | ✓ | 7/9 | **ROOT** |
| Rytm dobowy kortyzolu | — | — | — | ✓ | ✓ | ✓ | ✓ | ✓ | ✓ | 6/9 | **ROOT** |
| Normy kortyzolu (wartości liczbowe) | — | — | ✓ | — | — | ✓ | ✓ | ✓ | ✓ | 5/9 | **ROOT** |
| Jak obniżyć kortyzol | ✓ | — | ✓ | — | — | ✓ | ✓ | ✓ | ✓ | 6/9 | **ROOT** |
| Zespół Cushinga | — | ✓ | ✓ | ✓ | — | ✓ | ✓ | ✓ | ✓ | 7/9 | **ROOT** |
| Choroba Addisona | — | — | ✓ | ✓ | — | ✓ | ✓ | ✓ | ✓ | 6/9 | **ROOT** |
| Badanie kortyzolu (procedura) | — | — | — | ✓ | ✓ | ✓ | ✓ | ✓ | ✓ | 6/9 | **ROOT** |
| Dieta kortyzolowa (produkty spożywcze) | ✓ | — | — | — | — | — | — | — | ✓ | 2/9 | **UNIQUE** |
| Czynniki redukujące kortyzol (lista) | — | ✓ | — | — | — | — | — | — | — | 1/9 | **UNIQUE** |
| Czynniki zwiększające kortyzol (lista) | — | ✓ | — | — | — | — | — | ✓ | — | 2/9 | **UNIQUE** |
| Wzór chemiczny kortyzolu | — | ✓ | — | — | — | — | — | — | — | 1/9 | **UNIQUE** |
| Kortyzol a tycie/odchudzanie | — | — | — | — | ✓ | — | — | — | ✓ | 2/9 | **UNIQUE** |
| Kortyzol a płodność/libido | — | — | — | — | ✓ | — | — | — | — | 1/9 | **UNIQUE** |
| Kortyzol a wypadanie włosów | — | — | — | — | ✓ | — | — | ✓ | — | 2/9 | **UNIQUE** |
| Kortyzol a trądzik/skóra | — | — | — | — | ✓ | — | — | ✓ | — | 2/9 | **UNIQUE** |
| Kortyzol a depresja | — | — | ✓ | — | ✓ | ✓ | ✓ | ✓ | ✓ | 6/9 | **ROOT** |
| Kortyzol a tarczyca | — | — | — | — | ✓ | — | — | — | — | 1/9 | **UNIQUE** |
| Suplementy obniżające (ashwagandha, omega-3) | ✓ | — | — | — | — | ✓ | ✓ | ✓ | — | 4/9 | **RARE** |
| Techniki relaksacyjne | ✓ | ✓ | ✓ | — | — | ✓ | ✓ | — | ✓ | 6/9 | **ROOT** |
| Kortyzol a wapń/osteoporoza | — | — | — | — | ✓ | — | — | — | ✓ | 2/9 | **UNIQUE** |
| Kortyzol a bawoli kark/twarz księżycowata | — | ✓ | ✓ | ✓ | — | ✓ | — | ✓ | ✓ | 6/9 | **ROOT** |
| ACTH (hormon adrenokortykotropowy) | — | — | — | — | — | ✓ | ✓ | ✓ | — | 3/9 | **RARE** |
| Kortyzol a sen/bezsenność | ✓ | — | — | — | ✓ | ✓ | ✓ | ✓ | ✓ | 6/9 | **ROOT** |
| Cena badania kortyzolu | — | — | — | — | — | ✓ | — | — | — | 1/9 | **UNIQUE** |
| Leczenie nadmiaru/niedoboru | — | — | — | — | — | ✓ | — | ✓ | — | 2/9 | **UNIQUE** |
| Kortyzol a odporność | ✓ | — | — | ✓ | — | ✓ | ✓ | — | ✓ | 5/9 | **ROOT** |

**Podsumowanie klasyfikacji:**
- **ROOT (5+ z 9 konkurentów):** 15 atrybutów – fundamenty artykułu
- **RARE (3-4 z 9 konkurentów):** 2 atrybuty – wartość dodana
- **UNIQUE (1-2 z 9 konkurentów):** 12 atrybutów – potencjalne różnicujące (z czego Wzór chemiczny P4 = pominąć)

**Razem:** 29 atrybutów (15 ROOT + 2 RARE + 12 UNIQUE)

---

## 4. Gap Analysis – COVERED/GAP/UNIQUE

Porównanie sub-queries z ramki semantycznej z pokryciem w EAV konkurentów:

| # | Sub-query | Status | Atrybuty z EAV | Priorytet | Akcja |
|---|-----------|--------|----------------|-----------|-------|
| 1 | czym jest kortyzol i jaką pełni funkcję | **COVERED** | Definicja (ROOT), Funkcje (ROOT) | P1 | H2: Podstawy |
| 2 | normy kortyzolu - ile powinno być | **COVERED** | Normy (ROOT) | P1 | H2: Normy |
| 3 | objawy wysokiego kortyzolu | **COVERED** | Objawy wysokiego (ROOT) | P1 | H2: Objawy wysokiego |
| 4 | jak obniżyć kortyzol naturalnie | **COVERED** | Jak obniżyć (ROOT), Techniki relaksacyjne (ROOT) | P1 | H2: Jak obniżyć |
| 5 | kortyzol a stres | **COVERED** | Hormon stresu (ROOT), mechanizm walka-ucieczka | P2 | H3 w sekcji Funkcje |
| 6 | badanie kortyzolu | **COVERED** | Badanie (ROOT) | P1 | H2: Badanie |
| 7 | przyczyny podwyższonego kortyzolu | **COVERED** | Przyczyny wysokiego (ROOT), Czynniki zwiększające (UNIQUE) | P2 | H3 w sekcji Objawy wysokiego |
| 8 | kortyzol rano i wieczorem - rytm dobowy | **COVERED** | Rytm dobowy (ROOT) | P2 | H3 w sekcji Normy |
| 9 | niedobór kortyzolu - objawy i leczenie | **COVERED** | Objawy niskiego (ROOT), Choroba Addisona (ROOT) | P1 | H2: Niedobór |
| 10 | kortyzol a tycie | **GAP** | Kortyzol a tycie (UNIQUE, tylko 2/9) | P2 | **Nowa sekcja H2** |
| 11 | co zrobić żeby obniżyć kortyzol [SERP-ONLY] | **COVERED** | Jak obniżyć (ROOT) | P1 | H2: Jak obniżyć |
| 12 | domowy test na kortyzol [SERP-ONLY] | **GAP** | Brak wzmianek | P2 | **H3 w sekcji Badanie** |
| 13 | kortyzol tabletki [SERP-ONLY] | **GAP** | Leczenie (UNIQUE, tylko 2/9) | P3 | **H3 w sekcji Leczenie** |
| 14 | kortyzol poziom [SERP-ONLY] | **COVERED** | Normy (ROOT) | P2 | H2: Normy |

### Dodatkowe UNIQUE/RARE attributes jako content gaps:

| Attribute | Status | Częstość | Priorytet | Akcja |
|-----------|--------|----------|-----------|-------|
| **Dieta kortyzolowa (produkty spożywcze)** | **UNIQUE** | 2/9 | **P1** | **H2: Dieta kortyzolowa (TOP 3 GAP)** |
| **Kortyzol a płodność/libido** | **UNIQUE** | 1/9 | **P1** | **H3 w sekcji Wpływ na organizm (TOP 3 GAP)** |
| **Kortyzol a wypadanie włosów** | **UNIQUE** | 2/9 | **P2** | **H3 w sekcji Wpływ na organizm** |
| **Kortyzol a trądzik/skóra** | **UNIQUE** | 2/9 | **P2** | **H3 w sekcji Wpływ na organizm** |
| **Kortyzol a tarczyca** | **UNIQUE** | 1/9 | **P2** | **H3 w sekcji Wpływ na organizm** |
| **Kortyzol a wapń/osteoporoza** | **UNIQUE** | 2/9 | **P2** | **H3 w sekcji Wpływ na organizm** |
| **Czynniki redukujące/zwiększające (lista Wiki)** | **UNIQUE** | 1-2/9 | **P2** | **FAQ lub Box w sekcji Jak obniżyć** |
| **Cena badania kortyzolu** | **UNIQUE** | 1/9 | **P3** | **H3 w sekcji Badanie** |
| **Wzór chemiczny** | **UNIQUE** | 1/9 | **P4** | Pominąć (zbyt techniczny dla portalu medycznego) |

---

## 5. Podsumowanie Gap Analysis

### TOP 3 Content Gaps (P1-P2) – UNIQUE Differentiators:

1. **Dieta kortyzolowa – szczegółowe produkty spożywcze i przepisy** (UNIQUE, 2/9)
   - Tylko DOZ i LuxMed wspominają konkretne produkty (orzechy, kakao, ryby, warzywa)
   - **Opportunity:** Rozszerzona lista produktów obniżających kortyzol + produkty do unikania + przykładowy jadłospis

2. **Kortyzol a płodność, libido i cykl menstruacyjny** (UNIQUE, 1/9)
   - Tylko Medistore wspomina wpływ na płodność (nieregularne cykle, owulację, jakość nasienia)
   - **Opportunity:** Rozwinięcie wpływu kortyzolu na układ rozrodczy (kobiety i mężczyźni)

3. **Kortyzol a tycie, odchudzanie i rozkład tkanki tłuszczowej** (UNIQUE, 2/9 + GAP w sub-queries)
   - Tylko Medistore i LuxMed rozwijają temat metabolizmu tłuszczu i trudności w odchudzaniu
   - **Opportunity:** Dedykowana sekcja H2 o mechanizmach tycia, otyłości brzusznej i strategiach odchudzania

### Dodatkowe gaps P2-P3:

- **Domowy test na kortyzol** (SERP-ONLY, brak u konkurentów)
- **Kortyzol tabletki/leczenie farmakologiczne** (SERP-ONLY, tylko 2/9)
- **Kortyzol a wypadanie włosów** (2/9)
- **Kortyzol a trądzik/skóra** (2/9)
- **Kortyzol a tarczyca** (1/9)
- **Kortyzol a osteoporoza/wapń** (2/9)
- **Cena badania** (1/9)

---

## 6. Walidacja

✅ **Min 7 konkurentów:** 9/9 OK
✅ **EAV Matrix:** 29 atrybutów zidentyfikowanych
✅ **Klasyfikacja URR:** ROOT (15), RARE (2), UNIQUE (12)
✅ **Każdy atrybut sklasyfikowany:** ✓
✅ **Gaps priorytet P1-P4:** ✓ (TOP 3 + 7 dodatkowych)
✅ **Min 1 UNIQUE attribute:** ✓ (13 UNIQUE attributes)
✅ **Sub-queries tagged [CONFIRMED]/[PREDICTED]/[SERP-ONLY]:** ✓ (6 CONFIRMED, 4 PREDICTED, 4 SERP-ONLY)

---

**Data utworzenia:** 2026-02-05
**Źródło danych:** data/briefs/kortyzol/01_topic_research.md + data/briefs/kortyzol/competitors/_consolidated.md + SERP (10 organic + PAA + Related)