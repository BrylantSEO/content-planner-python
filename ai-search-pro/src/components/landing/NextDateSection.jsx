import React from "react";
import { Calendar, MapPin, ArrowRight } from "lucide-react";
import useDynamicCTA from "./useDynamicCTA";

export default function NextDateSection({ date = "15–16 MARCA 2026", city = "WARSZAWA", venue = "ul. Marszałkowska 1", spotsLeft = 6, onCTA }) {
  const cta = useDynamicCTA("next-date");

  return (
    <section className="relative py-12 bg-[#FFD700] text-black overflow-hidden">
      <div className="max-w-5xl mx-auto px-4">
        <div className="border-4 border-black bg-[#FFD700] relative" style={{ boxShadow: "8px 8px 0px black" }}>
          <div className="absolute -top-4 -right-4 bg-black text-[#FFD700] px-4 py-1 font-bold text-sm uppercase tracking-widest">
            ZOSTAŁO {spotsLeft} MIEJSC
          </div>

          <div className="p-6 md:p-8">
            <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-6">
              <div>
                <div className="text-xs font-bold uppercase tracking-widest mb-3 opacity-60">NAJBLIŻSZY TERMIN</div>
                <div className="flex flex-col sm:flex-row gap-4 sm:gap-8">
                  <div className="flex items-center gap-2">
                    <Calendar className="w-5 h-5 shrink-0" />
                    <span className="font-display text-2xl md:text-3xl uppercase">{date}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <MapPin className="w-5 h-5 shrink-0" />
                    <span className="font-mono font-bold text-base md:text-lg uppercase">{city} · {venue}</span>
                  </div>
                </div>
              </div>

              <div className="flex flex-col sm:flex-row gap-3 shrink-0">
                <div className="text-center border-4 border-black px-4 py-2">
                  <div className="font-display text-xl">DZIEŃ 1</div>
                  <div className="font-bold text-base">1 499 ZŁ</div>
                </div>
                <div className="text-center border-4 border-black bg-black text-[#FFD700] px-4 py-2">
                  <div className="font-display text-xl">2 DNI</div>
                  <div className="font-bold text-base">2 499 ZŁ</div>
                </div>
                <button
                  onClick={onCTA}
                  className="flex items-center justify-center gap-2 bg-black text-[#FFD700] font-display text-xl px-6 py-4 hover:bg-white hover:text-black transition-colors group border-4 border-black"
                >
                  REZERWUJĘ MIEJSCE
                  <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
