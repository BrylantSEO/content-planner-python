/**
 * fn/competitor-analysis — Base44 Backend Function
 * Fetches competitors from Senuto and their stats.
 *
 * Input: { offerId: string }
 * Updates: Offer.competitors_data, Offer.status → "opportunities"
 */

const SENUTO_BASE = "https://api.senuto.com";

Deno.serve(async (req: Request) => {
  const SENUTO_TOKEN = Deno.env.get("SENUTO_API_KEY");
  if (!SENUTO_TOKEN) return jsonResponse({ error: "Missing SENUTO_API_KEY" }, 500);

  try {
    const { offerId } = await req.json();
    const base44 = (await import('./base44-sdk')).default;
    const offer = await base44.asServiceRole.entities.Offer.get(offerId);
    if (!offer) return jsonResponse({ error: "Offer not found" }, 404);

    const domain = offer.domain.replace(/^https?:\/\//, "").replace(/^www\./, "").replace(/\/$/, "");
    const senutoData = JSON.parse(offer.senuto_data || "{}");
    const country_id = senutoData.country_id || "200";

    const headers = {
      "Authorization": `Bearer ${SENUTO_TOKEN}`,
      "Content-Type": "application/json",
    };

    // Step 1: Get competitors list
    const compRes = await fetch(`${SENUTO_BASE}/api/visibility_analysis/reports/competitors/getData`, {
      method: "POST", headers,
      body: JSON.stringify({ domain, fetch_mode: "topLevelDomain", country_id, limit: 10 }),
    });
    const compData = await compRes.json();

    if (!compData.success || !compData.data?.length) {
      await base44.asServiceRole.entities.Offer.update(offerId, {
        competitors_data: JSON.stringify({ error: "no_competitors", competitors: [] }),
        status: "opportunities",
      });
      return jsonResponse({ success: true, competitors: 0 });
    }

    // Step 2: Get stats for top 5 competitors (parallel)
    const top5 = compData.data.slice(0, 5);
    const statsPromises = top5.map((c: any) =>
      fetch(`${SENUTO_BASE}/api/visibility_analysis/reports/dashboard/getDomainStatistics?domain=${c.domain}&fetch_mode=topLevelDomain&country_id=${country_id}`, { headers })
        .then(r => r.json())
        .then(data => ({
          domain: c.domain,
          common_keywords: c.common_keywords,
          visibility: data.success ? data.data?.statistics?.visibility?.current : null,
          top10: data.success ? data.data?.statistics?.top10?.current : null,
          domain_rank: data.success ? data.data?.statistics?.domain_rank : null,
        }))
        .catch(() => ({
          domain: c.domain,
          common_keywords: c.common_keywords,
          visibility: c.statistics?.visibility?.current,
          top10: c.statistics?.top10?.current,
          domain_rank: null,
        }))
    );

    const competitorStats = await Promise.all(statsPromises);

    // Calculate visibility gap
    const clientVisibility = senutoData.snapshot?.visibility?.current || 0;
    const leaderVisibility = Math.max(...competitorStats.map((c: any) => c.visibility || 0));
    const leader = competitorStats.find((c: any) => c.visibility === leaderVisibility);

    const result = {
      competitors: competitorStats,
      visibility_gap: {
        leader_domain: leader?.domain,
        leader_visibility: leaderVisibility,
        client_visibility: clientVisibility,
        gap_multiplier: clientVisibility > 0 ? (leaderVisibility / clientVisibility).toFixed(1) : "N/A",
      },
    };

    await base44.asServiceRole.entities.Offer.update(offerId, {
      competitors_data: JSON.stringify(result),
      status: "opportunities",
    });

    return jsonResponse({ success: true, competitors: competitorStats.length });

  } catch (error) {
    return jsonResponse({ error: String(error) }, 500);
  }
});

function jsonResponse(data: any, status = 200) {
  return new Response(JSON.stringify(data), { status, headers: { "Content-Type": "application/json" } });
}
