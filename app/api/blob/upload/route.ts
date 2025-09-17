// app/api/blob/upload/route.ts
import { NextResponse } from "next/server"
import { put } from "@vercel/blob"

export const runtime = "edge"

export async function POST(req: Request) {
  try {
    const form = await req.formData()
    const file = form.get("file") as File | null
    if (!file) {
      return NextResponse.json({ ok: false, message: "No file provided" }, { status: 400 })
    }

    const filename = (form.get("filename") as string) || file.name || "upload"
    const contentType = file.type || "application/octet-stream"

    const result = await put(filename, file, {
      access: "public",
      contentType,
      addRandomSuffix: true,
    })

    // result includes: url, pathname, size, uploadedAt
    return NextResponse.json({
      ok: true,
      file: {
        url: result.url,
        pathname: result.pathname,
        size: result.size,
        contentType,
        filename,
      },
    })
  } catch (err: any) {
    console.error("[blob/upload] error", err)
    return NextResponse.json({ ok: false, message: "Upload failed" }, { status: 500 })
  }
}
