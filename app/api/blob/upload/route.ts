// app/api/blob/upload/route.ts
import { handleUpload } from "@vercel/blob/client"

export const runtime = "edge"

// This route does NOT receive the file body.
// It just authorizes the client to upload directly to Vercel Blob.
export const POST = handleUpload({
  access: "public", // files are public; change to "private" if you want signed access later

  // Optional: validate/annotate before issuing token
  onBeforeGenerateToken: async (_pathname, req) => {
    // You can restrict types here if you want, e.g. ["image/*", "application/pdf"]
    return {
      allowedContentTypes: ["*/*"],
      tokenPayload: {
        ua: req.headers.get("user-agent") || "",
      },
    }
  },

  // Optional: runs after blob is stored
  onUploadCompleted: async ({ blob, tokenPayload }) => {
    console.log("[blob] upload completed:", blob, tokenPayload)
  },
})
