import { createUploadthing, type FileRouter } from "uploadthing/next";
import { UploadThingError } from "uploadthing/server";

const f = createUploadthing();

const auth = async (req: Request) => ({ id: "fakeId" }); // ganti sesuai auth kamu nanti

export const ourFileRouter = {
  // =====================
  // IMAGE UPLOADER
  // =====================
  imageUploader: f({
    image: {
      maxFileSize: "8MB",
      maxFileCount: 1,
    },
  })
    .middleware(async ({ req }) => {
      const user = await auth(req);
      if (!user) throw new UploadThingError("Unauthorized");
      return { userId: user.id };
    })
    .onUploadComplete(async ({ metadata, file }) => {
      console.log("✅ Image uploaded by:", metadata.userId);
      console.log("🖼️ File URL:", file.url);
      return { uploadedBy: metadata.userId, url: file.url };
    }),

  // =====================
  // PDF UPLOADER
  // =====================
  pdfUploader: f({
    "application/pdf": {
      maxFileSize: "16MB",
      maxFileCount: 1,
    },
  })
    .middleware(async ({ req }) => {
      const user = await auth(req);
      if (!user) throw new UploadThingError("Unauthorized");
      return { userId: user.id };
    })
    .onUploadComplete(async ({ metadata, file }) => {
      console.log("✅ PDF uploaded by:", metadata.userId);
      console.log("📄 File URL:", file.url);
      return { uploadedBy: metadata.userId, url: file.url };
    }),

  // =====================
  // UNIVERSAL (Image or PDF)
  // =====================
  fileUploader: f({
    image: { maxFileSize: "8MB", maxFileCount: 1 },
    "application/pdf": { maxFileSize: "16MB", maxFileCount: 1 },
  })
    .middleware(async ({ req }) => {
      const user = await auth(req);
      if (!user) throw new UploadThingError("Unauthorized");
      return { userId: user.id };
    })
    .onUploadComplete(async ({ metadata, file }) => {
      console.log("✅ File uploaded by:", metadata.userId);
      console.log("🔗 File URL:", file.url);
      return { uploadedBy: metadata.userId, url: file.url };
    }),
} satisfies FileRouter;

export type OurFileRouter = typeof ourFileRouter;