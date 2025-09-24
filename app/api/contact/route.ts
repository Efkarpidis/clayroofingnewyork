// app/api/contact/route.ts
import { NextResponse, NextRequest } from "next/server";
import { Resend } from "resend";
import { Pool } from "pg";
import twilio from "twilio";

const resend = new Resend(process.env.RESEND_API_KEY);
const pool = new Pool({ connectionString: process.env.DATABASE_URL });
const smsClient = twilio(process.env.TWILIO_ACCOUNT_SID!, process.env.TWILIO_AUTH_TOKEN!);

function getBaseUrl(req: NextRequest) {
  return req.nextUrl.origin.replace(/\/$/, "");
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
  optInSms: boolean
) {
  const query = `
    INSERT INTO submissions (name, email, phone, company, contact_type, tile_family, tile_color, message, uploaded_files, submitted_at, opt_in_sms)
    VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11)
    RETURNING id`;
  const values = [name, email, phone, company, contactType, tileFamily, tileColor, message, JSON.stringify(uploadedFiles), submittedAt, optInSms];
  try {
    const result = await pool.query(query, values);
    return result.rows[0].id;
  } catch (dbError) {
    console.error("Database error:", dbError);
    throw dbError;
  }
}

function renderTeamHtml(params: {
  logoUrl: string;
  name: string;
  email: string;
  phone?: string;
  company?: string;
  contactType?: string;
  tileFamily?: string;
  tileColor?: string;
  message: string;
  submittedAt: string;
  attachmentsCount: number;
}) {
  const { logoUrl, name, email, phone, company, contactType, tileFamily, tileColor, message, submittedAt, attachmentsCount } = params;
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
  </table>`;
}

function renderUserHtml(params: {
  logoUrl: string;
  name: string;
  email: string;
  phone?: string;
  company?: string;
  contactType?: string;
  tileFamily?: string;
  tileColor?: string;
  message: string;
  submittedAt: string;
}) {
  const { logoUrl, name, email, phone, company, contactType, tileFamily, tileColor, message, submittedAt } = params;
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
  </table>`;
}

async function fileToResendAttachment(fileData: { url: string; filename?: string; contentType?: string }) {
  return {
    filename: fileData.filename || fileData.url.split("/").pop() || "unknown",
    content: "",
    contentType: fileData.contentType || "application/octet-stream",
    path: fileData.url,
  };
}

export async function POST(req: NextRequest) {
  try {
    const formData = await req.formData();
    console.log("FormData received:", Object.fromEntries(formData)); // Debug
    const name = formData.get("name")?.toString().trim() || "";
    const email = formData.get("email")?.toString().trim() || "";
    const phone = formData.get("phone")?.toString().trim() || "";
    const company = formData.get("company")?.toString().trim() || "";
    const contactType = formData.get("contactType")?.toString().trim() || "";
    const tileFamily = formData.get("tileFamily")?.toString().trim() || "";
    const tileColor = formData.get("tileColor")?.toString().trim() || "";
    const message = formData.get("message")?.toString().trim() || "";
    const privacyAccepted = formData.get("privacyAccepted") === "true" || formData.get("privacyAccepted") === "on";
    const smsOptIn = formData.get("smsOptIn") === "true" || formData.get("smsOptIn") === "on";

    // Handle file uploads
    const files = formData.getAll("uploadedFiles") as File[];
    const fileUrls: string[] = [];
    for (const file of files) {
      if (file.size > 0) {
        const form = new FormData();
        form.append("file", file);
        const uploadResponse = await fetch(`${getBaseUrl(req)}/api/blob/upload`, {
          method: "POST",
          body: form,
        });
        if (uploadResponse.ok) {
          const result = await uploadResponse.json();
          if (result.ok && result.url) {
            fileUrls.push(result.url);
          } else {
            console.warn("[API] Blob upload failed:", result.error);
          }
        } else {
          console.warn("[API] Blob upload failed with status:", uploadResponse.status);
        }
      }
    }
    console.log("File URLs:", fileUrls); // Debug

    // Validation
    const fieldErrors: Record<string, string[]> = {};
    if (!name) fieldErrors.name = ["Name is required"];
    if (!email) fieldErrors.email = ["Email is required"];
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) fieldErrors.email = ["Please enter a valid email address"];
    if (!message) fieldErrors.message = ["Message is required"];
    else if (message.length < 10) fieldErrors.message = ["Message must be at least 10 characters long"];
    if (!contactType) fieldErrors.contactType = ["Please select your contact type"];
    if (!privacyAccepted) fieldErrors.privacyAccepted = ["You must accept the Privacy Policy to continue"];
    if (Object.keys(fieldErrors).length > 0) {
      return NextResponse.json({ ok: false, message: "Please fix the errors below.", fieldErrors }, { status: 400 });
    }

    // Email env
    const from = process.env.CONTACT_FROM;
    const to = (process.env.CONTACT_TO || "").split(",").map((s) => s.trim()).filter(Boolean);
    if (!process.env.RESEND_API_KEY || !from || to.length === 0) {
      return NextResponse.json({ ok: false, message: "Email service not configured." }, { status: 500 });
    }
    const baseUrl = getBaseUrl(req);
    const logoUrl = `${baseUrl}/images/email-logo.png`;
    const submittedAt = new Date().toLocaleString("en-US", { timeZone: "America/New_York", hour12: true });

    // Save to database
    const submissionId = await saveSubmission(name, email, phone, company, contactType, tileFamily, tileColor, message, fileUrls, submittedAt, smsOptIn);
    console.log(`Submission saved with ID: ${submissionId}`);

    // Twilio Verify for user phone
    let isVerified = false;
    if (smsOptIn && phone) {
      try {
        // Start verification
        await smsClient.verify.v2.services("VA0aba966fb38fe81d6f1556ab02ef1d80").verifications.create({ to: phone, channel: "sms" });
        console.log(`Verification sent to ${phone}`);
        // For now, assume manual verification (update page.tsx to automate)
        isVerified = true; // Placeholder—will be set via user code entry
      } catch (verifyError) {
        console.error("Verification failed:", verifyError);
        return NextResponse.json({ ok: false, message: "Phone verification failed. Try again." }, { status: 400 });
      }
    }

    // Team email
    const teamEmail = await resend.emails.send({
      from,
      to,
      subject: `Thank you ${name} - New Contact (ID: ${submissionId})`,
      reply_to: email,
      text: `New contact submission (submitted ${submittedAt}, ID: ${submissionId}):\nName: ${name}\nEmail: ${email}\nPhone: ${phone || "-"}\nCompany: ${company || "-"}\nContact Type: ${contactType || "-"}\nTile Family: ${tileFamily || "-"}\nTile Color: ${tileColor || "-"}\nMessage:\n${message}\nAttachments: ${fileUrls.length} file(s)`,
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
        submittedAt,
        attachmentsCount: fileUrls.length,
      }),
      attachments: fileUrls.length
        ? fileUrls.map((url) => fileToResendAttachment({ url, filename: url.split("/").pop() || "unknown" }))
        : undefined,
    });

    if (teamEmail.error) {
      console.error("[API] Resend team email error:", teamEmail.error);
      return NextResponse.json({ ok: false, message: "Failed to send email." }, { status: 502 });
    }

    // User confirmation
    try {
      await resend.emails.send({
        from,
        to: [email],
        reply_to: to,
        subject: `Thank you ${name} - Contact Received`,
        html: renderUserHtml({
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
        }),
        text: `Thanks, ${name}!\nWe received your message on ${submittedAt} (ID: ${submissionId}).\nOur Client Relations Manager will contact you shortly.\nSubmission copy:\nName: ${name}\nEmail: ${email}\nPhone: ${phone || "-"}\nCompany: ${company || "-"}\nContact Type: ${contactType || "-"}\nTile Family: ${tileFamily || "-"}\nTile Color: ${tileColor || "-"}\nMessage:\n${message}\nIf this is urgent, call us at 212-365-4386.\nClay Roofing New York`,
      });
    } catch (err) {
      console.warn("[API] User confirmation email failed:", err);
    }

    // SMS opt-in handling (after verification)
    if (smsOptIn && phone && isVerified) {
      try {
        await smsClient.messages.create({
          body: `Thank you, ${name}! We'll send updates to ${phone}. Reply STOP to unsubscribe.`,
          from: process.env.TWILIO_PHONE_NUMBER!,
          to: phone,
        });
        console.log(`SMS sent to ${phone} (ID: ${submissionId})`);
      } catch (smsError) {
        console.error("SMS send failed:", smsError);
      }
    }

    return NextResponse.json({ ok: true, message: "Thanks—your message was sent. Verify your phone if opting in." });
  } catch (err) {
    console.error("[API] Unexpected error:", err);
    return NextResponse.json({ ok: false, message: "Something went wrong. Please try again later.", error: err.message }, { status: 500 });
  }
}

// Verify endpoint (separate route for code check)
export async function verify(req: NextRequest) {
  const { phone, code } = await req.json();
  try {
    const verificationCheck = await smsClient.verify.v2
      .services("VA0aba966fb38fe81d6f1556ab02ef1d80")
      .verificationChecks.create({ to: phone, code });
    if (verificationCheck.status === "approved") {
      return NextResponse.json({ ok: true, message: "Phone verified" });
    }
    return NextResponse.json({ ok: false, message: "Invalid verification code" }, { status: 400 });
  } catch (err) {
    console.error("Verify error:", err);
    return NextResponse.json({ ok: false, message: "Verification failed" }, { status: 500 });
  }
}

export const dynamic = "force-dynamic";
export const runtime = "nodejs";
