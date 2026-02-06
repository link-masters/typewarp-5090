import { categories } from "@/lib/categories";
import { notFound } from "next/navigation";
import ToolView from "@/components/ToolView";
import JSONLD from "@/components/JSONLD";
import { Metadata } from "next";

export function generateStaticParams() {
  const params: { category: string; tool: string }[] = [];
  categories.forEach((category) => {
    category.tools.forEach((tool) => {
      params.push({
        category: category.slug,
        tool: tool.slug,
      });
    });
  });
  return params;
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ category: string; tool: string }>;
}): Promise<Metadata> {
  const { category: categorySlug, tool: toolSlug } = await params;
  const category = categories.find((c) => c.slug === categorySlug);
  const tool = category?.tools.find((t) => t.slug === toolSlug);

  if (!category || !tool) return { title: "Tool Not Found" };

  return {
    title: `${tool.name} | No.1 ${category.name} Generator - TypeWarp`,
    description: `Generate ${tool.name.toLowerCase()} instantly. High-quality ${category.name.toLowerCase()} tool for Instagram, Discord, TikTok & Gaming. Free, fast and mobile friendly.`,
    keywords: [
      tool.name,
      category.name,
      "text generator",
      "fancy fonts",
      "cool symbols",
      "social media branding",
      "typewarp",
    ],
    openGraph: {
      title: `${tool.name} | TypeWarp`,
      description: `Premium ${tool.name.toLowerCase()} tool. Best for ${category.name.toLowerCase()}.`,
      url: `https://typewarp.com/${categorySlug}/${toolSlug}`,
      type: "website",
    },
    alternates: {
      canonical: `https://typewarp.com/${categorySlug}/${toolSlug}`,
    },
  };
}

export default async function ToolPage({
  params,
}: {
  params: Promise<{ category: string; tool: string }>;
}) {
  const { category: categorySlug, tool: toolSlug } = await params;
  const category = categories.find((c) => c.slug === categorySlug);
  const tool = category?.tools.find((t) => t.slug === toolSlug);

  if (!category || !tool) {
    return notFound();
  }

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "WebApplication",
    name: tool.name,
    description: `Online tool to generate ${tool.name.toLowerCase()} for ${category.name.toLowerCase()}.`,
    applicationCategory: "DesignApplication",
    operatingSystem: "All",
    url: `https://typewarp.com/${categorySlug}/${toolSlug}`,
    offers: {
      "@type": "Offer",
      price: "0",
      priceCurrency: "USD",
    },
  };

  return (
    <>
      <JSONLD data={jsonLd} />
      <ToolView category={category} tool={tool} />
    </>
  );
}
