"use server"

import { step1Schema, step2Schema, type contactFormSchema, quoteRequestSchema } from "./schemas"
import { z } from "zod"

// --- STATE TYPES FOR useActionState ---
export type Step1State = {
  message: string
  errors?: {
    name?: string[]
    phone?: string[]
    email?: string[]
    projectType?: string[]
  }
  success: boolean
  recordId?: string
}

export type Step2State = {
  message: string
  errors?: {
    projectAddress?: string[]
    roofSize?: string[]
    plans?: string[]
    photos?: string[]
  }
  success: boolean
}

export type ContactFormState = {
  message: string
  errors?: {
    name?: string[]
    email?: string[]
    phone?: string[]
    message?: string[]
  }
  success: boolean
}

export type QuoteRequestState = {
  message: string
  errors?: {
    firstName?: string[]
    lastName?: string[]
    email?: string[]
    phone?: string[]
    address?: string[]
    projectType?: string[]
    timeline?: string[]
    description?: string[]
  }
  success: boolean
}

// --- SIMULATED API/DB FUNCTIONS ---

async function createAirtableRecord(data: z.infer<typeof step1Schema>) {
  console.log("Step 1: Creating Airtable record with data:", data)
  await new Promise((resolve) => setTimeout(resolve, 1000))
  const mockRecordId = `rec${Math.random().toString(36).substring(2, 15)}`
  console.log("Step 1: Record created with ID:", mockRecordId)
  return mockRecordId
}

async function updateAirtableRecord(recordId: string, data: Omit<z.infer<typeof step2Schema>, "airtableRecordId">) {
  console.log(`Step 2: Updating Airtable record ${recordId} with data:`, data)
  await new Promise((resolve) => setTimeout(resolve, 1000))
  console.log("Step 2: Record updated successfully.")
  if (data.plans && data.plans.length > 0) {
    data.plans.forEach((plan) => console.log(`Simulating upload for plan: ${plan.name}`))
  }
  if (data.photos && data.photos.length > 0) {
    data.photos.forEach((photo) => console.log(`Simulating upload for photo: ${photo.name}`))
  }
}

async function submitContactMessage(data: z.infer<typeof contactFormSchema>) {
  console.log("Contact Form: Submitting message:", data)
  await new Promise((resolve) => setTimeout(resolve, 1000))
  console.log("Contact Form: Message submitted successfully.")
}

// --- SERVER ACTIONS ---

export async function handleStep1Submit(prevState: Step1State, formData: FormData): Promise<Step1State> {
  const validatedFields = step1Schema.safeParse({
    name: formData.get("name"),
    phone: formData.get("phone"),
    email: formData.get("email"),
    projectType: formData.get("projectType"),
  })

  if (!validatedFields.success) {
    return {
      message: "Please fix the errors below.",
      errors: validatedFields.error.flatten().fieldErrors,
      success: false,
    }
  }

  try {
    const recordId = await createAirtableRecord(validatedFields.data)
    return {
      message: "Callback requested successfully.",
      success: true,
      recordId: recordId,
    }
  } catch (error) {
    console.error("Error in Step 1:", error)
    return {
      message: "An unexpected error occurred. Please try again.",
      success: false,
    }
  }
}

export async function handleStep2Submit(prevState: Step2State, formData: FormData): Promise<Step2State> {
  const validatedFields = step2Schema.safeParse({
    airtableRecordId: formData.get("airtableRecordId"),
    projectAddress: formData.get("projectAddress"),
    roofSize: formData.get("roofSize"),
    isRoofSizeUnsure: formData.get("isRoofSizeUnsure") === "on",
    plans: formData.getAll("plans").filter((p: FormDataEntryValue) => (p as File).size > 0),
    photos: formData.getAll("photos").filter((p: FormDataEntryValue) => (p as File).size > 0),
    tileType: formData.get("tileType"),
    timeframe: formData.get("timeframe"),
    referral: formData.get("referral"),
    message: formData.get("message"),
  })

  if (!validatedFields.success) {
    return {
      message: "Please fix the errors below.",
      errors: validatedFields.error.flatten().fieldErrors,
      success: false,
    }
  }

  const { airtableRecordId, ...updateData } = validatedFields.data

  try {
    await updateAirtableRecord(airtableRecordId, updateData)
    return {
      message: "Details submitted successfully.",
      success: true,
    }
  } catch (error) {
    console.error("Error in Step 2:", error)
    return {
      message: "An unexpected error occurred. Please try again.",
      success: false,
    }
  }
}

export async function handleContactFormSubmit(
  prevState: ContactFormState,
  formData: FormData,
): Promise<ContactFormState> {
  const validatedFields = z
    .object({
      firstName: z.string().min(2, { message: "Please enter your first name." }),
      lastName: z.string().min(2, { message: "Please enter your last name." }),
      email: z.string().email({ message: "Please enter a valid email address." }),
      phone: z.string().min(10, { message: "Please enter your phone number." }),
      subject: z.string().optional(),
      message: z.string().min(10, { message: "Your message must be at least 10 characters long." }),
    })
    .safeParse({
      firstName: formData.get("firstName"),
      lastName: formData.get("lastName"),
      email: formData.get("email"),
      phone: formData.get("phone"),
      subject: formData.get("subject"),
      message: formData.get("message"),
    })

  if (!validatedFields.success) {
    return {
      message: "Please fix the errors below.",
      errors: validatedFields.error.flatten().fieldErrors,
      success: false,
    }
  }

  try {
    console.log("Contact Form: Submitting message:", validatedFields.data)
    await new Promise((resolve) => setTimeout(resolve, 1000))
    console.log("Contact Form: Message submitted successfully.")

    return {
      message: "Message sent successfully!",
      success: true,
    }
  } catch (error) {
    console.error("Error in Contact Form:", error)
    return {
      message: "An unexpected error occurred. Please try again.",
      success: false,
    }
  }
}

export async function submitQuoteRequest(prevState: QuoteRequestState, formData: FormData): Promise<QuoteRequestState> {
  const validatedFields = quoteRequestSchema.safeParse({
    firstName: formData.get("firstName"),
    lastName: formData.get("lastName"),
    email: formData.get("email"),
    phone: formData.get("phone"),
    address: formData.get("address"),
    projectType: formData.get("projectType"),
    tileType: formData.get("tileType"),
    timeline: formData.get("timeline"),
    budget: formData.get("budget"),
    description: formData.get("description"),
  })

  if (!validatedFields.success) {
    return {
      message: "Please fix the errors below.",
      errors: validatedFields.error.flatten().fieldErrors,
      success: false,
    }
  }

  try {
    console.log("Quote Request: Submitting request:", validatedFields.data)
    await new Promise((resolve) => setTimeout(resolve, 1000))
    console.log("Quote Request: Request submitted successfully.")

    return {
      message: "Quote request submitted successfully!",
      success: true,
    }
  } catch (error) {
    console.error("Error in Quote Request:", error)
    return {
      message: "An unexpected error occurred. Please try again.",
      success: false,
    }
  }
}
