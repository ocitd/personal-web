import { NextResponse } from "next/server";
import { getAllCertificates } from "@/server/certificates";

export async function GET() {
  try {
    const data = await getAllCertificates();
    return NextResponse.json(data);
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: "Failed to load certificates" }, { status: 500 });
  }
}