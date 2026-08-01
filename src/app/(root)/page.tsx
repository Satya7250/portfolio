'use client';

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';

export default function Home() {
  return (
    <main className="bg-background flex min-h-screen items-center justify-center p-6">
      <Card className="max-w-md">
        <CardHeader>
          <CardTitle>Satya Prakash</CardTitle>
          <CardDescription>B.Tech Student & Aspiring Full-Stack Developer</CardDescription>
        </CardHeader>

        <CardContent>
          <p>
            Hi, my name is <strong>Satya Prakash</strong>. I am from <strong>Nalanda, Bihar</strong>
            , and I am currently pursuing my <strong>B.Tech</strong> at{' '}
            <strong>Katihar Engineering College</strong>. I enjoy building modern web applications
            using Next.js, React, TypeScript, and Tailwind CSS while continuously learning new
            technologies.
          </p>
        </CardContent>
      </Card>
    </main>
  );
}
