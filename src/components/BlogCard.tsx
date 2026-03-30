import Link from "next/link";
import Image from "next/image";
import { BlogPost } from "@/lib/blog";
import { Calendar, User, ArrowRight } from "lucide-react";

export default function BlogCard({ post }: { post: BlogPost }) {
  return (
    <Link href={`/blog/${post.slug}`} className="group block h-full">
      <article className="h-full flex flex-col bg-bg-card border border-border-subtle light:border-neutral-200 light:shadow-[0_1px_3px_rgba(0,0,0,0.04)] rounded-2xl overflow-hidden transition-all duration-500 hover:border-accent-glitch/20 light:hover:border-accent-glitch/30 light:hover:shadow-[0_4px_12px_rgba(0,0,0,0.06)] group relative">
        <div className="relative h-44 md:h-56 w-full overflow-hidden bg-bg-card">
          <Image
            src={post.image}
            alt={post.title}
            width={1200}
            height={630}
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110 opacity-60 group-hover:opacity-100"
          />
          <div className="absolute top-4 left-4">
            <span className="px-3 py-1 text-[10px] font-mono font-bold bg-accent-glitch text-black uppercase tracking-widest rounded-md">
              {post.category}
            </span>
          </div>
          <div className="absolute inset-0 bg-gradient-to-t from-bg-card via-transparent to-transparent opacity-60" />
        </div>

        <div className="p-6 md:p-8 flex flex-col flex-grow relative z-10">
          <div className="flex items-center gap-4 text-[10px] font-mono text-text-muted mb-4 uppercase tracking-[0.2em]">
            <span className="flex items-center gap-1.5 group-hover:text-text-primary transition-colors">
              <Calendar className="w-3.5 h-3.5 text-accent-glitch/70" />
              {new Date(post.date).toLocaleDateString("en-US", {
                month: "short",
                day: "numeric",
                year: "numeric",
              })}
            </span>
            <span className="flex items-center gap-1.5 group-hover:text-text-primary transition-colors">
              <User className="w-3.5 h-3.5 text-accent-glitch/70" />
              {post.author}
            </span>
          </div>

          <h2 className="text-xl md:text-2xl font-black text-text-primary mb-4 tracking-tighter uppercase leading-tight group-hover:text-accent-glitch transition-all duration-500">
            {post.title}
          </h2>

          <p className="text-text-muted text-sm leading-relaxed line-clamp-2 md:line-clamp-3 mb-8 group-hover:text-text-primary transition-colors duration-500">
            {post.description}
          </p>

          <div className="mt-auto flex items-center justify-between">
            <div className="flex items-center gap-2 text-text-muted group-hover:text-accent-glitch font-mono font-bold text-[10px] uppercase tracking-[0.3em] transition-colors duration-300">
              Read More
              <ArrowRight className="w-3.5 h-3.5 transition-transform group-hover:translate-x-1" />
            </div>
            <div className="w-8 h-[1px] bg-neutral-200 dark:bg-white/5 group-hover:bg-accent-glitch/20 group-hover:w-12 transition-all duration-500" />
          </div>
        </div>
      </article>
    </Link>
  );
}
