'use client';

import { useState } from 'react';
import Timeline from './timeline';
import StackCard from './stackCard';
import { techStackData, type StackCategory } from '@/lib/techStackData';

interface TechStackSectionProps {
  categories?: StackCategory[];
}

export default function TechStackSection({ categories }: TechStackSectionProps) {
  const activeCategories = categories && categories.length > 0 ? categories : techStackData;

  const [active, setActive] = useState(0);
  const activeCategory = activeCategories[active] ?? activeCategories[0];

  return (
    <section id="tech-stack" aria-label="Technology stack" className="pt-4 pb-20">
      <div className="mx-auto max-w-7xl px-4 sm:px-6">
        <div className="grid items-start gap-12 lg:grid-cols-[280px_1fr]">
          <aside aria-label="Technology categories" className="w-full">
            <Timeline categories={activeCategories} active={active} onChange={setActive} />
          </aside>

          <div
            aria-live="polite"
            aria-label={`${activeCategory.title} technologies`}
            className="w-full pt-2"
          >
            <StackCard category={activeCategory} />
          </div>
        </div>
      </div>
    </section>
  );
}
