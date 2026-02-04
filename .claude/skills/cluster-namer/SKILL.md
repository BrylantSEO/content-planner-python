---
name: cluster-namer
description: >
  Nazywa klastry słów kluczowych i identyfikuje Central Entity oraz canonical query
  dla każdego klastra. Użyj po klasteryzacji keywords (keyword-clusterer).
  Triggery: nazwij klastry, central entity klastrów, canonical query, nazwy klastrów,
  analiza klastrów.
---

# Cluster Namer

Nazywaj klastry keywords i identyfikuj Central Entity.

## Dla każdego klastra

1. **Przeanalizuj wszystkie keywords** w klastrze
2. **Zidentyfikuj canonical query** (root query):
   - Najogólniejsze keyword opisujące temat klastra
   - Zwykle ma najwyższy potencjał wolumenu
   - Canonical = podstawa tytułu pillar page
3. **Określ Central Entity**:
   - Encja, wokół której skupiają się keywords
   - Musi istnieć jako samodzielne pojęcie (nie fraza, nie atrybut)
4. **Nadaj nazwę klastrowi**:
   - 2-3 słowa, opisowe
   - Na podstawie Central Entity i dominującego tematu

## Format wyjściowy

Zapisz wynik jako CSV w `data/clusters/[seed]_named.csv`:

```csv
cluster_id,cluster_name,central_entity,canonical_query,keywords_count
1,Baseny ogrodowe,Basen ogrodowy,baseny ogrodowe,87
2,Chemia basenowa,Chemia basenowa,chemia basenowa,62
```

Wyświetl też tabelę:

```markdown
| cluster_id | cluster_name | central_entity | canonical_query | keywords |
|:----------:|:-------------|:---------------|:----------------|:--------:|
```

## Wskazówki

- Canonical query to NIE zawsze keyword z najwyższym wolumenem - to root query klastra
- Kontekst często pochodzi z keywords o niskim wolumenie (z dołu listy)
- Jeśli klaster jest zbyt szeroki (mieszane tematy) → zasugeruj podział
- Jeśli dwa klastry się pokrywają → zasugeruj połączenie
