import type React from "react"
import type { Metadata } from "next"
import { GeistSans } from "geist/font/sans"
import { GeistMono } from "geist/font/mono"
import "./globals.css"

export const metadata: Metadata = {
  title: {
    default: "Clay Roofs New York - Premium Spanish Clay Tile Roofing",
    template: "%s | Clay Roofs New York",
  },
  description:
    "Premium Spanish clay tile roofing for high-end homes in New York. Over 30 years of quality craftsmanship and 3,000+ projects completed.",
  keywords: ["clay tile roofing", "spanish tiles", "roof installation", "New York", "premium roofing", "ceramic tiles"],
  authors: [{ name: "Clay Roofs New York" }],
  creator: "Clay Roofs New York",
  publisher: "Clay Roofs New York",
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  metadataBase: new URL("https://clayroofingnewyork.com"),
  alternates: {
    canonical: "/",
  },
  openGraph: {
    title: "Clay Roofs New York - Premium Spanish Clay Tile Roofing",
    description:
      "Premium Spanish clay tile roofing for high-end homes in New York. Over 30 years of quality craftsmanship.",
    url: "https://clayroofingnewyork.com",
    siteName: "Clay Roofs New York",
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Clay Roofs New York - Premium Spanish Clay Tile Roofing",
    description:
      "Premium Spanish clay tile roofing for high-end homes in New York. Over 30 years of quality craftsmanship.",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  verification: {
    google: "your-google-verification-code",
  },
  generator: "Next.js",
  applicationName: "Clay Roofs New York",
  referrer: "origin-when-cross-origin",
  category: "construction",
  classification: "Business",
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <head>
        {/* Favicon and Icon References */}
        <link rel="icon" type="image/png" sizes="16x16" href="/favicon-16.png" />
        <link rel="icon" type="image/png" sizes="32x32" href="/favicon-32.png" />
        <link rel="icon" type="image/png" sizes="64x64" href="/favicon-64.png" />

        {/* Apple Touch Icons */}
        <link rel="apple-touch-icon" sizes="120x120" href="/favicon-120.png" />
        <link rel="apple-touch-icon" sizes="240x240" href="/favicon-240.png" />
        <link rel="apple-touch-icon" sizes="512x512" href="/favicon-512.png" />

        {/* Android/Chrome Icons */}
        <link rel="icon" type="image/png" sizes="120x120" href="/favicon-120.png" />
        <link rel="icon" type="image/png" sizes="240x240" href="/favicon-240.png" />
        <link rel="icon" type="image/png" sizes="512x512" href="/favicon-512.png" />

        {/* Web App Manifest */}
        <link rel="manifest" href="/site.webmanifest" />

        {/* Theme Colors */}
        <meta name="theme-color" content="#ea580c" />
        <meta name="msapplication-TileColor" content="#ea580c" />
        <meta name="msapplication-TileImage" content="/favicon-240.png" />

        {/* Apple Web App */}
        <meta name="apple-mobile-web-app-capable" content="yes" />
        <meta name="apple-mobile-web-app-status-bar-style" content="default" />
        <meta name="apple-mobile-web-app-title" content="Clay Roofs NY" />

        {/* Windows Tiles */}
        <meta name="msapplication-config" content="/browserconfig.xml" />

        {/* Preload Critical Fonts */}
        <link rel="preload" href="/fonts/geist-sans.woff2" as="font" type="font/woff2" crossOrigin="anonymous" />

        <style>{`
html {
  font-family: ${GeistSans.style.fontFamily};
  --font-sans: ${GeistSans.variable};
  --font-mono: ${GeistMono.variable};
}
        `}</style>
      </head>
      <body>{children}</body>
    </html>
  )
}
