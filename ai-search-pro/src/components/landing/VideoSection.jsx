import React from "react";
import { motion } from "framer-motion";
import { Play } from "lucide-react";

function VideoSlot({ title, url, desc }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      className="border-4 border-white bg-black"
      style={{ boxShadow: "6px 6px 0px #ff00ff" }}
    >
      <div className="relative w-full" style={{ paddingTop: "56.25%" }}>
        {url ? (
          <iframe
            className="absolute inset-0 w-full h-full"
            src={url}
            title={title}
            frameBorder="0"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
          />
        ) : (
          <div className="absolute inset-0 flex flex-col items-center justify-center border-4 border-[#ff00ff] bg-black">
            <Play className="w-12 h-12 text-[#ff00ff] mb-3 animate-pulse" />
            <div className="font-mono font-bold text-[#ff00ff] text-sm uppercase tracking-widest">
              // NAGRANIE WKRÓTCE
            </div>
          </div>
        )}
      </div>
      <div className="p-4 border-t-4 border-white">
        <div className="font-mono font-bold text-white text-sm uppercase tracking-wider mb-1">{title}</div>
        {desc && <p className="font-mono text-xs text-zinc-400 leading-relaxed">{desc}</p>}
      </div>
    </motion.div>
  );
}

export default function VideoSection({ videos = [] }) {
  const slots = [
    videos[0] || { title: "Brief w 10 minut", url: null, desc: "Jak wygenerować pełny content brief dla klienta w czasie jednej kawy." },
    videos[1] || { title: "Audyt live", url: null, desc: "Pełny audyt artykułu od zera — scoring CQS, EAV, BLUF, struktura chunków." },
    videos[2] || { title: "Demo narzędzi", url: null, desc: "Przegląd narzędzi używanych na szkoleniu: Semantic-OS, Crawl4AI, pgvector." },
  ].slice(0, 3);

  return (
    <section className="relative py-24 md:py-32 px-4 bg-black">
      <div className="max-w-6xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mb-16 flex flex-col md:flex-row items-baseline gap-4 border-b-8 border-white pb-4"
        >
          <h2 className="text-5xl md:text-7xl lg:text-8xl font-display uppercase leading-none text-white">DEMO</h2>
          <span className="text-xl font-mono font-bold bg-[#ff00ff] text-white px-4">[ OBEJRZYJ JAK TO DZIAŁA ]</span>
        </motion.div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {slots.map((v, i) => (
            <VideoSlot key={i} title={v.title} url={v.url} desc={v.desc} />
          ))}
        </div>
      </div>
    </section>
  );
}
