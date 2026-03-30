"use client";

import React, { useState, useEffect, useRef, useCallback } from "react";
import Link from "next/link";
import { toolConfigs } from "@/lib/toolConfig";
import { transformText } from "@/lib/transformers";
import {
  Copy,
  Trash2,
  Settings,
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
  const [showPlatformLimits, setShowPlatformLimits] = useState(false);
  const [openDropdown, setOpenDropdown] = useState<string | null>(null);
  const dropdownRefs = useRef<Record<string, HTMLDivElement | null>>({});
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
      const activeRef = openDropdown ? dropdownRefs.current[openDropdown] : null;
      if (activeRef && !activeRef.contains(event.target as Node)) {
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
    if (!openDropdown) return;
    const el = dropdownRefs.current[openDropdown]?.querySelector<HTMLElement>('.overflow-y-auto');
    if (!el) return;

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

      navigator.clipboard.writeText(text);

      // Clear any existing timer to prevent stacking
      if (copyTimerRef.current) clearTimeout(copyTimerRef.current);

      setIsCopied(true);
      copyTimerRef.current = setTimeout(() => {
        setIsCopied(false);
      }, 1500);
    },
    [output],
  );

  const handleClear = () => {
    setInput("");
    setOutput("");
  };

  return (
    <div className="min-h-screen pt-24 lg:pt-28 pb-24 bg-bg-void light:bg-white text-text-primary relative overflow-hidden">
      {/* Background Glow */}
      <div className="fixed top-0 left-0 w-full h-full bg-[radial-gradient(circle_at_50%_-10%,rgba(57,255,20,0.02)_0%,transparent_50%)] pointer-events-none hidden dark:block" />

      <div className="container mx-auto max-w-7xl relative z-10 px-6">
        {/* Compact Breadcrumbs */}
        <div className="flex flex-wrap items-center gap-x-3 gap-y-2 mb-4 lg:mb-6 font-mono text-[10px] uppercase tracking-[0.2em] text-text-muted">
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
          <div className="text-accent-glitch opacity-80 truncate max-w-[120px] xs:max-w-none">
            {tool.name}
          </div>
        </div>

        <div className="flex flex-col lg:flex-row gap-6 items-start">
          {/* Main Transformation Area */}
          <div className="flex-1 w-full flex flex-col gap-6">
            {/* Optimized Header - Compact Edition */}
            <div className="bg-bg-card border border-border-subtle light:border-neutral-200 p-3 md:p-4 lg:px-6 relative overflow-hidden rounded-xl light:shadow-[0_1px_3px_rgba(0,0,0,0.04)]">
              <div className="flex flex-col gap-2 relative z-10">
                <h1 className="text-lg sm:text-xl md:text-3xl lg:text-4xl font-black tracking-tighter uppercase leading-tight break-words max-w-4xl">
                  {tool.name}
                </h1>
              </div>

              {/* Decorative Background Elements */}
              <div className="absolute top-0 left-0 w-1 h-full bg-accent-glitch" />
              <div className="absolute top-0 left-0 w-full h-px bg-border-subtle" />
            </div>

            {/* Input Panel */}
            <div className="bg-bg-card border border-border-subtle light:border-neutral-200 relative group shadow-lg transition-all duration-300 focus-within:border-accent-glitch/50 focus-within:ring-1 focus-within:ring-accent-glitch/20 rounded-xl overflow-hidden light:shadow-[0_1px_3px_rgba(0,0,0,0.04)]">
              <div className="p-1 border-b border-border-subtle light:border-neutral-200 bg-bg-void/50 light:bg-neutral-50 flex justify-between items-center px-4 py-2">
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
                className="p-0 bg-neutral-50/80 dark:bg-white/[0.02]"
                onMouseEnter={lockBodyScroll}
                onMouseLeave={unlockBodyScroll}
              >
                <textarea
                  ref={inputRef}
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  placeholder="Enter text to transform..."
                  className="w-full min-h-[140px] lg:min-h-[150px] bg-transparent text-base md:text-lg lg:text-xl font-medium tracking-normal text-text-primary placeholder:text-text-primary/30 outline-none focus:outline-none resize-none custom-scrollbar transition-all overscroll-contain p-4 lg:p-5 text-left border-none"
                  autoFocus
                  spellCheck="false"
                  data-gramm="false"
                  suppressHydrationWarning
                />
              </div>
            </div>

            {/* Output Panel */}
            <div className="bg-bg-card border border-border-subtle light:border-neutral-200 relative group shadow-lg flex flex-col transition-all duration-300 focus-within:border-accent-glitch/50 focus-within:ring-1 focus-within:ring-accent-glitch/20 rounded-xl light:shadow-[0_1px_3px_rgba(0,0,0,0.04)]">
              <div className="p-2 border-b border-border-subtle light:border-neutral-200 bg-bg-void/50 light:bg-neutral-50 flex justify-between items-center px-4 py-3 rounded-t-xl">
                <div className="flex items-center gap-2 text-[10px] sm:text-[9px] font-mono uppercase tracking-[0.3em] text-accent-glitch shrink-0 mt-0.5">
                  <Zap className="w-3.5 h-3.5 sm:w-3 sm:h-3" />
                  Preview
                </div>
                <button
                  onClick={() => handleCopy()}
                  className={`flex items-center justify-center gap-2 px-5 py-2.5 rounded-full font-black uppercase tracking-widest text-[10px] transition-all active:scale-95 shadow-md min-w-[100px] shrink-0 ${
                    isCopied
                      ? "bg-text-primary text-bg-void"
                      : "bg-accent-glitch text-black hover:-translate-y-0.5 hover:shadow-lg"
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

              <div
                className="relative bg-neutral-50 dark:bg-bg-void/30 overflow-hidden rounded-b-xl"
                onMouseEnter={lockBodyScroll}
                onMouseLeave={unlockBodyScroll}
              >
                <div className="min-h-[130px] lg:min-h-[150px] flex flex-col">
                  {output ? (
                    <textarea
                      ref={outputRef}
                      readOnly
                      value={output}
                      className="w-full flex-1 min-h-[130px] lg:min-h-[150px] bg-transparent text-base md:text-lg lg:text-xl font-medium tracking-normal break-all leading-relaxed transition-colors duration-300 relative z-10 outline-none resize-none overflow-y-auto custom-scrollbar overscroll-contain p-4 lg:p-5 text-left text-text-primary"
                    />
                  ) : (
                    <div className="flex-1 flex items-center justify-center">
                      <p className="text-text-primary/25 font-mono text-[10px] xs:text-[11px] uppercase tracking-[0.25em] text-center px-4">
                        Waiting for text input...
                      </p>
                    </div>
                  )}
                </div>

                {/* Decorative Tech Grid */}
                <div className="absolute inset-0 opacity-[0.03] pointer-events-none bg-[radial-gradient(#39FF14_1px,transparent_1px)] [background-size:20px_20px] hidden dark:block" />
              </div>

              <div className="absolute bottom-0 left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-accent-glitch/10 to-transparent" />
            </div>
          </div>

          {/* Sidebar Controls */}
          <div className="w-full lg:w-[320px] shrink-0 flex flex-col gap-4 z-20">
            <div className="bg-bg-card border border-border-subtle light:border-neutral-200 p-4 relative group shadow-xl rounded-xl light:shadow-[0_1px_3px_rgba(0,0,0,0.04)]">
              <div className="flex items-center gap-3 mb-6 md:mb-8">
                <div className="w-10 h-10 border border-accent-glitch/30 bg-accent-glitch/5 rounded-lg flex items-center justify-center">
                  <Settings className="w-5 h-5 text-accent-glitch" />
                </div>
                <h2 className="text-xs font-mono uppercase tracking-[0.3em] text-text-primary">
                  Settings
                </h2>
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
                        className="w-full h-1 bg-border-subtle rounded-none appearance-none cursor-pointer accent-accent-glitch"
                      />
                    )}

                    {control.type === "select" && (
                      <div
                        className="relative"
                        ref={(el) => { dropdownRefs.current[control.id] = el; }}
                      >
                        <motion.button
                          whileTap={{ scale: 0.97 }}
                          onClick={() =>
                            setOpenDropdown(
                              openDropdown === control.id ? null : control.id,
                            )
                          }
                          className={`w-full bg-bg-card border transition-all duration-150 px-4 py-3 flex items-center justify-between group rounded-lg ${
                            openDropdown === control.id
                              ? "border-accent-glitch/60 ring-1 ring-accent-glitch/20 shadow-[0_0_15px_rgba(57,255,20,0.08)]"
                              : "border-border-subtle light:border-neutral-200 hover:border-text-muted hover:bg-bg-void light:hover:bg-neutral-50"
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
                                : "text-text-muted group-hover:text-text-primary/50"
                            }`}
                          />
                        </motion.button>

                        <AnimatePresence>
                          {openDropdown === control.id && (
                            <motion.div
                              initial={{ opacity: 0, y: 4, scale: 0.98 }}
                              animate={{ opacity: 1, y: 0, scale: 1 }}
                              exit={{ opacity: 0, y: 4, scale: 0.98 }}
                              transition={{
                                duration: 0.1,
                                ease: "easeOut",
                              }}
                              onMouseEnter={lockBodyScroll}
                              onMouseLeave={unlockBodyScroll}
                              className="absolute top-[calc(100%+6px)] left-0 right-0 bg-bg-card light:bg-white border border-border-subtle light:border-neutral-200 shadow-lg light:shadow-xl z-[9999] max-h-[300px] overflow-hidden rounded-xl"
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
                                            ? "bg-accent-glitch/10 light:bg-emerald-50 border border-accent-glitch/30 light:border-emerald-200 text-accent-glitch light:text-emerald-600 font-black"
                                            : "border border-transparent text-text-muted light:text-neutral-500 hover:bg-border-subtle light:hover:bg-neutral-100 hover:text-text-primary light:hover:text-neutral-900 hover:border-border-subtle light:hover:border-neutral-200"
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
                            ? "border-accent-glitch/40 bg-accent-glitch/5 shadow-sm"
                            : "border-border-subtle bg-bg-void/50 light:bg-neutral-50 light:border-neutral-200 hover:border-border-subtle "
                        }`}
                      >
                        {/* Compact Icon */}
                        <div
                          className={`p-1.5 rounded-sm transition-all duration-500 ${
                            (options.customSettings?.[control.id] ??
                            control.defaultValue)
                              ? "bg-accent-glitch text-black shadow-[0_0_10px_rgba(57,255,20,0.3)]"
                              : "bg-border-subtle text-text-muted group-hover:bg-text-muted/20"
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
                                ? "text-text-primary font-black"
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
                                : "text-text-muted"
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
                                : "bg-border-subtle border-border-subtle"
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
                                  : "bg-text-muted/40"
                              }`}
                            />
                          </div>
                        </div>

                        {/* Metallic Edge Highlight */}
                        <div className="absolute top-0 left-0 w-full h-[1px] bg-border-subtle" />

                        {(options.customSettings?.[control.id] ??
                          control.defaultValue) && (
                          <div className="absolute inset-0 bg-accent-glitch/5 animate-pulse pointer-events-none" />
                        )}
                      </motion.button>
                    )}
                  </div>
                ))}

                {/* Global Overrides */}
                <div className="pt-8 border-t border-border-subtle flex flex-col gap-4">
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
                        ? "border-accent-glitch/40 bg-accent-glitch/5 shadow-sm"
                        : "border-border-subtle bg-bg-void/50 light:bg-neutral-50 light:border-neutral-200 hover:border-border-subtle "
                    }`}
                  >
                    <div
                      className={`p-1.5 rounded-sm transition-all duration-500 ${
                        options.uppercase
                          ? "bg-accent-glitch text-black shadow-[0_0_10px_rgba(57,255,20,0.3)]"
                          : "bg-border-subtle text-text-muted group-hover:bg-text-muted/20"
                      }`}
                    >
                      <Type className="w-3.5 h-3.5" />
                    </div>

                    <div className="flex flex-col items-start gap-0 min-w-0">
                      <span
                        className={`text-[10px] font-mono uppercase tracking-[0.05em] transition-colors duration-300 truncate w-full ${
                          options.uppercase
                            ? "text-text-primary font-black"
                            : "text-text-muted/80 group-hover:text-text-primary"
                        }`}
                      >
                        Uppercase Mode
                      </span>
                      <span
                        className={`text-[7px] font-mono tracking-widest mt-0.5 transition-opacity duration-300 ${
                          options.uppercase
                            ? "text-accent-glitch/80"
                            : "text-text-muted"
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
                            : "bg-border-subtle border-border-subtle"
                        }`}
                      >
                        <motion.div
                          initial={false}
                          animate={{ x: options.uppercase ? 16 : 2 }}
                          className={`absolute top-0.5 w-2.5 h-2.5 rounded-full shadow-lg ${
                            options.uppercase
                              ? "bg-accent-glitch shadow-[0_0_8px_rgba(57,255,20,0.8)]"
                              : "bg-text-muted/40"
                          }`}
                        />
                      </div>
                    </div>

                    <div className="absolute top-0 left-0 w-full h-[1px] bg-border-subtle" />
                  </motion.button>

                  <motion.button
                    whileTap={{ y: 1 }}
                    onClick={() => setShowPlatformLimits(!showPlatformLimits)}
                    className={`group relative flex items-center gap-3 p-3 border transition-all duration-300 overflow-hidden rounded-md cursor-pointer select-none ${
                      showPlatformLimits
                        ? "border-accent-glitch/40 bg-accent-glitch/5 shadow-sm"
                        : "border-border-subtle bg-bg-void/50 light:bg-neutral-50 light:border-neutral-200 hover:border-border-subtle "
                    }`}
                  >
                    <div
                      className={`p-1.5 rounded-sm transition-all duration-500 ${
                        showPlatformLimits
                          ? "bg-accent-glitch text-black shadow-[0_0_10px_rgba(57,255,20,0.3)]"
                          : "bg-border-subtle text-text-muted group-hover:bg-text-muted/20"
                      }`}
                    >
                      <BarChart3 className="w-3.5 h-3.5" />
                    </div>

                    <div className="flex flex-col items-start gap-0 min-w-0">
                      <span
                        className={`text-[10px] font-mono uppercase tracking-[0.05em] transition-colors duration-300 truncate w-full ${
                          showPlatformLimits
                            ? "text-text-primary font-black"
                            : "text-text-muted/80 group-hover:text-text-primary"
                        }`}
                      >
                        Character Guide
                      </span>
                      <span
                        className={`text-[7px] font-mono tracking-widest mt-0.5 transition-opacity duration-300 ${
                          showPlatformLimits
                            ? "text-accent-glitch/80"
                            : "text-text-muted"
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
                            : "bg-border-subtle border-border-subtle"
                        }`}
                      >
                        <motion.div
                          initial={false}
                          animate={{ x: showPlatformLimits ? 16 : 2 }}
                          className={`absolute top-0.5 w-2.5 h-2.5 rounded-full shadow-lg ${
                            showPlatformLimits
                              ? "bg-accent-glitch shadow-[0_0_8px_rgba(57,255,20,0.8)]"
                              : "bg-text-muted/40"
                          }`}
                        />
                      </div>
                    </div>

                    <div className="absolute top-0 left-0 w-full h-[1px] bg-border-subtle" />
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
                                className="p-2 border border-border-subtle light:border-neutral-200"
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
                                <div className="w-full h-1 bg-border-subtle relative overflow-hidden">
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
