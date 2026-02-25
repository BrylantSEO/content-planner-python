# L11 — Embeddingi — intuicja geometryczna

**Moduł:** 1 — Jak działa AI Search
**Czas:** ~30 min
**Format:** Diagram + demo t-SNE

---

## Cel lekcji

Rozumiesz czym są embeddingi i dlaczego AI "widzi" tematy jako przestrzeń geometryczną. Potrafisz zinterpretować wykres t-SNE z klasteryzacji.

---

## Słowo jako punkt w przestrzeni

Embedding = zamiana słowa (lub tekstu) na listę liczb (wektor).

**Przykład uproszczony (2 wymiary):**

```
               ↑ związek z wodą
"pływalnia"  • |
"basen"      • |
               |
               |                 • "kredyt"
               |         • "hipoteka"
               |
───────────────┼───────────────────────→ wymiar finansowy
               |
```

- "basen" i "pływalnia" są **blisko siebie** → podobny sens
- "basen" i "kredyt" są **daleko** → różny sens
- "kredyt" i "hipoteka" są **blisko** → podobny sens

**W rzeczywistości:** Gemini text-embedding-004 generuje wektory **768-wymiarowe**. Nie możesz ich narysować, ale matematycznie działają tak samo jak przykład 2D.

---

## Cosine similarity — miara bliskości

Jak mierzymy "bliskość" dwóch wektorów?

**Cosine similarity** = cosinus kąta między wektorami.
- Wartość 1.0 = identyczne (ten sam kierunek)
- Wartość 0.0 = niezwiązane (prostopadłe)
- Wartość -1.0 = przeciwstawne (przeciwny kierunek)

**W praktyce (progi z Semantic-OS):**

| Similarity | Znaczenie | Akcja |
|-----------|-----------|-------|
| > 0.90 | Prawie identyczne | Ryzyko kanibalizacji |
| 0.75–0.90 | Bardzo podobne | Idealny internal link |
| 0.50–0.75 | Powiązane | Możliwy link |
| < 0.50 | Luźne powiązanie | Niezależne tematy |

---

## Dlaczego 768 wymiarów?

Każdy wymiar to jeden "aspekt" znaczenia. Kilka przykładów (koncepcyjnie):
- Wymiar 1: związek z wodą (pływalnia = 0.9, kredyt = 0.01)
- Wymiar 2: wymiar finansowy (kredyt = 0.95, pływalnia = 0.05)
- Wymiar 3: lokalność (sklep osiedlowy = 0.8, internet = 0.1)
- ... i 765 więcej

Model nauczył się tych wymiarów automatycznie, trenując na miliardach tekstów.

---

## t-SNE — "fotograficzny rzut" na płaszczyznę

Skoro nie możemy narysować 768 wymiarów, używamy **t-SNE** (t-Distributed Stochastic Neighbor Embedding) — algorytmu który "rzutuje" wysokowymiarową przestrzeń na 2D, zachowując lokalne relacje.

**Jak czytać wykres t-SNE z klasteryzacji Semantic-OS:**

```
Wykres t-SNE — "agencja marketingowa"

         ●●● Google Ads
         ●● PPC
    ●●●●●
    ●● Meta Ads   ←── Klaster "Reklamy płatne"
    ●●●


                    ●●● SEO lokalne
                    ●● pozycjonowanie  ←── Klaster "SEO"
                    ●●●●


    ●●● GA4
    ●● BigQuery    ←── Klaster "Analityka"
    ●●●
```

**Chmury = klastry tematyczne.** Frazy wewnątrz chmury = "ta sama sekcja topical map".
**Outliers (punkty poza chmurami)** = frazy niszowe lub wieloznaczne.

---

## Demo: wykres t-SNE z Semantic-OS

Po uruchomieniu klasteryzacji ze flagą `--visualize`:

```bash
python3 .claude/skills/keyword-clusterer/cluster.py \
  data/keywords/agencja_marketingowa_expanded.csv \
  data/clusters/agencja_output.csv \
  --visualize
```

Wygeneruje plik `cluster_visualization.png` — otwórz go i sprawdź:
1. Ile chmur jest wyraźnie odseparowanych?
2. Czy nazwy fraz w chmurze mają sens razem?
3. Gdzie są outliers — może to niszowe frazy warte uwagi?

Plik exercise `agencja_marketingowa_expanded.csv` jest gotowy w `kurs-online/materialy/exercise-files/`.

---

## Dlaczego to ważne dla AI Search

AI Search (Google, Perplexity) szuka podobnych fragmentów przez embedding, nie przez dopasowanie słów kluczowych.

**Stare podejście (keyword matching):**
- Artykuł musi zawierać dokładne słowo "pływalnia"
- Synonim "basen" → inny ranking

**Nowe podejście (semantic search):**
- Artykuł o "pływalni" jest automatycznie znajdowany dla "basenu"
- AI rozumie że to ten sam temat

**Konsekwencja dla tworzenia treści:**
- Nie musisz "upychać" wszystkich wariantów frazy — model rozumie synonimy
- Musisz pokryć **wszystkie aspekty tematu** (wymiary embeddingu) — brakujące aspekty = brakujące frazy w indeksie

---

## Ćwiczenie

Otwórz plik `kurs-online/materialy/exercise-files/embeddings_cache_sample.json`.

Znajdź sekcję `_similarity_examples` i odpowiedz:

1. Które dwa artykuły są sobie najbliżej semantycznie? Dlaczego to ma sens?
2. Artykuł o Google Ads ma similarity 0.72 z artykułem o Facebook Ads — czy to dobry internal link?
3. Jakie similarity byłoby dla artykułu "jak wybrać agencję" vs artykuł "jak wybrać agencję (duplikat)" — jak to nazwiemy w SEO?

---

**Następna lekcja:** L12 — Query Fanout — jak AI rozbija jedno pytanie na 7 sub-queries
