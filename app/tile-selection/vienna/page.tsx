"use client"

import { useState } from "react"
import Image from "next/image"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { StickyCallBar } from "@/components/sticky-call-bar"
import { ScrollHeader } from "@/components/scroll-header"
import { ArrowLeft } from "lucide-react"

type TileColor = {
  id: string
  name: string
  image: string
  filename: string
}

// Placeholder Vienna tiles - will auto-generate when assets are uploaded
const viennaTiles: TileColor[] = [
  {
    id: "charcoal",
    name: "Charcoal",
    image: "/tiles/vienna/vienna-charcoal-placeholder.png",
    filename: "VIENNA CHARCOAL TILE.png",
  },
  {
    id: "terracotta",
    name: "Terracotta",
    image: "/tiles/vienna/vienna-terracotta-placeholder.png",
    filename: "VIENNA TERRACOTTA TILE.png",
  },
  {
    id: "slate-gray",
    name: "Slate Gray",
    image: "/tiles/vienna/vienna-slate-gray-placeholder.png",
    filename: "VIENNA SLATE GRAY TILE.png",
  },
]

export default function ViennaPage() {
  const [selectedTile, setSelectedTile] = useState<TileColor | null>(null)

  const openTileModal = (tile: TileColor) => {
    setSelectedTile(tile)
  }

  const closeTileModal = () => {
    setSelectedTile(null)
  }

  const handleUseThisColor = (tile: TileColor) => {
    const params = new URLSearchParams({
      tileFamily: "Vienna",
      tileColor: tile.name,
    })
    window.location.href = `/contact#form?${params.toString()}`
  }

  const handleSeeProjects = (tile: TileColor) => {
    const params = new URLSearchParams({
      family: "vienna",
      color: tile.id,
    })
    window.location.href = `/gallery?${params.toString()}`
  }

  const handleRequestColor = () => {
    const params = new URLSearchParams({
      tileFamily: "Vienna",
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
            <h1 className="text-4xl md:text-5xl font-bold text-neutral-900 mb-4">Vienna Flat Tiles</h1>
            <p className="text-xl text-neutral-600 max-w-3xl mx-auto leading-relaxed">
              Modern flat tiles with clean lines and contemporary appeal, perfect for minimalist architectural styles.
            </p>
          </div>
        </section>

        {/* Tile Grid */}
        <section className="py-16 bg-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
              {viennaTiles.map((tile) => (
                <button
                  key={tile.id}
                  onClick={() => openTileModal(tile)}
                  className="group relative block w-full overflow-hidden rounded-lg bg-neutral-50 border-2 border-neutral-200 transition-all duration-300 hover:border-orange-300 hover:shadow-lg hover:scale-105 cursor-pointer"
                >
                  <div className="aspect-square relative p-4">
                    <Image
                      src={tile.image || "/placeholder.svg"}
                      alt={`Vienna ${tile.name} tile`}
                      fill
                      className="object-contain transition-transform duration-300 group-hover:scale-110"
                      sizes="(max-width: 768px) 50vw, (max-width: 1200px) 33vw, 25vw"
                    />
                  </div>
                  <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                  <div className="absolute bottom-0 left-0 right-0 p-3 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    <h3 className="text-white font-semibold text-sm text-center">{tile.name}</h3>
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
            <h2 className="text-3xl font-bold text-neutral-900 mb-6">Ready to Use Vienna Tiles?</h2>
            <p className="text-lg text-neutral-600 mb-8">
              Contact us to discuss your project and get a personalized quote for Vienna flat tiles.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href="/contact#form?tileFamily=Vienna" className="relative z-20">
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
        <DialogContent className="max-w-2xl p-6">
          {selectedTile && (
            <div>
              <DialogHeader className="mb-6">
                <DialogTitle className="text-2xl font-bold text-center">Vienna {selectedTile.name}</DialogTitle>
              </DialogHeader>

              {/* Large Tile Image */}
              <div className="bg-neutral-50 rounded-lg p-8 mb-6">
                <div className="aspect-square relative max-w-sm mx-auto">
                  <Image
                    src={selectedTile.image || "/placeholder.svg"}
                    alt={`Vienna ${selectedTile.name} tile`}
                    fill
                    className="object-contain"
                    sizes="(max-width: 768px) 100vw, 50vw"
                  />
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex flex-col sm:flex-row gap-4">
                <Button
                  onClick={() => handleUseThisColor(selectedTile)}
                  className="flex-1 h-12 bg-orange-600 hover:bg-orange-700 text-white font-semibold cursor-pointer"
                >
                  Use this color in my quote
                </Button>
                <Button
                  onClick={() => handleSeeProjects(selectedTile)}
                  variant="outline"
                  className="flex-1 h-12 border-2 border-orange-600 text-orange-600 hover:bg-orange-600 hover:text-white font-semibold cursor-pointer bg-transparent"
                >
                  See projects with this color
                </Button>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>

      <StickyCallBar />
    </>
  )
}
