import { getBlogPosts } from "@/lib/blog";
import BlogCard from "@/components/BlogCard";
import { Metadata } from "next";
import Link from "next/link";
import { categories } from "@/lib/categories";
import JSONLD from "@/components/JSONLD";

export const metadata: Metadata = {
  title: "Blog | TypeWarp - Typography, Text Transformation & Design Guides",
  description:
    "Explore comprehensive guides on cursed text, zalgo, glitch fonts, Unicode manipulation, and creative typography. Learn to transform your text for Discord, Instagram, gaming, and more.",
  keywords: [
    "typography blog",
    "font design",
    "text transformation articles",
    "unicode guide",
    "cursed text guide",
    "zalgo text tutorial",
    "discord fonts",
    "instagram fonts",
    "typewarp",
  ],
  openGraph: {
    title: "Blog | TypeWarp",
    description:
      "Deep dives into the art of text manipulation, typography trends, and design innovation.",
    url: "https://typewarp.com/blog",
    type: "website",
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "TypeWarp Blog",
      },
    ],
  },
  alternates: {
    canonical: "https://typewarp.com/blog",
  },
};

export default async function BlogPage() {
  const posts = await getBlogPosts();

  // Get unique categories from posts
  const postCategories = [...new Set(posts.map((p) => p.category))];

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Blog",
    name: "TypeWarp Blog",
    description:
      "Comprehensive guides on text transformation, typography, and Unicode manipulation",
    url: "https://typewarp.com/blog",
    publisher: {
      "@type": "Organization",
      name: "TypeWarp",
      logo: {
        "@type": "ImageObject",
        url: "https://typewarp.com/logo.png",
      },
    },
    blogPost: posts.slice(0, 10).map((post) => ({
      "@type": "BlogPosting",
      headline: post.title,
      description: post.description,
      datePublished: post.date,
      url: `https://typewarp.com/blog/${post.slug}`,
    })),
  };

  return (
    <div className="min-h-screen pt-32 pb-20 px-4 md:px-8 bg-[var(--background)]">
      <JSONLD data={jsonLd} />
      <div className="max-w-7xl mx-auto">
        {/* Breadcrumb */}
        <nav className="flex items-center gap-2 text-sm text-[var(--muted)] mb-8">
          <Link
            href="/"
            className="hover:text-[var(--foreground)] transition-colors"
          >
            Home
          </Link>
          <span>/</span>
          <span className="text-[var(--foreground)]">Blog</span>
        </nav>

        <header className="text-center mb-16">
          <h1 className="text-4xl md:text-6xl lg:text-7xl font-black text-[var(--foreground)] mb-6 animate-fade-in">
            Typography{" "}
            <span className="bg-gradient-to-r from-red-500 to-orange-400 bg-clip-text text-transparent">
              Insights
            </span>
          </h1>
          <p className="text-lg md:text-xl text-[var(--muted)] max-w-3xl mx-auto mb-8">
            Comprehensive guides on text transformation, Unicode manipulation,
            and creative typography. Master cursed text, zalgo, glitch fonts,
            and more.
          </p>

          {/* Category Filter */}
          <div className="flex flex-wrap justify-center gap-3 mb-8">
            <span className="px-4 py-2 bg-red-500 text-white font-bold rounded-full text-sm">
              All Posts ({posts.length})
            </span>
            {postCategories.map((cat) => (
              <Link
                key={cat}
                href={`/blog?category=${encodeURIComponent(cat)}`}
                className="px-4 py-2 bg-white dark:bg-[var(--card-bg)] border border-zinc-200 dark:border-[var(--card-border)] text-[var(--muted)] hover:text-[var(--foreground)] hover:border-red-500/50 font-medium rounded-full text-sm transition-colors shadow-sm"
              >
                {cat}
              </Link>
            ))}
          </div>
        </header>

        {/* Featured Post */}
        {posts.length > 0 && (
          <section className="mb-16">
            <div className="flex items-center gap-3 mb-6">
              <span className="w-1.5 h-8 bg-gradient-to-b from-red-500 to-purple-500 rounded-full" />
              <h2 className="text-xl font-black text-[var(--foreground)] uppercase tracking-wider">
                Featured Article
              </h2>
            </div>
            <Link
              href={`/blog/${posts[0].slug}`}
              className="group block relative h-[400px] md:h-[500px] rounded-[1.5rem] overflow-hidden border border-zinc-200 dark:border-[var(--card-border)] shadow-[0_8px_40px_rgba(0,0,0,0.06)] dark:shadow-none transition-transform hover:-translate-y-1"
            >
              <div
                className="absolute inset-0 bg-cover bg-center transition-transform duration-700 group-hover:scale-105"
                style={{ backgroundImage: `url(${posts[0].image})` }}
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black via-black/50 to-transparent" />
              <div className="absolute bottom-0 left-0 right-0 p-8 md:p-12">
                <span className="inline-block px-4 py-1.5 bg-red-500 text-white text-sm font-bold rounded-full mb-4">
                  {posts[0].category}
                </span>
                <h3 className="text-2xl md:text-4xl font-black text-white mb-4 group-hover:text-red-400 transition-colors">
                  {posts[0].title}
                </h3>
                <p className="text-gray-300 text-lg max-w-2xl mb-4 line-clamp-2">
                  {posts[0].description}
                </p>
                <div className="flex items-center gap-4 text-zinc-300 text-sm">
                  <span>{posts[0].author}</span>
                  <span>•</span>
                  <span>
                    {new Date(posts[0].date).toLocaleDateString("en-US", {
                      year: "numeric",
                      month: "long",
                      day: "numeric",
                    })}
                  </span>
                  <span>•</span>
                  <span>
                    {Math.ceil(posts[0].content.split(/\s+/).length / 200)} min
                    read
                  </span>
                </div>
              </div>
            </Link>
          </section>
        )}

        {/* All Posts Grid */}
        {posts.length > 1 && (
          <section>
            <div className="flex items-center gap-3 mb-6">
              <span className="w-1.5 h-8 bg-gradient-to-b from-red-500 to-purple-500 rounded-full" />
              <h2 className="text-xl font-black text-[var(--foreground)] uppercase tracking-wider">
                All Articles
              </h2>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {posts.slice(1).map((post) => (
                <BlogCard key={post.slug} post={post} />
              ))}
            </div>
          </section>
        )}

        {posts.length === 0 && (
          <div className="text-center py-20">
            <p className="text-[var(--muted)] text-lg">
              No posts found yet. Stay tuned!
            </p>
          </div>
        )}

        {/* CTA Section */}
        <section className="mt-20 p-8 md:p-12 bg-white dark:bg-zinc-950 border border-zinc-200 dark:border-[var(--card-border)] rounded-[1.5rem] shadow-[0_8px_40px_rgba(0,0,0,0.04)] dark:shadow-none text-center relative overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-br from-red-500/5 to-purple-500/5 pointer-events-none" />
          <div className="relative z-10">
            <h2 className="text-2xl md:text-3xl font-black text-[var(--foreground)] mb-4">
              Ready to Transform Your Text?
            </h2>
            <p className="text-[var(--muted)] mb-8 max-w-2xl mx-auto">
              Explore our collection of 58+ free text generators, from cursed
              and zalgo text to stylish fonts for Instagram, Discord, and more.
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <Link
                href="/text-tools"
                className="px-8 py-4 bg-gradient-to-r from-red-500 to-purple-500 text-white font-bold rounded-xl hover:shadow-lg hover:shadow-red-500/20 transition-all"
              >
                Explore All Tools
              </Link>
              <Link
                href="/dark-horror"
                className="px-8 py-4 bg-white dark:bg-[var(--card-bg)] border border-zinc-200 dark:border-[var(--card-border)] text-[var(--foreground)] font-bold rounded-xl hover:border-red-500/50 transition-all shadow-sm"
              >
                Dark & Horror Tools
              </Link>
            </div>
          </div>
        </section>

        {/* Related Links for SEO */}
        <section className="mt-16 pt-12 border-t border-[var(--card-border)]">
          <h2 className="text-sm font-black text-[var(--muted)] uppercase tracking-wider mb-6">
            Popular Tool Categories
          </h2>
          <div className="flex flex-wrap gap-3">
            {categories.map((cat) => (
              <Link
                key={cat.slug}
                href={`/${cat.slug}`}
                className="flex items-center gap-2 px-4 py-2 bg-white dark:bg-[var(--card-bg)] border border-zinc-200 dark:border-[var(--card-border)] rounded-full text-sm text-[var(--muted)] hover:text-[var(--foreground)] hover:border-red-500/30 transition-colors shadow-sm"
              >
                <span>{cat.icon}</span>
                <span>{cat.name}</span>
                <span className="text-xs opacity-50">({cat.count})</span>
              </Link>
            ))}
          </div>
        </section>
      </div>
    </div>
  );
}
