#!/usr/bin/env python3
"""
query_embedding.py — Generuje embedding dla tematu briefu i wypisuje SQL do cosine similarity.

Używa Gemini gemini-embedding-001 z taskType RETRIEVAL_QUERY (asymmetric search:
query embedding dopasowywany do document embeddings w bazie).

Użycie:
  python3 query_embedding.py "remarketing youtube ads"
  python3 query_embedding.py --json "remarketing youtube ads"

Output (domyślnie): gotowy SQL do wykonania przez mcp__supabase__execute_sql
Output (--json):     sam wektor jako JSON array
"""

import os
import sys
import json

import requests
from dotenv import load_dotenv

load_dotenv()

GEMINI_API_KEY = os.getenv("GEMINI_API_KEY")
GEMINI_EMBED_URL = "https://generativelanguage.googleapis.com/v1beta/models/gemini-embedding-001:embedContent"


def generate_query_embedding(text: str) -> list[float]:
    """Generuje embedding dla query (RETRIEVAL_QUERY) przez Gemini gemini-embedding-001."""
    if not GEMINI_API_KEY:
        print("BŁĄD: Brak GEMINI_API_KEY w .env", file=sys.stderr)
        sys.exit(1)

    payload = {
        "model": "models/gemini-embedding-001",
        "content": {"parts": [{"text": text}]},
        "taskType": "RETRIEVAL_QUERY",
    }
    resp = requests.post(
        f"{GEMINI_EMBED_URL}?key={GEMINI_API_KEY}",
        json=payload,
        timeout=30,
    )
    resp.raise_for_status()

    values = resp.json()["embedding"]["values"]
    print(f"-- Embedding: {len(values)} wymiarów (model: gemini-embedding-001, taskType: RETRIEVAL_QUERY)", file=sys.stderr)
    return values


def format_sql(embedding: list[float], limit: int = 10) -> str:
    """Formatuje gotowy SQL query do cosine similarity search."""
    vector_str = "[" + ",".join(f"{v:.8f}" for v in embedding) + "]"
    return (
        f"SELECT url, 1 - (vector <=> '{vector_str}'::vector) AS similarity\n"
        f"FROM blog_vectors_double\n"
        f"ORDER BY similarity DESC\n"
        f"LIMIT {limit};"
    )


def main():
    args = sys.argv[1:]

    if not args or args == ["--help"] or args == ["-h"]:
        print("Użycie: python3 query_embedding.py [--json] [--limit N] \"TEMAT\"")
        print("  --json   Wypisz sam wektor jako JSON array")
        print("  --limit  Liczba wyników SQL (domyślnie 10)")
        sys.exit(0)

    output_json = False
    limit = 10
    text_parts = []

    i = 0
    while i < len(args):
        if args[i] == "--json":
            output_json = True
        elif args[i] == "--limit" and i + 1 < len(args):
            i += 1
            limit = int(args[i])
        else:
            text_parts.append(args[i])
        i += 1

    query_text = " ".join(text_parts)
    if not query_text:
        print("BŁĄD: Podaj temat jako argument", file=sys.stderr)
        sys.exit(1)

    print(f"-- Query: \"{query_text}\"", file=sys.stderr)
    embedding = generate_query_embedding(query_text)

    if output_json:
        print(json.dumps(embedding))
    else:
        print(format_sql(embedding, limit))


if __name__ == "__main__":
    main()
