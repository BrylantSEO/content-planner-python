import React from "react";
import { motion } from "framer-motion";
import { FileText, Flame, Globe, Search, Database, Cpu, Terminal } from "lucide-react";

const tools = [
  {
    icon: FileText,
    name: "Jina Reader",
    desc: "Pobiera dowolną stronę jako czysty markdown — bez reklam, JS, cookies. To co widzi AI.",
    category: "SCRAPING",
    color: "#ff00ff",
  },
  {
    icon: Flame,
    name: "Firecrawl",
    desc: "Crawluje całe domeny konkurencji masowo. 50 podstron w 2 minuty.",
    category: "SCRAPING",
    color: "#ff00ff",
  },
  {
    icon: Globe,
    name: "Crawl4AI",
    desc: "Open-source crawler zoptymalizowany pod LLM — strukturyzuje dane natychmiast.",
    category: "SCRAPING",
    color: "#ff00ff",
  },
  {
    icon: Search,
    name: "NodeHub",
    desc: "SERP API — top 10 Google, PAA, Related Searches dla dowolnej frazy w sekundach.",
    category: "SERP DATA",
    color: "#FFD700",
  },
  {
    icon: Database,
    name: "Supabase",
    desc: "Baza wektorowa (pgvector) do embeddingów — Twoje artykuły jako przestrzeń semantyczna.",
    category: "DATABASE",
    color: "#FFD700",
  },
  {
    icon: Cpu,
    name: "OpenRouter",
    desc: "Jeden klucz API do 50+ modeli LLM. GPT-4o, Claude, Gemini — wybierasz co jest tańsze.",
    category: "LLM",
    color: "white",
  },
  {
    icon: Terminal,
    name: "Claude Code",
    desc: "Środowisko w którym żyje cały framework Semantic-OS. Skills, agenty, pipeline.",
    category: "FRAMEWORK",
    color: "white",
  },
];

const pipelineSteps = [
  {
    num: "01",
    title: "SCRAPING",
    tools: "Jina + Firecrawl",
    metric: "20 stron / 8 min",
    color: "#ff00ff",
  },
  {
    num: "02",
    title: "EKSTRAKCJA",
    tools: "EAV + URR gaps",
    metric: "competitor gaps",
    color: "#FFD700",
  },
  {
    num: "03",
    title: "CONTENT BRIEF",
    tools: "H1/H2/H3 + matrix",
    metric: "gotowy dla copywritera",
    color: "#ff00ff",
  },
  {
    num: "04",
    title: "PISANIE",
    tools: "Information gain",
    metric: "humanizacja AI",
    color: "#FFD700",
  },
];

const BRIEF_PREVIEW = `# Content Brief: Remarketing YouTube Ads
Pipeline: topic-researcher → competitor-gap-analyzer → content-brief-generator
CE: Remarketing YouTube Ads | SC: Double Digital (Google Partner)
CSI: Właściciele e-commerce i marketerzy B2B chcą skonfigurować
remarketing YouTube Ads, aby odzyskać użytkowników i zwiększyć ROAS

---

## 1. CSI & Fundamenty

| Element       | Wartość                                              |
|---------------|------------------------------------------------------|
| CE            | Remarketing YouTube Ads                              |
| SC            | Double Digital — polska agencja (Google Partner)     |
| CSI           | skonfigurować, uruchomić, segmentować, optymalizować |
| Canonical     | remarketing YouTube Ads                              |
| Secondary     | jak ustawić remarketing YouTube, listy remark...     |

## Ramka semantyczna CORE

| Element         | Sub-query                                    | P  |
|-----------------|----------------------------------------------|----|
| Agent           | kto powinien używać remarketingu YouTube     | P1 |
| Instrument      | jak skonfigurować w Google Ads               | P1 |
| Purpose         | po co stosować remarketing wideo             | P1 |
| Result          | wyższy ROAS, niższy CPV                      | P1 |
| Manner          | segmentacja, personalizacja, frequency cap   | P1 |

---

## Analiza istniejących treści DD (Supabase similarity)

| URL                               | Similarity | Rekomendacja           |
|-----------------------------------|------------|------------------------|
| /blog/cele-kampanii-meta-ads/     | 0.75       | internal link (wideo)  |
| /blog/meta-conversions-api-capi/  | 0.75       | internal link          |
| /blog/najwazniejsze-metryki-.../  | 0.74       | internal link          |

Wniosek: brak kanibalizacji (similarity < 0.80). Artykuł wypełnia lukę
w katalogu DD — żaden wpis nie pokrywa YT remarketingu.

---

## Dane Senuto

| Fraza                      | Vol | Uwagi                        |
|----------------------------|-----|------------------------------|
| remarketing youtube        |   7 | Primary keyword              |
| youtube remarketing        |   7 | Synonim                      |
| ads for youtube            | 590 | DD poz. 13 — internal link   |
| kampania youtube           |  40 | DD poz. 19 — internal link   |

DD nie rankuje na "remarketing youtube" → GAP P1.

---

## 2. EAV Matrix & Klasyfikacja URR
N=8 konkurentów. ROOT ≥ 5/8 | RARE 3-4/8 | UNIQUE ≤ 2/8

| #  | Atrybut                           | URR    | Pokrycie  |
|----|-----------------------------------|--------|-----------|
|  1 | Definicja remarketingu YouTube    | ROOT   | 7/8       |
|  2 | Mechanizm działania (listy)       | ROOT   | 6/8       |
|  3 | Typy list remarketingowych        | ROOT   | 5/8       |
|  4 | Konfiguracja krok po kroku        | ROOT   | 5/8       |
|  5 | Formaty reklam (In-Stream, Bump.) | ROOT   | 4/8       |
|  6 | Segmentacja list                  | ROOT   | 4/8       |
|  7 | Membership duration (540 dni)     | ROOT   | 4/8       |
|  8 | Korzyści / zalety                 | ROOT   | 5/8       |
| 10 | Frequency capping                 | RARE   | 2/8       |
| 11 | Wymagania techniczne (11 sek.)    | RARE   | 2/8       |
| 13 | Lejek remarketingowy (sekwencja)  | UNIQUE | 1/8       |
| 17 | ROAS / wyniki e-commerce          | UNIQUE | 0/8 ★ GAP |

---

## 3. Content Gaps — Priorytety

### P1 — Krytyczne

| Gap                       | URR    | Pokr. | Akcja                              |
|---------------------------|--------|-------|------------------------------------|
| Definicja rem. YouTube    | ROOT   | 7/8   | H2 "Czym jest remarketing YouTube" |
| Mechanizm + listy         | ROOT   | 6/8   | H2 "Jak działa remarketing"        |
| Konfiguracja step-by-step | ROOT   | 5/8   | H2 "Jak ustawić — krok po kroku"   |
| ROAS / wyniki e-commerce  | UNIQUE | 0/8   | ★ WYRÓŻNIK DD — brak u konkurencji |

### P2 — Wysokie

| Gap                        | URR  | Pokr. | Akcja                   |
|----------------------------|------|-------|-------------------------|
| Formaty (In-Stream, Bumper)| ROOT | 4/8   | H2 z H3 per format      |
| Segmentacja list           | ROOT | 4/8   | H3 w "Typy list"        |
| Membership duration        | ROOT | 4/8   | H3                      |`;

export default function ToolsSection({ onCTA }) {
  return (
    <section className="relative py-24 md:py-32 bg-black overflow-hidden">
      {/* Glow */}
      <div className="absolute top-0 left-0 w-[600px] h-[600px] bg-[#ff00ff] rounded-full blur-[300px] opacity-8 pointer-events-none" />
      <div className="absolute bottom-0 right-0 w-[400px] h-[400px] bg-[#FFD700] rounded-full blur-[250px] opacity-5 pointer-events-none" />

      <div className="max-w-6xl mx-auto px-4 relative z-10">

        {/* Block 1 — Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mb-6"
        >
          <div className="flex flex-col md:flex-row items-baseline gap-4 border-b-8 border-white pb-4">
            <h2 className="text-5xl md:text-7xl lg:text-8xl font-display uppercase leading-none text-white">
              TWÓJ ARSENAŁ
            </h2>
            <span className="text-lg font-mono font-bold bg-[#ff00ff] text-white px-4">[ SEO × AI ]</span>
          </div>
        </motion.div>

        {/* Claim */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="mb-16 max-w-3xl"
        >
          <div className="border-l-4 border-[#ff00ff] pl-4 space-y-1">
            <p className="font-mono text-sm md:text-base text-zinc-300 leading-relaxed">
              &gt; To nie jest kurs "optymalizacji pod AI".
            </p>
            <p className="font-mono text-sm md:text-base text-white font-bold leading-relaxed">
              &gt; To jest kurs jak używać AI żeby robić SEO szybciej i lepiej niż konkurencja.
            </p>
            <p className="font-mono text-sm md:text-base leading-relaxed">
              &gt; Analiza 20 stron konkurencji:{" "}
              <span className="line-through text-zinc-500">4h</span>{" "}
              <span className="text-[#FFD700] font-bold">→ 8 minut.</span>
            </p>
          </div>
        </motion.div>

        {/* Block 2 — Tools grid */}
        <div className="grid grid-cols-2 lg:grid-cols-3 gap-4 mb-20">
          {tools.map((tool, i) => {
            const Icon = tool.icon;
            const isLast = i === tools.length - 1;
            return (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.07 }}
                className={`border-4 border-white bg-black p-5 relative group ${isLast ? "col-span-2 lg:col-span-1 lg:col-start-2" : ""}`}
                style={{ boxShadow: `5px 5px 0px ${tool.color}` }}
              >
                {/* Category badge */}
                <div
                  className="absolute -top-3 -right-2 px-2 py-0.5 text-[9px] font-bold uppercase tracking-widest"
                  style={{
                    backgroundColor: tool.color,
                    color: tool.color === "white" || tool.color === "#FFD700" ? "black" : "white",
                  }}
                >
                  {tool.category}
                </div>

                {/* Icon */}
                <div
                  className="w-10 h-10 border-2 border-white flex items-center justify-center mb-3 group-hover:scale-110 transition-transform"
                  style={{ boxShadow: `2px 2px 0px ${tool.color}` }}
                >
                  <Icon className="w-4 h-4" style={{ color: tool.color }} />
                </div>

                <div className="font-display text-lg md:text-xl uppercase mb-1" style={{ color: tool.color }}>
                  {tool.name}
                </div>
                <p className="font-mono text-xs text-zinc-400 leading-relaxed">{tool.desc}</p>
              </motion.div>
            );
          })}
        </div>

        {/* Block 3 — Pipeline */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mb-10"
        >
          <div className="font-mono text-[10px] uppercase tracking-widest text-zinc-500 mb-6">
            // CAŁY PROCES W 4 KROKACH
          </div>

          {/* Steps — horizontal on desktop, vertical on mobile */}
          <div className="flex flex-col md:flex-row gap-0 md:gap-0">
            {pipelineSteps.map((step, i) => (
              <React.Fragment key={i}>
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.1 }}
                  className="flex-1 border-4 border-white bg-black p-5 relative"
                  style={{ boxShadow: `4px 4px 0px ${step.color}` }}
                >
                  <div className="font-display text-4xl md:text-5xl mb-2 leading-none" style={{ color: step.color }}>
                    {step.num}
                  </div>
                  <div className="font-display text-base md:text-lg uppercase text-white mb-1">{step.title}</div>
                  <div className="font-mono text-xs text-zinc-400 mb-2">{step.tools}</div>
                  <div
                    className="font-mono text-[10px] uppercase tracking-wider px-2 py-0.5 inline-block"
                    style={{ backgroundColor: step.color, color: step.color === "#FFD700" ? "black" : "white" }}
                  >
                    {step.metric}
                  </div>
                </motion.div>

                {/* Arrow between steps */}
                {i < pipelineSteps.length - 1 && (
                  <div className="flex items-center justify-center md:-mx-0 my-0">
                    <div className="hidden md:block text-zinc-600 text-2xl font-mono px-1">→</div>
                    <div className="md:hidden text-zinc-600 text-xl font-mono py-1">↓</div>
                  </div>
                )}
              </React.Fragment>
            ))}
          </div>
        </motion.div>

        {/* Brief teaser */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="border-4 border-[#FFD700] bg-black relative"
          style={{ boxShadow: "8px 8px 0px #ff00ff" }}
        >
          {/* Badge */}
          <div className="absolute -top-4 left-4 bg-[#FFD700] text-black px-3 py-0.5 text-xs font-bold uppercase tracking-widest">
            LIVE_EXAMPLE
          </div>
          <div className="absolute -top-4 right-4 bg-[#ff00ff] text-white px-3 py-0.5 text-xs font-bold uppercase tracking-widest">
            PRZYKŁADOWY CONTENT BRIEF
          </div>

          {/* Brief content — scrollable */}
          <div className="overflow-y-auto" style={{ maxHeight: "280px" }}>
            <pre className="font-mono text-xs text-zinc-300 leading-relaxed p-6 whitespace-pre-wrap">
              {BRIEF_PREVIEW}
            </pre>
          </div>

          {/* Quote + CTAs */}
          <div className="px-6 pb-6 pt-4 border-t-2 border-zinc-800">
            <p className="font-mono text-xs md:text-sm text-zinc-400 leading-relaxed italic mb-6 border-l-4 border-[#FFD700] pl-4">
              "Nauczę Cię robić content briefy które praktycznie same się pozycjonują!
              Nie rozumiesz co się w nich dzieje? Po szkoleniu będziesz ekspertem od semantycznego SEO."
            </p>
            <div className="flex flex-col sm:flex-row gap-4 items-center justify-center">
              <a
                href="/brief-remarketing-youtube-ads.md"
                download="brief-remarketing-youtube-ads.md"
                className="font-display text-sm uppercase border-4 border-[#FFD700] text-[#FFD700] px-6 py-3 hover:bg-[#FFD700] hover:text-black transition-colors flex items-center gap-2"
                style={{ boxShadow: "3px 3px 0px #ff00ff" }}
              >
                ↓ POBIERZ PRZYKŁADOWY BRIEF
              </a>
              <button
                onClick={onCTA}
                className="font-display text-lg uppercase bg-[#FFD700] text-black px-10 py-3 hover:bg-white transition-colors border-4 border-black"
                style={{ boxShadow: "4px 4px 0px #ff00ff" }}
              >
                ZAPISZ SIĘ →
              </button>
            </div>
          </div>
        </motion.div>

      </div>
    </section>
  );
}
