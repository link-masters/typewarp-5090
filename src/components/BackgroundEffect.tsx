"use client";

import React, { useEffect, useRef } from "react";

export default function BackgroundEffect() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d", { alpha: false });
    if (!ctx) return;

    let animationFrameId: number;
    let frameCount = 0;

    // Detect mobile for performance scaling
    const isMobile = window.innerWidth < 768;
    const skipFrames = isMobile ? 3 : 1; // Only render every Nth frame on mobile

    const resize = () => {
      const dpr = Math.min(window.devicePixelRatio, 1); // cap DPR at 1 for perf
      canvas.width = window.innerWidth * dpr;
      canvas.height = window.innerHeight * dpr;
      canvas.style.width = window.innerWidth + "px";
      canvas.style.height = window.innerHeight + "px";
      ctx.scale(dpr, dpr);
    };

    // Debounced resize
    let resizeTimer: ReturnType<typeof setTimeout>;
    const handleResize = () => {
      clearTimeout(resizeTimer);
      resizeTimer = setTimeout(resize, 150);
    };

    window.addEventListener("resize", handleResize, { passive: true });
    resize();

    const characters = "01$#@%&*";
    const fontSize = isMobile ? 16 : 14; // Larger = fewer columns on mobile
    const columns = Math.ceil(window.innerWidth / fontSize);
    const drops: number[] = new Array(columns)
      .fill(1)
      .map(() => Math.random() * -50);

    // Skip animation if user prefers reduced motion
    const prefersReducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;
    if (prefersReducedMotion) return;

    const draw = () => {
      frameCount++;

      // Skip frames on mobile for performance
      if (frameCount % skipFrames !== 0) {
        animationFrameId = requestAnimationFrame(draw);
        return;
      }

      ctx.fillStyle = "rgba(3, 3, 3, 0.12)";
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      ctx.font = `${fontSize}px monospace`;

      // On mobile, only render every other column
      const step = isMobile ? 2 : 1;
      for (let i = 0; i < drops.length; i += step) {
        const text = characters[Math.floor(Math.random() * characters.length)];

        ctx.fillStyle =
          Math.random() > 0.95 ? "#BC13FE" : "rgba(57, 255, 20, 0.18)";
        ctx.fillText(text, i * fontSize, drops[i] * fontSize);

        if (drops[i] * fontSize > canvas.height && Math.random() > 0.97) {
          drops[i] = 0;
        }
        drops[i] += 1.5;
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
      className="fixed inset-0 pointer-events-none z-0 opacity-40"
      style={{ filter: "blur(0.5px)", contain: "strict" }}
    />
  );
}
