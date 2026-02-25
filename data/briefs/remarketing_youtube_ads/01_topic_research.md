# Topic Research: Remarketing YouTube Ads

**Tryb:** LLM + SERP grounding (brak query_fanout.json — query-fanout skill nie ma .py, LLM-only + dane SERP)
**Data:** 2026-02-25

---

## 1. CSI Definition

| Element | Wartość |
|---------|---------|
| **CE** | Remarketing YouTube Ads (remarketing wideo na YouTube) |
| **SC** | Double Digital — polska agencja performance marketingu (Google Partner, e-commerce i leadgen B2B) |
| **CSI** | Właściciele e-commerce i marketerzy B2B chcą zrozumieć, skonfigurować i skutecznie wdrożyć remarketing YouTube Ads, aby odzyskać użytkowników i zwiększyć ROAS kampanii wideo |
| **Predykaty** | skonfigurować, uruchomić, segmentować, optymalizować, mierzyć |
| **Canonical query** | remarketing YouTube Ads |

---

## 2. Ramka semantyczna (Frame Semantics)

| Element ramki | Definicja w kontekście CE | Sub-query | Priorytet |
|---------------|--------------------------|-----------|-----------|
| **Agent** | Reklamodawca (e-commerce, B2B) uruchamiający remarketing | "kto powinien używać remarketingu YouTube" | CORE |
| **Patient** | Użytkownicy, którzy obejrzeli film / odwiedzili stronę / weszli w interakcję z kanałem | "do kogo kierować remarketing YouTube Ads" | CORE |
| **Instrument** | Google Ads + kanał YouTube + listy remarketingowe + Google Analytics | "jak skonfigurować remarketing YouTube w Google Ads" | CORE |
| **Purpose** | Odzyskanie użytkowników, zwiększenie konwersji, obniżenie CAC, poprawa ROAS | "po co stosować remarketing wideo YouTube" | CORE |
| **Cause** | Niska konwersja z pierwszego kontaktu (97% odwiedzających nie kupuje), porzucone koszyki | "dlaczego remarketing YouTube zwiększa konwersje" | CORE |
| **Result** | Wyższa konwersja, niższy CPV, wzrost ROAS, dłuższy kontakt z marką | "efekty remarketingu YouTube Ads" | CORE |
| **Location** | YouTube + Google Display Network (sieć partnerów wideo) | "gdzie wyświetlają się reklamy remarketingowe YouTube" | OUTER |
| **Time** | Okno membership duration (maks. 540 dni), czas budowania list (30 dni wstępne wypełnienie) | "jak długo trwa remarketing YouTube" | OUTER |
| **Manner** | Segmentacja list, personalizacja komunikatu, frequency capping, testy A/B formatów | "jak skutecznie prowadzić remarketing YouTube" | CORE |
| **Beneficiary** | Sklepy e-commerce, agencje, marki B2B z lejkiem contentowym na YouTube | "dla kogo jest remarketing wideo YouTube" | CORE |
| **Source** | Interakcje z kanałem YouTube: obejrzenie filmu, subskrypcja, polubienie, wizyta na stronie kanału | "jakie dane zbiera remarketing YouTube" | CORE |
| **Quantity** | Maks. 540 dni membership duration; film min. 11 sekund; min. 30 dni wstępne wypełnienie; frequency capping | "limity i parametry remarketingu YouTube" | OUTER |
| **Condition** | Kanał YouTube musi być połączony z kontem Google Ads; min. wymagania budżetowe dla Customer Match ($50K) | "warunki uruchomienia remarketingu YouTube" | OUTER |
| **Comparison** | Remarketing YouTube vs remarketing Display, vs Meta Ads retargeting, vs RLSA | "remarketing YouTube vs inne formy remarketingu" | OUTER |
| **Negation** | Bumper Ads i non-skippable ads NIE tworzą list remarketingowych; Shorts wymagają 10 sekund | "czego nie można robić w remarketingu YouTube" | OUTER |

---

## 3. Query Fanout (sub-queries)

| # | Sub-query | Typ / Element ramki | Priorytet | Status SERP |
|---|-----------|---------------------|-----------|-------------|
| 1 | "jak skonfigurować remarketing YouTube Ads" | Instrument / Manner | P1 | [CONFIRMED] — PAA: "How to do remarketing ads?" |
| 2 | "listy remarketingowe YouTube — jak tworzyć i segmentować" | Source / Quantity | P1 | [CONFIRMED] — SERP: beeffective, strategiczni |
| 3 | "formaty reklam remarketingowych na YouTube (In-Stream, Bumper, Discovery)" | Instrument / Comparison | P1 | [CONFIRMED] — SERP: fabryka, strategiczni |
| 4 | "remarketing YouTube vs remarketing Display — różnice" | Comparison | P2 | [PREDICTED] — brak w SERP PL |
| 5 | "po co remarketing wideo — wyniki i ROAS dla e-commerce" | Purpose / Result | P1 | [CONFIRMED] — linxdigital, sempire |
| 6 | "warunki i wymagania techniczne remarketingu YouTube" | Condition / Quantity | P2 | [CONFIRMED] — support.google.com |
| 7 | "remarketing do odwiedzających stronę vs widzów YouTube — różnice" | Comparison / Agent | P2 | [CONFIRMED] — linxdigital |
| 8 | "frequency capping i wykluczenia w kampaniach remarketingowych YouTube" | Manner | P2 | [PREDICTED] — brak jako osobna sekcja |
| 9 | "remarketing filmów innych twórców YouTube — nowa funkcja" | Source / UNIQUE | P1 | [CONFIRMED] — marcinwsol.pl |
| 10 | "customer list remarketing YouTube — wymagania i zastosowanie" | Condition / Beneficiary | P3 | [CONFIRMED] — linxdigital |

**[SERP-ONLY] — pytania z PAA niepokryte przez sub-queries (dodane jako gaps):**
- "Can you retarget YouTube ads?" → SERP-ONLY GAP → FAQ
- "Is remarketing the same as retargeting?" → SERP-ONLY GAP → FAQ/Lead
- "Can YouTube put ads on unmonetized videos?" → peryferyjny, pominąć

---

## 4. Terminologia rozszerzona

| Relacja | Terminy |
|---------|---------|
| **Synonimy** | retargeting wideo, remarketing wideo, kampania śledząca wideo, reklama śledzaca YouTube |
| **Hiperonimy** | remarketing Google Ads, kampanie wideo Google Ads, performance marketing, reklamy YouTube |
| **Hiponimy** | remarketing In-Stream pomijalny, remarketing Bumper Ads, remarketing Discovery Ads, remarketing do subskrybentów, remarketing do widzów |
| **Meronimy** | lista remarketingowa, kanał YouTube, Google Ads account, Audience Manager, membership duration, frequency capping, CPV (cost-per-view), Google Analytics (GA4) |
| **Antonimy / kontrasty** | prospecting (cold audience), reklama zasięgowa, kampania na nowych użytkowników |
| **Related terms** | RLSA (Remarketing List for Search Ads), Customer Match, Google Display Network (GDN), TrueView ads, Performance Max, conversion tracking, lejek remarketingowy, porzucony koszyk |

---

## 5. Podsumowanie dla kolejnych kroków

- **CE:** Remarketing YouTube Ads
- **Kluczowe atrybuty do zbadania:** listy remarketingowe (segmentacja), formaty reklam, konfiguracja techniczna, wyniki/ROAS, frequency capping, remarketing filmów innych twórców (UNIQUE)
- **Top 3 sub-queries:** "jak skonfigurować remarketing YouTube Ads", "listy remarketingowe YouTube", "formaty reklam remarketingowych YouTube"
- **Terminy obowiązkowe (TF-IDF):** lista remarketingowa, kanał YouTube, Google Ads, CPV, In-Stream, Bumper Ads, Discovery Ads, frequency capping, membership duration, Customer Match, RLSA, lejek remarketingowy, segmentacja odbiorców, konwersja, ROAS
