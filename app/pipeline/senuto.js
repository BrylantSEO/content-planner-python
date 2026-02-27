/**
 * Step 1: Senuto Domain Analysis — 6 parallel API calls
 * Step 2: Competitor Intelligence
 */

const SENUTO_BASE = "https://api.senuto.com";

function getHeaders() {
  const token = process.env.SENUTO_API_KEY;
  if (!token) throw new Error("SENUTO_API_KEY not set");
  return {
    Authorization: `Bearer ${token}`,
    "Content-Type": "application/json",
  };
}

export async function senutoAnalysis(domain, countryId, emit) {
  emit("step", { step: 1, name: "Senuto Analysis", status: "running" });

  const headers = getHeaders();
  const now = new Date();
  const yearAgo = new Date(now);
  yearAgo.setFullYear(yearAgo.getFullYear() - 1);
  const date_max = now.toISOString().split("T")[0];
  const date_min = yearAgo.toISOString().split("T")[0];

  emit("log", "7 równoległych zapytań do Senuto API...");

  const [statsRes, historyRes, difficultyRes, searchesRes, urlsRes, cannibRes, positionsRes] =
    await Promise.allSettled([
      // [1] Domain Statistics
      fetch(
        `${SENUTO_BASE}/api/visibility_analysis/reports/dashboard/getDomainStatistics?` +
          new URLSearchParams({ domain, fetch_mode: "topLevelDomain", country_id: countryId, days_compare_mode: "week_ago_monday" }),
        { headers }
      ).then((r) => r.json()),

      // [2] Positions History
      fetch(
        `${SENUTO_BASE}/api/visibility_analysis/reports/domain_positions/getPositionsHistoryChartData?` +
          new URLSearchParams({ domain, fetch_mode: "topLevelDomain", country_id: countryId, date_min, date_max, date_interval: "weekly" }),
        { headers }
      ).then((r) => r.json()),

      // [3] Difficulty distribution
      fetch(`${SENUTO_BASE}/api/visibility_analysis/reports/keywords/getCharacteristicsTable`, {
        method: "POST", headers,
        body: JSON.stringify({ domain, fetch_mode: "topLevelDomain", country_id: countryId, characteristics: "difficulty" }),
      }).then((r) => r.json()),

      // [4] Search volume distribution
      fetch(`${SENUTO_BASE}/api/visibility_analysis/reports/keywords/getCharacteristicsTable`, {
        method: "POST", headers,
        body: JSON.stringify({ domain, fetch_mode: "topLevelDomain", country_id: countryId, characteristics: "searches" }),
      }).then((r) => r.json()),

      // [5] Top URLs
      fetch(`${SENUTO_BASE}/api/visibility_analysis/reports/sections/getUrls`, {
        method: "POST", headers,
        body: JSON.stringify({ domain, fetch_mode: "topLevelDomain", country_id: countryId, limit: 20 }),
      }).then((r) => r.json()),

      // [6] Cannibalization
      fetch(`${SENUTO_BASE}/api/visibility_analysis/reports/cannibalization/getKeywords`, {
        method: "POST", headers,
        body: JSON.stringify({ domain, fetch_mode: "topLevelDomain", country_id: countryId }),
      }).then((r) => r.json()),

      // [7] All keyword positions (up to 100) — raw keyword-level data
      fetch(`${SENUTO_BASE}/api/visibility_analysis/reports/positions/getData`, {
        method: "POST", headers,
        body: JSON.stringify({ domain, fetch_mode: "topLevelDomain", country_id: countryId, limit: 100 }),
      }).then((r) => r.json()),
    ]);

  const safe = (r) => (r.status === "fulfilled" ? r.value : null);
  const stats = safe(statsRes);
  const history = safe(historyRes);
  const difficulty = safe(difficultyRes);
  const searches = safe(searchesRes);
  const urls = safe(urlsRes);
  const cannib = safe(cannibRes);
  const positions = safe(positionsRes);

  // Check if domain has any data
  if (!stats?.success || !stats?.data?.statistics) {
    emit("log", "⚠️ Brak danych Senuto — nowa domena lub za mała widoczność");
    emit("step", { step: 1, name: "Senuto Analysis", status: "done" });
    return { error: "no_data", mode: "limited" };
  }

  const s = stats.data.statistics;
  emit("log", `Widoczność: ${s.visibility?.current} | Top3: ${s.top3?.current} | Top10: ${s.top10?.current}`);

  // Trend analysis
  let trend = "stable";
  if (history?.success && history.data) {
    const top10History = history.data.top10 || {};
    const values = Object.values(top10History);
    if (values.length >= 2) {
      const first = values[0];
      const last = values[values.length - 1];
      const changePct = ((last - first) / (first || 1)) * 100;
      if (changePct > 10) trend = "growing";
      else if (changePct < -10) trend = "declining";
      emit("log", `Trend 12m: ${trend} (${changePct > 0 ? "+" : ""}${changePct.toFixed(0)}%)`);
    }
  }

  // Process URLs
  const urlData = urls?.success && Array.isArray(urls.data) ? urls.data : [];
  const topUrls = [...urlData]
    .sort((a, b) => (b.visibility_percent || 0) - (a.visibility_percent || 0))
    .slice(0, 10)
    .map((u) => ({
      url: u.url,
      keywords: u.keywords_count,
      visibility_pct: u.visibility_percent,
    }));

  // Process cannibalization
  const cannibData = cannib?.success && Array.isArray(cannib.data) ? cannib.data : [];
  const cannibCount = cannibData.filter(
    (kw) => kw.statistics?.url?.current !== kw.statistics?.url?.previous
  ).length;

  // Process raw keyword positions into actionable lists
  const rawKeywords = positions?.success && Array.isArray(positions.data) ? positions.data : [];
  const allKeywords = rawKeywords.map((kw) => ({
    keyword: kw.keyword,
    position: kw.statistics?.position?.current,
    previous_position: kw.statistics?.position?.previous,
    diff: kw.statistics?.position?.diff,
    volume: kw.statistics?.searches?.current || 0,
    cpc: kw.statistics?.cpc?.current || 0,
    difficulty: kw.statistics?.difficulty?.current || 0,
    url: kw.statistics?.url?.current || "",
    intent: kw.statistics?.intentions?.main_intent || "",
  })).filter((kw) => kw.position > 0);

  // Table 1: "Nisko wiszące owoce" — positions 11-20, sorted by volume
  const quickWinKeywords = allKeywords
    .filter((kw) => kw.position >= 11 && kw.position <= 20)
    .sort((a, b) => b.volume - a.volume)
    .slice(0, 10);

  // Table 3: "Frazy tracące pozycje" — diff > 0 means position worsened
  const decliningKeywords = allKeywords
    .filter((kw) => kw.diff > 3 && kw.volume >= 20)
    .sort((a, b) => b.volume - a.volume)
    .slice(0, 10);

  // High-volume keywords where we rank poorly (>20)
  const missedHighVolume = allKeywords
    .filter((kw) => kw.position > 20 && kw.volume >= 100)
    .sort((a, b) => b.volume - a.volume)
    .slice(0, 10);

  emit("log", `Frazy: ${allKeywords.length} total | ${quickWinKeywords.length} quick wins (poz 11-20) | ${decliningKeywords.length} spadające`);

  const result = {
    snapshot: {
      visibility: { current: s.visibility?.current, previous: s.visibility?.previous, change_pct: s.visibility?.diff },
      top3: { current: s.top3?.current, previous: s.top3?.previous, change_pct: s.top3?.diff },
      top10: { current: s.top10?.current, previous: s.top10?.previous, change_pct: s.top10?.diff },
      top50: { current: s.top50?.current, previous: s.top50?.previous, change_pct: s.top50?.diff },
      domain_rank: s.domain_rank,
      ads_equivalent: s.ads_equivalent?.current,
    },
    trend,
    trend_history: history?.success ? history.data : null,
    difficulty_distribution: difficulty?.success && Array.isArray(difficulty.data) ? difficulty.data.map((seg) => ({ segment: seg.key, count: seg.top50, visibility_pct: seg.visibility_percent })) : [],
    search_distribution: searches?.success && Array.isArray(searches.data) ? searches.data.map((seg) => ({ segment: seg.key, count: seg.top50, visibility_pct: seg.visibility_percent })) : [],
    top_urls: topUrls,
    cannibalization_count: cannibCount,
    // NEW: raw keyword tables for offer
    keywords: {
      all: allKeywords,
      quick_wins: quickWinKeywords,
      declining: decliningKeywords,
      missed_high_volume: missedHighVolume,
    },
    country_id: countryId,
    analysis_date: date_max,
    mode: "full",
  };

  emit("step", { step: 1, name: "Senuto Analysis", status: "done" });
  return result;
}

export async function competitorAnalysis(domain, countryId, senutoData, emit) {
  emit("step", { step: 2, name: "Competitor Intelligence", status: "running" });

  const headers = getHeaders();

  emit("log", "Pobieranie konkurentów z Senuto...");

  const compRes = await fetch(`${SENUTO_BASE}/api/visibility_analysis/reports/competitors/getData`, {
    method: "POST", headers,
    body: JSON.stringify({ domain, fetch_mode: "topLevelDomain", country_id: countryId, limit: 10 }),
  });
  const compData = await compRes.json();

  if (!compData.success || !compData.data?.length) {
    emit("log", "⚠️ Brak danych o konkurentach");
    emit("step", { step: 2, name: "Competitor Intelligence", status: "done" });
    return { competitors: [], visibility_gap: null };
  }

  const top5 = compData.data.slice(0, 5);
  emit("log", `Top ${top5.length} konkurentów: ${top5.map((c) => c.domain).join(", ")}`);

  // Get stats for each competitor
  const statsPromises = top5.map((c) =>
    fetch(
      `${SENUTO_BASE}/api/visibility_analysis/reports/dashboard/getDomainStatistics?` +
        new URLSearchParams({ domain: c.domain, fetch_mode: "topLevelDomain", country_id: countryId }),
      { headers }
    )
      .then((r) => r.json())
      .then((data) => ({
        domain: c.domain,
        common_keywords: c.common_keywords,
        visibility: data.success ? data.data?.statistics?.visibility?.current : c.statistics?.visibility?.current,
        top10: data.success ? data.data?.statistics?.top10?.current : c.statistics?.top10?.current,
        domain_rank: data.success ? data.data?.statistics?.domain_rank : null,
      }))
      .catch(() => ({
        domain: c.domain,
        common_keywords: c.common_keywords,
        visibility: c.statistics?.visibility?.current,
        top10: c.statistics?.top10?.current,
      }))
  );

  const allCompetitors = await Promise.all(statsPromises);
  // Filter out the analyzed domain itself
  const competitors = allCompetitors.filter((c) => c.domain !== domain);

  const clientVisibility = senutoData?.snapshot?.visibility?.current || 0;
  // Pick leader: by visibility first, fallback to domain_rank (lower = better)
  let leader;
  const withVis = competitors.filter((c) => (c.visibility || 0) > 0);
  if (withVis.length > 0) {
    const leaderVisibility = Math.max(...withVis.map((c) => c.visibility));
    leader = withVis.find((c) => c.visibility === leaderVisibility);
  } else {
    // All visibility = 0, pick by best (lowest) domain_rank
    leader = [...competitors].sort((a, b) => {
      const ra = a.domain_rank?.recent_value || Infinity;
      const rb = b.domain_rank?.recent_value || Infinity;
      return ra - rb;
    })[0];
  }
  const leaderVisibility = leader?.visibility || 0;

  // Fetch top competitor's keyword positions for gap analysis
  let competitorGapKeywords = [];
  if (leader) {
    emit("log", `Pobieranie fraz konkurenta ${leader.domain}...`);
    try {
      const compPosRes = await fetch(`${SENUTO_BASE}/api/visibility_analysis/reports/positions/getData`, {
        method: "POST", headers,
        body: JSON.stringify({ domain: leader.domain, fetch_mode: "topLevelDomain", country_id: countryId, limit: 100 }),
      });
      const compPosData = await compPosRes.json();
      if (compPosData.success && Array.isArray(compPosData.data)) {
        const compKeywords = compPosData.data.map((kw) => ({
          keyword: kw.keyword,
          position: kw.statistics?.position?.current,
          volume: kw.statistics?.searches?.current || 0,
          url: kw.statistics?.url?.current || "",
        })).filter((kw) => kw.position > 0 && kw.position <= 10);

        // Find keywords where competitor is in top 10 but client is absent or >50
        const clientKeywordSet = new Set(
          (senutoData?.keywords?.all || []).map((k) => k.keyword.toLowerCase())
        );
        const clientKeywordMap = new Map(
          (senutoData?.keywords?.all || []).map((k) => [k.keyword.toLowerCase(), k.position])
        );

        competitorGapKeywords = compKeywords
          .filter((ck) => {
            const clientPos = clientKeywordMap.get(ck.keyword.toLowerCase());
            return !clientPos || clientPos > 50;
          })
          .sort((a, b) => b.volume - a.volume)
          .slice(0, 15)
          .map((ck) => ({
            keyword: ck.keyword,
            volume: ck.volume,
            competitor: leader.domain,
            competitor_position: ck.position,
            client_position: clientKeywordMap.get(ck.keyword.toLowerCase()) || "brak",
          }));

        emit("log", `${competitorGapKeywords.length} fraz gap (konkurent widoczny, klient nie)`);
      }
    } catch (e) {
      emit("log", `⚠️ Nie udało się pobrać pozycji konkurenta: ${e.message}`);
    }
  }

  const result = {
    competitors,
    visibility_gap: {
      leader_domain: leader?.domain,
      leader_visibility: leaderVisibility,
      client_visibility: clientVisibility,
      gap_multiplier: clientVisibility > 0 ? (leaderVisibility / clientVisibility).toFixed(1) : "N/A",
    },
    competitor_gap_keywords: competitorGapKeywords,
  };

  emit("step", { step: 2, name: "Competitor Intelligence", status: "done" });
  return result;
}
