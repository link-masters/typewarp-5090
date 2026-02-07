import Link from "next/link";
import Image from "next/image";
import { categories } from "@/lib/categories";

// Internal link component for SEO-optimized linking
const InternalLink = ({ href, children, ...props }: any) => {
  const isInternal = href?.startsWith("/") || href?.startsWith("#");

  if (isInternal) {
    return (
      <Link
        href={href}
        className="text-red-500 hover:text-red-400 font-semibold transition-colors duration-200 inline-flex items-center gap-1"
        {...props}
      >
        {children}
        {!href?.startsWith("#") && (
          <svg
            className="w-3 h-3 opacity-50"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M13 7l5 5m0 0l-5 5m5-5H6"
            />
          </svg>
        )}
      </Link>
    );
  }

  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className="text-red-500 hover:text-red-400 font-semibold transition-colors duration-200 inline-flex items-center gap-1"
      {...props}
    >
      {children}
      <svg
        className="w-3 h-3 opacity-50"
        fill="none"
        stroke="currentColor"
        viewBox="0 0 24 24"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={2}
          d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"
        />
      </svg>
    </a>
  );
};

// Callout box for important notes
const Callout = ({
  type = "info",
  children,
}: {
  type?: "info" | "warning" | "tip" | "important";
  children: React.ReactNode;
}) => {
  const styles = {
    info: "bg-blue-500/10 border-blue-500/30 text-blue-400",
    warning: "bg-yellow-500/10 border-yellow-500/30 text-yellow-400",
    tip: "bg-green-500/10 border-green-500/30 text-green-400",
    important: "bg-red-500/10 border-red-500/30 text-red-400",
  };

  const icons = {
    info: "💡",
    warning: "⚠️",
    tip: "✨",
    important: "🔥",
  };

  return (
    <div
      className={`${styles[type]} border rounded-xl p-6 my-8 flex items-start gap-4`}
    >
      <span className="text-2xl">{icons[type]}</span>
      <div className="flex-1 [&>p]:mb-0 [&>p]:text-[var(--muted)]">
        {children}
      </div>
    </div>
  );
};

// Tool card for inline tool promotion
const ToolCard = ({ slug, category }: { slug: string; category: string }) => {
  const categoryData = categories.find((c) => c.slug === category);
  const tool = categoryData?.tools.find((t) => t.slug === slug);

  if (!tool) return null;

  return (
    <Link
      href={`/${category}/${slug}`}
      className="group block my-8 p-6 bg-gradient-to-br from-red-500/5 to-purple-500/5 border border-[var(--card-border)] rounded-2xl hover:border-red-500/50 transition-all duration-300"
    >
      <div className="flex items-center gap-4">
        <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-red-500/20 to-purple-500/20 flex items-center justify-center text-2xl group-hover:scale-110 transition-transform">
          {tool.icon}
        </div>
        <div className="flex-1">
          <h4 className="text-lg font-bold text-[var(--foreground)] group-hover:text-red-500 transition-colors">
            {tool.name}
          </h4>
          <p className="text-sm text-[var(--muted)]">
            Try it now - Free & instant results
          </p>
        </div>
        <svg
          className="w-6 h-6 text-[var(--muted)] group-hover:text-red-500 group-hover:translate-x-1 transition-all"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M17 8l4 4m0 0l-4 4m4-4H3"
          />
        </svg>
      </div>
    </Link>
  );
};

const MDXComponents = {
  // Note: h1 in MDX content is rendered as h2 to preserve single H1 per page (the page title)
  h1: (props: any) => (
    <h2
      {...props}
      id={props.children?.toString().toLowerCase().replace(/\s+/g, "-")}
      className="text-3xl md:text-4xl font-black text-[var(--foreground)] mt-16 mb-6 scroll-m-24 relative group"
    >
      <span className="absolute -left-6 text-red-500/0 group-hover:text-red-500/50 transition-colors">
        #
      </span>
      {props.children}
    </h2>
  ),
  h2: (props: any) => (
    <h2
      {...props}
      id={props.children?.toString().toLowerCase().replace(/\s+/g, "-")}
      className="text-2xl md:text-3xl font-bold text-[var(--foreground)] mt-14 mb-5 scroll-m-24 relative group flex items-center gap-3"
    >
      <span className="w-1.5 h-8 bg-gradient-to-b from-red-500 to-purple-500 rounded-full" />
      {props.children}
    </h2>
  ),
  h3: (props: any) => (
    <h3
      {...props}
      id={props.children?.toString().toLowerCase().replace(/\s+/g, "-")}
      className="text-xl md:text-2xl font-bold text-[var(--foreground)] mt-10 mb-4 scroll-m-24 relative group"
    >
      {props.children}
    </h3>
  ),
  h4: (props: any) => (
    <h4
      {...props}
      className="text-lg md:text-xl font-semibold text-[var(--foreground)] mt-8 mb-3 scroll-m-24"
    >
      {props.children}
    </h4>
  ),
  p: (props: any) => (
    <p
      {...props}
      className="text-[var(--muted)] leading-relaxed mb-6 text-lg"
    />
  ),
  ul: (props: any) => (
    <ul {...props} className="mb-6 space-y-3 text-[var(--muted)] ml-0" />
  ),
  ol: (props: any) => (
    <ol
      {...props}
      className="mb-6 space-y-3 text-[var(--muted)] ml-0 list-none counter-reset-[item]"
    />
  ),
  li: (props: any) => (
    <li {...props} className="flex items-start gap-3 pl-0">
      <span className="mt-2 w-2 h-2 rounded-full bg-red-500/50 shrink-0" />
      <span className="flex-1">{props.children}</span>
    </li>
  ),
  blockquote: (props: any) => (
    <blockquote
      {...props}
      className="border-l-4 border-red-500 pl-6 py-4 italic text-[var(--muted)] bg-red-500/5 rounded-r-xl my-8 text-lg"
    />
  ),
  pre: (props: any) => (
    <pre
      {...props}
      className="p-0 mb-8 rounded-2xl overflow-hidden shadow-2xl bg-[#0d0d0d] border border-[var(--card-border)]"
    />
  ),
  code: (props: any) => (
    <code
      {...props}
      className="bg-[var(--card-bg)] px-2 py-1 rounded-lg text-red-500 font-mono text-sm border border-[var(--card-border)]"
    />
  ),
  a: InternalLink,
  img: (props: any) => (
    <figure className="my-10">
      <div className="relative w-full h-[400px] rounded-2xl overflow-hidden shadow-xl border border-[var(--card-border)]">
        <Image
          {...props}
          fill
          className="object-cover"
          alt={props.alt || "Blog image"}
        />
      </div>
      {props.alt && (
        <figcaption className="text-center text-sm text-[var(--muted)] mt-4 italic">
          {props.alt}
        </figcaption>
      )}
    </figure>
  ),
  table: (props: any) => (
    <div className="overflow-x-auto my-8 rounded-2xl border border-[var(--card-border)]">
      <table {...props} className="w-full text-left" />
    </div>
  ),
  thead: (props: any) => (
    <thead
      {...props}
      className="bg-[var(--card-bg)] border-b border-[var(--card-border)]"
    />
  ),
  th: (props: any) => (
    <th
      {...props}
      className="px-6 py-4 font-bold text-[var(--foreground)] text-sm uppercase tracking-wider"
    />
  ),
  td: (props: any) => (
    <td
      {...props}
      className="px-6 py-4 text-[var(--muted)] border-b border-[var(--card-border)]"
    />
  ),
  hr: () => (
    <hr className="my-12 border-0 h-px bg-gradient-to-r from-transparent via-[var(--card-border)] to-transparent" />
  ),
  // Custom components
  Callout,
  ToolCard,
  InternalLink,
};

export default MDXComponents;
