// app/api/blob/upload/route.ts
import { handleUpload, type HandleUploadBody } from "@vercel/blob/client";
import { NextResponse, type NextRequest } from "next/server";

export const runtime = "edge"; // Recommended for Vercel Blob (faster, global)

// Simple health check: GET /api/blob/upload
export async function GET() {
  const hasToken = Boolean(process.env.BLOB_READ_WRITE_TOKEN);
  return NextResponse.json({ ok: hasToken, hasToken }, { status: hasToken ? 200 : 500 });
}

// Canonical POST that works with @vercel/blob/client upload()
export async function POST(request: NextRequest) {
  try {
    if (!process.env.BLOB_READ_WRITE_TOKEN) {
      return NextResponse.json(
        { ok: false, error: "BLOB_READ_WRITE_TOKEN not found in this environment" },
        { status: 500 }
      );
    }
    // Parse body as expected by handleUpload (no custom filename/contentType check needed)
    const body = (await request.json()) as HandleUploadBody;
    // Capture user-agent from request headers (via closure)
    const ua = request.headers.get("user-agent") || "";
    // Delegate to Blob's helper (generates a client token, etc.)
    const result = await handleUpload({
      body,
      request,
      onBeforeGenerateToken: async (pathname, clientPayload) => {
        // Optional: Add auth here (e.g., check session/cookies from request)
        // if (!authorized) throw new Error('Unauthorized');
        return {
          allowedContentTypes: ["*/*"], // No limitations: allow any file type
          addRandomSuffix: true, // Prevents overwrites
          tokenPayload: JSON.stringify({ ua, clientPayload }), // Include UA and any client data
        };
      },
      onUploadCompleted: async ({ blob }) => {
        console.log("[blob] completed:", blob.url);
        // Optional: Save to DB, send email, etc.
      },
    });
    // result contains the fields the client needs (token/upload-url/etc.)
    return NextResponse.json({ ok: true, ...result }, { status: 200 });
  } catch (err: any) {
    console.error("[blob] token error:", err);
    return NextResponse.json(
      { ok: false, error: String(err?.message || err) },
      { status: 500 }
    );
  }
}
