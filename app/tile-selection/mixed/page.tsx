"use client"

import { useState } from "react"
import Image from "next/image"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { StickyCallBar } from "@/components/sticky-call-bar"
import { ArrowLeft, ImageIcon } from "lucide-react"

type TileColor = {
  id: string
  name: string
  displayName: string
  singleTileImage: string
  roofTilesImage: string
  filename: string
}

// S-Mixed tiles - NOW 100% COMPLETE with all 16 tiles having real images!
const mixedTiles: TileColor[] = [
  {
    id: "aitana",
    name: "S-Mixed Aitana Tile",
    displayName: "Aitana",
    singleTileImage: "/tiles/s-mixed/mixed-aitana-roof-tile.png",
    roofTilesImage: "/tiles/s-mixed/mixed-aitana-roof-tiles.jpg",
    filename: "mixed-aitana-roof-tile.png",
  },
  {
    id: "bourgogne",
    name: "S-Mixed Bourgogne Tile",
    displayName: "Bourgogne",
    singleTileImage: "/tiles/s-mixed/mixed-bourgogne-roof-tile.png",
    roofTilesImage: "/tiles/s-mixed/mixed-bourgogne-roof-tiles.jpg",
    filename: "mixed-bourgogne-roof-tile.png",
  },
  {
    id: "brown",
    name: "S-Mixed Brown Tile",
    displayName: "Brown",
    singleTileImage: "/tiles/s-mixed/mixed-brown-roof-tile.png",
    roofTilesImage: "/tiles/s-mixed/mixed-brown-roof-tiles.jpg",
    filename: "mixed-brown-roof-tile.png",
  },
  {
    id: "castell",
    name: "S-Mixed Castell Tile",
    displayName: "Castell",
    singleTileImage: "/tiles/s-mixed/mixed-castell-roof-tile.png",
    roofTilesImage: "/tiles/s-mixed/mixed-castell-roof-tiles.jpg",
    filename: "mixed-castell-roof-tile.png",
  },
  {
    id: "flamed-paja",
    name: "S-Mixed Flamed Paja Tile",
    displayName: "Flamed Paja",
    singleTileImage: "/tiles/s-mixed/mixed-flamed-paja-roof-tile.png",
    roofTilesImage: "/tiles/s-mixed/mixed-flamed-paja-roof-tiles.jpg",
    filename: "mixed-flamed-paja-roof-tile.png",
  },
  {
    id: "galia",
    name: "S-Mixed Galia Tile",
    displayName: "Galia",
    singleTileImage: "/tiles/s-mixed/mixed-galia-roof-tile.png",
    roofTilesImage: "/tiles/s-mixed/mixed-galia-roof-tiles.jpg",
    filename: "mixed-galia-roof-tile.png",
  },
  {
    id: "hispania",
    name: "S-Mixed Hispania Tile",
    displayName: "Hispania",
    singleTileImage: "/tiles/s-mixed/mixed-hispania-roof-tile.png",
    roofTilesImage: "/tiles/s-mixed/mixed-hispania-roof-tiles.jpg",
    filename: "mixed-hispania-roof-tile.png",
  },
  {
    id: "jaspee-red",
    name: "S-Mixed Jaspee Red Tile",
    displayName: "Jaspee Red",
    singleTileImage: "/tiles/s-mixed/mixed-jaspee-red-roof-tile.png",
    roofTilesImage: "/tiles/s-mixed/mixed-jaspee-red-roof-tiles.jpg",
    filename: "mixed-jaspee-red-roof-tile.png",
  },
  {
    id: "lucentum",
    name: "S-Mixed Lucentum Tile",
    displayName: "Lucentum",
    singleTileImage: "/tiles/s-mixed/mixed-lucentum-roof-tile.png",
    roofTilesImage: "/tiles/s-mixed/mixed-lucentum-roof-tiles.jpg",
    filename: "mixed-lucentum-roof-tile.png",
  },
  {
    id: "maigmo",
    name: "S-Mixed Maigmo Tile",
    displayName: "Maigmo",
    singleTileImage: "/tiles/s-mixed/mixed-maigmo-roof-tile.png",
    roofTilesImage: "/tiles/s-mixed/mixed-maigmo-roof-tiles.png",
    filename: "mixed-maigmo-roof-tile.png",
  },
  {
    id: "mediterranea",
    name: "S-Mixed Mediterranea Tile",
    displayName: "Mediterranea",
    singleTileImage: "/tiles/s-mixed/mixed-mediterranea-roof-tile.png",
    roofTilesImage: "/tiles/s-mixed/mixed-mediterranea-roof-tiles.png",
    filename: "mixed-mediterranea-roof-tile.png",
  },
  {
    id: "milenium",
    name: "S-Mixed Milenium Tile",
    displayName: "Milenium",
    singleTileImage: "/tiles/s-mixed/mixed-milenium-roof-tile.png",
    roofTilesImage: "/tiles/s-mixed/mixed-milenium-roof-tiles.jpg",
    filename: "mixed-milenium-roof-tile.png",
  },
  {
    id: "paja",
    name: "S-Mixed Paja Tile",
    displayName: "Paja",
    singleTileImage: "/tiles/s-mixed/mixed-paja-roof-tile.png",
    roofTilesImage: "/tiles/s-mixed/mixed-paja-roof-tiles.jpg",
    filename: "mixed-paja-roof-tile.png",
  },
  {
    id: "red",
    name: "S-Mixed Red Tile",
    displayName: "Red",
    singleTileImage: "/tiles/s-mixed/mixed-red-roof-tile.png",
    roofTilesImage: "/tiles/s-mixed/mixed-red-roof-tiles.jpg",
    filename: "mixed-red-roof-tile.png",
  },
  {
    id: "slate",
    name: "S-Mixed Slate Tile",
    displayName: "Slate",
    singleTileImage: "/tiles/s-mixed/mixed-slate-roof-tile.png",
    roofTilesImage: "/tiles/s-mixed/mixed-slate-roof-tiles.jpg",
    filename: "mixed-slate-roof-tile.png",
  },
  {
    id: "tossal",
    name: "S-Mixed Tossal Tile",
    displayName: "Tossal",
    singleTileImage: "/tiles/s-mixed/mixed-tossal-roof-tile.png",
    roofTilesImage: "/tiles/s-mixed/mixed-tossal-roof-tiles.jpg",
    filename: "mixed-tossal-roof-tile.png",
  },
]

export default function MixedPage() {
  const [selectedTile, setSelectedTile] = useState<TileColor | null>(null)

  const openTileModal = (tile: TileColor) => {
    setSelectedTile(tile)
  }

  const closeTileModal = () => {
    setSelectedTile(null)
  }

  const handleUseThisColor = (tile: TileColor) => {
    const params = new URLSearchParams({
      tileFamily: "S-Mixed",
      tileColor: tile.displayName,
    })
    window.location.href = `/contact#quote?${params.toString()}`
  }

  const handleSeeProjects = (tile: TileColor) => {
    const params = new URLSearchParams({
      family: "mixed",
      color: tile.id,
    })
    window.location.href = `/gallery?${params.toString()}`
  }

  const handleRequestColor = () => {
    const params = new URLSearchParams({
      tileFamily: "S-Mixed",
      tileColor: "Request a Color",
    })
    window.location.href = `/contact#quote?${params.toString()}`
  }

  return (
    <>
      <div className="bg-white text-neutral-800 min-h-screen">
        {/* Hero Section */}
        <section className="pt-20 pb-16 bg-gradient-to-b from-neutral-50 to-white">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <div className="flex items-center mb-6">
              <Link href="/tile-selection" className="flex items-center text-orange-600 hover:text-orange-700 mr-4">
                <ArrowLeft className="w-5 h-5 mr-2" />
                Back to Tile Selection
              </Link>
            </div>
            <h1 className="text-4xl md:text-5xl font-bold text-neutral-900 mb-4">S-Mixed S Tiles</h1>
            <p className="text-lg text-orange-600 font-semibold mb-4">Mediterranean Range</p>
            <p className="text-xl text-neutral-600 max-w-3xl mx-auto leading-relaxed">
              Traditional S-shaped tiles with varied color blending, creating authentic Mediterranean character with
              time-tested appeal.
            </p>
          </div>
        </section>

        {/* Tile Grid */}
        <section className="py-16 bg-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold text-neutral-900 mb-4">Available Colors</h2>
              <p className="text-lg text-neutral-600">Complete collection of 16 Mediterranean S-Mixed tiles</p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8 items-start">
              {mixedTiles.map((tile) => (
                <div key={tile.id} className="flex flex-col">
                  <button
                    onClick={() => openTileModal(tile)}
                    className="group relative block w-full overflow-hidden rounded-lg bg-neutral-50 border-2 border-neutral-200 transition-all duration-300 hover:border-orange-300 hover:shadow-lg hover:scale-105 cursor-pointer mb-4"
                  >
                    <div className="aspect-[4/3] relative p-6 flex items-center justify-center">
                      <div className="relative w-full h-full flex items-center justify-center">
                        <Image
                          src={tile.singleTileImage || "/placeholder.svg"}
                          alt={`${tile.displayName} single tile`}
                          fill
                          className="object-contain object-center transition-transform duration-300 group-hover:scale-110"
                          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, (max-width: 1280px) 33vw, 25vw"
                          style={{ maxHeight: "100%", width: "100%" }}
                        />
                      </div>
                    </div>
                    <div className="absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                    <div className="absolute bottom-4 left-0 right-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                      <p className="text-white font-semibold text-sm bg-black/50 rounded px-3 py-1 mx-4">
                        Click to view details
                      </p>
                    </div>
                  </button>

                  {/* Always visible tile name */}
                  <div className="text-center mb-4">
                    <h3 className="text-lg font-semibold text-neutral-900 mb-1">{tile.displayName}</h3>
                    <p className="text-sm text-neutral-600">S Tile</p>
                  </div>
                </div>
              ))}

              {/* Request a Color Card */}
              <div className="flex flex-col">
                <button
                  onClick={handleRequestColor}
                  className="group relative block w-full overflow-hidden rounded-lg border border-neutral-200 border-dashed bg-transparent transition-all duration-300 hover:border-orange-300 hover:shadow-md hover:scale-105 cursor-pointer mb-4"
                >
                  <div className="aspect-[4/3] relative flex items-center justify-center p-8">
                    <div className="text-center">
                      <div className="w-12 h-12 border border-orange-600 rounded-full flex items-center justify-center mx-auto mb-3 group-hover:border-orange-700 transition-colors">
                        <span className="text-orange-600 font-bold text-xl group-hover:text-orange-700 transition-colors">
                          +
                        </span>
                      </div>
                      <h3 className="text-orange-600 font-semibold text-base group-hover:text-orange-700 transition-colors">
                        Request a Color
                      </h3>
                      <p className="text-orange-600 text-sm mt-2 group-hover:text-orange-700 transition-colors">
                        Don't see what you need?
                      </p>
                    </div>
                  </div>
                </button>

                <div className="text-center mb-4">
                  <h3 className="text-lg font-semibold text-neutral-900 mb-1">Custom Color</h3>
                  <p className="text-sm text-neutral-600">Contact us for options</p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Call to Action */}
        <section className="py-20 bg-neutral-50 border-t border-neutral-200">
          <div className="max-w-4xl mx-auto text-center px-4 sm:px-6 lg:px-8">
            <h2 className="text-3xl font-bold text-neutral-900 mb-6">Ready to Use S-Mixed Tiles?</h2>
            <p className="text-lg text-neutral-600 mb-8">
              Contact us to discuss your project and get a personalized quote for S-Mixed tiles.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href="/contact#quote?tileFamily=S-Mixed" className="tappable">
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
                <DialogTitle className="text-2xl font-bold text-center">{selectedTile.displayName}</DialogTitle>
              </DialogHeader>

              <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                {/* Large Tile Images */}
                <div className="space-y-4">
                  {/* Roof installation view */}
                  <div className="bg-neutral-50 rounded-lg p-4">
                    <h3 className="text-lg font-semibold text-neutral-900 mb-2">Roof Installation</h3>
                    <div className="aspect-video relative">
                      <Image
                        src={selectedTile.roofTilesImage || "/placeholder.svg"}
                        alt={`${selectedTile.displayName} roof installation`}
                        fill
                        className="object-cover rounded-md"
                        sizes="(max-width: 768px) 100vw, 50vw"
                      />
                    </div>
                  </div>

                  {/* Single tile view */}
                  <div className="bg-neutral-50 rounded-lg p-4">
                    <h3 className="text-lg font-semibold text-neutral-900 mb-2">Individual Tile</h3>
                    <div className="aspect-square relative max-w-xs mx-auto">
                      <Image
                        src={selectedTile.singleTileImage || "/placeholder.svg"}
                        alt={selectedTile.displayName}
                        fill
                        className="object-contain"
                        sizes="(max-width: 768px) 100vw, 25vw"
                      />
                    </div>
                  </div>
                </div>

                {/* Project Examples and Actions */}
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
