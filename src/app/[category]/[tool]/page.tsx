import { categories } from "@/lib/categories";
import { notFound } from "next/navigation";
import ToolView from "@/components/ToolView";
import JSONLD from "@/components/JSONLD";
import { Metadata } from "next";
import { getToolContent } from "@/lib/tools";
import { MDXRemote } from "next-mdx-remote/rsc";
import MDXComponents from "@/components/MDXComponents";

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

  const toolContent = await getToolContent(toolSlug);

  if (toolContent?.meta) {
    return {
      title:
        toolContent.meta.title || `${tool.name} | ${category.name} Generator`,
      description:
        toolContent.meta.description ||
        `Generate ${tool.name.toLowerCase()} instantly. Best ${category.name.toLowerCase()} tool for Instagram, Discord, TikTok & Gaming.`,
      keywords: toolContent.meta.keywords || [
        tool.name,
        category.name,
        "text generator",
        "fancy fonts",
        "cool symbols",
        "social media branding",
        "typewarp",
      ],
      openGraph: {
        title: toolContent.meta.title || `${tool.name} | TypeWarp`,
        description:
          toolContent.meta.description ||
          `Premium ${tool.name.toLowerCase()} tool. Best for ${category.name.toLowerCase()}.`,
        url: `https://www.typewarp.com/${categorySlug}/${toolSlug}`,
        type: "website",
      },
      alternates: {
        canonical: `https://www.typewarp.com/${categorySlug}/${toolSlug}`,
      },
    };
  }

  return {
    title: `${tool.name} | ${category.name} Generator`,
    description: `Generate ${tool.name.toLowerCase()} instantly. Best ${category.name.toLowerCase()} tool for Instagram, Discord, TikTok & Gaming.`,
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
      url: `https://www.typewarp.com/${categorySlug}/${toolSlug}`,
      type: "website",
    },
    alternates: {
      canonical: `https://www.typewarp.com/${categorySlug}/${toolSlug}`,
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
    description: `Online tool to generate ${tool.name.toLowerCase()} for ${category.name.toLowerCase()}.`,
    applicationCategory: "DesignApplication",
    operatingSystem: "All",
    url: `https://www.typewarp.com/${categorySlug}/${toolSlug}`,
    offers: {
      "@type": "Offer",
      price: "0",
      priceCurrency: "USD",
    },
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

  return (
    <>
      <JSONLD data={jsonLd} />
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
