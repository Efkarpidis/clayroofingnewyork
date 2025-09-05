"use client"

import React, { useEffect } from "react"
import { useActionState, useState } from "react"
import { StickyCallBar } from "@/components/sticky-call-bar"
import { ScrollHeader } from "@/components/scroll-header"
import { MapPin, Phone, Mail, Upload, Camera, FileText, X, Check, Shield } from "lucide-react"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { z } from "zod"
import Image from "next/image"

// Enhanced contact form schema
const contactFormSchema = z.object({
  name: z.string().min(2, { message: "Please enter your full name." }),
  email: z.string().email({ message: "Please enter a valid email address." }),
  phone: z.string().optional(),
  company: z.string().optional(),
  contactType: z.enum(["general-contractor", "architect", "homeowner", "other", "previous-client"], {
    errorMap: () => ({ message: "Please select your contact type." }),
  }),
  tileFamily: z.string().optional(),
  tileColor: z.string().optional(),
  message: z.string().min(10, { message: "Your message must be at least 10 characters long." }),
  file: z.instanceof(File).optional(),
  photos: z.array(z.instanceof(File)).optional(),
  privacyAccepted: z.boolean().refine((val) => val === true, {
    message: "You must accept the Privacy Policy to continue.",
  }),
  previousProjectReference: z.string().optional(),
})

type ContactFormData = z.infer<typeof contactFormSchema>

// Mock server action for contact form
async function handleContactFormSubmit(
  prevState: { message: string; success: boolean; errors?: any },
  formData: FormData,
): Promise<{ message: string; success: boolean; errors?: any }> {
  // Simulate processing delay
  await new Promise((resolve) => setTimeout(resolve, 1000))

  const data = {
    name: formData.get("name"),
    email: formData.get("email"),
    phone: formData.get("phone"),
    company: formData.get("company"),
    contactType: formData.get("contactType"),
    tileFamily: formData.get("tileFamily"),
    tileColor: formData.get("tileColor"),
    message: formData.get("message"),
    file: formData.get("file"),
    photos: formData.getAll("photos"),
    privacyAccepted: formData.get("privacyAccepted") === "on",
    previousProjectReference: formData.get("previousProjectReference"),
  }

  const validatedFields = contactFormSchema.safeParse({
    ...data,
    file: data.file && (data.file as File).size > 0 ? data.file : undefined,
    photos: (data.photos as File[]).filter((f) => f.size > 0),
  })

  if (!validatedFields.success) {
    return {
      message: "Please fix the errors below.",
      errors: validatedFields.error.flatten().fieldErrors,
      success: false,
    }
  }

  console.log("Contact form submitted:", validatedFields.data)

  return {
    message: "Thanks—your message was sent.",
    success: true,
  }
}

// Reusable form components
const FieldWrapper = ({
  id,
  label,
  error,
  children,
  required = false,
}: {
  id: string
  label: string
  error?: string
  children: React.ReactNode
  required?: boolean
}) => (
  <div className="space-y-2">
    <label htmlFor={id} className="block text-base font-medium text-neutral-700">
      {label}
      {required && <span className="text-red-500 ml-1">*</span>}
    </label>
    {children}
    {error && <p className="mt-1 text-sm text-red-600">{error}</p>}
  </div>
)

const FormInput = (props: React.ComponentProps<"input">) => (
  <input
    {...props}
    className="block w-full h-11 rounded-xl border border-neutral-200 bg-white px-3 py-2 text-base text-neutral-900 shadow-sm focus:border-orange-500 focus:ring-2 focus:ring-orange-500/20 focus:outline-none hover:border-neutral-300 transition-colors placeholder:text-neutral-400"
  />
)

const FormTextarea = (props: React.ComponentProps<"textarea">) => (
  <textarea
    {...props}
    className="block w-full rounded-md border-neutral-300 bg-white p-3 text-base shadow-sm focus:border-orange-500 focus:ring-orange-500 focus:outline-none focus:ring-2"
  />
)

const FormSelect = ({ children, ...props }: React.ComponentProps<"select">) => (
  <div className="relative">
    <select
      {...props}
      className="block w-full h-11 rounded-xl border border-neutral-200 bg-white px-3 py-2 text-base text-neutral-900 shadow-sm appearance-none focus:border-orange-500 focus:ring-2 focus:ring-orange-500/20 focus:outline-none hover:border-neutral-300 transition-colors cursor-pointer"
      style={{
        backgroundImage: `url("data:image/svg+xml,%3csvg xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 20 20'%3e%3cpath stroke='%236b7280' strokeLinecap='round' strokeLinejoin='round' strokeWidth='1.5' d='m6 8 4 4 4-4'/%3e%3c/svg%3e")`,
        backgroundPosition: "right 12px center",
        backgroundRepeat: "no-repeat",
        backgroundSize: "16px",
        paddingRight: "40px",
      }}
    >
      {children}
    </select>
  </div>
)

const FileUploadButton = ({
  file,
  onChange,
  accept,
  label,
  isPhotos = false,
}: {
  file: File | null
  onChange: (file: File | null) => void
  accept: string
  label: string
  isPhotos?: boolean
}) => {
  const [isMobile, setIsMobile] = useState(false)
  const fileInputRef = React.useRef<HTMLInputElement>(null)
  const cameraInputRef = React.useRef<HTMLInputElement>(null)

  React.useEffect(() => {
    setIsMobile(/Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent))
  }, [])

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = e.target.files?.[0] || null
    onChange(selectedFile)
  }

  const removeFile = () => {
    onChange(null)
    if (fileInputRef.current) fileInputRef.current.value = ""
    if (cameraInputRef.current) cameraInputRef.current.value = ""
  }

  const getFilePreview = (file: File) => {
    if (file.type.startsWith("image/")) {
      return URL.createObjectURL(file)
    }
    return null
  }

  return (
    <div className="space-y-3">
      <input ref={fileInputRef} type="file" accept={accept} onChange={handleFileChange} className="sr-only" />
      {isPhotos && isMobile && (
        <input
          ref={cameraInputRef}
          type="file"
          accept="image/*"
          capture="environment"
          onChange={handleFileChange}
          className="sr-only"
        />
      )}

      <div className="space-y-2">
        <button
          type="button"
          onClick={() => fileInputRef.current?.click()}
          className="flex w-full items-center justify-center gap-3 rounded-lg border-2 border-dashed border-neutral-300 bg-neutral-50 p-4 text-base font-medium text-neutral-700 transition-colors hover:border-orange-400 hover:bg-orange-50 tappable"
        >
          {isPhotos ? <Camera className="h-5 w-5" /> : <Upload className="h-5 w-5" />}
          {file ? file.name : label}
        </button>

        {isPhotos && isMobile && (
          <button
            type="button"
            onClick={() => cameraInputRef.current?.click()}
            className="flex w-full items-center justify-center gap-3 rounded-lg border border-neutral-300 bg-white p-3 text-base font-medium text-neutral-700 transition-colors hover:border-orange-400 hover:bg-orange-50 tappable"
          >
            <Camera className="h-4 w-4" />
            Take Photo
          </button>
        )}
      </div>

      {file && (
        <div className="relative">
          <div className="aspect-video overflow-hidden rounded-lg border border-neutral-200 bg-neutral-100 max-w-xs">
            {getFilePreview(file) ? (
              <img
                src={getFilePreview(file)! || "/placeholder.svg"}
                alt={file.name}
                className="h-full w-full object-cover"
              />
            ) : (
              <div className="flex h-full items-center justify-center">
                <div className="text-center">
                  <FileText className="mx-auto h-8 w-8 text-neutral-400" />
                  <p className="mt-1 text-sm text-neutral-500 truncate px-2">{file.name}</p>
                </div>
              </div>
            )}
          </div>
          <button
            type="button"
            onClick={removeFile}
            className="absolute -right-2 -top-2 flex h-6 w-6 items-center justify-center rounded-full bg-red-500 text-white hover:bg-red-600 tappable"
          >
            <X className="h-4 w-4" />
          </button>
        </div>
      )}

      {!file && <p className="text-sm text-neutral-500">No file selected</p>}
    </div>
  )
}

const MultiFileUploadButton = ({
  files,
  onChange,
  accept,
  label,
}: {
  files: File[]
  onChange: (files: File[]) => void
  accept: string
  label: string
}) => {
  const [isMobile, setIsMobile] = useState(false)
  const fileInputRef = React.useRef<HTMLInputElement>(null)
  const cameraInputRef = React.useRef<HTMLInputElement>(null)

  React.useEffect(() => {
    setIsMobile(/Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent))
  }, [])

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFiles = Array.from(e.target.files || [])
    onChange([...files, ...selectedFiles])
  }

  const removeFile = (index: number) => {
    const newFiles = files.filter((_, i) => i !== index)
    onChange(newFiles)
  }

  const getFilePreview = (file: File) => {
    if (file.type.startsWith("image/")) {
      return URL.createObjectURL(file)
    }
    return null
  }

  return (
    <div className="space-y-3">
      <input ref={fileInputRef} type="file" accept={accept} multiple onChange={handleFileChange} className="sr-only" />
      {isMobile && (
        <input
          ref={cameraInputRef}
          type="file"
          accept="image/*"
          capture="environment"
          multiple
          onChange={handleFileChange}
          className="sr-only"
        />
      )}

      <div className="space-y-2">
        <button
          type="button"
          onClick={() => fileInputRef.current?.click()}
          className="flex w-full items-center justify-center gap-3 rounded-lg border-2 border-dashed border-neutral-300 bg-neutral-50 p-4 text-base font-medium text-neutral-700 transition-colors hover:border-orange-400 hover:bg-orange-50 tappable"
        >
          <Camera className="h-5 w-5" />
          {label}
        </button>

        {isMobile && (
          <button
            type="button"
            onClick={() => cameraInputRef.current?.click()}
            className="flex w-full items-center justify-center gap-3 rounded-lg border border-neutral-300 bg-white p-3 text-base font-medium text-neutral-700 transition-colors hover:border-orange-400 hover:bg-orange-50 tappable"
          >
            <Camera className="h-4 w-4" />
            Take Photo
          </button>
        )}
      </div>

      {files.length > 0 && (
        <div className="grid grid-cols-2 gap-3">
          {files.map((file, index) => (
            <div key={index} className="relative">
              <div className="aspect-square overflow-hidden rounded-lg border border-neutral-200 bg-neutral-100">
                {getFilePreview(file) ? (
                  <img
                    src={getFilePreview(file)! || "/placeholder.svg"}
                    alt={file.name}
                    className="h-full w-full object-cover"
                  />
                ) : (
                  <div className="flex h-full items-center justify-center">
                    <div className="text-center">
                      <FileText className="mx-auto h-6 w-6 text-neutral-400" />
                      <p className="mt-1 text-xs text-neutral-500 truncate px-2">{file.name}</p>
                    </div>
                  </div>
                )}
              </div>
              <button
                type="button"
                onClick={() => removeFile(index)}
                className="absolute -right-2 -top-2 flex h-5 w-5 items-center justify-center rounded-full bg-red-500 text-white hover:bg-red-600 tappable"
              >
                <X className="h-3 w-3" />
              </button>
            </div>
          ))}
        </div>
      )}

      {files.length === 0 && <p className="text-sm text-neutral-500">No photos selected</p>}
    </div>
  )
}

// Tile color options based on family
const tileColorOptions = {
  Vienna: ["Charcoal", "Terracotta", "Slate Gray", "Request a Color"],
  "S-Mixed": ["Mediterranean Blend", "Tuscan Mix", "Antique Blend", "Request a Color"],
  Selectum: [
    "Brown",
    "Carmine",
    "Cognac",
    "Cognac Rustic",
    "Dark Blue",
    "Dark Green",
    "Galia",
    "Light Green",
    "Provence",
    "Red",
    "Rustic Red",
    "Slate",
    "Request a Color",
  ],
}

function ContactForm() {
  const [state, formAction, isPending] = useActionState(handleContactFormSubmit, {
    message: "",
    success: false,
  })
  const [file, setFile] = useState<File | null>(null)
  const [photos, setPhotos] = useState<File[]>([])
  const [selectedTileFamily, setSelectedTileFamily] = useState<string>("")
  const [selectedContactType, setSelectedContactType] = useState<string>("")
  const [showToast, setShowToast] = useState(false)

  const {
    register,
    formState: { errors },
    setValue,
    watch,
    reset,
  } = useForm<ContactFormData>({
    resolver: zodResolver(contactFormSchema),
  })

  const watchedTileFamily = watch("tileFamily")
  const watchedContactType = watch("contactType")

  // Handle URL parameters for prefilled tile data
  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search)
    const tileFamily = urlParams.get("tileFamily")
    const tileColor = urlParams.get("tileColor")

    if (tileFamily) {
      setValue("tileFamily", tileFamily)
      setSelectedTileFamily(tileFamily)
    }
    if (tileColor) {
      setValue("tileColor", tileColor)
    }

    // Smooth scroll to form
    const hash = window.location.hash
    if (hash === "#quote") {
      setTimeout(() => {
        const formElement = document.getElementById("quote")
        if (formElement) {
          formElement.scrollIntoView({ behavior: "smooth", block: "start" })
        }
      }, 100)
    }
  }, [setValue])

  // Update selected tile family when form value changes
  useEffect(() => {
    if (watchedTileFamily) {
      setSelectedTileFamily(watchedTileFamily)
      // Reset tile color when family changes
      setValue("tileColor", "")
    }
  }, [watchedTileFamily, setValue])

  // Update selected contact type when form value changes
  useEffect(() => {
    if (watchedContactType) {
      setSelectedContactType(watchedContactType)
    }
  }, [watchedContactType])

  React.useEffect(() => {
    setValue("file", file)
  }, [file, setValue])

  React.useEffect(() => {
    setValue("photos", photos)
  }, [photos, setValue])

  useEffect(() => {
    if (state.success) {
      setShowToast(true)
      // Clear form
      reset()
      setFile(null)
      setPhotos([])
      setSelectedTileFamily("")
      setSelectedContactType("")

      // Hide toast after 5 seconds
      setTimeout(() => {
        setShowToast(false)
      }, 5000)
    }
  }, [state.success, reset])

  if (state.success && !showToast) {
    return (
      <div className="flex flex-col items-center justify-center rounded-lg border border-green-200 bg-green-50 p-8 text-center">
        <div className="h-12 w-12 rounded-full bg-green-100 p-2 text-green-600 flex items-center justify-center mb-4">
          <Check className="h-6 w-6" />
        </div>
        <h3 className="text-xl font-semibold text-neutral-800 mb-2">Message Sent!</h3>
        <p className="text-neutral-600">Thank you for reaching out. We'll get back to you shortly.</p>
      </div>
    )
  }

  return (
    <>
      {/* Success Toast */}
      {showToast && (
        <div className="fixed top-4 right-4 z-50 bg-green-600 text-white px-6 py-3 rounded-lg shadow-lg flex items-center gap-2">
          <Check className="h-5 w-5" />
          <span>Thanks—your message was sent.</span>
        </div>
      )}

      <form action={formAction} className="space-y-6" id="quote">
        <FieldWrapper id="name" label="Full Name" required error={errors.name?.message || state.errors?.name?.[0]}>
          <FormInput {...register("name")} placeholder="Cocoa Clay" />
        </FieldWrapper>

        <FieldWrapper id="email" label="Email" required error={errors.email?.message || state.errors?.email?.[0]}>
          <FormInput {...register("email")} type="email" placeholder="cocoa@example.com" />
        </FieldWrapper>

        <FieldWrapper id="phone" label="Phone" error={errors.phone?.message || state.errors?.phone?.[0]}>
          <FormInput {...register("phone")} type="tel" placeholder="(718) 000-0000" />
        </FieldWrapper>

        <FieldWrapper id="company" label="Company" error={errors.company?.message || state.errors?.company?.[0]}>
          <FormInput {...register("company")} placeholder="Cocoa's Roofing Company" />
        </FieldWrapper>

        <FieldWrapper
          id="contactType"
          label="I am a"
          required
          error={errors.contactType?.message || state.errors?.contactType?.[0]}
        >
          <FormSelect
            {...register("contactType")}
            onChange={(e) => {
              register("contactType").onChange(e)
              setSelectedContactType(e.target.value)
            }}
          >
            <option value="" className="text-neutral-400">
              Select...
            </option>
            <option value="general-contractor">General Contractor</option>
            <option value="architect">Architect</option>
            <option value="homeowner">Homeowner</option>
            <option value="previous-client">Previous Client (Warranty or Service Request)</option>
            <option value="other">Manufacturer</option>
            <option value="other">Other</option>
          </FormSelect>
          {selectedContactType === "previous-client" && (
            <div className="mt-2 text-sm text-neutral-600 italic">Warranty & service support for past projects.</div>
          )}
        </FieldWrapper>

        {selectedContactType === "previous-client" && (
          <FieldWrapper
            id="previousProjectReference"
            label="Project Address or Year of Installation (if known)"
            error={errors.previousProjectReference?.message || state.errors?.previousProjectReference?.[0]}
          >
            <FormInput {...register("previousProjectReference")} placeholder="e.g., 123 Main St, Brooklyn or 2019" />
          </FieldWrapper>
        )}

        <FieldWrapper
          id="tileFamily"
          label="Tile Family"
          error={errors.tileFamily?.message || state.errors?.tileFamily?.[0]}
        >
          <FormSelect {...register("tileFamily")}>
            <option value="" className="text-neutral-400">
              Select...
            </option>
            <option value="Vienna">Vienna</option>
            <option value="S-Mixed">S-Mixed</option>
            <option value="Selectum">Selectum</option>
            <option value="Request">Request</option>
          </FormSelect>
        </FieldWrapper>

        {selectedTileFamily && (
          <FieldWrapper
            id="tileColor"
            label="Tile Color"
            error={errors.tileColor?.message || state.errors?.tileColor?.[0]}
          >
            <FormSelect {...register("tileColor")}>
              <option value="">Select...</option>
              {tileColorOptions[selectedTileFamily as keyof typeof tileColorOptions]?.map((color) => (
                <option key={color} value={color}>
                  {color}
                </option>
              ))}
            </FormSelect>
          </FieldWrapper>
        )}

        <FieldWrapper
          id="message"
          label="Message"
          required
          error={errors.message?.message || state.errors?.message?.[0]}
        >
          <FormTextarea {...register("message")} rows={4} placeholder="Tell us about your project..." />
        </FieldWrapper>

        <FieldWrapper id="file" label="Attach File" error={state.errors?.file?.[0]}>
          <FileUploadButton
            file={file}
            onChange={setFile}
            accept=".pdf,.doc,.docx,image/*"
            label="Choose File"
            isPhotos={false}
          />
        </FieldWrapper>

        <FieldWrapper id="photos" label="Upload Photo" error={state.errors?.photos?.[0]}>
          <MultiFileUploadButton files={photos} onChange={setPhotos} accept="image/*" label="Upload Photo" />
        </FieldWrapper>

        <div className="space-y-2">
          <div className="flex items-start gap-3">
            <input
              type="checkbox"
              id="privacyAccepted"
              {...register("privacyAccepted")}
              className="mt-1 h-4 w-4 rounded border-neutral-400 text-orange-600 focus:ring-orange-600"
            />
            <label htmlFor="privacyAccepted" className="text-sm text-neutral-700">
              I have read and accept the{" "}
              <a href="/privacy" className="text-orange-600 hover:underline">
                Privacy Policy
              </a>
              <span className="text-red-500 ml-1">*</span>
            </label>
          </div>
          {(errors.privacyAccepted?.message || state.errors?.privacyAccepted?.[0]) && (
            <p className="text-sm text-red-600">
              {errors.privacyAccepted?.message || state.errors?.privacyAccepted?.[0]}
            </p>
          )}
        </div>

        {/* Supportive note for previous clients */}
        {selectedContactType === "previous-client" && (
          <div className="mt-4 p-4 bg-blue-50 border border-blue-200 rounded-lg">
            <p className="text-sm text-blue-800 flex items-start gap-2">
              <Shield className="h-4 w-4 text-blue-600 mt-0.5 flex-shrink-0" />
              <span>
                If you are an existing client with a warranty or service need, please include your project address and
                details so we can assist you quickly.
              </span>
            </p>
          </div>
        )}

        <button
          type="submit"
          disabled={isPending}
          className="flex w-full items-center justify-center gap-2 rounded-lg bg-orange-600 px-6 py-3 text-base font-semibold text-white shadow-sm transition-colors hover:bg-orange-700 disabled:bg-orange-400 focus:outline-none focus:ring-2 focus:ring-orange-500 tappable"
        >
          {isPending ? (
            <>
              <div className="h-5 w-5 animate-spin rounded-full border-2 border-white border-t-transparent" />
              Sending...
            </>
          ) : (
            "Send"
          )}
        </button>

        {!state.success && state.message && <p className="text-center text-sm text-red-600">{state.message}</p>}
      </form>
    </>
  )
}

function ContactPage() {
  return (
    <div className="bg-white text-neutral-800">
      <ScrollHeader currentPage="contact" />

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="text-center mb-12">
          <h1 className="text-3xl md:text-4xl font-extrabold tracking-tight sm:text-4xl">Contact Us</h1>
          <p className="mt-2 max-w-2xl mx-auto text-lg text-neutral-600">
            Have a question or need a quote? We're here to help.
          </p>
          <p className="mt-1 text-sm text-neutral-500 italic">
            We proudly back our installations with warranties up to 100 years.
          </p>
        </div>

        <div className="mt-16 grid grid-cols-1 gap-16 lg:grid-cols-2">
          {/* Left Side - Contact Info with Clay Tint Background */}
          <div className="bg-gradient-to-br from-orange-50 to-orange-100 rounded-lg p-8 space-y-8">
            <div>
              <h2 className="text-2xl font-bold text-neutral-900 mb-6">Get in Touch</h2>
              <div className="space-y-4 text-lg text-neutral-700">
                <p className="flex items-start gap-3">
                  <MapPin className="h-6 w-6 flex-shrink-0 text-orange-600 mt-1" />
                  <span>33-15 127th Pl, Corona, NY 11368</span>
                </p>
                <p className="flex items-center gap-3">
                  <Phone className="h-6 w-6 text-orange-600" />
                  <div>
                    <div className="flex gap-2">
                      <a href="tel:+12123654386" className="hover:underline">
                        (212) 365-4386
                      </a>
                      <span className="text-neutral-400">|</span>
                      <a href="sms:+12123654386" className="hover:underline">
                        Text
                      </a>
                    </div>
                    <span className="text-sm text-neutral-600">Call or iMessage</span>
                  </div>
                </p>
                <p className="flex items-center gap-3">
                  <Mail className="h-6 w-6 text-orange-600" />
                  <a href="mailto:chris@clayroofingnewyork.com" className="hover:underline">
                    chris@clayroofingnewyork.com
                  </a>
                </p>
              </div>
            </div>

            {/* How to Get Here */}
            <div>
              <h3 className="text-xl font-bold text-neutral-900 mb-4">How to Get Here</h3>
              <a
                href="https://maps.google.com/?q=33-15+127th+Pl,+Corona,+NY+11368"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 bg-orange-600 text-white px-4 py-2 rounded-lg hover:bg-orange-700 transition-colors tappable"
              >
                <MapPin className="h-4 w-4" />
                Open in Google Maps
              </a>
            </div>

            {/* Before You Contact Us */}
            <div>
              <h3 className="text-xl font-bold text-neutral-900 mb-4">Before You Contact Us</h3>
              <ul className="space-y-3 text-neutral-700">
                <li className="flex items-start gap-3">
                  <Check className="h-5 w-5 text-orange-600 mt-0.5 flex-shrink-0" />
                  <span>Looking for a free estimate? We got you covered.</span>
                </li>
                <li className="flex items-start gap-3">
                  <Check className="h-5 w-5 text-orange-600 mt-0.5 flex-shrink-0" />
                  <span>Already know your preferred tile color?</span>
                </li>
                <li className="flex items-start gap-3">
                  <Check className="h-5 w-5 text-orange-600 mt-0.5 flex-shrink-0" />
                  <span>Do you have architectural plans/blueprints?</span>
                </li>
                <li className="flex items-start gap-3">
                  <Check className="h-5 w-5 text-orange-600 mt-0.5 flex-shrink-0" />
                  <span>Are you a contractor, architect, or homeowner?</span>
                </li>
                 <li className="flex items-start gap-3">
                  <X className="h-5 w-5 text-red-600 mt-0.5 flex-shrink-0" />
                  <span>We are not a roof repair service unless you are a previous client.</span>
                </li>
              </ul>
            </div>
          </div>

          {/* Right Side - Contact Form */}
          <div className="rounded-lg border border-neutral-200 bg-white p-6 sm:p-8 shadow-sm">
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

export default ContactPage
