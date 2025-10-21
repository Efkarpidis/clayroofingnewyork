"use client"

import { useEffect, useRef, useState } from "react"
import Image from "next/image"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { StickyCallBar } from "@/components/sticky-call-bar"
import { Crown, Star, Award } from "lucide-react"

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

// Family data with luxury branding and updated tile previews
const tileFamilies = [
  {
    id: "vienna",
    title: "Vienna",
    subtitle: "Flat Tile Collection",
    badge: { text: "Premium", icon: Star },
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
    badge: { text: "Exclusive", icon: Award },
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
    badge: { text: "Flagship", icon: Crown },
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
  const BadgeIcon = family.badge.icon

  return (
    <section
      ref={elementRef}
      className={`section py-20 transition-all duration-1000 ${
        isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Luxury Hero Banner */}
        <div className="relative mb-16 rounded-3xl overflow-hidden shadow-2xl">
          <div className="absolute inset-0">
            <Image
              src={family.heroImage || "/placeholder.svg"}
              alt={`${family.title} collection hero`}
              fill
              className="object-cover"
              sizes="100vw"
            />
            <div className="absolute inset-0 bg-gradient-to-r from-black/70 via-black/40 to-transparent" />
          </div>

          <div className="relative z-10 px-8 py-16 md:px-16 md:py-24">
            <div className="max-w-2xl">
              {/* Premium Badge */}
              <div className="flex items-center gap-3 mb-6">
                <BadgeIcon size={24} className="text-white" />
                <span className="text-white font-semibold text-lg">{family.badge.text}</span>
              </div>

              {/* Luxury Title */}
              <h2 className="luxury-title text-4xl md:text-6xl text-white mb-4">{family.title}</h2>

              {/* Subtitle */}
              <p className="luxury-subtitle text-xl md:text-2xl text-white/90 mb-6">{family.subtitle}</p>

              {/* Description */}
              <p className="text-lg text-white/80 leading-relaxed mb-8 max-w-xl">{family.description}</p>

              {/* Primary CTA */}
              <Link href={family.route} className="inline-block">
                <Button className="h-14 px-8 text-lg font-semibold bg-clay-red hover:bg-clay-red text-white rounded-full shadow-lg hover:shadow-xl transition-all duration-200 cursor-pointer">
                  Explore {family.title} Collection
                </Button>
              </Link>
            </div>
          </div>
        </div>

        {/* Tile Preview Grid */}
        <div className="space-y-8">
          <div className="text-center">
            <h3 className="text-3xl font-bold text-old-copper mb-2">Available Colors</h3>
            <p className="text-lg text-old-copper/70">Preview of our {family.title} tile collection</p>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 lg:gap-8 border-0">
            {family.tilePreview.map((tile, tileIndex) => (
              <Link
                key={tileIndex}
                href={family.route}
                className="group block transition-all duration-300 hover:scale-105"
              >
                <div className="bg-parchment rounded-xl shadow-md hover:shadow-xl transition-all duration-300 overflow-hidden border border-stone-gray hover:border-terracotta/50">
                  <div className="aspect-square relative p-4 bg-merino">
                    <Image
                      src={tile.image || "/placeholder.svg"}
                      alt={`${tile.name} tile`}
                      fill
                      className="object-contain transition-transform duration-300 group-hover:scale-110 bg-[rgba(236,229,213,1)]"
                      sizes="(max-width: 768px) 50vw, 25vw"
                    />
                  </div>
                  <div className="p-4 text-center bg-[rgba(236,232,220,1)] border-0">
                    <h4 className="font-bold text-sm text-[rgba(100,68,54,1)]">{tile.name}</h4>
                  </div>
                </div>
              </Link>
            ))}
          </div>

          {/* Secondary CTA */}
          <div className="text-center pt-8">
            <Link href={family.route}>
              <Button
                variant="outline"
                className="h-12 px-8 text-lg font-semibold border-2 border-old-copper text-old-copper hover:bg-old-copper hover:text-parchment rounded-full transition-all duration-200 bg-transparent cursor-pointer"
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

// Tile comparison data and types
type WeightUnit = "kg" | "lb"

interface TileData {
  name: string
  tileFamily: string
  styleShape: string
  lookDesignFeel: string
  material: string
  sizeMm: string
  sizeInches: string
  weightKg: number
  tilesPerM2: string
  interlocking: string
  roofPitch: string
  colorFinishes: string
  visualTexture: string
  coverage: string
  bestFor: string
  imageAlt: string
  imagePath?: string
  availableStyles?: string
}

const tiles: TileData[] = [
  {
    name: "Selectum",
    tileFamily: "H-Selection Premium",
    styleShape: "Flat, modern profile",
    lookDesignFeel: "Contemporary Spanish",
    material: "Natural high-fired clay",
    sizeMm: "468 × 280 × 75 mm",
    sizeInches: "18.4″ × 11.0″ × 2.9″",
    weightKg: 3.5,
    tilesPerM2: "11 – 14",
    interlocking: "FlexiLock® precision system",
    roofPitch: "Works on lower slopes when specified per manufacturer",
    colorFinishes: "Premium finishes (e.g., Visum3 Black Stone, Red, Light Blue)",
    visualTexture: "Smooth, flat surface",
    coverage: "Moderate coverage; suited to low-pitch when specified",
    bestFor: "Contemporary Spanish / architectural roofs",
    imageAlt: "Selectum cognac tile profile",
    imagePath: "/tiles/cognac-roof-tile.jpg",
    availableStyles: "Matte, Gloss, Design",
  },
  {
    name: "Mixed S — Large",
    tileFamily: "Mediterranean Range",
    styleShape: "Classic S-curve, broader wave",
    lookDesignFeel: "Mediterranean traditional",
    material: "Natural clay",
    sizeMm: "470 × 286 × 75 mm",
    sizeInches: "18.5″ × 11.3″ × 2.9″",
    weightKg: 3.85,
    tilesPerM2: "~10.5",
    interlocking: "Double lock (horizontal + vertical)",
    roofPitch: "Typically 30°+ (standard S-tile practice)",
    colorFinishes: "Wide Mediterranean palette (Terracotta, Tuscany, Aitana, Etna, …)",
    visualTexture: "Pronounced double curve",
    coverage: "Fewer pieces per m² — larger format",
    bestFor: "Traditional Mediterranean homes",
    imageAlt: "Mixed S — Large red tile profile",
    imagePath: "/tiles/red-roof-tile.jpg",
    availableStyles: "Matte, Design",
  },
  {
    name: "Mixed S — Small",
    tileFamily: "Mediterranean Range",
    styleShape: "Classic S-curve, tighter wave",
    lookDesignFeel: "Mediterranean traditional",
    material: "Natural clay",
    sizeMm: "441 × 263 × 73 mm",
    sizeInches: "17.4″ × 10.4″ × 2.9″",
    weightKg: 3.4,
    tilesPerM2: "~12.5",
    interlocking: "Double lock (horizontal + vertical)",
    roofPitch: "Typically 30°+ (standard S-tile practice)",
    colorFinishes: "Same palette as Large",
    visualTexture: "Slightly tighter curve",
    coverage: "More pieces per m² — finer visual resolution",
    bestFor: "Compact projects needing tighter curve rhythm",
    imageAlt: "Mixed S — Small brown tile profile",
    imagePath: "/tiles/brown-roof-tile.jpg",
    availableStyles: "Matte, Design",
  },
  {
    name: "Vienna",
    tileFamily: "H-Selection Flat Range",
    styleShape: "Flat, sleek, clean lines",
    lookDesignFeel: "Modern minimalist",
    material: "Natural clay",
    sizeMm: "460 × 255 × 30 mm",
    sizeInches: "18.1″ × 10.0″ × 1.2″",
    weightKg: 3.6,
    tilesPerM2: "~11.5",
    interlocking: "Double lock + large format",
    roofPitch: "Low-to-medium slopes (per spec)",
    colorFinishes: "Brown, Galaxy, Slate, Red, Rustic Red",
    visualTexture: "Fine-textured flat surface",
    coverage: "Large format — efficient installation",
    bestFor: "Modern flat-tile looks / clean rooflines",
    imageAlt: "Vienna Galaxy tile profile",
    imagePath: "/tiles/vienna-galaxy.jpg",
    availableStyles: "Matte only",
  },
]

const comparisonFields = [
  { key: "lookDesignFeel", label: "Look/Design Feel" },
  { key: "tileFamily", label: "Tile Family" },
  { key: "size", label: "Size" },
  { key: "weight", label: "Weight" },
  { key: "interlocking", label: "Interlocking/Installation" },
  { key: "availableStyles", label: "Available Styles" },
]

// TileComparison component
function TileComparison() {
  const [weightUnit, setWeightUnit] = useState<WeightUnit>("kg")

  const convertWeight = (kg: number): string => {
    if (weightUnit === "kg") {
      return `${kg.toFixed(2)} kg`
    }
    const lb = kg * 2.20462
    return `${lb.toFixed(2)} lb`
  }

  const getFieldValue = (tile: TileData, fieldKey: string): string => {
    switch (fieldKey) {
      case "lookDesignFeel":
        return tile.lookDesignFeel
      case "tileFamily":
        return tile.tileFamily
      case "size":
        return `${tile.sizeMm} (${tile.sizeInches})`
      case "weight":
        return convertWeight(tile.weightKg)
      case "interlocking":
        return tile.interlocking
      case "availableStyles":
        return tile.availableStyles || ""
      default:
        return ""
    }
  }

  const getTileSlug = (tileName: string): string => {
    return tileName.toLowerCase().replace(/\s+/g, "-").replace(/—/g, "")
  }

  return (
    <section className="py-20 relative overflow-hidden">
      <div className="absolute inset-0">
        <Image
          src="/tiles/ai-image-2.png"
          alt="Tile showroom background"
          fill
          className="object-cover opacity-20"
          sizes="100vw"
          priority
        />
      </div>

      {/* Content Layer */}
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-[#754e30] mb-4">Compare Our Tile Collections</h2>
          <p className="text-lg text-[#754e30]/70 max-w-3xl mx-auto font-medium">
            All natural clay tiles. Choose the profile and format that best suits your style and roof requirements.
          </p>
        </div>

        {/* Toggle Controls */}
        <div className="flex justify-end mb-8">
          <div className="inline-flex rounded-2xl bg-white shadow-md p-1" role="group" aria-label="Weight unit toggle">
            <button
              onClick={() => setWeightUnit("kg")}
              className={`px-6 py-2 rounded-xl text-sm font-medium transition-all ${
                weightUnit === "kg" ? "bg-[#754e30] text-white" : "text-[#754e30] hover:bg-[#f3ecdb]"
              }`}
              aria-pressed={weightUnit === "kg"}
            >
              KG
            </button>
            <button
              onClick={() => setWeightUnit("lb")}
              className={`px-6 py-2 rounded-xl text-sm font-medium transition-all ${
                weightUnit === "lb" ? "bg-[#754e30] text-white" : "text-[#754e30] hover:bg-[#f3ecdb]"
              }`}
              aria-pressed={weightUnit === "lb"}
            >
              LB
            </button>
          </div>
        </div>

        {/* Mobile Card Layout */}
        <div className="md:hidden space-y-6">
          {tiles.map((tile) => (
            <div key={tile.name} className="bg-white rounded-2xl shadow-lg overflow-hidden">
              {/* Tile Header with Image */}
              <div className="relative bg-[#754e30] text-white p-4">
                <h3 className="text-xl font-bold mb-3">{tile.name}</h3>
                <div className="relative">
                  <div className="absolute inset-0 rounded-lg overflow-hidden">
                    <Image
                      src="/tiles/showroom-blurry.jpg"
                      alt=""
                      fill
                      className="object-cover opacity-20"
                      sizes="300px"
                    />
                  </div>
                  <Link
                    href={`/colors/${getTileSlug(tile.name)}`}
                    className="block relative group rounded-lg overflow-hidden"
                  >
                    <Image
                      src={tile.imagePath || "/placeholder.svg"}
                      alt={tile.imageAlt}
                      width={320}
                      height={200}
                      className="w-full h-40 object-contain rounded-lg bg-[#f6f0e4] transition-opacity duration-300 group-hover:opacity-70"
                    />
                    <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300 bg-black/20 rounded-lg">
                      <span className="text-white font-semibold text-sm px-4 py-2 bg-[#754e30] rounded-full shadow-lg">
                        Browse Colors
                      </span>
                    </div>
                  </Link>
                </div>
                <Link
                  href={`/tile-details/${getTileSlug(tile.name)}`}
                  className="block mt-3 text-center text-sm text-white hover:text-[#f3ecdb] font-medium transition-colors underline"
                >
                  Learn More
                </Link>
              </div>

              {/* Tile Details */}
              <div className="p-4 space-y-3">
                {comparisonFields.map((field) => (
                  <div key={field.key} className="flex flex-col gap-1 pb-3 border-b border-[#f3ecdb] last:border-0">
                    <span className="text-xs font-semibold text-[#754e30]/60 uppercase tracking-wide">
                      {field.label}
                    </span>
                    <span className="text-sm text-[#754e30] font-medium">{getFieldValue(tile, field.key)}</span>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>

        {/* Desktop Table Layout */}
        <div className="hidden md:block bg-white rounded-2xl shadow-lg overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full" role="table">
              <thead className="sticky top-0 bg-[#754e30] text-white z-10">
                <tr>
                  <th className="px-6 py-4 text-left text-sm font-semibold w-48">Feature</th>
                  {tiles.map((tile) => (
                    <th key={tile.name} className="px-6 py-4 text-left text-sm font-semibold min-w-[200px]">
                      <div className="text-base font-bold">{tile.name}</div>
                    </th>
                  ))}
                </tr>
                <tr>
                  <th className="px-6 py-4 bg-[#754e30]"></th>
                  {tiles.map((tile) => (
                    <th key={`img-${tile.name}`} className="px-6 py-4 bg-[#754e30]">
                      <div className="relative">
                        <div className="absolute inset-0 rounded-lg overflow-hidden">
                          <Image
                            src="/tiles/showroom-blurry.jpg"
                            alt=""
                            fill
                            className="object-cover opacity-20"
                            sizes="200px"
                          />
                        </div>
                        <Link
                          href={`/colors/${getTileSlug(tile.name)}`}
                          className="block relative group rounded-lg overflow-hidden"
                        >
                          <Image
                            src={tile.imagePath || "/placeholder.svg"}
                            alt={tile.imageAlt}
                            width={320}
                            height={200}
                            className="w-full h-32 object-contain rounded-lg bg-[#f6f0e4] transition-opacity duration-300 group-hover:opacity-70"
                          />
                          <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300 bg-black/20 rounded-lg">
                            <span className="text-white font-semibold text-sm px-4 py-2 bg-[#754e30] rounded-full shadow-lg">
                              Browse Colors
                            </span>
                          </div>
                        </Link>
                      </div>
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {comparisonFields.map((field, index) => (
                  <tr key={field.key} className={index % 2 === 0 ? "bg-white" : "bg-[#f3ecdb]"}>
                    <td className="px-6 py-4 text-sm font-semibold text-[#754e30]">{field.label}</td>
                    {tiles.map((tile) => (
                      <td key={`${tile.name}-${field.key}`} className="px-6 py-4 text-sm text-[#754e30]">
                        {getFieldValue(tile, field.key)}
                      </td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </section>
  )
}

export default function TileSelectionPage() {
  return (
    <>
      <div className="min-h-screen">
        {/* Hero Section */}
        <section className="pt-20 pb-16 text-white relative overflow-hidden">
          {/* Background Image */}
          <div className="absolute inset-0">
            <Image
              src="/images/design-mode/Cocoa_Is_Cool2.png"
              alt="Poodle with sunglasses on clay tile roof"
              fill
              className="object-cover object-[50%_25%]"
              priority
              sizes="100vw"
            />
            {/* Dark overlay for text readability */}
            <div className="absolute inset-0 bg-gradient-to-b from-black/70 via-black/60 to-black/70" />
          </div>

          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10">
            <div className="premium-badge mx-auto mb-6 bg-terracotta/90 backdrop-blur-sm opacity-0">{""}</div>

            <h1 className="luxury-title md:text-6xl mb-6 text-white drop-shadow-lg font-semibold text-4xl rounded-none mt-2.5 opacity-100 shadow-none border-none">
              {"SELECT YOUR SIGNATURE TILE."}
            </h1>

            <p className="text-xl text-white/95 max-w-3xl mx-auto leading-relaxed drop-shadow-md mb-9">
              Explore our clay tile collections. (Yes, Cocoa is judging your taste. Pick wisely.)
            </p>

            <div className="flex items-center justify-center gap-2 text-red-200">
              <span className="w-2 h-2 bg-terracotta rounded-full animate-pulse"></span>
              
              <span className="w-2 h-2 bg-terracotta rounded-full animate-pulse"></span>
            </div>
          </div>
        </section>

        {/* Family Sections */}
        {tileFamilies.map((family, index) => (
          <FamilySection key={family.id} family={family} index={index} />
        ))}

        {/* Tile Comparison section below family sections */}
        <TileComparison />

        {/* Final Call to Action */}
        <section className="section py-20 bg-gradient-to-r from-clay-red to-red-700 text-white">
          <div className="max-w-4xl mx-auto text-center px-4 sm:px-6 lg:px-8">
            <h2 className="text-3xl md:text-4xl font-bold mb-6">Not Sure Which Tile is Right for Your Home?</h2>
            <p className="text-xl text-red-100 mb-8 leading-relaxed">
              Our experts will guide you through the selection process to find the perfect clay tiles for your project.
              Get personalized recommendations based on your home's style and your preferences.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href="/contact#quote" className="tappable">
                <Button className="h-14 px-8 text-lg font-semibold bg-white text-clay-red hover:bg-red-50 rounded-full shadow-lg hover:shadow-xl transition-all duration-200 cursor-pointer">
                  Get Free Consultation
                </Button>
              </Link>
              <Button
                asChild
                variant="outline"
                className="h-14 px-8 text-lg font-semibold border-2 border-white text-white hover:bg-white hover:text-clay-red rounded-full transition-all duration-200 bg-transparent cursor-pointer"
              >
                <Link href="/contact">Contact Our Experts</Link>
              </Button>
            </div>
          </div>
        </section>

        {/* Footer */}
        <footer className="border-t border-neutral-200 bg-parchment">
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
