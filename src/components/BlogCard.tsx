import Link from "next/link";
import Image from "next/image";
import { BlogPost } from "@/lib/blog";

export default function BlogCard({ post }: { post: BlogPost }) {
  return (
    <Link href={`/blog/${post.slug}`} className="group block h-full">
      <article className="h-full flex flex-col bg-white dark:bg-[var(--card-bg)] backdrop-blur-md border border-zinc-200 dark:border-[var(--card-border)] rounded-[1.5rem] overflow-hidden transition-all duration-300 hover:border-red-500/50 shadow-[0_4px_20px_rgba(0,0,0,0.04)] dark:shadow-none hover:shadow-[0_8px_30px_rgba(239,68,68,0.15)] dark:hover:shadow-[0_0_30px_rgba(239,68,68,0.2)]">
        <div className="relative h-48 w-full overflow-hidden">
          <Image
            src={post.image}
            alt={post.title}
            fill
            className="object-cover transition-transform duration-500 group-hover:scale-110"
          />
          <div className="absolute top-4 left-4">
            <span className="px-3 py-1 text-xs font-semibold bg-red-600 text-white rounded-full">
              {post.category}
            </span>
          </div>
        </div>
        <div className="p-6 flex flex-col flex-grow">
          <div className="text-sm text-[var(--muted)] mb-2">
            {new Date(post.date).toLocaleDateString()} • {post.author}
          </div>
          <h2 className="text-xl font-bold text-[var(--foreground)] mb-3 group-hover:text-red-500 transition-colors">
            {post.title}
          </h2>
          <p className="text-[var(--muted)] text-sm line-clamp-3 mb-4">
            {post.description}
          </p>
          <div className="mt-auto flex items-center text-red-500 font-semibold text-sm">
            Read More
            <svg
              className="ml-2 w-4 h-4 transition-transform group-hover:translate-x-1"
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
        </div>
      </article>
    </Link>
  );
}
