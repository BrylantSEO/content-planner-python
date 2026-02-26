import React from "react";
import { motion } from "framer-motion";
import { FileCheck, FileText, Network, CalendarDays } from "lucide-react";

const deliverables = [
  {
    icon: FileCheck,
    file: "audit.md",
    desc: "Raport audytowy z liczbową oceną jakości treści (0–100 pkt) dla artykułu Twojego klienta. Nie opinia — liczba.",
    color: "#ff00ff",
  },
  {
    icon: FileText,
    file: "brief.md",
    desc: "Brief contentowy gotowy do przekazania copywriterowi. Hierarchia nagłówków, lista faktów.",
    color: "#FFD700",
  },
  {
    icon: Network,
    file: "topical_map.md",
    desc: "Mapa tematyczna klienta z priorytetami P1–P4. Widzisz co pisać pierwsze.",
    color: "#ff00ff",
  },
  {
    icon: CalendarDays,
    file: "plan_90_dni.md",
    desc: "Konkretny plan: które artykuły audytować, kiedy pisać, ile. Systematyczność.",
    color: "#FFD700",
  },
];

export default function DeliverablesSection() {
  return (
    <section className="relative py-24 md:py-32 px-4">
      <div className="max-w-6xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mb-16"
        >
          <div className="flex flex-col md:flex-row items-baseline gap-4 border-b-8 border-white pb-4 mb-6">
            <h2 className="text-5xl md:text-7xl lg:text-8xl font-display uppercase leading-none text-white">OUTPUT</h2>
            <span className="text-xl font-mono font-bold bg-[#FFD700] text-black px-4">[ 004_FILES ]</span>
          </div>
          <p className="text-zinc-500 font-mono text-sm uppercase tracking-wider">
            &gt; Nie ćwiczenia. Prawdziwe pliki gotowe dla klienta.
          </p>
        </motion.div>

        <div className="grid sm:grid-cols-2 gap-6">
          {deliverables.map((item, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              className="border-4 border-white bg-black p-6 relative group hover:translate-x-1 hover:translate-y-1 transition-transform"
              style={{ boxShadow: `8px 8px 0px ${item.color}` }}
            >
              <div className="absolute -top-4 -right-4 px-2 text-xs font-bold uppercase" style={{ backgroundColor: item.color, color: item.color === "#FFD700" ? "black" : "white" }}>
                FILE_{String(i + 1).padStart(2, "0")}
              </div>
              <div className="flex items-center gap-3 mb-4">
                <item.icon className="w-6 h-6" style={{ color: item.color }} />
                <code className="text-white font-mono text-lg font-bold">{item.file}</code>
              </div>
              <p className="text-zinc-400 font-mono text-sm leading-relaxed">{item.desc}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}