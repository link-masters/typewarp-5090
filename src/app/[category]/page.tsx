import React from "react";
import { categories } from "@/lib/categories";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Metadata } from "next";
import { ToolIcon } from "@/components/ToolIcon";

export function generateStaticParams() {
  return categories.map((category) => ({
    category: category.slug,
  }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ category: string }>;
}): Promise<Metadata> {
  const { category: categorySlug } = await params;
  const category = categories.find((c) => c.slug === categorySlug);

  if (!category) return { title: "Category Not Found" };

  return {
    title: `${category.name} | Professional Unicode Tools - TypeWarp`,
    description: `Explore our collection of ${category.count} specialized ${category.name.toLowerCase()} tools. High-performance Unicode manipulation for social media, gaming, and digital art.`,
    keywords: [
      category.name,
      "unicode tools",
      "text generator",
      "typography",
      "typewarp",
    ],
    openGraph: {
      title: `${category.name} | TypeWarp`,
      description: category.description,
      images: ["/og-image.png"],
      url: `https://typewarp.com/${categorySlug}`,
    },
    alternates: {
      canonical: `https://typewarp.com/${categorySlug}`,
    },
  };
}

export default async function CategoryPage({
  params,
}: {
  params: Promise<{ category: string }>;
}) {
  const { category: categorySlug } = await params;
  const category = categories.find((c) => c.slug === categorySlug);

  if (!category) {
    return notFound();
  }

  return (
    <div className="min-h-screen pt-28 pb-20 px-4">
      {/* Premium Breadcrumbs */}
      <div className="max-w-7xl mx-auto mb-10 flex items-center gap-3 text-sm font-medium animate-fade-in-up">
        <Link
          href="/"
          className="flex items-center gap-2 px-3 py-1.5 rounded-xl bg-[var(--card-bg)] border border-[var(--card-border)] text-[var(--muted)] hover:text-[var(--foreground)] hover:border-[var(--muted)] transition-colors duration-200 group"
        >
          <svg
            className="w-4 h-4 text-red-500 group-hover:scale-110 transition-transform"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6"
            />
          </svg>
          Home
        </Link>
        <span className="text-[var(--card-border)]">
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
              d="M9 5l7 7-7 7"
            />
          </svg>
        </span>
        <div className="flex items-center gap-2 px-3 py-1.5 rounded-xl bg-red-500/10 border border-red-500/20 text-red-500">
          <span className="text-base leading-none">{category.icon}</span>{" "}
          {category.name}
        </div>
      </div>

      <div className="container mx-auto max-w-7xl">
        {/* Modern Category Hero */}
        <div className="relative mb-12 md:mb-20 p-6 sm:p-10 md:p-16 rounded-[2.5rem] sm:rounded-[3rem] bg-[var(--card-bg)] border border-[var(--card-border)] overflow-hidden animate-fade-in-up">
          <div className="absolute top-0 right-0 p-8 opacity-5 text-[15rem] md:text-[20rem] leading-none select-none font-black translate-x-1/4 translate-y-[-10%]">
            {category.icon}
          </div>

          <div className="relative z-10 max-w-3xl">
            <span className="inline-block px-4 py-2 rounded-full bg-red-500/10 text-red-500 text-[10px] font-black uppercase tracking-widest mb-6 border border-red-500/20">
              {category.count} Specialized Tools
            </span>
            <h1 className="text-5xl md:text-7xl font-black mb-6 tracking-tighter text-[var(--foreground)] leading-[1.1]">
              {category.name}
            </h1>
            <p className="text-xl md:text-2xl text-[var(--muted)] font-medium leading-relaxed max-w-2xl">
              {category.description}
            </p>
          </div>

          <div className="absolute -bottom-20 -left-20 w-64 h-64 bg-red-500/10 rounded-full blur-[100px]" />
        </div>

        {/* Tools Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 animate-fade-in-up animation-delay-200">
          {category.tools.map((tool, index) => (
            <Link
              key={tool.slug}
              href={`/${category.slug}/${tool.slug}`}
              className="group relative flex flex-col p-6 sm:p-8 rounded-[1.5rem] sm:rounded-[2rem] bg-[var(--card-bg)] border border-[var(--card-border)] hover:border-red-500/30 transition-all duration-300 hover:-translate-y-2 hover:shadow-[0_20px_40px_rgba(0,0,0,0.3)]"
              style={{ animationDelay: `${index * 50}ms` }}
            >
              <div className="mb-6 w-16 h-16 rounded-2xl bg-[var(--background)] border border-[var(--card-border)] flex items-center justify-center text-4xl group-hover:scale-110 group-hover:rotate-6 transition-all duration-300 overflow-hidden">
                <ToolIcon
                  slug={tool.slug}
                  categorySlug={category.slug}
                  className="w-8 h-8 text-red-500"
                />
              </div>

              <h3 className="text-2xl font-black mb-3 text-[var(--foreground)] group-hover:text-red-500 transition-colors">
                {tool.name}
              </h3>

              <p className="text-[var(--muted)] text-sm mb-8 flex-grow leading-relaxed line-clamp-2">
                Professional grade {tool.name.toLowerCase()} for creative and
                social impact.
              </p>

              <div className="flex items-center justify-between text-xs font-black uppercase tracking-widest text-red-500">
                <span>Launch Tool</span>
                <svg
                  className="w-5 h-5 opacity-0 -translate-x-4 group-hover:opacity-100 group-hover:translate-x-0 transition-all"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={3}
                    d="M17 8l4 4m0 0l-4 4m4-4H3"
                  />
                </svg>
              </div>

              <div className="absolute inset-0 bg-gradient-to-br from-red-600/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity rounded-[2rem]" />
            </Link>
          ))}
        </div>

        {/* About Footer Section */}
        <div className="mt-32 p-8 md:p-16 rounded-[3rem] border border-[var(--card-border)] bg-gradient-to-br from-[var(--card-bg)] to-transparent animate-fade-in-up">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl font-black mb-6 text-[var(--foreground)] tracking-tight">
                About {category.name}
              </h2>
              <p className="text-[var(--muted)] text-lg leading-relaxed mb-8">
                Pushing the boundaries of digital expression with advanced
                Unicode manipulation. These tools are designed for peak
                performance and visual excellence.
              </p>
              <div className="flex flex-wrap gap-3">
                {["Fast Output", "Mobile Ready", "Free Forever", "Secure"].map(
                  (tag) => (
                    <div
                      key={tag}
                      className="px-4 py-2 rounded-xl bg-[var(--background)] border border-[var(--card-border)] text-[10px] font-black uppercase tracking-widest text-[var(--muted)]"
                    >
                      {tag}
                    </div>
                  ),
                )}
              </div>
            </div>
            <div className="bg-red-500/5 rounded-[2.5rem] p-8 border border-red-500/10 flex items-center justify-center text-8xl md:text-9xl grayscale opacity-30 select-none">
              {category.icon}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
