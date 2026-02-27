/**
 * Step 4: Content Quality Spot Check — BrightData scrape + LLM audit
 */
import { callLLM } from "./llm.js";
import { scrapePage } from "./scraper.js";

export async function contentAudit(senutoData, emit) {
  emit("step", { step: 4, name: "Content Audit", status: "running" });

  const topUrls = senutoData?.top_urls?.slice(0, 3) || [];

  if (topUrls.length === 0) {
    emit("log", "⚠️ Brak stron do audytu — pomijam");
    emit("step", { step: 4, name: "Content Audit", status: "done" });
    return { skipped: true, reason: "No content to audit" };
  }

  emit("log", `Scraping top ${topUrls.length} URLs przez BrightData...`);

  const scrapeResults = await Promise.allSettled(
    topUrls.map(async (u) => {
      try {
        const text = await scrapePage(u.url);
        return text.length > 100 ? { url: u.url, content: text.substring(0, 5000), keywords: u.keywords } : null;
      } catch {
        return null;
      }
    })
  );

  const pages = scrapeResults.filter((r) => r.status === "fulfilled" && r.value).map((r) => r.value);

  if (pages.length === 0) {
    emit("log", "⚠️ Nie udało się pobrać żadnej strony");
    emit("step", { step: 4, name: "Content Audit", status: "done" });
    return { skipped: true, reason: "Could not scrape pages" };
  }

  emit("log", `Audyt jakości ${pages.length} stron...`);

  const llmPrompt = `Evaluate each page on 4 dimensions (1-5):
1. BLUF — Does article answer main question in first 2 sentences?
2. Information Density — Ratio of facts to filler
3. E-E-A-T signals — Author, date, case studies, certifications
4. Semantic structure — H1/H2/H3, FAQ, tables, lists

Pages:
${pages.map((p) => `--- ${p.url} (${p.keywords} keywords) ---\n${p.content}`).join("\n\n")}

Return JSON:
{
  "audits": [{"url": "...", "bluf": 3, "density": 2, "eeat": 1, "structure": 3, "avg": 2.25, "main_issue": "..."}],
  "patterns": ["Pattern 1", "Pattern 2"],
  "content_maturity": "none|basic|developing|advanced",
  "maturity_reason": "2-3 sentences"
}`;

  const raw = await callLLM(llmPrompt, { json: true });
  const audit = JSON.parse(raw);

  emit("log", `Content maturity: ${audit.content_maturity}`);
  emit("step", { step: 4, name: "Content Audit", status: "done" });
  return audit;
}
