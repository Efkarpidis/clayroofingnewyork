"use client"

import React, { useRef, useState, useEffect } from "react"
import Image from "next/image"
import Link from "next/link"
import {
  ArrowRight,
  Loader2,
  Upload,
  X,
  Camera,
  FileText,
  ImageIcon,
  Briefcase,
  Home,
  Grid3X3,
  ChevronLeft,
  ChevronRight,
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { StickyCallBar } from "@/components/sticky-call-bar"
import { useActionState } from "react"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { type Step1Data, step1Schema, type Step2Data, step2Schema } from "./schemas"
import { handleStep1Submit, handleStep2Submit, type Step1State, type Step2State } from "./actions"
import { AnimatedCounter } from "@/components/animated-counter"

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
    className="block w-full rounded-md border-stone-gray bg-parchment p-3 text-base text-old-copper shadow-sm focus:border-muted-terracotta focus:ring-muted-terracotta disabled:cursor-not-allowed disabled:bg-stone-gray/30"
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
    className="block w-full rounded-md border-stone-gray bg-parchment p-3 text-base text-old-copper shadow-sm focus:border-muted-terracotta focus:ring-muted-terracotta"
  />
)

const FormSelect = (props: React.ComponentProps<"select">) => (
  <select
    {...props}
    className="block w-full rounded-md border-stone-gray bg-parchment p-3 text-base text-old-copper shadow-sm focus:border-muted-terracotta focus:ring-muted-terracotta"
  >
    {props.children}
  </select>
)

const FormCheckbox = React.forwardRef<HTMLInputElement, React.ComponentProps<"input">>((props, ref) => (
  <input
    ref={ref}
    type="checkbox"
    {...props}
    className="h-4 w-4 rounded border-stone-gray text-muted-terracotta focus:ring-muted-terracotta"
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
      className="block cursor-pointer rounded-lg border border-stone-gray bg-parchment p-3 text-center text-base font-medium text-old-copper peer-checked:border-muted-terracotta peer-checked:ring-1 peer-checked:ring-muted-terracotta"
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
        value === true
          ? "bg-muted-terracotta text-white shadow-sm"
          : "bg-parchment text-old-copper hover:bg-stone-gray/30 border border-stone-gray"
      }`}
    >
      Yes
    </button>
    <button
      type="button"
      onClick={() => onChange(false)}
      className={`rounded-md px-6 py-2 text-base font-medium transition-colors ${
        value === false
          ? "bg-muted-terracotta text-white shadow-sm"
          : "bg-parchment text-old-copper hover:bg-stone-gray/30 border border-stone-gray"
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
          className="flex w-full items-center justify-center gap-3 rounded-lg border-2 border-dashed border-stone-gray bg-parchment p-6 text-base font-medium text-old-copper transition-colors hover:border-muted-terracotta hover:bg-merino"
        >
          {isPhotos ? <ImageIcon className="h-6 w-6" /> : <Upload className="h-6 w-6" />}
          {isPhotos ? "Choose Photos from Library" : label}
        </button>

        {/* Camera button for mobile photos */}
        {isPhotos && isMobile && (
          <button
            type="button"
            onClick={() => cameraInputRef.current?.click()}
            className="flex w-full items-center justify-center gap-3 rounded-lg border border-stone-gray bg-parchment p-4 text-base font-medium text-old-copper transition-colors hover:border-muted-terracotta hover:bg-merino"
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
              <div className="aspect-square overflow-hidden rounded-lg border border-stone-gray bg-parchment">
                {getFilePreview(file) ? (
                  <img
                    src={getFilePreview(file)! || "/placeholder.svg"}
                    alt={file.name}
                    className="h-full w-full object-cover"
                  />
                ) : (
                  <div className="flex h-full items-center justify-center">
                    <div className="text-center">
                      <FileText className="mx-auto h-8 w-8 text-stone-gray" />
                      <p className="mt-1 text-xs text-old-copper truncate px-2">{file.name}</p>
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
    className="flex w-full items-center justify-center gap-2 rounded-lg bg-muted-terracotta px-6 py-3 text-base font-semibold text-white shadow-sm transition-colors hover:bg-[#c25a42] disabled:bg-stone-gray"
  >
    {isPending ? <Loader2 className="h-5 w-5 animate-spin" /> : children}
  </button>
)

// --- Step 1 Form Component ---

function Step1Form({ onSuccess }: { onSuccess: (recordId: string) => void }) {
  const id = useRef<string>(Math.random().toString(36).substr(2, 9)).current
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
        Request a Callback <ArrowRight className="h-5 w-5" />
      </SubmitButton>
      {!state.success && state.message && <p className="text-center text-sm text-red-600">{state.message}</p>}
    </form>
  )
}

// --- Step 2 Form Component ---

function Step2Form({ airtableRecordId, onSuccess }: { airtableRecordId: string; onSuccess: () => void }) {
  const id = useRef<string>(Math.random().toString(36).substr(2, 9)).current
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

// --- Gallery Carousel Component ---

function GalleryCarousel() {
  const [currentSlide, setCurrentSlide] = useState(0)

  const galleryImages = [
    {
      src: "/gallery/terracotta-s-tile.jpg",
      alt: "Classic terracotta Spanish S-tiles installation",
    },
    {
      src: "/gallery/slate-shake-main.jpg",
      alt: "Custom home with weathered gray slate shake tile roof",
    },
    {
      src: "/gallery/maroon-mission-construction-1.jpg",
      alt: "Aerial view of deep maroon mission barrel tile roof",
    },
    {
      src: "/gallery/flat-walnut-roof.jpg",
      alt: "Large home with walnut brown flat profile tiles",
    },
    {
      src: "/gallery/vintage-red-villa.jpg",
      alt: "Luxury villa with vintage red mission barrel tile roof",
    },
  ]

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % galleryImages.length)
  }

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + galleryImages.length) % galleryImages.length)
  }

  useEffect(() => {
    const timer = setInterval(nextSlide, 6500) // Auto-advance every 6.5 seconds
    return () => clearInterval(timer)
  }, [])

  return (
    <div className="relative w-full h-96 md:h-[500px] overflow-hidden rounded-lg bg-parchment">
      {galleryImages.map((image, index) => (
        <div
          key={index}
          className={`absolute inset-0 transition-opacity duration-700 ease-in-out ${
            index === currentSlide ? "opacity-100" : "opacity-0"
          }`}
        >
          <Image
            src={image.src || "/placeholder.svg"}
            alt={image.alt}
            fill
            className="object-cover"
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 80vw, 70vw"
          />
        </div>
      ))}

      {/* Navigation arrows */}
      <button
        onClick={prevSlide}
        className="absolute left-4 top-1/2 -translate-y-1/2 bg-parchment/90 hover:bg-parchment text-old-copper p-2 rounded-full shadow-lg transition-all z-10"
        aria-label="Previous image"
      >
        <ChevronLeft className="h-5 w-5" />
      </button>
      <button
        onClick={nextSlide}
        className="absolute right-4 top-1/2 -translate-y-1/2 bg-parchment/90 hover:bg-parchment text-old-copper p-2 rounded-full shadow-lg transition-all z-10"
        aria-label="Next image"
      >
        <ChevronRight className="h-5 w-5" />
      </button>

      {/* Dots indicator */}
      <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-2 z-10">
        {galleryImages.map((_, index) => (
          <button
            key={index}
            onClick={() => setCurrentSlide(index)}
            className={`w-2 h-2 rounded-full transition-all ${index === currentSlide ? "bg-muted-terracotta" : "bg-white/50"}`}
            aria-label={`Go to slide ${index + 1}`}
          />
        ))}
      </div>
    </div>
  )
}

// --- Featured Tile Carousel Component ---

function FeaturedTileCarousel() {
  const [currentSlide, setCurrentSlide] = useState(0)

  // Featured tile slides data
  const featuredTiles = [
    {
      id: "red",
      name: "Classic Red",
      subtitle: "Our Most Popular Choice",
      description:
        "The timeless beauty of classic red clay tiles brings warmth and elegance to any home. Premium Selectum quality with consistent coloring.",
      roofImage: "/tiles/selectum/selectum-red-tiles-roof.png",
      singleTileImage: "/tiles/selectum/selectum-red-tile-updated.png",
    },
    {
      id: "galia",
      name: "Galia Speckled",
      subtitle: "Natural Texture & Character",
      description:
        "Beautiful speckled finish with natural variation creates authentic Mediterranean charm. Each tile tells its own story.",
      roofImage: "/tiles/selectum/selectum-galia-tiles-roof.png",
      singleTileImage: "/tiles/selectum/selectum-galia-tile-single.png",
    },
  ]

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % featuredTiles.length)
  }

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + featuredTiles.length) % featuredTiles.length)
  }

  useEffect(() => {
    const timer = setInterval(nextSlide, 5000) // Auto-advance every 5 seconds
    return () => clearInterval(timer)
  }, [])

  return (
    <section className="py-16 sm:py-20 bg-merino border-b border-stone-gray">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-old-copper sm:text-4xl mb-4">Featured Tiles</h2>
          <p className="text-lg text-old-copper/80">Discover our premium clay tile collection</p>
        </div>

        <div className="bg-parchment rounded-2xl shadow-xl overflow-hidden max-w-4xl mx-auto relative">
          {featuredTiles.map((tile, index) => (
            <div
              key={tile.id}
              className={`transition-opacity duration-700 ease-in-out ${
                index === currentSlide ? "opacity-100" : "opacity-0 absolute inset-0"
              }`}
            >
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-0">
                {/* Large roof installation image */}
                <div className="lg:col-span-2 relative h-64 sm:h-80 lg:h-96">
                  <Image
                    src={tile.roofImage || "/placeholder.svg"}
                    alt={`${tile.name} tiles roof installation`}
                    fill
                    className="object-cover"
                    sizes="(max-width: 1024px) 100vw, 66vw"
                    priority={index === 0}
                  />

                  {/* Single tile overlay in corner */}
                  <div className="absolute bottom-4 right-4 w-20 h-20 sm:w-24 sm:h-24 bg-parchment/95 rounded-lg p-2 shadow-lg">
                    <div className="relative w-full h-full">
                      <Image
                        src={tile.singleTileImage || "/placeholder.svg"}
                        alt={`${tile.name} single tile`}
                        fill
                        className="object-contain"
                        sizes="96px"
                      />
                    </div>
                  </div>
                </div>

                {/* Content section */}
                <div className="p-8 lg:p-10 flex flex-col justify-center">
                  <div className="mb-6">
                    <h3 className="text-2xl font-bold text-old-copper mb-2">{tile.name}</h3>
                    <p className="text-muted-terracotta font-semibold mb-4">{tile.subtitle}</p>
                    <p className="text-old-copper/80 leading-relaxed">{tile.description}</p>
                  </div>

                  <Link href="/tile-selection" className="tappable">
                    <Button className="w-full h-12 bg-muted-terracotta hover:bg-[#c25a42] text-white font-semibold rounded-lg transition-all duration-200 cursor-pointer">
                      View All Tile Options
                    </Button>
                  </Link>
                </div>
              </div>
            </div>
          ))}

          {/* Navigation arrows */}
          <button
            onClick={prevSlide}
            className="absolute left-4 top-1/2 -translate-y-1/2 bg-parchment/90 hover:bg-parchment text-old-copper p-2 rounded-full shadow-lg transition-all z-10"
            aria-label="Previous tile"
          >
            <ChevronLeft className="h-5 w-5" />
          </button>
          <button
            onClick={nextSlide}
            className="absolute right-4 top-1/2 -translate-y-1/2 bg-parchment/90 hover:bg-parchment text-old-copper p-2 rounded-full shadow-lg transition-all z-10"
            aria-label="Next tile"
          >
            <ChevronRight className="h-5 w-5" />
          </button>

          {/* Dots indicator */}
          <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-2 z-10">
            {featuredTiles.map((_, index) => (
              <button
                key={index}
                onClick={() => setCurrentSlide(index)}
                className={`w-2 h-2 rounded-full transition-all ${
                  index === currentSlide ? "bg-muted-terracotta" : "bg-white/60"
                }`}
                aria-label={`Go to ${featuredTiles[index].name} slide`}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}

// --- Main Landing Page Component ---

function useIntersectionObserver(options = {}) {
  const [isVisible, setIsVisible] = useState(false)
  const [hasBeenVisible, setHasBeenVisible] = useState(false)
  const elementRef = useRef<HTMLElement>(null)

  useEffect(() => {
    const element = elementRef.current
    if (!element) return

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !hasBeenVisible) {
          setIsVisible(true)
          setHasBeenVisible(true)
        }
      },
      {
        threshold: 0.3, // Trigger when 30% of the section is visible
        rootMargin: "0px 0px -50px 0px", // Trigger slightly before fully visible
        ...options,
      },
    )

    observer.observe(element)

    return () => {
      observer.unobserve(element)
    }
  }, [hasBeenVisible])

  return { elementRef, isVisible }
}

export default function Page() {
  const [open, setOpen] = useState(false)
  const [step, setStep] = useState(1)
  const [airtableRecordId, setAirtableRecordId] = useState<string | null>(null)
  const { elementRef: statsRef, isVisible: statsVisible } = useIntersectionObserver()

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
      <main className="bg-merino">
        {/* Featured Tile Carousel */}
        <FeaturedTileCarousel />

        {/* Stats/Credibility Section */}
        <section ref={statsRef} className="section py-20 sm:py-24 relative z-10">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-8 lg:gap-12 text-center">
              {/* Stat 1 - Years in Business */}
              <div className="flex flex-col items-center">
                <div className="w-16 h-16 bg-parchment rounded-full flex items-center justify-center mb-4 transition-all duration-300 hover:bg-stone-gray/30 hover:scale-110 border border-stone-gray">
                  <Briefcase className="h-8 w-8 text-muted-terracotta stroke-1 transition-colors duration-300 hover:text-[#c25a42]" />
                </div>
                <h3 className="text-4xl font-bold text-old-copper mb-2">
                  <AnimatedCounter end={30} suffix="+" startAnimation={statsVisible} duration={1200} />
                </h3>
                <p className="text-lg text-old-copper/80 font-medium">Years in Business</p>
              </div>

              {/* Stat 2 - Projects Completed */}
              <div className="flex flex-col items-center">
                <div className="w-16 h-16 bg-parchment rounded-full flex items-center justify-center mb-4 transition-all duration-300 hover:bg-stone-gray/30 hover:scale-110 border border-stone-gray">
                  <Home className="h-8 w-8 text-muted-terracotta stroke-1 transition-colors duration-300 hover:text-[#c25a42]" />
                </div>
                <h3 className="text-4xl font-bold text-old-copper mb-2">
                  <AnimatedCounter end={3000} suffix="+" startAnimation={statsVisible} duration={1200} />
                </h3>
                <p className="text-lg text-old-copper/80 font-medium">Projects Completed</p>
              </div>

              {/* Stat 3 - Tiles Installed */}
              <div className="flex flex-col items-center">
                <div className="w-16 h-16 bg-parchment rounded-full flex items-center justify-center mb-4 transition-all duration-300 hover:bg-stone-gray/30 hover:scale-110 border border-stone-gray">
                  <Grid3X3 className="h-8 w-8 text-muted-terracotta stroke-1 transition-colors duration-300 hover:text-[#c25a42]" />
                </div>
                <h3 className="text-4xl font-bold text-old-copper mb-2">
                  <AnimatedCounter end={10} suffix="M+" startAnimation={statsVisible} duration={1200} />
                </h3>
                <p className="text-lg text-old-copper/80 font-medium">Tiles Installed</p>
              </div>
            </div>

            {/* CTA Button in Credibility Section */}
            <div className="text-center mt-12">
              <Link href="/contact#quote" className="tappable">
                <Button className="h-12 px-8 text-lg font-semibold bg-muted-terracotta hover:bg-[#c25a42] text-white rounded-full shadow-lg hover:shadow-xl transition-all duration-200 cursor-pointer">
                  Request a Quote
                </Button>
              </Link>
            </div>
          </div>
        </section>

        {/* Gallery Section */}
        <section className="section py-20 sm:py-24 border-t border-stone-gray relative z-10">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold text-old-copper sm:text-4xl">Our Recent Projects</h2>
              <p className="mt-4 text-lg text-old-copper/80">See the quality and craftsmanship that sets us apart</p>
            </div>
            <GalleryCarousel />
          </div>
        </section>

        {/* Call to Action Section */}
        <section className="section py-20 sm:py-24 border-t border-stone-gray relative z-10">
          <div className="max-w-4xl mx-auto text-center px-4 sm:px-6 lg:px-8">
            <h2 className="text-3xl font-bold text-old-copper sm:text-4xl mb-6">Ready to Get Started?</h2>
            <p className="text-lg text-old-copper/80 mb-8">
              Contact us today for a free consultation and quote on your clay tile roofing project.
            </p>
            <Link href="/contact#quote" className="tappable">
              <Button className="h-14 px-8 text-lg font-semibold bg-muted-terracotta hover:bg-[#c25a42] text-white rounded-lg shadow-lg hover:shadow-xl transition-all duration-200 cursor-pointer">
                Request a Quote
              </Button>
            </Link>
          </div>
        </section>
      </main>

      <StickyCallBar isHidden={open} />

      {/* Footer */}
      <footer className="border-t border-stone-gray bg-parchment py-16 sm:py-20 relative z-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {/* Contact Info */}
            <div>
              <h3 className="text-lg font-semibold text-old-copper mb-4">Contact Information</h3>
              <div className="space-y-2 text-old-copper/80">
                <p>33-15 127th Pl, Corona, NY 11368</p>

                <p>
                  Email:{" "}
                  <a href="mailto:chris@clayroofingnewyork.com" className="hover:text-muted-terracotta">
                    chris@clayroofingnewyork.com
                  </a>
                </p>
              </div>
            </div>

            {/* Business Hours */}
            <div>
              <h3 className="text-lg font-semibold text-old-copper mb-4">Business Hours</h3>
              <div className="space-y-2 text-old-copper/80">
                <p>Mon-Sat: 8:00 AM - 6:00 PM</p>
                <p>Sunday: Closed</p>
              </div>
            </div>
          </div>

          <div className="mt-8 pt-8 border-t border-stone-gray">
            <div className="flex flex-col sm:flex-row justify-between items-center">
              <div className="flex items-center gap-3 mb-4 sm:mb-0">
                <Image
                  src="/la-escandella-logo.webp"
                  alt="La Escandella"
                  width={80}
                  height={40}
                  className="h-6 w-auto"
                />
                <span className="text-sm text-old-copper/80">Proudly partnered with La Escandella</span>
              </div>
              <div className="text-center sm:text-right">
                <p className="text-sm text-old-copper/80 mb-1">
                  Operating out of Queens, New York — Serving the Tri-State Area
                </p>
                <p className="text-sm text-old-copper/60">
                  &copy; {new Date().getFullYear()} Clay Roofing New York. All Rights Reserved.
                </p>
                <div className="mt-2">
                  <Link href="/contact#quote" className="tappable">
                    <Button
                      variant="outline"
                      size="sm"
                      className="border-muted-terracotta text-muted-terracotta hover:bg-muted-terracotta hover:text-white cursor-pointer bg-transparent"
                    >
                      Request a Quote
                    </Button>
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </footer>
    </>
  )
}
