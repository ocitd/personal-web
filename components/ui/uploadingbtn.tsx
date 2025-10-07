"use client";

import { useState } from "react";
import { UploadButton } from "@uploadthing/react";
import type { OurFileRouter } from "@/app/api/uploadthing/core";
import { X } from "lucide-react";

type Props = {
  onUploadComplete: (url: string) => void;
  mode?: "image" | "pdf" | "auto";
};

export default function FileUpload({ onUploadComplete, mode = "auto" }: Props) {
  const [fileUrl, setFileUrl] = useState<string | null>(null);

  // Tentukan endpoint berdasarkan mode
  const endpoint =
    mode === "image"
      ? "imageUploader"
      : mode === "pdf"
      ? "pdfUploader"
      : "fileUploader";

  return (
    <div className="space-y-3">
      {/* Upload button */}
      <UploadButton<OurFileRouter, typeof endpoint>
        endpoint={endpoint as keyof OurFileRouter}
        onClientUploadComplete={(res) => {
          if (res && res[0]?.url) {
            const url = res[0].url;
            setFileUrl(url);
            onUploadComplete(url);
          }
        }}
        onUploadError={(err) => {
          alert(`Upload error: ${err.message}`);
        }}
      />

      {/* Preview area */}
      {fileUrl && (
        <div className="relative inline-block mt-2">
          {/* Tombol hapus kecil */}
          <button
            type="button"
            onClick={() => setFileUrl(null)}
            className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full p-0.5 hover:bg-red-600"
          >
            <X className="w-3 h-3" />
          </button>

          {/* Image Preview */}
          {fileUrl.match(/\.(jpg|jpeg|png|webp|gif)$/i) ? (
            <img
              src={fileUrl}
              alt="preview"
              className="w-24 h-24 object-cover rounded-md border"
            />
          ) : fileUrl.endsWith(".pdf") ? (
            <iframe
              src={fileUrl}
              title="PDF preview"
              className="w-24 h-24 border rounded-md"
            />
          ) : (
            <p className="text-sm text-neutral-500">Preview not available</p>
          )}
        </div>
      )}
    </div>
  );
}