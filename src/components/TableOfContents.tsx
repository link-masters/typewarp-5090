"use client";

import { useEffect, useState } from "react";

interface TocItem {
  id: string;
  text: string;
  level: number;
}

interface TableOfContentsProps {
  items?: TocItem[];
  content?: string;
}

export default function TableOfContents({
  items,
  content,
}: TableOfContentsProps) {
  const [activeId, setActiveId] = useState<string>("");
  const [tocItems, setTocItems] = useState<TocItem[]>(items || []);
  const [isExpanded, setIsExpanded] = useState(true);
  const [progress, setProgress] = useState(0);

  // Extract headings from content if items not provided
  useEffect(() => {
    if (!items && content) {
      const headingRegex = /^#{1,3}\s+(.+)$/gm;
      const extracted: TocItem[] = [];
      let match;

      while ((match = headingRegex.exec(content)) !== null) {
        const level = match[0].indexOf(" ");
        const text = match[1].trim();
        const id = text.toLowerCase().replace(/[^\w]+/g, "-");
        extracted.push({ id, text, level });
      }

      setTocItems(extracted);
    }
  }, [content, items]);

  // Track active heading on scroll
  useEffect(() => {
    const handleScroll = () => {
      const headings = tocItems.map((item) => document.getElementById(item.id));
      const scrollPosition = window.scrollY + 150;

      for (let i = headings.length - 1; i >= 0; i--) {
        const heading = headings[i];
        if (heading && heading.offsetTop <= scrollPosition) {
          setActiveId(tocItems[i].id);
          break;
        }
      }

      // Calculate reading progress
      const docHeight =
        document.documentElement.scrollHeight - window.innerHeight;
      const scrollProgress = (window.scrollY / docHeight) * 100;
      setProgress(Math.min(100, Math.max(0, scrollProgress)));
    };

    window.addEventListener("scroll", handleScroll);
    handleScroll(); // Initial check
    return () => window.removeEventListener("scroll", handleScroll);
  }, [tocItems]);

  if (tocItems.length === 0) return null;

  const scrollToHeading = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      const offset = 100;
      const elementPosition = element.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.pageYOffset - offset;

      window.scrollTo({
        top: offsetPosition,
        behavior: "smooth",
      });
    }
  };

  return (
    <nav className="bg-[var(--card-bg)] backdrop-blur-xl border border-[var(--card-border)] rounded-2xl overflow-hidden sticky top-28 shadow-lg">
      {/* Progress Bar */}
      <div className="h-1 bg-[var(--card-border)]">
        <div
          className="h-full bg-gradient-to-r from-red-500 to-purple-500 transition-all duration-150"
          style={{ width: `${progress}%` }}
        />
      </div>

      {/* Header */}
      <button
        onClick={() => setIsExpanded(!isExpanded)}
        className="w-full p-5 flex items-center justify-between hover:bg-[var(--background)] transition-colors"
      >
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-red-500/20 to-purple-500/20 flex items-center justify-center">
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
                d="M4 6h16M4 12h16M4 18h7"
              />
            </svg>
          </div>
          <div className="text-left">
            <h2 className="text-sm font-bold text-[var(--foreground)] uppercase tracking-wider">
              Contents
            </h2>
            <span className="text-xs text-[var(--muted)]">
              {tocItems.length} sections
            </span>
          </div>
        </div>
        <svg
          className={`w-5 h-5 text-[var(--muted)] transition-transform duration-300 ${
            isExpanded ? "rotate-180" : ""
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

      {/* Content */}
      <div
        className={`overflow-hidden transition-all duration-300 ${
          isExpanded ? "max-h-[60vh]" : "max-h-0"
        }`}
      >
        <div className="px-5 pb-5 overflow-y-auto max-h-[55vh] scrollbar-thin scrollbar-thumb-[var(--card-border)] scrollbar-track-transparent">
          <ul className="space-y-1">
            {tocItems.map((item, index) => {
              const isActive = activeId === item.id;
              const indent = (item.level - 1) * 12;

              return (
                <li key={item.id} style={{ paddingLeft: `${indent}px` }}>
                  <button
                    onClick={() => scrollToHeading(item.id)}
                    className={`w-full text-left py-2.5 px-4 rounded-xl text-sm font-medium transition-all duration-200 flex items-center gap-3 group ${
                      isActive
                        ? "bg-red-500/10 text-red-500 border-l-2 border-red-500"
                        : "text-[var(--muted)] hover:text-[var(--foreground)] hover:bg-[var(--background)]"
                    }`}
                  >
                    <span
                      className={`w-6 h-6 rounded-lg flex items-center justify-center text-xs font-bold shrink-0 transition-colors ${
                        isActive
                          ? "bg-red-500 text-white"
                          : "bg-[var(--card-border)] text-[var(--muted)] group-hover:bg-[var(--muted)] group-hover:text-[var(--background)]"
                      }`}
                    >
                      {index + 1}
                    </span>
                    <span className="truncate">{item.text}</span>
                  </button>
                </li>
              );
            })}
          </ul>
        </div>
      </div>
    </nav>
  );
}
