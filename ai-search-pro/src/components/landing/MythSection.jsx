import React from "react";
import { motion } from "framer-motion";
import { MessageSquare, GitBranch } from "lucide-react";

const steps = [
  { num: "01", label: "SERP Analysis", desc: "NodeHub pobiera top 10, PAA, Related Searches" },
  { num: "02", label: "Scraping konkurencji", desc: "Jina/Firecrawl — 20 stron w 8 minut" },
  { num: "03", label: "EAV Extraction", desc: "AI wyciąga fakty z każdej strony, klasyfikuje URR" },
  { num: "04", label: "Supabase check", desc: "Similarity — kanibalizacja? internal links?" },
  { num: "05", label: "Senuto data", desc: "Wolumeny, pytania użytkowników, pozycje DD" },
  { num: "06", label: "Content Brief", desc: "H1/H2/H3 + EAV matrix + checklist copywritera" },
];

export default function MythSection() {
  return (
    <section className="relative py-24 md:py-32 px-4 bg-black overflow-hidden">
      <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-[#ff00ff] rounded-full blur-[300px] opacity-8 pointer-events-none" />

      <div className="max-w-6xl mx-auto relative z-10">

        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mb-16"
        >
          <div className="flex flex-col md:flex-row items-baseline gap-4 border-b-8 border-white pb-4">
            <h2 className="text-5xl md:text-7xl lg:text-8xl font-display uppercase leading-none text-white">
              TO NIE JEST
            </h2>
            <span className="text-5xl md:text-7xl lg:text-8xl font-display uppercase leading-none text-[#ff00ff]">
              JEDEN PROMPT.
            </span>
          </div>
          <p className="font-mono text-zinc-400 text-sm mt-4">
            &gt; Nie zrobisz profesjonalnego SEO w ChatGPT. Przynajmniej nie takiego, które naprawdę działa.
          </p>
        </motion.div>

        {/* Two columns — ChatGPT vs Pipeline */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-16">

          {/* ChatGPT */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="border-4 border-zinc-700 bg-zinc-950 p-6 relative"
          >
            <div className="absolute -top-3 left-4 bg-zinc-700 text-white px-3 py-0.5 text-xs font-bold uppercase tracking-widest">
              ChatGPT
            </div>
            <div className="flex items-center gap-3 mb-6 mt-2">
              <MessageSquare className="w-6 h-6 text-zinc-500" />
              <span className="font-display text-2xl uppercase text-zinc-500">30 SEKUND</span>
            </div>

            <p className="font-mono text-sm text-zinc-500 leading-relaxed mb-6">
              &gt; "Napisz mi content brief o remarketingu YouTube."
            </p>

            <ul className="space-y-3 font-mono text-sm text-zinc-600">
              {[
                "Ogólne wskazówki bez danych",
                "Zero analizy konkurencji",
                "Brak sprawdzenia kanibalizacji",
                "Nagłówki z głowy, nie z SERP",
                "Copywriter i tak musi myśleć",
              ].map((item, i) => (
                <li key={i} className="flex items-start gap-2">
                  <span className="text-red-800 mt-0.5">✕</span>
                  <span className="line-through decoration-zinc-700">{item}</span>
                </li>
              ))}
            </ul>

            <div className="mt-6 border-t border-zinc-800 pt-4">
              <p className="font-mono text-xs text-zinc-600 italic">
                Szybko. Ale copywriter i tak musi wiedzieć co pisać.
              </p>
            </div>
          </motion.div>

          {/* Pipeline */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="border-4 border-[#FFD700] bg-black p-6 relative"
            style={{ boxShadow: "6px 6px 0px #ff00ff" }}
          >
            <div className="absolute -top-3 left-4 bg-[#FFD700] text-black px-3 py-0.5 text-xs font-bold uppercase tracking-widest">
              Semantic-OS Pipeline
            </div>
            <div className="flex items-center gap-3 mb-6 mt-2">
              <GitBranch className="w-6 h-6 text-[#FFD700]" />
              <span className="font-display text-2xl uppercase text-[#FFD700]">10 MINUT</span>
            </div>

            <p className="font-mono text-sm text-zinc-400 leading-relaxed mb-6">
              &gt; 6-etapowy pipeline. Każdy etap robi AI — Ty tylko weryfikujesz wynik.
            </p>

            <ul className="space-y-3 font-mono text-sm">
              {[
                "Top 10 SERP przeanalizowane",
                "20 stron konkurencji zescrapowane",
                "EAV matrix z faktów, nie z domysłów",
                "Kanibalizacja sprawdzona w Supabase",
                "H2 z pytań użytkowników (Senuto)",
              ].map((item, i) => (
                <li key={i} className="flex items-start gap-2 text-white">
                  <span className="text-[#FFD700] mt-0.5">✓</span>
                  {item}
                </li>
              ))}
            </ul>

            <div className="mt-6 border-t border-zinc-800 pt-4">
              <p className="font-mono text-xs text-[#FFD700] font-bold italic">
                Nawet najgorszy copywriter tego nie zepsuje.
              </p>
            </div>
          </motion.div>
        </div>

        {/* Pipeline steps visualization */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mb-16"
        >
          <div className="font-mono text-[10px] uppercase tracking-widest text-zinc-500 mb-6">
            // 6 ETAPÓW KTÓRE ROBI AI — ZANIM NAPISZE PIERWSZE SŁOWO BRIEFU
          </div>

          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-0 border-4 border-white"
            style={{ boxShadow: "5px 5px 0px #FFD700" }}
          >
            {steps.map((step, i) => (
              <div
                key={i}
                className={`p-4 border-r-2 border-white/20 last:border-r-0 ${i % 2 === 0 ? "bg-zinc-950" : "bg-black"}`}
              >
                <div className="font-display text-3xl mb-2 leading-none"
                  style={{ color: i % 2 === 0 ? "#ff00ff" : "#FFD700" }}
                >
                  {step.num}
                </div>
                <div className="font-display text-xs uppercase text-white mb-1">{step.label}</div>
                <p className="font-mono text-[10px] text-zinc-500 leading-relaxed">{step.desc}</p>
              </div>
            ))}
          </div>
        </motion.div>

        {/* Punchline callout */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="border-4 border-[#ff00ff] bg-black p-6 md:p-8 relative"
          style={{ boxShadow: "8px 8px 0px #FFD700" }}
        >
          <div className="absolute -top-4 left-4 bg-[#ff00ff] text-white px-3 py-0.5 text-xs font-bold uppercase tracking-widest">
            SEDNO
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
            <div>
              <p className="font-display text-2xl md:text-3xl uppercase text-white leading-tight mb-4">
                AI może diametralnie poprawić Twoje SEO.
              </p>
              <p className="font-display text-2xl md:text-3xl uppercase leading-tight"
                style={{ WebkitTextStroke: "2px #ff00ff", color: "transparent" }}
              >
                Ale musisz wiedzieć jak nim zarządzać.
              </p>
            </div>
            <div className="space-y-4 font-mono text-sm text-zinc-300 leading-relaxed">
              <p>
                &gt; Tak, możesz poprosić ChatGPT o content brief. Dostaniesz go w 30 sekund.
                <span className="text-zinc-600"> I tyle będzie wart.</span>
              </p>
              <p>
                &gt; Moje briefy powstają w <span className="text-[#FFD700] font-bold">10 minut</span>.
                Ale są efektem 6-etapowego procesu w którym AI przeanalizowało
                dziesiątki stron, baz danych i zapytań zanim napisało pierwsze słowo.
              </p>
              <p className="text-white font-bold">
                &gt; Na szkoleniu nauczysz się zarządzać tym procesem —
                nie wpisywać promptów, ale orchestrować pipeline.
              </p>
            </div>
          </div>
        </motion.div>

      </div>
    </section>
  );
}
