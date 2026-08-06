'use client';

import { ExternalLink } from 'lucide-react';
import { FaGithub } from 'react-icons/fa';
import { motion } from 'motion/react';
import { cn } from '@/lib/utils';

interface ProjectActionsProps {
  repoUrl: string;
  demoUrl: string;
}

export function ProjectActions({ repoUrl, demoUrl }: ProjectActionsProps) {
  return (
    <div className="flex flex-wrap items-center gap-3">
      {/* Repository */}
      <motion.a
        href={repoUrl}
        target="_blank"
        rel="noopener noreferrer"
        initial="rest"
        whileHover="hover"
        whileTap={{ scale: 0.97 }}
        variants={{
          rest: { y: 0 },
          hover: { y: -3 },
        }}
        transition={{
          duration: 0.25,
          ease: [0.22, 1, 0.36, 1],
        }}
        className={cn(
          'group inline-flex items-center gap-2 rounded-xl px-4 py-2.5',
          'border border-neutral-200 bg-white/80 backdrop-blur-xl',
          'text-sm font-medium text-neutral-800',
          'shadow-sm transition-all duration-300',
          'hover:border-neutral-300 hover:bg-white hover:shadow-md',
          'dark:border-white/10 dark:bg-white/4 dark:text-neutral-100',
          'dark:hover:border-white/20 dark:hover:bg-white/6',
        )}
      >
        <motion.span
          variants={{
            rest: { rotate: 0, scale: 1 },
            hover: { rotate: -8, scale: 1.08 },
          }}
          transition={{ duration: 0.25 }}
        >
          <FaGithub className="size-4 text-neutral-700 dark:text-neutral-300" />
        </motion.span>
        Repository
      </motion.a>

      {/* Live Demo */}
      <motion.a
        href={demoUrl}
        target="_blank"
        rel="noopener noreferrer"
        initial="rest"
        whileHover="hover"
        whileTap={{ scale: 0.97 }}
        variants={{
          rest: { y: 0 },
          hover: { y: -3 },
        }}
        transition={{
          duration: 0.25,
          ease: [0.22, 1, 0.36, 1],
        }}
        className="group relative overflow-hidden rounded-xl"
      >
        {/* Glow */}
        <motion.div
          className="absolute inset-0 rounded-xl bg-indigo-500/10 blur-xl"
          variants={{
            rest: { opacity: 0 },
            hover: { opacity: 1 },
          }}
          transition={{ duration: 0.3 }}
        />

        <span
          className={cn(
            'relative z-10 inline-flex items-center gap-2 rounded-xl px-4 py-2.5',
            'border border-indigo-300/40',
            'bg-indigo-50/70 backdrop-blur-xl',
            'text-sm font-medium text-indigo-900',
            'shadow-sm transition-all duration-300',
            'hover:border-indigo-400/60',
            'hover:bg-indigo-100/70',
            'hover:shadow-md',
            'dark:border-indigo-400/20',
            'dark:bg-indigo-500/10',
            'dark:text-indigo-200',
            'dark:hover:border-indigo-400/40',
            'dark:hover:bg-indigo-500/15',
          )}
        >
          Live Demo
          <motion.span
            variants={{
              rest: { x: 0, y: 0 },
              hover: { x: 2, y: -2 },
            }}
            transition={{ duration: 0.25 }}
          >
            <ExternalLink className="size-4 text-indigo-500 dark:text-indigo-300" />
          </motion.span>
        </span>
      </motion.a>
    </div>
  );
}
