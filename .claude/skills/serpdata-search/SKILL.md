---
name: serpdata-search
description: Wykonuje wyszukiwanie w Google za pomocą API serpdata.io i zwraca top 10 wyników organicznych. Używaj tego skilla gdy użytkownik chce sprawdzić wyniki wyszukiwania Google dla danego słowa kluczowego.
---

# SerpData Search

Ten skill umożliwia wyszukiwanie w Google za pomocą API serpdata.io.

## Użycie

Gdy użytkownik poda słowo kluczowe do wyszukania, uruchom skrypt Python:

```bash
python3 /Users/robertniechcial/Downloads/git\ repos/semantic-os/.claude/skills/serpdata-search/serpdata_search.py "KEYWORD" [hl] [gl]
```

### Parametry

- `KEYWORD` - słowo kluczowe do wyszukania (może zawierać spacje, skrypt sam zakoduje)
- `hl` - język wyników (opcjonalny, domyślnie: `pl`)
- `gl` - kraj/lokalizacja (opcjonalny, domyślnie: `pl`)

## Format wyjściowy

Po otrzymaniu odpowiedzi z API, wyświetl użytkownikowi **top 10 wyników organicznych** w następującym formacie:

```
## Wyniki wyszukiwania dla: [KEYWORD]

| # | Tytuł | Domena | URL |
|---|-------|--------|-----|
| 1 | [tytuł] | [domena] | [url] |
| 2 | [tytuł] | [domena] | [url] |
...
```

### Dane do wyświetlenia

Z odpowiedzi API wyciągnij dane z `data.results.organic_results` i dla każdego wyniku wyświetl:

- `rank_inner` - pozycja w wynikach organicznych
- `title` - tytuł strony
- `domain` - domena
- `url` - pełny URL

## Przykład

Użytkownik: "Wyszukaj w Google: co to jest kortyzol"

```bash
python3 "/Users/robertniechcial/Downloads/git repos/semantic-os/.claude/skills/serpdata-search/serpdata_search.py" "co to jest kortyzol"
```

Skrypt automatycznie:
1. Zakoduje słowo kluczowe
2. Wykona request do API
3. Wyświetli sformatowaną tabelę z wynikami

## Uwagi

- Skrypt automatycznie koduje słowa kluczowe (nie trzeba ręcznie zamieniać spacji)
- Jeśli API zwróci błąd, skrypt wyświetli komunikat o błędzie
- Skrypt wyświetla maksymalnie 10 wyników oraz dodatkowe informacje (People Also Ask, Related Searches)
