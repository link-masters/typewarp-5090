import React from "react";
import { Metadata } from "next";
import Link from "next/link";
import JSONLD from "@/components/JSONLD";

export const metadata: Metadata = {
  title: "About TypeWarp | Our Mission & Technology",
  description:
    "Learn about TypeWarp, the world's most advanced text transformation ecosystem. Discover our vision for digital expression and technical excellence.",
  keywords: [
    "about typewarp",
    "text transformation technology",
    "unicode mapping",
    "digital expression",
    "privacy-first text tools",
  ],
};

const AboutPage = () => {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "AboutPage",
    name: "About TypeWarp",
    description:
      "Documentation of TypeWarp's mission, philosophy, and technical architecture.",
    publisher: {
      "@type": "Organization",
      name: "TypeWarp",
      logo: {
        "@type": "ImageObject",
        url: "https://typewarp.com/favicon.ico",
      },
    },
  };

  return (
    <>
      <JSONLD data={jsonLd} />
      <div className="min-h-screen pt-24 md:pt-32 pb-16 md:pb-20 bg-[var(--background)]">
        <div className="container mx-auto px-4 max-w-6xl">
          {/* Hero Section */}
          <section className="text-center mb-20 md:mb-32 animate-fade-in">
            <div className="inline-block px-3 py-1 md:px-4 md:py-1.5 mb-6 rounded-full border border-zinc-200 dark:border-[var(--card-border)] bg-white dark:bg-[var(--card-bg)] text-[9px] md:text-[10px] font-black uppercase tracking-[0.3em] text-red-500 shadow-sm">
              Origins & Evolution
            </div>
            <h1 className="text-4xl sm:text-6xl md:text-8xl font-black mb-8 tracking-tighter text-[var(--foreground)] uppercase leading-[1.1] md:leading-[0.9]">
              Beyond the <br />
              <span className="bg-gradient-to-r from-red-600 via-purple-600 to-blue-600 bg-clip-text text-transparent">
                Standard Script
              </span>
            </h1>
            <p className="text-[var(--muted)] text-lg md:text-2xl max-w-3xl mx-auto font-medium leading-relaxed px-4 md:px-0">
              TypeWarp was born at the intersection of digital anarchy and
              technical precision. We believe text shouldn't just be read—it
              should be felt.
            </p>
          </section>

          {/* The Mission Section */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-10 md:gap-16 mb-24 md:mb-40 items-center">
            <div className="animate-slide-in-left">
              <h2 className="text-4xl font-black text-[var(--foreground)] mb-6 uppercase tracking-tight">
                The TypeWarp <span className="text-red-500">Philosophy</span>
              </h2>
              <div className="space-y-6 text-[var(--muted)] text-lg leading-relaxed font-medium">
                <p>
                  In an era of homogenized digital communication, individual
                  expression is often limited by system fonts and character
                  sets. TypeWarp was designed to break these constraints.
                </p>
                <p>
                  Our mission is to provide creators, developers, and digital
                  architects with a high-performance toolkit for text
                  manipulation. Whether it's adding aesthetic flair to a social
                  profile or encoding data for technical projects, we provide
                  the bridge between ordinary and extraordinary.
                </p>
              </div>
            </div>
            <div className="relative aspect-square rounded-[1.5rem] md:rounded-[2rem] bg-white dark:bg-[var(--card-bg)] border border-zinc-200 dark:border-[var(--card-border)] overflow-hidden flex items-center justify-center p-12 group shadow-[0_8px_40px_rgba(0,0,0,0.04)] dark:shadow-none">
              <div className="absolute inset-0 bg-gradient-to-br from-red-600/10 via-purple-600/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-1000" />
              <div className="relative text-[12rem] font-black text-red-500/20 group-hover:scale-110 group-hover:text-red-500/40 transition-all duration-700 select-none">
                TW
              </div>
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="w-64 h-64 border-2 border-dashed border-purple-500/20 rounded-full animate-spin-slow" />
              </div>
            </div>
          </div>

          {/* Core Values / Pillar Section */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8 mb-24 md:mb-40">
            {[
              {
                title: "Privacy First",
                desc: "All text transformation happens client-side. Your messages never touch our servers.",
                icon: "🛡️",
              },
              {
                title: "Technical Excellence",
                desc: "Engineered using massive Unicode mapping tables for maximum platform compatibility.",
                icon: "⚙️",
              },
              {
                title: "Global Reach",
                desc: "Tested across Instagram, Discord, TikTok, and GitHub for consistent rendering.",
                icon: "🌐",
              },
            ].map((pillar) => (
              <div
                key={pillar.title}
                className="p-10 rounded-[1.5rem] bg-white dark:bg-[var(--card-bg)] border border-zinc-200 dark:border-[var(--card-border)] hover:border-red-500/30 transition-all duration-500 shadow-[0_4px_20px_rgba(0,0,0,0.04)] dark:shadow-none hover:shadow-[0_8px_30px_rgba(0,0,0,0.08)] dark:hover:shadow-none"
              >
                <div className="text-4xl mb-6">{pillar.icon}</div>
                <h3 className="text-xl font-black text-[var(--foreground)] mb-4 uppercase tracking-wider">
                  {pillar.title}
                </h3>
                <p className="text-[var(--muted)] text-base font-bold leading-relaxed">
                  {pillar.desc}
                </p>
              </div>
            ))}
          </div>

          {/* Future Vision */}
          <section className="relative p-12 md:p-24 rounded-[1.5rem] md:rounded-[2rem] bg-white dark:bg-[var(--card-bg)] border border-zinc-200 dark:border-[var(--card-border)] overflow-hidden text-center shadow-[0_8px_40px_rgba(0,0,0,0.06)] dark:shadow-none">
            <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-gradient-to-br from-red-500/5 dark:from-red-600/10 to-transparent rounded-full blur-[120px] -translate-y-1/2 translate-x-1/2" />

            <h2 className="text-4xl md:text-6xl font-black text-[var(--foreground)] mb-8 tracking-tighter uppercase relative z-10">
              The Future of <span className="text-purple-600">Text</span>
            </h2>
            <p className="text-[var(--muted)] text-xl max-w-3xl mx-auto font-medium leading-relaxed relative z-10 mb-12">
              We are constantly expanding the TypeWarp ecosystem. From new
              encryption algorithms to generative ASCII art engines, our roadmap
              is focused on pushing the boundaries of what plain text can
              achieve.
            </p>
            <Link
              href="/text-tools"
              className="inline-flex items-center gap-4 px-12 py-6 rounded-xl bg-[var(--foreground)] text-[var(--background)] font-black text-xs uppercase tracking-widest hover:scale-105 transition-all active:scale-95 relative z-10"
            >
              Explore the Tools
              <svg
                className="w-5 h-5"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2.5}
                  d="M17 8l4 4m0 0l-4 4m4-4H3"
                />
              </svg>
            </Link>
          </section>
        </div>
      </div>
    </>
  );
};

export default AboutPage;
