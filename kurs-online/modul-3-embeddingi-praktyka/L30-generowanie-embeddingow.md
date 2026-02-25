# L30 — Generowanie embeddingów (Gemini API)

**Moduł:** 3 — Embeddingi w praktyce
**Czas:** ~30 min
**Format:** Demo + kod

---

## Cel lekcji

Generujesz embeddingi dla dowolnego tekstu przez Gemini API i rozumiesz różnicę między task_type CLUSTERING a RETRIEVAL_DOCUMENT.

---

## Gemini text-embedding-004

**Model:** `text-embedding-004`
**Wymiary:** 768
**Limit tokenów:** ~2048 tokenów na tekst (ok. 1500 słów)
**Koszt:** ~$0.0001 per 1000 tokenów (praktycznie darmowe dla małych projektów)

---

## Dwa tryby: task_type

| task_type | Kiedy używać | Jak działa |
|-----------|-------------|-----------|
| `RETRIEVAL_DOCUMENT` | Wgrywanie treści do bazy (upload) | Optymalizuje pod "bycie znalezionym" |
| `RETRIEVAL_QUERY` | Wyszukiwanie podobnych (query) | Optymalizuje pod "szukanie" |
| `CLUSTERING` | Grupowanie słów kluczowych | Optymalizuje pod podobieństwo tematyczne |
| `SEMANTIC_SIMILARITY` | Porównanie pary tekstów | Ogólne podobieństwo |

**Zasada:**
- Upload artykułu do Supabase → `RETRIEVAL_DOCUMENT`
- Wyszukiwanie podobnych artykułów → `RETRIEVAL_QUERY`
- Klasteryzacja keywords → `CLUSTERING`

---

## API Call — przykład Python

```python
import requests
import os
from dotenv import load_dotenv

load_dotenv()
GEMINI_API_KEY = os.getenv("GEMINI_API_KEY")

def generate_embedding(text: str, task_type: str = "RETRIEVAL_DOCUMENT") -> list[float]:
    """
    Generuje embedding 768-wymiarowy przez Gemini text-embedding-004.

    task_type options:
    - RETRIEVAL_DOCUMENT: upload treści do bazy
    - RETRIEVAL_QUERY: wyszukiwanie (query) w bazie
    - CLUSTERING: grupowanie keywords
    - SEMANTIC_SIMILARITY: porównanie par tekstów
    """
    url = f"https://generativelanguage.googleapis.com/v1beta/models/text-embedding-004:embedContent?key={GEMINI_API_KEY}"

    payload = {
        "model": "models/text-embedding-004",
        "content": {"parts": [{"text": text}]},
        "taskType": task_type,
    }

    resp = requests.post(url, json=payload, timeout=30)
    resp.raise_for_status()
    return resp.json()["embedding"]["values"]


# Przykład użycia
text = "Jak wybrać agencję SEO — 7 kluczowych pytań"
embedding = generate_embedding(text, task_type="RETRIEVAL_DOCUMENT")

print(f"Wymiary: {len(embedding)}")        # 768
print(f"Pierwsze 5 wartości: {embedding[:5]}")  # [-0.03, 0.12, ...]
```

---

## Generowanie embeddingów dla wielu artykułów

```python
import json
from pathlib import Path
import time

def batch_generate_embeddings(urls_and_texts: list[dict]) -> list[dict]:
    """
    Generuje embeddingi dla listy tekstów.
    Input: [{"url": "...", "text": "..."}]
    Output: [{"url": "...", "embedding": [...]}]
    """
    results = []
    for i, item in enumerate(urls_and_texts):
        print(f"[{i+1}/{len(urls_and_texts)}] {item['url'][:50]}...")
        embedding = generate_embedding(item["text"], task_type="RETRIEVAL_DOCUMENT")
        results.append({"url": item["url"], "embedding": embedding})
        time.sleep(0.1)  # rate limit safety
    return results

# Zapisz cache (nie generuj dwa razy)
def save_embedding_cache(embeddings: list[dict], cache_path: str):
    Path(cache_path).parent.mkdir(parents=True, exist_ok=True)
    with open(cache_path, "w") as f:
        json.dump(embeddings, f, indent=2)
    print(f"Cache zapisany: {cache_path}")

def load_embedding_cache(cache_path: str) -> dict:
    """Zwraca dict {url: embedding} z cache."""
    if not Path(cache_path).exists():
        return {}
    with open(cache_path) as f:
        data = json.load(f)
    return {item["url"]: item["embedding"] for item in data}
```

---

## Cache embeddingów w data/embeddings/

Generowanie embeddingów kosztuje (czas + API). Semantic-OS cachuje je w `data/embeddings/`.

**Struktura cache:**
```
data/embeddings/
├── double_digital_blog.json    ← embeddingi bloga DD
├── competitor_a.json           ← embeddingi konkurenta A
└── keywords_cache.json         ← embeddingi z klasteryzacji
```

**W praktyce** — `cluster.py` automatycznie cachuje:
```bash
# Pierwsza klasteryzacja: generuje i cachuje
python3 .claude/skills/keyword-clusterer/cluster.py input.csv output.csv

# Ponowna klasteryzacja: używa cache (szybka!)
python3 .claude/skills/keyword-clusterer/cluster.py input.csv output2.csv --k 10
```

Bez cache: `--no-cache` — wymusza regenerowanie.

---

## Praktyczny przykład: embedding dla tematu artykułu

Kiedy chcesz sprawdzić czy temat nowego artykułu nie kanibalizuje istniejących:

```python
# 1. Wygeneruj embedding dla tematu (RETRIEVAL_QUERY)
new_topic = "Jak wybrać agencję Google Ads — 5 pytań przed podpisaniem umowy"
topic_embedding = generate_embedding(new_topic, task_type="RETRIEVAL_QUERY")

# 2. Format jako string dla SQL pgvector
vector_str = "[" + ",".join(str(v) for v in topic_embedding) + "]"

# 3. Użyj w SQL Supabase (L32 — kanibalizacja)
sql = f"""
SELECT url, 1 - (vector <=> '{vector_str}'::vector) AS similarity
FROM blog_vectors_moj_projekt
ORDER BY similarity DESC
LIMIT 5;
"""
```

---

## Ćwiczenie

1. Uruchom prosty test generowania embeddingów:
   ```python
   from dotenv import load_dotenv
   import os, requests
   load_dotenv()
   # (wklej funkcję generate_embedding z powyżej)
   emb = generate_embedding("test query o agencji SEO")
   print(f"Wymiary: {len(emb)}, wartość[0]: {emb[0]:.4f}")
   ```

2. Wygeneruj embeddingi dla 3 różnych tekstów:
   - "agencja Google Ads dla e-commerce"
   - "pozycjonowanie SEO dla sklepów online"
   - "przepis na ciasto czekoladowe"

3. Oblicz cosine similarity ręcznie:
   ```python
   import numpy as np
   def cosine_sim(a, b):
       return np.dot(a, b) / (np.linalg.norm(a) * np.linalg.norm(b))

   # Które dwa teksty są najbardziej podobne?
   ```

4. Wynik powinien potwierdzić: tekst 1 i 2 są znacznie bliżej siebie niż 1/2 z 3.

---

**Następna lekcja:** L31 — Wgrywanie treści do Supabase
