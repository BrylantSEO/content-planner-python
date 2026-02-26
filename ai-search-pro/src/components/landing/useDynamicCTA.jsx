import { useState, useEffect } from "react";

const UTM_KEYS = ["utm_source", "utm_medium", "utm_campaign"];

function getUserSegment() {
  const params = new URLSearchParams(window.location.search);
  const utmSource = params.get("utm_source") || "";
  const utmCampaign = params.get("utm_campaign") || "";

  // Returning visitor
  if (localStorage.getItem("mc_visited")) return "returning";

  // Social media traffic
  if (["facebook", "instagram", "linkedin", "tiktok"].includes(utmSource.toLowerCase())) return "social";

  // Paid ads
  if (utmSource === "google" && params.get("utm_medium") === "cpc") return "paid";

  // Campaign-specific
  if (utmCampaign.toLowerCase().includes("early")) return "earlybird";

  return "default";
}

function getScrollProgress() {
  const scrollTop = window.scrollY;
  const docHeight = document.documentElement.scrollHeight - window.innerHeight;
  return docHeight > 0 ? scrollTop / docHeight : 0;
}

const CTA_CONFIGS = {
  hero: {
    default:     { text: "POKAŻ MI JAK →", style: "primary" },
    scrolled:    { text: "ZAREZERWUJ MIEJSCE", style: "urgent" },
    returning:   { text: "WRACASZ? DOKOŃCZ REJESTRACJĘ", style: "urgent" },
    social:      { text: "DOŁĄCZ DO EKIPY", style: "primary" },
    paid:        { text: "ODBIERZ SWOJE MIEJSCE", style: "urgent" },
    earlybird:   { text: "EARLY BIRD — ZAPISZ SIĘ", style: "gold" },
  },
  pricing: {
    default:     { text: "REZERWUJ", style: "primary" },
    scrolled:    { text: "OSTATNIE MIEJSCA →", style: "urgent" },
    returning:   { text: "TWOJE MIEJSCE CZEKA", style: "urgent" },
    social:      { text: "WCHODZĘ W TO", style: "primary" },
    paid:        { text: "ZABEZPIECZ MIEJSCE", style: "urgent" },
    earlybird:   { text: "EARLY BIRD — REZERWUJ", style: "gold" },
  },
};

const STYLE_CLASSES = {
  primary: "brutalist-border !shadow-[8px_8px_0px_#ff00ff] bg-white text-black hover:bg-[#FFD700]",
  urgent:  "brutalist-border !shadow-[8px_8px_0px_#FFD700] bg-[#ff00ff] text-white hover:bg-[#FFD700] hover:text-black animate-pulse-slow",
  gold:    "brutalist-border !shadow-[8px_8px_0px_#ff00ff] bg-[#FFD700] text-black hover:bg-white",
};

export default function useDynamicCTA(section = "hero") {
  const [ctaState, setCtaState] = useState({ text: "", style: "primary" });

  useEffect(() => {
    const segment = getUserSegment();
    localStorage.setItem("mc_visited", "1");

    const config = CTA_CONFIGS[section] || CTA_CONFIGS.hero;

    // Check segment-specific CTA first
    if (segment !== "default" && config[segment]) {
      setCtaState(config[segment]);
      return;
    }

    // Default — then switch on scroll
    setCtaState(config.default);

    const handleScroll = () => {
      const progress = getScrollProgress();
      if (progress > 0.3) {
        setCtaState(config.scrolled);
      } else {
        const seg = getUserSegment();
        setCtaState(config[seg] || config.default);
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, [section]);

  return {
    text: ctaState.text,
    className: STYLE_CLASSES[ctaState.style] || STYLE_CLASSES.primary,
  };
}