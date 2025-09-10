// app/api/contact/route.ts
import { Resend } from "resend";

export const runtime = "nodejs"; // attachments require Node runtime

type FieldErrors = Record<string, string[]>;

function badRequest(message: string, fieldErrors: FieldErrors = {}) {
  return new Response(JSON.stringify({ ok: false, message, fieldErrors }), {
    status: 400,
    headers: { "content-type": "application/json" },
  });
}

export async function POST(req: Request) {
  try {
    const form = await req.formData();

    // read fields
    const name = String(form.get("name") ?? "").trim();
    const email = String(form.get("email") ?? "").trim();
    const phone = String(form.get("phone") ?? "").trim();
    const company = String(form.get("company") ?? "").trim();
    const contactType = String(form.get("contactType") ?? "").trim();
    const tileFamily = String(form.get("tileFamily") ?? "").trim();
    const tileColor = String(form.get("tileColor") ?? "").trim();
    const message = String(form.get("message") ?? "").trim();
    const privacyAccepted = String(form.get("privacyAccepted") ?? "off") === "on";
    const previousProjectReference = String(form.get("previousProjectReference") ?? "").trim();

    // files
    const primaryFile = form.get("file") as File | null;
    const photos = (form.getAll("photos") as File[]).filter(Boolean);

    // simple validation (mirrors your zod on client)
    const fieldErrors: FieldErrors = {};
    if (!name) fieldErrors.name = ["Please enter your full name."];
    if (!email || !/^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(email))
      fieldErrors.email = ["Please enter a valid email."];
    if (message.length < 10) fieldErrors.message = ["Your message must be at least 10 characters long."];
    if (!privacyAccepted) fieldErrors.privacyAccepted = ["You must accept the Privacy Policy to continue."];

    if (Object.keys(fieldErrors).length) {
      return badRequest("Please complete the required fields highlighted below.", fieldErrors);
    }

    const now = new Date();
    const timestamp = now.toLocaleString("en-US", { timeZone: "America/New_York" });

    const lead = {
      name,
      email,
      phone,
      company,
      contactType,
      tileFamily,
      tileColor,
      message,
      previousProjectReference,
      submittedAt: timestamp,
      submittedAtISO: now.toISOString(),
    };

    // Build attachments for Resend (internal email only)
    async function toAttachment(f: File) {
      const ab = await f.arrayBuffer();
      return {
        filename: f.name || "attachment",
        content: Buffer.from(ab),
      };
    }
    const attachments = [
      ...(primaryFile ? [await toAttachment(primaryFile)] : []),
      ...(photos?.length ? await Promise.all(photos.map(toAttachment)) : []),
    ];

    // Email bodies
    const internalSubject = `New Contact — ${lead.name}${lead.company ? ` (${lead.company})` : ""}`;
    const internalHtml = `
      <h2>New Contact Submission</h2>
      <table cellpadding="6" style="border-collapse:collapse">
        ${Object.entries(lead)
          .filter(([k]) => k !== "submittedAtISO")
          .map(
            ([k, v]) => `
            <tr>
              <td style="font-weight:600;text-transform:capitalize;border-bottom:1px solid #eee">${k.replace(/([A-Z])/g," $1")}</td>
              <td style="border-bottom:1px solid #eee">${String(v || "—")}</td>
            </tr>`
          )
          .join("")}
      </table>
      <p style="margin-top:12px">Files attached: ${attachments.length}</p>
    `.trim();

    const internalText =
      `New Contact Submission\n\n` +
      Object.entries(lead)
        .filter(([k]) => k !== "submittedAtISO")
        .map(([k, v]) => `${k}: ${v || "—"}`)
        .join("\n") +
      `\n\nFiles attached: ${attachments.length}`;

    const customerSubject = `We received your message — Clay Roofs New York`;
    const customerHtml = `
      <div style="font:14px/1.6 -apple-system,Segoe UI,Roboto,Arial,sans-serif;color:#111">
        <h2 style="margin:0 0 10px">Thanks, ${lead.name} — we've received your message.</h2>
        <p>Here’s a copy of what you sent on <strong>${lead.submittedAt}</strong>:</p>
        <table cellpadding="6" style="border-collapse:collapse;background:#fafafa;border:1px solid #eee">
          ${Object.entries(lead)
            .filter(([k]) => !["submittedAtISO"].includes(k))
            .map(
              ([k, v]) => `
              <tr>
                <td style="font-weight:600;text-transform:capitalize;border-bottom:1px solid #eee">${k.replace(/([A-Z])/g," $1")}</td>
                <td style="border-bottom:1px solid #eee">${String(v || "—")}</td>
              </tr>`
            )
            .join("")}
        </table>
        <p style="margin-top:16px">
          Our typical response time is <strong>within 1 business day</strong>.  
          If this is urgent, you can also reach us by phone or WhatsApp from the contact page.
        </p>
        <hr style="border:none;border-top:1px solid #eee;margin:16px 0" />
        <p style="margin:0">
          Clay Roofs New York<br/>
          <a href="https://clayroofingnewyork.com" target="_blank">clayroofingnewyork.com</a>
        </p>
      </div>
    `.trim();

    const customerText =
      `Thanks, ${lead.name} — we've received your message on ${lead.submittedAt}.\n\n` +
      `Copy of your submission:\n` +
      Object.entries(lead)
        .filter(([k]) => k !== "submittedAtISO")
        .map(([k, v]) => `${k}: ${v || "—"}`)
        .join("\n") +
      `\n\nClay Roofs New York — clayroofingnewyork.com`;

    // send emails
    const resend = new Resend(process.env.RESEND_API_KEY);

    const toTeam = (process.env.CONTACT_TO || "")
      .split(",")
      .map((s) => s.trim())
      .filter(Boolean);

    if (!process.env.CONTACT_FROM || !toTeam.length) {
      return badRequest(
        "Server email settings missing. Please set CONTACT_FROM and CONTACT_TO environment variables."
      );
    }

    // 1) internal notification (with attachments)
    await resend.emails.send({
      from: process.env.CONTACT_FROM,
      to: toTeam,
      reply_to: email || undefined,
      subject: internalSubject,
      html: internalHtml,
      text: internalText,
      attachments: attachments.length ? attachments : undefined,
    });

    // 2) customer confirmation (no attachments)
    await resend.emails.send({
      from: process.env.CONTACT_FROM,
      to: email,
      subject: customerSubject,
      html: customerHtml,
      text: customerText,
    });

    return new Response(
      JSON.stringify({ ok: true, message: "Thanks—your message was sent." }),
      { status: 200, headers: { "content-type": "application/json" } }
    );
  } catch (err) {
    console.error("contact route error", err);
    return new Response(
      JSON.stringify({
        ok: false,
        message: "Something went wrong. Please try again later.",
      }),
      { status: 500, headers: { "content-type": "application/json" } }
    );
  }
}
