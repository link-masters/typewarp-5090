"use client";

import React, { useState, useEffect, useRef, useCallback } from "react";
import Link from "next/link";
import { toolConfigs } from "@/lib/toolConfig";
import { transformText } from "@/lib/transformers";
import { ToolIcon } from "@/components/ToolIcon";
import {
  Copy,
  Trash2,
  Settings,
  Info,
  Zap,
  Terminal,
  ChevronRight,
  Home,
  CheckCircle2,
  BarChart3,
  Shuffle,
  X,
  ChevronDown,
} from "lucide-react";
import BackgroundEffect from "@/components/BackgroundEffect";
import { motion, AnimatePresence } from "framer-motion";

interface ToolViewProps {
  tool: {
    name: string;
    slug: string;
    icon?: string;
    description?: string;
  };
  category: {
    name: string;
    slug: string;
    tools: any[];
  };
  hideFaqs?: boolean;
}

const colors = [
  { name: "Default", value: "inherit", bg: "bg-text-primary/20" },
  { name: "Acid", value: "#39FF14", bg: "bg-[#39FF14]" },
  { name: "Neon", value: "#BC13FE", bg: "bg-[#BC13FE]" },
  { name: "Blood", value: "#FF0000", bg: "bg-[#FF0000]" },
  { name: "Void", value: "#00E5FF", bg: "bg-[#00E5FF]" },
  { name: "Gold", value: "#FFD700", bg: "bg-[#FFD700]" },
];

const platformLimits = [
  { name: "Twitter/X", limit: 280, icon: "𝕏" },
  { name: "Instagram Bio", limit: 150, icon: "📸" },
  { name: "Instagram Caption", limit: 2200, icon: "📝" },
  { name: "Discord Message", limit: 2000, icon: "💬" },
  { name: "TikTok Bio", limit: 80, icon: "🎵" },
  { name: "TikTok Caption", limit: 2200, icon: "🎶" },
  { name: "YouTube Title", limit: 100, icon: "▶" },
  { name: "Facebook Post", limit: 63206, icon: "📘" },
  { name: "LinkedIn Post", limit: 3000, icon: "💼" },
  { name: "WhatsApp Status", limit: 139, icon: "📱" },
  { name: "Reddit Title", limit: 300, icon: "🔴" },
];

interface CopyHistoryItem {
  text: string;
  timestamp: number;
}

export default function ToolView({
  tool,
  category,
  hideFaqs = false,
}: ToolViewProps) {
  const [input, setInput] = useState("");
  const [output, setOutput] = useState("");
  const [isCopied, setIsCopied] = useState(false);
  const [outputColor, setOutputColor] = useState("inherit");
  const [showPlatformLimits, setShowPlatformLimits] = useState(false);
  const [openDropdown, setOpenDropdown] = useState<string | null>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const scrollRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLTextAreaElement>(null);
  const outputRef = useRef<HTMLTextAreaElement>(null);
  const copyTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const [options, setOptions] = useState({
    intensity: 5,
    spacing: 1,
    uppercase: false,
    customSettings: {} as Record<string, any>,
  });

  const toolConfig = toolConfigs[tool.slug];

  useEffect(() => {
    if (toolConfig) {
      const defaults: Record<string, any> = {};
      toolConfig.controls.forEach((c: any) => {
        defaults[c.id] = c.defaultValue;
      });
      setOptions((prev) => ({
        ...prev,
        customSettings: { ...defaults, ...prev.customSettings },
      }));
    }
  }, [tool.slug, toolConfig]);

  useEffect(() => {
    const result = transformText(input, tool.slug, options);
    setOutput(result);
  }, [input, tool.slug, options]);

  // Handle clicking outside of dropdowns
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        containerRef.current &&
        !containerRef.current.contains(event.target as Node)
      ) {
        setOpenDropdown(null);
      }
    };

    if (openDropdown) {
      document.addEventListener("mousedown", handleClickOutside);
    }
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [openDropdown]);

  // Prevent scroll chaining when interacting with the dropdown
  useEffect(() => {
    const el = scrollRef.current;
    if (!el || !openDropdown) return;

    const handleWheel = (e: WheelEvent) => {
      const { scrollTop, scrollHeight, clientHeight } = el;
      const delta = e.deltaY;
      const isScrollingUp = delta < 0;
      const isScrollingDown = delta > 0;

      // When we're at the top and trying to scroll up, OR at the bottom and trying to scroll down,
      // prevent the event from reaching the document/body
      if (
        (isScrollingUp && scrollTop <= 0) ||
        (isScrollingDown && scrollTop + clientHeight >= scrollHeight - 1)
      ) {
        e.preventDefault();
      }
      e.stopPropagation();
    };

    el.addEventListener("wheel", handleWheel, { passive: false });
    return () => {
      el.removeEventListener("wheel", handleWheel);
    };
  }, [openDropdown]);

  // Prevent scroll chaining for input and output textareas
  useEffect(() => {
    const refs = [inputRef, outputRef];
    const cleanups: (() => void)[] = [];

    refs.forEach((ref) => {
      const el = ref.current;
      if (!el) return;

      const handleWheel = (e: WheelEvent) => {
        const { scrollTop, scrollHeight, clientHeight } = el;
        const delta = e.deltaY;
        const isScrollingUp = delta < 0;
        const isScrollingDown = delta > 0;

        if (
          (isScrollingUp && scrollTop <= 0) ||
          (isScrollingDown && scrollTop + clientHeight >= scrollHeight - 1)
        ) {
          if (scrollHeight > clientHeight) {
            e.preventDefault();
          }
        }
        e.stopPropagation();
      };

      el.addEventListener("wheel", handleWheel, { passive: false });
      cleanups.push(() => el.removeEventListener("wheel", handleWheel));
    });

    return () => cleanups.forEach((c) => c());
  }, [output]);

  const lockBodyScroll = useCallback(() => {
    document.body.style.overflow = "hidden";
    document.documentElement.style.overflowX = "hidden";
  }, []);

  const unlockBodyScroll = useCallback(() => {
    document.body.style.overflow = "";
    document.documentElement.style.overflowX = "";
  }, []);

  // Lock body scroll and prevent horizontal overflow when any customization dropdown is open
  useEffect(() => {
    if (openDropdown) {
      lockBodyScroll();
      return () => {
        unlockBodyScroll();
      };
    }
  }, [openDropdown, lockBodyScroll, unlockBodyScroll]);

  const handleCopy = useCallback(
    (textToCopy?: string) => {
      const text = textToCopy || output;
      if (!text) return;

      if (outputColor !== "inherit" && !textToCopy) {
        const html = `<span style="color: ${outputColor}">${text.replace(/\n/g, "<br>")}</span>`;
        const textBlob = new Blob([text], { type: "text/plain" });
        const htmlBlob = new Blob([html], { type: "text/html" });

        try {
          navigator.clipboard.write([
            new ClipboardItem({
              "text/plain": textBlob,
              "text/html": htmlBlob,
            }),
          ]);
        } catch (e) {
          navigator.clipboard.writeText(text);
        }
      } else {
        navigator.clipboard.writeText(text);
      }

      // Clear any existing timer to prevent stacking
      if (copyTimerRef.current) clearTimeout(copyTimerRef.current);

      setIsCopied(true);
      copyTimerRef.current = setTimeout(() => {
        setIsCopied(false);
      }, 1500);
    },
    [output, outputColor],
  );

  const handleClear = () => {
    setInput("");
    setOutput("");
  };

  const getDynamicContent = () => {
    const name = tool.name;
    const cat = category.name;
    const s = tool.slug;

    let aboutText = `The ${name} is a high-performance ${cat.toLowerCase()} generator engineered for elite digital creators. By utilizing sophisticated Unicode mapping protocols, it converts your standard text into a ${tool.slug.replace("-", " ")} masterpiece in milliseconds. In today's attention economy, ordinary text is invisible; our ${name} ensures your message breaks through the noise on platforms like Instagram, Discord, and TikTok.`;

    if (s === "tiktok-font") {
      aboutText = `Maximize your viral potential with the industry-leading TikTok Font Generator. TikTok's algorithm prioritizes high engagement, and visual contrast is the key. Our generator provides specially curated Unicode styles that bypass standard system font limitations, allowing you to create high-impact captions, bios, and on-screen text that demand attention. Whether you're a micro-influencer or a global brand, this tool is your secret weapon for the 'For You' page.`;
    } else if (s === "instagram-font") {
      aboutText = `Curate a world-class aesthetic with the definitive Instagram Font Generator. Your Instagram profile is your digital storefront; don't settle for generic typography. Our platform offers an extensive library of premium styles—from minimalist sans-serifs to decorative scripts—all 100% compatible with IG's latest updates. Transform your bio, stories, and captions into a cohesive brand experience that attracts followers and builds authority.`;
    } else if (s.includes("cursed") || s.includes("zalgo")) {
      aboutText = `Step into the realm of digital entropy with our advanced ${name}. This "Glitch Text" engine exploits combining character marks to create the iconic Zalgo effect, layering characters vertically until they overwrite the digital space around them. It is the ultimate tool for horror writing, avant-garde design, or creating a disruptive presence online. Control the intensity of the 'curse' from subtle glitch to total digital annihilation.`;
    }

    const detailedDescription = `Beyond simple transformation, the ${name} serves as a complete typography suite. It handles complex character encoding shifts while maintaining the structural integrity of your message. Our system is built on a "Privacy-First" architecture, ensuring that every transformation stay entirely within your browser local environment. No data ever reaches our servers, providing a secure workspace for confidential branding and creative projects.`;

    return {
      about: aboutText,
      moreInfo: detailedDescription,
      features: [
        {
          title: "Real-Time Processing",
          text: "Zero-latency transformation as you type, optimized for speed.",
        },
        {
          title: "Cross-Platform Sync",
          text: "Verified compatibility with 50+ social networks and gaming platforms.",
        },
        {
          title: "Unicode 15.0 Support",
          text: "Utilizes the latest character maps for maximum stylistic variety.",
        },
        {
          title: "Adaptive Controls",
          text: "Intelligent sliders that adjust to the specific nuances of each style.",
        },
      ],
      faqs: [
        {
          q: `Is the ${name} truly free?`,
          a: `Absolutely. We provide unlimited access to the ${name} without any hidden fees, subscriptions, or watermarks. It is a community-supported tool for the creative web.`,
        },
        {
          q: "Will these fonts look the same for everyone?",
          a: "Yes. Because we use Unicode characters (not actual .ttf/.otf fonts), they render identically on iOS, Android, Windows, and macOS devices.",
        },
        {
          q: "Can I use this for commercial projects?",
          a: "Definitely. The output from our generator is standard Unicode text, which you can use in commercial designs, branding, and promotional content.",
        },
        {
          q: "How do I get the 'Small Text' effect?",
          a: "Our system includes dedicated superscript and subscript maps. Select the 'Small Text' tool or adjust the formatting toggle in the parameters panel.",
        },
        {
          q: "Is it safe for my social media account?",
          a: "Yes. Using stylized Unicode text is fully compliant with platform terms of service. We do not require account access or any login credentials.",
        },
        {
          q: "Why do some characters look like boxes?",
          a: "This happens rarely on extremely old operating systems that don't support modern Unicode. All modern devices (post-2018) will see the text perfectly.",
        },
        {
          q: "How do I clear my input quickly?",
          a: "Click the 'Trash' icon in the Input Buffer header to reset the interface instantly. You can also use Cmd/Ctrl + A and Delete.",
        },
        {
          q: "Can I save my favorite settings?",
          a: "Currently, settings are local to your session. We are developing a 'Profile' feature that will allow you to save your custom Warp Matrix configurations soon.",
        },
      ],
    };
  };

  const content = getDynamicContent();

  return (
    <div className="min-h-screen pt-20 sm:pt-24 pb-12 px-4 bg-bg-void text-text-primary relative overflow-hidden">
      <BackgroundEffect />

      <div className="container mx-auto max-w-7xl relative z-10">
        {/* Compact Breadcrumbs */}
        <div className="flex flex-wrap items-center gap-x-3 gap-y-2 mb-4 font-mono text-[10px] uppercase tracking-[0.3em] text-text-muted transition-opacity duration-500">
          <Link
            href="/"
            className="hover:text-accent-glitch transition-colors flex items-center gap-1.5 shrink-0"
          >
            <Home className="w-2.5 h-2.5" />
            ROOT
          </Link>
          <ChevronRight className="w-2.5 h-2.5 opacity-20 shrink-0" />
          <Link
            href={`/${category.slug}`}
            className="hover:text-accent-glitch transition-colors flex items-center gap-1.5 shrink-0"
          >
            <Terminal className="w-2.5 h-2.5" />
            {category.name}
          </Link>
          <ChevronRight className="w-2.5 h-2.5 opacity-20 shrink-0" />
          <div className="text-accent-glitch opacity-80 truncate max-w-[150px] sm:max-w-none">
            {tool.name}
          </div>
        </div>

        <div className="flex flex-col lg:flex-row gap-3 items-start">
          {/* Main Transformation Area */}
          <div className="flex-1 w-full flex flex-col gap-3">
            {/* Optimized Header - Compact Edition */}
            <div className="bg-bg-card border border-border-subtle p-3 md:p-4 lg:px-6 relative overflow-hidden">
              <div className="flex flex-col gap-2 relative z-10">
                <h1 className="text-2xl md:text-3xl lg:text-4xl font-black tracking-tighter uppercase leading-tight break-words max-w-4xl">
                  {tool.name}
                </h1>
              </div>

              {/* Decorative Background Elements */}
              <div className="absolute top-0 left-0 w-1 h-full bg-accent-glitch" />
              <div className="absolute top-0 left-0 w-full h-px bg-white/5" />
            </div>

            {/* Input Panel */}
            <div className="bg-bg-card border border-border-subtle relative group shadow-lg">
              <div className="p-1 border-b border-border-subtle bg-bg-void/50 flex justify-between items-center px-4 py-2">
                <div className="flex items-center gap-2 text-[9px] font-mono uppercase tracking-[0.3em] text-text-muted">
                  <Terminal className="w-3 h-3" />
                  Source_Input
                </div>
                <div className="flex items-center gap-2">
                  <span className="text-[9px] font-mono text-text-muted/40 uppercase">
                    Chars: {input.length}
                  </span>
                  <button
                    onClick={handleClear}
                    className="p-1.5 text-text-muted hover:text-red-500 transition-colors flex items-center gap-1.5 text-[9px] font-mono uppercase tracking-widest"
                    title="Reset Matrix"
                  >
                    <Trash2 className="w-3 h-3" />
                    Reset
                  </button>
                </div>
              </div>
              <div
                className="p-0"
                onMouseEnter={lockBodyScroll}
                onMouseLeave={unlockBodyScroll}
              >
                <textarea
                  ref={inputRef}
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  placeholder="Enter text to transform..."
                  className="w-full min-h-[140px] md:min-h-[180px] bg-transparent text-lg md:text-3xl font-black text-text-primary placeholder:text-text-primary/10 outline-none resize-none custom-scrollbar transition-all overscroll-contain p-4 md:p-6 text-left"
                  autoFocus
                />
              </div>
            </div>

            {/* Output Panel */}
            <div className="bg-bg-card border border-border-subtle relative group shadow-lg overflow-hidden flex flex-col">
              <div className="p-1 border-b border-border-subtle bg-bg-void/50 flex flex-col sm:flex-row justify-between items-start sm:items-center px-4 py-2 gap-4">
                <div className="flex items-center gap-2 text-[9px] font-mono uppercase tracking-[0.3em] text-accent-glitch">
                  <Zap className="w-3 h-3 animate-pulse" />
                  Engine_Output
                </div>
                <div className="flex items-center justify-between w-full sm:w-auto gap-4">
                  <div className="flex items-center gap-2">
                    <span className="text-[9px] font-mono text-text-muted uppercase tracking-widest hidden xs:inline">
                      Color:
                    </span>
                    <div className="flex items-center gap-1.5 p-1 bg-bg-void/50 border border-border-subtle rounded-sm">
                      {colors.map((c) => (
                        <button
                          key={c.name}
                          onClick={() => setOutputColor(c.value)}
                          className={`group relative w-4 h-4 sm:w-5 sm:h-5 transition-all duration-500 ${
                            outputColor === c.value
                              ? "scale-110 shadow-[0_0_20px_-3px_var(--glow-color)]"
                              : "hover:scale-110"
                          }`}
                          style={
                            {
                              "--glow-color":
                                c.value === "inherit"
                                  ? "rgba(255,255,255,0.4)"
                                  : `${c.value}66`,
                            } as React.CSSProperties
                          }
                          title={c.name}
                        >
                          <div
                            className={`absolute inset-0 transition-all duration-500 ease-out border border-white/10 ${
                              outputColor === c.value
                                ? "rotate-45 scale-90 border-white/40"
                                : "rotate-0 group-hover:rotate-45 group-hover:scale-90 group-hover:border-white/40"
                            }`}
                            style={{
                              backgroundColor:
                                c.value === "inherit"
                                  ? "var(--text-primary)"
                                  : c.value,
                              opacity: outputColor === c.value ? 1 : 0.3,
                            }}
                          />
                        </button>
                      ))}
                    </div>
                  </div>
                  <button
                    onClick={() => handleCopy()}
                    className={`flex items-center justify-center gap-2 px-4 sm:px-6 py-2 bg-accent-glitch text-black font-black uppercase tracking-widest text-[9px] sm:text-[10px] transition-all active:scale-95 shadow-lg min-w-[100px] ${
                      isCopied
                        ? "bg-text-primary text-bg-void"
                        : "hover:translate-y-[-1px] hover:shadow-accent-glitch/20"
                    }`}
                  >
                    {isCopied ? (
                      <CheckCircle2 className="w-3 h-3 sm:w-3.5 sm:h-3.5" />
                    ) : (
                      <Copy className="w-3 h-3 sm:w-3.5 sm:h-3.5" />
                    )}
                    <span>{isCopied ? "COPIED" : "COPY"}</span>
                  </button>
                </div>
              </div>

              <div className="bg-accent-glitch/5 px-4 py-1 border-b border-border-subtle flex items-center gap-2">
                <Info className="w-2.5 h-2.5 text-accent-glitch" />
                <span className="text-[8px] font-mono text-accent-glitch/70 uppercase tracking-widest">
                  Note: Colors work in Rich-Text (Email/Docs). Social Media
                  platforms support Unicode symbols only.
                </span>
              </div>

              <div
                className="relative bg-bg-void/10 overflow-hidden border-b border-white/5"
                onMouseEnter={lockBodyScroll}
                onMouseLeave={unlockBodyScroll}
              >
                <div className="min-h-[140px] md:min-h-[180px]">
                  {output ? (
                    <textarea
                      ref={outputRef}
                      readOnly
                      value={output}
                      className="w-full min-h-[140px] md:min-h-[180px] bg-transparent text-lg md:text-3xl font-black break-all leading-[1.2] transition-colors duration-300 relative z-10 outline-none resize-none overflow-y-auto custom-scrollbar overscroll-contain p-4 md:p-6 text-left"
                      style={{ color: outputColor }}
                    />
                  ) : (
                    <div className="flex-1 flex items-center justify-center">
                      <p className="text-text-primary/10 font-mono text-[11px] uppercase tracking-[0.2em] animate-pulse">
                        Awaiting transformation...
                      </p>
                    </div>
                  )}
                </div>

                {/* Decorative Tech Grid */}
                <div className="absolute inset-0 opacity-[0.03] pointer-events-none bg-[radial-gradient(#39FF14_1px,transparent_1px)] [background-size:20px_20px]" />
              </div>

              <div className="absolute bottom-0 left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-accent-glitch/10 to-transparent" />
            </div>

            {/* Tool Details (Desktop Only) */}
            <div className="hidden lg:grid grid-cols-1 md:grid-cols-2 gap-3">
              <div className="p-4 bg-bg-card/50 border border-border-subtle group hover:border-accent-glitch/10 transition-all duration-300">
                <h2 className="text-[9px] font-mono text-accent-glitch uppercase tracking-[0.3em] mb-2 flex items-center gap-2">
                  <Info className="w-3 h-3" />
                  Module_Summary
                </h2>
                <p className="text-text-muted font-mono text-[11px] leading-relaxed line-clamp-4">
                  {content.about}
                </p>
              </div>
              <div className="p-4 bg-bg-card/50 border border-border-subtle group hover:border-accent-glitch/10 transition-all duration-300">
                <h2 className="text-[9px] font-mono text-accent-glitch uppercase tracking-[0.3em] mb-2 flex items-center gap-2">
                  <Zap className="w-3 h-3" />
                  Key_Specs
                </h2>
                <div className="grid grid-cols-2 gap-x-4 gap-y-2">
                  {content.features.slice(0, 4).map((f, i) => (
                    <div key={i} className="flex flex-col gap-0.5">
                      <div className="text-[8px] font-mono text-text-primary uppercase tracking-widest truncate">
                        {f.title}
                      </div>
                      <div className="text-[8px] font-mono text-text-muted/60 truncate">
                        {f.text}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Sidebar Controls */}
          <div className="w-full lg:w-[320px] shrink-0 flex flex-col gap-4 lg:sticky lg:top-24">
            <div className="bg-bg-card border border-border-subtle p-4 relative group shadow-xl">
              <div className="flex items-center gap-3 mb-6 md:mb-8">
                <div className="w-10 h-10 border border-accent-glitch/20 flex items-center justify-center">
                  <Settings className="w-5 h-5 text-accent-glitch animate-spin-slow" />
                </div>
                <h3 className="text-xs font-mono uppercase tracking-[0.3em]">
                  Matrix_Params
                </h3>
              </div>

              <div className="flex flex-col gap-4 md:gap-5">
                {toolConfig?.controls.map((control: any) => (
                  <div key={control.id} className="flex flex-col gap-4">
                    <div className="flex justify-between items-center font-mono text-[9px] uppercase tracking-widest">
                      <span className="text-text-muted">{control.label}</span>
                      <span className="text-accent-glitch">
                        {options.customSettings?.[control.id] ??
                          control.defaultValue}
                      </span>
                    </div>

                    {control.type === "slider" && (
                      <input
                        type="range"
                        min={control.min}
                        max={control.max}
                        step={control.step || 1}
                        value={
                          options.customSettings?.[control.id] ??
                          control.defaultValue
                        }
                        onChange={(e) =>
                          setOptions((prev) => ({
                            ...prev,
                            customSettings: {
                              ...prev.customSettings,
                              [control.id]: parseInt(e.target.value),
                            },
                          }))
                        }
                        className="w-full h-1 bg-white/5 rounded-none appearance-none cursor-pointer accent-accent-glitch"
                      />
                    )}

                    {control.type === "select" && (
                      <div
                        className="relative"
                        ref={openDropdown === control.id ? containerRef : null}
                      >
                        <button
                          onClick={() =>
                            setOpenDropdown(
                              openDropdown === control.id ? null : control.id,
                            )
                          }
                          className="w-full bg-bg-void border border-border-subtle hover:border-accent-glitch transition-all px-4 py-3 flex items-center justify-between group"
                        >
                          <span className="text-[10px] font-mono text-text-primary uppercase tracking-widest">
                            {control.options?.find(
                              (opt: any) =>
                                opt.value ===
                                (options.customSettings?.[control.id] ??
                                  control.defaultValue),
                            )?.label || "Select Option"}
                          </span>
                          <ChevronDown
                            className={`w-3 h-3 text-text-muted group-hover:text-accent-glitch transition-all ${
                              openDropdown === control.id ? "rotate-180" : ""
                            }`}
                          />
                        </button>

                        <AnimatePresence>
                          {openDropdown === control.id && (
                            <motion.div
                              ref={scrollRef}
                              initial={{ opacity: 0, y: -10 }}
                              animate={{ opacity: 1, y: 0 }}
                              exit={{ opacity: 0, y: -10 }}
                              transition={{ duration: 0.15, ease: "easeOut" }}
                              onMouseEnter={lockBodyScroll}
                              onMouseLeave={unlockBodyScroll}
                              className="absolute top-[calc(100%+4px)] left-0 right-0 bg-bg-card border border-accent-glitch shadow-[0_10px_30px_rgba(0,0,0,0.5)] z-[70] max-h-[240px] overflow-y-auto overscroll-contain custom-scrollbar select-none"
                            >
                              {control.options?.map((opt: any) => (
                                <button
                                  key={opt.value}
                                  onClick={() => {
                                    setOptions((prev) => ({
                                      ...prev,
                                      customSettings: {
                                        ...prev.customSettings,
                                        [control.id]: opt.value,
                                      },
                                    }));
                                    setOpenDropdown(null);
                                  }}
                                  className={`w-full text-left px-4 py-3 text-[10px] font-mono uppercase tracking-widest transition-all hover:bg-accent-glitch hover:text-black ${
                                    (options.customSettings?.[control.id] ??
                                      control.defaultValue) === opt.value
                                      ? "text-accent-glitch bg-accent-glitch/5"
                                      : "text-text-muted"
                                  }`}
                                >
                                  {opt.label}
                                </button>
                              ))}
                            </motion.div>
                          )}
                        </AnimatePresence>
                      </div>
                    )}

                    {control.type === "toggle" && (
                      <button
                        onClick={() => {
                          setOptions((prev) => {
                            const current =
                              prev.customSettings?.[control.id] ??
                              control.defaultValue;
                            return {
                              ...prev,
                              customSettings: {
                                ...prev.customSettings,
                                [control.id]: !current,
                              },
                            };
                          });
                        }}
                        className={`flex items-center justify-between p-4 border transition-all font-mono text-[10px] uppercase tracking-widest ${
                          (options.customSettings?.[control.id] ??
                          control.defaultValue)
                            ? "border-accent-glitch bg-accent-glitch/5 text-accent-glitch"
                            : "border-border-subtle text-text-muted"
                        }`}
                      >
                        {control.label}
                        <div
                          className={`w-8 h-4 border ${(options.customSettings?.[control.id] ?? control.defaultValue) ? "border-accent-glitch" : "border-white/10"} relative`}
                        >
                          <div
                            className={`absolute top-0.5 bottom-0.5 w-3 transition-all ${(options.customSettings?.[control.id] ?? control.defaultValue) ? "right-0.5 bg-accent-glitch" : "left-0.5 bg-text-primary/20"}`}
                          />
                        </div>
                      </button>
                    )}
                  </div>
                ))}

                {/* Global Overrides */}
                <div className="pt-8 border-t border-white/5 flex flex-col gap-4">
                  <div className="text-[8px] font-mono uppercase tracking-[0.3em] text-text-muted/50 mb-1">
                    Global_Overrides
                  </div>
                  <button
                    onClick={() =>
                      setOptions({ ...options, uppercase: !options.uppercase })
                    }
                    className={`flex items-center justify-between p-4 border transition-all font-mono text-[10px] uppercase tracking-widest ${
                      options.uppercase
                        ? "border-accent-glitch bg-accent-glitch/5 text-accent-glitch"
                        : "border-white/10 text-text-muted"
                    }`}
                  >
                    CAPS_LOCK
                    <div
                      className={`w-8 h-4 border ${options.uppercase ? "border-accent-glitch" : "border-white/10"} relative`}
                    >
                      <div
                        className={`absolute top-0.5 bottom-0.5 w-3 transition-all ${options.uppercase ? "right-0.5 bg-accent-glitch" : "left-0.5 bg-white/20"}`}
                      />
                    </div>
                  </button>

                  {/* Platform Limits */}
                  <button
                    onClick={() => setShowPlatformLimits(!showPlatformLimits)}
                    className={`flex items-center justify-between p-4 border transition-all font-mono text-[10px] uppercase tracking-widest ${
                      showPlatformLimits
                        ? "border-accent-glitch bg-accent-glitch/5 text-accent-glitch"
                        : "border-white/10 text-text-muted"
                    }`}
                  >
                    <span className="flex items-center gap-2">
                      <BarChart3 className="w-3 h-3" />
                      PLATFORM_LIMITS
                    </span>
                    <div
                      className={`w-8 h-4 border ${showPlatformLimits ? "border-accent-glitch" : "border-white/10"} relative`}
                    >
                      <div
                        className={`absolute top-0.5 bottom-0.5 w-3 transition-all ${showPlatformLimits ? "right-0.5 bg-accent-glitch" : "left-0.5 bg-white/20"}`}
                      />
                    </div>
                  </button>

                  <AnimatePresence>
                    {showPlatformLimits && output && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: "auto", opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        className="overflow-hidden"
                      >
                        <div className="flex flex-col gap-1">
                          {platformLimits.map((platform) => {
                            const len = output.length;
                            const pct = Math.min(
                              100,
                              (len / platform.limit) * 100,
                            );
                            const isOver = len > platform.limit;
                            return (
                              <div
                                key={platform.name}
                                className="p-2 border border-white/5"
                              >
                                <div className="flex items-center justify-between mb-1">
                                  <span className="text-[8px] font-mono text-text-muted flex items-center gap-1">
                                    <span>{platform.icon}</span> {platform.name}
                                  </span>
                                  <span
                                    className={`text-[8px] font-mono ${isOver ? "text-red-500" : "text-accent-glitch/70"}`}
                                  >
                                    {len}/{platform.limit}
                                  </span>
                                </div>
                                <div className="w-full h-1 bg-white/5 relative overflow-hidden">
                                  <div
                                    className={`h-full transition-all duration-500 ${isOver ? "bg-red-500" : "bg-accent-glitch/60"}`}
                                    style={{ width: `${pct}%` }}
                                  />
                                </div>
                              </div>
                            );
                          })}
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              </div>

              <div className="absolute top-0 left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-accent-glitch/30 to-transparent" />
            </div>

            {/* Tool Details (Mobile Only) */}
            <div className="grid lg:hidden grid-cols-1 md:grid-cols-2 gap-4">
              <div className="p-5 bg-bg-card/50 border border-border-subtle group hover:border-accent-glitch/10 transition-all duration-300">
                <h2 className="text-[9px] font-mono text-accent-glitch uppercase tracking-[0.3em] mb-4 flex items-center gap-2">
                  <Info className="w-3 h-3" />
                  Module_Summary
                </h2>
                <p className="text-text-muted font-mono text-[11px] leading-relaxed line-clamp-4">
                  {content.about}
                </p>
              </div>
              <div className="p-5 bg-bg-card/50 border border-border-subtle group hover:border-accent-glitch/10 transition-all duration-300">
                <h2 className="text-[9px] font-mono text-accent-glitch uppercase tracking-[0.3em] mb-4 flex items-center gap-2">
                  <Zap className="w-3 h-3" />
                  Key_Specs
                </h2>
                <div className="grid grid-cols-2 gap-x-4 gap-y-2">
                  {content.features.slice(0, 4).map((f, i) => (
                    <div key={i} className="flex flex-col gap-0.5">
                      <div className="text-[8px] font-mono text-text-primary uppercase tracking-widest truncate">
                        {f.title}
                      </div>
                      <div className="text-[8px] font-mono text-text-muted/60 truncate">
                        {f.text}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Quick Links */}
            <div className="p-4 bg-bg-card border border-white/5">
              <h3 className="text-[10px] font-mono uppercase tracking-[0.3em] text-text-muted mb-4">
                Related_Modules
              </h3>
              <div className="grid grid-cols-2 gap-2">
                {category.tools.slice(0, 4).map((t) => (
                  <Link
                    key={t.slug}
                    href={`/${category.slug}/${t.slug}`}
                    className="p-2 border border-border-subtle bg-bg-void text-[9px] font-mono text-text-muted hover:text-accent-glitch hover:border-accent-glitch/30 transition-all uppercase truncate"
                  >
                    {t.name}
                  </Link>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* FAQs */}
        {!hideFaqs && (
          <div className="mt-16 sm:mt-24">
            <h2 className="text-2xl md:text-3xl font-black uppercase tracking-tighter text-center mb-6 md:mb-10 underline decoration-accent-glitch/20 underline-offset-8">
              Matrix_Intel_FAQ
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3 md:gap-4">
              {content.faqs.map((faq, i) => (
                <div
                  key={i}
                  className="p-4 md:p-5 bg-bg-card border border-border-subtle group hover:border-accent-glitch/20 transition-all duration-300 shadow-sm"
                >
                  <h4 className="text-[10px] md:text-[11px] font-mono font-black text-accent-glitch uppercase tracking-widest mb-3 flex gap-2">
                    <span className="opacity-50">[Q]</span> {faq.q}
                  </h4>
                  <div className="flex gap-3">
                    <span className="text-text-primary/10 text-[10px] md:text-[11px] font-mono font-black shrink-0">
                      [A]
                    </span>
                    <p className="text-text-muted font-mono text-[12px] md:text-sm leading-relaxed">
                      {faq.a}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
      <AnimatePresence>
        {isCopied && (
          <motion.div
            initial={{ opacity: 0, y: 20, x: "-50%" }}
            animate={{ opacity: 1, y: 0, x: "-50%" }}
            exit={{ opacity: 0, y: 20, x: "-50%" }}
            className="fixed bottom-12 left-1/2 z-[100] pointer-events-none hidden md:block"
          >
            <div className="bg-accent-glitch text-black px-4 py-1.5 shadow-[0_0_20px_rgba(57,255,20,0.4)] flex items-center gap-2">
              <span className="text-[10px] font-mono font-black uppercase tracking-[0.2em]">
                COPIED
              </span>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
