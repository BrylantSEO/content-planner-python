import React from "react";
import { motion } from "framer-motion";

const testimonials = [
  {
    quote: "Po audycie jednego artykułu klient dostał cytowanie w Google AI Overview następnego dnia. Teraz audytuję każdy artykuł przed publikacją — to stało się częścią mojego procesu.",
    name: "Anna K.",
    role: "Senior SEO Specialist",
    tilt: "rotate(-1deg) translate(-5px, 5px)",
    accentColor: "#ff00ff",
  },
  {
    quote: "Wróciłem ze szkolenia, zrobiłem brief dla klienta w 35 minut i wysłałem go tego samego wieczoru. Wcześniej brief zajmował mi pół dnia. Framework działa.",
    name: "Tomasz W.",
    role: "Freelance SEO Consultant",
    tilt: "rotate(1deg) translate(8px, -5px)",
    accentColor: "#FFD700",
  },
  {
    quote: "Pokazałem klientowi screenshot z Perplexity gdzie jego artykuł jest cytowany jako główne źródło. Kontrakt przedłużony bez negocjacji. Semantic-OS to najlepsza inwestycja w tym roku.",
    name: "Marta S.",
    role: "Head of Content · Agencja SEO",
    tilt: "rotate(-0.5deg) translate(-10px, -8px)",
    accentColor: "#ff00ff",
  },
];

export default function TestimonialsSection({ onCTA }) {
  return (
    <section className="relative py-24 md:py-32 bg-black overflow-hidden">
      <div className="max-w-6xl mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mb-16 flex flex-col md:flex-row items-baseline gap-4 border-b-8 border-white pb-4"
        >
          <h2 className="text-5xl md:text-7xl lg:text-8xl font-display uppercase leading-none text-white">UCZESTNICY</h2>
          <span className="text-lg font-mono font-bold bg-[#ff00ff] text-white px-4">[ MÓWIĄ ]</span>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-4">
          {testimonials.map((t, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              className="border-4 border-white bg-black p-6 relative"
              style={{ transform: t.tilt, boxShadow: `6px 6px 0px ${t.accentColor}` }}
            >
              <div className="text-5xl font-display leading-none mb-4" style={{ color: t.accentColor }}>"</div>
              <p className="text-zinc-300 font-mono text-sm leading-relaxed mb-6">
                {t.quote}
              </p>
              <div className="border-t-2 border-white/20 pt-4">
                <div className="font-bold text-white font-mono text-sm">— {t.name}</div>
                <div className="text-xs uppercase tracking-widest mt-1" style={{ color: t.accentColor }}>{t.role}</div>
              </div>
            </motion.div>
          ))}
        </div>

        {onCTA && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="mt-16 border-4 border-white p-6 md:p-8 max-w-2xl mx-auto text-center"
            style={{ boxShadow: "8px 8px 0px #ff00ff" }}
          >
            <p className="font-mono text-sm text-zinc-400 uppercase tracking-widest mb-2">
              Max. 8 osób. Następna edycja: 15–16 marca 2026, Warszawa.
            </p>
            <button
              onClick={onCTA}
              className="mt-4 bg-white text-black font-mono font-bold text-sm uppercase tracking-widest px-8 py-3 hover:bg-[#ff00ff] hover:text-white transition-colors"
            >
              REZERWUJĘ MIEJSCE →
            </button>
          </motion.div>
        )}
      </div>
    </section>
  );
}
