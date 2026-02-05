# Scores: Kortyzol, czyli hormon stresu - normy i objawy podwyższenia

**Source:** Salve.pl
**URL:** https://salve.pl/aktualnosci/kortyzol-czyli-hormon-stresu-normy-i-objawy-podwyzszenia,42889
**Długość:** 1867 słów
**Liczba H2:** 8
**Data audytu:** 2026-02-05

## CSI
**CE:** Kortyzol
**SC:** Portal medyczny dla pacjentów (Salve Medica Przychodnie)
**Predicate:** Zrozumieć funkcje, normy i skutki wysokiego poziomu hormonu stresu
**CSI pełne:** "Pomóc pacjentowi zrozumieć czym jest kortyzol, jakie są normy, objawy podwyższenia i jak leczyć wysokie stężenie hormonu stresu"

## PAA Coverage

| PAA | Sekcja | Coverage | Brak |
|-----|--------|----------|------|
| Jakie są objawy wysokiego kortyzolu? | H2 "Jakie są objawy podwyższonego kortyzolu?" | ✅ POKRYTY | Brak podziału na objawy ostre vs przewlekłe w osobnych H3 |
| Co zrobić, żeby obniżyć kortyzol? | H2 "Jak leczyć powyższony kortyzol?" | ⚠️ CZĘŚCIOWO | Brak praktycznych porad (dieta, sen, ćwiczenia) - tylko farmakoterapia/operacje |
| Za co odpowiada kortyzol? | H2 "Jakie funkcje pełni kortyzol w ciele człowieka?" | ✅ POKRYTY | Brak podsumowania w 1 zdaniu na początku sekcji |
| Jak obniżyć poziom kortyzolu? | H2 "Jak leczyć powyższony kortyzol?" | ⚠️ CZĘŚCIOWO | Zbyt medyczne (endokrynolog, operacje), brak praktycznych wskazówek dla pacjenta |

**PAA Score:** 2.5/4 pytań w pełni pokrytych

## Scores

| Wymiar | Score | Top Problem |
|--------|-------|-------------|
| **CSI Alignment** | 6/10 | Brak Zespołu Cushinga i Choroby Addisona (P1 gaps), brak UNIQUE wyeksponowania |
| **BLUF** | 2/10 | Lead opisowy (kontekst problemu), brak odpowiedzi. H2 bez BLUF, zaczynają od wyjaśnień |
| **Chunk Quality** | 5/10 | 3 sekcje >500 słów, brak autonomiczności (referencje do "powyższe objawy"), słaba CE repeat |
| **URR Placement** | 4/10 | ROOT gaps (Cushing, Addison), UNIQUE ukryty w bullet (metylacja DNA), brak H1 UNIQUE |
| **Cost of Retrieval** | 6/10 | Normy w tekście ciągłym (5-25 µg/dl nie wyróżnione), listy bullet bez bolda na faktach |
| **Information Density** | 7/10 | 18 faktów w 1867 słów = 1 fakt/104 słowa (dobra density), ale filler w Lead i przejściach |
| **SRL Salience** | 4/10 | CE w roli Patient 12× (pasywne), Agent tylko 3× (aktywne). Brak transformacji SRL |
| **TF-IDF Quality** | 7/10 | 9/10 terminów obowiązkowych, brak "wolny kortyzol", "oś HPA", "hiperplazja nadnerczy" |
| **EEAT (avg)** | 5.5/10 | Brak autora/eksperta, brak daty aktualizacji, bibliografia OK (4 źródła), disclaimer ogólny |

**EEAT detail:** Experience 4/10 | Expertise 5/10 | Authority 6/10 | Trust 7/10

## EAV (artykuł)

| Entity | Attribute | Value |
|--------|-----------|-------|
| Kortyzol | Klasa chemiczna | Glikokortykosteroidy |
| Kortyzol | Miejsce syntezy | Kora nadnerczy |
| Kortyzol | Regulacja | ACTH (hormon przysadki mózgowej) |
| Kortyzol | Funkcja ewolucyjna | Mechanizm walcz-uciekaj |
| Kortyzol | Norma poranna | 5-25 µg/dl |
| Kortyzol | Norma wieczorna | 2-9 µg/dl |
| Kortyzol | Rytm | Dobowy (najwyższy rano) |
| Kortyzol | Wpływ na naczynia | Zwężenie → wzrost ciśnienia |
| Kortyzol | Wpływ na serce | Przyspieszenie akcji |
| Kortyzol | Wpływ na metabolizm | Glukoneogeneza → wzrost glukozy |
| Kortyzol | Wpływ na kości | Uwolnienie wapnia |
| Kortyzol | Wpływ na zmysły | Wyostrzenie |
| Kortyzol | Wpływ na źrenice | Rozszerzenie |
| Kortyzol | Skutek przewlekły: serce | Kardiomiopatia |
| Kortyzol | Skutek przewlekły: odporność | Spadek, wzrost infekcji |
| Kortyzol | Skutek przewlekły: płodność | Niepłodność, zaburzenia cyklu |
| Kortyzol | Skutek przewlekły: metabolizm | Otyłość, zwolnienie metabolizmu |
| Kortyzol | Skutek przewlekły: mięśnie | Rozkład białek, osłabienie |
| Kortyzol | Skutek przewlekły: kości | Osteoporoza, złamania |
| Kortyzol | Skutek molekularny | Metylacja DNA → wyciszenie genów |
| Kortyzol | Metoda badania 1 | Krew z żyły łokciowej |
| Kortyzol | Metoda badania 2 | Dobowa zbiórka moczu |
| Kortyzol | Metoda badania 3 | Próbka śliny |
| Kortyzol | Leczenie medyczne | Farmakoterapia (endokrynolog) |
| Kortyzol | Leczenie chirurgiczne | Wycięcie guzów |
| Kortyzol | Leczenie onkologiczne | Chemioterapia, radioterapia |
| Kortyzol | Leczenie behawioralne | Zmiana stylu życia, psychoterapia |
| Choroba Cushinga | Definicja | Jedna z przyczyn wysokiego kortyzolu |
| Stres | Relacja z kortyzolem | Główna przyczyna podwyższenia |
| Endokrynolog | Rola | Diagnostyka i leczenie zaburzeń kortyzolu |

## Chunk Analysis

| H2 | Słowa | BLUF | CE repeat | Autonomia | Score |
|----|-------|------|-----------|-----------|-------|
| Lead | 59 | ❌ (kontekst, nie odpowiedź) | 1× | ❌ (brak definicji) | 3/10 |
| Co to jest kortyzol? | 118 | ❌ (definicja w 2. zdaniu) | 5× | ✅ | 6/10 |
| Jakie funkcje pełni kortyzol w ciele człowieka? | 164 | ❌ (wyjaśnienie, nie lista) | 4× | ⚠️ (ref do "wyrzut") | 5/10 |
| Kortyzol - normy | 28 | ❌ (tylko wartości) | 2× | ✅ | 4/10 |
| Jakie są przyczyny wysokiego kortyzolu? | 121 | ❌ (kontekst XXI w.) | 3× | ✅ | 6/10 |
| Jakie są objawy podwyższonego kortyzolu? | 61 | ❌ (opis doświadczenia) | 1× | ⚠️ (ref do "wyrzut") | 5/10 |
| Jakie są skutki przewlekle podwyższonego kortyzolu? | 250 | ❌ (wprowadzenie) | 2× | ⚠️ (ref do "powyższe objawy") | 4/10 |
| Jak zbadać poziom kortyzolu? | 75 | ⚠️ (metoda, nie cel) | 3× | ✅ | 6/10 |
| Jak leczyć powyższony kortyzol? | 73 | ❌ (warunek "jeśli") | 2× | ⚠️ (ref do "powyższony") | 5/10 |

**Problemy chunków:**
- Sekcja "Skutki przewlekle podwyższonego kortyzolu" = 250 słów (za długa, brak podziału H3)
- Sekcja "Jakie funkcje pełni kortyzol w ciele człowieka?" = 164 słowa (granica, ale OK)
- Brak BLUF w ŻADNEJ sekcji
- Referencje "powyższe objawy", "powyższony kortyzol" = brak autonomiczności

## Problematyczne fragmenty

| # | Sekcja | Wymiar | Problem | Cytat BEFORE |
|---|--------|--------|---------|--------------|
| 1 | Lead | BLUF | Brak odpowiedzi, tylko kontekst problemu | "W dzisiejszych czasach stres towarzyszy każdemu człowiekowi w pracy zawodowej, życiu osobistym, obowiązkach domowych. Każdego dnia zmagamy się z sytuacjami, które go wywołują w mniejszym lub większym stopniu. Podczas stresowania się miejsce ma wyrzut kortyzolu, zwanego hormonem stresu. Co warto o nim wiedzieć?" |
| 2 | Co to jest kortyzol? | BLUF | Definicja w 2. zdaniu, nie w 1. | "Kortyzol (tzw. hormon stresu) należy do glikokortykosteroidów syntezowanych i wydzielanych przez korę nadnerczy, jednak oba te procesy są regulowane przez ACTH - hormon przysadki mózgowej." |
| 3 | Jakie funkcje pełni kortyzol w ciele człowieka? | BLUF | Brak podsumowania funkcji przed listą bullet | "Kortyzol zwany jest hormonem stresu, ponieważ jego wyrzut ma miejsce właśnie w odpowiedzi organizmu na czynniki stresogenne, co wyzwala silne pobudzenie współczulnego układu nerwowego. W efekcie: [lista]" |
| 4 | Kortyzol - normy | CoR | Normy nie wyróżnione, wplecione w tekst ciągły | "Standardowa próbka krwi pobrana w godzinach porannych powinna dać wynik pomiędzy 5 a 25 µg/dl. Wieczorem poziom kortyzolu najczęściej maleje do 2–9 µg/dl." |
| 5 | Jakie są skutki przewlekle podwyższonego kortyzolu? | Chunk Quality | 250 słów, 14 bullet points - za długa sekcja bez H3 | "Zdarza się jednak, zwłaszcza przy przewlekłym stresie, że żadne powyższe objawy nie wystąpią, a mimo tego poziom kortyzolu jest podwyższony, co utrzymuje się przez dłuższy czas lub pojawia bardzo często. Przewlekle podwyższony kortyzol może mieć następujące konsekwencje zdrowotne: [14 bullets]" |
| 6 | Jakie są skutki przewlekle podwyższonego kortyzolu? | URR | UNIQUE atrybut (metylacja DNA) ukryty na końcu listy bullet | "Udowodniono również wpływ nadmiernego stężenia kortyzolu na generowanie metylacji DNA, co może w konsekwencji prowadzić do wyciszenia ekspresji genów." |
| 7 | Jak zbadać poziom kortyzolu? | Autonomia | Referencja do kontekstu ("Wówczas"), brak repeat CE | "Wówczas rzetelniejsze jest zbadanie poziomu kortyzolu z dobowej zbiórki moczu lub z próbki śliny." |
| 8 | Jak leczyć powyższony kortyzol? | Autonomia + SRL | Referencja "powyższony" + kortyzol w Patient (nie Agent) | "Jeśli podwyższony poziom kortyzolu wiąże się z chorobami przewlekłymi, dąży się do ich stabilizacji, najczęściej za pomocą starannie dobranej przez endokrynologa farmakoterapii." |
| 9 | Jakie są skutki przewlekle podwyższonego kortyzolu? | Information Density | Filler: "co z kolei" | "pojawia się zmęczenie, apatia, senność, co z kolei obniża samopoczucie i zwiększa ryzyko depresji" |
| 10 | Jakie funkcje pełni kortyzol w ciele człowieka? | SRL | CE w roli Result (nie Agent) | "To właśnie wzrost poziomu kortyzolu odpowiada za motywację, działanie, dążenie do celu" |

## SRL Patient instances

| # | Zdanie | CE rola | Sekcja |
|---|--------|---------|--------|
| 1 | "Kortyzol (tzw. hormon stresu) należy do glikokortykosteroidów syntezowanych i wydzielanych przez korę nadnerczy" | Patient | Co to jest kortyzol? |
| 2 | "oba te procesy są regulowane przez ACTH" | Patient | Co to jest kortyzol? |
| 3 | "odpowiednie ilości kortyzolu są niezbędne do właściwego funkcjonowania całego organizmu" | Patient | Co to jest kortyzol? |
| 4 | "dochodziło wówczas do intensywnego wyrzutu kortyzolu" | Patient | Co to jest kortyzol? |
| 5 | "Współczesny tryb życia niestety powoduje przewlekłe utrzymywanie się wysokiego poziomu kortyzolu" | Patient | Co to jest kortyzol? |
| 6 | "jego wyrzut ma miejsce właśnie w odpowiedzi organizmu na czynniki stresogenne" | Patient | Jakie funkcje pełni kortyzol w ciele człowieka? |
| 7 | "wzrost poziomu kortyzolu odpowiada za motywację" | Result (nie Agent) | Jakie funkcje pełni kortyzol w ciele człowieka? |
| 8 | "kortyzol jest też niezbędny do prawidłowej czynności układu immunologicznego" | Patient | Jakie funkcje pełni kortyzol w ciele człowieka? |
| 9 | "przewlekły nadmiar kortyzolu oraz katecholamin, jest szkodliwy dla człowieka" | Patient | Jakie funkcje pełni kortyzol w ciele człowieka? |
| 10 | "poziom kortyzolu najczęściej maleje do 2–9 µg/dl" | Patient | Kortyzol - normy |
| 11 | "podwyższony kortyzol może być konsekwencją" | Patient | Jakie są przyczyny wysokiego kortyzolu? |
| 12 | "Problem podwyższonego kortyzolu jest realnym zagrożeniem" | Patient | Jakie są przyczyny wysokiego kortyzolu? |
| 13 | "Wyrzut kortyzolu odczuwa się praktycznie natychmiast" | Patient | Jakie są objawy podwyższonego kortyzolu? |
| 14 | "poziom kortyzolu jest podwyższony" | Patient | Jakie są skutki przewlekle podwyższonego kortyzolu? |
| 15 | "Przewlekle podwyższony kortyzol może mieć następujące konsekwencje zdrowotne" | Agent (!) | Jakie są skutki przewlekle podwyższonego kortyzolu? |
| 16 | "kortyzol prowadzi do podwyższenia stężenia sodu" | Agent (!) | Jakie są skutki przewlekle podwyższonego kortyzolu? |
| 17 | "wpływ nadmiernego stężenia kortyzolu na generowanie metylacji DNA" | Agent (!) | Jakie są skutki przewlekle podwyższonego kortyzolu? |
| 18 | "Poziom kortyzolu można zbadać na podstawie analizy próbki krwi" | Patient | Jak zbadać poziom kortyzolu? |
| 19 | "poziom hormonu stresu w momencie wkłucia" | Patient | Jak zbadać poziom kortyzolu? |
| 20 | "zbadanie poziomu kortyzolu z dobowej zbiórki moczu" | Patient | Jak zbadać poziom kortyzolu? |
| 21 | "podwyższony poziom kortyzolu wiąże się z chorobami przewlekłymi" | Patient | Jak leczyć powyższony kortyzol? |

**SRL Pattern:** 18/21 zdań (86%) ma kortyzol w roli Patient (biernej). Tylko 3 zdania mają CE jako Agent działający. To obniża salience w AI Search.

## Brakujące terminy TF-IDF

| Termin | Freq SERP | Priorytet |
|--------|-----------|-----------|
| oś HPA (podwzgórze-przysadka-nadnercza) | 7/9 | P1 |
| wolny kortyzol | 5/9 | P2 |
| hiperplazja nadnerczy | 4/9 | P3 |
| zespół Cushinga (rozwinięcie) | 7/9 | P1 |
| choroba Addisona | 6/9 | P1 |
| test hamowania deksametazonem | 3/9 | P3 |
| allostatic load | 0/9 | P4 (UNIQUE) |
| cortisol awakening response | 0/9 | P4 (UNIQUE) |
| hydrokortyzol | 2/9 | P4 |

## EEAT sygnały

| Wymiar | Obecne | Brakujące |
|--------|--------|-----------|
| **Experience** | - Perspektywa pacjenta (SC) <br> - Kontekst "XXI wiek", "współczesny tryb życia" | - Brak case study / przykładu pacjenta <br> - Brak doświadczenia praktyki klinicznej <br> - Brak anegdot medycznych |
| **Expertise** | - Bibliografia 4 źródła (Medonet, MP, książka naukowa, DOZ) <br> - Terminologia medyczna (glikokortykosteroidy, ACTH, glukoneogeneza) <br> - Wzmianka endokrynolog | - Brak autora/eksperta z nazwiskiem <br> - Brak credentials autora <br> - Brak recenzji medycznej <br> - Brak cytowania badań (tylko "udowodniono") |
| **Authority** | - Portal przychodni "Salve Medica" <br> - Logo/branding przychodni | - Brak informacji o przychodni w treści <br> - Brak linków wewnętrznych do usług przychodni <br> - Brak certyfikatów/akredytacji |
| **Trust** | - Bibliografia z datami dostępu <br> - ISBN książki <br> - Linki do źródeł zewnętrznych | - Brak daty publikacji/aktualizacji <br> - Brak disclaimera medycznego (poza ogólnym footer) <br> - Brak informacji o procesie weryfikacji <br> - Brak data reviewed |

**Najsłabszy wymiar:** Experience (4/10) - brak praktycznych przykładów, case studies, doświadczenia klinicznego.
