"use client";

import React from "react";
import { motion } from "framer-motion";
import { Quote } from "lucide-react";

const testimonials = [
  {
    name: "X_PROTOCOL",
    role: "Digital Architect",
    text: "The entropy levels achieved by TypeWarp are unprecedented. It has become a core module in my aesthetic toolkit.",
    avatar: "https://api.dicebear.com/7.x/pixel-art/svg?seed=1",
  },
  {
    name: "CYBER_WITCH_99",
    role: "Content Alchemist",
    text: "Finally, a generator that doesn't just add marks, but truly corrupts the text structure. The Zalgo implementation is pure perfection.",
    avatar: "https://api.dicebear.com/7.x/pixel-art/svg?seed=2",
  },
  {
    name: "VOID_WALKER",
    role: "System Admin",
    text: "TypeWarp's binary and morse decoders are the fastest I've tested. Zero latency, maximum styling.",
    avatar: "https://api.dicebear.com/7.x/pixel-art/svg?seed=3",
  },
];

export default function Testimonials() {
  return (
    <section className="py-12 md:py-28 bg-bg-void relative overflow-hidden">
      <div className="absolute inset-0 opacity-[0.03] pointer-events-none bg-[radial-gradient(circle_at_50%_50%,#39FF14_1px,transparent_1px)] bg-[size:60px_60px]" />

      <div className="container mx-auto max-w-7xl px-4 relative z-10">
        <div className="text-center mb-10 md:mb-20">
          <h2 className="text-2xl md:text-5xl font-black tracking-tighter uppercase mb-4 md:mb-6">
            User <span className="text-accent-glitch">Intelligence</span>{" "}
            Reports
          </h2>
          <p className="text-text-muted font-mono text-xs md:text-base max-w-xl mx-auto">
            Feedback from high-level operators using the TypeWarp protocol
            daily.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8">
          {testimonials.map((t, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 15 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.1 }}
              viewport={{ once: true }}
              className="p-6 md:p-8 bg-bg-card border border-border-subtle hover:border-accent-glitch/30 transition-all group"
            >
              <Quote className="w-6 md:w-8 h-6 md:h-8 text-accent-glitch opacity-20 mb-4 md:mb-6 group-hover:opacity-100 transition-opacity" />
              <p className="text-text-primary/80 font-mono text-xs md:text-sm leading-relaxed mb-6 md:mb-8 italic">
                "{t.text}"
              </p>
              <div className="flex items-center gap-4">
                <div className="w-10 h-10 border border-border-subtle overflow-hidden">
                  <img
                    src={t.avatar}
                    alt={t.name}
                    className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all"
                  />
                </div>
                <div>
                  <div className="text-xs font-black text-accent-glitch uppercase tracking-widest">
                    {t.name}
                  </div>
                  <div className="text-[10px] text-text-muted font-mono uppercase">
                    {t.role}
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
