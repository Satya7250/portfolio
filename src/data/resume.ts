import { db } from "@/db";

export async function getResume() {
  return await db.query.resume.findFirst();
}