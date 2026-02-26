import React from "react";
import { ArrowRight } from "lucide-react";
import useDynamicCTA from "./useDynamicCTA";

export default function HeroSection({ onCTA }) {
  const cta = useDynamicCTA("hero");
  return (
    <section className="relative min-h-screen pt-32 pb-20 flex flex-col justify-center px-4 overflow-hidden">
      {/* Ghost text */}
      <div className="absolute top-20 left-4 md:left-10 text-[6rem] md:text-[10rem] font-display opacity-10 select-none leading-none pointer-events-none">ERROR</div>
      <div className="absolute bottom-20 right-4 md:right-10 text-[6rem] md:text-[10rem] font-display opacity-10 select-none leading-none pointer-events-none">VOID</div>

      {/* Glow blobs */}
      <div className="absolute top-1/2 right-0 w-96 h-96 bg-[#ff00ff] rounded-full blur-[150px] opacity-20 -z-10" />
      <div className="absolute bottom-0 left-1/4 w-[500px] h-[500px] bg-[#FFD700] rounded-full blur-[200px] opacity-10 -z-10" />

      <div className="relative z-20 max-w-6xl mx-auto w-full">
        {/* Status badge */}
        <div className="mb-4 inline-block bg-[#FFD700] text-black px-4 py-1 font-bold text-sm" style={{ transform: "rotate(-1deg) translate(-5px, 10px)" }}>
          STATUS: AI_SEARCH_READY
        </div>

        {/* Main heading */}
        <h1 className="text-5xl sm:text-6xl md:text-8xl lg:text-9xl font-display leading-[0.85] tracking-tighter text-white uppercase italic">
          <span className="block glitch-text">TWÓJ ARTYKUŁ</span>
          <span className="block text-[#ff00ff] ml-6 md:ml-24">W WYNIKACH AI</span>
          <span className="block" style={{ WebkitTextStroke: "2px white", color: "transparent" }}>ZA 3 GODZINY.</span>
        </h1>
        <div className="mt-4 ml-1">
          <span className="font-display text-2xl sm:text-3xl md:text-5xl uppercase text-[#FFD700] tracking-tight">
            Nie "wkrótce". Dzisiaj, po pierwszym audycie.
          </span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12 mt-10 md:mt-14">
          {/* Description box */}
          <div className="brutalist-border bg-black p-6 md:p-8 relative" style={{ transform: "rotate(1.5deg) translate(10px, -5px)" }}>
            <div className="absolute -top-4 -right-4 bg-white text-black px-2 text-xs font-bold">META_DATA</div>
            <p className="text-base md:text-lg leading-relaxed text-[#FFD700] opacity-90">
              &gt; <span className="text-white font-bold">Szkolenie dla SEO-wców i marketerów</span> którzy chcą dominować w Google AI Overview, Perplexity i organiku jednocześnie.<br /><br />
              &gt; Uczysz się konkretnego systemu — <span className="text-white font-bold">wychodzisz z gotowym frameworkiem</span> i robisz pierwszy brief jeszcze na sali.<br /><br />
              &gt; Pierwsze cytowanie przez AI: <span className="text-white font-bold">3h od publikacji.</span>
            </p>
          </div>

          {/* CTA buttons */}
          <div className="flex flex-col gap-4 justify-center">
            <button
              onClick={onCTA}
              className={`${cta.className} font-display text-2xl md:text-4xl px-8 md:px-12 py-3 md:py-5 transition-colors hover:translate-x-1 hover:translate-y-1 uppercase`}
            >
              {cta.text}
            </button>
            <a
              href="#agenda"
              className="text-zinc-400 font-mono text-sm uppercase tracking-widest hover:text-white transition-colors inline-flex items-center gap-2"
            >
              <span>↓ sprawdź agendę</span>
            </a>
            <div className="text-[10px] text-zinc-600 uppercase tracking-widest mt-2">
              V.06.2 // SEMANTIC_OS_FRAMEWORK
            </div>
          </div>
        </div>

        {/* Stats strip */}
        <div className="mt-12 md:mt-16 flex flex-wrap gap-8 md:gap-16 border-t-4 border-white/20 pt-6">
          <div>
            <div className="text-3xl md:text-4xl font-display text-[#FFD700]">3H</div>
            <div className="text-[10px] text-zinc-400 uppercase tracking-widest">do cytowania przez AI</div>
            <div className="text-[9px] text-zinc-600 mt-0.5">od momentu publikacji</div>
          </div>
          <div>
            <div className="text-3xl md:text-4xl font-display text-[#ff00ff]">8 MIN</div>
            <div className="text-[10px] text-zinc-400 uppercase tracking-widest">analiza 20 stron konkurencji</div>
            <div className="text-[9px] text-zinc-600 mt-0.5">zamiast 4 godzin ręcznej roboty</div>
          </div>
          <div>
            <div className="text-3xl md:text-4xl font-display text-white">MAX 10</div>
            <div className="text-[10px] text-zinc-400 uppercase tracking-widest">osób na sali</div>
            <div className="text-[9px] text-zinc-600 mt-0.5">gwarantowana uwaga trenera</div>
          </div>
        </div>
      </div>
    </section>
  );
}