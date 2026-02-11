import Hero from "@/components/Hero";
import { categories, TOTAL_TOOLS_COUNT } from "@/lib/categories";
import Link from "next/link";
import { Metadata } from "next";
import JSONLD from "@/components/JSONLD";
import { ToolIcon } from "@/components/ToolIcon";
import { getBlogPosts } from "@/lib/blog";
import BlogCard from "@/components/BlogCard";
import FeaturedTools from "@/components/FeaturedTools";
import Testimonials from "@/components/Testimonials";
import {
  Skull,
  Zap,
  Ghost,
  Terminal,
  Shield,
  Cpu,
  Activity,
  ArrowRight,
  Workflow,
  Target,
  Layers,
  Radio,
} from "lucide-react";

export const metadata: Metadata = {
  title: "TypeWarp | #1 Cursed Text & Glitch Font Generator Toolkit",
  description:
    "Generate cursed text, Zalgo script, and glitchy fonts instantly. TypeWarp is the ultimate toolkit to warp typography for Discord, Twitter, and more.",
  keywords: [
    "cursed text generator",
    "glitch fonts",
    "zalgo text script",
    "fancy text generator",
    "typography tools",
    "digital corruption",
    "typewarp",
  ],
  openGraph: {
    title: "TypeWarp | Ultimate Cursed Text & Glitch Font Toolkit",
    description:
      "Transform your text into glitchy scripts and digital masterpieces with TypeWarp's high-performance engine.",
    images: ["/og-image.png"],
    url: "https://typewarp.com",
    type: "website",
  },
  alternates: {
    canonical: "https://typewarp.com",
  },
  other: {
    "og:updated_time": new Date().toISOString(),
  },
};

export default async function Home() {
  const posts = await getBlogPosts();
  const recentPosts = posts.slice(0, 6);

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "WebApplication",
    name: "TypeWarp",
    url: "https://typewarp.com",
    description:
      "The professional-grade cursed text and glitchy typography toolkit for digital architects.",
    applicationCategory: "DesignApplication",
    genre: "Typography",
    browserRequirements: "Requires JavaScript",
    softwareVersion: "1.4.0",
    operatingSystem: "All",
    offers: {
      "@type": "Offer",
      price: "0",
      priceCurrency: "USD",
    },
    aggregateRating: {
      "@type": "AggregateRating",
      ratingValue: "4.9",
      reviewCount: "1280",
    },
    featureList: [
      "Real-time Cursed Text Generation",
      "Advanced Zalgo Scripting",
      "Binary & Morse Translation",
      "ASCII Art Generative Engine",
      "Glitch Typography Matrices",
    ],
  };

  const breadcrumbJsonLd = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      {
        "@type": "ListItem",
        position: 1,
        name: "Home",
        item: "https://typewarp.com",
      },
    ],
  };

  const capabilities = [
    {
      title: "Cursed Typography",
      description:
        "Unleash digital chaos with our proprietary glitch algorithms. From subtle jitters to total corruption.",
      icon: Ghost,
    },
    {
      title: "Matrix Hardened",
      description:
        "Our tools are optimized for flawless rendering across Discord, GitHub, and dark-web forums.",
      icon: Shield,
    },
    {
      title: "Technical Decoders",
      description:
        "Professional-grade converters for Binary, Morse, and Base64. Built for data warriors.",
      icon: Terminal,
    },
    {
      title: "ASCII Art Core",
      description:
        "Generate complex visual structures from raw standard characters using our generative engine.",
      icon: Cpu,
    },
    {
      title: "Zalgo Protocol",
      description:
        "The most advanced Zalgo generator on the market. Multi-level stack controls for maximum dread.",
      icon: Skull,
    },
    {
      title: "Real-time Warp",
      description:
        "High-performance transformation engine that processes text at the speed of light.",
      icon: Zap,
    },
  ];

  return (
    <div className="bg-bg-void text-text-primary">
      <JSONLD data={jsonLd} />
      <JSONLD data={breadcrumbJsonLd} />

      <Hero />

      {/* Featured Tools Section */}
      <FeaturedTools />

      {/* Capabilities System Grid */}
      <section className="py-12 md:py-28 px-4 bg-bg-void relative overflow-hidden">
        <div className="container mx-auto max-w-7xl">
          <div className="text-center mb-10 md:mb-16">
            <span className="text-accent-glitch font-mono text-[10px] uppercase tracking-[0.5em] mb-4 inline-block">
              //_Operational_Capacities
            </span>
            <h2 className="text-2xl md:text-6xl font-black tracking-tighter uppercase leading-tight">
              Engineered for <br />{" "}
              <span className="text-accent-glitch">Digital Entropy</span>
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-y-16 gap-x-12">
            {capabilities.map((cap, i) => {
              const Icon = cap.icon;
              return (
                <div key={i} className="flex flex-col gap-6 group">
                  <div className="w-12 h-12 flex items-center justify-center border border-border-subtle group-hover:border-accent-glitch transition-colors duration-500 relative">
                    <Icon className="w-5 h-5 text-text-muted group-hover:text-accent-glitch transition-colors" />
                    <div className="absolute -inset-2 bg-accent-glitch/5 blur-lg opacity-0 group-hover:opacity-100 transition-opacity" />
                  </div>
                  <div className="space-y-3">
                    <h3 className="text-xl font-black uppercase tracking-tight group-hover:text-accent-glitch transition-colors">
                      {cap.title}
                    </h3>
                    <p className="text-text-muted text-sm font-mono leading-relaxed group-hover:text-text-primary/70 transition-colors">
                      {cap.description}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Deep Warp Architecture - Technical Blueprint Section */}
      <section className="py-24 md:py-32 px-4 bg-bg-void relative overflow-hidden border-y border-border-subtle/20">
        <div className="absolute inset-0 z-0 opacity-[0.05] pointer-events-none bg-[linear-gradient(to_right,#888_1px,transparent_1px),linear-gradient(to_bottom,#888_1px,transparent_1px)] bg-[size:50px_50px]" />

        <div className="container mx-auto max-w-7xl relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-20 items-center">
            {/* Left: Technical Diagram Visual */}
            <div className="relative aspect-square max-w-[500px] mx-auto lg:mx-0 group">
              <div className="absolute inset-0 border border-accent-glitch/20 rounded-full animate-spin-slow" />
              <div className="absolute inset-10 border border-accent-glitch/10 rounded-full animate-reverse-spin" />

              {/* Inner HUD Core */}
              <div className="absolute inset-20 bg-bg-card border border-border-subtle flex flex-col items-center justify-center p-8 text-center group-hover:border-accent-glitch/40 transition-colors duration-700">
                <Cpu className="w-12 h-12 text-accent-glitch mb-4 opacity-50 group-hover:opacity-100 transition-opacity" />
                <div className="font-mono text-[9px] text-accent-glitch tracking-[0.4em] uppercase mb-2">
                  System_Core
                </div>
                <div className="w-full h-px bg-white/10 mb-2" />
                <div className="font-mono text-[9px] text-text-muted uppercase">
                  Latency: 0.04ms
                </div>
              </div>

              {/* Data Points (Orbiting) */}
              {[0, 120, 240].map((angle, i) => (
                <div
                  key={i}
                  className="absolute top-1/2 left-1/2 w-4 h-4 bg-accent-glitch group-hover:shadow-[0_0_15px_#39FF14] transition-all duration-500"
                  style={{
                    transform: `translate(-50%, -50%) rotate(${angle}deg) translate(180px) rotate(-${angle}deg)`,
                  }}
                />
              ))}

              {/* Blueprint Labels */}
              <div className="absolute -top-4 -right-4 font-mono text-[10px] text-text-muted/40 uppercase tracking-widest border border-white/5 p-4 backdrop-blur-sm">
                SPEC: TW_X_800
                <br />
                VER: 1.4.0
              </div>
            </div>

            {/* Right: Spec Details */}
            <div className="space-y-12">
              <div>
                <div className="flex items-center gap-4 mb-6">
                  <div className="w-1.5 h-1.5 bg-accent-glitch" />
                  <span className="text-accent-glitch font-mono text-[10px] uppercase tracking-[0.4em]">
                    Engine_Specifications
                  </span>
                </div>
                <h2 className="text-4xl md:text-7xl font-black tracking-tighter uppercase leading-[0.85] mb-8">
                  Deep Warp <br />{" "}
                  <span className="text-accent-glitch">Architecture</span>
                </h2>
                <p className="text-text-muted font-mono text-base leading-relaxed max-w-xl">
                  Unveiling the proprietary layering logic that powers
                  TypeWarp's digital corruption. High-fidelity rendering meets
                  extreme character entropy.
                </p>
              </div>

              <div className="space-y-6">
                {[
                  {
                    title: "Zalgo-Stack Protocol",
                    desc: "Multi-threaded vertical character layering with sub-pixel jitter control.",
                  },
                  {
                    title: "Matrix Jitter Engine",
                    desc: "Pseudo-random positional offsets calibrated for Discord & GitHub rendering.",
                  },
                  {
                    title: "Unicode Mapping 2.0",
                    desc: "Proprietary substitution matrices mapping 4,000+ unique glyph sets.",
                  },
                ].map((spec, idx) => (
                  <div
                    key={idx}
                    className="group border-l border-white/10 pl-8 py-4 hover:border-accent-glitch transition-colors"
                  >
                    <h4 className="font-black text-xl uppercase tracking-tighter mb-2 group-hover:text-accent-glitch transition-colors">
                      {spec.title}
                    </h4>
                    <p className="text-sm font-mono text-text-muted leading-relaxed">
                      {spec.desc}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Categories Explorer Section */}
      <section className="py-12 md:py-28 px-4 bg-bg-card relative overflow-hidden border-b border-border-subtle">
        <div className="absolute inset-0 opacity-[0.02] pointer-events-none bg-[url('https://www.transparenttextures.com/patterns/carbon-fibre.png')]" />

        <div className="container mx-auto max-w-7xl relative z-10">
          <div className="flex flex-col md:flex-row items-end justify-between mb-8 md:mb-12 gap-6 md:gap-8">
            <div className="max-w-2xl text-left">
              <h2 className="text-2xl md:text-6xl font-black tracking-tighter uppercase mb-4 md:mb-6 leading-tight">
                Archive <br />{" "}
                <span className="text-accent-glitch">Repositories</span>
              </h2>
              <p className="text-text-muted font-mono text-base md:text-lg max-w-xl">
                Navigate through categorized repositories of specialized text
                manipulation algorithms and typography engines.
              </p>
            </div>

            <Link
              href="/arsenal"
              className="font-mono text-sm uppercase tracking-[0.3em] text-text-muted hover:text-accent-glitch transition-colors border-b border-border-subtle pb-2 mb-2"
            >
              INITIALIZE_FULL_DIRECTORY
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {categories.map((category) => (
              <Link
                key={category.slug}
                href={`/${category.slug}`}
                className="group relative p-5 md:p-6 bg-bg-void border border-border-subtle hover:border-accent-glitch/50 transition-all duration-500 overflow-hidden"
              >
                <div className="absolute top-0 right-0 p-3 md:p-4 font-mono text-[9px] md:text-[10px] text-text-primary/10 group-hover:text-accent-glitch/20 transition-colors">
                  #{category.count.toString().padStart(2, "0")}
                </div>

                <div className="relative z-10 h-full flex flex-col">
                  <div className="mb-4 md:mb-6 flex items-center justify-between">
                    <div className="p-2 md:p-3 bg-bg-card border border-border-subtle group-hover:border-accent-glitch transition-colors">
                      <ToolIcon
                        slug={category.slug}
                        categorySlug={category.slug}
                        className="w-6 h-6 md:w-8 md:h-8 text-text-primary group-hover:text-accent-glitch transition-colors"
                      />
                    </div>
                  </div>

                  <h3 className="text-xl md:text-2xl font-black text-text-primary mb-2 md:mb-3 uppercase tracking-tight group-hover:text-accent-glitch transition-colors">
                    {category.name}
                  </h3>

                  <p className="text-text-muted text-sm font-mono mb-6 line-clamp-2">
                    {category.description}
                  </p>

                  <div className="flex flex-wrap gap-2 mb-8">
                    {category.tools.slice(0, 3).map((tool) => (
                      <span
                        key={tool.slug}
                        className="text-[9px] font-mono px-2 py-1 bg-white/5 text-text-muted uppercase tracking-wider"
                      >
                        {tool.name.split(" ")[0]}
                      </span>
                    ))}
                    {category.tools.length > 3 && (
                      <span className="text-[9px] font-mono px-2 py-1 text-accent-glitch/60 uppercase">
                        +{category.tools.length - 3} MORE
                      </span>
                    )}
                  </div>

                  <div className="mt-auto pt-6 border-t border-border-subtle/40 flex items-center justify-between">
                    <div className="flex items-center gap-2 text-accent-glitch font-mono font-black text-[9px] uppercase tracking-[0.3em]">
                      EXPLORE_CATEGORY
                      <ArrowRight className="w-3 h-3 transition-transform group-hover:translate-x-2" />
                    </div>
                    <div className="w-12 h-[1px] bg-white/10 group-hover:bg-accent-glitch/30 group-hover:w-20 transition-all duration-500" />
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <Testimonials />

      {/* Latest from Blog Section */}
      <section className="py-12 md:py-28 px-4 bg-bg-void relative border-t border-border-subtle/30">
        <div className="container mx-auto max-w-7xl">
          <div className="flex flex-col md:flex-row items-end justify-between mb-10 md:mb-12 gap-6 md:gap-8 text-left">
            <div className="max-w-2xl">
              <h2 className="text-2xl md:text-6xl font-black tracking-tighter uppercase mb-4 md:mb-6 text-left">
                Broadcast <br />{" "}
                <span className="text-accent-glitch">Logs</span>
              </h2>
              <p className="text-text-muted font-mono text-base md:text-lg max-w-xl text-left">
                Intelligence on typography, glitch aesthetics, and digital
                subcultures.
              </p>
            </div>

            <Link
              href="/blog"
              className="font-mono text-sm uppercase tracking-[0.3em] text-text-muted hover:text-text-primary transition-colors border-b border-border-subtle pb-2"
            >
              Access Archive
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {recentPosts.map((post) => (
              <BlogCard key={post.slug} post={post} />
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-12 md:py-32 px-4 relative overflow-hidden bg-bg-void">
        <div className="container mx-auto max-w-5xl relative z-10">
          <div className="p-6 md:p-20 bg-bg-card border border-white/10 relative overflow-hidden text-center group">
            {/* Background Glitch Effect */}
            <div className="absolute inset-0 opacity-0 group-hover:opacity-10 transition-opacity duration-700 bg-accent-glitch/5" />

            <div className="relative z-10">
              <span className="inline-block px-3 py-1 bg-accent-glitch text-black text-[9px] font-black uppercase tracking-[0.4em] mb-6 md:mb-8">
                CRITICAL_UPDATE_REQUIRED
              </span>

              <h2 className="text-3xl md:text-6xl font-black text-text-primary mb-6 md:mb-8 tracking-tighter leading-tight uppercase">
                Ready to <br />
                <span className="text-accent-glitch">Warp Reality?</span>
              </h2>

              <p className="text-text-muted text-base md:text-lg mb-12 font-mono max-w-xl mx-auto leading-relaxed">
                Join {TOTAL_TOOLS_COUNT}+ creators breaking the matrix. No
                limits. No rules. Just pure entropy.
              </p>

              <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                <Link
                  href="/dark-horror/cursed-text"
                  className="w-full sm:w-auto px-10 py-4 bg-accent-glitch text-black font-black text-sm hover:scale-105 active:scale-95 transition-all uppercase tracking-widest shadow-[0_0_20px_rgba(57,255,20,0.3)]"
                >
                  Launch Core
                </Link>
                <Link
                  href="/arsenal"
                  className="w-full sm:w-auto px-10 py-4 border border-border-subtle text-text-primary font-black text-sm hover:bg-text-primary hover:text-bg-void transition-all uppercase tracking-widest"
                >
                  Directory
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
