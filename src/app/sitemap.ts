import { MetadataRoute } from "next";
import { categories } from "@/lib/categories";
import { getBlogPosts } from "@/lib/blog";
import { SITE_URL } from "@/lib/config";

// Stable build date — prevents Google from ignoring lastModified
// Never use new Date() here as it changes on every request
const LAST_CONTENT_UPDATE = new Date("2026-03-27");

// Duplicate slugs excluded from sitemap — canonical version already included
const EXCLUDED_TOOL_SLUGS = new Set([
  "old-english",   // duplicate of old-english-font
  "upside-down",   // duplicate of upside-down-text
]);

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const baseUrl = SITE_URL;

  // 1. Static routes
  const staticRoutes = [
    { route: "",            priority: 1.0, changeFrequency: "weekly"  as const },
    { route: "/collection", priority: 0.9, changeFrequency: "weekly"  as const },
    { route: "/blog",       priority: 0.8, changeFrequency: "weekly"  as const },
    { route: "/about",      priority: 0.6, changeFrequency: "monthly" as const },
    { route: "/contact",    priority: 0.5, changeFrequency: "monthly" as const },
    // Legal pages: minimal priority so Google focuses crawl budget on tools/blog
    { route: "/privacy",    priority: 0.1, changeFrequency: "never"   as const },
    { route: "/terms",      priority: 0.1, changeFrequency: "never"   as const },
    { route: "/gdpr",       priority: 0.1, changeFrequency: "never"   as const },
    { route: "/cookies",    priority: 0.1, changeFrequency: "never"   as const },
  ].map((item) => ({
    url: `${baseUrl}${item.route}`,
    lastModified: LAST_CONTENT_UPDATE,
    changeFrequency: item.changeFrequency,
    priority: item.priority,
  }));

  // 2. Tool routes — tools first, highest priority, deduped
  const seenToolSlugs = new Set<string>();
  const toolRoutes = categories.flatMap((cat) =>
    cat.tools
      .filter((tool) => {
        if (seenToolSlugs.has(tool.slug)) return false;
        seenToolSlugs.add(tool.slug);
        if (EXCLUDED_TOOL_SLUGS.has(tool.slug)) return false;
        return true;
      })
      .map((tool) => ({
        url: `${baseUrl}/${cat.slug}/${tool.slug}`,
        lastModified: LAST_CONTENT_UPDATE,
        changeFrequency: "weekly" as const,
        priority: 0.9,
      })),
  );

  // 3. Category routes — index pages, lower priority than tools
  const categoryRoutes = categories.map((cat) => ({
    url: `${baseUrl}/${cat.slug}`,
    lastModified: LAST_CONTENT_UPDATE,
    changeFrequency: "monthly" as const,
    priority: 0.6,
  }));

  // 4. Blog routes — use real per-post publish date from frontmatter
  const posts = await getBlogPosts();
  const blogRoutes = posts.map((post) => ({
    url: `${baseUrl}/blog/${post.slug}`,
    lastModified: new Date(post.date),
    changeFrequency: "monthly" as const,
    priority: 0.7,
  }));

  // Output order matters — Google crawls top-to-bottom
  // Tools come first so they get crawled before categories when budget is limited
  return [
    ...staticRoutes,
    ...toolRoutes,
    ...categoryRoutes,
    ...blogRoutes,
  ];
}
