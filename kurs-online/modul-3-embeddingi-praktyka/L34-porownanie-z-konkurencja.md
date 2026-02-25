# L34 — Porównanie treści z konkurencją przez embeddingi

**Moduł:** 3 — Embeddingi w praktyce
**Czas:** ~35 min
**Format:** Demo z Jina batch + embedding comparison

---

## Cel lekcji

Identyfikujesz content gaps (luki tematyczne) porównując Twój artykuł z top 5 konkurentów przez embeddingi.

---

## Content gap jako "nieobsadzona przestrzeń semantyczna"

Wyobraź sobie, że tematy to punkty na mapie. Top 5 artykułów o "agencji SEO":

```
Mapa semantyczna "agencja SEO"

  [Artykuł 1] cennik, modele rozliczeń
  [Artykuł 2] jak wybierać, pytania do zadania
  [Artykuł 3] czerwone flagi, jak unikać złych agencji
  [Artykuł 4] agencja vs freelancer vs in-house
  [Artykuł 5] jak mierzyć wyniki, KPI

  [TWÓJ artykuł] jak wybierać, modele rozliczeń (pokrywa Artykuł 1 + 2)

                          ← GAP: czerwone flagi (Artykuł 3 nie pokryty)
                          ← GAP: agencja vs freelancer (Artykuł 4 nie pokryty)
                          ← GAP: KPI i mierzenie (Artykuł 5 nie pokryty)
```

Embeddingi pozwalają to zmierzyć **matematycznie** zamiast czytać wszystko ręcznie.

---

## Workflow: 5 artykułów konkurentów → content gaps

### Krok 1 — Pobierz top 5 artykułów z SERP

```bash
# Pobierz wyniki SERP
python3 .claude/skills/nodeshub-search/nodeshub_search.py "agencja SEO jak wybrać" --json > serp.json

# Wyciągnij top 5 URL (ręcznie lub przez jq)
# Utwórz plik competitor_urls.txt z 5 URL
```

### Krok 2 — Pobierz treść przez Jina batch

```bash
python3 .claude/skills/jina-reader/jina_reader.py \
  --batch competitor_urls.txt \
  --output data/competitor_content \
  --workers 3
```

### Krok 3 — Wygeneruj embeddingi konkurentów

```python
import json
from pathlib import Path

# Załaduj treści
competitor_texts = []
for md_file in Path("data/competitor_content").glob("*.md"):
    if not md_file.name.startswith("_"):  # pomijaj raporty
        text = md_file.read_text()[:5000]  # pierwsze 5000 znaków
        competitor_texts.append({
            "file": md_file.name,
            "text": text
        })

# Wygeneruj embeddingi
for item in competitor_texts:
    item["embedding"] = generate_embedding(item["text"], "RETRIEVAL_DOCUMENT")
    print(f"Embedding: {item['file']}")
```

### Krok 4 — Porównaj z własnym artykułem

```python
import numpy as np

def cosine_sim(a, b):
    return float(np.dot(a, b) / (np.linalg.norm(a) * np.linalg.norm(b)))

# Twój artykuł
my_article = Path("twoj_artykul.md").read_text()
my_embedding = generate_embedding(my_article, "RETRIEVAL_DOCUMENT")

# Similarity z każdym konkurentem
print("Twój artykuł vs konkurenci:\n")
for comp in competitor_texts:
    sim = cosine_sim(my_embedding, comp["embedding"])
    if sim > 0.80:
        status = "POKRYTY"
    elif sim > 0.60:
        status = "CZĘŚCIOWO"
    else:
        status = "GAP"
    print(f"{status} ({sim:.2f}) — {comp['file']}")
```

### Output:

```
Twój artykuł vs konkurenci:

POKRYTY     (0.87) — seoteka_jak-wybrac-agencje.md
CZĘŚCIOWO   (0.71) — senuto_agencja-seo-poradnik.md
GAP         (0.54) — whitepress_czerwone-flagi-agencja.md  ← BRAKUJE!
GAP         (0.48) — seomix_agencja-vs-freelancer.md       ← BRAKUJE!
CZĘŚCIOWO   (0.68) — semcore_kpi-agencja-seo.md
```

---

## Interpretacja i następne kroki

| Status | Działanie |
|--------|---------|
| POKRYTY (> 0.80) | Twój artykuł pokrywa ten temat — sprawdź czy nie kanibalizuje |
| CZĘŚCIOWO (0.60–0.80) | Dodaj sekcję H2 z brakującym aspektem |
| GAP (< 0.60) | Nowy artykuł lub rozbuduj istniejący o cały cluster |

**Priorytety gap analysis (P1–P4):**

| Priorytet | Opis | Działanie |
|-----------|------|---------|
| P1 | Gap + competitor ma bardzo wysoką pozycję | Pisz NATYCHMIAST |
| P2 | Gap + wysoki wolumen frazy | Zaplanuj na następny miesiąc |
| P3 | Częściowe pokrycie | Rozbuduj istniejący artykuł |
| P4 | Gap + nisza / mały wolumen | Backlog — pisz gdy masz czas |

---

## Automatycznie w pipeline'ach

**Keyword Clustering Pipeline** robi to automatycznie przez `content-gap-detector`.
Po klasteryzacji każdy klaster jest porównany z SERP top 10.

**Content Planning Pipeline** robi gap analysis dla jednego tematu przez `competitor-gap-analyzer`.

---

## Ćwiczenie

1. Wybierz temat z Twojej branży gdzie masz już artykuł

2. Pobierz top 3 artykuły konkurentów przez Jina batch:
   ```bash
   python3 .claude/skills/jina-reader/jina_reader.py --batch competitor_urls.txt --output data/test_gaps
   ```

3. Wygeneruj embeddingi dla artykułów konkurentów i swojego

4. Oblicz similarity — które tematy pokrywasz, które są GAP?

5. Zaplanuj 1 sekcję H2 lub 1 nowy artykuł na podstawie P1 gap

---

**Następna lekcja:** L40 — Architektura pipeline'ów — jak agenty orkiestrują skills
