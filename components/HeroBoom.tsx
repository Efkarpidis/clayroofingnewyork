// components/HeroBoom.tsx
'use client'

import Image from 'next/image'
import Link from 'next/link'

export function HeroBoom() {
  const bg = {
    src: '/gallery/vintage-red-villa.jpg',
    alt: 'Vintage red villa with luxury clay tile roof (favorite)',
  }

  return (
    <section className="relative isolate w-full min-h-[92vh] md:min-h-screen">
      {/* Background image */}
      <Image
        src={bg.src}
        alt={bg.alt}
        fill
        priority
        sizes="100vw"
        className="object-cover"
      />

      {/* Dark overlay */}
      <div className="absolute inset-0 bg-gradient-to-t from-black/65 via-black/35 to-black/10" />

      {/* Content */}
      <div className="relative z-10 mx-auto flex h-full max-w-7xl flex-col justify-end gap-6 px-4 pb-12 pt-28 sm:px-6 lg:px-8">
        {/* Badge */}
        <div className="inline-flex w-fit items-center gap-2 rounded-full border border-white/20 bg-white/10 px-3 py-1 text-xs font-semibold uppercase tracking-wide text-white/90 backdrop-blur">
          Spanish Clay • Slate Alternatives • NYC
        </div>

        {/* Headline */}
        <h1 className="max-w-3xl text-4xl font-extrabold leading-tight text-white sm:text-5xl md:text-6xl">
          Luxury Clay Tile Roofing <br className="hidden md:block" />
          Built for New York’s Finest Homes
        </h1>

        {/* Subheadline */}
        <p className="max-w-2xl text-base text-white/85 sm:text-lg">
          30+ years, 3,000+ roofs, 10 million tiles installed. Master craftsmanship with white-glove service.
        </p>

        {/* CTAs */}
        <div className="mt-2 flex flex-wrap gap-3">
          <Link
            href="/estimate"
            className="inline-flex items-center rounded-lg bg-orange-600 px-5 py-3 text-base font-semibold text-white shadow hover:bg-orange-700"
          >
            Free Estimate
          </Link>
          <Link
            href="/gallery"
            className="inline-flex items-center rounded-lg border border-white/30 bg-white/5 px-5 py-3 text-base font-semibold text-white backdrop-blur hover:bg-white/10"
          >
            View Projects
          </Link>
          <a
            href="tel:+13475550123"
            className="inline-flex items-center rounded-lg border border-white/30 bg-white/5 px-5 py-3 text-base font-semibold text-white backdrop-blur hover:bg-white/10"
          >
            Call (347) 555-0123
          </a>
        </div>

        {/* Trust stats */}
        <div className="mt-6 grid w-full grid-cols-2 gap-3 text-left text-white/85 sm:grid-cols-4">
          <div className="rounded-xl border border-white/15 bg-white/5 p-3">
            <div className="text-2xl font-bold text-white">30+ yrs</div>
            <div className="text-xs">Craftsmanship</div>
          </div>
          <div className="rounded-xl border border-white/15 bg-white/5 p-3">
            <div className="text-2xl font-bold text-white">3,000+</div>
            <div className="text-xs">Roofs Installed</div>
          </div>
          <div className="rounded-xl border border-white/15 bg-white/5 p-3">
            <div className="text-2xl font-bold text-white">10M+</div>
            <div className="text-xs">Tiles Placed</div>
          </div>
          <div className="rounded-xl border border-white/15 bg-white/5 p-3">
            <div className="text-2xl font-bold text-white">NYC</div>
            <div className="text-xs">Borough Specialists</div>
          </div>
        </div>
      </div>

      {/* Fade-out at bottom */}
      <div className="pointer-events-none absolute inset-x-0 bottom-0 h-24 bg-gradient-to-b from-transparent to-white" />
    </section>
  )
}
