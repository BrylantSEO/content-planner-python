# L13 — Chunk Quality — co robi treść "godną cytowania"

**Moduł:** 1 — Jak działa AI Search
**Czas:** ~35 min
**Format:** Analiza przykładów + ćwiczenie przepisywania

---

## Cel lekcji

Potrafisz ocenić czy fragment tekstu jest "wart cytowania" przez AI i przepisać go żeby obniżyć Cost of Retrieval.

---

## Trzy wymiary jakości chunku

| Wymiar | Co mierzy | Zły wynik | Dobry wynik |
|--------|-----------|-----------|-------------|
| **BLUF** | Czy odpowiedź jest na górze sekcji | Odpowiedź na końcu | Odpowiedź w zdaniu 1–2 |
| **CoR** | Ile wysiłku potrzeba żeby wyciągnąć fakt | Ogólniki, puch | Konkretne liczby, definicje |
| **Information Density** | Fakty / (fakty + puch) × 100% | 20% | 70%+ |

---

## BLUF — Bottom Line Up Front

**Zasada:** Odpowiedź jako pierwsze zdanie, uzasadnienie jako drugie.

Pochodzi z komunikacji wojskowej — "powiedz wniosek, nie opowiadaj historii".

**Bez BLUF (typowy artykuł SEO):**
```
Wybór agencji marketingowej to ważna decyzja, która może znacząco wpłynąć na
wyniki Twojego biznesu. Na rynku istnieje wiele agencji oferujących różne usługi.
Warto więc wiedzieć, na co zwrócić uwagę przy dokonywaniu wyboru. Poniżej
przedstawiamy kilka kluczowych kwestii, które warto rozważyć...
```

AI nie może zacytować tego jako odpowiedź na "na co zwrócić uwagę" — nie ma odpowiedzi w tekście.

**Z BLUF:**
```
Przy wyborze agencji marketingowej sprawdź 5 elementów: portfolio z branży
klienta, model rozliczeń, sposób raportowania, referencje od podobnych firm
i dostęp do kont reklamowych. Agencje bez portfolio z Twojej branży zazwyczaj
nie rozumieją specyfiki niszowego rynku.
```

AI może zacytować pierwsze zdanie jako bezpośrednią odpowiedź.

---

## Cost of Retrieval (CoR) — koszt wyciągnięcia faktu

**Definicja:** Ile AI musi "przetworzyć" tekstu, żeby wyciągnąć konkretny fakt?

**CoR niski** (łatwy do wyciągnięcia):
```
Double Digital osiągnął dla klienta e-commerce ROAS 1066% w 6 miesiącach,
wydając 85 000 zł budżetu reklamowego.
```
→ AI może zacytować dosłownie. Fakt jest jednoznaczny.

**CoR wysoki** (trudny do wyciągnięcia):
```
Wyniki naszych kampanii są naprawdę imponujące — klienci są bardzo zadowoleni
z efektów naszej pracy i chętnie polecają nas dalej.
```
→ AI musi "interpretować" co oznacza "imponujące" i "bardzo zadowoleni". Nie zacytuje.

**Typy elementów podnoszących CoR:**

| Element | Przykład | Problem |
|---------|---------|---------|
| Przymiotniki wartościujące | "bardzo dobre wyniki" | Co znaczy "bardzo dobre"? |
| Słowa modalne | "może", "zazwyczaj", "często" | Brak konkretności |
| Zaimki bez kontekstu | "to rozwiązanie przynosi efekty" | Co to rozwiązanie? |
| Czas teraźniejszy ogólny | "agencje oferują różne usługi" | Które, jakie? |

---

## Information Density — gęstość informacyjna

**Wzór:** `density = fakty / (fakty + ogólniki) × 100%`

**Poniżej 30% — typowy artykuł "pisany pod SEO":**
```
Marketing internetowy jest dziś bardzo ważny dla każdej firmy. Coraz więcej
ludzi korzysta z internetu, co sprawia, że firmy muszą być obecne w sieci.
Istnieje wiele możliwości promocji online, które warto rozważyć.
```
Fakty: 0. Ogólniki: wszystko. Density ≈ 0%.

**Powyżej 70% — artykuł gotowy pod AI:**
```
W Polsce 88% zakupów B2B zaczyna się od wyszukiwania online (GUS 2024).
E-commerce rośnie 15% rok do roku, przy czym reklama Google Shopping
odpowiada za 35% konwersji w sklepach internetowych.
```
Fakty: liczby, źródło, procenty. Density ≈ 80%.

---

## Ćwiczenie: przepisz 3 zdania

Otwórz plik `kurs-online/materialy/exercise-files/sample_article_do_audytu.md`.

Znajdź sekcję "Dlaczego marketing internetowy jest ważny" i przepisz pierwsze 3 zdania:

**Oryginał:**
> Marketing internetowy jest bardzo ważny z wielu różnych powodów. Po pierwsze,
> pozwala dotrzeć do szerokiej grupy odbiorców. Po drugie, jest stosunkowo tani
> w porównaniu do tradycyjnych form reklamy.

**Twoje zadanie:** Przepisz tak, żeby:
1. Pierwsze zdanie = konkretna liczba lub fakt
2. Drugie zdanie = rozwinięcie z danymi
3. Zero słów "bardzo", "wiele", "różnych", "stosunkowo"

**Przykładowe rozwiązanie:**
> Polskie firmy wydają średnio 12% budżetu marketingowego na kanały digital,
> co przekłada się na 3× wyższy ROI niż reklama tradycyjna (Nielsen 2024).
> Google Search i Meta Ads odpowiadają razem za 67% tego wydatku.

---

## Jak audytować własne treści

W Claude Code:

```
> /content-quality-scorer
[wklej tekst swojego artykułu]
```

Skill `content-quality-scorer` zwróci oceny 0-10 dla:
- Cost of Retrieval
- Information Density
- SRL Salience (kto jest "bohaterem" zdań)
- TF-IDF Quality (terminologia branżowa)

Wynik < 5 w którymkolwiek wymiarze = obszar do poprawy.

---

**Następna lekcja:** L14 — EAV, CE, CSI — fundamenty semantyczne
