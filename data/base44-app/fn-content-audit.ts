/**
 * fn/content-audit — Base44 Backend Function
 * Scrapes top 3 URLs and evaluates content quality via LLM.
 *
 * Input: { offerId: string }
 * Updates: Offer.content_audit_data, Offer.status → "generating"
 */

const JINA_PREFIX = "https://r.jina.ai/";

Deno.serve(async (req: Request) => {
  try {
    const { offerId } = await req.json();
    const base44 = (await import('./base44-sdk')).default;
    const offer = await base44.asServiceRole.entities.Offer.get(offerId);
    if (!offer) return jsonResponse({ error: "Offer not found" }, 404);

    const senutoData = JSON.parse(offer.senuto_data || "{}");
    const topUrls = senutoData.top_urls?.slice(0, 3) || [];

    // Skip if no URLs to audit
    if (topUrls.length === 0) {
      await base44.asServiceRole.entities.Offer.update(offerId, {
        content_audit_data: JSON.stringify({
          skipped: true,
          reason: "No content to audit — site has no ranking pages or no blog",
        }),
        status: "generating",
      });
      return jsonResponse({ success: true, skipped: true });
    }

    // Scrape top 3 URLs
    const scrapePromises = topUrls.map(async (u: any) => {
      try {
        const res = await fetch(`${JINA_PREFIX}${u.url}`, {
          headers: { "Accept": "text/markdown" },
        });
        if (res.ok) {
          const content = await res.text();
          return { url: u.url, content: content.substring(0, 5000), keywords: u.keywords };
        }
        return { url: u.url, content: "", error: `HTTP ${res.status}` };
      } catch (e) {
        return { url: u.url, content: "", error: String(e) };
      }
    });

    const scraped = await Promise.all(scrapePromises);
    const validPages = scraped.filter(s => s.content.length > 100);

    if (validPages.length === 0) {
      await base44.asServiceRole.entities.Offer.update(offerId, {
        content_audit_data: JSON.stringify({ skipped: true, reason: "Could not scrape any pages" }),
        status: "generating",
      });
      return jsonResponse({ success: true, skipped: true });
    }

    // LLM evaluation
    const llmPrompt = `You are a content quality auditor. Evaluate each page on 4 dimensions (scale 1-5):

1. **BLUF** — Does article answer the main question in first 2 sentences?
2. **Information Density** — Ratio of concrete facts/data to filler/generalizations
3. **E-E-A-T signals** — Author, date, company data, case studies, certifications
4. **Semantic structure** — Logical H1/H2/H3, FAQ, tables, lists

Pages to evaluate:
${validPages.map(p => `--- ${p.url} (${p.keywords} keywords) ---\n${p.content}`).join("\n\n")}

Return JSON:
{
  "audits": [
    {
      "url": "...",
      "bluf": 3,
      "density": 2,
      "eeat": 1,
      "structure": 3,
      "avg": 2.25,
      "main_issue": "One sentence describing the biggest problem"
    }
  ],
  "patterns": ["Pattern 1 — recurring issue across pages", "Pattern 2"],
  "content_maturity": "none|basic|developing|advanced",
  "maturity_reason": "2-3 sentences justification"
}`;

    const llmResult = await base44.integrations.InvokeLLM({
      prompt: llmPrompt,
      response_format: "json",
    });

    await base44.asServiceRole.entities.Offer.update(offerId, {
      content_audit_data: llmResult,
      status: "generating",
    });

    return jsonResponse({ success: true, pages_audited: validPages.length });

  } catch (error) {
    return jsonResponse({ error: String(error) }, 500);
  }
});

function jsonResponse(data: any, status = 200) {
  return new Response(JSON.stringify(data), { status, headers: { "Content-Type": "application/json" } });
}
