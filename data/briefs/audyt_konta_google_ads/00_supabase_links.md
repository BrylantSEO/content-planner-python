# Supabase — Analiza kanibalizacji i internal linking
# Temat: audyt konta google ads

## Metoda
ILIKE proxy (wektor 3072 za duży dla MCP direct query).
Query: `url ILIKE '%google-ads%' OR url ILIKE '%audyt%'`

## Wyniki similarity

| URL | Similarity | Klasyfikacja |
|-----|-----------|--------------|
| Brak wpisów z frazą google-ads lub audyt w blog_vectors_double | — | — |

## Uwaga
Na podstawie struktury bazy `blog_vectors_double` (dane Double Digital) nie zidentyfikowano istniejących wpisów blogowych o tematyce „audyt konta google ads". Oznacza to brak ryzyka kanibalizacji — artykuł wypełni lukę contentową w domenie.

## Propozycje internal linkingu (na podstawie wiedzy o usługach DD)

| Potencjalny URL | Anchor text | Sekcja artykułu |
|-----------------|-------------|-----------------|
| /google-ads/ (strona usługi) | „prowadzenie kampanii Google Ads" | Lead / H2 "Kiedy zlecić audyt" |
| /remarketing/ lub /google-ads/remarketing/ | „remarketing w Google Ads" | H2 "Kampanie remarketingowe" |
| /ga4/ lub /analityka/ | „konfiguracja GA4" | H2 "Śledzenie konwersji" |
| /performance-max/ | „kampanie Performance Max" | H2 "Typy kampanii" |
| /blog/google-ads/ (jeśli istnieje) | „optymalizacja Google Ads" | CTA/footer |

## Wniosek
Brak kanibalizacji. Artykuł o audycie konta Google Ads jest nową treścią dla domeny Double Digital i powinien linkować do stron usługowych Google Ads jako kontekst i CTA.
