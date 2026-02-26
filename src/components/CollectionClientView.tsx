"use client";

import React from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { Zap, Activity, Home, ChevronRight, LayoutGrid } from "lucide-react";
import { ToolIcon } from "@/components/ToolIcon";
import ToolCard from "@/components/ui/ToolCard";
import BackgroundEffect from "@/components/CanvasEffect";

interface CollectionClientViewProps {
  allTools: any[];
  totalCount: number;
}

export default function CollectionClientView({
  allTools,
  totalCount,
}: CollectionClientViewProps) {
  return (
    <div className="min-h-screen pt-32 pb-24 bg-[#080808] text-white relative overflow-hidden">
      {/* Background Glow */}
      <div className="fixed top-0 left-0 w-full h-full bg-[radial-gradient(circle_at_50%_-10%,rgba(57,255,20,0.03)_0%,transparent_50%)] pointer-events-none" />

      <div className="container mx-auto px-6 max-w-7xl relative z-10">
        {/* Breadcrumbs */}
        <motion.div
          initial={{ opacity: 0, x: -10 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5 }}
          className="flex items-center gap-3 mb-10 font-mono text-[10px] uppercase tracking-[0.2em] text-white/30"
        >
          <Link
            href="/"
            className="hover:text-accent-glitch transition-colors flex items-center gap-2"
          >
            <Home className="w-3 h-3" />
            HOME
          </Link>
          <ChevronRight className="w-3 h-3 opacity-20" />
          <div className="flex items-center gap-2 text-accent-glitch/80">
            <LayoutGrid className="w-3 h-3" />
            COLLECTION
          </div>
        </motion.div>
        <motion.header
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="mb-16 md:mb-24"
        >
          <div className="max-w-2xl text-left">
            <h1 className="text-4xl md:text-5xl font-black tracking-tighter uppercase mb-6 leading-[0.9] flex flex-col md:block items-start md:items-baseline">
              <span className="whitespace-nowrap">Our</span>{" "}
              <span className="text-accent-glitch whitespace-nowrap">
                Collection
              </span>
            </h1>
            <p className="text-white/40 font-mono text-base md:text-lg max-w-xl">
              Browse our complete collection of typography tools. Designed to
              help you create unique designs and standout text for any platform.
            </p>
          </div>
        </motion.header>

        {/* Categories Bar */}
        <div className="mb-16">
          <div className="flex items-center gap-4 overflow-x-auto pb-4 no-scrollbar">
            <Link
              href="/collection"
              className="px-8 py-3 bg-white text-black text-[10px] font-bold uppercase tracking-[0.2em] whitespace-nowrap rounded-full hover:scale-105 transition-transform"
            >
              All Tools
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
                  className="px-8 py-3 border border-white/10 text-white/40 text-[10px] font-bold uppercase tracking-[0.2em] whitespace-nowrap hover:border-white/20 hover:text-white transition-all rounded-full"
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
                staggerChildren: 0.05,
              },
            },
          }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
        >
          {allTools.map((tool) => (
            <motion.div
              key={`${tool.category.slug}-${tool.slug}`}
              variants={{
                hidden: { opacity: 0, y: 20 },
                visible: { opacity: 1, y: 0 },
              }}
            >
              <Link
                href={`/${tool.category.slug}/${tool.slug}`}
                className="group block h-full"
              >
                <ToolCard
                  title={tool.name}
                  description={tool.category.name}
                  icon={
                    <ToolIcon
                      slug={tool.slug}
                      categorySlug={tool.category.slug}
                      className="w-6 h-6 text-white/30 group-hover:text-accent-glitch transition-all duration-500"
                    />
                  }
                  className="h-full"
                />
              </Link>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </div>
  );
}
