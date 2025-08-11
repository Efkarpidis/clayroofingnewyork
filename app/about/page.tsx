import Link from "next/link"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { Phone } from "lucide-react"

export default function AboutPage() {
  return (
    <div className="bg-white text-neutral-800">
      <header className="sticky top-0 z-50 border-b border-neutral-200 bg-white shadow-sm">
        <div className="container mx-auto flex items-center justify-between px-4 py-4">
          <Link href="/" className="flex items-center">
            <Image src="/terraclay-logo.png" alt="Terra Clay" width={540} height={180} className="h-36 w-auto" />
          </Link>
          <nav className="flex flex-wrap items-center justify-end gap-1 sm:gap-2">
            <Button asChild variant="ghost" className="text-base">
              <a href="tel:2123654386" className="flex items-center">
                <Phone className="mr-2 h-4 w-4" />
                212-365-4386
              </a>
            </Button>
            <Button asChild variant="ghost" className="text-base">
              <Link href="/gallery">Gallery</Link>
            </Button>
            <Button asChild variant="ghost" className="text-base">
              <Link href="/contact">Contact</Link>
            </Button>
            <Button asChild variant="default">
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
            className="mb-6 h-60 w-auto sm:h-72"
          />
          <h1 className="text-3xl font-extrabold tracking-tight sm:text-4xl">About TerraClay</h1>
          <p className="mt-4 max-w-2xl text-lg text-neutral-600 sm:text-xl">
            TerraClay specializes in premium Spanish clay tile roofing for high-end homes in New York. For over 20
            years, we've delivered quality, durability, and craftsmanship to every project.
          </p>
        </div>
      </main>

      <footer className="border-t border-neutral-200 bg-neutral-50">
        <div className="container mx-auto px-4 py-6 text-center text-neutral-500">
          <p>&copy; {new Date().getFullYear()} Terra Clay. All Rights Reserved.</p>
        </div>
      </footer>
    </div>
  )
}
