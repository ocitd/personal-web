// app/api/projects/route.ts
import { NextResponse } from "next/server";
import { getData } from "@/server/projects";

export async function GET() {
  const projects = await getData();
  return NextResponse.json(projects);
}