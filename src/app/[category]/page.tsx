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

  return {
    title: `${category.name} Generator | Free ${category.name} Tools - TypeWarp`,
    description: `Free ${category.name.toLowerCase()} generator with ${category.count} tools. Create ${toolNames.join(", ")} and more. Works on Discord, Twitter, Instagram.`,
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
      description: `Access ${category.count} specialized ${category.name.toLowerCase()} tools. High-performance digital entropy for social media.`,
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
      description: `Access ${category.count} specialized ${category.name.toLowerCase()} tools.`,
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
    </>
  );
}
