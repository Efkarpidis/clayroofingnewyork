"use client"

import type React from "react"

import { useState, useActionState, useEffect, useId } from "react"
import Link from "next/link"
import Image from "next/image"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { Phone, Menu, Upload, Camera, FileText, Check, Loader2 } from "lucide-react"
import { Button } from "@/components/ui/button"
import { type QuoteFormData, quoteFormSchema } from "./schemas"
import { handleQuoteFormSubmit, type QuoteFormState } from "./actions"
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"

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
    <div className="min-h-screen bg-white text-neutral-800">
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
                  </nav>
                </SheetContent>
              </Sheet>
            </div>

            {/* Desktop: Spacer for centering */}
            <div className="hidden md:block w-32"></div>
          </div>
        </div>
      </header>

      {/* Main Hero Section - Full Screen with Background Image */}
      <main className="relative min-h-screen flex items-center justify-center">
        {/* Background Image */}
        <div className="absolute inset-0 z-0">
          <Image
            src="/images/hero-clay-roof.jpg"
            alt="Beautiful clay tile roof installation"
            fill
            className="object-cover"
            priority
          />
          <div className="absolute inset-0 bg-black/40"></div>
        </div>

        {/* Content Overlay */}
        <div className="relative z-10 text-center px-4 sm:px-6 lg:px-8">
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-white mb-8 drop-shadow-lg">
            Premium Clay Roof Installation
          </h1>
          <p className="text-xl sm:text-2xl text-white mb-12 drop-shadow-lg max-w-2xl mx-auto">
            Expert craftsmanship for New York homes
          </p>

          {/* Request Quote Dialog */}
          <Dialog>
            <DialogTrigger asChild>
              <Button
                size="lg"
                className="bg-orange-600 text-white hover:bg-orange-700 text-xl font-bold px-12 py-6 h-auto shadow-2xl"
              >
                Request a Quote
              </Button>
            </DialogTrigger>
            <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
              <DialogHeader>
                <DialogTitle className="text-2xl font-bold text-center">Request Your Free Quote</DialogTitle>
              </DialogHeader>
              <div className="mt-6">
                <QuoteForm />
              </div>
            </DialogContent>
          </Dialog>
        </div>
      </main>
    </div>
  )
}
