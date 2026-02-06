import { getBlogPosts } from "@/lib/blog";
import BlogCard from "@/components/BlogCard";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Blog | TypeWarp - Insights on Typography & Design",
  description:
    "Explore our latest articles on text transformation, unicode manipulation, and design innovation. Stay updated with TypeWarp.",
  keywords: [
    "typography blog",
    "font design",
    "text transformation articles",
    "unicode guide",
    "typewarp",
  ],
  openGraph: {
    title: "Blog | TypeWarp",
    description:
      "Explore deep dives into the art of text manipulation, typography trends, and design innovation.",
    url: "https://typewarp.com/blog",
    type: "website",
    images: [
      {
        url: "/blog/mastering-text-transformation.png",
        width: 1200,
        height: 630,
        alt: "TypeWarp Blog",
      },
    ],
  },
  alternates: {
    canonical: "https://typewarp.com/blog",
  },
};

export default async function BlogPage() {
  const posts = await getBlogPosts();

  return (
    <div className="min-h-screen pt-32 pb-20 px-4 md:px-8">
      <div className="max-w-7xl mx-auto">
        <header className="text-center mb-16">
          <h1 className="text-5xl md:text-7xl font-black text-[var(--foreground)] mb-6 animate-fade-in">
            Our{" "}
            <span className="bg-gradient-to-r from-red-500 to-orange-400 bg-clip-text text-transparent">
              Blog
            </span>
          </h1>
          <p className="text-xl text-[var(--muted)] max-w-2xl mx-auto">
            Deep dives into the art of text manipulation, typography trends, and
            design innovation.
          </p>
        </header>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {posts.map((post) => (
            <BlogCard key={post.slug} post={post} />
          ))}
        </div>

        {posts.length === 0 && (
          <div className="text-center py-20">
            <p className="text-[var(--muted)] text-lg">
              No posts found yet. Stay tuned!
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
