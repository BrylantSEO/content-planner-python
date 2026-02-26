import React from "react";
import { motion } from "framer-motion";
import { CheckCircle2, X } from "lucide-react";

export default function PaymentSuccess() {
  const handleClose = () => {
    window.history.replaceState({}, '', window.location.pathname);
    window.location.reload();
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="fixed inset-0 z-50 flex items-center justify-center p-4"
    >
      <div className="absolute inset-0 bg-black/90" onClick={handleClose} />
      <motion.div
        initial={{ scale: 0.9, opacity: 0, y: 20 }}
        animate={{ scale: 1, opacity: 1, y: 0 }}
        transition={{ type: "spring", damping: 25, stiffness: 300 }}
        className="relative w-full max-w-md border-4 border-[#FFD700] bg-black p-8 text-center"
        style={{ boxShadow: "12px 12px 0px #ff00ff" }}
      >
        <button
          onClick={handleClose}
          className="absolute top-4 right-4 text-zinc-500 hover:text-white transition-colors"
        >
          <X className="w-6 h-6" />
        </button>
        <div className="w-16 h-16 mx-auto mb-5 border-4 border-[#FFD700] flex items-center justify-center" style={{ boxShadow: "4px 4px 0px #ff00ff" }}>
          <CheckCircle2 className="w-8 h-8 text-[#FFD700]" />
        </div>
        <h3 className="text-3xl font-display text-[#FFD700] uppercase mb-3">SYSTEM_CONFIRMED</h3>
        <p className="text-zinc-400 font-mono text-sm leading-relaxed">
          &gt; Platnosc zakonczona pomyslnie.<br />
          &gt; Potwierdzenie na email.
        </p>
        <button
          onClick={handleClose}
          className="mt-6 px-8 py-3 border-4 border-white text-white font-display text-xl uppercase hover:bg-white hover:text-black transition-colors"
        >
          ZAMKNIJ
        </button>
      </motion.div>
    </motion.div>
  );
}