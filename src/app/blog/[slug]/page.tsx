import { getBlogPost, getBlogPosts } from "@/lib/blog";
import JSONLD from "@/components/JSONLD";
import { MDXRemote } from "next-mdx-remote/rsc";
import MDXComponents from "@/components/MDXComponents";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import remarkGfm from "remark-gfm";
import rehypeSlug from "rehype-slug";
import rehypeAutolinkHeadings from "rehype-autolink-headings";
import rehypePrettyCode from "rehype-pretty-code";
import { Metadata } from "next";
import { categories } from "@/lib/categories";
import { ToolIcon } from "@/components/ToolIcon";
import TableOfContents from "@/components/TableOfContents";
import Comments from "@/components/Comments";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const post = await getBlogPost(slug);
  if (!post) return { title: "Post Not Found" };

  return {
    title: `${post.title} | TypeWarp`,
    description: post.description,
    openGraph: {
      title: post.title,
      description: post.description,
      url: `https://typewarp.com/blog/${post.slug}`,
      type: "article",
      publishedTime: post.date,
      authors: [post.author],
      images: [
        {
          url: post.image,
          width: 1200,
          height: 630,
          alt: post.title,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: post.title,
      description: post.description,
      images: [post.image],
    },
    alternates: {
      canonical: `https://typewarp.com/blog/${post.slug}`,
    },
  };
}

export async function generateStaticParams() {
  const posts = await getBlogPosts();
  return posts.map((post) => ({
    slug: post.slug,
  }));
}

// Extract TOC items from content
function extractTocItems(content: string) {
  const headingRegex = /^#{2,3}\s+(.+)$/gm;
  const items: { id: string; text: string; level: number }[] = [];
  let match;

  while ((match = headingRegex.exec(content)) !== null) {
    const level = match[0].indexOf(" ");
    const text = match[1].trim();
    const id = text.toLowerCase().replace(/[^\w]+/g, "-");
    items.push({ id, text, level });
  }

  return items;
}

// Static Tools Section Component
function ToolsSection() {
  const featuredCategories = ["dark-horror", "social-fonts", "style-fancy"];

  return (
    <div className="space-y-6">
      {/* Quick Try Section */}
      <div className="p-6 bg-gradient-to-br from-red-500/10 to-purple-500/10 border border-[var(--card-border)] rounded-2xl">
        <h3 className="text-sm font-black text-[var(--foreground)] mb-4 uppercase tracking-wider flex items-center gap-2">
          <span className="w-2 h-2 rounded-full bg-red-500 animate-pulse" />
          Try Our Tools
        </h3>
        <p className="text-sm text-[var(--muted)] mb-4">
          Transform your text instantly with our free generators.
        </p>
        <Link
          href="/text-tools"
          className="block w-full py-3 bg-gradient-to-r from-red-500 to-purple-500 text-white font-bold text-center rounded-xl hover:shadow-lg hover:shadow-red-500/20 transition-all"
        >
          View All Tools →
        </Link>
      </div>

      {/* Featured Tools */}
      {featuredCategories.map((catSlug) => {
        const category = categories.find((c) => c.slug === catSlug);
        if (!category) return null;

        return (
          <div
            key={catSlug}
            className="p-6 bg-[var(--card-bg)] border border-[var(--card-border)] rounded-2xl"
          >
            <div className="flex items-center gap-3 mb-4">
              <span className="text-2xl">{category.icon}</span>
              <h3 className="text-sm font-black text-[var(--foreground)] uppercase tracking-wider">
                {category.name}
              </h3>
            </div>
            <div className="space-y-2">
              {category.tools.slice(0, 5).map((tool) => (
                <Link
                  key={tool.slug}
                  href={`/${catSlug}/${tool.slug}`}
                  className="group flex items-center gap-3 p-3 rounded-xl bg-[var(--background)] border border-transparent hover:border-red-500/30 transition-all"
                >
                  <div className="w-8 h-8 rounded-lg bg-red-500/10 flex items-center justify-center shrink-0">
                    <ToolIcon
                      slug={tool.slug}
                      categorySlug={catSlug}
                      className="w-4 h-4 text-red-500"
                    />
                  </div>
                  <span className="text-sm font-medium text-[var(--muted)] group-hover:text-[var(--foreground)] transition-colors truncate">
                    {tool.name.replace(" Generator", "")}
                  </span>
                </Link>
              ))}
              {category.tools.length > 5 && (
                <Link
                  href={`/${catSlug}`}
                  className="block text-center py-2 text-sm font-bold text-red-500 hover:text-red-400 transition-colors"
                >
                  +{category.tools.length - 5} more tools
                </Link>
              )}
            </div>
          </div>
        );
      })}

      {/* Newsletter / CTA */}
      <div className="p-6 bg-[var(--card-bg)] border border-[var(--card-border)] rounded-2xl">
        <h3 className="text-sm font-black text-[var(--foreground)] mb-2 uppercase tracking-wider">
          Stay Updated
        </h3>
        <p className="text-sm text-[var(--muted)] mb-4">
          Get notified about new tools and features.
        </p>
        <div className="flex gap-2">
          <input
            type="email"
            placeholder="your@email.com"
            className="flex-1 px-4 py-2 bg-[var(--background)] border border-[var(--card-border)] rounded-xl text-sm text-[var(--foreground)] placeholder:text-[var(--muted)] focus:outline-none focus:ring-2 focus:ring-red-500/50"
          />
          <button className="px-4 py-2 bg-red-500 text-white font-bold rounded-xl hover:bg-red-600 transition-colors shrink-0">
            Join
          </button>
        </div>
      </div>
    </div>
  );
}

// Related Posts Component
async function RelatedPosts({
  currentSlug,
  category,
}: {
  currentSlug: string;
  category: string;
}) {
  const allPosts = await getBlogPosts();
  const relatedPosts = allPosts
    .filter((p) => p.slug !== currentSlug && p.category === category)
    .slice(0, 3);

  if (relatedPosts.length === 0) return null;

  return (
    <section className="mt-16 pt-12 border-t border-[var(--card-border)]">
      <h2 className="text-2xl font-black text-[var(--foreground)] mb-8 flex items-center gap-3">
        <span className="w-1.5 h-8 bg-gradient-to-b from-red-500 to-purple-500 rounded-full" />
        Related Articles
      </h2>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {relatedPosts.map((post) => (
          <Link
            key={post.slug}
            href={`/blog/${post.slug}`}
            className="group block p-4 bg-[var(--card-bg)] border border-[var(--card-border)] rounded-2xl hover:border-red-500/50 transition-all"
          >
            <div className="relative h-32 rounded-xl overflow-hidden mb-4">
              <Image
                src={post.image}
                alt={post.title}
                fill
                className="object-cover group-hover:scale-105 transition-transform duration-500"
              />
            </div>
            <h3 className="font-bold text-[var(--foreground)] group-hover:text-red-500 transition-colors line-clamp-2">
              {post.title}
            </h3>
            <p className="text-sm text-[var(--muted)] mt-2 line-clamp-2">
              {post.description}
            </p>
          </Link>
        ))}
      </div>
    </section>
  );
}

export default async function BlogPostPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const post = await getBlogPost(slug);

  if (!post) {
    notFound();
  }

  const tocItems = extractTocItems(post.content);
  const readingTime = Math.ceil(post.content.split(/\s+/).length / 200);

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    headline: post.title,
    description: post.description,
    image: post.image,
    datePublished: post.date,
    dateModified: post.date,
    author: {
      "@type": "Person",
      name: post.author,
    },
    publisher: {
      "@type": "Organization",
      name: "TypeWarp",
      logo: {
        "@type": "ImageObject",
        url: "https://typewarp.com/logo.png",
      },
    },
    mainEntityOfPage: {
      "@type": "WebPage",
      "@id": `https://typewarp.com/blog/${post.slug}`,
    },
    wordCount: post.content.split(/\s+/).length,
  };

  return (
    <article className="min-h-screen pt-32 pb-20 bg-[var(--background)]">
      <JSONLD data={jsonLd} />
      <div className="max-w-7xl mx-auto px-4 md:px-8">
        {/* Breadcrumb */}
        <nav className="flex items-center gap-2 text-sm text-[var(--muted)] mb-8 max-w-4xl mx-auto">
          <Link
            href="/"
            className="hover:text-[var(--foreground)] transition-colors"
          >
            Home
          </Link>
          <span>/</span>
          <Link
            href="/blog"
            className="hover:text-[var(--foreground)] transition-colors"
          >
            Blog
          </Link>
          <span>/</span>
          <span className="text-[var(--foreground)] truncate max-w-[200px]">
            {post.title}
          </span>
        </nav>

        {/* Header Section */}
        <header className="max-w-4xl mx-auto mb-12 text-center">
          <div className="flex items-center justify-center gap-4 mb-6 flex-wrap">
            <Link
              href={`/blog?category=${encodeURIComponent(post.category)}`}
              className="px-4 py-1.5 bg-red-600/10 text-red-500 rounded-full text-sm font-bold tracking-wider uppercase border border-red-600/20 hover:bg-red-600/20 transition-colors"
            >
              {post.category}
            </Link>
            <span className="text-[var(--muted)] font-medium flex items-center gap-2">
              <svg
                className="w-4 h-4"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
                />
              </svg>
              {new Date(post.date).toLocaleDateString("en-US", {
                year: "numeric",
                month: "long",
                day: "numeric",
              })}
            </span>
            <span className="text-[var(--muted)] font-medium flex items-center gap-2">
              <svg
                className="w-4 h-4"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
                />
              </svg>
              {readingTime} min read
            </span>
          </div>
          <h1 className="text-3xl md:text-5xl lg:text-6xl font-black text-[var(--foreground)] mb-8 leading-tight">
            {post.title}
          </h1>
          <p className="text-lg md:text-xl text-[var(--muted)] max-w-3xl mx-auto">
            {post.description}
          </p>
          <div className="flex items-center justify-center gap-4 mt-8">
            <div className="w-12 h-12 rounded-full bg-gradient-to-br from-red-500 to-orange-500 p-[2px]">
              <div className="w-full h-full rounded-full bg-[var(--background)] flex items-center justify-center overflow-hidden">
                <span className="text-lg font-bold text-[var(--foreground)]">
                  {post.author[0]}
                </span>
              </div>
            </div>
            <div className="text-left">
              <div className="text-[var(--foreground)] font-bold">
                {post.author}
              </div>
              <div className="text-[var(--muted)] text-sm">
                Content Strategist
              </div>
            </div>
          </div>
        </header>

        {/* Featured Image */}
        <div className="relative w-full aspect-[21/9] mb-12 rounded-3xl overflow-hidden shadow-[0_20px_50px_rgba(0,0,0,0.1)] group border border-[var(--card-border)] max-w-6xl mx-auto">
          <Image
            src={post.image}
            alt={post.title}
            fill
            className="object-cover transition-transform duration-1000 group-hover:scale-105"
            priority
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[var(--background)]/60 to-transparent" />
        </div>

        {/* Content Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 max-w-7xl mx-auto">
          {/* Sidebar - Left (TOC) */}
          <aside className="hidden lg:block lg:col-span-3">
            <div className="sticky top-28 space-y-6">
              <TableOfContents items={tocItems} />
            </div>
          </aside>

          {/* Main Content */}
          <div className="lg:col-span-6">
            {/* Mobile TOC */}
            <div className="lg:hidden mb-8">
              <TableOfContents items={tocItems} />
            </div>

            <div className="prose prose-lg prose-invert max-w-none">
              <MDXRemote
                source={post.content}
                components={MDXComponents}
                options={{
                  mdxOptions: {
                    remarkPlugins: [remarkGfm],
                    rehypePlugins: [
                      rehypeSlug,
                      [
                        rehypeAutolinkHeadings,
                        {
                          behavior: "wrap",
                          properties: {
                            className: ["heading-link"],
                          },
                        },
                      ],
                      [rehypePrettyCode, { theme: "github-dark" }],
                    ],
                  },
                }}
              />
            </div>

            {/* Tags */}
            {post.tags && post.tags.length > 0 && (
              <div className="mt-12 pt-8 border-t border-[var(--card-border)]">
                <h3 className="text-sm font-bold text-[var(--muted)] mb-4 uppercase tracking-wider">
                  Topics
                </h3>
                <div className="flex flex-wrap gap-2">
                  {post.tags.map((tag) => (
                    <Link
                      key={tag}
                      href={`/blog?tag=${encodeURIComponent(tag)}`}
                      className="px-4 py-2 bg-[var(--card-bg)] border border-[var(--card-border)] rounded-full text-sm font-medium text-[var(--muted)] hover:text-[var(--foreground)] hover:border-red-500/50 transition-all"
                    >
                      #{tag}
                    </Link>
                  ))}
                </div>
              </div>
            )}

            {/* Share */}
            <div className="mt-8 p-6 bg-[var(--card-bg)] border border-[var(--card-border)] rounded-2xl">
              <h3 className="text-sm font-bold text-[var(--foreground)] mb-4 uppercase tracking-wider">
                Share this article
              </h3>
              <div className="flex gap-3">
                <a
                  href={`https://twitter.com/intent/tweet?text=${encodeURIComponent(post.title)}&url=https://typewarp.com/blog/${post.slug}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex-1 py-3 bg-[#1DA1F2]/10 text-[#1DA1F2] font-bold rounded-xl text-center hover:bg-[#1DA1F2]/20 transition-colors"
                >
                  Twitter
                </a>
                <a
                  href={`https://www.facebook.com/sharer/sharer.php?u=https://typewarp.com/blog/${post.slug}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex-1 py-3 bg-[#4267B2]/10 text-[#4267B2] font-bold rounded-xl text-center hover:bg-[#4267B2]/20 transition-colors"
                >
                  Facebook
                </a>
                <a
                  href={`https://www.linkedin.com/shareArticle?mini=true&url=https://typewarp.com/blog/${post.slug}&title=${encodeURIComponent(post.title)}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex-1 py-3 bg-[#0077B5]/10 text-[#0077B5] font-bold rounded-xl text-center hover:bg-[#0077B5]/20 transition-colors"
                >
                  LinkedIn
                </a>
              </div>
            </div>

            {/* Related Posts */}
            <RelatedPosts currentSlug={post.slug} category={post.category} />

            {/* Comments Section */}
            <Comments postSlug={post.slug} />
          </div>

          {/* Sidebar - Right (Tools) */}
          <aside className="lg:col-span-3">
            <div className="lg:sticky lg:top-28">
              <ToolsSection />
            </div>
          </aside>
        </div>
      </div>
    </article>
  );
}
