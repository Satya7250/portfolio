'use client';

import { motion } from 'motion/react';
import type { Project } from '@/types/project';
import { ProjectTags } from './project-tags';
import { ProjectActions } from './project-actions';

interface ProjectContentProps {
  project: Project;
}

export function ProjectContent({ project }: ProjectContentProps) {
  return (
    <motion.div
      initial={{ opacity: 0, x: -40 }}
      whileInView={{ opacity: 1, x: 0 }}
      viewport={{ once: true, margin: '-100px' }}
      transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
      className="flex flex-col justify-center gap-6"
    >
      <span className="text-primary text-xs font-semibold tracking-[0.3em] uppercase">
        Featured Project
      </span>

      <h3 className="text-foreground text-5xl font-bold tracking-tight">
        {project.title}
      </h3>

      <p className="text-muted-foreground max-w-md leading-relaxed">
        {project.description}
      </p>

      <ProjectTags tags={project.tags ?? []} />

      {(project.repoUrl || project.demoUrl) && (
        <div className="mt-2">
          <ProjectActions
            repoUrl={project.repoUrl ?? ''}
            demoUrl={project.demoUrl ?? ''}
          />
        </div>
      )}
    </motion.div>
  );
}