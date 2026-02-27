/**
 * fn/generate-html — Base44 Backend Function
 * Converts offer markdown + analysis data into a branded HTML landing page.
 * Uses LLM to generate the HTML based on the babeeplanet template style.
 *
 * Input: { offerId: string }
 * Updates: Offer.offer_html
 */

Deno.serve(async (req: Request) => {
  try {
    const { offerId } = await req.json();
    const base44 = (await import('./base44-sdk')).default;
    const offer = await base44.asServiceRole.entities.Offer.get(offerId);
    if (!offer) return jsonResponse({ error: "Offer not found" }, 404);

    const siteIntel = JSON.parse(offer.site_intelligence || "{}");
    const senutoData = JSON.parse(offer.senuto_data || "{}");
    const opportunities = JSON.parse(offer.opportunities_data || "{}");
    const domain = offer.domain.replace(/^https?:\/\//, "").replace(/^www\./, "").replace(/\/$/, "");

    // Get template
    let template: any = null;
    try {
      const templates = await base44.asServiceRole.entities.OfferTemplate.list();
      template = templates.find((t: any) => t.is_default) || templates[0];
    } catch { /* no template entity yet */ }

    const llmPrompt = `Generate a complete, standalone HTML landing page for an SEO offer.

DESIGN SPECS:
- Font: Plus Jakarta Sans (Google Fonts)
- Colors: --red: #FE3200, --yellow: #FFB124, --grey: #F3F4F6, --black: #222222
- Modern, clean, professional look
- Mobile-responsive
- Sections: nav (fixed) → hero (with stats card) → 3 discoveries → current state (before/after grid) → problems → case study → opportunities → P1 plan → FAQ (accordion) → CTA (interactive choice buttons)
- CTA pattern: "Który z 3 problemów boli Was najbardziej?" with 3 clickable choice buttons that open mailto:kontakt@double-digital.pl
- Smooth scroll, subtle animations on scroll

CONTENT (from offer.md):
${offer.offer_md?.substring(0, 8000) || "No offer content available"}

ADDITIONAL DATA:
- Domain: ${domain}
- CE: ${siteIntel.ce || domain}
- Visibility: ${senutoData.snapshot?.visibility?.current || "N/A"}
- Ads equivalent: ${senutoData.snapshot?.ads_equivalent || "N/A"} PLN
- Top10: ${senutoData.snapshot?.top10?.current || "N/A"}
- Trend: ${senutoData.trend || "stable"}
- Quick wins count: ${opportunities.quick_wins?.length || 0}

RULES:
1. Complete standalone HTML (<!DOCTYPE html> to </html>)
2. All CSS inline in <style> tag (no external CSS except Google Fonts)
3. All JS inline in <script> tag
4. Polish language
5. Double Digital branding (kontakt@double-digital.pl, double-digital.pl)
6. Nav links: Diagnoza, Szanse, Plan, FAQ
7. Section order: Diagnoza BEFORE Plan (not the other way around!)
8. No SEO jargon in visible text (no "kanibalizacja", "KD", "EEAT")
9. FAQ should use accordion pattern (click to expand)

Return ONLY the HTML code, nothing else.`;

    const html = await base44.integrations.InvokeLLM({
      prompt: llmPrompt,
      response_format: "text",
    });

    // Clean up — remove markdown code fences if LLM wraps it
    const cleanHtml = html
      .replace(/^```html?\n?/i, "")
      .replace(/\n?```$/i, "")
      .trim();

    await base44.asServiceRole.entities.Offer.update(offerId, {
      offer_html: cleanHtml,
    });

    return jsonResponse({ success: true, html_length: cleanHtml.length });

  } catch (error) {
    return jsonResponse({ error: String(error) }, 500);
  }
});

function jsonResponse(data: any, status = 200) {
  return new Response(JSON.stringify(data), { status, headers: { "Content-Type": "application/json" } });
}
