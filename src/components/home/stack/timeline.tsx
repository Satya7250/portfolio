'use client';

import type { StackCategory } from '@/lib/techStackData';
import { ChevronRight } from 'lucide-react';

interface TimelineProps {
  categories: StackCategory[];
  active: number;
  onChange: (index: number) => void;
}

export default function Timeline({ categories, active, onChange }: TimelineProps) {
  return (
    <nav aria-label="Technology categories" className="flex w-full flex-col gap-1.5">
      <ul className="space-y-1.5">
        {categories.map((category, index) => {
          const isActive = index === active;

          return (
            <li key={category.id}>
              <button
                type="button"
                onClick={() => onChange(index)}
                aria-current={isActive ? 'true' : undefined}
                aria-label={`Show ${category.title} technologies`}
                className={`group focus-visible:ring-offset-background relative flex w-full items-center justify-between rounded-xl px-5 py-3.5 text-left text-sm font-medium transition-all duration-200 focus-visible:ring-2 focus-visible:ring-[#eab308] focus-visible:ring-offset-2 focus-visible:outline-none ${
                  isActive
                    ? 'border border-[#2c2c2e] bg-[#1c1c1e] text-[#e67a0f] shadow-sm'
                    : 'text-neutral-400 hover:bg-neutral-900/60 hover:text-neutral-200'
                }`}
              >
                <div className="flex items-center gap-3">
                  <ChevronRight
                    aria-hidden="true"
                    className={`h-4 w-4 transition-all duration-200 ${
                      isActive
                        ? 'translate-x-0 text-[#e67a0f] opacity-100'
                        : '-translate-x-2 text-neutral-600 opacity-0 group-hover:translate-x-0 group-hover:opacity-60'
                    }`}
                  />

                  <span className="text-base font-medium tracking-tight">{category.title}</span>
                </div>
              </button>
            </li>
          );
        })}
      </ul>
    </nav>
  );
}
