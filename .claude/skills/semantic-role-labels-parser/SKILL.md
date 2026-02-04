---
name: semantic-role-labels-parser
description: >
  Analizuje strukturę ról semantycznych w zdaniach (Agent, Predicate, Patient, Beneficiary, Instrument, Location).
  Użyj do optymalizacji fokusa zdań, zrozumienia która encja jest "bohaterem" treści, i transformacji zdań
  by Central Entity miała najwyższą salience. Triggery: role semantyczne, kto jest bohaterem, salience encji,
  przekształć zdanie, fokus zdania.
---

# Semantic Role Labels Parser

Analizuj zdania pod kątem ról semantycznych i optymalizuj fokus na Central Entity.

## Role i hierarchia salience

```
Agent > Patient > Beneficiary > Instrument > Location
(najwyższa)                                 (najniższa)
```

| Rola | Pytanie | Przykład |
|------|---------|----------|
| **Agent** | KTO wykonuje? | **Turyści** odwiedzają aquapark |
| **Predicate** | CO robi/dzieje się? | Turyści **odwiedzają** aquapark |
| **Patient** | CO jest przedmiotem? | Turyści odwiedzają **aquapark** |
| **Beneficiary** | DLA KOGO? | Atrakcje **dla rodzin** |
| **Instrument** | CZYM? | Rezerwacja **przez stronę** |
| **Location** | GDZIE? | **W centrum Krakowa** |

**Wniosek SEO:** Aby zwiększyć salience encji - ustaw ją w roli Agenta.

## Proces

1. **Znajdź predykat** - główny czasownik/akcję.
2. **Mapuj role** - Agent, Patient, Beneficiary, Instrument, Location.
3. **Oceń fokus** - Która encja dominuje? Czy Agent = CE? Czy potrzeba transformacji?
4. **Transformuj** jeśli fokus niezgodny z CE/CSI.

## Typowe transformacje

| Użytkownik jako Agent | → CE jako Agent |
|------------------------|-----------------|
| Klienci kupują w sklepie X | Sklep X oferuje klientom |
| Użytkownicy uczą się z kursu Y | Kurs Y uczy użytkowników |
| Pacjenci leczą się w klinice Z | Klinika Z leczy pacjentów |

**Kiedy NIE transformować:** perspektywa użytkownika (blog), journey użytkownika, instrukcje/poradniki.

## Predykaty CSI

| Kategoria | Predykaty | Intencja |
|-----------|-----------|----------|
| Transakcyjna | buying, booking, ordering | Chcę kupić |
| Informacyjna | knowing, understanding, learning | Chcę wiedzieć |
| Nawigacyjna | finding, locating, reaching | Chcę znaleźć |
| Komercyjna | comparing, reviewing, evaluating | Chcę porównać |
| Operacyjna | using, managing, configuring | Chcę użyć |

## Format odpowiedzi

```markdown
## Analiza ról semantycznych

### Zdanie: "[zdanie]"
| Rola | Encja/Fraza | Salience |
|------|-------------|----------|
| Agent | [kto] | ★★★★★ |
| Predicate | [akcja] | - |
| Patient | [co] | ★★★★☆ |

### Fokus
Dominująca encja: [X] | Predykat: [typ] | Agent = CE? [tak/nie]

### Transformacja (jeśli potrzebna)
**Przed:** [oryginał]
**Po:** [CE jako Agent]
```
