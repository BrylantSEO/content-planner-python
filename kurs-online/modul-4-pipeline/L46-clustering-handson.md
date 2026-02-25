# L46 — Keyword Clustering Pipeline — hands-on

**Moduł:** 4 — Trzy pipeline'y: teoria i praktyka
**Czas:** ~45 min
**Format:** Screencast — od CSV do topical map

---

## Cel lekcji

Uruchamiasz pełny pipeline klasteryzacji na gotowym CSV, interpretujesz wykres t-SNE i budujesz plan publikacji P1–P4.

---

## Krok 1 — Przygotuj dane wejściowe

Użyj gotowego pliku z kursu:

```bash
ls kurs-online/materialy/exercise-files/agencja_marketingowa_expanded.csv
```

Lub wygeneruj własny przez keyword expander:

```
> /keyword-clustering-pipeline
Seed keyword: agencja marketingowa
Source Context: Agencja performance marketingu dla e-commerce i leadgen B2B w Polsce
```

---

## Krok 2 — Klasteryzacja z cluster.py

```bash
python3 .claude/skills/keyword-clusterer/cluster.py \
  kurs-online/materialy/exercise-files/agencja_marketingowa_expanded.csv \
  data/clusters/agencja_output.csv \
  --visualize
```

**Parametry do eksperymentowania:**

| Opcja | Przykład | Kiedy |
|-------|---------|-------|
| `--k 8` | 8 klastrów | gdy auto-detekcja daje za mało/za dużo |
| `--algorithm dbscan` | DBSCAN | gdy klastry mają nierówne rozmiary |
| `--algorithm hierarchical` | Hierarchiczna | gdy chcesz drzewo podklastrów |
| `--min-samples 3` | Min 3 frazy/klaster | dla DBSCAN |
| `--no-cache` | bez cache | gdy zmieniłeś dane i chcesz nowe embeddingi |

**Wynik:**
```
Generuję embeddingi... (cache: 0 hit, 287 miss)
Klasteryzacja K-means (k=8)...
Silhouette score: 0.23

Klaster 0: 42 frazy → "Google Ads / PPC"
Klaster 1: 38 frazy → "SEO / Pozycjonowanie"
Klaster 2: 31 frazy → "Analityka / GA4"
Klaster 3: 28 frazy → "Social Media"
Klaster 4: 25 frazy → "Wybór agencji"
Klaster 5: 22 frazy → "Koszty / Cennik"
Klaster 6: 19 frazy → "E-commerce Marketing"
Klaster 7: 17 frazy → "Content Marketing"

Zapisano: data/clusters/agencja_output.csv
Wizualizacja: data/clusters/cluster_visualization.png
```

---

## Krok 3 — Interpretacja wykresu t-SNE

Otwórz `data/clusters/cluster_visualization.png`.

**Co sprawdzić:**
1. Czy chmury są wyraźnie odseparowane? (dobra klasteryzacja)
2. Czy frazy w chmurze mają sens razem? (kliknij w legende dla kolorów)
3. Gdzie są outliers (punkty poza chmurami)? → to mogą być niszowe frazy warte uwagi
4. Czy dwie chmury są bardzo blisko? → kandydaci do MERGE (cluster-validator sprawdzi)

---

## Krok 4 — Pełny pipeline w Claude Code

```
> /keyword-clustering-pipeline
Seed keyword: agencja marketingowa
Source Context: Agencja performance marketingu dla e-commerce i leadgen B2B w Polsce
```

Claude uruchomi wszystkie kroki automatycznie. Po zakończeniu w `data/clusters/`:

```
data/clusters/
├── agencja_output.csv           ← CSV z cluster_id per keyword
├── agencja_output_metadata.json ← silhouette score, algorytm
├── topical_map.md               ← CORE/OUTER z priorytetami
└── content_gaps.md              ← P1/P2/P3/P4 gaps
```

---

## Krok 5 — Czytanie topical_map.md

```markdown
## Topical Map — "agencja marketingowa"
Source Context: Agencja performance marketingu dla e-commerce B2B

### CORE Klastry (bezpośrednio o SC)
| Klaster | Canonical Query | Frazy | Format | Priorytet pub. |
|---------|----------------|-------|--------|---------------|
| Google Ads / PPC | "agencja google ads" | 42 | Artykuł poradnikowy | 1 |
| Wybór agencji | "jak wybrać agencję marketingową" | 25 | Artykuł + FAQ | 2 |
| E-commerce Marketing | "marketing dla e-commerce agencja" | 19 | Artykuł + case study | 3 |

### OUTER Klastry (peryferyjne)
| Klaster | Canonical Query | Frazy | Format | Priorytet pub. |
|---------|----------------|-------|--------|---------------|
| SEO / Pozycjonowanie | "agencja seo" | 38 | Artykuł + ranking | 4 |
| Analityka / GA4 | "ga4 dla agencji" | 31 | Tutorial | 5 |
| Koszty / Cennik | "ile kosztuje agencja" | 22 | Artykuł + tabela | 6 |
| Social Media | "agencja social media" | 28 | Artykuł | 7 |
| Content Marketing | "content marketing agencja" | 17 | Artykuł | 8 |
```

---

## Krok 6 — Czytanie content_gaps.md

```markdown
## Content Gaps — "agencja marketingowa"

### P1 — PISZ NATYCHMIAST
- "agencja google ads dla e-commerce" — GAP (konkurent top3 ma, Ty nie masz)
- "jak wybrać agencję digital marketing" — GAP (wysokie wolumeny)

### P2 — Plan na następny miesiąc
- "ile kosztuje agencja google ads" — GAP (średni wolumen)
- "agencja marketing b2b" — GAP (specjalizacja)

### P3 — Backlog
- "agencja social media warszawa" — GAP (niszowe, lokalne)
...

### UNIQUE — Twoje wyróżniki (wzmocnij!)
- "performance marketing roas" — UNIQUE (tylko Ty to pokrywasz)
- "double or nothing" — UNIQUE (branded)
```

---

## Plan publikacji na podstawie topical_map

```
Miesiąc 1 (P1 gaps):
  → Artykuł: "Agencja Google Ads dla e-commerce — jak wybrać"
  → Artykuł: "Jak wybrać agencję digital marketing"

Miesiąc 2 (CORE + P2):
  → Artykuł: "Ile kosztuje agencja Google Ads"
  → Artykuł: "Agencja marketing B2B — specyfika"

Miesiąc 3+ (OUTER):
  → Artykuły z outer klastrów według priorytetów
```

---

## Ćwiczenie

1. Uruchom klasteryzację na `agencja_marketingowa_expanded.csv`
2. Sprawdź silhouette score — czy > 0.15?
3. Otwórz wykres t-SNE — wskaż jeden klaster do potencjalnego MERGE
4. Przejrzyj `topical_map.md` — które klastry są CORE, które OUTER?
5. Z `content_gaps.md` — zaplanuj 2 artykuły P1 na najbliższe tygodnie

---

**Następna lekcja:** L47 — Zaawansowany CQS — głęboka analiza wymiarów
