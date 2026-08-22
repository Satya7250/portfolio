'use client';

import { motion } from 'motion/react';
import { FileText } from 'lucide-react';
import type { Profile } from '@/lib/resume';
import { Button } from '@/components/ui/button';

type HeroTextProps = {
  profile: Profile;
};

export default function HeroText({ profile }: HeroTextProps) {
  const hasResume = Boolean(profile.resumeUrl);

  return (
    <motion.div
      initial={{ opacity: 0, x: -40 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{
        duration: 0.8,
        ease: [0.16, 1, 0.3, 1],
      }}
      className="flex max-w-2xl flex-col items-center gap-10 text-center lg:items-start lg:text-left"
    >
      <div className="space-y-6">
        <motion.h1
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.25 }}
          className="text-5xl leading-tight font-extrabold tracking-tight sm:text-6xl lg:text-7xl"
        >
          Hi, I'm <span className="text-emerald-700 dark:text-emerald-700">Satya Prakash</span>
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.35 }}
          className="text-muted-foreground max-w-xl text-xl leading-relaxed"
        >
          A passionate <span className="text-foreground font-semibold">Full Stack Developer</span>{' '}
          crafting modern web experiences.
        </motion.p>
      </div>

      {hasResume ? (
        <Button
          asChild
          className="group relative inline-flex h-auto cursor-pointer items-center gap-3 overflow-hidden rounded-full border border-emerald-500/20 bg-emerald-500/5 px-7 py-3.5 text-sm font-semibold text-emerald-600 backdrop-blur-xl transition-all duration-300 hover:border-emerald-500/40 hover:bg-emerald-500/10 hover:shadow-[0_12px_40px_-12px_rgba(16,185,129,0.5)] dark:text-emerald-400"
        >
          <motion.a
            href={profile.resumeUrl!}
            target="_blank"
            rel="noopener noreferrer"
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.45 }}
            whileHover={{ y: -2 }}
            whileTap={{ scale: 0.97 }}
          >
            <span className="absolute inset-0 -z-10 rounded-full bg-linear-to-r from-emerald-500/0 via-emerald-500/15 to-emerald-500/0 opacity-0 transition-opacity duration-500 group-hover:opacity-100" />

            <span className="pointer-events-none absolute inset-0 -translate-x-full bg-linear-to-r from-transparent via-white/25 to-transparent transition-transform duration-700 ease-out group-hover:translate-x-full dark:via-white/10" />

            <motion.span
              className="absolute -inset-px -z-20 rounded-full opacity-0 group-hover:opacity-100"
              style={{
                background:
                  'conic-gradient(from 0deg, transparent, rgba(16,185,129,0.5), transparent 30%)',
              }}
              animate={{ rotate: 360 }}
              transition={{ duration: 3, repeat: Infinity, ease: 'linear' }}
            />

            <motion.span
              animate={{ y: [0, -2, 0] }}
              transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
            >
              <FileText className="h-4 w-4 transition-transform duration-300 group-hover:scale-110 group-hover:rotate-6" />
            </motion.span>

            <span className="relative">
              Resume
              <span className="absolute inset-x-0 -bottom-0.5 h-px scale-x-0 bg-emerald-500/60 transition-transform duration-300 group-hover:scale-x-100" />
            </span>

            <motion.span
              className="inline-block"
              initial={{ x: 0 }}
              whileHover={{ x: 5 }}
              transition={{ type: 'spring', stiffness: 300, damping: 15 }}
            >
              →
            </motion.span>
          </motion.a>
        </Button>
      ) : (
        <Button
          disabled
          variant="outline"
          className="border-muted text-muted-foreground relative inline-flex h-auto cursor-not-allowed items-center gap-3 rounded-full border px-7 py-3.5 text-sm font-semibold opacity-60"
        >
          <FileText className="text-muted-foreground h-4 w-4" />
          <span>Resume Unavailable</span>
        </Button>
      )}
    </motion.div>
  );
}
