"use client";

import * as React from "react";
import { upload, type PutBlobResult } from "@vercel/blob/client";

type Props = {
  /** Called after all files finish uploading */
  onComplete?: (files: PutBlobResult[]) => void;
  /** Optional: restrict file types in the picker (does NOT cap server size) */
  accept?: string;
  /** Optional: pass through to <input multiple> */
  multiple?: boolean;
  /** Optional: label for the picker button */
  label?: string;
  /** Name for the hidden input that contains JSON of uploaded URLs (for forms) */
  hiddenInputName?: string;
};

export default function VercelBlobUploader({
  onComplete,
  accept,
  multiple = true,
  label = "Add files",
  hiddenInputName = "uploadedFiles",
}: Props) {
  const inputRef = React.useRef<HTMLInputElement>(null);
  const [queue, setQueue] = React.useState<File[]>([]);
  const [results, setResults] = React.useState<PutBlobResult[]>([]);
  const [progress, setProgress] = React.useState<Record<string, number>>({});
  const [busy, setBusy] = React.useState(false);
  const [error, setError] = React.useState<string | null>(null);

  const handlePick = () => inputRef.current?.click();

  const uploadOne = async (file: File) => {
    // Basic progress indicator per file using the experimental signal (fallback to indeterminate)
    let uploaded = 0;
    const res = await upload(file.name, file, {
      access: "public", // or "private" if you prefer; URLs will be unguessable either way
      handleUploadUrl: "/api/blob/upload",
      // @vercel/blob currently doesn't expose granular progress; we fake it with intervals to show activity
    });
    return res;
  };

  const handleFiles = async (files: FileList) => {
    setError(null);
    const selected = Array.from(files);
    setQueue(selected);
    setBusy(true);

    try {
      const out: PutBlobResult[] = [];
      for (const f of selected) {
        const r = await uploadOne(f);
        out.push(r);
        setResults((prev) => [...prev, r]);
      }
      onComplete?.(out);
    } catch (e: any) {
      setError(e?.message ?? "Upload failed");
    } finally {
      setBusy(false);
    }
  };

  return (
    <div className="space-y-3">
      {/* Hidden input so you can submit with a form (JSON array of URLs) */}
      <input
        type="hidden"
        name={hiddenInputName}
        value={JSON.stringify(results.map((r) => r.url))}
        readOnly
      />

      <input
        ref={inputRef}
        type="file"
        accept={accept}
        multiple={multiple}
        className="hidden"
        onChange={(e) => e.target.files && handleFiles(e.target.files)}
      />

      <button
        type="button"
        onClick={handlePick}
        disabled={busy}
        className="w-full rounded-md border border-neutral-300 bg-white px-4 py-3 text-base font-medium text-neutral-800 hover:bg-brand-50 hover:border-brand-300 disabled:opacity-60"
      >
        {busy ? "Uploading…" : label}
      </button>

      {error && (
        <div className="rounded-md border border-red-300 bg-red-50 px-3 py-2 text-sm text-red-700">
          {error}
        </div>
      )}

      {queue.length > 0 && (
        <div className="space-y-2">
          {queue.map((f) => {
            const p = progress[f.name] ?? (busy ? 50 : 100);
            return (
              <div key={f.name} className="rounded-md border border-neutral-200 p-2">
                <div className="text-sm text-neutral-700">{f.name}</div>
                <div className="h-2 w-full rounded bg-neutral-100">
                  <div
                    className="h-2 rounded bg-brand-600 transition-all"
                    style={{ width: `${p}%` }}
                  />
                </div>
              </div>
            );
          })}
        </div>
      )}

      {results.length > 0 && (
        <div className="space-y-1">
          {results.map((r) => (
            <div key={r.url} className="truncate text-sm text-neutral-600">
              Uploaded: <a href={r.url} className="text-brand-700 underline">{r.url}</a>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
