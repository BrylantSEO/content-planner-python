import React, { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { X } from "lucide-react";

const proofCards = [
  {
    badge: "GOOGLE_ORGANIK",
    badgeColor: "bg-[#FFD700] text-black",
    image: "https://qtrypzzcjebvfcihiynt.supabase.co/storage/v1/object/public/base44-prod/public/698c6098ec7dcd639fb19de5/4a58f929f_googleadsdlahoteliw3h.png",
    caption: "Pozycja 2 · Fraza brandowa konkurencji · 3h od publikacji",
    tilt: "rotate(-1deg) translate(-5px, 10px)",
    caseStudy: { before: "Artykuł rankował na poz. 8, zero cytowań AI.", action: "Audyt CQS + restrukturyzacja BLUF i nagłówków H2.", after: "Poz. 2 w organiku i cytowanie w Google AI Overview w 3h od publikacji." },
  },
  {
    badge: "PERPLEXITY_AI",
    badgeColor: "bg-[#ff00ff] text-white",
    image: "https://qtrypzzcjebvfcihiynt.supabase.co/storage/v1/object/public/base44-prod/public/698c6098ec7dcd639fb19de5/0b8a367c6_seodlahotelu-perplexity.png",
    caption: "Cytowany 3× w jednej odpowiedzi AI · Główne źródło",
    tilt: "rotate(1.5deg) translate(10px, -5px)",
    caseStudy: { before: "Artykuł dla klienta hotelowego — dobre pozycje, brak widoczności w AI.", action: "Optymalizacja EAV + zagęszczenie faktów w kluczowych sekcjach.", after: "Cytowany 3× w jednej odpowiedzi Perplexity jako główne źródło." },
  },
  {
    badge: "PERPLEXITY_AI",
    badgeColor: "bg-[#ff00ff] text-white",
    image: "https://qtrypzzcjebvfcihiynt.supabase.co/storage/v1/object/public/base44-prod/public/698c6098ec7dcd639fb19de5/93b5c7c69_reklamanayoutubeporadnik.png",
    caption: "2× w źródłach · Nowy i stary artykuł razem",
    tilt: "rotate(-0.5deg) translate(-15px, -10px)",
    caseStudy: { before: "Stary artykuł tracił ruch, nowy nie startował.", action: "Internal linking + audyt chunków RAG na obu artykułach.", after: "Oba cytowane razem w Perplexity — 2× w źródłach jednej odpowiedzi." },
  },
];

export default function ProofSection({ onCTA }) {
  const [lightbox, setLightbox] = useState(null);

  return (
    <section className="py-24 md:py-32 bg-white text-black relative overflow-hidden" id="arsenal">
      {/* Skewed divider top */}
      <div className="absolute top-0 left-0 w-full h-24 bg-black -skew-y-3 origin-left" />

      <div className="container mx-auto px-4 relative z-10">
        {/* Header */}
        <div className="mb-16 md:mb-24 flex flex-col md:flex-row items-baseline gap-4 border-b-8 border-black pb-4">
          <h2 className="text-6xl md:text-8xl lg:text-9xl font-display uppercase leading-none">ARSENAŁ</h2>
          <span className="text-xl md:text-2xl font-mono font-bold bg-[#ff00ff] text-white px-4">[ DOWODY ]</span>
        </div>

        {/* Cards grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-4">
          {proofCards.map((card, i) => (
            <div
              key={i}
              className="group relative brutalist-border bg-black min-h-[350px] md:min-h-[450px] overflow-hidden scanline cursor-zoom-in"
              style={{ transform: card.tilt }}
              onClick={() => setLightbox(card.image)}
            >
              <img
                src={card.image}
                alt={card.badge}
                className="h-full w-full object-cover opacity-60 group-hover:opacity-100 group-hover:scale-110 transition-all duration-500"
                style={{ filter: "contrast(130%) grayscale(0.3)" }}
              />
              <div className="absolute inset-0 flex flex-col justify-end p-6 bg-gradient-to-t from-black via-black/80 to-transparent">
                <div className={`${card.badgeColor} text-[10px] font-bold px-2 py-0.5 w-fit mb-3 uppercase tracking-wider`}>
                  {card.badge}
                </div>
                <p className="text-white font-mono text-sm md:text-base font-bold leading-relaxed mb-3">{card.caption}</p>
                {card.caseStudy && (
                  <div className="border-t border-white/20 pt-3 mb-3 space-y-1">
                    <p className="text-zinc-400 font-mono text-[10px] leading-snug"><span className="text-zinc-500 font-bold">PRZED:</span> {card.caseStudy.before}</p>
                    <p className="text-zinc-400 font-mono text-[10px] leading-snug"><span className="text-[#FFD700] font-bold">DZIAŁANIE:</span> {card.caseStudy.action}</p>
                    <p className="text-zinc-300 font-mono text-[10px] leading-snug"><span className="text-[#ff00ff] font-bold">PO:</span> {card.caseStudy.after}</p>
                  </div>
                )}
                <div className="flex items-center gap-2 text-[#FFD700] font-mono text-xs font-bold uppercase tracking-wider group-hover:translate-x-1 transition-transform">
                  <span>[</span> KLIKNIJ ABY POWIĘKSZYĆ <span>]</span>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Bottom statement */}
        <div className="mt-16 brutalist-border-yellow bg-black p-6 md:p-8 max-w-3xl mx-auto text-center relative">
          <div className="absolute -top-4 left-4 bg-[#FFD700] text-black px-3 text-xs font-bold uppercase">FRAMEWORK_OUTPUT</div>
          <p className="text-[#FFD700] text-lg md:text-xl font-mono leading-relaxed mt-2">
            &gt; To samo możesz osiągnąć dla swoich klientów.<br />
            &gt; Dokładnie ten framework przekazuję na szkoleniu.
          </p>
          {onCTA && (
            <button
              onClick={onCTA}
              className="mt-6 bg-[#ff00ff] text-white font-mono font-bold text-sm uppercase tracking-widest px-8 py-3 hover:bg-[#FFD700] hover:text-black transition-colors"
            >
              CHCĘ TEN FRAMEWORK →
            </button>
          )}
        </div>
      </div>

      {/* Lightbox */}
      <AnimatePresence>
        {lightbox && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center p-4 cursor-zoom-out"
            onClick={() => setLightbox(null)}
          >
            <div className="absolute inset-0 bg-black/95" />
            <motion.img
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              src={lightbox}
              alt="Screenshot"
              className="relative max-w-[90vw] max-h-[90vh] object-contain border-4 border-white"
              style={{ boxShadow: "12px 12px 0px #ff00ff" }}
            />
            <button
              onClick={() => setLightbox(null)}
              className="absolute top-6 right-6 z-10 bg-[#ff00ff] p-2 hover:bg-[#FFD700] transition-colors"
            >
              <X className="w-6 h-6 text-black" />
            </button>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}