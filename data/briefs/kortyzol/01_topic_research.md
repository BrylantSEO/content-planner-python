# Topic Research: Kortyzol

## 1. CSI Definition

| Element | Wartość |
|---------|---------|
| **CE** | kortyzol |
| **SC** | portal medyczny (serwis z artykułami medycznymi dla pacjentów) |
| **CSI** | Zrozumienie kortyzolu jako hormonu stresu z perspektywy zdrowia i samopoczucia pacjenta |
| **Predykaty** | zrozumieć, zbadać, obniżyć, rozpoznać, zarządzać |

## 2. Ramka semantyczna

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

## 3. Query Fanout

| # | Sub-query | Element ramki | Pokrycie |
|---|-----------|---------------|----------|
| 1 | "czym jest kortyzol i jaką pełni funkcję" | Purpose | Do pokrycia |
| 2 | "normy kortyzolu - ile powinno być" | Quantity | Do pokrycia |
| 3 | "objawy wysokiego kortyzolu u kobiet i mężczyzn" | Result | Do pokrycia |
| 4 | "jak obniżyć kortyzol naturalnie dieta suplementy" | Manner | Do pokrycia |
| 5 | "kortyzol a stres - jak stres wpływa na kortyzol" | Condition + Agent | Do pokrycia |
| 6 | "badanie kortyzolu - przygotowanie i interpretacja" | Instrument + Time | Do pokrycia |
| 7 | "przyczyny podwyższonego kortyzolu" | Cause | Do pokrycia |
| 8 | "kortyzol rano i wieczorem - rytm dobowy" | Time | Do pokrycia |
| 9 | "niedobór kortyzolu - objawy i leczenie" | Negation | Do pokrycia |
| 10 | "kortyzol a tycie - czy kortyzol tuczy" | Result + Patient | Do pokrycia |

## 4. Terminologia rozszerzona

| Relacja | Terminy |
|---------|---------|
| **Synonimy** | hydrokortyzol, hormon stresu, kortyzol wolny, kortyzol całkowity |
| **Hiperonimy** | glikokortykosteroidy, hormony steroidowe, hormony kory nadnerczy, kortykosteroidy |
| **Hiponimy** | kortyzol w surowicy, kortyzol w ślinie, kortyzol w moczu dobowym, kortyzol we krwi |
| **Meronimy** | oś HPA (podwzgórze-przysadka-nadnercza), nadnercza, kora nadnerczy, ACTH, CRH |
| **Antonimy/kontrasty** | relaksacja, odpoczynek, homeostaza, równowaga hormonalna, parasympatyczny |
| **Related terms** | ACTH, syndrom Cushinga, choroba Addisona, niewydolność nadnerczy, hiperkortyzolemia, hipokortyzolemia, metabolizm, glukoneogeneza, immunosupresja |

## 5. Podsumowanie dla kolejnych kroków

- **CE:** kortyzol
- **Kluczowe atrybuty do zbadania:**
  - Funkcje i znaczenie (Purpose)
  - Normy laboratoryjne (Quantity)
  - Objawy zaburzeń - nadmiar i niedobór (Result, Negation)
  - Metody obniżania naturalnego (Manner)
  - Związek ze stresem (Condition, Agent)
  - Badania i diagnostyka (Instrument, Time)
  - Przyczyny zaburzeń (Cause)
  - Rytm dobowy (Time)
  - Wpływ na wagę i metabolizm (Result, Patient)

- **Top 3 sub-queries:**
  1. "objawy wysokiego kortyzolu u kobiet i mężczyzn"
  2. "jak obniżyć kortyzol naturalnie dieta suplementy"
  3. "kortyzol a stres - jak stres wpływa na kortyzol"

- **Terminy obowiązkowe:** kortyzol, hormon stresu, nadnercza, oś HPA, ACTH, syndrom Cushinga, choroba Addisona, glikokortykosteroidy, normy kortyzolu, kortyzol wolny, rytm dobowy, hiperkortyzolemia
