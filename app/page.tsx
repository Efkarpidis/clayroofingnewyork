"use client"

import type React from "react"

import Image from "next/image"
import Link from "next/link"
import { Menu, CheckCircle2 } from "lucide-react"
import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { useState } from "react"

export default function Page() {
  const [openContact, setOpenContact] = useState(false)
  const [submitted, setSubmitted] = useState(false)

  // Conditional fields
  const [constructionType, setConstructionType] = useState<string>("")
  const [hasPlans, setHasPlans] = useState<string>("")
  const [hasPhotos, setHasPhotos] = useState<string>("")
  const [notSureSqft, setNotSureSqft] = useState(false)

  function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()
    // Here you could send FormData to a Server Action or API route.
    setSubmitted(true)
  }

  function resetFormAndClose() {
    setSubmitted(false)
    setOpenContact(false)
    setConstructionType("")
    setHasPlans("")
    setHasPhotos("")
    setNotSureSqft(false)
  }

  return (
    <main className="relative h-dvh w-full overflow-hidden bg-black text-white">
      {/* Background image */}
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

      {/* Fixed minimal header */}
      <header
        className="fixed top-0 left-0 right-0 z-40 flex items-center justify-between px-4 py-3"
        aria-label="Primary"
      >
        <Link
          href="/"
          className="inline-flex items-center rounded-md bg-black/30 px-3 py-1.5 text-sm font-semibold tracking-tight backdrop-blur-md ring-1 ring-white/10"
        >
          <span className="sr-only">Terra Clay — Home</span>
          Terra Clay
        </Link>

        <Sheet>
          <SheetTrigger asChild>
            <button
              aria-label="Open menu"
              className="inline-flex items-center justify-center rounded-md bg-black/30 p-2 backdrop-blur-md ring-1 ring-white/10"
            >
              <Menu className="h-6 w-6 text-white" />
            </button>
          </SheetTrigger>
          <SheetContent side="right" className="w-5/6 max-w-sm">
            <SheetHeader>
              <SheetTitle>Terra Clay</SheetTitle>
            </SheetHeader>
            <nav className="mt-6 space-y-4 text-lg">
              <Link href="#gallery" className="block hover:underline">
                Photo Gallery
              </Link>
              <Link href="#about" className="block hover:underline">
                About Us
              </Link>
              <Link href="#contact" className="block hover:underline">
                Contact
              </Link>
            </nav>
          </SheetContent>
        </Sheet>
      </header>

      {/* Centered hero copy and CTA */}
      <section className="relative z-30 flex h-full w-full items-center">
        <div className="mx-auto flex w-full max-w-xl flex-col items-center px-4 text-center">
          <h1 className="text-balance text-3xl font-extrabold leading-tight sm:text-4xl">
            Clay Tile Roofing Specialists – NYC
          </h1>
          <p className="mt-2 text-pretty text-base font-medium text-white/90 sm:text-lg">
            Serving New York City for over 20 years.
          </p>

          <Dialog
            open={openContact}
            onOpenChange={(o) => {
              setOpenContact(o)
              if (!o) setSubmitted(false)
            }}
          >
            <DialogTrigger asChild>
              <Button
                onClick={() => setOpenContact(true)}
                className="mt-6 h-12 w-full max-w-[260px] rounded-full bg-neutral-900 text-white hover:bg-neutral-800"
                aria-haspopup="dialog"
              >
                Request a Quote
              </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-lg">
              {!submitted ? (
                <>
                  <DialogHeader>
                    <DialogTitle>Request a Quote</DialogTitle>
                    <DialogDescription>Tell us about your project and we will reach out shortly.</DialogDescription>
                  </DialogHeader>

                  <form className="space-y-5" onSubmit={handleSubmit} id="quote-form" encType="multipart/form-data">
                    {/* Contact */}
                    <div className="space-y-4">
                      <div className="space-y-2">
                        <Label htmlFor="name">
                          Name<span className="sr-only"> (required)</span>
                        </Label>
                        <Input id="name" name="name" placeholder="Your full name" required />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="email">
                          Email<span className="sr-only"> (required)</span>
                        </Label>
                        <Input id="email" name="email" type="email" placeholder="you@email.com" required />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="phone">
                          Phone Number<span className="sr-only"> (required)</span>
                        </Label>
                        <Input id="phone" name="phone" type="tel" placeholder="(555) 555-5555" required />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="address">
                          Project Address (Street, City, Zip)<span className="sr-only"> (required)</span>
                        </Label>
                        <Input id="address" name="address" placeholder="123 Main St, New York, NY 10001" required />
                      </div>
                    </div>

                    {/* Project type */}
                    <div className="space-y-2">
                      <Label>
                        Is this a new construction or a roof replacement? <span className="text-red-500">*</span>
                      </Label>
                      <RadioGroup
                        value={constructionType}
                        onValueChange={setConstructionType}
                        name="constructionType"
                        className="grid grid-cols-1 gap-3"
                        required
                      >
                        <div className="flex items-center space-x-2 rounded-md border border-neutral-200 p-3 dark:border-neutral-800">
                          <RadioGroupItem value="new" id="construction-new" />
                          <Label htmlFor="construction-new" className="font-medium">
                            New Construction
                          </Label>
                        </div>
                        <div className="flex items-center space-x-2 rounded-md border border-neutral-200 p-3 dark:border-neutral-800">
                          <RadioGroupItem value="replacement" id="construction-replacement" />
                          <Label htmlFor="construction-replacement" className="font-medium">
                            Roof Replacement
                          </Label>
                        </div>
                        <div className="flex items-center space-x-2 rounded-md border border-neutral-200 p-3 dark:border-neutral-800">
                          <RadioGroupItem value="not-sure" id="construction-unsure" />
                          <Label htmlFor="construction-unsure" className="font-medium">
                            Not Sure
                          </Label>
                        </div>
                      </RadioGroup>
                    </div>

                    {/* Sqft + Not sure */}
                    <div className="space-y-2">
                      <Label htmlFor="sqft">Approximate roof square footage?</Label>
                      <div className="flex items-center gap-3">
                        <Input
                          id="sqft"
                          name="squareFootage"
                          placeholder="e.g., 2,500"
                          className="flex-1"
                          disabled={notSureSqft}
                          inputMode="numeric"
                        />
                        <div className="flex items-center gap-2 whitespace-nowrap">
                          <input
                            id="sqft-unknown"
                            name="squareFootageUnknown"
                            type="checkbox"
                            className="h-4 w-4 accent-neutral-900"
                            checked={notSureSqft}
                            onChange={(e) => setNotSureSqft(e.target.checked)}
                          />
                          <Label htmlFor="sqft-unknown" className="text-sm">
                            Not sure
                          </Label>
                        </div>
                      </div>
                    </div>

                    {/* Plans/Blueprints */}
                    <div className="space-y-2">
                      <Label>Do you have existing architectural plans or blueprints you can share?</Label>
                      <RadioGroup
                        value={hasPlans}
                        onValueChange={setHasPlans}
                        name="plans"
                        className="grid grid-cols-1 gap-3"
                      >
                        <div className="flex items-center space-x-2 rounded-md border border-neutral-200 p-3 dark:border-neutral-800">
                          <RadioGroupItem value="yes" id="plans-yes" />
                          <Label htmlFor="plans-yes" className="font-medium">
                            Yes – I can email or upload a copy
                          </Label>
                        </div>
                        <div className="flex items-center space-x-2 rounded-md border border-neutral-200 p-3 dark:border-neutral-800">
                          <RadioGroupItem value="no" id="plans-no" />
                          <Label htmlFor="plans-no" className="font-medium">
                            No – I don’t have them
                          </Label>
                        </div>
                      </RadioGroup>

                      {hasPlans === "yes" && (
                        <div className="space-y-2">
                          <Label htmlFor="plansFile" className="text-sm">
                            Upload plans (PDF, images)
                          </Label>
                          <Input id="plansFile" name="plansFile" type="file" accept=".pdf,image/*" />
                        </div>
                      )}
                    </div>

                    {/* Tile type */}
                    <div className="space-y-2">
                      <Label htmlFor="tileType">Type of clay tile (if known):</Label>
                      <Select name="tileType">
                        <SelectTrigger id="tileType" className="w-full">
                          <SelectValue placeholder="Select a tile type" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="spanish">Traditional Spanish / S-Mission</SelectItem>
                          <SelectItem value="flat">Flat Tile</SelectItem>
                          <SelectItem value="not-sure">Not sure — open to recommendations</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>

                    {/* Photos */}
                    <div className="space-y-2">
                      <Label>Photos of current roof or structure?</Label>
                      <RadioGroup
                        value={hasPhotos}
                        onValueChange={setHasPhotos}
                        name="photos"
                        className="grid grid-cols-1 gap-3"
                      >
                        <div className="flex items-center space-x-2 rounded-md border border-neutral-200 p-3 dark:border-neutral-800">
                          <RadioGroupItem value="yes" id="photos-yes" />
                          <Label htmlFor="photos-yes" className="font-medium">
                            Yes – I’ll upload or send
                          </Label>
                        </div>
                        <div className="flex items-center space-x-2 rounded-md border border-neutral-200 p-3 dark:border-neutral-800">
                          <RadioGroupItem value="no" id="photos-no" />
                          <Label htmlFor="photos-no" className="font-medium">
                            No
                          </Label>
                        </div>
                      </RadioGroup>

                      {hasPhotos === "yes" && (
                        <div className="space-y-2">
                          <Label htmlFor="photosFiles" className="text-sm">
                            Upload photos (you can select multiple)
                          </Label>
                          <Input id="photosFiles" name="photosFiles" type="file" accept="image/*" multiple />
                        </div>
                      )}
                    </div>

                    {/* Timeline */}
                    <div className="space-y-2">
                      <Label htmlFor="timeline">When are you hoping to start the project?</Label>
                      <Select name="timeline">
                        <SelectTrigger id="timeline" className="w-full">
                          <SelectValue placeholder="Choose a timeframe" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="asap">ASAP</SelectItem>
                          <SelectItem value="1-3-months">Within the next 1–3 months</SelectItem>
                          <SelectItem value="exploring">Just exploring options for now</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>

                    {/* Referral */}
                    <div className="space-y-2">
                      <Label htmlFor="referral">How did you hear about us?</Label>
                      <Input id="referral" name="referral" placeholder="Friend, contractor, Google, etc." />
                    </div>

                    {/* Additional message */}
                    <div className="space-y-2">
                      <Label htmlFor="message">Brief message</Label>
                      <Textarea
                        id="message"
                        name="message"
                        placeholder="Tell us anything else we should know..."
                        rows={4}
                      />
                    </div>

                    <DialogFooter className="gap-2 pt-1">
                      <Button type="button" variant="secondary" onClick={() => setOpenContact(false)}>
                        Cancel
                      </Button>
                      <Button type="submit" className="bg-neutral-900 hover:bg-neutral-800">
                        Submit
                      </Button>
                    </DialogFooter>
                  </form>
                </>
              ) : (
                <div className="flex flex-col items-center justify-center gap-4 py-8 text-center">
                  <CheckCircle2 className="h-10 w-10 text-green-600" />
                  <div>
                    <h3 className="text-lg font-semibold">Request submitted</h3>
                    <p className="mt-1 text-sm text-neutral-600 dark:text-neutral-400" aria-live="polite">
                      Thank you, we’ll review your project and get back to you shortly.
                    </p>
                  </div>
                  <div className="flex gap-2">
                    <Button variant="secondary" onClick={() => setSubmitted(false)}>
                      Fill another
                    </Button>
                    <Button className="bg-neutral-900 hover:bg-neutral-800" onClick={resetFormAndClose}>
                      Close
                    </Button>
                  </div>
                </div>
              )}
            </DialogContent>
          </Dialog>
        </div>
      </section>

      {/* Invisible anchors for potential future sections */}
      <div id="gallery" className="sr-only">
        Gallery
      </div>
      <div id="about" className="sr-only">
        About
      </div>
      <div id="contact" className="sr-only">
        Contact
      </div>
    </main>
  )
}
