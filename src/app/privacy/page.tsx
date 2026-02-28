import React from "react";
import { SITE_URL } from "@/lib/config";
import { Metadata } from "next";
import BackgroundEffect from "@/components/CanvasEffect";
import Link from "next/link";
import {
  Home,
  ChevronRight,
  ShieldCheck,
  Eye,
  Server,
  BarChart3,
  Lock,
  UserX,
  ArrowRight,
} from "lucide-react";

export const metadata: Metadata = {
  title: "Privacy Policy",
  description:
    "Read the TypeWarp Privacy Policy to understand how we protect your data. All text processing happens locally in your browser to ensure maximum user privacy.",
  keywords: [
    "typewarp privacy",
    "data protection",
    "privacy policy",
    "client-side processing",
    "no data storage",
    "secure text generator",
  ],
  openGraph: {
    title: "Privacy Policy | TypeWarp",
    description:
      "Learn how TypeWarp protects your data. All text processing happens locally in your browser.",
    url: `${SITE_URL}/privacy`,
    type: "website",
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "TypeWarp Privacy Policy",
      },
    ],
    siteName: "TypeWarp",
  },
  twitter: {
    card: "summary_large_image",
    title: "Privacy Policy | TypeWarp",
    description:
      "Learn how TypeWarp protects your data. All processing happens locally.",
    creator: "@typewarp",
    images: ["/og-image.png"],
  },
  alternates: { canonical: `${SITE_URL}/privacy` },
};

const highlights = [
  { label: "Data Collected", value: "None", icon: UserX },
  { label: "Processing", value: "Client-Side", icon: Server },
  { label: "Third-Party Sharing", value: "Never", icon: ShieldCheck },
];

const sections = [
  {
    icon: Eye,
    title: "Information We Collect",
    content:
      "TypeWarp does not collect personal information such as names, emails, or phone numbers unless you explicitly provide them through our contact form. We believe in data minimization — we only process what is absolutely necessary.",
  },
  {
    icon: Server,
    title: "Local Processing",
    content:
      "All text you type into our generators is processed entirely in your browser. We do not store, log, or transmit the content of your transformations to any server. Your text stays on your device at all times.",
  },
  {
    icon: BarChart3,
    title: "Analytics & Cookies",
    content:
      "We may use standard analytics tools to understand general traffic patterns. This data is anonymous and aggregated — it cannot be used to identify you personally. See our Cookie Policy for full details.",
  },
  {
    icon: Lock,
    title: "Data Security",
    content:
      "We implement industry-standard security measures to protect the integrity of our website. Since we do not collect or store personal user data, the risk of data breaches affecting your information is effectively eliminated.",
  },
  {
    icon: UserX,
    title: "No Third-Party Sharing",
    content:
      "We do not sell, trade, or share any user data with third parties. There is no user data to share. Our revenue model does not depend on harvesting or monetizing your personal information.",
  },
  {
    icon: ShieldCheck,
    title: "Your Rights",
    content:
      "You have the right to access, correct, or delete any data we may hold about you. Since we collect virtually no personal data, exercising these rights is straightforward. Contact us if you have any questions about your data.",
  },
];

export default function PrivacyPage() {
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
          <span className="text-accent-glitch">Privacy</span>
        </nav>

        {/* Hero */}
        <section className="mb-12 sm:mb-16">
          <div className="inline-block px-4 py-1.5 mb-5 sm:mb-6 bg-accent-glitch/10 border border-accent-glitch/20 rounded-full text-accent-glitch text-[10px] sm:text-[11px] font-mono font-black uppercase tracking-[0.3em]">
            Privacy
          </div>

          <h1 className="text-4xl sm:text-5xl md:text-6xl font-black mb-4 sm:mb-6 tracking-tight uppercase leading-[0.9]">
            <span className="text-white">Privacy</span>{" "}
            <span className="text-accent-glitch">Policy.</span>
          </h1>

          <p className="text-text-muted text-sm sm:text-base md:text-lg max-w-2xl leading-relaxed">
            Your privacy matters. TypeWarp is designed with a privacy-first
            approach — all processing happens locally in your browser.
          </p>
        </section>

        {/* Highlights */}
        <section className="grid grid-cols-1 sm:grid-cols-3 gap-3 sm:gap-4 mb-12 sm:mb-16">
          {highlights.map((h) => (
            <div
              key={h.label}
              className="group flex items-center gap-3 sm:gap-4 p-4 sm:p-5 bg-bg-card border border-white/[0.06] rounded-2xl hover:border-accent-glitch/25 transition-all duration-300 relative overflow-hidden"
            >
              <div className="absolute top-0 inset-x-0 h-px bg-gradient-to-r from-transparent via-accent-glitch/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
              <div className="p-2 sm:p-3 bg-white/[0.04] rounded-xl group-hover:bg-accent-glitch/10 transition-colors shrink-0">
                <h.icon className="w-5 h-5 sm:w-6 sm:h-6 text-accent-glitch" />
              </div>
              <div>
                <div className="text-lg sm:text-xl font-black text-white leading-none">
                  {h.value}
                </div>
                <div className="text-[10px] sm:text-[11px] text-text-muted font-mono uppercase tracking-widest mt-1">
                  {h.label}
                </div>
              </div>
            </div>
          ))}
        </section>

        {/* Sections */}
        <div className="space-y-4 sm:space-y-5 mb-12 sm:mb-16">
          {sections.map((section, index) => (
            <div
              key={section.title}
              className="group p-5 sm:p-6 md:p-8 bg-bg-card border border-white/[0.06] rounded-2xl hover:border-accent-glitch/25 transition-all duration-300 relative overflow-hidden"
            >
              <div className="absolute top-0 inset-x-0 h-px bg-gradient-to-r from-transparent via-accent-glitch/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />

              <div className="flex items-start gap-4 sm:gap-5">
                <div className="p-2.5 sm:p-3 bg-white/[0.04] rounded-xl group-hover:bg-accent-glitch/10 transition-colors shrink-0">
                  <section.icon className="w-5 h-5 sm:w-6 sm:h-6 text-accent-glitch" />
                </div>

                <div className="min-w-0 flex-1">
                  <div className="flex items-center gap-3 mb-2 sm:mb-3">
                    <span className="text-[10px] sm:text-xs font-mono text-accent-glitch/50 font-bold">
                      {String(index + 1).padStart(2, "0")}
                    </span>
                    <h2 className="text-sm sm:text-base md:text-lg font-bold text-white uppercase tracking-wide group-hover:text-accent-glitch transition-colors">
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
              February 10, 2026
            </p>
          </div>
          <div className="flex items-center gap-3">
            <Link
              href="/terms"
              className="inline-flex items-center gap-2 px-4 py-2 bg-white/[0.04] border border-white/[0.1] text-white font-bold text-[10px] sm:text-xs uppercase tracking-widest rounded-xl hover:border-accent-glitch/30 hover:bg-accent-glitch/5 transition-all duration-300"
            >
              Terms
              <ArrowRight className="w-3 h-3" />
            </Link>
            <Link
              href="/gdpr"
              className="inline-flex items-center gap-2 px-4 py-2 bg-white/[0.04] border border-white/[0.1] text-white font-bold text-[10px] sm:text-xs uppercase tracking-widest rounded-xl hover:border-accent-glitch/30 hover:bg-accent-glitch/5 transition-all duration-300"
            >
              GDPR
              <ArrowRight className="w-3 h-3" />
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
