# L24 — Supabase — vector database dla treści

**Moduł:** 2 — Narzędzia do pobierania danych
**Czas:** ~40 min
**Format:** Hands-on konfiguracja

---

## Cel lekcji

Masz skonfigurowany projekt Supabase z tabelą `blog_vectors` i rozszerzeniem pgvector. Rozumiesz czym różni się vector search od keyword search.

---

## Czym jest vector database

**Tradycyjna baza danych (keyword search):**
```sql
SELECT * FROM articles WHERE content LIKE '%agencja SEO%'
```
Szuka dosłownego tekstu "agencja SEO". Nie znajdzie "firma pozycjonująca".

**Vector database (semantic search):**
```sql
SELECT url, 1 - (vector <=> '[0.12, -0.34, ...]'::vector) AS similarity
FROM blog_vectors
ORDER BY similarity DESC
LIMIT 5
```
Szuka artykułów **semantycznie podobnych** — znajdzie zarówno "agencja SEO" jak i "firma pozycjonująca" i "specjaliści SEO".

**Kluczowa różnica:** vector DB rozumie znaczenie, nie literę.

---

## pgvector — PostgreSQL z obsługą wektorów

Supabase używa PostgreSQL + rozszerzenia `pgvector` które dodaje:
- Typ kolumny `vector(N)` — przechowuje wektor N-wymiarowy
- Operatory: `<=>` (cosine distance), `<->` (euclidean), `<#>` (inner product)
- Indeksy IVFFLAT i HNSW dla szybkiego approximate nearest neighbor search

---

## Krok 1 — Utwórz projekt Supabase

1. Wejdź na **app.supabase.com**
2. **New project** → wybierz:
   - Name: `semantic-os-projekt` (lub nazwa klienta)
   - Database password: zapamiętaj!
   - Region: `eu-central-1` (Frankfurt, dla PL)
3. Poczekaj ~2 minuty na inicjalizację

---

## Krok 2 — Włącz rozszerzenie pgvector

W Supabase Dashboard → **SQL Editor** → wklej i uruchom:

```sql
-- Włącz pgvector
CREATE EXTENSION IF NOT EXISTS vector;

-- Weryfikacja
SELECT * FROM pg_extension WHERE extname = 'vector';
```

Powinno zwrócić 1 wiersz z `extname = vector`.

---

## Krok 3 — Utwórz tabelę

```sql
-- Tabela dla embeddingów Gemini text-embedding-004 (768 wymiarów)
CREATE TABLE blog_vectors_moj_projekt (
    id BIGSERIAL PRIMARY KEY,
    url TEXT NOT NULL UNIQUE,
    vector vector(768),
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Indeks dla szybkiego cosine similarity search
CREATE INDEX ON blog_vectors_moj_projekt
USING ivfflat (vector vector_cosine_ops)
WITH (lists = 100);
```

**Uwaga na `UNIQUE` przy url** — zapobiega duplikatom przy ponownym upload.

---

## Krok 4 — Skonfiguruj .env

W Supabase Dashboard → **Settings** → **API**:

```
SUPABASE_URL=https://twój-projekt-ref.supabase.co
SUPABASE_ANON_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
```

Dodaj do `.env` w projekcie Semantic-OS.

---

## Krok 5 — Test połączenia

```bash
python3 kurs-online/materialy/scripts/upload_to_supabase.py --test
```

Powinno wyświetlić:
```
[OK] Gemini — 768 wymiarów
[OK] Jina Reader — XXXX znaków
[OK] Supabase — tabela blog_vectors dostępna (0 rekordów)
```

---

## Przykładowe query — szukaj podobnych artykułów

Po wgraniu embeddingów (lekcja L31), sprawdź podobne artykuły:

```sql
-- Podaj embedding nowego tematu jako '[0.12, -0.34, ...]'
-- W praktyce: wygeneruj embedding query i wklej tutaj

SELECT
    url,
    1 - (vector <=> '<EMBEDDING_JAKO_WEKTOR>'::vector) AS similarity
FROM blog_vectors_moj_projekt
ORDER BY similarity DESC
LIMIT 10;
```

**Interpretacja wyników:**
- similarity > 0.90 → prawie identyczny artykuł → ryzyko kanibalizacji
- similarity 0.75–0.90 → tematycznie powiązany → dobry internal link
- similarity < 0.75 → luźny związek → OK, pisz nowy

---

## Row Level Security (RLS)

Supabase ma włączone RLS (Row Level Security) domyślnie. Dla pipeline'ów akademickich/wewnętrznych możesz wyłączyć dla tabeli:

```sql
-- Wyłącz RLS dla uproszczenia (projekty wewnętrzne)
ALTER TABLE blog_vectors_moj_projekt DISABLE ROW LEVEL SECURITY;
```

Dla projektów produkcyjnych → zostaw RLS i skonfiguruj polityki dostępu.

---

## Ćwiczenie

1. Utwórz projekt Supabase (Free tier — wystarczy)
2. Włącz pgvector i utwórz tabelę `blog_vectors_<twoja_nazwa>`
3. Skopiuj URL i anon key do `.env`
4. Uruchom test połączenia
5. W Supabase Dashboard → Table Editor — sprawdź czy tabela jest widoczna

---

**Następna lekcja:** L30 — Generowanie embeddingów (Gemini API)
