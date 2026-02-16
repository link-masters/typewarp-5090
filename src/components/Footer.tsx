// Footer.tsx
"use client";

import React, { useState } from "react";
import Link from "next/link";
import { categories } from "@/lib/categories";
import { motion, AnimatePresence } from "framer-motion";
import {
  ArrowUp,
  Github,
  Twitter,
  Mail,
  ChevronDown,
  ChevronRight,
  ExternalLink,
} from "lucide-react";

/* ------------------------------------------------------------------ */
/*  Constants                                                          */
/* ------------------------------------------------------------------ */
const legalLinks = [
  { href: "/blog", label: "Blog" },
  { href: "/about", label: "About" },
  { href: "/terms", label: "Terms" },
  { href: "/privacy", label: "Privacy" },
  { href: "/cookies", label: "Cookies" },
  { href: "/gdpr", label: "GDPR" },
  { href: "/contact", label: "Contact" },
];

const socialLinks = [
  { Icon: Twitter, href: "#", label: "Twitter" },
  { Icon: Github, href: "#", label: "GitHub" },
  { Icon: Mail, href: "mailto:community@typewarp.com", label: "Email" },
];

/* ------------------------------------------------------------------ */
/*  Helpers                                                            */
/* ------------------------------------------------------------------ */
// Split categories into columns for large screens
const splitIntoColumns = <T,>(arr: T[], cols: number): T[][] => {
  const result: T[][] = Array.from({ length: cols }, () => []);
  arr.forEach((item, i) => {
    result[i % cols].push(item);
  });
  return result;
};

/* ================================================================== */
/*  FOOTER                                                             */
/* ================================================================== */
const Footer = () => {
  const [expandedMobileCategory, setExpandedMobileCategory] = useState<
    string | null
  >(null);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const toggleCategory = (slug: string) => {
    setExpandedMobileCategory((p) => (p === slug ? null : slug));
  };

  // For desktop: split categories into 3-5 columns depending on count
  const desktopCols =
    categories.length <= 4
      ? 2
      : categories.length <= 8
        ? 3
        : categories.length <= 12
          ? 4
          : 5;
  const desktopColumns = splitIntoColumns(categories, desktopCols);

  return (
    <footer className="w-full border-t border-neutral-200 dark:border-white/[0.1] bg-white dark:bg-[#0a0a0a] relative overflow-hidden font-mono">
      {/* Subtle texture overlay */}
      <div className="absolute inset-0 opacity-[0.015] pointer-events-none bg-[url('https://www.transparenttextures.com/patterns/carbon-fibre.png')]" />

      {/* Top gradient line */}
      <div className="absolute top-0 inset-x-0 h-px bg-gradient-to-r from-transparent via-emerald-500/20 dark:via-accent-glitch/15 to-transparent" />

      {/* ===== Main Footer Content ===== */}
      <div className="mx-auto max-w-[1440px] px-4 sm:px-6 md:px-8 py-12 sm:py-16 md:py-20 lg:py-24 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 xl:gap-20">
          {/* ---- Brand Section ---- */}
          <div className="lg:col-span-3 xl:col-span-3">
            <Link href="/" className="group mb-6 sm:mb-8 block">
              <div className="inline-flex items-end">
                <span className="text-2xl sm:text-3xl font-black text-neutral-900 dark:text-text-primary uppercase tracking-tighter group-hover:text-emerald-600 dark:group-hover:text-accent-glitch transition-colors duration-300">
                  Type
                </span>
                <span className="text-2xl sm:text-3xl font-black text-emerald-600 dark:text-accent-glitch uppercase tracking-tighter italic group-hover:text-neutral-900 dark:group-hover:text-text-primary transition-colors duration-300">
                  Warp
                </span>
                <motion.span
                  className="inline-block w-2 h-2 rounded-full bg-emerald-500 dark:bg-accent-glitch ml-0.5 mb-1.5"
                  animate={{ opacity: [1, 0.3, 1] }}
                  transition={{
                    duration: 2,
                    repeat: Infinity,
                    ease: "easeInOut",
                  }}
                />
              </div>
            </Link>

            <p className="text-neutral-500 dark:text-text-muted text-[12px] sm:text-[13px] leading-relaxed mb-8 sm:mb-10 max-w-[300px] opacity-80">
              High-performance transformation suite. Engineered for the modern
              digital architect.
            </p>

            {/* Social links */}
            <div className="flex items-center gap-2.5 sm:gap-3 mb-6 sm:mb-8">
              {socialLinks.map(({ Icon, href, label }) => (
                <motion.a
                  key={label}
                  href={href}
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.92 }}
                  className="w-9 h-9 sm:w-10 sm:h-10 border border-neutral-200 dark:border-white/[0.08] rounded-xl flex items-center justify-center text-neutral-400 dark:text-text-muted hover:text-emerald-600 dark:hover:text-accent-glitch hover:border-emerald-500/30 dark:hover:border-accent-glitch/30 hover:bg-emerald-500/5 dark:hover:bg-accent-glitch/5 transition-all duration-200"
                  aria-label={label}
                >
                  <Icon className="w-4 h-4" />
                </motion.a>
              ))}
            </div>

            {/* System status */}
            <div className="space-y-2.5">
              <div className="text-[9px] text-neutral-400/50 dark:text-text-muted/30 uppercase tracking-[0.25em]">
                Status
              </div>
              <div className="flex items-center gap-2">
                <span className="relative flex h-1.5 w-1.5">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-500 dark:bg-accent-glitch opacity-75" />
                  <span className="relative inline-flex rounded-full h-1.5 w-1.5 bg-emerald-500 dark:bg-accent-glitch" />
                </span>
                <span className="text-[10px] text-emerald-600 dark:text-accent-glitch font-bold uppercase tracking-[0.2em]">
                  Platform Online
                </span>
              </div>
            </div>
          </div>

          {/* ---- Categories Section ---- */}
          <div className="lg:col-span-9 xl:col-span-9">
            {/* Desktop categories grid */}
            <div className="hidden md:block">
              <div
                className="grid gap-x-8 lg:gap-x-10 xl:gap-x-12 gap-y-10 lg:gap-y-12"
                style={{
                  gridTemplateColumns: `repeat(${desktopCols}, minmax(0, 1fr))`,
                }}
              >
                {categories.map((category) => (
                  <div key={category.slug} className="flex flex-col">
                    {/* Category heading */}
                    <Link
                      href={`/${category.slug}`}
                      className="group mb-4 lg:mb-5"
                    >
                      <h4 className="text-[10px] lg:text-[11px] font-black text-neutral-700 dark:text-neutral-200 uppercase tracking-[0.2em] pb-2.5 lg:pb-3 border-b border-neutral-200/60 dark:border-white/[0.08] group-hover:text-emerald-600 dark:group-hover:text-accent-glitch group-hover:border-emerald-500/30 dark:group-hover:border-accent-glitch/30 transition-all duration-200 flex items-center justify-between">
                        <span className="truncate">{category.name}</span>
                        <span className="text-[8px] font-mono text-neutral-300 dark:text-neutral-700 group-hover:text-emerald-500/50 dark:group-hover:text-accent-glitch/50 transition-colors ml-2 shrink-0">
                          {category.tools.length}
                        </span>
                      </h4>
                    </Link>

                    {/* Tool links */}
                    <ul className="space-y-1 lg:space-y-1.5">
                      {category.tools.slice(0, 6).map((tool) => (
                        <li key={tool.slug}>
                          <Link
                            href={`/${category.slug}/${tool.slug}`}
                            className="group/link text-[11px] lg:text-[12px] text-neutral-500 dark:text-neutral-400 hover:text-neutral-900 dark:hover:text-white transition-all duration-200 py-0.5 lg:py-1 flex items-center gap-1.5"
                          >
                            <span className="w-0 group-hover/link:w-1.5 h-px bg-emerald-500 dark:bg-accent-glitch transition-all duration-200 shrink-0" />
                            <span className="truncate">{tool.name}</span>
                          </Link>
                        </li>
                      ))}
                      {category.tools.length > 6 && (
                        <li className="pt-1">
                          <Link
                            href={`/${category.slug}`}
                            className="group/more inline-flex items-center gap-1.5 text-[9px] lg:text-[10px] text-emerald-600/50 dark:text-accent-glitch/40 hover:text-emerald-600 dark:hover:text-accent-glitch transition-colors duration-200 uppercase tracking-widest font-bold"
                          >
                            +{category.tools.length - 6} more
                            <ChevronRight className="w-3 h-3 group-hover/more:translate-x-0.5 transition-transform duration-200" />
                          </Link>
                        </li>
                      )}
                    </ul>
                  </div>
                ))}
              </div>
            </div>

            {/* Mobile/Tablet categories accordion */}
            <div className="md:hidden space-y-1.5">
              <h3 className="text-[10px] font-black text-neutral-400 dark:text-neutral-600 uppercase tracking-[0.3em] mb-4 px-1">
                All Categories
              </h3>
              {categories.map((category) => (
                <div
                  key={category.slug}
                  className="border border-neutral-200/60 dark:border-white/[0.05] rounded-2xl overflow-hidden"
                >
                  <button
                    onClick={() => toggleCategory(category.slug)}
                    className={`w-full flex items-center justify-between gap-3 px-4 py-3.5 text-left transition-all duration-200 active:scale-[0.99] ${
                      expandedMobileCategory === category.slug
                        ? "bg-emerald-500/[0.04] dark:bg-accent-glitch/[0.06]"
                        : "hover:bg-neutral-50 dark:hover:bg-white/[0.02]"
                    }`}
                  >
                    <div className="flex items-center gap-3 min-w-0">
                      <div
                        className={`w-8 h-8 rounded-lg flex items-center justify-center text-xs font-black transition-all duration-200 ${
                          expandedMobileCategory === category.slug
                            ? "bg-emerald-500/15 dark:bg-accent-glitch/15 text-emerald-600 dark:text-accent-glitch"
                            : "bg-neutral-100 dark:bg-white/[0.04] text-neutral-400 dark:text-neutral-500"
                        }`}
                      >
                        {category.name.charAt(0)}
                      </div>
                      <div className="min-w-0">
                        <span className="text-[13px] font-bold text-neutral-800 dark:text-neutral-200 block truncate">
                          {category.name}
                        </span>
                        <span className="text-[10px] text-neutral-400 dark:text-neutral-600 font-mono">
                          {category.tools.length} tools
                        </span>
                      </div>
                    </div>
                    <motion.div
                      animate={{
                        rotate:
                          expandedMobileCategory === category.slug ? 180 : 0,
                      }}
                      transition={{ duration: 0.2 }}
                      className="shrink-0"
                    >
                      <ChevronDown
                        className={`w-4 h-4 transition-colors duration-200 ${
                          expandedMobileCategory === category.slug
                            ? "text-emerald-500 dark:text-accent-glitch"
                            : "text-neutral-300 dark:text-neutral-600"
                        }`}
                      />
                    </motion.div>
                  </button>

                  <AnimatePresence initial={false}>
                    {expandedMobileCategory === category.slug && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: "auto", opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{
                          height: { duration: 0.25, ease: [0.4, 0, 0.2, 1] },
                          opacity: { duration: 0.15 },
                        }}
                        className="overflow-hidden"
                      >
                        <div className="px-3 pb-3 pt-1 grid grid-cols-2 gap-1">
                          {category.tools.map((tool) => (
                            <Link
                              key={tool.slug}
                              href={`/${category.slug}/${tool.slug}`}
                              className="text-[11px] text-neutral-500 dark:text-neutral-500 hover:text-neutral-900 dark:hover:text-white px-2.5 py-2 rounded-lg hover:bg-neutral-50 dark:hover:bg-white/[0.03] transition-all duration-150 truncate active:scale-[0.98]"
                            >
                              {tool.name}
                            </Link>
                          ))}
                        </div>
                        <div className="px-3 pb-3">
                          <Link
                            href={`/${category.slug}`}
                            className="flex items-center justify-center gap-2 w-full py-2.5 rounded-xl border border-dashed border-emerald-500/20 dark:border-accent-glitch/15 hover:border-emerald-500/40 dark:hover:border-accent-glitch/30 text-[10px] font-bold uppercase text-emerald-600 dark:text-accent-glitch tracking-wider transition-all duration-200 active:scale-[0.98]"
                          >
                            View All
                            <ExternalLink className="w-3 h-3" />
                          </Link>
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* ===== Legal links row ===== */}
      <div className="border-t border-neutral-100 dark:border-white/[0.06] bg-neutral-50/50 dark:bg-white/[0.03]">
        <div className="mx-auto max-w-[1440px] px-4 sm:px-6 md:px-8 py-5 sm:py-6">
          <div className="flex flex-wrap items-center justify-center gap-x-4 sm:gap-x-6 md:gap-x-8 gap-y-2">
            {legalLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="text-[10px] sm:text-[11px] text-neutral-400 dark:text-neutral-400 hover:text-neutral-700 dark:hover:text-neutral-200 transition-colors duration-200 uppercase tracking-[0.15em] py-1"
              >
                {link.label}
              </Link>
            ))}
          </div>
        </div>
      </div>

      {/* ===== Bottom Bar ===== */}
      <div className="border-t border-neutral-200/50 dark:border-white/[0.08] bg-white dark:bg-[#0a0a0a]">
        <div className="mx-auto max-w-[1440px] px-4 sm:px-6 md:px-8 h-14 sm:h-16 md:h-20 flex items-center justify-between gap-4">
          {/* Left */}
          <div className="flex items-center gap-3 sm:gap-4 md:gap-6 min-w-0">
            <span className="text-[9px] sm:text-[10px] text-neutral-400/60 dark:text-neutral-600 uppercase tracking-[0.15em] truncate">
              © {new Date().getFullYear()} TypeWarp
            </span>
            <div className="hidden sm:flex items-center gap-2">
              <span className="relative flex h-1.5 w-1.5">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-500 dark:bg-accent-glitch opacity-75" />
                <span className="relative inline-flex rounded-full h-1.5 w-1.5 bg-emerald-500 dark:bg-accent-glitch" />
              </span>
              <span className="text-[9px] sm:text-[10px] text-emerald-600 dark:text-accent-glitch font-bold uppercase tracking-[0.2em]">
                Online
              </span>
            </div>
          </div>

          {/* Right */}
          <div className="flex items-center gap-3 sm:gap-4 md:gap-6 shrink-0">
            <span className="text-[8px] sm:text-[9px] text-neutral-400/40 dark:text-neutral-700 font-mono uppercase tracking-wider hidden md:inline">
              Verified Stable
            </span>

            <motion.button
              onClick={scrollToTop}
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              className="w-9 h-9 sm:w-10 sm:h-10 border border-neutral-200 dark:border-white/[0.08] rounded-xl bg-white dark:bg-[#0e0e0e] flex items-center justify-center text-neutral-400 dark:text-text-muted hover:text-emerald-600 dark:hover:text-accent-glitch hover:border-emerald-500/30 dark:hover:border-accent-glitch/30 hover:bg-emerald-500/5 dark:hover:bg-accent-glitch/5 transition-all duration-200 shadow-sm"
              aria-label="Scroll to top"
            >
              <ArrowUp className="w-4 h-4" />
            </motion.button>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
