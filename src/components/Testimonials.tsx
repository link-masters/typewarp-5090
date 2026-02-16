"use client";

import React from "react";
import { motion } from "framer-motion";
import { Quote } from "lucide-react";
import Image from "next/image";

const testimonials = [
  {
    name: "Alex Reed",
    role: "Graphic Designer",
    text: "The unique text effects I can create with these tools are amazing. It has become a staple in my design workflow.",
    avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Alex",
  },
  {
    name: "Sarah Chen",
    role: "Content Creator",
    text: "I love how easy it is to stand out on social media now. The various font styles are exactly what I was looking for.",
    avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Sarah",
  },
  {
    name: "Mike Johnson",
    role: "Social Media Manager",
    text: "Fast, simple, and the results look great. It's the best toolkit I've found for unique typography.",
    avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Mike",
  },
];

export default function Testimonials() {
  return (
    <section className="py-24 md:py-32 bg-[#080808] relative overflow-hidden border-t border-white/5">
      {/* Ambient Glow */}
      <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(circle_at_50%_0%,rgba(57,255,20,0.02)_0%,transparent_50%)] pointer-events-none" />

      <div className="container mx-auto max-w-7xl px-6 relative z-10">
        <div className="text-center mb-16 md:mb-24">
          <h2 className="text-4xl md:text-5xl font-black tracking-tighter uppercase mb-6 leading-[0.9]">
            Community <span className="text-accent-glitch">Reviews</span>
          </h2>
          <p className="text-white/40 font-mono text-sm md:text-lg max-w-xl mx-auto leading-relaxed">
            See what other creators are saying about our collection of tools.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {testimonials.map((t, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.1 }}
              viewport={{ once: true }}
              className="p-6 md:p-10 bg-[#0c0c0c] border border-white/5 rounded-[32px] hover:border-accent-glitch/20 transition-all duration-500 group relative overflow-hidden"
            >
              <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-accent-glitch/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

              <Quote className="w-8 h-8 text-accent-glitch opacity-10 mb-8 group-hover:opacity-100 transition-opacity duration-500" />

              <p className="text-white/60 text-sm md:text-lg leading-relaxed mb-10 italic">
                "{t.text}"
              </p>

              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-full border border-white/10 overflow-hidden relative bg-[#111]">
                  <Image
                    src={t.avatar}
                    alt={t.name}
                    width={48}
                    height={48}
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                  />
                </div>
                <div>
                  <div className="text-sm font-black text-white uppercase tracking-wider">
                    {t.name}
                  </div>
                  <div className="text-[10px] text-white/30 font-mono uppercase tracking-widest mt-1">
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
