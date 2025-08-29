"use client"

import { useState } from "react"
import Image from "next/image"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Dialog, DialogContent } from "@/components/ui/dialog"
import { ArrowLeft, Grid3X3, Camera } from "lucide-react"
import { StickyCallBar } from "@/components/sticky-call-bar"
import { ScrollHeader } from "@/components/scroll-header"
import { galleryPhotos, type ProjectPhoto } from "../gallery-data"

export default function GalleryPage() {
  const [selectedPhoto, setSelectedPhoto] = useState<ProjectPhoto | null>(null)

  return (
    <>
      <div className="min-h-screen bg-white pb-20">
        <ScrollHeader currentPage="gallery" />

        {/* Hero Section */}
        <section className="bg-gradient-to-r from-neutral-900 via-neutral-800 to-neutral-700 text-white py-16 pt-20">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex items-center mb-6">
              <Link href="/" className="flex items-center text-white/80 hover:text-white mr-4">
                <ArrowLeft className="w-5 h-5 mr-2" />
                Back to Home
              </Link>
            </div>

            <div className="text-center max-w-4xl mx-auto">
              <div className="flex items-center justify-center gap-3 mb-6">
                <div className="premium-badge">
                  <Camera className="w-3 h-3 mr-1" />
                  Project Gallery
                </div>
              </div>

              <h1 className="luxury-title text-4xl md:text-5xl mb-4">Our Clay Tile Roofing Projects</h1>
              <p className="text-xl text-neutral-300 max-w-3xl mx-auto leading-relaxed">
                Explore our portfolio of premium clay tile roofing installations across New York City and surrounding
                areas.
              </p>

              <div className="flex items-center justify-center gap-4 mt-8 text-neutral-400">
                <div className="flex items-center gap-2">
                  <Grid3X3 className="w-4 h-4" />
                  <span className="text-sm">{galleryPhotos.length} Projects</span>
                </div>
                <span className="w-1 h-1 bg-neutral-400 rounded-full"></span>
                <span className="text-sm">Premium Clay Tiles</span>
                <span className="w-1 h-1 bg-neutral-400 rounded-full"></span>
                <span className="text-sm">30+ Years Experience</span>
              </div>
            </div>
          </div>
        </section>

        {/* Gallery Grid */}
        <section className="py-16">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            {/* Responsive Grid: 1 column mobile, 2 columns tablet, 3 columns desktop */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
              {galleryPhotos.map((photo) => (
                <button
                  key={photo.id}
                  onClick={() => setSelectedPhoto(photo)}
                  className="group relative block w-full overflow-hidden rounded-xl bg-neutral-100 transition-all duration-300 hover:shadow-xl hover:scale-[1.02] cursor-pointer"
                >
                  {/* Consistent aspect ratio container */}
                  <div className="aspect-[4/3] relative">
                    <Image
                      src={photo.src || "/placeholder.svg"}
                      alt={photo.alt}
                      fill
                      className="object-cover transition-transform duration-500 group-hover:scale-105"
                      sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
                      loading="lazy"
                    />

                    {/* Subtle hover overlay */}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

                    {/* Future-proof overlay for project info */}
                    <div className="absolute bottom-0 left-0 right-0 p-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                      {/* Space reserved for future project details */}
                      <div className="text-white">
                        <div className="w-2 h-2 bg-white/60 rounded-full mx-auto"></div>
                      </div>
                    </div>
                  </div>
                </button>
              ))}
            </div>

            {/* Future projects placeholder */}
            <div className="mt-12 text-center">
              <div className="bg-neutral-50 rounded-xl p-8 border-2 border-dashed border-neutral-200">
                <Camera className="h-12 w-12 text-neutral-400 mx-auto mb-4" />
                <h3 className="text-lg font-semibold text-neutral-700 mb-2">More Projects Coming Soon</h3>
                <p className="text-neutral-500 mb-4">
                  We're continuously adding new project photos to showcase our latest clay tile installations.
                </p>
                <Link href="/contact#quote">
                  <Button className="bg-clay-red hover:bg-clay-red text-white font-semibold cursor-pointer">
                    Start Your Project
                  </Button>
                </Link>
              </div>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-16 bg-clay-red text-white">
          <div className="max-w-4xl mx-auto text-center px-4 sm:px-6 lg:px-8">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Ready to Transform Your Roof?</h2>
            <p className="text-xl mb-8 text-red-100">
              Let us create a beautiful clay tile roof for your property. Contact us today for a free consultation and
              quote.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button
                size="lg"
                variant="outline"
                className="border-white text-white hover:bg-white hover:text-clay-red px-8 py-3 text-lg bg-transparent cursor-pointer"
                asChild
              >
                <Link href="/contact#quote">Get Free Quote</Link>
              </Button>
              <Button
                size="lg"
                variant="outline"
                className="border-white text-white hover:bg-white hover:text-clay-red px-8 py-3 text-lg bg-transparent cursor-pointer"
                asChild
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
              <p>&copy; {new Date().getFullYear()} Clay Roofs New York. All Rights Reserved.</p>
            </div>
          </div>
        </footer>
      </div>

      {/* Full-Screen Photo Modal */}
      <Dialog open={!!selectedPhoto} onOpenChange={() => setSelectedPhoto(null)}>
        <DialogContent className="max-w-6xl p-2 sm:p-4 bg-black/95">
          {selectedPhoto && (
            <div className="relative">
              <div className="aspect-video relative max-h-[80vh]">
                <Image
                  src={selectedPhoto.src || "/placeholder.svg"}
                  alt={selectedPhoto.alt}
                  fill
                  className="object-contain rounded-md"
                  sizes="90vw"
                  priority
                />
              </div>

              {/* Future-proof space for project details */}
              <div className="mt-4 text-center">
                <div className="text-white/60 text-sm">
                  {/* Space reserved for future project information */}
                  <div className="w-2 h-2 bg-white/20 rounded-full mx-auto"></div>
                </div>
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
