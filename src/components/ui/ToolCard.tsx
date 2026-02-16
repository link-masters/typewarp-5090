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
      className={`
        group relative p-8 bg-[#0c0c0c] border border-white/5
        flex flex-col rounded-xl overflow-hidden
        transition-all duration-500 cursor-pointer
        hover:border-accent-glitch/20
        ${className}
      `}
    >
      {/* Unique Refined Hover Glimmer */}
      <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none bg-[radial-gradient(circle_at_50%_0%,rgba(57,255,20,0.02)_0%,transparent_70%)]" />

      <div className="relative z-10 flex flex-col h-full">
        <div className="mb-8 w-14 h-14 bg-[#111] border border-white/10 flex items-center justify-center group-hover:scale-110 group-hover:border-accent-glitch/30 transition-all duration-500 rounded-lg overflow-hidden relative">
          <div className="relative">
            {icon}
            <div className="absolute inset-0 bg-accent-glitch/5 opacity-0 group-hover:opacity-100 transition-opacity" />
          </div>
        </div>

        <div>
          <h3 className="text-xl font-black text-white/90 uppercase tracking-tighter mb-4 group-hover:text-white transition-all duration-500 whitespace-nowrap overflow-hidden text-ellipsis">
            {title}
          </h3>
          <p className="text-white/40 text-[12px] font-mono leading-relaxed mb-8 group-hover:text-white/60 transition-colors">
            {description}
          </p>
        </div>

        {/* Clean Action Footer */}
        <div className="mt-auto pt-6 border-t border-white/5 flex items-center justify-between">
          <div className="flex items-center gap-3 text-white/20 group-hover:text-accent-glitch font-mono font-bold text-[10px] uppercase tracking-[0.2em] transition-colors duration-300">
            Try Now
            <div className="w-8 h-[1px] bg-current transition-all duration-500 group-hover:w-12" />
          </div>
          <div className="text-[9px] font-mono text-white/10 group-hover:text-white/20 transition-colors uppercase tracking-widest">
            Ready to Use
          </div>
        </div>
      </div>
    </motion.div>
  );
}
