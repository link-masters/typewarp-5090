import { MetadataRoute } from "next";
import { categories } from "@/lib/categories";
import { getBlogPosts } from "@/lib/blog";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const baseUrl = "https://typewarp.com"; // Replace with your actual domain

  // 1. Static Routes
  const staticRoutes = [
    "",
    "/blog",
    "/about",
    "/text-tools",
    "/privacy",
    "/terms",
    "/gdpr",
    "/cookies",
    "/contact",
  ].map((route) => ({
    url: `${baseUrl}${route}`,
    lastModified: new Date(),
    changeFrequency: "monthly" as const,
    priority: route === "" ? 1 : 0.8,
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
