"use client";

import React from "react";
import { motion } from "framer-motion";
import { Quote, User } from "lucide-react";

const testimonials = [
  {
    name: "Alex Reed",
    role: "Graphic Designer",
    text: "The unique text effects I can create with these tools are amazing. It has become a staple in my design workflow.",
  },
  {
    name: "Sarah Chen",
    role: "Content Creator",
    text: "I love how easy it is to stand out on social media now. The various font styles are exactly what I was looking for.",
  },
  {
    name: "Mike Johnson",
    role: "Social Media Manager",
    text: "Fast, simple, and the results look great. It's the best toolkit I've found for unique typography.",
  },
];

export default function Testimonials() {
  return (
    <section className="py-16 md:py-20 lg:py-24 bg-[#080808] relative overflow-hidden border-t border-white/5">
      {/* Ambient Glow */}
      <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(circle_at_50%_0%,rgba(57,255,20,0.02)_0%,transparent_50%)] pointer-events-none" />

      <div className="container mx-auto max-w-7xl px-6 relative z-10">
        <div className="text-center mb-12 md:mb-14 lg:mb-16">
          <h2 className="text-3xl md:text-3xl lg:text-4xl font-black tracking-tighter uppercase mb-4 md:mb-5 leading-[0.9]">
            Community <span className="text-accent-glitch">Reviews</span>
          </h2>
          <p className="text-white/40 font-mono text-sm md:text-base max-w-xl mx-auto leading-relaxed">
            See what other creators are saying about our collection of tools.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-5 md:gap-6">
          {testimonials.map((t, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.1 }}
              viewport={{ once: true }}
              className="p-6 md:p-6 lg:p-8 bg-[#0c0c0c] border border-white/5 rounded-2xl md:rounded-3xl hover:border-accent-glitch/20 transition-all duration-500 group relative overflow-hidden"
            >
              <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-accent-glitch/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

              <Quote className="w-6 h-6 md:w-7 md:h-7 text-accent-glitch opacity-10 mb-6 group-hover:opacity-100 transition-opacity duration-500" />

              <p className="text-white/60 text-sm md:text-base leading-relaxed mb-6 md:mb-8 italic">
                "{t.text}"
              </p>

              <div className="flex items-center gap-3">
                <div className="w-10 h-10 md:w-11 md:h-11 rounded-full border border-white/10 flex items-center justify-center overflow-hidden relative bg-[#111]">
                  <User className="w-5 h-5 text-white/40" />
                </div>
                <div>
                  <div className="text-xs md:text-sm font-black text-white uppercase tracking-wider">
                    {t.name}
                  </div>
                  <div className="text-[9px] md:text-[10px] text-white/30 font-mono uppercase tracking-widest mt-0.5">
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
