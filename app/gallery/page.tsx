"use client"

import { useState, useEffect } from "react"
import Image from "next/image"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Dialog, DialogContent } from "@/components/ui/dialog"
import { ArrowLeft, ChevronLeft, ChevronRight, Camera } from "lucide-react"
import { StickyCallBar } from "@/components/sticky-call-bar"
import { galleryPhotos, type ProjectPhoto } from "../gallery-data"

// Hero carousel photos - select the best 5 for showcase
const heroPhotos: ProjectPhoto[] = [
  {
    id: "hero-1",
    src: "/gallery/project-02.jpg",
    alt: "Mediterranean-style mansion with red clay tile roof",
  },
  {
    id: "hero-2",
    src: "/gallery/project-11.jpg",
    alt: "Stone mansion with brown clay tile roof and landscaped grounds",
  },
  {
    id: "hero-3",
    src: "/gallery/project-27.jpg",
    alt: "Mediterranean-style luxury mansion with natural stone exterior and rich burgundy S-shaped clay tile roofing",
  },
  {
    id: "hero-4",
    src: "/gallery/project-29.jpg",
    alt: "Mediterranean-style home with vibrant golden yellow exterior and classic reddish-brown terracotta S-shaped clay tile roofing",
  },
  {
    id: "hero-5",
    src: "/gallery/project-16.jpg",
    alt: "Contemporary home with sophisticated gray slate clay tile roofing and modern architecture",
  },
]

// All other photos for the grid (excluding hero photos)
const gridPhotos = galleryPhotos.filter((photo) => !heroPhotos.some((heroPhoto) => heroPhoto.src === photo.src))

function HeroCarousel() {
  const [currentSlide, setCurrentSlide] = useState(0)

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % heroPhotos.length)
  }

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + heroPhotos.length) % heroPhotos.length)
  }

  useEffect(() => {
    const timer = setInterval(nextSlide, 5000) // Auto-advance every 5 seconds
    return () => clearInterval(timer)
  }, [])

  return (
    <div className="relative w-full h-96 md:h-[500px] lg:h-[600px] overflow-hidden rounded-2xl bg-neutral-100 shadow-2xl">
      {heroPhotos.map((photo, index) => (
        <div
          key={photo.id}
          className={`absolute inset-0 transition-opacity duration-1000 ease-in-out ${
            index === currentSlide ? "opacity-100" : "opacity-0"
          }`}
        >
          <Image
            src={photo.src || "/placeholder.svg"}
            alt={photo.alt}
            fill
            className="object-cover"
            sizes="100vw"
            priority={index === 0}
          />
          {/* Subtle gradient overlay */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-transparent" />
        </div>
      ))}

      {/* Navigation arrows */}
      <button
        onClick={prevSlide}
        className="absolute left-4 top-1/2 -translate-y-1/2 bg-white/90 hover:bg-white text-charcoal-gray p-3 rounded-full shadow-lg transition-all z-10 hover:scale-110"
        aria-label="Previous image"
      >
        <ChevronLeft className="h-6 w-6" />
      </button>
      <button
        onClick={nextSlide}
        className="absolute right-4 top-1/2 -translate-y-1/2 bg-white/90 hover:bg-white text-charcoal-gray p-3 rounded-full shadow-lg transition-all z-10 hover:scale-110"
        aria-label="Next image"
      >
        <ChevronRight className="h-6 w-6" />
      </button>

      {/* Dots indicator */}
      <div className="absolute bottom-6 left-1/2 -translate-x-1/2 flex gap-3 z-10">
        {heroPhotos.map((_, index) => (
          <button
            key={index}
            onClick={() => setCurrentSlide(index)}
            className={`w-3 h-3 rounded-full transition-all duration-300 ${
              index === currentSlide ? "bg-clay-red scale-110" : "bg-white/60 hover:bg-white/80"
            }`}
            aria-label={`Go to slide ${index + 1}`}
          />
        ))}
      </div>
    </div>
  )
}

export default function GalleryPage() {
  const [selectedPhoto, setSelectedPhoto] = useState<ProjectPhoto | null>(null)

  return (
    <>
      <div className="min-h-screen pb-20">
        {/* Hero Section */}
        <section className="relative py-16 pt-20 overflow-hidden">
          {/* Background Image */}
          <div className="absolute inset-0 z-0">
            <Image
              src="/images/design-mode/roofs-1391640_640.jpg"
              alt="Terracotta clay tile roofs"
              fill
              className="object-cover"
              sizes="100vw"
              priority
            />
            {/* Dark overlay for text readability */}
            <div className="absolute inset-0 bg-gradient-to-b from-black/70 via-black/60 to-black/70" />
          </div>

          {/* Content */}
          <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex items-center mb-6">
              <Link href="/" className="flex items-center text-white/90 hover:text-white mr-4 transition-colors">
                <ArrowLeft className="w-5 h-5 mr-2" />
                Back to Home
              </Link>
            </div>

            <div className="text-center max-w-5xl mx-auto">
              <div className="flex items-center justify-center gap-3 mb-6">
                
              </div>

              <h1 className="luxury-title text-4xl md:text-5xl mb-6 text-white drop-shadow-lg">
                Welcome to our Project Gallery
              </h1>
              <p className="text-lg md:text-xl text-white/95 max-w-4xl mx-auto leading-relaxed drop-shadow-md">
                  Enriching American homes while keeping European tradition alive.
              </p>
            </div>
          </div>
        </section>

        {/* Hero Carousel */}
        <section className="py-16">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <HeroCarousel />
          </div>
        </section>

        {/* Gallery Grid */}
        <section className="py-16 bg-[#e8d9b8] bg-background border-2 border-solid border-l-0 border-r-0 border-b-0 border-accent-foreground rounded-2xl border-t shadow-none">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 bg-background">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold text-charcoal-gray mb-4">Complete Project Portfolio</h2>
              <p className="text-lg text-neutral-600">
                Showcasing our expertise across diverse architectural styles and premium clay tile installations
              </p>
            </div>

            {/* Responsive Grid: 1 column mobile, 2 columns tablet, 3 columns desktop */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
              {gridPhotos.map((photo) => (
                <button
                  key={photo.id}
                  onClick={() => setSelectedPhoto(photo)}
                  className="group relative block w-full overflow-hidden rounded-xl bg-neutral-100 transition-all duration-300 hover:shadow-xl cursor-pointer"
                >
                  {/* Consistent aspect ratio container */}
                  <div className="aspect-[4/3] relative">
                    <Image
                      src={photo.src || "/placeholder.svg"}
                      alt={photo.alt}
                      fill
                      className="object-cover transition-transform duration-500 group-hover:scale-110"
                      sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
                      loading="lazy"
                    />

                    {/* Hover overlay with Clay Red accent */}
                    <div className="absolute inset-0 bg-gradient-to-t from-clay-red/30 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

                    {/* Hover indicator */}
                    <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                      <div className="bg-white/90 text-charcoal-gray px-4 py-2 rounded-full font-semibold text-sm shadow-lg">
                        View Full Size
                      </div>
                    </div>
                  </div>
                </button>
              ))}
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
        <footer className="border-t border-neutral-200 bg-[#e8d9b8]">
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
            </div>
          )}
        </DialogContent>
      </Dialog>

      {/* Sticky Call Bar */}
      <StickyCallBar />
    </>
  )
}
