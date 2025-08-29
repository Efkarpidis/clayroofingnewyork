"use client"

import { useEffect, useRef, useState } from "react"
import Image from "next/image"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { StickyCallBar } from "@/components/sticky-call-bar"
import { ScrollHeader } from "@/components/scroll-header"

// Hook for scroll animations
function useScrollAnimation() {
  const [isVisible, setIsVisible] = useState(false)
  const elementRef = useRef<HTMLElement>(null)

  useEffect(() => {
    const element = elementRef.current
    if (!element) return

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true)
        }
      },
      {
        threshold: 0.2,
        rootMargin: "0px 0px -100px 0px",
      },
    )

    observer.observe(element)

    return () => {
      observer.unobserve(element)
    }
  }, [])

  return { elementRef, isVisible }
}

// Family data with hero images and tile previews - Updated S-Mixed with final tiles
const tileFamilies = [
  {
    id: "vienna",
    title: "Vienna",
    subtitle: "Flat Tile Collection",
    description:
      "Modern flat tiles with clean lines and contemporary appeal, perfect for minimalist architectural styles and modern homes.",
    heroImage: "/tiles/vienna/vienna-slate-tiles.jpg",
    route: "/tile-selection/vienna",
    tilePreview: [
      { name: "Vienna Slate", image: "/tiles/vienna/vienna-slate-tile.png" },
      { name: "Vienna Red", image: "/tiles/vienna/vienna-red-tile.png" },
      { name: "Vienna Brown", image: "/tiles/vienna/vienna-brown-tile.png" },
      { name: "Vienna Galaxy", image: "/tiles/vienna/vienna-galaxy-tile.png" },
    ],
  },
  {
    id: "s-mixed",
    title: "S-Mixed",
    subtitle: "Mediterranean Range",
    description:
      "Traditional S-shaped tiles with varied color blending, creating authentic Mediterranean character with time-tested appeal.",
    heroImage: "/tiles/s-mixed/mixed-castell-roof-tiles.jpg",
    route: "/tile-selection/mixed",
    tilePreview: [
      { name: "Tossal", image: "/tiles/s-mixed/mixed-tossal-roof-tile.png" },
      { name: "Slate", image: "/tiles/s-mixed/mixed-slate-roof-tile.png" },
      { name: "Galia", image: "/tiles/s-mixed/mixed-galia-roof-tile.png" },
      { name: "Jaspee Red", image: "/tiles/s-mixed/mixed-jaspee-red-roof-tile.png" },
    ],
  },
  {
    id: "selectum",
    title: "Selectum",
    subtitle: "H-Selection Premium",
    description:
      "Premium S-shaped tiles with superior quality and consistent coloring for high-end residential projects. Our flagship collection.",
    heroImage: "/tiles/selectum/selectum-red-tiles-roof.png",
    route: "/tile-selection/selectum",
    tilePreview: [
      { name: "Red", image: "/tiles/selectum/selectum-red-tile-updated.png" },
      { name: "Galia", image: "/tiles/selectum/selectum-galia-tile-single.png" },
      { name: "Cognac", image: "/tiles/selectum/selectum-cognac-tile-single.png" },
      { name: "Slate", image: "/tiles/selectum/selectum-slate-tile-single.png" },
    ],
  },
]

function FamilySection({ family, index }: { family: (typeof tileFamilies)[0]; index: number }) {
  const { elementRef, isVisible } = useScrollAnimation()
  const isEven = index % 2 === 0

  return (
    <section
      ref={elementRef}
      className={`py-20 transition-all duration-1000 ${
        isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
      } ${isEven ? "bg-white" : "bg-gradient-to-br from-neutral-50 to-orange-50/30"}`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Family Hero Section */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center mb-16">
          {/* Content */}
          <div className={`${isEven ? "lg:order-1" : "lg:order-2"}`}>
            <div className="space-y-6">
              <div>
                <h2 className="text-4xl md:text-5xl font-bold text-neutral-900 mb-3">{family.title}</h2>
                <p className="text-xl text-orange-600 font-semibold mb-4">{family.subtitle}</p>
                <p className="text-lg text-neutral-600 leading-relaxed">{family.description}</p>
              </div>
              <Link href={family.route} className="inline-block">
                <Button className="h-12 px-8 text-lg font-semibold bg-orange-600 hover:bg-orange-700 text-white rounded-full shadow-lg hover:shadow-xl transition-all duration-200 cursor-pointer">
                  Explore All {family.title} Options
                </Button>
              </Link>
            </div>
          </div>

          {/* Hero Image */}
          <div className={`${isEven ? "lg:order-2" : "lg:order-1"}`}>
            <div className="relative aspect-[4/3] rounded-2xl overflow-hidden shadow-2xl">
              <Image
                src={family.heroImage || "/placeholder.svg"}
                alt={`${family.title} tiles hero image`}
                fill
                className="object-cover transition-transform duration-700 hover:scale-105"
                sizes="(max-width: 1024px) 100vw, 50vw"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent" />
            </div>
          </div>
        </div>

        {/* Tile Preview Grid */}
        <div className="space-y-8">
          <div className="text-center">
            <h3 className="text-2xl font-bold text-neutral-900 mb-2">Available Colors</h3>
            <p className="text-neutral-600">Preview of our {family.title} tile collection</p>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 lg:gap-8">
            {family.tilePreview.map((tile, tileIndex) => (
              <Link
                key={tileIndex}
                href={family.route}
                className="group block transition-all duration-300 hover:scale-105"
              >
                <div className="bg-white rounded-xl shadow-md hover:shadow-xl transition-all duration-300 overflow-hidden border border-neutral-200 hover:border-orange-300">
                  <div className="aspect-square relative p-4 bg-neutral-50">
                    <Image
                      src={tile.image || "/placeholder.svg"}
                      alt={`${tile.name} tile`}
                      fill
                      className="object-contain transition-transform duration-300 group-hover:scale-110"
                      sizes="(max-width: 768px) 50vw, 25vw"
                    />
                  </div>
                  <div className="p-4 text-center">
                    <h4 className="font-semibold text-neutral-900 text-sm">{tile.name}</h4>
                  </div>
                </div>
              </Link>
            ))}
          </div>

          {/* Family CTA */}
          <div className="text-center pt-8">
            <Link href={family.route}>
              <Button
                variant="outline"
                className="h-12 px-8 text-lg font-semibold border-2 border-orange-600 text-orange-600 hover:bg-orange-600 hover:text-white rounded-full transition-all duration-200 bg-transparent cursor-pointer"
              >
                View All {family.title} Colors
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </section>
  )
}

export default function TileSelectionPage() {
  return (
    <>
      <div className="bg-white text-neutral-800 min-h-screen">
        <ScrollHeader currentPage="tile-selection" />

        {/* Hero Section */}
        <section className="pt-20 pb-16 bg-gradient-to-b from-neutral-900 via-neutral-800 to-neutral-700 text-white relative overflow-hidden">
          {/* Background Pattern */}
          <div className="absolute inset-0 opacity-10">
            <div className="absolute inset-0 bg-[url('/placeholder.svg')] bg-repeat opacity-20"></div>
          </div>

          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10">
            <h1 className="text-5xl md:text-6xl font-bold mb-6 bg-gradient-to-r from-white to-orange-200 bg-clip-text text-transparent">
              Choose Your Perfect Clay Roof
            </h1>
            <p className="text-xl text-neutral-200 max-w-3xl mx-auto leading-relaxed mb-8">
              Discover our premium imported clay tiles across three distinct families. Each collection offers unique
              character and timeless beauty for your home.
            </p>
            <div className="flex items-center justify-center gap-2 text-orange-300">
              <span className="w-2 h-2 bg-orange-400 rounded-full animate-pulse"></span>
              <span className="text-sm font-medium">Scroll to explore each family</span>
              <span className="w-2 h-2 bg-orange-400 rounded-full animate-pulse"></span>
            </div>
          </div>
        </section>

        {/* Family Sections */}
        {tileFamilies.map((family, index) => (
          <FamilySection key={family.id} family={family} index={index} />
        ))}

        {/* Final Call to Action */}
        <section className="py-20 bg-gradient-to-r from-orange-600 to-orange-700 text-white">
          <div className="max-w-4xl mx-auto text-center px-4 sm:px-6 lg:px-8">
            <h2 className="text-3xl md:text-4xl font-bold mb-6">Not Sure Which Tile is Right for Your Home?</h2>
            <p className="text-xl text-orange-100 mb-8 leading-relaxed">
              Our experts will guide you through the selection process to find the perfect clay tiles for your project.
              Get personalized recommendations based on your home's style and your preferences.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href="/contact#quote" className="tappable">
                <Button className="h-14 px-8 text-lg font-semibold bg-white text-orange-600 hover:bg-orange-50 rounded-full shadow-lg hover:shadow-xl transition-all duration-200 cursor-pointer">
                  Get Free Consultation
                </Button>
              </Link>
              <Button
                asChild
                variant="outline"
                className="h-14 px-8 text-lg font-semibold border-2 border-white text-white hover:bg-white hover:text-orange-600 rounded-full transition-all duration-200 bg-transparent cursor-pointer"
              >
                <Link href="/contact">Contact Our Experts</Link>
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
