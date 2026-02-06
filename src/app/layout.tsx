import type { Metadata, Viewport } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "@/contexts/ThemeContext";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import GDPR from "@/components/GDPR";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
  display: "swap",
  preload: true,
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
  display: "swap",
  preload: true,
});

const SITE_URL = "https://typewarp.com";

export const viewport: Viewport = {
  themeColor: "#000000",
  width: "device-width",
  initialScale: 1,
  maximumScale: 5,
};

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: "TypeWarp | The Ultimate Text Transformer & Typography Hub",
    template: "%s | TypeWarp",
  },
  description:
    "Transform your text into digital masterpieces, fancy scripts, and professional typography with TypeWarp. The world's most advanced text manipulation platform.",
  keywords: [
    "text transformer",
    "fancy text",
    "typography",
    "text manipulation",
    "digital art",
    "font generator",
    "text effects",
    "SEO optimized",
    "blog",
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
    title: "TypeWarp | The Ultimate Text Transformer",
    description:
      "Transform your text into digital masterpieces, fancy scripts, and more with TypeWarp.",
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "TypeWarp - Text Transformation Redefined",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "TypeWarp | The Ultimate Text Transformer",
    description:
      "Transform your text into digital masterpieces, fancy scripts, and more with TypeWarp.",
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
  alternates: {
    canonical: SITE_URL,
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
      </head>
      <body
        suppressHydrationWarning
        className={`${geistSans.variable} ${geistMono.variable} antialiased bg-[var(--background)] text-[var(--foreground)] selection:bg-red-600/30 transition-colors duration-300`}
      >
        <ThemeProvider>
          <Header />
          <main className="min-h-screen">{children}</main>
          <Footer />
          <GDPR />
        </ThemeProvider>
      </body>
    </html>
  );
}
