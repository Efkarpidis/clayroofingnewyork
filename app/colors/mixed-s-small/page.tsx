import Link from "next/link"
import { Button } from "@/components/ui/button"
import { ArrowLeft } from "lucide-react"

export default function MixedSSmallColorsPage() {
  return (
    <div className="min-h-screen bg-merino">
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

      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h1 className="text-4xl font-bold text-old-copper mb-4">Mixed S — Small Color Options</h1>
          <p className="text-xl text-old-copper/70 mb-12">
            Explore our Mediterranean color palette for Mixed S — Small tiles. Available in Matte and Design finishes.
          </p>

          <div className="bg-white rounded-2xl shadow-lg p-8">
            <p className="text-center text-old-copper/60">
              Color gallery coming soon. Contact us for samples and color charts.
            </p>
            <div className="mt-8 text-center">
              <Link href="/contact">
                <Button className="bg-terracotta hover:bg-terracotta/90 text-white">Request Color Samples</Button>
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
