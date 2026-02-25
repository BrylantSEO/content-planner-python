# Interpretacja CQS — Content Quality Score

> Drukuj A4, 1 per uczestnik.

---

## Skala CQS (0–100)

| Zakres | Ocena | Co to znaczy |
|--------|-------|-------------|
| **80–100** | Doskonały | Gotowy pod AI citability. Minimalne poprawki. |
| **60–79** | Dobry | Powyżej średniej. Adresuj wymiary poniżej 6/10. |
| **40–59** | Poniżej średniej | Istotne luki. Zaplanuj poprawki. |
| **0–39** | Krytyczny | Priorytet natychmiastowy. Artykuł niewidoczny dla AI. |

---

## 4 wymiary — jak interpretować i jak poprawiać

### 1. Cost of Retrieval (CoR) — Koszt ekstrakcji

**Co mierzy:** Ile wysiłku musi włożyć AI żeby wyciągnąć konkretny fakt.

| Wynik | Znaczenie |
|-------|-----------|
| 8–10 | Fakty są konkretne, liczbowe, łatwe do cytowania |
| 5–7 | Mix ogólników i konkretów — popraw ogólniki |
| 0–4 | Dominują ogólniki — AI nie może nic zacytować |

**Jak poprawiać:**
- "Wyniki były bardzo dobre" → "CTR wzrósł z 2.1% do 4.8% w 30 dni"
- "Znaczny wzrost ruchu" → "Ruch organiczny wzrósł o 340% w 6 miesięcy"
- "Agencja ma doświadczenie" → "Agencja obsłużyła 200+ kampanii od 2018 r."

---

### 2. Information Density — Gęstość informacyjna

**Co mierzy:** Stosunek faktów do "puchu" (ogólniki, słowa modalne, puste zdania).

| Wynik | Znaczenie |
|-------|-----------|
| 8–10 | Każde zdanie niesie fakty |
| 5–7 | ~50% treści to puch — usuń lub zastąp |
| 0–4 | Dominuje puch — przepisz artykuł od początku |

**Sygnały "puchu" do usunięcia:**
- Słowa modalne: _może, prawdopodobnie, warto, należy rozważyć_
- Puste przymiotniki: _innowacyjny, nowoczesny, kompleksowy, dedykowany_
- Zdania bez faktu: _"Wybór agencji to ważna decyzja."_

---

### 3. SRL Salience — Prominencja Central Entity

**Co mierzy:** Czy CE jest "bohaterem" zdań (Agent) czy "obiektem" (Patient).

| Wynik | Znaczenie |
|-------|-----------|
| 8–10 | CE jest Agentem w >70% zdań |
| 5–7 | CE jest Agentem w ~50% zdań |
| 0–4 | CE jest Patientem — przepisz strukturę zdań |

**Jak poprawiać:**

| BEFORE (CE jako Patient) | AFTER (CE jako Agent) |
|--------------------------|----------------------|
| "Reklamy są zarządzane przez agencję" | "Agencja zarządza reklamami" |
| "Kampania została zoptymalizowana" | "Specjaliści zoptymalizowali kampanię" |
| "Wyniki były osiągane przez nasz zespół" | "Nasz zespół osiągnął wyniki" |

---

### 4. TF-IDF Quality — Jakość terminologii

**Co mierzy:** Stosunek terminów specjalistycznych (wysokie IDF) do generycznych (niskie IDF).

| Wynik | Znaczenie |
|-------|-----------|
| 8–10 | Bogata terminologia branżowa |
| 5–7 | Mix — dodaj brakujące terminy niszowe |
| 0–4 | Generyczny tekst — zastąp terminy specjalistycznymi |

**Przykłady:**
- Generyczne (złe): _wyniki, praca, czas, firma, działania_
- Specjalistyczne (dobre): _ROAS, CTR, Quality Score, conversion rate, remarketing_

---

## Priorytety poprawek

```
1. Znajdź NAJNIŻSZY wymiar (0–4) → to jest krytyczny problem
2. Wygeneruj 3 przykłady BEFORE/AFTER dla tego wymiaru
3. Przekaż copywriterowi jako konkretne zadanie
4. Zmierz CQS po poprawce — powinna wzrosnąć o min. 10 pkt
```

---

## Sekcja BEFORE/AFTER w audit.md

Każdy raport zawiera gotowe przykłady BEFORE/AFTER. Format:

```
BEFORE: [oryginalne zdanie]
AFTER:  [zoptymalizowane zdanie]
POWÓD:  [który wymiar i dlaczego]
```

Skopiuj AFTER bezpośrednio do treści artykułu lub przekaż copywriterowi.
