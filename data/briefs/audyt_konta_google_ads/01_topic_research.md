# Topic Research: audyt konta google ads

## 1. CSI Definition

| Element | Wartość |
|---------|---------|
| CE | Audyt konta Google Ads |
| SC | Double Digital — agencja performance marketingu dla e-commerce i leadgen B2B. Google Partner. Filozofia "Double or Nothing" — konkretne wyniki, ROAS, data-driven. |
| CSI | Właściciel e-commerce lub marketer B2B chce wiedzieć: co sprawdza audyt konta Google Ads, jak go przeprowadzić lub gdzie zlecić, żeby zatrzymać przepalanie budżetu i poprawić ROAS. |
| Predykaty | przeprowadzić, zlecić, sprawdzić, zidentyfikować, poprawić, zoptymalizować |

## 2. Ramka semantyczna

| Element ramki | Definicja | Sub-query | Priorytet |
|---------------|-----------|-----------|-----------|
| Agent | Kto przeprowadza audyt? | „agencja audyt Google Ads" / „specjalista Google Ads audyt" | CORE |
| Patient | Czyje konto / czego dotyczy? | „audyt konta reklamowego Google" / „co obejmuje audyt Google Ads" | CORE |
| Instrument | Narzędzia audytu | „narzędzia do audytu Google Ads" / „audyt Google Ads checklist" | CORE |
| Purpose | Po co audyt? | „po co audyt konta Google Ads" / „korzyści z audytu Google Ads" | CORE |
| Cause | Co powoduje konieczność audytu? | „przepalanie budżetu Google Ads" / „kampanie nie konwertują" | CORE |
| Result | Efekty po audycie | „co zyskasz po audycie Google Ads" / „audyt Google Ads efekty" | CORE |
| Location | Gdzie / na czym? | „audyt konta Search / Display / PMax" | OUTER |
| Time | Kiedy przeprowadzić? | „kiedy wykonać audyt Google Ads" / „jak często audyt konta" | CORE |
| Manner | Jak wygląda audyt krok po kroku? | „jak przeprowadzić audyt Google Ads krok po kroku" | CORE |
| Beneficiary | Dla kogo? | „audyt Google Ads e-commerce" / „audyt Google Ads B2B" | CORE |
| Source | Skąd dane do audytu? | „GA4 audyt Google Ads" / „Google Merchant Center audyt" | OUTER |
| Quantity | Ile kosztuje / ile trwa? | „cena audytu Google Ads" / „ile trwa audyt konta" | CORE |
| Condition | Kiedy się opłaca? | „kiedy audyt Google Ads się opłaca" / „audyt po zmianach kampanii" | OUTER |
| Comparison | Audyt vs prowadzenie kampanii | „audyt Google Ads vs optymalizacja kampanii" | OUTER |
| Negation | Kiedy audyt nie wystarczy? | „kiedy audyt Google Ads nie pomaga" / „audyt bez wdrożenia" | OUTER |

## 3. Query Fanout (z 00_query_fanout.json — Tryb A)

| # | Sub-query | Typ API / Element ramki | Conf | P | Status |
|---|-----------|------------------------|------|---|--------|
| 1 | jak przeprowadzić audyt konta Google Ads | reformulation / Manner | 90% | P1 | [CONFIRMED] — PAA + Related |
| 2 | co obejmuje audyt Google Ads | implicit / Patient + Instrument | 85% | P1 | [CONFIRMED] — Related |
| 3 | audyt konta Google Ads krok po kroku | reformulation / Manner | 85% | P1 | [CONFIRMED] — SERP titles |
| 4 | cena audytu konta Google Ads | specification / Quantity | 85% | P1 | [CONFIRMED] — PAA |
| 5 | narzędzia do audytu konta Google Ads | specification / Instrument | 80% | P2 | [PREDICTED] |
| 6 | audyt konta Google Ads checklist | specification / Instrument | 80% | P2 | [PREDICTED] |
| 7 | korzyści z audytu konta Google Ads | implicit / Purpose + Result | 80% | P2 | [PREDICTED] |
| 8 | optymalizacja konta Google Ads po audycie | entailment / Result + Manner | 80% | P2 | [PREDICTED] |
| 9 | audyt konta Google Ads dla e-commerce | specification / Beneficiary | 75% | P2 | [PREDICTED] |
| 10 | najlepsza agencja audytująca Google Ads | entity_expanded / Agent | 75% | P2 | [SERP-ONLY] — Related "Agencja Google Ads" |
| 11 | audyt konta Google Ads vs audyt kampanii | comparative / Comparison | 70% | P3 | [PREDICTED] |
| 12 | kiedy wykonać audyt konta Google Ads | (custom) / Time + Condition | — | P1 | [CONFIRMED] — PAA "Czym jest audyt Google Ads?" |

**[SERP-ONLY] nowe gaps z PAA:**
- „Co oznacza audyt konta?" → definicja CE
- „Ile kosztuje 1000 wyświetleń w Google Ads?" → kontekst kosztów (luźno powiązany)

## 4. Terminologia rozszerzona

| Relacja | Terminy |
|---------|---------|
| Synonimy CE | audyt kampanii Google Ads, audyt Google AdWords, analiza konta Google Ads, weryfikacja konta reklamowego |
| Hiperonimy | audyt marketingowy, analiza konta reklamowego, performance audit |
| Hiponimy | audyt techniczny konta, audyt słów kluczowych, audyt reklam tekstowych, audyt kampanii PMax, audyt konwersji |
| Meronimy | struktura konta, grupy reklam, słowa kluczowe, wykluczenia, rozszerzenia reklam, wynik jakości, śledzenie konwersji, strategia stawek, ROAS, CPA, CTR |
| Antonimy / kontrasty | brak audytu → przepalanie budżetu, kampania bez optymalizacji |
| Related terms | Smart Bidding, Performance Max, GA4, Google Merchant Center, RSA, kampanie Search, GDN, remarketing, model atrybucji, CPC, konwersje rozszerzone, udział w wyświetleniach (IS) |

## 5. Podsumowanie dla kolejnych kroków

- **CE:** Audyt konta Google Ads
- **Kluczowe atrybuty do zbadania:** zakres audytu (elementy), koszt, czas, efekty, krok po kroku, dla kogo, narzędzia, checklist
- **Top 3 sub-queries:** (1) jak przeprowadzić audyt krok po kroku, (2) co obejmuje audyt, (3) cena audytu
- **Terminy obowiązkowe:** ROAS, CPA, CTR, wynik jakości, wykluczenia, śledzenie konwersji, Smart Bidding, Performance Max, GA4, struktura konta, grupy reklam, słowa kluczowe, kampanie Search, remarketing
