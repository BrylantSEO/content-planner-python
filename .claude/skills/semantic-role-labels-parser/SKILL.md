---
name: semantic-role-labels-parser
description: Analizuje strukturę ról semantycznych w zdaniach (Agent, Predicate, Patient, Beneficiary). Użyj do optymalizacji fokusa zdań i zrozumienia, która encja jest "bohaterem" treści.
---

# Semantic Role Labels Parser

Analizujesz zdania pod kątem ról semantycznych, identyfikując kto/co wykonuje akcję, na kim/czym, dla kogo i jakimi środkami.

## Role semantyczne

### Agent (Wykonawca)
**Pytanie:** KTO wykonuje akcję?

Agent to encja, która aktywnie wykonuje czynność opisaną przez predykat.

**Charakterystyka:**
- Kontroluje akcję
- Zwykle jest podmiotem zdania
- Ma najwyższą salience (prominencję) w zdaniu

**Przykład:** **Turyści** odwiedzają Aquapark Kraków.

### Predicate (Predykat/Akcja)
**Pytanie:** CO ROBI / CO SIĘ DZIEJE?

Predykat to czasownik lub fraza czasownikowa opisująca akcję lub stan.

**Typy predykatów w kontekście CSI:**
| Predykat | Intencja | Przykład |
|----------|----------|----------|
| visiting | transakcyjna | odwiedzać, zwiedzać |
| knowing | informacyjna | wiedzieć, znać, rozumieć |
| learning | edukacyjna | uczyć się, poznawać |
| managing | operacyjna | zarządzać, kontrolować |
| finding | nawigacyjna | znajdować, szukać |
| buying | transakcyjna | kupować, zamawiać |
| comparing | komercyjna | porównywać, wybierać |

### Patient/Theme (Pacjent/Temat)
**Pytanie:** CO jest przedmiotem akcji?

Patient to encja, na której wykonywana jest akcja lub która jest tematem zdania.

**Przykład:** Turyści odwiedzają **Aquapark Kraków**.

### Beneficiary (Beneficjent)
**Pytanie:** DLA KOGO jest wykonywana akcja?

Beneficjent to encja, która odnosi korzyść z akcji.

**Przykład:** Aquapark oferuje atrakcje **dla rodzin z dziećmi**.

### Instrument (Narzędzie)
**Pytanie:** CZYM / ZA POMOCĄ CZEGO?

Instrument to środek użyty do wykonania akcji.

**Przykład:** Rezerwację można zrobić **przez stronę internetową**.

### Location (Lokalizacja)
**Pytanie:** GDZIE?

Miejsce, w którym odbywa się akcja.

**Przykład:** Atrakcje znajdują się **w centrum Krakowa**.

---

## Hierarchia salience

Role semantyczne wpływają na prominencję encji:

```
Agent > Patient > Beneficiary > Instrument > Location
  ↓        ↓          ↓            ↓           ↓
Najwyższa                                   Najniższa
salience                                    salience
```

**Wniosek dla SEO:** Jeśli chcesz zwiększyć salience encji - ustaw ją w roli Agenta.

---

## Proces analizy

### Krok 1: Identyfikacja predykatu
Znajdź główny czasownik/akcję w zdaniu.

### Krok 2: Mapowanie ról
Dla każdego elementu zdania określ rolę:
- Kto wykonuje? → Agent
- Co jest robione/na czym? → Patient
- Dla kogo? → Beneficiary
- Czym? → Instrument
- Gdzie? → Location

### Krok 3: Analiza fokusa
Określ:
- Która encja ma najwyższą salience?
- Czy fokus jest zgodny z CE/CSI?
- Czy potrzebna jest transformacja?

### Krok 4: Rekomendacje
Jeśli fokus nie jest optymalny - zaproponuj przekształcenie zdania.

---

## Format odpowiedzi

```markdown
## Analiza ról semantycznych

### Zdanie: "[zdanie]"

| Rola | Encja/Fraza | Salience |
|------|-------------|----------|
| Agent | [kto] | ★★★★★ |
| Predicate | [akcja] | - |
| Patient | [co] | ★★★★☆ |
| Beneficiary | [dla kogo] | ★★★☆☆ |
| Instrument | [czym] | ★★☆☆☆ |
| Location | [gdzie] | ★☆☆☆☆ |

### Fokus zdania
**Dominująca encja:** [encja w roli Agenta]
**Typ predykatu:** [visiting/knowing/learning/etc.]

### Analiza zgodności z CSI
- CE strony: [encja centralna]
- Czy Agent = CE? [tak/nie]
- Rekomendacja: [zachowaj / przekształć]

### Transformacja (jeśli potrzebna)
**Oryginał:** [zdanie oryginalne]
**Przekształcenie:** [zdanie z CE jako Agentem]
```

---

## Przykład

**Input:**
"Turyści odwiedzają Aquapark Kraków, aby skorzystać z 8 zjeżdżalni wodnych."

**Output:**

### Zdanie: "Turyści odwiedzają Aquapark Kraków, aby skorzystać z 8 zjeżdżalni wodnych."

| Rola | Encja/Fraza | Salience |
|------|-------------|----------|
| Agent | Turyści | ★★★★★ |
| Predicate | odwiedzają, skorzystać | - |
| Patient | Aquapark Kraków | ★★★★☆ |
| Beneficiary | (turyści - implicit) | ★★★☆☆ |
| Instrument | - | - |
| Location | (Aquapark - implicit) | ★☆☆☆☆ |

### Fokus zdania
**Dominująca encja:** Turyści
**Typ predykatu:** visiting (transakcyjny)

### Analiza zgodności z CSI
- CE strony: Aquapark Kraków
- Czy Agent = CE? **NIE** (Agent = turyści, CE = Aquapark)
- Rekomendacja: **PRZEKSZTAŁĆ** - CE powinno być w roli Agenta

### Transformacja
**Oryginał:** "Turyści odwiedzają Aquapark Kraków, aby skorzystać z 8 zjeżdżalni wodnych."

**Przekształcenie:** "Aquapark Kraków zaprasza turystów na 8 zjeżdżalni wodnych."

**Zmiana ról:**
| Rola | Przed | Po |
|------|-------|-----|
| Agent | Turyści | Aquapark Kraków |
| Patient | Aquapark Kraków | Turystów |
| Predicate | odwiedzają | zaprasza |

**Efekt:** CE (Aquapark Kraków) ma teraz najwyższą salience.

---

## Typowe transformacje

### Z perspektywy użytkownika → na perspektywę encji

| Oryginał (użytkownik jako Agent) | Transformacja (CE jako Agent) |
|----------------------------------|-------------------------------|
| Klienci kupują produkty w sklepie X | Sklep X oferuje produkty klientom |
| Użytkownicy uczą się z kursu Y | Kurs Y uczy użytkowników |
| Pacjenci leczą się w klinice Z | Klinika Z leczy pacjentów |

### Kiedy NIE transformować

Zachowaj użytkownika jako Agenta gdy:
- Piszesz z perspektywy użytkownika (SC = blog użytkownika)
- Opisujesz journey użytkownika
- Tworzysz instrukcje/poradniki

---

## Predykaty CSI - katalog

| Kategoria | Predykaty | Intencja wyszukiwania |
|-----------|-----------|----------------------|
| **Transakcyjna** | buying, ordering, booking, reserving | Chcę kupić/zarezerwować |
| **Informacyjna** | knowing, understanding, learning | Chcę wiedzieć/zrozumieć |
| **Nawigacyjna** | finding, locating, reaching | Chcę znaleźć/dotrzeć |
| **Komercyjna** | comparing, reviewing, evaluating | Chcę porównać/ocenić |
| **Operacyjna** | using, managing, configuring | Chcę użyć/skonfigurować |

Identyfikacja predykatów pomaga określić typ intencji i dopasować content.
