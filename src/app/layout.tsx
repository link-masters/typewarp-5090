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

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  display: "swap",
  preload: true,
});

const jetbrainsMono = JetBrains_Mono({
  variable: "--font-jetbrains-mono",
  subsets: ["latin"],
  display: "swap",
  preload: true,
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
    url: `${SITE_URL}/logo.png`,
  },
  sameAs: [`${SITE_URL}`],
};

export const viewport: Viewport = {
  themeColor: "#000000",
  width: "device-width",
  initialScale: 1,
  maximumScale: 5,
};

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: "TypeWarp | The Ultimate Cursed Text & Glitch Font Toolkit",
    template: "%s | TypeWarp",
  },
  description:
    "The ultimate cursed text toolkit. Transform your digital typography with glitch effects, Zalgo text, and deep-fried fonts for Discord, Instagram, and TikTok.",
  keywords: [
    "cursed text generator",
    "glitch text generator",
    "zalgo text generator",
    "fancy text generator",
    "weird text generator",
    "aesthetic font generator",
    "unicode text converter",
    "cool fonts for discord",
    "fancy fonts for instagram",
    "cursed font copy paste",
    "text effects online",
    "creepy text maker",
    "scary text generator",
    "glitch font maker",
    "text transformation tool",
    "free font generator",
    "social media fonts",
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
    title: "TypeWarp | The Ultimate Cursed Text Toolkit",
    description:
      "The ultimate cursed text toolkit. Transform your typography with glitch effects, Zalgo text, and deep-fried fonts.",
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "TypeWarp - Cursed Typography",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "TypeWarp | The Ultimate Cursed Text Toolkit",
    description:
      "The ultimate cursed text toolkit. Transform your typography with glitch effects, Zalgo text, and deep-fried fonts.",
    creator: "@typewarp",
    images: ["/og-image.png"],
  },
  robots: {
    index: true,
    follow: true,
    nocache: true,
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
  verification: {
    google: "google-site-verification-id",
    yandex: "yandex-verification-id",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning className="dark">
      <head>
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
        className={`${inter.variable} ${jetbrainsMono.variable} antialiased bg-bg-void text-text-primary selection:bg-accent-glitch selection:text-black`}
      >
        <a
          href="#main-content"
          className="sr-only focus:not-sr-only focus:absolute focus:top-4 focus:left-4 focus:z-[100] focus:px-4 focus:py-2 focus:bg-accent-glitch focus:text-black focus:font-bold focus:text-sm focus:rounded-lg focus:outline-none"
        >
          Skip to main content
        </a>
        <SmoothScroll>
          <Header />
          <main id="main-content" className="min-h-screen relative z-10">
            {children}
          </main>
          <Footer />
          <GDPR />
          <SpeedInsights />
        </SmoothScroll>
      </body>
    </html>
  );
}
