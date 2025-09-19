"use client";

import { UploadButton } from "@uploadthing/react";
import type { OurFileRouter } from "@/app/api/uploadthing/core";

export default function ImageUpload({ onUploadComplete }: { onUploadComplete: (url: string) => void }) {
  return (
    <UploadButton<OurFileRouter, "imageUploader">
      endpoint="imageUploader"
      onClientUploadComplete={(res) => {
        if (res && res[0]?.url) {
          onUploadComplete(res[0].url); // kirim URL balik ke parent
        }
      }}
      onUploadError={(err) => {
        alert(`Upload error: ${err.message}`);
      }}
    />
  );
}
