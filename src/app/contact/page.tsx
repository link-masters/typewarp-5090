import React from "react";
import { Metadata } from "next";
import ContactForm from "@/components/ContactForm";
import JSONLD from "@/components/JSONLD";
import BackgroundEffect from "@/components/CanvasEffect";
import { Mail, Clock, HelpCircle } from "lucide-react";

export const metadata: Metadata = {
  title: "Contact Us | TypeWarp Support",
  description:
    "Get help with TypeWarp's free cursed text and glitch font generators. Contact our support team for questions, feedback, or technical assistance.",
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
    url: "https://www.typewarp.com/contact",
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
    canonical: "https://www.typewarp.com/contact",
  },
};

export default function ContactPage() {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "ContactPage",
    name: "Contact Support",
    description: "Contact our support team for help with TypeWarp tools.",
    url: "https://www.typewarp.com/contact",
  };

  return (
    <div className="min-h-screen pt-40 pb-24 px-6 bg-[#080808] text-white relative overflow-hidden">
      {/* Background Glow */}
      <div className="fixed top-0 left-0 w-full h-full bg-[radial-gradient(circle_at_50%_-10%,rgba(57,255,20,0.02)_0%,transparent_50%)] pointer-events-none" />
      <JSONLD data={jsonLd} />

      <div className="container mx-auto max-w-7xl relative z-10 px-6">
        <div className="max-w-6xl mx-auto">
          <div className="grid lg:grid-cols-2 gap-16 lg:gap-24 items-center">
            {/* Left Column: Context */}
            <div className="space-y-12">
              <div>
                <span className="text-[10px] font-mono text-white/30 uppercase tracking-[0.5em] mb-4 inline-block">
                  Support Center
                </span>
                <h1 className="text-4xl md:text-7xl font-black text-white mt-4 mb-8 leading-tight uppercase tracking-tighter">
                  Let&apos;s <span className="text-accent-glitch">Connect</span>
                </h1>
                <p className="text-white/40 text-base md:text-lg leading-relaxed max-w-md">
                  Have a question or need help with our tools? Send us a message
                  and our team will respond within 24 hours.
                </p>
              </div>

              <div className="space-y-6">
                <div className="flex items-center gap-6 p-6 rounded-3xl bg-[#0c0c0c] border border-white/5 group hover:border-accent-glitch/20 transition-all duration-500">
                  <div className="w-12 h-12 rounded-2xl bg-white/5 flex items-center justify-center group-hover:bg-accent-glitch/10 transition-colors">
                    <Mail className="w-6 h-6 text-white/40 group-hover:text-accent-glitch transition-colors" />
                  </div>
                  <div>
                    <p className="text-[10px] text-white/20 uppercase tracking-[0.2em] font-bold mb-1">
                      Email
                    </p>
                    <a
                      href="mailto:community@typewarp.com"
                      className="text-base text-white font-bold hover:text-accent-glitch transition-colors"
                    >
                      community@typewarp.com
                    </a>
                  </div>
                </div>

                <div className="flex items-center gap-6 p-6 rounded-3xl bg-[#0c0c0c] border border-white/5">
                  <div className="w-12 h-12 rounded-2xl bg-white/5 flex items-center justify-center">
                    <Clock className="w-6 h-6 text-white/40" />
                  </div>
                  <div>
                    <p className="text-[10px] text-white/20 uppercase tracking-[0.2em] font-bold mb-1">
                      Response Time
                    </p>
                    <p className="text-base text-white font-bold">
                      Within 24 Hours
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Right Column: Form */}
            <div className="bg-[#0c0c0c] border border-white/5 rounded-[40px] p-8 md:p-12 shadow-2xl relative overflow-hidden">
              {/* Ambient Background Glow */}
              <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-full bg-[radial-gradient(circle_at_center,rgba(57,255,20,0.02)_0%,transparent_70%)] pointer-events-none" />

              <div className="relative z-10">
                <h2 className="text-2xl font-black text-white mb-4 uppercase tracking-tight">
                  Send a Message
                </h2>
                <p className="text-white/40 text-sm mb-10">
                  Fill in the details below and we&apos;ll be in touch.
                </p>
                <ContactForm />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
