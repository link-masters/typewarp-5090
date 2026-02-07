import { categories } from "@/lib/categories";
import Link from "next/link";
import { ToolIcon } from "@/components/ToolIcon";

export const metadata = {
  title: "All Tools | TypeWarp",
  description:
    "Browse our complete collection of 50+ text transformation tools.",
};

export default function TextToolsPage() {
  const allTools = categories.flatMap((category) =>
    category.tools.map((tool) => ({ ...tool, category })),
  );

  return (
    <div className="min-h-screen pt-32 pb-20 bg-zinc-50 dark:bg-[var(--background)]">
      <div className="container mx-auto px-4 max-w-7xl">
        <header className="text-center mb-10 md:mb-16">
          <h1 className="text-4xl md:text-6xl font-black mb-4 md:mb-6 tracking-tighter text-[var(--foreground)] animate-fade-in-up uppercase">
            The Complete <span className="text-red-500">Arsenal</span>
          </h1>
          <p className="text-[var(--muted)] text-lg md:text-xl max-w-3xl mx-auto animate-fade-in-up animation-delay-200">
            Explore our entire suite of text manipulation engines. From
            aesthetic generators to low-level data converters.
          </p>
        </header>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {allTools.map((tool, index) => (
            <Link
              key={tool.slug}
              href={`/${tool.category.slug}/${tool.slug}`}
              className={`group relative p-6 sm:p-8 rounded-[1.5rem] bg-white dark:bg-[var(--card-bg)] border border-zinc-200 dark:border-[var(--card-border)] hover:border-red-500/30 transition-all duration-300 hover:-translate-y-1.5 shadow-[0_4px_20px_rgba(0,0,0,0.04)] dark:shadow-none hover:shadow-[0_12px_30px_rgba(0,0,0,0.08)] dark:hover:shadow-none animate-fade-in-up`}
              style={{ animationDelay: `${index * 50}ms` }}
            >
              <div className="flex items-start gap-6">
                <div className="w-16 h-16 shrink-0 rounded-xl bg-zinc-50 dark:bg-[var(--background)] border border-zinc-100 dark:border-[var(--card-border)] flex items-center justify-center text-4xl group-hover:scale-110 group-hover:rotate-6 transition-all duration-300 overflow-hidden shadow-inner">
                  <ToolIcon
                    slug={tool.slug}
                    categorySlug={tool.category.slug}
                    className="w-8 h-8 text-red-500"
                  />
                </div>
                <div>
                  <h3 className="text-xl font-black mb-2 text-[var(--foreground)] uppercase tracking-tight">
                    {tool.name}
                  </h3>
                  <div className="inline-block px-3 py-1 rounded-full bg-zinc-50 dark:bg-[var(--background)] border border-zinc-100 dark:border-[var(--card-border)] text-[10px] font-bold text-[var(--muted)] uppercase tracking-widest mb-3">
                    {tool.category.name}
                  </div>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}
