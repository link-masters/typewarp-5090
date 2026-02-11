"use client";

import { motion } from "framer-motion";
import { ReactNode } from "react";

interface GlitchButtonProps {
  children: ReactNode;
  variant?: "primary" | "secondary";
  onClick?: () => void;
  className?: string;
}

export default function GlitchButton({
  children,
  variant = "primary",
  onClick,
  className = "",
}: GlitchButtonProps) {
  const isPrimary = variant === "primary";

  return (
    <motion.button
      whileHover={{
        x: [0, -2, 2, -2, 2, 0],
        transition: { duration: 0.2, repeat: Infinity },
      }}
      onClick={onClick}
      className={`
        px-8 py-3 
        font-mono uppercase tracking-widest text-sm
        border transition-all duration-200
        relative overflow-hidden group
        ${
          isPrimary
            ? "bg-transparent border-border-subtle text-text-primary hover:bg-accent-glitch hover:text-black hover:border-accent-glitch"
            : "bg-transparent border-border-subtle text-text-muted hover:border-text-primary hover:text-text-primary"
        }
        ${className}
      `}
    >
      <span className="relative z-10">{children}</span>

      {/* Glitch lines on hover */}
      <div className="absolute inset-0 z-0 opacity-0 group-hover:opacity-100 pointer-events-none">
        <div className="absolute top-0 left-0 w-full h-[1px] bg-accent-glitch/50 animate-glitch-line-1" />
        <div className="absolute bottom-0 right-0 w-full h-[1px] bg-accent-glitch/50 animate-glitch-line-2" />
      </div>
    </motion.button>
  );
}
