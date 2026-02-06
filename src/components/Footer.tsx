import React from "react";
import Link from "next/link";
import { categories } from "@/lib/categories";

const Footer = () => {
  const legalLinks = [
    { href: "/about", label: "About Us" },
    { href: "/terms", label: "Terms of Service" },
    { href: "/privacy", label: "Privacy Policy" },
    { href: "/cookies", label: "Cookie Policy" },
    { href: "/gdpr", label: "GDPR Compliance" },
    { href: "/contact", label: "Contact Us" },
  ];

  return (
    <footer className="w-full py-16 px-6 md:px-12 lg:px-16 xl:px-20 border-t border-[var(--card-border)] bg-[var(--background)]">
      <div className="mx-auto max-w-7xl">
        {/* Main Footer Content */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 mb-12">
          {/* Brand Section */}
          <div className="lg:col-span-3">
            <Link href="/" className="inline-block mb-5">
              <h2 className="text-2xl font-black text-[var(--foreground)] tracking-tighter">
                TYPE
                <span className="text-red-500 italic inline-block transform -skew-x-12 ml-0.5">
                  WARP
                </span>
              </h2>
            </Link>
            <p className="text-[var(--muted)] text-sm leading-relaxed max-w-xs">
              Transform your text with our comprehensive collection of 58+ text
              generators, translators, and tools. Perfect for social media,
              gaming, and creative expression.
            </p>
          </div>

          {/* Categories + Legal Grid */}
          <nav className="lg:col-span-9" aria-label="Footer navigation">
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-x-8 gap-y-10">
              {/* All Categories with ALL Tools */}
              {categories.map((category) => (
                <div key={category.slug}>
                  <h3 className="text-[11px] font-black text-[var(--foreground)] mb-6 pb-2 border-b border-[var(--card-border)] uppercase tracking-[0.2em]">
                    {category.name}
                  </h3>
                  <ul className="space-y-2">
                    {/* ALL TOOLS - No slice, no limit */}
                    {category.tools.map((tool) => (
                      <li key={tool.slug}>
                        <Link
                          href={`/${category.slug}/${tool.slug}`}
                          className="text-sm text-[var(--muted)] hover:text-[var(--foreground)] transition-colors duration-200 block"
                        >
                          {tool.name}
                        </Link>
                      </li>
                    ))}
                  </ul>
                </div>
              ))}

              {/* Legal Section - After all categories */}
              <div>
                <h3 className="text-[11px] font-black text-[var(--foreground)] mb-6 pb-2 border-b border-[var(--card-border)] uppercase tracking-[0.2em]">
                  Legal
                </h3>
                <ul className="space-y-2">
                  {legalLinks.map((link) => (
                    <li key={link.href}>
                      <Link
                        href={link.href}
                        className="text-sm text-[var(--muted)] hover:text-[var(--foreground)] transition-colors duration-200 block"
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

        {/* Bottom Bar */}
        <div className="pt-8 border-t border-[var(--card-border)] flex flex-col sm:flex-row justify-between items-center gap-4">
          <p className="text-sm text-[var(--muted)]">
            © {new Date().getFullYear()} TypeWarp. All rights reserved.
          </p>
          <p className="text-sm text-[var(--muted)]">
            Made with ❤️ for text enthusiasts
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
