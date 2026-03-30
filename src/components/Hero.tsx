"use client";

import React, { useState, useEffect, lazy, Suspense } from "react";
import Link from "next/link";

const CHARS = "!@#$%^&*()_+{}:<>?|ABCD0123456789";

const ScrambleText = ({
  text,
  delay = 0,
}: {
  text: string;
  delay?: number;
}) => {
  const [displayValue, setDisplayValue] = useState(text);
  const [isAnimating, setIsAnimating] = useState(false);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    if (window.innerWidth < 768) return;

    setDisplayValue(
      text
        .split("")
        .map(() => CHARS[Math.floor(Math.random() * CHARS.length)])
        .join(""),
    );

    const timer = setTimeout(() => {
      setIsAnimating(true);
    }, delay * 1000);

    return () => clearTimeout(timer);
  }, [delay, text]);

  useEffect(() => {
    if (!isAnimating || !mounted || window.innerWidth < 768) return;

    let iteration = 0;
    const interval = setInterval(() => {
      setDisplayValue(
        text
          .split("")
          .map((char, index) => {
            if (index < iteration) {
              return text[index];
            }
            return CHARS[Math.floor(Math.random() * CHARS.length)];
          })
          .join(""),
      );

      if (iteration >= text.length) {
        clearInterval(interval);
      }

      iteration += 1 / 1.5;
    }, 20);

    return () => clearInterval(interval);
  }, [text, isAnimating, mounted]);

  return <span>{displayValue}</span>;
};

const BackgroundEffect = lazy(() => import("./CanvasEffect"));

export default function Hero() {
  const [showEffects, setShowEffects] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setShowEffects(true), 2000);
    return () => clearTimeout(timer);
  }, []);

  return (
    <section className="relative min-h-[95vh] flex flex-col items-center justify-center overflow-hidden pt-20 px-4 md:px-6 bg-white dark:bg-[#080808]">
      {showEffects && (
        <Suspense fallback={null}>
          <BackgroundEffect />
        </Suspense>
      )}

      {/* Hero Content — rendered immediately for fast LCP */}
      <div className="relative z-10 flex flex-col items-center text-center max-w-7xl mx-auto hero-fade-in">
        <div className="mb-6 md:mb-8 w-full px-4">
          <h1 className="select-none text-center">
            <span className="text-[clamp(1.75rem,7.5vw,4.5rem)] md:text-[clamp(2.5rem,5.5vw,4.5rem)] text-neutral-900 dark:text-white font-black leading-[1.1] md:leading-[0.95] tracking-tighter uppercase flex flex-col items-center">
              <span className="flex flex-wrap justify-center gap-x-3 md:gap-x-4">
                <span className="whitespace-nowrap">
                  <ScrambleText text="Modern" delay={0.2} />
                </span>
                <span className="text-accent-glitch whitespace-nowrap">
                  <ScrambleText text="Text Effects" delay={0.6} />
                </span>
              </span>
              <span className="whitespace-nowrap mt-1 md:mt-0">
                <ScrambleText text="Generator" delay={1.0} />
              </span>
            </span>
          </h1>
        </div>

        <p className="text-neutral-500 dark:text-white/60 font-mono text-sm md:text-xl lg:text-2xl max-w-2xl mb-10 md:mb-14 px-6 leading-relaxed tracking-tight hero-fade-in-delayed">
          Create unique and beautiful text effects for your social media. Stand
          out with our professional collection of font styles.
        </p>

        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 md:gap-6 w-full px-8 hero-fade-in-delayed">
          <Link
            href="/collection"
            className="group relative w-full sm:w-auto px-10 py-4 md:py-5 bg-accent-glitch text-black font-black text-xs md:text-sm rounded-full overflow-hidden transition-all hover:scale-105 active:scale-95 shadow-[0_8px_24px_-4px_rgba(57,255,20,0.35)] dark:shadow-[0_8px_24px_-4px_rgba(57,255,20,0.35)] light:shadow-[0_8px_24px_-4px_rgba(22,163,74,0.3)]"
          >
            <span className="relative z-10 uppercase tracking-widest text-center block">
              Try Now
            </span>
          </Link>
          <Link
            href="/collection"
            className="w-full sm:w-auto px-10 py-4 md:py-5 border-2 border-text-primary/20 text-text-primary font-black text-xs md:text-sm rounded-full hover:border-accent-glitch hover:text-accent-glitch transition-all uppercase tracking-widest text-center"
          >
            View Tools
          </Link>
        </div>
      </div>

      {/* Subtle bottom fade */}
      <div className="absolute bottom-0 left-0 w-full h-32 bg-gradient-to-t from-white dark:from-[#080808] to-transparent pointer-events-none" />
    </section>
  );
}
