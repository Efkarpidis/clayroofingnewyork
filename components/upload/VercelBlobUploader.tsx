// components/upload/VercelBlobUploader.tsx
"use client"

import * as React from "react"
import { Upload, ImageIcon, FileText, X } from "lucide-react"

type UploadedItem = {
  url: string
  pathname: string
  size?: number
  contentType?: string
  filename?: string
}

function formatMB(bytes = 0) {
  return Math.round((bytes / (1024 * 1024)) * 10) / 10
}

export default function VercelBlobUploader(props: {
  hiddenInputName: string
  label?: string
  accept?: string
  multiple?: boolean
  onComplete?: (files: UploadedItem[]) => void
}) {
  const { hiddenInputName, label = "Add files", accept, multiple = true, onComplete } = props
  const fileInputRef = React.useRef<HTMLInputElement>(null)
  const [items, setItems] = React.useState<UploadedItem[]>([])
  const [uploading, setUploading] = React.useState(false)

  const totalBytes = items.reduce((s, f) => s + (f.size || 0), 0)

  const openPicker = () => fileInputRef.current?.click()

  const handleFiles = async (files: FileList | null) => {
    if (!files || files.length === 0) return
    setUploading(true)
    try {
      const selected = Array.from(files)

      const uploaded: UploadedItem[] = []
      for (const file of selected) {
        const fd = new FormData()
        fd.append("file", file)
        fd.append("filename", file.name)

        const res = await fetch("/api/blob/upload", { method: "POST", body: fd })
        const data = await res.json()
        if (!res.ok || !data?.ok) throw new Error(data?.message || "Upload failed")

        uploaded.push({
          url: data.file.url,
          pathname: data.file.pathname,
          size: data.file.size,
          contentType: data.file.contentType,
          filename: data.file.filename,
        })
      }

      const next = [...items, ...uploaded]
      setItems(next)
      onComplete?.(next)
    } catch (e) {
      console.error("[Uploader] error:", e)
      alert("One of the uploads failed. Please try again.")
    } finally {
      setUploading(false)
      if (fileInputRef.current) fileInputRef.current.value = ""
    }
  }

  const removeAt = (i: number) => {
    const next = items.filter((_, idx) => idx !== i)
    setItems(next)
    onComplete?.(next)
  }

  const isImage = (ct?: string) => (ct ? ct.startsWith("image/") : false)

  return (
    <div className="space-y-3">
      {/* hidden field with JSON that the form posts */}
      <input
        type="hidden"
        name={hiddenInputName}
        value={JSON.stringify(items.map(({ url, pathname, size, contentType, filename }) => ({ url, pathname, size, contentType, filename })))}
      />

      {/* file input (hidden) */}
      <input
        ref={fileInputRef}
        type="file"
        className="sr-only"
        accept={accept}
        multiple={multiple}
        onChange={(e) => handleFiles(e.target.files)}
      />

      {/* button */}
      <button
        type="button"
        onClick={openPicker}
        disabled={uploading}
        className="flex w-full items-center justify-center gap-3 rounded-lg border-2 border-dashed border-neutral-300 bg-neutral-50 p-4 text-base font-medium text-neutral-700 transition-colors hover:border-orange-400 hover:bg-orange-50 disabled:opacity-50"
      >
        <Upload className="h-5 w-5" />
        {uploading ? "Uploading…" : label}
      </button>

      {/* list */}
      {items.length > 0 && (
        <div className="space-y-3">
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
            {items.map((f, i) => (
              <div key={f.url} className="relative rounded-lg border border-neutral-200 overflow-hidden bg-white">
                <div className="aspect-video bg-neutral-100 flex items-center justify-center">
                  {isImage(f.contentType) ? (
                    // lightweight preview via the uploaded URL
                    <img src={f.url} alt={f.filename || "file"} className="h-full w-full object-cover" />
                  ) : (
                    <div className="flex items-center justify-center text-neutral-400">
                      <FileText className="h-8 w-8" />
                    </div>
                  )}
                </div>
                <div className="p-2">
                  <div className="text-xs font-medium text-neutral-800 truncate" title={f.filename || f.pathname}>
                    {f.filename || f.pathname.split("/").pop()}
                  </div>
                  <div className="text-[11px] text-neutral-500">{formatMB(f.size)} MB</div>
                </div>
                <button
                  type="button"
                  onClick={() => removeAt(i)}
                  className="absolute top-1 right-1 inline-flex h-6 w-6 items-center justify-center rounded-full bg-red-500 text-white hover:bg-red-600"
                  aria-label="Remove file"
                >
                  <X className="h-3.5 w-3.5" />
                </button>
              </div>
            ))}
          </div>

          {/* totals chip */}
          <div className="text-xs text-neutral-600">
            <span className="inline-flex items-center rounded-full border border-neutral-300 px-2 py-0.5">
              {items.length} file{items.length === 1 ? "" : "s"} • {formatMB(totalBytes)} MB
            </span>
          </div>
        </div>
      )}
    </div>
  )
}
