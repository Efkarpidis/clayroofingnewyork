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

    // Normalize recipients from comma-separated env var → string[]
    const toEnv = process.env.CONTACT_TO || "";
    const to = toEnv.split(",").map(s => s.trim()).filter(Boolean);

    const from = process.env.CONTACT_FROM!; // domain is verified on Resend

    const subject = `New contact form submission — ${name}`;
    const html = `
      <h2>New inquiry</h2>
      <p><b>Name:</b> ${name}</p>
      <p><b>Email:</b> ${email}</p>
      <p><b>Phone:</b> ${phone ?? ""}</p>
      <p><b>Message:</b><br/>${(message ?? "").replace(/\n/g, "<br/>")}</p>
    `;

    const { error } = await resend.emails.send({
      to,
      from,
      subject,
      html,
      reply_to: email, // lets you hit "Reply" in your inbox
    });

    if (error) {
      console.error("Resend error:", error);
      return NextResponse.json(
        { ok: false, error: String(error) },
        { status: 502 }
      );
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
