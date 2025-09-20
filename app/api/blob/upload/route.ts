// app/api/blob/upload/route.ts
import { handleUpload } from "@vercel/blob/client"
import { NextResponse, type NextRequest } from "next/server"

export const runtime = "nodejs"
export const dynamic = "force-dynamic"
export const revalidate = 0

// Simple health check: GET /api/blob/upload
export async function GET() {
  const hasToken = Boolean(process.env.BLOB_READ_WRITE_TOKEN)
  return NextResponse.json({ ok: hasToken, hasToken }, { status: hasToken ? 200 : 500 })
}

// Canonical POST that works with current @vercel/blob
export async function POST(request: NextRequest) {
  try {
    if (!process.env.BLOB_READ_WRITE_TOKEN) {
      return NextResponse.json(
        { ok: false, error: "BLOB_READ_WRITE_TOKEN not found in this environment" },
        { status: 500 }
      )
    }

    // The blob client expects a JSON body with filename & contentType
    const body = await request.json().catch(() => null)
    if (!body || !body.filename || !body.contentType) {
      return NextResponse.json(
        { ok: false, error: "Missing body. Expected { filename, contentType }" },
        { status: 400 }
      )
    }

    // Delegate to Blob's helper (generates a client token, etc.)
    const result = await handleUpload({
      body,
      request,
      access: "public",
      onBeforeGenerateToken: async (_pathname, req) => {
        return {
          allowedContentTypes: ["*/*"],
          tokenPayload: { ua: req.headers.get("user-agent") || "" },
        }
      },
      onUploadCompleted: async ({ blob }) => {
        console.log("[blob] completed:", blob.url)
      },
    })

    // result contains the fields the client needs (token/upload-url/etc.)
    return NextResponse.json({ ok: true, ...result }, { status: 200 })
  } catch (err: any) {
    console.error("[blob] token error:", err)
    return NextResponse.json(
      { ok: false, error: String(err?.message || err) },
      { status: 500 }
    )
  }
}
