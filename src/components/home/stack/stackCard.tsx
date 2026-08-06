'use client';

import { motion, AnimatePresence } from 'motion/react';
import type { StackCategory } from '@/lib/techStackData';
import TechIcon from './techIcon';

interface Props {
  category: StackCategory;
}

export default function StackCard({ category }: Props) {
  if (!category || !category.technologies) return null;

  return (
    <AnimatePresence mode="wait">
      <motion.div
        key={category.id || category.title}
        initial={{ opacity: 0, y: 15 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -15 }}
        transition={{ duration: 0.25, ease: 'easeInOut' }}
        className="w-full"
      >
        {/* Tech Icon Minimal Grid */}
        <div className="grid grid-cols-2 items-center justify-items-center gap-8 sm:grid-cols-3 sm:gap-12 md:grid-cols-4 lg:grid-cols-5">
          {category.technologies.map((tech, index) => (
            <motion.div
              key={tech.id || tech.name || index}
              whileHover={{ scale: 1.1, y: -4 }}
              transition={{ type: 'spring', stiffness: 300, damping: 20 }}
              className="group flex cursor-pointer flex-col items-center justify-center py-2 text-center"
            >
              {/* Tech Icon */}
              <div className="relative mb-3 flex h-14 w-14 items-center justify-center transition-all duration-300 group-hover:drop-shadow-[0_0_12px_rgba(255,255,255,0.25)]">
                <TechIcon
                  name={tech.name}
                  icon={tech.icon}
                  className="h-10 w-10 transition-transform duration-300"
                  color={tech.brandColor}
                  brandColor={tech.brandColor}
                />
              </div>

              {/* Tech Name Label */}
              <span className="text-foreground group-hover:text-foreground/80 text-sm font-medium transition-colors duration-200">
                {tech.name}
              </span>
            </motion.div>
          ))}
        </div>
      </motion.div>
    </AnimatePresence>
  );
}
