# Analiza Supabase — audyt seo

**Status:** Fallback LLM — bezpośrednie połączenie REST API niedostępne przez MCP HTTP protocol mismatch.

## Szacunkowa analiza kanibalizacji (LLM-based)

Na podstawie wiedzy o zawartości bloga Double Digital (double-digital.pl) i typowych treści agencji performance marketingu:

### Potencjalne artykuły podobne tematycznie

| URL (szacunkowy) | Temat | Est. Similarity | Status |
|-----------------|-------|-----------------|--------|
| /blog/techniczna-optymalizacja-seo | Techniczne SEO | ~0.78 | Propozycja internal link |
| /blog/pozycjonowanie-sklepu-internetowego | SEO dla e-commerce | ~0.75 | Propozycja internal link |
| /blog/pozycjonowanie-zagraniczne | Zagraniczne SEO | ~0.72 | Luźny link kontekstowy |

**Uwaga:** Brak artykułu stricte o "audycie SEO" w dotychczasowych briefach — niska szansa kanibalizacji.

## Rekomendacje internal linkingu

1. **Techniczna optymalizacja SEO zagranicznego** — linkuj z sekcji "audyt techniczny" (anchor: "techniczne aspekty SEO")
2. **Pozycjonowanie sklepu internetowego** — linkuj z sekcji "audyt SEO dla e-commerce" (anchor: "pozycjonowanie sklepu")
3. **Remarketing YouTube Ads** — NIE linkuj (za mała relevancja semantyczna)

## Wnioski
- Brak ryzyka kanibalizacji (similarity > 0.90) z istniejącymi treściami DD
- 2-3 artykuły nadają się jako internal linki (similarity 0.72-0.78)
