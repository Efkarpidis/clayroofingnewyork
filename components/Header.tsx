"use client"

import { useState, useEffect } from "react"
import Image from "next/image"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { Button } from "@/components/ui/button"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { Phone, ChevronDown } from "lucide-react"

export function Header() {
  const [scrolled, setScrolled] = useState(false)
  const pathname = usePathname()

  // Determine current page based on pathname
  const getCurrentPage = () => {
    if (pathname === "/") return "home"
    if (pathname === "/about") return "about"
    if (pathname === "/contact") return "contact"
    if (pathname === "/gallery") return "gallery"
    if (pathname.startsWith("/tile-selection")) return "tile-selection"
    return "home"
  }

  const currentPage = getCurrentPage()

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
        {/* Logo Section - Centered */}
        <div className="py-4 sm:py-6">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <Link href="/" className="flex justify-center">
              <Image
                src="/clay-roofing-new-york-logo.png"
                alt="Clay Roofing New York - Specializing in Clay & Ceramic Tile Roofing"
                width={600}
                height={128}
                className="object-contain w-auto max-w-[400px] sm:max-w-[500px] md:max-w-[600px] lg:max-w-[600px]"
                priority
                sizes="(max-width: 640px) 400px, (max-width: 768px) 500px, 600px"
              />
            </Link>
          </div>
        </div>

        {/* Navigation Subheader - Full Width */}
        <div className="border-t border-gray-300 w-full bg-white shadow-md">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            {/* Desktop Navigation */}
            <nav className="hidden md:flex items-center justify-center text-center py-2 space-x-8">
              <a
                href="tel:2123654386"
                className="flex items-center gap-2 px-3 py-2 text-sm font-medium rounded-md transition-colors text-neutral-800 hover:text-orange-600 hover:bg-orange-100 tappable"
              >
                <Phone className="w-4 h-4 flex-shrink-0" />
                <span>212-365-4386</span>
              </a>
              <Link
                href="/gallery"
                className={`px-3 py-2 text-sm font-medium rounded-md transition-colors tappable ${
                  currentPage === "gallery"
                    ? "text-orange-600 bg-orange-100"
                    : "text-neutral-800 hover:text-orange-600 hover:bg-orange-100"
                }`}
              >
                Projects
              </Link>
              <Link
                href="/tile-selection"
                className={`px-3 py-2 text-sm font-medium rounded-md transition-colors tappable ${
                  currentPage === "tile-selection"
                    ? "text-orange-600 bg-orange-100"
                    : "text-neutral-800 hover:text-orange-600 hover:bg-orange-100"
                }`}
              >
                Tile Selection
              </Link>
              <Link
                href="/about"
                className={`px-3 py-2 text-sm font-medium rounded-md transition-colors tappable ${
                  currentPage === "about"
                    ? "text-orange-600 bg-orange-100"
                    : "text-neutral-800 hover:text-orange-600 hover:bg-orange-100"
                }`}
              >
                About
              </Link>
              <Link
                href="/contact"
                className={`px-3 py-2 text-sm font-medium rounded-md transition-colors tappable ${
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
                    className="bg-gradient-to-r from-orange-600 to-orange-700 text-white hover:from-orange-700 hover:to-orange-800 text-xs font-semibold transition-all shadow-lg hover:shadow-xl cursor-pointer h-9 px-4"
                  >
                    Request Quote
                  </Button>
                </Link>
              )}
            </nav>

            {/* Mobile Navigation Dropdown */}
            <div className="md:hidden text-center py-2 flex justify-center">
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button
                    variant="outline"
                    className="flex items-center gap-2 px-4 py-2 text-sm font-medium border-neutral-300 text-neutral-800 hover:bg-orange-100 hover:text-orange-700 hover:border-orange-300 transition-colors tappable bg-white"
                  >
                    Menu
                    <ChevronDown className="h-4 w-4" />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="center" className="w-56 mt-2">
                  <DropdownMenuItem asChild>
                    <a
                      href="tel:2123654386"
                      className="flex items-center gap-3 px-3 py-3 text-base font-semibold text-orange-600 bg-orange-50 rounded-md cursor-pointer"
                    >
                      <Phone className="w-5 h-5 flex-shrink-0" />
                      <span>Call: 212-365-4386</span>
                    </a>
                  </DropdownMenuItem>
                  <DropdownMenuItem asChild>
                    <Link
                      href="/"
                      className={`flex items-center px-3 py-3 text-base font-medium rounded-md cursor-pointer ${
                        currentPage === "home"
                          ? "text-orange-600 bg-orange-50"
                          : "text-neutral-700 hover:text-neutral-900 hover:bg-neutral-50"
                      }`}
                    >
                      Home
                    </Link>
                  </DropdownMenuItem>
                  <DropdownMenuItem asChild>
                    <Link
                      href="/gallery"
                      className={`flex items-center px-3 py-3 text-base font-medium rounded-md cursor-pointer ${
                        currentPage === "gallery"
                          ? "text-orange-600 bg-orange-50"
                          : "text-neutral-700 hover:text-neutral-900 hover:bg-neutral-50"
                      }`}
                    >
                      Projects
                    </Link>
                  </DropdownMenuItem>
                  <DropdownMenuItem asChild>
                    <Link
                      href="/tile-selection"
                      className={`flex items-center px-3 py-3 text-base font-medium rounded-md cursor-pointer ${
                        currentPage === "tile-selection"
                          ? "text-orange-600 bg-orange-50"
                          : "text-neutral-700 hover:text-neutral-900 hover:bg-neutral-50"
                      }`}
                    >
                      Tile Selection
                    </Link>
                  </DropdownMenuItem>
                  <DropdownMenuItem asChild>
                    <Link
                      href="/about"
                      className={`flex items-center px-3 py-3 text-base font-medium rounded-md cursor-pointer ${
                        currentPage === "about"
                          ? "text-orange-600 bg-orange-50"
                          : "text-neutral-700 hover:text-neutral-900 hover:bg-neutral-50"
                      }`}
                    >
                      About
                    </Link>
                  </DropdownMenuItem>
                  <DropdownMenuItem asChild>
                    <Link
                      href="/contact"
                      className={`flex items-center px-3 py-3 text-base font-medium rounded-md cursor-pointer ${
                        currentPage === "contact"
                          ? "text-orange-600 bg-orange-50"
                          : "text-neutral-700 hover:text-neutral-900 hover:bg-neutral-50"
                      }`}
                    >
                      Contact
                    </Link>
                  </DropdownMenuItem>
                  {currentPage !== "contact" && (
                    <DropdownMenuItem asChild>
                      <Link
                        href="/contact#quote"
                        className="flex items-center px-3 py-3 text-base font-bold text-white bg-gradient-to-r from-orange-600 to-orange-700 hover:from-orange-700 hover:to-orange-800 rounded-md cursor-pointer mt-2"
                      >
                        Request Quote
                      </Link>
                    </DropdownMenuItem>
                  )}
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
          </div>
        </div>
      </div>
    </header>
  )
}
