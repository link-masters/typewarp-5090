"use client";

import React from "react";
import Link from "next/link";
import { categories } from "@/lib/categories";

const Footer = () => {
  const legalLinks = [
    { href: "/blog", label: "Blog" },
    { href: "/about", label: "About Us" },
    { href: "/terms", label: "Terms of Service" },
    { href: "/privacy", label: "Privacy Policy" },
    { href: "/cookies", label: "Cookie Policy" },
    { href: "/gdpr", label: "GDPR Compliance" },
    { href: "/contact", label: "Contact Us" },
  ];

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <footer className="w-full border-t border-zinc-200 dark:border-[var(--card-border)] bg-zinc-50 dark:bg-[var(--background)]">
      {/* Main Footer Content */}
      <div className="mx-auto max-w-7xl px-5 sm:px-6 md:px-10 lg:px-16 xl:px-20 py-12 sm:py-14 lg:py-16">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 xl:gap-16">
          {/* Brand Section */}
          <div className="lg:col-span-3 xl:col-span-3">
            <Link href="/" className="inline-block mb-4">
              <h2 className="text-2xl font-black text-[var(--foreground)] tracking-tighter">
                TYPE
                <span className="text-red-500 italic inline-block transform -skew-x-12 ml-0.5">
                  WARP
                </span>
              </h2>
            </Link>
            <p className="text-[var(--muted)] text-sm leading-relaxed mb-6 max-w-xs">
              Transform your text with our comprehensive collection of text
              generators, translators, and tools. Perfect for social media,
              gaming, and creative expression.
            </p>
          </div>

          {/* Categories + Legal Grid */}
          <nav
            className="lg:col-span-9 xl:col-span-9"
            aria-label="Footer navigation"
          >
            <div className="grid grid-cols-2 sm:grid-cols-3 xl:grid-cols-4 gap-x-6 sm:gap-x-8 lg:gap-x-10 gap-y-8 sm:gap-y-10">
              {/* All Categories */}
              {categories.map((category) => (
                <div key={category.slug} className="min-w-0">
                  <Link
                    href={`/${category.slug}`}
                    className="group inline-flex items-center gap-1.5 mb-4 pb-2.5 border-b border-[var(--card-border)] w-full"
                  >
                    <h3 className="text-[11px] font-black text-[var(--foreground)] uppercase tracking-[0.15em] group-hover:text-red-500 transition-colors truncate">
                      {category.name}
                    </h3>
                    <svg
                      className="w-3 h-3 shrink-0 text-[var(--muted)] opacity-0 -ml-1 group-hover:opacity-100 group-hover:ml-0 transition-all duration-200"
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
                  <ul className="space-y-1.5">
                    {category.tools.map((tool) => (
                      <li key={tool.slug}>
                        <Link
                          href={`/${category.slug}/${tool.slug}`}
                          className="text-[13px] leading-snug text-[var(--muted)] hover:text-[var(--foreground)] hover:pl-1 transition-all duration-200 block py-0.5 truncate"
                        >
                          {tool.name}
                        </Link>
                      </li>
                    ))}
                  </ul>
                </div>
              ))}

              {/* Legal & Company Section */}
              <div className="min-w-0">
                <h3 className="text-[11px] font-black text-[var(--foreground)] mb-4 pb-2.5 border-b border-[var(--card-border)] uppercase tracking-[0.15em] w-full">
                  Company & Legal
                </h3>
                <ul className="space-y-1.5">
                  {legalLinks.map((link) => (
                    <li key={link.href}>
                      <Link
                        href={link.href}
                        className="text-[13px] leading-snug text-[var(--muted)] hover:text-[var(--foreground)] hover:pl-1 transition-all duration-200 block py-0.5"
                      >
                        {link.label}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </nav>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t border-zinc-200 dark:border-[var(--card-border)]">
        <div className="mx-auto max-w-7xl px-5 sm:px-6 md:px-10 lg:px-16 xl:px-20 py-5 sm:py-6 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-[13px] text-[var(--muted)] text-center sm:text-left">
            © {new Date().getFullYear()} TypeWarp. All rights reserved.
          </p>

          <div className="flex items-center gap-4">
            <p className="text-[13px] text-[var(--muted)]">
              Made with{" "}
              <span className="text-red-500" aria-label="love">
                ❤️
              </span>{" "}
              for text enthusiasts
            </p>

            {/* Back to Top */}
            <button
              onClick={scrollToTop}
              className="p-2 rounded-lg bg-[var(--card-bg)] border border-[var(--card-border)] text-[var(--muted)] hover:text-[var(--foreground)] hover:bg-[var(--card-border)] transition-all duration-200 active:scale-90"
              aria-label="Back to top"
            >
              <svg
                className="w-4 h-4"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                strokeWidth={2.5}
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M5 15l7-7 7 7"
                />
              </svg>
            </button>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
