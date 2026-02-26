import React from "react";
import { motion } from "framer-motion";
import { Brain, Database, GitBranch, Layers, Search, Zap } from "lucide-react";

const skills = [
  {
    icon: Brain,
    term: "QUERY FANOUT",
    label: "Jak AI rozbija pytania",
    desc: "Zrozumiesz jak modele AI (Perplexity, Google) dekompozytują zapytania na sub-queries — i napiszesz content który odpowiada na każde z nich jednocześnie.",
    color: "#ff00ff",
    tilt: "rotate(-1.5deg)",
  },
  {
    icon: Layers,
    term: "RAG & CHUNKI",
    label: "Jak AI czyta Twój artykuł",
    desc: "Retrieval-Augmented Generation to mechanizm za każdą odpowiedzią AI. Nauczysz się strukturyzować treść tak, żeby Twoje chunki trafiały do odpowiedzi — nie do kosza.",
    color: "#FFD700",
    tilt: "rotate(1deg)",
  },
  {
    icon: Search,
    term: "ENCJE & EAV",
    label: "Grafy wiedzy po ludzku",
    desc: "Entity-Attribute-Value to język w którym mówi Knowledge Graph Google. Nauczysz się pisać treści które AI interpretuje jako fakty — nie jako tekst.",
    color: "#ff00ff",
    tilt: "rotate(-0.5deg)",
  },
  {
    icon: Database,
    term: "EMBEDDINGI & SUPABASE",
    label: "Własna baza wektorowa",
    desc: "Zbudujesz własną bazę embeddingów w Supabase (pgvector). Podłączasz swoje frazy kluczowe — system sam klasteryzuje i szuka podobnych treści. Zero programowania.",
    color: "#FFD700",
    tilt: "rotate(1.5deg)",
  },
  {
    icon: GitBranch,
    term: "CRAWL4AI & JINA",
    label: "Jak AI crawluje strony",
    desc: "Poznasz narzędzia których AI używa do pobierania i przetwarzania treści. Dowiesz się co widzą boty AI na Twojej stronie — i jak to naprawić.",
    color: "#ff00ff",
    tilt: "rotate(-1deg)",
  },
  {
    icon: Zap,
    term: "GOTOWE NARZĘDZIE",
    label: "Podłącz i lec",
    desc: "Wyjeżdżasz ze skonfigurowanym frameworkiem. Wpisujesz frazy klienta → system robi embeddingi, klastruje, generuje brief. Twój workflow od pierwszego dnia po szkoleniu.",
    color: "#FFD700",
    tilt: "rotate(0.5deg)",
  },
];

export default function FrameworkSection() {
  return (
    <section className="relative py-24 md:py-32 bg-black overflow-hidden">
      {/* Glow */}
      <div className="absolute top-1/2 right-0 w-[500px] h-[500px] bg-[#ff00ff] rounded-full blur-[250px] opacity-10 pointer-events-none" />

      <div className="max-w-6xl mx-auto px-4 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mb-6"
        >
          <div className="flex flex-col md:flex-row items-baseline gap-4 border-b-8 border-white pb-4">
            <h2 className="text-5xl md:text-7xl lg:text-8xl font-display uppercase leading-none text-white">
              CO WYNIESIESZ
            </h2>
            <span className="text-lg font-mono font-bold bg-[#FFD700] text-black px-4">[ PO SZKOLENIU ]</span>
          </div>
        </motion.div>

        {/* Intro */}
        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="font-mono text-zinc-400 text-sm md:text-base mb-16 max-w-3xl leading-relaxed"
        >
          &gt; Frazy takie jak <span className="text-[#ff00ff] font-bold">query fanout</span>,{" "}
          <span className="text-[#FFD700] font-bold">RAG</span>,{" "}
          <span className="text-[#ff00ff] font-bold">embeddingi</span>,{" "}
          <span className="text-[#FFD700] font-bold">encje</span>,{" "}
          <span className="text-[#ff00ff] font-bold">Crawl4AI</span> przestaną brzmieć jak żargon —
          staną się Twoim codziennym narzędziem pracy.
        </motion.p>

        {/* 6-card grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {skills.map((s, i) => {
            const Icon = s.icon;
            return (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.07 }}
                className="border-4 border-white bg-black p-6 relative group"
                style={{
                  transform: s.tilt,
                  boxShadow: `6px 6px 0px ${s.color}`,
                }}
              >
                {/* Corner tag */}
                <div
                  className="absolute -top-3 -right-3 px-2 py-0.5 text-[9px] font-bold uppercase tracking-widest"
                  style={{ backgroundColor: s.color, color: s.color === "#FFD700" ? "black" : "white" }}
                >
                  {`0${i + 1}`}
                </div>

                {/* Icon */}
                <div
                  className="w-12 h-12 border-4 border-white flex items-center justify-center mb-4 group-hover:scale-110 transition-transform"
                  style={{ boxShadow: `3px 3px 0px ${s.color}` }}
                >
                  <Icon className="w-5 h-5" style={{ color: s.color }} />
                </div>

                {/* Term */}
                <div className="font-display text-xl md:text-2xl uppercase mb-1" style={{ color: s.color }}>
                  {s.term}
                </div>
                <div className="font-mono text-[10px] uppercase tracking-widest text-zinc-500 mb-3">
                  {s.label}
                </div>

                {/* Description */}
                <p className="font-mono text-xs text-zinc-400 leading-relaxed">
                  {s.desc}
                </p>
              </motion.div>
            );
          })}
        </div>

        {/* Bottom CTA teaser */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mt-14 border-4 border-[#FFD700] bg-black p-6 max-w-3xl mx-auto text-center relative"
          style={{ boxShadow: "8px 8px 0px #ff00ff" }}
        >
          <div className="absolute -top-4 left-4 bg-[#FFD700] text-black px-3 text-xs font-bold uppercase">KLUCZ</div>
          <p className="font-mono text-sm md:text-base text-white leading-relaxed">
            &gt; Nie uczysz się teorii. Wychodzisz z{" "}
            <span className="text-[#FFD700] font-bold">gotowym, skonfigurowanym środowiskiem</span>.
            <br />
            &gt; Wpisujesz frazy klienta → framework robi resztę.
          </p>
        </motion.div>
      </div>
    </section>
  );
}
