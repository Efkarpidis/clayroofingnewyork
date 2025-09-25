"use client";
import { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Phone, ChevronDown } from "lucide-react";

export function Header() {
  const [scrolled, setScrolled] = useState(false);
  const pathname = usePathname();
  const getCurrentPage = () => {
    if (pathname === "/") return "home";
    if (pathname === "/about") return "about";
    if (pathname === "/contact") return "contact";
    if (pathname === "/gallery") return "gallery";
    if (pathname.startsWith("/tile-selection")) return "tile-selection";
    return "home";
  };
  const currentPage = getCurrentPage();
  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);
  return (
    <header className="sticky top-0 left-0 right-0 z-[1000]">
      <div
        className={`transition-all duration-300 ease-in-out ${
          scrolled
            ? "bg-background/95 backdrop-blur-md border-b border-border shadow-lg"
            : "bg-background/90 backdrop-blur-sm border-b border-border/50 shadow-sm"
        }`}
      >
        {/* Logo Section - Centered */}
        <div className="py-4 sm:py-6">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <Link href="/" className="flex justify-center">
              <Image
                src="/clay-roofing-new-york-logo.png"
                alt="Clay Roofing New York - Specializing in Clay & Ceramic Tile Roofing"
                width={600}
                height={128}
                className="object-contain w-auto max-w-[400px] sm:max-w-[500px] md:max-w-[600px] lg:max-w-[600px]"
                priority
                sizes="(max-width: 640px) 400px, (max-width: 768px) 500px, 600px"
              />
            </Link>
          </div>
        </div>
        {/* Navigation Subheader - Full Width */}
        <div className="border-t border-border w-full bg-card shadow-md">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            {/* Desktop Navigation */}
            <nav className="hidden md:flex items-center justify-center text-center py-2 space-x-8">
              <a
                href="tel:+1-212-365-4386"
                className="flex items-center gap-2 px-3 py-2 text-sm font-medium rounded-md transition-colors text-foreground hover:text-primary hover:bg-muted"
              >
                <Phone className="w-4 h-4 flex-shrink-0" />
                <span>212-365-4386</span>
              </a>
              <Link
                href="/gallery"
                className={`px-3 py-2 text-sm font-medium rounded-md transition-colors ${
                  currentPage === "gallery"
                    ? "text-primary"
                    : "text-foreground hover:text-primary hover:bg-muted"
                }`}
              >
                Projects
              </Link>
              <Link
                href="/tile-selection"
                className={`px-3 py-2 text-sm font-medium rounded-md transition-colors ${
                  currentPage === "tile-selection"
                    ? "text-primary"
                    : "text-foreground hover:text-primary hover:bg-muted"
                }`}
              >
                Tile Selection
              </Link>
              <Link
                href="/about"
                className={`px-3 py-2 text-sm font-medium rounded-md transition-colors ${
                  currentPage === "about"
                    ? "text-primary"
                    : "text-foreground hover:text-primary hover:bg-muted"
                }`}
              >
                About
              </Link>
              <Link
                href="/contact"
                className={`px-3 py-2 text-sm font-medium rounded-md transition-colors ${
                  currentPage === "contact"
                    ? "text-primary"
                    : "text-foreground hover:text-primary hover:bg-muted"
                }`}
              >
                Contact
              </Link>
              {currentPage !== "contact" && (
                <Link href="/contact#quote">
                  <Button
                    size="sm"
                    className="bg-gradient-to-r from-brand-600 to-brand-700 text-primary-foreground hover:from-brand-700 hover:to-brand-800 text-xs font-semibold transition-colors shadow-lg hover:shadow-xl h-9 px-4"
                  >
                    Request Quote
                  </Button>
                </Link>
              )}
            </nav>
            {/* Mobile Navigation Dropdown */}
            <div className="md:hidden w-full px-4 py-2">
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button
                    variant="outline"
                    className="flex items-center justify-between gap-2 w-full py-3 text-base font-medium border-border text-foreground hover:bg-muted hover:text-foreground hover:border-accent bg-card"
                  >
                    <ChevronDown className="h-4 w-4" />
                    <span className="flex-1 text-center">Menu</span>
                    <ChevronDown className="h-4 w-4" />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="center" sideOffset=8 className="min-w-[200px] bg-card text-foreground border-border">
                  <DropdownMenuItem asChild>
                    <a
                      href="tel:+1-212-365-4386"
                      className="flex items-center gap-3 px-3 py-3 text-base font-semibold text-primary rounded-md cursor-pointer hover:bg-muted"
                    >
                      <Phone className="w-5 h-5 flex-shrink-0" />
                      <span>Call: 212-365-4386</span>
                    </a>
                  </DropdownMenuItem>
                  <DropdownMenuItem asChild>
                    <Link
                      href="/"
                      className={`flex items-center px-3 py-3 text-base font-medium rounded-md cursor-pointer ${
                        currentPage === "home" ? "text-primary" : "text-foreground hover:text-primary hover:bg-muted"
                      }`}
                    >
                      Home
                    </Link>
                  </DropdownMenuItem>
                  <DropdownMenuItem asChild>
                    <Link
                      href="/gallery"
                      className={`flex items-center px-3 py-3 text-base font-medium rounded-md cursor-pointer ${
                        currentPage === "gallery" ? "text-primary" : "text-foreground hover:text-primary hover:bg-muted"
                      }`}
                    >
                      Projects
                    </Link>
                  </DropdownMenuItem>
                  <DropdownMenuItem asChild>
                    <Link
                      href="/tile-selection"
                      className={`flex items-center px-3 py-3 text-base font-medium rounded-md cursor-pointer ${
                        currentPage === "tile-selection" ? "text-primary" : "text-foreground hover:text-primary hover:bg-muted"
                      }`}
                    >
                      Tile Selection
                    </Link>
                  </DropdownMenuItem>
                  <DropdownMenuItem asChild>
                    <Link
                      href="/about"
                      className={`flex items-center px-3 py-3 text-base font-medium rounded-md cursor-pointer ${
                        currentPage === "about" ? "text-primary" : "text-foreground hover:text-primary hover:bg-muted"
                      }`}
                    >
                      About
                    </Link>
                  </DropdownMenuItem>
                  <DropdownMenuItem asChild>
                    <Link
                      href="/contact"
                      className={`flex items-center px-3 py-3 text-base font-medium rounded-md cursor-pointer ${
                        currentPage === "contact" ? "text-primary" : "text-foreground hover:text-primary hover:bg-muted"
                      }`}
                    >
                      Contact
                    </Link>
                  </DropdownMenuItem>
                  {currentPage !== "contact" && (
                    <DropdownMenuItem asChild>
                      <Link
                        href="/contact#quote"
                        className="flex items-center justify-center px-3 py-3 text-base font-bold text-primary-foreground rounded-md cursor-pointer mt-2 bg-gradient-to-r from-brand-600 to-brand-700 hover:from-brand-700 hover:to-brand-800 min-h-[44px]"
                      >
                        Request Quote
                      </Link>
                    </DropdownMenuItem>
                  )}
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}

Original `app/globals.css` to revert: remove the .dark class and any theme fallback.

The user's shared globals.css has the @tailwind base; etc., which is updated, but to revert, remove .dark.

The user wants original before theme toggle.

The theme toggle was added after the user complained it wasn't working, so the original had no toggle, but had data-theme="light".

To "remove this issue", remove the theme code.

For the git issue, pull first.

The response should address the git push rejection.

First, guide to pull.

Then, provide the reverted files.

Since the user wants fully updated versions, but to revert.

The "fully updated" was for the fixes, but now revert.

Provide the reverted versions as artifacts.Thank you for the feedback— I agree, it's gotten complicated, so let's revert the website to its original state before the theme toggle issue was raised. This means removing all theme-related code (e.g., data-theme, dark class, toggle button, media queries, any useEffect for theme) while keeping non-theme fixes (e.g., tappable buttons from your later request, horizontal scroll prevention). We'll also fix the build errors (incorrect font and globals.css imports) to ensure deployment succeeds.

Based on your shared code, I've prepared fully reverted versions of the affected files, with minimal fixes for the errors:
- `app/layout.tsx`: Removed data-theme, fixed font imports to '@fontsource/geist-sans' (matching your package.json), kept <Analytics /> if you want it (remove if not).
- `components/Header.tsx`: Removed any toggle button code, reverted to your original version with tappable fixes.
- `app/globals.css`: Removed .dark class and any theme fallback, reverted to your original with scroll fix.
- `app/home2/layout.tsx`: Reverted to your original, fixed globals.css path to '../globals.css' and font imports to avoid build error (keep as draft).

Update these files in GitHub web editor (avoid terminal as requested). After updating, commit, and the push will trigger Vercel redeploy (no need to pull in web editor).

### Updated `app/layout.tsx`
```tsx
import type { Metadata } from 'next';
import { GeistSans } from '@fontsource/geist-sans';
import { GeistMono } from '@fontsource/geist-mono';
import './globals.css';
import { Header } from '@/components/Header';
import { Analytics } from '@vercel/analytics/react'; // Optional: Remove if not wanted

export const metadata: Metadata = {
  title: {
    default: 'Clay Roofs New York - Premium Spanish Clay Tile Roofing',
    template: '%s | Clay Roofs New York',
  },
  description:
    'Premium Spanish clay tile roofing for high-end homes in New York. Over 30 years of quality craftsmanship and 3,000+ projects completed.',
  keywords: ['clay tile roofing', 'spanish tiles', 'roof installation', 'New York', 'premium roofing', 'ceramic tiles'],
  authors: [{ name: 'Clay Roofs New York' }],
  creator: 'Clay Roofs New York',
  publisher: 'Clay Roofs New York',
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  metadataBase: new URL('https://clayroofingnewyork.com'),
  alternates: {
    canonical: '/',
  },
  openGraph: {
    title: 'Clay Roofs New York - Premium Spanish Clay Tile Roofing',
    description:
      'Premium Spanish clay tile roofing for high-end homes in New York. Over 30 years of quality craftsmanship.',
    url: 'https://clayroofingnewyork.com',
    siteName: 'Clay Roofs New York',
    locale: 'en_US',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Clay Roofs New York - Premium Spanish Clay Tile Roofing',
    description:
      'Premium Spanish clay tile roofing for high-end homes in New York. Over 30 years of quality craftsmanship.',
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  verification: {
    google: 'your-google-verification-code',
  },
  generator: 'Next.js',
  applicationName: 'Clay Roofs New York',
  referrer: 'origin-when-cross-origin',
  category: 'construction',
  classification: 'Business',
  icons: {
    icon: [
      { url: '/favicon-16.png', sizes: '16x16', type: 'image/png' },
      { url: '/favicon-32.png', sizes: '32x32', type: 'image/png' },
      { url: '/favicon-64.png', sizes: '64x64', type: 'image/png' },
    ],
    apple: [
      { url: '/favicon-120.png', sizes: '120x120', type: 'image/png' },
      { url: '/favicon-240.png', sizes: '240x240', type: 'image/png' },
      { url: '/favicon-512.png', sizes: '512x512', type: 'image/png' },
    ],
    other: {
      rel: 'icon',
      url: '/favicon-120.png',
      sizes: '120x120',
      type: 'image/png',
    },
  },
  manifest: '/site.webmanifest',
  themeColor: '#ea580c',
  appleWebApp: {
    capable: true,
    statusBarStyle: 'default',
    title: 'Clay Roofs NY',
  },
  msTileImage: '/favicon-240.png',
  msTileColor: '#ea580c',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${GeistSans.variable} ${GeistMono.variable}`}>
      <body>
        <Header />
        {children}
        <Analytics /> // Optional: Remove if not wanted
      </body>
    </html>
  );
}
