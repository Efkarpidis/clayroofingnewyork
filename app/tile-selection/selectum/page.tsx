"use client"

import { useState } from "react"
import Image from "next/image"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { StickyCallBar } from "@/components/sticky-call-bar"
import { ArrowLeft, Crown } from "lucide-react"

type TileColor = {
  id: string
  name: string
  displayName: string
  singleTileImage: string
  roofTilesImage: string
  filename: string
}

// Updated Selectum tiles with complete dual image display - NOW 100% COMPLETE!
const selectumTiles: TileColor[] = [
  {
    id: "brown",
    name: "Selectum Brown Tile",
    displayName: "Brown",
    singleTileImage: "/tiles/selectum/selectum-brown-tile.png",
    roofTilesImage: "/tiles/selectum/selectum-brown-tiles-roof.png",
    filename: "selectum-brown-tile.png",
  },
  {
    id: "carmine",
    name: "Selectum Carmine Tile",
    displayName: "Carmine",
    singleTileImage: "/tiles/selectum/selectum-carmine-tile.png",
    roofTilesImage: "/tiles/selectum/selectum-carmine-tiles-roof.jpg",
    filename: "selectum-carmine-tile.png",
  },
  {
    id: "cognac",
    name: "Selectum Cognac Tile",
    displayName: "Cognac",
    singleTileImage: "/tiles/selectum/selectum-cognac-tile-single.png",
    roofTilesImage: "/tiles/selectum/selectum-cognac-tiles-roof.jpg",
    filename: "selectum-cognac-tile.png",
  },
  {
    id: "cognac-rustic",
    name: "Selectum Cognac Rustic Tile",
    displayName: "Cognac Rustic",
    singleTileImage: "/tiles/selectum/selectum-cognac-rustic-tile.png",
    roofTilesImage: "/tiles/selectum/selectum-cognac-rustic-tiles-roof.jpg",
    filename: "selectum-cognac-rustic-tile.png",
  },
  {
    id: "dark-blue",
    name: "Selectum Dark Blue Tile",
    displayName: "Dark Blue",
    singleTileImage: "/tiles/selectum/selectum-dark-blue-tile.png",
    roofTilesImage: "/tiles/selectum/selectum-dark-blue-tiles-roof.jpg",
    filename: "selectum-dark-blue-tile.png",
  },
  {
    id: "dark-green",
    name: "Selectum Dark Green Tile",
    displayName: "Dark Green",
    singleTileImage: "/tiles/selectum/selectum-dark-green-tile.png",
    roofTilesImage: "/tiles/selectum/selectum-dark-green-tiles-roof.jpg",
    filename: "selectum-dark-green-tile.png",
  },
  {
    id: "galia",
    name: "Selectum Galia Tile",
    displayName: "Galia",
    singleTileImage: "/tiles/selectum/selectum-galia-tile-single.png",
    roofTilesImage: "/tiles/selectum/selectum-galia-tiles-roof.png",
    filename: "selectum-galia-tile.png",
  },
  {
    id: "light-green",
    name: "Selectum Light Green Tile",
    displayName: "Light Green",
    singleTileImage: "/tiles/selectum/selectum-light-green-tile.png",
    roofTilesImage: "/tiles/selectum/selectum-light-green-tiles-roof.jpg",
    filename: "selectum-light-green-tile.png",
  },
  {
    id: "provence",
    name: "Selectum Provence Tile",
    displayName: "Provence",
    singleTileImage: "/tiles/selectum/selectum-provence-tile.png",
    roofTilesImage: "/tiles/selectum/selectum-provence-tiles-roof.png",
    filename: "selectum-provence-tile.png",
  },
  {
    id: "red",
    name: "Selectum Red Tile",
    displayName: "Red",
    singleTileImage: "/tiles/selectum/selectum-red-tile-single.png",
    roofTilesImage: "/tiles/selectum/selectum-red-tiles-roof.png",
    filename: "selectum-red-tile.png",
  },
  {
    id: "rustic-red",
    name: "Selectum Rustic Red Tile",
    displayName: "Rustic Red",
    singleTileImage: "/tiles/selectum/selectum-rustic-red-tile-single.png",
    roofTilesImage: "/tiles/selectum/selectum-rustic-red-tiles-roof.png",
    filename: "selectum-rustic-red-tile.png",
  },
  {
    id: "slate",
    name: "Selectum Slate Tile",
    displayName: "Slate",
    singleTileImage: "/tiles/selectum/selectum-slate-tile-single.png",
    roofTilesImage: "/tiles/selectum/selectum-slate-tiles-roof.png",
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
    const params = new URLSearchParams({
      tileFamily: "Selectum",
      tileColor: tile.displayName,
    })
    window.location.href = `/contact#quote?${params.toString()}`
  }

  const handleSeeProjects = (tile: TileColor) => {
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
    window.location.href = `/contact#quote?${params.toString()}`
  }

  return (
    <>
      <div className="bg-white text-neutral-800 min-h-screen">
        {/* Luxury Hero Banner */}
        <section className="pt-20 pb-0 relative overflow-hidden">
          <div className="relative rounded-b-3xl overflow-hidden shadow-2xl">
            <div className="absolute inset-0">
              <Image
                src="/tiles/selectum/selectum-red-tiles-roof.png"
                alt="Selectum collection hero"
                fill
                className="object-cover"
                sizes="100vw"
              />
              <div className="absolute inset-0 bg-gradient-to-r from-black/70 via-black/40 to-transparent" />
            </div>

            <div className="relative z-10 px-4 sm:px-6 lg:px-8 py-16 md:py-24">
              <div className="max-w-4xl mx-auto">
                <div className="flex items-center mb-6">
                  <Link href="/tile-selection" className="flex items-center text-white/80 hover:text-white mr-6">
                    <ArrowLeft className="w-5 h-5 mr-2" />
                    Back to Tile Selection
                  </Link>
                </div>

                <div className="max-w-2xl">
                  {/* Premium Badge */}
                  <div className="flex items-center gap-3 mb-6">
                    <div className="premium-badge">
                      <Crown className="w-3 h-3 mr-1" />
                      Flagship Collection
                    </div>
                  </div>

                  {/* Luxury Title */}
                  <h1 className="luxury-title text-4xl md:text-6xl text-white mb-4">Selectum</h1>

                  {/* Subtitle */}
                  <p className="luxury-subtitle text-xl md:text-2xl text-white/90 mb-6">H-Selection Premium</p>

                  {/* Description */}
                  <p className="text-lg text-white/80 leading-relaxed mb-8 max-w-xl">
                    Premium S-shaped tiles with superior quality and consistent coloring for high-end residential
                    projects.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Tile Grid */}
        <section className="py-16 bg-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold text-neutral-900 mb-4">Available Colors</h2>
              <p className="text-lg text-neutral-600">Complete collection of 12 premium Selectum tiles</p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8 items-start">
              {selectumTiles.map((tile) => (
                <div key={tile.id} className="flex flex-col">
                  <button
                    onClick={() => openTileModal(tile)}
                    className="group relative block w-full overflow-hidden rounded-lg bg-neutral-50 border-2 border-neutral-200 transition-all duration-300 hover:border-clay-red/30 hover:shadow-lg hover:scale-105 cursor-pointer mb-4"
                  >
                    <div className="aspect-[4/3] relative p-4 flex items-center justify-center">
                      {/* Background roof tiles image */}
                      <div className="absolute inset-4 rounded-md overflow-hidden">
                        <Image
                          src={tile.roofTilesImage || "/placeholder.svg"}
                          alt={`${tile.name} roof installation`}
                          fill
                          className="object-cover object-center"
                          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, (max-width: 1280px) 33vw, 25vw"
                        />
                      </div>

                      {/* Overlay single tile in bottom-right corner */}
                      <div className="absolute bottom-2 right-2 w-1/4 h-1/4 bg-white/95 rounded-lg p-1 shadow-lg">
                        <div className="relative w-full h-full">
                          <Image
                            src={tile.singleTileImage || "/placeholder.svg"}
                            alt={`${tile.name} single tile`}
                            fill
                            className="object-contain object-center"
                            sizes="25vw"
                          />
                        </div>
                      </div>

                      {/* Hover overlay */}
                      <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                      <div className="absolute bottom-0 left-0 right-0 p-3 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                        <p className="text-white font-semibold text-sm text-center">Click to view details</p>
                      </div>
                    </div>
                  </button>

                  {/* Always visible tile name */}
                  <div className="text-center mb-4">
                    <h3 className="text-lg font-bold text-neutral-900 mb-1">{tile.displayName}</h3>
                    <p className="text-sm text-neutral-600">S Tile</p>
                  </div>
                </div>
              ))}

              {/* Request a Color Card */}
              <div className="flex flex-col">
                <button
                  onClick={handleRequestColor}
                  className="group relative block w-full overflow-hidden rounded-lg border border-neutral-200 border-dashed bg-transparent transition-all duration-300 hover:border-clay-red/30 hover:shadow-md hover:scale-105 cursor-pointer mb-4"
                >
                  <div className="aspect-[4/3] relative flex items-center justify-center p-8">
                    <div className="text-center">
                      <div className="w-12 h-12 border border-clay-red rounded-full flex items-center justify-center mx-auto mb-3 group-hover:border-clay-red transition-colors">
                        <span className="text-clay-red font-bold text-xl group-hover:text-clay-red transition-colors">
                          +
                        </span>
                      </div>
                      <h3 className="text-clay-red font-semibold text-base group-hover:text-clay-red transition-colors">
                        Request a Color
                      </h3>
                      <p className="text-clay-red text-sm mt-2 group-hover:text-clay-red transition-colors">
                        Don't see what you need?
                      </p>
                    </div>
                  </div>
                </button>

                <div className="text-center mb-4">
                  <h3 className="text-lg font-bold text-neutral-900 mb-1">Custom Color</h3>
                  <p className="text-sm text-neutral-600">Contact us for options</p>
                </div>
              </div>
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
              <Link href="/contact#quote?tileFamily=Selectum" className="tappable">
                <Button className="h-14 px-8 text-lg font-semibold bg-clay-red hover:bg-clay-red text-white rounded-full shadow-lg hover:shadow-xl transition-all duration-200 cursor-pointer">
                  Request a Quote
                </Button>
              </Link>
              <Button
                asChild
                variant="outline"
                className="h-14 px-8 text-lg font-semibold border-2 border-charcoal-gray text-charcoal-gray hover:bg-charcoal-gray hover:text-white rounded-full transition-all duration-200 bg-transparent cursor-pointer"
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
                {/* Large Tile Images */}
                <div className="space-y-4">
                  {/* Roof installation view */}
                  <div className="bg-neutral-50 rounded-lg p-4">
                    <h3 className="text-lg font-semibold text-neutral-900 mb-2">Roof Installation</h3>
                    <div className="aspect-video relative">
                      <Image
                        src={selectedTile.roofTilesImage || "/placeholder.svg"}
                        alt={`${selectedTile.name} roof installation`}
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
                        alt={selectedTile.name}
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
                      <Crown className="h-12 w-12 text-neutral-400 mx-auto mb-4" />
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
                      className="w-full h-12 bg-clay-red hover:bg-clay-red text-white font-semibold cursor-pointer"
                    >
                      Use this color in my quote
                    </Button>
                    <Button
                      onClick={() => handleSeeProjects(selectedTile)}
                      variant="outline"
                      className="w-full h-12 border-2 border-charcoal-gray text-charcoal-gray hover:bg-charcoal-gray hover:text-white font-semibold cursor-pointer bg-transparent"
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
