import { categories } from "@/lib/categories";
import { getBlogPosts } from "@/lib/blog";
import { Metadata } from "next";
import Link from "next/link";
import { SITE_URL } from "@/lib/config";

export const metadata: Metadata = {
  title: "Sitemap",
  description: "Complete list of all pages on TypeWarp — text tools, categories, blog posts, and more.",
  robots: { index: true, follow: true },
  alternates: { canonical: `${SITE_URL}/all-tools` },
};

export default async function HTMLSitemapPage() {
  const posts = await getBlogPosts();

  return (
    <div className="min-h-screen pt-6 pb-24 bg-bg-void light:bg-white text-text-primary">
      <div className="container mx-auto max-w-4xl px-6">
        <h1 className="text-4xl font-black uppercase tracking-tighter mb-4">Sitemap</h1>
        <p className="text-text-muted mb-12">Complete list of all pages on TypeWarp.</p>

        {/* Tools */}
        <section className="mb-16">
          <h2 className="text-xl font-black uppercase tracking-tighter mb-6 border-b border-border-subtle pb-3">Text Tools</h2>
          {categories.map((cat) => (
            <div key={cat.slug} className="mb-8">
              <h3 className="text-lg font-bold mb-3">
                <Link href={`/${cat.slug}`} className="hover:text-accent-glitch transition-colors">
                  {cat.icon} {cat.name}
                </Link>
                <span className="text-text-muted text-sm font-normal ml-2">({cat.tools.length} tools)</span>
              </h3>
              <ul className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-1 pl-4">
                {cat.tools.map((tool) => (
                  <li key={tool.slug}>
                    <Link
                      href={`/${cat.slug}/${tool.slug}`}
                      className="text-text-muted hover:text-accent-glitch text-sm transition-colors"
                    >
                      {tool.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </section>

        {/* Blog */}
        <section className="mb-16">
          <h2 className="text-xl font-black uppercase tracking-tighter mb-6 border-b border-border-subtle pb-3">Blog</h2>
          <ul className="space-y-2 pl-4">
            {posts.map((post) => (
              <li key={post.slug}>
                <Link href={`/blog/${post.slug}`} className="text-text-muted hover:text-accent-glitch text-sm transition-colors">
                  {post.title}
                </Link>
              </li>
            ))}
          </ul>
        </section>

        {/* Pages */}
        <section className="mb-16">
          <h2 className="text-xl font-black uppercase tracking-tighter mb-6 border-b border-border-subtle pb-3">Pages</h2>
          <ul className="space-y-2 pl-4">
            {[
              { href: "/", label: "Home" },
              { href: "/collection", label: "Collection — All Tools" },
              { href: "/blog", label: "Blog" },
              { href: "/about", label: "About" },
              { href: "/contact", label: "Contact" },
              { href: "/privacy", label: "Privacy Policy" },
              { href: "/terms", label: "Terms of Service" },
              { href: "/gdpr", label: "GDPR" },
              { href: "/cookies", label: "Cookie Policy" },
            ].map((page) => (
              <li key={page.href}>
                <Link href={page.href} className="text-text-muted hover:text-accent-glitch text-sm transition-colors">
                  {page.label}
                </Link>
              </li>
            ))}
          </ul>
        </section>
      </div>
    </div>
  );
}
