"use client"

import type React from "react"

import { useActionState, useEffect, useId, useState } from "react"
import Link from "next/link"
import Image from "next/image"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import {
  MapPin,
  Phone,
  Mail,
  Clock,
  Check,
  Loader2,
  Menu,
  X,
  Home,
  Building2,
  MessageSquare,
  FileText,
  FileCheck,
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { type ContactFormData, contactFormSchema } from "../schemas"
import { handleContactFormSubmit, type ContactFormState } from "../actions"

// Mobile Menu Component
const MobileMenu = ({ isOpen, onClose }: { isOpen: boolean; onClose: () => void }) => {
  if (!isOpen) return null

  return (
    <div className="fixed inset-0 z-50 lg:hidden">
      {/* Backdrop */}
      <div className="fixed inset-0 bg-black/50" onClick={onClose} />

      {/* Menu Panel */}
      <div className="fixed right-0 top-0 h-full w-80 bg-white shadow-xl">
        <div className="flex items-center justify-between p-6 border-b border-neutral-200">
          <h2 className="text-lg font-semibold text-neutral-800">Menu</h2>
          <button onClick={onClose} className="p-2 rounded-lg hover:bg-neutral-100 transition-colors">
            <X className="h-5 w-5 text-neutral-600" />
          </button>
        </div>

        <nav className="p-6">
          <div className="space-y-2">
            <Link
              href="/"
              onClick={onClose}
              className="flex items-center gap-3 px-4 py-3 text-base font-medium text-neutral-700 hover:bg-neutral-50 hover:text-orange-600 rounded-lg transition-colors"
            >
              <Home className="h-5 w-5" />
              Home
            </Link>

            <div className="h-px bg-neutral-200 my-2" />

            <Link
              href="/gallery"
              onClick={onClose}
              className="flex items-center gap-3 px-4 py-3 text-base font-medium text-neutral-700 hover:bg-neutral-50 hover:text-orange-600 rounded-lg transition-colors"
            >
              <Building2 className="h-5 w-5" />
              Projects
            </Link>

            <Link
              href="/about"
              onClick={onClose}
              className="flex items-center gap-3 px-4 py-3 text-base font-medium text-neutral-700 hover:bg-neutral-50 hover:text-orange-600 rounded-lg transition-colors"
            >
              <FileText className="h-5 w-5" />
              About
            </Link>

            <Link
              href="/contact"
              onClick={onClose}
              className="flex items-center gap-3 px-4 py-3 text-base font-medium text-orange-600 bg-orange-50 rounded-lg"
            >
              <MessageSquare className="h-5 w-5" />
              Contact
            </Link>

            <div className="h-px bg-neutral-200 my-4" />

            <Button
              asChild
              className="w-full bg-orange-600 text-white hover:bg-orange-700 text-base font-semibold py-3 h-auto justify-start gap-3"
              onClick={onClose}
            >
              <Link href="/#quote">
                <FileCheck className="h-5 w-5" />
                Request a Quote
              </Link>
            </Button>
          </div>
        </nav>
      </div>
    </div>
  )
}

// Reusable form components from the main page
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

const SubmitButton = ({ children, isPending }: { children: React.ReactNode; isPending: boolean }) => (
  <button
    type="submit"
    disabled={isPending}
    className="flex w-full items-center justify-center gap-2 rounded-lg bg-neutral-900 px-6 py-3 text-base font-semibold text-white shadow-sm transition-colors hover:bg-neutral-800 disabled:bg-neutral-400"
  >
    {isPending ? <Loader2 className="h-5 w-5 animate-spin" /> : children}
    {!isPending && children}
  </button>
)

function ContactForm() {
  const id = useId()
  const [state, formAction, isPending] = useActionState<ContactFormState, FormData>(handleContactFormSubmit, {
    message: "",
    success: false,
  })
  const {
    register,
    formState: { errors },
    reset,
  } = useForm<ContactFormData>({
    resolver: zodResolver(contactFormSchema),
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
        <h3 className="mt-4 text-xl font-semibold text-neutral-800">Message Sent!</h3>
        <p className="mt-1 text-neutral-600">Thank you for reaching out. We'll get back to you shortly.</p>
      </div>
    )
  }

  return (
    <form action={formAction} className="space-y-5">
      <FieldWrapper id={`${id}-name`} label="Full Name" error={errors.name?.message || state.errors?.name?.[0]}>
        <FormInput {...register("name")} placeholder="John Doe" />
      </FieldWrapper>
      <FieldWrapper id={`${id}-email`} label="Email" error={errors.email?.message || state.errors?.email?.[0]}>
        <FormInput {...register("email")} type="email" placeholder="you@example.com" />
      </FieldWrapper>
      <FieldWrapper
        id={`${id}-phone`}
        label="Phone (Optional)"
        error={errors.phone?.message || state.errors?.phone?.[0]}
      >
        <FormInput {...register("phone")} type="tel" placeholder="(555) 123-4567" />
      </FieldWrapper>
      <FieldWrapper id={`${id}-message`} label="Message" error={errors.message?.message || state.errors?.message?.[0]}>
        <FormTextarea {...register("message")} rows={5} placeholder="How can we help you?" />
      </FieldWrapper>
      <SubmitButton isPending={isPending}>Send Message</SubmitButton>
      {!state.success && state.message && <p className="text-center text-sm text-red-600">{state.message}</p>}
    </form>
  )
}

export default function ContactPage() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)

  return (
    <div className="bg-white text-neutral-800">
      {/* Header */}
      <header className="sticky top-0 z-40 bg-white/95 backdrop-blur-sm shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-24 lg:h-28">
            {/* Logo - Doubled in size */}
            <Link href="/" className="flex items-center flex-shrink-0">
              <Image
                src="/clay-roofs-ny-logo.png"
                alt="Clay Roofs NY"
                width={1080}
                height={360}
                className="h-20 w-auto sm:h-24 lg:h-28"
              />
            </Link>

            {/* Desktop Navigation */}
            <div className="hidden lg:flex items-center space-x-8">
              {/* Phone Number - Always visible */}
              <a
                href="tel:2123654386"
                className="flex items-center gap-2 px-4 py-2 text-base font-medium text-neutral-700 hover:text-orange-600 transition-colors rounded-lg hover:bg-neutral-50"
              >
                <Phone className="w-5 h-5" />
                (212) 365-4386
              </a>

              <Link
                href="/gallery"
                className="px-4 py-2 text-base font-medium text-neutral-700 hover:text-orange-600 transition-colors rounded-lg hover:bg-neutral-50"
              >
                Projects
              </Link>
              <Link
                href="/about"
                className="px-4 py-2 text-base font-medium text-neutral-700 hover:text-orange-600 transition-colors rounded-lg hover:bg-neutral-50"
              >
                About
              </Link>
              <Link
                href="/contact"
                className="px-4 py-2 text-base font-medium text-orange-600 border-b-2 border-orange-600"
              >
                Contact
              </Link>
              <Button asChild className="bg-orange-600 text-white hover:bg-orange-700 text-base font-semibold px-6">
                <Link href="/#quote">Request a Quote</Link>
              </Button>
            </div>

            {/* Mobile: Phone + Menu */}
            <div className="flex items-center gap-3 lg:hidden">
              <a
                href="tel:2123654386"
                className="flex items-center gap-2 px-3 py-2 text-sm font-medium text-neutral-700 hover:text-orange-600 transition-colors"
              >
                <Phone className="w-4 h-4" />
                <span className="hidden sm:inline">(212) 365-4386</span>
              </a>
              <button
                onClick={() => setMobileMenuOpen(true)}
                className="p-2 rounded-lg text-neutral-700 hover:bg-neutral-100 transition-colors"
              >
                <Menu className="h-6 w-6" />
                <span className="sr-only">Open menu</span>
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Mobile Menu */}
      <MobileMenu isOpen={mobileMenuOpen} onClose={() => setMobileMenuOpen(false)} />

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="text-center">
          <h1 className="text-3xl font-extrabold tracking-tight sm:text-4xl">Contact Us</h1>
          <p className="mt-2 max-w-2xl mx-auto text-lg text-neutral-600">
            Have a question or need a quote? We're here to help.
          </p>
        </div>

        <div className="mt-16 grid grid-cols-1 gap-16 lg:grid-cols-2">
          <div className="space-y-8">
            <div>
              <h2 className="text-2xl font-bold">Get in Touch</h2>
              <div className="mt-4 space-y-4 text-lg text-neutral-700">
                <p className="flex items-start gap-3">
                  <MapPin className="h-6 w-6 flex-shrink-0 text-neutral-500 mt-1" />
                  <span>33-15 127th Pl, Corona, NY 11368</span>
                </p>
                <p className="flex items-center gap-3">
                  <Phone className="h-6 w-6 text-neutral-500" />
                  <a href="tel:212-365-4386" className="hover:underline">
                    (212) 365-4386
                  </a>
                </p>
                <p className="flex items-center gap-3">
                  <Mail className="h-6 w-6 text-neutral-500" />
                  <a href="mailto:hello@clayroofsny.com" className="hover:underline">
                    hello@clayroofsny.com
                  </a>
                </p>
              </div>
            </div>
            <div>
              <h2 className="text-2xl font-bold">Business Hours</h2>
              <div className="mt-4 space-y-2 text-lg text-neutral-700">
                <p className="flex items-center gap-3">
                  <Clock className="h-6 w-6 text-neutral-500" />
                  <span>Monday – Saturday: 8:00 AM – 5:00 PM</span>
                </p>
                <p className="flex items-center gap-3">
                  <Clock className="h-6 w-6 text-transparent" />
                  <span>Sunday: Closed</span>
                </p>
              </div>
            </div>
            <div className="aspect-[4/3] w-full overflow-hidden rounded-lg">
              <Image
                src="/placeholder.svg?width=800&height=600"
                alt="Map showing business location"
                width={800}
                height={600}
                className="w-full h-full object-cover"
              />
            </div>
          </div>

          <div className="rounded-lg border border-neutral-200 bg-neutral-50 p-6 sm:p-8">
            <ContactForm />
          </div>
        </div>
      </main>

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
