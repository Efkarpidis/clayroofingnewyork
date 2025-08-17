"use client"

import { useState } from "react"
import Link from "next/link"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { Phone, Menu, X, Home, Building2, MessageSquare, FileText, FileCheck } from "lucide-react"
import { galleryImages } from "../gallery-data"

// Mobile Menu Component
const MobileMenu = ({ isOpen, onClose }: { isOpen: boolean; onClose: () => void }) => {
  if (!isOpen) return null

  return (
    <div className="fixed inset-0 z-50 lg:hidden">
      {/* Backdrop */}
      <div className="fixed inset-0 bg-black/50" onClick={onClose} />

      {/* Menu Panel */}
      <div className="fixed right-0 top-0 h-full w-80 bg-white shadow-xl">
        <div className="flex items-center justify-between p-6 border-b border-neutral-200">
          <h2 className="text-lg font-semibold text-neutral-800">Menu</h2>
          <button onClick={onClose} className="p-2 rounded-lg hover:bg-neutral-100 transition-colors">
            <X className="h-5 w-5 text-neutral-600" />
          </button>
        </div>

        <nav className="p-6">
          <div className="space-y-2">
            <Link
              href="/"
              onClick={onClose}
              className="flex items-center gap-3 px-4 py-3 text-base font-medium text-neutral-700 hover:bg-neutral-50 hover:text-orange-600 rounded-lg transition-colors"
            >
              <Home className="h-5 w-5" />
              Home
            </Link>

            <div className="h-px bg-neutral-200 my-2" />

            <Link
              href="/gallery"
              onClick={onClose}
              className="flex items-center gap-3 px-4 py-3 text-base font-medium text-orange-600 bg-orange-50 rounded-lg"
            >
              <Building2 className="h-5 w-5" />
              Projects
            </Link>

            <Link
              href="/about"
              onClick={onClose}
              className="flex items-center gap-3 px-4 py-3 text-base font-medium text-neutral-700 hover:bg-neutral-50 hover:text-orange-600 rounded-lg transition-colors"
            >
              <FileText className="h-5 w-5" />
              About
            </Link>

            <Link
              href="/contact"
              onClick={onClose}
              className="flex items-center gap-3 px-4 py-3 text-base font-medium text-neutral-700 hover:bg-neutral-50 hover:text-orange-600 rounded-lg transition-colors"
            >
              <MessageSquare className="h-5 w-5" />
              Contact
            </Link>

            <div className="h-px bg-neutral-200 my-4" />

            <Button
              asChild
              className="w-full bg-orange-600 text-white hover:bg-orange-700 text-base font-semibold py-3 h-auto justify-start gap-3"
              onClick={onClose}
            >
              <Link href="/#quote">
                <FileCheck className="h-5 w-5" />
                Request a Quote
              </Link>
            </Button>
          </div>
        </nav>
      </div>
    </div>
  )
}

export default function GalleryPage() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)

  return (
    <div className="bg-white text-neutral-800">
      {/* Header */}
      <header className="sticky top-0 z-40 bg-white/95 backdrop-blur-sm shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-24 lg:h-28">
            {/* Logo - Doubled in size */}
            <Link href="/" className="flex items-center flex-shrink-0">
              <Image
                src="/clay-roofs-ny-logo.png"
                alt="Clay Roofs NY"
                width={1080}
                height={360}
                className="h-20 w-auto sm:h-24 lg:h-28"
              />
            </Link>

            {/* Desktop Navigation */}
            <div className="hidden lg:flex items-center space-x-8">
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
                className="px-4 py-2 text-base font-medium text-orange-600 border-b-2 border-orange-600"
              >
                Projects
              </Link>
              <Link
                href="/about"
                className="px-4 py-2 text-base font-medium text-neutral-700 hover:text-orange-600 transition-colors rounded-lg hover:bg-neutral-50"
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
          <h1 className="text-3xl md:text-4xl font-extrabold tracking-tight">Our Projects</h1>
          <p className="mt-4 max-w-2xl mx-auto text-lg text-neutral-600">
            Explore our portfolio of premium clay tile roofing installations across New York.
          </p>
        </div>

        <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3">
          {galleryImages.map((image, index) => (
            <div
              key={index}
              className="group relative overflow-hidden rounded-lg shadow-lg hover:shadow-xl transition-shadow"
            >
              <Image
                src={image.src || "/placeholder.svg"}
                alt={image.alt}
                width={400}
                height={300}
                className="w-full h-64 object-cover group-hover:scale-105 transition-transform duration-300"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity">
                <div className="absolute bottom-4 left-4 right-4">
                  <h3 className="text-white font-semibold text-lg">{image.title}</h3>
                  <p className="text-white/90 text-sm">{image.description}</p>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-16 text-center">
          <h2 className="text-2xl font-bold text-neutral-900 mb-4">Ready to Start Your Project?</h2>
          <p className="text-lg text-neutral-600 mb-8">Contact us today for a free consultation and quote.</p>
          <Button
            asChild
            size="lg"
            className="bg-orange-600 text-white hover:bg-orange-700 text-lg font-semibold px-8 py-4 h-auto"
          >
            <Link href="/#quote">Request a Quote</Link>
          </Button>
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
