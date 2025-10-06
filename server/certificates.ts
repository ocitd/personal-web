"use server";

import { db } from "@/db/drizzle";
import { certificates } from "@/db/schema";
import { eq } from "drizzle-orm";
import { utapi } from "./uploadthing"; // opsional kalau pakai uploadthing

// =====================
// CREATE CERTIFICATE
// =====================
export async function createCertificate(payload: {
  title: string;
  certificate: string; // link image/file
  provider: string;
}) {
  try {
    await db.insert(certificates).values({
      id: crypto.randomUUID(),
      ...payload,
      createdAt: new Date(),
      updatedAt: new Date(),
    });
    return { success: true };
  } catch (error) {
    console.error(error);
    return { error: "Gagal membuat sertifikat baru" };
  }
}

// =====================
// READ ALL CERTIFICATES
// =====================
export async function getAllCertificates() {
  try {
    const all = await db.select().from(certificates).orderBy(certificates.createdAt);
    return all;
  } catch (error) {
    console.error(error);
    throw error;
  }
}

// =====================
// READ ONE (by ID)
// =====================
export async function getCertificateById(id: string) {
  try {
    const [cert] = await db.select().from(certificates).where(eq(certificates.id, id));
    return cert ?? null;
  } catch (error) {
    console.error(error);
    throw error;
  }
}

// =====================
// UPDATE CERTIFICATE
// =====================
export async function updateCertificate(
  id: string,
  payload: { title: string; certificate: string; provider: string }
) {
  try {
    await db
      .update(certificates)
      .set({
        ...payload,
        updatedAt: new Date(),
      })
      .where(eq(certificates.id, id));
    return { success: true };
  } catch (error) {
    console.error(error);
    return { error: "Gagal update sertifikat" };
  }
}

// =====================
// DELETE CERTIFICATE
// =====================
export async function deleteCertificate(id: string, img: string) {
  try {
    await db.delete(certificates).where(eq(certificates.id, id));

    // Kalau kamu pakai UploadThing untuk simpan sertifikat (misalnya gambar/pdf)
    // maka hapus juga file-nya di server
    if (img) {
      await utapi.deleteFiles([img]);
    }

    return { success: true };
  } catch (error) {
    console.error(error);
    return { error: "Gagal menghapus sertifikat" };
  }
}
