export type Profile = {
  resumeUrl: string;
};

export async function getProfile(): Promise<Profile> {
  return {
    resumeUrl: '/resume/resume-s.pdf',
  };
}
