import React from "react";
import { Metadata } from "next";
import ContactForm from "@/components/ContactForm";
import JSONLD from "@/components/JSONLD";
import BackgroundEffect from "@/components/BackgroundEffect";
import { Mail, Clock, HelpCircle } from "lucide-react";

export const metadata: Metadata = {
  title: "Contact | TypeWarp Tools",
  description: "Get help with TypeWarp tools or send us your feedback.",
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
    <div className="min-h-screen pt-24 sm:pt-28 pb-16 bg-bg-void text-text-primary relative overflow-hidden">
      <BackgroundEffect />
      <JSONLD data={jsonLd} />

      <div className="container mx-auto px-4 sm:px-6 relative z-10">
        <div className="max-w-6xl mx-auto">
          <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-center">
            {/* Left Column: Context */}
            <div className="space-y-8">
              <div>
                <span className="text-[11px] font-mono text-accent-glitch uppercase tracking-widest font-bold">
                  Support Center
                </span>
                <h1 className="text-3xl sm:text-4xl md:text-5xl font-black text-white mt-4 mb-6 leading-tight uppercase">
                  Let&apos;s{" "}
                  <span className="text-accent-glitch">Connect.</span>
                </h1>
                <p className="text-text-muted text-sm sm:text-base leading-relaxed max-w-md">
                  Have a question or need help with our tools? Send us a message
                  and our team will respond within 24 hours.
                </p>
              </div>

              <div className="space-y-6">
                <div className="flex items-center gap-4 p-4 rounded-2xl bg-white/5 border border-white/5 group hover:border-accent-glitch/20 transition-all">
                  <div className="w-10 h-10 rounded-xl bg-accent-glitch/10 flex items-center justify-center">
                    <Mail className="w-5 h-5 text-accent-glitch" />
                  </div>
                  <div>
                    <p className="text-[10px] text-text-muted uppercase tracking-widest font-black mb-0.5">
                      Direct Email
                    </p>
                    <a
                      href="mailto:support@typewarp.com"
                      className="text-sm text-white font-bold hover:text-accent-glitch transition-colors"
                    >
                      support@typewarp.com
                    </a>
                  </div>
                </div>

                <div className="flex items-center gap-4 p-4 rounded-2xl bg-white/5 border border-white/5">
                  <div className="w-10 h-10 rounded-xl bg-accent-glitch/10 flex items-center justify-center">
                    <Clock className="w-5 h-5 text-accent-glitch" />
                  </div>
                  <div>
                    <p className="text-[10px] text-text-muted uppercase tracking-widest font-black mb-0.5">
                      Response Time
                    </p>
                    <p className="text-sm text-white font-bold">
                      Within 24 Hours
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Right Column: Form */}
            <div className="bg-bg-card border border-white/10 rounded-[2rem] p-6 sm:p-10 shadow-2xl relative overflow-hidden">
              <div className="mb-8">
                <h2 className="text-xl font-bold text-white mb-2">
                  Send a Message
                </h2>
                <p className="text-text-muted text-xs">
                  Fill in the details below and we&apos;ll be in touch.
                </p>
              </div>
              <ContactForm />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
