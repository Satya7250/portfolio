import HeroText from '@/components/home/heroText';
import OrbitFeatures from '@/components/home/orbit';
import ScrollIndicator from '@/components/home/ScrollIndicator';
import AboutMe from '@/components/home/aboutMe';
import SectionHeading from '@/components/common/section-heading';
import { getProfile } from '@/lib/profile';
import TechStackSection from '@/components/home/stack/techStackSection';
import { ProjectsSection } from '@/components/home/projects/projects-section';
import BlogsSection from '@/components/home/blogs/blogs-section';
import { CertificationsSection } from '@/components/home/certificate/certificate-section';
import { certificates } from '@/lib/certificate';
import ContactSection from '@/components/home/contact/contact';

export default async function Home() {
  const profile = await getProfile();

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
      <section id="about" aria-labelledby="about-heading" className="px-6 py-24">
        <div className="mx-auto max-w-7xl">
          <SectionHeading
            eyebrow="Get To Know Me"
            title="About Me"
            description="A passionate developer building modern, scalable, and user-focused digital experiences."
            headingId="about-heading"
          />

          <AboutMe
            imageSrc="/images/profile.png"
            imageAlt="Portrait of Satya Prakash"
            intro="Building modern software with clean architecture and exceptional user experiences."
            name="Satya Prakash"
            role="Full Stack Developer"
            bio="I'm a passionate Full Stack Developer specializing in Next.js, React, Node.js, Spring Boot, AI-powered applications, and scalable backend systems. I enjoy transforming complex ideas into fast, intuitive, and maintainable digital products."
          />
        </div>
      </section>

      {/* Tech */}
      <section id="stack" aria-labelledby="tech-heading" className="py-24">
        <div className="mx-auto max-w-7xl">
          <SectionHeading
            eyebrow="Technologies I Use"
            title="My Tech Stack"
            description="Explore the tools and technologies I leverage to build modern web applications."
            headingId="tech-heading"
          />
          <TechStackSection />
        </div>
      </section>

      {/* Projects */}
      <section id="projects" aria-labelledby="projects-heading" className="py-24">
        <div className="mx-auto max-w-7xl px-6">
          <SectionHeading
            eyebrow="FEATURED WORK"
            title="Featured Projects"
            description="A collection of projects that showcase my skills in building scalable, responsive, and user-focused applications."
            headingId="projects-heading"
          />
          <ProjectsSection />
        </div>
      </section>

      {/* Blogs */}
      <section id="blogs" aria-labelledby="blogs-heading" className="py-24">
        <div className="mx-auto max-w-7xl px-6">
          <SectionHeading
            eyebrow="WRITING"
            title="Latest Articles"
            description="Insights, tutorials, and development notes covering web development, JavaScript, React, and modern software engineering."
            headingId="blogs-heading"
          />
          <BlogsSection />
        </div>
      </section>

      {/* Certifications */}
      <section id="certifications" aria-labelledby="certifications-heading" className="py-24">
        <div className="mx-auto max-w-7xl px-6">
          <SectionHeading
            eyebrow="CREDENTIALS"
            title="Certifications & Achievements"
            description="Certifications and achievements that showcase my technical expertise and continuous learning."
            headingId="certifications-heading"
          />

          <CertificationsSection certificates={certificates} />
        </div>
      </section>

      {/* Contact */}
      <section id="contact" aria-labelledby="contact-heading" className="py-24">
        <div className="mx-auto max-w-7xl px-6">
          <SectionHeading
            eyebrow="LET'S CONNECT"
            title="Get In Touch"
            description="Have a project in mind, an internship opportunity, or just want to connect? I'd love to hear from you."
            headingId="contact-heading"
          />

          <ContactSection />
        </div>
      </section>
    </main>
  );
}
