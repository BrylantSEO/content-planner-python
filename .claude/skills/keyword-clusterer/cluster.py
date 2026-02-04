#!/usr/bin/env python3
"""
Keyword Clusterer - embeddingi + klasteryzacja ML.

Generuje embeddingi (Gemini API, task_type=CLUSTERING),
klasteryzuje algorytmem ML i eksportuje wynik z cluster_id.

Użycie:
    python3 cluster.py INPUT.csv OUTPUT.csv [opcje]

Opcje:
    --algorithm kmeans|dbscan|hierarchical  (domyślnie: kmeans)
    --k N                                   (wymusza liczbę klastrów)
    --visualize                             (generuje visualization.html)
    --min-samples N                         (DBSCAN min_samples, domyślnie: 3)
    --eps FLOAT                             (DBSCAN eps, domyślnie: auto)
    --no-cache                              (wymuś świeże embeddingi)

Wymagania:
    GEMINI_API_KEY w .env lub zmiennych środowiskowych
    pip install google-genai scikit-learn pandas numpy plotly python-dotenv
"""

import argparse
import json
import os
import sys
import time
from datetime import datetime, timezone
from pathlib import Path

# Załaduj .env z katalogu głównego projektu
try:
    from dotenv import load_dotenv

    # Szukaj .env w katalogu projektu (2 poziomy wyżej od skills/)
    env_path = Path(__file__).resolve().parents[3] / ".env"
    if env_path.exists():
        load_dotenv(env_path)
    else:
        load_dotenv()  # fallback: szukaj w cwd
except ImportError:
    pass  # python-dotenv nie zainstalowany - użyj zmiennych środowiskowych

import numpy as np
import pandas as pd
from google import genai
from sklearn.cluster import DBSCAN, AgglomerativeClustering, KMeans
from sklearn.metrics import silhouette_score
from sklearn.neighbors import NearestNeighbors

EMBEDDING_MODEL = "gemini-embedding-001"
PROJECT_ROOT = Path(__file__).resolve().parents[3]
CACHE_DIR = PROJECT_ROOT / "data" / "embeddings"


def preprocess_keywords(keywords: list[str]) -> list[str]:
    """Preprocessing: strip, lowercase, deduplikacja, filtr krótkich."""
    seen = set()
    result = []
    for kw in keywords:
        kw = kw.strip().lower()
        if len(kw) < 2:
            continue
        if kw in seen:
            continue
        seen.add(kw)
        result.append(kw)
    return result


def get_cache_path(seed_name: str) -> Path:
    """Ścieżka do pliku cache embeddingów."""
    return CACHE_DIR / f"{seed_name}_cache.json"


def load_embedding_cache(seed_name: str) -> dict[str, list[float]]:
    """Wczytaj cache embeddingów z dysku."""
    cache_path = get_cache_path(seed_name)
    if cache_path.exists():
        with open(cache_path, "r", encoding="utf-8") as f:
            data = json.load(f)
        print(f"  Cache: wczytano {len(data)} embeddingów z {cache_path.name}")
        return data
    return {}


def save_embedding_cache(seed_name: str, cache: dict[str, list[float]]) -> None:
    """Zapisz cache embeddingów na dysk."""
    CACHE_DIR.mkdir(parents=True, exist_ok=True)
    cache_path = get_cache_path(seed_name)
    with open(cache_path, "w", encoding="utf-8") as f:
        json.dump(cache, f, ensure_ascii=False)
    print(f"  Cache: zapisano {len(cache)} embeddingów do {cache_path.name}")


def derive_seed_name(input_path: str) -> str:
    """Wywnioskuj nazwę seed z nazwy pliku input CSV."""
    name = Path(input_path).stem
    for suffix in ("_expanded", "_keywords", "_raw"):
        if name.endswith(suffix):
            name = name[: -len(suffix)]
    return name


def get_embeddings(
    keywords: list[str],
    client: genai.Client,
    seed_name: str = "",
    use_cache: bool = True,
) -> np.ndarray:
    """Generuj embeddingi przez Gemini API z cache i retry."""
    cache = {}
    if use_cache and seed_name:
        cache = load_embedding_cache(seed_name)

    # Rozdziel na cached i nowe
    cached_keywords = [kw for kw in keywords if kw in cache]
    new_keywords = [kw for kw in keywords if kw not in cache]

    if cached_keywords:
        print(f"  Cache hit: {len(cached_keywords)} keywords")
    if new_keywords:
        print(f"  Do pobrania z API: {len(new_keywords)} keywords")

    # Pobierz brakujące z API
    if new_keywords:
        new_embeddings = _fetch_embeddings_with_retry(new_keywords, client)

        # Walidacja wymiarów
        dims = {len(emb) for emb in new_embeddings}
        if len(dims) > 1:
            print(f"  OSTRZEŻENIE: Niespójne wymiary embeddingów: {dims}")
            expected_dim = max(dims, key=lambda d: sum(1 for e in new_embeddings if len(e) == d))
            new_embeddings = [e for e in new_embeddings if len(e) == expected_dim]
            new_keywords = [kw for kw, e in zip(new_keywords, new_embeddings) if len(e) == expected_dim]

        # Aktualizuj cache
        for kw, emb in zip(new_keywords, new_embeddings):
            cache[kw] = emb

        if use_cache and seed_name:
            save_embedding_cache(seed_name, cache)

    # Złóż wynik w kolejności keywords
    all_embeddings = []
    valid_keywords = []
    for kw in keywords:
        if kw in cache:
            all_embeddings.append(cache[kw])
            valid_keywords.append(kw)
        else:
            print(f"  OSTRZEŻENIE: Brak embeddingu dla '{kw}' - pomijam")

    embeddings = np.array(all_embeddings, dtype=np.float64)

    # Walidacja: sprawdź brak NaN/Inf
    if np.any(np.isnan(embeddings)) or np.any(np.isinf(embeddings)):
        print("  OSTRZEŻENIE: Wykryto NaN/Inf w embeddingach - usuwam problematyczne wiersze")
        mask = np.all(np.isfinite(embeddings), axis=1)
        embeddings = embeddings[mask]
        valid_keywords[:] = [kw for kw, m in zip(valid_keywords, mask) if m]

    return embeddings


def _fetch_embeddings_with_retry(
    keywords: list[str], client: genai.Client, max_retries: int = 3
) -> list[list[float]]:
    """Pobierz embeddingi z API z retry i exponential backoff."""
    all_embeddings = []
    batch_size = 100  # Gemini limit

    for i in range(0, len(keywords), batch_size):
        batch = keywords[i : i + batch_size]
        print(f"  Embeddingi: {i + 1}-{min(i + batch_size, len(keywords))}/{len(keywords)}...")

        for attempt in range(max_retries):
            try:
                result = client.models.embed_content(
                    model=EMBEDDING_MODEL,
                    contents=batch,
                    config={"task_type": "CLUSTERING"},
                )
                for embedding in result.embeddings:
                    all_embeddings.append(embedding.values)
                break
            except Exception as e:
                if attempt < max_retries - 1:
                    wait = 2 ** (attempt + 1)
                    print(f"  Retry {attempt + 1}/{max_retries} za {wait}s: {e}")
                    time.sleep(wait)
                else:
                    print(f"  BŁĄD po {max_retries} próbach: {e}")
                    raise

        # Rate limiting
        if i + batch_size < len(keywords):
            time.sleep(0.5)

    return all_embeddings


def find_optimal_k(embeddings: np.ndarray, k_min: int = 2, k_max: int = 20) -> tuple[int, float]:
    """Znajdź optymalny k przez silhouette score (n_init=3 dla szybkości)."""
    k_max = min(k_max, len(embeddings) - 1)
    best_k = k_min
    best_score = -1

    print(f"  Szukam optymalnego k ({k_min}-{k_max})...")

    for k in range(k_min, k_max + 1):
        kmeans = KMeans(n_clusters=k, n_init=3, random_state=42)
        labels = kmeans.fit_predict(embeddings)
        score = silhouette_score(embeddings, labels)

        if score > best_score:
            best_score = score
            best_k = k

        print(f"    k={k}: silhouette={score:.3f}")

    return best_k, best_score


def cluster_kmeans(embeddings: np.ndarray, k: int | None = None) -> tuple[np.ndarray, dict]:
    """Klasteryzacja K-means (n_init=10 dla finalnego)."""
    if k is None:
        k, score = find_optimal_k(embeddings)
        print(f"  Optymalny k={k} (silhouette: {score:.3f})")
    else:
        print(f"  Wymuszony k={k}")

    kmeans = KMeans(n_clusters=k, n_init=10, random_state=42)
    labels = kmeans.fit_predict(embeddings)
    score = silhouette_score(embeddings, labels)

    return labels, {"algorithm": "kmeans", "k": k, "silhouette": round(score, 4)}


def _find_eps_knee(embeddings: np.ndarray, min_samples: int) -> float:
    """Znajdź optymalny eps przez k-distance graph (knee heuristic)."""
    nn = NearestNeighbors(n_neighbors=min_samples, metric="cosine")
    nn.fit(embeddings)
    distances, _ = nn.kneighbors(embeddings)

    # k-ta odległość (ostatnia kolumna) posortowana rosnąco
    k_distances = np.sort(distances[:, -1])

    # Szukaj "kolana" - punkt maksymalnej krzywizny
    # Prosta heurystyka: największy skok w drugiej pochodnej
    if len(k_distances) < 4:
        return float(np.median(k_distances))

    # Druga pochodna (przybliżona)
    d2 = np.diff(np.diff(k_distances))
    knee_idx = np.argmax(d2) + 2  # +2 bo dwa diff
    knee_idx = min(knee_idx, len(k_distances) - 1)

    eps = float(k_distances[knee_idx])

    # Sanity check: eps nie powinien być zbyt mały ani zbyt duży
    eps = max(eps, 0.05)
    eps = min(eps, 1.5)

    print(f"  K-distance knee: eps={eps:.3f}")
    return eps


def cluster_dbscan(
    embeddings: np.ndarray, eps: float | None = None, min_samples: int = 3
) -> tuple[np.ndarray, dict]:
    """Klasteryzacja DBSCAN z k-distance auto-tuning."""
    if eps is None:
        eps = _find_eps_knee(embeddings, min_samples)
        print(f"  Auto eps={eps:.3f} (k-distance heuristic)")

        # Spróbuj znaleźć lepszy eps w okolicy knee
        best_eps = eps
        best_score = -1
        best_labels = None

        for test_eps in [eps * 0.7, eps * 0.85, eps, eps * 1.15, eps * 1.3]:
            db = DBSCAN(eps=test_eps, min_samples=min_samples, metric="cosine")
            labels = db.fit_predict(embeddings)
            n_clusters = len(set(labels)) - (1 if -1 in labels else 0)

            if n_clusters >= 2:
                mask = labels != -1
                if mask.sum() > n_clusters:
                    score = silhouette_score(embeddings[mask], labels[mask])
                    print(f"    eps={test_eps:.3f}: {n_clusters} klastrów, silhouette={score:.3f}")
                    if score > best_score:
                        best_score = score
                        best_eps = test_eps
                        best_labels = labels

        if best_labels is None:
            print("  DBSCAN nie znalazł klastrów. Fallback na K-means.")
            return cluster_kmeans(embeddings)

        eps = best_eps
        labels = best_labels
    else:
        db = DBSCAN(eps=eps, min_samples=min_samples, metric="cosine")
        labels = db.fit_predict(embeddings)

    n_clusters = len(set(labels)) - (1 if -1 in labels else 0)
    n_noise = (labels == -1).sum()

    mask = labels != -1
    score = silhouette_score(embeddings[mask], labels[mask]) if mask.sum() > n_clusters else 0

    return labels, {
        "algorithm": "dbscan",
        "eps": round(eps, 4),
        "min_samples": min_samples,
        "n_clusters": n_clusters,
        "n_noise": int(n_noise),
        "silhouette": round(score, 4),
    }


def cluster_hierarchical(embeddings: np.ndarray, k: int | None = None) -> tuple[np.ndarray, dict]:
    """Klasteryzacja hierarchiczna (agglomerative)."""
    if k is None:
        k, score = find_optimal_k(embeddings)
        print(f"  Optymalny k={k} (silhouette: {score:.3f})")

    agg = AgglomerativeClustering(n_clusters=k)
    labels = agg.fit_predict(embeddings)
    score = silhouette_score(embeddings, labels)

    return labels, {"algorithm": "hierarchical", "k": k, "silhouette": round(score, 4)}


def visualize_clusters(
    embeddings: np.ndarray, labels: np.ndarray, keywords: list[str], output_path: str
):
    """Wizualizacja t-SNE w HTML (Plotly)."""
    try:
        from sklearn.manifold import TSNE
        import plotly.express as px

        print("  Generowanie wizualizacji t-SNE...")

        perplexity = min(30, len(embeddings) - 1)
        tsne = TSNE(n_components=2, random_state=42, perplexity=perplexity)
        coords = tsne.fit_transform(embeddings)

        df_viz = pd.DataFrame(
            {
                "x": coords[:, 0],
                "y": coords[:, 1],
                "cluster": [f"Cluster {l}" if l >= 0 else "Noise" for l in labels],
                "keyword": keywords,
            }
        )

        fig = px.scatter(
            df_viz,
            x="x",
            y="y",
            color="cluster",
            hover_data=["keyword"],
            title="Keyword Clusters (t-SNE)",
            width=1200,
            height=800,
        )
        fig.update_traces(marker=dict(size=8, opacity=0.7))
        fig.update_layout(showlegend=True)

        viz_path = output_path.replace(".csv", "_visualization.html")
        fig.write_html(viz_path)
        print(f"  Wizualizacja: {viz_path}")

    except ImportError:
        print("  Brak plotly - pomiń wizualizację (pip install plotly)")


def save_metadata(output_csv: str, info: dict, keywords: list[str], labels: np.ndarray) -> None:
    """Zapisz metadata JSON obok output CSV."""
    # Rozkład klastrów
    cluster_dist = {}
    for cluster_id in sorted(set(labels)):
        count = int((labels == cluster_id).sum())
        label = f"cluster_{cluster_id}" if cluster_id >= 0 else "noise"
        cluster_dist[label] = count

    metadata = {
        "timestamp": datetime.now(timezone.utc).isoformat(),
        "embedding_model": EMBEDDING_MODEL,
        "n_keywords": len(keywords),
        "cluster_distribution": cluster_dist,
        **info,
    }

    meta_path = output_csv.replace(".csv", "_metadata.json")
    with open(meta_path, "w", encoding="utf-8") as f:
        json.dump(metadata, f, indent=2, ensure_ascii=False)
    print(f"  Metadata: {meta_path}")


def main():
    parser = argparse.ArgumentParser(description="Keyword Clusterer - embeddingi + ML")
    parser.add_argument("input_csv", help="CSV z keywords (kolumna: keyword)")
    parser.add_argument("output_csv", help="Ścieżka do zapisu wyników")
    parser.add_argument(
        "--algorithm",
        choices=["kmeans", "dbscan", "hierarchical"],
        default="kmeans",
        help="Algorytm klasteryzacji (domyślnie: kmeans)",
    )
    parser.add_argument("--k", type=int, default=None, help="Wymuś liczbę klastrów")
    parser.add_argument("--visualize", action="store_true", help="Generuj wizualizację t-SNE")
    parser.add_argument(
        "--min-samples", type=int, default=3, help="DBSCAN min_samples (domyślnie: 3)"
    )
    parser.add_argument("--eps", type=float, default=None, help="DBSCAN eps (domyślnie: auto)")
    parser.add_argument("--no-cache", action="store_true", help="Wymuś świeże embeddingi (pomiń cache)")

    args = parser.parse_args()

    # Sprawdź API key
    api_key = os.environ.get("GEMINI_API_KEY")
    if not api_key:
        print("BŁĄD: Ustaw GEMINI_API_KEY w zmiennych środowiskowych")
        sys.exit(1)

    # Wczytaj keywords
    print(f"Wczytywanie: {args.input_csv}")
    df = pd.read_csv(args.input_csv)

    if "keyword" not in df.columns:
        # Spróbuj pierwszą kolumnę
        df.columns = ["keyword"] + list(df.columns[1:])

    raw_keywords = df["keyword"].dropna().tolist()
    keywords = preprocess_keywords(raw_keywords)
    n_removed = len(raw_keywords) - len(keywords)
    print(f"Keywords: {len(keywords)} (usunięto {n_removed} duplikatów/krótkich)")

    if len(keywords) < 3:
        print("BŁĄD: Potrzeba minimum 3 keywords")
        sys.exit(1)

    # Generuj embeddingi
    seed_name = derive_seed_name(args.input_csv)
    use_cache = not args.no_cache
    print(f"Generowanie embeddingów ({EMBEDDING_MODEL}, task_type=CLUSTERING)...")
    client = genai.Client(api_key=api_key)
    embeddings = get_embeddings(keywords, client, seed_name=seed_name, use_cache=use_cache)

    # Gemini embeddingi są już znormalizowane - NIE stosujemy dodatkowej L2 normalizacji
    # (dodatkowa normalizacja powodowała overflow/NaN w matmul)

    # Klasteryzacja
    print(f"Klasteryzacja ({args.algorithm})...")

    if args.algorithm == "kmeans":
        labels, info = cluster_kmeans(embeddings, args.k)
    elif args.algorithm == "dbscan":
        labels, info = cluster_dbscan(embeddings, args.eps, args.min_samples)
    elif args.algorithm == "hierarchical":
        labels, info = cluster_hierarchical(embeddings, args.k)

    # Wyniki
    result_df = pd.DataFrame({"keyword": keywords, "cluster_id": labels})

    # Dodaj dodatkowe kolumny z oryginału (jeśli istnieją)
    if "typ" in df.columns:
        keyword_types = df.set_index("keyword")["typ"].to_dict()
        # Mapuj po lowercase keywords (preprocessing je zlowercase'ował)
        keyword_types_lower = {k.strip().lower(): v for k, v in keyword_types.items()}
        result_df["typ"] = result_df["keyword"].map(keyword_types_lower)

    # Sortuj po cluster_id
    result_df = result_df.sort_values("cluster_id").reset_index(drop=True)

    # Zapisz
    os.makedirs(os.path.dirname(args.output_csv) or ".", exist_ok=True)
    result_df.to_csv(args.output_csv, index=False)

    # Podsumowanie
    n_clusters = len(set(labels)) - (1 if -1 in labels else 0)
    print(f"\nWyniki:")
    print(f"  Algorytm: {info['algorithm']}")
    print(f"  Klastry: {n_clusters}")
    print(f"  Silhouette score: {info.get('silhouette', 'N/A'):.4f}")

    if "n_noise" in info:
        print(f"  Noise points: {info['n_noise']}")

    print(f"\nRozkład klastrów:")
    for cluster_id in sorted(set(labels)):
        count = (labels == cluster_id).sum()
        label = f"Cluster {cluster_id}" if cluster_id >= 0 else "Noise"
        sample = [k for k, l in zip(keywords, labels) if l == cluster_id][:3]
        print(f"  {label}: {count} keywords (np. {', '.join(sample)})")

    print(f"\nZapisano: {args.output_csv}")

    # Metadata
    save_metadata(args.output_csv, info, keywords, labels)

    # Wizualizacja
    if args.visualize:
        visualize_clusters(embeddings, labels, keywords, args.output_csv)

    # Info JSON (do łatwego parsowania przez Claude)
    info["n_keywords"] = len(keywords)
    info["n_clusters"] = n_clusters
    info["output_file"] = args.output_csv
    print(f"\nINFO_JSON: {info}")


if __name__ == "__main__":
    main()
