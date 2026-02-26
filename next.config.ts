import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Enable React strict mode for better performance patterns
  reactStrictMode: true,
  // Optimize production output
  output: "standalone",
  images: {
    formats: ["image/avif", "image/webp"],
    remotePatterns: [
      {
        protocol: "https",
        hostname: "**",
      },
    ],
    deviceSizes: [640, 750, 1080, 1200, 1920],
    imageSizes: [16, 32, 48, 64, 96, 128, 256],
    minimumCacheTTL: 31536000,
    dangerouslyAllowSVG: true,
  },
  async headers() {
    return [
      {
        source: "/:path*",
        headers: [
          {
            key: "X-Frame-Options",
            value: "DENY",
          },
          {
            key: "X-Content-Type-Options",
            value: "nosniff",
          },
          {
            key: "Referrer-Policy",
            value: "strict-origin-when-cross-origin",
          },
          {
            key: "Permissions-Policy",
            value: "camera=(), microphone=(), geolocation=()",
          },
          {
            key: "Content-Security-Policy",
            value: [
              "default-src 'self'",
              "script-src 'self' 'unsafe-eval' 'unsafe-inline' https://va.vercel-scripts.com",
              "style-src 'self' 'unsafe-inline'",
              "img-src 'self' data: blob: https:",
              "font-src 'self' data:",
              "connect-src 'self' https:",
              "frame-ancestors 'none'",
              "base-uri 'self'",
              "form-action 'self'",
            ].join("; "),
          },
        ],
      },
      {
        source: "/:path*.png",
        headers: [
          {
            key: "Cache-Control",
            value: "public, max-age=86400, stale-while-revalidate=604800",
          },
        ],
      },
      {
        source: "/:path*.webp",
        headers: [
          {
            key: "Cache-Control",
            value: "public, max-age=86400, stale-while-revalidate=604800",
          },
        ],
      },
    ];
  },
  async redirects() {
    return [
      {
        source: "/translator/:path*",
        destination: "/translators/:path*",
        permanent: true,
      },
      {
        source: "/style-fancy/old-english",
        destination: "/translators/old-english",
        permanent: true,
      },
      {
        source: "/style-fancy/old-english-font",
        destination: "/translators/old-english",
        permanent: true,
      },
      {
        source: "/gaming/:path*",
        destination: "/social-fonts/:path*",
        permanent: true,
      },
      {
        source: "/symbols/kaomoji",
        destination: "/symbols/text-emoticons",
        permanent: true,
      },
      {
        source: "/text-tools/vaporwave-text",
        destination: "/style-fancy/vaporwave-text",
        permanent: true,
      },
      {
        source: "/translators/binary-translator",
        destination: "/translators/binary",
        permanent: true,
      },
      {
        source: "/translators/base64-encoder",
        destination: "/translators/base64",
        permanent: true,
      },
      {
        source: "/text-tools/upside-down",
        destination: "/text-tools/upside-down-text",
        permanent: true,
      },
      {
        source: "/style-fancy/aesthetic-text",
        destination: "/social-fonts/fancy-font",
        permanent: true,
      },
      {
        source: "/gaming-fonts/gamer-tag",
        destination: "/social-fonts/gaming-font",
        permanent: true,
      },
      {
        source: "/text-tools/funny-text",
        destination: "/dark-horror/weird-text",
        permanent: true,
      },
      {
        source: "/text-tools/wide-text",
        destination: "/style-fancy/wide-text",
        permanent: true,
      },
      {
        source: "/text-tools/uppercase-text",
        destination: "/text-tools/big-text",
        permanent: true,
      },
      {
        source: "/text-tools/reverse-text",
        destination: "/translators/reverse-text",
        permanent: true,
      },
      {
        source: "/text-tools/zero-width",
        destination: "/text-tools/invisible-character",
        permanent: true,
      },
      {
        source: "/text-tools/title-case",
        destination: "/text-tools/sentence-case",
        permanent: true,
      },
      {
        source: "/text-tools/stacked-text",
        destination: "/dark-horror/cursed-text",
        permanent: true,
      },
      {
        source: "/style-fancy/monospaced-text",
        destination: "/social-fonts/fancy-font",
        permanent: true,
      },
    ];
  },
  // Optimize production builds
  compiler: {
    removeConsole: process.env.NODE_ENV === "production",
  },
  experimental: {
    optimizeCss: true,
  },
};

export default nextConfig;
