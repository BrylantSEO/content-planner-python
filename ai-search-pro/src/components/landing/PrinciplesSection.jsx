import React from "react";
import { motion } from "framer-motion";

const principles = [
  "Jeden artykuł audytuj przed poprawką — nie zgaduj, mierz.",
  "Jeden brief przed każdym nowym artykułem — nie pisz bez mapy.",
  "Jeden klaster miesięcznie — topical authority buduje się systematycznie.",
];

export default function PrinciplesSection() {
  return (
    <section className="relative py-24 md:py-32 bg-[#FFD700] text-black overflow-hidden">
      {/* Skewed dividers */}
      <div className="absolute top-0 left-0 w-full h-16 bg-black skew-y-2 origin-right" />
      <div className="absolute bottom-0 left-0 w-full h-16 bg-black -skew-y-2 origin-left" />

      <div className="relative max-w-5xl mx-auto px-4 text-center z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          <h2 className="text-5xl md:text-7xl lg:text-8xl font-display uppercase leading-[0.85] mb-12">
            3 ZASADY
          </h2>

          <div className="space-y-6 mb-12">
            {principles.map((p, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, x: i % 2 === 0 ? -30 : 30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.15 }}
                className="brutalist-border !border-black !shadow-[8px_8px_0px_#ff00ff] bg-white p-4 md:p-6 text-left"
                style={{ transform: `rotate(${i % 2 === 0 ? -0.5 : 0.5}deg)` }}
              >
                <p className="text-lg md:text-2xl font-mono font-bold leading-snug">
                  &gt; "{p}"
                </p>
              </motion.div>
            ))}
          </div>

          <p className="text-black/60 font-mono text-sm uppercase tracking-widest">
            To nie jest rewolucja. To jest systematyczność przez 90 dni.
          </p>
        </motion.div>
      </div>
    </section>
  );
}