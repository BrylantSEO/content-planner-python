import React from "react";
import { motion } from "framer-motion";
import { Check } from "lucide-react";

const cards = [
  {
    tag: "PROFILE_01",
    title: "SPECJALISTA SEO",
    color: "#ff00ff",
    points: [
      "Twoi klienci pytają o AI Overview i widoczność w Perplexity",
      "Wiesz że coś się zmieniło, ale nie wiesz co zmienić w procesie",
      "Chcesz narzędzi które działają — nie kolejnego kursu o teorii",
      "Chcesz wyników które możesz pokazać klientowi w poniedziałek",
    ],
  },
  {
    tag: "PROFILE_02",
    title: "MARKETER IN-HOUSE",
    color: "#FFD700",
    points: [
      "Zarządzasz contentem firmy i widzisz że AI zmienia jak ludzie szukają",
      "Briefujesz copywriterów ale efekty coraz słabiej przekładają się na ruch",
      "Potrzebujesz procesu który możesz wdrożyć w swoim zespole jutro",
      "Masz budżet contentowy i chcesz żeby każdy artykuł pracował dłużej",
    ],
  },
  {
    tag: "PROFILE_03",
    title: "CONTENT MARKETER",
    color: "#ff00ff",
    points: [
      "Piszesz lub zamawiasz treści — i chcesz żeby AI je cytowało",
      "Słyszałeś o semantycznym SEO ale nie wiesz jak to przełożyć na brief",
      "Chcesz pisać mniej, ale skuteczniej — 1 świetny artykuł zamiast 10 słabych",
      "Szukasz frameworku który podniesie Twoją wartość jako specjalisty w 2026",
    ],
  },
];

export default function AudienceSection() {
  return (
    <section className="relative py-24 md:py-32 px-4">
      <div className="max-w-6xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mb-16"
        >
          <h2 className="text-5xl md:text-7xl lg:text-8xl font-display uppercase leading-[0.85] text-white">
            TO SZKOLENIE<br />
            <span className="text-[#FFD700]">JEST DLA</span><br />
            <span style={{ WebkitTextStroke: "2px white", color: "transparent" }}>CIEBIE</span>
          </h2>
        </motion.div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {cards.map((card, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.15 }}
              className="border-4 border-white bg-black p-6 md:p-8 relative group"
              style={{ boxShadow: `8px 8px 0px ${card.color}` }}
            >
              <div className="absolute -top-4 -right-4 px-2 text-xs font-bold uppercase" style={{ backgroundColor: card.color, color: card.color === "#FFD700" ? "black" : "white" }}>
                {card.tag}
              </div>
              <h3 className="text-3xl md:text-4xl font-display uppercase mb-6" style={{ color: card.color }}>
                {card.title}
              </h3>
              <ul className="space-y-4">
                {card.points.map((point, j) => (
                  <li key={j} className="flex items-start gap-3">
                    <Check className="w-4 h-4 mt-1 shrink-0" style={{ color: card.color }} />
                    <span className="text-zinc-400 font-mono text-sm leading-relaxed">{point}</span>
                  </li>
                ))}
              </ul>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}