import { NextResponse, type NextRequest } from "next/server"
import { Resend } from "resend"
import { Pool } from "pg"
import twilio from "twilio"
import crypto from "crypto"
import { cookies } from "next/headers"

const resend = new Resend(process.env.RESEND_API_KEY)
const pool = new Pool({ connectionString: process.env.NeonStorage_DATABASE_URL })
const smsClient = twilio(process.env.TWILIO_ACCOUNT_SID!, process.env.TWILIO_AUTH_TOKEN!)

function getBaseUrl(req: NextRequest) {
  return req.nextUrl.origin.replace(/\/$/, "")
}

async function saveSubmission(
  name: string,
  email: string,
  phone: string,
  company: string,
  contactType: string,
  tileFamily: string,
  tileColor: string,
  message: string,
  uploadedFiles: string[],
  submittedAt: string,
  optInSms: boolean,
) {
  const query = `
    INSERT INTO submissions (name, email, phone, company, contact_type, tile_family, tile_color, message, uploaded_files, submitted_at, opt_in_sms)
    VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11)
    RETURNING id`
  const values = [
    name,
    email,
    phone,
    company,
    contactType,
    tileFamily,
    tileColor,
    message,
    JSON.stringify(uploadedFiles),
    submittedAt,
    optInSms,
  ]
  try {
    const result = await pool.query(query, values)
    return result.rows[0].id
  } catch (dbError) {
    console.error("Database error:", dbError)
    throw dbError
  }
}

function renderTeamHtml(params: {
  logoUrl: string
  name: string
  email: string
  phone?: string
  company?: string
  contactType?: string
  tileFamily?: string
  tileColor?: string
  message: string
  submittedAt: string
  attachmentsCount: number
}) {
  const {
    logoUrl,
    name,
    email,
    phone,
    company,
    contactType,
    tileFamily,
    tileColor,
    message,
    submittedAt,
    attachmentsCount,
  } = params
  return `
  <table width="100%" cellpadding="0" cellspacing="0" style="background:#f6f6f6;padding:24px 0;font-family:system-ui,-apple-system,Segoe UI,Roboto,Helvetica,Arial,sans-serif;">
    <tr><td align="center">
      <table width="640" cellpadding="0" cellspacing="0" style="background:#ffffff;border-radius:12px;overflow:hidden">
        <tr><td style="background:#111;padding:16px 24px" align="left"><img src="${logoUrl}" alt="Clay Roofing New York" height="40" style="display:block"></td></tr>
        <tr><td style="padding:24px">
          <h2 style="margin:0 0 12px 0;color:#111">New Contact Submission</h2>
          <p style="margin:0 0 16px 0;color:#444">Submitted ${submittedAt}</p>
          <table cellpadding="0" cellspacing="0" style="width:100%;font-size:14px;color:#111">
            <tr><td style="padding:6px 0;width:160px;color:#666">Name</td><td>${name || "-"}</td></tr>
            <tr><td style="padding:6px 0;color:#666">Email</td><td>${email || "-"}</td></tr>
            <tr><td style="padding:6px 0;color:#666">Phone</td><td>${phone || "-"}</td></tr>
            <tr><td style="padding:6px 0;color:#666">Company</td><td>${company || "-"}</td></tr>
            <tr><td style="padding:6px 0;color:#666">Contact Type</td><td>${contactType || "-"}</td></tr>
            <tr><td style="padding:6px 0;color:#666">Tile Family</td><td>${tileFamily || "-"}</td></tr>
            <tr><td style="padding:6px 0;color:#666">Tile Color</td><td>${tileColor || "-"}</td></tr>
            <tr><td style="padding:6px 0;color:#666">Attachments</td><td>${attachmentsCount} file(s)</td></tr>
          </table>
          <h3 style="margin:20px 0 8px 0;color:#111">Message</h3>
          <p style="white-space:pre-wrap;margin:0;color:#222">${(message || "").replace(/</g, "&lt;")}</p>
          <p style="margin-top:24px;font-size:12px;color:#666">Sent automatically from clayroofingnewyork.com</p>
        </td></tr>
      </table>
    </td></tr>
  </table>`
}

function renderUserHtml(params: {
  logoUrl: string
  name: string
  email: string
  phone?: string
  company?: string
  contactType?: string
  tileFamily?: string
  tileColor?: string
  message: string
  submittedAt: string
}) {
  const { logoUrl, name, email, phone, company, contactType, tileFamily, tileColor, message, submittedAt } = params
  return `
  <table width="100%" cellpadding="0" cellspacing="0" style="background:#f6f6f6;padding:24px 0;font-family:system-ui,-apple-system,Segoe UI,Roboto,Helvetica,Arial,sans-serif;">
    <tr><td align="center">
      <table width="640" cellpadding="0" cellspacing="0" style="background:#ffffff;border-radius:12px;overflow:hidden">
        <tr><td style="background:#111;padding:16px 24px" align="left"><img src="${logoUrl}" alt="Clay Roofing New York" height="40" style="display:block"></td></tr>
        <tr><td style="padding:24px">
          <h2 style="margin:0 0 12px 0;color:#111">Thanks, ${name || "there"}!</h2>
          <p style="margin:0 0 12px 0;color:#444">We received your message on <strong>${submittedAt}</strong>.</p>
          <p style="margin:0 0 12px 0;color:#444">Our Client Relations Manager will contact you shortly. Below is a copy of what you sent:</p>
          <table cellpadding="0" cellspacing="0" style="width:100%;font-size:14px;color:#111;margin:12px 0 0 0">
            <tr><td style="padding:6px 0;width:160px;color:#666">Name</td><td>${name || "-"}</td></tr>
            <tr><td style="padding:6px 0;color:#666">Email</td><td>${email || "-"}</td></tr>
            <tr><td style="padding:6px 0;color:#666">Phone</td><td>${phone || "-"}</td></tr>
            <tr><td style="padding:6px 0;color:#666">Company</td><td>${company || "-"}</td></tr>
            <tr><td style="padding:6px 0;color:#666">Contact Type</td><td>${contactType || "-"}</td></tr>
            <tr><td style="padding:6px 0;color:#666">Tile Family</td><td>${tileFamily || "-"}</td></tr>
            <tr><td style="padding:6px 0;color:#666">Tile Color</td><td>${tileColor || "-"}</td></tr>
          </table>
          <h3 style="margin:16px 0 8px 0;color:#111">Your Message</h3>
          <p style="white-space:pre-wrap;margin:0;color:#222">${(message || "").replace(/</g, "&lt;")}</p>
          <p style="margin-top:24px;font-size:12px;color:#666">If this is urgent, call us at <a href="tel:+12123654386" style="color:#ea580c;text-decoration:none">212-365-4386</a>.</p>
        </td></tr>
      </table>
    </td></tr>
  </table>`
}

async function fileToResendAttachment(fileData: { url: string; filename?: string; contentType?: string }) {
  return {
    filename: fileData.filename || fileData.url.split("/").pop() || "unknown",
    content: "",
    contentType: fileData.contentType || "application/octet-stream",
    path: fileData.url,
  }
}

export async function POST(req: NextRequest) {
  try {
    const formData = await req.formData()
    console.log("FormData received:", Object.fromEntries(formData))
    const name = formData.get("name")?.toString().trim() || ""
    const email = formData.get("email")?.toString().trim() || ""
    const phone = formData.get("phone")?.toString().trim() || ""
    const company = formData.get("company")?.toString().trim() || ""
    const contactType = formData.get("contactType")?.toString().trim() || ""
    const tileFamily = formData.get("tileFamily")?.toString().trim() || ""
    const tileColor = formData.get("tileColor")?.toString().trim() || ""
    const message = formData.get("message")?.toString().trim() || ""
    const privacyAccepted = formData.get("privacyAccepted") === "true" || formData.get("privacyAccepted") === "on"
    const smsOptIn = formData.get("smsOptIn") === "true" || formData.get("smsOptIn") === "on"

    const files = formData.getAll("uploadedFiles") as File[]
    const fileUrls: string[] = []
    for (const file of files) {
      if (file.size > 0) {
        const form = new FormData()
        form.append("file", file)
        const uploadResponse = await fetch(`${getBaseUrl(req)}/api/blob/upload`, {
          method: "POST",
          body: form,
        })
        if (uploadResponse.ok) {
          const result = await uploadResponse.json()
          if (result.ok && result.url) {
            fileUrls.push(result.url)
          } else {
            console.warn("[API] Blob upload failed:", result.error)
          }
        } else {
          console.warn("[API] Blob upload failed with status:", uploadResponse.status)
        }
      }
    }
    console.log("File URLs:", fileUrls)

    let normalizedPhone = phone.replace(/\D/g, "")
    if (normalizedPhone.startsWith("212") && normalizedPhone.length === 10) {
      normalizedPhone = `+1${normalizedPhone}`
    } else if (normalizedPhone.startsWith("+212")) {
      normalizedPhone = `+1212${normalizedPhone.slice(4)}`
    }
    console.log("Normalized phone:", normalizedPhone)

    const fieldErrors: Record<string, string[]> = {}
    if (!name) fieldErrors.name = ["Name is required"]
    if (!email) fieldErrors.email = ["Email is required"]
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) fieldErrors.email = ["Please enter a valid email address"]
    if (!message) fieldErrors.message = ["Message is required"]
    else if (message.length < 10) fieldErrors.message = ["Message must be at least 10 characters long"]
    if (!contactType) fieldErrors.contactType = ["Please select your contact type"]
    if (!privacyAccepted) fieldErrors.privacyAccepted = ["You must accept the Privacy Policy to continue"]
    if (Object.keys(fieldErrors).length > 0) {
      return NextResponse.json({ ok: false, message: "Please fix the errors below.", fieldErrors }, { status: 400 })
    }

    const from = process.env.CONTACT_FROM
    const to = (process.env.CONTACT_TO || "")
      .split(",")
      .map((s) => s.trim())
      .filter(Boolean)
    if (!process.env.RESEND_API_KEY || !from || to.length === 0) {
      return NextResponse.json({ ok: false, message: "Email service not configured." }, { status: 500 })
    }
    const baseUrl = getBaseUrl(req)
    const logoUrl = `${baseUrl}/CRNY_email_banner.png`
    const submittedAt = new Date().toLocaleString("en-US", { timeZone: "America/New_York", hour12: true })

    const submissionId = await saveSubmission(
      name,
      email,
      normalizedPhone,
      company,
      contactType,
      tileFamily,
      tileColor,
      message,
      fileUrls,
      submittedAt,
      smsOptIn,
    )
    console.log(`Submission saved with ID: ${submissionId}`)

    let loginResponse = { success: false }
    if ((email || normalizedPhone) && !cookies().get("auth-token")) {
      const code = Math.floor(100000 + Math.random() * 900000).toString()
      const expiresAt = new Date(Date.now() + 5 * 60 * 1000)
      await pool.query(
        "INSERT INTO verification_codes (code, email, phone, expires_at) VALUES ($1, $2, $3, $4) ON CONFLICT (email, phone) DO UPDATE SET code = $1, expires_at = $4",
        [code, email || null, normalizedPhone || null, expiresAt],
      )

      if (normalizedPhone) {
        await smsClient.messages.create({
          body: `Your Clay Roofing NY login code: ${code}`,
          from: process.env.TWILIO_PHONE,
          to: normalizedPhone,
        })
        loginResponse = { success: true, message: "Login code sent to your phone." }
      } else if (email) {
        await resend.emails.send({
          from,
          to: [email],
          subject: "Your Clay Roofing NY Login Code",
          text: `Your login code is: ${code}. It expires in 5 minutes.`,
        })
        loginResponse = { success: true, message: "Login code sent to your email." }
      }
    }

    const teamEmail = await resend.emails.send({
      from,
      to,
      subject: `Thank you ${name} - New Contact (ID: ${submissionId})`,
      reply_to: email,
      text: `New contact submission (submitted ${submittedAt}, ID: ${submissionId}):\nName: ${name}\nEmail: ${email}\nPhone: ${normalizedPhone || "-"}\nCompany: ${company || "-"}\nContact Type: ${contactType || "-"}\nTile Family: ${tileFamily || "-"}\nTile Color: ${tileColor || "-"}\nMessage:\n${message}\nAttachments: ${fileUrls.length} file(s)`,
      html: renderTeamHtml({
        logoUrl,
        name,
        email,
        phone: normalizedPhone,
        company,
        contactType,
        tileFamily,
        tileColor,
        message,
        submittedAt,
        attachmentsCount: fileUrls.length,
      }),
      attachments: fileUrls.length
        ? fileUrls.map((url) => fileToResendAttachment({ url, filename: url.split("/").pop() || "unknown" }))
        : undefined,
    })

    if (teamEmail.error) {
      console.error("[API] Resend team email error:", teamEmail.error)
      return NextResponse.json({ ok: false, message: "Failed to send email." }, { status: 502 })
    }

    try {
      await resend.emails.send({
        from,
        to: [email],
        reply_to: to,
        subject: `Thank you ${name} - Contact Received`,
        html: renderUserHtml({
          logoUrl: `${baseUrl}/CRNY_email_banner.png`,
          name,
          email,
          phone: normalizedPhone,
          company,
          contactType,
          tileFamily,
          tileColor,
          message,
          submittedAt,
        }),
        text: `Thanks, ${name}!\nWe received your message on ${submittedAt} (ID: ${submissionId}).\nOur Client Relations Manager will contact you shortly.\nSubmission copy:\nName: ${name}\nEmail: ${email}\nPhone: ${normalizedPhone || "-"}\nCompany: ${company || "-"}\nContact Type: ${contactType || "-"}\nTile Family: ${tileFamily || "-"}\nTile Color: ${tileColor || "-"}\nMessage:\n${message}\nIf this is urgent, call us at 212-365-4386.\nClay Roofing New York`,
      })
    } catch (err) {
      console.warn("[API] User confirmation email failed:", err)
    }

    return NextResponse.json({ ok: true, message: "Thanks—your message was sent.", login: loginResponse })
  } catch (err) {
    console.error("[API] Unexpected error:", err)
    return NextResponse.json(
      { ok: false, message: "Something went wrong. Please try again later.", error: err.message },
      { status: 500 },
    )
  }
}

export async function verify(req: NextRequest) {
  const { phone, code, email } = await req.json()
  try {
    const identifier = email || phone
    if (!identifier) {
      return NextResponse.json({ ok: false, message: "Email or phone required" }, { status: 400 })
    }

    const res = await pool.query(
      "SELECT * FROM verification_codes WHERE (email = $1 OR phone = $2) AND code = $3 AND expires_at > NOW()",
      [email || null, phone || null, code],
    )
    const validCode = res.rows[0]

    if (!validCode) {
      return NextResponse.json({ ok: false, message: "Invalid or expired code" }, { status: 400 })
    }

    const sessionToken = crypto.randomBytes(32).toString("hex")
    await pool.query(
      "INSERT INTO users (email, phone, session_token) VALUES ($1, $2, $3) ON CONFLICT (email) DO UPDATE SET session_token = $3, last_login = CURRENT_TIMESTAMP RETURNING id",
      [email || null, phone || null, sessionToken],
    )

    if (email) {
      await pool.query("UPDATE submissions SET session_token = $1 WHERE email = $2", [sessionToken, email])
    } else if (phone) {
      await pool.query("UPDATE submissions SET session_token = $1 WHERE phone = $2", [sessionToken, phone])
    }

    cookies().set("auth-token", sessionToken, { httpOnly: true, secure: true, maxAge: 30 * 24 * 60 * 60 })
    await pool.query("DELETE FROM verification_codes WHERE (email = $1 OR phone = $2)", [email || null, phone || null])

    return NextResponse.json({ ok: true, message: "Logged in!" })
  } catch (err) {
    console.error("Verify error:", err)
    return NextResponse.json({ ok: false, message: "Verification failed" }, { status: 500 })
  }
}

export const dynamic = "force-dynamic"
export const runtime = "nodejs"
