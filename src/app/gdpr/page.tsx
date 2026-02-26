import React from "react";
import { Metadata } from "next";
import BackgroundEffect from "@/components/CanvasEffect";
import Link from "next/link";
import { Home, ChevronRight, Shield } from "lucide-react";

export const metadata: Metadata = {
  title: "GDPR Compliance | TypeWarp",
  description:
    "TypeWarp's commitment to GDPR compliance and data protection. Learn about your rights under GDPR and our privacy practices.",
  keywords: [
    "typewarp gdpr",
    "gdpr compliance",
    "data protection",
    "eu data privacy",
    "user rights",
    "right to erasure",
    "data minimization",
  ],
  openGraph: {
    title: "GDPR Compliance | TypeWarp",
    description: "Our commitment to GDPR and data protection standards.",
    url: "https://www.typewarp.com/gdpr",
    type: "website",
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "TypeWarp GDPR Compliance",
      },
    ],
    siteName: "TypeWarp",
  },
  twitter: {
    card: "summary_large_image",
    title: "GDPR Compliance | TypeWarp",
    description: "Our commitment to GDPR and data protection standards.",
    creator: "@typewarp",
    images: ["/og-image.png"],
  },
  alternates: {
    canonical: "https://www.typewarp.com/gdpr",
  },
};

export default function GDPRPage() {
  return (
    <div className="min-h-screen pt-40 pb-20 bg-bg-void text-text-primary relative overflow-hidden">
      <BackgroundEffect />
      <div className="container mx-auto px-4 max-w-4xl relative z-10">
        <nav className="flex items-center gap-4 mb-16 font-mono text-[10px] uppercase tracking-[0.3em] text-text-muted">
          <Link
            href="/"
            className="hover:text-accent-glitch transition-colors flex items-center gap-2"
          >
            <Home className="w-3 h-3" />
            ROOT
          </Link>
          <ChevronRight className="w-3 h-3 opacity-30" />
          <div className="text-accent-glitch">GDPR_COMPLIANCE</div>
        </nav>

        <header className="mb-16">
          <div className="flex items-center gap-4 mb-6">
            <div className="w-10 h-10 bg-accent-glitch/10 border border-accent-glitch/20 flex items-center justify-center">
              <Shield className="w-5 h-5 text-accent-glitch" />
            </div>
            <h2 className="text-[10px] font-mono text-accent-glitch uppercase tracking-[0.5em]">
              // EU_COMPLIANCE_01
            </h2>
          </div>
          <h1 className="text-5xl md:text-7xl font-black mb-8 tracking-tighter uppercase leading-[0.8]">
            GDPR <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-accent-glitch to-white">
              Protocol.
            </span>
          </h1>
        </header>

        <div
          className="prose prose-invert max-w-none font-mono text-sm leading-relaxed text-text-muted 
          prose-headings:uppercase prose-headings:font-black prose-headings:tracking-tighter prose-headings:text-white
          prose-strong:text-accent-glitch"
        >
          <section className="bg-bg-card border border-white/5 p-8 mb-8">
            <h2 className="text-xl mb-4">Our Commitment</h2>
            <p>
              TypeWarp is committed to protecting the data and privacy of our
              users in the European Economic Area (EEA) and globally. We adhere
              to the principles of the General Data Protection Regulation
              (GDPR).
            </p>
          </section>

          <section className="bg-bg-card border border-white/5 p-8 mb-8">
            <h2 className="text-xl mb-4">Data Minimization</h2>
            <p>
              Aligned with GDPR Article 5(1)(c), we practice data minimization.
              We do not collect or process any more personal data than is
              strictly necessary for the operation of the website.
            </p>
          </section>

          <section className="bg-bg-card border border-white/5 p-8 mb-8">
            <h2 className="text-xl mb-4">User Rights</h2>
            <p>Under GDPR, you have the following rights:</p>
            <ul className="list-none pl-0 space-y-3 mt-4">
              <li className="flex items-start gap-3">
                <span className="text-accent-glitch mt-1">→</span>
                <div>
                  <strong>Right to Access:</strong> You can request info about
                  any data we hold (though we usually hold none).
                </div>
              </li>
              <li className="flex items-start gap-3">
                <span className="text-accent-glitch mt-1">→</span>
                <div>
                  <strong>Right to Rectification:</strong> Correction of
                  inaccurate data.
                </div>
              </li>
              <li className="flex items-start gap-3">
                <span className="text-accent-glitch mt-1">→</span>
                <div>
                  <strong>Right to Erasure:</strong> The &quot;Right to be
                  Forgotten.&quot;
                </div>
              </li>
              <li className="flex items-start gap-3">
                <span className="text-accent-glitch mt-1">→</span>
                <div>
                  <strong>Right to Data Portability:</strong> Obtain any data we
                  hold in a readable format.
                </div>
              </li>
            </ul>
          </section>

          <section className="bg-bg-card border border-white/5 p-8 mb-8">
            <h2 className="text-xl mb-4">Contact DPO</h2>
            <p>
              If you have any questions regarding your data or wish to exercise
              your rights, please contact us through our{" "}
              <Link
                href="/contact"
                className="text-accent-glitch hover:underline"
              >
                contact page
              </Link>
              .
            </p>
          </section>

          <div className="pt-12 text-[10px] text-white/20 uppercase tracking-[0.2em] font-mono">
            PROTOCOL_LAST_UPDATED: FEBRUARY 5, 2026
          </div>
        </div>
      </div>
    </div>
  );
}
