import { categories, TOTAL_TOOLS_COUNT } from "@/lib/categories";
import type { Metadata } from "next";
import ArsenalClientView from "@/components/ArsenalClientView";

export const metadata: Metadata = {
  title: "The Arsenal | Cursed Text Tools - TypeWarp",
  description: `Browse our complete collection of ${TOTAL_TOOLS_COUNT}+ text transformation tools, generators, and converters. High-performance digital entropy at your fingertips.`,
  keywords: [
    "text tools",
    "cursed text",
    "glitch text",
    "font generator",
    "typewarp",
  ],
  openGraph: {
    title: "The Arsenal | TypeWarp",
    description:
      "Explore the full TypeWarp arsenal of text generators, typography engines, and encoding utilities.",
    url: "https://typewarp.com/arsenal",
    type: "website",
    images: ["/og-image.png"],
  },
  other: {
    "og:updated_time": new Date().toISOString(),
  },
  alternates: { canonical: "https://typewarp.com/arsenal" },
};

export default function TextToolsPage() {
  const allTools = categories.flatMap((category) =>
    category.tools.map((tool) => ({ ...tool, category })),
  );

  return (
    <ArsenalClientView allTools={allTools} totalCount={TOTAL_TOOLS_COUNT} />
  );
}
