import Image from "next/image"
import { StickyCallBar } from "@/components/sticky-call-bar"
import { ScrollHeader } from "@/components/scroll-header"

export default function AboutPage() {
  return (
    <>
      <div className="bg-white text-neutral-800">
        <ScrollHeader currentPage="about" />

        <main className="container mx-auto px-4 py-16 sm:py-24 pb-20 pt-20">
          <div className="flex flex-col items-center text-center">
            <div className="flex items-center gap-4 mb-8">
              <Image
                src="/clay-tile-logo.png"
                alt="Clay Roofs New York - Clay Tile Icon"
                width={80}
                height={80}
                className="h-16 w-16 sm:h-20 sm:w-20 md:h-24 md:w-24 object-contain"
              />
              <div className="text-left">
                <h1 className="text-2xl sm:text-3xl md:text-4xl font-extrabold tracking-tight text-neutral-900">
                  CLAY ROOFS NEW YORK
                </h1>
                <p className="text-sm sm:text-base md:text-lg text-neutral-600 font-medium">
                  Specializing in Clay & Ceramic Roofing
                </p>
              </div>
            </div>
            <p className="mt-4 max-w-2xl text-lg text-neutral-600 sm:text-xl">
              Clay Roofs New York specializes in premium Spanish clay tile roofing for high-end homes in New York. For
              over 20 years, we've delivered quality, durability, and craftsmanship to every project.
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
              <p>&copy; {new Date().getFullYear()} Clay Roofs New York. All Rights Reserved.</p>
            </div>
          </div>
        </footer>
      </div>

      <StickyCallBar />
    </>
  )
}
