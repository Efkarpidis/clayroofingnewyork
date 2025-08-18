"use client"

import type React from "react"
import { useActionState } from "react"
import Link from "next/link"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { StickyCallBar } from "@/components/sticky-call-bar"
import { MapPin, Phone, Mail, Clock, Check, Loader2, Menu } from "lucide-react"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { type ContactFormData, contactFormSchema } from "../schemas"
import { handleContactFormSubmit } from "../actions"

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
  </button>
)

type ContactFormState = {
  message: string
  success: boolean
}

function ContactForm() {
  const id = "contact-form"
  const [state, formAction, isPending] = useActionState<ContactFormState, ContactFormData>(handleContactFormSubmit, {
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
      <SubmitButton isPending={isPending}>Submit</SubmitButton>
      {!state.success && state.message && <p className="text-center text-sm text-red-600">{state.message}</p>}
    </form>
  )
}

export default function ContactPage() {
  return (
    <div className="bg-white text-neutral-800">
      <header className="bg-white shadow-sm sticky top-0 z-30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-32 md:h-36">
            {/* Logo */}
            <Link href="/" className="flex items-center flex-shrink-0 -ml-2 sm:-ml-4">
              <Image
                src="/clay-roofs-new-york-logo-final.png"
                alt="Clay Roofs New York - Specializing in Clay and Ceramic Roofing"
                width={500}
                height={150}
                className="h-40 w-auto sm:h-48 md:h-56 lg:h-64"
              />
            </Link>

            {/* Burger Menu */}
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" size="icon" className="text-neutral-700 hover:bg-neutral-100">
                  <Menu className="h-6 w-6" />
                  <span className="sr-only">Toggle menu</span>
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-56">
                <DropdownMenuItem asChild>
                  <a
                    href="tel:2123654386"
                    className="flex items-center gap-2 px-2 py-2 text-sm font-medium text-neutral-700 hover:text-orange-600 transition-colors cursor-pointer"
                  >
                    <Phone className="w-4 h-4" />
                    212-365-4386
                  </a>
                </DropdownMenuItem>
                <DropdownMenuItem asChild>
                  <Link
                    href="/"
                    className="px-2 py-2 text-sm font-medium text-neutral-700 hover:text-orange-600 transition-colors cursor-pointer"
                  >
                    Home
                  </Link>
                </DropdownMenuItem>
                <DropdownMenuItem asChild>
                  <Link
                    href="/gallery"
                    className="px-2 py-2 text-sm font-medium text-neutral-700 hover:text-orange-600 transition-colors cursor-pointer"
                  >
                    Projects
                  </Link>
                </DropdownMenuItem>
                <DropdownMenuItem asChild>
                  <Link
                    href="/about"
                    className="px-2 py-2 text-sm font-medium text-neutral-700 hover:text-orange-600 transition-colors cursor-pointer"
                  >
                    About
                  </Link>
                </DropdownMenuItem>
                <DropdownMenuItem asChild>
                  <Link
                    href="/contact"
                    className="px-2 py-2 text-sm font-medium text-orange-600 bg-orange-50 hover:bg-orange-100 transition-colors cursor-pointer rounded-md"
                  >
                    Contact
                  </Link>
                </DropdownMenuItem>
                <DropdownMenuItem asChild>
                  <Link
                    href="/#quote"
                    className="px-2 py-2 text-sm font-medium bg-orange-600 text-white hover:bg-orange-700 transition-colors cursor-pointer rounded-md"
                  >
                    Request a Quote
                  </Link>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="text-center mb-12">
          <h1 className="text-3xl md:text-4xl font-extrabold tracking-tight sm:text-4xl">Contact Us</h1>
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
                  <span>Monday - Friday: 8:00 AM - 5:00 PM</span>
                </p>
                <p className="flex items-center gap-3">
                  <Clock className="h-6 w-6 text-transparent" />
                  <span>Saturday - Sunday: By Appointment</span>
                </p>
              </div>
            </div>
          </div>

          <div className="rounded-lg border border-neutral-200 bg-neutral-50 p-6 sm:p-8">
            <ContactForm />
          </div>
        </div>
      </main>

      <footer className="border-t border-neutral-200 bg-neutral-50">
        <div className="max-w-7xl mx-auto px-4 py-6 space-y-4">
          <div className="flex items-center justify-center gap-3 text-sm text-neutral-600">
            <a
              href="https://www.laescandella.com"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-3 hover:opacity-80 transition-opacity"
            >
              <Image src="/la-escandella-logo.webp" alt="La Escandella" width={80} height={40} className="h-6 w-auto" />
              <span>Proudly partnered with La Escandella.</span>
            </a>
          </div>
          <div className="text-center text-neutral-500">
            <p>&copy; {new Date().getFullYear()} Clay Roofs New York. All Rights Reserved.</p>
          </div>
        </div>
      </footer>

      <StickyCallBar />
    </div>
  )
}
