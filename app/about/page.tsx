import Link from "next/link"
import Image from "next/image"
import { Button } from "@/components/ui/button"

export default function AboutPage() {
  return (
    <div className="bg-white text-neutral-800">
      <header className="sticky top-0 z-50 border-b border-neutral-200 bg-white/95 shadow-sm">
        <div className="container mx-auto flex items-center justify-between px-4 py-2">
          <Link href="/" className="flex items-center">
            <Image src="/terraclay-logo.png" alt="Terra Clay" width={540} height={180} className="h-32 w-auto" />
          </Link>
          <nav className="flex items-center gap-1 sm:gap-2 flex-wrap">
            <Button asChild variant="ghost" className="text-sm font-medium text-neutral-700 hover:bg-neutral-100">
              <a href="tel:2123654386">212-365-4386</a>
            </Button>
            <Button asChild variant="ghost" className="text-sm font-medium text-neutral-700 hover:bg-neutral-100">
              <Link href="/gallery">Gallery</Link>
            </Button>
            <Button asChild variant="ghost" className="text-sm font-medium text-neutral-700 hover:bg-neutral-100">
              <Link href="/about">About</Link>
            </Button>
            <Button asChild variant="ghost" className="text-sm font-medium text-neutral-700 hover:bg-neutral-100">
              <Link href="/contact">Contact</Link>
            </Button>
            <Button asChild className="bg-orange-600 text-white hover:bg-orange-700 text-sm font-semibold">
              <Link href="/#quote">Request a Quote</Link>
            </Button>
          </nav>
        </div>
      </header>

      <main className="container mx-auto px-4 py-16 sm:py-24">
        <div className="flex flex-col items-center text-center">
          <Image
            src="/terraclay-logo.png"
            alt="Terra Clay Logo"
            width={900}
            height={300}
            className="mb-6 h-64 w-auto sm:h-80"
          />
          <h1 className="text-3xl font-extrabold tracking-tight sm:text-4xl">About TerraClay</h1>
          <p className="mt-4 max-w-2xl text-lg text-neutral-600 sm:text-xl">
            TerraClay specializes in premium Spanish clay tile roofing for high-end homes in New York. For over 20
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
              <Image src="/la-escandella-logo.webp" alt="La Escandella" width={80} height={40} className="h-6 w-auto" />
              <span>Proudly partnered with La Escandella.</span>
            </a>
          </div>
          <div className="text-center text-neutral-500">
            <p>&copy; {new Date().getFullYear()} Terra Clay. All Rights Reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  )
}
