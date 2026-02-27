import React from "react";
import { SITE_URL } from "@/lib/config";
import { Metadata } from "next";
import BackgroundEffect from "@/components/CanvasEffect";
import Link from "next/link";
import {
  Home,
  ChevronRight,
  Cookie,
  Settings,
  BarChart3,
  ShieldCheck,
  ArrowRight,
  Info,
} from "lucide-react";

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
    url: `${SITE_URL}/cookies`,
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
    canonical: `${SITE_URL}/cookies`,
  },
};

const sections = [
  {
    icon: Info,
    title: "What are Cookies?",
    content:
      "Cookies are small text files stored on your device when you visit a website. They help the website remember your preferences and improve your browsing experience. At TypeWarp, we keep cookie usage strictly to an absolute minimum.",
  },
  {
    icon: Settings,
    title: "Essential Cookies",
    content:
      "These are technical cookies required for the basic operation of our site. For example, we use a single cookie to remember your UI Theme (Light/Dark mode) preference so you don't have to change it on every visit.",
  },
  {
    icon: BarChart3,
    title: "Analytical Cookies",
    content:
      "We use lightweight analytics cookies to help us understand how visitors interact with TypeWarp. This information is 100% anonymized, aggregated, and used solely for monitoring site performance, finding bugs, and optimizing our tool matrix.",
  },
  {
    icon: ShieldCheck,
    title: "Managing Cookies",
    content:
      "You have full control over your cookies. You can manage, block, or delete cookies through your browser settings. Be aware that if you block all cookies, minor features of TypeWarp (like saving your theme preference) may not function correctly, though the text tools will still run perfectly.",
  },
];

export default function CookiesPage() {
  return (
    <div className="min-h-screen pt-24 lg:pt-28 pb-16 sm:pb-20 bg-bg-void text-text-primary relative overflow-hidden">
      <BackgroundEffect />

      <div className="mx-auto px-4 sm:px-6 max-w-4xl relative z-10">
        {/* Breadcrumbs */}
        <nav className="flex items-center gap-2 mb-4 lg:mb-6 font-mono text-[10px] sm:text-xs uppercase tracking-[0.2em] text-text-muted">
          <Link
            href="/"
            className="hover:text-accent-glitch transition-colors flex items-center gap-1.5"
          >
            <Home className="w-3 h-3 sm:w-3.5 sm:h-3.5" />
            Home
          </Link>
          <ChevronRight className="w-3 h-3 opacity-30" />
          <span className="text-accent-glitch">Cookies</span>
        </nav>

        {/* Hero */}
        <section className="mb-12 sm:mb-16">
          <div className="inline-block px-4 py-1.5 mb-5 sm:mb-6 bg-accent-glitch/10 border border-accent-glitch/20 rounded-full text-accent-glitch text-[10px] sm:text-[11px] font-mono font-black uppercase tracking-[0.3em]">
            Tracking
          </div>

          <h1 className="text-4xl sm:text-5xl md:text-6xl font-black mb-4 sm:mb-6 tracking-tight uppercase leading-[0.9]">
            <span className="text-white">Cookie</span>{" "}
            <span className="text-accent-glitch">Policy</span>
          </h1>

          <p className="text-text-muted text-sm sm:text-base md:text-lg max-w-2xl leading-relaxed">
            We respect your digital footprint. Our platform runs entirely in
            your browser and only uses the bare minimum cookies required to
            function.
          </p>
        </section>

        {/* Highlight Alert */}
        <div className="flex items-center gap-4 p-4 sm:p-5 mb-12 sm:mb-16 bg-accent-glitch/5 border border-accent-glitch/20 rounded-xl max-w-2xl">
          <Cookie className="w-6 h-6 sm:w-8 sm:h-8 text-accent-glitch shrink-0" />
          <p className="text-xs sm:text-sm font-mono text-white/80 leading-relaxed uppercase tracking-wide">
            <strong>TL;DR:</strong> No tracking scripts. No ad trackers. No
            cross-site profiling. Just basic setup cookies.
          </p>
        </div>

        {/* Sections */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-5 mb-12 sm:mb-16">
          {sections.map((section, index) => (
            <div
              key={section.title}
              className="group p-5 sm:p-6 bg-bg-card border border-white/[0.06] rounded-2xl hover:border-accent-glitch/25 transition-all duration-300 relative overflow-hidden"
            >
              <div className="absolute top-0 inset-x-0 h-px bg-gradient-to-r from-transparent via-accent-glitch/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />

              <div className="flex flex-col gap-4">
                <div className="p-2.5 sm:p-3 bg-white/[0.04] rounded-xl w-fit group-hover:bg-accent-glitch/10 transition-colors">
                  <section.icon className="w-5 h-5 sm:w-6 sm:h-6 text-accent-glitch" />
                </div>

                <div>
                  <div className="flex items-center gap-3 mb-2">
                    <span className="text-[10px] font-mono text-accent-glitch/50 font-bold">
                      {String(index + 1).padStart(2, "0")}
                    </span>
                    <h2 className="text-sm sm:text-base font-bold text-white uppercase tracking-wide group-hover:text-accent-glitch transition-colors">
                      {section.title}
                    </h2>
                  </div>
                  <p className="text-xs sm:text-sm text-text-muted leading-relaxed">
                    {section.content}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Footer Info */}
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 p-5 sm:p-6 bg-bg-card border border-white/[0.06] rounded-2xl">
          <div>
            <p className="text-[10px] sm:text-xs font-mono text-text-muted uppercase tracking-widest mb-1">
              Last Updated
            </p>
            <p className="text-sm sm:text-base font-bold text-white">
              February 5, 2026
            </p>
          </div>
          <div className="flex items-center gap-3">
            <Link
              href="/privacy"
              className="inline-flex items-center gap-2 px-4 py-2 bg-white/[0.04] border border-white/[0.1] text-white font-bold text-[10px] sm:text-xs uppercase tracking-widest rounded-xl hover:border-accent-glitch/30 hover:bg-accent-glitch/5 transition-all duration-300"
            >
              Privacy Policy
              <ArrowRight className="w-3 h-3" />
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
