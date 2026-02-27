import { getBlogPost, getBlogPosts } from "@/lib/blog";
import { SITE_URL } from "@/lib/config";
import JSONLD from "@/components/JSONLD";
import { MDXRemote } from "next-mdx-remote/rsc";
import MDXComponents from "@/components/MDXComponents";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import rehypeSlug from "rehype-slug";
import { Metadata } from "next";
import { categories } from "@/lib/categories";
import { ToolIcon } from "@/components/ToolIcon";
import TableOfContents from "@/components/TableOfContents";
import Comments from "@/components/Comments";
import BackgroundEffect from "@/components/CanvasEffect";
import {
  Calendar,
  User,
  Clock,
  Share2,
  Home,
  ChevronRight,
  Zap,
} from "lucide-react";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const post = await getBlogPost(slug);
  if (!post) return { title: "Post Not Found" };

  return {
    title: post.title,
    description: post.description,
    keywords: post.tags || [
      post.category,
      "typography",
      "text effects",
      "typewarp",
    ],
    openGraph: {
      title: post.title,
      description: post.description,
      url: `${SITE_URL}/blog/${post.slug}`,
      type: "article",
      publishedTime: post.date,
      authors: [post.author],
      images: [{ url: post.image, width: 1200, height: 630, alt: post.title }],
      siteName: "TypeWarp",
    },
    twitter: {
      card: "summary_large_image",
      title: post.title,
      description: post.description,
      creator: "@typewarp",
      images: [post.image],
    },
    alternates: { canonical: `${SITE_URL}/blog/${post.slug}` },
  };
}

export async function generateStaticParams() {
  const posts = await getBlogPosts();
  return posts.map((post) => ({ slug: post.slug }));
}

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

function ToolsSection() {
  const featuredCategories = ["dark-horror", "social-fonts", "style-fancy"];

  return (
    <div className="space-y-6">
      <div className="p-6 bg-bg-card border border-accent-glitch/20 group relative overflow-hidden">
        <div className="relative z-10 font-mono text-center">
          <div className="text-[10px] text-accent-glitch uppercase tracking-[0.4em] mb-4 flex items-center justify-center gap-2">
            <Zap className="w-3 h-3 text-accent-glitch" />
            Explore Tools
          </div>
          <p className="text-[10px] text-text-muted mb-6">
            Try our text generators to enhance your content.
          </p>
          <Link
            href="/collection"
            className="block py-3 bg-accent-glitch text-black font-black text-[10px] uppercase tracking-widest hover:bg-white transition-all shadow-[0_0_20px_rgba(57,255,20,0.1)] rounded-full"
          >
            Access Collection
          </Link>
        </div>
        <div className="absolute top-0 left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-accent-glitch/30 to-transparent" />
      </div>

      {featuredCategories.map((catSlug) => {
        const category = categories.find((c) => c.slug === catSlug);
        if (!category) return null;

        return (
          <div
            key={catSlug}
            className="bg-bg-card border border-white/5 p-6 font-mono"
          >
            <div className="flex items-center gap-3 mb-6">
              <span className="text-xl grayscale group-hover:grayscale-0 opacity-40">
                {category.icon}
              </span>
              <h3 className="text-[9px] font-black text-white uppercase tracking-[0.3em]">
                {category.name}
              </h3>
            </div>
            <div className="space-y-1">
              {category.tools.slice(0, 5).map((tool) => (
                <Link
                  key={tool.slug}
                  href={`/${catSlug}/${tool.slug}`}
                  className="flex items-center gap-3 p-3 text-[9px] text-text-muted hover:text-accent-glitch hover:bg-accent-glitch/5 transition-all uppercase tracking-widest border border-transparent hover:border-accent-glitch/10"
                >
                  <ToolIcon
                    slug={tool.slug}
                    categorySlug={catSlug}
                    className="w-3 h-3"
                  />
                  {tool.name.replace(" Generator", "")}
                </Link>
              ))}
            </div>
          </div>
        );
      })}
    </div>
  );
}

export default async function BlogPostPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const post = await getBlogPost(slug);
  if (!post) notFound();

  const tocItems = extractTocItems(post.content);
  const readingTime = Math.ceil(post.content.split(/\s+/).length / 200);

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    headline: post.title,
    description: post.description,
    image: post.image.startsWith("http")
      ? post.image
      : `${SITE_URL}${post.image}`,
    url: `${SITE_URL}/blog/${post.slug}`,
    mainEntityOfPage: {
      "@type": "WebPage",
      "@id": `${SITE_URL}/blog/${post.slug}`,
    },
    datePublished: post.date,
    dateModified: post.date,
    author: {
      "@type": "Organization",
      name: "TypeWarp Team",
    },
    publisher: {
      "@type": "Organization",
      name: "TypeWarp",
      logo: {
        "@type": "ImageObject",
        url: `${SITE_URL}/logo.png`,
      },
    },
  };

  return (
    <article className="min-h-screen pt-36 pb-20 bg-bg-void text-text-primary relative overflow-hidden">
      <BackgroundEffect />
      <JSONLD data={jsonLd} />
      <div className="container mx-auto max-w-7xl relative z-10 px-4">
        {/* Breadcrumbs */}
        <nav className="flex items-center gap-4 mb-8 font-mono text-[10px] uppercase tracking-[0.3em] text-text-muted max-w-6xl mx-auto">
          <Link
            href="/"
            className="hover:text-accent-glitch transition-colors flex items-center gap-2"
          >
            <Home className="w-3 h-3" />
            Home
          </Link>
          <ChevronRight className="w-3 h-3 opacity-30" />
          <Link
            href="/blog"
            className="hover:text-accent-glitch transition-colors"
          >
            Blog
          </Link>
          <ChevronRight className="w-3 h-3 opacity-30" />
          <div className="text-accent-glitch truncate max-w-[150px]">
            {post.slug.toUpperCase()}
          </div>
        </nav>

        {/* Main Image */}
        <div className="relative w-full aspect-[21/9] mb-12 bg-bg-card border border-white/10 group overflow-hidden max-w-6xl mx-auto shadow-2xl">
          <Image
            src={post.image}
            alt={post.tags?.[0] || post.title}
            fill
            className="object-cover grayscale opacity-50 group-hover:opacity-100 group-hover:grayscale-0 transition-all duration-1000"
            priority
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 90vw, 1200px"
          />
          <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-t from-bg-void via-transparent to-transparent opacity-60" />
        </div>

        {/* Post Header */}
        <header className="max-w-6xl mx-auto mb-16">
          <div className="flex items-center gap-6 mb-8 flex-wrap font-mono">
            <Link
              href={`/blog?category=${encodeURIComponent(post.category)}`}
              className="px-3 py-1 bg-accent-glitch text-black text-[9px] font-black tracking-widest uppercase"
            >
              {post.category}
            </Link>
            <span className="text-[9px] text-text-muted flex items-center gap-2 uppercase tracking-widest">
              <Calendar className="w-3 h-3 text-accent-glitch" />
              {new Date(post.date).toLocaleDateString()}
            </span>
            <span className="text-[9px] text-text-muted flex items-center gap-2 uppercase tracking-widest">
              <Clock className="w-3 h-3 text-accent-glitch" />
              {readingTime} Min Read
            </span>
          </div>

          <h1 className="text-2xl md:text-5xl font-black text-text-primary mb-6 tracking-tighter uppercase leading-[1]">
            {post.title}
          </h1>
          <p className="text-xl text-text-muted font-mono leading-relaxed max-w-3xl">
            {post.description}
          </p>

          <div className="flex items-center gap-4 mt-12 pt-8 border-t border-white/5">
            <div className="w-10 h-10 border border-accent-glitch/30 flex items-center justify-center font-mono text-accent-glitch text-lg bg-accent-glitch/5">
              {post.author[0]}
            </div>
            <div className="font-mono text-[10px] uppercase tracking-[0.2em]">
              <div className="text-white">{post.author}</div>
              <div className="text-text-muted">Author</div>
            </div>
          </div>
        </header>

        {/* Content Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 max-w-7xl mx-auto items-start">
          {/* Left Sidebar - TOC */}
          <aside className="hidden lg:block lg:col-span-3 lg:sticky lg:top-32">
            <TableOfContents items={tocItems} />
          </aside>

          {/* Main Content */}
          <div className="lg:col-span-6 font-mono text-sm leading-relaxed text-text-muted">
            <div className="lg:hidden mb-8">
              <TableOfContents items={tocItems} />
            </div>
            <div
              className="prose prose-sm prose-invert max-w-none 
              prose-headings:uppercase prose-headings:font-black prose-headings:tracking-tighter prose-headings:text-text-primary
              prose-p:font-mono prose-p:text-text-muted prose-p:leading-relaxed
              prose-a:text-accent-glitch prose-a:no-underline hover:prose-a:underline
              prose-code:text-accent-glitch prose-code:bg-bg-card prose-code:px-1 prose-code:before:content-none prose-code:after:content-none
              prose-strong:text-white prose-strong:font-black"
            >
              <MDXRemote
                source={post.content}
                components={MDXComponents}
                options={{
                  mdxOptions: {
                    rehypePlugins: [rehypeSlug],
                  },
                }}
              />
            </div>

            {/* Comments */}
            <div className="mt-20">
              <Comments postSlug={post.slug} />
            </div>
          </div>

          {/* Right Sidebar - Tools */}
          <aside className="lg:col-span-3 lg:sticky lg:top-32">
            <ToolsSection />
          </aside>
        </div>
      </div>
    </article>
  );
}
