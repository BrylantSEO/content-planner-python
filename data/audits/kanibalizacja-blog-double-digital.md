# Analiza kanibalizacji — Blog Double Digital
**Data analizy:** 2026-02-25
**Źródło:** Supabase `blog_vectors_double` (cosine similarity na wektorach 3072-dim)
**Metoda:** Pairwise cosine similarity wszystkich par + analiza URL patterns

---

## ⚠️ Uwaga: Problem z jakością wektorów

Kilka wpisów zwróciło `similarity=1.0` z semantycznie odległymi artykułami — to błąd embedddingów (crawler zaciągnął błędną treść). Wpisy wymagające **re-embeddingu**:
- `google-ads-czyli-jak-byc-smart-od-samego-poczatku`
- `czym-sie-zajmuje-agencja-performance`
- `moje-opinie-google`
- `google-ads-co-to-jest`
- `reklama-firmy-budowlanej-co-powinienes-wiedziec` (para z niestandardowe-grupy-odbiorcow)

---

## 🔴 KRYTYCZNE — Natychmiastowa akcja

### 1. Duplikat URL w Supabase
| ID | URL |
|----|-----|
| 148 | https://double-digital.pl/blog/jak-reklamowac-hotel/ |
| 269 | https://double-digital.pl/blog/jak-reklamowac-hotel/ |

Identyczny URL zaindeksowany dwukrotnie.
**Akcja:** `DELETE FROM blog_vectors_double WHERE id = 148;` (lub 269 — sprawdź który ma nowszy wektor)

---

## 🔴 MERGE — Silna kanibalizacja (similarity >0.83)

### 2. YouTube: Koszty vs Formaty (0.8641)
- `/blog/ile-kosztuje-reklama-na-youtube/`
- `/blog/formaty-reklam-na-youtube/`

**Akcja:** Merge → `Reklama na YouTube: formaty, koszty i jak zacząć`
Canonical: `/blog/ile-kosztuje-reklama-na-youtube/` (wyższy intent zakupowy)
301 z: `/blog/formaty-reklam-na-youtube/`

### 3. Facebook: Pisanie vs Tworzenie reklam (0.8421)
- `/blog/jak-pisac-reklamy-na-facebooka/`
- `/blog/jak-zrobic-reklame-na-facebooku/`

**Akcja:** Merge → `Jak tworzyć skuteczne reklamy na Facebooku — copy, kreacje, konfiguracja`
Canonical: `/blog/jak-zrobic-reklame-na-facebooku/`
301 z: `/blog/jak-pisac-reklamy-na-facebooka/`

---

## 🟠 MERGE — Ryzyko kanibalizacji (similarity 0.69–0.80)

### 4. Reklama firmy budowlanej — duplikat tematyczny (0.6952)
- `/blog/reklama-firmy-budowlanej-co-powinienes-wiedziec/`
- `/blog/reklama-firmy-budowlanej/`

**Akcja:** Canonical = `/blog/reklama-firmy-budowlanej/` (czystszy slug)
301 z: `/blog/reklama-firmy-budowlanej-co-powinienes-wiedziec/`

### 5. Google My Business — klaster 6 wpisów (similarity 0.61–0.79)

Wpisy w klastrze (posortowane wg centralności):

| URL | Rola | Similarity z topem |
|-----|------|--------------------|
| `/jak-zalozyc-i-zoptymalizowac-profil-firmy-w-google/` | **Canonical hub** | 0.7939 (z maps) |
| `/reklama-w-google-maps-co-musisz-wiedziec-aby-z-nia-wystartowac/` | → Merge/redirect | 0.7196 (z maps) |
| `/reklama-w-google-maps/` | Satellite (płatna) | — |
| `/jak-zdobywac-opinie-google/` | → Merge z opinie | 0.7669 (z opinie-wizytowka) |
| `/moje-opinie-google/` | → Merge z zdobywac | 0.7151 (z zdobywac) |
| `/znaczenie-opinii-klientow-w-wizytowce-google-moja-firma/` | → Wpleć w merged | 0.7779 (z google-maps) |

**Akcja:**
- Rozbuduj `/jak-zalozyc-i-zoptymalizowac-profil-firmy-w-google/` → pillar page GMB
- Merge: `jak-zdobywac-opinie-google` + `moje-opinie-google` → jeden artykuł o opiniach Google
- 301: `/reklama-w-google-maps-co-musisz-wiedziec/` → `/reklama-w-google-maps/`
- Wpleć treść z `znaczenie-opinii...` do merged artykułu o opiniach

### 6. Jak założyć konto Google Ads — duplikat URL (0.5980)
- `/blog/jak-zalozyc-konto-google-ads/`
- `/blog/jak-zalozyc-konto-w-google-ads/`

**Akcja:** Canonical = `/blog/jak-zalozyc-konto-w-google-ads/`
301 z: `/blog/jak-zalozyc-konto-google-ads/`

---

## 🟡 REVIEW — Powiązane, wymagają decyzji (similarity 0.56–0.73)

### 7. Nawigacja fasetowa — stary post + kompletny przewodnik (0.5892)
- `/blog/czym-jest-nawigacja-fasetowa/`
- `/blog/nawigacja-fasetowa-w-seo-kompletny-przewodnik-dla-sklepow-internetowych/`

**Akcja:** Canonical = kompletny przewodnik
301 z: `czym-jest-nawigacja-fasetowa`

### 8. Marketing szeptany — dwie wersje (0.5575)
- `/blog/marketing-szeptany-czym-jest-i-jak-go-wlasciwie-uzywac/`
- `/blog/czym-jest-marketing-szeptany-i-czy-warto-go-robic-w-2025/`

**Akcja:** 301 stary → `/czym-jest-marketing-szeptany-i-czy-warto-go-robic-w-2025/`

### 9. AI w SEO — nakładający się kąt (0.6218)
- `/blog/ai-w-seo-czas-na-dominacje-a-nie-adaptacje/`
- `/blog/jak-wykorzystac-ai-w-pozycjonowaniu-stron-internetowych/`

**Akcja:** Sprawdź CSI. Jeśli nakładają się — merge lub wyraźna redefinicja kąta:
- `ai-w-seo-dominacja` → opinionated/strategic
- `jak-wykorzystac-ai` → how-to/tactical

### 10. Ile kosztuje Google Ads — dwa artykuły (0.6117)
- `/blog/ile-kosztuje-reklama-w-google-ads/`
- `/blog/koszt-google-ads-ile-kosztuje-kampania-w-google/`

**Akcja:** Zweryfikuj CSI. Prawdopodobnie merge lub 301.

### 11. Facebook Ads — triada how-to
- `/jak-optymalizowac-reklamy-na-facebooku/` ↔ `/jak-pisac-reklamy-na-facebooka/` (0.7116)
- `/jak-optymalizowac-reklamy-na-facebooku/` ↔ `/jak-zrobic-reklame-na-facebooku/` (0.6709)

Po merge pary z pkt 3 — oceń czy `jak-optymalizowac` ma wyraźnie inny kąt (optymalizacja aktywnych kampanii vs tworzenie nowych). Jeśli tak — zostaw z wyraźną różnicą w H1/CSI.

---

## 🟢 NIE MERGOWAĆ — Serie branżowe (różny intent per kraj/branża)

### Serie tematyczne — tylko zadbaj o pillar page + internal linking
- **Zagraniczne SEO** (0.64–0.73): czechy/słowacja, niemcy, wielka brytania → pillar: `/zagraniczne-seo/`
- **Jak reklamować [branżę]** (0.55–0.78): hotel, stomatolog, psycholog, warsztat, szkolenia, sklep ogrodniczy, hurtownia el., jachty → każdy artykuł inny intent, ale wspólna pillar page
- **Podstawy SEO** (0.58–0.72): 4 artykuły serii → linkuj do siebie, canonical hub: `/podstawy-seo-co-to-jest-seo-kompletny-przewodnik/`
- **Rekrutacja** (4 wpisy): różne stanowiska → OK, zostawić

---

## Podsumowanie priorytetów

| # | Priorytet | Akcja | Wpisy |
|---|-----------|-------|-------|
| 1 | 🔴 KRYTYCZNE | Usuń duplikat z Supabase | jak-reklamowac-hotel id 148+269 |
| 2 | 🔴 MERGE | Merge + 301 | jak-pisac + jak-zrobic fb reklame |
| 3 | 🔴 MERGE | Merge + 301 | ile-kosztuje + formaty youtube |
| 4 | 🟠 MERGE | Merge + 301 | reklama-firmy-budowlanej (2 wpisy) |
| 5 | 🟠 MERGE | Merge + 301 | moje-opinie + jak-zdobywac-opinie-google |
| 6 | 🟠 MERGE | Merge + 301 | jak-zalozyc-konto-google-ads (2 wpisy) |
| 7 | 🟠 KONSOLIDACJA | 301 redirect + pillar page | Google My Business klaster (6 → 3) |
| 8 | 🟡 301 | Redirect stary → kompletny przewodnik | nawigacja fasetowa |
| 9 | 🟡 301 | Redirect stary → 2025 wersja | marketing szeptany |
| 10 | 🟡 REVIEW | Merge lub wyraźne CSI | ile-kosztuje-google-ads (2 wpisy) |
| 11 | 🟡 REVIEW | Wyraźny kąt lub merge | Facebook Ads triada |
| 12 | 🟡 REVIEW | Zdefiniuj kąt | AI w SEO (2 wpisy) |
| 13 | ⚙️ TECH | Re-embed | ~5 wpisów z błędnymi wektorami |
