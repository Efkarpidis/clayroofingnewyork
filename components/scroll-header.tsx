"use client"

import { useState, useEffect } from "react"
import Image from "next/image"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Menu, Phone, X } from "lucide-react"

interface ScrollHeaderProps {
  currentPage?: "home" | "about" | "contact" | "gallery" | "tile-selection"
}

export function ScrollHeader({ currentPage = "home" }: ScrollHeaderProps) {
  const [scrolled, setScrolled] = useState(false)
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = window.scrollY
      setScrolled(scrollPosition > 50)
    }

    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  // Close menu when clicking outside or pressing escape
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      const target = event.target as Element
      if (mobileMenuOpen && !target.closest("[data-mobile-menu]")) {
        setMobileMenuOpen(false)
      }
    }

    const handleEscape = (event: KeyboardEvent) => {
      if (event.key === "Escape" && mobileMenuOpen) {
        setMobileMenuOpen(false)
      }
    }

    if (mobileMenuOpen) {
      document.addEventListener("mousedown", handleClickOutside)
      document.addEventListener("keydown", handleEscape)
      // Prevent body scroll when menu is open
      document.body.style.overflow = "hidden"
    } else {
      document.body.style.overflow = "unset"
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside)
      document.removeEventListener("keydown", handleEscape)
      document.body.style.overflow = "unset"
    }
  }, [mobileMenuOpen])

  const closeMobileMenu = () => {
    setMobileMenuOpen(false)
  }

  return (
    <>
      <header className="sticky top-0 left-0 right-0 z-[1000]" data-mobile-menu>
        <div
          className={`transition-all duration-300 ease-in-out ${
            scrolled
              ? "bg-white/95 backdrop-blur-md border-b border-neutral-200 shadow-lg"
              : "bg-white/90 backdrop-blur-sm border-b border-neutral-100/50 shadow-sm"
          }`}
        >
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex items-center justify-between h-14 sm:h-16 lg:h-20">
              {/* Logo - Left Aligned */}
              <Link href="/" className="flex items-center flex-shrink-0" onClick={closeMobileMenu}>
                <Image
                  src="/clay-roofing-new-york-logo.png"
                  alt="Clay Roofing New York - Specializing in Clay & Ceramic Tile Roofing"
                  width={320}
                  height={68}
                  className={`object-contain w-auto ${
                    currentPage === "contact"
                      ? "h-10 sm:h-12 md:h-14 lg:h-16 max-w-[180px] sm:max-w-[220px] md:max-w-[260px] lg:max-w-[300px]"
                      : "h-8 sm:h-10 md:h-12 lg:h-14 max-w-[160px] sm:max-w-[200px] md:max-w-[240px] lg:max-w-[280px]"
                  }`}
                  priority
                />
              </Link>

              {/* Desktop Navigation - Hidden on mobile/tablet */}
              <nav className="hidden lg:flex items-center space-x-4 xl:space-x-6">
                <a
                  href="tel:2123654386"
                  className="flex items-center gap-2 px-3 py-2 text-sm font-medium rounded-md transition-colors whitespace-nowrap text-neutral-800 hover:text-orange-600 hover:bg-orange-100 tappable"
                >
                  <Phone className="w-4 h-4 flex-shrink-0" />
                  <span>212-365-4386</span>
                </a>
                <Link
                  href="/gallery"
                  className={`px-3 py-2 text-sm font-medium rounded-md transition-colors whitespace-nowrap tappable ${
                    currentPage === "gallery"
                      ? "text-orange-600 bg-orange-100"
                      : "text-neutral-800 hover:text-orange-600 hover:bg-orange-100"
                  }`}
                >
                  Projects
                </Link>
                <Link
                  href="/tile-selection"
                  className={`px-3 py-2 text-sm font-medium rounded-md transition-colors whitespace-nowrap tappable ${
                    currentPage === "tile-selection"
                      ? "text-orange-600 bg-orange-100"
                      : "text-neutral-800 hover:text-orange-600 hover:bg-orange-100"
                  }`}
                >
                  Tile Selection
                </Link>
                <Link
                  href="/about"
                  className={`px-3 py-2 text-sm font-medium rounded-md transition-colors whitespace-nowrap tappable ${
                    currentPage === "about"
                      ? "text-orange-600 bg-orange-100"
                      : "text-neutral-800 hover:text-orange-600 hover:bg-orange-100"
                  }`}
                >
                  About
                </Link>
                <Link
                  href="/contact"
                  className={`px-3 py-2 text-sm font-medium rounded-md transition-colors whitespace-nowrap tappable ${
                    currentPage === "contact"
                      ? "text-orange-600 bg-orange-100"
                      : "text-neutral-800 hover:text-orange-600 hover:bg-orange-100"
                  }`}
                >
                  Contact
                </Link>
                {currentPage !== "contact" && (
                  <Link href="/contact#quote" className="tappable">
                    <Button
                      size="sm"
                      className="bg-gradient-to-r from-orange-600 to-orange-700 text-white hover:from-orange-700 hover:to-orange-800 text-xs font-semibold transition-all shadow-lg hover:shadow-xl cursor-pointer h-9 px-4 whitespace-nowrap"
                    >
                      Request Quote
                    </Button>
                  </Link>
                )}
              </nav>

              {/* Mobile Menu Button - Visible on mobile/tablet */}
              <button
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                className="lg:hidden flex items-center justify-center w-11 h-11 rounded-lg text-neutral-800 hover:bg-orange-100 hover:text-orange-700 transition-colors tappable active:scale-95"
                aria-label="Toggle menu"
                aria-expanded={mobileMenuOpen}
              >
                {mobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
              </button>
            </div>
          </div>

          {/* Mobile Dropdown Menu */}
          <div
            className={`lg:hidden overflow-hidden transition-all duration-300 ease-in-out ${
              mobileMenuOpen ? "max-h-screen opacity-100" : "max-h-0 opacity-0"
            }`}
            data-mobile-menu
          >
            <div className="border-t border-neutral-200 bg-white shadow-lg">
              <div className="max-w-7xl mx-auto px-4 sm:px-6 py-4">
                <nav className="flex flex-col space-y-2">
                  {/* Phone - First option */}
                  <a
                    href="tel:2123654386"
                    onClick={closeMobileMenu}
                    className="flex items-center gap-3 px-4 py-4 text-base font-semibold text-orange-600 bg-orange-50 rounded-lg transition-all active:scale-98 tappable border border-orange-100"
                  >
                    <Phone className="w-5 h-5 flex-shrink-0" />
                    <span>Call: 212-365-4386</span>
                  </a>

                  {/* Navigation Links - Vertical list */}
                  <Link
                    href="/"
                    onClick={closeMobileMenu}
                    className={`flex items-center px-4 py-4 text-lg font-medium rounded-lg transition-all active:scale-98 tappable ${
                      currentPage === "home"
                        ? "text-orange-600 bg-orange-50 border border-orange-100"
                        : "text-neutral-700 hover:text-neutral-900 hover:bg-neutral-50 active:bg-neutral-100"
                    }`}
                  >
                    Home
                  </Link>

                  <Link
                    href="/gallery"
                    onClick={closeMobileMenu}
                    className={`flex items-center px-4 py-4 text-lg font-medium rounded-lg transition-all active:scale-98 tappable ${
                      currentPage === "gallery"
                        ? "text-orange-600 bg-orange-50 border border-orange-100"
                        : "text-neutral-700 hover:text-neutral-900 hover:bg-neutral-50 active:bg-neutral-100"
                    }`}
                  >
                    Projects
                  </Link>

                  <Link
                    href="/tile-selection"
                    onClick={closeMobileMenu}
                    className={`flex items-center px-4 py-4 text-lg font-medium rounded-lg transition-all active:scale-98 tappable ${
                      currentPage === "tile-selection"
                        ? "text-orange-600 bg-orange-50 border border-orange-100"
                        : "text-neutral-700 hover:text-neutral-900 hover:bg-neutral-50 active:bg-neutral-100"
                    }`}
                  >
                    Tile Selection
                  </Link>

                  <Link
                    href="/about"
                    onClick={closeMobileMenu}
                    className={`flex items-center px-4 py-4 text-lg font-medium rounded-lg transition-all active:scale-98 tappable ${
                      currentPage === "about"
                        ? "text-orange-600 bg-orange-50 border border-orange-100"
                        : "text-neutral-700 hover:text-neutral-900 hover:bg-neutral-50 active:bg-neutral-100"
                    }`}
                  >
                    About
                  </Link>

                  <Link
                    href="/contact"
                    onClick={closeMobileMenu}
                    className={`flex items-center px-4 py-4 text-lg font-medium rounded-lg transition-all active:scale-98 tappable ${
                      currentPage === "contact"
                        ? "text-orange-600 bg-orange-50 border border-orange-100"
                        : "text-neutral-700 hover:text-neutral-900 hover:bg-neutral-50 active:bg-neutral-100"
                    }`}
                  >
                    Contact
                  </Link>

                  {/* Request Quote Button - Last option */}
                  {currentPage !== "contact" && (
                    <Link href="/contact#quote" onClick={closeMobileMenu} className="tappable">
                      <Button className="w-full bg-gradient-to-r from-orange-600 to-orange-700 text-white hover:from-orange-700 hover:to-orange-800 font-bold text-lg transition-all shadow-lg hover:shadow-xl cursor-pointer h-14 rounded-lg active:scale-98 mt-2">
                        Request Quote
                      </Button>
                    </Link>
                  )}
                </nav>
              </div>
            </div>
          </div>
        </div>
      </header>

      {/* Mobile Menu Backdrop */}
      {mobileMenuOpen && <div className="fixed inset-0 bg-black/20 z-[999] lg:hidden" onClick={closeMobileMenu} />}
    </>
  )
}
