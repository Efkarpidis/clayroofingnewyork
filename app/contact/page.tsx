"use client"

import React, { useEffect, useState, useTransition } from "react"
import { StickyCallBar } from "@/components/sticky-call-bar"
import { ScrollHeader } from "@/components/scroll-header"
import { Button } from "@/components/ui/button"
import { MapPin, Phone, Mail, Upload, Camera, FileText, X, Check, Shield, MessageCircle, Clock } from "lucide-react"
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
  contactType: z.enum(["general-contractor", "architect", "homeowner", "manufacturer", "other", "previous-client"], {

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

const formAction = async (
  fd: FormData,
  setState: React.Dispatch<React.SetStateAction<{ message: string; success: boolean; errors?: Record<string, string[]> }>>,
  setError: ReturnType<typeof useForm<ContactFormData>>["setError"]
) => {
  try {
    const res = await fetch("/api/contact", {
      method: "POST",
      body: fd,
    });

    const json = await res.json().catch(() => ({} as any));

    setState({
      message: json?.message || (res.ok ? "Thanks—your message was sent." : "Please complete the required fields highlighted below."),
      success: res.ok,
      errors: json?.fieldErrors,
    });

    if (json?.fieldErrors) {
      Object.entries(json.fieldErrors).forEach(([field, msg]) => {
        if (msg) setError(field as keyof ContactFormData, { type: "server", message: Array.isArray(msg) ? msg[0] : msg });
      });
    }
  } catch (err) {
    console.error("Error submitting contact form:", err);
    setState({
      message: "Something went wrong. Please try again later.",
      success: false,
    });
  }
};
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
  // Form submit result state
  const [state, setState] = useState<{
    message: string
    success: boolean
    errors?: Record<string, string[]>
  }>({ message: "", success: false, errors: undefined })

  // Pending state for the submit button
  const [isPending, startTransition] = useTransition()

  // Local UI state
  const [file, setFile] = useState<File | null>(null)
  const [photos, setPhotos] = useState<File[]>([])
  const [selectedTileFamily, setSelectedTileFamily] = useState<string>("")
  const [selectedContactType, setSelectedContactType] = useState<string>("")
  const [showToast, setShowToast] = useState(false)

  // React Hook Form (keep values mounted)
  const {
    register,
    handleSubmit,
    setError,
    formState: { errors },
    setValue,
    watch,
    reset,
  } = useForm<ContactFormData>({
    resolver: zodResolver(contactFormSchema),
    shouldUnregister: false,
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

    // Always scroll to top when page loads - no auto-scroll to form
    window.scrollTo(0, 0)
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
      // Clear form only on success
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

// ---- handle submit without losing inputs on validation errors ----
const onSubmit = (values: ContactFormData) => {
  const fd = new FormData();
  fd.append("name", values.name ?? "");
  fd.append("email", values.email ?? "");
  fd.append("phone", values.phone ?? "");
  fd.append("company", values.company ?? "");
  fd.append("contactType", values.contactType ?? "");
  fd.append("tileFamily", values.tileFamily ?? "");
  fd.append("tileColor", values.tileColor ?? "");
  fd.append("message", values.message ?? "");
  if (values.file) fd.append("file", values.file);
  (values.photos ?? []).forEach((p) => fd.append("photos", p));
  fd.append("privacyAccepted", values.privacyAccepted ? "on" : "off");
  fd.append("previousProjectReference", values.previousProjectReference ?? "");

 startTransition(() => {
  formAction(fd, setState, setError);
})
};

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

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-6" id="quote">
        <FieldWrapper id="name" label="Name" required error={errors.name?.message || state.errors?.name?.[0]}>
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
            <option value="homeowner">Homeowner</option>
            <option value="architect">Architect</option>
            <option value="manufacturer">Manufacturer</option>
            <option value="previous-client">Previous Client (Warranty or Service Request)</option>
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
          <FormTextarea {...register("message")} rows={4} placeholder="Type your message here." />
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

        {!state.success && state.message && (
          <p className="text-center text-sm text-red-600">
            {state.message === "Please fix the errors below."
              ? "Please complete the required fields highlighted below."
              : state.message}
          </p>
        )}
      </form>
    </>
  )
}

function ContactPage() {
  const [addressCopied, setAddressCopied] = useState(false)

  // Ensure page always loads at top
  useEffect(() => {
    window.scrollTo(0, 0)
  }, [])

  const copyAddressToClipboard = async () => {
    try {
      await navigator.clipboard.writeText("33-15 127th Pl, Corona, NY 11368")
      setAddressCopied(true)
      setTimeout(() => setAddressCopied(false), 2000)
    } catch (err) {
      console.error("Failed to copy address:", err)
    }
  }

  return (
    <div className="bg-white text-neutral-800 min-h-screen">
      <ScrollHeader currentPage="contact" />

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-16">
        {/* Header Section */}
        <div className="text-center mb-8 sm:mb-12">
          <h1 className="text-2xl sm:text-3xl md:text-4xl font-extrabold tracking-tight text-neutral-900">
            Contact Us
          </h1>
          <p className="mt-2 max-w-2xl mx-auto text-base sm:text-lg text-neutral-600">
            Have a question or need a quote? We're here to help.
          </p>
          <p className="mt-1 text-sm text-neutral-500 italic">
            We proudly back our installations with warranties up to 100 years.
          </p>
        </div>

        <div className="grid grid-cols-1 gap-8 lg:gap-16 lg:grid-cols-2">
          {/* Left Side - Contact Info */}
          <div className="bg-gradient-to-br from-orange-50 to-orange-100 rounded-xl p-6 sm:p-8 space-y-6">
            {/* Get in Touch Section */}
            <div>
              <h2 className="text-xl font-semibold text-neutral-900 mb-4">Get in Touch</h2>

              {/* Helper Text */}
              <p className="text-sm text-neutral-500 mb-4">Tap an option to get in touch</p>

              {/* Contact Buttons */}
              <div className="space-y-4">
                {/* Phone Call */}
                <Button
                  variant="outline"
                  className="w-full justify-start gap-3 h-auto py-3 px-4 text-base font-medium text-neutral-800 border-neutral-300 bg-white hover:bg-neutral-50 active:bg-neutral-100 transition-colors"
                  asChild
                >
                  <a href="tel:+12123654386">
                    <Phone className="h-5 w-5 text-orange-600 flex-shrink-0" />
                    <span>Call: 212-365-4386</span>
                  </a>
                </Button>

                {/* Text/SMS */}
                <Button
                  variant="outline"
                  className="w-full justify-start gap-3 h-auto py-3 px-4 text-base font-medium text-neutral-800 border-neutral-300 bg-white hover:bg-neutral-50 active:bg-neutral-100 transition-colors"
                  asChild
                >
                  <a href="sms:+12123654386">
                    <MessageCircle className="h-5 w-5 text-orange-600 flex-shrink-0" />
                    <span>Text: 212-365-4386</span>
                  </a>
                </Button>

                {/* WhatsApp */}
                <Button
                  variant="outline"
                  className="w-full justify-start gap-3 h-auto py-3 px-4 text-base font-medium text-neutral-800 border-neutral-300 bg-white hover:bg-neutral-50 active:bg-neutral-100 transition-colors"
                  asChild
                >
                  <a href="https://wa.me/12123654386" target="_blank" rel="noopener noreferrer">
                    <svg className="h-5 w-5 text-orange-600 flex-shrink-0" viewBox="0 0 24 24" fill="currentColor">
                      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893A11.821 11.821 0 0020.885 3.097" />
                    </svg>
                    <span>WhatsApp: 212-365-4386</span>
                  </a>
                </Button>

                {/* Email */}
                <Button
                  variant="outline"
                  className="w-full justify-start gap-3 h-auto py-3 px-4 text-base font-medium text-neutral-800 border-neutral-300 bg-white hover:bg-neutral-50 active:bg-neutral-100 transition-colors"
                  asChild
                >
                  <a href="mailto:chris@clayroofingnewyork.com">
                    <Mail className="h-5 w-5 text-orange-600 flex-shrink-0" />
                    <div className="flex flex-col items-start min-w-0">
                      <span className="text-neutral-900 font-medium">Email Us</span>
                      <span className="text-xs text-neutral-500 truncate w-full">chris@clayroofingnewyork.com</span>
                    </div>
                  </a>
                </Button>
              </div>
            </div>

            {/* How to Get Here */}
            <div>
              <h3 className="text-xl font-semibold text-neutral-900 mb-4 flex items-center gap-2">
                <MapPin className="h-5 w-5 text-orange-600" />
                How to Get Here
              </h3>
              <div className="flex items-center justify-start gap-4 sm:gap-6 mb-4">
                <a
                  href="https://www.google.com/maps/search/?api=1&query=33-15+127th+Pl,+Corona,+NY+11368"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="rounded-xl border border-neutral-200 bg-white p-2 shadow-sm hover:shadow transition"
                  aria-label="Open in Google Maps"
                >
                  <Image src="/icons/google-maps.svg" alt="Google Maps" width={40} height={40} />
                </a>

                <a
                  href="http://maps.apple.com/?q=33-15+127th+Pl,+Corona,+NY+11368"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="rounded-xl border border-neutral-200 bg-white p-2 shadow-sm hover:shadow transition"
                  aria-label="Open in Apple Maps"
                >
                  <Image src="/icons/apple-maps.svg" alt="Apple Maps" width={40} height={40} />
                </a>

                <a
                  href="https://waze.com/ul?q=33-15+127th+Pl,+Corona,+NY+11368"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="rounded-xl border border-neutral-200 bg-white p-2 shadow-sm hover:shadow transition"
                  aria-label="Open in Waze"
                >
                  <Image src="/icons/waze.svg" alt="Waze" width={40} height={40} />
                </a>
              </div>

              {/* Copy Address Button */}
              <Button
                variant="outline"
                onClick={copyAddressToClipboard}
                className="w-full justify-start gap-3 h-auto py-3 px-4 text-base font-medium text-neutral-800 border-neutral-300 bg-white hover:bg-neutral-50 active:bg-neutral-100 transition-colors"
                aria-label="Copy address"
              >
                <MapPin className="h-5 w-5 text-orange-600 flex-shrink-0" />
                <div className="flex flex-col items-start">
                  <span className="text-neutral-900 font-medium">33-15 127th Pl, Corona, NY 11368</span>
                  <span className="text-xs text-neutral-500">Tap to copy</span>
                </div>
              </Button>

              {addressCopied && (
                <div
                  className="mt-2 text-sm text-green-600 font-medium animate-in fade-in-0 duration-200"
                  role="status"
                  aria-live="polite"
                >
                  Copied to clipboard
                </div>
              )}
            </div>

            {/* Operating Hours */}
            <div className="mt-4">
              <div className="bg-white/70 rounded-lg border border-neutral-200 shadow-sm p-4">
                <h3 className="text-lg sm:text-xl font-semibold text-neutral-900 mb-3 flex items-center gap-2">
                  <Clock className="h-5 w-5 text-orange-600" />
                  Operating Hours
                </h3>
                <div className="space-y-2 sm:grid sm:grid-cols-2 sm:gap-4 sm:space-y-0">
                  <div className="flex justify-between sm:flex-col sm:justify-start">
                    <span className="text-neutral-600">Mon–Sat:</span>
                    <span className="text-neutral-900 font-medium">9:00 AM – 5:00 PM</span>
                  </div>
                  <div className="flex justify-between sm:flex-col sm:justify-start">
                    <span className="text-neutral-600">Sunday:</span>
                    <span className="text-neutral-900 font-medium">Closed</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Before You Contact Us */}
            <div>
              <h3 className="text-xl font-semibold text-neutral-900 mb-4">Before You Contact Us</h3>
              <ul className="space-y-3 text-sm sm:text-base text-neutral-700">
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
          <div className="rounded-xl border border-neutral-200 bg-white p-6 sm:p-8 shadow-sm">
            <ContactForm />
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="border-t border-neutral-200 bg-neutral-50 mt-16">
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
