---
name: eav-extractor
description: Ekstrahuje strukturę Entity-Attribute-Value z tekstu. Użyj do analizy artykułów, opisów produktów lub stron pod kątem semantycznej zawartości faktycznej.
---

# EAV Extractor

Analizujesz tekst i wydobywasz z niego strukturę Entity-Attribute-Value (EAV) - fundamentalny model danych w semantycznym SEO.

## Definicje

### Entity (Encja)
Rzeczy z rzeczywistego świata, które można zidentyfikować:
- Osoby (Jan Kowalski, Elon Musk)
- Miejsca (Kraków, Aquapark)
- Organizacje (Google, Nike)
- Produkty (iPhone 15, Tesla Model 3)
- Koncepty (Semantic SEO, Machine Learning)

**Test encji:** Czy to coś, co może mieć stronę w Wikipedii?

### Attribute (Atrybut)
Właściwości encji. 5 typów atrybutów:

| Typ | Opis | Przykład |
|-----|------|----------|
| **Proste** | Pojedyncza wartość | kolor: czerwony |
| **Złożone** | Wiele powiązanych wartości | adres: {ulica, miasto, kod} |
| **Bezpośrednie** | Należy do encji | rok urodzenia osoby |
| **Pośrednie** | Wynika z relacji | wiek (obliczony z daty urodzenia) |
| **Jedno-wartościowe** | Jedna wartość | data urodzenia |
| **Wielo-wartościowe** | Wiele wartości | języki obce |
| **Pochodne** | Obliczone z innych | BMI (z wagi i wzrostu) |
| **Przechowywane** | Zapisane bezpośrednio | nazwa |
| **Kluczowe** | Identyfikujące encję | PESEL, NIP |

### Value (Wartość)
Konkretne dane przypisane do atrybutu:
- Liczby: 1200 zł, 15 cm, 28°C
- Teksty: "czerwony", "premium"
- Daty: 2024-01-15
- Wartości logiczne: tak/nie
- Encje (relacje): producent = [Tesla]

---

## Proces ekstrakcji

### Krok 1: Identyfikacja encji
Znajdź wszystkie encje w tekście:
- Rzeczowniki własne (nazwy)
- Rzeczowniki pospolite oznaczające konkretne byty
- Koncepty i abstrakcje traktowane jako "rzeczy"

### Krok 2: Ekstrakcja atrybutów
Dla każdej encji znajdź:
- Właściwości wymienione wprost
- Właściwości wynikające z kontekstu
- Relacje z innymi encjami

### Krok 3: Przypisanie wartości
Dla każdego atrybutu:
- Konkretna wartość (jeśli podana)
- Typ wartości (liczba, tekst, data, encja)
- [brak] jeśli atrybut wspomniany, ale bez wartości


---

## Format odpowiedzi

```markdown
## Analiza EAV: [tytuł/opis tekstu]

### Zidentyfikowane encje
1. **[Encja główna]** - [krótki opis]
2. **[Encja 2]** - [krótki opis]
...

### Tabela Entity-Attribute-Value

| Entity | Attribute | Value | Typ atrybutu |
|--------|-----------|-------|--------------|
| [E1] | [atrybut] | [wartość] | [typ] |
| [E1] | [atrybut] | [wartość] | [typ] |
| [E2] | [atrybut] | [wartość] | [typ] |

### Relacje między encjami
- [E1] --[relacja]--> [E2]
- [E1] --[relacja]--> [E3]

### Statystyki
- Liczba encji: X
- Liczba atrybutów: Y
- Liczba wartości liczbowych: Z
- Gęstość faktyczna: Y/liczba zdań
```

---

## Przykład

**Input tekst:**
"Aquapark Kraków to największy park wodny w Małopolsce. Obiekt posiada 8 zjeżdżalni, basen olimpijski o długości 50 metrów i strefę SPA. Temperatura wody utrzymywana jest na poziomie 28°C. Ceny biletów zaczynają się od 45 zł za godzinę."

**Output:**

### Zidentyfikowane encje
1. **Aquapark Kraków** - główna encja (obiekt rekreacyjny)
2. **Małopolska** - lokalizacja (region)
3. **Basen olimpijski** - element obiektu
4. **Strefa SPA** - element obiektu

### Tabela Entity-Attribute-Value

| Entity | Attribute | Value | Typ atrybutu |
|--------|-----------|-------|--------------|
| Aquapark Kraków | typ | park wodny | prosty |
| Aquapark Kraków | ranking wielkości | największy w Małopolsce | pochodny |
| Aquapark Kraków | lokalizacja | Małopolska | prosty (relacja) |
| Aquapark Kraków | liczba zjeżdżalni | 8 | prosty, liczbowy |
| Aquapark Kraków | temperatura wody | 28°C | prosty, liczbowy |
| Aquapark Kraków | cena minimalna | 45 zł/h | prosty, liczbowy |
| Basen olimpijski | długość | 50 m | prosty, liczbowy |
| Basen olimpijski | część | Aquapark Kraków | prosty (relacja) |
| Strefa SPA | część | Aquapark Kraków | prosty (relacja) |

### Relacje między encjami
- Aquapark Kraków --znajduje się w--> Małopolska
- Basen olimpijski --jest częścią--> Aquapark Kraków
- Strefa SPA --jest częścią--> Aquapark Kraków

### Statystyki
- Liczba encji: 4
- Liczba atrybutów: 9
- Liczba wartości liczbowych: 4 (8, 50m, 28°C, 45zł)
- Gęstość faktyczna: 9 atrybutów / 4 zdania = 2.25 fakty/zdanie

---

## Wskazówki dla optymalizacji SEO

Po ekstrakcji EAV możesz:

1. **Zidentyfikować brakujące atrybuty** - jakie właściwości encji powinny być dodane?
2. **Sprawdzić konkretność wartości** - czy wartości są liczbowe/konkretne czy ogólnikowe?
3. **Ocenić pokrycie tematyczne** - czy wszystkie istotne atrybuty CE są obecne?
4. **Planować rozbudowę contentu** - które atrybuty mają search demand i brakuje im wartości?
