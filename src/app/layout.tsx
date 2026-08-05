import type { Metadata } from 'next';
import { Geist, Geist_Mono } from 'next/font/google';
import { TooltipProvider } from '@/components/ui/tooltip';
import './globals.css';
import { QueryProvider } from '@/components/providers/query-provider';
import { ThemeProvider } from '@/components/providers/theme-provider';

const geistSans = Geist({
  variable: '--font-geist-sans',
  subsets: ['latin'],
});

const geistMono = Geist_Mono({
  variable: '--font-geist-mono',
  subsets: ['latin'],
});

export const metadata: Metadata = {
  metadataBase: new URL('https://yourdomain.com'),

  title: {
    default: 'Satya Prakash | Full Stack Developer',
    template: '%s | Satya Prakash',
  },

  description:
    'Portfolio of Satya Prakash, a Full Stack Developer specializing in Next.js, React, Node.js, Spring Boot, AI applications, and scalable backend systems.',

  icons: {
    icon: '/icon.svg',
  },

  keywords: [
    'Satya Prakash',
    'Full Stack Developer',
    'Next.js',
    'React',
    'TypeScript',
    'Node.js',
    'Spring Boot',
    'Portfolio',
    'Web Developer',
    'Software Engineer',
  ],

  authors: [{ name: 'Satya Prakash' }],
  creator: 'Satya Prakash',

  robots: {
    index: true,
    follow: true,
  },

  openGraph: {
    title: 'Satya Prakash | Full Stack Developer',
    description: 'Portfolio showcasing projects, experience, and modern web development.',
    url: 'https://yourdomain.com',
    siteName: 'Satya Prakash Portfolio',
    locale: 'en_US',
    type: 'website',
  },

  twitter: {
    card: 'summary_large_image',
    title: 'Satya Prakash | Full Stack Developer',
    description: 'Portfolio showcasing projects, experience, and modern web development.',
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      suppressHydrationWarning
      className={`${geistSans.variable} ${geistMono.variable} h-full scroll-smooth antialiased`}
    >
      <body className="flex min-h-full flex-col font-sans">
        <ThemeProvider attribute="class" defaultTheme="dark" disableTransitionOnChange>
          <QueryProvider>
            <TooltipProvider>{children}</TooltipProvider>
          </QueryProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
