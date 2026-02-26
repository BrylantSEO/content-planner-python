import React from "react";
import { motion } from "framer-motion";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

const faqs = [
  { q: "Czy muszę umieć programować?", a: "Nie. Wszystko odbywa się przez interfejs tekstowy w Claude Code. Jeśli piszesz prompty — dasz radę." },
  { q: "Jakie narzędzia są potrzebne?", a: "Laptop + subskrypcja Claude Code (Anthropic). Resztę — API, konfigurację, narzędzia — mamy przygotowane." },
  { q: "Ile osób jest na sali?", a: "Maksymalnie 8–10. Każdy pracuje na własnych artykułach klienta, nie na przykładach z prezentacji." },
  { q: "Czy działa tylko dla agencji SEO?", a: "Nie — freelancerzy, in-house SEO marketerzy i content marketerzy pracują tym samym frameworkiem." },
  { q: "Kiedy jest najbliższy termin i czy będą kolejne?", a: "Najbliższy termin: 15–16 marca 2026, Warszawa. Szkolenia odbywają się cyklicznie — max. 8–10 osób per edycja. Kolejne terminy ogłaszamy po wypełnieniu aktualnej edycji." },
  { q: "Czy jest gwarancja satysfakcji?", a: "Tak. Jeśli po pierwszym dniu uznasz, że szkolenie nie spełnia Twoich oczekiwań, zwracamy pełną kwotę za Dzień 1. Bez pytań." },
  { q: "Czy jest faktura VAT?", a: "Tak, wystawiamy fakturę VAT. Podajesz dane przy rejestracji." },
];

export default function FAQSection() {
  return (
    <section className="relative py-24 md:py-32 px-4">
      <div className="max-w-3xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mb-16"
        >
          <div className="flex flex-col md:flex-row items-baseline gap-4 border-b-8 border-white pb-4">
            <h2 className="text-5xl md:text-7xl font-display uppercase leading-none text-white">FAQ</h2>
            <span className="text-lg font-mono font-bold bg-[#FFD700] text-black px-4">[ DEKODUJ ]</span>
          </div>
        </motion.div>

        <Accordion type="single" collapsible className="space-y-3">
          {faqs.map((faq, i) => (
            <AccordionItem
              key={i}
              value={`faq-${i}`}
              className="border-4 border-white/30 bg-black px-6 overflow-hidden hover:border-white transition-colors"
            >
              <AccordionTrigger className="text-left text-white font-mono font-bold py-5 hover:no-underline hover:text-[#FFD700] transition-colors text-sm md:text-base">
                &gt; {faq.q}
              </AccordionTrigger>
              <AccordionContent className="text-zinc-400 font-mono text-sm leading-relaxed pb-5">
                {faq.a}
              </AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </div>
    </section>
  );
}