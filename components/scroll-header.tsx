"use client"

import { useState, useEffect } from "react"
import Image from "next/image"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { Menu, Phone } from "lucide-react"

interface ScrollHeaderProps {
  currentPage?: "home" | "about" | "contact" | "gallery" | "tile-selection"
}

export function ScrollHeader({ currentPage = "home" }: ScrollHeaderProps) {
  const [scrolled, setScrolled] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = window.scrollY
      setScrolled(scrollPosition > 50)
    }

    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  return (
    <header className="sticky top-0 left-0 right-0 z-[1000]">
      <div
        className={`transition-all duration-300 ease-in-out ${
          scrolled
            ? "bg-white/95 backdrop-blur-md border-b border-neutral-200 shadow-lg"
            : "bg-white/90 backdrop-blur-sm border-b border-neutral-100/50 shadow-sm"
        }`}
      >
        <div className="max-w-7xl mx-auto px-3 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16 sm:h-18 lg:h-20">
            {/* Logo - Left Aligned with improved mobile sizing */}
            <Link href="/" className="flex items-center flex-1 md:flex-initial flex-shrink-0 min-w-0 mr-4">
              <Image
                src="/clay-roofing-new-york-logo.png"
                alt="Clay Roofing New York - Specializing in Clay & Ceramic Tile Roofing"
                width={320}
                height={68}
                className={`object-contain w-auto ${
                  currentPage === "contact"
                    ? "h-12 sm:h-12 md:h-14 lg:h-16 max-w-[280px] sm:max-w-[300px] md:max-w-[360px]"
                    : "h-10 sm:h-8 md:h-10 lg:h-12 max-w-[240px] sm:max-w-[280px] md:max-w-[320px]"
                }`}
                priority
              />
            </Link>

            {/* Mobile Menu - Only burger button on mobile */}
            <div className="flex items-center md:hidden flex-shrink-0">
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button
                    variant="ghost"
                    size="icon"
                    className="tappable text-neutral-800 hover:bg-orange-100 hover:text-orange-700 min-w-[44px] min-h-[44px] w-11 h-11"
                  >
                    <Menu className="h-5 w-5" />
                    <span className="sr-only">Toggle menu</span>
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent
                  align="end"
                  className="w-full min-w-[280px] bg-white/95 backdrop-blur-sm border-orange-100 animate-in slide-in-from-top-2 fade-in-0 duration-200"
                >
                  <DropdownMenuItem asChild>
                    <a
                      href="tel:2123654386"
                      className="flex items-center gap-3 px-4 py-3 text-base font-medium text-neutral-700 hover:text-orange-600 hover:bg-orange-50 transition-colors cursor-pointer tappable min-h-[48px]"
                    >
                      <Phone className="w-5 h-5" />
                      212-365-4386
                    </a>
                  </DropdownMenuItem>
                  <DropdownMenuItem asChild>
                    <Link
                      href="/"
                      className={`flex items-center px-4 py-3 text-base font-medium transition-colors cursor-pointer tappable min-h-[48px] ${
                        currentPage === "home"
                          ? "text-orange-600 bg-gradient-to-r from-orange-50 to-orange-100"
                          : "text-neutral-700 hover:text-orange-600 hover:bg-orange-50"
                      }`}
                    >
                      Home
                    </Link>
                  </DropdownMenuItem>
                  <DropdownMenuItem asChild>
                    <Link
                      href="/gallery"
                      className={`flex items-center px-4 py-3 text-base font-medium transition-colors cursor-pointer tappable min-h-[48px] ${
                        currentPage === "gallery"
                          ? "text-orange-600 bg-gradient-to-r from-orange-50 to-orange-100"
                          : "text-neutral-700 hover:text-orange-600 hover:bg-orange-50"
                      }`}
                    >
                      Projects
                    </Link>
                  </DropdownMenuItem>
                  <DropdownMenuItem asChild>
                    <Link
                      href="/tile-selection"
                      className={`flex items-center px-4 py-3 text-base font-medium transition-colors cursor-pointer tappable min-h-[48px] ${
                        currentPage === "tile-selection"
                          ? "text-orange-600 bg-gradient-to-r from-orange-50 to-orange-100"
                          : "text-neutral-700 hover:text-orange-600 hover:bg-orange-50"
                      }`}
                    >
                      Tile Selection
                    </Link>
                  </DropdownMenuItem>
                  <DropdownMenuItem asChild>
                    <Link
                      href="/about"
                      className={`flex items-center px-4 py-3 text-base font-medium transition-colors cursor-pointer tappable min-h-[48px] ${
                        currentPage === "about"
                          ? "text-orange-600 bg-gradient-to-r from-orange-50 to-orange-100"
                          : "text-neutral-700 hover:text-orange-600 hover:bg-orange-50"
                      }`}
                    >
                      About
                    </Link>
                  </DropdownMenuItem>
                  <DropdownMenuItem asChild>
                    <Link
                      href="/contact"
                      className={`flex items-center px-4 py-3 text-base font-medium transition-colors cursor-pointer tappable min-h-[48px] ${
                        currentPage === "contact"
                          ? "text-orange-600 bg-gradient-to-r from-orange-50 to-orange-100"
                          : "text-neutral-700 hover:text-orange-600 hover:bg-orange-50"
                      }`}
                    >
                      Contact
                    </Link>
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>

            {/* Desktop Navigation - Hidden on mobile */}
            <nav className="hidden md:flex items-center space-x-3 lg:space-x-4 xl:space-x-6">
              <a
                href="tel:2123654386"
                className="flex items-center gap-2 px-3 py-2 text-sm font-medium rounded-md transition-colors whitespace-nowrap text-neutral-800 hover:text-orange-600 hover:bg-orange-100 tappable"
              >
                <Phone className="w-4 h-4 flex-shrink-0" />
                <span className="hidden lg:inline">212-365-4386</span>
                <span className="lg:hidden">Call</span>
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
          </div>
        </div>
      </div>
    </header>
  )
}
