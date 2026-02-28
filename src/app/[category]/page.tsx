import React from "react";
import { categories } from "@/lib/categories";
import { notFound } from "next/navigation";
import { Metadata } from "next";
import CategoryClientView from "@/components/CategoryClientView";
import JSONLD from "@/components/JSONLD";
import { SITE_URL } from "@/lib/config";

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

  const toolNames = category.tools.slice(0, 5).map((t) => t.name);

  let title = `${category.name} Generator | Free Online Glitch & Fancy Font Tools`;
  if (title.length > 60) title = title.substring(0, 57) + "...";
  if (title.length < 50) title = title.padEnd(55, " | TypeWarp Tools");

  let description = `Access ${category.count} free ${category.name.toLowerCase()} tools online. Create specialized text effects like ${toolNames.slice(0, 2).join(" and ")} for Discord, Instagram and TikTok.`;
  if (description.length < 150) {
    description = description.padEnd(
      155,
      " Enhance your social media branding and digital presence with our high-performance Unicode transformation engine.",
    );
  }
  if (description.length > 160)
    description = description.substring(0, 157) + "...";

  return {
    title,
    description,
    keywords: [
      `${category.name.toLowerCase()} generator`,
      ...toolNames.map((n) => n.toLowerCase()),
      "free text generator",
      "cursed text",
      "glitch fonts",
      "fancy text",
      "unicode text",
      "social media fonts",
      "typewarp",
    ],
    robots: {
      index: true,
      follow: true,
      googleBot: {
        index: true,
        follow: true,
        "max-image-preview": "large",
        "max-snippet": -1,
      },
    },
    openGraph: {
      title: `${category.name} Generator | TypeWarp`,
      description: description,
      images: [
        {
          url: "/og-image.png",
          width: 1200,
          height: 630,
          alt: `${category.name} Text Generator Tools`,
        },
      ],
      url: `${SITE_URL}/${categorySlug}`,
      type: "website",
      siteName: "TypeWarp",
    },
    twitter: {
      card: "summary_large_image",
      title: `${category.name} Generator | TypeWarp`,
      description: description,
      creator: "@typewarp",
      images: ["/og-image.png"],
    },
    alternates: {
      canonical: `${SITE_URL}/${categorySlug}`,
    },
  };
}

export async function generateCategoryJsonLd(categorySlug: string) {
  const category = categories.find((c) => c.slug === categorySlug);
  if (!category) return null;

  return {
    "@context": "https://schema.org",
    "@type": "CollectionPage",
    name: `${category.name} Text Generator Collection`,
    description: category.description,
    url: `${SITE_URL}/${categorySlug}`,
    mainEntity: {
      "@type": "ItemList",
      numberOfItems: category.tools.length,
      itemListElement: category.tools.slice(0, 10).map((tool, index) => ({
        "@type": "ListItem",
        position: index + 1,
        name: tool.name,
        item: `${SITE_URL}/${categorySlug}/${tool.slug}`,
      })),
    },
  };
}

export async function generateBreadcrumbJsonLd(categorySlug: string) {
  const category = categories.find((c) => c.slug === categorySlug);
  if (!category) return null;

  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      {
        "@type": "ListItem",
        position: 1,
        name: "Home",
        item: SITE_URL,
      },
      {
        "@type": "ListItem",
        position: 2,
        name: category.name,
      },
    ],
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

  const jsonLd = await generateCategoryJsonLd(categorySlug);
  const breadcrumbJsonLd = await generateBreadcrumbJsonLd(categorySlug);

  return (
    <>
      {jsonLd && <JSONLD data={jsonLd} />}
      {breadcrumbJsonLd && <JSONLD data={breadcrumbJsonLd} />}
      <CategoryClientView category={category} />

      {/* Improved Text-to-HTML Ratio Section */}
      <section className="bg-[#080808] py-24 md:py-32 border-t border-white/5 relative overflow-hidden">
        <div className="absolute top-0 left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-accent-glitch/20 to-transparent" />
        <div className="container mx-auto max-w-7xl px-6 relative z-10">
          <div className="max-w-4xl mx-auto space-y-12">
            <div className="space-y-6">
              <h2 className="text-2xl md:text-3xl font-black uppercase tracking-tighter text-white">
                The Science of {category.name} Typography
              </h2>
              <div className="prose prose-invert max-w-none text-white/50 font-mono text-sm md:text-base leading-relaxed space-y-4">
                <p>
                  The <strong>{category.name}</strong> collection at TypeWarp is
                  engineered using advanced Unicode mapping techniques. Unlike
                  traditional fonts that require external files, our tools
                  leverage the native character sets built into every modern
                  operating system. This means that every stylized character you
                  generate is natively supported across platforms like
                  Instagram, Discord, and TikTok.
                </p>
                <p>
                  Our {category.name.toLowerCase()} algorithms prioritize visual
                  impact while maintaining the underlying semantic integrity of
                  your text. Whether you are creating a cursed aesthetic for a
                  horror-themed profile or using professional fancy fonts for
                  branding, our generators provide instantaneous, zero-latency
                  results through client-side browser execution.
                </p>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div className="p-8 bg-[#0c0c0c] border border-white/5 rounded-2xl">
                <h3 className="text-lg font-black uppercase tracking-tighter text-white mb-4">
                  Why Use {category.name} Tools?
                </h3>
                <p className="text-white/40 font-mono text-xs leading-relaxed">
                  The modern digital landscape is saturated with standard system
                  typography. By utilizing specialized {category.name} effects,
                  you create a visual disruption that captures attention and
                  increases engagement rates. These tools are perfect for social
                  media influencers, designers, and gamers looking to establish
                  a unique digital identity without relying on complex image
                  editing software.
                </p>
              </div>
              <div className="p-8 bg-[#0c0c0c] border border-white/5 rounded-2xl">
                <h3 className="text-lg font-black uppercase tracking-tighter text-white mb-4">
                  Universal Compatibility
                </h3>
                <p className="text-white/40 font-mono text-xs leading-relaxed">
                  Every tool in the {category.name} category produces raw
                  Unicode output. This ensures that your stylized text moves
                  seamlessly from our generator to any text field that supports
                  modern web standards. From mobile bios to desktop gaming
                  clients, your aesthetic choices remain consistent across all
                  viewing environments, ensuring your brand stays intact
                  wherever you share it.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
