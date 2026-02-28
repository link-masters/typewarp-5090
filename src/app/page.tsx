import Hero from "@/components/Hero";
import { categories, TOTAL_TOOLS_COUNT } from "@/lib/categories";
import Link from "next/link";
import { Metadata } from "next";
import JSONLD from "@/components/JSONLD";
import { ToolIcon } from "@/components/ToolIcon";
import { getBlogPosts } from "@/lib/blog";
import SmallBlogCard from "@/components/SmallBlogCard";
import dynamic from "next/dynamic";
import { SITE_URL } from "@/lib/config";
import {
  Skull,
  Zap,
  Ghost,
  Terminal,
  Shield,
  Cpu,
  ArrowRight,
} from "lucide-react";

const FeaturedTools = dynamic(() => import("@/components/FeaturedTools"), {
  loading: () => <div className="min-h-[400px]" />,
});
const Testimonials = dynamic(() => import("@/components/Testimonials"), {
  loading: () => <div className="min-h-[300px]" />,
});

export const metadata: Metadata = {
  title: "TypeWarp | Modern Text Effects & Glitch Font Generator Tool",
  description:
    "Free cursed text generator with 81+ glitch fonts, Zalgo text, and aesthetic styles. Create unique text for Discord, Twitter, and Instagram. No signup required.",
  keywords: [
    "cursed text generator",
    "glitch text generator",
    "zalgo text generator",
    "fancy text generator",
    "weird text generator",
    "aesthetic font generator",
    "cursed font copy paste",
    "glitch font maker",
    "scary text generator",
    "creepy text maker",
    "distorted text generator",
    "corrupted text tool",
    "unicode text converter",
    "stylish text generator",
    "cool fonts for discord",
    "fancy text for instagram",
    "glitchy text for twitter",
    "typewarp",
  ],
  openGraph: {
    title: "TypeWarp | Modern Text Effects Generator",
    description:
      "Create cursed text, Zalgo fonts, and glitch effects instantly. 50+ free text tools for Discord, Twitter, Instagram. No signup needed.",
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "TypeWarp - Free Cursed Text Generator with 50+ Glitch Font Tools",
      },
    ],
    url: SITE_URL,
    type: "website",
    siteName: "TypeWarp",
  },
  twitter: {
    card: "summary_large_image",
    title: "TypeWarp | Modern Text Effects Generator",
    description:
      "Create cursed text, Zalgo fonts, and glitch effects instantly. 50+ free text tools.",
    creator: "@typewarp",
    images: ["/og-image.png"],
  },
  alternates: {
    canonical: SITE_URL,
  },
  other: {
    "og:updated_time": new Date().toISOString(),
    "application-name": "TypeWarp",
    "apple-mobile-web-app-title": "TypeWarp",
  },
};

export default async function Home() {
  const posts = await getBlogPosts();
  const recentPosts = posts.slice(0, 6);

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "WebApplication",
    name: "TypeWarp - Free Cursed Text Generator",
    url: SITE_URL,
    description:
      "Free online cursed text generator with 50+ glitch fonts, Zalgo text, and aesthetic styles. Create unique text effects for Discord, Twitter, and Instagram instantly.",
    applicationCategory: "DesignApplication",
    genre: ["Typography", "Text Effects", "Font Generator"],
    browserRequirements: "Requires JavaScript",
    softwareVersion: "1.4.0",
    operatingSystem: "All",
    offers: {
      "@type": "Offer",
      price: "0",
      priceCurrency: "USD",
      availability: "https://schema.org/InStock",
    },
    featureList: [
      "Real-time Cursed Text Generation",
      "50+ Glitch Font Styles",
      "Advanced Zalgo Text Effects",
      "Binary & Morse Code Converters",
      "ASCII Art Generator",
      "Aesthetic Text Styles",
      "Copy Paste Ready",
      "No Signup Required",
    ],
    screenshot: `${SITE_URL}/og-image.png`,
    aggregateRating: {
      "@type": "AggregateRating",
      ratingValue: "4.9",
      ratingCount: "250",
      bestRating: "5",
      worstRating: "1",
    },
  };

  const faqJsonLd = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: [
      {
        "@type": "Question",
        name: "What is a cursed text generator?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "A cursed text generator is an online tool that transforms normal text into glitchy, distorted, or 'cursed' styles using special Unicode characters. TypeWarp creates these effects by combining diacritical marks and special symbols above, below, and through letters to create unique, eye-catching text for social media.",
        },
      },
      {
        "@type": "Question",
        name: "How do I use the cursed text generator?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "Simply type or paste your text into TypeWarp, choose from 50+ glitch styles like Zalgo, cursed, or aesthetic fonts, then copy the generated text and paste it anywhere - Discord, Twitter, Instagram, or any platform that supports Unicode.",
        },
      },
      {
        "@type": "Question",
        name: "Is the cursed text generator free to use?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "Yes, TypeWarp is completely free with no signup required. All 50+ text tools including the cursed text generator, Zalgo creator, and glitch font maker are available instantly.",
        },
      },
      {
        "@type": "Question",
        name: "Does cursed text work on Discord and Twitter?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "Yes, cursed text generated by TypeWarp works on Discord, Twitter, Instagram, TikTok, and most social platforms. The text uses standard Unicode characters supported across devices and platforms.",
        },
      },
    ],
  };

  const howToJsonLd = {
    "@context": "https://schema.org",
    "@type": "HowTo",
    name: "How to Create Cursed Text",
    description:
      "Create unique cursed text effects for social media in 3 simple steps",
    step: [
      {
        "@type": "HowToStep",
        position: 1,
        name: "Enter Your Text",
        text: "Type or paste your message into the TypeWarp text input field",
      },
      {
        "@type": "HowToStep",
        position: 2,
        name: "Choose a Style",
        text: "Select from 50+ styles including Zalgo, cursed, glitch, or aesthetic fonts",
      },
      {
        "@type": "HowToStep",
        position: 3,
        name: "Copy and Share",
        text: "Click copy and paste your cursed text on Discord, Twitter, or anywhere",
      },
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
        item: SITE_URL,
      },
    ],
  };

  const serviceJsonLd = {
    "@context": "https://schema.org",
    "@type": "Service",
    name: "Cursed Text Generation Service",
    provider: {
      "@type": "Organization",
      name: "TypeWarp",
    },
    serviceType: "Text Effects Generator",
    description:
      "Free online service for generating cursed text, glitch fonts, and Zalgo effects",
    areaServed: "Worldwide",
    hasOfferCatalog: {
      "@type": "OfferCatalog",
      name: "Text Tools",
      itemListElement: [
        {
          "@type": "Offer",
          itemOffered: {
            "@type": "Service",
            name: "Cursed Text Generator",
          },
        },
        {
          "@type": "Offer",
          itemOffered: {
            "@type": "Service",
            name: "Zalgo Text Creator",
          },
        },
        {
          "@type": "Offer",
          itemOffered: {
            "@type": "Service",
            name: "Glitch Font Maker",
          },
        },
      ],
    },
  };

  const capabilities = [
    {
      title: "Unique Styles",
      description:
        "Stand out with unique text effects designed to look great on any platform.",
      icon: Ghost,
    },
    {
      title: "Platform Ready",
      description:
        "Verified to work perfectly across Discord, Instagram, and more.",
      icon: Shield,
    },
    {
      title: "Universal Tools",
      description:
        "Simple and effective converters for Binary, Morse, and Base64.",
      icon: Terminal,
    },
    {
      title: "Creative Art",
      description:
        "Create complex visual designs using only standard characters.",
      icon: Cpu,
    },
    {
      title: "Classic Effects",
      description:
        "Access a huge variety of stylized text effects for your profile.",
      icon: Skull,
    },
    {
      title: "Instant Results",
      description:
        "Our high-speed engine generates your text effects in real-time.",
      icon: Zap,
    },
  ];

  return (
    <div className="bg-bg-void text-text-primary">
      <JSONLD data={jsonLd} />
      <JSONLD data={breadcrumbJsonLd} />
      <JSONLD data={faqJsonLd} />
      <JSONLD data={howToJsonLd} />
      <JSONLD data={serviceJsonLd} />
      <Hero />
      {/* Featured Tools Section */}
      <FeaturedTools />

      {/* Capabilities Section */}
      <section
        className="py-24 md:py-32 px-4 bg-[#080808] relative overflow-hidden"
        aria-labelledby="features-heading"
      >
        <div className="container mx-auto max-w-7xl">
          <div className="text-center mb-20 md:mb-28">
            <span className="text-white/30 font-mono text-[10px] uppercase tracking-[0.5em] mb-4 inline-block">
              Built for Creators
            </span>
            <h2
              id="features-heading"
              className="text-4xl md:text-5xl font-black tracking-tighter uppercase leading-[0.9]"
            >
              Modern <span className="text-accent-glitch">Design Tools</span>
            </h2>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-y-12 md:gap-y-24 gap-x-12">
            {capabilities.map((cap, i) => {
              const Icon = cap.icon;
              return (
                <div key={i} className="flex flex-col gap-6 group">
                  <div className="w-14 h-14 flex items-center justify-center bg-[#0c0c0c] border border-white/5 rounded-2xl group-hover:scale-110 group-hover:border-accent-glitch/20 transition-all duration-500 relative overflow-hidden">
                    <Icon className="w-6 h-6 text-white/30 group-hover:text-accent-glitch transition-all duration-500" />
                    <div className="absolute inset-0 bg-accent-glitch/[0.02] opacity-0 group-hover:opacity-100 transition-opacity" />
                  </div>
                  <div className="space-y-4">
                    <h3 className="text-2xl font-black uppercase tracking-tight text-white group-hover:text-accent-glitch transition-all duration-500">
                      {cap.title}
                    </h3>
                    <p className="text-white/40 text-base leading-relaxed group-hover:text-white/60 transition-colors duration-500">
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
      <section
        className="py-20 md:py-32 px-4 bg-[#080808] relative overflow-hidden"
        aria-labelledby="categories-heading"
      >
        <div className="container mx-auto max-w-7xl relative z-10">
          <div className="flex flex-col md:flex-row items-end justify-between mb-12 md:mb-16 gap-6 md:gap-8">
            <div className="max-w-2xl text-left">
              <h2
                id="categories-heading"
                className="text-3xl md:text-5xl font-black tracking-tighter uppercase mb-4 md:mb-6 leading-tight"
              >
                Creative <span className="text-accent-glitch">Collections</span>
              </h2>
              <p className="text-white/40 font-mono text-base md:text-lg max-w-xl">
                Browse our curated categories to find the perfect look for your
                social profiles.
              </p>
            </div>

            <Link
              href="/collection"
              className="font-mono text-xs uppercase tracking-[0.2em] text-white/50 hover:text-accent-glitch transition-colors flex items-center gap-3 border-b border-white/10 pb-2 mb-2"
              title="Browse all 50+ text effect tools"
            >
              View All
              <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {categories.map((category) => (
              <Link
                key={category.slug}
                href={`/${category.slug}`}
                className="group relative p-6 bg-[#0c0c0c] border border-white/5 hover:border-accent-glitch/20 transition-all duration-500 overflow-hidden flex flex-col rounded-xl"
                title={`${category.name} - ${category.description}`}
              >
                {/* Unique Refined Hover Glimmer */}
                <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none bg-[radial-gradient(circle_at_50%_0%,rgba(57,255,20,0.02)_0%,transparent_70%)]" />

                <div className="relative z-10 h-full flex flex-col">
                  <div className="mb-4 flex items-center justify-between">
                    <div className="flex items-center justify-start origin-left group-hover:scale-110 transition-transform duration-500 relative">
                      <ToolIcon
                        slug={category.slug}
                        categorySlug={category.slug}
                        className="w-6 h-6 text-white/30 group-hover:text-accent-glitch transition-all duration-500"
                      />
                    </div>
                    <div className="font-mono text-[10px] text-white/10 group-hover:text-accent-glitch/20 transition-colors">
                      {category.count.toString().padStart(2, "0")} TOOLS
                    </div>
                  </div>

                  <h3 className="text-xl font-black text-white/90 mb-3 uppercase tracking-tighter group-hover:tracking-widest group-hover:text-white transition-all duration-500">
                    {category.name}
                  </h3>

                  <p className="text-white/40 text-[11px] leading-relaxed mb-6 group-hover:text-white/60 transition-colors">
                    {category.description}
                  </p>

                  <div className="mt-auto pt-5 border-t border-white/5 flex items-center justify-between">
                    <div className="flex items-center gap-3 text-white/20 group-hover:text-accent-glitch font-mono font-bold text-[10px] uppercase tracking-[0.2em] transition-colors duration-300">
                      <span className="sr-only">
                        Explore {category.name} tools
                      </span>
                      <span aria-hidden="true">See More</span>
                      <div className="w-8 h-[1px] bg-current transition-all duration-500 group-hover:w-12" />
                    </div>
                    <ArrowRight
                      className="w-4 h-4 text-white/20 group-hover:text-accent-glitch group-hover:translate-x-1 transition-all"
                      aria-hidden="true"
                    />
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>
      {/* Testimonials Section */}
      <section aria-label="User testimonials and reviews">
        <Testimonials />
      </section>

      {/* Latest from Blog Section */}
      <section
        className="py-12 md:py-16 lg:py-20 px-4 bg-bg-void relative border-t border-border-subtle/30"
        aria-labelledby="blog-heading"
      >
        <div className="container mx-auto max-w-7xl">
          <div className="flex flex-col md:flex-row items-end justify-between mb-6 md:mb-8 lg:mb-10 gap-4 md:gap-6 text-left">
            <div className="max-w-2xl text-left">
              <h2
                id="blog-heading"
                className="text-3xl md:text-3xl lg:text-4xl font-black tracking-tighter uppercase mb-2 md:mb-3 text-left leading-[0.9]"
              >
                Recent <span className="text-accent-glitch">Articles</span>
              </h2>
              <p className="text-white/40 font-mono text-[10px] md:text-xs lg:text-sm max-w-xl text-left uppercase tracking-[0.3em]">
                Deep dives into design, typography, and creative text effects.
              </p>
            </div>

            <Link
              href="/blog"
              className="font-mono text-[10px] uppercase tracking-[0.3em] text-white/40 hover:text-white transition-colors border-b border-white/10 pb-2 mb-1 shrink-0"
              title="Read typography tutorials and design guides"
            >
              Blog
            </Link>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 md:gap-5">
            {recentPosts.map((post) => (
              <SmallBlogCard key={post.slug} post={post} />
            ))}
          </div>
        </div>
      </section>
      {/* CTA Section */}
      <section className="py-24 md:py-40 px-4" aria-labelledby="cta-heading">
        <div className="container mx-auto max-w-5xl relative">
          <div className="relative p-8 md:p-24 bg-[#0c0c0c] border border-white/5 rounded-[32px] md:rounded-[40px] text-center overflow-hidden">
            {/* Ambient Background Glow */}
            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-full bg-[radial-gradient(circle_at_center,rgba(57,255,20,0.02)_0%,transparent_70%)] pointer-events-none" />

            <div className="relative z-10">
              <span className="inline-block px-4 py-1.5 bg-accent-glitch/10 text-accent-glitch text-[10px] font-bold uppercase tracking-[0.4em] mb-6 md:mb-8 rounded-full border border-accent-glitch/20">
                Ready to Start
              </span>

              <h2
                id="cta-heading"
                className="text-4xl md:text-5xl font-black text-white mb-6 md:mb-8 tracking-tighter leading-[0.9] uppercase"
              >
                Start <span className="text-accent-glitch">Creating</span>
              </h2>

              <p className="text-white/40 text-sm md:text-xl mb-10 md:mb-14 max-w-xl mx-auto leading-relaxed">
                Join thousands of creators using our free cursed text generator
                to build their brand and express themselves online.
              </p>

              <div className="flex flex-col sm:flex-row items-center justify-center gap-4 md:gap-6 w-full max-w-md mx-auto">
                <Link
                  href="/collection"
                  className="group relative w-full sm:w-auto px-10 py-4 md:py-5 bg-white text-black font-black text-xs md:text-sm rounded-full overflow-hidden transition-all hover:scale-105 active:scale-95 shadow-[0_20px_40px_-10px_rgba(255,255,255,0.2)]"
                  title="Generate cursed text now"
                >
                  <span className="relative z-10 uppercase tracking-widest text-center block">
                    Try Now
                  </span>
                  <div className="absolute inset-0 bg-accent-glitch opacity-0 group-hover:opacity-100 transition-opacity" />
                </Link>
                <Link
                  href="/collection"
                  className="w-full sm:w-auto px-10 py-4 md:py-5 border border-white/10 text-white font-black text-xs md:text-sm rounded-full hover:border-white/20 hover:bg-white/5 transition-all uppercase tracking-widest text-center"
                  title="Browse all cursed text and glitch font tools"
                >
                  View Tools
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
