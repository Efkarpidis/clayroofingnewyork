// app/api/blob/upload/route.ts
import { handleUpload } from "@vercel/blob/client"

export const runtime = "edge"
export const dynamic = "force-dynamic" // avoid any caching surprises

// Quick health check: visit /api/blob/upload in the browser (GET)
// If this returns { ok: true }, the token env var is visible in this deployment.
export async function GET() {
  const hasToken = !!process.env.BLOB_READ_WRITE_TOKEN
  const body = JSON.stringify({ ok: hasToken, hasToken })
  return new Response(body, {
    status: hasToken ? 200 : 500,
    headers: { "content-type": "application/json" },
  })
}

// This POST does NOT receive file bodies. It only mints a client token so the browser
// can upload directly to Vercel Blob (no request-size limits).
export const POST = handleUpload({
  access: "public",
  onBeforeGenerateToken: async (_pathname, req) => {
    if (!process.env.BLOB_READ_WRITE_TOKEN) {
      // Surface a clear error in logs and to the client
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
