"use client";

import React, { useState, useEffect } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import Link from "next/link";
import GlitchButton from "./ui/GlitchButton";
import BackgroundEffect from "./BackgroundEffect";
import { Terminal, Shield, Cpu, Activity } from "lucide-react";

const CHARS = "!@#$%^&*()_+{}:<>?|ABCD0123456789";

const ScrambleText = ({
  text,
  delay = 0,
}: {
  text: string;
  delay?: number;
}) => {
  const [displayValue, setDisplayValue] = useState(text);
  const [isAnimating, setIsAnimating] = useState(false);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    // Initial scramble once mounted on client to hide real text before reveal
    setDisplayValue(
      text
        .split("")
        .map(() => CHARS[Math.floor(Math.random() * CHARS.length)])
        .join(""),
    );

    const timer = setTimeout(() => {
      setIsAnimating(true);
    }, delay * 1000);

    return () => clearTimeout(timer);
  }, [delay, text]);

  useEffect(() => {
    if (!isAnimating || !mounted) return;

    let iteration = 0;
    const interval = setInterval(() => {
      setDisplayValue(
        text
          .split("")
          .map((char, index) => {
            if (index < iteration) {
              return text[index];
            }
            return CHARS[Math.floor(Math.random() * CHARS.length)];
          })
          .join(""),
      );

      if (iteration >= text.length) {
        clearInterval(interval);
      }

      iteration += 1 / 1.5;
    }, 20);

    return () => clearInterval(interval);
  }, [text, isAnimating, mounted]);

  // Before mount, we show the real text so server and client match exactly (improving CLS/Hydration)
  // After mount, we immediately scramble and start the reveal process
  return <span>{displayValue}</span>;
};

export default function Hero() {
  const { scrollY } = useScroll();
  const y1 = useTransform(scrollY, [0, 500], [0, 200]);
  const opacity = useTransform(scrollY, [0, 300], [1, 0]);

  return (
    <section className="relative min-h-screen flex flex-col items-center justify-center overflow-hidden pt-20 px-6 bg-bg-void">
      <BackgroundEffect />

      {/* Subtle Scanning Line */}
      <div className="absolute inset-0 pointer-events-none z-20 overflow-hidden opacity-10">
        <motion.div
          animate={{ top: ["-10%", "110%"] }}
          transition={{ duration: 4, repeat: Infinity, ease: "linear" as any }}
          className="absolute left-0 w-full h-[1px] bg-accent-glitch shadow-[0_0_15px_#39FF14]"
        />
      </div>

      {/* Decorative Grid Overlay - Reduced Opacity */}
      <div className="absolute inset-0 z-[1] opacity-[0.03] pointer-events-none bg-[linear-gradient(to_right,#ffffff05_1px,transparent_1px),linear-gradient(to_bottom,#ffffff05_1px,transparent_1px)] bg-[size:40px_40px]" />

      {/* Core Engine Visual - More Subtle */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] pointer-events-none z-0 opacity-40">
        <motion.div
          animate={{ rotate: 360 }}
          transition={{ duration: 80, repeat: Infinity, ease: "linear" as any }}
          className="absolute inset-0 border border-accent-glitch/5 rounded-full"
        />
        <motion.div
          animate={{ scale: [1, 1.05, 1] }}
          transition={{
            duration: 5,
            repeat: Infinity,
            ease: "easeInOut" as any,
          }}
          className="absolute inset-40 bg-accent-glitch/[0.03] rounded-full blur-[80px]"
        />
      </div>

      {/* Hero Content */}
      <motion.div
        style={{ y: y1, opacity }}
        className="relative z-10 flex flex-col items-center text-center max-w-5xl mx-auto"
      >
        <h1 className="flex flex-col items-center font-black select-none transition-all duration-700 mb-10">
          <span className="text-[clamp(3rem,10vw,10rem)] text-text-primary leading-[0.8] tracking-[-0.05em]">
            <ScrambleText text="TYPEWARP" />
          </span>
          <span className="text-[clamp(0.875rem,2.5vw,2rem)] text-accent-glitch mt-2 tracking-[0.4em] uppercase opacity-80">
            <ScrambleText text="Cursed Text Generator" delay={0.4} />
          </span>
        </h1>

        <motion.p
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4, duration: 0.5 }}
          className="text-text-muted text-base md:text-xl max-w-xl font-mono mb-12 px-4 leading-relaxed tracking-tight"
        >
          The Premium <span className="text-text-primary">Cursed Text</span>{" "}
          Toolkit.
          <br className="hidden md:block" />
          Warp your typography across the digital matrix.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, scale: 0.98 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.6, duration: 0.4 }}
          className="flex flex-col sm:flex-row gap-5 w-full md:w-auto px-4 sm:px-0"
        >
          <Link
            href="/dark-horror/cursed-text"
            className="w-full sm:w-auto max-w-[280px] sm:max-w-none mx-auto"
          >
            <GlitchButton
              variant="primary"
              className="w-full px-10 py-4 text-sm"
            >
              START_WARPING
            </GlitchButton>
          </Link>
          <Link
            href="/arsenal"
            className="w-full sm:w-auto max-w-[280px] sm:max-w-none mx-auto"
          >
            <GlitchButton
              variant="secondary"
              className="w-full px-10 py-4 text-sm"
            >
              VIEW_TOOLS
            </GlitchButton>
          </Link>
        </motion.div>
      </motion.div>

      {/* Minimal Scroll indicator */}
      <motion.div
        animate={{ y: [0, 8, 0], opacity: [0.1, 0.3, 0.1] }}
        transition={{ duration: 3, repeat: Infinity }}
        className="absolute bottom-10 left-1/2 -translate-x-1/2 hidden md:block"
      >
        <div className="w-[1px] h-8 bg-white/20" />
      </motion.div>
    </section>
  );
}
