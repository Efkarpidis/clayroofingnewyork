import { NextResponse } from "next/server";
import { Resend } from "resend";

export const runtime = "nodejs";

const resend = new Resend(process.env.RESEND_API_KEY);

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
    const to = (process.env.CONTACT_TO || "")
      .split(",")
      .map(s => s.trim())
      .filter(Boolean);

    const from = process.env.CONTACT_FROM!; // verified sender

    // 1) Send to your team
    const teamSubject = `New contact form submission — ${name}`;
    const html = `
      <h2>New inquiry</h2>
      <p><b>Name:</b> ${name}</p>
      <p><b>Email:</b> ${email}</p>
      <p><b>Phone:</b> ${phone ?? ""}</p>
      <p><b>Message:</b><br/>${(message ?? "").replace(/\n/g, "<br/>")}</p>
    `;

    const sendTeam = await resend.emails.send({
      to,
      from,
      subject: teamSubject,
      html,
      reply_to: email, // so you can reply directly
    });
    if (sendTeam.error) {
      console.error("Resend (team) error:", sendTeam.error);
      return NextResponse.json({ ok: false, error: String(sendTeam.error) }, { status: 502 });
    }

    // 2) Send confirmation to submitter
    const confirmSubject = "We received your message — Clay Roofing New York";
    const confirmHtml = `
      <p>Hi ${name},</p>
      <p>Thanks for reaching out to Clay Roofing New York. We received your message and will get back to you shortly.</p>
      <hr/>
      <p><b>Your submission</b></p>
      <p><b>Name:</b> ${name}<br/>
         <b>Email:</b> ${email}<br/>
         <b>Phone:</b> ${phone ?? ""}<br/>
         <b>Message:</b><br/>${(message ?? "").replace(/\n/g, "<br/>")}</p>
      <p style="margin-top:16px;">— Clay Roofing New York</p>
    `;

    const sendUser = await resend.emails.send({
      to: [email],
      from,
      subject: confirmSubject,
      html: confirmHtml,
    });
    if (sendUser.error) {
      console.error("Resend (user receipt) error:", sendUser.error);
      // don’t fail the whole request if the receipt fails
    }
