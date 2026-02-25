# L10 — RAG — dlaczego AI nie "rankuje" stron, tylko cytuje fragmenty

**Moduł:** 1 — Jak działa AI Search
**Czas:** ~30 min
**Format:** Screencast + diagram

---

## Cel lekcji

Rozumiesz czym różni się tradycyjny ranking Google od AI Search i dlaczego musisz pisać inaczej, żeby być cytowanym.

---

## To samo pytanie, inne odpowiedzi

Wpisz to samo pytanie w trzech miejscach:

**"Jak wybrać agencję marketingową?"**

| Narzędzie | Co zwraca |
|-----------|-----------|
| Google (organiczny) | 10 linków — kliknij i czytaj |
| Google AI Overview | Odpowiedź na górze + 3–5 cytowań |
| Perplexity | Odpowiedź syntezowana z 6–8 źródeł |
| ChatGPT | Odpowiedź z wiedzy modelu (bez cytowań) |

**Kluczowa różnica:** AI Overview i Perplexity **cytują konkretne fragmenty**, nie odsyłają do strony.

---

## Jak działa RAG — bibliotekarz z indeksem

RAG = Retrieval-Augmented Generation (generowanie wspomagane wyszukiwaniem).

**Analogia:** Wyobraź sobie bibliotekarza który:
1. Dostaje pytanie od użytkownika
2. Przeszukuje ogromny indeks kart katalogowych (embedding search)
3. Wyciąga 5–10 najbardziej pasujących fragmentów
4. Syntetyzuje odpowiedź z tych fragmentów
5. Cytuje skąd wziął fragmenty

```
Pytanie użytkownika
      │
      ▼
  Embedding pytania (zamiana pytania na wektor)
      │
      ▼
  Wyszukiwanie w indeksie (cosine similarity)
      │
      ▼
  Top N fragmentów (chunks) z różnych stron
      │
      ▼
  LLM syntezuje odpowiedź
      │
      ▼
  Odpowiedź + cytowania (źródła)
```

**Twój artykuł = jedna z "książek" w bibliotece.** Jeśli jest napisany chaotycznie, bibliotekarz nie znajdzie właściwej "strony" (chunku).

---

## Co jest "chunkowane"

Chunk = fragment tekstu, który AI traktuje jako jedną jednostkę wiedzy.

Google i systemy RAG dzielą treść na chunki według:
- Nagłówków H2/H3 (najczęściej)
- Akapitów (w uproszczonych systemach)
- Zdań (w precyzyjnych systemach)

**Przykład chunkowania artykułu:**

```
Artykuł: "Jak wybrać agencję marketingową"
│
├── Chunk 1: H1 + pierwsze 2 zdania
├── Chunk 2: H2 "Na co zwrócić uwagę" + treść sekcji
├── Chunk 3: H2 "Ile kosztuje agencja" + treść sekcji
├── Chunk 4: H2 "Pytania do zadania agencji" + lista
└── Chunk 5: H2 "Podsumowanie" + CTA
```

AI szuka **w obrębie pojedynczego chunku**. Jeśli odpowiedź na pytanie "ile kosztuje agencja" jest rozrzucona po 3 sekcjach — AI nie znajdzie dobrego cytowania.

---

## Dlaczego tradycyjne SEO nie wystarczy

**Tradycyjny Google:**
- Użytkownik klika link
- Czyta całą stronę
- Nawigacja, branding, struktura = ważne

**AI Search:**
- AI wyciąga fragment
- Nie "odwiedza" strony
- Liczy się czy **fragment jest samowystarczalny** (autonomiczny chunk)

**Konsekwencja:** Artykuł zoptymalizowany pod klasyczny Google może mieć CQS 30/100 (słaby dla AI). Artykuł zoptymalizowany pod AI może być cytowany przez AI Overview nawet jeśli jest na pozycji 8.

---

## Screencast: AI Overview w Google

**Do zrobienia podczas screencasta:**
1. Wyszukaj frazę z branży klienta w Google
2. Zidentyfikuj AI Overview (niebieska sekcja na górze)
3. Rozwiń cytowania (kliknij "More" lub "Pokaż źródła")
4. Otwórz 2–3 cytowane strony — sprawdź CO konkretnie jest cytowane
5. Porównaj z nieco niżej ranklującymi stronami, które NIE są cytowane

**Wzorzec który zobaczysz:**
- Cytowane strony mają odpowiedź w pierwszych 2–3 zdaniach sekcji
- Mają konkretne liczby zamiast ogólników
- Ich struktura H2 = pytania, nie opisy

---

## Kluczowy wniosek

Twój artykuł musi być napisany tak, żeby **każda sekcja H2** mogła odpowiedzieć na pytanie użytkownika **samodzielnie**, bez kontekstu z innych sekcji.

To jest fundamentalna zmiana w stosunku do pisania "esejów" z wstępem, rozwinięciem i zakończeniem.

---

## Ćwiczenie

1. Wybierz frazę kluczową z twojej branży (np. "jak wybrać [coś]")
2. Wpisz ją w Google — sprawdź czy pojawia się AI Overview
3. Otwórz cytowane strony — znajdź fragment który AI wyciągnął
4. Zapytaj: czy ten fragment ma sens bez reszty artykułu?
5. Otwórz jeden ze swoich artykułów — czy każda sekcja H2 może "stać sama"?

---

**Następna lekcja:** L11 — Embeddingi — intuicja geometryczna
