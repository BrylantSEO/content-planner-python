import React from "react";
import { motion } from "framer-motion";
import { Linkedin } from "lucide-react";

const credentials = [
  "Head of SEO w Double Digital — agencja performance dla 25+ krajów, Google Partner",
  "Twórca frameworku Semantic-OS — używanego w produkcji dla klientów e-commerce i leadgen B2B",
  "Specjalizacja: AI Search, semantyczne SEO, optymalizacja pod Google AI Overview i Perplexity",
];

export default function TrainerSection() {
  return (
    <section className="relative py-24 md:py-32 bg-white text-black overflow-hidden">
      <div className="absolute top-0 left-0 w-full h-16 bg-black -skew-y-2 origin-left" />

      <div className="max-w-5xl mx-auto px-4 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mb-16 flex flex-col md:flex-row items-baseline gap-4 border-b-8 border-black pb-4"
        >
          <h2 className="text-5xl md:text-7xl font-display uppercase leading-none">TRENER</h2>
          <span className="text-lg font-mono font-bold bg-black text-white px-4">[ KIM JESTEM ]</span>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="border-4 border-black bg-white relative"
          style={{ boxShadow: "10px 10px 0px #ff00ff" }}
        >
          <div className="absolute -top-4 -right-4 bg-[#ff00ff] text-white px-3 py-1 text-xs font-bold uppercase">FRAMEWORK_BY</div>

          <div className="p-6 md:p-10 grid md:grid-cols-[200px_1fr] gap-8 items-start">
            {/* Photo placeholder */}
            <div className="border-4 border-black bg-black aspect-square flex items-center justify-center relative shrink-0"
              style={{ boxShadow: "6px 6px 0px #FFD700" }}
            >
              <span className="font-display text-5xl text-[#FFD700]">MK</span>
              <div className="absolute -bottom-3 -right-3 bg-[#FFD700] px-2 text-xs font-bold text-black uppercase">HEAD_OF_SEO</div>
            </div>

            {/* Info */}
            <div>
              <div className="flex items-center gap-4 mb-2 flex-wrap">
                <h3 className="text-4xl md:text-5xl font-display uppercase">MACIEJ KULKOWSKI</h3>
                <a
                  href="https://linkedin.com/in/maciej-kulkowski-1115a9152"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-1 bg-[#0077B5] text-white px-3 py-1 text-xs font-bold hover:bg-black transition-colors"
                >
                  <Linkedin className="w-3 h-3" />
                  LINKEDIN
                </a>
              </div>
              <div className="font-mono text-sm text-zinc-500 mb-6 uppercase tracking-widest">Head of SEO · Double Digital</div>

              <ul className="space-y-3 mb-6">
                {credentials.map((c, i) => (
                  <li key={i} className="flex items-start gap-3">
                    <span className="font-bold text-[#ff00ff] shrink-0 font-mono">✓</span>
                    <span className="font-mono text-sm leading-relaxed">{c}</span>
                  </li>
                ))}
              </ul>

              <blockquote className="border-l-4 border-[#ff00ff] pl-4 font-mono text-sm leading-relaxed text-zinc-600 italic mb-6">
                "Zbudowałem Semantic-OS bo sam potrzebowałem systemu który działa w świecie AI Search — nie kolejnej teorii o przyszłości SEO."
              </blockquote>

              <div className="border-t-2 border-black/10 pt-6 mb-6">
                <div className="text-[10px] font-bold uppercase tracking-widest text-zinc-400 mb-2">// ORIGIN_STORY</div>
                <p className="font-mono text-sm leading-relaxed text-zinc-700">
                  Zbudowałem ten framework bo sam straciłem setki godzin na manualne audyty dla klientów — przeglądanie arkuszy, ręczne sprawdzanie nagłówków, zgadywanie co Google "lubi" po zmianach algorytmu. Kiedy AI Search zaczął wygrywać ruch z organiku, wiedziałem że potrzebuję systemu — nie kolejnego checklist. Semantic-OS to ten system. Na szkoleniu przekazuję go w całości.
                </p>
              </div>

              <a
                href="#"
                onClick={(e) => { e.preventDefault(); document.querySelector('[data-pricing]')?.scrollIntoView({ behavior: 'smooth' }); }}
                className="inline-block bg-black text-white font-mono font-bold text-sm uppercase tracking-widest px-6 py-3 hover:bg-[#ff00ff] transition-colors"
              >
                ZAPISZ SIĘ NA SZKOLENIE →
              </a>
            </div>
          </div>
        </motion.div>
      </div>

      <div className="absolute bottom-0 left-0 w-full h-16 bg-black skew-y-2 origin-right" />
    </section>
  );
}
