import React from "react";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Cookie Policy | TypeWarp",
  description: "Understand our use of cookies at TypeWarp.",
  alternates: {
    canonical: "https://typewarp.com/cookies",
  },
};

export default function CookiesPage() {
  return (
    <div className="min-h-screen pt-32 pb-20 px-6">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-4xl md:text-6xl font-black mb-8 text-[var(--foreground)]">
          Cookie <span className="text-red-500 italic">Policy</span>
        </h1>
        <div className="prose dark:prose-invert prose-red max-w-none space-y-8 text-zinc-600 dark:text-[var(--muted)]">
          <section>
            <h2 className="text-2xl font-bold text-[var(--foreground)]">
              What are Cookies?
            </h2>
            <p className="text-lg leading-relaxed">
              Cookies are small text files stored on your device when you visit
              a website. They help the website remember your preferences and
              improve your browsing experience.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-[var(--foreground)]">
              Essential Cookies
            </h2>
            <p className="text-lg leading-relaxed">
              These are technical cookies required for the operation of our
              site, such as remembering your Theme (Light/Dark mode) preference.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-[var(--foreground)]">
              Analytical Cookies
            </h2>
            <p className="text-lg leading-relaxed">
              We use analytics cookies to help us understand how visitors
              interact with TypeWarp. This information is anonymized and used
              solely for performance monitoring and diagnostic purposes.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-[var(--foreground)]">
              Managing Cookies
            </h2>
            <p className="text-lg leading-relaxed">
              You can control and manage cookies through your browser settings.
              Most browsers allow you to block or delete cookies; however, some
              features of TypeWarp (like theme persistence) may not function
              correctly if cookies are disabled.
            </p>
          </section>

          <section>
            <p className="text-sm border-t border-zinc-200 dark:border-[var(--card-border)] pt-8">
              Last Updated: February 5, 2026
            </p>
          </section>
        </div>
      </div>
    </div>
  );
}
