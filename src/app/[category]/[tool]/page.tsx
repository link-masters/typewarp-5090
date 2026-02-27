import { categories } from "@/lib/categories";
import { notFound } from "next/navigation";
import ToolView from "@/components/ToolView";
import JSONLD from "@/components/JSONLD";
import { Metadata } from "next";
import { getToolContent } from "@/lib/tools";
import { MDXRemote } from "next-mdx-remote/rsc";
import MDXComponents from "@/components/MDXComponents";
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

  // Resolve canonical category: if a tool exists in multiple categories,
  // always point the canonical URL to the first category it appears in.
  const canonicalCategory = categories.find((c) =>
    c.tools.some((t) => t.slug === toolSlug),
  );
  const canonicalCategorySlug = canonicalCategory?.slug || categorySlug;
  const canonicalUrl = `${SITE_URL}/${canonicalCategorySlug}/${toolSlug}`;

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
  const pageTitle = mdxTitle || tool.name;
  const ogTitle = mdxTitle
    ? `${mdxTitle} | ${category.name}`
    : `${tool.name} | Free ${category.name} Generator`;

  const mdxDesc = toolContent?.meta?.description;
  const pageDescription =
    mdxDesc ||
    `Generate ${tool.name.toLowerCase()} instantly. Free ${category.name.toLowerCase()} tool for Instagram, Discord, TikTok & Gaming. No signup required.`;

  if (toolContent?.meta) {
    return {
      title: pageTitle,
      description: pageDescription,
      keywords: toolContent.meta.keywords || baseKeywords,
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

  return {
    title: tool.name,
    description: `Generate ${tool.name.toLowerCase()} instantly. Free ${category.name.toLowerCase()} tool for Instagram, Discord, TikTok & Gaming. No signup required.`,
    keywords: baseKeywords,
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
      title: `${tool.name} | Free ${category.name} Generator`,
      description: `Free ${tool.name.toLowerCase()} generator. Works on Discord, Twitter, Instagram.`,
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
      title: `${tool.name} | Free ${category.name} Generator`,
      description: `Free ${tool.name.toLowerCase()} generator.`,
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
  const headings = toolContent ? extractHeadings(toolContent.content) : [];

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
    aggregateRating: {
      "@type": "AggregateRating",
      ratingValue: "4.8",
      ratingCount: "120",
      bestRating: "5",
      worstRating: "1",
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

  const faqJsonLd = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: [
      {
        "@type": "Question",
        name: `Is the ${tool.name} free?`,
        acceptedAnswer: {
          "@type": "Answer",
          text: `Yes, the ${tool.name} is completely free to use.`,
        },
      },
      {
        "@type": "Question",
        name: `Can I use ${tool.name} output on social media?`,
        acceptedAnswer: {
          "@type": "Answer",
          text: `Yes, the output is standard Unicode and works on Instagram, TikTok, Discord, and Twitter/X.`,
        },
      },
    ],
  };

  const toolNameLower = tool.name.toLowerCase();
  const categoryNameLower = category.name.toLowerCase();

  return (
    <>
      <JSONLD data={jsonLd} />
      <JSONLD data={breadcrumbJsonLd} />
      <JSONLD data={faqJsonLd} />
      <ToolView category={category} tool={tool} hideFaqs={!!toolContent} />

      {toolContent && (
        <div className="bg-[#080808] py-16 md:py-24 border-t border-white/5 relative overflow-hidden">
          {/* Subtle Ambient Glow */}
          <div className="absolute top-0 left-0 w-full h-96 bg-[radial-gradient(circle_at_50%_0%,rgba(57,255,20,0.02)_0%,transparent_100%)] pointer-events-none" />

          <div className="container mx-auto max-w-7xl px-6 relative z-10">
            {/* Main Content Area */}
            <div className="max-w-4xl mx-auto">
              <div
                className="prose prose-invert max-w-none
                  prose-strong:text-white prose-strong:font-bold
                  prose-ul:list-none prose-ol:list-none
                  prose-li:p-0 prose-li:m-0"
              >
                <MDXRemote
                  source={toolContent.content}
                  components={MDXComponents}
                />
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
