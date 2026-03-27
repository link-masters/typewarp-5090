import { categories, TOTAL_TOOLS_COUNT } from "@/lib/categories";
import type { Metadata } from "next";
import CollectionClientView from "@/components/CollectionClientView";
import { SITE_URL } from "@/lib/config";

export const metadata: Metadata = {
  title: "Collection",
  description:
    "Explore the TypeWarp collection of text generators, typography engines, and encoding utilities. Access our 88+ free tools for unique styles.",
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
    url: `${SITE_URL}/collection`,
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
    "og:updated_time": "2026-03-27T00:00:00.000Z",
  },
  alternates: { canonical: `${SITE_URL}/collection` },
};

export default function TextToolsPage() {
  const allTools = categories.flatMap((category) =>
    category.tools.map((tool) => ({ ...tool, category })),
  );

  return (
    <CollectionClientView allTools={allTools} totalCount={TOTAL_TOOLS_COUNT} />
  );
}
