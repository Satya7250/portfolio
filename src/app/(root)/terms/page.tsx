"use client";

import { motion } from "framer-motion";
import { Card, CardContent } from "@/components/ui/card";

const sections = [
  {
    title: "Website Purpose",
    content:
      "This website serves as a personal portfolio showcasing projects, skills, achievements, and professional experience. The content is provided for informational and professional networking purposes.",
  },
  {
    title: "Intellectual Property",
    content:
      "Unless otherwise stated, all content on this website, including project descriptions, designs, graphics, text, and source code samples, is the property of the website owner and is protected by applicable intellectual property laws.",
  },
  {
    title: "External Links",
    content:
      "This website may contain links to third-party platforms such as GitHub, LinkedIn, and other external resources. I am not responsible for the content, availability, or privacy practices of those websites.",
  },
  {
    title: "No Warranty",
    content:
      "All information on this website is provided on an 'as is' basis without warranties of any kind. While every effort is made to keep information accurate and up to date, no guarantees are made regarding completeness or reliability.",
  },
  {
    title: "Limitation of Liability",
    content:
      "The website owner shall not be held liable for any direct, indirect, incidental, or consequential damages arising from the use of this website or reliance on its content.",
  },
  {
    title: "Changes to These Terms",
    content:
      "These Terms and Conditions may be updated periodically. Continued use of the website after changes are published constitutes acceptance of the updated terms.",
  },
];

const container = {
  hidden: {},
  show: {
    transition: {
      staggerChildren: 0.1,
    },
  },
};

const item = {
  hidden: {
    opacity: 0,
    y: 20,
  },
  show: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.4,
    },
  },
};

export default function TermsPage() {
  return (
    <main className="relative min-h-screen px-4 py-20 md:px-6">
      <div className="absolute inset-0 -z-10 bg-linear-to-b from-primary/5 via-transparent to-transparent" />

      <div className="mx-auto max-w-4xl">
        <motion.div
          variants={container}
          initial="hidden"
          animate="show"
        >
          <motion.div
            variants={item}
            className="mb-12 text-center"
          >
            <h1 className="text-4xl font-bold tracking-tight md:text-5xl">
              Terms & Conditions
            </h1>

            <p className="mt-4 text-muted-foreground">
              Please read these terms carefully before using this website.
            </p>

            <p className="mt-2 text-sm text-muted-foreground">
              Last Updated: August 2026
            </p>
          </motion.div>

          <motion.div variants={item}>
            <Card className="border-border/50 bg-background/70 backdrop-blur-sm">
              <CardContent className="space-y-10 p-6 md:p-10">
                {sections.map((section) => (
                  <section key={section.title}>
                    <h2 className="mb-3 text-xl font-semibold">
                      {section.title}
                    </h2>

                    <p className="leading-7 text-muted-foreground">
                      {section.content}
                    </p>
                  </section>
                ))}
              </CardContent>
            </Card>
          </motion.div>
        </motion.div>
      </div>
    </main>
  );
}