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
    <header className="fixed top-0 left-0 right-0 z-40 transition-all duration-300 ease-in-out">
      <div
        className={`transition-all duration-300 ease-in-out ${
          scrolled
            ? "bg-white/95 backdrop-blur-md border-b border-neutral-200 shadow-lg"
            : "bg-white/90 backdrop-blur-sm border-b border-neutral-100/50 shadow-sm"
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div
            className={`flex items-center justify-between transition-all duration-300 ease-in-out ${
              scrolled ? "h-16 sm:h-18" : "h-18 sm:h-20 md:h-22"
            }`}
          >
            {/* Logo - Fully Left Aligned */}
            <Link href="/" className="flex items-center flex-shrink-0 -ml-2 sm:-ml-3 lg:-ml-4">
              <Image
                src="/clay-roofing-new-york-logo.png"
                alt="Clay Roofing New York - Specializing in Clay & Ceramic Tile Roofing"
                width={320}
                height={68}
                className={`object-contain transition-all duration-300 ease-in-out ${
                  scrolled ? "h-10 sm:h-11 md:h-12 min-h-[40px]" : "h-12 sm:h-13 md:h-14 lg:h-15 min-h-[48px]"
                }`}
                priority
              />
            </Link>

            {/* Mobile Menu */}
            <div className="md:hidden flex items-center">
              <Button
                asChild
                size="sm"
                className="bg-gradient-to-r from-orange-600 to-orange-700 text-white hover:from-orange-700 hover:to-orange-800 text-xs font-semibold transition-all h-8 mr-3 shadow-md hover:shadow-lg"
              >
                <Link href={currentPage === "home" ? "#quote" : "/#quote"}>Request Quote</Link>
              </Button>
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button
                    variant="ghost"
                    size="icon"
                    className={`h-8 w-8 transition-colors ${
                      scrolled
                        ? "text-neutral-800 hover:bg-orange-100 hover:text-orange-700"
                        : "text-neutral-700 hover:bg-orange-100/50 hover:text-orange-700"
                    }`}
                  >
                    <Menu className="h-5 w-5" />
                    <span className="sr-only">Toggle menu</span>
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end" className="w-56 bg-white/95 backdrop-blur-sm border-orange-100">
                  <DropdownMenuItem asChild>
                    <a
                      href="tel:2123654386"
                      className="flex items-center gap-2 px-2 py-2 text-sm font-medium text-neutral-700 hover:text-orange-600 hover:bg-orange-50 transition-colors cursor-pointer"
                    >
                      <Phone className="w-4 h-4" />
                      212-365-4386
                    </a>
                  </DropdownMenuItem>
                  <DropdownMenuItem asChild>
                    <Link
                      href="/"
                      className={`px-2 py-2 text-sm font-medium transition-colors cursor-pointer ${
                        currentPage === "home"
                          ? "text-orange-600 bg-gradient-to-r from-orange-50 to-orange-100 hover:from-orange-100 hover:to-orange-150 rounded-md"
                          : "text-neutral-700 hover:text-orange-600 hover:bg-orange-50"
                      }`}
                    >
                      Home
                    </Link>
                  </DropdownMenuItem>
                  <DropdownMenuItem asChild>
                    <Link
                      href="/gallery"
                      className={`px-2 py-2 text-sm font-medium transition-colors cursor-pointer ${
                        currentPage === "gallery"
                          ? "text-orange-600 bg-gradient-to-r from-orange-50 to-orange-100 hover:from-orange-100 hover:to-orange-150 rounded-md"
                          : "text-neutral-700 hover:text-orange-600 hover:bg-orange-50"
                      }`}
                    >
                      Projects
                    </Link>
                  </DropdownMenuItem>
                  <DropdownMenuItem asChild>
                    <Link
                      href="/tile-selection"
                      className={`px-2 py-2 text-sm font-medium transition-colors cursor-pointer ${
                        currentPage === "tile-selection"
                          ? "text-orange-600 bg-gradient-to-r from-orange-50 to-orange-100 hover:from-orange-100 hover:to-orange-150 rounded-md"
                          : "text-neutral-700 hover:text-orange-600 hover:bg-orange-50"
                      }`}
                    >
                      Tile Selection
                    </Link>
                  </DropdownMenuItem>
                  <DropdownMenuItem asChild>
                    <Link
                      href="/about"
                      className={`px-2 py-2 text-sm font-medium transition-colors cursor-pointer ${
                        currentPage === "about"
                          ? "text-orange-600 bg-gradient-to-r from-orange-50 to-orange-100 hover:from-orange-100 hover:to-orange-150 rounded-md"
                          : "text-neutral-700 hover:text-orange-600 hover:bg-orange-50"
                      }`}
                    >
                      About
                    </Link>
                  </DropdownMenuItem>
                  <DropdownMenuItem asChild>
                    <Link
                      href="/contact"
                      className={`px-2 py-2 text-sm font-medium transition-colors cursor-pointer ${
                        currentPage === "contact"
                          ? "text-orange-600 bg-gradient-to-r from-orange-50 to-orange-100 hover:from-orange-100 hover:to-orange-150 rounded-md"
                          : "text-neutral-700 hover:text-orange-600 hover:bg-orange-50"
                      }`}
                    >
                      Contact
                    </Link>
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>

            {/* Desktop Navigation */}
            <nav className="hidden md:flex items-center space-x-3 lg:space-x-4 xl:space-x-6">
              <a
                href="tel:2123654386"
                className={`flex items-center gap-2 px-3 py-2 text-sm font-medium rounded-md transition-colors whitespace-nowrap ${
                  scrolled
                    ? "text-neutral-800 hover:text-orange-600 hover:bg-orange-100"
                    : "text-neutral-700 hover:text-orange-600 hover:bg-orange-100/50"
                }`}
              >
                <Phone className="w-4 h-4 flex-shrink-0" />
                <span className="hidden lg:inline">212-365-4386</span>
                <span className="lg:hidden">Call</span>
              </a>
              <Link
                href="/gallery"
                className={`px-3 py-2 text-sm font-medium rounded-md transition-colors whitespace-nowrap ${
                  currentPage === "gallery"
                    ? "text-orange-600 bg-orange-100"
                    : scrolled
                      ? "text-neutral-800 hover:text-orange-600 hover:bg-orange-100"
                      : "text-neutral-700 hover:text-orange-600 hover:bg-orange-100/50"
                }`}
              >
                Projects
              </Link>
              <Link
                href="/tile-selection"
                className={`px-3 py-2 text-sm font-medium rounded-md transition-colors whitespace-nowrap ${
                  currentPage === "tile-selection"
                    ? "text-orange-600 bg-orange-100"
                    : scrolled
                      ? "text-neutral-800 hover:text-orange-600 hover:bg-orange-100"
                      : "text-neutral-700 hover:text-orange-600 hover:bg-orange-100/50"
                }`}
              >
                Tile Selection
              </Link>
              <Link
                href="/about"
                className={`px-3 py-2 text-sm font-medium rounded-md transition-colors whitespace-nowrap ${
                  currentPage === "about"
                    ? "text-orange-600 bg-orange-100"
                    : scrolled
                      ? "text-neutral-800 hover:text-orange-600 hover:bg-orange-100"
                      : "text-neutral-700 hover:text-orange-600 hover:bg-orange-100/50"
                }`}
              >
                About
              </Link>
              <Link
                href="/contact"
                className={`px-3 py-2 text-sm font-medium rounded-md transition-colors whitespace-nowrap ${
                  currentPage === "contact"
                    ? "text-orange-600 bg-orange-100"
                    : scrolled
                      ? "text-neutral-800 hover:text-orange-600 hover:bg-orange-100"
                      : "text-neutral-700 hover:text-orange-600 hover:bg-orange-100/50"
                }`}
              >
                Contact
              </Link>
              <Button
                asChild
                size="sm"
                className={`bg-gradient-to-r from-orange-600 to-orange-700 text-white hover:from-orange-700 hover:to-orange-800 text-xs font-semibold transition-all h-9 px-4 whitespace-nowrap ${
                  scrolled ? "shadow-lg hover:shadow-xl" : "shadow-md hover:shadow-lg"
                }`}
              >
                <Link href={currentPage === "home" ? "#quote" : "/#quote"}>Request Quote</Link>
              </Button>
            </nav>
          </div>
        </div>
      </div>
    </header>
  )
}
