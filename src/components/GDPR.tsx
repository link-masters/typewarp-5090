"use client";
import React, { useState, useEffect } from "react";
import Link from "next/link";
import { ShieldCheck } from "lucide-react";

const GDPR = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [shouldRender, setShouldRender] = useState(false);

  useEffect(() => {
    const accepted = localStorage.getItem("gdpr-accepted");
    if (!accepted) {
      const timer = setTimeout(() => {
        setShouldRender(true);
        requestAnimationFrame(() => setIsVisible(true));
      }, 1500);
      return () => clearTimeout(timer);
    }
  }, []);

  const handleAccept = () => {
    localStorage.setItem("gdpr-accepted", "true");
    setIsVisible(false);
    setTimeout(() => setShouldRender(false), 300);
  };

  if (!shouldRender) return null;

  return (
    <div
      className={`fixed bottom-4 left-4 right-4 md:left-auto md:right-8 md:bottom-8 z-[9999] max-w-sm w-full transition-all duration-300 ${
        isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
      }`}
    >
      <div className="bg-white/95 dark:bg-bg-void/95 backdrop-blur-xl border border-neutral-200 dark:border-white/10 shadow-2xl relative overflow-hidden ring-1 ring-neutral-200 dark:ring-white/5 rounded-2xl">
        <div className="p-5 flex flex-col gap-5">
          <div className="flex items-start gap-4">
            <div className="w-12 h-12 shrink-0 bg-accent-glitch/10 flex items-center justify-center rounded-full">
              <ShieldCheck className="w-6 h-6 text-accent-glitch" />
            </div>

            <div className="flex-1">
              <h4 className="text-sm font-bold text-text-primary mb-1.5 leading-tight">
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
              className="text-xs font-medium text-text-muted hover:text-text-primary transition-colors underline underline-offset-4"
            >
              Privacy Policy
            </Link>

            <button
              onClick={handleAccept}
              className="bg-accent-glitch text-black font-bold text-xs py-2.5 px-8 hover:brightness-110 active:scale-95 transition-all shadow-lg hover:shadow-accent-glitch/20 rounded-full"
            >
              Accept All
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default GDPR;
