import Link from "next/link";
import Image from "next/image";
import { BlogPost } from "@/lib/blog";
import { Calendar, ArrowRight } from "lucide-react";

export default function SmallBlogCard({ post }: { post: BlogPost }) {
  return (
    <Link href={`/blog/${post.slug}`} className="group block h-full">
      <article className="flex flex-col sm:flex-row items-stretch gap-6 bg-[#0c0c0c] border border-white/5 p-5 rounded-2xl hover:border-accent-glitch/20 transition-all duration-500 h-full relative overflow-hidden">
        <div className="relative h-44 sm:h-auto sm:w-44 shrink-0 overflow-hidden rounded-xl border border-white/5 bg-[#111]">
          <Image
            src={post.image}
            alt={post.title}
            fill
            className="object-cover transition-transform duration-700 group-hover:scale-110 opacity-60 group-hover:opacity-100"
          />
        </div>

        <div className="flex-grow flex flex-col justify-center min-w-0 py-2">
          <div className="flex items-center gap-3 text-[10px] font-mono mb-4 uppercase tracking-[0.2em] text-white/20">
            <span className="text-accent-glitch font-bold">
              {post.category}
            </span>
            <span className="opacity-30">•</span>
            <span className="flex items-center gap-1.5 group-hover:text-white/60 transition-colors">
              <Calendar className="w-3.5 h-3.5" />
              {new Date(post.date).toLocaleDateString("en-US", {
                month: "short",
                day: "numeric",
                year: "numeric",
              })}
            </span>
          </div>

          <h3 className="text-xl font-black text-white uppercase tracking-tight group-hover:text-accent-glitch transition-all duration-500 line-clamp-2 leading-tight mb-4">
            {post.title}
          </h3>

          <p className="text-sm text-white/40 leading-relaxed line-clamp-2 group-hover:text-white/60 transition-colors duration-500">
            {post.description}
          </p>

          <div className="mt-6 flex items-center justify-between">
            <div className="flex items-center gap-2 text-white/20 group-hover:text-accent-glitch font-mono font-bold text-[10px] uppercase tracking-[0.2em] transition-colors duration-300">
              Read More
              <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
            </div>
          </div>
        </div>
      </article>
    </Link>
  );
}
