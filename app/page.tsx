"use client"

import React from "react"

import Image from "next/image"
import Link from "next/link"
import { Menu, ArrowRight, Check, Loader2 } from "lucide-react"
import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger, SheetClose } from "@/components/ui/sheet"
import { useState, useActionState, useEffect, useId } from "react"
import { useForm, Controller } from "react-hook-form"
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
          <RadioCard id={`${id}-not-sure`} value="not-sure" {...register("projectType")}>
            Not Sure
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
              if (!val) setValue("plans", [])
            }}
          />
          {hasPlans && (
            <Controller
              name="plans"
              control={control}
              render={({ field: { onChange } }) => (
                <FormInput
                  type="file"
                  accept="image/*,application/pdf"
                  multiple
                  capture="environment"
                  onChange={(e) => onChange(Array.from(e.target.files || []))}
                />
              )}
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
              if (!val) setValue("photos", [])
            }}
          />
          {hasPhotos && (
            <Controller
              name="photos"
              control={control}
              render={({ field: { onChange } }) => (
                <FormInput
                  type="file"
                  accept="image/*"
                  multiple
                  capture="environment"
                  onChange={(e) => onChange(Array.from(e.target.files || []))}
                />
              )}
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

      <header className="fixed top-0 left-0 right-0 z-40 flex items-center justify-between px-4 py-3">
        <Link
          href="/"
          className="inline-flex items-center rounded-md bg-black/30 px-3 py-1.5 text-sm font-semibold tracking-tight backdrop-blur-md ring-1 ring-white/10"
        >
          Terra Clay
        </Link>
        <div className="flex items-center gap-2">
          <Button
            asChild
            variant="ghost"
            className="hidden rounded-md bg-black/30 px-3 py-1.5 text-sm font-semibold tracking-tight text-white backdrop-blur-md ring-1 ring-white/10 hover:bg-black/50 hover:text-white sm:inline-flex"
          >
            <a href="tel:2123654386">212-365-4386</a>
          </Button>
          <Sheet>
            <SheetTrigger asChild>
              <Button
                variant="ghost"
                size="icon"
                className="rounded-md bg-black/30 p-2 backdrop-blur-md ring-1 ring-white/10 hover:bg-black/50"
              >
                <Menu className="h-6 w-6 text-white" />
                <span className="sr-only">Open menu</span>
              </Button>
            </SheetTrigger>
            <SheetContent
              side="right"
              className="w-5/6 max-w-sm border-l border-white/10 bg-black/50 text-white backdrop-blur-lg"
            >
              <SheetHeader className="border-b-0">
                <SheetTitle className="text-white">Terra Clay</SheetTitle>
              </SheetHeader>
              <nav className="mt-6 space-y-4 text-lg">
                <SheetClose asChild>
                  <Link href="/gallery" className="block hover:underline">
                    Photo Gallery
                  </Link>
                </SheetClose>
                <SheetClose asChild>
                  <Link href="/about" className="block hover:underline">
                    About Us
                  </Link>
                </SheetClose>
                <SheetClose asChild>
                  <Link href="/contact" className="block hover:underline">
                    Contact
                  </Link>
                </SheetClose>
              </nav>
            </SheetContent>
          </Sheet>
        </div>
      </header>

      <section className="relative z-30 flex h-full w-full items-center" id="quote">
        <div className="mx-auto flex w-full max-w-xl flex-col items-center px-4 text-center">
          <h1 className="text-balance text-3xl font-extrabold leading-tight sm:text-4xl">
            Clay Tile Roofing Specialists – NYC
          </h1>
          <p className="mt-2 text-pretty text-base font-medium text-white/90 sm:text-lg">
            Serving New York City for over 20 years.
          </p>

          <Dialog open={open} onOpenChange={setOpen}>
            <DialogTrigger asChild>
              <Button className="mt-6 h-12 w-full max-w-[260px] rounded-full bg-neutral-900 text-white hover:bg-neutral-800">
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
                      Your information has been submitted. We’ll be in touch soon.
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
    </main>
  )
}
