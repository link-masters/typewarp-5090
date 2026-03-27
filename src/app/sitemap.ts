import { MetadataRoute } from "next";
import { categories } from "@/lib/categories";
import { getBlogPosts } from "@/lib/blog";
import { SITE_URL } from "@/lib/config";

// Use a stable build date instead of new Date() which changes on every request
// and makes Google ignore lastModified entirely
const LAST_CONTENT_UPDATE = new Date("2026-03-27");

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const baseUrl = SITE_URL;

  // 1. Static Routes
  const staticRoutes = [
    { route: "", priority: 1, changeFrequency: "weekly" as const },
    { route: "/collection", priority: 0.9, changeFrequency: "weekly" as const },
    { route: "/blog", priority: 0.8, changeFrequency: "weekly" as const },
    { route: "/about", priority: 0.7, changeFrequency: "monthly" as const },
    { route: "/contact", priority: 0.6, changeFrequency: "monthly" as const },
    { route: "/privacy", priority: 0.3, changeFrequency: "yearly" as const },
    { route: "/terms", priority: 0.3, changeFrequency: "yearly" as const },
    { route: "/gdpr", priority: 0.3, changeFrequency: "yearly" as const },
    { route: "/cookies", priority: 0.3, changeFrequency: "yearly" as const },
  ].map((item) => ({
    url: `${baseUrl}${item.route}`,
    lastModified: LAST_CONTENT_UPDATE,
    changeFrequency: item.changeFrequency,
    priority: item.priority,
  }));

  // 2. Category Routes
  const categoryRoutes = categories.map((cat) => ({
    url: `${baseUrl}/${cat.slug}`,
    lastModified: LAST_CONTENT_UPDATE,
    changeFrequency: "weekly" as const,
    priority: 0.9,
  }));

  // 3. Tool Routes (deduplicated — each tool slug only appears once, from its first/canonical category)
  const seenToolSlugs = new Set<string>();
  const toolRoutes = categories.flatMap((cat) =>
    cat.tools
      .filter((tool) => {
        if (seenToolSlugs.has(tool.slug)) return false;
        seenToolSlugs.add(tool.slug);
        return true;
      })
      .map((tool) => ({
        url: `${baseUrl}/${cat.slug}/${tool.slug}`,
        lastModified: LAST_CONTENT_UPDATE,
        changeFrequency: "weekly" as const,
        priority: 0.8,
      })),
  );

  // 4. Blog Posts — use actual publish date
  const posts = await getBlogPosts();
  const blogRoutes = posts.map((post) => ({
    url: `${baseUrl}/blog/${post.slug}`,
    lastModified: new Date(post.date),
    changeFrequency: "monthly" as const,
    priority: 0.7,
  }));

  return [...staticRoutes, ...categoryRoutes, ...toolRoutes, ...blogRoutes];
}
