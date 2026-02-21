import React from "react";
import { Metadata } from "next";
import Link from "next/link";
import JSONLD from "@/components/JSONLD";
import BackgroundEffect from "@/components/CanvasEffect";
import {
  Shield,
  Settings,
  Globe,
  ArrowRight,
  Terminal,
  Home,
  ChevronRight,
  Zap,
} from "lucide-react";

export const metadata: Metadata = {
  title: "About TypeWarp | Our Mission & Technology",
  description:
    "Learn about TypeWarp, the world's most advanced text transformation matrix. Discover our vision for digital entropy and technical excellence.",
  keywords: [
    "about typewarp",
    "text transformation",
    "unicode mapping",
    "digital entropy",
  ],
  openGraph: {
    title: "About TypeWarp | Mission & Intel",
    description:
      "Discover how TypeWarp blends advanced Unicode engineering with bold digital expression.",
    url: "https://www.typewarp.com/about",
    type: "website",
    images: [
      { url: "/og-image.png", width: 1200, height: 630, alt: "About TypeWarp" },
    ],
  },
  alternates: { canonical: "https://www.typewarp.com/about" },
};

const AboutPage = () => {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "AboutPage",
    name: "About TypeWarp",
    description:
      "Documentation of TypeWarp's mission, philosophy, and technical architecture.",
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
          <div className="text-accent-glitch">MISSION_PROTOCOL</div>
        </nav>

        {/* Hero Section */}
        <section className="text-center mb-32">
          <div className="inline-block px-4 py-1.5 mb-8 bg-accent-glitch/10 border border-accent-glitch/20 text-accent-glitch text-[10px] font-mono font-black uppercase tracking-[0.4em]">
            ORIGINS // EVOLUTION
          </div>
          <h1 className="text-6xl md:text-9xl font-black mb-12 tracking-tighter uppercase leading-[0.8]">
            Beyond the <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-accent-glitch to-white">
              Standard Script.
            </span>
          </h1>
          <p className="text-text-muted text-xl md:text-2xl max-w-3xl mx-auto font-mono leading-relaxed">
            TypeWarp was born at the intersection of digital entropy and
            technical precision. We believe text shouldn't just be read—it
            should be felt.
          </p>
        </section>

        {/* Philosophy Section */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-16 mb-40 items-center">
          <div>
            <div className="flex items-center gap-4 mb-8">
              <div className="w-2 h-12 bg-accent-glitch" />
              <h2 className="text-4xl md:text-6xl font-black uppercase tracking-tighter">
                The <span className="text-accent-glitch">Philosophy</span>
              </h2>
            </div>
            <div className="space-y-8 text-text-muted font-mono text-lg leading-relaxed">
              <p>
                In an era of homogenized digital communication, individual
                expression is often limited by system fonts and character sets.
                TypeWarp was designed to break these constraints.
              </p>
              <p>
                Our mission is to provide creators, developers, and digital
                architects with a high-performance toolkit for text
                manipulation. Using sophisticated Unicode mapping tables, we
                provide the bridge between ordinary and extraordinary.
              </p>
            </div>
          </div>
          <div className="relative aspect-square border border-white/5 bg-bg-card flex items-center justify-center group overflow-hidden">
            <div className="relative z-10 text-[10rem] font-black text-white/5 group-hover:text-accent-glitch/20 group-hover:scale-110 transition-all duration-700 select-none font-mono">
              TW
            </div>
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="w-64 h-64 border border-dashed border-accent-glitch/10 rounded-full animate-spin-slow" />
            </div>
            <div className="absolute top-0 left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-accent-glitch/30 to-transparent" />
          </div>
        </div>

        {/* Pillars */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-40">
          {[
            {
              title: "Privacy First",
              desc: "All text transformation happens client-side. Your messages never touch our servers.",
              icon: <Shield className="w-8 h-8 text-accent-glitch" />,
            },
            {
              title: "Performance",
              desc: "Engineered using massive Unicode mapping tables for maximum platform compatibility.",
              icon: <Settings className="w-8 h-8 text-accent-glitch" />,
            },
            {
              title: "Versatility",
              desc: "Tested across Instagram, Discord, TikTok, and GitHub for consistent rendering.",
              icon: <Globe className="w-8 h-8 text-accent-glitch" />,
            },
          ].map((pillar) => (
            <div
              key={pillar.title}
              className="p-10 bg-bg-card border border-white/5 hover:border-accent-glitch/30 transition-all group"
            >
              <div className="mb-8 p-4 bg-white/5 inline-block group-hover:bg-accent-glitch group-hover:text-black transition-colors">
                {pillar.icon}
              </div>
              <h3 className="text-xl font-black text-white mb-4 uppercase tracking-widest font-mono">
                {pillar.title}
              </h3>
              <p className="text-text-muted font-mono text-sm leading-relaxed">
                {pillar.desc}
              </p>
            </div>
          ))}
        </div>

        {/* Future Vision */}
        <section className="relative p-12 md:p-24 bg-bg-card border border-white/5 text-center overflow-hidden group">
          <div className="relative z-10">
            <h2 className="text-4xl md:text-7xl font-black text-white mb-10 tracking-tighter uppercase leading-[0.8]">
              The Future of <span className="text-accent-glitch">Text.</span>
            </h2>
            <p className="text-text-muted text-xl max-w-3xl mx-auto font-mono leading-relaxed mb-16">
              We are constantly expanding the TypeWarp ecosystem. From new
              encryption algorithms to generative ASCII engines, our roadmap is
              focused on pushing the boundaries of what plain text can achieve.
            </p>
            <Link
              href="/arsenal"
              className="inline-flex items-center gap-6 px-12 py-5 bg-accent-glitch text-black font-black text-xs uppercase tracking-widest hover:bg-white transition-all active:scale-95"
            >
              EXPLORE_THE_ARSENAL
              <ArrowRight className="w-5 h-5" />
            </Link>
          </div>
          <div className="absolute top-0 left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-accent-glitch/40 to-transparent" />
        </section>
      </div>
    </div>
  );
};

export default AboutPage;
