// app/home2/page.tsx
import type { Metadata } from 'next'
import Link from 'next/link'

// Adjust the paths depending on your setup:
// - If app/ and components/ are both at project root, use ../../components/...
// - If you use src/app/, then it’s ../../../components/...
import { HeroBoom } from '../../components/HeroBoom'
import { HeroShowcase } from '../../components/HeroShowcase'

export const metadata: Metadata = {
  title: 'Clay Roofing NY — Alt Landing',
  description: 'Alternative landing layout for internal review',
  robots: { index: false, follow: false }, // keeps it hidden from Google
}

export default function AltLanding() {
  return (
    <>
      {/* Full-screen hero */}
      <HeroBoom />

      {/* Collage showcase */}
      <HeroShowcase />

      {/* Feature grid */}
      <section className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid gap-8 md:grid-cols-3">
          <div className="rounded-2xl border border-neutral-200 p-6">
            <h3 className="text-lg font-semibold">Lifetime Materials</h3>
            <p className="mt-2 text-sm text-neutral-600">
              Spanish clay tiles, slate alternatives, and premium underlayments engineered for NYC winters.
            </p>
          </div>
          <div className="rounded-2xl border border-neutral-200 p-6">
            <h3 className="text-lg font-semibold">Master Installers</h3>
            <p className="mt-2 text-sm text-neutral-600">
              30+ years, 3,000+ roofs, precision flashing & waterproofing.
            </p>
          </div>
          <div className="rounded-2xl border border-neutral-200 p-6">
            <h3 className="text-lg font-semibold">White-Glove Process</h3>
            <p className="mt-2 text-sm text-neutral-600">
              Clear proposals, clean job sites, daily photo updates.
            </p>
          </div>
        </div>

        <div className="mt-10 flex gap-3">
          <Link
            href="/estimate"
            className="inline-flex items-center rounded-md px-4 py-2 bg-orange-600 text-white hover:bg-orange-700"
          >
            Free Estimate
          </Link>
          <Link
            href="/gallery"
            className="inline-flex items-center rounded-md px-4 py-2 border border-neutral-300 hover:bg-neutral-50"
          >
            View Projects
          </Link>
        </div>
      </section>
    </>
  )
}
