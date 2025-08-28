"use client"

import { useState } from "react"
import Image from "next/image"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { StickyCallBar } from "@/components/sticky-call-bar"
import { ScrollHeader } from "@/components/scroll-header"
import { ArrowLeft, ImageIcon } from "lucide-react"

type TileColor = {
  id: string
  name: string
  image: string
  filename: string
}

// Auto-generated from uploaded Selectum tile assets with standardized naming
const selectumTiles: TileColor[] = [
  {
    id: "brown",
    name: "Selectum Brown Tile",
    image: "/tiles/selectum/selectum-brown-tile.png",
    filename: "selectum-brown-tile.png",
  },
  {
    id: "carmine",
    name: "Selectum Carmine Tile",
    image: "/tiles/selectum/selectum-carmine-tile.png",
    filename: "selectum-carmine-tile.png",
  },
  {
    id: "cognac",
    name: "Selectum Cognac Tile",
    image: "/tiles/selectum/selectum-cognac-tile.png",
    filename: "selectum-cognac-tile.png",
  },
  {
    id: "cognac-rustic",
    name: "Selectum Cognac Rustic Tile",
    image: "/tiles/selectum/selectum-cognac-rustic-tile.png",
    filename: "selectum-cognac-rustic-tile.png",
  },
  {
    id: "dark-blue",
    name: "Selectum Dark Blue Tile",
    image: "/tiles/selectum/selectum-dark-blue-tile.png",
    filename: "selectum-dark-blue-tile.png",
  },
  {
    id: "dark-green",
    name: "Selectum Dark Green Tile",
    image: "/tiles/selectum/selectum-dark-green-tile.png",
    filename: "selectum-dark-green-tile.png",
  },
  {
    id: "galia",
    name: "Selectum Galia Tile",
    image: "/tiles/selectum/selectum-galia-tile.png",
    filename: "selectum-galia-tile.png",
  },
  {
    id: "light-green",
    name: "Selectum Light Green Tile",
    image: "/tiles/selectum/selectum-light-green-tile.png",
    filename: "selectum-light-green-tile.png",
  },
  {
    id: "provence",
    name: "Selectum Provence Tile",
    image: "/tiles/selectum/selectum-provence-tile.png",
    filename: "selectum-provence-tile.png",
  },
  {
    id: "red",
    name: "Selectum Red Tile",
    image: "/tiles/selectum/selectum-red-tile.png",
    filename: "selectum-red-tile.png",
  },
  {
    id: "rustic-red",
    name: "Selectum Rustic Red Tile",
    image: "/tiles/selectum/selectum-rustic-red-tile.png",
    filename: "selectum-rustic-red-tile.png",
  },
  {
    id: "slate",
    name: "Selectum Slate Tile",
    image: "/tiles/selectum/selectum-slate-tile.png",
    filename: "selectum-slate-tile.png",
  },
]

export default function SelectumPage() {
  const [selectedTile, setSelectedTile] = useState<TileColor | null>(null)

  const openTileModal = (tile: TileColor) => {
    setSelectedTile(tile)
  }

  const closeTileModal = () => {
    setSelectedTile(null)
  }

  const handleUseThisColor = (tile: TileColor) => {
    // Navigate to contact form with prefilled data
    const params = new URLSearchParams({
      tileFamily: "Selectum",
      tileColor: tile.name.replace("Selectum ", "").replace(" Tile", ""),
    })
    window.location.href = `/contact#form?${params.toString()}`
  }

  const handleSeeProjects = (tile: TileColor) => {
    // Navigate to gallery with filter
    const params = new URLSearchParams({
      family: "selectum",
      color: tile.id,
    })
    window.location.href = `/gallery?${params.toString()}`
  }

  const handleRequestColor = () => {
    const params = new URLSearchParams({
      tileFamily: "Selectum",
      tileColor: "Request a Color",
    })
    window.location.href = `/contact#form?${params.toString()}`
  }

  return (
    <>
      <div className="bg-white text-neutral-800 min-h-screen">
        <ScrollHeader currentPage="tile-selection" />

        {/* Hero Section */}
        <section className="pt-20 pb-16 bg-gradient-to-b from-neutral-50 to-white mt-10 sm:mt-12 md:mt-16">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <div className="flex items-center mb-6">
              <Link href="/tile-selection" className="flex items-center text-orange-600 hover:text-orange-700 mr-4">
                <ArrowLeft className="w-5 h-5 mr-2" />
                Back to Tile Selection
              </Link>
            </div>
            <h1 className="text-4xl md:text-5xl font-bold text-neutral-900 mb-4">Selectum S Tiles</h1>
            <p className="text-lg text-orange-600 font-semibold mb-4">H-Selection</p>
            <p className="text-xl text-neutral-600 max-w-3xl mx-auto leading-relaxed">
              Premium S-shaped tiles with superior quality and consistent coloring for high-end residential projects.
            </p>
          </div>
        </section>

        {/* Tile Grid */}
        <section className="py-16 bg-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
              {selectumTiles.map((tile) => (
                <button
                  key={tile.id}
                  onClick={() => openTileModal(tile)}
                  className="group relative block w-full overflow-hidden rounded-lg bg-neutral-50 border-2 border-neutral-200 transition-all duration-300 hover:border-orange-300 hover:shadow-lg hover:scale-105 cursor-pointer"
                >
                  <div className="aspect-square relative p-4">
                    <Image
                      src={tile.image || "/placeholder.svg"}
                      alt={tile.name}
                      fill
                      className="object-contain transition-transform duration-300 group-hover:scale-110"
                      sizes="(max-width: 768px) 50vw, (max-width: 1200px) 33vw, 25vw"
                      priority={tile.id === "brown"} // Test with first tile
                    />
                  </div>
                  <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                  <div className="absolute bottom-0 left-0 right-0 p-3 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    <h3 className="text-white font-semibold text-sm text-center">
                      {tile.name.replace("Selectum ", "").replace(" Tile", "")}
                    </h3>
                  </div>
                </button>
              ))}

              {/* Request a Color Card */}
              <button
                onClick={handleRequestColor}
                className="group relative block w-full overflow-hidden rounded-lg bg-gradient-to-br from-orange-100 to-orange-200 border-2 border-orange-300 transition-all duration-300 hover:border-orange-400 hover:shadow-lg hover:scale-105 cursor-pointer"
              >
                <div className="aspect-square relative flex items-center justify-center p-4">
                  <div className="text-center">
                    <div className="w-12 h-12 bg-orange-600 rounded-full flex items-center justify-center mx-auto mb-3">
                      <span className="text-white font-bold text-xl">+</span>
                    </div>
                    <h3 className="text-orange-800 font-semibold text-sm">Request a Color</h3>
                    <p className="text-orange-700 text-xs mt-1">Don't see what you need?</p>
                  </div>
                </div>
              </button>
            </div>
          </div>
        </section>

        {/* Call to Action */}
        <section className="py-20 bg-neutral-50 border-t border-neutral-200">
          <div className="max-w-4xl mx-auto text-center px-4 sm:px-6 lg:px-8">
            <h2 className="text-3xl font-bold text-neutral-900 mb-6">Ready to Use Selectum Tiles?</h2>
            <p className="text-lg text-neutral-600 mb-8">
              Contact us to discuss your project and get a personalized quote for Selectum tiles.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href="/contact#form?tileFamily=Selectum" className="relative z-20">
                <Button className="h-14 px-8 text-lg font-semibold bg-orange-600 hover:bg-orange-700 text-white rounded-full shadow-lg hover:shadow-xl transition-all duration-200 cursor-pointer">
                  Request a Quote
                </Button>
              </Link>
              <Button
                asChild
                variant="outline"
                className="h-14 px-8 text-lg font-semibold border-2 border-neutral-300 text-neutral-700 hover:bg-neutral-50 rounded-full transition-all duration-200 bg-transparent cursor-pointer"
              >
                <Link href="/gallery">View Projects</Link>
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

      {/* Tile Modal */}
      <Dialog open={!!selectedTile} onOpenChange={closeTileModal}>
        <DialogContent className="max-w-4xl p-6">
          {selectedTile && (
            <div>
              <DialogHeader className="mb-6">
                <DialogTitle className="text-2xl font-bold text-center">{selectedTile.name}</DialogTitle>
              </DialogHeader>

              <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                {/* Large Tile Image */}
                <div className="bg-neutral-50 rounded-lg p-8">
                  <div className="aspect-square relative max-w-md mx-auto">
                    <Image
                      src={selectedTile.image || "/placeholder.svg"}
                      alt={selectedTile.name}
                      fill
                      className="object-contain"
                      sizes="(max-width: 768px) 100vw, 50vw"
                    />
                  </div>
                </div>

                {/* Project Examples Placeholder */}
                <div className="space-y-6">
                  <div>
                    <h3 className="text-xl font-semibold text-neutral-900 mb-4">Project Examples</h3>
                    <div className="bg-neutral-100 rounded-lg p-8 text-center border-2 border-dashed border-neutral-300">
                      <ImageIcon className="h-12 w-12 text-neutral-400 mx-auto mb-4" />
                      <p className="text-neutral-600 mb-2">Project photos coming soon</p>
                      <p className="text-sm text-neutral-500">
                        We're building our gallery of homes featuring this beautiful tile color.
                      </p>
                    </div>
                  </div>

                  {/* Action Buttons */}
                  <div className="flex flex-col gap-4">
                    <Button
                      onClick={() => handleUseThisColor(selectedTile)}
                      className="w-full h-12 bg-orange-600 hover:bg-orange-700 text-white font-semibold cursor-pointer"
                    >
                      Use this color in my quote
                    </Button>
                    <Button
                      onClick={() => handleSeeProjects(selectedTile)}
                      variant="outline"
                      className="w-full h-12 border-2 border-orange-600 text-orange-600 hover:bg-orange-600 hover:text-white font-semibold cursor-pointer bg-transparent"
                    >
                      See all projects with this color
                    </Button>
                  </div>
                </div>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>

      <StickyCallBar />
    </>
  )
}
