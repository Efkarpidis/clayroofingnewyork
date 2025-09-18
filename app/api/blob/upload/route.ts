// app/api/blob/upload/route.ts
import { handleUpload } from "@vercel/blob/client"

// Use Node runtime to avoid any edge/env weirdness.
// (Edge works too, but Node is the most forgiving with env resolution.)
export const runtime = "nodejs"
export const dynamic = "force-dynamic" // never cache the token route

// Health check: visit /api/blob/upload in the browser (GET).
export async function GET() {
  const hasToken = Boolean(process.env.BLOB_READ_WRITE_TOKEN)
  return new Response(JSON.stringify({ ok: hasToken, hasToken }), {
    status: hasToken ? 200 : 500,
    headers: { "content-type": "application/json" },
  })
}

// This POST only mints a client token so the browser can upload directly to Vercel Blob.
export const POST = handleUpload({
  access: "public",
  onBeforeGenerateToken: async (_pathname, req) => {
    if (!process.env.BLOB_READ_WRITE_TOKEN) {
      throw new Error("Missing BLOB_READ_WRITE_TOKEN in this environment")
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
