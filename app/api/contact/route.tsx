import { NextResponse, type NextRequest } from "next/server"
import { Resend } from "resend"

const resend = new Resend(process.env.RESEND_API_KEY)

// Build a safe absolute URL for images in emails
function getBaseUrl(req: NextRequest) {
  // In prod this will be https://www.clayroofingnewyork.com
  return req.nextUrl.origin.replace(/\/$/, "")
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
}) {
  const { logoUrl, name, email, phone, company, contactType, tileFamily, tileColor, message } = params

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
            <p style="margin:0 0 16px 0;color:#444">You received a new message from the website contact form.</p>
            <table cellpadding="0" cellspacing="0" style="width:100%;font-size:14px;color:#111">
              <tr><td style="padding:6px 0;width:160px;color:#666">Name</td><td>${name || "-"}</td></tr>
              <tr><td style="padding:6px 0;color:#666">Email</td><td>${email || "-"}</td></tr>
              <tr><td style="padding:6px 0;color:#666">Phone</td><td>${phone || "-"}</td></tr>
              <tr><td style="padding:6px 0;color:#666">Company</td><td>${company || "-"}</td></tr>
              <tr><td style="padding:6px 0;color:#666">Contact Type</td><td>${contactType || "-"}</td></tr>
              <tr><td style="padding:6px 0;color:#666">Tile Family</td><td>${tileFamily || "-"}</td></tr>
              <tr><td style="padding:6px 0;color:#666">Tile Color</td><td>${tileColor || "-"}</td></tr>
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

function renderUserHtml(params: { logoUrl: string; name: string }) {
  const { logoUrl, name } = params
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
            <p style="margin:0 0 12px 0;color:#444">
              We received your message and a specialist will contact you shortly.
            </p>
            <p style="margin:0 0 12px 0;color:#444">
              If this is urgent, call us at <a href="tel:+12123654386" style="color:#ea580c;text-decoration:none">212-365-4386</a>.
            </p>
            <p style="margin-top:24px;font-size:12px;color:#666">Clay Roofing New York</p>
          </td>
        </tr>
      </table>
    </td></tr>
  </table>`
}

export async function POST(req: NextRequest) {
  console.log("[API] Contact form submission received")

  try {
    // Parse the form data
    const formData = await req.formData()

    // Extract form fields
    const name = formData.get("name")?.toString().trim() || ""
    const email = formData.get("email")?.toString().trim() || ""
    const phone = formData.get("phone")?.toString().trim() || ""
    const company = formData.get("company")?.toString().trim() || ""
    const contactType = formData.get("contactType")?.toString().trim() || ""
    const tileFamily = formData.get("tileFamily")?.toString().trim() || ""
    const tileColor = formData.get("tileColor")?.toString().trim() || ""
    const message = formData.get("message")?.toString().trim() || ""
    const privacyAccepted = formData.get("privacyAccepted")?.toString() === "true"

    console.log("[API] Parsed form data:", {
      name,
      email,
      contactType,
      hasMessage: !!message,
      privacyAccepted,
    })

    // Validate required fields
    const fieldErrors: Record<string, string[]> = {}

    if (!name) {
      fieldErrors.name = ["Name is required"]
    }
    if (!email) {
      fieldErrors.email = ["Email is required"]
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      fieldErrors.email = ["Please enter a valid email address"]
    }
    if (!message) {
      fieldErrors.message = ["Message is required"]
    } else if (message.length < 10) {
      fieldErrors.message = ["Message must be at least 10 characters long"]
    }
    if (!contactType) {
      fieldErrors.contactType = ["Please select your contact type"]
    }
    if (!privacyAccepted) {
      fieldErrors.privacyAccepted = ["You must accept the Privacy Policy to continue"]
    }

    if (Object.keys(fieldErrors).length > 0) {
      console.log("[API] Validation errors:", fieldErrors)
      return NextResponse.json(
        {
          ok: false,
          message: "Please fix the errors below.",
          fieldErrors,
        },
        { status: 400 },
      )
    }

    // Check environment variables
    const from = process.env.CONTACT_FROM
    const to = (process.env.CONTACT_TO || "")
      .split(",")
      .map((s) => s.trim())
      .filter(Boolean)

    if (!process.env.RESEND_API_KEY) {
      console.error("[API] Missing RESEND_API_KEY")
      return NextResponse.json({ ok: false, message: "Email service not configured." }, { status: 500 })
    }

    if (!from) {
      console.error("[API] Missing CONTACT_FROM")
      return NextResponse.json({ ok: false, message: "Email service not configured." }, { status: 500 })
    }

    if (to.length === 0) {
      console.error("[API] Missing CONTACT_TO")
      return NextResponse.json({ ok: false, message: "Email service not configured." }, { status: 500 })
    }

    console.log("[API] Environment check passed, sending emails...")

    const baseUrl = getBaseUrl(req)
    const logoUrl = `${baseUrl}/images/email-logo.png`

    // Send team notification email
    try {
      const teamEmail = await resend.emails.send({
        from,
        to,
        subject: `Website Contact – ${name}`,
        reply_to: email,
        text: `New contact submission:

Name: ${name}
Email: ${email}
Phone: ${phone || "-"}
Company: ${company || "-"}
Contact Type: ${contactType || "-"}
Tile Family: ${tileFamily || "-"}
Tile Color: ${tileColor || "-"}

Message:
${message}`,
        html: renderTeamHtml({
          logoUrl,
          name,
          email,
          phone,
          company,
          contactType,
          tileFamily,
          tileColor,
          message,
        }),
      })

      if (teamEmail.error) {
        console.error("[API] Resend team email error:", teamEmail.error)
        return NextResponse.json({ ok: false, message: "Failed to send email." }, { status: 502 })
      }

      console.log("[API] Team email sent successfully:", teamEmail.data?.id)
    } catch (error) {
      console.error("[API] Error sending team email:", error)
      return NextResponse.json({ ok: false, message: "Failed to send email." }, { status: 502 })
    }

    // Send user confirmation email (best effort)
    try {
      const userEmail = await resend.emails.send({
        from,
        to: [email],
        reply_to: to,
        subject: "We received your message – Clay Roofing New York",
        html: renderUserHtml({ logoUrl, name }),
        text: `Thanks, ${name}!

We received your message and will get back to you shortly.
If this is urgent, call us at 212-365-4386.

Clay Roofing New York`,
      })

      if (userEmail.error) {
        console.warn("[API] User confirmation email failed:", userEmail.error)
        // Don't fail the whole request if user email fails
      } else {
        console.log("[API] User confirmation email sent:", userEmail.data?.id)
      }
    } catch (error) {
      console.warn("[API] Error sending user confirmation email:", error)
      // Don't fail the whole request if user email fails
    }

    console.log("[API] Contact form submission completed successfully")

    return NextResponse.json({
      ok: true,
      message: "Thanks—your message was sent.",
    })
  } catch (error) {
    console.error("[API] Unexpected error:", error)
    return NextResponse.json(
      {
        ok: false,
        message: "Something went wrong. Please try again later.",
      },
      { status: 500 },
    )
  }
}

export const dynamic = "force-dynamic"
export const runtime = "nodejs"
