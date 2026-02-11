"use client";

import React from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { Home, ChevronRight, Terminal, Activity } from "lucide-react";
import { categories } from "@/lib/categories";
import { ToolIcon } from "@/components/ToolIcon";
import ToolCard from "@/components/ui/ToolCard";
import BackgroundEffect from "@/components/BackgroundEffect";

interface CategoryClientViewProps {
  category: any;
}

export default function CategoryClientView({
  category,
}: CategoryClientViewProps) {
  return (
    <div className="min-h-screen bg-bg-void text-text-primary pt-20 sm:pt-24 pb-16 px-4 relative overflow-hidden">
      <BackgroundEffect />

      <div className="container mx-auto max-w-7xl relative z-10">
        {/* Technical Breadcrumbs */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5, ease: "easeOut" }}
          className="flex items-center gap-4 mb-6 font-mono text-[10px] uppercase tracking-[0.3em] text-text-muted"
        >
          <Link
            href="/"
            className="hover:text-accent-glitch transition-colors flex items-center gap-2"
          >
            <Home className="w-3 h-3" />
            ROOT
          </Link>
          <ChevronRight className="w-3 h-3 opacity-30" />
          <div className="flex items-center gap-2 text-accent-glitch">
            <Terminal className="w-3 h-3" />
            {category.name}
          </div>
        </motion.div>

        {/* Optimized Category Header */}
        <motion.header
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          className="mb-8"
        >
          <div className="max-w-2xl text-left">
            <h1 className="text-3xl md:text-6xl font-black tracking-tighter uppercase mb-6 leading-tight">
              {category.name.includes("&") ? (
                <>
                  {category.name.split("&")[0].trim()} &{" "}
                  <span className="text-accent-glitch">
                    {category.name.split("&")[1].trim()}
                  </span>
                </>
              ) : (
                <>
                  {category.name.split(" ")[0]}{" "}
                  <span className="text-accent-glitch">
                    {category.name.split(" ").slice(1).join(" ")}
                  </span>
                </>
              )}
            </h1>
            <p className="text-text-muted font-mono text-lg max-w-xl">
              {category.description}. Engineered for maximum cryptographic
              impact and seamless integration across digital platforms.
            </p>
          </div>
        </motion.header>

        {/* Single Line Category Navigation */}
        <div className="mb-12 pb-6 border-b border-border-subtle/10 overflow-x-auto no-scrollbar">
          <div className="flex items-center gap-6">
            <Link
              href="/arsenal"
              className="px-6 py-2 border border-border-subtle text-text-muted text-[10px] font-black uppercase tracking-[0.3em] whitespace-nowrap hover:border-accent-glitch/50 hover:text-text-primary transition-all"
            >
              All_Systems
            </Link>
            <div className="h-4 w-px bg-border-subtle/20" />
            <div className="flex items-center gap-4">
              {categories.map((cat) => (
                <Link
                  key={cat.slug}
                  href={`/${cat.slug}`}
                  className={`px-4 py-2 border text-[9px] font-black uppercase tracking-[0.3em] whitespace-nowrap transition-all ${
                    cat.slug === category.slug
                      ? "border-accent-glitch bg-accent-glitch/5 text-accent-glitch shadow-[0_5px_15px_-5px_var(--accent-glitch)]"
                      : "border-border-subtle text-text-muted hover:border-accent-glitch/30 hover:text-text-primary"
                  }`}
                >
                  {cat.name.replace("&", "+")}
                </Link>
              ))}
            </div>
          </div>
        </div>

        {/* Tools Grid Section Label */}
        <div className="flex items-center gap-4 mb-8">
          <div className="h-px flex-1 bg-border-subtle opacity-20" />
          <div className="text-[10px] font-mono text-text-muted uppercase tracking-[0.5em]">
            AVAILABLE_TRANSFORMATION_MATRICES
          </div>
          <div className="h-px w-20 bg-border-subtle opacity-20" />
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
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-5"
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
                  description={`Initialize ${tool.name.toLowerCase()} for high-impact typography manipulation.`}
                  icon={
                    <ToolIcon
                      slug={tool.slug}
                      categorySlug={category.slug}
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
