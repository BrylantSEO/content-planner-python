# L20 — Dlaczego zamieniamy wszystko na Markdown

**Moduł:** 2 — Narzędzia do pobierania danych
**Czas:** ~20 min
**Format:** Porównanie HTML vs Markdown + demo

---

## Cel lekcji

Rozumiesz dlaczego wszystkie narzędzia w Semantic-OS konwertują treść do Markdown i jak to poprawia jakość danych wejściowych do pipeline'ów.

---

## HTML jako szum, Markdown jako sygnał

Typowa strona internetowa wygenerowana przez CMS zawiera:

```
<html>
  <head>...</head>
  <body>
    <nav>Strona główna | Blog | Kontakt | O nas | ...</nav>
    <div class="cookie-banner">Akceptujesz cookies?</div>
    <header>Logo | Menu | Szukaj | Koszyk</header>
    <aside>
      Polecane artykuły | Widget Newsletter | Reklama | ...
    </aside>
    <article>
      <h1>Właściwy tytuł artykułu</h1>
      <p>Właściwa treść artykułu</p>
    </article>
    <footer>Copyright | Links | Social | ...</footer>
    <script>Google Tag Manager...</script>
    <script>Chat widget...</script>
  </body>
</html>
```

**Problem:** Treść artykułu to może 20–30% całego HTML. Reszta to nawigacja, skrypty, reklamy, stopka.

**Po konwersji do Markdown:**
```markdown
# Właściwy tytuł artykułu

Właściwa treść artykułu...
```

Tylko sygnał, zero szumu.

---

## Dlaczego RAG działa lepiej na Markdown

**Chunkowanie HTML:**
- Chunki zawierają tekst nawigacji ("Strona główna", "O nas")
- Embeddingly "zanieczyszczone" boilerplate
- AI może cytować fragment menu zamiast treści

**Chunkowanie Markdown:**
- Chunki tworzone na podstawie nagłówków (`#`, `##`, `###`)
- Hierarchia jest jasna i jednoznaczna
- Każdy chunk = sekcja artykułu, nie fragment layoutu

**Tabele i listy:**
- HTML: `<table><tr><td>...` — wymaga parsowania
- Markdown: `| Kolumna | Wartość |` — czytelne, chunk-friendly

---

## Porównanie: ten sam artykuł

**Fragment HTML (236 znaków — to tylko fragment):**
```html
<div class="article-body"><p class="intro">Marketing internetowy
jest <strong>bardzo ważny</strong> dla firm. <a href="/kontakt"
class="cta-inline">Skontaktuj się z nami</a> żeby dowiedzieć się
więcej.</p></div>
```

**Po konwersji do Markdown (65 znaków):**
```markdown
Marketing internetowy jest **bardzo ważny** dla firm. [Skontaktuj się](kontakt)
```

A z flagą `--clean` (usuwa CTAs i linki wewnętrzne):
```markdown
Marketing internetowy jest bardzo ważny dla firm.
```

**Dla pipeline'ów audytowych** chcemy czyste zdania bez CTAs — stąd flaga `--clean`.

---

## Kiedy --clean, kiedy bez

| Sytuacja | Użycie |
|----------|--------|
| Audyt artykułu (co mówi treść) | `--clean` |
| Analiza competitor (co linkuje, jak CTA) | bez `--clean` |
| Generowanie embeddingów | `--clean` |
| Analiza struktury strony | bez `--clean` |

---

## Ćwiczenie

1. Otwórz dowolny artykuł z bloga w przeglądarce
2. Kliknij prawym → "Wyświetl źródło strony" (View Page Source)
3. Oszacuj: jaki % tekstu to treść artykułu, a jaki to boilerplate?
4. Uruchom Jina Reader na tym URL (lekcja L21) i porównaj

---

**Następna lekcja:** L21 — Jina Reader — pobieranie treści URL
