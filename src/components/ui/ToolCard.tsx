"use client";

import { motion } from "framer-motion";
import { ReactNode } from "react";

interface ToolCardProps {
  title: string;
  description: string;
  icon: ReactNode;
  href?: string;
  className?: string;
}

export default function ToolCard({
  title,
  description,
  icon,
  className = "",
}: ToolCardProps) {
  return (
    <motion.div
      whileHover={{ y: -5 }}
      className={`
        relative p-8 px-9 bg-bg-card border border-border-subtle
        flex flex-col gap-6 group cursor-pointer
        transition-all duration-500 overflow-hidden
        hover:border-accent-glitch/40 hover:shadow-[0_20px_50px_-10px_rgba(57,255,20,0.1)]
        ${className}
      `}
    >
      {/* Blueprint Pattern Background */}
      <div className="absolute inset-0 opacity-0 group-hover:opacity-[0.05] transition-opacity duration-700 pointer-events-none bg-[radial-gradient(var(--accent-glitch)_1px,transparent_1px)] [background-size:20px_20px]" />

      {/* Technical Corner Accents */}
      <div className="absolute top-0 right-0 w-8 h-8 opacity-0 group-hover:opacity-100 transition-opacity">
        <div className="absolute top-2 right-2 w-px h-3 bg-accent-glitch/50" />
        <div className="absolute top-2 right-2 w-3 h-px bg-accent-glitch/50" />
      </div>

      <div className="relative z-10">
        <div className="w-14 h-14 flex items-center justify-center bg-bg-void border border-border-subtle group-hover:border-accent-glitch group-hover:bg-accent-glitch/5 transition-all duration-500 rounded-sm">
          <div className="relative">
            {icon}
            <div className="absolute -inset-2 bg-accent-glitch/20 blur-xl opacity-0 group-hover:opacity-100 transition-opacity" />
          </div>
        </div>

        <div className="mt-8">
          <h3 className="font-mono text-xl md:text-2xl font-black uppercase tracking-tight text-text-primary group-hover:text-accent-glitch transition-colors duration-300">
            {title}
          </h3>
          <p className="text-text-muted text-[13px] font-mono leading-relaxed mt-4 opacity-70 group-hover:opacity-100 transition-opacity">
            {description}
          </p>
        </div>
      </div>

      {/* Decorative footer element */}
      <div className="mt-auto pt-8 flex justify-between items-end relative z-10">
        <div className="flex flex-col gap-1">
          <div className="text-[8px] font-mono text-accent-glitch opacity-0 group-hover:opacity-100 transition-all -translate-x-2 group-hover:translate-x-0 uppercase tracking-[0.3em]">
            // MODULE_LOADED
          </div>
          <div className="text-[8px] font-mono text-text-muted/30 uppercase tracking-widest">
            STABLE_REL_1.0
          </div>
        </div>
        <div className="w-10 h-10 border-r border-b border-border-subtle group-hover:border-accent-glitch/50 transition-all duration-500 group-hover:w-12 group-hover:h-12" />
      </div>

      {/* Bottom Glitch Line */}
      <div className="absolute bottom-0 left-0 w-full h-[1px] bg-border-subtle group-hover:h-[2px] transition-all overflow-hidden">
        <div className="absolute inset-0 bg-accent-glitch -translate-x-full group-hover:translate-x-0 transition-transform duration-700 ease-out" />
      </div>
    </motion.div>
  );
}
