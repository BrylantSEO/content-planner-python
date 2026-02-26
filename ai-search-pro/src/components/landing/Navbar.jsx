import React from "react";
import { Zap } from "lucide-react";

export default function Navbar({ onCTA }) {
  return (
    <header className="fixed top-0 z-[100] w-full mix-blend-difference px-4 py-4 md:py-6">
      <div className="flex items-center justify-between border-b-4 border-white pb-2 max-w-7xl mx-auto">
        <div className="flex items-center gap-2">
          <Zap className="w-6 h-6 md:w-8 md:h-8 text-[#FFD700]" />
          <h2 className="text-xl md:text-3xl font-display tracking-widest text-white uppercase">
            AI_MASTERCLASS
          </h2>
        </div>
        <nav className="hidden lg:flex gap-6 text-xs font-bold uppercase tracking-tighter">
          <a className="hover:bg-[#ff00ff] px-2 py-1 transition-colors" href="#arsenal">[ DOWODY ]</a>
          <a className="hover:bg-[#FFD700] hover:text-black px-2 py-1 transition-colors" href="#agenda">[ AGENDA ]</a>
          <a className="hover:bg-white hover:text-black px-2 py-1 transition-colors" href="#pricing">[ CENNIK ]</a>
        </nav>
        <button
          onClick={onCTA}
          className="bg-[#ff00ff] text-black font-display text-lg md:text-xl px-4 md:px-6 py-1 hover:skew-x-6 transition-transform uppercase tracking-wide"
        >
          SYSTEM_START
        </button>
      </div>
    </header>
  );
}