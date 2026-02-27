/**
 * Step 0: Website Intelligence — BrightData scraping + LLM analysis
 */
import { callLLM } from "./llm.js";

async function scrapePage(url) {
  const apiKey = process.env.BRIGHTDATA_API_KEY;
  if (!apiKey) throw new Error("BRIGHTDATA_API_KEY not set in .env");

  const res = await fetch("https://api.brightdata.com/request", {
    method: "POST",
    headers: {
      "Authorization": `Bearer ${apiKey}`,
      "Content-Type": "application/json",
      "User-Agent": "seo-offer-generator/1.0",
    },
    body: JSON.stringify({
      url,
      zone: "mcp_unlocker",
      format: "raw",
      data_format: "markdown",
    }),
  });

  if (!res.ok) {
    const err = await res.text();
    throw new Error(`BrightData ${res.status}: ${err.substring(0, 200)}`);
  }

  return await res.text();
}

export async function scrapeWebsite(domain, context, emit) {
  emit("step", { step: 0, name: "Website Intelligence", status: "running" });

  const cleanDomain = domain.replace(/^https?:\/\//, "").replace(/^www\./, "").replace(/\/$/, "");
  const pagesToScrape = [
    `https://${cleanDomain}/`,
    `https://${cleanDomain}/o-nas`,
    `https://${cleanDomain}/uslugi`,
    `https://${cleanDomain}/oferta`,
    `https://${cleanDomain}/blog`,
  ];

  emit("log", "Scraping strony przez BrightData...");

  const results = await Promise.allSettled(
    pagesToScrape.map(async (url) => {
      try {
        const text = await scrapePage(url);
        if (text.length > 100) {
          emit("log", `✓ ${url} (${(text.length / 1024).toFixed(0)}KB)`);
          return { url, content: text.substring(0, 10000) };
        }
        return null;
      } catch (e) {
        // Silently skip 404s etc.
        return null;
      }
    })
  );

  const pages = results
    .filter((r) => r.status === "fulfilled" && r.value)
    .map((r) => r.value);

  if (pages.length === 0) {
    emit("log", "⚠️ Nie udało się pobrać żadnej strony — sprawdź klucz BrightData");
    emit("step", { step: 0, name: "Website Intelligence", status: "done" });
    return { error: "scrape_failed", domain: cleanDomain };
  }

  emit("log", `Zescrapowano ${pages.length} stron. Analizuję LLM...`);

  const llmPrompt = `Analyze these scraped pages from ${cleanDomain} and extract business intelligence.
${context ? `\nAdditional context from the user: ${context}\n` : ""}

Pages:
${pages.map((p) => `--- ${p.url} ---\n${p.content.substring(0, 3000)}`).join("\n\n")}

Return JSON:
{
  "ce": "Central Entity — who is this company (1-2 sentences)",
  "sc": "Source Context — niche, specialization, target market",
  "csi": "Central Search Intent — what need they serve",
  "language": "pl or en",
  "country": "PL or US or other",
  "business_model": "B2B / B2C / ecommerce / services / SaaS",
  "services": ["service1", "service2"],
  "blog_active": true or false,
  "blog_posts_estimate": 0,
  "technical_observations": ["observation1", "observation2"]
}`;

  const raw = await callLLM(llmPrompt, { json: true });
  const siteIntel = JSON.parse(raw);
  siteIntel.scraped_pages = pages.map((p) => p.url);
  siteIntel.domain = cleanDomain;

  emit("step", { step: 0, name: "Website Intelligence", status: "done" });
  return siteIntel;
}

// Export for use in content audit
export { scrapePage };
