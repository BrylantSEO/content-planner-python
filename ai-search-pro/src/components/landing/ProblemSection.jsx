import React from "react";
import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";

const transformations = [
  {
    before: "Piszesz 3000 słów i liczysz, że coś trafi w algorytm.",
    after: "Każde zdanie niesie konkretny fakt, który AI może zacytować.",
    metric: null,
  },
  {
    before: "Nie wiesz dlaczego artykuł nie rankuje — robisz kolejne poprawki w ciemno.",
    after: "Wiesz dokładnie które H2 brakuje Ci do top 3 — i co w nim napisać.",
    metric: null,
  },
  {
    before: "Płacisz za linki, bo content sam się nie pozycjonuje.",
    after: "Twój artykuł cytuje Perplexity i Google AI Overview — bez jednego linka.",
    metric: "3h od publikacji",
  },
  {
    before: "Analiza konkurencji zajmuje cały dzień w arkuszu.",
    after: "20 stron konkurencji przeanalizowane. Briefing gotowy.",
    metric: "8 minut",
  },
];

export default function ProblemSection() {
  return (
    <section className="relative py-24 md:py-32 px-4 bg-black">
      <div className="max-w-6xl mx-auto">

        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mb-14"
        >
          <div className="bg-[#FFD700] text-black px-3 py-1 text-xs font-bold uppercase tracking-wider w-fit mb-6">
            SYSTEM_ANALYSIS
          </div>
          <div className="flex flex-col md:flex-row items-baseline gap-4 border-b-8 border-white pb-4">
            <h2 className="text-5xl md:text-7xl lg:text-8xl font-display uppercase leading-none text-white">
              PRZED
            </h2>
            <span className="text-5xl md:text-7xl lg:text-8xl font-display uppercase leading-none text-[#ff00ff]">
              → PO
            </span>
          </div>
          <p className="font-mono text-zinc-400 text-sm mt-4">
            &gt; Tak wygląda Twoja praca z contentem — przed szkoleniem i po.
          </p>
        </motion.div>

        {/* Transformation rows */}
        <div className="space-y-4">
          {transformations.map((t, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.08 }}
              className="grid grid-cols-1 md:grid-cols-[1fr_40px_1fr] gap-0 border-4 border-white"
              style={{ boxShadow: i % 2 === 0 ? "5px 5px 0px #ff00ff" : "5px 5px 0px #FFD700" }}
            >
              {/* Before */}
              <div className="bg-zinc-950 p-5 flex items-start gap-3">
                <span className="text-red-500 font-mono text-lg leading-none mt-0.5 shrink-0">✕</span>
                <p className="font-mono text-sm text-zinc-400 leading-relaxed line-through decoration-red-500/60">
                  {t.before}
                </p>
              </div>

              {/* Arrow */}
              <div className="hidden md:flex items-center justify-center bg-black border-x-4 border-white">
                <ArrowRight className="w-5 h-5 text-white" />
              </div>

              {/* After */}
              <div className="bg-black p-5 flex items-start gap-3">
                <span className="text-[#FFD700] font-mono text-lg leading-none mt-0.5 shrink-0">✓</span>
                <div>
                  <p className="font-mono text-sm text-white font-bold leading-relaxed">
                    {t.after}
                  </p>
                  {t.metric && (
                    <span
                      className="inline-block mt-2 px-2 py-0.5 text-[10px] font-bold uppercase tracking-widest"
                      style={{
                        backgroundColor: i % 2 === 0 ? "#ff00ff" : "#FFD700",
                        color: i % 2 === 0 ? "white" : "black",
                      }}
                    >
                      {t.metric}
                    </span>
                  )}
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Bottom note */}
        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="font-mono text-[10px] uppercase tracking-widest text-zinc-600 mt-8 text-right"
        >
          &gt; stare SEO nie działa w świecie AI Search
        </motion.p>

      </div>
    </section>
  );
}