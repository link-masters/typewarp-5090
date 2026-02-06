import Link from "next/link";
import Image from "next/image";

const MDXComponents = {
  h1: (props: any) => (
    <h1
      {...props}
      className="text-4xl md:text-5xl font-black text-[var(--foreground)] mt-12 mb-6 scroll-m-20"
    />
  ),
  h2: (props: any) => (
    <h2
      {...props}
      className="text-2xl md:text-3xl font-bold text-[var(--foreground)] mt-10 mb-4 border-b border-[var(--card-border)] pb-2 scroll-m-20"
    />
  ),
  h3: (props: any) => (
    <h3
      {...props}
      className="text-xl md:text-2xl font-bold text-[var(--foreground)] mt-8 mb-4 scroll-m-20"
    />
  ),
  p: (props: any) => (
    <p
      {...props}
      className="text-[var(--muted)] leading-relaxed mb-6 text-lg"
    />
  ),
  ul: (props: any) => (
    <ul
      {...props}
      className="list-disc list-inside mb-6 space-y-2 text-[var(--muted)] ml-4"
    />
  ),
  ol: (props: any) => (
    <ol
      {...props}
      className="list-decimal list-inside mb-6 space-y-2 text-[var(--muted)] ml-4"
    />
  ),
  li: (props: any) => <li {...props} className="pl-2" />,
  blockquote: (props: any) => (
    <blockquote
      {...props}
      className="border-l-4 border-red-500 pl-6 py-2 italic text-[var(--muted)] bg-red-500/5 rounded-r-lg my-8"
    />
  ),
  pre: (props: any) => (
    <pre
      {...props}
      className="p-0 mb-8 rounded-xl overflow-hidden shadow-2xl bg-[#1e1e1e]"
    />
  ),
  code: (props: any) => (
    <code
      {...props}
      className="bg-[var(--card-border)] px-1.5 py-0.5 rounded text-red-500 font-mono text-sm border border-[var(--muted)]/20"
    />
  ),
  a: (props: any) => (
    <a
      {...props}
      className="text-red-500 hover:text-red-600 underline underline-offset-4 transition-colors font-semibold"
    />
  ),
  img: (props: any) => (
    <div className="relative w-full h-[400px] my-10 rounded-2xl overflow-hidden shadow-xl">
      <Image
        {...props}
        fill
        className="object-cover"
        alt={props.alt || "Blog image"}
      />
    </div>
  ),
};

export default MDXComponents;
