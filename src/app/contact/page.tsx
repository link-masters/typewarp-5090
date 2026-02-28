import React from "react";
import { SITE_URL } from "@/lib/config";
import { Metadata } from "next";
import ContactForm from "@/components/ContactForm";
import JSONLD from "@/components/JSONLD";
import BackgroundEffect from "@/components/CanvasEffect";
import Link from "next/link";
import {
  Home,
  ChevronRight,
  Mail,
  Clock,
  MessageSquare,
  ArrowRight,
  Sparkles,
} from "lucide-react";

export const metadata: Metadata = {
  title: "Contact TypeWarp | Support for Cursed Text & Font Tools",
  description:
    "Contact the TypeWarp support team for help with our cursed text generator, glitch font tools, or technical inquiries. We are here to assist with your needs.",
  keywords: [
    "contact typewarp",
    "text generator support",
    "cursed text help",
    "glitch font assistance",
    "typewarp feedback",
  ],
  openGraph: {
    title: "Contact Us | TypeWarp Support",
    description:
      "Get help with TypeWarp tools or send us your feedback. We respond within 24 hours.",
    url: `${SITE_URL}/contact`,
    type: "website",
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "Contact TypeWarp Support",
      },
    ],
    siteName: "TypeWarp",
  },
  twitter: {
    card: "summary_large_image",
    title: "Contact Us | TypeWarp Support",
    description: "Get help with TypeWarp tools or send us your feedback.",
    creator: "@typewarp",
    images: ["/og-image.png"],
  },
  alternates: {
    canonical: `${SITE_URL}/contact`,
  },
};

export default function ContactPage() {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "ContactPage",
    name: "Contact Support",
    description: "Contact our support team for help with TypeWarp tools.",
    url: `${SITE_URL}/contact`,
  };

  return (
    <div className="min-h-screen pt-24 lg:pt-28 pb-16 sm:pb-24 bg-bg-void text-text-primary relative overflow-hidden">
      <BackgroundEffect />
      <JSONLD data={jsonLd} />

      <div className="mx-auto px-4 sm:px-6 max-w-6xl relative z-10">
        {/* Breadcrumbs */}
        <nav className="flex items-center gap-2 mb-8 md:mb-16 font-mono text-[10px] sm:text-xs uppercase tracking-[0.2em] text-text-muted">
          <Link
            href="/"
            className="hover:text-accent-glitch transition-colors flex items-center gap-1.5"
          >
            <Home className="w-3 h-3 sm:w-3.5 sm:h-3.5" />
            Home
          </Link>
          <ChevronRight className="w-3 h-3 opacity-30" />
          <span className="text-accent-glitch">Contact</span>
        </nav>

        <div className="flex flex-col lg:flex-row gap-12 lg:gap-20 items-start">
          {/* Left Column: Premium Typography & Info */}
          <div className="flex-1 w-full lg:sticky lg:top-32">
            <div className="inline-flex items-center gap-2 px-3 py-1 mb-6 sm:mb-8 bg-accent-glitch/5 border border-accent-glitch/20 rounded-full">
              <Sparkles className="w-3 h-3 text-accent-glitch" />
              <span className="text-accent-glitch text-[9px] sm:text-[10px] font-mono font-black uppercase tracking-[0.2em]">
                TypeWarp Support
              </span>
            </div>

            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-black mb-6 tracking-tight uppercase leading-[0.85] whitespace-nowrap">
              <span className="text-white">Let&apos;s</span>{" "}
              <span className="text-accent-glitch">Connect.</span>
            </h1>

            <p className="text-text-muted text-sm sm:text-base max-w-md leading-relaxed mb-10 md:mb-14">
              Whether you have a question, a feature request, or just want to
              say hi — our team is here to help.
            </p>

            <div className="space-y-4 max-w-sm">
              <a
                href="mailto:community@typewarp.com"
                className="group flex items-center gap-4 p-5 bg-[#0a0a0a] border border-white/5 rounded-2xl hover:border-accent-glitch/30 transition-all duration-300 relative overflow-hidden"
              >
                <div className="absolute top-0 inset-x-0 h-px bg-gradient-to-r from-transparent via-accent-glitch/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
                <div className="w-12 h-12 bg-[#111] border border-white/10 rounded-xl flex items-center justify-center shrink-0 group-hover:bg-accent-glitch/5 group-hover:border-accent-glitch/20 transition-all">
                  <Mail className="w-5 h-5 text-white/40 group-hover:text-accent-glitch transition-colors" />
                </div>
                <div>
                  <h3 className="text-[10px] font-mono text-text-muted uppercase tracking-[0.2em] font-bold mb-1">
                    Email Us
                  </h3>
                  <p className="text-sm md:text-base text-white font-bold group-hover:text-accent-glitch transition-colors">
                    community@typewarp.com
                  </p>
                </div>
                <ArrowRight className="w-4 h-4 text-white/10 group-hover:text-accent-glitch ml-auto transition-colors" />
              </a>

              <div className="group flex items-center gap-4 p-5 bg-[#0a0a0a] border border-white/5 rounded-2xl relative overflow-hidden">
                <div className="w-12 h-12 bg-[#111] border border-white/10 rounded-xl flex items-center justify-center shrink-0">
                  <Clock className="w-5 h-5 text-white/40" />
                </div>
                <div>
                  <h3 className="text-[10px] font-mono text-text-muted uppercase tracking-[0.2em] font-bold mb-1">
                    Response Time
                  </h3>
                  <p className="text-sm md:text-base text-white font-bold">
                    Within 24 Hours
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column: The Premium Form Form */}
          <div className="flex-[1.2] w-full">
            <div className="bg-[#080808] border border-white/10 rounded-[2rem] p-6 sm:p-8 md:p-12 shadow-2xl relative overflow-hidden w-full">
              {/* Premium Glow Effects */}
              <div className="absolute top-0 inset-x-0 h-[1px] bg-gradient-to-r from-transparent via-accent-glitch/40 to-transparent" />
              <div className="absolute -top-40 -right-40 w-96 h-96 bg-accent-glitch/10 rounded-full blur-[100px] pointer-events-none" />
              <div className="absolute -bottom-40 -left-40 w-96 h-96 bg-blue-500/10 rounded-full blur-[100px] pointer-events-none" />

              <div className="relative z-10">
                <div className="flex items-center gap-3 mb-2">
                  <div className="w-8 h-8 rounded-lg bg-accent-glitch/10 flex items-center justify-center border border-accent-glitch/20">
                    <MessageSquare className="w-4 h-4 text-accent-glitch" />
                  </div>
                  <h2 className="text-xl sm:text-2xl font-black text-white uppercase tracking-tight">
                    Send a Message
                  </h2>
                </div>
                <p className="text-text-muted/60 text-xs sm:text-sm font-mono uppercase tracking-widest mb-8 md:mb-10 pl-11">
                  Fill out the form below
                </p>

                <ContactForm />
              </div>
            </div>
          </div>
        </div>

        {/* Support Info Section */}
        <div className="mt-16 sm:mt-24">
          <div className="flex flex-col items-center gap-4 mb-10 md:mb-14">
            <div className="w-12 h-12 bg-[#0c0c0c] border border-white/10 rounded-xl flex items-center justify-center">
              <MessageSquare className="w-6 h-6 text-accent-glitch" />
            </div>
            <h2 className="text-2xl md:text-3xl font-black uppercase tracking-tighter text-center">
              How We Can <span className="text-accent-glitch">Help</span>
            </h2>
            <p className="text-white/30 font-mono text-xs uppercase tracking-widest">
              Support categories
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-12">
            <div className="p-5 md:p-6 bg-[#0c0c0c] border border-white/5 rounded-xl">
              <h3 className="text-sm font-black uppercase tracking-wider text-white mb-3">
                Technical Support
              </h3>
              <p className="text-white/50 font-mono text-[12px] leading-[1.8]">
                Experiencing issues with a text generator or font tool? Our
                technical team can help troubleshoot problems with character
                rendering, clipboard functionality, platform compatibility, and
                Unicode support. We typically resolve technical issues within 12
                hours of your initial report.
              </p>
            </div>

            <div className="p-5 md:p-6 bg-[#0c0c0c] border border-white/5 rounded-xl">
              <h3 className="text-sm font-black uppercase tracking-wider text-white mb-3">
                Feature Requests
              </h3>
              <p className="text-white/50 font-mono text-[12px] leading-[1.8]">
                Have an idea for a new text style, font generator, or tool
                feature? We actively incorporate community feedback into our
                development roadmap. Many of our most popular tools, including
                the Vaporwave and Zalgo generators, were built based on user
                suggestions. Share your vision with us.
              </p>
            </div>

            <div className="p-5 md:p-6 bg-[#0c0c0c] border border-white/5 rounded-xl">
              <h3 className="text-sm font-black uppercase tracking-wider text-white mb-3">
                General Inquiries
              </h3>
              <p className="text-white/50 font-mono text-[12px] leading-[1.8]">
                Questions about how TypeWarp works, our privacy policy,
                commercial usage rights, or partnership opportunities? Our team
                is happy to provide detailed answers and guidance. We believe in
                transparency and open communication with our community.
              </p>
            </div>
          </div>

          <div className="p-6 md:p-8 bg-[#0c0c0c] border border-white/5 rounded-xl mb-8">
            <h3 className="text-sm font-black uppercase tracking-wider text-white mb-4">
              Frequently Asked Support Questions
            </h3>
            <div className="space-y-6">
              <div>
                <h4 className="text-xs font-mono font-bold text-accent-glitch uppercase tracking-wider mb-2">
                  What information should I include in my message?
                </h4>
                <p className="text-white/50 font-mono text-[12px] leading-[1.8]">
                  For the fastest resolution, please include the specific tool
                  you were using, your browser and operating system, and a
                  description of the issue. If applicable, screenshots are
                  extremely helpful for our team to diagnose the problem
                  quickly.
                </p>
              </div>
              <div>
                <h4 className="text-xs font-mono font-bold text-accent-glitch uppercase tracking-wider mb-2">
                  Is my data safe when I contact you?
                </h4>
                <p className="text-white/50 font-mono text-[12px] leading-[1.8]">
                  Absolutely. TypeWarp is built on a privacy-first architecture.
                  Your contact information is only used to respond to your
                  inquiry and is never shared with third parties, sold, or used
                  for marketing purposes. We take data privacy seriously and
                  comply with GDPR regulations.
                </p>
              </div>
              <div>
                <h4 className="text-xs font-mono font-bold text-accent-glitch uppercase tracking-wider mb-2">
                  Can I request a custom text generator?
                </h4>
                <p className="text-white/50 font-mono text-[12px] leading-[1.8]">
                  Yes, we welcome custom tool requests. If you need a specific
                  Unicode transformation, character mapping, or text effect that
                  is not currently available on TypeWarp, describe your
                  requirements and our development team will evaluate the
                  feasibility. Popular community requests are prioritized in our
                  roadmap.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
