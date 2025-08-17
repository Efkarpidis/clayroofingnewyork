"use client"

import type React from "react"

import { useState, useActionState, useEffect, useId } from "react"
import Link from "next/link"
import Image from "next/image"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { MapPin, Phone, Clock, Check, Loader2, Menu, Upload, Camera, FileText, Building2 } from "lucide-react"
import { Button } from "@/components/ui/button"
import { type QuoteFormData, quoteFormSchema } from "./schemas"
import { handleQuoteFormSubmit, type QuoteFormState } from "./actions"
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet"

// File Upload Component
const FileUploadField = ({
  label,
  name,
  register,
  error,
}: {
  label: string
  name: string
  register: any
  error?: string
}) => {
  const [files, setFiles] = useState<File[]>([])
  const [previews, setPreviews] = useState<string[]>([])
  const fileInputRef = useId()

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFiles = Array.from(e.target.files || [])
    setFiles(selectedFiles)

    // Create previews
    const newPreviews = selectedFiles.map((file) => {
      if (file.type.startsWith("image/")) {
        return URL.createObjectURL(file)
      }
      return ""
    })
    setPreviews(newPreviews)
  }

  const isMobile = typeof window !== "undefined" && window.innerWidth < 768

  return (
    <div className="space-y-2">
      <label className="block text-base font-medium text-neutral-700">
        {label} <span className="text-sm text-neutral-500">(Optional)</span>
      </label>

      <div className="relative">
        <input
          {...register(name)}
          type="file"
          multiple
          accept="image/*,.pdf,.doc,.docx"
          capture={isMobile ? "environment" : undefined}
          onChange={handleFileChange}
          className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
          id={fileInputRef}
        />
        <div className="flex items-center justify-center w-full h-24 border-2 border-dashed border-neutral-300 rounded-lg hover:border-orange-400 hover:bg-orange-50 transition-colors cursor-pointer">
          <div className="text-center">
            <div className="flex items-center justify-center gap-2 text-neutral-600 mb-1">
              {isMobile ? <Camera className="h-5 w-5" /> : <Upload className="h-5 w-5" />}
              <span className="font-medium">{isMobile ? "Upload or Take Photo" : "Upload Files"}</span>
            </div>
            <p className="text-sm text-neutral-500">Images, PDF, or documents</p>
          </div>
        </div>
      </div>

      {/* File Previews */}
      {files.length > 0 && (
        <div className="grid grid-cols-2 sm:grid-cols-3 gap-2 mt-3">
          {files.map((file, index) => (
            <div key={index} className="relative">
              {previews[index] ? (
                <img
                  src={previews[index] || "/placeholder.svg"}
                  alt={`Preview ${index + 1}`}
                  className="w-full h-20 object-cover rounded-lg border border-neutral-200"
                />
              ) : (
                <div className="w-full h-20 bg-neutral-100 rounded-lg border border-neutral-200 flex items-center justify-center">
                  <FileText className="h-6 w-6 text-neutral-400" />
                </div>
              )}
              <div className="absolute bottom-1 left-1 right-1 bg-black/70 text-white text-xs px-1 py-0.5 rounded truncate">
                {file.name}
              </div>
            </div>
          ))}
        </div>
      )}

      {error && <p className="mt-1 text-sm text-red-600">{error}</p>}
    </div>
  )
}

// Form Components
const FieldWrapper = ({
  id,
  label,
  error,
  children,
}: { id: string; label: string; error?: string; children: React.ReactNode }) => (
  <div className="space-y-2">
    <label htmlFor={id} className="block text-base font-medium text-neutral-700">
      {label}
    </label>
    {children}
    {error && <p className="mt-1 text-sm text-red-600">{error}</p>}
  </div>
)

const FormInput = (props: React.ComponentProps<"input">) => (
  <input
    {...props}
    className="block w-full rounded-md border-neutral-300 bg-neutral-100 p-3 text-base shadow-sm focus:border-neutral-500 focus:ring-neutral-500 disabled:cursor-not-allowed disabled:bg-neutral-200"
  />
)

const FormTextarea = (props: React.ComponentProps<"textarea">) => (
  <textarea
    {...props}
    className="block w-full rounded-md border-neutral-300 bg-neutral-100 p-3 text-base shadow-sm focus:border-neutral-500 focus:ring-neutral-500"
  />
)

const FormSelect = (props: React.ComponentProps<"select">) => (
  <select
    {...props}
    className="block w-full rounded-md border-neutral-300 bg-neutral-100 p-3 text-base shadow-sm focus:border-neutral-500 focus:ring-neutral-500"
  />
)

const SubmitButton = ({ children, isPending }: { children: React.ReactNode; isPending: boolean }) => (
  <button
    type="submit"
    disabled={isPending}
    className="flex w-full items-center justify-center gap-2 rounded-lg bg-neutral-900 px-6 py-3 text-base font-semibold text-white shadow-sm transition-colors hover:bg-neutral-800 disabled:bg-neutral-400"
  >
    {isPending ? <Loader2 className="h-5 w-5 animate-spin" /> : children}
  </button>
)

// Quote Form Component
function QuoteForm() {
  const id = useId()
  const [state, formAction, isPending] = useActionState<QuoteFormState, FormData>(handleQuoteFormSubmit, {
    message: "",
    success: false,
  })
  const {
    register,
    formState: { errors },
    reset,
  } = useForm<QuoteFormData>({
    resolver: zodResolver(quoteFormSchema),
  })

  useEffect(() => {
    if (state.success) {
      reset()
    }
  }, [state, reset])

  if (state.success) {
    return (
      <div className="flex flex-col items-center justify-center rounded-lg border border-green-200 bg-green-50 p-8 text-center">
        <Check className="h-12 w-12 rounded-full bg-green-100 p-2 text-green-600" />
        <h3 className="mt-4 text-xl font-semibold text-neutral-800">Quote Request Sent!</h3>
        <p className="mt-1 text-neutral-600">Thank you for your request. We'll get back to you within 24 hours.</p>
      </div>
    )
  }

  return (
    <form action={formAction} className="space-y-5">
      <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
        <FieldWrapper id={`${id}-name`} label="Full Name" error={errors.name?.message || state.errors?.name?.[0]}>
          <FormInput {...register("name")} placeholder="John Doe" />
        </FieldWrapper>
        <FieldWrapper id={`${id}-email`} label="Email" error={errors.email?.message || state.errors?.email?.[0]}>
          <FormInput {...register("email")} type="email" placeholder="you@example.com" />
        </FieldWrapper>
      </div>
      <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
        <FieldWrapper id={`${id}-phone`} label="Phone" error={errors.phone?.message || state.errors?.phone?.[0]}>
          <FormInput {...register("phone")} type="tel" placeholder="(555) 123-4567" />
        </FieldWrapper>
        <FieldWrapper
          id={`${id}-projectType`}
          label="Project Type"
          error={errors.projectType?.message || state.errors?.projectType?.[0]}
        >
          <FormSelect {...register("projectType")}>
            <option value="">Select project type</option>
            <option value="new-installation">New Installation</option>
            <option value="repair">Repair</option>
            <option value="replacement">Replacement</option>
            <option value="maintenance">Maintenance</option>
          </FormSelect>
        </FieldWrapper>
      </div>
      <FieldWrapper
        id={`${id}-address`}
        label="Property Address"
        error={errors.address?.message || state.errors?.address?.[0]}
      >
        <FormInput {...register("address")} placeholder="123 Main St, City, State, ZIP" />
      </FieldWrapper>
      <FieldWrapper
        id={`${id}-description`}
        label="Project Description"
        error={errors.description?.message || state.errors?.description?.[0]}
      >
        <FormTextarea {...register("description")} rows={4} placeholder="Please describe your clay roof project..." />
      </FieldWrapper>

      <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
        <FileUploadField
          label="Do you have architectural plans?"
          name="plans"
          register={register}
          error={errors.plans?.message || state.errors?.plans?.[0]}
        />
        <FileUploadField
          label="Do you have photos of the roof?"
          name="photos"
          register={register}
          error={errors.photos?.message || state.errors?.photos?.[0]}
        />
      </div>

      <SubmitButton isPending={isPending}>Request Quote</SubmitButton>
      {!state.success && state.message && <p className="text-center text-sm text-red-600">{state.message}</p>}
    </form>
  )
}

export default function HomePage() {
  return (
    <div className="bg-white text-neutral-800">
      {/* Header */}
      <header className="sticky top-0 z-40 bg-white/95 backdrop-blur-sm shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-28 md:h-32">
            {/* Logo - Doubled in size */}
            <Link href="/" className="flex items-center flex-shrink-0">
              <Image
                src="/clay-roofs-ny-logo.png"
                alt="Clay Roofs NY"
                width={1080}
                height={360}
                className="h-32 w-auto sm:h-36 md:h-40"
                priority
              />
            </Link>

            {/* Desktop: Centered Navigation */}
            <div className="hidden md:flex items-center justify-center flex-1">
              <nav className="flex items-center space-x-8">
                <a
                  href="tel:2123654386"
                  className="flex items-center gap-2 px-3 py-2 text-sm font-medium text-neutral-700 hover:text-orange-600 transition-colors"
                >
                  <Phone className="w-4 h-4" />
                  (212) 365-4386
                </a>
                <Link
                  href="/gallery"
                  className="px-3 py-2 text-sm font-medium text-neutral-700 hover:text-orange-600 transition-colors"
                >
                  Projects
                </Link>
                <Link
                  href="/about"
                  className="px-3 py-2 text-sm font-medium text-neutral-700 hover:text-orange-600 transition-colors"
                >
                  About
                </Link>
                <Link
                  href="/contact"
                  className="px-3 py-2 text-sm font-medium text-neutral-700 hover:text-orange-600 transition-colors"
                >
                  Contact
                </Link>
                <Button asChild className="bg-orange-600 text-white hover:bg-orange-700 text-sm font-semibold">
                  <Link href="#quote">Request a Quote</Link>
                </Button>
              </nav>
            </div>

            {/* Mobile: Phone + Menu */}
            <div className="flex items-center gap-3 md:hidden">
              <a
                href="tel:2123654386"
                className="flex items-center gap-2 px-3 py-2 text-sm font-medium text-neutral-700 hover:text-orange-600 transition-colors"
              >
                <Phone className="w-4 h-4" />
                <span className="hidden sm:inline">(212) 365-4386</span>
              </a>
              <Sheet>
                <SheetTrigger asChild>
                  <button className="p-2 rounded-lg text-neutral-700 hover:bg-neutral-100 transition-colors">
                    <Menu className="h-6 w-6" />
                    <span className="sr-only">Open menu</span>
                  </button>
                </SheetTrigger>
                <SheetContent side="right" className="w-[300px] sm:w-[400px]">
                  <nav className="flex flex-col space-y-4 mt-8">
                    <Link
                      href="/"
                      className="flex items-center justify-center py-4 px-6 text-lg font-medium text-neutral-700 hover:bg-neutral-100 rounded-lg transition-colors border-b border-neutral-200"
                    >
                      Home
                    </Link>
                    <Link
                      href="/gallery"
                      className="flex items-center justify-center py-4 px-6 text-lg font-medium text-neutral-700 hover:bg-neutral-100 rounded-lg transition-colors border-b border-neutral-200"
                    >
                      Projects
                    </Link>
                    <Link
                      href="/about"
                      className="flex items-center justify-center py-4 px-6 text-lg font-medium text-neutral-700 hover:bg-neutral-100 rounded-lg transition-colors border-b border-neutral-200"
                    >
                      About
                    </Link>
                    <Link
                      href="/contact"
                      className="flex items-center justify-center py-4 px-6 text-lg font-medium text-neutral-700 hover:bg-neutral-100 rounded-lg transition-colors border-b border-neutral-200"
                    >
                      Contact
                    </Link>
                    <Button
                      asChild
                      className="bg-orange-600 text-white hover:bg-orange-700 text-lg font-semibold py-4 px-6 h-auto mt-4"
                    >
                      <Link href="#quote">Request a Quote</Link>
                    </Button>
                  </nav>
                </SheetContent>
              </Sheet>
            </div>

            {/* Desktop: Spacer for centering */}
            <div className="hidden md:block w-32"></div>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-neutral-50 to-neutral-100 py-16 sm:py-20 lg:py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 gap-12 lg:grid-cols-2 lg:gap-16 items-center">
            <div className="text-center lg:text-left">
              <h1 className="text-3xl sm:text-4xl lg:text-5xl xl:text-6xl font-extrabold tracking-tight text-neutral-900 leading-tight">
                Premium Clay Roof
                <span className="block text-orange-600">Installation & Repair</span>
              </h1>
              <p className="mt-6 text-lg sm:text-xl text-neutral-600 leading-relaxed max-w-2xl mx-auto lg:mx-0">
                Transform your home with authentic clay tile roofing. Expert craftsmanship, premium materials, and
                unmatched durability for New York homes.
              </p>
              <div className="mt-8 flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
                <Button
                  asChild
                  size="lg"
                  className="bg-orange-600 text-white hover:bg-orange-700 text-lg font-semibold px-8 py-4 h-auto"
                >
                  <Link href="#quote">Get Free Quote</Link>
                </Button>
                <Button
                  asChild
                  variant="outline"
                  size="lg"
                  className="border-neutral-300 text-neutral-700 hover:bg-neutral-50 text-lg font-semibold px-8 py-4 h-auto bg-transparent"
                >
                  <Link href="/gallery">View Our Work</Link>
                </Button>
              </div>
            </div>
            <div className="relative">
              <Image
                src="/images/hero-clay-roof.jpg"
                alt="Beautiful clay tile roof installation"
                width={600}
                height={400}
                className="rounded-lg shadow-xl w-full h-auto"
                priority
              />
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-16 sm:py-20 lg:py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl sm:text-4xl font-extrabold text-neutral-900">Why Choose Clay Roofs NY?</h2>
            <p className="mt-4 text-lg text-neutral-600 max-w-2xl mx-auto">
              We specialize in premium clay tile roofing with decades of experience serving New York homeowners.
            </p>
          </div>

          <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3">
            <div className="text-center p-6 rounded-lg border border-neutral-200 hover:shadow-lg transition-shadow">
              <div className="w-12 h-12 bg-orange-100 rounded-lg flex items-center justify-center mx-auto mb-4">
                <Building2 className="h-6 w-6 text-orange-600" />
              </div>
              <h3 className="text-xl font-semibold text-neutral-900 mb-2">Expert Installation</h3>
              <p className="text-neutral-600">
                Professional installation by certified craftsmen with 20+ years of experience.
              </p>
            </div>

            <div className="text-center p-6 rounded-lg border border-neutral-200 hover:shadow-lg transition-shadow">
              <div className="w-12 h-12 bg-orange-100 rounded-lg flex items-center justify-center mx-auto mb-4">
                <Check className="h-6 w-6 text-orange-600" />
              </div>
              <h3 className="text-xl font-semibold text-neutral-900 mb-2">Premium Materials</h3>
              <p className="text-neutral-600">
                Only the finest clay tiles from trusted manufacturers for lasting beauty and durability.
              </p>
            </div>

            <div className="text-center p-6 rounded-lg border border-neutral-200 hover:shadow-lg transition-shadow">
              <div className="w-12 h-12 bg-orange-100 rounded-lg flex items-center justify-center mx-auto mb-4">
                <Phone className="h-6 w-6 text-orange-600" />
              </div>
              <h3 className="text-xl font-semibold text-neutral-900 mb-2">Local Service</h3>
              <p className="text-neutral-600">
                Proudly serving New York with personalized service and local expertise.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Quote Form Section */}
      <section id="quote" className="py-16 sm:py-20 lg:py-24 bg-neutral-50">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl sm:text-4xl font-extrabold text-neutral-900">Request Your Free Quote</h2>
            <p className="mt-4 text-lg text-neutral-600">
              Get a detailed estimate for your clay roof project. We'll respond within 24 hours.
            </p>
          </div>

          <div className="bg-white rounded-lg shadow-lg p-6 sm:p-8 lg:p-10">
            <QuoteForm />
          </div>
        </div>
      </section>

      {/* Contact Info Section */}
      <section className="py-16 sm:py-20 lg:py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl sm:text-4xl font-extrabold text-neutral-900">Get in Touch</h2>
            <p className="mt-4 text-lg text-neutral-600">Ready to start your clay roof project? Contact us today.</p>
          </div>

          <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3">
            <div className="text-center p-6">
              <div className="w-12 h-12 bg-orange-100 rounded-lg flex items-center justify-center mx-auto mb-4">
                <MapPin className="h-6 w-6 text-orange-600" />
              </div>
              <h3 className="text-lg font-semibold text-neutral-900 mb-2">Address</h3>
              <p className="text-neutral-600">
                33-15 127th Pl
                <br />
                Corona, NY 11368
              </p>
            </div>

            <div className="text-center p-6">
              <div className="w-12 h-12 bg-orange-100 rounded-lg flex items-center justify-center mx-auto mb-4">
                <Phone className="h-6 w-6 text-orange-600" />
              </div>
              <h3 className="text-lg font-semibold text-neutral-900 mb-2">Phone</h3>
              <a href="tel:2123654386" className="text-neutral-600 hover:text-orange-600 transition-colors">
                (212) 365-4386
              </a>
            </div>

            <div className="text-center p-6">
              <div className="w-12 h-12 bg-orange-100 rounded-lg flex items-center justify-center mx-auto mb-4">
                <Clock className="h-6 w-6 text-orange-600" />
              </div>
              <h3 className="text-lg font-semibold text-neutral-900 mb-2">Business Hours</h3>
              <p className="text-neutral-600">
                Monday – Saturday: 8:00 AM – 5:00 PM
                <br />
                Sunday: Closed
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-neutral-200 bg-neutral-50">
        <div className="max-w-7xl mx-auto px-4 py-8 sm:px-6 lg:px-8">
          <div className="flex flex-col items-center space-y-4">
            <div className="flex items-center gap-3 text-sm text-neutral-600">
              <a
                href="https://www.laescandella.com"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-3 hover:opacity-80 transition-opacity"
              >
                <Image
                  src="/la-escandella-logo.webp"
                  alt="La Escandella"
                  width={80}
                  height={40}
                  className="h-6 w-auto"
                />
                <span>Proudly partnered with La Escandella.</span>
              </a>
            </div>
            <div className="text-center text-neutral-500">
              <p>&copy; {new Date().getFullYear()} Clay Roofs NY. All Rights Reserved.</p>
            </div>
          </div>
        </div>
      </footer>
    </div>
  )
}
