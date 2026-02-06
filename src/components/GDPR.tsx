"use client";
import React, { useState, useEffect } from "react";
import Link from "next/link";

const GDPR = () => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    // Check local storage to see if user accepted cookies
    const accepted = localStorage.getItem("gdpr-accepted");
    if (!accepted) {
      // Small delay to show animation
      setTimeout(() => setIsVisible(true), 1000);
    }
  }, []);

  const handleAccept = () => {
    localStorage.setItem("gdpr-accepted", "true");
    setIsVisible(false);
  };

  if (!isVisible) return null;

  return (
    <div className="fixed bottom-4 left-4 right-4 sm:left-6 sm:bottom-6 sm:right-auto z-[100] animate-fade-in-up">
      <div className="group relative bg-black/60 backdrop-blur-xl border border-white/10 rounded-2xl p-4 sm:p-5 max-w-sm sm:max-w-xs shadow-[0_10px_40px_rgba(0,0,0,0.5)] transition-all duration-75 hover:scale-[1.02] hover:bg-black/80 hover:border-red-500/30 hover:shadow-[0_0_20px_rgba(220,38,38,0.2)]">
        <div className="flex items-center sm:items-start gap-4">
          <div className="text-2xl sm:text-3xl bg-white/5 p-2 rounded-xl group-hover:rotate-12 transition-transform duration-200 shrink-0">
            🍪
          </div>
          <div className="flex-1">
            <h4 className="font-bold text-white text-sm sm:text-base mb-0.5 sm:mb-1 group-hover:text-red-400 transition-colors">
              Cookies & Privacy
            </h4>
            <p className="text-[10px] sm:text-xs text-zinc-400 leading-relaxed">
              We use cookies to ensure you get the best{" "}
              <span className="text-red-500 font-bold">TypeWarp</span>{" "}
              experience.
            </p>
          </div>
        </div>

        <div className="mt-4 flex items-center justify-between gap-3">
          <Link
            href="/cookies"
            className="text-xs font-medium text-zinc-500 hover:text-white transition-colors duration-75 underline decoration-zinc-700 underline-offset-4"
          >
            View Policy
          </Link>
          <button
            onClick={handleAccept}
            className="bg-white text-black text-xs font-bold px-6 py-2.5 rounded-xl hover:bg-red-600 hover:text-white transition-all duration-75 active:scale-95 shadow-lg"
          >
            ACCEPT
          </button>
        </div>

        {/* Animated Border Gradient */}
        <div className="absolute inset-0 rounded-2xl bg-gradient-to-r from-red-500/20 to-purple-500/20 opacity-0 group-hover:opacity-100 transition-opacity duration-200 pointer-events-none" />
      </div>
    </div>
  );
};

export default GDPR;
