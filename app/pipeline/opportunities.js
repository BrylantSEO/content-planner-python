/**
 * Step 3: Opportunity Analysis — LLM + optional SERP
 */
import { callLLM } from "./llm.js";

export async function opportunityAnalysis(siteIntel, senutoData, competitorsData, emit) {
  emit("step", { step: 3, name: "Opportunity Analysis", status: "running" });

  emit("log", "Identyfikacja quick wins i content gaps...");

  const llmPrompt = `You are an SEO strategist. Based on this data, identify opportunities.

DATA:
- Business: ${siteIntel.ce || "Unknown"} — ${siteIntel.sc || "Unknown"}
- Visibility: ${JSON.stringify(senutoData?.snapshot || {})}
- Top URLs: ${JSON.stringify(senutoData?.top_urls?.slice(0, 5) || [])}
- Difficulty distribution: ${JSON.stringify(senutoData?.difficulty_distribution || [])}
- Search distribution: ${JSON.stringify(senutoData?.search_distribution || [])}
- Cannibalization count: ${senutoData?.cannibalization_count || 0}
- Competitors: ${JSON.stringify(competitorsData?.competitors?.slice(0, 3)?.map((c) => ({ domain: c.domain, common_kw: c.common_keywords })) || [])}
- Visibility gap: ${JSON.stringify(competitorsData?.visibility_gap || {})}

Return JSON with:
{
  "quick_wins": [{"keyword_estimate": "...", "position_range": "11-15", "difficulty": "low", "volume_estimate": "500-1000", "action": "..."}],
  "content_gaps": [{"topic": "...", "covered_by": ["competitor1.pl"], "volume_estimate": "1000+", "priority": "high"}],
  "cannibalization_opportunity": "..." or null,
  "top_3_opportunity_keywords": ["kw1", "kw2", "kw3"]
}`;

  const raw = await callLLM(llmPrompt, { json: true });
  let opportunities = JSON.parse(raw);

  // Optional: SERP intelligence via NodeHub
  const nodesHubKey = process.env.NODESHUB_API_KEY;
  if (nodesHubKey && opportunities.top_3_opportunity_keywords?.length) {
    emit("log", "SERP intelligence (NodeHub)...");
    const serpResults = [];
    for (const kw of opportunities.top_3_opportunity_keywords.slice(0, 3)) {
      try {
        const serpRes = await fetch(
          `https://api.nodeshub.io/serp?q=${encodeURIComponent(kw)}&gl=pl&hl=pl&api_key=${nodesHubKey}`
        );
        if (serpRes.ok) {
          const data = await serpRes.json();
          serpResults.push({
            keyword: kw,
            paa: data.people_also_ask?.map((p) => p.question).slice(0, 5) || [],
            related: data.related_searches?.slice(0, 5) || [],
          });
        }
      } catch { /* skip */ }
    }
    opportunities.serp_intelligence = serpResults;
  }

  emit("log", `${opportunities.quick_wins?.length || 0} quick wins, ${opportunities.content_gaps?.length || 0} content gaps`);
  emit("step", { step: 3, name: "Opportunity Analysis", status: "done" });
  return opportunities;
}
