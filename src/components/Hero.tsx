import React from "react";
import Link from "next/link";
import HeroAnimation from "./HeroAnimation";

/**
 * Hero section — server-rendered static content for instant LCP.
 * The scramble text animation is deferred to a client component
 * that hydrates after the page renders.
 */
export default function Hero() {
  return (
    <section className="relative min-h-[90vh] flex flex-col items-center justify-center overflow-hidden px-4 md:px-6 bg-bg-void">
      {/* Hero Content — server-rendered, visible immediately */}
      <div className="relative z-10 flex flex-col items-center text-center max-w-7xl mx-auto">
        <div className="mb-6 md:mb-8 w-full px-4">
          <h1 id="hero-heading" className="select-none text-center">
            <span className="text-[clamp(1.75rem,7.5vw,4.5rem)] md:text-[clamp(2.5rem,5.5vw,4.5rem)] text-neutral-900 dark:text-white font-black leading-[1.1] md:leading-[0.95] tracking-tighter uppercase flex flex-col items-center">
              <span className="flex flex-wrap justify-center gap-x-3 md:gap-x-4">
                <span className="whitespace-nowrap">Modern</span>
                <span className="text-emerald-600 dark:text-accent-glitch whitespace-nowrap">
                  Text Effects
                </span>
              </span>
              <span className="whitespace-nowrap mt-1 md:mt-0">Generator</span>
            </span>
          </h1>
        </div>

        <p className="text-neutral-500 dark:text-white/60 font-mono text-sm md:text-xl lg:text-2xl max-w-2xl mb-10 md:mb-14 px-6 leading-relaxed tracking-tight">
          Create unique and beautiful text effects for your social media. Stand
          out with our professional collection of font styles.
        </p>

        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 md:gap-6 w-full px-8">
          <Link
            href="/dark-horror/cursed-text"
            className="group relative w-full sm:w-auto px-10 py-4 md:py-5 bg-emerald-500 dark:bg-accent-glitch text-white dark:text-bg-void font-black text-xs md:text-sm rounded-full overflow-hidden transition-all hover:scale-105 active:scale-95 shadow-[0_0_20px_-5px_rgba(16,185,129,0.5)] dark:shadow-[0_0_25px_-5px_rgba(57,255,20,0.5)] hover:shadow-[0_0_35px_-5px_rgba(16,185,129,0.5)] dark:hover:shadow-[0_0_35px_-5px_rgba(57,255,20,0.5)]"
          >
            <span className="relative z-10 uppercase tracking-widest text-center block">
              Try Cursed Text
            </span>
          </Link>
          <Link
            href="/collection"
            className="w-full sm:w-auto px-10 py-4 md:py-5 border-2 border-emerald-500/30 dark:border-accent-glitch/20 text-emerald-500 dark:text-white font-black text-xs md:text-sm rounded-full hover:border-emerald-500 dark:hover:border-accent-glitch hover:text-emerald-600 dark:hover:text-emerald-600 dark:text-accent-glitch hover:bg-emerald-500/5 dark:hover:bg-accent-glitch/5 transition-all uppercase tracking-widest text-center"
          >
            View All Tools
          </Link>
        </div>
      </div>

      {/* Deferred animation — loads after page render, doesn't block LCP */}
      <HeroAnimation />

      {/* Subtle bottom fade */}
      <div className="absolute bottom-0 left-0 w-full h-32 bg-gradient-to-t from-bg-void to-transparent pointer-events-none" />
    </section>
  );
}
