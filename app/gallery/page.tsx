import Image from "next/image"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet"
import { Menu, Phone, ArrowLeft } from "lucide-react"
import { StickyCallBar } from "@/components/sticky-call-bar"
import { galleryImages } from "../gallery-data"

export default function GalleryPage() {
  return (
    <div className="min-h-screen bg-white pb-20">
      {/* Header */}
      <header className="bg-white shadow-sm sticky top-0 z-30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center">
              <Image src="/clay-roofs-ny-logo.png" alt="Clay Roofs NY" width={120} height={40} className="h-8 w-auto" />
            </div>

            {/* Desktop Navigation */}
            <nav className="hidden md:flex space-x-8">
              <Link href="/" className="text-gray-700 hover:text-orange-600">
                Home
              </Link>
              <Link href="/gallery" className="text-gray-900 hover:text-orange-600 font-medium">
                Gallery
              </Link>
              <Link href="/about" className="text-gray-700 hover:text-orange-600">
                About
              </Link>
              <Link href="/contact" className="text-gray-700 hover:text-orange-600">
                Contact
              </Link>
            </nav>

            <div className="hidden md:flex items-center space-x-4">
              <a href="tel:+12123654386" className="text-orange-600 hover:text-orange-700">
                <Phone className="w-5 h-5" />
              </a>
              <Button className="bg-orange-600 hover:bg-orange-700 text-white">
                <Link href="/">Get Quote</Link>
              </Button>
            </div>

            {/* Mobile menu button */}
            <Sheet>
              <SheetTrigger asChild>
                <Button variant="ghost" size="icon" className="md:hidden">
                  <Menu className="h-6 w-6" />
                </Button>
              </SheetTrigger>
              <SheetContent>
                <nav className="flex flex-col space-y-4 mt-8">
                  <Link href="/" className="text-gray-700 hover:text-orange-600">
                    Home
                  </Link>
                  <Link href="/gallery" className="text-gray-900 hover:text-orange-600 font-medium">
                    Gallery
                  </Link>
                  <Link href="/about" className="text-gray-700 hover:text-orange-600">
                    About
                  </Link>
                  <Link href="/contact" className="text-gray-700 hover:text-orange-600">
                    Contact
                  </Link>
                  <div className="pt-4 border-t">
                    <a
                      href="tel:+12123654386"
                      className="flex items-center space-x-2 text-orange-600 hover:text-orange-700"
                    >
                      <Phone className="w-5 h-5" />
                      <span>(212) 365-4386</span>
                    </a>
                  </div>
                </nav>
              </SheetContent>
            </Sheet>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="bg-gray-900 text-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center mb-6">
            <Link href="/" className="flex items-center text-orange-400 hover:text-orange-300 mr-4">
              <ArrowLeft className="w-5 h-5 mr-2" />
              Back to Home
            </Link>
          </div>
          <h1 className="text-4xl md:text-5xl font-bold mb-4">Our Clay Tile Roofing Gallery</h1>
          <p className="text-xl text-gray-300 max-w-3xl">
            Explore our portfolio of premium clay tile roofing installations across New York City. Each project
            showcases our commitment to quality craftsmanship and attention to detail.
          </p>
        </div>
      </section>

      {/* Gallery Grid */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {galleryImages.map((image, index) => (
              <div key={index} className="group cursor-pointer">
                <div className="relative aspect-[4/3] overflow-hidden rounded-lg shadow-lg">
                  <Image
                    src={image.src || "/placeholder.svg"}
                    alt={image.alt}
                    fill
                    className="object-cover transition-transform duration-300 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors duration-300" />
                </div>
                <div className="mt-4">
                  <h3 className="text-lg font-semibold text-gray-900 mb-2">{image.title}</h3>
                  <p className="text-gray-600 text-sm">{image.description}</p>
                  <div className="flex flex-wrap gap-2 mt-2">
                    {image.tags.map((tag, tagIndex) => (
                      <span key={tagIndex} className="px-2 py-1 bg-orange-100 text-orange-800 text-xs rounded-full">
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-orange-600 text-white">
        <div className="max-w-4xl mx-auto text-center px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">Ready to Transform Your Roof?</h2>
          <p className="text-xl mb-8 text-orange-100">
            Let us create a beautiful clay tile roof for your property. Contact us today for a free consultation and
            quote.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button
              size="lg"
              variant="outline"
              className="border-white text-white hover:bg-white hover:text-orange-600 px-8 py-3 text-lg bg-transparent"
            >
              <Link href="/">Get Free Quote</Link>
            </Button>
            <Button
              size="lg"
              variant="outline"
              className="border-white text-white hover:bg-white hover:text-orange-600 px-8 py-3 text-lg bg-transparent"
            >
              <Link href="/contact">Contact Us</Link>
            </Button>
          </div>
        </div>
      </section>

      {/* Sticky Call Bar */}
      <StickyCallBar />
    </div>
  )
}
