/**
 * Step 5: Generate CRO-aware offer (markdown)
 * Step 6: Generate HTML landing page
 */
import { callLLM } from "./llm.js";

export async function generateOffer(domain, siteIntel, senutoData, competitors, opportunities, contentAudit, emit) {
  emit("step", { step: 5, name: "Generowanie oferty", status: "running" });

  const today = new Date().toISOString().split("T")[0];

  const prompt = `You are a senior SEO consultant at Double Digital agency writing a cold outreach offer for ${domain}.

## MANDATORY CRO RULES:
1. TRUST BEFORE DATA — 2-3 sentences about DD expertise before any numbers
2. EMOTION → LOGIC → CTA — problem that hurts → proof → one step
3. BUSINESS OWNER LANGUAGE — FORBIDDEN: "kanibalizacja", "KD", "widoczność Senuto", "EEAT", "anchor text", "crawl budget", "BLUF". USE: "pozycja w Google", "ruch na stronie", "klienci z Google"
4. PROOF > PROMISE — Anonymous case study
5. ONLY P1 — Show only first 30 days
6. LOW-FRICTION CTA — Email reply, "bez zobowiązań"
7. DATA IN APPENDIX

## DATA:
- CE: ${siteIntel.ce || "Unknown"}
- SC: ${siteIntel.sc || "Unknown"}
- Business: ${siteIntel.business_model || "Unknown"}
- Services: ${JSON.stringify(siteIntel.services || [])}
- Visibility: ${senutoData?.snapshot?.visibility?.current || "N/A"} (trend: ${senutoData?.trend || "unknown"})
- Top3: ${senutoData?.snapshot?.top3?.current || "N/A"}, Top10: ${senutoData?.snapshot?.top10?.current || "N/A"}, Top50: ${senutoData?.snapshot?.top50?.current || "N/A"}
- Ads Equivalent: ${senutoData?.snapshot?.ads_equivalent || "N/A"} PLN
- Cannibalization: ${senutoData?.cannibalization_count || 0}
- Top URLs: ${JSON.stringify(senutoData?.top_urls?.slice(0, 5) || [])}
- Competitors: ${JSON.stringify(competitors?.competitors?.slice(0, 3) || [])}
- Visibility gap: ${JSON.stringify(competitors?.visibility_gap || {})}
- Quick wins: ${JSON.stringify(opportunities?.quick_wins?.slice(0, 5) || [])}
- Content gaps: ${JSON.stringify(opportunities?.content_gaps?.slice(0, 5) || [])}
- PAA/SERP: ${JSON.stringify(opportunities?.serp_intelligence?.slice(0, 2) || [])}
- Content audit: ${JSON.stringify(contentAudit?.audits?.slice(0, 3) || [])}
- Content maturity: ${contentAudit?.content_maturity || "unknown"}

## STRUCTURE:

# [Domain] — Analiza SEO od Double Digital
> [Outcome headline]
**Double Digital** · ${today} · Dane: Senuto, Google SERP

---
## Skąd ta analiza i dlaczego Ty?
[2-3 trust sentences]

---
## 3 rzeczy, które musisz wiedzieć
### ❗ [Discovery 1]
### ⚠️ [Discovery 2]
### 💡 [Discovery 3 — positive]

---
## Skąd teraz pochodzi Twój ruch
[Top URLs table, trend, ads equivalent]

---
## Co blokuje wzrost
[Problems in business language]

---
## Jak to naprawiliśmy u podobnej firmy
[Anonymous case study]

---
## Twoje szanse
### 🚀 Szansa 1 [60-90 days]
### 📈 Szansa 2 [3-6 months]
### 🏗️ Szansa 3 [6-12 months]

---
## Co zrobimy w pierwszych 30 dniach
[P1 only, 4 actions with timeline]

---
## Pytania które zazwyczaj się pojawiają
[FAQ: cost, timeline, competition]

---
## Następny krok
[CTA: "Odpowiedz na tego maila..."]
→ kontakt@double-digital.pl · double-digital.pl

---
## Dane źródłowe
[Full tables, methodology]

Write the COMPLETE offer in Polish. Real data only, no placeholders.`;

  const offerMd = await callLLM(prompt, { maxTokens: 12000 });

  emit("log", `Oferta wygenerowana (${(offerMd.length / 1024).toFixed(0)}KB)`);
  emit("step", { step: 5, name: "Generowanie oferty", status: "done" });
  return offerMd;
}

export async function generateHTML(domain, offerMd, siteIntel, senutoData, opportunities, emit) {
  emit("step", { step: 6, name: "Generowanie LP", status: "running" });

  const prompt = `Generate a complete standalone HTML landing page for an SEO offer.

DESIGN:
- Font: Plus Jakarta Sans (Google Fonts)
- Colors: --red: #FE3200, --yellow: #FFB124, --grey: #F3F4F6, --black: #222222
- Modern, clean, mobile-responsive
- Sections: fixed nav → hero (stats card) → 3 discoveries → current state → problems → case study → opportunities → P1 plan → FAQ accordion → CTA (3 interactive choice buttons → mailto:kontakt@double-digital.pl)
- Smooth scroll, subtle animations

CONTENT:
${offerMd.substring(0, 10000)}

EXTRA DATA:
- Domain: ${domain}
- CE: ${siteIntel?.ce || domain}
- Visibility: ${senutoData?.snapshot?.visibility?.current || "N/A"}
- Ads equivalent: ${senutoData?.snapshot?.ads_equivalent || "N/A"} PLN
- Quick wins: ${opportunities?.quick_wins?.length || 0}

RULES:
1. Complete standalone HTML (<!DOCTYPE html> to </html>)
2. All CSS in <style>, all JS in <script>
3. Polish language
4. Double Digital branding
5. Nav: Diagnoza → Szanse → Plan → FAQ
6. Section order: Diagnoza BEFORE Plan
7. No SEO jargon visible
8. FAQ accordion (click to expand)

Return ONLY the HTML code.`;

  let html = await callLLM(prompt, { maxTokens: 16000 });
  html = html.replace(/^```html?\n?/i, "").replace(/\n?```$/i, "").trim();

  emit("log", `Landing page wygenerowana (${(html.length / 1024).toFixed(0)}KB)`);
  emit("step", { step: 6, name: "Generowanie LP", status: "done" });
  return html;
}
