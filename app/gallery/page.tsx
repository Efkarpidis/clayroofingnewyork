"use client"

import { useState } from "react"
import Image from "next/image"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Dialog, DialogContent } from "@/components/ui/dialog"
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet"
import { Menu, Phone, ArrowLeft } from "lucide-react"
import { StickyCallBar } from "@/components/sticky-call-bar"
import { galleryData, tileTypes, type Photo } from "../gallery-data"

export default function GalleryPage() {
  const [activeFilter, setActiveFilter] = useState("All")
  const [selectedPhoto, setSelectedPhoto] = useState<Photo | null>(null)

  const filteredProjects = activeFilter === "All" ? galleryData : galleryData.filter((p) => p.tileName === activeFilter)

  return (
    <>
      <div className="min-h-screen bg-white pb-20">
        {/* Header */}
        <header className="bg-white shadow-sm sticky top-0 z-30 h-20 md:h-24">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex items-center justify-between h-full md:h-full">
              {/* Logo */}
              <Link href="/" className="flex items-center flex-shrink-0">
                <Image
                  src="/clay-roofs-ny-logo.png"
                  alt="Clay Roofs NY"
                  width={540}
                  height={180}
                  className="h-16 w-auto sm:h-20 md:h-24"
                />
              </Link>

              {/* Mobile: Phone + Burger Menu */}
              <div className="flex items-center gap-3 md:hidden">
                <a
                  href="tel:2123654386"
                  className="flex items-center gap-2 px-3 py-2 text-sm font-medium text-neutral-700 hover:text-orange-600 transition-colors"
                >
                  <Phone className="w-4 h-4" />
                  <span className="hidden sm:inline">212-365-4386</span>
                </a>
                <Sheet>
                  <SheetTrigger asChild>
                    <Button variant="ghost" size="icon" className="text-neutral-700 hover:bg-neutral-100">
                      <Menu className="h-5 w-5" />
                      <span className="sr-only">Toggle menu</span>
                    </Button>
                  </SheetTrigger>
                  <SheetContent side="right" className="w-[300px] sm:w-[400px]">
                    <nav className="flex flex-col space-y-4 mt-8">
                      <Link
                        href="/"
                        className="flex items-center justify-center py-3 px-4 text-lg font-medium text-neutral-700 hover:bg-neutral-100 rounded-lg transition-colors"
                      >
                        Home
                      </Link>
                      <Link
                        href="/gallery"
                        className="flex items-center justify-center py-3 px-4 text-lg font-medium text-orange-600 bg-orange-50 rounded-lg"
                      >
                        Projects
                      </Link>
                      <Link
                        href="/about"
                        className="flex items-center justify-center py-3 px-4 text-lg font-medium text-neutral-700 hover:bg-neutral-100 rounded-lg transition-colors"
                      >
                        About
                      </Link>
                      <Link
                        href="/contact"
                        className="flex items-center justify-center py-3 px-4 text-lg font-medium text-neutral-700 hover:bg-neutral-100 rounded-lg transition-colors"
                      >
                        Contact
                      </Link>
                      <Button
                        asChild
                        className="bg-orange-600 text-white hover:bg-orange-700 text-lg font-semibold py-3 px-6 h-auto"
                      >
                        <Link href="/#quote">Request a Quote</Link>
                      </Button>
                    </nav>
                  </SheetContent>
                </Sheet>
              </div>

              {/* Desktop: Centered Navigation */}
              <div className="hidden md:flex items-center justify-center flex-1">
                <nav className="flex items-center space-x-8">
                  <a
                    href="tel:2123654386"
                    className="flex items-center gap-2 px-3 py-2 text-sm font-medium text-neutral-700 hover:text-orange-600 transition-colors"
                  >
                    <Phone className="w-4 h-4" />
                    212-365-4386
                  </a>
                  <Link
                    href="/gallery"
                    className="px-3 py-2 text-sm font-medium text-orange-600 border-b-2 border-orange-600"
                  >
                    Projects
                  </Link>
                  <Link
                    href="/about"
                    className="px-3 py-2 text-sm font-medium text-neutral-700 hover:text-orange-600 transition-colors"
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

              {/* Desktop: Spacer for centering */}
              <div className="hidden md:block w-32"></div>
            </div>
          </div>
        </header>

        {/* Hero Section */}
        <section className="bg-gray-900 text-white py-16">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex items-center mb-6">
              <Link href="/" className="flex items-center text-orange-400 hover:text-orange-300 mr-4">
                <ArrowLeft className="w-5 h-5 mr-2" />
                Back to Home
              </Link>
            </div>
            <h1 className="text-4xl md:text-5xl font-bold mb-4">Our Clay Tile Roofing Projects</h1>
            <p className="text-xl text-gray-300 max-w-3xl">
              Explore our portfolio of premium clay tile roofing installations across New York City.
            </p>
          </div>
        </section>

        {/* Gallery Grid */}
        <section className="py-16">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="my-8 flex flex-wrap items-center justify-center gap-2">
              <Button
                variant={activeFilter === "All" ? "default" : "outline"}
                onClick={() => setActiveFilter("All")}
                className="rounded-full"
              >
                All Projects
              </Button>
              {tileTypes.map((type) => (
                <Button
                  key={type}
                  variant={activeFilter === type ? "default" : "outline"}
                  onClick={() => setActiveFilter(type)}
                  className="rounded-full"
                >
                  {type}
                </Button>
              ))}
            </div>

            <div className="space-y-12">
              {filteredProjects.map((project) => (
                <section key={project.id}>
                  <div className="mb-4">
                    <h2 className="text-2xl font-bold">{project.tileName}</h2>
                    <p className="text-md text-neutral-500">{project.tileColor}</p>
                  </div>
                  <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
                    {project.photos.map((photo, index) => (
                      <button
                        key={index}
                        onClick={() => setSelectedPhoto(photo)}
                        className="group relative block w-full overflow-hidden rounded-lg text-left"
                      >
                        <Image
                          src={photo.src || "/placeholder.svg"}
                          alt={photo.alt}
                          width={800}
                          height={600}
                          className="aspect-[4/3] w-full object-cover transition-transform duration-300 group-hover:scale-105"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                        <div className="absolute bottom-0 left-0 p-4">
                          <h3 className="font-semibold text-white">{photo.angle}</h3>
                        </div>
                      </button>
                    ))}
                  </div>
                </section>
              ))}
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-16 bg-orange-600 text-white">
          <div className="max-w-4xl mx-auto text-center px-4 sm:px-6 lg:px-8">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Ready to Transform Your Roof?</h2>
            <p className="text-xl mb-8 text-orange-100">
              Let us create a beautiful clay tile roof for your property. Contact us today for a free consultation and
              quote.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button
                size="lg"
                variant="outline"
                className="border-white text-white hover:bg-white hover:text-orange-600 px-8 py-3 text-lg bg-transparent"
              >
                <Link href="/#quote">Get Free Quote</Link>
              </Button>
              <Button
                size="lg"
                variant="outline"
                className="border-white text-white hover:bg-white hover:text-orange-600 px-8 py-3 text-lg bg-transparent"
              >
                <Link href="/contact">Contact Us</Link>
              </Button>
            </div>
          </div>
        </section>

        {/* Footer */}
        <footer className="border-t border-neutral-200 bg-neutral-50">
          <div className="max-w-7xl mx-auto px-4 py-6 space-y-4">
            <div className="flex items-center justify-center gap-3 text-sm text-neutral-600">
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
        </footer>
      </div>

      {/* Dialog for Selected Photo */}
      <Dialog open={!!selectedPhoto} onOpenChange={() => setSelectedPhoto(null)}>
        <DialogContent className="max-w-4xl p-2 sm:p-4">
          {selectedPhoto && (
            <div>
              <Image
                src={selectedPhoto.src || "/placeholder.svg"}
                alt={selectedPhoto.alt}
                width={1600}
                height={1200}
                className="w-full rounded-md object-contain"
              />
              <div className="mt-2 px-2 text-center text-sm text-neutral-600">
                <p>{selectedPhoto.alt}</p>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>

      {/* Sticky Call Bar */}
      <StickyCallBar />
    </>
  )
}
