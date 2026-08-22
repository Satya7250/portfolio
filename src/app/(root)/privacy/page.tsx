import type { Metadata } from 'next';
import { Card } from '@/components/ui/card';

export const metadata: Metadata = {
  title: 'Privacy Policy | Your Name',
  description: 'Privacy Policy for the personal portfolio website of Your Name.',
  alternates: {
    canonical: '/privacy-policy',
  },
  robots: {
    index: true,
    follow: true,
  },
  openGraph: {
    title: 'Privacy Policy | Your Name',
    description: 'Learn how this portfolio website handles visitor information and privacy.',
    type: 'website',
  },
};

const sections = [
  {
    title: 'Overview',
    content:
      'This website is a personal portfolio created to showcase projects, skills, and professional experience.',
  },
  {
    title: 'Information Collection',
    content:
      'This website does not directly collect personal information from visitors. No registration, user accounts, or contact forms are provided.',
  },
  {
    title: 'Email Communication',
    content:
      'Visitors may contact me using the email address displayed on this website. Information shared through email is used solely to respond to inquiries.',
  },
  {
    title: 'Third-Party Services',
    content:
      'Hosting providers and infrastructure services may collect technical information such as IP addresses, browser details, and server logs required for website operation and security.',
  },
  {
    title: 'Policy Updates',
    content:
      'This Privacy Policy may be updated periodically. Any changes will be reflected on this page with an updated revision date.',
  },
];

export default function PrivacyPolicyPage() {
  return (
    <main className="relative min-h-screen px-4 py-20 md:px-6">
      <div className="from-primary/5 absolute inset-0 -z-10 bg-linear-to-b via-transparent to-transparent" />

      <div className="animate-in fade-in mx-auto max-w-4xl duration-700">
        <header className="mb-12 text-center">
          <h1 className="text-4xl font-bold tracking-tight md:text-5xl">Privacy Policy</h1>

          <p className="text-muted-foreground mt-4">
            Information about how this website handles visitor data.
          </p>

          <p className="text-muted-foreground mt-2 text-sm">Last Updated: August 2026</p>
        </header>

        <Card className="border-border/50 bg-background/70 backdrop-blur-sm">
          <div className="space-y-10 p-6 md:p-10">
            {sections.map((section) => (
              <section key={section.title}>
                <h2 className="mb-3 text-xl font-semibold">{section.title}</h2>

                <p className="text-muted-foreground leading-7">{section.content}</p>
              </section>
            ))}
          </div>
        </Card>
      </div>
    </main>
  );
}
