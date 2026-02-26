import React from "react";
import { motion } from "framer-motion";
import { TrendingUp, MessageSquare, Trophy, Youtube } from "lucide-react";

const cards = [
  {
    icon: Trophy,
    badge: "OBSŁUGA_META_ADS",
    badgeColor: "bg-[#FFD700] text-black",
    title: "Obsługa Meta Ads",
    results: [
      { label: "POZYCJA ORGANICZNA", value: "#1", color: "#FFD700" },
      { label: "AI OVERVIEW", value: "✓", color: "#ff00ff" },
    ],
    timeline: "Grudzień 2025: praktycznie niewidoczni. Luty 2026: pozycja 1 + AI Overview.",
    accentColor: "#FFD700",
    featured: true,
  },
  {
    icon: Youtube,
    badge: "AGENCJA_YOUTUBE_ADS",
    badgeColor: "bg-[#ff00ff] text-white",
    title: "Agencja YouTube Ads",
    results: [
      { label: "POZYCJA ORGANICZNA", value: "#2", color: "#FFD700" },
      { label: "AI OVERVIEW", value: "CYTOWANY", color: "#ff00ff" },
      { label: "FEATURED PANEL", value: "✓", color: "#FFD700" },
    ],
    screenshot: "https://qtrypzzcjebvfcihiynt.supabase.co/storage/v1/object/public/base44-prod/public/698c6098ec7dcd639fb19de5/agencja-youtube-ads-serp.png",
    timeline: "Cytowani w AI Overview jako źródło + pozycja #2 organiczna + featured panel z zdjęciem — jednocześnie.",
    accentColor: "#ff00ff",
    featured: false,
  },
  {
    icon: TrendingUp,
    badge: "GROWTH_MARKETING",
    badgeColor: "bg-[#ff00ff] text-white",
    title: "Growth Marketing",
    results: [
      { label: "POZYCJA ORGANICZNA", value: "#1", color: "#FFD700" },
    ],
    timeline: "Najtrudniejsza branża — SEO i marketerzy rywalizują o te same frazy.",
    accentColor: "#ff00ff",
    featured: false,
  },
  {
    icon: MessageSquare,
    badge: "METRYKI_META_ADS",
    badgeColor: "bg-[#ff00ff] text-white",
    title: "Metryki Meta Ads",
    results: [
      { label: "PERPLEXITY AI", value: "CYTOWANY", color: "#ff00ff" },
    ],
    timeline: "Cytowany jako główne źródło przez AI — bez płatnej dystrybucji.",
    accentColor: "#ff00ff",
    featured: false,
  },
];

export default function SocialProofSection() {
  return (
    <section className="relative py-24 md:py-32 bg-black px-4">
      <div className="max-w-6xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mb-16 flex flex-col md:flex-row items-baseline gap-4 border-b-8 border-white pb-4"
        >
          <h2 className="text-5xl md:text-7xl lg:text-8xl font-display uppercase leading-none text-white">DOWÓD</h2>
          <span className="text-xl font-mono font-bold bg-[#FFD700] text-black px-4">[ WŁASNA AGENCJA ]</span>
        </motion.div>

        <motion.p
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="font-mono text-zinc-400 text-sm uppercase tracking-widest mb-12 max-w-2xl"
        >
          &gt; Branża marketingowa = najtrudniejszy poligon. Wszyscy SEO-wcy znają SEO. Skoro działa tu — zadziała w każdej niszy.
        </motion.p>

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {cards.map((card, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              className={`border-4 bg-black p-6 relative ${card.featured ? "border-[#FFD700] md:col-span-1" : "border-white"}`}
              style={{ boxShadow: `6px 6px 0px ${card.accentColor}` }}
            >
              {card.featured && (
                <div className="absolute -top-4 left-4 bg-[#FFD700] text-black px-3 text-xs font-bold uppercase">
                  CASE_STUDY_GŁÓWNY
                </div>
              )}

              <div className={`${card.badgeColor} text-[10px] font-bold px-2 py-0.5 w-fit mb-4 uppercase tracking-wider`}>
                {card.badge}
              </div>

              <div className="flex items-center gap-3 mb-5">
                <card.icon className="w-5 h-5 shrink-0" style={{ color: card.accentColor }} />
                <h3 className="font-mono font-bold text-white text-base uppercase tracking-wide">{card.title}</h3>
              </div>

              <div className="space-y-3 mb-5">
                {card.results.map((r, j) => (
                  <div key={j} className="flex items-center justify-between border border-white/10 px-3 py-2">
                    <span className="font-mono text-[10px] uppercase tracking-widest text-zinc-500">{r.label}</span>
                    <span className="font-display text-xl font-bold" style={{ color: r.color }}>{r.value}</span>
                  </div>
                ))}
              </div>

              {card.screenshot && (
                <div className="mb-5 border-2 border-white/20 overflow-hidden">
                  <img
                    src={card.screenshot}
                    alt={card.title}
                    className="w-full object-cover opacity-70 hover:opacity-100 transition-opacity"
                    style={{ filter: "contrast(120%) grayscale(0.2)" }}
                    onError={(e) => { e.target.style.display = "none"; }}
                  />
                </div>
              )}

              {card.featured && (
                <div className="border-t-2 border-[#FFD700]/30 pt-4 mb-4">
                  <div className="font-mono text-[10px] uppercase tracking-widest text-zinc-500 mb-2">// TIMELINE</div>
                  <div className="grid grid-cols-2 gap-2">
                    <div className="border border-white/10 p-2 text-center">
                      <div className="font-mono text-[9px] text-zinc-600 uppercase">GRUDZIEŃ '25</div>
                      <div className="font-display text-lg text-zinc-500">~0</div>
                      <div className="font-mono text-[9px] text-zinc-600">widoczność</div>
                    </div>
                    <div className="border border-[#FFD700] p-2 text-center">
                      <div className="font-mono text-[9px] text-zinc-400 uppercase">LUTY '26</div>
                      <div className="font-display text-lg text-[#FFD700]">#1</div>
                      <div className="font-mono text-[9px] text-zinc-400">+ AI Overview</div>
                    </div>
                  </div>
                </div>
              )}

              <p className="font-mono text-[11px] text-zinc-500 leading-relaxed">{card.timeline}</p>
            </motion.div>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mt-10 border-l-4 border-[#FFD700] pl-6 max-w-2xl"
        >
          <p className="font-mono text-sm text-zinc-300 leading-relaxed">
            <span className="text-[#FFD700] font-bold">&gt; </span>
            "Obsługa Meta Ads" — fraza z bezpośrednią konkurencją największych agencji w Polsce. W grudniu 2025 praktycznie niewidoczni. W lutym 2026: pozycja #1 w organiku i cytowanie w Google AI Overview jednocześnie. Ten sam framework przekazuję na szkoleniu.
          </p>
        </motion.div>
      </div>
    </section>
  );
}
