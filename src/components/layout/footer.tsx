'use client';

import Link from 'next/link';
import { FaGithub, FaLinkedin, FaXTwitter } from 'react-icons/fa6';
import { Mail } from 'lucide-react';
import { motion } from 'motion/react';
import { ModeToggle } from '../ui/mode-toggle';

const socialLinks = [
  {
    name: 'LinkedIn',
    href: 'https://www.linkedin.com/in/satyaprakash-in/',
    icon: FaLinkedin,
  },
  {
    name: 'GitHub',
    href: 'https://github.com/Satya7250',
    icon: FaGithub,
  },
  {
    name: 'X',
    href: 'https://x.com/satyaprakash_in',
    icon: FaXTwitter,
  },
  {
    name: 'Email',
    href: 'mailto:satyaprakashh.dev@gmail.com',
    icon: Mail,
  },
];

const navigationLinks = [
  { name: 'Home', href: '/' },
  { name: 'About', href: '#about' },
  { name: 'Projects', href: '#projects' },
  { name: 'Contact', href: '#contact' },
];

const resourceLinks = [
  { name: 'Resume', href: '/resume.pdf' },
  { name: 'Blog', href: '/blog' },
  { name: 'Tech Stack', href: '#stack' },
  { name: 'Certificates', href: '#certificates' },
];

const legalLinks = [
  { name: 'Privacy Policy', href: '/privacy' },
  { name: 'Terms', href: '/terms' },
];

export default function Footer() {
  return (
    <footer className="border-border bg-background border-t">
      <div className="mx-auto max-w-7xl px-6 py-16">
        <div className="grid gap-12 md:grid-cols-2 lg:grid-cols-4">
          {/* Social */}
          <div>
            <h3 className="mb-6 text-sm font-semibold tracking-wider uppercase">Connect</h3>

            <div className="flex gap-3">
              {socialLinks.map(({ name, href, icon: Icon }) => {
                const isExternal = href.startsWith('http');
                return (
                  <motion.div
                    key={name}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    transition={{ type: 'spring', stiffness: 400, damping: 17 }}
                  >
                    <Link
                      href={href}
                      target={isExternal ? '_blank' : undefined}
                      rel={isExternal ? 'noopener noreferrer' : undefined}
                      aria-label={name}
                      className="border-border bg-muted text-muted-foreground hover:bg-primary hover:text-primary-foreground flex h-12 w-12 items-center justify-center rounded-xl border transition-colors duration-300"
                    >
                      <Icon className="h-5 w-5" />
                    </Link>
                  </motion.div>
                );
              })}
            </div>
          </div>

          {/* Navigation */}
          <div>
            <h3 className="mb-6 text-sm font-semibold tracking-wider uppercase">Navigation</h3>

            <ul className="space-y-4">
              {navigationLinks.map((item) => (
                <li key={item.name}>
                  <Link
                    href={item.href}
                    className="text-muted-foreground hover:text-foreground transition-colors"
                  >
                    {item.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Resources */}
          <div>
            <h3 className="mb-6 text-sm font-semibold tracking-wider uppercase">Resources</h3>

            <ul className="space-y-4">
              {resourceLinks.map((item) => (
                <li key={item.name}>
                  <Link
                    href={item.href}
                    className="text-muted-foreground hover:text-foreground transition-colors"
                  >
                    {item.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Legal */}
          <div>
            <h3 className="mb-6 text-sm font-semibold tracking-wider uppercase">Legal</h3>

            <ul className="space-y-4">
              {legalLinks.map((item) => (
                <li key={item.name}>
                  <Link
                    href={item.href}
                    className="text-muted-foreground hover:text-foreground transition-colors"
                  >
                    {item.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="border-border my-12 border-t" />

        <div className="flex flex-col items-center justify-between gap-5 md:flex-row">
          <p className="text-muted-foreground text-sm">
            © {new Date().getFullYear()} Satya Prakash.Crafted with Next.js.
          </p>

          <div className="flex items-center gap-3">
            <span className="text-muted-foreground text-sm">Theme:</span>
            <ModeToggle />
          </div>
        </div>
      </div>
    </footer>
  );
}
