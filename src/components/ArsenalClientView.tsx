"use client";

import React from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { Zap, Activity } from "lucide-react";
import { ToolIcon } from "@/components/ToolIcon";
import ToolCard from "@/components/ui/ToolCard";
import BackgroundEffect from "@/components/BackgroundEffect";

interface ArsenalClientViewProps {
  allTools: any[];
  totalCount: number;
}

export default function ArsenalClientView({
  allTools,
  totalCount,
}: ArsenalClientViewProps) {
  return (
    <div className="min-h-screen pt-20 sm:pt-24 pb-16 bg-bg-void text-text-primary relative overflow-hidden">
      <BackgroundEffect />

      <div className="container mx-auto px-6 max-w-7xl relative z-10">
        <motion.header
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          className="mb-12"
        >
          <div className="max-w-2xl text-left">
            <h1 className="text-3xl md:text-6xl font-black tracking-tighter uppercase mb-6 leading-tight">
              Explore <span className="text-accent-glitch">Tools</span>
            </h1>
            <p className="text-text-muted font-mono text-lg max-w-xl">
              Initialize any module from the complete TypeWarp architecture. Our
              arsenal is engineered for high-performance typographic
              transformation and digital entropy.
            </p>
          </div>
        </motion.header>

        {/* Single Line Category Filter */}
        <div className="mb-16 pb-8 border-b border-border-subtle/10">
          <div className="flex items-center gap-6 overflow-x-auto pb-4 no-scrollbar -mx-4 px-4 sm:mx-0 sm:px-0">
            <Link
              href="/arsenal"
              className="px-6 py-2 border border-accent-glitch bg-accent-glitch/10 text-accent-glitch text-[10px] font-black uppercase tracking-[0.3em] whitespace-nowrap shadow-[0_5px_20px_-5px_var(--accent-glitch)] transition-all"
            >
              All_Systems
            </Link>
            {allTools
              .reduce((acc: any[], tool) => {
                if (!acc.find((c) => c.slug === tool.category.slug)) {
                  acc.push(tool.category);
                }
                return acc;
              }, [])
              .map((cat) => (
                <Link
                  key={cat.slug}
                  href={`/${cat.slug}`}
                  className="px-6 py-2 border border-border-subtle text-text-muted text-[10px] font-black uppercase tracking-[0.3em] whitespace-nowrap hover:border-accent-glitch/50 hover:text-text-primary transition-all"
                >
                  {cat.name.replace("&", "+")}
                </Link>
              ))}
          </div>
        </div>

        <motion.div
          initial="hidden"
          animate="visible"
          variants={{
            visible: {
              transition: {
                staggerChildren: 0.02,
              },
            },
          }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
        >
          {allTools.map((tool) => (
            <motion.div
              key={`${tool.category.slug}-${tool.slug}`}
              variants={{
                hidden: { opacity: 0, y: 10 },
                visible: { opacity: 1, y: 0 },
              }}
            >
              <Link
                href={`/${tool.category.slug}/${tool.slug}`}
                className="group block h-full"
              >
                <ToolCard
                  title={tool.name}
                  description={`Module: ${tool.category.name.toUpperCase()}`}
                  icon={
                    <ToolIcon
                      slug={tool.slug}
                      categorySlug={tool.category.slug}
                      className="w-6 h-6 text-text-muted group-hover:text-accent-glitch transition-colors"
                    />
                  }
                  className="h-full border border-border-subtle bg-bg-card hover:border-accent-glitch/50 shadow-sm hover:shadow-[0_20px_50px_-10px_rgba(57,255,20,0.1)] transition-all duration-500"
                />
              </Link>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </div>
  );
}
