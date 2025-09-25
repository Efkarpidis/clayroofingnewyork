'use client';
import { useState, useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Phone, ChevronDown } from 'lucide-react';

export function Header() {
  const [scrolled, setScrolled] = useState(false);
  const pathname = usePathname();
  const getCurrentPage = () => {
    if (pathname === '/') return 'home';
    if (pathname === '/about') return 'about';
    if (pathname === '/contact') return 'contact';
    if (pathname === '/gallery') return 'gallery';
    if (pathname.startsWith('/tile-selection')) return 'tile-selection';
    return 'home';
  };
  const currentPage = getCurrentPage();
  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);
  return (
    <header className="sticky top-0 left-0 right-0 z-[1000]">
      <div
        className={`transition-all duration-300 ease-in-out ${
          scrolled
            ? 'bg-background/95 backdrop-blur-md border-b border-border shadow-lg'
            : 'bg-background/90 backdrop-blur-sm border-b border-border/50 shadow-sm'
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
        <div className="border-t border-border w-full bg-card shadow-md">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            {/* Desktop Navigation */}
            <nav className="hidden md:flex items-center justify-center text-center py-2 space-x-8">
              <Link
                href="tel:+1-212-365-4386"
                className="tappable flex items-center gap-2 px-3 py-2 text-sm font-medium rounded-md transition-colors text-foreground hover:text-primary hover:bg-muted"
              >
                <Phone className="w-4 h-4 flex-shrink-0" />
                <span>212-365-4386</span>
              </Link>
              <Link
                href="/gallery"
                className={`tappable px-3 py-2 text-sm font-medium rounded-md transition-colors ${
                  currentPage === 'gallery'
                    ? 'text-primary'
                    : 'text-foreground hover:text-primary hover:bg-muted'
                }`}
              >
                Projects
              </Link>
              <Link
                href="/tile-selection"
                className={`tappable px-3 py-2 text-sm font-medium rounded-md transition-colors ${
                  currentPage === 'tile-selection'
                    ? 'text-primary'
                    : 'text-foreground hover:text-primary hover:bg-muted'
                }`}
              >
                Tile Selection
              </Link>
              <Link
                href="/about"
                className={`tappable px-3 py-2 text-sm font-medium rounded-md transition-colors ${
                  currentPage === 'about'
                    ? 'text-primary'
                    : 'text-foreground hover:text-primary hover:bg-muted'
                }`}
              >
                About
              </Link>
              <Link
                href="/contact"
                className={`tappable px-3 py-2 text-sm font-medium rounded-md transition-colors ${
                  currentPage === 'contact'
                    ? 'text-primary'
                    : 'text-foreground hover:text-primary hover:bg-muted'
                }`}
              >
                Contact
              </Link>
              {currentPage !== 'contact' && (
                <Link href="/contact#quote" className="tappable block">
                  <Button
                    size="sm"
                    className="bg-gradient-to-r from-brand-600 to-brand-700 text-primary-foreground hover:from-brand-700 hover:to-brand-800 text-xs font-semibold transition-colors shadow-lg hover:shadow-xl h-9 px-4 w-full"
                  >
                    Request Quote
                  </Button>
                </Link>
              )}
            </nav>
            {/* Mobile Navigation Dropdown */}
            <div className="md:hidden w-full px-4 py-2">
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button
                    variant="outline"
                    className="tappable flex items-center justify-between gap-2 w-full py-3 text-base font-medium border-border text-foreground hover:bg-muted hover:text-foreground hover:border-accent bg-card"
                  >
                    <ChevronDown className="h-4 w-4" />
                    <span className="flex-1 text-center">Menu</span>
                    <ChevronDown className="h-4 w-4" />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="center" sideOffset={8} className="min-w-[200px] bg-card text-foreground border-border">
                  <DropdownMenuItem asChild>
                    <Link
                      href="tel:+1-212-365-4386"
                      className="tappable flex items-center gap-3 px-3 py-3 text-base font-semibold text-primary rounded-md cursor-pointer hover:bg-muted w-full"
                    >
                      <Phone className="w-5 h-5 flex-shrink-0" />
                      <span>Call: 212-365-4386</span>
                    </Link>
                  </DropdownMenuItem>
                  <DropdownMenuItem asChild>
                    <Link
                      href="/"
                      className={`tappable flex items-center px-3 py-3 text-base font-medium rounded-md cursor-pointer w-full ${
                        currentPage === 'home' ? 'text-primary' : 'text-foreground hover:text-primary hover:bg-muted'
                      }`}
                    >
                      Home
                    </Link>
                  </DropdownMenuItem>
                  <DropdownMenuItem asChild>
                    <Link
                      href="/gallery"
                      className={`tappable flex items-center px-3 py-3 text-base font-medium rounded-md cursor-pointer w-full ${
                        currentPage === 'gallery' ? 'text-primary' : 'text-foreground hover:text-primary hover:bg-muted'
                      }`}
                    >
                      Projects
                    </Link>
                  </DropdownMenuItem>
                  <DropdownMenuItem asChild>
                    <Link
                      href="/tile-selection"
                      className={`tappable flex items-center px-3 py-3 text-base font-medium rounded-md cursor-pointer w-full ${
                        currentPage === 'tile-selection' ? 'text-primary' : 'text-foreground hover:text-primary hover:bg-muted'
                      }`}
                    >
                      Tile Selection
                    </Link>
                  </DropdownMenuItem>
                  <DropdownMenuItem asChild>
                    <Link
                      href="/about"
                      className={`tappable flex items-center px-3 py-3 text-base font-medium rounded-md cursor-pointer w-full ${
                        currentPage === 'about' ? 'text-primary' : 'text-foreground hover:text-primary hover:bg-muted'
                      }`}
                    >
                      About
                    </Link>
                  </DropdownMenuItem>
                  <DropdownMenuItem asChild>
                    <Link
                      href="/contact"
                      className={`tappable flex items-center px-3 py-3 text-base font-medium rounded-md cursor-pointer w-full ${
                        currentPage === 'contact' ? 'text-primary' : 'text-foreground hover:text-primary hover:bg-muted'
                      }`}
                    >
                      Contact
                    </Link>
                  </DropdownMenuItem>
                  {currentPage !== 'contact' && (
                    <DropdownMenuItem asChild>
                      <Link
                        href="/contact#quote"
                        className="tappable flex items-center justify-center px-3 py-3 text-base font-bold text-primary-foreground rounded-md cursor-pointer mt-2 bg-gradient-to-r from-brand-600 to-brand-700 hover:from-brand-700 hover:to-brand-800 min-h-[44px] w-full"
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
  );
}
