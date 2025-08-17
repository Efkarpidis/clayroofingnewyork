import Link from "next/link"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet"
import { Menu, Phone } from "lucide-react"
import { StickyCallBar } from "@/components/sticky-call-bar"

export default function AboutPage() {
  return (
    <>
      <div className="bg-white text-neutral-800">
        <header className="bg-white shadow-sm sticky top-0 z-30">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex items-center justify-between h-16 md:h-20">
              {/* Logo */}
              <Link href="/" className="flex items-center flex-shrink-0">
                <Image
                  src="/clay-roofs-ny-logo.png"
                  alt="Clay Roofs NY"
                  width={540}
                  height={180}
                  className="h-12 w-auto sm:h-14 md:h-16"
                />
              </Link>

              {/* Mobile: Phone + Burger Menu */}
              <div className="flex items-center gap-3 md:hidden">
                <a
                  href="tel:2123654386"
                  className="flex items-center gap-2 px-3 py-2 text-sm font-medium text-neutral-700 hover:text-orange-600 transition-colors"
                >
                  <Phone className="w-4 h-4" />
                  <span className="hidden sm:inline">212-365-4386</span>
                </a>
                <Sheet>
                  <SheetTrigger asChild>
                    <Button variant="ghost" size="icon" className="text-neutral-700 hover:bg-neutral-100">
                      <Menu className="h-5 w-5" />
                      <span className="sr-only">Toggle menu</span>
                    </Button>
                  </SheetTrigger>
                  <SheetContent side="right" className="w-[300px] sm:w-[400px]">
                    <nav className="flex flex-col space-y-4 mt-8">
                      <Link
                        href="/"
                        className="flex items-center justify-center py-3 px-4 text-lg font-medium text-neutral-700 hover:bg-neutral-100 rounded-lg transition-colors"
                      >
                        Home
                      </Link>
                      <Link
                        href="/gallery"
                        className="flex items-center justify-center py-3 px-4 text-lg font-medium text-neutral-700 hover:bg-neutral-100 rounded-lg transition-colors"
                      >
                        Projects
                      </Link>
                      <Link
                        href="/about"
                        className="flex items-center justify-center py-3 px-4 text-lg font-medium text-orange-600 bg-orange-50 rounded-lg"
                      >
                        About
                      </Link>
                      <Link
                        href="/contact"
                        className="flex items-center justify-center py-3 px-4 text-lg font-medium text-neutral-700 hover:bg-neutral-100 rounded-lg transition-colors"
                      >
                        Contact
                      </Link>
                      <Button
                        asChild
                        className="bg-orange-600 text-white hover:bg-orange-700 text-lg font-semibold py-3 px-6 h-auto"
                      >
                        <Link href="/#quote">Request a Quote</Link>
                      </Button>
                    </nav>
                  </SheetContent>
                </Sheet>
              </div>

              {/* Desktop: Centered Navigation */}
              <div className="hidden md:flex items-center justify-center flex-1">
                <nav className="flex items-center space-x-8">
                  <a
                    href="tel:2123654386"
                    className="flex items-center gap-2 px-3 py-2 text-sm font-medium text-neutral-700 hover:text-orange-600 transition-colors"
                  >
                    <Phone className="w-4 h-4" />
                    212-365-4386
                  </a>
                  <Link
                    href="/gallery"
                    className="px-3 py-2 text-sm font-medium text-neutral-700 hover:text-orange-600 transition-colors"
                  >
                    Projects
                  </Link>
                  <Link
                    href="/about"
                    className="px-3 py-2 text-sm font-medium text-orange-600 border-b-2 border-orange-600"
                  >
                    About
                  </Link>
                  <Link
                    href="/contact"
                    className="px-3 py-2 text-sm font-medium text-neutral-700 hover:text-orange-600 transition-colors"
                  >
                    Contact
                  </Link>
                  <Button asChild className="bg-orange-600 text-white hover:bg-orange-700 text-sm font-semibold">
                    <Link href="/#quote">Request a Quote</Link>
                  </Button>
                </nav>
              </div>

              {/* Desktop: Spacer for centering */}
              <div className="hidden md:block w-32"></div>
            </div>
          </div>
        </header>

        <main className="container mx-auto px-4 py-16 sm:py-24 pb-20">
          <div className="flex flex-col items-center text-center">
            <Image
              src="/clay-roofs-ny-logo.png"
              alt="Clay Roofs NY Logo"
              width={900}
              height={300}
              className="mb-6 h-64 w-auto sm:h-80"
            />
            <h1 className="text-3xl font-extrabold tracking-tight sm:text-4xl">About Clay Roofs NY</h1>
            <p className="mt-4 max-w-2xl text-lg text-neutral-600 sm:text-xl">
              Clay Roofs NY specializes in premium Spanish clay tile roofing for high-end homes in New York. For over 20
              years, we've delivered quality, durability, and craftsmanship to every project.
            </p>
          </div>
        </main>

        <footer className="border-t border-neutral-200 bg-neutral-50">
          <div className="container mx-auto px-4 py-6 space-y-4">
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
              <p>&copy; {new Date().getFullYear()} Clay Roofs NY. All Rights Reserved.</p>
            </div>
          </div>
        </footer>
      </div>

      <StickyCallBar />
    </>
  )
}
