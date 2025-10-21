import Image from "next/image"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { ArrowLeft, Play } from "lucide-react"

export default function MixedSSmallDetailsPage() {
  return (
    <div className="min-h-screen bg-merino">
      {/* Header */}
      <header className="bg-parchment border-b border-stone-gray">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <Link
            href="/tile-selection"
            className="inline-flex items-center text-old-copper hover:text-terracotta transition-colors"
          >
            <ArrowLeft className="w-5 h-5 mr-2" />
            Back to Tile Selection
          </Link>
        </div>
      </header>

      {/* Hero Section */}
      <section className="py-16 bg-parchment">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div>
              <h1 className="text-4xl md:text-5xl font-bold text-old-copper mb-4">Mixed S — Small Tiles</h1>
              <p className="text-xl text-old-copper/70 mb-6">
                Classic S-curve with tighter wave for compact projects needing finer visual resolution.
              </p>
              <div className="flex gap-4">
                <Link href="/colors/mixed-s-small">
                  <Button className="bg-terracotta hover:bg-terracotta/90 text-white">Browse Colors</Button>
                </Link>
                <Link href="/contact">
                  <Button
                    variant="outline"
                    className="border-old-copper text-old-copper hover:bg-old-copper hover:text-white bg-transparent"
                  >
                    Request Quote
                  </Button>
                </Link>
              </div>
            </div>
            <div className="relative h-96 rounded-2xl overflow-hidden shadow-xl">
              <Image src="/tiles/brown-roof-tile.jpg" alt="Mixed S Small tile close-up" fill className="object-cover" />
            </div>
          </div>
        </div>
      </section>

      {/* Specifications */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-old-copper mb-8">Technical Specifications</h2>
          <div className="bg-white rounded-2xl shadow-lg p-8">
            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <h3 className="font-semibold text-old-copper mb-2">Dimensions</h3>
                <p className="text-old-copper/70">441 × 263 × 73 mm (17.4″ × 10.4″ × 2.9″)</p>
              </div>
              <div>
                <h3 className="font-semibold text-old-copper mb-2">Weight</h3>
                <p className="text-old-copper/70">3.4 kg (7.5 lb) per tile</p>
              </div>
              <div>
                <h3 className="font-semibold text-old-copper mb-2">Material</h3>
                <p className="text-old-copper/70">Natural clay</p>
              </div>
              <div>
                <h3 className="font-semibold text-old-copper mb-2">Interlocking System</h3>
                <p className="text-old-copper/70">Double lock (horizontal + vertical)</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Manufacturing Process Video Placeholder */}
      <section className="py-16 bg-parchment">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-old-copper mb-8">How Mixed S Tiles Are Made</h2>
          <div className="bg-white rounded-2xl shadow-lg overflow-hidden">
            <div className="aspect-video bg-stone-gray/20 flex items-center justify-center">
              <div className="text-center">
                <Play className="w-16 h-16 text-old-copper/40 mx-auto mb-4" />
                <p className="text-old-copper/60">Manufacturing process video coming soon</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Nerdy Facts */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-old-copper mb-8">Nerdy Facts About Mixed S — Small</h2>
          <div className="grid md:grid-cols-3 gap-6">
            <div className="bg-white rounded-xl shadow-md p-6">
              <h3 className="font-bold text-old-copper mb-3">📐 Precision Design</h3>
              <p className="text-old-copper/70">
                Tighter curve provides more tiles per square meter for detailed patterns.
              </p>
            </div>
            <div className="bg-white rounded-xl shadow-md p-6">
              <h3 className="font-bold text-old-copper mb-3">🎯 Versatility</h3>
              <p className="text-old-copper/70">Ideal for complex roof geometries and smaller architectural details.</p>
            </div>
            <div className="bg-white rounded-xl shadow-md p-6">
              <h3 className="font-bold text-old-copper mb-3">⚖️ Lightweight</h3>
              <p className="text-old-copper/70">Slightly lighter than Large variant while maintaining durability.</p>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
