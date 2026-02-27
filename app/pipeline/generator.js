/**
 * Step 5: Generate CRO-aware offer (markdown)
 * Step 6: Generate HTML landing page
 */
import { callLLM } from "./llm.js";

export async function generateOffer(domain, siteIntel, senutoData, competitors, opportunities, contentAudit, emit) {
  emit("step", { step: 5, name: "Generowanie oferty", status: "running" });

  const today = new Date().toISOString().split("T")[0];

  // Build pre-made markdown tables from real data
  const quickWinsTable = opportunities?.tables?.quick_wins_md || "_Brak danych_";
  const competitorGapsTable = opportunities?.tables?.competitor_gaps_md || "_Brak danych_";
  const decliningTable = opportunities?.tables?.declining_md || "_Brak danych_";
  const missedTable = opportunities?.tables?.missed_high_volume_md || "_Brak danych_";
  const summary = opportunities?.summary || {};

  const prompt = `Jesteś senior SEO consultantem w Double Digital. Piszesz ofertę cold outreach dla ${domain}.

## ZASADY BEZWZGLĘDNE:
1. ZAUFANIE PRZED DANYMI — 2-3 zdania o DD zanim pokażesz liczby
2. EMOCJA → LOGIKA → CTA — problem który boli → dowód → jeden krok
3. JĘZYK WŁAŚCICIELA FIRMY — ZAKAZANE: "kanibalizacja", "KD", "widoczność Senuto", "EEAT", "anchor text", "crawl budget", "BLUF", "domain rank", "visibility score". UŻYWAJ: "pozycja w Google", "ruch na stronie", "klienci z Google", "wyszukiwań miesięcznie"
4. TABELE = ŚWIĘTE — poniższe tabele wstawiasz BEZ ZMIAN, dosłownie. Nie przerabiaj ich w prozę. Dodaj tylko 1-2 zdania komentarza nad każdą tabelą tłumaczące co to znaczy dla biznesu
5. DOWÓD > OBIETNICA — anonimowy case study
6. TYLKO P1 — pierwsze 30 dni
7. NISKI PRÓG CTA — odpowiedź na maila, "bez zobowiązań"

## DANE BIZNESOWE:
- Firma: ${siteIntel.ce || domain}
- Branża: ${siteIntel.sc || "Unknown"}
- Model: ${siteIntel.business_model || "Unknown"}
- Usługi: ${JSON.stringify(siteIntel.services || [])}

## METRYKI:
- Fraz w top 3: ${senutoData?.snapshot?.top3?.current || "N/A"}
- Fraz w top 10: ${senutoData?.snapshot?.top10?.current || "N/A"}
- Fraz w top 50: ${senutoData?.snapshot?.top50?.current || "N/A"}
- Trend 12 mies.: ${senutoData?.trend || "unknown"}
- Ekwiwalent reklam: ${senutoData?.snapshot?.ads_equivalent || "N/A"} PLN/mies.

## TABELA 1: Frazy o krok od pierwszej strony Google
${summary.quick_win_count || 0} fraz na pozycjach 11-20 (łącznie ${summary.quick_win_total_volume || 0} wyszukiwań/mies.)
Wystarczy je przesunąć o kilka pozycji, żeby zaczęły generować ruch.

${quickWinsTable}

## TABELA 2: Frazy na których zarabia konkurencja, a Ty nie
${summary.competitor_gap_count || 0} fraz gdzie ${competitors?.visibility_gap?.leader_domain || "konkurent"} jest w top 10, a ${domain} w ogóle się nie pojawia.

${competitorGapsTable}

## TABELA 3: Frazy które tracą pozycje
Pozycje spadające — wymagają interwencji zanim ruch spadnie dalej.

${decliningTable}

## TABELA 4: Ważne frazy z dalekimi pozycjami (>20)
Duży wolumen wyszukiwań, ale strona jest zbyt daleko żeby ktokolwiek ją znalazł.

${missedTable}

## DODATKOWE DANE:
- Konkurenci: ${JSON.stringify(competitors?.competitors?.slice(0, 3)?.map((c) => ({ domena: c.domain, wspólne_frazy: c.common_keywords })) || [])}
- Content audit: ${contentAudit?.content_maturity || "unknown"} maturity
${contentAudit?.patterns?.length ? `- Wzorce: ${contentAudit.patterns.join("; ")}` : ""}
${opportunities?.serp_intelligence?.length ? `- PAA z Google: ${JSON.stringify(opportunities.serp_intelligence.slice(0, 2))}` : ""}

## STRUKTURA DOKUMENTU:

# [Domain] — Analiza SEO od Double Digital
> [Headline zorientowany na wynik biznesowy, nie SEO jargon]
**Double Digital** · ${today} · Dane: Senuto, Google SERP

---
## Skąd ta analiza i dlaczego Ty?
[2-3 zdania budujące zaufanie — DD, doświadczenie, dlaczego akurat ta firma]

---
## 3 rzeczy, które musisz wiedzieć
### ❗ [Discovery 1 — problem z konkretnymi liczbami z tabel]
### ⚠️ [Discovery 2 — competitor gap z konkretnymi frazami]
### 💡 [Discovery 3 — szansa z quick wins]

---
## Frazy o krok od pierwszej strony Google
[1-2 zdania wyjaśnienia w języku biznesowym + WKLEJ TABELĘ 1 BEZ ZMIAN]

---
## Na te frazy zarabia Twoja konkurencja
[1-2 zdania context + WKLEJ TABELĘ 2 BEZ ZMIAN]

---
## Frazy które tracą pozycje
[1 zdanie context + WKLEJ TABELĘ 3 BEZ ZMIAN, albo pomiń sekcję jeśli tabela pusta]

---
## Ważne frazy z dalekimi pozycjami
[1 zdanie context + WKLEJ TABELĘ 4 BEZ ZMIAN]

---
## Jak to naprawiliśmy u podobnej firmy
[Anonimowy case study w branży zbliżonej — konkretne liczby]

---
## Co zrobimy w pierwszych 30 dniach
[P1: 4 konkretne akcje z timeline]

---
## Pytania które zazwyczaj się pojawiają
[FAQ: koszt, czas, konkurencja — 3-4 pytania]

---
## Następny krok
[CTA: "Odpowiedz na tego maila..." — niski próg, bez zobowiązań]
→ kontakt@double-digital.pl · double-digital.pl

Napisz KOMPLETNĄ ofertę po polsku. Tabele wklejaj dosłownie z markdown. Komentarze do tabel pisz językiem właściciela firmy.`;

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
