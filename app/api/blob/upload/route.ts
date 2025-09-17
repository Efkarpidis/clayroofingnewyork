// app/api/blob/upload/route.ts
import { NextResponse } from "next/server";
import { handleUpload, type HandleUploadBody } from "@vercel/blob/client";

// Vercel will auto-inject BLOB_READ_WRITE_TOKEN when you connect a Blob Store
// Locally, run: `vercel env pull` to get it into .env.local (BLOB_READ_WRITE_TOKEN)

export const runtime = "nodejs";

export async function POST(request: Request): Promise<NextResponse> {
  const body = (await request.json()) as HandleUploadBody;

  try {
    const json = await handleUpload({
      body,
      request,
      // 1) Create a short-lived token the browser will use to upload directly to Vercel Blob
      onBeforeGenerateToken: async (pathname, clientPayload) => {
        return {
          // Don’t restrict content types (accept anything); add a random suffix for uniqueness
          addRandomSuffix: true,
          // If you want to restrict types later, add:
          // allowedContentTypes: ['image/*','application/pdf', ...]
          // callbackUrl is auto-computed on Vercel; for local dev see VERCEL_BLOB_CALLBACK_URL notes below
          tokenPayload: JSON.stringify({
            // You can pass info through (e.g., a leadId) via clientPayload and read it in onUploadCompleted
            // clientPayload,
          }),
        };
      },

      // 2) Called by Vercel after the file lands in Blob storage
      onUploadCompleted: async ({ blob, tokenPayload }) => {
        // Persist blob.url if you want (DB, email, CRM, etc.)
        // Example: console log for now
        console.log("Blob uploaded:", { url: blob.url, size: blob.size, path: blob.pathname, tokenPayload });
      },
    });

    return NextResponse.json(json);
  } catch (err: any) {
    return NextResponse.json({ error: err.message }, { status: 400 });
  }
}
