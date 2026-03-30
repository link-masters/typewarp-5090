"use client";

import { Sun, Moon } from "lucide-react";
import { useTheme } from "@/components/ThemeProvider";
import { motion, AnimatePresence } from "framer-motion";

export default function ThemeToggle() {
  const { theme, toggle } = useTheme();

  return (
    <motion.button
      whileTap={{ scale: 0.88 }}
      onClick={toggle}
      aria-label={theme === "dark" ? "Switch to light mode" : "Switch to dark mode"}
      className="p-2 sm:p-2.5 rounded-xl transition-colors text-neutral-500 dark:text-text-muted hover:text-neutral-800 dark:hover:text-text-primary hover:bg-neutral-100 dark:hover:bg-white/[0.04] light:text-neutral-500 light:hover:text-neutral-800 light:hover:bg-neutral-100"
    >
      <AnimatePresence mode="wait" initial={false}>
        <motion.div
          key={theme}
          initial={{ rotate: -90, opacity: 0, scale: 0.8 }}
          animate={{ rotate: 0, opacity: 1, scale: 1 }}
          exit={{ rotate: 90, opacity: 0, scale: 0.8 }}
          transition={{ duration: 0.15 }}
        >
          {theme === "dark" ? (
            <Sun className="w-4 h-4 sm:w-[18px] sm:h-[18px]" />
          ) : (
            <Moon className="w-4 h-4 sm:w-[18px] sm:h-[18px]" />
          )}
        </motion.div>
      </AnimatePresence>
    </motion.button>
  );
}
