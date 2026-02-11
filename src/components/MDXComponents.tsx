import Link from "next/link";
import Image from "next/image";
import { categories } from "@/lib/categories";
import { ToolIcon } from "@/components/ToolIcon";
import {
  Terminal,
  Zap,
  Info,
  AlertTriangle,
  Lightbulb,
  Flame,
  ArrowRight,
  ChevronRight,
  HelpCircle,
  Cpu,
  Shield,
  Activity,
  Box,
} from "lucide-react";

// Internal link component for SEO-optimized linking
const InternalLink = ({ href, children, ...props }: any) => {
  const isInternal = href?.startsWith("/") || href?.startsWith("#");

  if (isInternal) {
    return (
      <Link
        href={href}
        className="text-accent-glitch hover:text-white font-black transition-colors duration-200 inline-flex items-center gap-1 group"
        {...props}
      >
        {children}
        {!href?.startsWith("#") && (
          <ArrowRight className="w-3 h-3 opacity-50 group-hover:translate-x-1 transition-transform" />
        )}
      </Link>
    );
  }

  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className="text-accent-glitch hover:text-white font-black transition-colors duration-200 inline-flex items-center gap-1 group"
      {...props}
    >
      {children}
      <ArrowRight className="w-3 h-3 opacity-50 group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
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
    info: "border-blue-500/20 bg-blue-500/5 text-blue-400",
    warning: "border-yellow-500/20 bg-yellow-500/5 text-yellow-400",
    tip: "border-accent-glitch/20 bg-accent-glitch/5 text-accent-glitch",
    important: "border-red-500/20 bg-red-500/5 text-red-400",
  };

  const icons = {
    info: <Info className="w-5 h-5" />,
    warning: <AlertTriangle className="w-5 h-5" />,
    tip: <Lightbulb className="w-5 h-5" />,
    important: <Flame className="w-5 h-5" />,
  };

  return (
    <div
      className={`${styles[type]} border p-6 my-8 flex items-start gap-5 font-mono relative overflow-hidden`}
    >
      <div className="shrink-0">{icons[type]}</div>
      <div className="flex-1 text-sm leading-relaxed [&>p]:mb-0">
        {children}
      </div>
      <div className="absolute top-0 right-0 p-2 opacity-10 text-[9px] uppercase font-black tracking-widest">
        {type}
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
      className="group block my-8 p-6 bg-bg-card border border-white/5 relative overflow-hidden transition-all duration-300 hover:border-accent-glitch/30"
    >
      <div className="flex items-center gap-5 relative z-10">
        <div className="w-14 h-14 bg-white/5 border border-white/10 flex items-center justify-center text-2xl group-hover:bg-accent-glitch/5 group-hover:border-accent-glitch/20 transition-all">
          <ToolIcon
            slug={tool.slug}
            categorySlug={category}
            className="w-7 h-7 text-white/10 group-hover:text-accent-glitch group-hover:opacity-100 transition-opacity"
          />
        </div>
        <div className="flex-1 font-mono">
          <div className="text-[8px] text-text-muted/40 uppercase tracking-[0.4em] mb-1.5">
            INITIALIZE_MODULE
          </div>
          <h4 className="text-lg font-black text-white group-hover:text-accent-glitch transition-colors uppercase tracking-widest">
            {tool.name}
          </h4>
        </div>
        <ChevronRight className="w-6 h-6 text-white/5 group-hover:text-accent-glitch group-hover:translate-x-1 transition-all" />
      </div>
      <div className="absolute top-0 left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-accent-glitch/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
    </Link>
  );
};

const FAQ = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="my-10 border border-white/5 bg-bg-card relative overflow-hidden group">
      <div className="absolute top-0 left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-accent-glitch/20 to-transparent" />
      <div className="bg-white/[0.02] px-5 py-3 border-b border-white/5 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Cpu className="w-3.5 h-3.5 text-accent-glitch" />
          <span className="text-[10px] font-mono uppercase tracking-[0.5em] text-accent-glitch font-black">
            System_Intelligence_Matrix // FAQ
          </span>
        </div>
        <div className="flex gap-1.5 opacity-30">
          <div className="w-2.5 h-2.5 rounded-full border border-white/40" />
          <div className="w-2.5 h-2.5 rounded-full border border-white/40" />
          <div className="w-2.5 h-2.5 rounded-full border border-white/40" />
        </div>
      </div>
      <div className="p-6 md:p-8 font-mono text-sm leading-relaxed space-y-8">
        {children}
      </div>
      <div className="absolute bottom-0 right-0 p-2 opacity-[0.01] pointer-events-none">
        <Terminal className="w-20 h-20" />
      </div>
    </div>
  );
};

const FAQItem = ({ q, children }: { q: string; children: React.ReactNode }) => {
  return (
    <div className="space-y-3 relative group/item">
      <div className="flex gap-4">
        <div className="shrink-0 w-10 h-10 border border-accent-glitch/15 bg-accent-glitch/5 flex items-center justify-center font-black text-accent-glitch text-[10px]">
          [Q]
        </div>
        <h4 className="text-white font-black uppercase tracking-widest leading-relaxed pt-2.5 flex-1 text-xs md:text-sm">
          {q}
        </h4>
      </div>
      <div className="flex gap-4">
        <div className="shrink-0 w-10 h-10 flex items-center justify-center font-black text-white/5 text-[10px]">
          [A]
        </div>
        <div className="text-text-muted flex-1 pt-2.5 leading-relaxed border-l border-white/5 pl-5 ml-5 md:ml-0 text-[13px] md:text-sm">
          {children}
        </div>
      </div>
    </div>
  );
};

// Professional system intel box
const SystemIntel = ({ label, value }: { label: string; value: string }) => (
  <div className="flex items-center gap-4 py-3 border-b border-white/5 font-mono text-[10px] group/intel">
    <span className="text-text-muted/40 uppercase tracking-[0.2em]">
      {label}
    </span>
    <div className="flex-1 h-[1px] bg-white/[0.03] group-hover/intel:bg-accent-glitch/20 transition-colors" />
    <span className="text-accent-glitch font-black uppercase tracking-widest">
      {value}
    </span>
  </div>
);

const MDXComponents = {
  h1: (props: any) => (
    <h2
      {...props}
      className="text-2xl md:text-4xl font-black text-white mt-16 mb-8 tracking-tighter uppercase leading-tight"
    >
      {props.children}
    </h2>
  ),
  h2: (props: any) => (
    <h2
      {...props}
      id={props.children?.toString().toLowerCase().replace(/\s+/g, "-")}
      className="text-xl md:text-2xl font-black text-white mt-12 mb-6 tracking-tighter uppercase flex items-center gap-4 group"
    >
      <div className="w-1.5 h-6 bg-accent-glitch opacity-0 group-hover:opacity-100 transition-opacity" />
      {props.children}
    </h2>
  ),
  h3: (props: any) => (
    <h3
      {...props}
      id={props.children?.toString().toLowerCase().replace(/\s+/g, "-")}
      className="text-lg md:text-xl font-black text-white mt-8 mb-4 tracking-widest uppercase font-mono"
    >
      {props.children}
    </h3>
  ),
  p: (props: any) => (
    <p
      {...props}
      className="text-text-muted font-mono leading-relaxed mb-8 text-base"
    />
  ),
  ul: (props: any) => (
    <ul
      {...props}
      className="mb-10 space-y-4 font-mono text-sm text-text-muted"
    />
  ),
  ol: (props: any) => (
    <ol
      {...props}
      className="mb-10 space-y-4 font-mono text-sm text-text-muted"
    />
  ),
  li: (props: any) => (
    <li {...props} className="flex items-start gap-4 group/li py-1">
      <div className="mt-1.5 w-1.5 h-1.5 bg-accent-glitch shrink-0 opacity-40 group-hover/li:opacity-100 transition-opacity" />
      <span className="flex-1 transition-colors group-hover/li:text-white">
        {props.children}
      </span>
    </li>
  ),
  blockquote: (props: any) => (
    <blockquote
      {...props}
      className="border-l-2 border-accent-glitch p-8 font-mono italic text-text-primary bg-accent-glitch/5 my-12 text-lg relative"
    >
      <Terminal className="absolute top-2 right-2 w-4 h-4 text-accent-glitch/20" />
      {props.children}
    </blockquote>
  ),
  pre: (props: any) => (
    <pre
      {...props}
      className="p-8 mb-12 bg-bg-card border border-white/5 font-mono text-xs overflow-x-auto custom-scrollbar"
    />
  ),
  code: (props: any) => (
    <code
      {...props}
      className="bg-white/5 px-1.5 py-0.5 text-accent-glitch font-mono text-xs border border-white/5"
    />
  ),
  a: InternalLink,
  img: (props: any) => (
    <figure className="my-16 group">
      <div className="relative w-full aspect-video border border-white/5 overflow-hidden">
        <Image
          {...props}
          fill
          className="object-cover grayscale opacity-50 group-hover:opacity-100 group-hover:grayscale-0 transition-all duration-1000"
          alt={props.alt || "Systems Intel Detail"}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-bg-void/60 to-transparent" />
      </div>
      {props.alt && (
        <figcaption className="text-center text-[10px] font-mono uppercase tracking-[0.4em] text-text-muted mt-6">
          // {props.alt.replace(" ", "_")}
        </figcaption>
      )}
    </figure>
  ),
  table: (props: any) => (
    <div className="overflow-x-auto my-12 border border-white/5 bg-bg-card">
      <table {...props} className="w-full text-left font-mono text-xs" />
    </div>
  ),
  thead: (props: any) => (
    <thead {...props} className="bg-white/5 border-b border-white/10" />
  ),
  th: (props: any) => (
    <th
      {...props}
      className="px-6 py-4 font-black text-white uppercase tracking-widest"
    />
  ),
  td: (props: any) => (
    <td
      {...props}
      className="px-6 py-4 text-text-muted border-b border-white/5"
    />
  ),
  hr: () => (
    <hr className="my-24 border-0 h-[1px] bg-gradient-to-r from-transparent via-white/10 to-transparent" />
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
