import React from "react";
import { Metadata } from "next";
import ContactForm from "@/components/ContactForm";
import JSONLD from "@/components/JSONLD";
import BackgroundEffect from "@/components/BackgroundEffect";
import { Mail, Zap, Terminal, Home, ChevronRight } from "lucide-react";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Contact | TypeWarp Intel",
  description: "Establish a direct link with the TypeWarp development matrix.",
  alternates: {
    canonical: "https://www.typewarp.com/contact",
  },
};

export default function ContactPage() {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "ContactPage",
    name: "Contact Us",
    description: "Send us a message through our contact form.",
    url: "https://www.typewarp.com/contact",
  };

  return (
    <div className="min-h-screen pt-32 pb-20 bg-bg-void text-text-primary relative overflow-hidden">
      <BackgroundEffect />
      <JSONLD data={jsonLd} />

      <div className="container mx-auto px-4 max-w-7xl relative z-10">
        {/* Breadcrumbs */}
        <nav className="flex items-center gap-4 mb-16 font-mono text-[10px] uppercase tracking-[0.3em] text-text-muted">
          <Link
            href="/"
            className="hover:text-accent-glitch transition-colors flex items-center gap-2"
          >
            <Home className="w-3 h-3" />
            ROOT
          </Link>
          <ChevronRight className="w-3 h-3 opacity-30" />
          <div className="text-accent-glitch">COMMS_CENTER</div>
        </nav>

        <div className="flex flex-col lg:grid lg:grid-cols-12 gap-20">
          {/* Left Column: Context */}
          <div className="lg:col-span-4 flex flex-col justify-between">
            <div>
              <div className="flex items-center gap-4 mb-8">
                <div className="w-12 h-12 bg-accent-glitch/10 border border-accent-glitch/20 flex items-center justify-center">
                  <Mail className="w-6 h-6 text-accent-glitch" />
                </div>
                <h2 className="text-sm font-mono text-accent-glitch uppercase tracking-[0.5em]">
                  // CONTACT_HUB
                </h2>
              </div>
              <h1 className="text-6xl md:text-8xl font-black mb-10 tracking-tighter uppercase leading-[0.8]">
                Establish <br />
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-accent-glitch to-white">
                  Signal.
                </span>
              </h1>
              <p className="text-text-muted font-mono text-lg leading-relaxed max-w-sm mb-12">
                We're always looking for new ideas, bug reports, and
                collaborations. Drop us a transmission.
              </p>

              <div className="space-y-10 font-mono">
                <div className="group">
                  <div className="text-[10px] font-black uppercase tracking-[0.3em] text-text-muted mb-3 flex items-center gap-2">
                    <Terminal className="w-3 h-3" />
                    EMAIL_ADDRESS
                  </div>
                  <a
                    href="mailto:support@typewarp.com"
                    className="text-2xl font-black text-white hover:text-accent-glitch transition-colors break-all"
                  >
                    support@typewarp.com
                  </a>
                </div>
                <div>
                  <div className="text-[10px] font-black uppercase tracking-[0.3em] text-text-muted mb-3 flex items-center gap-2">
                    <Zap className="w-3 h-3" />
                    RESPONSE_BUFFER
                  </div>
                  <div className="text-xl font-bold text-white">
                    &lt; 24_HOURS
                  </div>
                </div>
              </div>
            </div>

            <div className="mt-20 p-8 border border-white/5 bg-bg-card">
              <div className="text-[10px] font-mono text-text-muted uppercase tracking-widest mb-4">
                SYSTEM_STATUS
              </div>
              <div className="flex items-center gap-3">
                <div className="w-2 h-2 rounded-full bg-accent-glitch animate-pulse" />
                <span className="text-xs font-mono text-white">
                  ALL SYSTEMS OPERATIONAL
                </span>
              </div>
            </div>
          </div>

          {/* Right Column: Interaction */}
          <div className="lg:col-span-8 bg-bg-card border border-white/5 p-8 md:p-12 relative overflow-hidden group">
            <ContactForm />
            <div className="absolute top-0 left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-accent-glitch/30 to-transparent" />
          </div>
        </div>
      </div>
    </div>
  );
}
