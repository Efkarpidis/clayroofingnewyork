"use client"

import { Phone } from "lucide-react"

interface StickyCallBarProps {
  isHidden?: boolean
}

export function StickyCallBar({ isHidden = false }: StickyCallBarProps) {
  if (isHidden) return null

  return (
    <div className="fixed bottom-0 left-0 right-0 z-40 pointer-events-none pb-safe">
      <div className="flex justify-center pb-4 px-4">
        <a
          href="tel:+12123654386"
          className="pointer-events-auto flex items-center gap-2 rounded-full bg-black/70 backdrop-blur-sm px-4 py-2.5 text-white shadow-lg transition-all duration-200 hover:bg-black/80 hover:shadow-xl active:scale-95 md:px-3 md:py-2 md:text-sm"
          style={{
            minHeight: "44px",
            paddingBottom: "max(10px, env(safe-area-inset-bottom, 10px))",
          }}
        >
          <Phone className="h-4 w-4 md:h-3.5 md:w-3.5" />
          <span className="font-medium whitespace-nowrap">Call (212) 365-4386</span>
        </a>
      </div>
    </div>
  )
}
