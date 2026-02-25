#!/usr/bin/env python3
"""
upload_to_supabase.py — Moduł 3, Lekcja 31
Wgrywa treści artykułów do Supabase jako embeddingi.

Flow: URL → jina_reader → markdown → embedding (Gemini) → INSERT do Supabase

Użycie:
    # Pojedynczy URL
    python3 upload_to_supabase.py --url "https://example.com/artykul"

    # Plik z listą URL (jeden per linia)
    python3 upload_to_supabase.py --batch urls.txt

    # Testuj połączenie bez uploadu
    python3 upload_to_supabase.py --test

Wymagania:
    pip install requests python-dotenv google-generativeai supabase

Konfiguracja .env:
    GEMINI_API_KEY=...
    SUPABASE_URL=https://xxxxx.supabase.co
    SUPABASE_ANON_KEY=eyJ...
"""

import os
import sys
import json
import time
import argparse
import requests
from pathlib import Path
from dotenv import load_dotenv

load_dotenv()

# ── Konfiguracja ───────────────────────────────────────────────────────────────

GEMINI_API_KEY   = os.getenv("GEMINI_API_KEY")
SUPABASE_URL     = os.getenv("SUPABASE_URL")
SUPABASE_ANON_KEY = os.getenv("SUPABASE_ANON_KEY")

JINA_BASE        = "https://r.jina.ai/"
GEMINI_EMBED_URL = "https://generativelanguage.googleapis.com/v1beta/models/gemini-embedding-001:embedContent"
TABLE_NAME       = "blog_vectors_double"

# ── Krok 1: Pobierz treść jako Markdown (Jina Reader) ─────────────────────────

def fetch_markdown(url: str, clean: bool = True) -> str:
    """Pobiera treść strony jako Markdown przez Jina Reader."""
    jina_url = JINA_BASE + url
    headers = {"Accept": "text/plain"}

    jina_key = os.getenv("JINA_API_KEY")
    if jina_key:
        headers["Authorization"] = f"Bearer {jina_key}"

    if clean:
        headers["X-Remove-Selector"] = "nav, header, footer, .sidebar, .ads"

    print(f"  [1/3] Pobieram: {url}")
    resp = requests.get(jina_url, headers=headers, timeout=30)
    resp.raise_for_status()

    content = resp.text
    # Ogranicz do ~8000 znaków — embedding ma limit tokenów
    if len(content) > 8000:
        content = content[:8000]
        print(f"       Skrócono do 8000 znaków")

    print(f"       Pobrano {len(content)} znaków")
    return content


# ── Krok 2: Wygeneruj embedding (Gemini) ──────────────────────────────────────

def generate_embedding(text: str) -> list[float]:
    """Generuje embedding 3072-wymiarowy przez Gemini gemini-embedding-001."""
    if not GEMINI_API_KEY:
        raise ValueError("Brak GEMINI_API_KEY w .env")

    print(f"  [2/3] Generuję embedding (Gemini gemini-embedding-001)...")

    payload = {
        "model": "models/gemini-embedding-001",
        "content": {"parts": [{"text": text}]},
        "taskType": "RETRIEVAL_DOCUMENT",   # najlepsze dla bazy wiedzy
    }

    resp = requests.post(
        f"{GEMINI_EMBED_URL}?key={GEMINI_API_KEY}",
        json=payload,
        timeout=30,
    )
    resp.raise_for_status()

    embedding = resp.json()["embedding"]["values"]
    print(f"       Wymiary: {len(embedding)}")
    return embedding


# ── Krok 3: INSERT do Supabase ────────────────────────────────────────────────

def insert_to_supabase(url: str, embedding: list[float]) -> dict:
    """Wstawia rekord (url, vector) do tabeli blog_vectors_double."""
    if not SUPABASE_URL or not SUPABASE_ANON_KEY:
        raise ValueError("Brak SUPABASE_URL lub SUPABASE_ANON_KEY w .env")

    print(f"  [3/3] Wgrywam do Supabase...")

    endpoint = f"{SUPABASE_URL}/rest/v1/{TABLE_NAME}"
    headers = {
        "apikey": SUPABASE_ANON_KEY,
        "Authorization": f"Bearer {SUPABASE_ANON_KEY}",
        "Content-Type": "application/json",
        "Prefer": "return=representation",
    }

    # pgvector oczekuje formatu: [0.1, 0.2, ...]
    vector_str = "[" + ",".join(str(v) for v in embedding) + "]"

    payload = {"url": url, "vector": vector_str}

    resp = requests.post(endpoint, json=payload, headers=headers, timeout=30)
    resp.raise_for_status()

    result = resp.json()
    print(f"       Wgrano! ID: {result[0].get('id', '?')}")
    return result[0]


# ── Sprawdź czy URL już istnieje ──────────────────────────────────────────────

def url_exists(url: str) -> bool:
    """Sprawdza czy URL już jest w bazie (unikamy duplikatów)."""
    endpoint = f"{SUPABASE_URL}/rest/v1/{TABLE_NAME}?url=eq.{requests.utils.quote(url)}&select=id"
    headers = {
        "apikey": SUPABASE_ANON_KEY,
        "Authorization": f"Bearer {SUPABASE_ANON_KEY}",
    }
    resp = requests.get(endpoint, headers=headers, timeout=15)
    resp.raise_for_status()
    return len(resp.json()) > 0


# ── Pipeline dla jednego URL ──────────────────────────────────────────────────

def process_url(url: str, skip_existing: bool = True) -> bool:
    """Pełny flow: URL → markdown → embedding → Supabase INSERT."""
    print(f"\nPrzetwarzam: {url}")
    print("-" * 50)

    if skip_existing and url_exists(url):
        print("  Pominięto — URL już w bazie")
        return False

    markdown = fetch_markdown(url)
    embedding = generate_embedding(markdown)
    insert_to_supabase(url, embedding)

    # Opóźnienie między requestami (rate limits)
    time.sleep(0.5)
    return True


# ── Test połączeń ─────────────────────────────────────────────────────────────

def test_connections():
    """Sprawdza czy wszystkie API keys działają."""
    print("Test połączeń API...\n")
    errors = []

    # Test Gemini
    try:
        emb = generate_embedding("test")
        print(f"[OK] Gemini embedding — {len(emb)} wymiarów")
    except Exception as e:
        print(f"[BŁĄD] Gemini: {e}")
        errors.append("GEMINI_API_KEY")

    # Test Jina (bez klucza, limit 20 RPM)
    try:
        text = fetch_markdown("https://example.com")
        print(f"[OK] Jina Reader — {len(text)} znaków")
    except Exception as e:
        print(f"[BŁĄD] Jina Reader: {e}")
        errors.append("Jina Reader")

    # Test Supabase
    try:
        endpoint = f"{SUPABASE_URL}/rest/v1/{TABLE_NAME}?select=id&limit=1"
        headers = {
            "apikey": SUPABASE_ANON_KEY,
            "Authorization": f"Bearer {SUPABASE_ANON_KEY}",
        }
        resp = requests.get(endpoint, headers=headers, timeout=15)
        resp.raise_for_status()
        print(f"[OK] Supabase — tabela {TABLE_NAME} dostępna ({len(resp.json())} rekordów)")
    except Exception as e:
        print(f"[BŁĄD] Supabase: {e}")
        errors.append("SUPABASE_URL/SUPABASE_ANON_KEY")

    if errors:
        print(f"\nBrakujące zmienne: {', '.join(errors)}")
        print("Sprawdź plik .env w katalogu projektu.")
        sys.exit(1)
    else:
        print("\nWszystkie połączenia działają!")


# ── Zapis/odczyt cache embeddingów ───────────────────────────────────────────

CACHE_DIR = Path("data/embeddings")

def load_cache() -> dict:
    cache_file = CACHE_DIR / "upload_cache.json"
    if cache_file.exists():
        return json.loads(cache_file.read_text())
    return {}

def save_cache(cache: dict):
    CACHE_DIR.mkdir(parents=True, exist_ok=True)
    cache_file = CACHE_DIR / "upload_cache.json"
    cache_file.write_text(json.dumps(cache, indent=2, ensure_ascii=False))


# ── Main ───────────────────────────────────────────────────────────────────────

def main():
    parser = argparse.ArgumentParser(
        description="Upload artykułów do Supabase (URL → embedding → INSERT)",
        formatter_class=argparse.RawDescriptionHelpFormatter,
        epilog="""
Przykłady:
  python3 upload_to_supabase.py --test
  python3 upload_to_supabase.py --url "https://double-digital.pl/blog/google-ads"
  python3 upload_to_supabase.py --batch urls.txt
  python3 upload_to_supabase.py --batch urls.txt --force   # wgraj nawet jeśli istnieje
        """
    )
    parser.add_argument("--url",   help="Pojedynczy URL do wgrania")
    parser.add_argument("--batch", help="Plik .txt z URL (jeden per linia)")
    parser.add_argument("--test",  action="store_true", help="Tylko test połączeń")
    parser.add_argument("--force", action="store_true", help="Wgraj nawet jeśli URL już jest w bazie")
    args = parser.parse_args()

    if args.test:
        test_connections()
        return

    if not args.url and not args.batch:
        parser.print_help()
        return

    uploaded = 0
    skipped  = 0
    errors   = 0

    urls = []
    if args.url:
        urls = [args.url]
    elif args.batch:
        batch_path = Path(args.batch)
        if not batch_path.exists():
            print(f"Błąd: plik {args.batch} nie istnieje")
            sys.exit(1)
        urls = [l.strip() for l in batch_path.read_text().splitlines() if l.strip() and not l.startswith("#")]

    print(f"Do wgrania: {len(urls)} URL\n")

    for url in urls:
        try:
            result = process_url(url, skip_existing=not args.force)
            if result:
                uploaded += 1
            else:
                skipped += 1
        except Exception as e:
            print(f"  [BŁĄD] {e}")
            errors += 1

    print(f"\n{'='*50}")
    print(f"Gotowe! Wgrano: {uploaded} | Pominięto: {skipped} | Błędy: {errors}")

    if errors > 0:
        print("\nWskazówki debugowania:")
        print("  - Sprawdź czy URL jest dostępny publicznie (brak paywall/JS)")
        print("  - Uruchom --test żeby sprawdzić połączenia")
        print("  - Strony z dużym JS: użyj Firecrawl lub Crawl4AI zamiast Jina")


if __name__ == "__main__":
    main()
