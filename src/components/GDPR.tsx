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
          <div className="bg-bg-void/95 backdrop-blur-xl border border-white/10 shadow-2xl relative overflow-hidden ring-1 ring-white/5">
            <div className="p-5 flex flex-col gap-5">
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 shrink-0 bg-accent-glitch/10 flex items-center justify-center rounded-full">
                  <ShieldCheck className="w-6 h-6 text-accent-glitch" />
                </div>

                <div className="flex-1">
                  <h4 className="text-sm font-bold text-white mb-1.5 leading-tight">
                    We use cookies
                  </h4>
                  <p className="text-xs text-text-muted leading-relaxed">
                    We use cookies to enhance your experience, analyze site
                    traffic, and support our transformation engine.
                  </p>
                </div>
              </div>

              <div className="flex items-center justify-between gap-6">
                <Link
                  href="/cookies"
                  className="text-xs font-medium text-text-muted hover:text-white transition-colors underline underline-offset-4"
                >
                  Privacy Policy
                </Link>

                <button
                  onClick={handleAccept}
                  className="bg-accent-glitch text-black font-bold text-xs py-2.5 px-8 hover:brightness-110 active:scale-95 transition-all shadow-lg hover:shadow-accent-glitch/20"
                >
                  Accept All
                </button>
              </div>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default GDPR;
