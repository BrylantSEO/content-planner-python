/**
 * fn/opportunity-analysis — Base44 Backend Function
 * Uses LLM to identify quick wins and content gaps from Senuto data.
 * Optionally fetches SERP data from NodeHub for top 3 opportunities.
 *
 * Input: { offerId: string }
 * Updates: Offer.opportunities_data, Offer.status → "content_audit"
 */

Deno.serve(async (req: Request) => {
  try {
    const { offerId } = await req.json();
    const base44 = (await import('./base44-sdk')).default;
    const offer = await base44.asServiceRole.entities.Offer.get(offerId);
    if (!offer) return jsonResponse({ error: "Offer not found" }, 404);

    const senutoData = JSON.parse(offer.senuto_data || "{}");
    const competitorsData = JSON.parse(offer.competitors_data || "{}");
    const siteIntel = JSON.parse(offer.site_intelligence || "{}");

    // LLM analysis for opportunities
    const llmPrompt = `You are an SEO strategist. Based on this data, identify:

1. **Quick Wins** (3-5): Keywords at positions 11-20 with low difficulty (KD<35) that can move to Top 10 with optimization. For each: keyword estimate, current position range, difficulty level, monthly volume estimate, recommended action.

2. **Content Gaps** (3-5): Topics covered by competitors but missing from client's site. For each: topic, which competitors cover it, estimated volume, priority.

3. **Cannibalization fixes**: If cannibalization count > 5, note it as an opportunity.

DATA:
- Domain: ${offer.domain}
- Business: ${siteIntel.ce || "Unknown"} - ${siteIntel.sc || "Unknown"}
- Visibility snapshot: ${JSON.stringify(senutoData.snapshot || {})}
- Top URLs: ${JSON.stringify(senutoData.top_urls?.slice(0, 5) || [])}
- Difficulty distribution: ${JSON.stringify(senutoData.difficulty_distribution || [])}
- Search volume distribution: ${JSON.stringify(senutoData.search_distribution || [])}
- Cannibalization count: ${senutoData.cannibalization_count || 0}
- Competitors: ${JSON.stringify(competitorsData.competitors?.slice(0, 3)?.map((c: any) => ({ domain: c.domain, common_kw: c.common_keywords })) || [])}
- Visibility gap: ${JSON.stringify(competitorsData.visibility_gap || {})}

Return JSON:
{
  "quick_wins": [{ "keyword_estimate": "...", "position_range": "11-15", "difficulty": "low", "volume_estimate": "500-1000", "action": "..." }],
  "content_gaps": [{ "topic": "...", "covered_by": ["competitor1.pl"], "volume_estimate": "1000+", "priority": "high|medium|low" }],
  "cannibalization_opportunity": "..." or null,
  "top_3_opportunity_keywords": ["keyword1", "keyword2", "keyword3"]
}`;

    const llmResult = await base44.integrations.InvokeLLM({
      prompt: llmPrompt,
      response_format: "json",
    });

    let opportunities = JSON.parse(llmResult);

    // Optional: SERP intelligence via NodeHub
    const NODESHUB_KEY = Deno.env.get("NODESHUB_API_KEY");
    if (NODESHUB_KEY && opportunities.top_3_opportunity_keywords?.length) {
      const serpResults: any[] = [];
      for (const kw of opportunities.top_3_opportunity_keywords.slice(0, 3)) {
        try {
          const serpRes = await fetch(
            `https://api.nodeshub.io/serp?q=${encodeURIComponent(kw)}&gl=pl&hl=pl&api_key=${NODESHUB_KEY}`
          );
          if (serpRes.ok) {
            const data = await serpRes.json();
            serpResults.push({
              keyword: kw,
              paa: data.people_also_ask?.map((p: any) => p.question).slice(0, 5) || [],
              related: data.related_searches?.slice(0, 5) || [],
            });
          }
        } catch { /* skip SERP on error */ }
      }
      opportunities.serp_intelligence = serpResults;
    }

    await base44.asServiceRole.entities.Offer.update(offerId, {
      opportunities_data: JSON.stringify(opportunities),
      status: "content_audit",
    });

    return jsonResponse({ success: true, quick_wins: opportunities.quick_wins?.length || 0 });

  } catch (error) {
    return jsonResponse({ error: String(error) }, 500);
  }
});

function jsonResponse(data: any, status = 200) {
  return new Response(JSON.stringify(data), { status, headers: { "Content-Type": "application/json" } });
}
