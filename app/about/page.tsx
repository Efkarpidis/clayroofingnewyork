"use client"

import Link from "next/link"
import Image from "next/image"
import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Phone, Menu } from "lucide-react"
import { SheetContent } from "@/components/ui/sheet"

// Mobile Menu Component
const MobileMenu = ({ isOpen, onClose }: { isOpen: boolean; onClose: () => void }) => {
  if (!isOpen) return null

  return (
    <div className="fixed inset-0 z-50 lg:hidden">
      {/* Backdrop */}
      <div className="fixed inset-0 bg-black/50" onClick={onClose} />

      {/* Menu Panel */}
      <SheetContent side="right" className="w-[300px] sm:w-[400px]">
        <nav className="flex flex-col space-y-4 mt-8">
          <Link
            href="/"
            className="flex items-center justify-center py-4 px-6 text-lg font-medium text-neutral-700 hover:bg-neutral-100 rounded-lg transition-colors border-b border-neutral-200"
          >
            Home
          </Link>
          <Link
            href="/gallery"
            className="flex items-center justify-center py-4 px-6 text-lg font-medium text-neutral-700 hover:bg-neutral-100 rounded-lg transition-colors border-b border-neutral-200"
          >
            Projects
          </Link>
          <Link
            href="/about"
            className="flex items-center justify-center py-4 px-6 text-lg font-medium text-orange-600 bg-orange-50 rounded-lg border-b border-neutral-200"
          >
            About
          </Link>
          <Link
            href="/contact"
            className="flex items-center justify-center py-4 px-6 text-lg font-medium text-neutral-700 hover:bg-neutral-100 rounded-lg transition-colors border-b border-neutral-200"
          >
            Contact
          </Link>
          <Button
            asChild
            className="bg-orange-600 text-white hover:bg-orange-700 text-lg font-semibold py-4 px-6 h-auto mt-4"
          >
            <Link href="/#quote">Request a Quote</Link>
          </Button>
        </nav>
      </SheetContent>
    </div>
  )
}

export default function AboutPage() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)

  return (
    <div className="bg-white text-neutral-800">
      {/* Header */}
      <header className="sticky top-0 z-40 bg-white/95 backdrop-blur-sm shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-28 md:h-32">
            {/* Logo - Doubled in size */}
            <Link href="/" className="flex items-center flex-shrink-0">
              <Image
                src="/clay-roofs-ny-logo.png"
                alt="Clay Roofs NY"
                width={1080}
                height={360}
                className="h-32 w-auto sm:h-36 md:h-40"
              />
            </Link>

            {/* Desktop: Centered Navigation */}
            <div className="hidden md:flex items-center justify-center flex-1">
              <nav className="flex items-center space-x-8">
                <a
                  href="tel:2123654386"
                  className="flex items-center gap-2 px-3 py-2 text-sm font-medium text-neutral-700 hover:text-orange-600 transition-colors"
                >
                  <Phone className="w-4 h-4" />
                  (212) 365-4386
                </a>
                <Link
                  href="/gallery"
                  className="px-3 py-2 text-sm font-medium text-neutral-700 hover:text-orange-600 transition-colors"
                >
                  Projects
                </Link>
                <Link
                  href="/about"
                  className="px-3 py-2 text-sm font-medium text-orange-600 border-b-2 border-orange-600"
                >
                  About
                </Link>
                <Link
                  href="/contact"
                  className="px-3 py-2 text-sm font-medium text-neutral-700 hover:text-orange-600 transition-colors"
                >
                  Contact
                </Link>
                <Button asChild className="bg-orange-600 text-white hover:bg-orange-700 text-sm font-semibold">
                  <Link href="/#quote">Request a Quote</Link>
                </Button>
              </nav>
            </div>

            {/* Desktop Navigation */}
            <div className="hidden md:flex items-center space-x-8">
              {/* Phone Number - Always visible */}
              <a
                href="tel:2123654386"
                className="flex items-center gap-2 px-4 py-2 text-base font-medium text-neutral-700 hover:text-orange-600 transition-colors rounded-lg hover:bg-neutral-50"
              >
                <Phone className="w-5 h-5" />
                (212) 365-4386
              </a>

              <Link
                href="/gallery"
                className="px-4 py-2 text-base font-medium text-neutral-700 hover:text-orange-600 transition-colors rounded-lg hover:bg-neutral-50"
              >
                Projects
              </Link>
              <Link
                href="/about"
                className="px-4 py-2 text-base font-medium text-orange-600 border-b-2 border-orange-600"
              >
                About
              </Link>
              <Link
                href="/contact"
                className="px-4 py-2 text-base font-medium text-neutral-700 hover:text-orange-600 transition-colors rounded-lg hover:bg-neutral-50"
              >
                Contact
              </Link>
              <Button asChild className="bg-orange-600 text-white hover:bg-orange-700 text-base font-semibold px-6">
                <Link href="/#quote">Request a Quote</Link>
              </Button>
            </div>

            {/* Mobile: Phone + Menu */}
            <div className="flex items-center gap-3 lg:hidden">
              <a
                href="tel:2123654386"
                className="flex items-center gap-2 px-3 py-2 text-sm font-medium text-neutral-700 hover:text-orange-600 transition-colors"
              >
                <Phone className="w-4 h-4" />
                <span className="hidden sm:inline">(212) 365-4386</span>
              </a>
              <button
                onClick={() => setMobileMenuOpen(true)}
                className="p-2 rounded-lg text-neutral-700 hover:bg-neutral-100 transition-colors"
              >
                <Menu className="h-6 w-6" />
                <span className="sr-only">Open menu</span>
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Mobile Menu */}
      <MobileMenu isOpen={mobileMenuOpen} onClose={() => setMobileMenuOpen(false)} />

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="text-center mb-12">
          <h1 className="text-3xl md:text-4xl font-extrabold tracking-tight">About Clay Roofs NY</h1>
          <p className="mt-4 max-w-2xl mx-auto text-lg text-neutral-600">
            Your trusted partner for premium clay tile roofing in New York.
          </p>
        </div>

        <div className="grid grid-cols-1 gap-16 lg:grid-cols-2 items-center">
          <div>
            <h2 className="text-2xl font-bold mb-6">Our Story</h2>
            <div className="space-y-4 text-lg text-neutral-700">
              <p>
                With over two decades of experience in the roofing industry, Clay Roofs NY has established itself as the
                premier clay tile roofing specialist in New York. We combine traditional craftsmanship with modern
                techniques to deliver exceptional results.
              </p>
              <p>
                Our team of certified professionals is dedicated to providing superior clay tile installation, repair,
                and maintenance services. We work exclusively with premium materials from trusted manufacturers to
                ensure your roof not only looks beautiful but also provides lasting protection for your home.
              </p>
              <p>
                From historic brownstones to modern residences, we have the expertise to handle projects of all sizes
                and complexities. Our commitment to quality and customer satisfaction has made us the go-to choice for
                discerning homeowners throughout New York.
              </p>
            </div>
          </div>
          <div className="relative">
            <Image
              src="/placeholder.svg?width=600&height=400"
              alt="Clay roof craftsman at work"
              width={600}
              height={400}
              className="rounded-lg shadow-lg w-full h-auto"
            />
          </div>
        </div>

        <div className="mt-16 grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3">
          <div className="text-center p-6 rounded-lg border border-neutral-200">
            <h3 className="text-xl font-semibold text-neutral-900 mb-2">20+ Years Experience</h3>
            <p className="text-neutral-600">Decades of expertise in clay tile roofing installation and repair.</p>
          </div>

          <div className="text-center p-6 rounded-lg border border-neutral-200">
            <h3 className="text-xl font-semibold text-neutral-900 mb-2">Licensed & Insured</h3>
            <p className="text-neutral-600">Fully licensed and insured for your peace of mind.</p>
          </div>

          <div className="text-center p-6 rounded-lg border border-neutral-200">
            <h3 className="text-xl font-semibold text-neutral-900 mb-2">Quality Guarantee</h3>
            <p className="text-neutral-600">We stand behind our work with comprehensive warranties.</p>
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="border-t border-neutral-200 bg-neutral-50">
        <div className="max-w-7xl mx-auto px-4 py-8 sm:px-6 lg:px-8">
          <div className="flex flex-col items-center space-y-4">
            <div className="flex items-center gap-3 text-sm text-neutral-600">
              <a
                href="https://www.laescandella.com"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-3 hover:opacity-80 transition-opacity"
              >
                <Image
                  src="/la-escandella-logo.webp"
                  alt="La Escandella"
                  width={80}
                  height={40}
                  className="h-6 w-auto"
                />
                <span>Proudly partnered with La Escandella.</span>
              </a>
            </div>
            <div className="text-center text-neutral-500">
              <p>&copy; {new Date().getFullYear()} Clay Roofs NY. All Rights Reserved.</p>
            </div>
          </div>
        </div>
      </footer>
    </div>
  )
}
