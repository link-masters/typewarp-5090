"use client";

import { useEffect, lazy, Suspense } from "react";

const CHARS = "!@#$%^&*()_+{}:<>?|ABCD0123456789";
const WORDS = ["Modern", "Text Effects", "Generator"];

function scramble(element: HTMLElement, wordIndex: number, cb: () => void) {
  const word = WORDS[wordIndex];
  if (!word) return cb();

  let iteration = 0;
  const interval = setInterval(() => {
    element.textContent = word
      .split("")
      .map((char, i) =>
        i < iteration ? char : CHARS[Math.floor(Math.random() * CHARS.length)]
      )
      .join("");

    if (iteration >= word.length) {
      clearInterval(interval);
      element.textContent = word;
      cb();
    }
    iteration += 1 / 1.5;
  }, 20);
}

const BackgroundEffect = lazy(() => import("./CanvasEffect"));

/**
 * Animates the existing server-rendered heading in-place.
 * Finds each word span inside #hero-heading and runs the scramble effect.
 * No overlay, no repositioning — exact same DOM, zero alignment issues.
 */
export default function HeroAnimation() {
  useEffect(() => {
    if (typeof window === "undefined") return;
    if (window.innerWidth < 768) return;

    const heading = document.getElementById("hero-heading");
    if (!heading) return;

    // Find the three word spans inside the heading
    const spans = heading.querySelectorAll<HTMLElement>("span.whitespace-nowrap");
    if (spans.length < 3) return;

    // Scramble each word in sequence
    let idx = 0;
    function next() {
      if (idx < spans.length) {
        scramble(spans[idx], idx, () => {
          idx++;
          setTimeout(next, 200);
        });
      }
    }
    setTimeout(next, 200);
  }, []);

  return (
    <Suspense fallback={null}>
      <BackgroundEffect />
    </Suspense>
  );
}
