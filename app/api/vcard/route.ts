// app/api/vcard/route.ts
import { NextResponse } from "next/server";
import fs from "fs";
import path from "path";

export async function GET() {
  try {
    // Path to the logo image
    const imagePath = path.join(process.cwd(), "public/images/CRNY_Logo_1.png");
    const imageBuffer = fs.readFileSync(imagePath);
    const base64Image = imageBuffer.toString("base64");

    // vCard 3.0 string
    const vCard = `BEGIN:VCARD
VERSION:3.0
N:Clay Roofing New York;;;
FN:Clay Roofing New York
ORG:Clay Roofing New York
TEL;TYPE=WORK,VOICE:+12123654386
EMAIL:chris@clayroofingnewyork.com
URL:https://clayroofingnewyork.com
ADR;TYPE=WORK:;;33-15 127th Pl;Corona;NY;11368;USA
PHOTO;ENCODING=b;TYPE=PNG:${base64Image}
END:VCARD`;

    // Serve as downloadable .vcf
    return new NextResponse(vCard, {
      headers: {
        "Content-Type": "text/vcard",
        "Content-Disposition": "attachment; filename=clay_roofing_new_york.vcf",
      },
    });
  } catch (err) {
    console.error("[API] vCard error:", err);
    return NextResponse.json({ ok: false, message: "Failed to generate vCard." }, { status: 500 });
  }
}

export const dynamic = "force-dynamic";
export const runtime = "nodejs";
