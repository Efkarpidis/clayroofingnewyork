// app/api/blob/upload/route.ts
import { handleUpload } from "@vercel/blob/client"

export const runtime = "nodejs"          // robust env resolution
export const dynamic = "force-dynamic"   // never cache
export const revalidate = 0

// Health check: GET /api/blob/upload -> { ok: true, hasToken: true }
export async function GET() {
  const hasToken = Boolean(process.env.BLOB_READ_WRITE_TOKEN)
  return new Response(JSON.stringify({ ok: hasToken, hasToken }), {
    status: hasToken ? 200 : 500,
    headers: { "content-type": "application/json" },
  })
}

// Wrap handleUpload so we always return JSON even on errors
const base = handleUpload({
  access: "public",
  onBeforeGenerateToken: async (_pathname, req) => {
    if (!process.env.BLOB_READ_WRITE_TOKEN) {
      throw new Error("Missing BLOB_READ_WRITE_TOKEN in this environment.")
    }
    return {
      allowedContentTypes: ["*/*"],
      tokenPayload: { ua: req.headers.get("user-agent") || "" },
    }
  },
  onUploadCompleted: async ({ blob, tokenPayload }) => {
    console.log("[blob] completed:", blob.url, tokenPayload?.ua || "")
  },
})

export async function POST(request: Request) {
  try {
    if (!process.env.BLOB_READ_WRITE_TOKEN) {
      return new Response(
        JSON.stringify({ ok: false, error: "BLOB_READ_WRITE_TOKEN not found" }),
        { status: 500, headers: { "content-type": "application/json" } }
      )
    }
    // Delegate to the official handler
    return await base(request)
  } catch (err: any) {
    console.error("[blob] token error:", err)
    return new Response(
      JSON.stringify({ ok: false, error: String(err?.message || err) }),
      { status: 500, headers: { "content-type": "application/json" } }
    )
  }
}
