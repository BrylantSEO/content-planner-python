import React from "react";
import { GlowingEffect } from "@/components/ui/glowing-effect";
import { cn } from "@/lib/utils";

export default function GlowCard({ children, className }) {
  return (
    <div className={cn("relative rounded-[1.25rem] border-[0.75px] border-white/10 p-[3px]", className)}>
      <GlowingEffect
        spread={40}
        glow={true}
        disabled={false}
        proximity={64}
        inactiveZone={0.01}
        borderWidth={3}
      />
      <div className="relative h-full rounded-[1.15rem] border-[0.75px] border-white/5 bg-white/[0.03] backdrop-blur-xl overflow-hidden">
        {children}
      </div>
    </div>
  );
}