"use client";

import { useEffect, useState } from "react";
import { Terminal, ChevronDown, List } from "lucide-react";

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

      const docHeight =
        document.documentElement.scrollHeight - window.innerHeight;
      const scrollProgress = (window.scrollY / docHeight) * 100;
      setProgress(Math.min(100, Math.max(0, scrollProgress)));
    };

    window.addEventListener("scroll", handleScroll);
    handleScroll();
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
    <nav className="bg-bg-card/40 backdrop-blur-md border border-white/5 sticky top-32 overflow-hidden shadow-2xl group transition-all duration-300 hover:border-accent-glitch/20">
      {/* Progress Indicator */}
      <div className="h-[2px] bg-white/5 relative">
        <div
          className="h-full bg-accent-glitch shadow-[0_0_10px_var(--accent-glitch)] transition-all duration-300 ease-out"
          style={{ width: `${progress}%` }}
        />
        <div className="absolute top-0 right-0 h-full w-4 bg-gradient-to-l from-bg-void to-transparent z-10" />
      </div>

      {/* Header */}
      <button
        onClick={() => setIsExpanded(!isExpanded)}
        className="w-full p-5 flex items-center justify-between hover:bg-white/[0.03] transition-all group/header"
      >
        <div className="flex items-center gap-4">
          <div className="relative">
            <div className="w-10 h-10 border border-white/10 flex items-center justify-center bg-white/5 transition-all group-hover/header:border-accent-glitch/50 group-hover/header:bg-accent-glitch/10">
              <List className="w-4 h-4 text-text-muted group-hover/header:text-accent-glitch transition-colors" />
            </div>
          </div>
          <div className="text-left font-mono">
            <h2 className="text-[10px] font-black text-white uppercase tracking-[0.3em] leading-none mb-1.5">
              Table of Contents
            </h2>
            <div className="flex items-center gap-2">
              <span className="text-[8px] text-text-muted font-bold uppercase tracking-widest">
                {tocItems.length} Sections
              </span>
            </div>
          </div>
        </div>
        <ChevronDown
          className={`w-3.5 h-3.5 text-text-muted transition-transform duration-500 ${
            isExpanded ? "rotate-180" : ""
          }`}
        />
      </button>

      {/* Navigation List */}
      <div
        className={`overflow-hidden transition-all duration-700 cubic-bezier(0.16, 1, 0.3, 1) ${
          isExpanded ? "max-h-[65vh] opacity-100" : "max-h-0 opacity-0"
        }`}
      >
        <div className="px-3 pb-6 overflow-y-auto max-h-[55vh] custom-scrollbar">
          <ul className="space-y-0.5 font-mono">
            {tocItems.map((item, index) => {
              const isActive = activeId === item.id;
              const indent = (item.level - 1) * 8;

              return (
                <li key={item.id} style={{ paddingLeft: `${indent}px` }}>
                  <button
                    onClick={() => scrollToHeading(item.id)}
                    className={`w-full text-left py-2.5 px-4 text-[9px] font-black transition-all flex items-center gap-4 uppercase tracking-widest relative group/item overflow-hidden ${
                      isActive
                        ? "text-accent-glitch"
                        : "text-text-muted hover:text-white"
                    }`}
                  >
                    {/* Active Background Effect */}
                    {isActive && (
                      <div className="absolute inset-0 bg-accent-glitch/5 animate-in fade-in duration-500" />
                    )}

                    {/* Hover Effect */}
                    <div className="absolute inset-0 bg-white/5 -translate-x-full group-hover/item:translate-x-0 transition-transform duration-300" />

                    <span
                      className={`w-6 h-6 border flex items-center justify-center text-[8px] transition-all shrink-0 relative z-10 ${
                        isActive
                          ? "border-accent-glitch bg-accent-glitch text-black shadow-[0_0_15px_-3px_var(--accent-glitch)] scale-110"
                          : "border-white/10 text-white/20 group-hover/item:border-white/30 group-hover/item:text-white"
                      }`}
                    >
                      {String(index + 1).padStart(2, "0")}
                    </span>

                    <span className="relative z-10 truncate block flex-1">
                      {item.text}
                    </span>

                    {isActive && (
                      <div className="absolute left-0 top-0 w-[2px] h-full bg-accent-glitch shadow-[2px_0_10px_var(--accent-glitch)]" />
                    )}
                  </button>
                </li>
              );
            })}
          </ul>
        </div>
      </div>

      <div className="absolute bottom-0 left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-white/5 to-transparent" />
    </nav>
  );
}
