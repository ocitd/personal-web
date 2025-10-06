// app/api/certificates/[id]/route.ts

import { deleteCertificate, getCertificateById, updateCertificate } from "@/server/certificates";
import { NextResponse } from "next/server";

export async function GET(_: Request, { params }: { params: { id: string } }) {
  const cert = await getCertificateById(params.id);
  if (!cert) return NextResponse.json({ error: "Not found" }, { status: 404 });
  return NextResponse.json(cert);
}

export async function PUT(req: Request, { params }: { params: { id: string } }) {
  const data = await req.json();
  const updated = await updateCertificate(params.id, data);
  if (!updated) return NextResponse.json({ error: "Not found" }, { status: 404 });
  return NextResponse.json(updated);
}

export async function DELETE(_: Request, { params }: { params: { id: string } }) {
  const ok = await deleteCertificate(params.id);
  return NextResponse.json({ success: ok });
}
