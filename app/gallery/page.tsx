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
        <header className="bg-white shadow-sm sticky top-0 z-30">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex justify-between items-center h-16">
              <div className="flex items-center">
                <Image
                  src="/clay-roofs-ny-logo.png"
                  alt="Clay Roofs NY"
                  width={540}
                  height={180}
                  className="h-32 w-auto"
                />
              </div>

              {/* Desktop Navigation */}
              <nav className="hidden md:flex space-x-8">
                <Link href="/" className="text-gray-700 hover:text-orange-600">
                  Home
                </Link>
                <Link href="/gallery" className="text-gray-900 hover:text-orange-600 font-medium">
                  Projects
                </Link>
                <Link href="/about" className="text-gray-700 hover:text-orange-600">
                  About
                </Link>
                <Link href="/contact" className="text-gray-700 hover:text-orange-600">
                  Contact
                </Link>
              </nav>

              <div className="hidden md:flex items-center space-x-4">
                <a href="tel:+12123654386" className="text-orange-600 hover:text-orange-700">
                  <Phone className="w-5 h-5" />
                </a>
                <Button className="bg-orange-600 hover:bg-orange-700 text-white">
                  <Link href="/">Get Quote</Link>
                </Button>
              </div>

              {/* Mobile menu button */}
              <Sheet>
                <SheetTrigger asChild>
                  <Button variant="ghost" size="icon" className="md:hidden">
                    <Menu className="h-6 w-6" />
                  </Button>
                </SheetTrigger>
                <SheetContent>
                  <nav className="flex flex-col space-y-4 mt-8">
                    <Link href="/" className="text-gray-700 hover:text-orange-600">
                      Home
                    </Link>
                    <Link href="/gallery" className="text-gray-900 hover:text-orange-600 font-medium">
                      Projects
                    </Link>
                    <Link href="/about" className="text-gray-700 hover:text-orange-600">
                      About
                    </Link>
                    <Link href="/contact" className="text-gray-700 hover:text-orange-600">
                      Contact
                    </Link>
                    <div className="pt-4 border-t">
                      <a
                        href="tel:+12123654386"
                        className="flex items-center space-x-2 text-orange-600 hover:text-orange-700"
                      >
                        <Phone className="w-5 h-5" />
                        <span>(212) 365-4386</span>
                      </a>
                    </div>
                  </nav>
                </SheetContent>
              </Sheet>
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
                <Link href="/">Get Free Quote</Link>
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
