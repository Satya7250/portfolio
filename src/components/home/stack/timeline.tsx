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
    <nav aria-label="Technology categories" className="flex w-full flex-col">
      <ul className="space-y-3">
        {categories.map((category, index) => {
          const isActive = index === active;

          return (
            <li key={category.id}>
              <button
                type="button"
                onClick={() => onChange(index)}
                aria-current={isActive ? 'true' : undefined}
                aria-label={`Show ${category.title} technologies`}
                className={`group focus-visible:ring-primary/30 relative flex w-full items-center rounded-2xl px-6 py-4 text-left transition-all duration-300 focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:outline-none ${
                  isActive
                    ? `border-border bg-card border shadow-lg`
                    : `hover:bg-muted/60 border border-transparent`
                } `}
              >
                {/* Active indicator */}
                <div
                  className={`absolute top-3 bottom-3 left-0 w-1 rounded-r-full bg-emerald-400 transition-all duration-300 ${isActive ? 'opacity-100' : 'opacity-0'} `}
                />

                <ChevronRight
                  aria-hidden="true"
                  className={`mr-3 h-4 w-4 transition-all duration-300 ${
                    isActive
                      ? 'translate-x-0 text-emerald-400 opacity-100'
                      : 'text-muted-foreground -translate-x-2 opacity-0 group-hover:translate-x-0 group-hover:opacity-100'
                  } `}
                />

                <span
                  className={`text-base font-medium tracking-tight transition-colors duration-300 ${
                    isActive
                      ? 'text-foreground'
                      : 'text-muted-foreground group-hover:text-foreground'
                  } `}
                >
                  {category.title}
                </span>
              </button>
            </li>
          );
        })}
      </ul>
    </nav>
  );
}
