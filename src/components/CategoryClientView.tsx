"use client";

import React from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { Home, ChevronRight, Terminal, Activity } from "lucide-react";
import { categories } from "@/lib/categories";
import { ToolIcon } from "@/components/ToolIcon";
import ToolCard from "@/components/ui/ToolCard";
import BackgroundEffect from "@/components/CanvasEffect";

interface CategoryClientViewProps {
  category: any;
}

export default function CategoryClientView({
  category,
}: CategoryClientViewProps) {
  return (
    <div className="min-h-screen bg-[#080808] text-white pt-24 pb-24 px-6 relative overflow-hidden">
      {/* Background Glow */}
      <div className="fixed top-0 left-0 w-full h-full bg-[radial-gradient(circle_at_50%_-10%,rgba(57,255,20,0.02)_0%,transparent_50%)] pointer-events-none" />

      <div className="container mx-auto max-w-7xl relative z-10">
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
            <Terminal className="w-3 h-3" />
            {category.name}
          </div>
        </motion.div>

        {/* Category Header */}
        <motion.header
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="mb-16"
        >
          <div className="max-w-2xl text-left">
            <h1 className="text-4xl md:text-5xl font-black tracking-tighter uppercase mb-6 leading-[0.9] flex flex-col md:block items-start md:items-baseline">
              <span className="whitespace-nowrap">{category.name}</span>{" "}
              <span className="text-accent-glitch whitespace-nowrap">
                Tools
              </span>
            </h1>
            <p className="text-white/40 font-mono text-base md:text-lg max-w-xl">
              {category.description}. Designed for high-impact social media
              posts and creative projects.
            </p>
          </div>
        </motion.header>

        {/* Category Navigation */}
        <div className="mb-16 overflow-x-auto no-scrollbar">
          <div className="flex items-center gap-4">
            <Link
              href="/arsenal"
              className="px-8 py-3 border border-white/10 text-white/40 text-[10px] font-bold uppercase tracking-[0.2em] whitespace-nowrap hover:border-white/20 hover:text-white transition-all rounded-full"
            >
              All Tools
            </Link>
            <div className="h-4 w-px bg-white/5 shrink-0" />
            <div className="flex items-center gap-4">
              {categories.map((cat) => (
                <Link
                  key={cat.slug}
                  href={`/${cat.slug}`}
                  className={`px-8 py-3 text-[10px] font-bold uppercase tracking-[0.2em] whitespace-nowrap transition-all rounded-full border ${
                    cat.slug === category.slug
                      ? "bg-white text-black border-white"
                      : "border-white/10 text-white/40 hover:border-white/20 hover:text-white"
                  }`}
                >
                  {cat.name.replace("&", "+")}
                </Link>
              ))}
            </div>
          </div>
        </div>

        {/* Section Label */}
        <div className="flex items-center gap-6 mb-12">
          <div className="text-[10px] font-mono text-white/20 uppercase tracking-[0.4em] whitespace-nowrap">
            Our {category.name} Collection
          </div>
          <div className="h-[1px] flex-1 bg-white/5" />
        </div>

        {/* Tools Grid */}
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
          {category.tools.map((tool: any) => (
            <motion.div
              key={tool.slug}
              variants={{
                hidden: { opacity: 0, y: 20 },
                visible: { opacity: 1, y: 0 },
              }}
              className="group"
            >
              <Link
                href={`/${category.slug}/${tool.slug}`}
                className="block h-full"
              >
                <ToolCard
                  title={tool.name}
                  description={category.name}
                  icon={
                    <ToolIcon
                      slug={tool.slug}
                      categorySlug={category.slug}
                      className="w-7 h-7 text-white/30 group-hover:text-accent-glitch transition-all duration-500"
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
