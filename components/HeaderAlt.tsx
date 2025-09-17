// components/HeaderAlt.tsx
'use client'

import * as React from 'react'
import Link from 'next/link'
import { cn } from '@/lib/utils' // if you don't have this, replace cn(...) with template strings

export default function HeaderAlt() {
  const [scrolled, setScrolled] = React.useState(false)
  const [mounted, setMounted] = React.useState(false)

  React.useEffect(() => {
    setMounted(true)
    const onScroll = () => setScrolled(window.scrollY > 8)
    onScroll()
    window.addEventListener('scroll', onScroll)
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  return (
    <header
      className={cn(
        // transparent over hero, fades to solid as we mount/scroll
        'fixed inset-x-0 top-0 z-50 transition-colors duration-500',
        scrolled ? 'bg-white/90 backdrop-blur shadow-sm' : 'bg-transparent'
      )}
      style={{ opacity: mounted ? 1 : 0, transition: 'opacity 500ms ease' }}
      aria-label="Clay Roofing New York – Alternate Header"
    >
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
        {/* Logo */}
        <Link href="/" className="flex items-center gap-2">
          <span className="inline-block h-6 w-6 rounded-sm bg-orange-600" />
          <span className={cn(
            'text-base font-semibold tracking-tight',
            scrolled ? 'text-neutral-900' : 'text-white drop-shadow'
          )}>
            Clay Roofing New York
          </span>
        </Link>

        {/* Minimal nav (keep simple for alt landing). Add more links if you like */}
        <nav className="hidden md:flex items-center gap-6">
          <Link href="/gallery" className={cn('text-sm font-medium', scrolled ? 'text-neutral-700 hover:text-neutral-900' : 'text-white hover:text-white/90')}>Projects</Link>
          <Link href="/about" className={cn('text-sm font-medium', scrolled ? 'text-neutral-700 hover:text-neutral-900' : 'text-white hover:text-white/90')}>About</Link>
          <Link
            href="/estimate"
            className={cn(
              'rounded-md px-3 py-2 text-sm font-semibold transition-colors',
              scrolled
                ? 'bg-orange-600 text-white hover:bg-orange-700'
                : 'bg-white/15 text-white backdrop-blur hover:bg-white/25'
            )}
          >
            Free Estimate
          </Link>
        </nav>

        {/* Mobile: simple call button */}
        <a
          href="tel:+13475550123"
          className={cn(
            'md:hidden rounded-md px-3 py-2 text-sm font-semibold',
            scrolled ? 'bg-orange-600 text-white' : 'bg-white/15 text-white backdrop-blur'
          )}
        >
          Call
        </a>
      </div>
    </header>
  )
}
