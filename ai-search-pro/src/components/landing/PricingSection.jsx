import React from "react";
import { motion } from "framer-motion";
import { Check, ArrowRight } from "lucide-react";
import useDynamicCTA from "./useDynamicCTA";

const day1Features = [
  "audit.md dla artykułu Twojego klienta",
  "brief.md gotowy dla copywritera",
  "Karta projektu CE/SC/CSI",
  "Materiały drukowane A5",
  "Max. 8 osób na sali",
];

const day2Features = [
  "Wszystko z Dnia 1",
  "Topical Map gotowa dla klienta",
  "Własny skill AI w 10 minut",
  "Plan 90 dni (wydruk A4)",
  "10 min sesja 1:1 z trenerem",
  "Max. 8 osób na sali",
];

export default function PricingSection({ onCTA }) {
  const cta = useDynamicCTA("pricing");
  return (
    <section className="relative py-24 md:py-32 bg-[#ff00ff] text-white overflow-hidden" id="pricing">
      {/* Skewed divider */}
      <div className="absolute top-0 left-0 w-full h-16 bg-black -skew-y-2 origin-left" />

      {/* Ghost text */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-[8rem] md:text-[16rem] font-display opacity-10 select-none pointer-events-none leading-none whitespace-nowrap">
        NOW
      </div>

      <div className="relative max-w-5xl mx-auto px-4 z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-5xl md:text-7xl lg:text-8xl font-display uppercase leading-[0.85]">
            PRZEJMIJ<br />SYSTEM
          </h2>
        </motion.div>

        {/* ROI highlight */}
        <div className="max-w-4xl mx-auto mb-10 border-4 border-white bg-black p-6 relative" style={{ boxShadow: "6px 6px 0px #FFD700" }}>
          <div className="absolute -top-4 -left-4 bg-[#FFD700] text-black px-3 py-1 text-xs font-bold uppercase">ZWROT Z INWESTYCJI</div>
          <div className="grid md:grid-cols-3 gap-4 text-center pt-2">
            <div>
              <div className="text-2xl font-display text-[#FFD700]">500–1500 ZŁ</div>
              <div className="text-xs font-mono text-zinc-400 mt-1">jeden brief contentowy</div>
            </div>
            <div>
              <div className="text-2xl font-display text-white">30 MIN</div>
              <div className="text-xs font-mono text-zinc-400 mt-1">zamiast 3h po szkoleniu</div>
            </div>
            <div>
              <div className="text-2xl font-display text-[#ff00ff]">TYDZIEŃ 1</div>
              <div className="text-xs font-mono text-zinc-400 mt-1">zwrot przy 2 briefach/tydzień</div>
            </div>
          </div>
        </div>

        <div className="grid md:grid-cols-2 gap-6 max-w-4xl mx-auto">
          {/* Day 1 */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="border-4 border-white bg-black p-6 md:p-8 relative"
            style={{ boxShadow: "8px 8px 0px #FFD700" }}
          >
            <div className="absolute -top-4 -right-4 bg-white text-black px-2 text-xs font-bold uppercase">DAY_01</div>

            <h3 className="text-3xl md:text-4xl font-display uppercase mb-4 text-[#FFD700]">DZIEŃ 1</h3>
            <div className="text-4xl md:text-5xl font-display text-white mb-1">1 499 ZŁ</div>
            <div className="text-zinc-500 font-mono text-xs mb-6">NETTO</div>

            <div className="space-y-3 mb-8">
              {day1Features.map((item, i) => (
                <div key={i} className="flex items-start gap-3">
                  <Check className="w-5 h-5 text-[#FFD700] mt-0.5 shrink-0" />
                  <span className="text-zinc-300 font-mono text-sm">{item}</span>
                </div>
              ))}
            </div>

            <button
              onClick={onCTA}
              className="w-full py-4 border-4 border-white text-white font-display text-2xl uppercase hover:bg-white hover:text-black transition-all flex items-center justify-center gap-2 group"
            >
              {cta.text}
              <ArrowRight className="w-5 h-5 group-hover:translate-x-2 transition-transform" />
            </button>
          </motion.div>

          {/* Day 2 — highlighted */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="border-4 border-[#FFD700] bg-black p-6 md:p-8 relative"
            style={{ boxShadow: "8px 8px 0px white" }}
          >
            <div className="absolute -top-4 -right-4 bg-[#FFD700] text-black px-2 text-xs font-bold uppercase">POLECANE</div>
            <div className="absolute -top-4 -left-4 bg-white text-black px-2 text-xs font-bold uppercase">DAY_02</div>

            <h3 className="text-3xl md:text-4xl font-display uppercase mb-4 text-[#FFD700]">2 DNI</h3>
            <div className="text-4xl md:text-5xl font-display text-[#FFD700] mb-1">2 499 ZŁ</div>
            <div className="flex items-center gap-3 mb-6">
              <span className="text-zinc-500 font-mono text-xs">NETTO</span>
              <span className="text-zinc-500 font-mono text-xs line-through">2 998 zł</span>
            </div>

            <div className="space-y-3 mb-8">
              {day2Features.map((item, i) => (
                <div key={i} className="flex items-start gap-3">
                  <Check className="w-5 h-5 text-[#FFD700] mt-0.5 shrink-0" />
                  <span className="text-zinc-300 font-mono text-sm">{item}</span>
                </div>
              ))}
            </div>

            <button
              onClick={onCTA}
              className="w-full py-4 bg-[#FFD700] text-black font-display text-2xl uppercase hover:bg-white transition-all flex items-center justify-center gap-2 group"
            >
              {cta.text} — 2 DNI
              <ArrowRight className="w-5 h-5 group-hover:translate-x-2 transition-transform" />
            </button>
          </motion.div>
        </div>

        <p className="text-center mt-10 font-mono text-sm text-white/60">
          &gt; Jeden brief contentowy = 500–1500 zł. Zwrot kosztu szkolenia w pierwszym tygodniu.
        </p>
      </div>

      {/* Skewed divider bottom */}
      <div className="absolute bottom-0 left-0 w-full h-16 bg-black skew-y-2 origin-right" />
    </section>
  );
}