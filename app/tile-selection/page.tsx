"use client"

import { useState } from "react"
import Image from "next/image"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Dialog, DialogContent } from "@/components/ui/dialog"
import { StickyCallBar } from "@/components/sticky-call-bar"
import { ScrollHeader } from "@/components/scroll-header"

type TileImage = {
  src: string
  alt: string
  caption: string
}

type TileCategory = {
  id: string
  title: string
  description: string
  images: TileImage[]
}

const tileCategories: TileCategory[] = [
  {
    id: "spanish-mission",
    title: "Spanish S-Mission / Barrel Tiles",
    description: "Traditional curved barrel-style tiles that create the classic Mediterranean look.",
    images: [
      {
        src: "/gallery/terracotta-s-tile.jpg",
        alt: "Classic terracotta Spanish S-tiles",
        caption: "Terracotta Red",
      },
      {
        src: "/gallery/maroon-mission-construction-1.jpg",
        alt: "Deep maroon mission barrel tiles",
        caption: "Antique Brown",
      },
      {
        src: "/gallery/vintage-red-villa.jpg",
        alt: "Vintage red mission barrel tiles",
        caption: "Mediterranean Mix",
      },
    ],
  },
  {
    id: "flat-tiles",
    title: "Flat Tiles",
    description: "Modern, sleek flat tiles that offer clean lines and contemporary appeal.",
    images: [
      {
        src: "/gallery/flat-walnut-roof.jpg",
        alt: "Walnut brown flat profile tiles",
        caption: "Walnut Brown",
      },
      {
        src: "/gallery/slate-shake-main.jpg",
        alt: "Weathered gray slate shake tiles",
        caption: "Weathered Gray",
      },
      {
        src: "/gallery/slate-shake-dome.jpg",
        alt: "Diamond-patterned slate tiles",
        caption: "Charcoal Slate",
      },
    ],
  },
  {
    id: "custom-colors",
    title: "Custom Colors & Finishes",
    description: "Unique color blends and specialty finishes to match your architectural vision.",
    images: [
      {
        src: "/gallery/slate-shake-construction.jpg",
        alt: "Custom slate shake roof construction",
        caption: "Earth Tone Blend",
      },
      {
        src: "/gallery/maroon-mission-construction-2.jpg",
        alt: "Aerial view of maroon mission tiles",
        caption: "Antique Finish",
      },
      {
        src: "/gallery/terracotta-s-tile.jpg",
        alt: "Classic terracotta tiles with natural variation",
        caption: "Natural Variation",
      },
    ],
  },
]

export default function TileSelectionPage() {
  const [selectedImage, setSelectedImage] = useState<TileImage | null>(null)

  return (
    <>
      <div className="bg-white text-neutral-800 min-h-screen">
        <ScrollHeader currentPage="tile-selection" />

        {/* Hero Section */}
        <section className="pt-20 pb-16 bg-gradient-to-b from-neutral-50 to-white">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <h1 className="text-4xl md:text-5xl font-bold text-neutral-900 mb-6">Choose Your Perfect Clay Roof</h1>
            <p className="text-xl text-neutral-600 max-w-3xl mx-auto leading-relaxed">
              We offer premium imported clay tiles in a variety of styles and colors. Browse our options below.
            </p>
          </div>
        </section>

        {/* Tile Categories */}
        <section className="py-16 bg-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
              {tileCategories.map((category) => (
                <div key={category.id} className="space-y-6">
                  {/* Category Header */}
                  <div className="text-center">
                    <h2 className="text-2xl font-bold text-neutral-900 mb-3">{category.title}</h2>
                    <p className="text-neutral-600 leading-relaxed">{category.description}</p>
                  </div>

                  {/* Category Images */}
                  <div className="space-y-4">
                    {category.images.map((image, index) => (
                      <button
                        key={index}
                        onClick={() => setSelectedImage(image)}
                        className="group relative block w-full overflow-hidden rounded-lg bg-neutral-100 transition-all duration-300 hover:shadow-lg hover:scale-[1.02]"
                      >
                        <div className="aspect-[4/3] relative">
                          <Image
                            src={image.src || "/placeholder.svg"}
                            alt={image.alt}
                            fill
                            className="object-cover transition-transform duration-300 group-hover:scale-105"
                            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 33vw, 25vw"
                          />
                          <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
                          <div className="absolute bottom-0 left-0 right-0 p-4">
                            <h3 className="text-white font-semibold text-lg">{image.caption}</h3>
                          </div>
                        </div>
                      </button>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Additional Gallery Space */}
        <section className="py-16 bg-neutral-50 border-t border-neutral-200">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <h2 className="text-3xl font-bold text-neutral-900 mb-4">More Options Available</h2>
            <p className="text-lg text-neutral-600 mb-8">
              We carry an extensive selection of clay tiles beyond what's shown here. Contact us to see our complete
              catalog and discuss custom options.
            </p>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {/* Placeholder tiles for future expansion */}
              {[1, 2, 3, 4].map((item) => (
                <div
                  key={item}
                  className="aspect-square bg-neutral-200 rounded-lg flex items-center justify-center border-2 border-dashed border-neutral-300"
                >
                  <div className="text-center text-neutral-500">
                    <div className="w-8 h-8 mx-auto mb-2 bg-neutral-300 rounded"></div>
                    <p className="text-sm">
                      More tiles
                      <br />
                      coming soon
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Call to Action */}
        <section className="py-20 bg-white border-t border-neutral-100">
          <div className="max-w-4xl mx-auto text-center px-4 sm:px-6 lg:px-8">
            <h2 className="text-3xl font-bold text-neutral-900 mb-6">Not Sure Which Tile is Right for Your Home?</h2>
            <p className="text-lg text-neutral-600 mb-8">
              Request a free consultation and we'll guide you through the selection process to find the perfect clay
              tiles for your project.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button
                asChild
                className="h-14 px-8 text-lg font-semibold bg-orange-600 hover:bg-orange-700 text-white rounded-full shadow-lg hover:shadow-xl transition-all duration-200"
              >
                <Link href="/#quote">Request a Quote</Link>
              </Button>
              <Button
                asChild
                variant="outline"
                className="h-14 px-8 text-lg font-semibold border-2 border-neutral-300 text-neutral-700 hover:bg-neutral-50 rounded-full transition-all duration-200 bg-transparent"
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

      {/* Image Modal */}
      <Dialog open={!!selectedImage} onOpenChange={() => setSelectedImage(null)}>
        <DialogContent className="max-w-4xl p-2 sm:p-4">
          {selectedImage && (
            <div>
              <Image
                src={selectedImage.src || "/placeholder.svg"}
                alt={selectedImage.alt}
                width={1600}
                height={1200}
                className="w-full rounded-md object-contain"
              />
              <div className="mt-4 px-2 text-center">
                <h3 className="text-xl font-semibold text-neutral-900 mb-2">{selectedImage.caption}</h3>
                <p className="text-neutral-600">{selectedImage.alt}</p>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>

      <StickyCallBar />
    </>
  )
}
