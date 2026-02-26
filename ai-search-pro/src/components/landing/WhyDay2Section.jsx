import React from "react";
import { motion } from "framer-motion";
import { FolderGit2, Database, FileCode2, Zap, LayoutDashboard, Check, Minus } from "lucide-react";

const STRUKTURA_PREVIEW = `# Struktura serwisu — pozycjonowanie zagraniczne
## Double Digital | Topical Authority Plan

---

## 1. Wizualne drzewo serwisu

double-digital.pl
│
├── PILLAR: /uslugi/pozycjonowanie/pozycjonowanie-zagraniczne/ ── [CORE-1+4 · 117 kw · P0] 🔥
│   CE: Pozycjonowanie zagraniczne (agencja)
│   Canonical: "pozycjonowanie zagraniczne"
│   Format: Strona usługi + FAQ + sekcja cen
│   ├── [P0] Co to jest pozycjonowanie zagraniczne?
│   ├── [P0] Dla kogo: e-commerce, B2B, małe firmy
│   ├── [P0] Nasze rynki: Niemcy, UK, USA, Skandynawia, DACH...
│   ├── [P0] Ile kosztuje? (wycena, pakiety, ceny)
│   └── [P0] FAQ (czy warto, kiedy zacząć, jak długo trwa)
│
├── BLOG CORE — Techniczny i operacyjny
│   ├── /blog/techniczna-optymalizacja-seo-zagraniczne/ ── [CORE-2 · 103 kw · P0] 🔥
│   │   CE: Techniczna optymalizacja SEO zagranicznego
│   │   ├── Struktura domeny (ccTLD vs subdomena vs katalog)
│   │   ├── Geotargeting w Google Search Console
│   │   ├── Page speed i Core Web Vitals per rynek
│   │   └── ROI i zwrot z inwestycji
│   │
│   ├── /blog/seo-e-commerce-zagraniczne/ ── [CORE-3 · 22 kw · P1] 🔥
│   │   CE: SEO e-commerce zagraniczne
│   │   ├── SEO sklepu w Niemczech / UK / USA
│   │   └── Platformy (Shopify, WooCommerce wielojęzyczny)
│   │
│   ├── /blog/keyword-research-zagraniczne/ ── [CORE-5 · 10 kw · P1] 🔥
│   │   ⚡ DD JUŻ RANKUJE — priorytet wzmocnienia!
│   │
│   └── /blog/international-seo-content-lokalizacja/ ── [CORE-6 · 48 kw · P1]
│       CE: International SEO content lokalizacja
│       ├── E-E-A-T w international SEO
│       └── Digital PR i link building international
│
└── BLOG OUTER — Pogłębienie i densyfikacja
    ├── /blog/hreflang-implementacja/ ── [OUTER-1 · 7 kw · P2]
    ├── /blog/seo-vs-google-ads-zagranicznie/ ── [OUTER-2 · 28 kw · P2]
    └── /blog/content-seo-zagraniczne/ ── [OUTER-3 · 37 kw · P2]

---

## 2. Mapowanie keywords → strony (per cluster)

CORE-1 + CORE-4 | /uslugi/pozycjonowanie/pozycjonowanie-zagraniczne/ | 117 kw
keywords: pozycjonowanie zagraniczne, SEO zagraniczne, SEO międzynarodowe,
pozycjonowanie na Niemcy/UK/USA/Skandynawię, pozycjonowanie zagraniczne agencja,
cena, wycena, opinie, case study, krok po kroku...

CORE-2 | /blog/techniczna-optymalizacja-seo-zagraniczne/ | 103 kw
keywords: techniczna optymalizacja SEO, ccTLD a SEO zagraniczne, .de domena,
geotargeting GSC, NAP zagraniczne, KPI dla SEO zagranicznego, ROI...

CORE-3 | /blog/seo-e-commerce-zagraniczne/ | 22 kw
keywords: SEO e-commerce zagraniczne, wielojęzyczny Shopify, WooCommerce SEO,
cross-border e-commerce SEO, pozycjonowanie sklepu w Niemczech...

CORE-6 | /blog/international-seo-content-lokalizacja/ | 48 kw
keywords: international SEO, E-E-A-T international, digital PR international,
schema markup international SEO, SEO DACH, SEO Benelux, SEO Nordics...

---

## 3. Linkowanie wewnętrzne

[PILLAR] /uslugi/pozycjonowanie/pozycjonowanie-zagraniczne/ (P0)
  +---> [CORE-2] /blog/techniczna-optymalizacja-seo-zagraniczne/
  |          +---> [OUTER-1] /blog/hreflang-implementacja/
  |          +---> [CORE-5] /blog/keyword-research-zagraniczne/
  +---> [CORE-3] /blog/seo-e-commerce-zagraniczne/
  |          +---> [OUTER-3] /blog/content-seo-zagraniczne/
  +---> [CORE-6] /blog/international-seo-content-lokalizacja/
  +---> [OUTER-2] /blog/seo-vs-google-ads-zagranicznie/
         (linkuje też do: Google Ads, Meta Ads strony usług DD)

Reguła: WSZYSTKIE artykuły blogowe → /uslugi/.../pozycjonowanie-zagraniczne/

---

## 4. Priorytety publikacji

P0 | /uslugi/.../pozycjonowanie-zagraniczne/    | 117 kw | rozbudowa istniejącej
P0 | /blog/techniczna-optymalizacja.../         | 103 kw | największy klaster 🔥
P1 | /blog/seo-e-commerce-zagraniczne/          |  22 kw | główny segment DD
P1 | /blog/keyword-research-zagraniczne/        |  10 kw | DD już rankuje ⚡
P1 | /blog/international-seo-content.../        |  48 kw | angielskie frazy
P2 | /blog/hreflang-implementacja/              |   7 kw | technical, łatwy
P2 | /blog/seo-vs-google-ads-zagranicznie/      |  28 kw | unikalny kąt DD
P2 | /blog/content-seo-zagraniczne/             |  37 kw | densyfikacja

RAZEM: 8 stron · 372 keywords

---

## 5. Rekomendacje formatów

Pillar page      → Strona usługi + FAQ + ceny | Service + FAQPage | 2000–3000 słów
CORE-2 tech      → Checklist + krok po kroku  | HowTo + FAQPage   | 3000–4000 słów
CORE-3 e-comm    → Poradnik + case study       | HowTo             | 2500–3500 słów
OUTER-1 hreflang → Tutorial z przykładami kodu | TechArticle       | 1500–2500 słów
OUTER-2 SEO/Ads  → Porównanie + rekomendacja   | FAQPage           | 2000–3000 słów`;

const systemSteps = [
  {
    icon: FolderGit2,
    title: "Osobne repo per klient",
    desc: "Każdy klient ma swoje repozytorium z dedykowanym CLAUDE.md — instrukcjami które definiują jego branżę, tone of voice, konkurentów i cele SEO. AI wie wszystko o kliencie zanim zacznę pracę.",
    color: "#ff00ff",
  },
  {
    icon: Database,
    title: "Własna baza wektorowa w Supabase",
    desc: "Każdy klient ma podpiętą osobną bazę pgvector. Wszystkie jego artykuły żyją tam jako embeddingi — mogę w 3 sekundy sprawdzić czy nowy temat koliduje z istniejącym contentem i gdzie go podlinkować.",
    color: "#FFD700",
  },
  {
    icon: FileCode2,
    title: "Semantyczna mapa w czasie rzeczywistym",
    desc: "Zanim napiszę jedno zdanie briefa — wiem dokładnie: similarity >0.90 = nie pisz nowego, popraw stary. 0.75–0.90 = idealny internal link. System sam mi to mówi.",
    color: "#ff00ff",
  },
  {
    icon: Zap,
    title: "Każdy nowy klient = 20 minut konfiguracji",
    desc: "Kopiuję repozytorium, zmieniam CLAUDE.md, podłączam nową tabelę Supabase. Framework działa od razu — nie buduję od zera za każdym razem.",
    color: "#FFD700",
  },
  {
    icon: LayoutDashboard,
    title: "Dashboard zamiast terminala",
    desc: "Repozytorium może przytłaczać — pliki, foldery, kod. Nauczę Cię budować proste dashboardy graficzne które zamieniają wyniki pipeline w czytelny widok. Możesz je pokazać klientowi lub współpracownikowi — bez tłumaczenia co to jest terminal.",
    color: "#ff00ff",
  },
];

const comparison = [
  { skill: "Audyt artykułu klienta (CQS)", d1: true, d2: true },
  { skill: "Content brief gotowy dla copywritera", d1: true, d2: true },
  { skill: "Klasteryzacja keywords", d1: "podstawy", d2: "pełny pipeline" },
  { skill: "Zaawansowany CQS — SRL + EEAT", d1: false, d2: true },
  { skill: "Tworzenie własnych skills AI (10 min)", d1: false, d2: true },
  { skill: "Pełna topical map dla klienta", d1: false, d2: true },
  { skill: "Dedykowane repo per klient", d1: false, d2: true },
  { skill: "Własna baza wektorowa Supabase", d1: false, d2: true },
  { skill: "Automatyczny internal linking check", d1: false, d2: true },
  { skill: "Dashboard graficzny dla klienta / współpracownika", d1: false, d2: true },
  { skill: "Plan 90 dni (arkusz A4)", d1: false, d2: true },
  { skill: "Sesja 1:1 z trenerem (10 min)", d1: false, d2: true },
];

function Cell({ value }) {
  if (value === true) return <Check className="w-4 h-4 text-[#FFD700] mx-auto" />;
  if (value === false) return <Minus className="w-4 h-4 text-zinc-700 mx-auto" />;
  return <span className="font-mono text-[10px] text-[#ff00ff] uppercase tracking-wider">{value}</span>;
}

export default function WhyDay2Section({ onCTA }) {
  return (
    <section className="relative py-24 md:py-32 bg-black overflow-hidden px-4">
      {/* Glow */}
      <div className="absolute top-1/3 right-0 w-[500px] h-[500px] bg-[#FFD700] rounded-full blur-[300px] opacity-5 pointer-events-none" />

      <div className="max-w-6xl mx-auto relative z-10">

        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mb-16"
        >
          <div className="flex flex-col md:flex-row items-baseline gap-4 border-b-8 border-white pb-4">
            <h2 className="text-5xl md:text-7xl lg:text-8xl font-display uppercase leading-none text-white">
              DZIEŃ 2
            </h2>
            <span className="text-lg font-mono font-bold bg-[#FFD700] text-black px-4">[ TWÓJ WŁASNY SYSTEM ]</span>
          </div>
          <p className="font-mono text-zinc-400 text-sm mt-4 max-w-2xl">
            &gt; Dzień 1 daje Ci narzędzia. Dzień 2 daje Ci system który działa dla każdego klienta — automatycznie.
          </p>
        </motion.div>

        {/* Trainer's workflow story */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="border-4 border-[#FFD700] bg-black p-6 md:p-8 mb-16 relative"
          style={{ boxShadow: "8px 8px 0px #ff00ff" }}
        >
          <div className="absolute -top-4 left-4 bg-[#FFD700] text-black px-3 py-0.5 text-xs font-bold uppercase tracking-widest">
            JAK TO DZIAŁA U MNIE
          </div>
          <div className="absolute -top-4 right-4 bg-[#ff00ff] text-white px-3 py-0.5 text-xs font-bold uppercase tracking-widest">
            TRENER → TY
          </div>

          <p className="font-mono text-sm md:text-base text-zinc-300 leading-relaxed mb-8 mt-2">
            &gt; Każdy mój klient ma{" "}
            <span className="text-[#FFD700] font-bold">osobne repozytorium</span>{" "}
            z dedykowanym plikiem instrukcji — AI zna jego branżę, konkurentów i cele zanim zacznę pracę.
            Każde repozytorium jest podpięte pod{" "}
            <span className="text-[#FFD700] font-bold">własną bazę wektorową w Supabase</span>{" "}
            gdzie wszystkie artykuły klienta żyją jako embeddingi.
            Zanim napiszę brief —{" "}
            <span className="text-white font-bold">system sam mi mówi czy temat ma sens, z czym koliduje i dokąd linkować.</span>
            {" "}W 3 sekundy, nie w 3 godziny.
          </p>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {systemSteps.map((step, i) => {
              const Icon = step.icon;
              return (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 16 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.07 }}
                  className="border-2 border-white bg-zinc-950 p-4 flex gap-4 items-start"
                  style={{ boxShadow: `3px 3px 0px ${step.color}` }}
                >
                  <div
                    className="w-8 h-8 border-2 border-white flex items-center justify-center shrink-0 mt-0.5"
                    style={{ boxShadow: `2px 2px 0px ${step.color}` }}
                  >
                    <Icon className="w-4 h-4" style={{ color: step.color }} />
                  </div>
                  <div>
                    <div className="font-display text-sm uppercase mb-1" style={{ color: step.color }}>
                      {step.title}
                    </div>
                    <p className="font-mono text-xs text-zinc-400 leading-relaxed">{step.desc}</p>
                  </div>
                </motion.div>
              );
            })}
          </div>

          <div className="mt-6 border-t-2 border-zinc-800 pt-4">
            <p className="font-mono text-xs text-zinc-500 italic">
              &gt; "To samo możesz zrobić u siebie — po dniu 2 wychodzisz z gotową konfiguracją dla pierwszego klienta."
            </p>
          </div>
        </motion.div>

        {/* Dashboard block */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="border-4 border-[#ff00ff] bg-black p-6 md:p-8 mb-16 relative"
          style={{ boxShadow: "8px 8px 0px #FFD700" }}
        >
          <div className="absolute -top-4 left-4 bg-[#ff00ff] text-white px-3 py-0.5 text-xs font-bold uppercase tracking-widest">
            DZIEŃ 2 — BONUS
          </div>

          <div className="flex flex-col md:flex-row gap-8 items-start">
            {/* Icon */}
            <div className="shrink-0">
              <div
                className="w-16 h-16 border-4 border-white flex items-center justify-center"
                style={{ boxShadow: "4px 4px 0px #ff00ff" }}
              >
                <LayoutDashboard className="w-7 h-7 text-[#ff00ff]" />
              </div>
            </div>

            {/* Content */}
            <div className="flex-1">
              <div className="font-display text-2xl md:text-3xl uppercase text-[#ff00ff] mb-3">
                REPOZYTORIUM MOŻE PRZYTŁACZAĆ.<br />
                <span className="text-white">ZBUDUJESZ DASHBOARD.</span>
              </div>
              <p className="font-mono text-sm text-zinc-300 leading-relaxed mb-6">
                &gt; Pliki, foldery, terminal, JSON — na początku to chaos.
                Nauczę Cię budować <span className="text-white font-bold">proste dashboardy graficzne</span> które zamieniają wyniki pipeline w czytelny widok.
                Żadnego programowania — gotowe w 30 minut.
              </p>

              {/* Three use cases */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                {[
                  {
                    title: "Dla siebie",
                    desc: "Jeden widok: status audytów, topical mapy, briefe — bez otwierania 10 plików.",
                    color: "#ff00ff",
                  },
                  {
                    title: "Dla klienta",
                    desc: "Pokazujesz wyniki w przeglądarce. Klient widzi dane, nie terminal.",
                    color: "#FFD700",
                  },
                  {
                    title: "Dla współpracownika",
                    desc: "Copywriter dostaje brief w czytelnym interfejsie, nie w surowym pliku .md",
                    color: "white",
                  },
                ].map((item, i) => (
                  <div
                    key={i}
                    className="border-2 border-white bg-zinc-950 p-4"
                    style={{ boxShadow: `3px 3px 0px ${item.color}` }}
                  >
                    <div className="font-display text-sm uppercase mb-2" style={{ color: item.color }}>
                      {item.title}
                    </div>
                    <p className="font-mono text-xs text-zinc-400 leading-relaxed">{item.desc}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </motion.div>

        {/* Struktura serwisu preview */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="border-4 border-white bg-black mb-16 relative"
          style={{ boxShadow: "8px 8px 0px #FFD700" }}
        >
          <div className="absolute -top-4 left-4 bg-white text-black px-3 py-0.5 text-xs font-bold uppercase tracking-widest">
            LIVE_EXAMPLE
          </div>
          <div className="absolute -top-4 right-4 bg-[#FFD700] text-black px-3 py-0.5 text-xs font-bold uppercase tracking-widest">
            STRUKTURA SERWISU
          </div>

          {/* Scrollable preview */}
          <div className="overflow-y-auto" style={{ maxHeight: "320px" }}>
            <pre className="font-mono text-xs text-zinc-300 leading-relaxed p-6 whitespace-pre-wrap">{STRUKTURA_PREVIEW}</pre>
          </div>

          {/* Quote + actions */}
          <div className="px-6 pb-6 pt-4 border-t-2 border-zinc-800">
            <p className="font-mono text-sm md:text-base text-[#FFD700] font-bold leading-relaxed mb-2 border-l-4 border-[#FFD700] pl-4">
              "Kiedy ostatni raz wykonałeś tak dokładną analizę struktury serwisu?"
            </p>
            <p className="font-mono text-xs text-zinc-400 leading-relaxed mb-6 pl-4 border-l-4 border-zinc-700">
              Mi AI zrobiło to w 10 minut. I nigdy wcześniej nie wykonałem czegoś aż tak dokładnego —
              drzewo stron, mapowanie wszystkich keywords, linkowanie wewnętrzne, priorytety publikacji,
              rekomendacje formatów. Wszystko w jednym pliku.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 items-center">
              <a
                href="/pozycjonowanie-zagraniczne_struktura_serwisu.md"
                download="pozycjonowanie-zagraniczne_struktura_serwisu.md"
                className="font-display text-sm uppercase border-4 border-[#FFD700] text-[#FFD700] px-6 py-3 hover:bg-[#FFD700] hover:text-black transition-colors flex items-center gap-2"
                style={{ boxShadow: "3px 3px 0px #ff00ff" }}
              >
                ↓ POBIERZ PEŁNĄ STRUKTURĘ
              </a>
              <p className="font-mono text-xs text-zinc-600">
                → 8 stron · 372 keywords · drzewo ASCII + linkowanie + priorytety
              </p>
            </div>
          </div>
        </motion.div>

        {/* Comparison table */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mb-12"
        >
          <div className="font-mono text-[10px] uppercase tracking-widest text-zinc-500 mb-4">
            // CO ZYSKUJESZ DOKŁADNIE
          </div>

          <div className="border-4 border-white overflow-hidden" style={{ boxShadow: "6px 6px 0px #ff00ff" }}>
            {/* Table header */}
            <div className="grid grid-cols-[1fr_80px_80px] bg-white text-black">
              <div className="px-4 py-3 font-display text-sm uppercase">Umiejętność</div>
              <div className="px-2 py-3 font-display text-sm uppercase text-center border-l-2 border-black">Dzień 1</div>
              <div className="px-2 py-3 font-display text-sm uppercase text-center border-l-2 border-black bg-[#FFD700]">2 Dni</div>
            </div>

            {comparison.map((row, i) => (
              <div
                key={i}
                className={`grid grid-cols-[1fr_80px_80px] border-t-2 border-white/10 ${i % 2 === 0 ? "bg-zinc-950" : "bg-black"}`}
              >
                <div className="px-4 py-3 font-mono text-xs text-zinc-300 flex items-center">
                  {row.skill}
                </div>
                <div className="px-2 py-3 flex items-center justify-center border-l-2 border-white/10">
                  <Cell value={row.d1} />
                </div>
                <div className="px-2 py-3 flex items-center justify-center border-l-2 border-white/10 bg-[#FFD700]/5">
                  <Cell value={row.d2} />
                </div>
              </div>
            ))}

            {/* Price row */}
            <div className="grid grid-cols-[1fr_80px_80px] border-t-4 border-white bg-zinc-950">
              <div className="px-4 py-4 font-display text-sm uppercase text-zinc-400">Cena</div>
              <div className="px-2 py-4 font-display text-base text-center border-l-2 border-white/20 text-white">
                1 499 ZŁ
              </div>
              <div className="px-2 py-4 font-display text-base text-center border-l-2 border-white/20 bg-[#FFD700] text-black">
                2 499 ZŁ
              </div>
            </div>
          </div>
        </motion.div>

        {/* CTA */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center"
        >
          <p className="font-mono text-xs text-zinc-500 mb-4">
            &gt; Różnica 1000 zł. Oszczędzasz setki godzin konfiguracji dla każdego kolejnego klienta.
          </p>
          <button
            onClick={onCTA}
            className="font-display text-xl uppercase bg-[#FFD700] text-black px-12 py-4 hover:bg-white transition-colors border-4 border-black"
            style={{ boxShadow: "5px 5px 0px #ff00ff" }}
          >
            ZAPISZ SIĘ NA 2 DNI →
          </button>
        </motion.div>

      </div>
    </section>
  );
}
