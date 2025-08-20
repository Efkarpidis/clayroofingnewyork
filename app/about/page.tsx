import Image from "next/image"
import { StickyCallBar } from "@/components/sticky-call-bar"
import { ScrollHeader } from "@/components/scroll-header"

export default function AboutPage() {
  return (
    <>
      <div className="bg-white text-neutral-800">
        <ScrollHeader currentPage="about" />

        <main className="container mx-auto px-4 py-16 sm:py-24 pb-20 pt-32">
          <div className="flex flex-col items-center text-center">
            <Image
              src="/clay-roofs-new-york-logo-final.png"
              alt="Clay Roofs New York Logo"
              width={800}
              height={240}
              className="mb-6 h-96 w-auto sm:h-[32rem] md:h-[40rem] lg:h-[48rem] object-contain"
            />
            <h1 className="text-3xl font-extrabold tracking-tight sm:text-4xl">About Clay Roofs New York</h1>
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
