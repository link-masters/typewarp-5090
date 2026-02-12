import { getBlogPosts } from "@/lib/blog";
import BlogCard from "@/components/BlogCard";
import { Metadata } from "next";
import Link from "next/link";
import { categories, TOTAL_TOOLS_COUNT } from "@/lib/categories";
import JSONLD from "@/components/JSONLD";
import BackgroundEffect from "@/components/BackgroundEffect";
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
    <div className="min-h-screen pt-32 pb-20 px-4 bg-bg-void text-text-primary relative overflow-hidden">
      <BackgroundEffect />
      <JSONLD data={jsonLd} />

      <div className="container mx-auto max-w-7xl relative z-10">
        {/* Technical Breadcrumbs */}
        <div className="flex items-center gap-4 mb-6 font-mono text-[10px] uppercase tracking-[0.3em] text-text-muted">
          <Link
            href="/"
            className="hover:text-accent-glitch transition-colors flex items-center gap-2"
          >
            <Home className="w-3 h-3" />
            ROOT
          </Link>
          <ChevronRight className="w-3 h-3 opacity-30" />
          <div className="text-accent-glitch">INTEL_FEED</div>
        </div>

        <header className="mb-12">
          <div className="max-w-2xl text-left">
            <h1 className="text-3xl md:text-6xl font-black tracking-tighter uppercase mb-6 leading-tight">
              Systems <span className="text-accent-glitch">Intel</span>
            </h1>
            <p className="text-text-muted font-mono text-lg max-w-xl">
              Deep dives into Unicode manipulation, digital entropy, and the
              mechanics of the glitch. Access critical insights for modern
              digital typography.
            </p>
          </div>

          <div className="flex flex-wrap gap-2 mt-12 pb-8 border-b border-border-subtle/10">
            <div className="px-4 py-2 bg-accent-glitch/10 border border-accent-glitch text-accent-glitch font-mono font-black text-[10px] uppercase tracking-widest shadow-[0_5px_20px_-5px_var(--accent-glitch)]">
              ALL_TRANSMISSIONS ({posts.length})
            </div>
            {postCategories.map((cat) => (
              <Link
                key={cat}
                href={`/blog?category=${encodeURIComponent(cat)}`}
                className="px-4 py-2 border border-border-subtle font-mono text-text-muted hover:text-text-primary hover:border-accent-glitch/50 text-[10px] uppercase tracking-widest transition-all"
              >
                {cat.replace(" ", "_")}
              </Link>
            ))}
          </div>
        </header>

        {/* All Posts Grid */}
        <section className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-px bg-white/5 border border-white/10">
          {posts.map((post) => (
            <BlogCard key={post.slug} post={post} />
          ))}
        </section>

        {/* CTA Section */}
        <section className="mt-20 p-12 md:p-20 bg-bg-card border border-white/5 text-center relative overflow-hidden group">
          <div className="absolute inset-0 bg-accent-glitch/5 opacity-0 group-hover:opacity-100 transition-opacity" />
          <div className="relative z-10">
            <h2 className="text-4xl md:text-6xl font-black text-text-primary mb-8 tracking-tighter uppercase leading-[0.8]">
              Ready to initialize <br />
              <span className="text-accent-glitch">Transformation?</span>
            </h2>
            <p className="text-text-muted font-mono mb-12 max-w-2xl mx-auto leading-relaxed">
              Access the complete suite of {TOTAL_TOOLS_COUNT}+ modules.
              Engineered for peak performance across all digital environments.
            </p>
            <div className="flex flex-wrap justify-center gap-6">
              <Link
                href="/arsenal"
                className="px-10 py-4 bg-accent-glitch text-black font-black text-xs uppercase tracking-widest hover:bg-white transition-all active:scale-95"
              >
                ACCESS_ALL_TOOLS
              </Link>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}
