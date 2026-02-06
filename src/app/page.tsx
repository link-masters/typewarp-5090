import Hero from "@/components/Hero";
import { categories } from "@/lib/categories";
import Link from "next/link";
import { Metadata } from "next";
import JSONLD from "@/components/JSONLD";
import { ToolIcon } from "@/components/ToolIcon";
import { getBlogPosts } from "@/lib/blog";
import BlogCard from "@/components/BlogCard";

export const metadata: Metadata = {
  title: "TypeWarp | The Ultimate Text Transformer & Typography Hub",
  description:
    "Transform your text with the world's most advanced text manipulation platform. Generate fancy fonts, cursed text, zalgo, and professional typography instantly.",
  keywords: [
    "text transformer",
    "font generator",
    "fancy text",
    "cursed text",
    "zalgo generator",
    "typography tools",
    "typewarp",
  ],
  openGraph: {
    title: "TypeWarp | The Ultimate Text Transformer",
    description:
      "Transform your text into digital masterpieces, fancy scripts, and more with TypeWarp.",
    images: ["/og-image.png"],
    url: "https://typewarp.com",
  },
  alternates: {
    canonical: "https://typewarp.com",
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
      "Premium text transformation and typography tool for digital creators.",
    applicationCategory: "DesignApplication",
    genre: "Typography",
    browserRequirements: "Requires JavaScript",
    softwareVersion: "1.0.0",
    operatingSystem: "All",
    offers: {
      "@type": "Offer",
      price: "0",
      priceCurrency: "USD",
    },
  };

  return (
    <>
      <JSONLD data={jsonLd} />
      <div style={{ display: "none" }}>
        <h1 itemProp="name">TypeWarp - Premium Text Transformation</h1>
        <p itemProp="description">
          The ultimate toolkit for fancy text, cursed scripts, and typography.
        </p>
      </div>
      <Hero />

      {/* Core Capabilities Section */}
      <section className="py-20 md:py-32 px-4 relative overflow-hidden bg-[var(--background)]">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-px bg-gradient-to-r from-transparent via-[var(--card-border)] to-transparent" />

        <div className="container mx-auto max-w-7xl px-4">
          <div className="text-center mb-16 md:mb-24">
            <h2 className="text-3xl sm:text-4xl md:text-6xl font-black mb-6 tracking-tighter text-[var(--foreground)] animate-fade-in-up uppercase">
              The Art of{" "}
              <span className="bg-gradient-to-r from-red-600 to-purple-600 bg-clip-text text-transparent">
                Transformation
              </span>
            </h2>
            <p className="text-[var(--muted)] text-lg md:text-xl max-w-3xl mx-auto animate-fade-in-up animation-delay-200 font-medium leading-relaxed">
              TypeWarp is a high-performance typography ecosystem designed for
              creators who demand more from their digital text. From social
              media dominance to technical data encoding, we provide the
              ultimate toolkit for text manipulation.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                title: "Premium Typography",
                desc: "Elevate your brand with 100+ high-fidelity Unicode font styles. Perfect for professional bio design and high-end creative projects.",
                icon: (
                  <svg
                    className="w-10 h-10"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253"
                    />
                  </svg>
                ),
                color: "from-red-500/10 to-red-600/5",
                accent: "text-red-500",
              },
              {
                title: "Platform Agnostic",
                desc: "Our generated assets are optimized for flawless rendering across Instagram, TikTok, Discord, and GitHub without breaking character limits.",
                icon: (
                  <svg
                    className="w-10 h-10"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M21 12a9 9 0 01-9 9m9-9a9 9 0 00-9-9m9 9H3m9 9a9 9 0 01-9-9m9 9c1.657 0 3-4.03 3-9s-1.343-9-3-9m0 18c-1.657 0-3-4.03-3-9s1.343-9 3-9m-9 9a9 9 0 019-9"
                    />
                  </svg>
                ),
                color: "from-purple-500/10 to-purple-600/5",
                accent: "text-purple-500",
              },
              {
                title: "Technical Utilities",
                desc: "Professional-grade converters for Binary, Morse, and Base64 encoding. Built for developers and technical communicators.",
                icon: (
                  <svg
                    className="w-10 h-10"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4"
                    />
                  </svg>
                ),
                color: "from-blue-500/10 to-blue-600/5",
                accent: "text-blue-500",
              },
              {
                title: "Encrypted Privacy",
                desc: "Secure text transformation that respects user data. All processing happens locally or via secure, fleeting connections.",
                icon: (
                  <svg
                    className="w-10 h-10"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"
                    />
                  </svg>
                ),
                color: "from-emerald-500/10 to-emerald-600/5",
                accent: "text-emerald-500",
              },
              {
                title: "ASCII Art Engine",
                desc: "Generative text-art capabilities allowing for complex visual structures created purely from standard characters.",
                icon: (
                  <svg
                    className="w-10 h-10"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"
                    />
                  </svg>
                ),
                color: "from-orange-500/10 to-orange-600/5",
                accent: "text-orange-500",
              },
              {
                title: "Gamertag Generator",
                desc: "Specialized algorithms to create unique, available, and stylish handles for competitive gaming platforms.",
                icon: (
                  <svg
                    className="w-10 h-10"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M14.752 11.168l-3.197-2.132A1 1 0 0010 9.87v4.263a1 1 0 001.555.832l3.197-2.132a1 1 0 000-1.664z"
                    />
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                    />
                  </svg>
                ),
                color: "from-pink-500/10 to-pink-600/5",
                accent: "text-pink-500",
              },
            ].map((feature, i) => (
              <div
                key={feature.title}
                className={`group relative p-8 md:p-12 rounded-2xl md:rounded-[2rem] bg-white/[0.03] border border-[var(--card-border)] hover:border-[var(--foreground)]/20 transition-all duration-500 ${
                  i < 3 ? "animate-slide-in-up" : "animate-fade-in-up"
                } ${
                  i % 3 === 0
                    ? "animation-delay-0"
                    : i % 3 === 1
                      ? "animation-delay-200"
                      : "animation-delay-400"
                }`}
              >
                <div
                  className={`absolute inset-0 bg-gradient-to-br ${feature.color} opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-[2rem]`}
                />

                <div className="relative z-10">
                  <div
                    className={`mb-8 ${feature.accent} group-hover:scale-110 transition-transform duration-500 inline-block`}
                  >
                    {feature.icon}
                  </div>
                  <h3 className="text-xl font-black mb-4 text-[var(--foreground)] uppercase tracking-wider">
                    {feature.title}
                  </h3>
                  <p className="text-[var(--muted)] text-sm font-bold leading-loose">
                    {feature.desc}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Categories Explorer Section */}
      <section className="py-24 md:py-40 px-4 bg-[var(--card-bg)] relative overflow-hidden">
        <div className="absolute inset-0 bg-grid-pattern opacity-5 pointer-events-none" />
        <div className="container mx-auto max-w-7xl relative z-10">
          <div className="flex flex-col md:flex-row items-end justify-between mb-16 gap-6">
            <div className="max-w-2xl">
              <span className="text-red-500 text-[10px] font-black uppercase tracking-[0.4em] mb-4 block">
                The Warp Matrix
              </span>
              <h2 className="text-4xl md:text-7xl font-black mb-6 tracking-tighter text-[var(--foreground)] leading-[1.1] md:leading-[0.9]">
                Choose your <br />{" "}
                <span className="text-purple-600">Frequency</span>
              </h2>
              <p className="text-[var(--muted)] text-lg font-medium">
                Over 58 specialized tools curated for style, platform, and
                functional precision.
              </p>
            </div>
            <Link
              href="/text-tools"
              className="px-8 py-4 rounded-2xl bg-[var(--card-bg)] border border-[var(--card-border)] text-[var(--foreground)] font-bold hover:bg-[var(--card-border)] transition-all flex items-center gap-2"
            >
              Explore All Tools
              <svg
                className="w-5 h-5"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M17 8l4 4m0 0l-4 4m4-4H3"
                />
              </svg>
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {categories.map((category, index) => (
              <Link
                key={category.slug}
                href={`/${category.slug}`}
                className="group relative p-10 rounded-[3rem] bg-[var(--background)] border border-[var(--card-border)] hover:border-purple-500/50 transition-all duration-500 overflow-hidden"
              >
                <div className="absolute -top-10 -right-10 w-40 h-40 bg-purple-500/5 rounded-full blur-3xl group-hover:bg-purple-500/10 transition-colors" />
                <div className="relative z-10">
                  <div className="mb-8 flex justify-between items-start">
                    <div className="p-4 rounded-2xl bg-[var(--card-bg)] border border-[var(--card-border)] group-hover:scale-110 transition-transform duration-500">
                      <ToolIcon
                        slug={category.slug}
                        categorySlug={category.slug}
                        className="w-10 h-10 text-[var(--foreground)]"
                      />
                    </div>
                    <span className="text-[10px] font-black text-zinc-400 dark:text-zinc-600 uppercase tracking-widest">
                      {category.count} Tools
                    </span>
                  </div>
                  <h3 className="text-2xl font-black text-[var(--foreground)] mb-4 group-hover:text-purple-600 transition-colors uppercase tracking-tight">
                    {category.name}
                  </h3>
                  <div className="flex flex-wrap gap-2 pt-4">
                    {category.tools.slice(0, 3).map((tool) => (
                      <span
                        key={tool.slug}
                        className="text-[9px] font-black px-4 py-2 rounded-xl bg-zinc-100 dark:bg-zinc-900 text-zinc-500 dark:text-zinc-400 uppercase tracking-widest group-hover:text-[var(--foreground)]"
                      >
                        {tool.name.split(" ")[0]}
                      </span>
                    ))}
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Latest from Blog Section */}
      <section className="py-20 md:py-32 px-4 bg-white/[0.02] relative">
        <div className="container mx-auto max-w-7xl">
          <div className="flex flex-col md:flex-row items-end justify-between mb-16 gap-6">
            <div className="max-w-2xl">
              <h2 className="text-3xl md:text-5xl font-black mb-6 tracking-tighter text-[var(--foreground)]">
                Latest from the <br />{" "}
                <span className="text-red-500">Blog</span>
              </h2>
              <p className="text-[var(--muted)] text-lg">
                Stay updated with the latest trends in typography, design, and
                digital expression.
              </p>
            </div>
            <Link
              href="/blog"
              className="px-8 py-4 rounded-2xl bg-[var(--card-bg)] border border-[var(--card-border)] text-[var(--foreground)] font-bold hover:bg-[var(--card-border)] transition-all flex items-center gap-2"
            >
              Explore All Articles
              <svg
                className="w-5 h-5"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M17 8l4 4m0 0l-4 4m4-4H3"
                />
              </svg>
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {recentPosts.map((post, index) => (
              <div
                key={post.slug}
                className={`animate-fade-in-up ${
                  index % 3 === 0
                    ? "animation-delay-0"
                    : index % 3 === 1
                      ? "animation-delay-200"
                      : "animation-delay-400"
                }`}
              >
                <BlogCard post={post} />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Newsletter / CTA Section */}
      <section className="py-20 px-4 relative overflow-hidden">
        <div className="container mx-auto max-w-7xl">
          <div className="relative p-8 md:p-24 rounded-[2rem] md:rounded-[3rem] bg-[var(--card-bg)] border border-[var(--card-border)] overflow-hidden shadow-2xl">
            <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-gradient-to-br from-red-600/20 to-purple-600/20 rounded-full blur-[120px] -translate-y-1/2 translate-x-1/2" />
            <div className="absolute bottom-0 left-0 w-[600px] h-[600px] bg-gradient-to-tr from-blue-600/10 to-transparent rounded-full blur-[120px] translate-y-1/2 -translate-x-1/2" />

            <div className="relative z-10 flex flex-col items-center text-center max-w-4xl mx-auto">
              <span className="inline-block px-4 py-2 rounded-full bg-red-500/10 text-red-500 text-xs font-black uppercase tracking-widest mb-8 border border-red-500/20">
                Join the Revolution
              </span>
              <h2 className="text-5xl md:text-7xl font-black text-[var(--foreground)] mb-8 tracking-tighter leading-tight">
                Ready to go <br />
                <span className="bg-gradient-to-r from-red-500 to-purple-600 bg-clip-text text-transparent">
                  Fully Cursed?
                </span>
              </h2>
              <p className="text-[var(--muted)] text-xl md:text-2xl mb-12 font-medium max-w-2xl leading-relaxed">
                Join 100,000+ creators who are already pushing the boundaries of
                digital expression. Stop blending in. Start warping.
              </p>
              <div className="flex flex-col sm:flex-row items-center gap-6 w-full sm:w-auto">
                <Link
                  href="/dark-horror/cursed-text"
                  className="w-full sm:w-auto px-12 py-6 rounded-2xl bg-[var(--foreground)] text-[var(--background)] font-black text-lg hover:scale-105 transition-all active:scale-95 shadow-[0_20px_40px_rgba(0,0,0,0.2)] flex items-center justify-center gap-3"
                >
                  <span className="uppercase">Launch Generator</span>
                  <svg
                    className="w-5 h-5"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2.5}
                      d="M13 10V3L4 14h7v7l9-11h-7z"
                    />
                  </svg>
                </Link>
                <Link
                  href="/text-tools"
                  className="w-full sm:w-auto px-12 py-6 rounded-2xl bg-[var(--card-bg)] text-[var(--foreground)] font-black text-lg border border-[var(--card-border)] hover:bg-[var(--card-border)] transition-all active:scale-95 flex items-center justify-center"
                >
                  VIEW ALL TOOLS
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
