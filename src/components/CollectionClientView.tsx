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
          <h2 className="sr-only">Categories</h2>
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

        {/* Section Label */}
        <div className="flex items-center gap-6 mb-12">
          <div className="text-[10px] font-mono text-white/20 uppercase tracking-[0.4em] whitespace-nowrap">
            All Generators
          </div>
          <div className="h-[1px] flex-1 bg-white/5" />
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

        {/* Global SEO Content Section */}
        <section className="mt-40 pt-24 border-t border-white/5 space-y-32">
          {/* History Section */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
            <div className="lg:col-span-4 lg:sticky lg:top-32">
              <h2 className="text-3xl md:text-4xl font-black uppercase tracking-tighter text-white leading-[0.8]">
                Evolution of <br />
                <span className="text-accent-glitch">Digital Entropy</span>
              </h2>
            </div>
            <div className="lg:col-span-8 flex flex-col gap-12">
              <div className="prose prose-invert max-w-none text-white/50 font-mono text-base md:text-lg leading-relaxed space-y-6">
                <p>
                  The modern internet is a landscape of standardized visual
                  experiences. From system-level sans-serif fonts to uniform app
                  interfaces, the digital world often prioritizes speed and
                  uniformity over creative expression. TypeWarp was founded as a
                  counter-movement to this visual stagnation, providing creators
                  with the tools to disrupt standard patterns and reclaim their
                  digital identity.
                </p>
                <p>
                  Our collection represents the convergence of high-performance
                  computing and artistic typography. By leveraging the
                  previously underutilized sectors of the Unicode database, we
                  allow users to transform their text into dynamic visual
                  payloads that demand attention and force a psychological focus
                  shift. This isn't just about "style"—it's about the technical
                  and artistic disruption of the status quo.
                </p>
              </div>
            </div>
          </div>

          {/* Core Technical Pillars Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <div className="p-8 bg-[#0c0c0c] border border-white/5 rounded-3xl relative overflow-hidden group">
              <div className="absolute inset-0 opacity-10 blur-3xl bg-accent-glitch pointer-events-none translate-y-32 group-hover:translate-y-0 transition-transform duration-1000" />
              <h3 className="text-xl font-black uppercase tracking-tighter text-white mb-4 relative z-10">
                01. Semantic Integrity
              </h3>
              <p className="text-white/40 font-mono text-sm leading-relaxed relative z-10">
                Every transformation algorithm we build is tested to ensure it
                retains the basic readability of the underlying characters. We
                don't just "break" text; we stylize it while respecting the
                structure of the alphabet, ensuring your message is both
                beautiful and readable.
              </p>
            </div>
            <div className="p-8 bg-[#0c0c0c] border border-white/5 rounded-3xl relative overflow-hidden group">
              <div className="absolute inset-0 opacity-10 blur-3xl bg-emerald-500 pointer-events-none translate-y-32 group-hover:translate-y-0 transition-transform duration-1000" />
              <h3 className="text-xl font-black uppercase tracking-tighter text-white mb-4 relative z-10">
                02. Global Compatibility
              </h3>
              <p className="text-white/40 font-mono text-sm leading-relaxed relative z-10">
                By focusing strictly on Unicode transformation rather than
                proprietary font files, TypeWarp outputs are natively supported
                across every major platform. Whether you are on iOS, Android,
                Windows, or macOS, your text will appear exactly as you
                intended.
              </p>
            </div>
            <div className="p-8 bg-[#0c0c0c] border border-white/5 rounded-3xl relative overflow-hidden group">
              <div className="absolute inset-0 opacity-10 blur-3xl bg-blue-500 pointer-events-none translate-y-32 group-hover:translate-y-0 transition-transform duration-1000" />
              <h3 className="text-xl font-black uppercase tracking-tighter text-white mb-4 relative z-10">
                03. Privacy Forward
              </h3>
              <p className="text-white/40 font-mono text-sm leading-relaxed relative z-10">
                We believe your digital data belongs to you. That's why every
                single tool in our collection operates entirely within your
                browser's local environment. We don't track your inputs, store
                your text, or transmit your creative sessions to any external
                servers.
              </p>
            </div>
          </div>

          {/* Future Section */}
          <div className="p-12 md:p-24 bg-[#0c0c0c] border border-white/5 rounded-[40px] relative overflow-hidden">
            <div className="absolute inset-0 opacity-20 pointer-events-none bg-[radial-gradient(circle_at_center,rgba(57,255,20,0.05)_0%,transparent_70%)]" />
            <div className="relative z-10 text-center space-y-8 max-w-3xl mx-auto">
              <h2 className="text-4xl md:text-5xl font-black uppercase tracking-tighter text-white leading-[0.9]">
                The Future of <span className="text-accent-glitch">Text</span>
              </h2>
              <p className="text-white/50 font-mono text-base md:text-lg leading-relaxed">
                As digital communication continues to evolve, the line between
                text and graphics will continue to blur. TypeWarp remains at the
                forefront of this evolution, constantly researching new Unicode
                blocks and typographic possibilities to keep your digital
                persona ahead of the curve. Join the tens of thousands of users
                who visit us daily to redefine their personal branding.
              </p>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}
