"use client"

import type React from "react"

import { useActionState, useEffect, useId } from "react"
import Link from "next/link"
import Image from "next/image"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { MapPin, Phone, Mail, Clock, Check, Loader2 } from "lucide-react"
import { Button } from "@/components/ui/button"
import { type ContactFormData, contactFormSchema } from "../schemas"
import { handleContactFormSubmit, type ContactFormState } from "../actions"

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
  return (
    <div className="bg-white text-neutral-800">
      <header className="sticky top-0 z-50 border-b border-neutral-200 bg-white shadow-sm">
        <div className="container mx-auto flex items-center justify-between px-4 py-4">
          <Link href="/" className="flex items-center">
            <Image src="/terraclay-logo.png" alt="Terra Clay" width={540} height={180} className="h-36 w-auto" />
          </Link>
          <nav className="flex flex-wrap items-center justify-end gap-1 sm:gap-2">
            <Button asChild variant="ghost" className="text-base">
              <a href="tel:2123654386" className="flex items-center">
                <Phone className="mr-2 h-4 w-4" />
                212-365-4386
              </a>
            </Button>
            <Button asChild variant="ghost" className="text-base">
              <Link href="/gallery">Gallery</Link>
            </Button>
            <Button asChild variant="ghost" className="text-base">
              <Link href="/about">About</Link>
            </Button>
            <Button asChild variant="default">
              <Link href="/#quote">Request a Quote</Link>
            </Button>
          </nav>
        </div>
      </header>

      <main className="container mx-auto px-4 py-12 sm:py-16">
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
                  <span>123 Clay Street, Queens, NY 11101</span>
                </p>
                <p className="flex items-center gap-3">
                  <Phone className="h-6 w-6 text-neutral-500" />
                  <a href="tel:212-365-4386" className="hover:underline">
                    (212) 365-4386
                  </a>
                </p>
                <p className="flex items-center gap-3">
                  <Mail className="h-6 w-6 text-neutral-500" />
                  <a href="mailto:contact@terraclay.com" className="hover:underline">
                    contact@terraclay.com
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
        <div className="container mx-auto px-4 py-6 text-center text-neutral-500">
          <p>&copy; {new Date().getFullYear()} Terra Clay. All Rights Reserved.</p>
        </div>
      </footer>
    </div>
  )
}
