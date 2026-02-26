import React, { useState } from "react";
import { base44 } from "@/api/base44Client";
import { X, Loader2, CreditCard } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { getStoredUTM, trackEvent } from "./TrackingScripts";

export default function RegistrationModal({ isOpen, onClose }) {
  const [form, setForm] = useState({ name: "", email: "", phone: "", company_name: "" });
  const [loading, setLoading] = useState(false);

  const isInIframe = window.self !== window.top;

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (isInIframe) {
      alert("Platnosci dzialaja tylko z opublikowanej strony. Otworz strone w nowej karcie.");
      return;
    }

    setLoading(true);
    trackEvent("Purchase", { value: 1499, currency: "PLN" });
    trackEvent("Lead");

    const utm = getStoredUTM();
    const response = await base44.functions.invoke('createCheckout', {
      ...form,
      ...utm,
      return_url: window.location.origin + window.location.pathname,
    });
    
    if (response.data?.url) {
      window.location.href = response.data.url;
    }
    setLoading(false);
  };

  const handleClose = () => {
    setForm({ name: "", email: "", phone: "", company_name: "" });
    onClose();
  };

  const inputClass = "w-full border-4 border-white/30 bg-black px-4 py-3 text-white font-mono text-sm placeholder-zinc-600 focus:border-[#ff00ff] focus:outline-none transition-colors";

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-50 flex items-center justify-center p-4"
          onClick={handleClose}
        >
          <div className="absolute inset-0 bg-black/90" />
          <motion.div
            initial={{ scale: 0.9, opacity: 0, y: 20 }}
            animate={{ scale: 1, opacity: 1, y: 0 }}
            exit={{ scale: 0.9, opacity: 0, y: 20 }}
            transition={{ type: "spring", damping: 25, stiffness: 300 }}
            onClick={(e) => e.stopPropagation()}
            className="relative w-full max-w-md border-4 border-white bg-black p-8"
            style={{ boxShadow: "12px 12px 0px #ff00ff" }}
          >
            <button
              onClick={handleClose}
              className="absolute top-4 right-4 text-zinc-500 hover:text-[#ff00ff] transition-colors"
            >
              <X className="w-6 h-6" />
            </button>

            <div className="bg-[#FFD700] text-black px-3 py-1 text-xs font-bold uppercase tracking-wider w-fit mb-4">
              CHECKOUT_INIT
            </div>
            <h3 className="text-3xl font-display text-white uppercase mb-1">KUP BILET</h3>
            <p className="text-zinc-500 font-mono text-xs mb-6">&gt; Wypelnij dane, przejdz do platnosci</p>

            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-xs font-mono font-bold text-zinc-400 mb-1.5 uppercase tracking-wider">Imie i Nazwisko *</label>
                <input
                  type="text"
                  required
                  value={form.name}
                  onChange={(e) => setForm({ ...form, name: e.target.value })}
                  className={inputClass}
                  placeholder="Jan Kowalski"
                />
              </div>
              <div>
                <label className="block text-xs font-mono font-bold text-zinc-400 mb-1.5 uppercase tracking-wider">Email *</label>
                <input
                  type="email"
                  required
                  value={form.email}
                  onChange={(e) => setForm({ ...form, email: e.target.value })}
                  className={inputClass}
                  placeholder="jan@firma.pl"
                />
              </div>
              <div>
                <label className="block text-xs font-mono font-bold text-zinc-400 mb-1.5 uppercase tracking-wider">Telefon</label>
                <input
                  type="tel"
                  value={form.phone}
                  onChange={(e) => setForm({ ...form, phone: e.target.value })}
                  className={inputClass}
                  placeholder="+48 123 456 789"
                />
              </div>
              <div>
                <label className="block text-xs font-mono font-bold text-zinc-400 mb-1.5 uppercase tracking-wider">Nazwa firmy</label>
                <input
                  type="text"
                  value={form.company_name}
                  onChange={(e) => setForm({ ...form, company_name: e.target.value })}
                  className={inputClass}
                  placeholder="Moja Firma Sp. z o.o."
                />
              </div>
              <button
                type="submit"
                disabled={loading}
                className="w-full py-4 bg-[#ff00ff] text-black font-display text-2xl uppercase hover:bg-[#FFD700] transition-colors disabled:opacity-60 flex items-center justify-center gap-2"
              >
                {loading ? (
                  <>
                    <Loader2 className="w-5 h-5 animate-spin" />
                    PROCESSING...
                  </>
                ) : (
                  <>
                    <CreditCard className="w-5 h-5" />
                    PŁATNOŚĆ — 1 499 PLN
                  </>
                )}
              </button>
              <p className="text-center font-mono text-[10px] text-zinc-600 uppercase tracking-wider">
                SECURE_PAYMENT // STRIPE // BLIK // P24
              </p>
            </form>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}