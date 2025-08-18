"use client"

import React from "react"
import Image from "next/image"
import Link from "next/link"
import { ArrowRight, Check, Loader2, Upload, X, Camera, FileText, ImageIcon, Menu, Phone } from "lucide-react"
import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogTrigger,
} from "@/components/ui/dialog"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { StickyCallBar } from "@/components/sticky-call-bar"
import { useState, useActionState, useEffect, useId } from "react"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { type Step1Data, step1Schema, type Step2Data, step2Schema } from "./schemas"
import { handleStep1Submit, handleStep2Submit, type Step1State, type Step2State } from "./actions"

// --- Self-Contained Form UI Components ---

const FieldWrapper = ({
  id,
  label,
  error,
  children,
  labelComponent,
}: {
  id: string
  label?: string
  error?: string
  children: React.ReactNode
  labelComponent?: React.ReactNode
}) => (
  <div className="space-y-2">
    {label && !labelComponent && (
      <label htmlFor={id} className="block text-base font-medium text-neutral-700">
        {label}
      </label>
    )}
    {labelComponent}
    {children}
    {error && <p className="mt-1 text-sm text-red-600">{error}</p>}
  </div>
)

const FormInput = (props: React.ComponentProps<"input">) => (
  <input
    {...props}
    className="block w-full rounded-md border-neutral-300 bg-neutral-50 p-3 text-base shadow-sm focus:border-neutral-500 focus:ring-neutral-500 disabled:cursor-not-allowed disabled:bg-neutral-200"
  />
)

const PhoneInput = React.forwardRef<HTMLInputElement, Omit<React.ComponentProps<"input">, "type">>((props, ref) => {
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const rawValue = e.target.value.replace(/\D/g, "")
    let formattedValue = ""

    if (rawValue.length > 0) {
      formattedValue = `(${rawValue.substring(0, 3)}`
    }
    if (rawValue.length >= 4) {
      formattedValue += `) ${rawValue.substring(3, 6)}`
    }
    if (rawValue.length >= 7) {
      formattedValue += `-${rawValue.substring(6, 10)}`
    }

    e.target.value = formattedValue

    if (props.onChange) {
      props.onChange(e)
    }
  }

  return (
    <FormInput
      {...props}
      ref={ref}
      type="tel"
      inputMode="numeric"
      placeholder="(###) ###-####"
      maxLength={14}
      onChange={handleInputChange}
    />
  )
})
PhoneInput.displayName = "PhoneInput"

const FormTextarea = (props: React.ComponentProps<"textarea">) => (
  <textarea
    {...props}
    className="block w-full rounded-md border-neutral-300 bg-neutral-50 p-3 text-base shadow-sm focus:border-neutral-500 focus:ring-neutral-500"
  />
)

const FormSelect = (props: React.ComponentProps<"select">) => (
  <select
    {...props}
    className="block w-full rounded-md border-neutral-300 bg-neutral-50 p-3 text-base shadow-sm focus:border-neutral-500 focus:ring-neutral-500"
  >
    {props.children}
  </select>
)

const FormCheckbox = React.forwardRef<HTMLInputElement, React.ComponentProps<"input">>((props, ref) => (
  <input
    ref={ref}
    type="checkbox"
    {...props}
    className="h-4 w-4 rounded border-neutral-400 text-neutral-800 focus:ring-neutral-800"
  />
))
FormCheckbox.displayName = "FormCheckbox"

const RadioCard = ({
  id,
  value,
  children,
  ...props
}: React.ComponentProps<"input"> & { children: React.ReactNode }) => (
  <div>
    <input type="radio" id={id} value={value} className="peer sr-only" {...props} />
    <label
      htmlFor={id}
      className="block cursor-pointer rounded-lg border border-neutral-300 bg-white p-3 text-center text-base font-medium peer-checked:border-neutral-800 peer-checked:ring-1 peer-checked:ring-neutral-800"
    >
      {children}
    </label>
  </div>
)

const YesNoToggle = ({ value, onChange }: { value: boolean | null; onChange: (newValue: boolean) => void }) => (
  <div className="flex gap-3">
    <button
      type="button"
      onClick={() => onChange(true)}
      className={`rounded-md px-6 py-2 text-base font-medium transition-colors ${
        value === true ? "bg-neutral-900 text-white shadow-sm" : "bg-neutral-200 text-neutral-700 hover:bg-neutral-300"
      }`}
    >
      Yes
    </button>
    <button
      type="button"
      onClick={() => onChange(false)}
      className={`rounded-md px-6 py-2 text-base font-medium transition-colors ${
        value === false ? "bg-neutral-900 text-white shadow-sm" : "bg-neutral-200 text-neutral-700 hover:bg-neutral-300"
      }`}
    >
      No
    </button>
  </div>
)

const FileUploadButton = ({
  files,
  onChange,
  accept,
  multiple = false,
  label,
  isPhotos = false,
}: {
  files: File[]
  onChange: (files: File[]) => void
  accept: string
  multiple?: boolean
  label: string
  isPhotos?: boolean
}) => {
  const [isMobile, setIsMobile] = useState(false)
  const fileInputRef = React.useRef<HTMLInputElement>(null)
  const cameraInputRef = React.useRef<HTMLInputElement>(null)

  useEffect(() => {
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
      {/* Hidden file inputs */}
      <input
        ref={fileInputRef}
        type="file"
        accept={accept}
        multiple={multiple}
        onChange={handleFileChange}
        className="sr-only"
      />
      {isPhotos && isMobile && (
        <input
          ref={cameraInputRef}
          type="file"
          accept="image/*"
          capture="environment"
          multiple={multiple}
          onChange={handleFileChange}
          className="sr-only"
        />
      )}

      {/* Upload buttons */}
      <div className="space-y-2">
        {/* Main upload button */}
        <button
          type="button"
          onClick={() => fileInputRef.current?.click()}
          className="flex w-full items-center justify-center gap-3 rounded-lg border-2 border-dashed border-neutral-300 bg-neutral-50 p-6 text-base font-medium text-neutral-700 transition-colors hover:border-neutral-400 hover:bg-neutral-100"
        >
          {isPhotos ? <ImageIcon className="h-6 w-6" /> : <Upload className="h-6 w-6" />}
          {isPhotos ? "Choose Photos from Library" : label}
        </button>

        {/* Camera button for mobile photos */}
        {isPhotos && isMobile && (
          <button
            type="button"
            onClick={() => cameraInputRef.current?.click()}
            className="flex w-full items-center justify-center gap-3 rounded-lg border border-neutral-300 bg-white p-4 text-base font-medium text-neutral-700 transition-colors hover:border-neutral-400 hover:bg-neutral-50"
          >
            <Camera className="h-5 w-5" />
            Take New Photo
          </button>
        )}
      </div>

      {files.length > 0 && (
        <div className="grid grid-cols-2 gap-3 sm:grid-cols-3">
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
                      <FileText className="mx-auto h-8 w-8 text-neutral-400" />
                      <p className="mt-1 text-xs text-neutral-500 truncate px-2">{file.name}</p>
                    </div>
                  </div>
                )}
              </div>
              <button
                type="button"
                onClick={() => removeFile(index)}
                className="absolute -right-2 -top-2 flex h-6 w-6 items-center justify-center rounded-full bg-red-500 text-white hover:bg-red-600"
              >
                <X className="h-4 w-4" />
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}

const SubmitButton = ({ children, isPending }: { children: React.ReactNode; isPending: boolean }) => (
  <button
    type="submit"
    disabled={isPending}
    className="flex w-full items-center justify-center gap-2 rounded-lg bg-neutral-900 px-6 py-3 text-base font-semibold text-white shadow-sm transition-colors hover:bg-neutral-800 disabled:bg-neutral-400"
  >
    {isPending ? <Loader2 className="h-5 w-5 animate-spin" /> : children}
  </button>
)

// --- Step 1 Form Component ---

function Step1Form({ onSuccess }: { onSuccess: (recordId: string) => void }) {
  const id = useId()
  const [state, formAction, isPending] = useActionState<Step1State, FormData>(handleStep1Submit, {
    message: "",
    success: false,
  })
  const {
    register,
    formState: { errors },
  } = useForm<Step1Data>({
    resolver: zodResolver(step1Schema),
    defaultValues: { projectType: undefined },
  })

  useEffect(() => {
    if (state.success && state.recordId) {
      onSuccess(state.recordId)
    }
  }, [state, onSuccess])

  return (
    <form action={formAction} className="space-y-5">
      <FieldWrapper id={`${id}-name`} label="Full Name" error={errors.name?.message || state.errors?.name?.[0]}>
        <FormInput id={`${id}-name`} {...register("name")} placeholder="John Doe" />
      </FieldWrapper>
      <FieldWrapper id={`${id}-phone`} label="Phone Number" error={errors.phone?.message || state.errors?.phone?.[0]}>
        <PhoneInput id={`${id}-phone`} {...register("phone")} />
      </FieldWrapper>
      <FieldWrapper id={`${id}-email`} label="Email Address" error={errors.email?.message || state.errors?.email?.[0]}>
        <FormInput id={`${id}-email`} {...register("email")} type="email" placeholder="you@example.com" />
      </FieldWrapper>
      <FieldWrapper
        id={`${id}-projectType`}
        label="What type of project is this?"
        error={errors.projectType?.message || state.errors?.projectType?.[0]}
      >
        <div className="grid grid-cols-1 gap-3 sm:grid-cols-3">
          <RadioCard id={`${id}-new`} value="new-construction" {...register("projectType")}>
            New
          </RadioCard>
          <RadioCard id={`${id}-replacement`} value="roof-replacement" {...register("projectType")}>
            Replacement
          </RadioCard>
          <RadioCard id={`${id}-other`} value="other" {...register("projectType")}>
            Other
          </RadioCard>
        </div>
      </FieldWrapper>
      <SubmitButton isPending={isPending}>
        Request Callback <ArrowRight className="h-5 w-5" />
      </SubmitButton>
      {!state.success && state.message && <p className="text-center text-sm text-red-600">{state.message}</p>}
    </form>
  )
}

// --- Step 2 Form Component ---

function Step2Form({ airtableRecordId, onSuccess }: { airtableRecordId: string; onSuccess: () => void }) {
  const id = useId()
  const [state, formAction, isPending] = useActionState<Step2State, FormData>(handleStep2Submit, {
    message: "",
    success: false,
  })
  const {
    register,
    control,
    formState: { errors },
    watch,
    setValue,
  } = useForm<Step2Data>({
    resolver: zodResolver(step2Schema),
    defaultValues: {
      isRoofSizeUnsure: false,
    },
  })

  const [hasPlans, setHasPlans] = useState<boolean | null>(null)
  const [hasPhotos, setHasPhotos] = useState<boolean | null>(null)
  const [planFiles, setPlanFiles] = useState<File[]>([])
  const [photoFiles, setPhotoFiles] = useState<File[]>([])
  const isRoofSizeUnsure = watch("isRoofSizeUnsure")

  useEffect(() => {
    if (isRoofSizeUnsure) {
      setValue("roofSize", "")
    }
  }, [isRoofSizeUnsure, setValue])

  useEffect(() => {
    if (state.success) {
      onSuccess()
    }
  }, [state, onSuccess])

  // Update form values when files change
  useEffect(() => {
    setValue("plans", planFiles)
  }, [planFiles, setValue])

  useEffect(() => {
    setValue("photos", photoFiles)
  }, [photoFiles, setValue])

  return (
    <form action={formAction} className="space-y-5">
      <input type="hidden" {...register("airtableRecordId")} value={airtableRecordId} />
      <FieldWrapper id={`${id}-address`} label="Project Address" error={errors.projectAddress?.message}>
        <FormInput id={`${id}-address`} {...register("projectAddress")} placeholder="123 Main St, New York, NY" />
      </FieldWrapper>

      <FieldWrapper
        id={`${id}-roofSize`}
        error={errors.roofSize?.message}
        labelComponent={
          <div className="flex items-center justify-between">
            <label htmlFor={`${id}-roofSize`} className="text-base font-medium text-neutral-700">
              Approx. Roof Size (sq ft)
            </label>
            <div className="flex items-center gap-2">
              <FormCheckbox id={`${id}-roofSizeUnsure`} {...register("isRoofSizeUnsure")} />
              <label htmlFor={`${id}-roofSizeUnsure`} className="text-sm font-medium text-neutral-600">
                Not sure
              </label>
            </div>
          </div>
        }
      >
        <FormInput
          id={`${id}-roofSize`}
          {...register("roofSize")}
          placeholder="e.g., 2500"
          disabled={isRoofSizeUnsure}
        />
      </FieldWrapper>

      <FieldWrapper
        id={`${id}-plans`}
        label="Do you have architectural plans?"
        error={(errors.plans?.message as string) || state.errors?.plans?.[0]}
      >
        <div className="space-y-3">
          <YesNoToggle
            value={hasPlans}
            onChange={(val) => {
              setHasPlans(val)
              if (!val) {
                setPlanFiles([])
                setValue("plans", [])
              }
            }}
          />
          {hasPlans && (
            <FileUploadButton
              files={planFiles}
              onChange={setPlanFiles}
              accept="image/*,application/pdf"
              multiple
              label="Upload Files"
              isPhotos={false}
            />
          )}
        </div>
      </FieldWrapper>

      <FieldWrapper
        id={`${id}-photos`}
        label="Do you have photos of the roof?"
        error={(errors.photos?.message as string) || state.errors?.photos?.[0]}
      >
        <div className="space-y-3">
          <YesNoToggle
            value={hasPhotos}
            onChange={(val) => {
              setHasPhotos(val)
              if (!val) {
                setPhotoFiles([])
                setValue("photos", [])
              }
            }}
          />
          {hasPhotos && (
            <FileUploadButton
              files={photoFiles}
              onChange={setPhotoFiles}
              accept="image/*"
              multiple
              label="Upload Photos"
              isPhotos={true}
            />
          )}
        </div>
      </FieldWrapper>

      <FieldWrapper id={`${id}-tileType`} label="Clay Tile Type (if known)">
        <FormSelect {...register("tileType")}>
          <option value="">Select an option...</option>
          <option value="spanish-s">Traditional Spanish / S-Mission</option>
          <option value="flat">Flat Tile</option>
          <option value="not-sure">Not sure / Open to recommendations</option>
        </FormSelect>
      </FieldWrapper>
      <FieldWrapper id={`${id}-timeframe`} label="When are you hoping to start?">
        <FormSelect {...register("timeframe")}>
          <option value="">Select a timeframe...</option>
          <option value="asap">ASAP</option>
          <option value="1-3-months">Within 1-3 months</option>
          <option value="exploring">Just exploring options</option>
        </FormSelect>
      </FieldWrapper>
      <FieldWrapper id={`${id}-referral`} label="How did you hear about us?">
        <FormInput id={`${id}-referral`} {...register("referral")} />
      </FieldWrapper>
      <FieldWrapper id={`${id}-message`} label="Additional Message">
        <FormTextarea id={`${id}-message`} {...register("message")} rows={3} />
      </FieldWrapper>
      <SubmitButton isPending={isPending}>Submit Full Details</SubmitButton>
      {!state.success && state.message && <p className="text-center text-sm text-red-600">{state.message}</p>}
    </form>
  )
}

// --- Main Landing Page Component ---

export default function Page() {
  const [open, setOpen] = useState(false)
  const [step, setStep] = useState(1)
  const [airtableRecordId, setAirtableRecordId] = useState<string | null>(null)

  const handleStep1Success = (recordId: string) => {
    setAirtableRecordId(recordId)
    setStep(2)
  }

  const handleStep2Success = () => {
    setStep(3) // Confirmation step
  }

  // Reset form when dialog is closed
  useEffect(() => {
    if (!open) {
      setTimeout(() => {
        setStep(1)
        setAirtableRecordId(null)
      }, 200) // Delay to allow dialog to close before state reset
    }
  }, [open])

  return (
    <>
      <main className="relative h-dvh w-full overflow-hidden bg-black text-white" id="home">
        <div className="absolute inset-0">
          <Image
            src="/images/hero-clay-roof.jpg"
            alt="Terracotta clay tile roof under blue sky"
            fill
            priority
            sizes="100vw"
            className="object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/30 to-black/10" />
        </div>

        <header className="fixed top-0 left-0 right-0 z-40 bg-white/95 backdrop-blur-sm shadow-sm">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex items-center justify-between h-16 md:h-20">
              {/* Logo */}
              <Link href="/" className="flex items-center flex-shrink-0 -ml-2 sm:-ml-4">
                <Image
                  src="/clay-roofs-new-york-logo-final.png"
                  alt="Clay Roofs New York - Specializing in Clay and Ceramic Roofing"
                  width={500}
                  height={150}
                  className="h-12 w-auto sm:h-16 md:h-20"
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
                      className="px-2 py-2 text-sm font-medium text-neutral-700 hover:text-orange-600 transition-colors cursor-pointer"
                    >
                      Contact
                    </Link>
                  </DropdownMenuItem>
                  <DropdownMenuItem asChild>
                    <Link
                      href="#quote"
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

        <section className="relative z-30 flex h-full w-full items-center" id="quote">
          <div className="mx-auto flex w-full max-w-xl flex-col items-center px-4 text-center">
            <h1 className="text-balance text-2xl font-extrabold leading-tight sm:text-3xl md:text-4xl lg:text-5xl drop-shadow-lg">
              Clay Tile Roofing Specialists – NYC
            </h1>
            <p className="mt-4 text-pretty text-sm font-medium text-white/90 sm:text-base md:text-lg drop-shadow-md">
              Serving New York City for over 20 years.
            </p>

            <Dialog open={open} onOpenChange={setOpen}>
              <DialogTrigger asChild>
                <Button className="mt-6 h-12 w-full max-w-[280px] sm:max-w-[300px] md:max-w-[260px] rounded-full bg-orange-600 text-white hover:bg-orange-700 hover:shadow-lg transition-all duration-200 text-base sm:text-lg md:text-base font-semibold">
                  Request a Quote
                </Button>
              </DialogTrigger>
              <DialogContent className="sm:max-w-lg overflow-y-auto max-h-[90dvh]">
                <DialogHeader>
                  <DialogTitle>
                    {step === 1 && "Get a Free Roofing Quote"}
                    {step === 2 && "Provide More Details (Optional)"}
                  </DialogTitle>
                  <DialogDescription>
                    {step === 1 && "Start with the basics. We'll call you back within 24 hours."}
                    {step === 2 && "Your callback is requested! For a faster quote, add more info below."}
                  </DialogDescription>
                </DialogHeader>

                <div className="mt-4">
                  {step < 3 && (
                    <div className="mb-4 text-center text-sm font-medium text-neutral-500">Step {step} of 2</div>
                  )}
                  {step === 1 && <Step1Form onSuccess={handleStep1Success} />}
                  {step === 2 && airtableRecordId && (
                    <Step2Form airtableRecordId={airtableRecordId} onSuccess={handleStep2Success} />
                  )}
                  {step === 3 && (
                    <div className="text-center py-8">
                      <Check className="mx-auto h-12 w-12 text-green-600 bg-green-100 rounded-full p-2" />
                      <h2 className="mt-4 text-xl font-semibold text-neutral-800">Thank You!</h2>
                      <p className="mt-1 text-neutral-600">
                        Your information has been submitted. We'll be in touch soon.
                      </p>
                      <Button variant="outline" className="mt-6 bg-transparent" onClick={() => setOpen(false)}>
                        Close
                      </Button>
                    </div>
                  )}
                </div>
              </DialogContent>
            </Dialog>
          </div>
        </section>

        {/* Why Choose Us Section */}
        <section className="py-8 md:py-16 bg-neutral-50 text-neutral-800">
          <div className="container mx-auto px-4 space-y-6 md:space-y-8">
            <h2 className="text-center text-2xl md:text-3xl lg:text-4xl font-extrabold leading-tight">
              Why Choose Us?
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 md:gap-8">
              {/* Card 1 */}
              <div className="bg-white rounded-lg p-4 md:p-6 shadow-lg">
                <h3 className="text-lg md:text-xl font-semibold text-neutral-800">Experience</h3>
                <p className="mt-3 md:mt-4 text-sm md:text-base text-neutral-600">
                  With over 20 years of experience, we have the knowledge and skills to handle any roofing project.
                </p>
              </div>

              {/* Card 2 */}
              <div className="bg-white rounded-lg p-4 md:p-6 shadow-lg">
                <h3 className="text-lg md:text-xl font-semibold text-neutral-800">Quality</h3>
                <p className="mt-3 md:mt-4 text-sm md:text-base text-neutral-600">
                  We use only the highest quality clay tiles and materials to ensure your roof lasts for years.
                </p>
              </div>

              {/* Card 3 */}
              <div className="bg-white rounded-lg p-4 md:p-6 shadow-lg">
                <h3 className="text-lg md:text-xl font-semibold text-neutral-800">Service</h3>
                <p className="mt-3 md:mt-4 text-sm md:text-base text-neutral-600">
                  Our friendly and professional team is always ready to assist you with any questions or concerns.
                </p>
              </div>

              {/* Card 4 */}
              <div className="bg-white rounded-lg p-4 md:p-6 shadow-lg">
                <h3 className="text-lg md:text-xl font-semibold text-neutral-800">Affordability</h3>
                <p className="mt-3 md:mt-4 text-sm md:text-base text-neutral-600">
                  We offer competitive pricing without compromising on quality or service.
                </p>
              </div>
            </div>
          </div>
        </section>

        <footer className="border-t border-neutral-200 bg-neutral-50">
          <div className="container mx-auto px-4 py-6 space-y-4">
            <div className="flex items-center justify-center gap-3 text-sm text-neutral-600">
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
              <p>&copy; {new Date().getFullYear()} Clay Roofs New York. All Rights Reserved.</p>
            </div>
          </div>
        </footer>
      </main>

      <StickyCallBar isHidden={open} />
    </>
  )
}
