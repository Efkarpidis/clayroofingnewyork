// components/HeroShowcase.tsx
'use client'
import Image from 'next/image'
import Link from 'next/link'

const images = [
  { src: '/gallery/vintage-red-villa.jpg', alt: 'Vintage red villa with luxury clay tile roof (favorite)', featured: true },
  { src: '/gallery/project-16.jpg', alt: 'Project 16 — clay tile roof project' },
  { src: '/gallery/terracotta-s-tile.jpg', alt: 'Terracotta S-tile close-up' },
  { src: '/gallery/slate-shake-main.jpg', alt: 'Slate shake alternative roof' },
  { src: '/gallery/project-24.jpg', alt: 'Project 24 — clay tile roof project' },
  { src: '/gallery/project-21.jpg', alt: 'Project 21 — clay tile roof project' },
]

export function HeroShowcase() {
  const featured = images.find(i => i.featured) ?? images[0]
  const gallery = images.filter(i => i.src !== featured.src)

  return (
    <section className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-10">
      <div className="mb-6 flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <h2 className="text-2xl font-semibold tracking-tight">Signature Roof Showcase</h2>
          <p className="text-neutral-600">Luxury clay, slate alternatives, and Mediterranean profiles across NYC.</p>
        </div>
        <div className="flex gap-2">
          <Link href="/gallery" className="inline-flex items-center rounded-md px-3 py-2 border border-neutral-300">View Full Gallery</Link>
          <Link href="/estimate" className="inline-flex items-center rounded-md px-3 py-2 bg-orange-600 text-white">Free Estimate</Link>
        </div>
      </div>

      <div className="grid grid-cols-1 gap-4 md:grid-cols-5">
        <div className="relative md:col-span-3 aspect-[3/2] overflow-hidden rounded-2xl">
          <Image src={featured.src} alt={featured.alt} fill priority sizes="(min-width:1024px) 60vw, 100vw" className="object-cover" />
          <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/35 via-black/10 to-transparent" />
          <div className="absolute bottom-0 left-0 p-4 sm:p-6">
            <h3 className="text-white text-lg sm:text-xl font-semibold drop-shadow">{featured.alt}</h3>
          </div>
        </div>

        <div className="md:col-span-2 grid grid-cols-2 gap-4">
          {gallery.slice(0,4).map((img) => (
            <div key={img.src} className="relative aspect-[4/3] overflow-hidden rounded-xl">
              <Image src={img.src} alt={img.alt} fill sizes="(min-width:1024px) 40vw, 100vw" className="object-cover" />
            </div>
          ))}
        </div>
      </div>

      {gallery.length > 4 && (
        <div className="mt-4 grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-4">
          {gallery.slice(4).map((img) => (
            <div key={img.src} className="relative aspect-[4/3] overflow-hidden rounded-xl">
              <Image src={img.src} alt={img.alt} fill className="object-cover" />
            </div>
          ))}
        </div>
      )}
    </section>
  )
}
