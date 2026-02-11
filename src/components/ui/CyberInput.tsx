"use client";

import { motion } from "framer-motion";

interface CyberInputProps {
  placeholder?: string;
  value?: string;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  className?: string;
}

export default function CyberInput({
  placeholder,
  value,
  onChange,
  className = "",
}: CyberInputProps) {
  return (
    <div className={`relative group ${className}`}>
      <input
        type="text"
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        className="
          w-full bg-bg-card border-b border-white/10 px-4 py-3
          font-sans text-sm text-text-primary placeholder:text-text-muted
          outline-none transition-all duration-300
          focus:border-accent-glitch focus:bg-white/[0.02]
        "
      />
      <motion.div
        initial={{ width: 0 }}
        whileFocus={{ width: "100%" }}
        className="absolute bottom-0 left-0 h-[2px] bg-accent-glitch shadow-[0_0_15px_var(--accent-glitch)] z-10"
      />

      {/* Corner accents */}
      <div className="absolute top-0 left-0 w-2 h-2 border-t border-l border-white/10 group-focus-within:border-accent-glitch transition-colors" />
      <div className="absolute top-0 right-0 w-2 h-2 border-t border-r border-white/10 group-focus-within:border-accent-glitch transition-colors" />
    </div>
  );
}
