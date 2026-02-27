/**
 * Central site configuration.
 * Uses NEXT_PUBLIC_SITE_URL env var if available, otherwise defaults to production URL.
 * Set NEXT_PUBLIC_SITE_URL in .env.local for local/ngrok testing.
 */
export const SITE_URL =
  process.env.NEXT_PUBLIC_SITE_URL || "https://www.typewarp.com";
