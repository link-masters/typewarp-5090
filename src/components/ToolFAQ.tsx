"use client";

import { HelpCircle, Shield, Smartphone, Square, Lock, Instagram, Search, Accessibility, type LucideIcon } from "lucide-react";

interface FAQItemProps {
  icon: LucideIcon;
  question: string;
  answer: string;
}

function FAQItem({ icon: Icon, question, answer }: FAQItemProps) {
  return (
    <div className="flex gap-4 p-5 rounded-xl bg-bg-card border border-border-subtle light:border-neutral-200 light:shadow-sm">
      <div className="shrink-0 w-10 h-10 flex items-center justify-center rounded-lg bg-accent-glitch/10 border border-accent-glitch/20">
        <Icon className="w-4 h-4 text-emerald-600 dark:text-accent-glitch" />
      </div>
      <div>
        <h3 className="text-sm font-bold text-text-primary mb-1.5">{question}</h3>
        <p className="text-xs text-text-muted leading-relaxed">{answer}</p>
      </div>
    </div>
  );
}

/**
 * Shared FAQ component — loaded client-side with data-nosnippet.
 * Google ignores this duplicate content across tool pages.
 */
export default function ToolFAQ({ toolName }: { toolName: string }) {
  const name = toolName.replace(" Generator", "").replace(" Online", "");

  return (
    <div data-nosnippet>
      <h2 className="text-2xl font-black text-text-primary uppercase tracking-tighter mb-8">
        Frequently Asked Questions
      </h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <FAQItem
          icon={HelpCircle}
          question={`Is the ${name} free to use?`}
          answer="Yes. Every tool on TypeWarp is 100% free with no signup required."
        />
        <FAQItem
          icon={Shield}
          question="Do I need to install anything?"
          answer="No. Everything runs in your browser. The output is standard Unicode text — no fonts to install."
        />
        <FAQItem
          icon={Smartphone}
          question="Will the text work on phones?"
          answer="Yes. Standard Unicode characters display correctly on iOS, Android, Windows, and macOS."
        />
        <FAQItem
          icon={Square}
          question="Why do some characters show as squares?"
          answer="Empty squares (tofu) mean the device lacks a font for that specific Unicode character. Updating your OS usually fixes this."
        />
        <FAQItem
          icon={Instagram}
          question="Can I use this in my Instagram bio?"
          answer="Yes. Generate your text, click copy, and paste directly into your Instagram, Discord, TikTok, or Twitter bio."
        />
        <FAQItem
          icon={Lock}
          question="Is encoding the same as encryption?"
          answer="No. Encoding is not encryption. Anyone can decode Base64 or Hex. Never use encoding to protect passwords."
        />
        <FAQItem
          icon={Accessibility}
          question="How do screen readers handle styled text?"
          answer="Screen readers may read styled Unicode characters literally. Use standard text for critical information."
        />
        <FAQItem
          icon={Search}
          question="Does styled text affect SEO?"
          answer="Yes. Search engines may not recognize heavily styled Unicode as readable words. Use standard text for important content."
        />
      </div>
    </div>
  );
}
