import React from "react";
import { categories } from "@/lib/categories";
import { notFound } from "next/navigation";
import { Metadata } from "next";
import CategoryClientView from "@/components/CategoryClientView";

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
    title: `${category.name} | Cursed Unicode Tools - TypeWarp`,
    description: `Access ${category.count} specialized ${category.name.toLowerCase()} tools. High-performance digital entropy for social media and beyond.`,
    keywords: [category.name, "cursed text", "glitch generator", "typewarp"],
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

  return <CategoryClientView category={category} />;
}
