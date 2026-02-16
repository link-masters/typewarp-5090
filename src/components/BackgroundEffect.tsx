"use client";

import React, { useEffect, useRef } from "react";

export default function BackgroundEffect() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d", {
      alpha: false,
      desynchronized: true, // Low latency rendering
    });
    if (!ctx) return;

    let animationFrameId: number;
    let frameCount = 0;

    // Performance presets
    const isMobile = typeof window !== "undefined" && window.innerWidth < 768;
    const skipFrames = isMobile ? 3 : 1;
    const fontSize = isMobile ? 18 : 14;
    const step = isMobile ? 3 : 1; // Only render every 3rd column on mobile

    const resize = () => {
      // Cap at 1 for max performance on high-DPI screens
      const dpr = 1;
      canvas.width = window.innerWidth * dpr;
      canvas.height = window.innerHeight * dpr;
      canvas.style.width = window.innerWidth + "px";
      canvas.style.height = window.innerHeight + "px";
    };

    let resizeTimer: ReturnType<typeof setTimeout>;
    const handleResize = () => {
      clearTimeout(resizeTimer);
      resizeTimer = setTimeout(resize, 250);
    };

    window.addEventListener("resize", handleResize, { passive: true });
    resize();

    const characters = "01$#@%&*";
    const columns = Math.ceil(window.innerWidth / fontSize);
    const drops: number[] = new Array(columns)
      .fill(1)
      .map(() => Math.random() * -100);

    const draw = () => {
      // Pause if tab is hidden to save energy/CPU
      if (document.hidden) {
        animationFrameId = requestAnimationFrame(draw);
        return;
      }

      frameCount++;
      if (frameCount % skipFrames !== 0) {
        animationFrameId = requestAnimationFrame(draw);
        return;
      }

      ctx.fillStyle = "rgba(3, 3, 3, 0.15)";
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      ctx.font = `${fontSize}px monospace`;

      for (let i = 0; i < drops.length; i += step) {
        const text = characters[Math.floor(Math.random() * characters.length)];

        // Use simpler colors for perf
        ctx.fillStyle =
          Math.random() > 0.98 ? "#39ff14" : "rgba(57, 255, 20, 0.12)";
        ctx.fillText(text, i * fontSize, drops[i] * fontSize);

        if (drops[i] * fontSize > canvas.height && Math.random() > 0.98) {
          drops[i] = 0;
        }
        drops[i] += 1.2;
      }

      animationFrameId = requestAnimationFrame(draw);
    };

    draw();

    return () => {
      window.removeEventListener("resize", handleResize);
      cancelAnimationFrame(animationFrameId);
      clearTimeout(resizeTimer);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 pointer-events-none z-0 opacity-20"
      style={{
        contain: "strict",
        transform: "translateZ(0)", // Force GPU acceleration
      }}
    />
  );
}
