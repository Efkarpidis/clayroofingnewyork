import Image from "next/image"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { StickyCallBar } from "@/components/sticky-call-bar"
import { Package, Truck, Calculator, CheckCircle } from "lucide-react"

export default function TileSupplyPage() {
  return (
    <>
      <div className="bg-white text-neutral-800 min-h-screen">
        {/* Hero Section */}
        <section className="pt-20 pb-16 bg-gradient-to-b from-orange-600 to-orange-700 text-white">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <h1 className="text-4xl md:text-5xl font-bold mb-4">Direct Tile Supply</h1>
            <p className="text-xl text-orange-100 font-semibold mb-6">Order Clay Roof Tiles by the Crate</p>
            <p className="text-lg text-orange-50 max-w-3xl mx-auto leading-relaxed">
              Purchase premium Spanish clay tiles directly from our warehouse. Perfect for contractors, architects, and
              DIY enthusiasts who need quality tiles without installation services.
            </p>
          </div>
        </section>

        {/* Features Section */}
        <section className="py-16 bg-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-16">
              <div className="text-center">
                <div className="w-16 h-16 bg-orange-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Package className="h-8 w-8 text-orange-600" />
                </div>
                <h3 className="text-lg font-semibold text-neutral-900 mb-2">Bulk Orders</h3>
                <p className="text-neutral-600">Order by the crate or pallet for large projects</p>
              </div>
              <div className="text-center">
                <div className="w-16 h-16 bg-orange-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Truck className="h-8 w-8 text-orange-600" />
                </div>
                <h3 className="text-lg font-semibold text-neutral-900 mb-2">Direct Delivery</h3>
                <p className="text-neutral-600">Delivered directly to your job site or warehouse</p>
              </div>
              <div className="text-center">
                <div className="w-16 h-16 bg-orange-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Calculator className="h-8 w-8 text-orange-600" />
                </div>
                <h3 className="text-lg font-semibold text-neutral-900 mb-2">Custom Quotes</h3>
                <p className="text-neutral-600">Pricing based on quantity, type, and delivery location</p>
              </div>
              <div className="text-center">
                <div className="w-16 h-16 bg-orange-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <CheckCircle className="h-8 w-8 text-orange-600" />
                </div>
                <h3 className="text-lg font-semibold text-neutral-900 mb-2">Quality Assured</h3>
                <p className="text-neutral-600">Same premium tiles we use in our installations</p>
              </div>
            </div>
          </div>
        </section>

        {/* Available Tile Families */}
        <section className="py-16 bg-neutral-50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold text-neutral-900 mb-4">Available Tile Collections</h2>
              <p className="text-lg text-neutral-600">
                All our premium tile families are available for direct purchase
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {/* Vienna */}
              <div className="bg-white rounded-lg shadow-md overflow-hidden">
                <div className="aspect-video relative">
                  <Image
                    src="/tiles/vienna/vienna-slate-tiles.jpg"
                    alt="Vienna flat tiles"
                    fill
                    className="object-cover"
                    sizes="(max-width: 768px) 100vw, 33vw"
                  />
                </div>
                <div className="p-6">
                  <h3 className="text-xl font-bold text-neutral-900 mb-2">Vienna</h3>
                  <p className="text-orange-600 font-semibold mb-3">Flat Tile Collection</p>
                  <p className="text-neutral-600 mb-4">Modern flat tiles with clean lines and contemporary appeal.</p>
                  <Link href="/tile-selection/vienna">
                    <Button
                      variant="outline"
                      className="w-full border-orange-600 text-orange-600 hover:bg-orange-600 hover:text-white cursor-pointer bg-transparent"
                    >
                      View Vienna Options
                    </Button>
                  </Link>
                </div>
              </div>

              {/* S-Mixed */}
              <div className="bg-white rounded-lg shadow-md overflow-hidden">
                <div className="aspect-video relative">
                  <Image
                    src="/tiles/s-mixed/mixed-castell-roof-tiles.jpg"
                    alt="S-Mixed tiles"
                    fill
                    className="object-cover"
                    sizes="(max-width: 768px) 100vw, 33vw"
                  />
                </div>
                <div className="p-6">
                  <h3 className="text-xl font-bold text-neutral-900 mb-2">S-Mixed</h3>
                  <p className="text-orange-600 font-semibold mb-3">Mediterranean Range</p>
                  <p className="text-neutral-600 mb-4">Traditional S-shaped tiles with varied color blending.</p>
                  <Link href="/tile-selection/mixed">
                    <Button
                      variant="outline"
                      className="w-full border-orange-600 text-orange-600 hover:bg-orange-600 hover:text-white cursor-pointer bg-transparent"
                    >
                      View S-Mixed Options
                    </Button>
                  </Link>
                </div>
              </div>

              {/* Selectum */}
              <div className="bg-white rounded-lg shadow-md overflow-hidden">
                <div className="aspect-video relative">
                  <Image
                    src="/tiles/selectum/selectum-red-tiles-roof.png"
                    alt="Selectum tiles"
                    fill
                    className="object-cover"
                    sizes="(max-width: 768px) 100vw, 33vw"
                  />
                </div>
                <div className="p-6">
                  <h3 className="text-xl font-bold text-neutral-900 mb-2">Selectum</h3>
                  <p className="text-orange-600 font-semibold mb-3">H-Selection Premium</p>
                  <p className="text-neutral-600 mb-4">Premium S-shaped tiles with superior quality and consistency.</p>
                  <Link href="/tile-selection/selectum">
                    <Button
                      variant="outline"
                      className="w-full border-orange-600 text-orange-600 hover:bg-orange-600 hover:text-white cursor-pointer bg-transparent"
                    >
                      View Selectum Options
                    </Button>
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Pricing Information */}
        <section className="py-16 bg-white">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <h2 className="text-3xl font-bold text-neutral-900 mb-6">How Pricing Works</h2>
            <div className="bg-neutral-50 rounded-lg p-8 mb-8">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-left">
                <div>
                  <h3 className="font-semibold text-neutral-900 mb-2">Tile Type</h3>
                  <p className="text-neutral-600 text-sm">
                    Different tile families have different base prices based on manufacturing complexity and materials.
                  </p>
                </div>
                <div>
                  <h3 className="font-semibold text-neutral-900 mb-2">Quantity</h3>
                  <p className="text-neutral-600 text-sm">
                    Larger orders receive volume discounts. Minimum order quantities may apply for certain tiles.
                  </p>
                </div>
                <div>
                  <h3 className="font-semibold text-neutral-900 mb-2">Delivery</h3>
                  <p className="text-neutral-600 text-sm">
                    Shipping costs vary by location, order size, and delivery requirements. Local delivery available.
                  </p>
                </div>
              </div>
            </div>
            <p className="text-lg text-neutral-600 mb-8">
              Every project is unique. Contact us with your specific requirements for an accurate quote including tiles,
              packaging, and delivery.
            </p>
            <Link href="/contact" className="tappable">
              <Button className="h-14 px-8 text-lg font-semibold bg-orange-600 hover:bg-orange-700 text-white rounded-full shadow-lg hover:shadow-xl transition-all duration-200 cursor-pointer">
                Request a Supply Quote
              </Button>
            </Link>
          </div>
        </section>

        {/* Contact Information */}
        <section className="py-16 bg-orange-600 text-white">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <h2 className="text-3xl font-bold mb-6">Ready to Order Tiles?</h2>
            <p className="text-xl text-orange-100 mb-8">
              Contact our supply team to discuss your tile needs and get a personalized quote.
            </p>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
              <div className="text-center">
                <h3 className="text-lg font-semibold mb-2">Phone Orders</h3>
                <a href="tel:212-365-4386" className="text-xl font-bold hover:text-orange-200 transition-colors">
                  (212) 365-4386
                </a>
                <p className="text-orange-100 text-sm mt-1">Monday - Friday, 8 AM - 5 PM</p>
              </div>
              <div className="text-center">
                <h3 className="text-lg font-semibold mb-2">Email Quotes</h3>
                <a
                  href="mailto:chris@clayroofingnewyork.com"
                  className="text-xl font-bold hover:text-orange-200 transition-colors"
                >
                  chris@clayroofingnewyork.com
                </a>
                <p className="text-orange-100 text-sm mt-1">Include project details for faster quotes</p>
              </div>
            </div>
            <Link href="/contact" className="tappable">
              <Button className="h-12 px-8 text-lg font-semibold bg-white text-orange-600 hover:bg-orange-50 rounded-full shadow-lg hover:shadow-xl transition-all duration-200 cursor-pointer">
                Get Quote Online
              </Button>
            </Link>
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
