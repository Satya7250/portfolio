import { asc, eq } from "drizzle-orm";

import { db } from "@/db";
import { certifications } from "@/db/schema";
import { defaultCertificates } from "@/lib/certificate";

export type CertificationRow =
  typeof certifications.$inferSelect;

export async function getAllCertifications() {
  return await db
    .select()
    .from(certifications)
    .orderBy(asc(certifications.sortOrder));
}

export async function getPublishedCertifications() {
  const items = await db
    .select()
    .from(certifications)
    .where(eq(certifications.isPublished, true))
    .orderBy(asc(certifications.sortOrder));

  return items.length > 0
    ? items
    : defaultCertificates;
}

export async function getCertificationById(
  id: string
) {
  const certification =
    await db.query.certifications.findFirst({
      where: (table, { eq }) => eq(table.id, id),
    });

  if (certification) {
    return certification;
  }

  return (
    defaultCertificates.find(
      (certificate) => certificate.id === id
    ) ?? null
  );
}