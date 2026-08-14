import { getResume } from "@/data/resume";

export type Profile = {
  resumeUrl: string | null;
};

export async function getProfile(): Promise<Profile> {
  const resume = await getResume();

  return {
    resumeUrl: resume ? "/resume" : null,
  };
}
