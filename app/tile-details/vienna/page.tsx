import Image from "next/image"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { ArrowLeft, Play } from "lucide-react"

export default function ViennaDetailsPage() {
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
              <h1 className="text-4xl md:text-5xl font-bold text-old-copper mb-4">Vienna Tiles</h1>
              <p className="text-xl text-old-copper/70 mb-6">
                Modern flat tiles with clean lines and contemporary appeal for minimalist architectural styles.
              </p>
              <div className="flex gap-4">
                <Link href="/colors/vienna">
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
              <Image src="/tiles/vienna-galaxy.jpg" alt="Vienna tile close-up" fill className="object-cover" />
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
                <p className="text-old-copper/70">460 × 255 × 30 mm (18.1″ × 10.0″ × 1.2″)</p>
              </div>
              <div>
                <h3 className="font-semibold text-old-copper mb-2">Weight</h3>
                <p className="text-old-copper/70">3.6 kg (7.9 lb) per tile</p>
              </div>
              <div>
                <h3 className="font-semibold text-old-copper mb-2">Material</h3>
                <p className="text-old-copper/70">Natural clay</p>
              </div>
              <div>
                <h3 className="font-semibold text-old-copper mb-2">Interlocking System</h3>
                <p className="text-old-copper/70">Double lock + large format</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Manufacturing Process Video Placeholder */}
      <section className="py-16 bg-parchment">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-old-copper mb-8">How Vienna Tiles Are Made</h2>
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
          <h2 className="text-3xl font-bold text-old-copper mb-8">Nerdy Facts About Vienna</h2>
          <div className="grid md:grid-cols-3 gap-6">
            <div className="bg-white rounded-xl shadow-md p-6">
              <h3 className="font-bold text-old-copper mb-3">🏗️ Modern Engineering</h3>
              <p className="text-old-copper/70">Flat profile allows for low-to-medium slope installations.</p>
            </div>
            <div className="bg-white rounded-xl shadow-md p-6">
              <h3 className="font-bold text-old-copper mb-3">✨ Sleek Aesthetic</h3>
              <p className="text-old-copper/70">Clean lines create a contemporary, minimalist appearance.</p>
            </div>
            <div className="bg-white rounded-xl shadow-md p-6">
              <h3 className="font-bold text-old-copper mb-3">⚡ Efficient Installation</h3>
              <p className="text-old-copper/70">Large format reduces installation time and labor costs.</p>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
