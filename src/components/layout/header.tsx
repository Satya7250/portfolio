'use client';

import { useEffect, useRef, useState } from 'react';
import Link from 'next/link';
import { motion, useAnimationControls } from 'motion/react';
import { Sheet, SheetContent, SheetTitle, SheetTrigger } from '@/components/ui/sheet';
import Logo from '@/components/layout/logo';

const navigationLinks = [
  { name: 'About', href: '#about' },
  { name: 'Stack', href: '#stack' },
  { name: 'Projects', href: '#projects' },
  { name: 'Contact', href: '#contact' },
];

// A different subtle background tint per section, so the bar visually
// echoes wherever the user currently is on the page. Falls back to the
// plain background color before any section has been scrolled into view.
const SECTION_BACKGROUND: Record<string, string> = {
  '': 'bg-background',
  '#about': 'bg-muted',
  '#stack': 'bg-accent',
  '#projects': 'bg-secondary',
  '#contact': 'bg-primary/10',
};

const containerVariants = {
  open: {
    transition: { staggerChildren: 0.06, delayChildren: 0.04 },
  },
  closed: {
    transition: { staggerChildren: 0.03, staggerDirection: -1 },
  },
};

const linkVariants = {
  open: { opacity: 1, x: 0, transition: { duration: 0.25, ease: 'easeOut' as const } },
  closed: { opacity: 0, x: 16, transition: { duration: 0.2, ease: 'easeOut' as const } },
};

export default function Navbar() {
  const [open, setOpen] = useState(false); // desktop reveal-on-click menu
  const [sheetOpen, setSheetOpen] = useState(false); // mobile Sheet panel
  const [hidden, setHidden] = useState(false); // whole bar hidden on scroll-down
  const [activeHash, setActiveHash] = useState('');
  const lastY = useRef(0);
  const controls = useAnimationControls();

  useEffect(() => {
    lastY.current = window.scrollY;

    const onScroll = () => {
      const y = window.scrollY;
      const diff = y - lastY.current;

      if (y < 80) {
        setHidden(false);
        setActiveHash(''); // back at hero — clear active section
      } else if (diff > 4) {
        setHidden(true);
      } else if (diff < -4) {
        setHidden(false);
        setOpen(false);
        setSheetOpen(false);
      }

      lastY.current = y;
    };

    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => {
    controls.start(hidden ? 'hidden' : 'visible');
    if (hidden) {
      setOpen(false); // close the desktop menu once the bar itself is off-screen
      setSheetOpen(false); // close the mobile menu too
    }
  }, [hidden, controls]);

  useEffect(() => {
    const sections = navigationLinks
      .map((l) => document.querySelector(l.href))
      .filter(Boolean) as Element[];

    if (sections.length === 0) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) setActiveHash(`#${entry.target.id}`);
        });
      },
      { rootMargin: '-40% 0px -50% 0px' },
    );

    sections.forEach((s) => observer.observe(s));
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => e.key === 'Escape' && setOpen(false);
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, []);

  const bgClass = SECTION_BACKGROUND[activeHash] ?? 'bg-background';

  return (
    <motion.header
      initial="visible"
      animate={controls}
      variants={{
        // Hiding is quick and sharp; coming back is a touch slower and softer.
        visible: { y: 0, transition: { duration: 0.35, ease: 'easeOut' as const } },
        hidden: { y: '-100%', transition: { duration: 0.15, ease: 'easeIn' as const } },
      }}
      className={`fixed inset-x-0 top-0 z-50 transition-colors duration-500 ${bgClass}`}
    >
      <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4">
        {/* Logo */}
        <Link href="/" aria-label="Home" className="group flex items-center gap-1">
          <Logo size={45} />

          <span className="text-foreground text-lg font-bold tracking-tight">Portfolio</span>
        </Link>

        {/* Right side: desktop reveal-on-click nav */}
        <div className="hidden items-center gap-8 md:flex">
          <motion.nav
            initial="closed"
            animate={open ? 'open' : 'closed'}
            variants={containerVariants}
            className="flex items-center gap-8"
            aria-hidden={!open}
          >
            {navigationLinks.map((item) => {
              const isActive = activeHash === item.href;
              return (
                <motion.div
                  key={item.name}
                  variants={linkVariants}
                  style={{ pointerEvents: open ? 'auto' : 'none' }}
                >
                  <Link
                    href={item.href}
                    onClick={() => setOpen(false)}
                    tabIndex={open ? 0 : -1}
                    className={
                      isActive
                        ? 'text-foreground text-sm font-semibold'
                        : 'text-muted-foreground hover:text-foreground text-sm font-semibold transition-colors'
                    }
                  >
                    {item.name}
                  </Link>
                </motion.div>
              );
            })}
          </motion.nav>

          <button
            onClick={() => setOpen((v) => !v)}
            aria-label={open ? 'Close menu' : 'Open menu'}
            aria-expanded={open}
            className="relative flex h-9 w-9 shrink-0 flex-col items-center justify-center gap-1.5"
          >
            <motion.span
              animate={open ? { rotate: 45, y: 4 } : { rotate: 0, y: 0 }}
              transition={{ duration: 0.25, ease: 'easeOut' as const }}
              className="bg-primary h-0.5 w-6 origin-center rounded-full"
            />
            <motion.span
              animate={open ? { rotate: -45, y: -4 } : { rotate: 0, y: 0 }}
              transition={{ duration: 0.25, ease: 'easeOut' as const }}
              className="bg-primary h-0.5 w-6 origin-center rounded-full"
            />
          </button>
        </div>

        {/* Mobile: shadcn Sheet, triggered by the same two-line icon */}
        <div className="md:hidden">
          <Sheet open={sheetOpen} onOpenChange={setSheetOpen}>
            <SheetTrigger asChild>
              <button
                aria-label="Open menu"
                className="relative flex h-9 w-9 shrink-0 flex-col items-center justify-center gap-1.5"
              >
                <span className="bg-primary h-0.5 w-6 rounded-full" />
                <span className="bg-primary h-0.5 w-6 rounded-full" />
              </button>
            </SheetTrigger>

            <SheetContent side="right" className="w-72">
              <SheetTitle className="sr-only">Navigation</SheetTitle>
              <nav className="mt-10 flex flex-col gap-1">
                {navigationLinks.map((item, i) => (
                  <motion.div
                    key={item.name}
                    initial={{ opacity: 0, x: 16 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.25, delay: i * 0.05, ease: 'easeOut' as const }}
                  >
                    <Link
                      href={item.href}
                      onClick={() => setSheetOpen(false)}
                      className={
                        activeHash === item.href
                          ? 'bg-muted text-foreground block rounded-xl px-4 py-3 text-sm font-semibold'
                          : 'text-muted-foreground hover:text-foreground block rounded-xl px-4 py-3 text-sm font-semibold transition-colors'
                      }
                    >
                      {item.name}
                    </Link>
                  </motion.div>
                ))}
              </nav>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </motion.header>
  );
}
