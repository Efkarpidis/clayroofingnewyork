"use client"

import { useState, useEffect } from "react"
import Image from "next/image"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { Menu, Phone } from "lucide-react"

interface ScrollHeaderProps {
  currentPage?: "home" | "about" | "contact" | "gallery"
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
            ? "bg-white/95 backdrop-blur-md border-b border-orange-200 shadow-lg"
            : "bg-gradient-to-r from-orange-50 via-white to-orange-50 backdrop-blur-sm border-b border-orange-100/50 shadow-sm"
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div
            className={`flex items-center justify-between transition-all duration-300 ease-in-out ${
              scrolled ? "h-20 sm:h-24" : "h-36 sm:h-44 md:h-52 lg:h-60 xl:h-68"
            }`}
          >
            {/* Logo */}
            <Link href="/" className="flex items-center flex-shrink-0">
              <Image
                src="/clay-roofs-new-york-logo-final.png"
                alt="Clay Roofs New York - Specializing in Clay and Ceramic Roofing"
                width={500}
                height={150}
                className={`object-contain drop-shadow-sm transition-all duration-300 ease-in-out ${
                  scrolled ? "h-16 w-auto sm:h-20" : "h-32 w-auto sm:h-40 md:h-48 lg:h-56 xl:h-64"
                }`}
              />
            </Link>

            {/* Mobile Menu */}
            <div className="md:hidden">
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button
                    variant="ghost"
                    size="icon"
                    className={`transition-colors ${
                      scrolled
                        ? "text-neutral-800 hover:bg-orange-100 hover:text-orange-700"
                        : "text-neutral-700 hover:bg-orange-100/50 hover:text-orange-700"
                    }`}
                  >
                    <Menu className="h-6 w-6" />
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
                  <DropdownMenuItem asChild>
                    <Link
                      href="/#quote"
                      className="px-2 py-2 text-sm font-medium bg-gradient-to-r from-orange-600 to-orange-700 text-white hover:from-orange-700 hover:to-orange-800 transition-all cursor-pointer rounded-md shadow-sm"
                    >
                      Request a Quote
                    </Link>
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>

            {/* Desktop Navigation */}
            <nav className="hidden md:flex items-center space-x-6 lg:space-x-8">
              <a
                href="tel:2123654386"
                className={`flex items-center gap-2 px-3 py-2 text-sm font-medium rounded-md transition-colors ${
                  scrolled
                    ? "text-neutral-800 hover:text-orange-600 hover:bg-orange-100"
                    : "text-neutral-700 hover:text-orange-600 hover:bg-orange-100/50"
                }`}
              >
                <Phone className="w-4 h-4" />
                212-365-4386
              </a>
              <Link
                href="/gallery"
                className={`px-3 py-2 text-sm font-medium rounded-md transition-colors ${
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
                href="/about"
                className={`px-3 py-2 text-sm font-medium rounded-md transition-colors ${
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
                className={`px-3 py-2 text-sm font-medium rounded-md transition-colors ${
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
                className={`bg-gradient-to-r from-orange-600 to-orange-700 text-white hover:from-orange-700 hover:to-orange-800 text-sm font-semibold transition-all ${
                  scrolled ? "shadow-lg hover:shadow-xl" : "shadow-md hover:shadow-lg"
                }`}
              >
                <Link href={currentPage === "home" ? "#quote" : "/#quote"}>Request a Quote</Link>
              </Button>
            </nav>
          </div>
        </div>
      </div>
    </header>
  )
}
