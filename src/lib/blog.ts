import fs from "fs";
import path from "path";
import matter from "gray-matter";
import { cache } from "react"; // For App Router performance

const BLOG_DIR = path.join(process.cwd(), "src/content/blog");

export interface BlogPost {
  slug: string;
  title: string;
  date: string;
  description: string;
  content: string;
  image: string;
  category: string;
  author: string;
  tags: string[];
}

export const getBlogPosts = cache(async (): Promise<BlogPost[]> => {
  try {
    if (!fs.existsSync(BLOG_DIR)) return [];

    const files = fs.readdirSync(BLOG_DIR);

    return files
      .filter((file) => file.endsWith(".mdx"))
      .map((file) => {
        const filePath = path.join(BLOG_DIR, file);
        const fileContent = fs.readFileSync(filePath, "utf8");
        const { data, content } = matter(fileContent);

        return {
          slug: file.replace(".mdx", ""),
          content,
          title: data.title || "Untitled Post",
          date: data.date || new Date().toISOString(),
          description: data.description || "",
          image: data.image || "/blog/placeholder.jpg",
          category: data.category || "General",
          author: data.author || "Admin",
          tags: data.tags || [],
        } as BlogPost;
      })
      .sort((a, b) => {
        // Safer date sorting
        return new Date(b.date).getTime() - new Date(a.date).getTime();
      });
  } catch (error) {
    console.error("Error fetching blog posts:", error);
    return [];
  }
});

export const getBlogPost = cache(
  async (slug: string): Promise<BlogPost | null> => {
    try {
      const filePath = path.join(BLOG_DIR, `${slug}.mdx`);
      if (!fs.existsSync(filePath)) return null;

      const fileContent = fs.readFileSync(filePath, "utf8");
      const { data, content } = matter(fileContent);

      return {
        slug,
        content,
        title: data.title || "Untitled Post",
        date: data.date || "",
        description: data.description || "",
        image: data.image || "/blog/placeholder.jpg",
        category: data.category || "General",
        author: data.author || "Admin",
        tags: data.tags || [],
      } as BlogPost;
    } catch (error) {
      return null;
    }
  },
);
