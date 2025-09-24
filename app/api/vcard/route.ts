// app/api/vcard/route.ts
import { NextResponse } from "next/server";

export async function GET() {
  const vcard = `
BEGIN:VCARD
VERSION:3.0
N:Clay Roofing New York;;;
FN:Clay Roofing New York
ORG:Clay Roofing New York
TEL;TYPE=WORK:212-365-4386
TEL;TYPE=Automated SMS:22395
EMAIL;TYPE=Client Relations Manager:chris@clayroofingnewyork.com
URL;TYPE=Website:https://clayroofingnewyork.com
URL;TYPE=Gallery:https://www.clayroofingnewyork.com/gallery
ADR;TYPE=Address:;;33-15 127th Pl;Corona;NY;11368;USA
NOTE:Operating Hours: Mon-Fri 9:00 AM - 5:00 PM EDT
CATEGORIES:Roofing,Construction
END:VCARD
  `.trim();

  const headers = {
    "Content-Disposition": 'attachment; filename="clay_roofing_new_york.vcf"',
    "Content-Type": "text/vcard",
  };

  return new NextResponse(vcard, { headers });
}
