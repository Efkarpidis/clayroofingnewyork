"use client"

import { Phone } from "lucide-react"

interface StickyCallBarProps {
  isHidden?: boolean
}

export function StickyCallBar({ isHidden = false }: StickyCallBarProps) {
  if (isHidden) return null

  return (
    <div className="fixed bottom-4 left-4 right-4 md:left-1/2 md:right-auto md:transform md:-translate-x-1/2 z-40 pointer-events-none">
      <a
        href="tel:+12123654386"
        className="inline-flex items-center justify-center gap-3 w-full md:w-auto px-6 py-4 md:px-4 md:py-2 bg-black/70 backdrop-blur-sm text-white rounded-full shadow-lg hover:bg-black/80 hover:shadow-xl transition-all duration-200 active:scale-95 pointer-events-auto text-lg md:text-sm font-semibold md:font-medium min-h-[56px] md:min-h-[44px] pb-safe"
      >
        <Phone className="w-5 h-5 md:w-4 md:h-4" />
        Call (212) 365-4386
      </a>
    </div>
  )
}
