import React from "react";
import { SITE_URL } from "@/lib/config";
import { Metadata } from "next";
import BackgroundEffect from "@/components/CanvasEffect";
import Link from "next/link";
import {
  Home,
  ChevronRight,
  Shield,
  FileCheck2,
  Minimize2,
  HardDriveDownload,
  Trash2,
  Globe,
  ArrowRight,
} from "lucide-react";

export const metadata: Metadata = {
  title: "GDPR Compliance",
  description:
    "Learn how TypeWarp adheres to GDPR regulations to protect your EU data. We prioritize full transparency and user control over personal data.",
  keywords: [
    "typewarp gdpr",
    "gdpr compliance",
    "data protection",
    "eu data privacy",
    "user rights",
    "right to erasure",
    "data minimization",
  ],
  openGraph: {
    title: "GDPR Compliance | TypeWarp",
    description: "Our commitment to GDPR and data protection standards.",
    url: `${SITE_URL}/gdpr`,
    type: "website",
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "TypeWarp GDPR Compliance",
      },
    ],
    siteName: "TypeWarp",
  },
  twitter: {
    card: "summary_large_image",
    title: "GDPR Compliance | TypeWarp",
    description: "Our commitment to GDPR and data protection standards.",
    creator: "@typewarp",
    images: ["/og-image.png"],
  },
  alternates: {
    canonical: `${SITE_URL}/gdpr`,
  },
};

const rights = [
  {
    title: "Right to Access",
    desc: "You can request info about any data we hold about you.",
    icon: FileCheck2,
  },
  {
    title: "Right to Rectification",
    desc: "You can request we correct any inaccurate data we hold.",
    icon: Shield,
  },
  {
    title: "Right to Erasure",
    desc: 'Often known as the "Right to be Forgotten".',
    icon: Trash2,
  },
  {
    title: "Right to Portability",
    desc: "You can obtain your data in a readable format.",
    icon: HardDriveDownload,
  },
  {
    title: "Right to Restrict",
    desc: "Request a temporary pause in data processing.",
    icon: Minimize2,
  },
  {
    title: "Right to Object",
    desc: "Object to processing based on legitimate interests.",
    icon: Shield,
  },
];

export default function GDPRPage() {
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
          <span className="text-accent-glitch">GDPR</span>
        </nav>

        {/* Hero */}
        <section className="mb-12 sm:mb-16">
          <div className="inline-block px-4 py-1.5 mb-5 sm:mb-6 bg-accent-glitch/10 border border-accent-glitch/20 rounded-full text-accent-glitch text-[10px] sm:text-[11px] font-mono font-black uppercase tracking-[0.3em]">
            EU Compliance Framework
          </div>

          <h1 className="text-4xl sm:text-5xl md:text-6xl font-black mb-4 sm:mb-6 tracking-tight uppercase leading-[0.9]">
            <span className="text-white">GDPR</span>{" "}
            <span className="text-accent-glitch">Standards.</span>
          </h1>

          <p className="text-text-muted text-sm sm:text-base md:text-lg max-w-2xl leading-relaxed">
            TypeWarp is built on a foundation of data privacy and transparency.
            We fully adhere to the General Data Protection Regulation (GDPR),
            implementing world-class standards to protect our users in the EU
            and across the globe.
          </p>
        </section>

        {/* Detailed Overview */}
        <section className="mb-12 sm:mb-16">
          <h2 className="text-2xl sm:text-3xl font-black uppercase tracking-tight text-white mb-6">
            Data Preservation{" "}
            <span className="text-accent-glitch">& Privacy</span>
          </h2>
          <div className="prose prose-invert max-w-none text-text-muted space-y-4 text-sm sm:text-base">
            <p>
              The General Data Protection Regulation (GDPR) is the toughest
              privacy and security law in the world. Though it was drafted and
              passed by the European Union (EU), it imposes obligations onto
              organizations anywhere, so long as they target or collect data
              related to people in the EU.
            </p>
            <p>
              At TypeWarp, we don't just comply with GDPR because we have to; we
              embrace its principles of data minimization and transparency
              because they align with our core engineering philosophy. Our
              platform is designed to function with the absolute minimum amount
              of data necessary, often processing your text transformations
              entirely within your own browser session.
            </p>
          </div>
        </section>

        {/* Philosophy/Commitments */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6 mb-12 sm:mb-16">
          <div className="p-6 md:p-8 bg-bg-card border border-white/[0.06] rounded-3xl relative overflow-hidden group">
            <div className="absolute top-0 inset-x-0 h-px bg-gradient-to-r from-transparent via-accent-glitch/30 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
            <Globe className="w-8 h-8 text-white/50 mb-5 group-hover:text-accent-glitch transition-colors" />
            <h2 className="text-xl font-bold text-white mb-3">
              Global Standards
            </h2>
            <p className="text-sm text-text-muted leading-relaxed">
              We treat all visitors with the same high level of protection,
              regardless of their physical location. This "GDPR-for-all"
              approach ensures that our privacy standards remain consistent and
              unbreakable worldwide.
            </p>
          </div>

          <div className="p-6 md:p-8 bg-bg-card border border-white/[0.06] rounded-3xl relative overflow-hidden group">
            <div className="absolute top-0 inset-x-0 h-px bg-gradient-to-r from-transparent via-accent-glitch/30 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
            <Minimize2 className="w-8 h-8 text-white/50 mb-5 group-hover:text-accent-glitch transition-colors" />
            <h2 className="text-xl font-bold text-white mb-3">
              Privacy by Design
            </h2>
            <p className="text-sm text-text-muted leading-relaxed">
              Every feature on TypeWarp is vetted through a "Privacy First"
              framework. We prioritize local processing over server-side
              storage, ensuring your creative outputs remain under your direct
              control at all times.
            </p>
          </div>
        </div>

        {/* Core Principles Section */}
        <section className="mb-12 sm:mb-16 bg-bg-card/30 border border-white/[0.04] p-6 sm:p-10 rounded-3xl">
          <h2 className="text-2xl sm:text-3xl font-black uppercase tracking-tight text-white mb-8 border-b border-white/5 pb-6">
            Our <span className="text-accent-glitch">Principles</span>
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-x-10 gap-y-8 text-sm text-text-muted leading-relaxed">
            <div className="space-y-2">
              <h3 className="text-white font-bold uppercase tracking-wider text-xs">
                Lawfulness & Transparency
              </h3>
              <p>
                We process your data fairly and are always transparent about why
                specific technical cookies are used for performance and
                stability.
              </p>
            </div>
            <div className="space-y-2">
              <h3 className="text-white font-bold uppercase tracking-wider text-xs">
                Purpose Limitation
              </h3>
              <p>
                Data collection is strictly limited to the specific purposes
                outlined in our privacy documentation, mostly revolving around
                site traffic analytics.
              </p>
            </div>
            <div className="space-y-2">
              <h3 className="text-white font-bold uppercase tracking-wider text-xs">
                Storage Limitation
              </h3>
              <p>
                We do not keep data longer than necessary. Since we don't use
                user accounts, the majority of your experience is stateless.
              </p>
            </div>
            <div className="space-y-2">
              <h3 className="text-white font-bold uppercase tracking-wider text-xs">
                Integrity & Security
              </h3>
              <p>
                We implement robust technical and organizational measures to
                protect any metadata from unauthorized access or accidental
                loss.
              </p>
            </div>
          </div>
        </section>

        {/* User Rights */}
        <section className="mb-12 sm:mb-16">
          <div className="flex items-center gap-4 mb-8">
            <div className="w-1.5 h-8 sm:h-10 bg-accent-glitch rounded-full" />
            <h2 className="text-2xl sm:text-3xl font-black uppercase tracking-tight text-white">
              Your <span className="text-accent-glitch">Rights</span>
            </h2>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
            {rights.map((right) => (
              <div
                key={right.title}
                className="flex items-center gap-4 p-4 sm:p-5 bg-bg-card border border-white/[0.06] rounded-2xl hover:border-white/[0.12] transition-colors group"
              >
                <div className="p-2 sm:p-3 bg-white/[0.04] rounded-xl group-hover:bg-accent-glitch/10 transition-colors shrink-0">
                  <right.icon className="w-5 h-5 text-accent-glitch" />
                </div>
                <div>
                  <h3 className="text-sm sm:text-base font-bold text-white mb-1 uppercase tracking-wide">
                    {right.title}
                  </h3>
                  <p className="text-xs sm:text-sm text-text-muted leading-relaxed">
                    {right.desc}
                  </p>
                </div>
              </div>
            ))}
          </div>

          <div className="mt-8 p-5 sm:p-6 bg-accent-glitch/5 border border-accent-glitch/20 rounded-2xl">
            <p className="text-xs sm:text-sm text-white/80 leading-relaxed font-mono uppercase tracking-wide">
              <strong>Compliance Notice:</strong> TypeWarp operates as a
              "stateless" text utility. Because we do not store user profiles,
              the identification of specific data for erasure or access requests
              generally results in zero records found, which is the ultimate
              form of privacy.
            </p>
          </div>
        </section>

        {/* Legal Grounding */}
        <section className="mb-12 sm:mb-16">
          <h2 className="text-2xl sm:text-3xl font-black uppercase tracking-tight text-white mb-6">
            Legal <span className="text-accent-glitch">Basis</span>
          </h2>
          <div className="prose prose-invert max-w-none text-text-muted space-y-4 text-sm sm:text-base">
            <p>
              Under GDPR Article 6, we process your data based on the following
              legal grounds:
            </p>
            <ul className="list-disc pl-5 space-y-2">
              <li>
                <strong>Legitimate Interest</strong>: We have a legitimate
                interest in maintaining the performance, security, and stability
                of our transformation engine.
              </li>
              <li>
                <strong>Consent</strong>: For non-essential tracking and
                functional cookies, we seek your explicit consent via our cookie
                notice.
              </li>
            </ul>
          </div>
        </section>

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
