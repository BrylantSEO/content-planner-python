/**
 * fn/senuto-analysis — Base44 Backend Function
 * Runs 6 parallel Senuto API calls for domain analysis.
 *
 * Input: { offerId: string }
 * Updates: Offer.senuto_data, Offer.status → "competitors"
 */

const SENUTO_BASE = "https://api.senuto.com";

Deno.serve(async (req: Request) => {
  const SENUTO_TOKEN = Deno.env.get("SENUTO_API_KEY");
  if (!SENUTO_TOKEN) {
    return jsonResponse({ error: "Missing SENUTO_API_KEY secret" }, 500);
  }

  try {
    const { offerId } = await req.json();

    // Import Base44 SDK
    const base44 = (await import('./base44-sdk')).default;
    const offer = await base44.asServiceRole.entities.Offer.get(offerId);
    if (!offer) return jsonResponse({ error: "Offer not found" }, 404);

    const domain = offer.domain.replace(/^https?:\/\//, "").replace(/^www\./, "").replace(/\/$/, "");
    const siteIntel = JSON.parse(offer.site_intelligence || "{}");
    const country_id = (siteIntel.language === "pl" || siteIntel.country === "PL") ? "200" : "50";

    const headers = {
      "Authorization": `Bearer ${SENUTO_TOKEN}`,
      "Content-Type": "application/json",
    };

    // Date range for history (12 months)
    const now = new Date();
    const yearAgo = new Date(now);
    yearAgo.setFullYear(yearAgo.getFullYear() - 1);
    const date_max = now.toISOString().split("T")[0];
    const date_min = yearAgo.toISOString().split("T")[0];

    // 6 parallel API calls
    const [
      statsRes,
      historyRes,
      difficultyRes,
      searchesRes,
      urlsRes,
      cannibRes,
    ] = await Promise.all([
      // [1] Domain Statistics (GET)
      fetch(`${SENUTO_BASE}/api/visibility_analysis/reports/dashboard/getDomainStatistics?domain=${domain}&fetch_mode=topLevelDomain&country_id=${country_id}&days_compare_mode=week_ago_monday`, { headers }),

      // [2] Positions History Chart (GET)
      fetch(`${SENUTO_BASE}/api/visibility_analysis/reports/domain_positions/getPositionsHistoryChartData?domain=${domain}&fetch_mode=topLevelDomain&country_id=${country_id}&date_min=${date_min}&date_max=${date_max}&date_interval=weekly`, { headers }),

      // [3] Characteristics: difficulty (POST)
      fetch(`${SENUTO_BASE}/api/visibility_analysis/reports/keywords/getCharacteristicsTable`, {
        method: "POST", headers,
        body: JSON.stringify({ domain, fetch_mode: "topLevelDomain", country_id, characteristics: "difficulty" }),
      }),

      // [4] Characteristics: searches (POST)
      fetch(`${SENUTO_BASE}/api/visibility_analysis/reports/keywords/getCharacteristicsTable`, {
        method: "POST", headers,
        body: JSON.stringify({ domain, fetch_mode: "topLevelDomain", country_id, characteristics: "searches" }),
      }),

      // [5] Top URLs (POST)
      fetch(`${SENUTO_BASE}/api/visibility_analysis/reports/sections/getUrls`, {
        method: "POST", headers,
        body: JSON.stringify({ domain, fetch_mode: "topLevelDomain", country_id, limit: 20 }),
      }),

      // [6] Cannibalization (POST)
      fetch(`${SENUTO_BASE}/api/visibility_analysis/reports/cannibalization/getKeywords`, {
        method: "POST", headers,
        body: JSON.stringify({ domain, fetch_mode: "topLevelDomain", country_id }),
      }),
    ]);

    // Parse all responses
    const stats = await statsRes.json();
    const history = await historyRes.json();
    const difficulty = await difficultyRes.json();
    const searches = await searchesRes.json();
    const urls = await urlsRes.json();
    const cannib = await cannibRes.json();

    // Check if domain has data
    if (!stats.success || !stats.data?.statistics) {
      await base44.asServiceRole.entities.Offer.update(offerId, {
        senuto_data: JSON.stringify({ error: "no_data", message: "Domain has no Senuto history" }),
        analysis_mode: "limited",
        status: "competitors",
      });
      return jsonResponse({ success: true, mode: "limited" });
    }

    // Process statistics
    const s = stats.data.statistics;
    const snapshot = {
      visibility: { current: s.visibility?.current, previous: s.visibility?.previous, change_pct: s.visibility?.diff },
      top3: { current: s.top3?.current, previous: s.top3?.previous, change_pct: s.top3?.diff },
      top10: { current: s.top10?.current, previous: s.top10?.previous, change_pct: s.top10?.diff },
      top50: { current: s.top50?.current, previous: s.top50?.previous, change_pct: s.top50?.diff },
      domain_rank: s.domain_rank,
      ads_equivalent: s.ads_equivalent?.current,
    };

    // Process trend
    let trend = "stable";
    if (history.success && history.data) {
      const top10History = history.data.top10 || {};
      const values = Object.values(top10History) as number[];
      if (values.length >= 2) {
        const first = values[0];
        const last = values[values.length - 1];
        const changePct = ((last - first) / (first || 1)) * 100;
        if (changePct > 10) trend = "growing";
        else if (changePct < -10) trend = "declining";
      }
    }

    // Process difficulty distribution
    const diffData = difficulty.success ? difficulty.data : [];
    const diffDistribution = diffData.map((seg: any) => ({
      segment: seg.key,
      count: seg.top50,
      visibility_pct: seg.visibility_percent,
    }));

    // Process search volume distribution
    const searchData = searches.success ? searches.data : [];
    const searchDistribution = searchData.map((seg: any) => ({
      segment: seg.key,
      count: seg.top50,
      visibility_pct: seg.visibility_percent,
    }));

    // Process top URLs
    const urlData = urls.success ? urls.data : [];
    const topUrls = urlData
      .sort((a: any, b: any) => (b.visibility_percent || 0) - (a.visibility_percent || 0))
      .slice(0, 10)
      .map((u: any) => ({
        url: u.url,
        keywords: u.keywords_count,
        visibility_pct: u.visibility_percent,
      }));

    // Process cannibalization
    const cannibData = cannib.success ? cannib.data : [];
    const cannibCount = cannibData.filter((kw: any) => {
      const urlChanged = kw.statistics?.url?.current !== kw.statistics?.url?.previous;
      return urlChanged;
    }).length;

    const senutoData = {
      snapshot,
      trend,
      trend_history: history.success ? history.data : null,
      difficulty_distribution: diffDistribution,
      search_distribution: searchDistribution,
      top_urls: topUrls,
      cannibalization_count: cannibCount,
      cannibalization_critical: cannibCount > 20,
      country_id,
      analysis_date: date_max,
    };

    await base44.asServiceRole.entities.Offer.update(offerId, {
      senuto_data: JSON.stringify(senutoData),
      analysis_mode: "full",
      status: "competitors",
    });

    return jsonResponse({ success: true, mode: "full", snapshot });

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
