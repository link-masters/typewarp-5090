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
      slug: "binary",
      category: "translators",
      icon: Terminal,
      accent: "text-cyan-400",
    },
    {
      name: "Cyber Display",
      slug: "gaming-font",
      category: "social-fonts",
      icon: Cpu,
      accent: "text-accent-glitch",
    },
    {
      name: "Secure Base64",
      slug: "base64",
      category: "translators",
      icon: Shield,
      accent: "text-blue-500",
    },
    {
      name: "Live Signal",
      slug: "morse-code",
      category: "translators",
      icon: Activity,
      accent: "text-yellow-400",
    },
  ];

  return (
    <section className="py-12 md:py-28 bg-[#080808] relative overflow-hidden border-t border-border-subtle font-mono">
      {/* Ambient Glow */}
      <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(circle_at_50%_-20%,rgba(57,255,20,0.02)_0%,transparent_50%)] pointer-events-none" />
      <div className="container mx-auto max-w-7xl px-4 lg:px-6">
        <div className="flex flex-col md:flex-row items-end justify-between mb-10 md:mb-16 gap-6 md:gap-8">
          <div className="max-w-2xl text-left">
            <h2 className="text-4xl md:text-5xl font-black tracking-tighter uppercase mb-4 md:mb-6 leading-[0.9]">
              Popular <span className="text-accent-glitch">Effects</span>
            </h2>
            <p className="text-white/40 font-mono text-sm md:text-lg max-w-xl">
              Professional tools designed to help you create unique designs and
              standout typography for any platform.
            </p>
          </div>

          <Link
            href="/arsenal"
            className="font-mono text-[10px] uppercase tracking-[0.3em] text-white/40 hover:text-white transition-colors border-b border-white/10 pb-2 mb-2 flex items-center gap-3 shrink-0"
          >
            Toolkit
            <ArrowRight className="w-3 h-3" />
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {featured.map((tool, i) => {
            const Icon = tool.icon;
            return (
              <Link
                key={tool.slug}
                href={`/${tool.category}/${tool.slug}`}
                className="group relative p-8 bg-[#0c0c0c] border border-white/5 hover:border-accent-glitch/20 transition-all duration-500 overflow-hidden flex flex-col rounded-xl"
              >
                {/* Unique Refined Hover Glimmer */}
                <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none bg-[radial-gradient(circle_at_50%_0%,rgba(57,255,20,0.03)_0%,transparent_70%)]" />

                {/* Kinetic Icon Container */}
                <div className="relative z-10 flex flex-col h-full">
                  <div className="mb-8 w-14 h-14 border border-white/10 flex items-center justify-center bg-[#111] group-hover:scale-110 group-hover:border-accent-glitch/30 transition-all duration-500 rounded-lg overflow-hidden relative">
                    <Icon className="w-7 h-7 text-white/30 group-hover:text-accent-glitch transition-all duration-500" />
                    <div className="absolute inset-0 bg-accent-glitch/5 opacity-0 group-hover:opacity-100 transition-opacity" />
                  </div>

                  <h3 className="text-xl font-black text-white/90 uppercase tracking-tighter mb-4 group-hover:text-white transition-all duration-500 whitespace-nowrap overflow-hidden text-ellipsis">
                    {tool.name}
                  </h3>

                  <p className="text-[12px] font-mono text-text-muted leading-relaxed mb-10 opacity-60 group-hover:opacity-100 transition-opacity">
                    Create unique and stand-out {tool.name.toLowerCase()} text
                    with our simple generator.
                  </p>

                  {/* Clean Action Link */}
                  <div className="mt-auto flex items-center justify-between">
                    <div className="flex items-center gap-3 text-white/20 group-hover:text-accent-glitch font-mono font-bold text-[10px] uppercase tracking-[0.2em] transition-colors duration-300">
                      Try Now
                      <div className="w-8 h-[1px] bg-current transition-all duration-500 group-hover:w-12" />
                    </div>
                    <ArrowRight className="w-4 h-4 text-white/20 group-hover:text-accent-glitch group-hover:translate-x-1 transition-all" />
                  </div>
                </div>
              </Link>
            );
          })}
        </div>
      </div>
    </section>
  );
}
