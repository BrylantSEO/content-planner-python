import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { FileText, Search, BarChart2, ChevronDown } from "lucide-react";

const cases = [
  {
    id: "new",
    icon: FileText,
    tag: "SCENARIUSZ 01",
    title: "Nie masz jeszcze strony",
    subtitle: "Content Planner zrobi to za Ciebie.",
    color: "#FFD700",
    steps: [
      "Wpisujesz seed keyword i domenę",
      "Pipeline klasteryzuje setki fraz embeddingami",
      "Content Planner generuje topical map — co pisać, w jakiej kolejności",
      "Każdy temat dostaje gotowy content brief z H1/H2/H3",
    ],
    result: "Wychodzisz ze szkolenia z planem contentowym na 3 miesiące. Zero \"mi się wydaje\".",
  },
  {
    id: "existing",
    icon: Search,
    tag: "SCENARIUSZ 02",
    title: "Masz strony, ale nie rankują",
    subtitle: "Content Auditor powie Ci dokładnie dlaczego.",
    color: "#ff00ff",
    steps: [
      "Wklejasz URL artykułu",
      "Pipeline pobiera treść, scrauje top 10, wyciąga fakty z konkurencji",
      "Dostajesz liczbowy wynik jakości treści (0–100 pkt)",
      "Raport wskazuje konkretne zdania do zmiany — BEFORE → AFTER",
    ],
    result: "Przestajesz działać w ciemno. Wiesz co zmienić i możesz to zlecić copywriterowi jutro.",
  },
  {
    id: "gaps",
    icon: BarChart2,
    tag: "SCENARIUSZ 03",
    title: "Nie wiesz co jeszcze napisać",
    subtitle: "Keyword Clustering Pipeline pokaże luki.",
    color: "#00ff88",
    steps: [
      "Eksportujesz frazy z Google Search Console lub Senuto",
      "Pipeline klastruje je semantycznie — nie alfabetycznie",
      "Widzisz dokładnie które tematy pokrywasz, które pomijasz",
      "Topical map wskazuje kolejność publikacji dla maksymalnego authority",
    ],
    result: "Wiesz czego jeszcze nie napisałeś, zanim konkurencja to zrobi.",
  },
];

export default function UseCasesSection() {
  const [open, setOpen] = useState("existing");

  return (
    <section className="relative py-24 md:py-32 px-4 bg-black overflow-hidden">
      <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-[#FFD700] rounded-full blur-[350px] opacity-5 pointer-events-none" />

      <div className="max-w-6xl mx-auto relative z-10">

        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mb-16"
        >
          <div className="border-b-8 border-white pb-4 mb-4">
            <h2 className="text-5xl md:text-7xl lg:text-8xl font-display uppercase leading-none text-white">
              CO KONKRETNIE
            </h2>
            <span className="text-5xl md:text-7xl lg:text-8xl font-display uppercase leading-none text-[#FFD700]">
              NAUCZYSZ SIĘ ROBIĆ?
            </span>
          </div>
          <p className="font-mono text-zinc-400 text-sm">
            &gt; Trzy scenariusze. Każdy kończy się mierzalnym wynikiem liczbowym — nie opinią.
          </p>
        </motion.div>

        {/* Accordion cases */}
        <div className="space-y-4 mb-20">
          {cases.map((c, i) => {
            const Icon = c.icon;
            const isOpen = open === c.id;

            return (
              <motion.div
                key={c.id}
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="border-4 bg-black cursor-pointer"
                style={{
                  borderColor: isOpen ? c.color : "rgb(63,63,70)",
                  boxShadow: isOpen ? `6px 6px 0px ${c.color}` : "none",
                }}
                onClick={() => setOpen(isOpen ? null : c.id)}
              >
                {/* Header row */}
                <div className="flex items-center justify-between p-5 md:p-6">
                  <div className="flex items-center gap-4">
                    <div
                      className="w-12 h-12 border-2 flex items-center justify-center flex-shrink-0"
                      style={{ borderColor: c.color }}
                    >
                      <Icon className="w-5 h-5" style={{ color: c.color }} />
                    </div>
                    <div>
                      <div
                        className="font-mono text-[10px] uppercase tracking-widest mb-0.5"
                        style={{ color: c.color }}
                      >
                        {c.tag}
                      </div>
                      <div className="font-display text-xl md:text-2xl uppercase text-white">
                        {c.title}
                      </div>
                    </div>
                  </div>
                  <ChevronDown
                    className="w-5 h-5 text-zinc-500 flex-shrink-0 transition-transform"
                    style={{ transform: isOpen ? "rotate(180deg)" : "rotate(0deg)" }}
                  />
                </div>

                {/* Body */}
                <AnimatePresence initial={false}>
                  {isOpen && (
                    <motion.div
                      key="body"
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.25 }}
                      className="overflow-hidden"
                    >
                      <div className="px-5 md:px-6 pb-6 border-t-2 border-zinc-800 pt-5">
                        <p className="font-display text-lg uppercase mb-5" style={{ color: c.color }}>
                          {c.subtitle}
                        </p>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                          <ul className="space-y-3">
                            {c.steps.map((step, j) => (
                              <li key={j} className="flex items-start gap-3 font-mono text-sm text-zinc-300">
                                <span
                                  className="font-display text-lg leading-none flex-shrink-0 mt-0.5"
                                  style={{ color: c.color }}
                                >
                                  {String(j + 1).padStart(2, "0")}
                                </span>
                                {step}
                              </li>
                            ))}
                          </ul>
                          <div
                            className="border-2 p-4 flex items-center"
                            style={{ borderColor: c.color }}
                          >
                            <p className="font-mono text-sm text-white leading-relaxed">
                              <span className="font-bold" style={{ color: c.color }}>WYNIK: </span>
                              {c.result}
                            </p>
                          </div>
                        </div>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            );
          })}
        </div>

        {/* Tools freedom block */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="border-4 border-white bg-black p-8 md:p-10 relative"
          style={{ boxShadow: "8px 8px 0px #ff00ff" }}
        >
          <div className="absolute -top-4 left-4 bg-white text-black px-3 py-0.5 text-xs font-bold uppercase tracking-widest">
            EFEKT UBOCZNY SZKOLENIA
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-10 items-center">
            <div>
              <h3 className="font-display text-3xl md:text-4xl uppercase text-white leading-tight mb-4">
                Zrezygnujesz<br />
                <span className="text-[#ff00ff]">z większości<br />płatnych narzędzi.</span>
              </h3>
              <p className="font-mono text-sm text-zinc-400 leading-relaxed">
                &gt; SurferSEO, NeuronWriter, Senuto — dobre narzędzia. Ale generyczne.
                Dają Ci wyniki <em>dla wszystkich</em>, nie dla Twoich klientów.
              </p>
            </div>

            <div className="space-y-5 font-mono text-sm">
              {[
                {
                  label: "Własne API → własne dane",
                  desc: "Wpisujesz się do Google Search Console, Semrush, Senuto API. Dane trafiają do Twojego pipeline — nie do cudzego dashboardu.",
                  color: "#FFD700",
                },
                {
                  label: "Własny dashboard",
                  desc: "Tworzysz raporty kontekstowe dla konkretnych klientów. Żadne narzędzie SaaS tego za Ciebie nie zrobi.",
                  color: "#ff00ff",
                },
                {
                  label: "Wyniki mierzalne liczbowo",
                  desc: "Koniec z \"mi się wydaje, że lepiej\". Masz konkretny wynik przed i po. Możesz go pokazać klientowi.",
                  color: "#00ff88",
                },
              ].map((item, i) => (
                <div key={i} className="flex items-start gap-3">
                  <span className="text-lg leading-none mt-0.5 flex-shrink-0" style={{ color: item.color }}>▸</span>
                  <div>
                    <div className="text-white font-bold mb-0.5">{item.label}</div>
                    <div className="text-zinc-500 text-xs leading-relaxed">{item.desc}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="mt-8 pt-6 border-t border-zinc-800">
            <p className="font-mono text-xs text-zinc-600 text-center uppercase tracking-widest">
              // SurferSEO · NeuronWriter · Senuto · Screaming Frog · Ahrefs — część z tego odpadnie po tym weekendzie
            </p>
          </div>
        </motion.div>

      </div>
    </section>
  );
}
