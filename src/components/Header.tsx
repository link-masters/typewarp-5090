"use client";

import React, { useState, useEffect, useRef } from "react";
import Link from "next/link";
import { categories } from "@/lib/categories";
import { useTheme } from "@/contexts/ThemeContext";
import { ToolIcon } from "@/components/ToolIcon";

const Header = () => {
  const { theme, toggleTheme } = useTheme();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [activeCategory, setActiveCategory] = useState<string | null>(null);
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);
  const navRef = useRef<HTMLElement>(null);

  useEffect(() => {
    document.body.style.overflow = isMobileMenuOpen ? "hidden" : "unset";
    return () => {
      document.body.style.overflow = "unset";
    };
  }, [isMobileMenuOpen]);

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (navRef.current && !navRef.current.contains(e.target as Node)) {
        setActiveCategory(null);
      }
    };
    const handleEsc = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setActiveCategory(null);
        setIsMobileMenuOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    document.addEventListener("keydown", handleEsc);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
      document.removeEventListener("keydown", handleEsc);
    };
  }, []);

  const handleMouseEnter = (slug: string) => {
    if (timeoutRef.current) clearTimeout(timeoutRef.current);
    setActiveCategory(slug);
  };

  const handleMouseLeave = () => {
    timeoutRef.current = setTimeout(() => setActiveCategory(null), 150);
  };

  const handleDropdownMouseEnter = () => {
    if (timeoutRef.current) clearTimeout(timeoutRef.current);
  };

  const closeAll = () => {
    setActiveCategory(null);
    setIsMobileMenuOpen(false);
  };

  const activeCategoryData = categories.find((c) => c.slug === activeCategory);

  return (
    <>
      <header className="fixed top-1.5 sm:top-2 left-0 right-0 px-2 sm:px-3 md:px-5 lg:px-6 z-50 w-full animate-fade-in">
        <div className="max-w-[1600px] mx-auto">
          <nav
            ref={navRef}
            className="relative grid grid-cols-[1fr_auto] lg:grid-cols-[auto_1fr_auto] items-center w-full px-3 sm:px-4 lg:px-5 xl:px-6 py-2.5 sm:py-3 lg:py-3 rounded-xl border border-zinc-200/80 dark:border-[var(--card-border)] shadow-[0_4px_30px_rgba(0,0,0,0.06)] dark:shadow-[0_8px_32px_rgba(0,0,0,0.3)] backdrop-blur-xl backdrop-saturate-150 bg-white/92 dark:bg-[var(--background)]/85"
          >
            {/* Logo */}
            <div className="flex items-center shrink-0 mr-2 lg:mr-5">
              <Link href="/" className="flex items-center shrink-0">
                <span className="text-lg sm:text-xl lg:text-[22px] font-black tracking-tighter text-[var(--foreground)]">
                  TYPE
                  <span className="text-red-500 italic inline-block transform -skew-x-12 ml-0.5">
                    WARP
                  </span>
                </span>
              </Link>
            </div>

            {/* Desktop Navigation */}
            <div className="hidden lg:flex items-center justify-center gap-0.5 xl:gap-1 min-w-0">
              <Link
                href="/"
                className="px-2.5 xl:px-3 py-2 text-[11px] xl:text-[12px] 2xl:text-[13px] font-bold uppercase tracking-wider text-[var(--muted)] hover:text-[var(--foreground)] hover:bg-[var(--card-bg)] rounded-lg transition-colors whitespace-nowrap shrink-0"
              >
                Home
              </Link>

              {categories.map((category) => (
                <div
                  key={category.slug}
                  className="relative flex items-center shrink-0"
                  onMouseEnter={() => handleMouseEnter(category.slug)}
                  onMouseLeave={handleMouseLeave}
                >
                  <button
                    onClick={() =>
                      setActiveCategory(
                        activeCategory === category.slug ? null : category.slug,
                      )
                    }
                    className={`px-2 xl:px-3 py-2 text-[11px] xl:text-[12px] 2xl:text-[13px] font-bold uppercase tracking-wider rounded-lg flex items-center gap-1 xl:gap-1.5 transition-all duration-200 shrink-0 ${
                      activeCategory === category.slug
                        ? "text-[var(--foreground)] bg-[var(--card-bg)]"
                        : "text-[var(--muted)] hover:text-[var(--foreground)] hover:bg-[var(--card-bg)]"
                    }`}
                  >
                    <span className="whitespace-nowrap">{category.name}</span>
                    <svg
                      className={`w-2.5 h-2.5 transition-transform duration-200 shrink-0 ${
                        activeCategory === category.slug ? "rotate-180" : ""
                      }`}
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2.5}
                        d="M19 9l-7 7-7-7"
                      />
                    </svg>
                  </button>
                </div>
              ))}

              <Link
                href="/blog"
                className="px-2.5 xl:px-3 py-2 text-[11px] xl:text-[12px] 2xl:text-[13px] font-bold uppercase tracking-wider text-[var(--muted)] hover:text-[var(--foreground)] hover:bg-[var(--card-bg)] rounded-lg transition-colors whitespace-nowrap shrink-0"
              >
                Blog
              </Link>
            </div>

            {/* Actions */}
            <div className="flex items-center justify-end gap-2 sm:gap-3 shrink-0 ml-2 lg:ml-5">
              {/* Modern Theme toggle */}
              <button
                onClick={toggleTheme}
                className="relative p-2.5 sm:p-2.5 rounded-xl bg-zinc-100 dark:bg-zinc-800 border border-zinc-200 dark:border-zinc-700 text-[var(--foreground)] hover:bg-zinc-200 dark:hover:bg-zinc-750 transition-all duration-300 group active:scale-90"
                aria-label="Toggle theme"
              >
                <div className="relative z-10 transition-transform duration-500 group-hover:rotate-[20deg] group-hover:scale-110">
                  {theme === "dark" ? (
                    <svg
                      className="w-5 h-5 text-red-500"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z"
                      />
                    </svg>
                  ) : (
                    <svg
                      className="w-5 h-5 text-amber-500"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364-6.364l-.707.707M6.343 17.657l-.707.707m12.728 0l-.707-.707M6.343 6.343l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z"
                      />
                    </svg>
                  )}
                </div>
                <div
                  className={`absolute inset-0 rounded-xl transition-opacity duration-300 opacity-0 group-hover:opacity-10 ${theme === "dark" ? "bg-red-500" : "bg-amber-500"}`}
                />
              </button>

              {/* Explore All Button - Simple Hover */}
              <Link
                href="/text-tools"
                className="hidden sm:inline-flex items-center gap-2 group relative px-5 xl:px-6 py-2 xl:py-2.5 rounded-lg bg-red-600 hover:bg-red-700 text-white text-[11px] xl:text-[12px] font-bold uppercase tracking-wider transition-all duration-200 active:scale-95 shadow-md hover:shadow-lg"
              >
                <svg
                  className="w-3.5 h-3.5 xl:w-4 xl:h-4 shrink-0"
                  viewBox="0 0 24 24"
                  fill="currentColor"
                >
                  <rect x="3" y="3" width="8" height="8" rx="2" />
                  <rect x="13" y="3" width="8" height="8" rx="2" />
                  <rect x="3" y="13" width="8" height="8" rx="2" />
                  <rect x="13" y="13" width="8" height="8" rx="2" />
                </svg>
                <span className="whitespace-nowrap">Explore All</span>
                <svg
                  className="w-3.5 h-3.5 shrink-0 opacity-0 -ml-1.5 group-hover:opacity-100 group-hover:ml-0 transition-all duration-200"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  strokeWidth={2.5}
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M9 5l7 7-7 7"
                  />
                </svg>
              </Link>

              <button
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                className="lg:hidden p-2 text-[var(--foreground)] hover:bg-[var(--card-bg)] rounded-lg transition-colors"
                aria-label="Toggle menu"
              >
                <svg
                  className="w-5 h-5"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  {isMobileMenuOpen ? (
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M6 18L18 6M6 6l12 12"
                    />
                  ) : (
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M4 6h16M4 12h16M4 18h16"
                    />
                  )}
                </svg>
              </button>
            </div>

            {/* Desktop Dropdown */}
            {activeCategory && activeCategoryData && (
              <div
                className="absolute top-full left-0 right-0 pt-2 z-50 hidden lg:block"
                onMouseEnter={handleDropdownMouseEnter}
                onMouseLeave={handleMouseLeave}
              >
                <div className="w-full p-6 xl:p-8 rounded-2xl border border-[var(--card-border)] bg-[var(--background)]/[0.98] backdrop-blur-2xl shadow-[0_30px_80px_rgba(0,0,0,0.15)] dark:shadow-[0_30px_80px_rgba(0,0,0,0.6)]">
                  <div className="grid grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-2.5 xl:gap-3.5 max-h-[60vh] overflow-y-auto custom-scrollbar">
                    {activeCategoryData.tools.map((tool) => (
                      <Link
                        key={tool.slug}
                        href={`/${activeCategoryData.slug}/${tool.slug}`}
                        onClick={() => setActiveCategory(null)}
                        className="group flex items-center gap-3.5 px-4.5 py-4 rounded-xl bg-[var(--card-bg)]/50 border border-transparent hover:bg-gradient-to-r hover:from-red-600/10 hover:to-purple-600/10 hover:border-red-500/20 transition-all duration-300"
                      >
                        <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-red-600/15 to-purple-600/15 flex items-center justify-center shrink-0 group-hover:scale-110 transition-transform shadow-sm">
                          <ToolIcon
                            slug={tool.slug}
                            categorySlug={activeCategoryData.slug}
                            className="w-5 h-5 text-red-600"
                          />
                        </div>
                        <span className="text-[13px] xl:text-[14px] font-bold text-[var(--foreground)] truncate group-hover:text-red-600 transition-colors uppercase tracking-tight">
                          {tool.name}
                        </span>
                      </Link>
                    ))}
                  </div>
                </div>
              </div>
            )}
          </nav>
        </div>
      </header>

      {/* Mobile Menu */}
      {isMobileMenuOpen && (
        <>
          <div
            className="fixed inset-0 bg-black/60 backdrop-blur-sm z-40 lg:hidden"
            onClick={() => setIsMobileMenuOpen(false)}
          />
          <div className="fixed top-0 right-0 bottom-0 w-full max-w-md bg-[var(--background)] border-l border-[var(--card-border)] z-50 lg:hidden">
            <div className="flex flex-col h-full">
              <div className="flex items-center justify-between p-4 sm:p-5 border-b border-[var(--card-border)]">
                <span className="text-lg font-black tracking-tighter text-[var(--foreground)]">
                  TYPE
                  <span className="text-red-500 italic -skew-x-12 inline-block ml-0.5">
                    WARP
                  </span>
                </span>
                <div className="flex items-center gap-2">
                  <button
                    onClick={toggleTheme}
                    className="p-2.5 bg-zinc-100 dark:bg-zinc-800 border border-zinc-200 dark:border-zinc-700 rounded-xl transition-colors"
                    aria-label="Toggle theme"
                  >
                    {theme === "dark" ? (
                      <svg
                        className="w-5 h-5 text-red-500"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z"
                        />
                      </svg>
                    ) : (
                      <svg
                        className="w-5 h-5 text-amber-500"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364-6.364l-.707.707M6.343 17.657l-.707.707m12.728 0l-.707-.707M6.343 6.343l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z"
                        />
                      </svg>
                    )}
                  </button>
                  <button
                    onClick={() => setIsMobileMenuOpen(false)}
                    className="p-2 hover:bg-[var(--card-bg)] rounded-lg transition-colors"
                    aria-label="Close menu"
                  >
                    <svg
                      className="w-5 h-5"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M6 18L18 6M6 6l12 12"
                      />
                    </svg>
                  </button>
                </div>
              </div>

              <div className="flex-1 overflow-y-auto p-4 sm:p-5 custom-scrollbar">
                <Link
                  href="/"
                  onClick={closeAll}
                  className="flex items-center gap-3 px-4 py-3 font-semibold text-[var(--foreground)] hover:bg-[var(--card-bg)] rounded-xl mb-1 transition-colors"
                >
                  <svg
                    className="w-5 h-5 text-[var(--muted)] shrink-0"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                    strokeWidth={2}
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-4 0a1 1 0 01-1-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 01-1 1h-2z"
                    />
                  </svg>
                  Home
                </Link>

                {categories.map((category) => (
                  <div key={category.slug} className="mb-1">
                    <button
                      onClick={() =>
                        setActiveCategory(
                          activeCategory === category.slug
                            ? null
                            : category.slug,
                        )
                      }
                      className={`w-full flex items-center justify-between px-4 py-3 font-semibold rounded-xl transition-colors ${
                        activeCategory === category.slug
                          ? "bg-[var(--card-bg)] text-[var(--foreground)]"
                          : "text-[var(--foreground)] hover:bg-[var(--card-bg)]"
                      }`}
                    >
                      <span>{category.name}</span>
                      <svg
                        className={`w-4 h-4 text-[var(--muted)] transition-transform duration-200 ${
                          activeCategory === category.slug ? "rotate-180" : ""
                        }`}
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M19 9l-7 7-7-7"
                        />
                      </svg>
                    </button>

                    {activeCategory === category.slug && (
                      <div className="mt-2 space-y-1.5 pl-2 pr-1">
                        {category.tools.map((tool) => (
                          <Link
                            key={tool.slug}
                            href={`/${category.slug}/${tool.slug}`}
                            onClick={closeAll}
                            className="flex items-center gap-3 px-4 py-3 rounded-xl bg-[var(--card-bg)]/50 hover:bg-gradient-to-r hover:from-red-500/10 hover:to-purple-500/10 transition-all"
                          >
                            <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-red-500/15 to-purple-500/15 flex items-center justify-center shrink-0">
                              <ToolIcon
                                slug={tool.slug}
                                categorySlug={category.slug}
                                className="w-4 h-4 text-red-500"
                              />
                            </div>
                            <span className="text-sm font-medium text-[var(--foreground)]">
                              {tool.name}
                            </span>
                          </Link>
                        ))}
                      </div>
                    )}
                  </div>
                ))}

                <Link
                  href="/blog"
                  onClick={closeAll}
                  className="flex items-center gap-3 px-4 py-3 font-semibold text-[var(--foreground)] hover:bg-[var(--card-bg)] rounded-xl mt-1 transition-colors"
                >
                  <svg
                    className="w-5 h-5 text-[var(--muted)] shrink-0"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                    strokeWidth={2}
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M19 20H5a2 2 0 01-2-2V6a2 2 0 012-2h10a2 2 0 012 2v1m2 13a2 2 0 01-2-2V7m2 13a2 2 0 002-2V9a2 2 0 00-2-2h-2m-4-3H9M7 16h6M7 8h6v4H7V8z"
                    />
                  </svg>
                  Blog
                </Link>
              </div>

              <div className="p-4 sm:p-5 border-t border-[var(--card-border)]">
                <Link
                  href="/text-tools"
                  onClick={closeAll}
                  className="flex items-center justify-center gap-2.5 w-full py-4 rounded-xl bg-gradient-to-r from-red-600 to-red-500 text-white font-bold text-sm tracking-wide shadow-[0_4px_16px_rgba(239,68,68,0.3)] transition-all active:scale-[0.98]"
                >
                  <svg
                    className="w-4.5 h-4.5"
                    viewBox="0 0 24 24"
                    fill="currentColor"
                  >
                    <rect x="3" y="3" width="8" height="8" rx="2" />
                    <rect x="13" y="3" width="8" height="8" rx="2" />
                    <rect x="3" y="13" width="8" height="8" rx="2" />
                    <rect x="13" y="13" width="8" height="8" rx="2" />
                  </svg>
                  Explore All Tools
                </Link>
              </div>
            </div>
          </div>
        </>
      )}
    </>
  );
};

export default Header;
