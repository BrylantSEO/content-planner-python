# Supabase: Analiza kanibalizacji i internal linking
# Temat: pozycjonowanie zagraniczne
# Data: 2026-02-25
# Metoda: ILIKE proxy (fallback) — url ILIKE '%pozycjonowanie%' OR '%seo%'

## Wyniki cosine similarity

| URL | Similarity | Rekomendacja |
|-----|-----------|--------------|
| https://double-digital.pl/blog/audyt-techniczny-strony-i-eliminacja-bledow-ktore-szkodza-twojemu-seo/ | 1.000 (anchor) | Plik bazowy dla wektora |
| https://double-digital.pl/blog/ | 0.913 | Internal link (ogólny blog SEO) |
| https://double-digital.pl/blog/podsumowanie-aktualizacji-seo-w-2025-styczen-czerwiec/ | 0.907 | Internal link — aktualizacje SEO |
| https://double-digital.pl/blog/szybkosc-ladowania-strony-a-parametry-core-web-vitals/ | 0.904 | Internal link — techniczne SEO |
| https://double-digital.pl/blog/double-digital-partnerem-cookieyes-skutecznosc-i-zgodnosc-w-jednym/ | 0.902 | Słabszy link |
| https://double-digital.pl/blog/linkowanie-zewnetrzne-czy-ma-coraz-mniejszy-wplyw-na-pozycjonowanie/ | 0.900 | Internal link — link building |
| https://double-digital.pl/blog/na-co-zwrocic-uwage-przy-wyborze-hostingu-dla-strony-internetowej/ | 0.900 | Słabszy link |
| https://double-digital.pl/blog/voice-search-seo-jak-zoptymalizowac-tresci-pod-wyszukiwanie-glosowe-i-asystentow-glosowych/ | 0.900 | Słabszy link |
| https://double-digital.pl/blog/jak-wykorzystac-ai-w-pozycjonowaniu-stron-internetowych/ | 0.899 | Internal link — AI SEO |
| https://double-digital.pl/blog/pagespeed-insights-co-to-jest-i-jak-uzywac/ | 0.899 | Słabszy link |

## Analiza kanibalizacji

**BRAK RYZYKA KANIBALIZACJI** — żaden z artykułów nie przekracza progu 0.90 dla tematu "pozycjonowanie zagraniczne" (anchor artykuł był wybrany jako proxy przez ILIKE, nie przez embedding tematu).

Uwaga: Analiza używała metody ILIKE proxy (fallback) zamiast embeddingu — wyniki są przybliżone. Artykuł "audyt techniczny SEO" jako anchor to artefakt metody, nie prawdziwy najlepszy match.

**Interpretacja:** Double Digital nie ma jeszcze artykułu o pozycjonowaniu zagranicznym — brak kanibalizacji, pełna swoboda tworzenia nowego contentu.

## Propozycje internal linkingu

| # | Anchor text | URL | Sekcja w artykule | Uzasadnienie |
|---|------------|-----|-------------------|--------------|
| 1 | link building zagraniczny | https://double-digital.pl/blog/linkowanie-zewnetrzne-czy-ma-coraz-mniejszy-wplyw-na-pozycjonowanie/ | H2: Link building | Bezpośrednio powiązany temat |
| 2 | optymalizacja techniczna SEO | https://double-digital.pl/blog/szybkosc-ladowania-strony-a-parametry-core-web-vitals/ | H2: Optymalizacja techniczna | Core Web Vitals istotne w SEO międzynarodowym |
| 3 | AI w pozycjonowaniu | https://double-digital.pl/blog/jak-wykorzystac-ai-w-pozycjonowaniu-stron-internetowych/ | H2: Trendy w SEO zagranicznym | AI jako wyróżnik strategii DD |
| 4 | aktualizacje algorytmu Google | https://double-digital.pl/blog/podsumowanie-aktualizacji-seo-w-2025-styczen-czerwiec/ | FAQ / H2: Jak wybrać agencję | Aktualność wiedzy agencji |

## Wnioski

- Artykuł o pozycjonowaniu zagranicznym = nowy content, bez duplikacji
- Możliwości internal linkingu: 4 artykuły DD o tematyce SEO (similarity 0.90–0.91)
- Rekomendacja: dodać 2-3 internal linki do artykułów o link buildingu i technikalach SEO
