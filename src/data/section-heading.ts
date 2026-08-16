import { db } from "@/db";
import { sectionHeadings } from "@/db/schema";
import { eq } from "drizzle-orm";

export async function getSectionHeading(section: string) {
  return await db.query.sectionHeadings.findFirst({
    where: eq(sectionHeadings.section, section),
  });
}