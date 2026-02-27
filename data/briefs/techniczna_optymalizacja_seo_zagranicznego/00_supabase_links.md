# Analiza kanibalizacji i internal linkingu — Supabase

## Query: "techniczna optymalizacja SEO zagranicznego"
Metoda: ILIKE proxy (vector z artykułu SEO audit jako proxy)

## ⚠️ Ryzyko kanibalizacji (similarity > 0.90)

| URL | Similarity | Uwaga |
|-----|-----------|-------|
| /blog/audyt-techniczny-strony-i-eliminacja-bledow-ktore-szkodza-twojemu-seo/ | 1.000 (proxy) | **KANIBALIZACJA** — audyt techniczny SEO, ale focus krajowy. Nowy artykuł musi wyraźnie odróżnić się fokusem na zagraniczne SEO |
| /blog/ | 0.913 | Strona kategorii — ignoruj |
| /blog/podsumowanie-aktualizacji-seo-w-2025-styczen-czerwiec/ | 0.907 | News, nie kanibalizacja |
| /blog/szybkosc-ladowania-strony-a-parametry-core-web-vitals/ | 0.904 | **PARTIAL OVERLAP** — Core Web Vitals per rynek to subsekcja nowego artykułu. Linkuj zamiast duplikować |
| /blog/double-digital-partnerem-cookieyes-skutecznosc-i-zgodnosc-w-jednym/ | 0.902 | Luźny — cookie compliance, nie SEO zagraniczne |
| /blog/linkowanie-zewnetrzne-czy-ma-coraz-mniejszy-wplyw-na-pozycjonowanie/ | 0.900 | **INTERNAL LINK** — linkbuilding zagraniczny jako kontekst |

## Propozycje internal linkingu (similarity 0.75–0.90)

| URL | Similarity | Anchor text | Sekcja docelowa |
|-----|-----------|-------------|-----------------|
| /blog/szybkosc-ladowania-strony-a-parametry-core-web-vitals/ | 0.904 | "Core Web Vitals" | H2: Page speed i CWV per rynek |
| /blog/linkowanie-zewnetrzne-czy-ma-coraz-mniejszy-wplyw-na-pozycjonowanie/ | 0.900 | "linkbuilding zagraniczny" | H2/H3: Link building na rynkach zagranicznych |
| /blog/jak-wykorzystac-ai-w-pozycjonowaniu-stron-internetowych/ | 0.899 | "AI w SEO" | H3: Narzędzia AI do SEO wielojęzycznego |
| /blog/pagespeed-insights-co-to-jest-i-jak-uzywac/ | 0.899 | "PageSpeed Insights" | H2: Audyt techniczny per rynek |
| /blog/co-to-jest-przekierowanie-301/ | 0.899 | "przekierowania 301" | H2: Migracja domeny / zmiana struktury |
| /blog/konstrukcja-adresow-url-w-jaki-sposob-tworzyc-przyjazne-adresy-url/ | 0.898 | "struktura URL" | H2: Struktura domeny i URL |
| /blog/linki-dofollow-i-nofollow-wszystko-co-musisz-o-nich-wiedziec/ | 0.894 | "linki dofollow i nofollow" | H3: Link building zagraniczny |

## Strategia odróżnienia od istniejących treści

Artykuł `/blog/audyt-techniczny-strony-i-eliminacja-bledow-ktore-szkodza-twojemu-seo/` ma wysoki overlap, ale jest skupiony na krajowym SEO. Nowy artykuł MUSI:
1. **Fokus na międzynarodowy kontekst** — hreflang, ccTLD, geotargeting, wielojęzyczność
2. **Format: checklist krok po kroku** — nie ogólny poradnik
3. **Konkretne rynki** — Niemcy, UK, USA z przykładami
4. **Linkować do audytu technicznego** jako "bazowy audyt przed ekspansją zagraniczną"
