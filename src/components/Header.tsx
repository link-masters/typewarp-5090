// Header.tsx
"use client";

import React, { useState, useEffect, useRef, useCallback } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { categories } from "@/lib/categories";
import { ToolIcon } from "@/components/ToolIcon";
import {
  motion,
  AnimatePresence,
  useScroll,
  useMotionValueEvent,
} from "framer-motion";
import {
  Menu,
  X,
  Monitor,
  ChevronDown,
  ChevronRight,
  Sparkles,
  Sun,
  Moon,
  Command,
  LayoutGrid,
  Zap,
} from "lucide-react";

/* ------------------------------------------------------------------ */
/*  Animation presets                                                   */
/* ------------------------------------------------------------------ */
const spring = {
  fast: { type: "spring" as const, damping: 28, stiffness: 380, mass: 0.5 },
  snappy: { type: "spring" as const, damping: 24, stiffness: 400, mass: 0.4 },
};

const staggerContainer = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.018, delayChildren: 0.01 } },
  exit: {},
};

const staggerItem = {
  hidden: { opacity: 0, y: 6 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.13, ease: "easeOut" as any },
  },
  exit: { opacity: 0, transition: { duration: 0.04 } },
};

const mobileToolItem = {
  hidden: { opacity: 0, y: 5 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.12, ease: "easeOut" as any },
  },
  exit: { opacity: 0, transition: { duration: 0.04 } },
};

/* ================================================================== */
/*  HEADER                                                             */
/* ================================================================== */
const Header = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [activeCategory, setActiveCategory] = useState<string | null>(null);
  const [mobileExpanded, setMobileExpanded] = useState<string | null>(null);
  const [isScrolled, setIsScrolled] = useState(false);
  const [showAllCategories, setShowAllCategories] = useState(false);
  const leaveTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const pathname = usePathname();

  const { scrollY } = useScroll();
  useMotionValueEvent(scrollY, "change", (v) => setIsScrolled(v > 12));

  // How many nav items fit based on screen — show limited, rest in "More" dropdown
  const VISIBLE_COUNT = 6;
  const visibleCategories = categories.slice(0, VISIBLE_COUNT);
  const overflowCategories = categories.slice(VISIBLE_COUNT);
  const hasOverflow = overflowCategories.length > 0;

  /* body scroll lock */
  useEffect(() => {
    if (isMobileMenuOpen) {
      document.body.style.overflow = "hidden";
      document.body.style.touchAction = "none";
    } else {
      document.body.style.overflow = "";
      document.body.style.touchAction = "";
    }
    return () => {
      document.body.style.overflow = "";
      document.body.style.touchAction = "";
    };
  }, [isMobileMenuOpen]);

  /* auto-close mobile on desktop resize */
  useEffect(() => {
    const mq = window.matchMedia("(min-width: 1024px)");
    const h = () => {
      if (mq.matches) {
        setIsMobileMenuOpen(false);
        setMobileExpanded(null);
      }
    };
    mq.addEventListener("change", h);
    return () => mq.removeEventListener("change", h);
  }, []);

  /* Close on escape key */
  useEffect(() => {
    const handleEsc = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setIsMobileMenuOpen(false);
        setMobileExpanded(null);
        setActiveCategory(null);
        setShowAllCategories(false);
      }
    };
    window.addEventListener("keydown", handleEsc);
    return () => window.removeEventListener("keydown", handleEsc);
  }, []);

  const killDropdown = useCallback(() => {
    if (leaveTimerRef.current) clearTimeout(leaveTimerRef.current);
    setActiveCategory(null);
    setShowAllCategories(false);
  }, []);

  const handleMouseEnter = useCallback((slug: string) => {
    if (leaveTimerRef.current) {
      clearTimeout(leaveTimerRef.current);
      leaveTimerRef.current = null;
    }
    setShowAllCategories(false);
    setActiveCategory(slug);
  }, []);

  const handleMouseLeave = useCallback(() => {
    leaveTimerRef.current = setTimeout(() => {
      setActiveCategory(null);
      setShowAllCategories(false);
    }, 120);
  }, []);

  const handleMoreEnter = useCallback(() => {
    if (leaveTimerRef.current) {
      clearTimeout(leaveTimerRef.current);
      leaveTimerRef.current = null;
    }
    setActiveCategory(null);
    setShowAllCategories(true);
  }, []);

  const handleMoreLeave = useCallback(() => {
    leaveTimerRef.current = setTimeout(() => {
      setShowAllCategories(false);
    }, 120);
  }, []);

  const toggleMobileCategory = useCallback((slug: string) => {
    setMobileExpanded((p) => (p === slug ? null : slug));
  }, []);

  const closeMobile = useCallback(() => {
    setIsMobileMenuOpen(false);
    setMobileExpanded(null);
  }, []);

  const activeCat = categories.find((c) => c.slug === activeCategory);

  return (
    <header className="fixed top-4 md:top-5 left-0 right-0 z-50 w-full font-mono flex justify-center px-4 md:px-6 lg:px-8 pointer-events-none">
      <div className="w-full max-w-[1440px] relative pointer-events-auto">
        {/* ===== Glass background ===== */}
        <div
          className={`absolute inset-0 transition-all duration-500 ease-out rounded-full border ${
            isScrolled
              ? "bg-white/92 dark:bg-[#080808]/93 backdrop-blur-2xl border-neutral-200 dark:border-white/[0.07] shadow-[0_8px_30px_rgba(0,0,0,0.12)] dark:shadow-[0_8px_30px_rgba(0,0,0,0.6)]"
              : "bg-white/60 dark:bg-[#080808]/65 backdrop-blur-xl border-neutral-200/30 dark:border-white/[0.03] shadow-[0_4px_20px_rgba(0,0,0,0.06)] dark:shadow-[0_4px_20px_rgba(0,0,0,0.3)]"
          }`}
        />

        {/* ===== Main navigation bar ===== */}
        <div className="relative z-50 w-full px-4 sm:px-6 md:px-8 h-14 sm:h-16 lg:h-[68px] flex items-center justify-between gap-2 sm:gap-3 lg:gap-4">
          {/* ---- Logo ---- */}
          <Link
            href="/"
            className="group shrink-0"
            onClick={() => {
              killDropdown();
              closeMobile();
            }}
          >
            <motion.span
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.97 }}
              transition={spring.snappy}
              className="inline-flex items-end text-[19px] sm:text-[22px] md:text-[26px] lg:text-[28px] xl:text-[30px] font-black tracking-tighter text-neutral-900 dark:text-text-primary uppercase select-none"
            >
              <span className="group-hover:text-emerald-600 dark:group-hover:text-accent-glitch transition-colors duration-300">
                Type
              </span>
              <span className="text-emerald-600 dark:text-accent-glitch group-hover:text-neutral-900 dark:group-hover:text-text-primary transition-colors duration-300">
                Warp
              </span>
            </motion.span>
          </Link>

          {/* ---- Desktop nav ---- */}
          <nav className="hidden lg:flex items-center justify-center flex-1 mx-4">
            <div className="flex items-center gap-0.5 xl:gap-1">
              {visibleCategories.map((category) => (
                <div
                  key={category.slug}
                  className="relative"
                  onMouseEnter={() => handleMouseEnter(category.slug)}
                  onMouseLeave={handleMouseLeave}
                >
                  <Link
                    href={`/${category.slug}`}
                    onClick={killDropdown}
                    aria-current={
                      pathname.startsWith(`/${category.slug}`)
                        ? "page"
                        : undefined
                    }
                    className={`group/btn flex items-center gap-1 xl:gap-1.5 px-2.5 xl:px-4 py-2 xl:py-2.5 text-[10px] xl:text-[11px] 2xl:text-[12px] font-bold uppercase tracking-wider transition-all duration-200 rounded-xl relative whitespace-nowrap ${
                      activeCategory === category.slug
                        ? "text-emerald-600 dark:text-accent-glitch"
                        : "text-neutral-500 dark:text-text-muted hover:text-neutral-800 dark:hover:text-text-primary"
                    }`}
                  >
                    {activeCategory === category.slug && (
                      <motion.div
                        layoutId="desktop-pill"
                        className="absolute inset-0 bg-emerald-500/[0.07] dark:bg-accent-glitch/10 border border-emerald-500/15 dark:border-accent-glitch/20 rounded-xl"
                        transition={{
                          type: "spring",
                          damping: 35,
                          stiffness: 400,
                        }}
                      />
                    )}
                    <span className="relative z-10">{category.name}</span>
                    <ChevronDown
                      className={`relative z-10 w-3 h-3 transition-all duration-200 ${
                        activeCategory === category.slug
                          ? "rotate-180 opacity-100"
                          : "opacity-30 group-hover/btn:opacity-50"
                      }`}
                    />
                  </Link>
                </div>
              ))}

              {/* "More" button for overflow categories */}
              {hasOverflow && (
                <div
                  className="relative"
                  onMouseEnter={handleMoreEnter}
                  onMouseLeave={handleMoreLeave}
                >
                  <button
                    className={`group/btn flex items-center gap-1.5 px-3 xl:px-4 py-2 xl:py-2.5 text-[10px] xl:text-[11px] 2xl:text-[12px] font-bold uppercase tracking-wider transition-all duration-200 rounded-xl relative whitespace-nowrap ${
                      showAllCategories
                        ? "text-emerald-600 dark:text-accent-glitch"
                        : "text-neutral-500 dark:text-text-muted hover:text-neutral-800 dark:hover:text-text-primary"
                    }`}
                  >
                    {showAllCategories && (
                      <motion.div
                        layoutId="desktop-pill"
                        className="absolute inset-0 bg-emerald-500/[0.07] dark:bg-accent-glitch/10 border border-emerald-500/15 dark:border-accent-glitch/20 rounded-xl"
                        transition={{
                          type: "spring",
                          damping: 35,
                          stiffness: 400,
                        }}
                      />
                    )}
                    <LayoutGrid className="relative z-10 w-3.5 h-3.5" />
                    <span className="relative z-10">More</span>
                    <ChevronDown
                      className={`relative z-10 w-3 h-3 transition-all duration-200 ${
                        showAllCategories
                          ? "rotate-180 opacity-100"
                          : "opacity-30 group-hover/btn:opacity-50"
                      }`}
                    />
                  </button>

                  {/* "More" dropdown */}
                  <AnimatePresence>
                    {showAllCategories && (
                      <motion.div
                        initial={{ opacity: 0, y: 8 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: 4 }}
                        transition={{ duration: 0.12, ease: "easeOut" }}
                        className="absolute top-full right-0 pt-2 z-50"
                        onMouseEnter={handleMoreEnter}
                        onMouseLeave={handleMoreLeave}
                      >
                        <div className="bg-white/[0.97] dark:bg-[#0e0e0e]/[0.97] backdrop-blur-2xl border border-neutral-200 dark:border-white/[0.08] rounded-2xl shadow-[0_20px_60px_-12px_rgba(0,0,0,0.18)] dark:shadow-[0_24px_70px_-12px_rgba(0,0,0,0.6)] overflow-hidden min-w-[220px]">
                          <div className="absolute top-0 inset-x-0 h-px bg-gradient-to-r from-transparent via-emerald-500/40 dark:via-accent-glitch/30 to-transparent" />

                          <div className="p-2">
                            {overflowCategories.map((cat) => (
                              <Link
                                key={cat.slug}
                                href={`/${cat.slug}`}
                                onClick={killDropdown}
                                className="group/item flex items-center gap-3 px-3.5 py-3 rounded-xl hover:bg-emerald-500/[0.05] dark:hover:bg-accent-glitch/[0.08] transition-all duration-150"
                              >
                                <div className="w-8 h-8 rounded-lg bg-neutral-100 dark:bg-white/[0.04] border border-neutral-200/50 dark:border-white/[0.06] flex items-center justify-center shrink-0 text-xs font-black text-neutral-400 dark:text-neutral-500 group-hover/item:text-emerald-600 dark:group-hover/item:text-accent-glitch group-hover/item:bg-emerald-500/10 dark:group-hover/item:bg-accent-glitch/10 group-hover/item:border-emerald-500/20 dark:group-hover/item:border-accent-glitch/20 transition-all duration-150">
                                  {cat.name.charAt(0)}
                                </div>
                                <div className="min-w-0 flex-1">
                                  <span className="text-[12px] font-bold text-neutral-700 dark:text-neutral-300 group-hover/item:text-neutral-900 dark:group-hover/item:text-white block truncate transition-colors">
                                    {cat.name}
                                  </span>
                                  <span className="text-[9px] text-neutral-400 dark:text-neutral-600 font-mono">
                                    {cat.tools.length} tools
                                  </span>
                                </div>
                                <ChevronRight className="w-3.5 h-3.5 text-neutral-300 dark:text-neutral-700 shrink-0 opacity-0 group-hover/item:opacity-100 transition-opacity" />
                              </Link>
                            ))}
                          </div>
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              )}
            </div>
          </nav>

          {/* ---- Right side actions ---- */}
          <div className="flex items-center gap-1 sm:gap-1.5 md:gap-2 xl:gap-2.5 shrink-0">
            <Link
              href="/collection"
              onClick={killDropdown}
              aria-current={pathname === "/collection" ? "page" : undefined}
              className="group hidden sm:flex items-center gap-2.5 px-4 sm:px-5 md:px-6 py-2.5 sm:py-3 bg-emerald-500 dark:bg-accent-glitch text-white dark:text-bg-void font-black text-[10px] sm:text-[11px] md:text-[12px] uppercase tracking-widest transition-all duration-300 rounded-xl shadow-[0_0_20px_-5px_var(--btn-glow)] dark:shadow-[0_0_25px_-5px_var(--btn-glow)] hover:shadow-[0_0_35px_-5px_var(--btn-glow)] active:scale-[0.96] relative overflow-hidden border border-white/20 dark:border-black/10 group-hover:border-white/40 dark:group-hover:border-black/30"
              style={
                {
                  "--btn-glow": "rgba(16, 185, 129, 0.5)",
                } as React.CSSProperties
              }
            >
              {/* Glossy Scanline Effect */}
              <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent -translate-x-[250%] group-hover:translate-x-[250%] transition-transform duration-[800ms] ease-in-out" />

              {/* Icon Wrapper with Glow */}
              <div className="relative z-10 flex items-center justify-center">
                <Zap className="w-3.5 h-3.5 sm:w-4 sm:h-4 fill-current transition-transform duration-300 group-hover:scale-110 group-hover:rotate-[15deg]" />
                <div className="absolute inset-0 bg-white dark:bg-white blur-[8px] opacity-0 group-hover:opacity-40 transition-opacity" />
              </div>

              <span className="relative z-10 hidden md:inline ml-0.5">
                Explore All Tools
              </span>
              <span className="relative z-10 md:hidden ml-0.5">
                Explore All
              </span>
            </Link>

            {/* Mobile menu toggle */}
            <motion.button
              whileTap={{ scale: 0.88 }}
              transition={spring.snappy}
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="lg:hidden p-2 sm:p-2.5 text-neutral-700 dark:text-text-primary hover:bg-neutral-100 dark:hover:bg-white/[0.04] rounded-xl transition-colors"
              aria-label="Toggle Menu"
              aria-expanded={isMobileMenuOpen}
              aria-controls="mobile-menu"
            >
              <AnimatePresence mode="wait" initial={false}>
                <motion.div
                  key={isMobileMenuOpen ? "close" : "open"}
                  initial={{ rotate: -90, opacity: 0 }}
                  animate={{ rotate: 0, opacity: 1 }}
                  exit={{ rotate: 90, opacity: 0 }}
                  transition={{ duration: 0.12 }}
                >
                  {isMobileMenuOpen ? (
                    <X className="w-5 h-5 sm:w-6 sm:h-6" />
                  ) : (
                    <Menu className="w-5 h-5 sm:w-6 sm:h-6" />
                  )}
                </motion.div>
              </AnimatePresence>
            </motion.button>
          </div>
        </div>

        {/* ===== Desktop mega dropdown for visible categories ===== */}
        <AnimatePresence mode="wait">
          {activeCategory && activeCat && (
            <motion.div
              key={activeCategory}
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 4 }}
              transition={{ duration: 0.12, ease: "easeOut" }}
              className="absolute top-full left-0 right-0 z-40 hidden lg:block"
              onMouseEnter={() => handleMouseEnter(activeCategory)}
              onMouseLeave={handleMouseLeave}
            >
              {/* Invisible bridge */}
              <div className="h-4" />

              <div className="max-w-[1440px] mx-auto px-4 md:px-6 lg:px-8">
                <div className="bg-white/[0.97] dark:bg-[#0e0e0e]/[0.97] backdrop-blur-2xl border border-neutral-200 dark:border-white/[0.08] rounded-2xl shadow-[0_24px_72px_-12px_rgba(0,0,0,0.18)] dark:shadow-[0_28px_80px_-12px_rgba(0,0,0,0.6)] relative overflow-hidden">
                  {/* Top glow line */}
                  <div className="absolute top-0 inset-x-0 h-px bg-gradient-to-r from-transparent via-emerald-500/50 dark:via-accent-glitch/40 to-transparent" />

                  {/* Technical Sub-Module Header Removed per User Request */}

                  {/* Tools grid */}
                  <div className="p-5 xl:p-7">
                    <motion.div
                      variants={staggerContainer}
                      initial="hidden"
                      animate="visible"
                      exit="exit"
                      className={`grid gap-1.5 xl:gap-2 ${
                        activeCat.tools.length <= 4
                          ? "grid-cols-2"
                          : activeCat.tools.length <= 8
                            ? "grid-cols-3"
                            : "grid-cols-3 xl:grid-cols-4"
                      }`}
                    >
                      {activeCat.tools.slice(0, 16).map((tool) => (
                        <motion.div key={tool.slug} variants={staggerItem}>
                          <Link
                            href={`/${activeCat.slug}/${tool.slug}`}
                            onClick={killDropdown}
                            className="group/tool flex items-center gap-3 px-3.5 py-3 xl:px-4 xl:py-3.5 rounded-xl border border-transparent hover:border-emerald-500/15 dark:hover:border-accent-glitch/15 hover:bg-emerald-500/[0.03] dark:hover:bg-white/[0.02] transition-all duration-200 relative"
                          >
                            <div className="w-8 h-8 xl:w-9 xl:h-9 bg-neutral-100 dark:bg-white/[0.03] border border-neutral-200/60 dark:border-white/[0.07] rounded-xl flex items-center justify-center shrink-0 group-hover/tool:bg-emerald-500/10 dark:group-hover/tool:bg-accent-glitch/10 group-hover/tool:border-emerald-500/25 dark:group-hover/tool:border-accent-glitch/25 transition-all duration-200">
                              <ToolIcon
                                slug={tool.slug}
                                categorySlug={activeCat.slug}
                                className="w-4 h-4 xl:w-[17px] xl:h-[17px] text-neutral-400 dark:text-neutral-500 group-hover/tool:text-emerald-600 dark:group-hover/tool:text-accent-glitch transition-colors duration-200"
                              />
                            </div>
                            <div className="flex flex-col min-w-0 flex-1">
                              <span className="text-[11px] xl:text-[12px] font-bold text-neutral-700 dark:text-neutral-200 group-hover/tool:text-neutral-900 dark:group-hover/tool:text-white truncate transition-colors duration-200 leading-tight">
                                {tool.name}
                              </span>
                              <span className="text-[8px] font-mono text-neutral-400 dark:text-neutral-600 uppercase tracking-widest mt-0.5 opacity-0 group-hover/tool:opacity-100 transition-opacity duration-200">
                                launch →
                              </span>
                            </div>
                            <ChevronRight className="w-3.5 h-3.5 text-emerald-500/50 dark:text-accent-glitch/50 ml-auto shrink-0 opacity-0 group-hover/tool:opacity-100 group-hover/tool:translate-x-0.5 transition-all duration-200" />
                          </Link>
                        </motion.div>
                      ))}
                    </motion.div>
                  </div>

                  {/* Bottom glow */}
                  <div className="absolute bottom-0 inset-x-0 h-px bg-gradient-to-r from-transparent via-emerald-500/15 dark:via-accent-glitch/10 to-transparent" />
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* ===== Mobile drawer ===== */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <>
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.25 }}
              className="fixed inset-0 z-40 bg-black/20 dark:bg-black/50 backdrop-blur-sm lg:hidden pointer-events-auto"
              onClick={closeMobile}
            />

            {/* Drawer */}
            <motion.div
              id="mobile-menu"
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={spring.fast}
              className="fixed top-0 right-0 bottom-0 z-50 w-full max-w-[100vw] sm:w-[380px] md:w-[420px] lg:hidden bg-white dark:bg-[#0a0a0a] border-l border-neutral-200 dark:border-white/[0.06] shadow-[-12px_0_40px_rgba(0,0,0,0.1)] dark:shadow-[-16px_0_50px_rgba(0,0,0,0.5)] flex flex-col will-change-transform pointer-events-auto"
              aria-label="Mobile navigation"
            >
              {/* Drawer header */}
              <div className="flex items-center justify-between px-4 sm:px-5 h-14 sm:h-16 border-b border-neutral-200 dark:border-white/[0.06] shrink-0 bg-white/50 dark:bg-[#0a0a0a]/50 backdrop-blur-xl">
                <div className="flex items-center gap-2.5">
                  <span className="text-sm sm:text-[15px] font-black uppercase tracking-wider text-neutral-800 dark:text-text-primary">
                    Navigation
                  </span>
                </div>
                <motion.button
                  whileTap={{ scale: 0.88 }}
                  onClick={closeMobile}
                  className="p-2 text-neutral-500 dark:text-text-muted hover:text-neutral-800 dark:hover:text-text-primary hover:bg-neutral-100 dark:hover:bg-white/[0.04] rounded-xl transition-colors"
                >
                  <X className="w-5 h-5" />
                </motion.button>
              </div>

              {/* Categories accordion */}
              <div className="flex-1 overflow-y-auto overscroll-contain px-3 sm:px-4 py-3 sm:py-4">
                <motion.div
                  variants={staggerContainer}
                  initial="hidden"
                  animate="visible"
                  exit="exit"
                  className="space-y-1"
                >
                  {categories.map((category) => (
                    <motion.div
                      key={category.slug}
                      variants={staggerItem}
                      className="rounded-2xl overflow-hidden"
                    >
                      {/* Category button */}
                      <button
                        onClick={() => toggleMobileCategory(category.slug)}
                        className={`w-full flex items-center justify-between gap-3 px-3.5 sm:px-4 py-3 sm:py-3.5 text-left rounded-2xl transition-all duration-200 active:scale-[0.99] ${
                          mobileExpanded === category.slug
                            ? "bg-emerald-500/[0.06] dark:bg-accent-glitch/[0.08] border border-emerald-500/15 dark:border-accent-glitch/15"
                            : "hover:bg-neutral-50 dark:hover:bg-white/[0.02] border border-transparent active:bg-neutral-100/60 dark:active:bg-white/[0.04]"
                        }`}
                        aria-expanded={mobileExpanded === category.slug}
                      >
                        <div className="flex items-center gap-3 min-w-0">
                          <div
                            className={`w-9 h-9 rounded-xl flex items-center justify-center shrink-0 text-xs font-black transition-all duration-200 ${
                              mobileExpanded === category.slug
                                ? "bg-emerald-500/15 dark:bg-accent-glitch/15 text-emerald-600 dark:text-accent-glitch border border-emerald-500/20 dark:border-accent-glitch/20"
                                : "bg-neutral-100 dark:bg-white/[0.04] text-neutral-400 dark:text-neutral-500 border border-neutral-200/50 dark:border-white/[0.06]"
                            }`}
                          >
                            {category.name.charAt(0)}
                          </div>
                          <div className="min-w-0">
                            <span className="text-[13px] font-bold text-neutral-800 dark:text-neutral-200 block truncate leading-tight">
                              {category.name}
                            </span>
                            <span className="text-[10px] text-neutral-400 dark:text-neutral-600 font-mono tracking-wider block mt-0.5">
                              {category.tools.length} tools
                            </span>
                          </div>
                        </div>
                        <motion.div
                          animate={{
                            rotate: mobileExpanded === category.slug ? 180 : 0,
                          }}
                          transition={{ duration: 0.2, ease: "easeOut" }}
                          className="shrink-0"
                        >
                          <ChevronDown
                            className={`w-4 h-4 transition-colors duration-200 ${
                              mobileExpanded === category.slug
                                ? "text-emerald-500 dark:text-accent-glitch"
                                : "text-neutral-300 dark:text-neutral-600"
                            }`}
                          />
                        </motion.div>
                      </button>

                      {/* Expanded tools */}
                      <AnimatePresence initial={false}>
                        {mobileExpanded === category.slug && (
                          <motion.div
                            initial={{ height: 0, opacity: 0 }}
                            animate={{ height: "auto", opacity: 1 }}
                            exit={{ height: 0, opacity: 0 }}
                            transition={{
                              height: {
                                duration: 0.25,
                                ease: [0.4, 0, 0.2, 1],
                              },
                              opacity: { duration: 0.15 },
                            }}
                            className="overflow-hidden"
                          >
                            <motion.div
                              variants={staggerContainer}
                              initial="hidden"
                              animate="visible"
                              exit="exit"
                              className="px-1 sm:px-1.5 pb-2 pt-1 space-y-0.5"
                            >
                              {category.tools.map((tool) => (
                                <motion.div
                                  key={tool.slug}
                                  variants={mobileToolItem}
                                >
                                  <Link
                                    href={`/${category.slug}/${tool.slug}`}
                                    onClick={closeMobile}
                                    className="group/tool flex items-center gap-3 px-3 py-2.5 sm:py-3 rounded-xl hover:bg-neutral-50 dark:hover:bg-white/[0.03] active:bg-neutral-100/80 dark:active:bg-white/[0.06] transition-colors duration-150 active:scale-[0.99]"
                                  >
                                    <div className="w-7 h-7 sm:w-8 sm:h-8 bg-neutral-50 dark:bg-white/[0.03] border border-neutral-200/50 dark:border-white/[0.05] rounded-lg flex items-center justify-center shrink-0 group-hover/tool:border-emerald-500/20 dark:group-hover/tool:border-accent-glitch/20 group-hover/tool:bg-emerald-500/5 dark:group-hover/tool:bg-accent-glitch/5 transition-all duration-150">
                                      <ToolIcon
                                        slug={tool.slug}
                                        categorySlug={category.slug}
                                        className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-neutral-400 dark:text-neutral-500 group-hover/tool:text-emerald-600 dark:group-hover/tool:text-accent-glitch transition-colors duration-150"
                                      />
                                    </div>
                                    <span className="text-[12px] sm:text-[13px] font-medium text-neutral-600 dark:text-neutral-400 group-hover/tool:text-neutral-900 dark:group-hover/tool:text-white truncate transition-colors duration-150 flex-1">
                                      {tool.name}
                                    </span>
                                    <ChevronRight className="w-3.5 h-3.5 text-neutral-300 dark:text-neutral-700 shrink-0 opacity-0 group-hover/tool:opacity-100 transition-opacity duration-150" />
                                  </Link>
                                </motion.div>
                              ))}

                              {/* View all */}
                              <motion.div variants={mobileToolItem}>
                                <Link
                                  href={`/${category.slug}`}
                                  onClick={closeMobile}
                                  className="flex items-center justify-center gap-2 mt-1 px-3 py-2.5 rounded-xl border border-dashed border-emerald-500/20 dark:border-accent-glitch/15 hover:border-emerald-500/40 dark:hover:border-accent-glitch/30 hover:bg-emerald-500/[0.03] dark:hover:bg-accent-glitch/[0.03] transition-all duration-200 active:scale-[0.98]"
                                >
                                  <span className="text-[10px] font-bold uppercase text-emerald-600 dark:text-accent-glitch tracking-wider">
                                    View All Modules
                                  </span>
                                </Link>
                              </motion.div>
                            </motion.div>
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </motion.div>
                  ))}
                </motion.div>
              </div>

              {/* Drawer footer */}
              <div className="shrink-0 border-t border-neutral-200 dark:border-white/[0.06] px-3 sm:px-4 py-3 sm:py-4 space-y-2 bg-neutral-50/50 dark:bg-white/[0.01]">
                <div className="flex items-center justify-between pt-1 px-1">
                  <span className="text-[8px] sm:text-[9px] font-mono text-neutral-400/40 dark:text-neutral-600 uppercase tracking-widest">
                    TypeWarp v1.0
                  </span>
                  <div className="flex items-center gap-1.5 text-[8px] sm:text-[9px] text-neutral-400/40 dark:text-neutral-600">
                    Online
                  </div>
                </div>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </header>
  );
};

export default Header;
