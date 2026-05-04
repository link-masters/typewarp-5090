"use client";

import { motion } from "framer-motion";
import { ReactNode, useEffect, useState, useRef } from "react";
import { transformText } from "@/lib/transformers";

interface ToolCardProps {
  title: string;
  description: string;
  icon: ReactNode;
  slug?: string;
  categorySlug?: string;
  className?: string;
}

const DEMO_INPUTS: Record<string, string> = {
  "cursed-text": "Hello World",
  "zalgo-text": "The Void",
  "glitch-text": "System Error",
  "bold-text": "Make it bold",
  "italic-text": "Elegant style",
  "cursive-text": "Beautiful script",
  "gothic-font": "Dark Aesthetic",
  "bubble-text": "Bubble pop",
  "fancy-font": "Fancy vibes",
  "vaporwave-text": "A E S T H E T I C",
  "small-text": "tiny letters",
  "upside-down-text": "Flip it",
  "reverse-text": "go backwards",
  "mirror-text": "Reflect this",
  "strikethrough-text": "Cross it out",
  "monospace-text": "Fixed width",
  "binary": "Hello World",
  "morse-code": "S O S",
  "hex-code": "Secret key",
  "base64": "Encode me",
  "caesar-cipher": "Secret message",
  "leetspeak": "I am elite",
  "scary-text": "Boo! Run",
  "demonic-text": "Dark Lord",
  "sparkle-text": "Shine bright",
  "aesthetic-font": "Aesthetic mood",
  "underline-text": "Draw a line",
  "wide-text": "S p a c e d",
  "creepy-text": "Dark night",
  "corrupted-text": "Fatal Error",
  "old-english-font": "Ye Olde Text",
  "calligraphy-font": "Pen & ink",
  "subscript": "H2O water",
  "superscript": "x2 squared",
  "lenny-face": "smirk emoji",
  "kaomoji": "happy face",
  "text-symbols": "heart star",
};

function CardDemo({ slug }: { slug: string }) {
  const [phase, setPhase] = useState<"idle" | "typing" | "done">("idle");
  const [typedChars, setTypedChars] = useState(0);
  const [demoOutput, setDemoOutput] = useState("");
  const ref = useRef<HTMLDivElement>(null);

  const demoInput = DEMO_INPUTS[slug] || "Hello";

  // IntersectionObserver: start animation when card is visible
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && phase === "idle") {
          setPhase("typing");
          obs.disconnect();
        }
      },
      { threshold: 0.2 }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, [phase]);

  // Typing animation: add one character at a time
  useEffect(() => {
    if (phase !== "typing") return;
    if (typedChars >= demoInput.length) {
      // Done typing — compute the transformed output
      const result = transformText(demoInput, slug, {
        intensity: 3,
        spacing: 1,
        uppercase: false,
        customSettings: {},
      });
      setDemoOutput(result);
      setPhase("done");
      return;
    }
    const timer = setTimeout(() => {
      setTypedChars((c) => c + 1);
    }, 100);
    return () => clearTimeout(timer);
  }, [phase, typedChars, demoInput, slug]);

  // Loop: after showing output for 2s, reset and replay
  useEffect(() => {
    if (phase !== "done") return;
    const timer = setTimeout(() => {
      setTypedChars(0);
      setDemoOutput("");
      setPhase("typing");
    }, 2000);
    return () => clearTimeout(timer);
  }, [phase]);

  const displayedInput = demoInput.slice(0, typedChars);

  return (
    <div ref={ref} className="mt-3 mb-2 min-h-[56px]">
      <div className="rounded-lg bg-bg-void/50 light:bg-neutral-100 border border-border-subtle light:border-neutral-200 p-2.5 h-full">
        <div className="text-[9px] font-mono text-text-muted/50 uppercase tracking-wider mb-1">
          Demo
        </div>
        <div className="text-[11px] font-mono text-text-muted/70 mb-1 min-h-[16px]">
          {displayedInput}
        </div>
        <div className="text-[11px] font-mono text-accent-glitch font-bold truncate min-h-[16px]">
          {demoOutput || "\u00A0"}
        </div>
      </div>
    </div>
  );
}

export default function ToolCard({
  title,
  description,
  icon,
  slug,
  className = "",
}: ToolCardProps) {
  return (
    <motion.div
      className={`
        group relative p-6 bg-bg-card border border-border-subtle
        light:border-neutral-200 light:shadow-[0_1px_3px_rgba(0,0,0,0.04)]
        flex flex-col rounded-xl overflow-hidden
        transition-all duration-500 cursor-pointer
        hover:border-accent-glitch/20
        light:hover:border-accent-glitch/30 light:hover:shadow-[0_4px_12px_rgba(0,0,0,0.06)]
        ${className}
      `}
    >
      {/* Hover Glimmer */}
      <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none dark:bg-[radial-gradient(circle_at_50%_0%,rgba(57,255,20,0.02)_0%,transparent_70%)] light:bg-[radial-gradient(circle_at_50%_0%,rgba(22,163,74,0.04)_0%,transparent_70%)]" />

      <div className="relative z-10 flex flex-col h-full">
        <div className="mb-4 flex items-center justify-start origin-left group-hover:scale-110 transition-transform duration-500 relative">
          {icon}
        </div>

        <div>
          <h3 className="text-lg font-black text-text-primary uppercase tracking-tighter mb-3 group-hover:text-accent-glitch transition-all duration-500 whitespace-nowrap overflow-hidden text-ellipsis">
            {title}
          </h3>
          <p className="text-text-muted text-[11px] font-mono leading-relaxed mb-2 group-hover:text-text-primary transition-colors">
            {description}
          </p>
        </div>

        {/* Animated demo preview */}
        {slug && <CardDemo slug={slug} />}

        <div className="mt-auto pt-5 border-t border-border-subtle flex items-center justify-between">
          <div className="flex items-center gap-3 text-text-muted group-hover:text-accent-glitch font-mono font-bold text-[10px] uppercase tracking-[0.2em] transition-colors duration-300">
            Try Now
            <div className="w-8 h-[1px] bg-current transition-all duration-500 group-hover:w-12" />
          </div>
          <div className="text-[9px] font-mono text-text-muted uppercase tracking-widest">
            Free
          </div>
        </div>
      </div>
    </motion.div>
  );
}
