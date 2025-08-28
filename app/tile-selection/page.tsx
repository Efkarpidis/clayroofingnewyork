"use client"
import Image from "next/image"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { StickyCallBar } from "@/components/sticky-call-bar"
import { ScrollHeader } from "@/components/scroll-header"

type TileFamily = {
  id: string
  title: string
  type: string
  subtitle: string
  description: string
  swatchImage: string
  route: string
}

const tileFamilies: TileFamily[] = [
  {
    id: "vienna",
    title: "Vienna",
    type: "Flat Tile",
    subtitle: "",
    description:
      "Modern flat tiles with clean lines and contemporary appeal, perfect for minimalist architectural styles.",
    swatchImage: "/vienna-flat-clay-tile-swatch-transparent.png",
    route: "/tile-selection/vienna",
  },
  {
    id: "s-mixed",
    title: "S-Mixed",
    type: "S Tile",
    subtitle: "Mediterranean Range",
    description: "Traditional S-shaped tiles with varied color blending, creating authentic Mediterranean character.",
    swatchImage: "/s-mixed-clay-tile-swatch-transparent-curved.png",
    route: "/tile-selection/mixed",
  },
  {
    id: "selectum",
    title: "Selectum",
    type: "S Tile",
    subtitle: "H-Selection",
    description:
      "Premium S-shaped tiles with superior quality and consistent coloring for high-end residential projects.",
    swatchImage: "/selectum-premium-s-clay-tile-swatch-transparent.png",
    route: "/tile-selection/selectum",
  },
]

export default function TileSelectionPage() {
  return (
    <>
      <div className="bg-white text-neutral-800 min-h-screen">
        <ScrollHeader currentPage="tile-selection" />

        {/* Hero Section */}
        <section className="pt-20 pb-16 bg-gradient-to-b from-neutral-50 to-white mt-10 sm:mt-12 md:mt-16">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <h1 className="text-4xl md:text-5xl font-bold text-neutral-900 mb-6">Choose Your Perfect Clay Roof</h1>
            <p className="text-xl text-neutral-600 max-w-3xl mx-auto leading-relaxed">
              We offer premium imported clay tiles in three distinct families. Browse our tile options below.
            </p>
          </div>
        </section>

        {/* Tile Families */}
        <section className="py-16 bg-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 lg:gap-12">
              {tileFamilies.map((family) => (
                <div key={family.id} className="text-center space-y-6">
                  {/* Family Header */}
                  <div>
                    <h2 className="text-2xl font-bold text-neutral-900 mb-2">{family.title}</h2>
                    <p className="text-orange-600 font-semibold text-lg mb-1">{family.type}</p>
                    {family.subtitle && (
                      <p className="text-neutral-500 font-medium text-base mb-3">{family.subtitle}</p>
                    )}
                    <p className="text-neutral-600 leading-relaxed">{family.description}</p>
                  </div>

                  {/* Tile Swatch */}
                  <Link href={family.route}>
                    <div className="group relative block w-full max-w-xs mx-auto overflow-hidden rounded-lg bg-neutral-50 border-2 border-neutral-200 transition-all duration-300 hover:border-orange-300 hover:shadow-lg hover:scale-105 cursor-pointer">
                      <div className="aspect-square relative p-8">
                        <Image
                          src={family.swatchImage || "/placeholder.svg"}
                          alt={`${family.title} tile swatch`}
                          fill
                          className="object-contain transition-transform duration-300 group-hover:scale-110"
                          sizes="(max-width: 768px) 100vw, 33vw"
                        />
                      </div>
                      <div className="absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                      <div className="absolute bottom-4 left-0 right-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                        <p className="text-white font-semibold text-sm bg-black/50 rounded px-3 py-1 mx-4">
                          Click to explore colors
                        </p>
                      </div>
                    </div>
                  </Link>

                  {/* Explore Button */}
                  <Button
                    asChild
                    variant="outline"
                    className="w-full max-w-xs mx-auto border-2 border-orange-600 text-orange-600 hover:bg-orange-600 hover:text-white transition-all duration-200 bg-transparent cursor-pointer"
                  >
                    <Link href={family.route}>Explore {family.title}</Link>
                  </Button>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Call to Action */}
        <section className="py-20 bg-neutral-50 border-t border-neutral-200">
          <div className="max-w-4xl mx-auto text-center px-4 sm:px-6 lg:px-8">
            <h2 className="text-3xl font-bold text-neutral-900 mb-6">Not Sure Which Tile is Right for Your Home?</h2>
            <p className="text-lg text-neutral-600 mb-8">
              Request a free consultation and we'll guide you through the selection process to find the perfect clay
              tiles for your project.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href="/contact#form" className="relative z-20">
                <Button className="h-14 px-8 text-lg font-semibold bg-orange-600 hover:bg-orange-700 text-white rounded-full shadow-lg hover:shadow-xl transition-all duration-200 cursor-pointer">
                  Request a Quote
                </Button>
              </Link>
              <Button
                asChild
                variant="outline"
                className="h-14 px-8 text-lg font-semibold border-2 border-neutral-300 text-neutral-700 hover:bg-neutral-50 rounded-full transition-all duration-200 bg-transparent cursor-pointer"
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

      <StickyCallBar />
    </>
  )
}
