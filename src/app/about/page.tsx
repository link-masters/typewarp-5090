import React from "react";
import { SITE_URL } from "@/lib/config";
import { Metadata } from "next";
import Link from "next/link";
import JSONLD from "@/components/JSONLD";
import BackgroundEffect from "@/components/CanvasEffect";
import { categories, TOTAL_TOOLS_COUNT } from "@/lib/categories";
import {
  ArrowRight,
  Terminal,
  Home,
  ChevronRight,
  Zap,
  ShieldCheck,
  Globe2,
  Paintbrush,
  SlidersHorizontal,
  ClipboardCopy,
  FileCode2,
  Heart,
  Boxes,
  Fingerprint,
  Gauge,
  GitBranch,
  Layers,
  Code2,
  Cpu,
  MonitorPlay,
  Hash,
  Package,
  type LucideIcon,
} from "lucide-react";

export const metadata: Metadata = {
  title: "About TypeWarp | Our Mission & Technology",
  description:
    "Learn about TypeWarp — the world's most advanced free text transformation suite. 81+ tools across 6 categories. Real-time processing, privacy-first, cross-platform compatible. Works on Discord, Instagram, TikTok, Twitter & more.",
  keywords: [
    "about typewarp",
    "text transformation tool",
    "unicode mapping engine",
    "cursed text tool",
    "glitch font generator",
    "typewarp mission",
    "free text generator",
    "text effects platform",
    "cross platform fonts",
  ],
  openGraph: {
    title: "About TypeWarp | Mission & Technology",
    description:
      "Discover TypeWarp — 81+ free text transformation tools. Real-time processing, zero data collection, cross-platform compatible.",
    url: `${SITE_URL}/about`,
    type: "website",
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "About TypeWarp",
      },
    ],
    siteName: "TypeWarp",
  },
  twitter: {
    card: "summary_large_image",
    title: "About TypeWarp | Mission & Technology",
    description:
      "Discover TypeWarp — 81+ free text transformation tools with real-time processing and zero data collection.",
    creator: "@typewarp",
    images: ["/og-image.png"],
  },
  alternates: { canonical: `${SITE_URL}/about` },
};

/* ------------------------------------------------------------------ */
/*  Data                                                               */
/* ------------------------------------------------------------------ */

const stats = [
  {
    value: `${TOTAL_TOOLS_COUNT}+`,
    label: "Tools",
    icon: Boxes,
  },
  {
    value: `${categories.length}`,
    label: "Categories",
    icon: GitBranch,
  },
  {
    value: "0",
    label: "Data Stored",
    icon: Fingerprint,
  },
  {
    value: "<1ms",
    label: "Latency",
    icon: Gauge,
  },
];

interface Feature {
  icon: LucideIcon;
  title: string;
  desc: string;
}

const features: Feature[] = [
  {
    icon: Zap,
    title: "Instant Processing",
    desc: "Sub-millisecond text transforms — zero server calls, zero loading.",
  },
  {
    icon: ShieldCheck,
    title: "Privacy by Design",
    desc: "100% client-side. Your text never touches a server.",
  },
  {
    icon: Globe2,
    title: "Universal Output",
    desc: "Works on Discord, Instagram, TikTok, Twitter, WhatsApp & more.",
  },
  {
    icon: Paintbrush,
    title: "30+ Font Styles",
    desc: "Gothic, Fraktur, Math Script, Zalgo, Runic — endless variety.",
  },
  {
    icon: SlidersHorizontal,
    title: "Fine-Tuned Control",
    desc: "Intensity sliders, effect toggles, color themes & font selectors.",
  },
  {
    icon: ClipboardCopy,
    title: "One-Click Copy",
    desc: "Instant clipboard copy with visual feedback. Paste anywhere.",
  },
  {
    icon: FileCode2,
    title: "Pure Unicode",
    desc: "No images or custom fonts — plain text that works in any field.",
  },
  {
    icon: Heart,
    title: "Fully Accessible",
    desc: "Keyboard nav, screen readers, reduced motion & responsive 320px–4K.",
  },
];

const techStack = [
  { label: "Framework", value: "Next.js 15", icon: Layers },
  { label: "Language", value: "TypeScript", icon: Code2 },
  { label: "Engine", value: "Unicode Maps", icon: Cpu },
  { label: "Rendering", value: "Client-Side", icon: MonitorPlay },
  { label: "Mappings", value: "7,500+ Chars", icon: Hash },
  { label: "Build", value: "Turbopack", icon: Package },
];

const roadmapItems = [
  {
    phase: "Now",
    title: "Core Platform",
    items: [
      "81+ text transformation tools",
      "6 organized categories",
      "Real-time preview engine",
      "Mobile-first responsive UI",
    ],
    status: "live" as const,
  },
  {
    phase: "Q2 2026",
    title: "Enhanced Features",
    items: [
      "Text animation engine",
      "Bulk text processing",
      "Custom font map builder",
      "API access for developers",
    ],
    status: "upcoming" as const,
  },
  {
    phase: "Q3 2026",
    title: "Ecosystem Growth",
    items: [
      "Browser extension",
      "ASCII art generator",
      "Community font sharing",
      "Multi-language support",
    ],
    status: "planned" as const,
  },
];

/* ------------------------------------------------------------------ */
/*  Page                                                               */
/* ------------------------------------------------------------------ */

const AboutPage = () => {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "AboutPage",
    name: "About TypeWarp",
    url: `${SITE_URL}/about`,
    description:
      "TypeWarp is a free, privacy-first text transformation platform with 81+ tools across 6 categories.",
    mainEntity: {
      "@type": "SoftwareApplication",
      name: "TypeWarp",
      applicationCategory: "UtilitiesApplication",
      operatingSystem: "Web",
      offers: { "@type": "Offer", price: "0", priceCurrency: "USD" },
    },
  };

  return (
    <div className="min-h-screen pt-24 lg:pt-28 pb-16 sm:pb-20 bg-bg-void text-text-primary relative overflow-hidden">
      <BackgroundEffect />
      <JSONLD data={jsonLd} />

      <div className="mx-auto px-4 sm:px-6 max-w-7xl relative z-10">
        {/* ── Breadcrumbs ── */}
        <nav className="flex items-center gap-2 mb-10 sm:mb-12 font-mono text-[10px] sm:text-xs uppercase tracking-[0.2em] text-text-muted">
          <Link
            href="/"
            className="hover:text-accent-glitch transition-colors flex items-center gap-1.5"
          >
            <Home className="w-3 h-3 sm:w-3.5 sm:h-3.5" />
            Home
          </Link>
          <ChevronRight className="w-3 h-3 opacity-30" />
          <span className="text-accent-glitch">About</span>
        </nav>

        {/* ── Hero ── */}
        <section className="text-center mb-16 sm:mb-20 md:mb-24">
          <div className="inline-block px-4 py-1.5 mb-5 sm:mb-6 bg-accent-glitch/10 border border-accent-glitch/20 rounded-full text-accent-glitch text-[10px] sm:text-[11px] font-mono font-black uppercase tracking-[0.3em]">
            About TypeWarp
          </div>

          <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl xl:text-8xl font-black mb-6 sm:mb-8 tracking-tight uppercase leading-[0.9]">
            <span className="text-white">Beyond the</span>{" "}
            <span className="text-accent-glitch">Standard Script.</span>
          </h1>

          <p className="text-text-muted text-sm sm:text-base md:text-lg lg:text-xl max-w-3xl mx-auto leading-relaxed">
            A free, open text transformation platform for creators, developers &
            anyone who believes text should be{" "}
            <span className="text-accent-glitch font-semibold">
              unforgettable
            </span>
            .
          </p>
        </section>

        {/* ── Stats ── */}
        <section className="grid grid-cols-2 sm:grid-cols-4 gap-3 sm:gap-4 mb-16 sm:mb-20 md:mb-28">
          {stats.map((s) => (
            <div
              key={s.label}
              className="group relative flex items-center gap-3 sm:gap-4 p-4 sm:p-5 md:p-6 bg-bg-card border border-white/[0.06] rounded-2xl hover:border-accent-glitch/25 transition-all duration-300 overflow-hidden"
            >
              <div className="absolute top-0 inset-x-0 h-px bg-gradient-to-r from-transparent via-accent-glitch/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
              <div className="p-2 sm:p-3 bg-white/[0.04] rounded-xl group-hover:bg-accent-glitch/10 transition-colors shrink-0">
                <s.icon className="w-5 h-5 sm:w-6 sm:h-6 md:w-7 md:h-7 text-accent-glitch" />
              </div>
              <div>
                <div className="text-xl sm:text-2xl md:text-3xl font-black text-white leading-none">
                  {s.value}
                </div>
                <div className="text-[10px] sm:text-[11px] md:text-xs text-text-muted font-mono uppercase tracking-widest mt-1">
                  {s.label}
                </div>
              </div>
            </div>
          ))}
        </section>

        {/* ── Philosophy ── */}
        <section className="grid grid-cols-1 lg:grid-cols-5 gap-8 sm:gap-10 lg:gap-14 mb-16 sm:mb-20 md:mb-28 items-center">
          <div className="lg:col-span-3">
            <div className="flex items-center gap-3 sm:gap-4 mb-5 sm:mb-6">
              <div className="w-1.5 h-8 sm:h-10 bg-accent-glitch rounded-full" />
              <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-black uppercase tracking-tight">
                The <span className="text-accent-glitch">Philosophy</span>
              </h2>
            </div>
            <div className="space-y-4 sm:space-y-5 text-text-muted text-sm sm:text-base md:text-lg leading-relaxed">
              <p>
                In an era of homogenized digital communication, individual
                expression is limited by system fonts and standard character
                sets. TypeWarp was designed to{" "}
                <span className="text-white font-medium">
                  break these constraints
                </span>
                .
              </p>
              <p>
                We provide creators and developers with a high-performance
                toolkit using sophisticated Unicode mapping tables with{" "}
                <span className="text-accent-glitch font-medium">
                  7,500+ character mappings
                </span>{" "}
                — the bridge between ordinary and extraordinary.
              </p>
              <p>
                Everything runs client-side — your text never leaves your
                device. No accounts, no tracking, no data harvesting. Just pure,
                instant transformation.
              </p>
            </div>
          </div>

          {/* Visual */}
          <div className="lg:col-span-2 relative aspect-square max-w-[300px] sm:max-w-[350px] mx-auto lg:max-w-none border border-white/[0.06] bg-bg-card rounded-3xl flex items-center justify-center group overflow-hidden">
            <div className="relative z-10 text-[8rem] sm:text-[10rem] font-black text-white/[0.04] group-hover:text-accent-glitch/15 group-hover:scale-105 transition-all duration-700 select-none font-mono leading-none">
              TW
            </div>
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="w-48 h-48 sm:w-56 sm:h-56 border border-dashed border-accent-glitch/10 rounded-full animate-spin-slow" />
            </div>
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="w-32 h-32 sm:w-40 sm:h-40 border border-dotted border-white/[0.04] rounded-full animate-reverse-spin" />
            </div>
            <div className="absolute top-0 inset-x-0 h-px bg-gradient-to-r from-transparent via-accent-glitch/25 to-transparent" />
            <div className="absolute bottom-0 inset-x-0 h-px bg-gradient-to-r from-transparent via-white/10 to-transparent" />
          </div>
        </section>

        {/* ── Features ── */}
        <section className="mb-16 sm:mb-20 md:mb-28">
          <div className="flex items-center gap-3 sm:gap-4 mb-6 sm:mb-8">
            <div className="w-1.5 h-8 sm:h-10 bg-accent-glitch rounded-full" />
            <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-black uppercase tracking-tight">
              Platform <span className="text-accent-glitch">Features</span>
            </h2>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4">
            {features.map((f) => (
              <div
                key={f.title}
                className="group flex flex-col items-start gap-4 p-5 sm:p-6 bg-bg-card border border-white/[0.06] rounded-2xl hover:border-accent-glitch/30 transition-all duration-300 relative overflow-hidden"
              >
                <div className="absolute top-0 inset-x-0 h-px bg-gradient-to-r from-transparent via-accent-glitch/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
                <div className="p-2.5 sm:p-3 bg-white/[0.04] rounded-xl group-hover:bg-accent-glitch/10 transition-colors shrink-0">
                  <f.icon className="w-5 h-5 sm:w-6 sm:h-6 text-accent-glitch" />
                </div>
                <div className="min-w-0">
                  <h3 className="text-sm sm:text-base font-bold text-white mb-1.5 sm:mb-2 uppercase tracking-wide leading-tight group-hover:text-accent-glitch transition-colors">
                    {f.title}
                  </h3>
                  <p className="text-xs sm:text-sm text-text-muted leading-relaxed">
                    {f.desc}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* ── Categories ── */}
        <section className="mb-16 sm:mb-20 md:mb-28">
          <div className="flex items-center gap-3 sm:gap-4 mb-6 sm:mb-8">
            <div className="w-1.5 h-8 sm:h-10 bg-accent-glitch rounded-full" />
            <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-black uppercase tracking-tight">
              <span className="text-accent-glitch">{categories.length}</span>{" "}
              Categories
            </h2>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-4">
            {categories.map((cat) => (
              <Link
                key={cat.slug}
                href={`/${cat.slug}`}
                className="group flex items-center gap-4 p-5 sm:p-6 bg-bg-card border border-white/[0.06] rounded-2xl hover:border-accent-glitch/30 transition-all duration-300 relative overflow-hidden"
              >
                <div className="absolute top-0 inset-x-0 h-px bg-gradient-to-r from-transparent via-accent-glitch/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
                <div className="text-3xl sm:text-4xl shrink-0 p-2 sm:p-3 bg-white/[0.02] rounded-xl group-hover:bg-accent-glitch/5 transition-colors">
                  {cat.icon}
                </div>
                <div className="min-w-0 flex-1">
                  <div className="flex items-center justify-between gap-3 mb-1 sm:mb-1.5">
                    <h3 className="text-sm sm:text-base font-bold text-white group-hover:text-accent-glitch transition-colors truncate uppercase tracking-wide">
                      {cat.name}
                    </h3>
                    <span className="text-[10px] sm:text-xs font-mono font-bold text-accent-glitch/60 shrink-0 bg-accent-glitch/10 px-2 py-0.5 rounded-full">
                      {cat.tools.length} Tools
                    </span>
                  </div>
                  <p className="text-xs sm:text-sm text-text-muted mt-0.5 sm:mt-1 pr-2 line-clamp-2">
                    {cat.description}
                  </p>
                </div>
              </Link>
            ))}
          </div>
        </section>

        {/* ── Tech Stack ── */}
        <section className="mb-16 sm:mb-20 md:mb-28">
          <div className="flex items-center gap-3 sm:gap-4 mb-6 sm:mb-8">
            <div className="w-1.5 h-8 sm:h-10 bg-accent-glitch rounded-full" />
            <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-black uppercase tracking-tight">
              Under the <span className="text-accent-glitch">Hood</span>
            </h2>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6 gap-3 sm:gap-4">
            {techStack.map((t) => (
              <div
                key={t.label}
                className="group flex flex-row xl:flex-col items-center xl:items-start gap-3 sm:gap-4 p-4 sm:p-5 bg-bg-card border border-white/[0.06] rounded-2xl hover:border-accent-glitch/30 transition-all duration-300 relative overflow-hidden"
              >
                <div className="absolute top-0 inset-x-0 h-px bg-gradient-to-r from-transparent via-accent-glitch/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
                <div className="p-2 sm:p-2.5 bg-white/[0.04] rounded-xl group-hover:bg-accent-glitch/10 transition-colors shrink-0">
                  <t.icon className="w-5 h-5 sm:w-6 sm:h-6 text-accent-glitch/80" />
                </div>
                <div className="min-w-0">
                  <div className="text-[10px] sm:text-[11px] font-mono text-text-muted uppercase tracking-widest leading-none mb-1 sm:mb-1.5">
                    {t.label}
                  </div>
                  <div className="text-sm sm:text-base font-bold text-white truncate">
                    {t.value}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* ── Roadmap ── */}
        <section className="mb-16 sm:mb-20 md:mb-28">
          <div className="flex items-center gap-3 sm:gap-4 mb-6 sm:mb-8">
            <div className="w-1.5 h-8 sm:h-10 bg-accent-glitch rounded-full" />
            <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-black uppercase tracking-tight">
              What&apos;s <span className="text-accent-glitch">Next</span>
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 sm:gap-6">
            {roadmapItems.map((r) => (
              <div
                key={r.phase}
                className={`relative p-5 sm:p-6 md:p-8 bg-bg-card border rounded-2xl md:rounded-3xl overflow-hidden ${
                  r.status === "live"
                    ? "border-accent-glitch/30"
                    : "border-white/[0.06]"
                }`}
              >
                {r.status === "live" && (
                  <div className="absolute top-0 inset-x-0 h-px bg-gradient-to-r from-transparent via-accent-glitch/50 to-transparent" />
                )}

                <div className="mb-3 sm:mb-4">
                  <span
                    className={`inline-block px-2.5 py-1 rounded-full text-[10px] sm:text-xs font-mono font-bold uppercase tracking-wider ${
                      r.status === "live"
                        ? "bg-accent-glitch/15 text-accent-glitch"
                        : r.status === "upcoming"
                          ? "bg-blue-500/10 text-blue-400"
                          : "bg-white/[0.06] text-text-muted"
                    }`}
                  >
                    {r.phase}
                  </span>
                </div>

                <h3 className="text-lg sm:text-xl font-bold text-white mb-4 sm:mb-5">
                  {r.title}
                </h3>

                <ul className="space-y-2.5 sm:space-y-3">
                  {r.items.map((item) => (
                    <li
                      key={item}
                      className="flex items-start gap-2.5 text-xs sm:text-sm text-text-muted leading-relaxed"
                    >
                      <span
                        className={`mt-1.5 w-1.5 h-1.5 rounded-full shrink-0 ${
                          r.status === "live"
                            ? "bg-accent-glitch"
                            : r.status === "upcoming"
                              ? "bg-blue-400/50"
                              : "bg-white/20"
                        }`}
                      />
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </section>

        {/* ── CTA ── */}
        <section className="relative p-8 sm:p-12 md:p-16 lg:p-20 bg-bg-card border border-white/[0.06] rounded-3xl text-center overflow-hidden">
          <div className="absolute top-0 inset-x-0 h-px bg-gradient-to-r from-transparent via-accent-glitch/40 to-transparent" />
          <div className="absolute bottom-0 inset-x-0 h-px bg-gradient-to-r from-transparent via-white/10 to-transparent" />

          <div className="relative z-10">
            <h2 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-black text-white mb-4 sm:mb-6 tracking-tight uppercase leading-[0.85]">
              Start{" "}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-accent-glitch to-emerald-300">
                Transforming.
              </span>
            </h2>
            <p className="text-text-muted text-sm sm:text-base md:text-lg max-w-2xl mx-auto leading-relaxed mb-8 sm:mb-10 md:mb-12">
              {TOTAL_TOOLS_COUNT}+ tools · 6 categories · Zero data collection ·
              Instant results. Explore what TypeWarp can do for your digital
              expression.
            </p>

            <div className="flex flex-col sm:flex-row items-center justify-center gap-3 sm:gap-4">
              <Link
                href="/collection"
                className="w-full sm:w-auto inline-flex items-center justify-center gap-3 px-8 sm:px-10 py-4 sm:py-5 bg-accent-glitch text-black font-black text-xs sm:text-sm uppercase tracking-widest rounded-xl hover:bg-white transition-all duration-300 active:scale-[0.97]"
              >
                Explore All Tools
                <ArrowRight className="w-5 h-5" />
              </Link>
              <Link
                href="/dark-horror/cursed-text"
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2.5 px-8 sm:px-10 py-4 sm:py-5 bg-white/[0.04] border border-white/[0.1] text-white font-bold text-xs sm:text-sm uppercase tracking-widest rounded-xl hover:border-accent-glitch/30 hover:bg-accent-glitch/5 transition-all duration-300 active:scale-[0.97]"
              >
                <Terminal className="w-4 h-4 sm:w-5 sm:h-5" />
                Try Cursed Text
              </Link>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
};

export default AboutPage;
