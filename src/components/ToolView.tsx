"use client";

import React, { useState, useEffect, useRef, useCallback } from "react";
import Link from "next/link";
import { toolConfigs } from "@/lib/toolConfig";
import { transformText } from "@/lib/transformers";
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
  Activity,
  RotateCcw,
  Sparkles,
  Smartphone,
  Type,
  Power,
  RefreshCw,
  Box,
  Layers,
  Fingerprint,
} from "lucide-react";
import BackgroundEffect from "@/components/CanvasEffect";
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
    if (input.length > 500) {
      const timer = setTimeout(() => {
        const result = transformText(input, tool.slug, options);
        setOutput(result);
      }, 100);
      return () => clearTimeout(timer);
    }
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
    const slugWords = tool.slug.replace(/-/g, " ");

    let aboutText = `The ${name} is a high-performance ${cat.toLowerCase()} generator engineered for elite digital creators. By utilizing sophisticated Unicode mapping protocols, it converts your standard text into a ${slugWords} masterpiece in milliseconds. In today's attention economy, ordinary text is invisible; our ${name} ensures your message breaks through the noise on platforms like Instagram, Discord, and TikTok. Whether you are crafting a viral caption, building a personal brand, or adding flair to your gaming profile, this tool delivers instant, professional-grade results with zero technical knowledge required.`;

    if (s === "tiktok-font") {
      aboutText = `Maximize your viral potential with the industry-leading TikTok Font Generator. TikTok's algorithm prioritizes high engagement, and visual contrast is the key. Our generator provides specially curated Unicode styles that bypass standard system font limitations, allowing you to create high-impact captions, bios, and on-screen text that demand attention. Whether you're a micro-influencer or a global brand, this tool is your secret weapon for the 'For You' page. Stand out in the comments section, make your video descriptions pop, and build a recognizable aesthetic that keeps viewers coming back.`;
    } else if (s === "instagram-font") {
      aboutText = `Curate a world-class aesthetic with the definitive Instagram Font Generator. Your Instagram profile is your digital storefront; don't settle for generic typography. Our platform offers an extensive library of premium styles — from minimalist sans-serifs to decorative scripts — all 100% compatible with IG's latest updates. Transform your bio, stories, and captions into a cohesive brand experience that attracts followers and builds authority. Perfect for influencers, small businesses, and content creators who want their profile to stand out.`;
    } else if (s.includes("cursed") || s.includes("zalgo")) {
      aboutText = `Step into the realm of digital entropy with our advanced ${name}. This "Glitch Text" engine exploits combining character marks to create the iconic Zalgo effect, layering characters vertically until they overwrite the digital space around them. It is the ultimate tool for horror writing, avant-garde design, or creating a disruptive presence online. Control the intensity of the 'curse' from subtle glitch to total digital annihilation. Perfect for Halloween social posts, horror game aesthetics, creepy pasta formatting, and experimental digital art.`;
    }

    const detailedDescription = `Beyond simple transformation, the ${name} serves as a complete typography suite. It handles complex character encoding shifts while maintaining the structural integrity of your message. Our system is built on a "Privacy-First" architecture, ensuring that every transformation stays entirely within your browser's local environment. No data ever reaches our servers, providing a secure workspace for confidential branding and creative projects. The engine supports input in over 40 languages and can process texts of up to 10,000 characters without any performance degradation, making it suitable for both quick social media posts and longer-form creative content.`;

    const howToSteps = [
      {
        step: "1",
        title: "Enter Your Text",
        text: `Type or paste the text you want to transform into the input field above. You can enter anything from a single word to entire paragraphs. The ${name} accepts all standard characters including letters, numbers, and punctuation marks.`,
      },
      {
        step: "2",
        title: "Choose Your Style",
        text: `Browse through the available ${cat.toLowerCase()} styles in the output panel. Each style produces a unique visual effect using Unicode character mappings. Click on any style to preview how your text looks with that transformation applied in real time.`,
      },
      {
        step: "3",
        title: "Copy and Use Anywhere",
        text: `Click the copy button next to your preferred style to save it to your clipboard. The transformed text is pure Unicode and works on Instagram, Discord, TikTok, Twitter, Facebook, WhatsApp, Snapchat, YouTube, and virtually any platform that supports text input.`,
      },
    ];

    const useCases = [
      {
        platform: "Instagram",
        text: `Use the ${name} to create eye-catching Instagram bios, story captions, and post descriptions. Stylized text helps your profile stand out to new visitors and reinforces your brand identity across all touchpoints.`,
      },
      {
        platform: "Discord",
        text: `Make your Discord messages, server nicknames, and channel descriptions stand out with unique ${slugWords} styles. Many gaming communities use stylized text to create memorable usernames and server branding.`,
      },
      {
        platform: "TikTok",
        text: `Boost your TikTok engagement with distinctive ${slugWords} in your bio and video descriptions. Unique typography catches the eye during scrolling and can increase your profile visit rate significantly.`,
      },
      {
        platform: "Gaming",
        text: `Create unique gamertags, clan names, and in-game chat messages using ${slugWords} effects. Stand out in games like Fortnite, Call of Duty, Minecraft, and Roblox with creative typography that other players will remember.`,
      },
    ];

    return {
      about: aboutText,
      moreInfo: detailedDescription,
      howToSteps,
      useCases,
      features: [
        {
          title: "Real-Time Processing",
          text: "Zero-latency transformation as you type, powered by client-side Unicode mapping. No server round-trips means instant results even on slow connections.",
        },
        {
          title: "Cross-Platform Compatibility",
          text: "Verified compatibility with 50+ social networks and gaming platforms including Instagram, Discord, TikTok, Twitter, WhatsApp, and Steam.",
        },
        {
          title: "Unicode 15.0 Support",
          text: "Utilizes the latest Unicode character maps with over 7,500 mappings for maximum stylistic variety and the widest device compatibility.",
        },
        {
          title: "Adaptive Controls",
          text: "Intelligent sliders and customization options that adjust to the specific nuances of each style, giving you fine-grained control over the output.",
        },
        {
          title: "Privacy First Design",
          text: "All text processing happens locally in your browser. Your content never touches our servers, ensuring complete privacy for sensitive or confidential text.",
        },
        {
          title: "Mobile Optimized",
          text: "Fully responsive interface designed for seamless use on smartphones and tablets. Create stylized text on the go with the same power as the desktop version.",
        },
      ],
      faqs: [
        {
          q: `Is the ${name} truly free?`,
          a: `Absolutely. We provide unlimited access to the ${name} without any hidden fees, subscriptions, or watermarks. It is a community-supported tool for the creative web. There are no usage limits, no account requirements, and no premium tiers.`,
        },
        {
          q: "Will these fonts look the same for everyone?",
          a: "Yes. Because we use Unicode characters (not actual .ttf/.otf fonts), they render identically on iOS, Android, Windows, and macOS devices. Over 99% of modern devices fully support these characters, ensuring your text looks exactly as intended regardless of the viewer's platform.",
        },
        {
          q: "Can I use this for commercial projects?",
          a: "Definitely. The output from our generator is standard Unicode text, which you can use in commercial designs, branding, promotional content, and marketing materials without any attribution or licensing requirements.",
        },
        {
          q: `How do I use the ${name}?`,
          a: `Simply type or paste your text into the input field, browse the available styles in the output panel, and click the copy button on your preferred result. The transformed text is ready to paste into any app or website that accepts text input.`,
        },
        {
          q: "Is it safe for my social media account?",
          a: "Yes. Using stylized Unicode text is fully compliant with platform terms of service on all major social networks. We do not require account access or any login credentials. The text is standard Unicode, not a hack or exploit.",
        },
        {
          q: "Why do some characters look like boxes?",
          a: "This happens rarely on extremely old operating systems or budget devices that don't support modern Unicode blocks. All modern devices manufactured after 2018 will display the text perfectly. If you encounter this issue, try a different style.",
        },
        {
          q: `Does the ${name} work offline?`,
          a: "Once the page is loaded, the transformation engine runs entirely in your browser, so it will continue to work even if your internet connection drops. However, you need an initial connection to load the page.",
        },
        {
          q: `What makes this ${name} different from others?`,
          a: `Our ${name} offers the widest selection of ${cat.toLowerCase()} styles powered by an advanced Unicode mapping engine with 7,500+ character mappings. We also provide real-time preview, customization controls, and a privacy-first architecture that competitors lack.`,
        },
      ],
    };
  };

  const content = getDynamicContent();

  return (
    <div className="min-h-screen pt-24 lg:pt-28 pb-24 bg-[#080808] text-white relative overflow-hidden">
      {/* Background Glow */}
      <div className="fixed top-0 left-0 w-full h-full bg-[radial-gradient(circle_at_50%_-10%,rgba(57,255,20,0.02)_0%,transparent_50%)] pointer-events-none" />

      <div className="container mx-auto max-w-7xl relative z-10 px-6">
        {/* Compact Breadcrumbs */}
        <div className="flex flex-wrap items-center gap-x-3 gap-y-2 mb-4 lg:mb-6 font-mono text-[10px] uppercase tracking-[0.2em] text-white/30">
          <Link
            href="/"
            className="hover:text-accent-glitch transition-colors flex items-center gap-1.5 shrink-0"
          >
            <Home className="w-2.5 h-2.5" />
            HOME
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

        <div className="flex flex-col lg:flex-row gap-6 items-start">
          {/* Main Transformation Area */}
          <div className="flex-1 w-full flex flex-col gap-6">
            {/* Optimized Header - Compact Edition */}
            <div className="bg-bg-card border border-border-subtle p-3 md:p-4 lg:px-6 relative overflow-hidden rounded-xl">
              <div className="flex flex-col gap-2 relative z-10">
                <h1 className="text-lg sm:text-xl md:text-3xl lg:text-4xl font-black tracking-tighter uppercase leading-tight break-words max-w-4xl">
                  {tool.name}
                </h1>
              </div>

              {/* Decorative Background Elements */}
              <div className="absolute top-0 left-0 w-1 h-full bg-accent-glitch" />
              <div className="absolute top-0 left-0 w-full h-px bg-white/5" />
            </div>

            {/* Input Panel */}
            <div className="bg-bg-card border border-border-subtle relative group shadow-lg transition-all duration-300 focus-within:border-accent-glitch/50 focus-within:ring-1 focus-within:ring-accent-glitch/20 rounded-xl overflow-hidden">
              <div className="p-1 border-b border-border-subtle bg-bg-void/50 flex justify-between items-center px-4 py-2">
                <div className="flex items-center gap-2 text-[9px] font-mono uppercase tracking-[0.3em] text-text-muted">
                  <Terminal className="w-3 h-3" />
                  Input
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
                  className="w-full min-h-[130px] lg:min-h-[150px] bg-[#0c0c0c] text-base md:text-lg lg:text-xl font-medium tracking-normal text-text-primary placeholder:text-text-primary/20 outline-none focus:outline-none resize-none custom-scrollbar transition-all overscroll-contain p-4 lg:p-5 text-left border-none"
                  autoFocus
                  spellCheck="false"
                  data-gramm="false"
                  suppressHydrationWarning
                />
              </div>
            </div>

            {/* Output Panel */}
            <div className="bg-bg-card border border-border-subtle relative group shadow-lg overflow-hidden flex flex-col transition-all duration-300 focus-within:border-accent-glitch/50 focus-within:ring-1 focus-within:ring-accent-glitch/20 rounded-xl">
              <div className="p-2 border-b border-border-subtle bg-bg-void/50 flex flex-col sm:flex-row justify-between items-start sm:items-center px-4 py-3 gap-3">
                <div className="flex items-center gap-2 text-[10px] sm:text-[9px] font-mono uppercase tracking-[0.3em] text-accent-glitch shrink-0 mt-1 sm:mt-0">
                  <Zap className="w-3.5 h-3.5 sm:w-3 sm:h-3" />
                  Preview
                </div>
                <div className="flex items-center justify-between sm:justify-end w-full sm:w-auto gap-3 h-min">
                  {/* Color Picker Wrapper */}
                  <div className="flex items-center gap-2 p-1.5 bg-bg-void/40 border border-white/10 rounded-full backdrop-blur-md shrink-0 h-min ring-1 ring-white/5 shadow-inner">
                    {colors.map((c) => (
                      <button
                        key={c.name}
                        onClick={() => setOutputColor(c.value)}
                        className={`group relative flex-none rounded-full transition-all duration-300 ${
                          outputColor === c.value
                            ? "scale-110 ring-2 ring-accent-glitch ring-offset-2 ring-offset-black z-10"
                            : "hover:scale-110 hover:ring-2 hover:ring-white/30 hover:ring-offset-2 hover:ring-offset-black"
                        }`}
                        style={{
                          width: "22px",
                          height: "22px",
                          minWidth: "22px",
                          minHeight: "22px",
                        }}
                        title={c.name}
                      >
                        <span
                          className="absolute inset-0 rounded-full"
                          style={{
                            backgroundColor:
                              c.value === "inherit" ? "#ffffff" : c.value,
                            opacity:
                              c.value === "inherit" && outputColor !== "inherit"
                                ? 0.2
                                : 1,
                          }}
                        >
                          {c.value === "inherit" && (
                            <span className="absolute inset-0 flex items-center justify-center pointer-events-none rounded-full overflow-hidden">
                              <span className="w-[120%] h-[1.5px] bg-red-500 -rotate-45" />
                            </span>
                          )}
                        </span>
                      </button>
                    ))}
                  </div>

                  {/* Copy Button */}
                  <button
                    onClick={() => handleCopy()}
                    className={`flex items-center justify-center gap-2 px-5 py-2.5 rounded-full bg-accent-glitch text-black font-black uppercase tracking-widest text-[10px] transition-all active:scale-95 shadow-lg min-w-[100px] shrink-0 ${
                      isCopied
                        ? "bg-text-primary text-bg-void"
                        : "hover:-translate-y-0.5 hover:shadow-[0_4px_20px_rgba(57,255,20,0.3)]"
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
                <span className="text-[10px] font-sans text-accent-glitch/80 font-medium uppercase tracking-wider">
                  Note: Colors work in Rich-Text (Email/Docs). Social Media
                  platforms support Unicode symbols only.
                </span>
              </div>

              <div
                className="relative bg-bg-void/10 overflow-hidden border-b border-white/5"
                onMouseEnter={lockBodyScroll}
                onMouseLeave={unlockBodyScroll}
              >
                <div className="min-h-[130px] lg:min-h-[150px] flex flex-col">
                  {output ? (
                    <textarea
                      ref={outputRef}
                      readOnly
                      value={output}
                      className="w-full flex-1 min-h-[130px] lg:min-h-[150px] bg-[#0c0c0c]/80 text-base md:text-lg lg:text-xl font-medium tracking-normal break-all leading-relaxed transition-colors duration-300 relative z-10 outline-none resize-none overflow-y-auto custom-scrollbar overscroll-contain p-4 lg:p-5 text-left"
                      style={{ color: outputColor }}
                    />
                  ) : (
                    <div className="flex-1 flex items-center justify-center">
                      <p className="text-text-primary/10 font-mono text-[11px] uppercase tracking-[0.2em]">
                        Waiting for text...
                      </p>
                    </div>
                  )}
                </div>

                {/* Decorative Tech Grid */}
                <div className="absolute inset-0 opacity-[0.03] pointer-events-none bg-[radial-gradient(#39FF14_1px,transparent_1px)] [background-size:20px_20px]" />
              </div>

              <div className="absolute bottom-0 left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-accent-glitch/10 to-transparent" />
            </div>
          </div>

          {/* Sidebar Controls */}
          <div className="w-full lg:w-[320px] shrink-0 flex flex-col gap-4 z-20">
            <div className="bg-bg-card border border-border-subtle p-4 relative group shadow-xl rounded-xl">
              <div className="flex items-center gap-3 mb-6 md:mb-8">
                <div className="w-10 h-10 border border-accent-glitch/20 flex items-center justify-center">
                  <Settings className="w-5 h-5 text-accent-glitch" />
                </div>
                <h3 className="text-xs font-mono uppercase tracking-[0.3em]">
                  Settings
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
                        <motion.button
                          whileTap={{ scale: 0.97 }}
                          onClick={() =>
                            setOpenDropdown(
                              openDropdown === control.id ? null : control.id,
                            )
                          }
                          className={`w-full bg-[#0a0a0a] border transition-all duration-150 px-4 py-3 flex items-center justify-between group rounded-lg ${
                            openDropdown === control.id
                              ? "border-accent-glitch/60 ring-1 ring-accent-glitch/20 shadow-[0_0_15px_rgba(57,255,20,0.08)]"
                              : "border-white/10 hover:border-white/25 hover:bg-[#111]"
                          }`}
                        >
                          <div className="flex items-center gap-2.5">
                            <span className="text-[11px] font-mono text-text-primary uppercase tracking-widest font-bold">
                              {control.options?.find(
                                (opt: any) =>
                                  opt.value ===
                                  (options.customSettings?.[control.id] ??
                                    control.defaultValue),
                              )?.label || "Select style..."}
                            </span>
                          </div>
                          <ChevronDown
                            className={`w-4 h-4 transition-all duration-150 ${
                              openDropdown === control.id
                                ? "rotate-180 text-accent-glitch"
                                : "text-text-muted group-hover:text-white/40"
                            }`}
                          />
                        </motion.button>

                        <AnimatePresence>
                          {openDropdown === control.id && (
                            <motion.div
                              ref={scrollRef}
                              initial={{ opacity: 0, y: 4, scale: 0.98 }}
                              animate={{ opacity: 1, y: 0, scale: 1 }}
                              exit={{ opacity: 0, y: 4, scale: 0.98 }}
                              transition={{
                                duration: 0.1,
                                ease: "easeOut",
                              }}
                              onMouseEnter={lockBodyScroll}
                              onMouseLeave={unlockBodyScroll}
                              className="absolute top-[calc(100%+6px)] left-0 right-0 bg-[#0a0a0a] border border-white/10 shadow-[0_20px_50px_rgba(0,0,0,0.6),0_0_20px_rgba(57,255,20,0.03)] z-[70] max-h-[300px] overflow-hidden rounded-xl"
                            >
                              <div className="overflow-y-auto max-h-[300px] custom-scrollbar p-1 flex flex-col gap-0.5 overscroll-contain">
                                {control.options?.map(
                                  (opt: any, idx: number) => {
                                    const isActive =
                                      (options.customSettings?.[control.id] ??
                                        control.defaultValue) === opt.value;
                                    return (
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
                                        className={`w-full text-left px-3 py-2.5 text-[11px] font-mono uppercase tracking-wider transition-all duration-75 rounded-lg flex items-center justify-between group/opt ${
                                          isActive
                                            ? "bg-accent-glitch/10 border border-accent-glitch/30 text-accent-glitch font-black shadow-[inset_0_0_12px_rgba(57,255,20,0.05)]"
                                            : "border border-transparent text-white/50 hover:bg-white/[0.04] hover:text-white/80 hover:border-white/[0.08]"
                                        }`}
                                      >
                                        <div className="flex items-center">
                                          <span>{opt.label}</span>
                                        </div>
                                      </button>
                                    );
                                  },
                                )}
                              </div>
                            </motion.div>
                          )}
                        </AnimatePresence>
                      </div>
                    )}

                    {control.type === "toggle" && (
                      <motion.button
                        whileTap={{ y: 1 }}
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
                        className={`group relative flex items-center gap-3 p-3 border transition-all duration-300 overflow-hidden rounded-md cursor-pointer select-none ${
                          (options.customSettings?.[control.id] ??
                          control.defaultValue)
                            ? "border-accent-glitch/40 bg-accent-glitch/5 shadow-[0_2px_10px_rgba(0,0,0,0.3),inset_0_1px_0_rgba(255,255,255,0.05)]"
                            : "border-white/5 bg-[#111]/50 hover:border-white/10 shadow-[inner_0_1px_10px_rgba(0,0,0,0.2)]"
                        }`}
                      >
                        {/* Compact Icon */}
                        <div
                          className={`p-1.5 rounded-sm transition-all duration-500 ${
                            (options.customSettings?.[control.id] ??
                            control.defaultValue)
                              ? "bg-accent-glitch text-black shadow-[0_0_10px_rgba(57,255,20,0.3)]"
                              : "bg-white/5 text-text-muted group-hover:bg-white/10"
                          }`}
                        >
                          {(() => {
                            const iconMap: Record<string, any> = {
                              randomize: Shuffle,
                              animate: Activity,
                              chaos: Zap,
                              scanlines: Terminal,
                              mix: Layers,
                              shadow: Box,
                              recursive: RefreshCw,
                              shake: Activity,
                              invertedCross: X,
                              ornaments: Sparkles,
                              mockup: Smartphone,
                            };
                            const Icon = iconMap[control.id] || Fingerprint;
                            return <Icon className="w-3.5 h-3.5" />;
                          })()}
                        </div>

                        {/* Label & Status */}
                        <div className="flex flex-col items-start gap-0 min-w-0">
                          <span
                            className={`text-[10px] font-mono uppercase tracking-[0.05em] transition-colors duration-300 truncate w-full ${
                              (options.customSettings?.[control.id] ??
                              control.defaultValue)
                                ? "text-white font-black"
                                : "text-text-muted/80 group-hover:text-text-primary"
                            }`}
                          >
                            {control.label}
                          </span>
                          <span
                            className={`text-[7px] font-mono tracking-widest mt-0.5 transition-opacity duration-300 ${
                              (options.customSettings?.[control.id] ??
                              control.defaultValue)
                                ? "text-accent-glitch/80"
                                : "text-white/10"
                            }`}
                          >
                            {(options.customSettings?.[control.id] ??
                            control.defaultValue)
                              ? "SYS_LINKED"
                              : "SYS_POWER_OFF"}
                          </span>
                        </div>

                        {/* High-Tech Toggle Switch */}
                        <div className="ml-auto flex items-center shrink-0">
                          <div
                            className={`w-8 h-4 rounded-full border transition-all duration-300 relative ${
                              (options.customSettings?.[control.id] ??
                              control.defaultValue)
                                ? "bg-accent-glitch/20 border-accent-glitch/50"
                                : "bg-black/40 border-white/10"
                            }`}
                          >
                            <motion.div
                              initial={false}
                              animate={{
                                x:
                                  (options.customSettings?.[control.id] ??
                                  control.defaultValue)
                                    ? 16
                                    : 2,
                              }}
                              className={`absolute top-0.5 w-2.5 h-2.5 rounded-full shadow-lg ${
                                (options.customSettings?.[control.id] ??
                                control.defaultValue)
                                  ? "bg-accent-glitch shadow-[0_0_8px_rgba(57,255,20,0.8)]"
                                  : "bg-white/20"
                              }`}
                            />
                          </div>
                        </div>

                        {/* Metallic Edge Highlight */}
                        <div className="absolute top-0 left-0 w-full h-[1px] bg-white/5" />

                        {(options.customSettings?.[control.id] ??
                          control.defaultValue) && (
                          <div className="absolute inset-0 bg-accent-glitch/5 animate-pulse pointer-events-none" />
                        )}
                      </motion.button>
                    )}
                  </div>
                ))}

                {/* Global Overrides */}
                <div className="pt-8 border-t border-white/5 flex flex-col gap-4">
                  <div className="text-[8px] font-mono uppercase tracking-[0.3em] text-text-muted/50 mb-1">
                    General Settings
                  </div>
                  <motion.button
                    whileTap={{ y: 1 }}
                    onClick={() =>
                      setOptions({ ...options, uppercase: !options.uppercase })
                    }
                    className={`group relative flex items-center gap-3 p-3 border transition-all duration-300 overflow-hidden rounded-md cursor-pointer select-none ${
                      options.uppercase
                        ? "border-accent-glitch/40 bg-accent-glitch/5 shadow-[0_2px_10px_rgba(0,0,0,0.3),inset_0_1px_0_rgba(255,255,255,0.05)]"
                        : "border-white/5 bg-[#111]/50 hover:border-white/10 shadow-[inner_0_1px_10px_rgba(0,0,0,0.2)]"
                    }`}
                  >
                    <div
                      className={`p-1.5 rounded-sm transition-all duration-500 ${
                        options.uppercase
                          ? "bg-accent-glitch text-black shadow-[0_0_10px_rgba(57,255,20,0.3)]"
                          : "bg-white/5 text-text-muted group-hover:bg-white/10"
                      }`}
                    >
                      <Type className="w-3.5 h-3.5" />
                    </div>

                    <div className="flex flex-col items-start gap-0 min-w-0">
                      <span
                        className={`text-[10px] font-mono uppercase tracking-[0.05em] transition-colors duration-300 truncate w-full ${
                          options.uppercase
                            ? "text-white font-black"
                            : "text-text-muted/80 group-hover:text-text-primary"
                        }`}
                      >
                        Uppercase Mode
                      </span>
                      <span
                        className={`text-[7px] font-mono tracking-widest mt-0.5 transition-opacity duration-300 ${
                          options.uppercase
                            ? "text-accent-glitch/80"
                            : "text-white/10"
                        }`}
                      >
                        {options.uppercase ? "CAPS_LOCK_ON" : "CAPS_LOCK_OFF"}
                      </span>
                    </div>

                    <div className="ml-auto flex items-center shrink-0">
                      <div
                        className={`w-8 h-4 rounded-full border transition-all duration-300 relative ${
                          options.uppercase
                            ? "bg-accent-glitch/20 border-accent-glitch/50"
                            : "bg-black/40 border-white/10"
                        }`}
                      >
                        <motion.div
                          initial={false}
                          animate={{ x: options.uppercase ? 16 : 2 }}
                          className={`absolute top-0.5 w-2.5 h-2.5 rounded-full shadow-lg ${
                            options.uppercase
                              ? "bg-accent-glitch shadow-[0_0_8px_rgba(57,255,20,0.8)]"
                              : "bg-white/20"
                          }`}
                        />
                      </div>
                    </div>

                    <div className="absolute top-0 left-0 w-full h-[1px] bg-white/5" />
                  </motion.button>

                  <motion.button
                    whileTap={{ y: 1 }}
                    onClick={() => setShowPlatformLimits(!showPlatformLimits)}
                    className={`group relative flex items-center gap-3 p-3 border transition-all duration-300 overflow-hidden rounded-md cursor-pointer select-none ${
                      showPlatformLimits
                        ? "border-accent-glitch/40 bg-accent-glitch/5 shadow-[0_2px_10px_rgba(0,0,0,0.3),inset_0_1px_0_rgba(255,255,255,0.05)]"
                        : "border-white/5 bg-[#111]/50 hover:border-white/10 shadow-[inner_0_1px_10px_rgba(0,0,0,0.2)]"
                    }`}
                  >
                    <div
                      className={`p-1.5 rounded-sm transition-all duration-500 ${
                        showPlatformLimits
                          ? "bg-accent-glitch text-black shadow-[0_0_10px_rgba(57,255,20,0.3)]"
                          : "bg-white/5 text-text-muted group-hover:bg-white/10"
                      }`}
                    >
                      <BarChart3 className="w-3.5 h-3.5" />
                    </div>

                    <div className="flex flex-col items-start gap-0 min-w-0">
                      <span
                        className={`text-[10px] font-mono uppercase tracking-[0.05em] transition-colors duration-300 truncate w-full ${
                          showPlatformLimits
                            ? "text-white font-black"
                            : "text-text-muted/80 group-hover:text-text-primary"
                        }`}
                      >
                        Character Guide
                      </span>
                      <span
                        className={`text-[7px] font-mono tracking-widest mt-0.5 transition-opacity duration-300 ${
                          showPlatformLimits
                            ? "text-accent-glitch/80"
                            : "text-white/10"
                        }`}
                      >
                        {showPlatformLimits
                          ? "DATA_STREAM_ON"
                          : "DATA_STREAM_OFF"}
                      </span>
                    </div>

                    <div className="ml-auto flex items-center shrink-0">
                      <div
                        className={`w-8 h-4 rounded-full border transition-all duration-300 relative ${
                          showPlatformLimits
                            ? "bg-accent-glitch/20 border-accent-glitch/50"
                            : "bg-black/40 border-white/10"
                        }`}
                      >
                        <motion.div
                          initial={false}
                          animate={{ x: showPlatformLimits ? 16 : 2 }}
                          className={`absolute top-0.5 w-2.5 h-2.5 rounded-full shadow-lg ${
                            showPlatformLimits
                              ? "bg-accent-glitch shadow-[0_0_8px_rgba(57,255,20,0.8)]"
                              : "bg-white/20"
                          }`}
                        />
                      </div>
                    </div>

                    <div className="absolute top-0 left-0 w-full h-[1px] bg-white/5" />
                  </motion.button>

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
          </div>
        </div>

        {/* SEO Text Content for tools without MDX */}
        {!hideFaqs && (
          <div className="mt-16 sm:mt-24 max-w-4xl mx-auto space-y-8">
            <div className="p-6 md:p-8 bg-[#0c0c0c] border border-white/5 rounded-2xl relative overflow-hidden">
              <div className="absolute inset-0 opacity-30 pointer-events-none bg-[radial-gradient(circle_at_100%_0%,rgba(57,255,20,0.05)_0%,transparent_50%)]" />
              <div className="relative z-10">
                <h2 className="text-xl md:text-2xl font-black uppercase tracking-tighter mb-4 text-white">
                  Maximizing Engagement with{" "}
                  <span className="text-accent-glitch">{tool.name}</span>
                </h2>
                <div className="prose prose-invert max-w-none text-white/60 text-sm md:text-base leading-relaxed space-y-4 font-mono">
                  <p>
                    Built on advanced Unicode algorithms, this generator allows
                    users to bypass traditional platform formatting
                    restrictions. The <strong>{tool.name}</strong> is designed
                    to run entirely in your browser through local processing,
                    meaning it offers real-time updates and ensures maximum
                    privacy since no text data is ever sent to an external
                    server.
                  </p>
                  {content.moreInfo && <p>{content.moreInfo}</p>}
                </div>
              </div>
            </div>

            <div className="p-6 md:p-8 bg-[#0c0c0c] border border-white/5 rounded-2xl relative overflow-hidden">
              <div className="absolute inset-0 opacity-30 pointer-events-none bg-[radial-gradient(circle_at_0%_100%,rgba(57,255,20,0.05)_0%,transparent_50%)]" />
              <div className="relative z-10">
                <h2 className="text-xl md:text-2xl font-black uppercase tracking-tighter mb-4 text-white">
                  Advanced Generation Techniques
                </h2>
                <div className="prose prose-invert max-w-none text-white/60 text-sm md:text-base leading-relaxed space-y-4 font-mono">
                  <p>
                    To get the most out of our {tool.name}, we recommend
                    experimenting with different styles and combinations. Since
                    our generator uses advanced Unicode manipulation, the
                    resulting text is entirely platform-agnostic. This means you
                    can copy the generated output and paste it anywhere—from
                    social media bios and captions to gaming chat windows and
                    professional profiles—without losing the stylistic
                    formatting.
                  </p>
                  <p>
                    Whether you are optimizing a brand profile, standing out in
                    community channels, or simply trying to break out of boring
                    standard fonts, this specific effect falls under the{" "}
                    <strong>{category.name}</strong> toolkit, widely used
                    globally across thousands of social interactions a day.
                    Remember that while creative typography significantly boosts
                    engagement, readability remains paramount. Use the{" "}
                    {tool.name} strategically to highlight key phrases and
                    usernames.
                  </p>
                </div>
              </div>
            </div>

            <div className="p-6 md:p-8 bg-[#0c0c0c] border border-white/5 rounded-2xl relative overflow-hidden">
              <div className="absolute inset-0 opacity-30 pointer-events-none bg-[radial-gradient(circle_at_100%_0%,rgba(57,255,20,0.05)_0%,transparent_50%)]" />
              <div className="relative z-10">
                <h2 className="text-xl md:text-2xl font-black uppercase tracking-tighter mb-4 text-white">
                  Universal Device Compatibility
                </h2>
                <div className="prose prose-invert max-w-none text-white/60 text-sm md:text-base leading-relaxed space-y-4 font-mono">
                  <p>
                    Unlike external plugins, custom mobile keyboards, or images
                    containing stylized typography, the characters produced by
                    the <strong>{tool.name}</strong> exist entirely within the
                    standard Unicode specification. This ensures that any string
                    of stylized text you create will be natively supported and
                    rendered properly across almost all modern digital
                    platforms, from iOS and Android devices to Windows and macOS
                    environments.
                  </p>
                  <p>
                    Because this system relies strictly on replacing standard
                    characters with their stylized Unicode equivalents in
                    real-time, you never have to worry about compatibility
                    issues. Paste your results directly into fields that
                    typically do not allow rich-text formatting—including the
                    Instagram bio section, Twitter/X display names, Discord
                    server rules, TikTok video descriptions, or even WhatsApp
                    statuses. Your uniquely formatted text moves seamlessly
                    wherever you copy it, preserving its exact aesthetic on the
                    receiving end.
                  </p>
                </div>
              </div>
            </div>

            <div className="p-6 md:p-8 bg-[#0c0c0c] border border-white/5 rounded-2xl relative overflow-hidden">
              <div className="absolute inset-0 opacity-30 pointer-events-none bg-[radial-gradient(circle_at_0%_100%,rgba(57,255,20,0.05)_0%,transparent_50%)]" />
              <div className="relative z-10">
                <h2 className="text-xl md:text-2xl font-black uppercase tracking-tighter mb-4 text-white">
                  Privacy, Performance, and Security
                </h2>
                <div className="prose prose-invert max-w-none text-white/60 text-sm md:text-base leading-relaxed space-y-4 font-mono">
                  <p>
                    Performance and data privacy are foundational to the
                    architecture of our <strong>{category.name}</strong>{" "}
                    utilities. The <strong>{tool.name}</strong> operates
                    strictly on a client-side processing model. This means that
                    every single keystroke, transformation, and customized
                    configuration occurs entirely locally within your browser's
                    memory. No text inputs are ever logged, tracked,
                    transmitted, or saved to any external database or remote
                    server.
                  </p>
                  <p>
                    By eliminating server round-trips from the text-generation
                    process, the tool is able to offer instantaneous,
                    zero-latency visual feedback. You can paste thousands of
                    words into the input field and see the conversion happen in
                    real-time without experiencing any lag or loading screens.
                    This powerful local execution ensures that you maintain
                    absolute control over your digital content while enjoying an
                    exceptionally fast and responsive user experience.
                  </p>
                </div>
              </div>
            </div>

            <div className="p-6 md:p-8 bg-[#0c0c0c] border border-white/5 rounded-2xl relative overflow-hidden">
              <div className="absolute inset-0 opacity-30 pointer-events-none bg-[radial-gradient(circle_at_100%_0%,rgba(57,255,20,0.05)_0%,transparent_50%)]" />
              <div className="relative z-10">
                <h2 className="text-xl md:text-2xl font-black uppercase tracking-tighter mb-4 text-white">
                  The Psychology of Aesthetic Typography
                </h2>
                <div className="prose prose-invert max-w-none text-white/60 text-sm md:text-base leading-relaxed space-y-4 font-mono">
                  <p>
                    In the modern digital landscape, where the average user
                    scrolls through hundreds of pieces of content per minute,
                    visual differentiation is not just an advantage—it is a
                    necessity. Standard system fonts blend into the background.
                    By leveraging the <strong>{tool.name}</strong>, you actively
                    disrupt pattern recognition, forcing the viewer's eye to
                    pause and process your text. This microscopic pause can
                    drastically increase your overall engagement rates and
                    profile retention.
                  </p>
                  <p>
                    Aesthetic text signals creativity, effort, and brand
                    consistency. When a user encounters a profile utilizing
                    customized Unicode characters, it subconsciously
                    communicates technical proficiency and attention to
                    microscopic details. Whether you are building a gaming
                    community on Discord or attempting to establish a viral
                    presence on TikTok, mastering typographic psychology ensures
                    that your first impression is both memorable and highly
                    impactful in an increasingly crowded visual space.
                  </p>
                </div>
              </div>
            </div>

            <div className="p-6 md:p-8 bg-[#0c0c0c] border border-white/5 rounded-2xl relative overflow-hidden">
              <div className="absolute inset-0 opacity-30 pointer-events-none bg-[radial-gradient(circle_at_0%_100%,rgba(57,255,20,0.05)_0%,transparent_50%)]" />
              <div className="relative z-10">
                <h2 className="text-xl md:text-2xl font-black uppercase tracking-tighter mb-4 text-white">
                  Unicode vs. ASCII: A Technical Breakdown
                </h2>
                <div className="prose prose-invert max-w-none text-white/60 text-sm md:text-base leading-relaxed space-y-4 font-mono">
                  <p>
                    To fully understand how the <strong>{tool.name}</strong>{" "}
                    works, it is important to distinguish between standard
                    typography and Unicode rendering. A traditional font is
                    essentially an external styling file (like a .TTF or .OTF)
                    that tells your computer how to physically draw a standard
                    letter. If you copy text styled by a traditional font and
                    paste it into Instagram, it immediately reverts to
                    Instagram's default styling because the external styling
                    file does not transfer with the core text.
                  </p>
                  <p>
                    Our generator entirely circumvents this massive limitation
                    by utilizing the international Unicode standard database.
                    Over the decades, development organizations have mapped tens
                    of thousands of unique characters, aesthetic symbols, and
                    mathematical alphabetic variations to specific numerical
                    codes. When our <strong>{category.name}</strong> script
                    processes your input, it isn't simply changing the "font"—it
                    is programmatically mapping and swapping your standard ASCII
                    characters for entirely different mathematical or symbolic
                    letters that inherently look stylish.
                  </p>
                  <p>
                    Because these are raw, hardcoded symbols rather than applied
                    styles, the formatting is permanently embedded within the
                    text data payload itself. This deep architectural
                    integration guarantees that your customized text will
                    survive being copied and pasted across different
                    applications, networks, and operating systems without losing
                    its unique edge.
                  </p>
                </div>
              </div>
            </div>

            <div className="p-6 md:p-8 bg-[#0c0c0c] border border-white/5 rounded-2xl relative overflow-hidden">
              <div className="absolute inset-0 opacity-30 pointer-events-none bg-[radial-gradient(circle_at_100%_0%,rgba(57,255,20,0.05)_0%,transparent_50%)]" />
              <div className="relative z-10">
                <h2 className="text-xl md:text-2xl font-black uppercase tracking-tighter mb-4 text-white">
                  Strategic Application Across Social Networks
                </h2>
                <div className="prose prose-invert max-w-none text-white/60 text-sm md:text-base leading-relaxed space-y-4 font-mono">
                  <p>
                    Using the <strong>{tool.name}</strong> effectively requires
                    strategic restraint and aesthetic planning. Overusing
                    heavily modified Unicode text can trigger spam filters or
                    make entire paragraphs illegible to screen readers used by
                    the visually impaired. The most successful influencers and
                    digital brands utilize these specialized generators strictly
                    for targeted capitalization to draw attention to critical
                    elements.
                  </p>
                  <p>
                    For example, on platforms like Twitter and Instagram, using
                    a stylized font exclusively for your Display Name or a
                    specific call-to-action in your bio highlights the most
                    important information without compromising the readability
                    of your larger body copy and hashtag structures. On Discord,
                    server administrators frequently use specialized unicode
                    blocks to create highly structured, aesthetic channel names
                    that immediately stand out in the interface sidebar
                    hierarchy.
                  </p>
                  <p>
                    Similarly, professional gamers use these unique characters
                    to construct complex, untaken usernames on rigid platforms
                    like Steam, Xbox Live, and the PlayStation Network. By
                    mixing standard system fonts with tactical deployments of
                    our {category.name} effects, you can establish an elite
                    digital footprint. We always advise users to test your
                    generated text on multiple devices—both mobile and
                    desktop—before finalizing your public profile updates.
                  </p>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* FAQs */}
        {!hideFaqs && (
          <div className="mt-16 sm:mt-24">
            <div className="flex flex-col items-center gap-4 mb-10 md:mb-14">
              <div className="w-12 h-12 bg-[#0c0c0c] border border-white/10 rounded-xl flex items-center justify-center">
                <Info className="w-6 h-6 text-accent-glitch" />
              </div>
              <h2 className="text-2xl md:text-3xl font-black uppercase tracking-tighter text-center">
                Frequently Asked{" "}
                <span className="text-accent-glitch">Questions</span>
              </h2>
              <p className="text-white/30 font-mono text-xs uppercase tracking-widest">
                Common queries answered
              </p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {content.faqs.map((faq, i) => (
                <div
                  key={i}
                  className="p-5 md:p-6 bg-[#0c0c0c] border border-white/5 rounded-xl group hover:border-accent-glitch/20 transition-all duration-500 relative overflow-hidden"
                >
                  <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none bg-[radial-gradient(circle_at_50%_0%,rgba(57,255,20,0.02)_0%,transparent_70%)]" />
                  <div className="relative z-10">
                    <h4 className="text-[11px] md:text-xs font-mono font-black text-accent-glitch uppercase tracking-wider mb-4 flex items-start gap-3">
                      <span className="inline-flex items-center justify-center w-6 h-6 bg-accent-glitch/10 border border-accent-glitch/20 rounded-md text-[9px] text-accent-glitch shrink-0 mt-0.5">
                        Q
                      </span>
                      <span className="pt-1">{faq.q}</span>
                    </h4>
                    <div className="flex gap-3 ml-9">
                      <p className="text-white/50 font-mono text-[12px] md:text-[13px] leading-[1.8] group-hover:text-white/70 transition-colors duration-500">
                        {faq.a}
                      </p>
                    </div>
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
