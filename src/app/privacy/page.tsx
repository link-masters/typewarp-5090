import React from "react";
import { Metadata } from "next";
import BackgroundEffect from "@/components/BackgroundEffect";
import Link from "next/link";
import { Home, ChevronRight, ShieldCheck } from "lucide-react";

export const metadata: Metadata = {
  title: "Privacy Policy | TypeWarp Intel",
  description: "Learn how we protect your data within the TypeWarp matrix.",
  alternates: { canonical: "https://typewarp.com/privacy" },
};

export default function PrivacyPage() {
  return (
    <div className="min-h-screen pt-32 pb-20 bg-bg-void text-text-primary relative overflow-hidden">
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
          <div className="text-accent-glitch">PRIVACY_POLICY</div>
        </nav>

        <header className="mb-16">
          <div className="flex items-center gap-4 mb-6">
            <div className="w-10 h-10 bg-accent-glitch/10 border border-accent-glitch/20 flex items-center justify-center">
              <ShieldCheck className="w-5 h-5 text-accent-glitch" />
            </div>
            <h2 className="text-[10px] font-mono text-accent-glitch uppercase tracking-[0.5em]">
              // ENCRYPTION_POLICY_01
            </h2>
          </div>
          <h1 className="text-5xl md:text-7xl font-black mb-8 tracking-tighter uppercase leading-[0.8]">
            Data <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-accent-glitch to-white">
              Shield.
            </span>
          </h1>
        </header>

        <div
          className="prose prose-invert max-w-none font-mono text-sm leading-relaxed text-text-muted 
          prose-headings:uppercase prose-headings:font-black prose-headings:tracking-tighter prose-headings:text-white
          prose-strong:text-accent-glitch"
        >
          <section className="bg-bg-card border border-white/5 p-8 mb-8">
            <h2 className="text-xl mb-4">1. Information We Collect</h2>
            <p>
              At TypeWarp, your privacy is our priority. We are proud to say
              that we do <strong>NOT</strong> collect personal information (such
              as names, emails, or phone numbers) unless you explicitly provide
              them through our contact form or newsletter subscription.
            </p>
          </section>

          <section className="bg-bg-card border border-white/5 p-8 mb-8">
            <h2 className="text-xl mb-4">2. Zero-Link Processing</h2>
            <p>
              Any text you type into our generators is processed{" "}
              <strong>locally in your browser</strong>. We do not store, log, or
              transmit the content of your transformations to our servers. Your
              creative data stays in your local buffer.
            </p>
          </section>

          <section className="bg-bg-card border border-white/5 p-8 mb-8">
            <h2 className="text-xl mb-4">3. Analytics & Cookies</h2>
            <p>
              We may use standard analytics tools (like Google Analytics) to
              understand general traffic patterns. This data is anonymous and
              helps us optimize our matrix modules. Please refer to our Cookie
              Policy for more details.
            </p>
          </section>

          <section className="bg-bg-card border border-white/5 p-8 mb-8">
            <h2 className="text-xl mb-4">4. Data Security</h2>
            <p>
              We implement industry-standard security measures to protect the
              integrity of our website. Since we do not collect sensitive user
              data, the risk of data breaches is significantly minimized by our
              architecture.
            </p>
          </section>

          <div className="pt-12 text-[10px] text-white/20 uppercase tracking-[0.2em] font-mono">
            PROTOCOL_LAST_UPDATED: FEBRUARY 10, 2026
          </div>
        </div>
      </div>
    </div>
  );
}
