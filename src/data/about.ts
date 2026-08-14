import { db } from "@/db";

export async function getAbout() {
  return await db.query.about.findFirst();
}