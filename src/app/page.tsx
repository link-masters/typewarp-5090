import Hero from "@/components/Hero";
import { categories, TOTAL_TOOLS_COUNT } from "@/lib/categories";
import Link from "next/link";
import { Metadata } from "next";
import JSONLD from "@/components/JSONLD";
import { ToolIcon } from "@/components/ToolIcon";
import { getBlogPosts } from "@/lib/blog";
import SmallBlogCard from "@/components/SmallBlogCard";
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
    url: "https://www.typewarp.com",
    type: "website",
  },
  alternates: {
    canonical: "https://www.typewarp.com",
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
    url: "https://www.typewarp.com",
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
        item: "https://www.typewarp.com",
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
      <section className="py-10 md:py-28 px-4 bg-bg-void relative overflow-hidden">
        <div className="container mx-auto max-w-7xl">
          <div className="text-center mb-8 md:mb-16">
            <span className="text-accent-glitch font-mono text-[10px] uppercase tracking-[0.5em] mb-4 inline-block">
              //_Operational_Capacities
            </span>
            <h2 className="text-2xl md:text-6xl font-black tracking-tighter uppercase leading-tight">
              Engineered for <br />{" "}
              <span className="text-accent-glitch">Digital Entropy</span>
            </h2>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-y-8 md:gap-y-16 gap-x-6 md:gap-x-12">
            {capabilities.map((cap, i) => {
              const Icon = cap.icon;
              return (
                <div key={i} className="flex flex-col gap-4 md:gap-6 group">
                  <div className="w-10 h-10 md:w-12 md:h-12 flex items-center justify-center border border-border-subtle group-hover:border-accent-glitch transition-colors duration-500 relative">
                    <Icon className="w-4 h-4 md:w-5 md:h-5 text-text-muted group-hover:text-accent-glitch transition-colors" />
                  </div>
                  <div className="space-y-2 md:space-y-3">
                    <h3 className="text-lg md:text-xl font-black uppercase tracking-tight group-hover:text-accent-glitch transition-colors">
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
      {/* Categories Explorer Section */}
      <section className="py-12 md:py-28 px-4 bg-bg-card relative overflow-hidden border-b border-border-subtle">
        <div className="absolute inset-0 opacity-[0.02] pointer-events-none bg-[url('https://www.transparenttextures.com/patterns/carbon-fibre.png')]" />

        <div className="container mx-auto max-w-7xl relative z-10">
          <div className="flex flex-col md:flex-row items-end justify-between mb-8 md:mb-12 gap-4 md:gap-8">
            <div className="max-w-2xl text-left">
              <h2 className="text-2xl md:text-6xl font-black tracking-tighter uppercase mb-3 md:mb-6 leading-tight">
                Archive <br />{" "}
                <span className="text-accent-glitch">Repositories</span>
              </h2>
              <p className="text-text-muted font-mono text-sm md:text-lg max-w-xl">
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
      <section className="py-16 md:py-24 px-4 bg-bg-void relative border-t border-border-subtle/30">
        <div className="container mx-auto max-w-7xl">
          <div className="flex flex-col md:flex-row items-end justify-between mb-8 md:mb-12 gap-6 md:gap-8 text-left">
            <div className="max-w-2xl">
              <h2 className="text-2xl md:text-5xl font-black tracking-tighter uppercase mb-3 md:mb-5 text-left leading-tight">
                Broadcast <br />{" "}
                <span className="text-accent-glitch">Logs</span>
              </h2>
              <p className="text-text-muted font-mono text-sm md:text-base max-w-xl text-left uppercase tracking-wider opacity-80">
                Intelligence on typography, glitch aesthetics, and digital
                subcultures.
              </p>
            </div>

            <Link
              href="/blog"
              className="font-mono text-xs uppercase tracking-[0.3em] text-text-muted hover:text-text-primary transition-colors border-b border-border-subtle pb-2 mb-1"
            >
              Access Archive
            </Link>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-5">
            {recentPosts.map((post) => (
              <SmallBlogCard key={post.slug} post={post} />
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
