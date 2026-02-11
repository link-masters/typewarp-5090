"use client";

import React from "react";
import Link from "next/link";
import { categories } from "@/lib/categories";
import { ToolIcon } from "@/components/ToolIcon";
import { motion } from "framer-motion";
import {
  Terminal,
  ArrowRight,
  Zap,
  Ghost,
  Skull,
  Cpu,
  Shield,
  Activity,
} from "lucide-react";

export default function FeaturedTools() {
  // Select some featured tools
  const featured = [
    {
      name: "Cursed Text",
      slug: "cursed-text",
      category: "dark-horror",
      icon: Ghost,
      accent: "text-accent-glitch",
    },
    {
      name: "Zalgo Script",
      slug: "zalgo-text",
      category: "dark-horror",
      icon: Skull,
      accent: "text-red-500",
    },
    {
      name: "Binary Warp",
      slug: "binary-translator",
      category: "translator",
      icon: Terminal,
      accent: "text-cyan-400",
    },
    {
      name: "Cyber Display",
      slug: "matrix-text",
      category: "gaming",
      icon: Cpu,
      accent: "text-accent-glitch",
    },
    {
      name: "Secure Base64",
      slug: "base64-encoder",
      category: "translator",
      icon: Shield,
      accent: "text-blue-500",
    },
    {
      name: "Live Signal",
      slug: "morse-code",
      category: "translator",
      icon: Activity,
      accent: "text-yellow-400",
    },
  ];

  return (
    <section className="py-12 md:py-28 bg-bg-void relative overflow-hidden border-t border-border-subtle font-mono">
      <div className="container mx-auto max-w-7xl px-4 lg:px-6">
        <div className="flex flex-col md:flex-row items-end justify-between mb-10 md:mb-16 gap-6 md:gap-8">
          <div className="max-w-2xl text-left">
            <h2 className="text-2xl md:text-5xl font-black tracking-tighter uppercase mb-4 md:mb-6 leading-tight">
              High Performance <br />{" "}
              <span className="text-accent-glitch">Warp Matrices</span>
            </h2>
            <p className="text-text-muted font-mono text-base md:text-lg max-w-xl">
              Specialized transformation modules engineered for maximum
              typographic entropy and digital corruption.
            </p>
          </div>

          <Link
            href="/arsenal"
            className="font-mono text-sm uppercase tracking-[0.3em] text-text-muted hover:text-accent-glitch transition-colors border-b border-border-subtle pb-2 mb-2"
          >
            Initialize_All_66_Modules
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {featured.map((tool, i) => {
            const Icon = tool.icon;
            return (
              <Link
                key={tool.slug}
                href={`/${tool.category}/${tool.slug}`}
                className="group relative p-6 md:p-8 bg-bg-card border border-border-subtle hover:border-accent-glitch/50 transition-all duration-500 overflow-hidden flex flex-col shadow-sm hover:shadow-[0_30px_60px_-15px_rgba(0,0,0,0.1)] dark:hover:shadow-[0_30px_60px_-15px_rgba(57,255,20,0.1)] hover:-translate-y-2"
              >
                {/* Blueprint Background */}
                <div className="absolute inset-0 opacity-0 group-hover:opacity-[0.04] dark:group-hover:opacity-[0.06] transition-opacity duration-700 pointer-events-none bg-[radial-gradient(var(--accent-glitch)_1px,transparent_1px)] [background-size:24px_24px]" />

                {/* Module ID Tag */}
                <div className="absolute top-6 md:top-8 right-6 md:right-8 flex flex-col items-end gap-1 z-20">
                  <div className="text-[8px] md:text-[9px] text-accent-glitch font-black uppercase tracking-[0.2em] opacity-40 group-hover:opacity-100 transition-opacity">
                    {tool.category.toUpperCase().replace("-", "_")}
                  </div>
                  <div className="h-0.5 w-4 md:w-6 bg-accent-glitch/20 group-hover:w-12 group-hover:bg-accent-glitch transition-all duration-500" />
                </div>

                {/* Main Content */}
                <div className="relative z-10 flex flex-col h-full">
                  <div className="mb-6 md:mb-8 w-12 h-12 md:w-14 md:h-14 border border-border-subtle flex items-center justify-center bg-bg-void group-hover:border-accent-glitch transition-all duration-500 relative rounded-sm">
                    <Icon className="w-5 h-5 md:w-7 md:h-7 text-text-muted group-hover:text-accent-glitch transition-all duration-500" />
                    <div className="absolute -inset-2 bg-accent-glitch/10 blur-xl opacity-0 group-hover:opacity-100 transition-opacity" />
                  </div>

                  <h3 className="text-xl md:text-2xl font-black text-text-primary uppercase tracking-tighter mb-3 md:mb-4 group-hover:text-accent-glitch transition-colors duration-300">
                    {tool.name}
                  </h3>

                  <p className="text-[10px] md:text-[11px] font-mono text-text-muted uppercase tracking-[0.1em] leading-relaxed mb-6 md:mb-8 opacity-80 group-hover:opacity-100 line-clamp-2">
                    Initialize high-performance {tool.name.toLowerCase()}{" "}
                    transformation matrix with zero latency.
                  </p>

                  {/* Clear Visible Action Button */}
                  <div className="mt-auto flex items-center justify-between pt-6 border-t border-border-subtle/40">
                    <div className="flex items-center gap-2 text-accent-glitch font-mono font-black text-[9px] uppercase tracking-[0.3em]">
                      LAUNCH_MODULE
                      <ArrowRight className="w-3 h-3 transition-transform group-hover:translate-x-2" />
                    </div>
                    <div className="w-12 h-[1px] bg-white/10 group-hover:bg-accent-glitch/30 group-hover:w-20 transition-all duration-500" />
                  </div>
                </div>

                {/* Glitch Line Decoration */}
                <div className="absolute bottom-0 left-0 w-full h-[3px] bg-accent-glitch -translate-x-full group-hover:translate-x-0 transition-transform duration-700 ease-[0.16,1,0.3,1] shadow-[0_0_15px_rgba(57,255,20,0.4)] z-30" />
              </Link>
            );
          })}
        </div>
      </div>
    </section>
  );
}
