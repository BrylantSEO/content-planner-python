# L31 — Wgrywanie treści do Supabase

**Moduł:** 3 — Embeddingi w praktyce
**Czas:** ~35 min
**Format:** Hands-on z upload_to_supabase.py

---

## Cel lekcji

Wgrywasz 10 artykułów własnego bloga do Supabase jako embeddingi. Weryfikujesz dane w Dashboard.

---

## Flow: URL → Supabase

```
URL artykułu
    │
    ▼ jina_reader.py (L21)
Markdown (czysty tekst)
    │
    ▼ Gemini text-embedding-004 (L30)
Wektor 768-wymiarowy [0.12, -0.34, 0.56, ...]
    │
    ▼ Supabase REST API
INSERT INTO blog_vectors (url, vector)
```

Każdy krok jest oddzielną operacją. `upload_to_supabase.py` łączy je wszystkie.

---

## Skrypt upload_to_supabase.py

Gotowy skrypt w `kurs-online/materialy/scripts/upload_to_supabase.py`.

### Test połączeń (zanim zaczniesz)

```bash
python3 kurs-online/materialy/scripts/upload_to_supabase.py --test
```

Output:
```
[OK] Gemini — 768 wymiarów
[OK] Jina Reader — 1234 znaków
[OK] Supabase — tabela blog_vectors dostępna (0 rekordów)
Wszystkie połączenia działają!
```

### Wgraj pojedynczy artykuł

```bash
python3 kurs-online/materialy/scripts/upload_to_supabase.py \
  --url "https://twoj-blog.pl/artykul-1"
```

Output:
```
Przetwarzam: https://twoj-blog.pl/artykul-1
--------------------------------------------------
  [1/3] Pobieram: https://twoj-blog.pl/artykul-1
       Pobrano 3456 znaków
  [2/3] Generuję embedding (Gemini text-embedding-004)...
       Wymiary: 768
  [3/3] Wgrywam do Supabase...
       Wgrano! ID: 42
```

### Wgraj wiele artykułów z pliku

Utwórz `moje_artykuly.txt`:
```
# Artykuły bloga (# = komentarz, pomijane)
https://twoj-blog.pl/artykul-google-ads
https://twoj-blog.pl/artykul-meta-ads
https://twoj-blog.pl/artykul-seo
https://twoj-blog.pl/artykul-ga4
https://twoj-blog.pl/artykul-jak-wybrac-agencje
```

```bash
python3 kurs-online/materialy/scripts/upload_to_supabase.py --batch moje_artykuly.txt
```

Output na końcu:
```
==================================================
Gotowe! Wgrano: 5 | Pominięto: 0 | Błędy: 0
```

---

## Co zrobić gdy artykuł jest za długi

Gemini text-embedding-004 ma limit ~2048 tokenów (~1500 słów). Długie artykuły są automatycznie obcinane do 8000 znaków w skrypcie.

**Lepsza strategia dla długich artykułów:** chunk per H2.

```python
# Pseudo-kod dla chunkowania po H2
import re

def split_by_h2(markdown: str) -> list[str]:
    """Dzieli artykuł na sekcje po H2."""
    sections = re.split(r'\n## ', markdown)
    return [s.strip() for s in sections if len(s.strip()) > 100]

# Wgraj każdy chunk osobno z URL + anchor
chunks = split_by_h2(artykul_markdown)
for i, chunk in enumerate(chunks):
    url_with_anchor = f"{url}#sekcja-{i}"
    embedding = generate_embedding(chunk, "RETRIEVAL_DOCUMENT")
    insert_to_supabase(url_with_anchor, embedding)
```

Dla potrzeb kursu — uproszczone podejście (cały artykuł = jeden rekord) jest wystarczające.

---

## Weryfikacja w Supabase Dashboard

Po upload:

1. Wejdź na **app.supabase.com** → Twój projekt
2. **Table Editor** → tabela `blog_vectors`
3. Sprawdź czy są rekordy (kolumny: id, url, vector, created_at)
4. Kliknij w wartość kolumny `vector` — zobaczysz tablicę 768 liczb

**SQL verification:**
```sql
-- Ile rekordów?
SELECT COUNT(*) FROM blog_vectors_moj_projekt;

-- Lista URL
SELECT id, url, created_at FROM blog_vectors_moj_projekt ORDER BY created_at DESC;

-- Długość wektora (powinna być 768)
SELECT url, vector_dims(vector) AS dims FROM blog_vectors_moj_projekt LIMIT 3;
```

---

## Ćwiczenie

1. Przygotuj listę 5–10 URL z własnego bloga (lub użyj bloga Double Digital jako ćwiczenie)

2. Utwórz plik `urls_cwiczenie.txt` z URL

3. Uruchom upload:
   ```bash
   python3 kurs-online/materialy/scripts/upload_to_supabase.py --batch urls_cwiczenie.txt
   ```

4. Zweryfikuj w Supabase Dashboard — sprawdź liczbę rekordów

5. Uruchom SQL:
   ```sql
   SELECT id, url, vector_dims(vector) AS dims FROM blog_vectors LIMIT 10;
   ```

---

## Troubleshooting

| Błąd | Przyczyna | Rozwiązanie |
|------|-----------|------------|
| `422 Unprocessable Entity` | Nieprawidłowy format wektora | Sprawdź czy embedding ma 768 wymiarów |
| `403 Forbidden` (Jina) | IP block lub paywall | Wklej tekst ręcznie, użyj Firecrawl |
| `duplicate key value` | URL już w bazie | Użyj flagi `--force` lub pomiń |
| `GEMINI_API_KEY invalid` | Zły klucz | Sprawdź `.env`, klucz zaczyna się od `AIzaSy` |
| Supabase `401 Unauthorized` | Zły anon key | Sprawdź `.env`, klucz zaczyna się od `eyJ` |

---

**Następna lekcja:** L32 — Wykrywanie kanibalizacji treści
