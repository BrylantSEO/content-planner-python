/**
 * Step 3: Opportunity Analysis — data-driven tables + optional SERP enrichment
 *
 * KEY CHANGE: Tables are built from real Senuto data, NOT hallucinated by LLM.
 * LLM is only used for narrative summary and business interpretation.
 */

export async function opportunityAnalysis(siteIntel, senutoData, competitorsData, emit) {
  emit("step", { step: 3, name: "Opportunity Analysis", status: "running" });

  emit("log", "Budowanie tabel szans z danych Senuto...");

  // Table 1: Quick wins — keywords on positions 11-20, sorted by volume
  const quickWins = (senutoData?.keywords?.quick_wins || []).map((kw) => ({
    keyword: kw.keyword,
    position: kw.position,
    volume: kw.volume,
    difficulty: kw.difficulty,
    url: kw.url,
    intent: kw.intent,
  }));

  // Table 2: Competitor gap — competitor in top 10, we're absent
  const competitorGaps = (competitorsData?.competitor_gap_keywords || []).map((kw) => ({
    keyword: kw.keyword,
    volume: kw.volume,
    competitor: kw.competitor,
    competitor_position: kw.competitor_position,
    client_position: kw.client_position,
  }));

  // Table 3: Declining keywords — losing positions
  const declining = (senutoData?.keywords?.declining || []).map((kw) => ({
    keyword: kw.keyword,
    position: kw.position,
    previous_position: kw.previous_position,
    diff: kw.diff,
    volume: kw.volume,
    url: kw.url,
  }));

  // Table 4: High-volume keywords where we rank poorly (>20)
  const missedHighVolume = (senutoData?.keywords?.missed_high_volume || []).map((kw) => ({
    keyword: kw.keyword,
    position: kw.position,
    volume: kw.volume,
    difficulty: kw.difficulty,
    url: kw.url,
  }));

  // Build markdown tables for the offer
  const tables = {};

  if (quickWins.length > 0) {
    tables.quick_wins_md = `| Fraza | Pozycja | Wyszukiwań/mies. | Trudność | Twoja strona |\n|-------|---------|------------------|----------|-------------|\n` +
      quickWins.map((kw) =>
        `| ${kw.keyword} | ${kw.position} | ${kw.volume} | ${kw.difficulty}/100 | ${shortenUrl(kw.url)} |`
      ).join("\n");
  }

  if (competitorGaps.length > 0) {
    tables.competitor_gaps_md = `| Fraza | Wyszukiwań/mies. | ${competitorGaps[0]?.competitor || "Konkurent"} | Twoja pozycja |\n|-------|------------------|------------|---------------|\n` +
      competitorGaps.map((kw) =>
        `| ${kw.keyword} | ${kw.volume} | poz. ${kw.competitor_position} | ${kw.client_position === "brak" ? "❌ brak" : `poz. ${kw.client_position}`} |`
      ).join("\n");
  }

  if (declining.length > 0) {
    tables.declining_md = `| Fraza | Była pozycja | Jest pozycja | Spadek | Wyszukiwań/mies. |\n|-------|-------------|-------------|--------|------------------|\n` +
      declining.map((kw) =>
        `| ${kw.keyword} | ${kw.previous_position} | ${kw.position} | ↓${kw.diff} | ${kw.volume} |`
      ).join("\n");
  }

  if (missedHighVolume.length > 0) {
    tables.missed_high_volume_md = `| Fraza | Pozycja | Wyszukiwań/mies. | Trudność |\n|-------|---------|------------------|----------|\n` +
      missedHighVolume.map((kw) =>
        `| ${kw.keyword} | ${kw.position} | ${kw.volume} | ${kw.difficulty}/100 |`
      ).join("\n");
  }

  // Summary stats
  const totalQuickWinVolume = quickWins.reduce((sum, kw) => sum + kw.volume, 0);
  const totalGapVolume = competitorGaps.reduce((sum, kw) => sum + kw.volume, 0);

  emit("log", `Quick wins: ${quickWins.length} fraz (${totalQuickWinVolume} wyszukiwań/mies.)`);
  emit("log", `Competitor gaps: ${competitorGaps.length} fraz (${totalGapVolume} wyszukiwań/mies.)`);
  emit("log", `Spadające: ${declining.length} fraz`);

  // Optional: SERP intelligence via NodeHub for top opportunity keywords
  let serpIntelligence = [];
  const nodesHubKey = process.env.NODESHUB_API_KEY;
  const topOpportunityKeywords = [
    ...quickWins.slice(0, 2).map((kw) => kw.keyword),
    ...competitorGaps.slice(0, 1).map((kw) => kw.keyword),
  ].slice(0, 3);

  if (nodesHubKey && topOpportunityKeywords.length) {
    emit("log", "SERP intelligence (NodeHub) dla top 3 fraz...");
    for (const kw of topOpportunityKeywords) {
      try {
        const serpRes = await fetch(
          `https://api.nodeshub.io/serp?q=${encodeURIComponent(kw)}&gl=pl&hl=pl&api_key=${nodesHubKey}`
        );
        if (serpRes.ok) {
          const data = await serpRes.json();
          serpIntelligence.push({
            keyword: kw,
            paa: data.people_also_ask?.map((p) => p.question).slice(0, 5) || [],
            related: data.related_searches?.slice(0, 5) || [],
          });
        }
      } catch { /* skip */ }
    }
  }

  const result = {
    quick_wins: quickWins,
    competitor_gaps: competitorGaps,
    declining: declining,
    missed_high_volume: missedHighVolume,
    tables,
    summary: {
      quick_win_count: quickWins.length,
      quick_win_total_volume: totalQuickWinVolume,
      competitor_gap_count: competitorGaps.length,
      competitor_gap_total_volume: totalGapVolume,
      declining_count: declining.length,
    },
    serp_intelligence: serpIntelligence,
    cannibalization_count: senutoData?.cannibalization_count || 0,
  };

  emit("step", { step: 3, name: "Opportunity Analysis", status: "done" });
  return result;
}

function shortenUrl(url) {
  if (!url) return "";
  return "/" + url.replace(/^https?:\/\//, "").replace(/^[^/]+/, "").replace(/\/$/, "") || "/";
}
