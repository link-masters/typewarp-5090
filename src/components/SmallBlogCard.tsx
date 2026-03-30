import Link from "next/link";
import Image from "next/image";
import { BlogPost } from "@/lib/blog";
import { Calendar, ArrowRight } from "lucide-react";

export default function SmallBlogCard({ post }: { post: BlogPost }) {
  return (
    <Link href={`/blog/${post.slug}`} className="group block h-full">
      <article className="flex flex-col sm:flex-row items-stretch gap-3 bg-white dark:bg-[#0c0c0c] shadow-sm dark:shadow-none border border-neutral-200 dark:border-white/5 p-3 md:p-3.5 rounded-lg md:rounded-xl hover:border-emerald-500/20 dark:hover:border-accent-glitch/20 transition-all duration-500 h-full relative overflow-hidden">
        <div className="relative h-28 sm:h-auto sm:w-24 md:w-28 lg:w-32 shrink-0 overflow-hidden rounded-md md:rounded-lg border border-neutral-200 dark:border-white/5 bg-neutral-100 dark:bg-[#111]">
          <Image
            src={post.image}
            alt={post.title}
            width={400}
            height={400}
            sizes="(max-width: 640px) 144px, (max-width: 768px) 128px, (max-width: 1024px) 144px, 160px"
            className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110 opacity-60 group-hover:opacity-100"
          />
        </div>

        <div className="flex-grow flex flex-col justify-center min-w-0 py-0.5">
          <div className="flex items-center gap-2 text-[9px] font-mono mb-2 uppercase tracking-[0.2em] text-neutral-500 dark:text-white/50">
            <span className="text-accent-glitch font-bold">
              {post.category}
            </span>
            <span className="opacity-30">•</span>
            <span className="flex items-center gap-1 group-hover:text-neutral-700 dark:group-hover:text-white/70 transition-colors">
              <Calendar className="w-2.5 h-2.5 md:w-3 md:h-3" />
              {new Date(post.date).toLocaleDateString("en-US", {
                month: "short",
                day: "numeric",
              })}
            </span>
          </div>

          <h3 className="text-sm md:text-base font-black text-text-primary uppercase tracking-tight group-hover:text-accent-glitch transition-all duration-500 line-clamp-2 leading-tight mb-1.5">
            {post.title}
          </h3>

          <p className="text-[11px] md:text-xs text-text-muted leading-relaxed line-clamp-2 group-hover:text-text-primary transition-colors duration-500">
            {post.description}
          </p>

          <div className="mt-2.5 md:mt-3 flex items-center justify-between">
            <div className="flex items-center gap-1.5 text-text-muted group-hover:text-accent-glitch font-mono font-bold text-[9px] uppercase tracking-[0.2em] transition-colors duration-300">
              Read More
              <ArrowRight className="w-2.5 h-2.5 md:w-3 md:h-3 group-hover:translate-x-1 transition-transform" />
            </div>
          </div>
        </div>
      </article>
    </Link>
  );
}
