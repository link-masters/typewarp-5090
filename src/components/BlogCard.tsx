import Link from "next/link";
import Image from "next/image";
import { BlogPost } from "@/lib/blog";
import { Calendar, User, ArrowRight } from "lucide-react";

export default function BlogCard({ post }: { post: BlogPost }) {
  return (
    <Link href={`/blog/${post.slug}`} className="group block h-full">
      <article className="h-full flex flex-col bg-bg-card border border-white/5 relative overflow-hidden transition-all duration-300 hover:border-accent-glitch/50 group">
        <div className="relative h-44 md:h-56 w-full overflow-hidden">
          <Image
            src={post.image}
            alt={post.title}
            fill
            className="object-cover transition-transform duration-700 group-hover:scale-110 grayscale group-hover:grayscale-0 opacity-50 group-hover:opacity-100"
          />
          <div className="absolute top-3 md:top-4 left-3 md:left-4">
            <span className="px-2 md:px-3 py-0.5 md:py-1 text-[8px] md:text-[9px] font-mono font-black bg-accent-glitch text-black uppercase tracking-widest">
              {post.category}
            </span>
          </div>
          <div className="absolute inset-0 bg-gradient-to-t from-bg-card via-transparent to-transparent opacity-60" />
        </div>

        <div className="p-5 md:p-8 flex flex-col flex-grow relative z-10">
          <div className="flex items-center gap-3 md:gap-4 text-[8px] md:text-[9px] font-mono text-text-muted mb-3 md:mb-4 uppercase tracking-[0.2em]">
            <span className="flex items-center gap-1.5">
              <Calendar className="w-3 h-3 text-accent-glitch" />
              {new Date(post.date).toLocaleDateString()}
            </span>
            <span className="flex items-center gap-1.5">
              <User className="w-3 h-3 text-accent-glitch" />
              {post.author}
            </span>
          </div>

          <h2 className="text-xl md:text-2xl font-black text-text-primary mb-3 md:mb-4 tracking-tighter uppercase leading-tight group-hover:text-accent-glitch transition-colors">
            {post.title}
          </h2>

          <p className="text-text-muted font-mono text-[10px] md:text-xs leading-relaxed line-clamp-2 md:line-clamp-3 mb-6 md:mb-8">
            {post.description}
          </p>

          <div className="mt-auto flex items-center justify-between">
            <div className="flex items-center gap-2 text-accent-glitch font-mono font-black text-[9px] uppercase tracking-[0.3em]">
              ACCESS_INTEL
              <ArrowRight className="w-3 h-3 transition-transform group-hover:translate-x-2" />
            </div>
            <div className="w-12 h-[1px] bg-white/10 group-hover:bg-accent-glitch/30 group-hover:w-20 transition-all duration-500" />
          </div>
        </div>

        {/* Technical overlay border top */}
        <div className="absolute top-0 left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-accent-glitch/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
      </article>
    </Link>
  );
}
