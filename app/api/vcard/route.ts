// app/api/vcard/route.ts
import { NextResponse } from "next/server";

export async function GET() {
  const vcard = `
BEGIN:VCARD
VERSION:3.0
N:Clay Roofs New York;;;
FN:Clay Roofs New York
ORG:Clay Roofs New York
TEL;TYPE=WORK:212-365-4386
TEL;TYPE=Automated SMS:212-365-4386
EMAIL;TYPE=Client Relations Manager:chris@clayroofingnewyork.com
URL;TYPE=Website:https://clayroofingnewyork.com
ADR;TYPE=Address:;;33-15 127th Pl;Corona;NY;11368;USA
END:VCARD
  `.trim();

  const headers = {
    "Content-Disposition": 'attachment; filename="clay_roofing_new_york.vcf"',
    "Content-Type": "text/vcard",
  };

  return new NextResponse(vcard, { headers });
}
