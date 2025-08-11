import { z } from "zod"

const MAX_FILE_SIZE = 5 * 1024 * 1024 // 5MB
const ACCEPTED_IMAGE_TYPES = ["image/jpeg", "image/jpg", "image/png", "image/webp"]
const ACCEPTED_DOC_TYPES = ["application/pdf", ...ACCEPTED_IMAGE_TYPES]

export const step1Schema = z.object({
  name: z.string().min(2, { message: "Please enter your full name." }),
  phone: z
    .string()
    .transform((val) => val.replace(/\D/g, ""))
    .pipe(z.string().length(10, { message: "Please enter a complete 10-digit phone number." })),
  email: z.string().email({ message: "Please enter a valid email address." }),
  projectType: z.enum(["new-construction", "roof-replacement", "not-sure"], {
    errorMap: () => ({ message: "Please select a project type." }),
  }),
})

export const step2Schema = z.object({
  airtableRecordId: z.string(),
  projectAddress: z.string().optional(),
  isRoofSizeUnsure: z.boolean().optional(),
  roofSize: z.string().optional(),
  plans: z
    .array(z.instanceof(File))
    .optional()
    .refine((files) => !files || files.every((file) => file.size <= MAX_FILE_SIZE), `Max file size is 5MB per file.`)
    .refine(
      (files) => !files || files.every((file) => ACCEPTED_DOC_TYPES.includes(file.type)),
      "Only .pdf, .jpg, .png, and .webp formats are supported.",
    ),
  photos: z
    .array(z.instanceof(File))
    .optional()
    .refine((files) => !files || files.every((file) => file.size <= MAX_FILE_SIZE), `Max file size is 5MB per photo.`)
    .refine(
      (files) => !files || files.every((file) => ACCEPTED_IMAGE_TYPES.includes(file.type)),
      "Only .jpg, .png, and .webp formats are supported.",
    ),
  tileType: z.string().optional(),
  timeframe: z.string().optional(),
  referral: z.string().optional(),
  message: z.string().optional(),
})

export type Step1Data = z.infer<typeof step1Schema>
export type Step2Data = z.infer<typeof step2Schema>
