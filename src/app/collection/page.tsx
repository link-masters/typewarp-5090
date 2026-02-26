import { categories, TOTAL_TOOLS_COUNT } from "@/lib/categories";
import type { Metadata } from "next";
import CollectionClientView from "@/components/CollectionClientView";

export const metadata: Metadata = {
  title: `All Text Tools | ${TOTAL_TOOLS_COUNT}+ Free Generators - TypeWarp`,
  description: `Browse ${TOTAL_TOOLS_COUNT}+ free text generators: cursed text, glitch fonts, Zalgo, fancy text, ASCII art, and more. No signup required. Works on Discord, Twitter, Instagram.`,
  keywords: [
    "text generator tools",
    "cursed text generator",
    "glitch text maker",
    "zalgo generator",
    "fancy font generator",
    "aesthetic text",
    "unicode converter",
    "ASCII art generator",
    "social media fonts",
    "discord text",
    "instagram fonts",
    "typewarp collection",
  ],
  openGraph: {
    title: `All Text Tools | ${TOTAL_TOOLS_COUNT}+ Free Generators`,
    description:
      "Explore the complete TypeWarp collection of text generators, typography engines, and encoding utilities.",
    url: "https://www.typewarp.com/collection",
    type: "website",
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "TypeWarp Collection - All Text Tools",
      },
    ],
    siteName: "TypeWarp",
  },
  twitter: {
    card: "summary_large_image",
    title: `All Text Tools | ${TOTAL_TOOLS_COUNT}+ Free Generators`,
    description:
      "Explore the complete TypeWarp collection of text generators and utilities.",
    creator: "@typewarp",
    images: ["/og-image.png"],
  },
  other: {
    "og:updated_time": new Date().toISOString(),
  },
  alternates: { canonical: "https://www.typewarp.com/collection" },
};

export default function TextToolsPage() {
  const allTools = categories.flatMap((category) =>
    category.tools.map((tool) => ({ ...tool, category })),
  );

  return (
    <CollectionClientView allTools={allTools} totalCount={TOTAL_TOOLS_COUNT} />
  );
}
