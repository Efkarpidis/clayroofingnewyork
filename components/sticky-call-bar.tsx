"use client"

import { Phone } from "lucide-react"

interface StickyCallBarProps {
  isHidden?: boolean
}

export function StickyCallBar({ isHidden = false }: StickyCallBarProps) {
  if (isHidden) return null

  return (
    <div className="fixed bottom-4 left-1/2 transform -translate-x-1/2 z-40 pointer-events-none">
      <a
        href="tel:+12123654386"
        className="inline-flex items-center gap-2 px-4 py-2 md:px-3 md:py-1.5 bg-black/70 backdrop-blur-sm text-white rounded-full shadow-lg hover:bg-black/80 hover:shadow-xl transition-all duration-200 active:scale-95 pointer-events-auto text-sm md:text-xs font-medium min-h-[44px] md:min-h-[40px] pb-safe"
      >
        <Phone className="w-4 h-4 md:w-3.5 md:h-3.5" />
        Call (212) 365-4386
      </a>
    </div>
  )
}
