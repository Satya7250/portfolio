import { db } from "@/db";

export async function getResume() {
  try {
    return await db.query.resume.findFirst();
  } catch (error) {
    console.error("Database error:", error);
    return null;
  }
}