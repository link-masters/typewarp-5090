import React from "react";
import { Metadata } from "next";
import ContactForm from "@/components/ContactForm";
import JSONLD from "@/components/JSONLD";

export const metadata: Metadata = {
  title: "Contact | TypeWarp",
  description: "Get in touch with the team at TypeWarp.",
  alternates: {
    canonical: "https://typewarp.com/contact",
  },
};

export default function ContactPage() {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "ContactPage",
    name: "Contact Us",
    description: "Send us a message through our contact form.",
    url: "https://typewarp.com/contact",
  };

  return (
    <>
      <JSONLD data={jsonLd} />
      <div className="min-h-screen pt-40 pb-20 bg-[var(--background)]">
        <div className="container mx-auto px-4 max-w-7xl">
          <div className="flex flex-col lg:flex-row gap-20">
            {/* Left Column: Context */}
            <div className="lg:w-1/3 flex flex-col justify-between">
              <div>
                <span className="text-red-500 text-[10px] font-black uppercase tracking-[0.5em] mb-8 block">
                  Contact Hub
                </span>
                <h1 className="text-6xl md:text-7xl font-black mb-8 tracking-tighter text-[var(--foreground)] uppercase leading-[0.9]">
                  Let's <br />
                  <span className="text-red-600 italic">Connect.</span>
                </h1>
                <p className="text-zinc-500 font-bold text-xl leading-relaxed max-w-sm">
                  We're always looking for new ideas, bug reports, and
                  collaborations. Drop us a signal.
                </p>
              </div>

              <div className="mt-20 lg:mt-0 space-y-8">
                <div>
                  <div className="text-[10px] font-black uppercase tracking-[0.3em] text-zinc-400 mb-2">
                    Email Address
                  </div>
                  <a
                    href="mailto:support@typewarp.com"
                    className="text-2xl font-black text-[var(--foreground)] hover:text-red-600 transition-colors"
                  >
                    support@typewarp.com
                  </a>
                </div>
                <div>
                  <div className="text-[10px] font-black uppercase tracking-[0.3em] text-zinc-400 mb-2">
                    Response Buffer
                  </div>
                  <div className="text-xl font-bold text-[var(--foreground)]">
                    &lt; 24 Hours
                  </div>
                </div>
              </div>
            </div>

            {/* Right Column: Interaction */}
            <div className="lg:w-2/3">
              <ContactForm />
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
