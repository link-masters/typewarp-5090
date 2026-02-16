"use client";

import React, { useState, useEffect } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import Link from "next/link";
import GlitchButton from "./ui/GlitchButton";
import BackgroundEffect from "./BackgroundEffect";
import {
  Terminal,
  Shield,
  Cpu,
  Activity,
  ArrowRight,
  Zap,
  Boxes,
} from "lucide-react";
import { useSpring, useMotionValue } from "framer-motion";

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

  return <span>{displayValue}</span>;
};

export default function Hero() {
  const { scrollY } = useScroll();
  const opacity = useTransform(scrollY, [0, 400], [1, 0]);

  return (
    <section className="relative min-h-[95vh] flex flex-col items-center justify-center overflow-hidden pt-20 px-4 md:px-6 bg-[#080808]">
      <BackgroundEffect />

      {/* Hero Content */}
      <motion.div
        style={{ opacity }}
        className="relative z-10 flex flex-col items-center text-center max-w-7xl mx-auto will-change-transform"
      >
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="mb-6 md:mb-8 w-full px-4"
        >
          <h1 className="select-none">
            <span className="text-[clamp(2.5rem,12vw,5.5rem)] md:text-[clamp(3rem,8vw,5.5rem)] text-white font-black leading-[0.9] tracking-tighter uppercase flex flex-col md:block items-center">
              <span className="whitespace-nowrap">
                <ScrambleText text="Modern" delay={0.2} />
              </span>
              <span className="text-accent-glitch md:ml-4 whitespace-nowrap">
                <ScrambleText text="Text Effects" delay={0.6} />
              </span>
            </span>
          </h1>
        </motion.div>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.1, ease: "easeOut" }}
          className="text-white/40 font-mono text-sm md:text-xl lg:text-2xl max-w-2xl mb-10 md:mb-14 px-6 leading-relaxed tracking-tight"
        >
          Create unique and beautiful text effects for your social media. Stand
          out with our professional collection of font styles.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.2, ease: "easeOut" }}
          className="flex flex-col sm:flex-row items-center justify-center gap-4 md:gap-6 w-full px-8"
        >
          <Link
            href="/arsenal"
            className="group relative w-full sm:w-auto px-10 py-4 md:py-5 bg-white text-black font-black text-xs md:text-sm rounded-full overflow-hidden transition-all hover:scale-105 active:scale-95 shadow-[0_20px_40px_-10px_rgba(255,255,255,0.2)]"
          >
            <span className="relative z-10 uppercase tracking-widest text-center block">
              Try Now
            </span>
            <div className="absolute inset-0 bg-accent-glitch opacity-0 group-hover:opacity-100 transition-opacity" />
          </Link>
          <Link
            href="/arsenal"
            className="w-full sm:w-auto px-10 py-4 md:py-5 border border-white/10 text-white font-black text-xs md:text-sm rounded-full hover:bg-white/5 transition-all uppercase tracking-widest text-center"
          >
            View Tools
          </Link>
        </motion.div>
      </motion.div>

      {/* Subtle bottom fade */}
      <div className="absolute bottom-0 left-0 w-full h-32 bg-gradient-to-t from-[#080808] to-transparent pointer-events-none" />
    </section>
  );
}
