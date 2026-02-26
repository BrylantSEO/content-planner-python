import React from "react";
import { motion } from "framer-motion";
import { Bot, Clock, Zap } from "lucide-react";

export default function KillerFeatureSection() {
  return (
    <section className="relative py-24 md:py-32 px-4 overflow-hidden">
      {/* Glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-[#ff00ff] rounded-full blur-[250px] opacity-10 pointer-events-none" />

      <div className="max-w-6xl mx-auto relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          <div className="brutalist-border bg-black p-8 md:p-14 relative scanline">
            <div className="absolute -top-4 left-4 bg-[#ff00ff] text-white px-3 text-xs font-bold uppercase tracking-wider">
              BONUS_INSTALL
            </div>
            <div className="absolute -top-4 right-4 bg-[#FFD700] text-black px-3 text-xs font-bold uppercase tracking-wider">
              W_CENIE_SZKOLENIA
            </div>

            <div className="text-center relative z-20">
              <h2 className="text-4xl md:text-6xl lg:text-7xl font-display uppercase leading-[0.85] text-white mb-6">
                NIE MUSISZ BYĆ<br />
                <span className="text-[#ff00ff]">PROGRAMISTĄ.</span>
              </h2>

              <p className="text-zinc-400 font-mono text-sm md:text-base max-w-2xl mx-auto leading-relaxed mb-12">
                &gt; Wiedza to jedno, wdrozenie to drugie. W cenie szkolenia otrzymujesz moj autorski skrypt 'Content Auditor' (Python), ktory zrobi za Ciebie ciezka robote.
              </p>

              <div className="flex flex-col sm:flex-row gap-8 justify-center items-center">
                <div className="flex items-center gap-4">
                  <div className="w-16 h-16 border-4 border-white flex items-center justify-center" style={{ boxShadow: "4px 4px 0px #FFD700" }}>
                    <Clock className="w-8 h-8 text-[#FFD700]" />
                  </div>
                  <div className="text-left">
                    <div className="text-3xl md:text-4xl font-display text-[#FFD700]">34 → 71 PKT</div>
                    <div className="text-zinc-500 font-mono text-[10px] uppercase tracking-wider">jakość treści po jednym audycie</div>
                  </div>
                </div>
                <div className="hidden sm:block w-px h-16 bg-white/20" />
                <div className="flex items-center gap-4">
                  <div className="w-16 h-16 border-4 border-white flex items-center justify-center" style={{ boxShadow: "4px 4px 0px #ff00ff" }}>
                    <Zap className="w-8 h-8 text-[#ff00ff]" />
                  </div>
                  <div className="text-left">
                    <div className="text-3xl md:text-4xl font-display text-[#ff00ff]">3 GODZINY</div>
                    <div className="text-zinc-500 font-mono text-[10px] uppercase tracking-wider">od publikacji do AI</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}