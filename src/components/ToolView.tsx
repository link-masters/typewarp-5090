"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { toolConfigs } from "@/lib/toolConfig";
import { transformText } from "@/lib/transformers";
import { ToolIcon } from "@/components/ToolIcon";

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
  };
}

const colors = [
  { name: "Default", value: "inherit", bg: "bg-zinc-800" },
  { name: "Red", value: "#ef4444", bg: "bg-red-500" },
  { name: "Green", value: "#22c55e", bg: "bg-green-500" },
  { name: "Blue", value: "#3b82f6", bg: "bg-blue-500" },
  { name: "Purple", value: "#a855f7", bg: "bg-purple-500" },
  { name: "Yellow", value: "#eab308", bg: "bg-yellow-500" },
];

export default function ToolView({ tool, category }: ToolViewProps) {
  const [input, setInput] = useState("");
  const [output, setOutput] = useState("");
  const [isCopied, setIsCopied] = useState(false);
  const [showToast, setShowToast] = useState(false);
  const [outputColor, setOutputColor] = useState("inherit");
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

  const handleCopy = () => {
    if (!output) return;

    if (outputColor !== "inherit") {
      // Create rich text blob for color support
      const html = `<span style="color: ${outputColor}">${output.replace(/\n/g, "<br>")}</span>`;
      const textBlob = new Blob([output], { type: "text/plain" });
      const htmlBlob = new Blob([html], { type: "text/html" });

      try {
        navigator.clipboard.write([
          new ClipboardItem({
            "text/plain": textBlob,
            "text/html": htmlBlob,
          }),
        ]);
      } catch (e) {
        // Fallback for browsers that don't support ClipboardItem
        navigator.clipboard.writeText(output);
      }
    } else {
      navigator.clipboard.writeText(output);
    }

    setIsCopied(true);
    setShowToast(true);
    setTimeout(() => {
      setIsCopied(false);
      setShowToast(false);
    }, 2000);
  };

  const handleClear = () => {
    setInput("");
    setOutput("");
  };

  const btnStyle =
    "transition-all duration-100 active:scale-90 hover:scale-[1.02]";

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
    <div className="min-h-screen pt-24 pb-20 px-4 container mx-auto bg-white dark:bg-black text-black dark:text-white transition-colors duration-300">
      <div className="fixed inset-0 overflow-hidden pointer-events-none opacity-10 dark:opacity-20">
        <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-red-600/20 rounded-full blur-[120px] animate-pulse-slow"></div>
        <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] bg-purple-600/20 rounded-full blur-[120px] animate-pulse-slow"></div>
      </div>

      <div className="relative z-10 flex flex-col gap-8 max-w-7xl mx-auto px-1 sm:px-0">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6 animate-fade-in">
          <div>
            <div className="flex items-center gap-2 text-[10px] font-black uppercase tracking-[0.2em] text-red-500 mb-2">
              <span className="w-8 h-[1px] bg-red-500"></span>
              TypeWarp System v2.1 // {category.name}
            </div>
            <h1 className="text-4xl md:text-6xl font-black text-zinc-900 dark:text-white tracking-tighter">
              {tool.name.split(" ")[0]}{" "}
              <span className="bg-gradient-to-r from-red-600 to-purple-600 bg-clip-text text-transparent">
                {tool.name.split(" ").slice(1).join(" ")}
              </span>
            </h1>
          </div>
          <div className="flex items-center gap-2 sm:gap-4 bg-white dark:bg-white/5 p-1.5 sm:p-2 rounded-2xl border border-zinc-200 dark:border-white/10 backdrop-blur-xl shadow-sm dark:shadow-none w-full sm:w-auto overflow-x-auto sm:overflow-visible no-scrollbar">
            <Link
              href="/"
              className={`px-3 sm:px-4 py-2 text-[10px] sm:text-xs font-black uppercase tracking-widest text-zinc-400 dark:text-white/50 hover:text-zinc-900 dark:hover:text-white whitespace-nowrap ${btnStyle}`}
            >
              Home
            </Link>
            <div className="shrink-0 w-[1px] h-4 bg-zinc-200 dark:bg-white/10"></div>
            <Link
              href={`/${category.slug}`}
              className={`px-3 sm:px-4 py-2 text-[10px] sm:text-xs font-black uppercase tracking-widest text-zinc-400 dark:text-white/50 hover:text-zinc-900 dark:hover:text-white whitespace-nowrap ${btnStyle}`}
            >
              {category.name}
            </Link>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          <div className="lg:col-span-8 flex flex-col gap-6">
            <div className="group relative overflow-hidden rounded-[2rem] bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-white/10 transition-all duration-300 hover:border-red-500/50 shadow-sm dark:shadow-none">
              <div className="p-4 sm:p-8 sm:pb-10">
                <div className="flex justify-between items-center mb-6">
                  <span className="text-[10px] font-black uppercase tracking-widest text-zinc-400 dark:text-white/30">
                    Input Buffer
                  </span>
                  <button
                    onClick={handleClear}
                    className={`p-2 rounded-lg bg-white dark:bg-white/5 text-zinc-400 dark:text-white/50 hover:text-red-500 hover:bg-red-50 dark:hover:bg-red-500/10 border border-zinc-100 dark:border-transparent ${btnStyle}`}
                  >
                    <svg
                      className="w-4 h-4"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
                      />
                    </svg>
                  </button>
                </div>
                <textarea
                  id="tool-input-buffer"
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  placeholder="Insert text to warp..."
                  aria-label={`Insert text to transform with ${tool.name}`}
                  className="w-full h-12 md:h-28 bg-transparent text-lg md:text-2xl font-bold text-zinc-900 dark:text-white placeholder:text-zinc-300 dark:placeholder:text-zinc-800 outline-none resize-none custom-scrollbar"
                  autoFocus
                />
              </div>
            </div>

            {output && (
              <div className="animate-slide-in-up">
                <div
                  className={`relative p-4 md:p-6 rounded-[2rem] sm:rounded-[2.5rem] bg-white dark:bg-black border-2 border-red-600/50 shadow-xl dark:shadow-[0_0_100px_rgba(239,68,68,0.15)] group overflow-hidden ${options.customSettings?.mockup ? "max-w-md mx-auto aspect-[9/19] rounded-[2.5rem] sm:rounded-[3rem] border-[10px] sm:border-[14px] border-zinc-950 shadow-2xl" : ""}`}
                >
                  {options.customSettings?.mockup &&
                    tool.slug.includes("instagram") && (
                      <div className="absolute inset-x-0 top-0 h-16 bg-white/80 dark:bg-zinc-900/80 backdrop-blur-md flex items-center px-6 justify-between border-b border-zinc-100 dark:border-white/10 z-20">
                        <div className="flex items-center gap-3">
                          <div className="w-8 h-8 rounded-full bg-gradient-to-tr from-yellow-400 via-red-500 to-purple-600 p-0.5" />
                          <span className="text-[10px] font-black text-zinc-900 dark:text-white uppercase">
                            Your_Avatar
                          </span>
                        </div>
                        <svg
                          className="w-4 h-4 text-zinc-400 dark:text-white/50"
                          fill="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path d="M12 8c1.1 0 2-.9 2-2s-.9-2-2-2-2 .9-2 2 .9 2 2 2zm0 2c-1.1 0-2 .9-2 2s.9 2 2 2 2-.9 2-2-.9-2-2-2zm0 6c-1.1 0-2 .9-2 2s.9 2 2 2 2-.9 2-2-.9-2-2-2z" />
                        </svg>
                      </div>
                    )}

                  {tool.slug === "demonic-text" && (
                    <div className="absolute inset-0 flex items-center justify-center opacity-5 pointer-events-none">
                      <div className="w-[120%] aspect-square border-[8px] border-red-600 rounded-full animate-spin-slow flex items-center justify-center">
                        <div className="w-[80%] aspect-square border-[4px] border-dashed border-red-500 rounded-full" />
                      </div>
                    </div>
                  )}

                  <div className="relative min-h-[60px] md:min-h-[80px] flex items-center justify-center text-center z-10 w-full overflow-y-auto custom-scrollbar max-h-[400px]">
                    <div className="flex flex-col gap-6 w-full">
                      <p
                        className="text-2xl md:text-3xl font-black break-all leading-snug selection:bg-red-600 selection:text-white whitespace-pre-wrap transition-colors duration-300"
                        style={{ color: outputColor }}
                      >
                        {output}
                      </p>

                      {tool.slug === "character-counter" && input && (
                        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-12 pt-12 border-t border-zinc-100 dark:border-white/10">
                          {[
                            {
                              l: "Words",
                              v: input.trim()
                                ? input.trim().split(/\s+/).length
                                : 0,
                            },
                            {
                              l: "Sentences",
                              v: input.split(/[.!?]+/).filter(Boolean).length,
                            },
                            {
                              l: "Read Time",
                              v: `${Math.ceil(input.length / 1000)}m`,
                            },
                            { l: "Complexity", v: "Low" },
                          ].map((s) => (
                            <div
                              key={s.l}
                              className="bg-white dark:bg-white/5 p-3 sm:p-4 rounded-xl sm:rounded-2xl border border-zinc-200 dark:border-transparent"
                            >
                              <div className="text-[10px] uppercase font-black text-zinc-400 dark:text-zinc-500 mb-1">
                                {s.l}
                              </div>
                              <div className="text-2xl font-black text-zinc-900 dark:text-white">
                                {s.v}
                              </div>
                            </div>
                          ))}
                        </div>
                      )}
                    </div>
                  </div>

                  <div className="flex flex-col md:flex-row gap-4 justify-between items-center mt-6 pt-6 md:mt-12 md:pt-8 border-t border-zinc-100 dark:border-white/5 relative z-20">
                    <span className="text-[10px] font-black uppercase text-zinc-400 dark:text-zinc-500">
                      System Ready
                    </span>
                    <button
                      onClick={handleCopy}
                      className={`flex items-center gap-3 px-6 py-3 md:px-6 md:py-3 rounded-[2rem] bg-zinc-900 dark:bg-white text-white dark:text-black text-xs font-black uppercase tracking-widest hover:bg-zinc-800 dark:hover:bg-zinc-200 ${btnStyle}`}
                    >
                      {isCopied ? "Success" : "Copy Result"}
                    </button>
                  </div>
                </div>
              </div>
            )}
          </div>

          <div className="lg:col-span-4 flex flex-col gap-6 lg:sticky lg:top-24">
            <div className="rounded-[2.5rem] bg-white dark:bg-zinc-950 border border-zinc-200 dark:border-white/10 p-5 md:p-8 shadow-sm dark:shadow-2xl overflow-hidden relative group">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-10 h-10 rounded-2xl bg-gradient-to-br from-red-600 to-purple-700 flex items-center justify-center text-xl shadow-lg">
                  <ToolIcon
                    slug={tool.slug}
                    categorySlug={category.slug}
                    className="w-6 h-6 text-white"
                  />
                </div>
                <div>
                  <h3 className="text-xs font-black uppercase tracking-widest text-zinc-900 dark:text-white">
                    Configuration
                  </h3>
                </div>
              </div>

              <div className="flex flex-col gap-5 md:gap-8">
                {toolConfig?.controls.map((control: any) => (
                  <div key={control.id} className="flex flex-col gap-4">
                    <div className="flex justify-between items-center px-1">
                      <span className="text-[10px] font-black uppercase tracking-widest text-zinc-400">
                        {control.label}
                      </span>
                      <span className="text-xs font-mono text-red-500">
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
                        className="w-full h-1.5 bg-zinc-100 dark:bg-zinc-900 rounded-full appearance-none cursor-pointer accent-red-600"
                      />
                    )}

                    {control.type === "select" && (
                      <select
                        id={`control-${control.id}`}
                        value={
                          options.customSettings?.[control.id] ??
                          control.defaultValue
                        }
                        onChange={(e) =>
                          setOptions((prev) => ({
                            ...prev,
                            customSettings: {
                              ...prev.customSettings,
                              [control.id]: e.target.value,
                            },
                          }))
                        }
                        aria-label={`Select ${control.label}`}
                        className="w-full bg-white dark:bg-zinc-900/50 border border-[0.6px] border-zinc-200 dark:border-white/10 rounded-2xl px-4 py-3 md:px-5 md:py-4 text-xs font-black text-zinc-900 dark:text-white outline-none cursor-pointer"
                      >
                        {control.options?.map((opt: any) => (
                          <option
                            key={opt.value}
                            value={opt.value}
                            className="bg-zinc-50 dark:bg-zinc-950"
                          >
                            {opt.label}
                          </option>
                        ))}
                      </select>
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
                        className={`w-full flex items-center justify-between px-4 py-3 md:px-6 md:py-5 rounded-2xl border transition-all ${
                          (options.customSettings?.[control.id] ??
                          control.defaultValue)
                            ? "border-red-600/30 dark:border-red-600/50 bg-red-50 dark:bg-red-600/5 text-red-600 dark:text-red-500"
                            : "border-zinc-100 dark:border-white/5 bg-white dark:bg-zinc-900 text-zinc-400 dark:text-zinc-500"
                        } ${btnStyle}`}
                      >
                        <span className="text-[10px] font-black uppercase tracking-widest">
                          {options.customSettings?.[control.id] ? "On" : "Off"}
                        </span>
                        <div
                          className={`w-3 h-3 rounded-full ${
                            (options.customSettings?.[control.id] ??
                            control.defaultValue)
                              ? "bg-red-600 shadow-[0_0_10px_rgba(231,68,68,0.5)]"
                              : "bg-zinc-200 dark:bg-zinc-800"
                          }`}
                        />
                      </button>
                    )}
                  </div>
                ))}

                <div className="pt-6 border-t border-zinc-100 dark:border-white/5">
                  <span className="text-[10px] font-black uppercase tracking-widest text-zinc-400 block mb-4 md:mb-6 px-1">
                    System Tint
                  </span>
                  <div className="grid grid-cols-6 gap-3 mb-4">
                    {colors.map((c) => (
                      <button
                        key={c.name}
                        onClick={() => setOutputColor(c.value)}
                        className={`aspect-square rounded-xl transition-all duration-100 ${c.bg} ${outputColor === c.value ? "scale-110 ring-2 ring-zinc-300 dark:ring-white/20" : "opacity-30 hover:opacity-100"} ${btnStyle}`}
                      />
                    ))}
                  </div>
                  <p className="text-[9px] font-bold text-zinc-400 dark:text-zinc-600 leading-relaxed px-1">
                    * Colors work in Google Docs, Word, Notes, etc. Social media
                    apps only support plain text.
                  </p>
                </div>

                <div className="pt-6 border-t border-zinc-100 dark:border-white/5">
                  <button
                    onClick={() =>
                      setOptions({ ...options, uppercase: !options.uppercase })
                    }
                    className={`w-full flex items-center justify-between px-4 py-3 md:px-6 md:py-5 rounded-2xl border transition-all ${
                      options.uppercase
                        ? "border-purple-600/30 dark:border-purple-600/50 bg-purple-50 dark:bg-purple-600/5 text-purple-600 dark:text-purple-500 shadow-sm"
                        : "border-zinc-100 dark:border-white/5 bg-white dark:bg-zinc-900 text-zinc-400 dark:text-zinc-500"
                    } ${btnStyle}`}
                  >
                    <div className="flex flex-col items-start gap-0.5">
                      <span className="text-[10px] font-black uppercase tracking-widest text-zinc-900 dark:text-white">
                        Caps Lock
                      </span>
                      <span className="text-[8px] font-bold uppercase tracking-tighter opacity-70">
                        {options.uppercase ? "Forcing Upper" : "Variable Case"}
                      </span>
                    </div>
                    <div
                      className={`w-8 h-4 rounded-full relative transition-colors ${options.uppercase ? "bg-purple-600" : "bg-zinc-200 dark:bg-zinc-800"}`}
                    >
                      <div
                        className={`absolute top-1 w-2 h-2 rounded-full bg-white transition-all ${options.uppercase ? "right-1" : "left-1"}`}
                      />
                    </div>
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mt-20 animate-fade-in-up">
          <div className="p-10 rounded-[2.5rem] bg-white dark:bg-zinc-950 border border-zinc-200 dark:border-white/5 shadow-sm dark:shadow-xl">
            <h2 className="text-xl font-black text-zinc-900 dark:text-white uppercase tracking-widest mb-8 flex items-center gap-3">
              <span className="w-2 h-2 rounded-full bg-red-600"></span>
              About {tool.name}
            </h2>
            <div className="space-y-6">
              <p className="text-zinc-600 dark:text-zinc-500 leading-relaxed font-bold text-sm">
                {content.about}
              </p>
              <p className="text-zinc-500 dark:text-zinc-600 leading-relaxed font-medium text-xs border-l-2 border-red-600/20 pl-6 italic">
                {content.moreInfo}
              </p>
            </div>
          </div>
          <div className="p-10 rounded-[2.5rem] bg-white dark:bg-zinc-950 border border-zinc-200 dark:border-white/10 shadow-sm dark:shadow-xl">
            <h2 className="text-xl font-black text-zinc-900 dark:text-white uppercase tracking-widest mb-8 flex items-center gap-3 space-x-2">
              <span className="w-2 h-2 rounded-full bg-purple-600"></span>
              Key Features
            </h2>
            <div className="grid grid-cols-1 gap-4">
              {content.features.map((f) => (
                <div
                  key={f.title}
                  className="p-4 rounded-xl bg-white dark:bg-white/[0.02] border border-zinc-200 dark:border-white/5"
                >
                  <h3 className="text-xs font-black text-zinc-900 dark:text-white uppercase tracking-widest mb-1">
                    {f.title}
                  </h3>
                  <p className="text-zinc-500 dark:text-zinc-600 text-[10px] font-bold">
                    {f.text}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* How to Use Section */}
        <div className="mt-32 animate-fade-in-up">
          <h2 className="text-3xl font-black text-zinc-900 dark:text-white uppercase tracking-[0.2em] text-center mb-16">
            How to use <span className="text-red-600">{tool.name}</span>
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                s: "01",
                t: "Input Text",
                d: "Paste or type your content into the generator console above.",
              },
              {
                s: "02",
                t: "Warp Controls",
                d: "Adjust the style, intensity, and formatting to your preference.",
              },
              {
                s: "03",
                t: "Copy Result",
                d: "Copy your new stylized text and deploy it anywhere instantly.",
              },
            ].map((step) => (
              <div
                key={step.s}
                className="relative p-10 rounded-[2.5rem] bg-white dark:bg-zinc-950 border border-zinc-200 dark:border-white/5 group hover:border-red-500/30 transition-all duration-300 shadow-sm dark:shadow-none"
              >
                <div className="text-6xl font-black text-zinc-100 dark:text-white/5 absolute top-6 right-6 group-hover:text-red-500/10 transition-colors">
                  {step.s}
                </div>
                <h3 className="text-lg font-black text-zinc-900 dark:text-white uppercase tracking-widest mb-4">
                  {step.t}
                </h3>
                <p className="text-zinc-500 dark:text-zinc-500 text-sm font-bold leading-relaxed">
                  {step.d}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* FAQs Section */}
        <div className="mt-32 mb-20 animate-fade-in-up">
          <h2 className="text-3xl font-black text-zinc-900 dark:text-white uppercase tracking-[0.2em] text-center mb-16">
            Frequently Asked <span className="text-purple-600">Questions</span>
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {content.faqs.map((faq, i) => (
              <div
                key={i}
                className="p-6 sm:p-10 rounded-[2rem] sm:rounded-[2.5rem] bg-white dark:bg-zinc-950 border border-zinc-200 dark:border-white/5 shadow-sm dark:shadow-none"
              >
                <h4 className="text-sm font-black text-zinc-900 dark:text-white uppercase tracking-widest mb-4 flex gap-4">
                  <span className="text-red-500">Q.</span> {faq.q}
                </h4>
                <div className="flex gap-4">
                  <span className="text-purple-500 text-sm font-black">A.</span>
                  <p className="text-zinc-600 dark:text-zinc-500 text-sm font-bold leading-relaxed">
                    {faq.a}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div
        className={`fixed bottom-12 left-1/2 -translate-x-1/2 z-[9999] transition-all duration-300 ${showToast ? "translate-y-0 opacity-100 scale-100" : "translate-y-12 opacity-0 scale-95 pointer-events-none"}`}
      >
        <div className="px-8 py-4 rounded-full bg-white text-black shadow-2xl flex items-center gap-4">
          <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
          <span className="text-xs font-black tracking-widest uppercase text-zinc-900">
            Copied
          </span>
        </div>
      </div>
    </div>
  );
}
