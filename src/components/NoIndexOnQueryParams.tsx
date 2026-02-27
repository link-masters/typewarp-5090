"use client";

import { useSearchParams } from "next/navigation";
import { useEffect } from "react";

/**
 * Adds a noindex,nofollow meta tag when certain query parameters
 * (like ?tag= or ?category=) are present in the URL.
 * This prevents search engines from indexing filtered/duplicate views.
 */
export default function NoIndexOnQueryParams() {
  const searchParams = useSearchParams();
  const hasTag = searchParams.has("tag");
  const hasCategory = searchParams.has("category");

  useEffect(() => {
    if (hasTag || hasCategory) {
      // Add noindex meta tag
      let metaRobots = document.querySelector(
        'meta[name="robots"]',
      ) as HTMLMetaElement | null;

      if (!metaRobots) {
        metaRobots = document.createElement("meta");
        metaRobots.name = "robots";
        document.head.appendChild(metaRobots);
      }
      metaRobots.content = "noindex, nofollow";

      // Also add googlebot-specific tag
      let metaGooglebot = document.querySelector(
        'meta[name="googlebot"]',
      ) as HTMLMetaElement | null;

      if (!metaGooglebot) {
        metaGooglebot = document.createElement("meta");
        metaGooglebot.name = "googlebot";
        document.head.appendChild(metaGooglebot);
      }
      metaGooglebot.content = "noindex, nofollow";

      return () => {
        // Clean up when navigating away
        metaRobots?.remove();
        metaGooglebot?.remove();
      };
    }
  }, [hasTag, hasCategory]);

  return null;
}
