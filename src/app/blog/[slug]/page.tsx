import { getBlogPost, getBlogPosts } from "@/lib/blog";
import JSONLD from "@/components/JSONLD";
import { MDXRemote } from "next-mdx-remote/rsc";
import MDXComponents from "@/components/MDXComponents";
import Image from "next/image";
import { notFound } from "next/navigation";
import remarkGfm from "remark-gfm";
import rehypeSlug from "rehype-slug";
import rehypeAutolinkHeadings from "rehype-autolink-headings";
import rehypePrettyCode from "rehype-pretty-code";
import { Metadata } from "next";
import { categories } from "@/lib/categories";
import { ToolIcon } from "@/components/ToolIcon";

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

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    headline: post.title,
    description: post.description,
    image: post.image,
    datePublished: post.date,
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
  };

  return (
    <article className="min-h-screen pt-32 pb-20 bg-[var(--background)]">
      <JSONLD data={jsonLd} />
      <div className="max-w-7xl mx-auto px-4 md:px-8">
        {/* Header Section */}
        <header className="max-w-4xl mx-auto mb-16 text-center">
          <div className="flex items-center justify-center gap-4 mb-6">
            <span className="px-4 py-1.5 bg-red-600/10 text-red-600 rounded-full text-sm font-bold tracking-wider uppercase border border-red-600/20">
              {post.category}
            </span>
            <span className="text-[var(--muted)] font-medium">
              {new Date(post.date).toLocaleDateString("en-US", {
                year: "numeric",
                month: "long",
                day: "numeric",
              })}
            </span>
          </div>
          <h1 className="text-4xl md:text-6xl font-black text-[var(--foreground)] mb-8 leading-tight">
            {post.title}
          </h1>
          <div className="flex items-center justify-center gap-4">
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
                Editor & Content Strategist
              </div>
            </div>
          </div>
        </header>

        {/* Featured Image */}
        <div className="relative w-full aspect-[21/9] mb-16 rounded-3xl overflow-hidden shadow-[0_20px_50px_rgba(0,0,0,0.1)] group border border-[var(--card-border)]">
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
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 max-w-7xl mx-auto">
          {/* Main Content */}
          <div className="lg:col-span-8">
            <div className="prose prose-invert prose-red max-w-none">
              <MDXRemote
                source={post.content}
                components={MDXComponents}
                options={{
                  mdxOptions: {
                    remarkPlugins: [remarkGfm],
                    rehypePlugins: [
                      rehypeSlug,
                      [rehypeAutolinkHeadings, { behavior: "wrap" }],
                      [rehypePrettyCode, { theme: "github-dark" }],
                    ],
                  },
                }}
              />
            </div>

            {/* Comments Section (Mockup) */}
            <div className="mt-20 pt-10 border-t border-white/10">
              <h2 className="text-3xl font-bold text-white mb-8 flex items-center">
                <svg
                  className="w-8 h-8 mr-3 text-red-500"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z"
                  />
                </svg>
                Discussion
              </h2>
              <div className="p-8 bg-white/5 backdrop-blur-md border border-white/10 rounded-2xl flex flex-col items-center text-center">
                <p className="text-gray-400 mb-6">
                  Join the conversation and share your thoughts on this topic.
                </p>
                <button className="px-8 py-3 bg-red-600 hover:bg-red-700 text-white font-bold rounded-full transition-all hover:scale-105 active:scale-95 shadow-lg shadow-red-600/20">
                  Connect with Giscus
                </button>
              </div>
            </div>
          </div>

          {/* Sidebar */}
          <aside className="lg:col-span-4 space-y-8">
            {/* Dark & Horror Tools Widget */}
            <div className="p-8 bg-[var(--card-bg)] backdrop-blur-md border border-[var(--card-border)] rounded-[2rem]">
              <h3 className="text-xl font-black text-[var(--foreground)] mb-6 uppercase tracking-wider text-sm flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-red-500"></span>
                Horror Tools
              </h3>
              <div className="flex flex-col gap-3">
                {categories
                  .find((c) => c.slug === "dark-horror")
                  ?.tools.map((tool) => (
                    <a
                      key={tool.slug}
                      href={`/dark-horror/${tool.slug}`}
                      className="group flex items-center gap-4 p-4 rounded-2xl bg-[var(--background)] border border-[var(--card-border)] hover:border-red-500/30 transition-all hover:-translate-y-1 block"
                    >
                      <div className="w-10 h-10 rounded-xl bg-red-500/10 flex items-center justify-center text-red-500 group-hover:scale-110 transition-transform">
                        <ToolIcon
                          slug={tool.slug}
                          categorySlug="dark-horror"
                          className="w-5 h-5"
                        />
                      </div>
                      <div className="flex-1">
                        <h4 className="text-sm font-bold text-[var(--foreground)] group-hover:text-red-500 transition-colors">
                          {tool.name}
                        </h4>
                      </div>
                    </a>
                  ))}
              </div>
            </div>
          </aside>
        </div>
      </div>
    </article>
  );
}
