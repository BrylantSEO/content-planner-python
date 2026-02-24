# Python Tools — CLI Reference

Wymagania: `GEMINI_API_KEY` i `NODESHUB_API_KEY` w `.env`.

---

## keyword-clusterer / cluster.py

```bash
python3 .claude/skills/keyword-clusterer/cluster.py INPUT.csv OUTPUT.csv [options]
```

| Opcja | Opis |
|-------|------|
| `--algorithm kmeans\|dbscan\|hierarchical` | Algorytm klasteryzacji |
| `--k N` | Liczba klastrów (dla K-means) |
| `--visualize` | Generuj wykres |
| `--min-samples N` | Min próbki (DBSCAN) |
| `--eps FLOAT` | Epsilon (DBSCAN) |
| `--no-cache` | Wyłącz cache embeddingów |

**Cache:** `data/embeddings/` · **Logi:** `_metadata.json`
**Instalacja:** `pip install -r .claude/skills/keyword-clusterer/requirements.txt`

---

## nodeshub-search / nodeshub_search.py

```bash
python3 .claude/skills/nodeshub-search/nodeshub_search.py "KEYWORD" [hl] [gl]
python3 .claude/skills/nodeshub-search/nodeshub_search.py "KEYWORD" --json
```

- `hl` — język (domyślnie: `pl`)
- `gl` — kraj (domyślnie: `pl`)

Zwraca: top 10 organic + PAA + Related Searches + Refine Chips + Videos + Filter Sidebar.
**Instalacja:** `pip install requests python-dotenv`

---

## jina-reader / jina_reader.py

```bash
# Single URL
python3 .claude/skills/jina-reader/jina_reader.py "URL" [--clean] [--json]

# Batch
python3 .claude/skills/jina-reader/jina_reader.py --batch urls.txt --output data/competitor_content [--workers N] [--no-consolidate]
```

| Opcja | Opis |
|-------|------|
| `--clean` | Usuwa nawigację, obrazy, boilerplate |
| `--batch urls.txt` | Tryb wsadowy z pliku |
| `--output DIR` | Katalog wyjściowy |
| `--workers N` | Równoległe workery (domyślnie: 5) |
| `--no-consolidate` | Pomiń raport jakości i plik zbiorczy |

Batch generuje: `*.md` per URL + `_quality_report.txt` + `_consolidated.md` (max 1500 słów/konkurent).
Działa bez API key (limit 20 RPM). **Instalacja:** `pip install requests python-dotenv`

---

## Skill Packaging

```bash
# Pakuj skill do ZIP
python3 .claude/skills/skill-creator/scripts/package_skill.py .claude/skills/<skill-name> skills/optimized

# Waliduj bez pakowania
python3 .claude/skills/skill-creator/scripts/quick_validate.py .claude/skills/<skill-name>
```
