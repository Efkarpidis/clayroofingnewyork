import { NextResponse, type NextRequest } from "next/server"
import { Resend } from "resend"
import { Pool } from "pg"
import twilio from "twilio"
import { cookies } from "next/headers"

const resend = new Resend(process.env.RESEND_API_KEY)
const pool = new Pool({ connectionString: process.env.NeonStorage_DATABASE_URL })

let smsClient: ReturnType<typeof twilio> | null = null
if (process.env.TWILIO_ACCOUNT_SID && process.env.TWILIO_AUTH_TOKEN) {
  console.log("[v0] Twilio client initialized with SID:", process.env.TWILIO_ACCOUNT_SID?.substring(0, 10) + "...")
  smsClient = twilio(process.env.TWILIO_ACCOUNT_SID, process.env.TWILIO_AUTH_TOKEN)
} else {
  console.warn("[v0] Twilio credentials missing - SMS will not be sent")
}

export async function POST(req: NextRequest) {
  try {
    const formData = await req.formData()
    console.log("[v0] FormData received")

    const email = formData.get("email")?.toString() || ""
    const phone = formData.get("phone")?.toString() || ""
    const normalizedPhone = phone.replace(/\D/g, "")
    const from = "noreply@clayroofingny.com"

    let loginResponse = { success: false, message: "" }
    if ((email || normalizedPhone) && !cookies().get("auth-token")) {
      const code = Math.floor(100000 + Math.random() * 900000).toString()
      const expiresAt = new Date(Date.now() + 5 * 60 * 1000)

      console.log("[v0] Saving verification code to database...")
      await pool.query(
        "INSERT INTO verification_codes (code, email, phone, expires_at) VALUES ($1, $2, $3, $4) ON CONFLICT (email, phone) DO UPDATE SET code = $1, expires_at = $4",
        [code, email || null, normalizedPhone || null, expiresAt],
      )
      console.log("[v0] Verification code saved:", code)

      if (normalizedPhone) {
        console.log("[v0] Attempting to send SMS...")
        console.log("[v0] SMS Client available:", !!smsClient)
        console.log("[v0] TWILIO_PHONE env var:", process.env.TWILIO_PHONE)
        console.log("[v0] Target phone number:", normalizedPhone)

        if (!smsClient) {
          console.error("[v0] SMS Client not initialized - check TWILIO_ACCOUNT_SID and TWILIO_AUTH_TOKEN")
        } else if (!process.env.TWILIO_PHONE) {
          console.error("[v0] TWILIO_PHONE environment variable is not set")
        } else {
          try {
            console.log("[v0] Calling smsClient.messages.create...")
            const smsResult = await smsClient.messages.create({
              body: `Your Clay Roofing NY login code: ${code}`,
              from: process.env.TWILIO_PHONE,
              to: normalizedPhone,
            })
            console.log("[v0] SMS sent successfully! SID:", smsResult.sid)
            console.log("[v0] SMS status:", smsResult.status)
            loginResponse = { success: true, message: "Login code sent to your phone." }
          } catch (smsError: any) {
            console.error("[v0] Twilio SMS error - Full details:")
            console.error("[v0] Error code:", smsError.code)
            console.error("[v0] Error message:", smsError.message)
            console.error("[v0] Error status:", smsError.status)
            console.error("[v0] More info:", smsError.moreInfo)
            console.error("[v0] Full error object:", JSON.stringify(smsError, null, 2))
          }
        }
      } else if (email) {
        try {
          console.log("[v0] Sending login code via email...")
          await resend.emails.send({
            from,
            to: [email],
            subject: "Your Clay Roofing NY Login Code",
            text: `Your login code is: ${code}. It expires in 5 minutes.`,
          })
          loginResponse = { success: true, message: "Login code sent to your email." }
          console.log("[v0] Login email sent successfully")
        } catch (emailError) {
          console.error("[v0] Login email error:", emailError)
        }
      }
    }
  } catch (err: any) {
    console.error("[v0] Unexpected error:", err)
    return NextResponse.json(
      { ok: false, message: "Something went wrong. Please try again later.", error: err?.message || String(err) },
      { status: 500 },
    )
  }
}
