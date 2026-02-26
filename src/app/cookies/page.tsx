import React from "react";
import { Metadata } from "next";
import BackgroundEffect from "@/components/CanvasEffect";
import Link from "next/link";
import { Home, ChevronRight, Cookie } from "lucide-react";

export const metadata: Metadata = {
  title: "Cookie Policy | TypeWarp",
  description:
    "Understand how TypeWarp uses cookies. We use minimal cookies for theme preference and anonymous analytics.",
  keywords: [
    "typewarp cookies",
    "cookie policy",
    "browser cookies",
    "website tracking",
    "analytics cookies",
    "essential cookies",
  ],
  openGraph: {
    title: "Cookie Policy | TypeWarp",
    description:
      "Understand our use of cookies at TypeWarp. Minimal cookies for theme and analytics only.",
    url: "https://www.typewarp.com/cookies",
    type: "website",
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "TypeWarp Cookie Policy",
      },
    ],
    siteName: "TypeWarp",
  },
  twitter: {
    card: "summary_large_image",
    title: "Cookie Policy | TypeWarp",
    description: "Understand our use of cookies at TypeWarp.",
    creator: "@typewarp",
    images: ["/og-image.png"],
  },
  alternates: {
    canonical: "https://www.typewarp.com/cookies",
  },
};

export default function CookiesPage() {
  return (
    <div className="min-h-screen pt-40 pb-20 bg-bg-void text-text-primary relative overflow-hidden">
      <BackgroundEffect />
      <div className="container mx-auto px-4 max-w-4xl relative z-10">
        <nav className="flex items-center gap-4 mb-16 font-mono text-[10px] uppercase tracking-[0.3em] text-text-muted">
          <Link
            href="/"
            className="hover:text-accent-glitch transition-colors flex items-center gap-2"
          >
            <Home className="w-3 h-3" />
            ROOT
          </Link>
          <ChevronRight className="w-3 h-3 opacity-30" />
          <div className="text-accent-glitch">COOKIE_POLICY</div>
        </nav>

        <header className="mb-16">
          <div className="flex items-center gap-4 mb-6">
            <div className="w-10 h-10 bg-accent-glitch/10 border border-accent-glitch/20 flex items-center justify-center">
              <Cookie className="w-5 h-5 text-accent-glitch" />
            </div>
            <h2 className="text-[10px] font-mono text-accent-glitch uppercase tracking-[0.5em]">
              // BROWSER_STORAGE_01
            </h2>
          </div>
          <h1 className="text-5xl md:text-7xl font-black mb-8 tracking-tighter uppercase leading-[0.8]">
            Cookie <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-accent-glitch to-white">
              Protocol.
            </span>
          </h1>
        </header>

        <div
          className="prose prose-invert max-w-none font-mono text-sm leading-relaxed text-text-muted 
          prose-headings:uppercase prose-headings:font-black prose-headings:tracking-tighter prose-headings:text-white
          prose-strong:text-accent-glitch"
        >
          <section className="bg-bg-card border border-white/5 p-8 mb-8">
            <h2 className="text-xl mb-4">What are Cookies?</h2>
            <p>
              Cookies are small text files stored on your device when you visit
              a website. They help the website remember your preferences and
              improve your browsing experience.
            </p>
          </section>

          <section className="bg-bg-card border border-white/5 p-8 mb-8">
            <h2 className="text-xl mb-4">Essential Cookies</h2>
            <p>
              These are technical cookies required for the operation of our
              site, such as remembering your Theme (Light/Dark mode) preference.
            </p>
          </section>

          <section className="bg-bg-card border border-white/5 p-8 mb-8">
            <h2 className="text-xl mb-4">Analytical Cookies</h2>
            <p>
              We use analytics cookies to help us understand how visitors
              interact with TypeWarp. This information is anonymized and used
              solely for performance monitoring and diagnostic purposes.
            </p>
          </section>

          <section className="bg-bg-card border border-white/5 p-8 mb-8">
            <h2 className="text-xl mb-4">Managing Cookies</h2>
            <p>
              You can control and manage cookies through your browser settings.
              Most browsers allow you to block or delete cookies; however, some
              features of TypeWarp (like theme persistence) may not function
              correctly if cookies are disabled.
            </p>
          </section>

          <div className="pt-12 text-[10px] text-white/20 uppercase tracking-[0.2em] font-mono">
            PROTOCOL_LAST_UPDATED: FEBRUARY 5, 2026
          </div>
        </div>
      </div>
    </div>
  );
}
