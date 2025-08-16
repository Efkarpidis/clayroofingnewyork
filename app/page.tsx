"use client"

import type React from "react"

import { useState } from "react"
import Image from "next/image"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet"
import { Menu, Phone, Mail, MapPin, Clock, Star, Upload, Camera, X } from "lucide-react"
import { StickyCallBar } from "@/components/sticky-call-bar"
import { submitQuoteRequest } from "./actions"

export default function HomePage() {
  const [isQuoteModalOpen, setIsQuoteModalOpen] = useState(false)
  const [planFiles, setPlanFiles] = useState<File[]>([])
  const [photoFiles, setPhotoFiles] = useState<File[]>([])

  const handleFileUpload = (files: FileList | null, type: "plans" | "photos") => {
    if (!files) return

    const fileArray = Array.from(files)
    if (type === "plans") {
      setPlanFiles((prev) => [...prev, ...fileArray])
    } else {
      setPhotoFiles((prev) => [...prev, ...fileArray])
    }
  }

  const removeFile = (index: number, type: "plans" | "photos") => {
    if (type === "plans") {
      setPlanFiles((prev) => prev.filter((_, i) => i !== index))
    } else {
      setPhotoFiles((prev) => prev.filter((_, i) => i !== index))
    }
  }

  const FileUploadButton = ({
    type,
    accept,
    multiple = true,
    children,
  }: {
    type: "plans" | "photos"
    accept: string
    multiple?: boolean
    children: React.ReactNode
  }) => (
    <div className="relative">
      <input
        type="file"
        accept={accept}
        multiple={multiple}
        onChange={(e) => handleFileUpload(e.target.files, type)}
        className="absolute inset-0 w-full h-full opacity-0 cursor-pointer z-10"
      />
      <div className="flex items-center justify-center gap-2 px-4 py-3 border-2 border-dashed border-gray-300 rounded-lg hover:border-gray-400 transition-colors cursor-pointer bg-gray-50 hover:bg-gray-100">
        {children}
      </div>
    </div>
  )

  const CameraButton = ({ type }: { type: "photos" }) => (
    <div className="relative md:hidden">
      <input
        type="file"
        accept="image/*"
        capture="environment"
        onChange={(e) => handleFileUpload(e.target.files, type)}
        className="absolute inset-0 w-full h-full opacity-0 cursor-pointer z-10"
      />
      <div className="flex items-center justify-center gap-2 px-4 py-3 border-2 border-dashed border-blue-300 rounded-lg hover:border-blue-400 transition-colors cursor-pointer bg-blue-50 hover:bg-blue-100">
        <Camera className="w-5 h-5 text-blue-600" />
        <span className="text-sm font-medium text-blue-700">Take New Photo</span>
      </div>
    </div>
  )

  const FilePreview = ({ file, index, type }: { file: File; index: number; type: "plans" | "photos" }) => {
    const isImage = file.type.startsWith("image/")

    return (
      <div className="relative group">
        <div className="w-16 h-16 bg-gray-100 rounded-lg overflow-hidden border">
          {isImage ? (
            <img
              src={URL.createObjectURL(file) || "/placeholder.svg"}
              alt={file.name}
              className="w-full h-full object-cover"
            />
          ) : (
            <div className="w-full h-full flex items-center justify-center">
              <Upload className="w-6 h-6 text-gray-400" />
            </div>
          )}
        </div>
        <button
          type="button"
          onClick={() => removeFile(index, type)}
          className="absolute -top-2 -right-2 w-5 h-5 bg-red-500 text-white rounded-full flex items-center justify-center text-xs hover:bg-red-600 transition-colors"
        >
          <X className="w-3 h-3" />
        </button>
        <div className="absolute bottom-0 left-0 right-0 bg-black/70 text-white text-xs p-1 rounded-b-lg truncate">
          {file.name}
        </div>
      </div>
    )
  }

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
              <Link href="/" className="text-gray-900 hover:text-orange-600 font-medium">
                Home
              </Link>
              <Link href="/gallery" className="text-gray-700 hover:text-orange-600">
                Gallery
              </Link>
              <Link href="/about" className="text-gray-700 hover:text-orange-600">
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
              <Dialog open={isQuoteModalOpen} onOpenChange={setIsQuoteModalOpen}>
                <DialogTrigger asChild>
                  <Button className="bg-orange-600 hover:bg-orange-700 text-white">Get Quote</Button>
                </DialogTrigger>
                <DialogContent className="sm:max-w-[600px] max-h-[90vh] overflow-y-auto">
                  <DialogHeader>
                    <DialogTitle>Get Your Free Quote</DialogTitle>
                  </DialogHeader>
                  <form action={submitQuoteRequest} className="space-y-6">
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
                      <Label htmlFor="address">Property Address *</Label>
                      <Input id="address" name="address" required />
                    </div>

                    <div>
                      <Label htmlFor="projectType">Project Type *</Label>
                      <Select name="projectType" required>
                        <SelectTrigger>
                          <SelectValue placeholder="Select project type" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="new-installation">New Installation</SelectItem>
                          <SelectItem value="replacement">Roof Replacement</SelectItem>
                          <SelectItem value="repair">Repair</SelectItem>
                          <SelectItem value="maintenance">Maintenance</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>

                    <div>
                      <Label htmlFor="tileType">Preferred Tile Type</Label>
                      <Select name="tileType">
                        <SelectTrigger>
                          <SelectValue placeholder="Select tile type (optional)" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="mission">Mission Tile</SelectItem>
                          <SelectItem value="french">French Tile</SelectItem>
                          <SelectItem value="slate">Slate Tile</SelectItem>
                          <SelectItem value="barrel">Barrel Tile</SelectItem>
                          <SelectItem value="flat">Flat Tile</SelectItem>
                          <SelectItem value="other">Other</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>

                    <div>
                      <Label>Timeline *</Label>
                      <RadioGroup name="timeline" className="mt-2" required>
                        <div className="flex items-center space-x-2">
                          <RadioGroupItem value="asap" id="asap" />
                          <Label htmlFor="asap">ASAP</Label>
                        </div>
                        <div className="flex items-center space-x-2">
                          <RadioGroupItem value="1-3-months" id="1-3-months" />
                          <Label htmlFor="1-3-months">1-3 months</Label>
                        </div>
                        <div className="flex items-center space-x-2">
                          <RadioGroupItem value="3-6-months" id="3-6-months" />
                          <Label htmlFor="3-6-months">3-6 months</Label>
                        </div>
                        <div className="flex items-center space-x-2">
                          <RadioGroupItem value="6-months-plus" id="6-months-plus" />
                          <Label htmlFor="6-months-plus">6+ months</Label>
                        </div>
                      </RadioGroup>
                    </div>

                    <div>
                      <Label htmlFor="budget">Budget Range</Label>
                      <Select name="budget">
                        <SelectTrigger>
                          <SelectValue placeholder="Select budget range (optional)" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="under-25k">Under $25,000</SelectItem>
                          <SelectItem value="25k-50k">$25,000 - $50,000</SelectItem>
                          <SelectItem value="50k-100k">$50,000 - $100,000</SelectItem>
                          <SelectItem value="100k-plus">$100,000+</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>

                    <div>
                      <Label htmlFor="description">Project Description</Label>
                      <Textarea
                        id="description"
                        name="description"
                        placeholder="Tell us more about your project..."
                        className="min-h-[100px]"
                      />
                    </div>

                    {/* Architectural Plans Upload */}
                    <div>
                      <Label>Do you have architectural plans? (Optional)</Label>
                      <div className="mt-2 space-y-3">
                        <FileUploadButton type="plans" accept=".pdf,.jpg,.jpeg,.png,.gif">
                          <Upload className="w-5 h-5 text-gray-600" />
                          <span className="text-sm font-medium text-gray-700">Upload Files</span>
                        </FileUploadButton>

                        {planFiles.length > 0 && (
                          <div className="flex flex-wrap gap-2">
                            {planFiles.map((file, index) => (
                              <FilePreview key={index} file={file} index={index} type="plans" />
                            ))}
                          </div>
                        )}
                      </div>
                    </div>

                    {/* Roof Photos Upload */}
                    <div>
                      <Label>Do you have photos of the roof? (Optional)</Label>
                      <div className="mt-2 space-y-3">
                        <FileUploadButton type="photos" accept="image/*">
                          <Upload className="w-5 h-5 text-blue-600" />
                          <span className="text-sm font-medium text-blue-700">Choose Photos from Library</span>
                        </FileUploadButton>

                        <CameraButton type="photos" />

                        {photoFiles.length > 0 && (
                          <div className="flex flex-wrap gap-2">
                            {photoFiles.map((file, index) => (
                              <FilePreview key={index} file={file} index={index} type="photos" />
                            ))}
                          </div>
                        )}
                      </div>
                    </div>

                    <Button type="submit" className="w-full bg-orange-600 hover:bg-orange-700">
                      Submit
                    </Button>
                  </form>
                </DialogContent>
              </Dialog>
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
                  <Link href="/" className="text-gray-900 hover:text-orange-600 font-medium">
                    Home
                  </Link>
                  <Link href="/gallery" className="text-gray-700 hover:text-orange-600">
                    Gallery
                  </Link>
                  <Link href="/about" className="text-gray-700 hover:text-orange-600">
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
      <section className="relative h-[600px] flex items-center justify-center">
        <div className="absolute inset-0">
          <Image
            src="/images/hero-clay-roof.jpg"
            alt="Beautiful clay tile roof installation"
            fill
            className="object-cover"
            priority
          />
          <div className="absolute inset-0 bg-black/40" />
        </div>

        <div className="relative z-10 text-center text-white max-w-4xl mx-auto px-4">
          <h1 className="text-4xl md:text-6xl font-bold mb-6">Premium Clay Tile Roofing in NYC</h1>
          <p className="text-xl md:text-2xl mb-8 text-gray-200">
            Expert installation, repair, and maintenance of clay tile roofs. Serving New York City with quality
            craftsmanship since 2010.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Dialog open={isQuoteModalOpen} onOpenChange={setIsQuoteModalOpen}>
              <DialogTrigger asChild>
                <Button size="lg" className="bg-orange-600 hover:bg-orange-700 text-white px-8 py-3 text-lg">
                  Get Free Quote
                </Button>
              </DialogTrigger>
            </Dialog>
            <Button
              size="lg"
              variant="outline"
              className="border-white text-white hover:bg-white hover:text-gray-900 px-8 py-3 text-lg bg-transparent"
            >
              <Link href="/gallery">View Our Work</Link>
            </Button>
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">Our Clay Tile Roofing Services</h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              From new installations to repairs and maintenance, we provide comprehensive clay tile roofing solutions.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            <div className="bg-white p-6 rounded-lg shadow-md">
              <div className="w-12 h-12 bg-orange-100 rounded-lg flex items-center justify-center mb-4">
                <svg className="w-6 h-6 text-orange-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4"
                  />
                </svg>
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">New Installation</h3>
              <p className="text-gray-600">
                Complete clay tile roof installation for new construction and roof replacements.
              </p>
            </div>

            <div className="bg-white p-6 rounded-lg shadow-md">
              <div className="w-12 h-12 bg-orange-100 rounded-lg flex items-center justify-center mb-4">
                <svg className="w-6 h-6 text-orange-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z"
                  />
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                  />
                </svg>
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">Repair & Restoration</h3>
              <p className="text-gray-600">
                Expert repair services to restore your clay tile roof to its original condition.
              </p>
            </div>

            <div className="bg-white p-6 rounded-lg shadow-md">
              <div className="w-12 h-12 bg-orange-100 rounded-lg flex items-center justify-center mb-4">
                <svg className="w-6 h-6 text-orange-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
                  />
                </svg>
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">Maintenance</h3>
              <p className="text-gray-600">Regular maintenance services to extend the life of your clay tile roof.</p>
            </div>

            <div className="bg-white p-6 rounded-lg shadow-md">
              <div className="w-12 h-12 bg-orange-100 rounded-lg flex items-center justify-center mb-4">
                <svg className="w-6 h-6 text-orange-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M8.228 9c.549-1.165 2.03-2 3.772-2 2.21 0 4 1.343 4 3 0 1.4-1.278 2.575-3.006 2.907-.542.104-.994.54-.994 1.093m0 3h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                  />
                </svg>
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">Consultation</h3>
              <p className="text-gray-600">
                Professional consultation to help you choose the right clay tile solution.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Why Choose Us Section */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">Why Choose Clay Roofs NY?</h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              We're NYC's trusted clay tile roofing specialists with over a decade of experience.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="w-16 h-16 bg-orange-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Star className="w-8 h-8 text-orange-600" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">Expert Craftsmanship</h3>
              <p className="text-gray-600">
                Our skilled craftsmen have years of experience working with clay tiles, ensuring perfect installation
                every time.
              </p>
            </div>

            <div className="text-center">
              <div className="w-16 h-16 bg-orange-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg className="w-8 h-8 text-orange-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"
                  />
                </svg>
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">Licensed & Insured</h3>
              <p className="text-gray-600">
                Fully licensed and insured for your peace of mind. We stand behind our work with comprehensive
                warranties.
              </p>
            </div>

            <div className="text-center">
              <div className="w-16 h-16 bg-orange-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Clock className="w-8 h-8 text-orange-600" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">Timely Service</h3>
              <p className="text-gray-600">
                We respect your time and complete projects on schedule without compromising on quality.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">Ready to Get Started?</h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Contact us today for a free consultation and quote on your clay tile roofing project.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
            <div>
              <div className="w-12 h-12 bg-orange-100 rounded-lg flex items-center justify-center mx-auto mb-4">
                <Phone className="w-6 h-6 text-orange-600" />
              </div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">Call Us</h3>
              <a href="tel:+12123654386" className="text-orange-600 hover:text-orange-700 font-medium">
                (212) 365-4386
              </a>
            </div>

            <div>
              <div className="w-12 h-12 bg-orange-100 rounded-lg flex items-center justify-center mx-auto mb-4">
                <Mail className="w-6 h-6 text-orange-600" />
              </div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">Email Us</h3>
              <a href="mailto:hello@clayroofsny.com" className="text-orange-600 hover:text-orange-700 font-medium">
                hello@clayroofsny.com
              </a>
            </div>

            <div>
              <div className="w-12 h-12 bg-orange-100 rounded-lg flex items-center justify-center mx-auto mb-4">
                <MapPin className="w-6 h-6 text-orange-600" />
              </div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">Visit Us</h3>
              <p className="text-gray-600">
                33-15 127th Pl
                <br />
                Corona, NY 11368
              </p>
            </div>
          </div>

          <div className="text-center mt-8">
            <Dialog open={isQuoteModalOpen} onOpenChange={setIsQuoteModalOpen}>
              <DialogTrigger asChild>
                <Button size="lg" className="bg-orange-600 hover:bg-orange-700 text-white px-8 py-3 text-lg">
                  Get Your Free Quote
                </Button>
              </DialogTrigger>
            </Dialog>
          </div>
        </div>
      </section>

      {/* Sticky Call Bar */}
      <StickyCallBar isHidden={isQuoteModalOpen} />
    </div>
  )
}
