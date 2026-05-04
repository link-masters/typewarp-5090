"use client";

import { MessageSquare } from "lucide-react";

export default function Comments({ postSlug }: { postSlug: string }) {
  return (
    <section className="mt-20 pt-16 border-t border-neutral-200 dark:border-white/5">
      <div className="flex items-center gap-4 mb-8">
        <div className="w-12 h-12 border border-border-subtle bg-bg-card flex items-center justify-center rounded-xl">
          <MessageSquare className="w-6 h-6 text-text-muted" />
        </div>
        <div>
          <h2 className="text-xl font-black text-text-primary uppercase tracking-tighter">
            Comments
          </h2>
          <p className="text-xs text-text-muted">
            Commenting is not yet available. We're working on it.
          </p>
        </div>
      </div>
    </section>
  );
}
