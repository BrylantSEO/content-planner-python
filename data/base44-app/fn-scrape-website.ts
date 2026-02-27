/**
 * fn/scrape-website — Base44 Backend Function
 * Scrapes client website via Jina Reader API, extracts business intelligence.
 *
 * Input: { offerId: string }
 * Updates: Offer.site_intelligence, Offer.status → "senuto"
 */

import base44 from './base44-sdk'; // Base44 SDK auto-injected

const JINA_PREFIX = "https://r.jina.ai/";

interface ScrapeResult {
  url: string;
  content: string;
  error?: string;
}

Deno.serve(async (req: Request) => {
  try {
    const { offerId } = await req.json();

    // Read Offer entity
    const offer = await base44.asServiceRole.entities.Offer.get(offerId);
    if (!offer) {
      return jsonResponse({ error: "Offer not found" }, 404);
    }

    const domain = offer.domain.replace(/^https?:\/\//, "").replace(/^www\./, "").replace(/\/$/, "");

    // Update status
    await base44.asServiceRole.entities.Offer.update(offerId, { status: "scraping" });

    // Scrape up to 5 pages
    const pagesToScrape = [
      `https://${domain}/`,
      `https://${domain}/o-nas`,
      `https://${domain}/uslugi`,
      `https://${domain}/oferta`,
      `https://${domain}/blog`,
    ];

    const results: ScrapeResult[] = [];

    // Scrape in parallel (max 3 concurrent)
    const promises = pagesToScrape.map(async (url) => {
      try {
        const res = await fetch(`${JINA_PREFIX}${url}`, {
          headers: { "Accept": "text/markdown" },
        });
        if (res.ok) {
          const content = await res.text();
          if (content.length > 100) { // Skip near-empty pages
            return { url, content: content.substring(0, 10000) }; // Trim to 10k
          }
        }
        return { url, content: "", error: `HTTP ${res.status}` };
      } catch (e) {
        return { url, content: "", error: String(e) };
      }
    });

    const scraped = await Promise.all(promises);
    const validPages = scraped.filter(s => s.content.length > 100);

    // Use built-in LLM to extract business intelligence
    const llmPrompt = `Analyze these scraped pages from ${domain} and extract:
1. CE (Central Entity) — who is this company
2. SC (Source Context) — niche, specialization, target market
3. CSI (Central Search Intent) — what need do they serve
4. Language and country
5. Business model — B2B / B2C / e-commerce / services / SaaS
6. Current content marketing — blog activity
7. Services/products offered

Pages:
${validPages.map(p => `--- ${p.url} ---\n${p.content.substring(0, 3000)}`).join("\n\n")}

Return JSON format:
{
  "ce": "...",
  "sc": "...",
  "csi": "...",
  "language": "pl|en",
  "country": "PL|US|other",
  "business_model": "B2B|B2C|ecommerce|services|SaaS",
  "services": ["..."],
  "blog_active": true|false,
  "blog_posts_estimate": 0,
  "technical_observations": ["..."]
}`;

    const llmResult = await base44.integrations.InvokeLLM({
      prompt: llmPrompt,
      response_format: "json",
    });

    // Update offer
    await base44.asServiceRole.entities.Offer.update(offerId, {
      site_intelligence: JSON.stringify({
        ...JSON.parse(llmResult),
        scraped_pages: validPages.map(p => p.url),
        scrape_mode: "jina",
      }),
      status: "senuto",
    });

    return jsonResponse({ success: true, pages_scraped: validPages.length });

  } catch (error) {
    return jsonResponse({ error: String(error) }, 500);
  }
});

function jsonResponse(data: any, status = 200) {
  return new Response(JSON.stringify(data), {
    status,
    headers: { "Content-Type": "application/json" },
  });
}
