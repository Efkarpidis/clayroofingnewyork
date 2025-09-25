import type { Metadata } from 'next';
import '@fontsource/geist-sans';
import '@fontsource/geist-mono';
import '../globals.css';
import { Header } from '@/components/Header';

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
    <html lang="en">
      <body>
        <Header />
        {children}
      </body>
    </html>
  );
}
