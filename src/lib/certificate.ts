import type { InferSelectModel } from "drizzle-orm";
import { certifications } from "@/db/schema";

export type CertificationRow = InferSelectModel<
  typeof certifications
>;

const now = new Date();

export const defaultCertificates: readonly CertificationRow[] = [
  {
    id: "default-1",
    title: "Full Stack Web Development Cohort 2026",
    issuer: "ChaiCode",
    issueDate: "Sep 2025",
    certificateImage:
      "/certificates/chaicode.png",
    verifyUrl:
      "https://courses.chaicode.com/learn/certificate/13238512-250927",
    isPublished: true,
    sortOrder: 0,
    createdAt: now,
    updatedAt: now,
  },
  {
    id: "default-2",
    title: "Introduction to Large Language Models",
    issuer: "IBM SkillsBuild",
    issueDate: "Jan 2026",
    certificateImage:
      "/certificates/ibm.png",
    verifyUrl:
      "https://skills.yourlearning.ibm.com/",
    isPublished: true,
    sortOrder: 1,
    createdAt: now,
    updatedAt: now,
  },
] as const;