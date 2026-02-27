/**
 * fn/generate-offer — Base44 Backend Function
 * Compiles all analysis data into a CRO-aware offer document (markdown).
 *
 * Input: { offerId: string }
 * Updates: Offer.offer_md, Offer.status → "done"
 */

Deno.serve(async (req: Request) => {
  try {
    const { offerId } = await req.json();
    const base44 = (await import('./base44-sdk')).default;
    const offer = await base44.asServiceRole.entities.Offer.get(offerId);
    if (!offer) return jsonResponse({ error: "Offer not found" }, 404);

    const siteIntel = JSON.parse(offer.site_intelligence || "{}");
    const senutoData = JSON.parse(offer.senuto_data || "{}");
    const competitors = JSON.parse(offer.competitors_data || "{}");
    const opportunities = JSON.parse(offer.opportunities_data || "{}");
    const contentAudit = JSON.parse(offer.content_audit_data || "{}");
    const domain = offer.domain.replace(/^https?:\/\//, "").replace(/^www\./, "").replace(/\/$/, "");

    const today = new Date().toISOString().split("T")[0];

    // CRO-aware offer generation prompt
    const llmPrompt = `You are a senior SEO consultant at Double Digital agency writing a cold outreach offer for ${domain}.

## MANDATORY CRO RULES:
1. TRUST BEFORE DATA — 2-3 sentences about DD before any numbers appear
2. EMOTION → LOGIC → CTA — problem that hurts → proof we understand → one step
3. BUSINESS OWNER LANGUAGE — FORBIDDEN words: "kanibalizacja", "KD", "widoczność Senuto", "EEAT", "anchor text", "crawl budget", "BLUF". USE: "pozycja w Google", "ruch na stronie", "klienci z Google"
4. PROOF > PROMISE — Include a case study (even anonymous)
5. ONLY P1 — Show only first 30 days plan. "P2-P4 omówimy na spotkaniu"
6. LOW-FRICTION CTA — Email reply preferred, "bez zobowiązań"
7. DATA IN APPENDIX — Senuto numbers go to "Dane źródłowe" section at bottom

## DATA TO USE:
- CE: ${siteIntel.ce || "Unknown"}
- SC: ${siteIntel.sc || "Unknown"}
- Business: ${siteIntel.business_model || "Unknown"}
- Services: ${JSON.stringify(siteIntel.services || [])}
- Visibility: ${senutoData.snapshot?.visibility?.current || "N/A"} (trend: ${senutoData.trend || "unknown"})
- Top3: ${senutoData.snapshot?.top3?.current || "N/A"}, Top10: ${senutoData.snapshot?.top10?.current || "N/A"}, Top50: ${senutoData.snapshot?.top50?.current || "N/A"}
- Ads Equivalent: ${senutoData.snapshot?.ads_equivalent || "N/A"} PLN
- Cannibalization: ${senutoData.cannibalization_count || 0} keywords
- Top URLs: ${JSON.stringify(senutoData.top_urls?.slice(0, 5) || [])}
- Competitors: ${JSON.stringify(competitors.competitors?.slice(0, 3) || [])}
- Visibility gap: ${JSON.stringify(competitors.visibility_gap || {})}
- Quick wins: ${JSON.stringify(opportunities.quick_wins?.slice(0, 5) || [])}
- Content gaps: ${JSON.stringify(opportunities.content_gaps?.slice(0, 5) || [])}
- PAA/SERP: ${JSON.stringify(opportunities.serp_intelligence?.slice(0, 2) || [])}
- Content audit: ${JSON.stringify(contentAudit.audits?.slice(0, 3) || [])}
- Content maturity: ${contentAudit.content_maturity || "unknown"}
- Content patterns: ${JSON.stringify(contentAudit.patterns || [])}

## STRUCTURE (follow this EXACTLY):

# [Domain] — Analiza SEO od Double Digital
> [Outcome headline — 1 specific sentence about THEIR situation]
**Double Digital** · ${today} · Dane: Senuto, Google SERP

---
## Skąd ta analiza i dlaczego Ty?
[2-3 sentences trust-building]

---
## 3 rzeczy, które musisz wiedzieć
### ❗ [Discovery 1 — biggest problem]
### ⚠️ [Discovery 2]
### 💡 [Discovery 3 — biggest opportunity, positive framing]

---
## Skąd teraz pochodzi Twój ruch
### Strony które pracują dla Ciebie
[Table of top URLs in business language]
### Trend ostatnich 12 miesięcy
### Ile jest warte to co masz
[Ads equivalent value]

---
## Co blokuje wzrost
### Problem 1-3 [business language, analogies, consequences]

---
## Jak to naprawiliśmy u podobnej firmy
[Anonymous case study — similar business, action, result with numbers]

---
## Twoje szanse — od najszybszego do długoterminowego
### 🚀 Szansa 1 [60-90 days]
### 📈 Szansa 2 [3-6 months]
### 🏗️ Szansa 3 [6-12 months]

---
## Co zrobimy w pierwszych 30 dniach
[Only P1 — 4 concrete actions with timeline table]

---
## Pytania które zazwyczaj się pojawiają
[FAQ: cost, timeline, competition, will it work, algo changes]

---
## Następny krok
[CTA variant A — lowest friction: "Odpowiedz na tego maila z jednym pytaniem..."]
→ kontakt@double-digital.pl · double-digital.pl

---
## Dane źródłowe
[Full Senuto tables, competitor data, methodology]

Write the COMPLETE offer in Polish. Every section must have real data from the analysis above. No placeholders.`;

    const offerMd = await base44.integrations.InvokeLLM({
      prompt: llmPrompt,
      response_format: "text",
    });

    await base44.asServiceRole.entities.Offer.update(offerId, {
      offer_md: offerMd,
      status: "done",
    });

    return jsonResponse({ success: true, offer_length: offerMd.length });

  } catch (error) {
    return jsonResponse({ error: String(error) }, 500);
  }
});

function jsonResponse(data: any, status = 200) {
  return new Response(JSON.stringify(data), { status, headers: { "Content-Type": "application/json" } });
}
