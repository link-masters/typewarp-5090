import { categories } from "@/lib/categories";
import { notFound } from "next/navigation";
import ToolView from "@/components/ToolView";
import GenericSEOTent from "@/components/GenericSEOTent";
import JSONLD from "@/components/JSONLD";
import { Metadata } from "next";
import { getToolContent } from "@/lib/tools";
import { MDXRemote } from "next-mdx-remote/rsc";
import MDXComponents from "@/components/MDXComponents";
import SEOTrophy from "@/components/SEOTrophy";
import { SITE_URL } from "@/lib/config";

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

  // Canonical URL always points to the first category that contains this tool slug
  // This handles duplicate slugs like old-english / old-english-font
  const CANONICAL_SLUG_MAP: Record<string, string> = {
    "old-english": "style-fancy/old-english-font",
    "upside-down": "text-tools/upside-down-text",
  };

  const canonicalOverride = CANONICAL_SLUG_MAP[toolSlug];
  const canonicalUrl = canonicalOverride
    ? `${SITE_URL}/${canonicalOverride}`
    : `${SITE_URL}/${categorySlug}/${toolSlug}`;

  const toolContent = await getToolContent(toolSlug);

  const baseKeywords = [
    tool.name.toLowerCase(),
    `${category.name.toLowerCase()} generator`,
    "free text generator",
    "fancy fonts",
    "cool symbols",
    "social media branding",
    "unicode text",
    "copy paste text",
    "discord fonts",
    "instagram fonts",
    "typewarp",
  ];

  const mdxTitle = toolContent?.meta?.title;
  let pageTitle = mdxTitle || `${tool.name} Generator`;

  // Only strip verbose suffixes — preserve the core tool name intact
  pageTitle = pageTitle
    .replace(/\s*-\s*Free Online.*$/i, "")
    .replace(/\s*—\s*Free.*$/i, "")
    .replace(/\s*\|\s*.*$/i, "")
    .trim();

  if (pageTitle.length > 60) {
    pageTitle = pageTitle.substring(0, 57) + "...";
  }

  const ogTitle = mdxTitle
    ? `${mdxTitle} | TypeWarp`
    : `${tool.name} | ${category.name} Font Tool`;

  const mdxDesc = toolContent?.meta?.description;
  let pageDescription =
    mdxDesc ||
    `Generate ${tool.name.toLowerCase()} instantly. Free ${category.name.toLowerCase()} tool for Instagram, Discord, TikTok, and gaming. Copy-paste Unicode text, no signup required.`;

  // Trim to 160 max
  if (pageDescription.length > 160) {
    pageDescription = pageDescription.substring(0, 157) + "...";
  }

  return {
    title: pageTitle,
    description: pageDescription,
    keywords: toolContent?.meta?.keywords || baseKeywords,
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
      title: ogTitle,
      description: pageDescription,
      url: `${SITE_URL}/${categorySlug}/${toolSlug}`,
      type: "website",
      images: [
        {
          url: "/og-image.png",
          width: 1200,
          height: 630,
          alt: `${tool.name} - Free Online Generator`,
        },
      ],
      siteName: "TypeWarp",
    },
    twitter: {
      card: "summary_large_image",
      title: ogTitle,
      description: pageDescription,
      creator: "@typewarp",
      images: ["/og-image.png"],
    },
    alternates: {
      canonical: canonicalUrl,
    },
  };
}

function extractHeadings(content: string) {
  const headingRegex = /^##\s+(.*)$/gm;
  const headings: { title: string; id: string }[] = [];
  let match;
  while ((match = headingRegex.exec(content)) !== null) {
    headings.push({
      title: match[1],
      id: match[1].toLowerCase().replace(/\s+/g, "-"),
    });
  }
  return headings;
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

  const toolContent = await getToolContent(toolSlug);

  let modifiedContent = toolContent?.content || "";
  if (modifiedContent) {
    const injectToken = `\n\n<SEOTrophy toolSlug="${tool.slug}" />\n\n`;
    if (modifiedContent.includes("\n## Comparison")) {
      modifiedContent = modifiedContent.replace(
        "\n## Comparison",
        injectToken + "## Comparison",
      );
    } else if (modifiedContent.includes("\n## Frequently")) {
      modifiedContent = modifiedContent.replace(
        "\n## Frequently",
        injectToken + "## Frequently",
      );
    } else {
      modifiedContent += injectToken;
    }
  }

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "WebApplication",
    name: tool.name,
    description: `Free online ${tool.name.toLowerCase()} — generate ${category.name.toLowerCase()} text effects instantly. Works on Discord, Instagram, TikTok and all platforms.`,
    applicationCategory: "DesignApplication",
    operatingSystem: "All",
    browserRequirements: "Requires JavaScript",
    url: `${SITE_URL}/${categorySlug}/${toolSlug}`,
    image: `${SITE_URL}/og-image.png`,
    screenshot: `${SITE_URL}/og-image.png`,
    offers: {
      "@type": "Offer",
      price: "0",
      priceCurrency: "USD",
      availability: "https://schema.org/InStock",
    },
  };

  const breadcrumbJsonLd = {
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
        item: `${SITE_URL}/${categorySlug}`,
      },
      {
        "@type": "ListItem",
        position: 3,
        name: tool.name,
      },
    ],
  };

  // Extract FAQ questions from MDX content for rich schema
  const faqMatches = [...(toolContent?.content || "").matchAll(/<FAQItem q="([^"]+)">([\s\S]*?)<\/FAQItem>/g)];
  const faqEntities = faqMatches.slice(0, 7).map((m) => ({
    "@type": "Question",
    name: m[1],
    acceptedAnswer: {
      "@type": "Answer",
      text: m[2].replace(/<[^>]+>/g, "").trim().substring(0, 300),
    },
  }));

  const faqJsonLd = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqEntities.length > 0 ? faqEntities : [
      {
        "@type": "Question",
        name: `Is the ${tool.name} free?`,
        acceptedAnswer: {
          "@type": "Answer",
          text: `Yes, the ${tool.name} on TypeWarp is completely free with no signup required.`,
        },
      },
      {
        "@type": "Question",
        name: `Does ${tool.name} output work on Discord and Instagram?`,
        acceptedAnswer: {
          "@type": "Answer",
          text: `Yes, the output uses standard Unicode characters that work on Discord, Instagram, TikTok, Twitter/X, and most other platforms without any font installation.`,
        },
      },
    ],
  };

  return (
    <>
      <JSONLD data={jsonLd} />
      <JSONLD data={breadcrumbJsonLd} />
      <JSONLD data={faqJsonLd} />

      {/* Tool functionality area (Client Component) */}
      <ToolView category={category} tool={tool} hideFaqs={true} />

      {/* Primary content area (Server Components) */}
      {toolContent ? (
        <div className="bg-bg-void light:bg-white py-16 md:py-24 border-t border-border-subtle light:border-neutral-200 relative overflow-hidden">
          {/* Subtle Ambient Glow */}
          <div className="absolute top-0 left-0 w-full h-96 bg-[radial-gradient(circle_at_50%_0%,rgba(57,255,20,0.02)_0%,transparent_100%)] pointer-events-none hidden dark:block" />

          <div className="container mx-auto max-w-7xl px-6 relative z-10">
            {/* Main Content Area */}
            <div className="max-w-4xl mx-auto">
              <div
                className="prose dark:prose-invert max-w-none
                  prose-strong:text-text-primary prose-strong:font-bold
                  prose-ul:list-none prose-ol:list-none
                  prose-li:p-0 prose-li:m-0"
              >
                <MDXRemote
                  source={modifiedContent}
                  components={{ ...MDXComponents, SEOTrophy }}
                />
              </div>
            </div>
          </div>
        </div>
      ) : (
        <div className="bg-bg-void light:bg-white">
          <GenericSEOTent tool={tool} category={category} />
        </div>
      )}
    </>
  );
}
