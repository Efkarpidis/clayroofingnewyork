// components/upload/VercelBlobUploader.tsx
"use client"

import * as React from "react"
import { Upload, FileText, X, RotateCw, CheckCircle2, AlertTriangle } from "lucide-react"

type UploadedItem = {
  url: string
  pathname: string
  size?: number
  contentType?: string
  filename?: string
}

type ItemState = {
  id: string
  file: File
  localUrl?: string
  progress: number // 0..100
  status: "pending" | "uploading" | "done" | "error"
  error?: string
  uploaded?: UploadedItem
}

function formatMB(bytes = 0) {
  return Math.round((bytes / (1024 * 1024)) * 10) / 10
}

function isImageType(t?: string) {
  return t ? t.startsWith("image/") : false
}

export default function VercelBlobUploader(props: {
  hiddenInputName: string
  label?: string
  accept?: string
  multiple?: boolean
  concurrency?: number
  onComplete?: (files: UploadedItem[]) => void
}) {
  const {
    hiddenInputName,
    label = "Add files",
    accept,
    multiple = true,
    concurrency = 3,
    onComplete,
  } = props

  const inputRef = React.useRef<HTMLInputElement>(null)
  const [items, setItems] = React.useState<ItemState[]>([])
  const uploadingCount = items.filter((i) => i.status === "uploading").length
  const done = items.filter((i) => i.status === "done").map((i) => i.uploaded!) // guaranteed set in "done"
  const totalBytes = done.reduce((s, f) => s + (f.size || 0), 0)

  // keep hidden input in sync (only successfully uploaded files)
  const hiddenValue = JSON.stringify(
    done.map(({ url, pathname, size, contentType, filename }) => ({
      url,
      pathname,
      size,
      contentType,
      filename,
    }))
  )

  const openPicker = () => inputRef.current?.click()

  const addFiles = (fl: FileList | null) => {
    if (!fl || fl.length === 0) return
    const base = Array.from(fl).map((file, idx) => ({
      id: `${Date.now()}-${idx}-${Math.random().toString(36).slice(2, 8)}`,
      file,
      localUrl: isImageType(file.type) ? URL.createObjectURL(file) : undefined,
      progress: 0,
      status: "pending" as const,
    }))
    setItems((prev) => [...prev, ...base])
  }

  // Start uploads whenever we have capacity
  React.useEffect(() => {
    const active = items.filter((i) => i.status === "uploading").length
    const room = Math.max(0, concurrency - active)
    if (room === 0) return

    const next = items
      .filter((i) => i.status === "pending")
      .slice(0, room)

    next.forEach((it) => startUpload(it.id))
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [items, concurrency])

  const startUpload = (id: string) => {
    setItems((prev) =>
      prev.map((i) => (i.id === id ? { ...i, status: "uploading", progress: 0, error: undefined } : i))
    )

    const item = items.find((i) => i.id === id)
    if (!item) return

    // Use XHR to get upload progress
    const xhr = new XMLHttpRequest()
    const fd = new FormData()
    fd.append("file", item.file)
    fd.append("filename", item.file.name)

    xhr.open("POST", "/api/blob/upload")

    xhr.upload.onprogress = (ev) => {
      if (!ev.lengthComputable) return
      const pct = Math.max(0, Math.min(100, Math.round((ev.loaded / ev.total) * 100)))
      setItems((prev) => prev.map((i) => (i.id === id ? { ...i, progress: pct } : i)))
    }

    xhr.onerror = () => {
      setItems((prev) =>
        prev.map((i) =>
          i.id === id
            ? { ...i, status: "error", error: "Network error. Please check your connection and try again." }
            : i
        )
      )
    }

    xhr.onload = () => {
      try {
        const ok = xhr.status >= 200 && xhr.status < 300
        const data = JSON.parse(xhr.responseText || "{}")
        if (ok && data?.ok && data.file?.url) {
          const uploaded: UploadedItem = {
            url: data.file.url,
            pathname: data.file.pathname,
            size: data.file.size,
            contentType: data.file.contentType,
            filename: data.file.filename || item.file.name,
          }
          setItems((prev) =>
            prev.map((i) => (i.id === id ? { ...i, status: "done", progress: 100, uploaded } : i))
          )
          // fire callback with all completed items
          setTimeout(() => onComplete?.(prevDoneAfterUpdate()), 0)
        } else {
          const reason =
            data?.message ||
            xhr.statusText ||
            "Upload failed. Please try again or choose a different file."
          setItems((prev) =>
            prev.map((i) => (i.id === id ? { ...i, status: "error", error: reason } : i))
          )
        }
      } catch (e) {
        setItems((prev) =>
          prev.map((i) =>
            i.id === id ? { ...i, status: "error", error: "Unexpected server response." } : i
          )
        )
      }
    }

    xhr.send(fd)
  }

  // Helper used after success to emit all completed files
  const prevDoneAfterUpdate = () =>
    (items
      .map((i) => (i.status === "done" ? i.uploaded! : null))
      .filter(Boolean) as UploadedItem[])

  const retry = (id: string) => {
    setItems((prev) => prev.map((i) => (i.id === id ? { ...i, status: "pending", progress: 0, error: undefined } : i)))
  }

  const remove = (id: string) => {
    setItems((prev) => prev.filter((i) => i.id !== id))
  }

  return (
    <div className="space-y-3">
      {/* Hidden field */}
      <input type="hidden" name={hiddenInputName} value={hiddenValue} />

      {/* Hidden picker */}
      <input
        ref={inputRef}
        type="file"
        className="sr-only"
        accept={accept}
        multiple={multiple}
        onChange={(e) => {
          addFiles(e.target.files)
          if (inputRef.current) inputRef.current.value = ""
        }}
      />

      {/* Add button */}
      <button
        type="button"
        onClick={openPicker}
        className="flex w-full items-center justify-center gap-3 rounded-lg border-2 border-dashed border-neutral-300 bg-neutral-50 p-4 text-base font-medium text-neutral-700 transition-colors hover:border-orange-400 hover:bg-orange-50"
      >
        <Upload className="h-5 w-5" />
        {uploadingCount > 0 ? `Uploading ${uploadingCount}…` : label}
      </button>

      {/* Grid */}
      {items.length > 0 && (
        <div className="space-y-3">
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
            {items.map((it) => {
              const showImg = it.localUrl && isImageType(it.file.type)
              const name = it.file.name
              const sizeMB = formatMB(it.file.size)

              return (
                <div
                  key={it.id}
                  className="relative rounded-lg border border-neutral-200 overflow-hidden bg-white"
                >
                  <div className="aspect-video bg-neutral-100 flex items-center justify-center">
                    {showImg ? (
                      <img src={it.localUrl!} alt={name} className="h-full w-full object-cover" />
                    ) : (
                      <FileText className="h-8 w-8 text-neutral-400" />
                    )}
                  </div>

                  {/* File name + size */}
                  <div className="p-2">
                    <div className="text-xs font-medium text-neutral-800 truncate" title={name}>
                      {name}
                    </div>
                    <div className="text-[11px] text-neutral-500">{sizeMB} MB</div>
                  </div>

                  {/* Progress / status */}
                  {it.status === "uploading" && (
                    <>
                      <div className="absolute top-2 left-2 inline-flex items-center gap-1 rounded-full bg-white/90 px-2 py-0.5 text-[11px] text-neutral-700 border border-neutral-200">
                        Uploading… {it.progress}%
                      </div>
                      <div className="h-1 bg-neutral-200">
                        <div
                          className="h-1 bg-orange-600 transition-all"
                          style={{ width: `${it.progress}%` }}
                        />
                      </div>
                    </>
                  )}

                  {it.status === "done" && (
                    <div className="absolute top-2 left-2 inline-flex items-center gap-1 rounded-full bg-white/90 px-2 py-0.5 text-[11px] text-green-700 border border-green-200">
                      <CheckCircle2 className="h-3.5 w-3.5" />
                      Uploaded
                    </div>
                  )}

                  {it.status === "error" && (
                    <>
                      <div className="absolute top-2 left-2 inline-flex items-center gap-1 rounded-md bg-white/95 px-2 py-0.5 text-[11px] text-red-700 border border-red-200">
                        <AlertTriangle className="h-3.5 w-3.5" />
                        Failed
                      </div>
                      <div className="px-2 pb-2 text-[11px] text-red-600">{it.error}</div>
                      <div className="p-2 pt-0 flex items-center gap-2">
                        <button
                          type="button"
                          onClick={() => retry(it.id)}
                          className="inline-flex items-center gap-1 rounded-md border border-neutral-300 px-2 py-1 text-[11px] text-neutral-700 hover:bg-neutral-50"
                        >
                          <RotateCw className="h-3.5 w-3.5" />
                          Retry
                        </button>
                      </div>
                    </>
                  )}

                  {/* Remove */}
                  <button
                    type="button"
                    onClick={() => remove(it.id)}
                    className="absolute top-1 right-1 inline-flex h-6 w-6 items-center justify-center rounded-full bg-red-500 text-white hover:bg-red-600"
                    aria-label="Remove file"
                    title="Remove file"
                  >
                    <X className="h-3.5 w-3.5" />
                  </button>
                </div>
              )
            })}
          </div>

          {/* Totals chip (successful files only) */}
          <div className="text-xs text-neutral-600">
            <span className="inline-flex items-center rounded-full border border-neutral-300 px-2 py-0.5">
              {done.length} file{done.length === 1 ? "" : "s"} • {formatMB(totalBytes)} MB
            </span>
          </div>
        </div>
      )}
    </div>
  )
}
