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

    // You can optionally reject certain sizes/types here and return a friendly message.
    // Example:
    // if (file.size > 5 * 1024 * 1024 * 1024) {
    //   return NextResponse.json({ ok: false, message: "File is larger than 5GB limit." }, { status: 413 })
    // }

    const result = await put(filename, file, {
      access: "public",
      contentType,
      addRandomSuffix: true,
    })

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
    // Try to surface a helpful message
    const msg =
      (err?.message as string) ||
      "Upload failed. The file may be too large or the network interrupted."
    return NextResponse.json({ ok: false, message: msg }, { status: 500 })
  }
}
