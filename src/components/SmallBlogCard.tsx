import Link from "next/link";
import Image from "next/image";
import { BlogPost } from "@/lib/blog";
import { Calendar, ArrowRight } from "lucide-react";

export default function SmallBlogCard({ post }: { post: BlogPost }) {
  return (
    <Link href={`/blog/${post.slug}`} className="group block h-full">
      <article className="flex flex-col sm:flex-row items-stretch gap-5 bg-bg-card border border-white/5 p-4 hover:border-accent-glitch/50 transition-all duration-300 h-full">
        <div className="relative h-40 sm:h-auto sm:w-40 shrink-0 overflow-hidden border border-white/5">
          <Image
            src={post.image}
            alt={post.title}
            fill
            className="object-cover grayscale group-hover:grayscale-0 transition-transform duration-700 group-hover:scale-110 opacity-70 group-hover:opacity-100"
          />
          <div className="absolute top-2 left-2 sm:hidden">
            <span className="px-2 py-0.5 text-[9px] font-mono font-black bg-accent-glitch text-black uppercase tracking-widest">
              {post.category}
            </span>
          </div>
        </div>

        <div className="flex-grow flex flex-col justify-center min-w-0 py-2">
          <div className="hidden sm:flex items-center gap-2 text-[9px] font-mono text-text-muted mb-3 uppercase tracking-[0.2em]">
            <span className="text-accent-glitch font-black">
              {post.category}
            </span>
            <span className="opacity-30">•</span>
            <span className="flex items-center gap-1.5 group-hover:text-text-primary transition-colors">
              <Calendar className="w-3 h-3" />
              {new Date(post.date).toLocaleDateString()}
            </span>
          </div>

          <h3 className="text-lg md:text-xl font-black text-text-primary uppercase tracking-tight group-hover:text-accent-glitch transition-colors line-clamp-2 leading-tight mb-3">
            {post.title}
          </h3>

          <p className="text-xs text-text-muted font-mono line-clamp-2 opacity-60 group-hover:opacity-100 transition-opacity">
            {post.description}
          </p>

          <div className="mt-4 flex items-center justify-between sm:hidden">
            <div className="flex items-center gap-2 text-accent-glitch font-mono font-black text-[9px] uppercase tracking-[0.3em]">
              ACCESS_INTEL
              <ArrowRight className="w-3 h-3" />
            </div>
          </div>
        </div>

        <div className="hidden sm:flex items-center pr-2">
          <div className="w-10 h-10 rounded-full border border-white/5 flex items-center justify-center group-hover:border-accent-glitch/30 group-hover:bg-accent-glitch/5 transition-all">
            <ArrowRight className="w-5 h-5 text-accent-glitch/40 group-hover:text-accent-glitch group-hover:translate-x-0.5 transition-all" />
          </div>
        </div>
      </article>
    </Link>
  );
}
