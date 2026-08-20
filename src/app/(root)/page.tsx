import HeroText from '@/components/home/heroText';
import OrbitFeatures from '@/components/home/orbit';
import ScrollIndicator from '@/components/home/ScrollIndicator';
import AboutMe from '@/components/home/aboutMe';
import SectionHeading from '@/components/common/section-heading';
import TechStackSection from '@/components/home/stack/techStackSection';
import BlogsSection from '@/components/home/blogs/blogs-section';
import ContactSection from '@/components/home/contact/contact';
import { getProfile } from '@/lib/resume';
import { getAboutSection } from "@/lib/about";
import { ProjectsSection } from '@/components/home/projects/projects-section';
import { CertificationsSection } from '@/components/home/certificate/certificate-section';
import { getPublishedCertifications } from '@/data/certificate';
import { getTechStackSection } from "@/lib/tech-stack";
import { getHeading } from '@/lib/section-headings';

export default async function Home() {
  const [
    profile,
    about,
    techStack,
    certificates,
    aboutHeading,
    stackHeading,
    projectHeading,
    blogHeading,
    certificationHeading,
    contactHeading,
  ] = await Promise.all([
    getProfile(),
    getAboutSection(),
    getTechStackSection(),
    getPublishedCertifications(),
    getHeading("about"),
    getHeading("stack"),
    getHeading("projects"),
    getHeading("blogs"),
    getHeading("certifications"),
    getHeading("contact"),
  ]);

  return (
    <main className="bg-background relative overflow-hidden">
      {/* Hero */}
      <section
        id="home"
        className="relative mx-auto flex min-h-screen max-w-7xl items-center px-6 py-24"
      >
        <div className="grid w-full items-center gap-20 lg:grid-cols-2">
          {/* Left */}
          <HeroText profile={profile} />

          {/* Right */}
          <div className="flex justify-center lg:justify-end">
            <OrbitFeatures />
          </div>
        </div>

        {/* Scroll Indicator */}
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2">
          <ScrollIndicator />
        </div>
      </section>

      {/* About */}
      <section
        id="about"
        aria-labelledby="about-heading"
        className="px-6 py-24"
      >
        <div className="mx-auto max-w-7xl">
          <SectionHeading
            eyebrow={aboutHeading.eyebrow}
            title={aboutHeading.title}
            description={aboutHeading.description}
            headingId="about-heading"
          />

          {about && (
            <AboutMe
              imageSrc={about.imageSrc}
              imageAlt={about.imageAlt}
              intro={about.intro}
              name={about.name}
              role={about.role}
              bio={about.bio}
            />
          )}
        </div>
      </section>

      {/* Tech */}
      <section id="stack" aria-labelledby="tech-heading" className="py-24">
        <div className="mx-auto max-w-7xl">
          <SectionHeading
            eyebrow={stackHeading.eyebrow}
            title={stackHeading.title}
            description={stackHeading.description}
            headingId="tech-heading"
          />
          <TechStackSection categories={techStack} />
        </div>
      </section>

      {/* Projects */}
      <section id="projects" aria-labelledby="projects-heading" className="py-24">
        <div className="mx-auto max-w-7xl px-6">
          <SectionHeading
            eyebrow={projectHeading.eyebrow}
            title={projectHeading.title}
            description={projectHeading.description}
            headingId="projects-heading"
          />
          <ProjectsSection />
        </div>
      </section>

      {/* Blogs */}
      <section id="blogs" aria-labelledby="blogs-heading" className="py-24">
        <div className="mx-auto max-w-7xl px-6">
          <SectionHeading
            eyebrow={blogHeading.eyebrow}
            title={blogHeading.title}
            description={blogHeading.description}
            headingId="blogs-heading"
          />
          <BlogsSection />
        </div>
      </section>

      {/* Certifications */}
      <section id="certifications" aria-labelledby="certifications-heading" className="py-24">
        <div className="mx-auto max-w-7xl px-6">
          <SectionHeading
            eyebrow={certificationHeading.eyebrow}
            title={certificationHeading.title}
            description={certificationHeading.description}
            headingId="certifications-heading"
          />

          <CertificationsSection certificates={certificates} />
        </div>
      </section>

      {/* Contact */}
      <section id="contact" aria-labelledby="contact-heading" className="py-24">
        <div className="mx-auto max-w-7xl px-6">
          <SectionHeading
            eyebrow={contactHeading.eyebrow}
            title={contactHeading.title}
            description={contactHeading.description}
            headingId="contact-heading"
          />

          <ContactSection />
        </div>
      </section>
    </main>
  );
}
