"use client";

import React, { useState } from "react";
import { corruptText } from "@/lib/cursed";
import RainingLetters from "@/components/ui/modern-animated-hero-section";

const Hero = () => {
  const [input, setInput] = useState("");
  const [output, setOutput] = useState("");
  const [isCopied, setIsCopied] = useState(false);

  const handleCorrupt = () => {
    if (!input) return;
    const corrupted = corruptText(input);
    setOutput(corrupted);
  };

  const handleCopy = () => {
    if (!output) return;
    navigator.clipboard.writeText(output);
    setIsCopied(true);
    setTimeout(() => setIsCopied(false), 2000);
  };

  return (
    <section className="relative min-h-[90vh] flex flex-col items-center justify-center pt-20 md:pt-32 pb-12 md:pb-20 overflow-hidden">
      {/* Animated Background Elements */}
      <div className="absolute inset-0 -z-10 bg-[var(--background)]">
        <RainingLetters showTitle={false} fullHeight={true} />
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-[var(--background)]/10 to-[var(--background)] z-10" />
      </div>

      <div className="container mx-auto px-4 relative z-10 text-center">
        {/* Badge */}
        <div className="inline-flex items-center gap-2 px-3 py-1.5 md:px-4 md:py-2 mb-4 md:mb-8 rounded-full border border-zinc-200 dark:border-[var(--card-border)] bg-white dark:bg-[var(--card-bg)] backdrop-blur-xl shadow-[0_4px_20px_rgba(0,0,0,0.04)] dark:shadow-[0_0_30px_rgba(220,38,38,0.15)] animate-fade-in">
          <span className="relative flex h-2 w-2">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-400 opacity-75"></span>
            <span className="relative inline-flex rounded-full h-2 w-2 bg-red-500"></span>
          </span>
          <span className="text-[10px] md:text-xs font-bold tracking-[0.2em] uppercase text-[var(--muted)]">
            58+ Advanced Text Generators
          </span>
        </div>

        {/* Main Heading */}
        <h1 className="text-3xl sm:text-5xl md:text-7xl lg:text-9xl font-black mb-4 md:mb-8 tracking-tighter leading-[1.1] md:leading-[1.05] animate-fade-in-up">
          <span className="block bg-gradient-to-b from-[var(--foreground)] via-[var(--foreground)] to-[var(--muted)] bg-clip-text text-transparent">
            Warp your
          </span>
          <span className="relative inline-block mt-1 md:mt-2">
            <span className="bg-gradient-to-r from-red-500 via-purple-500 to-blue-500 bg-clip-text text-transparent animate-gradient-x px-2 md:px-4">
              Digital Reality
            </span>
            <span className="absolute -bottom-1 md:-bottom-4 left-0 right-0 h-1 md:h-1.5 bg-gradient-to-r from-transparent via-red-600 to-transparent blur-md opacity-50"></span>
            <span className="absolute -bottom-1 md:-bottom-4 left-0 right-0 h-px bg-gradient-to-r from-transparent via-red-400 to-transparent"></span>
          </span>
        </h1>

        {/* Description */}
        <p className="max-w-2xl mx-auto text-sm md:text-2xl text-[var(--muted)] mb-6 md:mb-12 leading-relaxed font-light animate-fade-in-up animation-delay-200 px-4 sm:px-0">
          The ultimate text dimension. Transform your messages into{" "}
          <span className="text-red-500 font-bold drop-shadow-[0_0_10px_rgba(239,68,68,0.5)]">
            fancy styles
          </span>
          ,{" "}
          <span className="text-purple-500 font-bold drop-shadow-[0_0_10px_rgba(168,85,247,0.5)]">
            social presets
          </span>
          , and{" "}
          <span className="text-blue-500 font-bold drop-shadow-[0_0_10px_rgba(59,130,246,0.5)]">
            deep code
          </span>
          .
        </p>

        {/* Input Section */}
        <div className="w-full max-w-5xl mx-auto relative group mb-10 md:mb-12 animate-fade-in-up animation-delay-400 px-2 sm:px-0">
          <div className="absolute -inset-2 bg-gradient-to-r from-red-500/10 dark:from-red-600/20 via-purple-500/10 dark:via-purple-600/20 to-blue-500/10 dark:to-blue-600/20 rounded-[1.5rem] blur-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-700"></div>

          <div className="relative p-0.5 md:p-1 rounded-[1.5rem] bg-white dark:bg-[var(--card-bg)] border border-zinc-200 dark:border-[var(--card-border)] shadow-[0_4px_30px_rgba(0,0,0,0.08)] dark:shadow-[0_20px_50px_rgba(0,0,0,0.5)] backdrop-blur-3xl overflow-hidden">
            <div className="flex flex-col md:flex-row items-center gap-0 bg-zinc-50/50 dark:bg-[var(--background)]/40 rounded-xl">
              <input
                type="text"
                id="hero-transformation-input"
                name="text-input"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={(e) => e.key === "Enter" && handleCorrupt()}
                placeholder="Drop your text..."
                aria-label="Enter text to transform"
                className="flex-1 w-full bg-transparent border-none outline-none py-3 md:py-4 px-6 md:px-10 text-xl md:text-2xl text-[var(--foreground)] placeholder:text-[var(--muted)] focus:ring-0"
              />
              <div className="p-3 w-full md:w-auto">
                <button
                  onClick={handleCorrupt}
                  className="w-full group/btn px-10 py-5 rounded-xl bg-[var(--foreground)] text-[var(--background)] font-black text-xl transition-all duration-300 active:scale-[0.98] flex items-center justify-center gap-3 relative overflow-hidden hover:bg-red-600 hover:text-white hover:shadow-[0_0_30px_rgba(220,38,38,0.5)] hover:scale-[1.02]"
                >
                  <span className="relative z-10 uppercase">Warp Text</span>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="3.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="relative z-10 group-hover/btn:translate-x-1.5 transition-transform"
                  >
                    <path d="M5 12h14" />
                    <path d="m12 5 7 7-7 7" />
                  </svg>
                  <div className="absolute top-0 -inset-full h-full w-1/2 z-5 block transform -skew-x-12 bg-gradient-to-r from-transparent via-[var(--foreground)] to-transparent opacity-10 group-hover/btn:animate-shimmer" />
                </button>
              </div>
            </div>
          </div>
        </div>

        {output && (
          <div className="w-full max-w-5xl mx-auto mb-16 animate-fade-in-up">
            <div className="relative p-6 sm:p-10 md:p-14 rounded-[1.5rem] bg-white dark:bg-[var(--card-bg)] border border-zinc-200 dark:border-[var(--card-border)] backdrop-blur-2xl shadow-[0_8px_40px_rgba(0,0,0,0.08)] dark:shadow-[0_32px_64px_rgba(0,0,0,0.4)] group/output overflow-hidden">
              <div className="absolute inset-0 bg-gradient-to-r from-red-500/5 dark:from-red-500/10 via-purple-500/5 dark:via-purple-500/10 to-blue-500/5 dark:to-blue-500/10 opacity-0 group-hover/output:opacity-100 transition-opacity duration-500"></div>

              <div className="relative flex flex-col items-center">
                <p className="text-3xl md:text-5xl lg:text-6xl text-[var(--foreground)] font-mono break-all leading-[1.3] text-center">
                  {output}
                </p>

                <div className="mt-10 flex flex-wrap justify-center gap-4">
                  <button
                    onClick={handleCopy}
                    className="flex items-center gap-3 px-8 py-3.5 rounded-xl bg-zinc-50 dark:bg-[var(--card-bg)] hover:bg-zinc-100 dark:hover:bg-[var(--card-border)] border border-zinc-200 dark:border-[var(--card-border)] transition-all text-[var(--foreground)] font-bold backdrop-blur-xl group/copy"
                  >
                    {isCopied ? (
                      <span className="text-green-500 font-black">COPIED!</span>
                    ) : (
                      <>
                        <svg
                          className="w-5 h-5"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <rect
                            width="14"
                            height="14"
                            x="8"
                            y="8"
                            rx="2"
                            ry="2"
                            strokeWidth={2}
                          />
                          <path
                            d="M4 16c-1.1 0-2-.9-2-2V4c0-1.1.9-2 2-2h10c1.1 0 2 .9 2 2"
                            strokeWidth={2}
                          />
                        </svg>
                        <span>COPY TO CLIPBOARD</span>
                      </>
                    )}
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Stats */}
        <div className="mt-32 grid grid-cols-2 lg:grid-cols-4 gap-4 md:gap-8 max-w-6xl mx-auto animate-fade-in-up animation-delay-800">
          {[
            { label: "Generators", value: "58+", icon: "⚡" },
            { label: "Monthly Users", value: "250K+", icon: "👥" },
            { label: "Messages", value: "15M+", icon: "🔥" },
            { label: "Uptime", value: "99.9%", icon: "✅" },
          ].map((stat) => (
            <div
              key={stat.label}
              className="group/stat p-6 sm:p-10 rounded-[1.5rem] bg-white dark:bg-[var(--card-bg)] border border-zinc-200 dark:border-[var(--card-border)] backdrop-blur-md hover:border-red-500/30 transition-all duration-500 text-center shadow-[0_4px_20px_rgba(0,0,0,0.04)] dark:shadow-none"
            >
              <div className="text-3xl sm:text-5xl font-black text-[var(--foreground)] mb-3 tracking-tighter leading-none">
                {stat.value}
              </div>
              <div className="text-[8px] sm:text-[10px] text-[var(--muted)] uppercase font-black tracking-[0.2em] sm:tracking-[0.3em]">
                {stat.label}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Hero;
