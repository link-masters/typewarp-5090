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
  const y1 = useTransform(scrollY, [0, 500], [0, 100]);
  const opacity = useTransform(scrollY, [0, 400], [1, 0]);

  // Mouse tracking logic for interaction
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  const springConfig = { damping: 25, stiffness: 150 };
  const smoothMouseX = useSpring(mouseX, springConfig);
  const smoothMouseY = useSpring(mouseY, springConfig);

  const rotateX = useTransform(smoothMouseY, [-300, 300], [10, -10]);
  const rotateY = useTransform(smoothMouseX, [-300, 300], [-10, 10]);

  const handleMouseMove = (e: React.MouseEvent) => {
    const { clientX, clientY } = e;
    const { innerWidth, innerHeight } = window;
    mouseX.set(clientX - innerWidth / 2);
    mouseY.set(clientY - innerHeight / 2);
  };

  return (
    <section
      onMouseMove={handleMouseMove}
      className="relative min-h-screen flex flex-col items-center justify-center overflow-hidden pt-20 px-4 md:px-6 bg-bg-void perspective-1000"
    >
      <BackgroundEffect />

      {/* Dynamic Grid - Responds to mouse */}
      <motion.div
        style={{
          x: useTransform(smoothMouseX, (v) => v * 0.05),
          y: useTransform(smoothMouseY, (v) => v * 0.05),
        }}
        className="absolute inset-x-[-10%] inset-y-[-10%] z-[1] opacity-[0.05] pointer-events-none bg-[linear-gradient(to_right,#ffffff10_1px,transparent_1px),linear-gradient(to_bottom,#ffffff10_1px,transparent_1px)] bg-[size:60px_60px]"
      />

      {/* Hero Content */}
      <motion.div
        style={{
          y: y1,
          opacity,
          rotateX,
          rotateY,
        }}
        className="relative z-10 flex flex-col items-center text-center max-w-5xl mx-auto"
      >
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1, ease: "easeOut" }}
          className="mb-8"
        >
          <h1 className="flex flex-col items-center select-none">
            <span className="text-[clamp(3.5rem,14vw,11rem)] text-text-primary font-black leading-[0.85] tracking-[-0.05em] drop-shadow-2xl">
              <ScrambleText text="TYPEWARP" />
            </span>
            <span className="text-[clamp(0.75rem,2.5vw,1.5rem)] text-accent-glitch mt-4 tracking-[0.4em] uppercase font-black opacity-80 flex items-center gap-3">
              <ScrambleText text="Elite Typography Suite" delay={0.4} />
            </span>
          </h1>
        </motion.div>

        <motion.p
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6, duration: 0.8 }}
          className="text-text-muted text-base md:text-xl max-w-2xl font-sans mb-10 md:mb-14 px-4 leading-relaxed tracking-tight"
        >
          Transform your digital identity with the world's most powerful{" "}
          <span className="text-accent-glitch font-bold">Cursed Text</span>{" "}
          generator. Universal compatibility across all social platforms.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.8, duration: 0.8 }}
          className="flex flex-row flex-wrap justify-center gap-4 w-full px-4"
        >
          <Link
            href="/dark-horror/cursed-text"
            className="shrink-0 flex-1 sm:flex-none"
          >
            <GlitchButton
              variant="primary"
              className="w-full sm:w-[220px] py-4 md:py-5 text-sm font-black"
            >
              START_WARPING
            </GlitchButton>
          </Link>
          <Link href="/arsenal" className="shrink-0 flex-1 sm:flex-none">
            <GlitchButton
              variant="secondary"
              className="w-full sm:w-[220px] py-4 md:py-5 text-sm font-black"
            >
              EXPLORE_ALL
            </GlitchButton>
          </Link>
        </motion.div>
      </motion.div>

      {/* Mobile-only background flare */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-full bg-[radial-gradient(circle_at_center,rgba(57,255,20,0.03)_0%,transparent_70%)] pointer-events-none" />
    </section>
  );
}
