---
name: cluster-mapper
description: >
  Mapuje klastry słów kluczowych na strukturę CORE/OUTER topical map na podstawie
  typu atrybutu względem Source Context. Wyznacza pillar pages i proponuje
  hierarchię URL oraz kolejność publikacji. Użyj po nazwaniu klastrów (cluster-namer).
  Triggery: topical map, CORE OUTER, mapowanie klastrów, pillar pages,
  struktura serwisu, kolejność publikacji.
---

# Cluster Mapper

Mapuj klastry na strukturę CORE/OUTER topical map.

## Wymagane inputy

- CSV z nazwanymi klastrami (cluster_id, cluster_name, central_entity, canonical_query)
- **Source Context** serwisu (kim odbiorca, jaki biznes/cel)

## Kryterium klasyfikacji: typ atrybutu, NIE wolumen

Dla każdego klastra:

1. Czy temat **bezpośrednio unifikuje CE + SC = CSI**? → **CORE**
2. Czy dotyczy **main attribute** wynikającego z Source Context? → **CORE**
3. Czy jest **derived attribute** od main attribute? → **CORE** (densyfikacja)
4. Wszystko inne → **OUTER**

Niski wolumen **nie oznacza** OUTER. Keyword 50/mies. może być CORE jeśli dotyczy main attribute.

## Output: 2 pliki

### Plik 1: Topical map → `data/clusters/[seed]_topical_map.md`

Strategiczny dokument z klasyfikacją CORE/OUTER, SERP Intelligence, rekomendacjami formatów i kolejnością publikacji (jak dotychczas).

### Plik 2: Struktura serwisu → `data/clusters/[seed]_struktura_serwisu.md`

Wizualny dokument z drzewem stron i przypisanymi keywords. Zawiera:

#### Sekcja 1: Wizualne drzewo serwisu (ASCII art)

```
🏠 Strona główna
│
├── 📦 PILLAR 1: /slug/ ──── [Cluster X · N kw · P0]
│   │   CE: ...
│   │   Canonical: "..."
│   │   Format: ...
│   │
│   ├── 🏷️ Kategoria A
│   │   ├── /sub-page-1/ .......... [P0] 🔥
│   │   └── /sub-page-2/ .......... [P1]
│   │
│   └── 🔧 Kategoria B
│       ├── /sub-page-3/ .......... [P2]
│       └── /sub-page-4/ .......... [P2]
│
├── 📖 PILLAR 2: /slug/ ──── [Cluster Y · N kw · P0]
│   ...
│
└── 🏷️ PILLAR 3: /slug/ ──── [Cluster Z · N kw · P1]
    ...
```

Grupuj supporting pages w logiczne kategorie (typ, rozmiar, cena, odbiorcy, akcesoria, lokalizacja, porównania, poradniki, FAQ, marki). Oznacz priorytety P0-P3 i flagą 🔥 najważniejsze.

#### Sekcja 2: Mapowanie keywords → strony (per cluster)

Tabela per cluster z kolumnami:

| Strona docelowa | Keywords (przykłady) | Liczba kw |
|-----------------|---------------------|:---------:|

Przypisz KAŻDY keyword z CSV do konkretnej strony docelowej. Grupuj keywords logicznie. Keywords które nie mają dedykowanej strony → przypisz do najbliższego pillar page.

#### Sekcja 3: Linkowanie wewnętrzne

Diagram kluczowych połączeń między stronami (pillar↔pillar, typ→porównanie, produkt→poradnik, etc.).

#### Sekcja 4: Priorytety publikacji

Tabela zbiorcza: priorytet → lista stron → suma.

#### Sekcja 5: Rekomendacje formatów treści

Tabela: typ strony → format treści → schema markup.

## SERP Intelligence (opcjonalnie)

Dla każdego klastra CORE pobierz SERP canonical query via `nodeshub_search.py`:

```bash
python3 .claude/skills/nodeshub-search/nodeshub_search.py "CANONICAL_QUERY"
```

Analizuj:

| Sygnał SERP | Co sprawdzić | Wniosek |
|---|---|---|
| **Typy domen w top 10** | e-commerce vs blog vs forum vs agregator | Jaki content format preferuje Google |
| **Wzorce tytułów** | "Ranking...", "Jak...", "[N] najlepszych..." | Sugerowany format pillar page |
| **Answer Box** | Czy obecny, jaki format (paragraf/lista/tabela) | Featured snippet opportunity → optymalizuj format |
| **Videos** | Czy Google pokazuje wyniki wideo | Dodaj video content do planu |
| **Filter Sidebar** | Atrybuty filtrów (marka, cena, materiał) | Ważne atrybuty dla użytkowników → uwzględnij w content |

Rozszerz tabelę topical map o kolumnę `SERP Insight`:

```markdown
### Content Format Recommendations

| Klaster CORE | Dominujący format w SERP | Rekomendowany format | Featured Snippet? | Video? |
|---|---|---|---|---|
| Rodzaje basenów | Listicle (7/10 top) | Ranking + porównanie | Tak (lista) | Nie |
| Baseny stelażowe | E-commerce (6/10 top) | Kategoria + poradnik | Nie | Tak |
```

Jeśli `nodeshub-search` niedostępny → pomiń sekcję SERP Intelligence, klasyfikuj CORE/OUTER jak dotychczas.

## Wymiary strategiczne (Vastness - Depth - Momentum)

- **Vastness** (szerokość) → więcej klastrów, szerszy OUTER
- **Depth** (głębokość) → głębsze CORE, więcej supporting pages
- **Momentum** (tempo) → szybsza produkcja treści

Jeśli nie możesz mieć wszystkich trzech, nadrabiaj brakujący wymiar pozostałymi dwoma.
