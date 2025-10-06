// app/api/certificates/route.ts

import { NextResponse } from "next/server";
import { createCertificate, getAllCertificates } from "@/server/certificates";

export async function GET() {
  const data = await getAllCertificates();
  return NextResponse.json(data);
}

export async function POST(req: Request) {
  const body = await req.json();
  const newCert = await createCertificate(body);
  return NextResponse.json(newCert);
}
