import Image from "next/image"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet"
import { Menu, Phone, ArrowLeft, Award, Users, Clock, Shield } from "lucide-react"
import { StickyCallBar } from "@/components/sticky-call-bar"

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-white pb-20">
      {/* Header */}
      <header className="bg-white shadow-sm sticky top-0 z-30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center">
              <Image src="/clay-roofs-ny-logo.png" alt="Clay Roofs NY" width={120} height={40} className="h-8 w-auto" />
            </div>

            {/* Desktop Navigation */}
            <nav className="hidden md:flex space-x-8">
              <Link href="/" className="text-gray-700 hover:text-orange-600">
                Home
              </Link>
              <Link href="/gallery" className="text-gray-700 hover:text-orange-600">
                Gallery
              </Link>
              <Link href="/about" className="text-gray-900 hover:text-orange-600 font-medium">
                About
              </Link>
              <Link href="/contact" className="text-gray-700 hover:text-orange-600">
                Contact
              </Link>
            </nav>

            <div className="hidden md:flex items-center space-x-4">
              <a href="tel:+12123654386" className="text-orange-600 hover:text-orange-700">
                <Phone className="w-5 h-5" />
              </a>
              <Button className="bg-orange-600 hover:bg-orange-700 text-white">
                <Link href="/">Get Quote</Link>
              </Button>
            </div>

            {/* Mobile menu button */}
            <Sheet>
              <SheetTrigger asChild>
                <Button variant="ghost" size="icon" className="md:hidden">
                  <Menu className="h-6 w-6" />
                </Button>
              </SheetTrigger>
              <SheetContent>
                <nav className="flex flex-col space-y-4 mt-8">
                  <Link href="/" className="text-gray-700 hover:text-orange-600">
                    Home
                  </Link>
                  <Link href="/gallery" className="text-gray-700 hover:text-orange-600">
                    Gallery
                  </Link>
                  <Link href="/about" className="text-gray-900 hover:text-orange-600 font-medium">
                    About
                  </Link>
                  <Link href="/contact" className="text-gray-700 hover:text-orange-600">
                    Contact
                  </Link>
                  <div className="pt-4 border-t">
                    <a
                      href="tel:+12123654386"
                      className="flex items-center space-x-2 text-orange-600 hover:text-orange-700"
                    >
                      <Phone className="w-5 h-5" />
                      <span>(212) 365-4386</span>
                    </a>
                  </div>
                </nav>
              </SheetContent>
            </Sheet>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="bg-gray-900 text-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center mb-6">
            <Link href="/" className="flex items-center text-orange-400 hover:text-orange-300 mr-4">
              <ArrowLeft className="w-5 h-5 mr-2" />
              Back to Home
            </Link>
          </div>
          <h1 className="text-4xl md:text-5xl font-bold mb-4">About Clay Roofs NY</h1>
          <p className="text-xl text-gray-300 max-w-3xl">
            Your trusted partner for premium clay tile roofing solutions in New York City. With over a decade of
            experience, we bring expertise and craftsmanship to every project.
          </p>
        </div>
      </section>

      {/* Our Story Section */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">Our Story</h2>
              <div className="space-y-4 text-gray-600">
                <p>
                  Founded in 2010, Clay Roofs NY began with a simple mission: to bring the timeless beauty and
                  durability of clay tile roofing to New York City's diverse architectural landscape. What started as a
                  small family business has grown into the city's most trusted clay tile roofing specialist.
                </p>
                <p>
                  Our founder, with over 20 years of experience in roofing, recognized the unique challenges that NYC's
                  climate and building codes present. We've developed specialized techniques and partnerships with
                  premium tile manufacturers to ensure every installation meets the highest standards.
                </p>
                <p>
                  Today, we're proud to have completed hundreds of projects across all five boroughs, from historic
                  brownstone restorations to modern commercial installations. Our commitment to quality craftsmanship
                  and customer satisfaction remains unchanged.
                </p>
              </div>
            </div>
            <div className="relative">
              <Image
                src="/images/hero-clay-roof.jpg"
                alt="Clay tile roof installation"
                width={600}
                height={400}
                className="rounded-lg shadow-lg"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Values Section */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">Our Values</h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              These core values guide everything we do, from initial consultation to project completion.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            <div className="text-center">
              <div className="w-16 h-16 bg-orange-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Award className="w-8 h-8 text-orange-600" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">Excellence</h3>
              <p className="text-gray-600">
                We strive for perfection in every aspect of our work, from material selection to final installation.
              </p>
            </div>

            <div className="text-center">
              <div className="w-16 h-16 bg-orange-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Users className="w-8 h-8 text-orange-600" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">Integrity</h3>
              <p className="text-gray-600">
                Honest communication, fair pricing, and transparent processes build lasting relationships with our
                clients.
              </p>
            </div>

            <div className="text-center">
              <div className="w-16 h-16 bg-orange-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Clock className="w-8 h-8 text-orange-600" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">Reliability</h3>
              <p className="text-gray-600">
                We deliver on our promises, complete projects on time, and stand behind our work with comprehensive
                warranties.
              </p>
            </div>

            <div className="text-center">
              <div className="w-16 h-16 bg-orange-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Shield className="w-8 h-8 text-orange-600" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">Safety</h3>
              <p className="text-gray-600">
                Safety is our top priority. We maintain the highest safety standards to protect our team and your
                property.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Team Section */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">Our Expert Team</h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Meet the skilled professionals who bring your clay tile roofing vision to life.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="w-32 h-32 bg-gray-200 rounded-full mx-auto mb-4 overflow-hidden">
                <Image
                  src="/placeholder-user.jpg"
                  alt="Team member"
                  width={128}
                  height={128}
                  className="w-full h-full object-cover"
                />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">Master Craftsman</h3>
              <p className="text-orange-600 mb-2">Lead Installer</p>
              <p className="text-gray-600 text-sm">
                With over 15 years of experience in clay tile installation, our master craftsman ensures every project
                meets our exacting standards.
              </p>
            </div>

            <div className="text-center">
              <div className="w-32 h-32 bg-gray-200 rounded-full mx-auto mb-4 overflow-hidden">
                <Image
                  src="/placeholder-user.jpg"
                  alt="Team member"
                  width={128}
                  height={128}
                  className="w-full h-full object-cover"
                />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">Project Manager</h3>
              <p className="text-orange-600 mb-2">Operations Lead</p>
              <p className="text-gray-600 text-sm">
                Our project manager coordinates every aspect of your installation, ensuring timely completion and clear
                communication throughout the process.
              </p>
            </div>

            <div className="text-center">
              <div className="w-32 h-32 bg-gray-200 rounded-full mx-auto mb-4 overflow-hidden">
                <Image
                  src="/placeholder-user.jpg"
                  alt="Team member"
                  width={128}
                  height={128}
                  className="w-full h-full object-cover"
                />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">Design Consultant</h3>
              <p className="text-orange-600 mb-2">Tile Specialist</p>
              <p className="text-gray-600 text-sm">
                Our design consultant helps you choose the perfect clay tiles to complement your property's architecture
                and your personal style preferences.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Certifications Section */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">Certifications & Partnerships</h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              We maintain the highest industry standards through continuous training and partnerships with leading
              manufacturers.
            </p>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 items-center">
            <div className="text-center">
              <Image
                src="/terraclay-logo.png"
                alt="TerraClay Partnership"
                width={120}
                height={60}
                className="mx-auto mb-2 opacity-70 hover:opacity-100 transition-opacity"
              />
              <p className="text-sm text-gray-600">Authorized Dealer</p>
            </div>

            <div className="text-center">
              <Image
                src="/la-escandella-logo.webp"
                alt="La Escandella Partnership"
                width={120}
                height={60}
                className="mx-auto mb-2 opacity-70 hover:opacity-100 transition-opacity"
              />
              <p className="text-sm text-gray-600">Certified Installer</p>
            </div>

            <div className="text-center">
              <div className="w-20 h-20 bg-gray-200 rounded-lg mx-auto mb-2 flex items-center justify-center">
                <Shield className="w-10 h-10 text-gray-400" />
              </div>
              <p className="text-sm text-gray-600">Licensed & Insured</p>
            </div>

            <div className="text-center">
              <div className="w-20 h-20 bg-gray-200 rounded-lg mx-auto mb-2 flex items-center justify-center">
                <Award className="w-10 h-10 text-gray-400" />
              </div>
              <p className="text-sm text-gray-600">BBB Accredited</p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-orange-600 text-white">
        <div className="max-w-4xl mx-auto text-center px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">Ready to Work with the Best?</h2>
          <p className="text-xl mb-8 text-orange-100">
            Experience the Clay Roofs NY difference. Contact us today to discuss your project and discover why we're
            NYC's most trusted clay tile roofing specialists.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button
              size="lg"
              variant="outline"
              className="border-white text-white hover:bg-white hover:text-orange-600 px-8 py-3 text-lg bg-transparent"
            >
              <Link href="/">Get Free Quote</Link>
            </Button>
            <Button
              size="lg"
              variant="outline"
              className="border-white text-white hover:bg-white hover:text-orange-600 px-8 py-3 text-lg bg-transparent"
            >
              <Link href="/contact">Contact Us</Link>
            </Button>
          </div>
        </div>
      </section>

      {/* Sticky Call Bar */}
      <StickyCallBar />
    </div>
  )
}
