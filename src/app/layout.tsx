import type { Metadata, Viewport } from "next";
import { Inter, JetBrains_Mono } from "next/font/google";
import "./globals.css";
import Header from "@/components/Header";
import Footer from "@/components/MainFooter";
import GDPR from "@/components/GDPR";
import JSONLD from "@/components/JSONLD";
import SmoothScroll from "@/components/SmoothScroll";
import { SITE_URL } from "@/lib/config";
import { SpeedInsights } from "@vercel/speed-insights/next";
import { ThemeProvider } from "@/components/ThemeProvider";
import { Analytics } from "@vercel/analytics/next";
import Script from "next/script";

// Inter: primary font, swap immediately, no preload — system font renders first
const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  display: "swap",
  preload: true,
});

// JetBrains Mono: only used for code/mono text, low priority
const jetbrainsMono = JetBrains_Mono({
  variable: "--font-jetbrains-mono",
  subsets: ["latin"],
  display: "swap",
  preload: false,
});

const siteJsonLd = {
  "@context": "https://schema.org",
  "@type": "WebSite",
  name: "TypeWarp",
  url: SITE_URL,
  potentialAction: {
    "@type": "SearchAction",
    target: {
      "@type": "EntryPoint",
      urlTemplate: `${SITE_URL}/collection?q={search_term_string}`,
    },
    "query-input": "required name=search_term_string",
  },
};

const organizationJsonLd = {
  "@context": "https://schema.org",
  "@type": "Organization",
  name: "TypeWarp",
  url: SITE_URL,
  logo: {
    "@type": "ImageObject",
    url: `${SITE_URL}/logo-square.png`,
    width: 512,
    height: 512,
  },
  image: `${SITE_URL}/logo-square.png`,
  sameAs: [SITE_URL],
};

export const viewport: Viewport = {
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#ffffff" },
    { media: "(prefers-color-scheme: dark)", color: "#000000" },
  ],
  width: "device-width",
  initialScale: 1,
  maximumScale: 5,
};

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  applicationName: "TypeWarp",
  title: {
    default: "TypeWarp — Free Text Generator",
    template: "%s | TypeWarp",
  },
  description:
    "Free text generator with 88+ tools: cursed text, Zalgo, glitch fonts, and aesthetic styles.",
  keywords: [
    "cursed text generator",
    "glitch text generator",
    "zalgo text generator",
    "fancy text generator",
    "unicode text converter",
    "cool fonts for discord",
    "fancy fonts for instagram",
    "text effects online",
    "free font generator",
    "typewarp",
  ],
  authors: [{ name: "TypeWarp Team", url: SITE_URL }],
  creator: "TypeWarp",
  publisher: "TypeWarp",
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  openGraph: {
    type: "website",
    locale: "en_US",
    url: SITE_URL,
    siteName: "TypeWarp",
    title: "TypeWarp — Free Text Generator",
    description:
      "Free text generator with 88+ tools: cursed text, Zalgo, glitch fonts, and aesthetic styles.",
    images: [
      {
        url: `${SITE_URL}/og-image.png`,
        width: 2880,
        height: 1626,
        alt: "TypeWarp — Free Text Generator",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "TypeWarp — Free Text Generator",
    description:
      "Free text generator with 88+ tools: cursed text, Zalgo, glitch fonts, and aesthetic styles.",
    creator: "@typewarp",
    images: [`${SITE_URL}/og-image.png`],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      noimageindex: false,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  appleWebApp: {
    capable: true,
    statusBarStyle: "default",
    title: "TypeWarp",
  },
  icons: {
    icon: [
      { url: "/favicon-48.png", sizes: "48x48", type: "image/png" },
      { url: "/logo.png", sizes: "512x512", type: "image/png" },
      { url: "/logo.svg", type: "image/svg+xml" },
    ],
    apple: [{ url: "/logo.png", sizes: "512x512" }],
    shortcut: "/favicon-48.png",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        {/* Preconnect to external origins for faster script/font downloads */}
        <link rel="preconnect" href="https://cloud.umami.is" crossOrigin="anonymous" />
        <link rel="preconnect" href="https://www.googletagmanager.com" crossOrigin="anonymous" />
        <link rel="preconnect" href="https://www.google-analytics.com" crossOrigin="anonymous" />
        <link rel="preconnect" href="https://va.vercel-scripts.com" crossOrigin="anonymous" />

        {/* Prevent theme flash on load */}
        <script
          dangerouslySetInnerHTML={{
            __html: `(function(){var t=localStorage.getItem('tw-theme');var d=document.documentElement;d.classList.add(t||'light');d.style.colorScheme=t||'light';})();`,
          }}
        />

        {/* Analytics — all set to lazyOnload so they never block FCP/LCP */}
        <Script
          defer
          src="https://cloud.umami.is/script.js"
          data-website-id="c8e67150-1fcb-43a6-940c-b27c953fecce"
          strategy="lazyOnload"
        />
        <Script
          src="https://www.googletagmanager.com/gtag/js?id=G-131CE97GZN"
          strategy="lazyOnload"
        />
        <Script
          id="google-analytics"
          strategy="lazyOnload"
          dangerouslySetInnerHTML={{
            __html: `
              window.dataLayer = window.dataLayer || [];
              function gtag(){dataLayer.push(arguments);}
              gtag('js', new Date());
              gtag('config', 'G-131CE97GZN');
            `,
          }}
        />

        <JSONLD data={siteJsonLd} />
        <JSONLD data={organizationJsonLd} />
        <link rel="manifest" href="/site.webmanifest" />
        <link rel="icon" href="/logo.svg" type="image/svg+xml" />
        <link rel="icon" href="/logo.png" type="image/png" sizes="any" />
        <link rel="apple-touch-icon" href="/logo.png" />
        <link
          rel="alternate"
          type="application/rss+xml"
          title="TypeWarp Blog RSS"
          href="/rss.xml"
        />
      </head>
      <body
        suppressHydrationWarning
        className={`${inter.variable} ${jetbrainsMono.variable} antialiased bg-bg-void text-text-primary selection:bg-emerald-500 dark:selection:bg-accent-glitch selection:text-white dark:selection:text-bg-void`}
      >
        <a
          href="#main-content"
          className="sr-only focus:not-sr-only focus:absolute focus:top-4 focus:left-4 focus:z-[100] focus:px-4 focus:py-2 focus:bg-emerald-500 dark:focus:bg-accent-glitch focus:text-white dark:focus:text-bg-void focus:font-bold focus:text-sm focus:rounded-lg focus:outline-none"
        >
          Skip to main content
        </a>
        <SmoothScroll>
          <ThemeProvider>
            <Header />
            <main id="main-content" className="min-h-screen relative z-10">
              {children}
            </main>
            <Footer />
            <GDPR />
          </ThemeProvider>
          <SpeedInsights />
          <Analytics />
        </SmoothScroll>
      </body>
    </html>
  );
}
