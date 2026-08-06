'use client';

import Image from 'next/image';
import { motion } from 'motion/react';
import { cn } from '@/lib/utils';
import type { Project } from '@/types/project';

interface ProjectPreviewProps {
  project: Project;
}

export function ProjectPreview({ project }: ProjectPreviewProps) {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      whileInView={{ opacity: 1, scale: 1 }}
      viewport={{ once: true, margin: '-100px' }}
      transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
      className="group"
    >
      <div
        className={cn(
          'bg-card rounded-3xl border p-3 transition-all duration-500 ease-out',
          'hover:-translate-y-2 hover:shadow-2xl',
          'bg-linear-to-br',
          project.gradient.from,
          project.gradient.via,
          project.gradient.to,
          project.gradient.border,
        )}
      >
        <div className="relative aspect-16/10 overflow-hidden rounded-2xl">
          <Image
            src={project.image}
            alt={`${project.title} project thumbnail`}
            fill
            className="object-cover transition-transform duration-700 ease-out group-hover:scale-105"
            sizes="(max-width: 1024px) 100vw, 50vw"
          />
        </div>
      </div>
    </motion.div>
  );
}
