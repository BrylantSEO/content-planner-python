import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

const day1Items = [
  {
    time: "09:00–09:30",
    duration: "30 MIN",
    title: "Blok 0 — Dlaczego SEO się zmienia",
    goal: "Rozumiesz mechanizm AI Overview i Query Fanout — bez strachu, z ciekawością.",
    desc: "Zaczynamy od rozbicia prawdziwego AI Overview na żywo: każdy wpisuje frazę klienta i obserwuje co jest cytowane. Dlaczego to nie Twój artykuł? Odpowiedź jest konkretna i natychmiastowa. Rysujemy query fanout na tablicy: jedno pytanie → 7 sub-queries. To jest mechanizm za każdą odpowiedzią AI.",
    tools: ["Perplexity", "Google AI Overview"],
    output: null,
    accentColor: "#ff00ff",
    metaphor: "\"Google AI cytuje fragmenty, nie rankuje strony. Wasza praca to pisać fragmenty godne cytowania.\""
  },
  {
    time: "09:30–10:30",
    duration: "60 MIN",
    title: "Blok 1 — Fundamenty semantyczne",
    goal: "Masz wypełnioną Kartę projektu dla swojego klienta: CE, SC, CSI, EAV, URR.",
    desc: "Przez 5 pojęć przechodzimy interaktywnie — po każdym pytanie do grupy. CE (Central Entity) — czym jest Twój klient? SC (Source Context) — co go odróżnia od 10 konkurentów? CSI — gdyby klient miał jeden artykuł do przeczytania, co by chciał wiedzieć? EAV — piszemy na tablicy trójkę faktyczną. URR — co jest unikalne w ofercie? Każdy następnie uruchamia narzędzia na własnych treściach.",
    tools: ["/csi-definition-helper", "/eav-extractor"],
    output: "Karta projektu CE/SC/CSI (wydruk A5) gotowa dla każdego uczestnika",
    accentColor: "#FFD700",
    metaphor: null
  },
  {
    time: "10:45–12:15",
    duration: "90 MIN",
    title: "Blok 2 — Content Audit Pipeline ★ serce dnia 1",
    goal: "Masz gotowy audit.md z CQS 0–100 i 3 rekomendacjami KRYTYCZNYMI dla artykułu klienta.",
    desc: "To jest najważniejszy blok szkolenia. Rysujemy architekturę pipeline: URL → Jina Reader (pobiera treść bez szumu) → NodeHub SERP (top 10 dla tematu) → Jina Batch (pobiera konkurentów) → Competitor Gap Analyzer (EAV gaps) → Content Quality Scorer (CQS w 4 wymiarach) → audit.md z BEFORE→AFTER. Każdy krok jest natychmiastowy i mierzalny. CQS to nie opinia — to liczba. Po audycie wiecie dokładnie CO zmienić i w jakiej kolejności.",
    tools: ["/content-auditor-pipeline", "Jina Reader", "NodeHub SERP", "/competitor-gap-analyzer", "/content-quality-scorer"],
    output: "audit.md z CQS (0–100) dla artykułu klienta + lista zmian BEFORE→AFTER gotowa dla copywritera",
    accentColor: "#ff00ff",
    metaphor: "\"Jina Reader usuwa wszystkie reklamy i sidebary — zostaje sam tekst. To co widzi AI.\""
  },
  {
    time: "13:00–14:30",
    duration: "90 MIN",
    title: "Blok 3 — Content Planning Pipeline",
    goal: "Masz gotowy brief.md do przekazania copywriterowi lub do samodzielnego pisania.",
    desc: "Query Fanout ćwiczenie fizyczne: piszemy na tablicy frazę i zbieramy 7–10 pytań szczegółowych od uczestników — a potem porównujemy z tym co generuje AI. Następnie MCP workflow: Supabase (cosine similarity — >0.90 to kanibalizacja, 0.75–0.90 to idealny internal link) i Senuto (grupy semantyczne jako H2, pytania jako FAQ, pozycje DD jako kontekst). Brief zawiera hierarchię H1→H2→H3, EAV matrix i checklistę dla copywritera.",
    tools: ["/query-fanout", "/content-planner", "Supabase pgvector", "Senuto MCP"],
    output: "brief.md z hierarchią nagłówków, EAV matrix i checklistą wdrożenia",
    accentColor: "#FFD700",
    metaphor: "\"Supabase similarity >0.90 = nie pisz nowego artykułu, popraw stary. 0.75–0.90 = idealny internal link.\""
  },
  {
    time: "14:45–15:45",
    duration: "60 MIN",
    title: "Blok 4 — Keyword Clustering & Embeddingi",
    goal: "Rozumiesz czym są embeddingi i masz wizualną topical map klienta z priorytetami P1–P4.",
    desc: "Zaczynamy od ćwiczenia fizycznego: kartki z keywords na podłodze — uczestnicy grupują je ręcznie. Potem pokazujemy wykres t-SNE: to samo, co zrobiliście, tylko w 768 wymiarach. Uruchamiamy pipeline klasteryzacji na pre-generowanym pliku CSV. Omawiamy CORE (blisko Central Entity → pillar pages) vs OUTER (długi ogon → supporting pages). Content Gaps P1–P4: P1 = wysokie KD + pokrycie przez konkurencję = pisz TERAZ.",
    tools: ["/keyword-clustering-pipeline", "cluster.py", "Gemini Embeddings", "t-SNE visualization"],
    output: "Topical map CORE/OUTER z content gaps P1–P4 w data/clusters/",
    accentColor: "#ff00ff",
    metaphor: "\"'Basen' i 'pływalnia' leżą blisko w 768-wymiarowej przestrzeni. 'Basen' i 'kredyt' — daleko. Klasteryzacja to grupowanie tych chmur.\""
  },
  {
    time: "15:45–16:45",
    duration: "60 MIN",
    title: "Blok 5 — Własny projekt 1:1",
    goal: "Audytujesz artykuł swojego klienta samodzielnie. Trener pracuje z Tobą 1:1.",
    desc: "Wybierasz artykuł klienta który chcesz poprawić i uruchamiasz pełny pipeline samodzielnie. Trener krąży i zadaje pytania — nie pokazuje. \"Co mówi CQS? Co to znaczy dla tego artykułu? Który wymiar jest najniższy? Znajdź jedno zdanie BEFORE w raporcie i przepisz je AFTER.\" To jest czas kiedy framework przestaje być teorią.",
    tools: ["/content-auditor-pipeline"],
    output: "Zidentyfikowane 3 zmiany KRYTYCZNE dla artykułu klienta",
    accentColor: "#FFD700",
    metaphor: null
  },
  {
    time: "16:45–17:00",
    duration: "15 MIN",
    title: "Blok 6 — Plan wdrożenia + zamknięcie",
    goal: "Wychodzisz z konkretnym planem na poniedziałek — nie na \"kiedyś\".",
    desc: "Każdy wypełnia kartę \"Co zrobię w poniedziałek\": który artykuł zaauduję pierwszy, jaki temat briefa zbuduję, co muszę skonfigurować. Runda zamknięcia: 5 osób × 1 zdanie. Trener kończy: \"Każdy z was ma dziś narzędzia, które jeszcze rano nie były dostępne dla większości specjalistów SEO w Polsce. Użyjcie ich w poniedziałek — nie w przyszłym miesiącu.\"",
    tools: [],
    output: "Karta \"Co zrobię w poniedziałek\" + konfiguracja środowiska",
    accentColor: "#ff00ff",
    metaphor: null
  },
];

const day2Items = [
  {
    time: "09:00–09:30",
    duration: "30 MIN",
    title: "Blok 6 — Powtórka + quiz",
    goal: "Utrwalasz kluczowe pojęcia z dnia 1 zanim pójdziemy głębiej.",
    desc: "Quiz 5 pytań na czas (kto pierwszy odpowie poprawnie, wygrywa punkt): BLUF i dlaczego AI go preferuje, próg similarity kanibalizacji w Supabase, 4 wymiary content-quality-scorer, co to CORE w topical map, różnica między country_id=1 a 200 w Senuto. Potem 15 minut otwartej dyskusji na wątpliwości z dnia 1.",
    tools: [],
    output: null,
    accentColor: "#FFD700",
    metaphor: null
  },
  {
    time: "09:30–11:00",
    duration: "90 MIN",
    title: "Blok 7 — Zaawansowany CQS: 4 wymiary",
    goal: "Rozumiesz każdą liczbę w raporcie i potrafisz ją poprawić ręcznie.",
    desc: "SRL (Semantic Role Labels): Twoja CE powinna być Agentem, nie Patientem. \"Reklamy są zarządzane przez agencję\" vs \"Agencja zarządza reklamami\" — to nie jest stylistyka, to sygnał salience. CoR i Information Density: identyfikujemy \"puch\" — słowa modalne, ogólniki bez liczb. Zamieniamy \"wyniki kampanii były świetne\" na \"CTR wzrósł z 2.1% do 4.8% w 30 dni\". TF-IDF: terminy wysokie IDF = specjalistyczne = dobrze. EEAT: gdzie szukać sygnałów Experience, Expertise, Authority, Trust — i jak je wpleść w artykuł.",
    tools: ["/semantic-role-labels-parser", "/information-density-checker", "/tfidf-analyzer", "/eeat-evaluator"],
    output: "Przepisane min. 3 zdania BEFORE→AFTER dla własnego artykułu + ocena EEAT",
    accentColor: "#ff00ff",
    metaphor: "\"CoR nieskończony: 'Wyniki były świetne'. CoR niski: 'ROAS wzrósł o 340% w 6 miesięcy'. Różnica to cytowalność.\""
  },
  {
    time: "11:15–12:30",
    duration: "75 MIN",
    title: "Blok 8 — Tworzenie własnych narzędzi AI",
    goal: "Modyfikujesz istniejący skill lub tworzysz nowy dopasowany do branży klienta — w 10 minut, bez programowania.",
    desc: "Anatomia SKILL.md: trigger keywords, input format, processing logic, output format, examples BEFORE/AFTER. 80% przypadków to modyfikacja istniejącego skilla, nie tworzenie od zera. Ćwiczenie: każdy otwiera bluf-generator i dodaje trigger keyword ze swojej branży + przykład BEFORE/AFTER klienta. Następnie tworzymy razem nowy skill 'local-seo-checker' przez /skill-creator — od zera do działającego narzędzia w 10 minut.",
    tools: ["/skill-creator", "Claude Code SKILL.md"],
    output: "Własny skill AI skonfigurowany pod branżę klienta, działający od razu",
    accentColor: "#FFD700",
    metaphor: "\"W ciągu 10 minut stworzyliście specjalistyczne narzędzie dostosowane do waszej pracy. Żaden competitor Twojego klienta tego nie ma.\""
  },
  {
    time: "13:15–14:30",
    duration: "75 MIN",
    title: "Blok 9 — Topical Map jako deliverable dla klienta",
    goal: "Tworzysz topical map i uczysz się ją tłumaczyć klientowi bez technicznego żargonu.",
    desc: "Pełny run /keyword-clustering-pipeline dla projektu każdego uczestnika. Podczas oczekiwania: jak interpretować silhouette score (>0.15 = klasteryzacja ma sens), dlaczego OUTER to nie gorszy klaster — to długi ogon. Ćwiczenie w parach: uczestnik A pokazuje topical map uczestnikowi B który odgrywa klienta bez wiedzy SEO. Musi wyjaśnić CORE bez słów 'embedding' i 'klaster'. Potem zamiana ról. Feedback od grupy.",
    tools: ["/keyword-clustering-pipeline", "cluster.py"],
    output: "Topical map gotowa do prezentacji klientowi w data/clusters/ + storytelling bez technicznego języka",
    accentColor: "#ff00ff",
    metaphor: "\"Ta mapa pokazuje 3 obszary tematyczne, którymi Google uznaje was za ekspertów. Czerwone tematy to miejsca gdzie konkurencja was bije — 4 artykuły w 2 miesiące i Google zaczyna traktować was jako autorytet.\""
  },
  {
    time: "14:45–16:00",
    duration: "75 MIN",
    title: "Blok 10 — Własny projekt: gotowy deliverable",
    goal: "Wychodzisz z gotowym produktem dla klienta — nie z notatkami, tylko z plikiem który możesz wysłać.",
    desc: "Wybierasz ścieżkę: A (nowy projekt — topical map + content brief + audyt) lub B (istniejący projekt — audyt 2–3 artykułów + plan priorytetów + 1 brief). Trener robi min. 10 min 1:1 z każdym uczestnikiem: co zrobiłeś/łaś, jaki jest CQS i co to znaczy konkretnie, jak to przekażesz klientowi.",
    tools: ["/content-auditor-pipeline", "/content-planner", "/keyword-clustering-pipeline"],
    output: "audit.md lub brief.md lub topical map — gotowy deliverable dla klienta",
    accentColor: "#FFD700",
    metaphor: null
  },
  {
    time: "16:00–17:00",
    duration: "60 MIN",
    title: "Blok 11 — Prezentacje + Plan 90 dni",
    goal: "Pokazujesz output grupie i wychodzisz z arkuszem 90-dniowym.",
    desc: "Prezentacje 5–6 osób × 3 min: pokaż swój output, powiedz 1 kluczowe odkrycie, powiedz co zrobisz z tym w poniedziałek. Feedback od grupy. Następnie arkusz Plan 90 dni (wydruk A4): Tydzień 1–2 quick wins (który artykuł, przewidywany CQS, 3 zmiany KRYTYCZNE), Miesiąc 1 (pierwsze briefa, seed keyword do klasteryzacji), Miesiąc 2–3 (systematyzacja, ile artykułów per miesiąc, kto w zespole). Zamknięcie z 3 zasadami na wynos.",
    tools: [],
    output: "Arkusz Plan 90 dni (wydruk A4) + sesja 10 min 1:1 z trenerem",
    accentColor: "#ff00ff",
    metaphor: "\"Jeden artykuł audytuj przed poprawką. Jeden brief przed każdym nowym artykułem. Jeden klaster miesięcznie. Zróbcie to przez 90 dni i wróćcie z danymi.\""
  },
];

const tabs = [
  { id: "day1", label: "DZIEŃ_1 — 1499 ZŁ", items: day1Items, badge: null },
  { id: "day2", label: "2_DNI — 2499 ZŁ", items: day2Items, badge: "OSZCZĘDZASZ 499 ZŁ · PEŁNY SYSTEM" },
];

function ToolTag({ name, color }) {
  const isCommand = name.startsWith("/");
  return (
    <span
      className="inline-block px-2 py-0.5 text-[9px] font-bold font-mono uppercase tracking-wider border"
      style={
        isCommand
          ? { borderColor: color, color: color }
          : { borderColor: "rgba(255,255,255,0.2)", color: "rgba(255,255,255,0.4)" }
      }
    >
      {name}
    </span>
  );
}

export default function AgendaSection() {
  const [activeTab, setActiveTab] = useState("day1");
  const currentTab = tabs.find((t) => t.id === activeTab);

  return (
    <section className="relative py-24 md:py-32 px-4" id="agenda">
      <div className="max-w-4xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mb-12"
        >
          <div className="flex flex-col md:flex-row items-baseline gap-4 border-b-8 border-white pb-4">
            <h2 className="text-5xl md:text-7xl lg:text-8xl font-display uppercase leading-none text-white">AGENDA</h2>
            <span className="text-xl font-mono font-bold bg-[#ff00ff] text-white px-4">[ PROTOKÓŁ ]</span>
          </div>
        </motion.div>

        {/* Tabs */}
        <div className="flex gap-3 mb-8 flex-wrap">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`font-display text-xl md:text-2xl px-6 py-2 uppercase transition-all ${
                activeTab === tab.id
                  ? "bg-white text-black"
                  : "border-4 border-white text-white hover:bg-[#ff00ff] hover:border-[#ff00ff]"
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>

        {/* Badge */}
        {currentTab.badge && (
          <div className="mb-6">
            <span className="bg-[#FFD700] text-black px-4 py-1 text-xs font-bold uppercase tracking-wider">
              {currentTab.badge}
            </span>
          </div>
        )}

        {/* Accordion */}
        <Accordion type="single" collapsible className="space-y-3">
          {currentTab.items.map((item, i) => (
            <AccordionItem
              key={`${activeTab}-${i}`}
              value={`item-${i}`}
              className="border-4 bg-black overflow-hidden transition-colors"
              style={{ borderColor: "rgba(255,255,255,0.3)" }}
            >
              <AccordionTrigger className="text-left px-6 py-5 hover:no-underline hover:bg-white/5 transition-colors group">
                <div className="flex items-start gap-4 w-full mr-4">
                  {/* Time badge */}
                  <div
                    className="shrink-0 hidden sm:flex flex-col items-center justify-center border-2 px-2 py-1 min-w-[72px] text-center"
                    style={{ borderColor: item.accentColor }}
                  >
                    <span className="font-display text-xs leading-tight" style={{ color: item.accentColor }}>
                      {item.duration}
                    </span>
                    <span className="font-mono text-[8px] text-zinc-600 leading-tight mt-0.5">{item.time}</span>
                  </div>
                  {/* Title */}
                  <span className="font-mono font-bold text-white group-hover:text-[#FFD700] transition-colors text-sm md:text-base">
                    &gt; {item.title}
                  </span>
                </div>
              </AccordionTrigger>

              <AccordionContent className="px-6 pb-6">
                {/* Goal */}
                <div
                  className="border-l-4 pl-4 mb-4 py-1"
                  style={{ borderColor: item.accentColor }}
                >
                  <div className="text-[9px] font-bold uppercase tracking-widest mb-1" style={{ color: item.accentColor }}>
                    CEL BLOKU
                  </div>
                  <p className="font-mono text-sm text-white leading-relaxed">{item.goal}</p>
                </div>

                {/* Description */}
                <p className="text-zinc-400 font-mono text-sm leading-relaxed mb-4">{item.desc}</p>

                {/* Metaphor / quote */}
                {item.metaphor && (
                  <div className="bg-black border border-white/10 px-4 py-3 mb-4">
                    <p className="font-mono text-xs text-zinc-500 italic leading-relaxed">{item.metaphor}</p>
                  </div>
                )}

                {/* Tools + Output row */}
                <div className="flex flex-col sm:flex-row sm:items-start gap-4">
                  {/* Tools */}
                  {item.tools.length > 0 && (
                    <div className="flex-1">
                      <div className="text-[9px] font-bold uppercase tracking-widest text-zinc-600 mb-2">NARZĘDZIA</div>
                      <div className="flex flex-wrap gap-1.5">
                        {item.tools.map((t, j) => (
                          <ToolTag key={j} name={t} color={item.accentColor} />
                        ))}
                      </div>
                    </div>
                  )}

                  {/* Output */}
                  {item.output && (
                    <div className="flex-1">
                      <div className="text-[9px] font-bold uppercase tracking-widest mb-2" style={{ color: item.accentColor }}>
                        OUTPUT
                      </div>
                      <p className="font-mono text-xs leading-relaxed" style={{ color: item.accentColor }}>
                        → {item.output}
                      </p>
                    </div>
                  )}
                </div>
              </AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </div>
    </section>
  );
}
