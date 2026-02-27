# SEO Offer Generator — Base44 Setup Guide

## Krok 1: Stwórz aplikację

W Base44 AI Chat:
```
Create a new app called "SEO Offer Generator" for generating SEO analysis offers.
It should have a modern, professional dashboard design.
```

## Krok 2: Dodaj Secrets

Settings → Secrets:

| Secret | Wartość | Skąd |
|--------|---------|------|
| `SENUTO_API_KEY` | JWT token | Senuto API → konto DD |
| `NODESHUB_API_KEY` | API key | nodeshub.io dashboard |

## Krok 3: Zdefiniuj Entity `Offer`

W AI Chat:
```
Create an entity called "Offer" with these fields:
- domain (text, required) — client website URL
- slug (text, required) — URL-safe identifier like "example_com"
- status (select: pending, scraping, senuto, competitors, opportunities, content_audit, generating, done, error)
- site_intelligence (long text) — JSON with business data
- senuto_data (long text) — JSON with Senuto analysis
- competitors_data (long text) — JSON with competitor analysis
- opportunities_data (long text) — JSON with opportunities
- content_audit_data (long text) — JSON with content audit
- offer_md (long text) — generated markdown offer
- offer_html (long text) — generated HTML landing page
- error_log (long text) — error messages
- analysis_mode (select: full, senuto_only, limited, llm_only)
```

## Krok 4: Zdefiniuj Entity `OfferTemplate`

```
Create an entity called "OfferTemplate" with:
- name (text, required)
- html_template (long text) — HTML template code
- is_default (boolean, default true)
```

## Krok 5: Backend Functions

Utwórz 7 backend functions. Dla każdej:
1. Idź do Code tab → Backend Functions
2. Stwórz nową funkcję
3. Wklej kod z odpowiedniego pliku `fn-*.ts`

| Funkcja | Plik źródłowy | Trigger |
|---------|--------------|---------|
| `scrape-website` | `fn-scrape-website.ts` | Automation: Offer created (status=pending) |
| `senuto-analysis` | `fn-senuto-analysis.ts` | Automation: Offer.status → "senuto" |
| `competitor-analysis` | `fn-competitor-analysis.ts` | Automation: Offer.status → "competitors" |
| `opportunity-analysis` | `fn-opportunity-analysis.ts` | Automation: Offer.status → "opportunities" |
| `content-audit` | `fn-content-audit.ts` | Automation: Offer.status → "content_audit" |
| `generate-offer` | `fn-generate-offer.ts` | Automation: Offer.status → "generating" |
| `generate-html` | `fn-generate-html.ts` | Manual (button click) |

## Krok 6: Automations

Stwórz 6 automations (chain):

```
1. "Start Scraping" — When Offer is created → call fn/scrape-website with { offerId: record.id }
2. "Start Senuto" — When Offer.status changes to "senuto" → call fn/senuto-analysis with { offerId: record.id }
3. "Start Competitors" — When Offer.status changes to "competitors" → call fn/competitor-analysis with { offerId: record.id }
4. "Start Opportunities" — When Offer.status changes to "opportunities" → call fn/opportunity-analysis with { offerId: record.id }
5. "Start Content Audit" — When Offer.status changes to "content_audit" → call fn/content-audit with { offerId: record.id }
6. "Start Offer Generation" — When Offer.status changes to "generating" → call fn/generate-offer with { offerId: record.id }
```

## Krok 7: Pages

### Dashboard (/)
```
Create a dashboard page showing all Offers in a table/card list.
Show: domain, status (colored badge), created date, analysis_mode.
Add a "Nowa analiza" button that navigates to /new.
Status colors: pending=gray, scraping/senuto/competitors/opportunities/content_audit/generating=blue (animated), done=green, error=red.
```

### New Offer (/new)
```
Create a form page with:
- Input field "URL domeny klienta" (placeholder: "https://example.com")
- On submit: create Offer entity with domain=input, slug=auto-generate, status="pending"
- Auto-generate slug: remove https/www, replace dots and hyphens with underscore
- After submit: navigate to /offer/{id}
```

### Offer Detail (/offer/:id)
```
Create an offer detail page showing:
- Header: domain name + status badge + progress bar (7 steps)
- Tabs: Przegląd | Senuto | Konkurenci | Szanse | Audyt | Oferta | Landing Page
- "Przegląd" tab: summary cards with key metrics
- "Oferta" tab: render offer_md as formatted text
- "Landing Page" tab:
  - If offer_html exists: show preview iframe + "Kopiuj HTML" button + "Otwórz LP" link
  - If not: show "Generuj Landing Page" button that calls fn/generate-html
```

### Live LP (/lp/:slug) — PUBLIC PAGE
```
Create a public page (no login required) that:
1. Reads slug from URL parameter
2. Fetches Offer entity by slug
3. Renders offer_html as raw HTML (dangerouslySetInnerHTML or iframe)
This page should have NO navigation, NO Base44 branding — just the raw offer HTML.
```

## Krok 8: Test

1. Wejdź na Dashboard → "Nowa analiza"
2. Wpisz: `https://babeeplanet.pl`
3. Obserwuj status zmieniający się: pending → scraping → senuto → ... → done
4. Otwórz tab "Oferta" — powinien być pełny markdown
5. Kliknij "Generuj Landing Page"
6. Otwórz `/lp/babeeplanet_pl` — powinien być publiczny LP

## Uwagi

### Base44 SDK import
Backend functions w Base44 mają automatyczny dostęp do SDK. Linie `import base44 from './base44-sdk'` mogą wymagać dostosowania do aktualnej wersji Base44. Sprawdź docs: https://docs.base44.com/Developer-Platform/Backend-Service/

### 3-minutowy timeout
Jeśli `fn/senuto-analysis` nie mieści się w 3 min (6 równoległych API calls):
- Rozbij na 2 funkcje: `fn/senuto-stats` (calls 1-3) i `fn/senuto-urls` (calls 4-6)
- Dodaj pośredni status "senuto_part2"

### LLM quality
Built-in "Invoke LLM" w Base44 może nie dawać jakości Claude Sonnet. Alternatywa:
- Dodaj `ANTHROPIC_API_KEY` do Secrets
- W fn/generate-offer zamień `InvokeLLM` na bezpośredni `fetch()` do Claude API
```typescript
const res = await fetch("https://api.anthropic.com/v1/messages", {
  method: "POST",
  headers: {
    "x-api-key": Deno.env.get("ANTHROPIC_API_KEY"),
    "anthropic-version": "2023-06-01",
    "Content-Type": "application/json",
  },
  body: JSON.stringify({
    model: "claude-sonnet-4-20250514",
    max_tokens: 8000,
    messages: [{ role: "user", content: llmPrompt }],
  }),
});
```

### Koszty credits Base44
Estymacja per oferta:
- 7 backend function calls × 1 credit = 7
- ~4 LLM calls (Invoke LLM) × ~2-5 credits = 8-20
- Total: ~15-27 credits per oferta
