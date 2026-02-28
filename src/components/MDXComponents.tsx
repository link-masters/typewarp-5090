import React from "react";
import Link from "next/link";
import Image from "next/image";
import { categories } from "@/lib/categories";
import { ToolIcon } from "@/components/ToolIcon";
import {
  Info,
  AlertTriangle,
  Lightbulb,
  Flame,
  ArrowRight,
  ChevronRight,
  HelpCircle,
  ExternalLink,
} from "lucide-react";

// Internal link component for SEO-optimized linking
const InternalLink = ({ href, children, ...props }: any) => {
  const isInternal = href?.startsWith("/") || href?.startsWith("#");

  if (isInternal) {
    return (
      <Link
        href={href}
        className="text-accent-glitch hover:text-white font-bold transition-colors duration-300 inline-flex items-center gap-1.5 group border-b border-accent-glitch/20 hover:border-accent-glitch/60 pb-0.5"
        {...props}
      >
        {children}
        {!href?.startsWith("#") && (
          <ArrowRight className="w-3.5 h-3.5 opacity-50 group-hover:translate-x-1 transition-transform" />
        )}
      </Link>
    );
  }

  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className="text-accent-glitch hover:text-white font-bold transition-colors duration-300 inline-flex items-center gap-1.5 group border-b border-accent-glitch/20 hover:border-accent-glitch/60 pb-0.5"
      {...props}
    >
      {children}
      <ExternalLink className="w-3 h-3 opacity-50 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
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
    info: "border-blue-400/20 bg-blue-500/[0.04]",
    warning: "border-yellow-400/20 bg-yellow-500/[0.04]",
    tip: "border-accent-glitch/20 bg-accent-glitch/[0.04]",
    important: "border-red-400/20 bg-red-500/[0.04]",
  };

  const iconStyles = {
    info: "text-blue-400 bg-blue-500/10 border-blue-500/20",
    warning: "text-yellow-400 bg-yellow-500/10 border-yellow-500/20",
    tip: "text-accent-glitch bg-accent-glitch/10 border-accent-glitch/20",
    important: "text-red-400 bg-red-500/10 border-red-500/20",
  };

  const icons = {
    info: <Info className="w-4 h-4" />,
    warning: <AlertTriangle className="w-4 h-4" />,
    tip: <Lightbulb className="w-4 h-4" />,
    important: <Flame className="w-4 h-4" />,
  };

  const labels = {
    info: "Information",
    warning: "Warning",
    tip: "Pro Tip",
    important: "Important",
  };

  return (
    <div
      className={`${styles[type]} border rounded-xl p-6 my-8 relative overflow-hidden`}
    >
      <div className="flex items-start gap-4">
        <div
          className={`${iconStyles[type]} shrink-0 w-9 h-9 rounded-lg border flex items-center justify-center`}
        >
          {icons[type]}
        </div>
        <div className="flex-1 min-w-0">
          <span
            className={`text-[10px] font-black uppercase tracking-widest mb-2 block ${
              type === "info"
                ? "text-blue-400"
                : type === "warning"
                  ? "text-yellow-400"
                  : type === "tip"
                    ? "text-accent-glitch"
                    : "text-red-400"
            }`}
          >
            {labels[type]}
          </span>
          <div className="text-sm font-mono leading-relaxed text-white/60 [&>p]:mb-0">
            {children}
          </div>
        </div>
      </div>
    </div>
  );
};

// Tool card for inline tool promotion
const InlineToolCard = ({
  slug,
  category,
}: {
  slug: string;
  category: string;
}) => {
  const categoryData = categories.find((c) => c.slug === category);
  const tool = categoryData?.tools.find((t) => t.slug === slug);

  if (!tool) return null;

  return (
    <Link
      href={`/${category}/${slug}`}
      className="group block my-8 p-5 bg-[#0c0c0c] border border-white/5 rounded-xl relative overflow-hidden transition-all duration-500 hover:border-accent-glitch/20"
    >
      <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none bg-[radial-gradient(circle_at_50%_0%,rgba(57,255,20,0.02)_0%,transparent_70%)]" />
      <div className="flex items-center gap-4 relative z-10">
        <div className="w-12 h-12 bg-[#111] border border-white/10 rounded-lg flex items-center justify-center group-hover:border-accent-glitch/30 group-hover:scale-105 transition-all duration-500">
          <ToolIcon
            slug={tool.slug}
            categorySlug={category}
            className="w-6 h-6 text-white/20 group-hover:text-accent-glitch transition-colors duration-500"
          />
        </div>
        <div className="flex-1 min-w-0">
          <p className="text-[10px] font-mono text-white/20 uppercase tracking-widest mb-1">
            Try this tool
          </p>
          <h4 className="text-sm font-black text-white group-hover:text-accent-glitch transition-colors uppercase tracking-wider">
            {tool.name}
          </h4>
        </div>
        <ChevronRight className="w-5 h-5 text-white/10 group-hover:text-accent-glitch group-hover:translate-x-1 transition-all duration-300" />
      </div>
    </Link>
  );
};

const FAQ = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="my-12 bg-[#0c0c0c] border border-white/5 rounded-xl relative overflow-hidden">
      <div className="absolute inset-0 pointer-events-none bg-[radial-gradient(circle_at_50%_0%,rgba(57,255,20,0.02)_0%,transparent_70%)]" />
      <div className="relative z-10">
        {/* Header */}
        <div className="px-6 py-4 border-b border-white/5 flex items-center gap-3">
          <div className="w-8 h-8 bg-[#111] border border-white/10 rounded-lg flex items-center justify-center">
            <HelpCircle className="w-4 h-4 text-accent-glitch" />
          </div>
          <div>
            <h3 className="text-xs font-black uppercase tracking-wider text-white">
              Frequently Asked Questions
            </h3>
            <p className="text-[9px] font-mono text-white/20 uppercase tracking-widest">
              Common Queries
            </p>
          </div>
        </div>
        {/* Content */}
        <div className="p-6 md:p-8 space-y-6">{children}</div>
      </div>
    </div>
  );
};

const FAQItem = ({ q, children }: { q: string; children: React.ReactNode }) => {
  return (
    <div className="py-4 border-b border-white/5">
      <h4 className="text-sm font-mono font-bold text-white leading-relaxed mb-2 before:content-['Q'] before:inline-flex before:items-center before:justify-center before:w-6 before:h-6 before:bg-accent-glitch/10 before:text-accent-glitch before:rounded before:text-[10px] before:mr-3">
        {q}
      </h4>
      <div className="pl-9 text-white/50 font-mono text-[13px] leading-[1.8] [&>p]:mb-0">
        {children}
      </div>
    </div>
  );
};

// Professional system intel box
const SystemIntel = ({ label, value }: { label: string; value: string }) => (
  <div className="flex items-center gap-4 py-3 border-b border-white/5 font-mono text-xs">
    <span className="text-white/30 uppercase tracking-widest font-bold">
      {label}
    </span>
    <span className="ml-auto text-accent-glitch font-black uppercase tracking-widest">
      {value}
    </span>
  </div>
);

const MDXComponents = {
  h1: (props: any) => (
    <h2
      {...props}
      className="text-lg sm:text-xl md:text-3xl font-black text-white tracking-tight uppercase leading-tight break-words mb-4 mt-4 border-b border-accent-glitch/20 pb-4"
    />
  ),
  h2: (props: any) => {
    const id = props.children?.toString().toLowerCase().replace(/\\s+/g, "-");
    return (
      <h2
        {...props}
        id={id}
        className="text-base sm:text-lg md:text-2xl font-black text-white tracking-tight uppercase leading-tight break-words mt-16 mb-8 border-b border-white/10 pb-4"
      />
    );
  },
  h3: (props: any) => {
    const id = props.children?.toString().toLowerCase().replace(/\\s+/g, "-");
    return (
      <h3
        {...props}
        id={id}
        className="text-sm sm:text-base md:text-lg font-black text-white mt-10 mb-5 tracking-wide uppercase before:content-[''] before:inline-block before:w-1.5 before:h-4 before:bg-accent-glitch/60 before:mr-3 before:align-middle"
      />
    );
  },
  p: (props: any) => {
    // Detect if child is an image/figure to avoid invalid p > figure nesting
    const children = React.Children.toArray(props.children);
    const hasBlockChild = children.some(
      (child: any) =>
        child?.type === "img" ||
        (child?.props &&
          (child.props.mdxType === "img" ||
            child.props.originalType === "img")) ||
        (typeof child?.type === "function" &&
          (child.type.name === "img" || child.type.displayName === "img")),
    );

    if (hasBlockChild) {
      return <div className="my-10">{props.children}</div>;
    }

    return (
      <p
        {...props}
        className="text-white/50 font-mono leading-[1.8] mb-6 text-[14px] md:text-[15px]"
      />
    );
  },
  ul: (props: any) => (
    <ul {...props} className="mb-8 space-y-3 font-mono text-sm text-white/50" />
  ),
  ol: (props: any) => (
    <ol {...props} className="mb-8 space-y-3 font-mono text-sm text-white/50" />
  ),
  li: (props: any) => (
    <li
      {...props}
      className="relative pl-6 py-1 leading-relaxed text-white/60 before:content-[''] before:absolute before:left-0 before:top-3 before:w-1.5 before:h-1.5 before:bg-accent-glitch/40 before:rounded-full"
    />
  ),
  blockquote: (props: any) => (
    <blockquote
      {...props}
      className="border-l-2 border-accent-glitch/40 py-4 px-5 font-mono italic text-white/70 bg-accent-glitch/[0.03] my-8 text-base rounded-r-xl"
    />
  ),
  pre: (props: any) => (
    <pre
      {...props}
      className="p-6 mb-8 bg-[#0c0c0c] border border-white/5 rounded-xl font-mono text-xs overflow-x-auto custom-scrollbar"
    />
  ),
  code: (props: any) => (
    <code
      {...props}
      className="bg-white/5 px-2 py-1 text-accent-glitch font-mono text-xs border border-white/5 rounded-md"
    />
  ),
  a: InternalLink,
  img: (props: any) => (
    <figure className="my-12 group">
      <div className="relative w-full aspect-video border border-white/5 rounded-xl overflow-hidden">
        <Image
          {...props}
          width={1920}
          height={1080}
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 800px"
          className="w-full h-full object-cover grayscale opacity-50 group-hover:opacity-100 group-hover:grayscale-0 transition-all duration-1000"
          alt={props.alt || "Visual reference"}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-bg-void/60 to-transparent" />
      </div>
      {props.alt && (
        <figcaption className="text-center text-[10px] font-mono uppercase tracking-widest text-white/20 mt-4">
          {props.alt}
        </figcaption>
      )}
    </figure>
  ),
  table: (props: any) => (
    <div className="overflow-x-auto my-10 border border-white/5 bg-[#0c0c0c] rounded-xl">
      <table {...props} className="w-full text-left font-mono text-sm" />
    </div>
  ),
  thead: (props: any) => (
    <thead {...props} className="bg-white/[0.03] border-b border-white/10" />
  ),
  th: (props: any) => (
    <th
      {...props}
      className="px-6 py-4 font-black text-white text-xs uppercase tracking-wider"
    />
  ),
  td: (props: any) => (
    <td
      {...props}
      className="px-6 py-4 text-white/50 border-b border-white/5 text-sm"
    />
  ),
  hr: () => (
    <div className="my-16 flex items-center gap-4">
      <div className="flex-1 h-[1px] bg-gradient-to-r from-transparent via-white/10 to-transparent" />
      <div className="w-1.5 h-1.5 rounded-full bg-white/10" />
      <div className="flex-1 h-[1px] bg-gradient-to-r from-transparent via-white/10 to-transparent" />
    </div>
  ),
  // Custom components
  Callout,
  ToolCard: InlineToolCard,
  InternalLink,
  FAQ,
  FAQItem,
  SystemIntel,
};

export default MDXComponents;
