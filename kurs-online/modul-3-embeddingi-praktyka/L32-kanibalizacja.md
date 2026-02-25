# L32 — Wykrywanie kanibalizacji treści

**Moduł:** 3 — Embeddingi w praktyce
**Czas:** ~30 min
**Format:** SQL + demo w Claude Code

---

## Cel lekcji

Wykrywasz kanibalizację treści przez cosine similarity query i interpretujesz wyniki według progów.

---

## Czym jest kanibalizacja treści

**Kanibalizacja** = dwa lub więcej artykułów rankuje na to samo query → walczą ze sobą → Google wybiera jeden i ignoruje drugi.

**Dlaczego to problem:**
- Podzielony PageRank między dwie strony zamiast skupionego na jednej
- Google nie wie którą stronę traktować jako "główną" dla tematu
- Obie strony mogą wypaść z rankingu (Google preferuje jedną "najlepszą" per query)

**Tradycyjne wykrywanie** (ręczne):
```
site:twoja-strona.pl "słowo kluczowe"
```
Działa dla dokładnych fraz, ale nie dla semantycznych duplikatów.

**Nowe wykrywanie** (semantyczne przez embeddingi):
Porównaj embedding nowego tematu ze wszystkimi istniejącymi artykułami.
Similarity > 0.90 = semantyczny duplikat = ryzyko kanibalizacji.

---

## SQL — wyszukiwanie podobnych artykułów

**Scenariusz:** Planujesz napisać artykuł "Jak wybrać agencję Google Ads".
Chcesz sprawdzić czy nie masz już podobnego.

### Krok 1 — Wygeneruj embedding tematu

```python
from dotenv import load_dotenv
import os, requests
load_dotenv()

GEMINI_KEY = os.getenv("GEMINI_API_KEY")

def generate_embedding(text):
    resp = requests.post(
        f"https://generativelanguage.googleapis.com/v1beta/models/text-embedding-004:embedContent?key={GEMINI_KEY}",
        json={
            "model": "models/text-embedding-004",
            "content": {"parts": [{"text": text}]},
            "taskType": "RETRIEVAL_QUERY",  # wyszukiwanie = QUERY
        }
    )
    return resp.json()["embedding"]["values"]

topic = "Jak wybrać agencję Google Ads — 5 pytań przed podpisaniem umowy"
embedding = generate_embedding(topic)
vector_str = "[" + ",".join(str(v) for v in embedding) + "]"
print(f"Gotowy wektor dla SQL: {vector_str[:50]}...]")
```

### Krok 2 — SQL w Supabase

W SQL Editor:

```sql
SELECT
    url,
    1 - (vector <=> '[0.12, -0.34, 0.56, ...]'::vector) AS similarity
FROM blog_vectors_moj_projekt
ORDER BY similarity DESC
LIMIT 10;
```

(Zamień `[0.12, -0.34, 0.56, ...]` na pełny wektor z kroku 1)

---

## Interpretacja progów

| Similarity | Interpretacja | Akcja |
|-----------|--------------|-------|
| > 0.90 | **KANIBALIZACJA** — artykuły prawie identyczne | Połącz artykuły lub zmień kąt podejścia |
| 0.75–0.90 | **POWIĄZANY** — idealny internal link | Wpleć link w nowy artykuł + w stary |
| 0.50–0.75 | **LUŹNO POWIĄZANY** | Opcjonalny link |
| < 0.50 | **NIEZWIĄZANY** | Pisz swobodnie, brak ryzyka |

---

## Przykładowy wynik i interpretacja

```
URL                                                      similarity
---                                                      ----------
double-digital.pl/blog/google-ads-agencja-wybor          0.94   ← KANIBALIZACJA!
double-digital.pl/blog/jak-wybrac-agencje-marketingowa   0.87   ← dobry internal link
double-digital.pl/blog/google-ads-dla-ecommerce          0.78   ← dobry internal link
double-digital.pl/blog/meta-ads-agencja                  0.65   ← opcjonalny link
double-digital.pl/blog/ga4-implementacja                 0.41   ← niezwiązany
```

**Wnioski:**
- Artykuł "google-ads-agencja-wybor" z similarity 0.94 = prawie identyczny temat
- **Opcje:** (a) nie pisz nowego, zaktualizuj stary, (b) zmień kąt ("5 pytań prawnych przed umową")
- Dwa artykuły z similarity 0.78–0.87 = internal links w nowym artykule

---

## W Claude Code — automatyczny workflow

Kiedy używasz `/content-planner`, Claude automatycznie:
1. Generuje embedding dla tematu artykułu
2. Wykonuje SQL query (MCP Supabase)
3. Interpretuje wyniki i wstawia do briefu

Możesz też uruchomić ręcznie w Claude Code:

```
> Sprawdź czy temat "jak wybrać agencję Google Ads" nie kanibalizuje istniejących artykułów w bazie
```

Claude wywoła MCP Supabase i pokaże wyniki z rekomendacją.

---

## Łączenie artykułów (merge)

Gdy wykryjesz kanibalizację (similarity > 0.90), typowe rozwiązania:

1. **Merge** — połącz oba artykuły w jeden silniejszy
   - Zachowaj URL z większym ruchem
   - Przenieś treść z drugiego
   - Redirect 301 z usuniętego URL
   - Zaktualizuj internal links

2. **Różnicowanie** — zmień kąt podejścia
   - Stary: "Jak wybrać agencję Google Ads"
   - Nowy: "Jak wybrać agencję Google Ads dla e-commerce — specyfika branży"
   - Muszą odpowiadać na różne sub-queries

3. **Usunięcie** — usuń słabszy artykuł z redirect 301

---

## Ćwiczenie

1. Wgraj 5–10 artykułów do Supabase (L31)

2. Wybierz temat nowego artykułu

3. Wygeneruj embedding tematu (Python)

4. Uruchom SQL query w Supabase Dashboard

5. Zinterpretuj wyniki:
   - Ile artykułów w progu kanibalizacji (> 0.90)?
   - Ile w progu internal link (0.75–0.90)?
   - Jaka jest rekomendacja — pisać nowy czy zaktualizować stary?

---

**Następna lekcja:** L33 — Internal linking oparty na semantyce
