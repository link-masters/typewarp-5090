import type { Metadata, Viewport } from "next";
import { Inter, JetBrains_Mono } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "@/contexts/ThemeContext";
import Header from "@/components/Header";
import Footer from "@/components/MainFooter";
import GDPR from "@/components/GDPR";
import JSONLD from "@/components/JSONLD";
import SmoothScroll from "@/components/SmoothScroll";

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

const SITE_URL = "https://www.typewarp.com";

const siteJsonLd = {
  "@context": "https://schema.org",
  "@type": "WebSite",
  name: "TypeWarp",
  url: SITE_URL,
  potentialAction: {
    "@type": "SearchAction",
    target: `${SITE_URL}/search?q={search_term_string}`,
    "query-input": "required name=search_term_string",
  },
};

const organizationJsonLd = {
  "@context": "https://schema.org",
  "@type": "Organization",
  name: "TypeWarp",
  url: SITE_URL,
  logo: `${SITE_URL}/logo.png`,
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
    default: "TypeWarp | The Ultimate Cursed Text Toolkit",
    template: "%s | TypeWarp",
  },
  description:
    "The ultimate cursed text toolkit. Transform your typography with glitch effects, Zalgo text, and deep-fried fonts.",
  keywords: [
    "cursed text",
    "glitch text",
    "typography",
    "text manipulation",
    "zalgo",
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
        <script
          dangerouslySetInnerHTML={{
            __html: `
              (function() {
                try {
                  var saved = localStorage.getItem('theme');
                  var theme = saved || 'dark';
                  document.documentElement.classList.remove('light', 'dark');
                  document.documentElement.classList.add(theme);
                } catch (e) {}
              })();
            `,
          }}
        />
        <link rel="dns-prefetch" href="https://api.dicebear.com" />
        <link
          rel="preconnect"
          href="https://fonts.gstatic.com"
          crossOrigin="anonymous"
        />
        <link rel="manifest" href="/site.webmanifest" />
        <link rel="apple-touch-icon" href="/logo.png" />
      </head>
      <body
        suppressHydrationWarning
        className={`${inter.variable} ${jetbrainsMono.variable} antialiased bg-bg-void text-text-primary selection:bg-accent-glitch selection:text-black`}
      >
        <ThemeProvider>
          <SmoothScroll>
            <Header />
            <main className="min-h-screen relative z-10">{children}</main>
            <Footer />
            <GDPR />
          </SmoothScroll>
        </ThemeProvider>
      </body>
    </html>
  );
}
