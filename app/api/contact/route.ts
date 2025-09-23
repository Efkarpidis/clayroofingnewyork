// app/api/contact/route.ts
import { NextResponse, type NextRequest } from "next/server"
import { Resend } from "resend"
import { Pool } from "pg"

const resend = new Resend(process.env.RESEND_API_KEY)
const pool = new Pool({ connectionString: process.env.DATABASE_URL })

function getBaseUrl(req: NextRequest) {
  return req.nextUrl.origin.replace(/\/$/, "")
}

async function saveSubmission(name: string, email: string, phone: string, company: string, contactType: string, tileFamily: string, tileColor: string, message: string, uploadedFiles: string[], submittedAt: string) {
  const query = `
    INSERT INTO submissions (name, email, phone, company, contact_type, tile_family, tile_color, message, uploaded_files, submitted_at)
    VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10)
    RETURNING id`
  const values = [name, email, phone, company, contactType, tileFamily, tileColor, message, JSON.stringify(uploadedFiles), submittedAt]
  const result = await pool.query(query, values)
  return result.rows[0].id
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
  const { logoUrl, name, email, phone, company, contactType, tileFamily, tileColor, message, submittedAt, attachmentsCount } = params
  return `
  <table width="100%" cellpadding="0" cellspacing="0" style="background:#f6f6f6;padding:24px 0;font-family:system-ui,-apple-system,Segoe UI,Roboto,Helvetica,Arial,sans-serif;">
    <tr><td align="center">
      <table width="640" cellpadding="0" cellspacing="0" style="background:#ffffff;border-radius:12px;overflow:hidden">
        <tr>
          <td style="background:#111;padding:16px 24px" align="left">
            <img src="${logoUrl}" alt="Clay Roofing New York" height="40" style="display:block">
          </td>
        </tr>
        <tr>
          <td style="padding:24px">
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
          </td>
        </tr>
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
        <tr>
          <td style="background:#111;padding:16px 24px" align="left">
            <img src="${logoUrl}" alt="Clay Roofing New York" height="40" style="display:block">
          </td>
        </tr>
        <tr>
          <td style="padding:24px">
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
          </td>
        </tr>
      </table>
    </td></tr>
  </table>`
}

// Convert uploaded File -> Resend attachment (using URLs)
async function fileToResendAttachment(fileData: { url: string; filename?: string; contentType?: string }) {
  return {
    filename: fileData.filename || fileData.url.split("/").pop() || "unknown",
    content: "", // Not needed for URLs
    contentType: fileData.contentType || "application/octet-stream",
    path: fileData.url, // Use Blob URL
  }
}

export async function POST(req: NextRequest) {
  try {
    const formData = await req.formData()
    // Fields
    const name = formData.get("name")?.toString().trim() || ""
    const email = formData.get("email")?.toString().trim() || ""
    const phone = formData.get("phone")?.toString().trim() || ""
    const company = formData.get("company")?.toString().trim() || ""
    const contactType = formData.get("contactType")?.toString().trim() || ""
    const tileFamily = formData.get("tileFamily")?.toString().trim() || ""
    const tileColor = formData.get("tileColor")?.toString().trim() || ""
    const message = formData.get("message")?.toString().trim() || ""
    const privacyAccepted = formData.get("privacyAccepted") === "true" || formData.get("privacyAccepted") === "on"
    // Files (from uploadedFiles JSON string)
    const uploadedFiles = formData.get("uploadedFiles")
    let attachments: any[] = []
    const fileUrls: string[] = []
    if (uploadedFiles) {
      try {
        const filesData = JSON.parse(uploadedFiles.toString())
        if (Array.isArray(filesData)) {
          for (const file of filesData) {
            const attachment = await fileToResendAttachment(file)
            attachments.push(attachment)
            fileUrls.push(file.url)
          }
        }
      } catch (e) {
        console.warn("[API] Failed to parse uploadedFiles:", e)
      }
    }
    // Validation
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
    // Email env
    const from = process.env.CONTACT_FROM
    const to = (process.env.CONTACT_TO || "").split(",").map((s) => s.trim()).filter(Boolean)
    if (!process.env.RESEND_API_KEY || !from || to.length === 0) {
      return NextResponse.json({ ok: false, message: "Email service not configured." }, { status: 500 })
    }
    const baseUrl = getBaseUrl(req)
    const logoUrl = `${baseUrl}/images/email-logo.png`
    const submittedAt = new Date().toLocaleString("en-US", { timeZone: "America/New_York", hour12: true })
    // Save to database
    const submissionId = await saveSubmission(name, email, phone, company, contactType, tileFamily, tileColor, message, fileUrls, submittedAt)
    console.log(`Submission saved with ID: ${submissionId}`)
    // Team email
    const teamEmail = await resend.emails.send({
      from,
      to,
      subject: `Website Contact – ${name} (ID: ${submissionId})`,
      reply_to: email,
      text: `New contact submission (submitted ${submittedAt}, ID: ${submissionId}):
Name: ${name}
Email: ${email}
Phone: ${phone || "-"}
Company: ${company || "-"}
Contact Type: ${contactType || "-"}
Tile Family: ${tileFamily || "-"}
Tile Color: ${tileColor || "-"}
Message:
${message}
Attachments: ${attachments.length} file(s)
`,
      html: renderTeamHtml({
        logoUrl, name, email, phone, company, contactType, tileFamily, tileColor, message, submittedAt,
        attachmentsCount: attachments.length,
      }),
      attachments: attachments.length ? attachments : undefined,
    })
    if (teamEmail.error) {
      console.error("[API] Resend team email error:", teamEmail.error)
      return NextResponse.json({ ok: false, message: "Failed to send email." }, { status: 502 })
    }
    // User confirmation (mirrors submission)
    try {
      await resend.emails.send({
        from,
        to: [email],
        reply_to: to,
        subject: "We received your message – Clay Roofing New York",
        html: renderUserHtml({
          logoUrl, name, email, phone, company, contactType, tileFamily, tileColor, message, submittedAt
        }),
        text: `Thanks, ${name}!
We received your message on ${submittedAt} (ID: ${submissionId}).
Our Client Relations Manager will contact you shortly.
Submission copy:
Name: ${name}
Email: ${email}
Phone: ${phone || "-"}
Company: ${company || "-"}
Contact Type: ${contactType || "-"}
Tile Family: ${tileFamily || "-"}
Tile Color: ${tileColor || "-"}
Message:
${message}
If this is urgent, call us at 212-365-4386.
Clay Roofing New York`,
      })
    } catch (err) {
      console.warn("[API] User confirmation email failed:", err)
    }
    return NextResponse.json({ ok: true, message: "Thanks—your message was sent." })
  } catch (err) {
    console.error("[API] Unexpected error:", err)
    return NextResponse.json({ ok: false, message: "Something went wrong. Please try again later." }, { status: 500 })
  }
}

export const dynamic = "force-dynamic"
export const runtime = "nodejs"
