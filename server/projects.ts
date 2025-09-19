"use server"

import { db } from "@/db/drizzle"
import { data } from "@/db/schema"
import { eq } from "drizzle-orm"

// =====================
// CREATE DATA
// =====================
export async function createData(payload: {
  img: string
  title: string
  category: string[]
}) {
  try {
    await db.insert(data).values({
      id: crypto.randomUUID(),
      ...payload,
      createdAt: new Date(),
      updatedAt: new Date(),
    })
    return { success: true }
  } catch (error) {
    console.error(error)
    return { error: "gagal membuat data baru" }
  }
}

// =====================
// READ ALL DATA
// =====================
export async function getData() {
  try {
    const all = await db.select().from(data)
    return all
  } catch (error) {
    console.error(error)
    throw error
  }
}

// =====================
// UPDATE DATA
// =====================
export async function updateData(
  id: string,
  payload: { img: string; title: string; category: string[] }
) {
  try {
    await db
      .update(data)
      .set({
        ...payload,
        updatedAt: new Date(),
      })
      .where(eq(data.id, id))
    return { success: true }
  } catch (error) {
    console.error(error)
    return { error: "gagal update data" }
  }
}

// =====================
// DELETE DATA
// =====================
export async function deleteData(id: string) {
  try {
    await db.delete(data).where(eq(data.id, id))
    return { success: true }
  } catch (error) {
    console.error(error)
    return { error: "gagal hapus data" }
  }
}