import { categories } from "@/lib/categories";
import { notFound } from "next/navigation";
import ToolView from "@/components/ToolView";
import JSONLD from "@/components/JSONLD";
import { Metadata } from "next";
import { getToolContent } from "@/lib/tools";
import { MDXRemote } from "next-mdx-remote/rsc";
import MDXComponents from "@/components/MDXComponents";
import { Shield, Activity, Box, Terminal as TerminalIcon } from "lucide-react";

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
        toolContent.meta.title ||
        `${tool.name} | No.1 ${category.name} Generator - TypeWarp`,
      description:
        toolContent.meta.description ||
        `Generate ${tool.name.toLowerCase()} instantly. High-quality ${category.name.toLowerCase()} tool for Instagram, Discord, TikTok & Gaming. Free, fast and mobile friendly.`,
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

  return (
    <>
      <JSONLD data={jsonLd} />
      <ToolView category={category} tool={tool} hideFaqs={!!toolContent} />

      {toolContent && (
        <div className="bg-bg-void pt-12 pb-24 border-t border-white/5">
          <div className="container mx-auto max-w-7xl px-4">
            <div className="flex flex-col lg:flex-row gap-10">
              {/* Sticky TOC Sidebar */}
              <aside className="hidden lg:block w-72 shrink-0 sticky top-32 h-fit">
                <div className="border border-white/5 bg-bg-card p-5 shadow-2xl">
                  <div className="flex items-center gap-4 mb-6">
                    <Activity className="w-4 h-4 text-accent-glitch animate-pulse" />
                    <span className="text-[10px] font-mono uppercase tracking-[0.4em] text-text-muted font-black">
                      System_Index
                    </span>
                  </div>
                  <nav className="flex flex-col">
                    {headings.map((h, i) => (
                      <a
                        key={i}
                        href={`#${h.id}`}
                        className="group flex items-start gap-4 py-3 border-b border-white/[0.03] last:border-0 hover:bg-white/[0.01] px-1 -mx-1 transition-all"
                      >
                        <span className="text-[9px] font-mono text-white/30 group-hover:text-accent-glitch transition-colors tabular-nums mt-0.5">
                          {String(i + 1).padStart(2, "0")}
                        </span>
                        <span className="text-[10px] font-mono uppercase tracking-[0.15em] font-black group-hover:text-white transition-colors leading-relaxed">
                          {h.title}
                        </span>
                      </a>
                    ))}
                  </nav>
                  <div className="mt-12 pt-6 border-t border-white/5 flex flex-col gap-3">
                    <div className="flex items-center gap-4">
                      <Shield className="w-3 h-3 text-accent-glitch/60" />
                      <span className="text-[9px] font-mono text-text-muted/60 uppercase tracking-[0.3em]">
                        Verified_Safe
                      </span>
                    </div>
                    <div className="text-[8px] font-mono text-text-muted/30 uppercase tracking-[0.4em] px-0.5">
                      Build_Ref: TW-2026-X4
                    </div>
                  </div>
                </div>
              </aside>

              {/* Main MDX Content */}
              <div className="flex-1 min-w-0">
                {/* Module Intel Header */}
                <div className="mb-8 p-6 border border-white/5 bg-bg-card/30 relative overflow-hidden group shadow-xl">
                  <div className="absolute top-0 right-0 p-4 opacity-[0.03] pointer-events-none">
                    <Box className="w-48 h-48" />
                  </div>
                  <div className="flex items-center gap-4 mb-6 relative z-10">
                    <div className="p-2 border border-accent-glitch/20 bg-accent-glitch/5">
                      <Shield className="w-5 h-5 text-accent-glitch" />
                    </div>
                    <span className="text-[11px] font-mono uppercase tracking-[0.5em] text-white font-black">
                      Official_Module_Intelligence_Report
                    </span>
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-x-16 relative z-10">
                    <MDXComponents.SystemIntel
                      label="Module"
                      value={tool.name}
                    />
                    <MDXComponents.SystemIntel
                      label="Encryption"
                      value="AES_256_Unicode"
                    />
                    <MDXComponents.SystemIntel
                      label="Latency"
                      value="< 0.8ms"
                    />
                    <MDXComponents.SystemIntel
                      label="Status"
                      value="Fully Operational"
                    />
                    <MDXComponents.SystemIntel
                      label="Region"
                      value="Global Node"
                    />
                    <MDXComponents.SystemIntel
                      label="Integrity"
                      value="100.0% Verified"
                    />
                  </div>
                </div>

                <div
                  className="prose prose-invert max-w-none 
                  prose-h2:mt-8 prose-h2:mb-3 prose-h3:mt-6 prose-h3:mb-2
                  prose-p:font-mono prose-p:text-text-muted prose-p:leading-relaxed prose-p:text-base prose-p:my-2
                  prose-a:text-accent-glitch prose-a:no-underline hover:prose-a:underline
                  prose-strong:text-white prose-strong:font-black
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
        </div>
      )}
    </>
  );
}
