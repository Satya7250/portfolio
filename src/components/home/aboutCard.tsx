import type { HTMLAttributes, ReactNode } from 'react';
import { cn } from '@/lib/utils';

interface GradientCardProps extends HTMLAttributes<HTMLElement> {
  /** Section content */
  children?: never;

  /** Left column */
  left: ReactNode;

  /** Right column */
  right?: ReactNode;

  /** Section id for navigation */
  id?: string;

  /** References the section heading */
  'aria-labelledby'?: string;
}

export default function GradientCard({
  left,
  right,
  id,
  className,
  'aria-labelledby': ariaLabelledby,
  ...props
}: GradientCardProps) {
  return (
    <section
      id={id}
      aria-labelledby={ariaLabelledby}
      className={cn('relative mx-auto w-full max-w-7xl overflow-hidden rounded-3xl', className)}
      style={{
        background:
          'linear-gradient(135deg, rgba(45,106,79,0.07) 0%, rgba(45,106,79,0.04) 40%, rgba(240,253,246,0.6) 100%)',
        border: '1px solid rgba(45,106,79,0.12)',
      }}
      {...props}
    >
      {/* Dotted texture */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 opacity-[0.018]"
        style={{
          backgroundImage: 'radial-gradient(circle, currentColor 1px, transparent 1px)',
          backgroundSize: '20px 20px',
        }}
      />

      {/* Soft glow */}
      <div
        aria-hidden="true"
        className="absolute -top-32 -left-32 h-96 w-96 rounded-full bg-emerald-500/5 blur-3xl"
      />

      <div
        aria-hidden="true"
        className="absolute -right-32 -bottom-32 h-112 w-md rounded-full bg-white/10 blur-3xl"
      />

      {/* Content */}
      <div className="relative z-10 grid gap-12 px-8 py-10 sm:px-12 sm:py-12 lg:grid-cols-[1.05fr_0.95fr] lg:gap-20 lg:px-16 lg:py-16 xl:px-20">
        <div className="flex flex-col justify-center">{left}</div>

        {right && <div className="flex flex-col justify-center">{right}</div>}
      </div>
    </section>
  );
}
