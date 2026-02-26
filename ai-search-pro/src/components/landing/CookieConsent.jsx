import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

export default function CookieConsent() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const accepted = localStorage.getItem("cookie_consent");
    if (!accepted) {
      const timer = setTimeout(() => setVisible(true), 1500);
      return () => clearTimeout(timer);
    }
  }, []);

  const handleAccept = () => {
    localStorage.setItem("cookie_consent", "true");
    setVisible(false);
  };

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          initial={{ y: 100, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: 100, opacity: 0 }}
          transition={{ type: "spring", damping: 25, stiffness: 200 }}
          className="fixed bottom-0 left-0 right-0 z-50 p-4"
        >
          <div className="max-w-3xl mx-auto border-4 border-white bg-black px-6 py-4 flex flex-col sm:flex-row items-center gap-4" style={{ boxShadow: "6px 6px 0px #ff00ff" }}>
            <p className="text-xs text-zinc-400 font-mono flex-1 uppercase tracking-wider">
              &gt; COOKIES_ACTIVE // Ta strona używa plików cookies w celu analizy ruchu.
            </p>
            <button
              onClick={handleAccept}
              className="shrink-0 px-6 py-2 bg-[#FFD700] text-black font-display text-lg uppercase hover:bg-white transition-colors"
            >
              AKCEPTUJĘ
            </button>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}