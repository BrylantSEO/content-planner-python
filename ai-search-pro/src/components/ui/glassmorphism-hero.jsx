import React from "react";
import { 
  ArrowRight, 
  Play, 
  Target, 
  Crown, 
  Sparkles,
  TrendingUp,
  Clock,
  Globe,
  Users
} from "lucide-react";
import GlowCard from "@/components/landing/GlowCard";

const StatItem = ({ value, label }) => (
  <div className="flex flex-col items-center justify-center transition-transform hover:-translate-y-1 cursor-default">
    <span className="text-xl font-bold text-white sm:text-2xl">{value}</span>
    <span className="text-[10px] uppercase tracking-wider text-zinc-500 font-medium sm:text-xs">{label}</span>
  </div>
);

const PROOF_ITEMS = [
  "Growth Marketing",
  "Metryki Meta Ads",
  "Semantic SEO",
  "AI Search",
  "Content Strategy",
  "Topical Authority",
];

export default function GlassmorphismHero({ onCTA }) {
  return (
    <div className="relative w-full bg-zinc-950 text-white overflow-hidden font-sans">
      <style>{`
        @keyframes fadeSlideIn {
          from { opacity: 0; transform: translateY(20px); }
          to { opacity: 1; transform: translateY(0); }
        }
        @keyframes marquee {
          from { transform: translateX(0); }
          to { transform: translateX(-50%); }
        }
        .animate-fade-in {
          animation: fadeSlideIn 0.8s ease-out forwards;
          opacity: 0;
        }
        .animate-marquee {
          animation: marquee 40s linear infinite;
        }
        .delay-100 { animation-delay: 0.1s; }
        .delay-200 { animation-delay: 0.2s; }
        .delay-300 { animation-delay: 0.3s; }
        .delay-400 { animation-delay: 0.4s; }
        .delay-500 { animation-delay: 0.5s; }
        .delay-600 { animation-delay: 0.6s; }
      `}</style>

      {/* Background Image */}
      <div 
        className="absolute inset-0 z-0 bg-cover bg-center opacity-30"
        style={{
          backgroundImage: "url(https://images.unsplash.com/photo-1451187580459-43490279c0fa?w=1200&q=80)",
          maskImage: "linear-gradient(180deg, transparent, black 0%, black 70%, transparent)",
          WebkitMaskImage: "linear-gradient(180deg, transparent, black 0%, black 70%, transparent)",
        }}
      />

      {/* Warm glow */}
      <div className="absolute top-1/3 left-1/4 w-96 h-96 bg-amber-500/10 rounded-full blur-[150px] pointer-events-none" />
      <div className="absolute bottom-1/4 right-1/4 w-64 h-64 bg-amber-400/5 rounded-full blur-[120px] pointer-events-none" />

      <div className="relative z-10 mx-auto max-w-7xl px-4 pt-32 pb-12 sm:px-6 md:pt-40 md:pb-20 lg:px-8">
        <div className="grid grid-cols-1 gap-12 lg:grid-cols-12 lg:gap-8 items-start">
          
          {/* LEFT COLUMN */}
          <div className="lg:col-span-7 flex flex-col justify-center space-y-8 pt-8">
            
            <div className="animate-fade-in delay-100">
              <div className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-4 py-1.5 backdrop-blur-md transition-colors hover:bg-white/10">
                <Sparkles className="w-4 h-4 text-amber-400 fill-amber-400" />
                <span className="text-xs font-semibold uppercase tracking-wider text-zinc-300">
                  Szkolenie stacjonarne | Strategie SEO przyszłości
                </span>
              </div>
            </div>

            <h1 
              className="animate-fade-in delay-200 text-5xl sm:text-6xl lg:text-7xl xl:text-8xl font-medium tracking-tighter leading-[0.9]"
              style={{
                maskImage: "linear-gradient(180deg, black 0%, black 80%, transparent 100%)",
                WebkitMaskImage: "linear-gradient(180deg, black 0%, black 80%, transparent 100%)"
              }}
            >
              Przestań pisać dla algorytmów.<br />
              <span className="bg-gradient-to-br from-white via-white to-[#ffcd75] bg-clip-text text-transparent">
                Zacznij być odpowiedzią
              </span><br />
              dla AI.
            </h1>

            <p className="animate-fade-in delay-300 max-w-xl text-lg text-zinc-400 leading-relaxed">
              Google AI Overview. Perplexity. Organik. Wszystkie trzy — 3 godziny po publikacji jednego artykułu. To nie jest przypadek. To jest system.
            </p>

            {/* Stats bar */}
            <div className="animate-fade-in delay-400 flex flex-col sm:flex-row gap-6 sm:gap-8">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-white/10 ring-1 ring-white/20 flex items-center justify-center shrink-0">
                  <Clock className="w-5 h-5 text-[#ffcd75]" />
                </div>
                <div>
                  <div className="text-white font-bold text-sm">3 godziny</div>
                  <div className="text-zinc-500 text-xs">od publikacji do cytowania przez AI</div>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-white/10 ring-1 ring-white/20 flex items-center justify-center shrink-0">
                  <Globe className="w-5 h-5 text-[#ffcd75]" />
                </div>
                <div>
                  <div className="text-white font-bold text-sm">AI Overview + Perplexity + Organik</div>
                  <div className="text-zinc-500 text-xs">jednocześnie</div>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-white/10 ring-1 ring-white/20 flex items-center justify-center shrink-0">
                  <Users className="w-5 h-5 text-[#ffcd75]" />
                </div>
                <div>
                  <div className="text-white font-bold text-sm">max. 8–10 osób</div>
                  <div className="text-zinc-500 text-xs">każdy pracuje na własnym kliencie</div>
                </div>
              </div>
            </div>

            <div className="animate-fade-in delay-500 flex flex-col sm:flex-row gap-4">
              <button 
                onClick={onCTA}
                className="group inline-flex items-center justify-center gap-2 rounded-full bg-white px-8 py-4 text-sm font-semibold text-zinc-950 transition-all hover:scale-[1.02] hover:bg-zinc-200 active:scale-[0.98]"
              >
                Zapisz się i wyprzedź konkurencję
                <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
              </button>
              
              <button className="group inline-flex items-center justify-center gap-2 rounded-full border border-white/10 bg-white/5 px-8 py-4 text-sm font-semibold text-white backdrop-blur-sm transition-colors hover:bg-white/10 hover:border-white/20">
                <Play className="w-4 h-4 fill-current" />
                Zobacz program
              </button>
            </div>

            <p className="animate-fade-in delay-600 text-sm text-zinc-500 flex items-center gap-2">
              <span className="w-1.5 h-1.5 rounded-full bg-green-500 inline-block" />
              Metody sprawdzone przez Double Digital na najbardziej konkurencyjnym rynku w Polsce.
            </p>
          </div>

          {/* RIGHT COLUMN */}
          <div className="lg:col-span-5 space-y-6 lg:mt-12">
            
            {/* Stats Card */}
            <div className="animate-fade-in delay-500">
              <GlowCard>
                <div className="p-8 relative">
                  <div className="absolute top-0 right-0 -mr-16 -mt-16 h-64 w-64 rounded-full bg-white/5 blur-3xl pointer-events-none" />
                  <div className="relative z-10">
                    <div className="flex items-center gap-4 mb-8">
                      <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-white/10 ring-1 ring-white/20">
                        <Target className="h-6 w-6 text-white" />
                      </div>
                      <div>
                        <div className="text-3xl font-bold tracking-tight text-white">Top 1</div>
                        <div className="text-sm text-zinc-400">Growth Marketing</div>
                      </div>
                    </div>
                    <div className="space-y-3 mb-8">
                      <div className="flex justify-between text-sm">
                        <span className="text-zinc-400">Skutecznosc metod</span>
                        <span className="text-white font-medium">98%</span>
                      </div>
                      <div className="h-2 w-full overflow-hidden rounded-full bg-zinc-800/50">
                        <div className="h-full w-[98%] rounded-full bg-gradient-to-r from-white to-zinc-400" />
                      </div>
                    </div>
                    <div className="h-px w-full bg-white/10 mb-6" />
                    <div className="grid grid-cols-3 gap-4 text-center">
                      <StatItem value="5+" label="Modulow" />
                      <StatItem value="24/7" label="Wsparcie" />
                      <StatItem value="100%" label="Praktyka" />
                    </div>
                    <div className="mt-8 flex flex-wrap gap-2">
                      <div className="inline-flex items-center gap-1.5 rounded-full border border-white/10 bg-white/5 px-3 py-1 text-[10px] font-medium tracking-wide text-zinc-300">
                        <span className="relative flex h-2 w-2">
                          <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
                          <span className="relative inline-flex rounded-full h-2 w-2 bg-green-500"></span>
                        </span>
                        MIEJSCA DOSTEPNE
                      </div>
                      <div className="inline-flex items-center gap-1.5 rounded-full border border-white/10 bg-white/5 px-3 py-1 text-[10px] font-medium tracking-wide text-zinc-300">
                        <Crown className="w-3 h-3 text-yellow-500" />
                        PREMIUM
                      </div>
                    </div>
                  </div>
                </div>
              </GlowCard>
            </div>

            {/* Marquee Card */}
            <div className="animate-fade-in delay-500">
              <GlowCard>
                <div className="py-8">
                  <h3 className="mb-6 px-8 text-sm font-medium text-zinc-400">Sprawdzone na najtrudniejszym rynku</h3>
                  <div 
                    className="relative flex overflow-hidden"
                    style={{
                      maskImage: "linear-gradient(to right, transparent, black 20%, black 80%, transparent)",
                      WebkitMaskImage: "linear-gradient(to right, transparent, black 20%, black 80%, transparent)"
                    }}
                  >
                    <div className="animate-marquee flex gap-12 whitespace-nowrap px-4">
                      {[...PROOF_ITEMS, ...PROOF_ITEMS, ...PROOF_ITEMS].map((item, i) => (
                        <div 
                          key={i}
                          className="flex items-center gap-2 opacity-50 transition-all hover:opacity-100 hover:scale-105 cursor-default"
                        >
                          <TrendingUp className="h-5 w-5 text-[#ffcd75]" />
                          <span className="text-base font-bold text-white tracking-tight">
                            {item}
                          </span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </GlowCard>
            </div>

          </div>
        </div>
      </div>
    </div>
  );
}