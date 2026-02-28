"use client";

import React, { useEffect, useRef, memo } from "react";

const BackgroundEffect = memo(function BackgroundEffect() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const isVisibleRef = useRef(true);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    // Observe visibility to pause when off-screen
    const observer = new IntersectionObserver(
      ([entry]) => {
        isVisibleRef.current = entry.isIntersecting;
      },
      { threshold: 0 },
    );
    observer.observe(canvas);

    const ctx = canvas.getContext("2d", {
      alpha: false,
      desynchronized: true,
    });
    if (!ctx) return;

    let animationFrameId: number;
    let frameCount = 0;

    const isMobile = typeof window !== "undefined" && window.innerWidth < 768;
    const skipFrames = isMobile ? 4 : 2;
    const fontSize = isMobile ? 20 : 16;
    const step = isMobile ? 4 : 2;

    const resize = () => {
      const scale = isMobile ? 0.5 : 0.75;
      canvas.width = Math.floor(window.innerWidth * scale);
      canvas.height = Math.floor(window.innerHeight * scale);
      canvas.style.width = window.innerWidth + "px";
      canvas.style.height = window.innerHeight + "px";
    };

    let resizeTimer: ReturnType<typeof setTimeout>;
    const handleResize = () => {
      clearTimeout(resizeTimer);
      resizeTimer = setTimeout(resize, 300);
    };

    window.addEventListener("resize", handleResize, { passive: true });
    resize();

    const characters = "01$#@%";
    const columns = Math.ceil(canvas.width / fontSize);
    const drops: number[] = new Array(columns)
      .fill(1)
      .map(() => Math.random() * -50);

    const draw = () => {
      if (document.hidden || !isVisibleRef.current) {
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
        const text = characters[(Math.random() * characters.length) | 0];
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

    // Delay animation start by 1.5s to free up main thread for better mobile LCP and Speed Index
    const startDelayTimer = setTimeout(() => {
      animationFrameId = requestAnimationFrame(draw);
    }, 1500);

    return () => {
      observer.disconnect();
      window.removeEventListener("resize", handleResize);
      cancelAnimationFrame(animationFrameId);
      clearTimeout(resizeTimer);
      clearTimeout(startDelayTimer);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 pointer-events-none z-0 opacity-20"
    />
  );
});

export default BackgroundEffect;
