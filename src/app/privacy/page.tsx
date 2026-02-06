import React from "react";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Privacy Policy | TypeWarp",
  description: "Learn how we protect your privacy at TypeWarp.",
  alternates: {
    canonical: "https://typewarp.com/privacy",
  },
};

export default function PrivacyPage() {
  return (
    <div className="min-h-screen pt-32 pb-20 px-6">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-4xl md:text-6xl font-black mb-8 text-[var(--foreground)]">
          Privacy <span className="text-red-500 italic">Policy</span>
        </h1>
        <div className="prose prose-invert prose-red max-w-none space-y-8 text-[var(--muted)]">
          <section>
            <h2 className="text-2xl font-bold text-[var(--foreground)]">
              1. Information We Collect
            </h2>
            <p className="text-lg leading-relaxed">
              At TypeWarp, your privacy is our priority. We are proud to say
              that we do NOT collect personal information (such as names,
              emails, or phone numbers) unless you explicitly provide them
              through our contact form or newsletter subscription.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-[var(--foreground)]">
              2. How We Use Data
            </h2>
            <p className="text-lg leading-relaxed">
              Any text you type into our generators is processed{" "}
              <strong>locally in your browser</strong>. We do not store, log, or
              transmit the content of your transformations to our servers.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-[var(--foreground)]">
              3. Analytics & Cookies
            </h2>
            <p className="text-lg leading-relaxed">
              We may use standard analytics tools (like Google Analytics) to
              understand general traffic patterns. This data is anonymous and
              helps us improve our tools. Please refer to our Cookie Policy for
              more details.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-[var(--foreground)]">
              4. Data Security
            </h2>
            <p className="text-lg leading-relaxed">
              We implement industry-standard security measures to protect the
              integrity of our website. Since we do not collect sensitive user
              data, the risk of data breaches is significantly minimized.
            </p>
          </section>

          <section>
            <p className="text-sm border-t border-[var(--card-border)] pt-8">
              Last Updated: February 5, 2026
            </p>
          </section>
        </div>
      </div>
    </div>
  );
}
