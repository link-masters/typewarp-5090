import { MetadataRoute } from "next";
import { categories } from "@/lib/categories";
import { getBlogPosts } from "@/lib/blog";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const baseUrl = "https://www.typewarp.com"; // Replace with your actual domain

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
    lastModified: new Date(),
    changeFrequency: item.changeFrequency,
    priority: item.priority,
  }));

  // 2. Category Routes
  const categoryRoutes = categories.map((cat) => ({
    url: `${baseUrl}/${cat.slug}`,
    lastModified: new Date(),
    changeFrequency: "weekly" as const,
    priority: 0.9,
  }));

  // 3. Tool Routes
  const toolRoutes = categories.flatMap((cat) =>
    cat.tools.map((tool) => ({
      url: `${baseUrl}/${cat.slug}/${tool.slug}`,
      lastModified: new Date(),
      changeFrequency: "weekly" as const,
      priority: 0.9, // High priority for tools as they are the main product
    })),
  );

  // 4. Blog Posts
  const posts = await getBlogPosts();
  const blogRoutes = posts.map((post) => ({
    url: `${baseUrl}/blog/${post.slug}`,
    lastModified: new Date(post.date),
    changeFrequency: "monthly" as const,
    priority: 0.7,
  }));

  return [...staticRoutes, ...categoryRoutes, ...toolRoutes, ...blogRoutes];
}
