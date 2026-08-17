import { getAbout } from "@/data/about";

export async function getAboutSection() {
  const about = await getAbout();

  if (!about) return null;

  return {
    // eyebrow: about.eyebrow,
    // title: about.title,
    // description: about.description,
    imageSrc: about.imageSrc,
    imageAlt: about.imageAlt,
    intro: about.intro,
    name: about.name,
    role: about.role,
    bio: about.bio,
  };
}