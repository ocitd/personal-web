import { NextResponse } from "next/server";
import { getCertificateById } from "@/server/certificates";

export async function GET(req: Request, context: { params: Promise<{ id: string }> }) {
  const { id } = await context.params; // ✅ penting!

  try {
    const cert = await getCertificateById(id);
    if (!cert) {
      return NextResponse.json({ error: "Certificate not found" }, { status: 404 });
    }
    return NextResponse.json(cert);
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: "Failed to fetch certificate" }, { status: 500 });
  }
}