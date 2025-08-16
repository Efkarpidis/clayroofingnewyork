import Image from "next/image"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet"
import { Menu, Phone, Mail, MapPin, Clock, ArrowLeft } from "lucide-react"
import { StickyCallBar } from "@/components/sticky-call-bar"
import { submitContactForm } from "../actions"

export default function ContactPage() {
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
              <Link href="/about" className="text-gray-700 hover:text-orange-600">
                About
              </Link>
              <Link href="/contact" className="text-gray-900 hover:text-orange-600 font-medium">
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
                  <Link href="/about" className="text-gray-700 hover:text-orange-600">
                    About
                  </Link>
                  <Link href="/contact" className="text-gray-900 hover:text-orange-600 font-medium">
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
          <h1 className="text-4xl md:text-5xl font-bold mb-4">Contact Clay Roofs NY</h1>
          <p className="text-xl text-gray-300 max-w-3xl">
            Ready to start your clay tile roofing project? Get in touch with our team of experts. We're here to answer
            your questions and provide you with a free consultation.
          </p>
        </div>
      </section>

      {/* Contact Form & Info Section */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            {/* Contact Form */}
            <div>
              <h2 className="text-2xl font-bold text-gray-900 mb-6">Send Us a Message</h2>
              <form action={submitContactForm} className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="firstName">First Name *</Label>
                    <Input id="firstName" name="firstName" required />
                  </div>
                  <div>
                    <Label htmlFor="lastName">Last Name *</Label>
                    <Input id="lastName" name="lastName" required />
                  </div>
                </div>

                <div>
                  <Label htmlFor="email">Email *</Label>
                  <Input id="email" name="email" type="email" required />
                </div>

                <div>
                  <Label htmlFor="phone">Phone *</Label>
                  <Input id="phone" name="phone" type="tel" required />
                </div>

                <div>
                  <Label htmlFor="subject">Subject</Label>
                  <Input id="subject" name="subject" placeholder="How can we help you?" />
                </div>

                <div>
                  <Label htmlFor="message">Message *</Label>
                  <Textarea
                    id="message"
                    name="message"
                    placeholder="Tell us about your project or question..."
                    className="min-h-[120px]"
                    required
                  />
                </div>

                <Button type="submit" className="w-full bg-orange-600 hover:bg-orange-700">
                  Submit
                </Button>
              </form>
            </div>

            {/* Contact Information */}
            <div>
              <h2 className="text-2xl font-bold text-gray-900 mb-6">Get in Touch</h2>
              <div className="space-y-6">
                <div className="flex items-start space-x-4">
                  <div className="w-12 h-12 bg-orange-100 rounded-lg flex items-center justify-center flex-shrink-0">
                    <Phone className="w-6 h-6 text-orange-600" />
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold text-gray-900 mb-1">Phone</h3>
                    <a href="tel:+12123654386" className="text-orange-600 hover:text-orange-700 font-medium">
                      (212) 365-4386
                    </a>
                    <p className="text-gray-600 text-sm mt-1">
                      Call us for immediate assistance or to schedule a consultation
                    </p>
                  </div>
                </div>

                <div className="flex items-start space-x-4">
                  <div className="w-12 h-12 bg-orange-100 rounded-lg flex items-center justify-center flex-shrink-0">
                    <Mail className="w-6 h-6 text-orange-600" />
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold text-gray-900 mb-1">Email</h3>
                    <a
                      href="mailto:hello@clayroofsny.com"
                      className="text-orange-600 hover:text-orange-700 font-medium"
                    >
                      hello@clayroofsny.com
                    </a>
                    <p className="text-gray-600 text-sm mt-1">Send us an email and we'll respond within 24 hours</p>
                  </div>
                </div>

                <div className="flex items-start space-x-4">
                  <div className="w-12 h-12 bg-orange-100 rounded-lg flex items-center justify-center flex-shrink-0">
                    <MapPin className="w-6 h-6 text-orange-600" />
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold text-gray-900 mb-1">Address</h3>
                    <p className="text-gray-900 font-medium">
                      33-15 127th Pl
                      <br />
                      Corona, NY 11368
                    </p>
                    <p className="text-gray-600 text-sm mt-1">Visit our office for in-person consultations</p>
                  </div>
                </div>

                <div className="flex items-start space-x-4">
                  <div className="w-12 h-12 bg-orange-100 rounded-lg flex items-center justify-center flex-shrink-0">
                    <Clock className="w-6 h-6 text-orange-600" />
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold text-gray-900 mb-1">Business Hours</h3>
                    <div className="text-gray-900 space-y-1">
                      <p>Monday - Friday: 8:00 AM - 6:00 PM</p>
                      <p>Saturday: 9:00 AM - 4:00 PM</p>
                      <p>Sunday: Closed</p>
                    </div>
                    <p className="text-gray-600 text-sm mt-1">Emergency services available 24/7</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Service Areas Section */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">Service Areas</h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              We proudly serve all five boroughs of New York City and surrounding areas.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <div className="bg-white p-6 rounded-lg shadow-md">
              <h3 className="text-lg font-semibold text-gray-900 mb-2">Manhattan</h3>
              <p className="text-gray-600 text-sm">
                Upper East Side, Upper West Side, Midtown, Downtown, and all Manhattan neighborhoods
              </p>
            </div>

            <div className="bg-white p-6 rounded-lg shadow-md">
              <h3 className="text-lg font-semibold text-gray-900 mb-2">Brooklyn</h3>
              <p className="text-gray-600 text-sm">
                Park Slope, Williamsburg, DUMBO, Brooklyn Heights, and all Brooklyn areas
              </p>
            </div>

            <div className="bg-white p-6 rounded-lg shadow-md">
              <h3 className="text-lg font-semibold text-gray-900 mb-2">Queens</h3>
              <p className="text-gray-600 text-sm">
                Astoria, Long Island City, Flushing, Forest Hills, and all Queens neighborhoods
              </p>
            </div>

            <div className="bg-white p-6 rounded-lg shadow-md">
              <h3 className="text-lg font-semibold text-gray-900 mb-2">The Bronx</h3>
              <p className="text-gray-600 text-sm">Riverdale, Fordham, Bronx Park, and all Bronx communities</p>
            </div>

            <div className="bg-white p-6 rounded-lg shadow-md">
              <h3 className="text-lg font-semibold text-gray-900 mb-2">Staten Island</h3>
              <p className="text-gray-600 text-sm">St. George, Stapleton, New Dorp, and all Staten Island areas</p>
            </div>

            <div className="bg-white p-6 rounded-lg shadow-md">
              <h3 className="text-lg font-semibold text-gray-900 mb-2">Surrounding Areas</h3>
              <p className="text-gray-600 text-sm">Westchester County, Nassau County, and select areas in New Jersey</p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-orange-600 text-white">
        <div className="max-w-4xl mx-auto text-center px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">Ready to Get Started?</h2>
          <p className="text-xl mb-8 text-orange-100">
            Don't wait to protect and beautify your property with premium clay tile roofing. Contact us today for your
            free consultation and quote.
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
              <a href="tel:+12123654386">Call Now</a>
            </Button>
          </div>
        </div>
      </section>

      {/* Sticky Call Bar */}
      <StickyCallBar />
    </div>
  )
}
