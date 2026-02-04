---
name: keyword-clusterer
description: >
  Klasteryzuje listę słów kluczowych za pomocą embeddingów (Gemini API) i algorytmów ML.
  Input to CSV z keywords. Uruchamia skrypt cluster.py który generuje embeddingi,
  klasteryzuje (K-means/DBSCAN/hierarchiczna) i eksportuje wynik z cluster_id.
  Triggery: klasteryzuj keywords, grupuj słowa kluczowe, embeddingi keywords,
  klasteryzacja embeddingami.
allowed-tools: Bash(python3 *), Read, Write
---

# Keyword Clusterer

Klasteryzuj keywords za pomocą embeddingów i algorytmów ML.

## Jak działasz

1. Otrzymujesz ścieżkę do CSV z keywords (kolumna: `keyword`)
2. Uruchamiasz skrypt:
   ```
   python3 .claude/skills/keyword-clusterer/cluster.py INPUT.csv OUTPUT.csv [opcje]
   ```
3. Opcjonalne flagi:
   - `--algorithm kmeans|dbscan|hierarchical` (domyślnie: kmeans)
   - `--visualize` (generuje visualization.html z t-SNE)
   - `--k N` (wymusza N klastrów zamiast auto-doboru przez silhouette score)
   - `--min-samples N` (dla DBSCAN, domyślnie: 3)
   - `--eps FLOAT` (dla DBSCAN, domyślnie: auto)
4. Interpretujesz output i prezentujesz wyniki użytkownikowi

## Typowe wywołanie w pipeline

```bash
python3 .claude/skills/keyword-clusterer/cluster.py \
  data/keywords/baseny_expanded.csv \
  data/clusters/baseny_clustered.csv --visualize
```

## Wymagania

- `GEMINI_API_KEY` w zmiennych środowiskowych
- Pakiety: `pip install google-genai scikit-learn pandas numpy plotly`

## Interpretacja wyników

- **Silhouette score > 0.5** = klastry dobrze oddzielone
- **Silhouette score 0.25-0.5** = częściowe nakładanie, akceptowalne
- **Silhouette score < 0.25** = rozważ inny algorytm lub liczbę klastrów
- Jeśli wizualizacja t-SNE pokazuje nachodzące klastry → zmniejsz k lub użyj DBSCAN
