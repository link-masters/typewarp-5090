import React from "react";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "GDPR Compliance | TypeWarp",
  description: "Our commitment to GDPR and data protection standards.",
  alternates: {
    canonical: "https://typewarp.com/gdpr",
  },
};

export default function GDPRPage() {
  return (
    <div className="min-h-screen pt-32 pb-20 px-6">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-4xl md:text-6xl font-black mb-8 text-[var(--foreground)]">
          GDPR <span className="text-red-500 italic">Compliance</span>
        </h1>
        <div className="prose prose-invert prose-red max-w-none space-y-8 text-[var(--muted)]">
          <section>
            <h2 className="text-2xl font-bold text-[var(--foreground)]">
              Our Commitment
            </h2>
            <p className="text-lg leading-relaxed">
              TypeWarp is committed to protecting the data and privacy of our
              users in the European Economic Area (EEA) and globally. We adhere
              to the principles of the General Data Protection Regulation
              (GDPR).
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-[var(--foreground)]">
              Data Minimization
            </h2>
            <p className="text-lg leading-relaxed">
              Aligned with GDPR Article 5(1)(c), we practice data minimization.
              We do not collect or process any more personal data than is
              strictly necessary for the operation of the website.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-[var(--foreground)]">
              User Rights
            </h2>
            <p className="text-lg leading-relaxed">
              Under GDPR, you have the following rights:
            </p>
            <ul className="list-disc pl-6 space-y-2 mt-4">
              <li>
                <strong>Right to Access:</strong> You can request info about any
                data we hold (though we usually hold none).
              </li>
              <li>
                <strong>Right to Rectification:</strong> Correction of
                inaccurate data.
              </li>
              <li>
                <strong>Right to Erasure:</strong> The "Right to be Forgotten."
              </li>
              <li>
                <strong>Right to Data Portability:</strong> Obtain any data we
                hold in a readable format.
              </li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-[var(--foreground)]">
              Contact DPO
            </h2>
            <p className="text-lg leading-relaxed">
              If you have any questions regarding your data or wish to exercise
              your rights, please contact us through our dedicated contact page.
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
