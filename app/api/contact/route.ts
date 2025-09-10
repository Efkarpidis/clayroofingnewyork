import { NextResponse } from "next/server";
import { Resend } from "resend";

export const runtime = "nodejs";

const resend = new Resend(process.env.RESEND_API_KEY ?? "");

export async function POST(req: Request) {
  try {
    const { name, email, phone, message } = await req.json();

    if (!name || !email || !message) {
      return NextResponse.json(
        { ok: false, error: "Missing required fields" },
        { status: 400 }
      );
    }

    // Team recipients from env (comma-separated -> array)
    const to = (process.env.CONTACT_TO ?? "")
      .split(",")
      .map((s) => s.trim())
      .filter(Boolean);

    const from = process.env.CONTACT_FROM ?? "";

    // ---- 1) Send to your internal team
    const teamSubject = `New contact form submission — ${name}`;
    const teamHtml = `
      <h2>New inquiry</h2>
      <p><b>Name:</b> ${name}</p>
      <p><b>Email:</b> ${email}</p>
      <p><b>Phone:</b> ${phone ?? ""}</p>
      <p><b>Message:</b><br/>${(message ?? "").replace(/\n/g, "<br/>")}</p>
    `;

    const teamRes = await resend.emails.send({
      to,
      from,
      subject: teamSubject,
      html: teamHtml,
      reply_to: email, // replies go to submitter
    });
    if (teamRes.error) {
      console.error("Resend (team) error:", teamRes.error);
      return NextResponse.json(
        { ok: false, error: String(teamRes.error) },
        { status: 502 }
      );
    }

    // ---- 2) Confirmation to the submitter (separate email)
    const userSubject = "We received your message — Clay Roofing New York";
    const userHtml = `
      <p>Hi ${name},</p>
      <p>Thanks for reaching out to Clay Roofing New York. We received your message and will get back to you shortly.</p>
      <hr/>
      <p><b>Your submission</b></p>
      <p>
        <b>Name:</b> ${name}<br/>
        <b>Email:</b> ${email}<br/>
        <b>Phone:</b> ${phone ?? ""}<br/>
        <b>Message:</b><br/>${(message ?? "").replace(/\n/g, "<br/>")}
      </p>
      <p style="margin-top:16px;">— Clay Roofing New York</p>
    `;

    const userRes = await resend.emails.send({
      to: [email],
      from,
      subject: userSubject,
      html: userHtml,
    });
    if (userRes.error) {
      // Do not fail the whole request if the receipt fails; just log it.
      console.error("Resend (user receipt) error:", userRes.error);
    }

    return NextResponse.json({ ok: true });
  } catch (e: any) {
    console.error("API error:", e);
    return NextResponse.json(
      { ok: false, error: e?.message ?? "Unknown error" },
      { status: 500 }
    );
  }
}
