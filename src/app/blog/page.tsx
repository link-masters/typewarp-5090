import { getBlogPosts } from "@/lib/blog";
import BlogCard from "@/components/BlogCard";
import { Metadata } from "next";
import Link from "next/link";
import { categories, TOTAL_TOOLS_COUNT } from "@/lib/categories";
import JSONLD from "@/components/JSONLD";
import BackgroundEffect from "@/components/CanvasEffect";
import {
  Calendar,
  User,
  BookOpen,
  ChevronRight,
  Home,
  Terminal,
} from "lucide-react";

export const metadata: Metadata = {
  title: "Systems Intel | Cursed Text Blog - TypeWarp",
  description:
    "Explore technical guides on digital entropy, Unicode manipulation, and creative typography. Master the art of the glitch.",
  keywords: [
    "typography blog",
    "font design",
    "unicode guide",
    "cursed text",
    "typewarp",
  ],
  openGraph: {
    title: "Systems Intel | TypeWarp Blog",
    description:
      "Deep dives into the art of text manipulation, typography trends, and digital entropy.",
    url: "https://www.typewarp.com/blog",
    type: "website",
    images: ["/og-image.png"],
  },
  other: {
    "og:updated_time": new Date().toISOString(),
  },
  alternates: { canonical: "https://www.typewarp.com/blog" },
};

export default async function BlogPage() {
  const posts = await getBlogPosts();
  const postCategories = [...new Set(posts.map((p) => p.category))];

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Blog",
    name: "TypeWarp Blog",
    description: "Technical guides on text transformation and digital entropy",
    url: "https://www.typewarp.com/blog",
  };

  return (
    <div className="min-h-screen pt-32 pb-24 px-6 bg-[#080808] text-white relative overflow-hidden">
      {/* Background Glow */}
      <div className="fixed top-0 left-0 w-full h-full bg-[radial-gradient(circle_at_50%_-10%,rgba(57,255,20,0.02)_0%,transparent_50%)] pointer-events-none" />
      <JSONLD data={jsonLd} />

      <div className="container mx-auto max-w-7xl relative z-10">
        {/* Breadcrumbs */}
        <div className="flex items-center gap-3 mb-10 font-mono text-[10px] uppercase tracking-[0.2em] text-white/30">
          <Link
            href="/"
            className="hover:text-accent-glitch transition-colors flex items-center gap-2"
          >
            <Home className="w-3 h-3" />
            HOME
          </Link>
          <ChevronRight className="w-3 h-3 opacity-20" />
          <div className="text-accent-glitch/80">BLOG</div>
        </div>

        <header className="mb-20">
          <div className="max-w-2xl text-left">
            <h1 className="text-4xl md:text-7xl font-black tracking-tighter uppercase mb-6 leading-tight">
              Our <span className="text-accent-glitch">Articles</span>
            </h1>
            <p className="text-white/40 font-mono text-base md:text-lg max-w-xl">
              Tips and guides on digital typography, social media trends, and
              creating unique designs.
            </p>
          </div>

          <div className="flex flex-wrap gap-4 mt-16 pb-12 border-b border-white/5">
            <button className="px-8 py-3 bg-white text-black font-bold text-[10px] uppercase tracking-[0.2em] rounded-full">
              All Posts ({posts.length})
            </button>
            {postCategories.map((cat) => (
              <Link
                key={cat}
                href={`/blog?category=${encodeURIComponent(cat)}`}
                className="px-8 py-3 border border-white/10 text-white/40 hover:text-white hover:border-white/20 font-bold text-[10px] uppercase tracking-[0.2em] transition-all rounded-full"
              >
                {cat}
              </Link>
            ))}
          </div>
        </header>

        {/* All Posts Grid */}
        <section className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-24">
          {posts.map((post) => (
            <BlogCard key={post.slug} post={post} />
          ))}
        </section>

        {/* CTA Section */}
        {/* CTA Section */}
        <section className="relative p-8 md:p-24 bg-[#0c0c0c] border border-white/5 rounded-[32px] md:rounded-[40px] text-center overflow-hidden">
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-full bg-[radial-gradient(circle_at_center,rgba(57,255,20,0.02)_0%,transparent_70%)] pointer-events-none" />

          <div className="relative z-10">
            <h2 className="text-4xl md:text-6xl font-black text-white mb-6 md:mb-8 tracking-tighter uppercase leading-[0.9]">
              Explore Our <span className="text-accent-glitch">Collection</span>
            </h2>
            <p className="text-white/40 font-mono text-sm md:text-lg mb-10 md:mb-14 max-w-2xl mx-auto leading-relaxed">
              Discover {TOTAL_TOOLS_COUNT}+ tools for your creative projects.
            </p>
            <div className="flex justify-center flex-col sm:flex-row gap-4">
              <Link
                href="/arsenal"
                className="group relative px-12 py-5 bg-white text-black font-bold text-sm rounded-full overflow-hidden transition-all hover:scale-105 active:scale-95 shadow-[0_20px_40px_-10px_rgba(255,255,255,0.2)]"
              >
                <span className="relative z-10 uppercase tracking-[0.2em] text-center block w-full">
                  Explore All Tools
                </span>
                <div className="absolute inset-0 bg-accent-glitch opacity-0 group-hover:opacity-100 transition-opacity" />
              </Link>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}
