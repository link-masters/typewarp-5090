"use client";

import Link from "next/link";
import BackgroundEffect from "@/components/CanvasEffect";
import { AlertTriangle, Home, RotateCcw } from "lucide-react";

export default function NotFound() {
  return (
    <div className="min-h-screen bg-bg-void text-text-primary flex items-center justify-center relative overflow-hidden">
      <BackgroundEffect />

      <div className="container max-w-2xl px-4 relative z-10 text-center">
        <div className="inline-block p-6 border border-red-500/30 bg-red-500/5 mb-12 animate-pulse">
          <AlertTriangle className="w-16 h-16 text-red-500 mx-auto" />
        </div>

        <h1 className="text-6xl md:text-9xl font-black mb-8 tracking-tighter uppercase leading-[0.8]">
          Signal <br />
          <span className="text-red-500">Lost.</span>
        </h1>

        <div className="font-mono text-sm uppercase tracking-[0.3em] text-text-muted mb-12 space-y-2">
          <p>ERROR_404: RESOURCE_NOT_FOUND</p>
          <p>STATUS: SYSTEM_INTEGRITY_COMPROMISED</p>
        </div>

        <div className="flex flex-col md:flex-row gap-4 justify-center">
          <Link
            href="/"
            className="px-8 py-4 bg-accent-glitch text-black font-black text-xs uppercase tracking-widest hover:bg-white transition-all flex items-center justify-center gap-3"
          >
            <Home className="w-4 h-4" />
            REBOOT_TO_ROOT
          </Link>
          <button
            onClick={() => window.location.reload()}
            className="px-8 py-4 border border-white/10 text-white font-black text-xs uppercase tracking-widest hover:border-accent-glitch hover:text-accent-glitch transition-all flex items-center justify-center gap-3"
          >
            <RotateCcw className="w-4 h-4" />
            RETRY_SIGNAL
          </button>
        </div>
      </div>

      {/* Decorative scanline decoration */}
      <div className="absolute top-0 left-0 w-full h-[1px] bg-red-500/20 animate-glitch-line-1" />
    </div>
  );
}
