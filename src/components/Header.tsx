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

  useEffect(() => {
    document.body.style.overflow = isMobileMenuOpen ? "hidden" : "unset";
  }, [isMobileMenuOpen]);

  const handleMouseEnter = (slug: string) => {
    if (timeoutRef.current) clearTimeout(timeoutRef.current);
    setActiveCategory(slug);
  };

  const handleMouseLeave = () => {
    timeoutRef.current = setTimeout(() => setActiveCategory(null), 80);
  };

  return (
    <>
      <header className="fixed top-4 left-0 right-0 px-4 md:px-6 lg:px-8 z-50 w-full">
        <div className="max-w-[1600px] mx-auto">
          <nav className="flex items-center justify-between w-full px-6 lg:px-8 py-3.5 rounded-xl border-[0.6px] shadow-2xl backdrop-blur-xl backdrop-saturate-150 border-[var(--card-border)] bg-[var(--background)]/80">
            {/* Logo */}
            <Link href="/" className="flex items-center shrink-0 min-w-[140px]">
              <span className="text-xl sm:text-2xl font-black tracking-tighter text-[var(--foreground)]">
                TYPE
                <span className="text-red-500 italic inline-block transform -skew-x-12 ml-0.5">
                  WARP
                </span>
              </span>
            </Link>

            {/* Desktop Navigation */}
            <div className="hidden lg:flex items-center justify-center flex-1 gap-2 px-8 relative h-10">
              <Link
                href="/"
                className="px-5 py-2.5 text-sm font-medium text-[var(--muted)] hover:text-[var(--foreground)] hover:bg-[var(--card-bg)] rounded-lg"
              >
                Home
              </Link>

              {categories.map((category) => (
                <div
                  key={category.slug}
                  className="h-full flex items-center"
                  onMouseEnter={() => handleMouseEnter(category.slug)}
                  onMouseLeave={handleMouseLeave}
                >
                  <button
                    onClick={() =>
                      setActiveCategory(
                        activeCategory === category.slug ? null : category.slug,
                      )
                    }
                    className={`px-5 py-2.5 text-sm font-medium rounded-lg flex items-center gap-2 transition-all ${
                      activeCategory === category.slug
                        ? "text-[var(--foreground)] bg-[var(--card-bg)]"
                        : "text-[var(--muted)] hover:text-[var(--foreground)] hover:bg-[var(--card-bg)]"
                    }`}
                  >
                    <span>{category.name}</span>
                    <svg
                      className={`w-3.5 h-3.5 transition-transform duration-200 ${
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
                    <div className="absolute top-[calc(100%+0.5rem)] left-0 right-0 z-50 flex justify-center pointer-events-none">
                      <div className="w-[950px] max-w-[calc(100vw-4rem)] p-5 rounded-xl border border-[var(--card-border)] bg-[var(--background)]/95 backdrop-blur-2xl shadow-2xl pointer-events-auto animate-fade-in-up-fast">
                        <div className="grid grid-cols-3 gap-3 max-h-[60vh] overflow-y-auto custom-scrollbar pr-2">
                          {category.tools.map((tool) => (
                            <Link
                              key={tool.slug}
                              href={`/${category.slug}/${tool.slug}`}
                              onClick={() => setActiveCategory(null)}
                              className="group flex items-center gap-4 px-5 py-4 rounded-lg bg-[var(--card-bg)]/40 border border-transparent hover:bg-gradient-to-r hover:from-red-500/10 hover:to-purple-500/10 hover:border-red-500/25 transition-all"
                            >
                              <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-red-500/15 to-purple-500/15 flex items-center justify-center shrink-0 group-hover:from-red-500/25 group-hover:to-purple-500/25 transition-colors">
                                <ToolIcon
                                  slug={tool.slug}
                                  categorySlug={category.slug}
                                  className="w-5 h-5 text-red-500"
                                />
                              </div>
                              <div className="flex flex-col min-w-0">
                                <span className="text-sm font-semibold text-[var(--foreground)] truncate group-hover:text-red-500 transition-colors">
                                  {tool.name}
                                </span>
                              </div>
                              <svg
                                className="w-4 h-4 ml-auto text-red-500 opacity-0 group-hover:opacity-100 shrink-0 transition-all transform translate-x-2 group-hover:translate-x-0"
                                fill="none"
                                stroke="currentColor"
                                viewBox="0 0 24 24"
                              >
                                <path
                                  strokeLinecap="round"
                                  strokeLinejoin="round"
                                  strokeWidth={2}
                                  d="M9 5l7 7-7 7"
                                />
                              </svg>
                            </Link>
                          ))}
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              ))}

              <Link
                href="/blog"
                className="px-5 py-2.5 text-sm font-medium text-[var(--muted)] hover:text-[var(--foreground)] hover:bg-[var(--card-bg)] rounded-xl"
              >
                Blog
              </Link>
            </div>

            {/* Actions */}
            <div className="hidden lg:flex items-center justify-end gap-4 min-w-[200px]">
              <button
                onClick={toggleTheme}
                className="relative p-2.5 rounded-xl bg-[var(--card-bg)] border border-[var(--card-border)] text-[var(--foreground)] hover:bg-[var(--card-border)] transition-all duration-300 group active:scale-90"
                aria-label="Toggle theme"
              >
                <div className="relative z-10 transition-transform duration-500 group-hover:rotate-[15deg]">
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
                      className="w-5 h-5 text-blue-500"
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
                  className={`absolute inset-0 rounded-xl transition-opacity duration-300 opacity-0 group-hover:opacity-10 ${theme === "dark" ? "bg-red-500" : "bg-blue-500"}`}
                />
              </button>

              <Link
                href="/text-tools"
                className="group relative px-6 py-2.5 rounded-xl bg-gradient-to-r from-red-600 to-purple-600 text-white text-sm font-bold shadow-[0_4px_15px_rgba(220,38,38,0.2)] hover:shadow-[0_8px_25px_rgba(220,38,38,0.4)] transition-all overflow-hidden"
              >
                {/* Subtle Shimmer Sweep */}
                <span className="absolute inset-0 block w-full h-full bg-gradient-to-r from-transparent via-white/10 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000 ease-in-out" />
                <span className="relative z-10 whitespace-nowrap">
                  Explore All Tools
                </span>
              </Link>
            </div>

            {/* Mobile Menu Button */}
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="lg:hidden p-2.5 text-[var(--foreground)] hover:bg-[var(--card-bg)] rounded-xl"
              aria-label="Toggle menu"
            >
              <svg
                className="w-6 h-6"
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
          </nav>
        </div>
      </header>

      {/* Mobile Menu */}
      {isMobileMenuOpen && (
        <>
          <div
            className="fixed inset-0 bg-black/80 backdrop-blur-sm z-40 lg:hidden"
            onClick={() => setIsMobileMenuOpen(false)}
          />
          <div className="fixed top-0 right-0 bottom-0 w-full max-w-md bg-[var(--background)] border-l border-[var(--card-border)] z-50 lg:hidden">
            <div className="flex flex-col h-full">
              <div className="flex items-center justify-between p-6 border-b border-[var(--card-border)]">
                <span className="text-xl font-black tracking-tighter text-[var(--foreground)]">
                  TYPE
                  <span className="text-red-500 italic -skew-x-12 inline-block ml-0.5">
                    WARP
                  </span>
                </span>
                <div className="flex items-center gap-3">
                  <button
                    onClick={toggleTheme}
                    className="p-2.5 hover:bg-[var(--card-bg)] rounded-xl"
                  >
                    {theme === "dark" ? (
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
                          d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364-6.364l-.707.707M6.343 17.657l-.707.707m12.728 0l-.707-.707M6.343 6.343l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z"
                        />
                      </svg>
                    ) : (
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
                          d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z"
                        />
                      </svg>
                    )}
                  </button>
                  <button
                    onClick={() => setIsMobileMenuOpen(false)}
                    className="p-2.5 hover:bg-[var(--card-bg)] rounded-xl"
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

              <div className="flex-1 overflow-y-auto p-5 custom-scrollbar">
                <Link
                  href="/"
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="block px-5 py-3.5 font-medium hover:bg-[var(--card-bg)] rounded-xl mb-2"
                >
                  Home
                </Link>
                {categories.map((category) => (
                  <div key={category.slug} className="mb-3">
                    <button
                      onClick={() =>
                        setActiveCategory(
                          activeCategory === category.slug
                            ? null
                            : category.slug,
                        )
                      }
                      className={`w-full flex items-center justify-between px-5 py-3.5 font-medium rounded-lg ${activeCategory === category.slug ? "bg-[var(--card-bg)]" : "hover:bg-[var(--card-bg)]"}`}
                    >
                      <span>{category.name}</span>
                      <svg
                        className={`w-4 h-4 ${activeCategory === category.slug ? "rotate-180" : ""}`}
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
                      <div className="mt-3 space-y-2 pl-3 animate-fade-in-up-fast">
                        {category.tools.map((tool) => (
                          <Link
                            key={tool.slug}
                            href={`/${category.slug}/${tool.slug}`}
                            onClick={() => {
                              setIsMobileMenuOpen(false);
                              setActiveCategory(null);
                            }}
                            className="flex items-center gap-4 px-5 py-3.5 rounded-lg bg-[var(--card-bg)]/50 hover:bg-gradient-to-r hover:from-red-500/10 hover:to-purple-500/10"
                          >
                            <div className="w-9 h-9 rounded-lg bg-gradient-to-br from-red-500/15 to-purple-500/15 flex items-center justify-center shrink-0">
                              <ToolIcon
                                slug={tool.slug}
                                categorySlug={category.slug}
                                className="w-4 h-4 text-red-500"
                              />
                            </div>
                            <span className="text-sm font-medium">
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
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="block px-5 py-3.5 font-medium hover:bg-[var(--card-bg)] rounded-lg"
                >
                  Blog
                </Link>
              </div>

              <div className="p-5 border-t border-[var(--card-border)]">
                <Link
                  href="/text-tools"
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="block w-full py-3.5 rounded-lg bg-gradient-to-r from-red-600 to-purple-600 text-white font-bold text-base text-center transition-all active:scale-[0.98]"
                >
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
