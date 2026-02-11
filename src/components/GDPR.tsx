"use client";
import React, { useState, useEffect } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { ShieldCheck, ArrowRight, X } from "lucide-react";

const GDPR = () => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    // Check local storage to see if user accepted cookies
    const accepted = localStorage.getItem("gdpr-accepted");
    if (!accepted) {
      setTimeout(() => setIsVisible(true), 1500);
    }
  }, []);

  const handleAccept = () => {
    localStorage.setItem("gdpr-accepted", "true");
    setIsVisible(false);
  };

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          initial={{ y: 50, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: 20, opacity: 0 }}
          className="fixed bottom-4 left-4 right-4 md:left-auto md:right-8 md:bottom-8 z-[9999] max-w-sm w-full"
        >
          <div className="bg-bg-void/90 backdrop-blur-2xl border border-white/5 shadow-[0_20px_50px_rgba(0,0,0,0.5)] relative overflow-hidden group">
            {/* Technical Header Line */}
            <div className="h-[1px] w-full bg-gradient-to-r from-transparent via-accent-glitch/30 to-transparent" />

            <div className="p-4 md:p-5 flex flex-col gap-4">
              <div className="flex items-start gap-4">
                <div className="w-10 h-10 shrink-0 border border-accent-glitch/20 bg-accent-glitch/5 flex items-center justify-center">
                  <ShieldCheck className="w-5 h-5 text-accent-glitch" />
                </div>

                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 mb-1">
                    <span className="text-[10px] font-mono text-accent-glitch font-black uppercase tracking-[0.2em]">
                      System_Protocol
                    </span>
                    <div className="h-[1px] flex-1 bg-white/5" />
                  </div>
                  <h4 className="text-xs font-black text-white uppercase tracking-widest mb-1.5 font-mono">
                    Cookie_Authorization
                  </h4>
                  <p className="text-[10px] text-text-muted font-mono leading-relaxed uppercase tracking-tight">
                    TypeWarp uses cryptographic data modules (cookies) to
                    optimize your transformation latency.
                  </p>
                </div>
              </div>

              <div className="flex items-center justify-between gap-4 pt-4 border-t border-white/5">
                <Link
                  href="/cookies"
                  className="text-[9px] font-mono text-text-muted hover:text-white transition-colors flex items-center gap-1.5 uppercase tracking-widest group/link"
                >
                  View_Specs
                  <ArrowRight className="w-2.5 h-2.5 opacity-40 group-hover/link:translate-x-1 transition-transform" />
                </Link>

                <button
                  onClick={handleAccept}
                  className="bg-accent-glitch text-black font-black text-[10px] py-2 px-6 uppercase tracking-[0.2em] hover:brightness-110 active:scale-95 transition-all shadow-[0_0_15px_rgba(57,255,20,0.2)]"
                >
                  Initialize_Protocol
                </button>
              </div>
            </div>

            {/* Background Detail */}
            <div className="absolute top-0 right-0 p-2 opacity-[0.03] pointer-events-none">
              <ShieldCheck className="w-16 h-16" />
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default GDPR;
