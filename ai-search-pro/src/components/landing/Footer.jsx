import React from "react";
import { Zap } from "lucide-react";

export default function Footer() {
  return (
    <footer className="border-t-4 border-white py-12 px-4">
      <div className="max-w-6xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-12">
          {/* Brand */}
          <div>
            <div className="flex items-center gap-2 mb-4">
              <Zap className="w-6 h-6 text-[#FFD700]" />
              <span className="text-xl font-display tracking-widest text-white uppercase">AI_MASTERCLASS</span>
            </div>
            <p className="text-zinc-600 font-mono text-xs">
              FRAMEWORK_BY // KULKOWSKI_SEO<br />
              VERIFIED_2026_PL
            </p>
          </div>

          {/* Nav */}
          <div>
            <div className="bg-[#FFD700] text-black px-2 text-xs font-bold uppercase w-fit mb-4">NAV_SYS</div>
            <div className="space-y-2 font-mono text-sm">
              <a href="#arsenal" className="block text-zinc-400 hover:text-[#ff00ff] transition-colors">&gt; Dowody</a>
              <a href="#agenda" className="block text-zinc-400 hover:text-[#ff00ff] transition-colors">&gt; Agenda</a>
              <a href="#pricing" className="block text-zinc-400 hover:text-[#ff00ff] transition-colors">&gt; Cennik</a>
            </div>
          </div>

          {/* Contact */}
          <div>
            <div className="bg-[#ff00ff] text-white px-2 text-xs font-bold uppercase w-fit mb-4">CONNECTION</div>
            <div className="space-y-2 font-mono text-sm text-zinc-400">
              <p>&gt; kontakt@kulkowski.pl</p>
              <p>&gt; Warszawa, PL</p>
            </div>
          </div>
        </div>

        <div className="border-t-4 border-white/10 mt-8 pt-6 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-zinc-600 font-mono text-[10px] uppercase tracking-widest">
            &copy; 2026 KULKOWSKI_SEO // ALL_RIGHTS_RESERVED
          </p>
          <div className="text-zinc-600 font-mono text-[10px] uppercase tracking-widest">
            RUNNING_V.06.2 // SEMANTIC_OS_FRAMEWORK
          </div>
        </div>
      </div>
    </footer>
  );
}