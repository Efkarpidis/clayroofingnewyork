import Image from "next/image"
import { StickyCallBar } from "@/components/sticky-call-bar"

export default function AboutPage() {
  return (
    <>
      <div className="text-neutral-800">
        <main className="container mx-auto px-4 py-16 sm:py-24 pb-20 pt-20">
          <div className="flex flex-col items-center text-center">
            <div className="flex items-center gap-4 mb-8">
              <Image
                src="/clay-roofing-new-york-logo.png"
                alt="Clay Roofing New York - Specializing in Clay & Ceramic Tile Roofing"
                width={400}
                height={85}
                className="h-16 sm:h-20 md:h-24 w-auto object-contain"
              />
            </div>
            <p className="mt-4 max-w-2xl text-lg text-neutral-600 sm:text-xl">
              Clay Roofs New York specializes in premium clay and ceramic tile roofing for homes in the Tri-State area.
              For over 30 years, we've delivered quality, durability, and craftsmanship to every project.
            </p>
          </div>
        </main>

        <footer className="border-t bg-[#e8d9b8] text-background bg-[rgba(243,236,218,1)] border-popover-foreground">
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
