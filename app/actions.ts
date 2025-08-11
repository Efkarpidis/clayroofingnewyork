"use server"

import { step1Schema, step2Schema } from "./schemas"
import type { z } from "zod"

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
  if (data.plans && data.plans.size > 0) {
    console.log(`Simulating upload for plan: ${data.plans.name}`)
  }
  if (data.photos && data.photos.length > 0) {
    data.photos.forEach((photo) => console.log(`Simulating upload for photo: ${photo.name}`))
  }
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
    plans: formData.get("plans"),
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
