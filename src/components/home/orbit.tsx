'use client';

import { useState } from 'react';
import { motion, useReducedMotion } from 'motion/react';
import { Bot, MonitorSmartphone, ServerCog, Smartphone, type LucideIcon } from 'lucide-react';
import { cn } from '@/lib/utils';

// ----------------------------------------------------------------------------
// Types & data
// ----------------------------------------------------------------------------

type OrbitPosition = 'top' | 'left' | 'right' | 'bottom';

interface OrbitFeatureConfig {
  id: string;
  position: OrbitPosition;
  title: string;
  subtitle: string;
  /** Longer, crawlable description used only in the sr-only summary + JSON-LD. */
  description: string;
  Icon: LucideIcon;
  /** Tailwind classes — kept fully literal so the JIT compiler can see them */
  iconColor: string;
  iconBg: string;
  borderColor: string;
  hoverBorderColor: string;
  hoverShadow: string;
  beamGradient: string;
  dotColor: string;
}

const FEATURES: OrbitFeatureConfig[] = [
  {
    id: 'web',
    position: 'top',
    title: 'Modern Web Apps',
    subtitle: 'Next.js • React • TypeScript',
    description:
      'Building fast, modern web applications with Next.js, React, and TypeScript.',
    Icon: MonitorSmartphone,
    iconColor: 'text-emerald-400',
    iconBg: 'bg-emerald-500/10',
    borderColor: 'border-emerald-500/15',
    hoverBorderColor: 'hover:border-emerald-400/50',
    hoverShadow: 'hover:shadow-[0_0_60px_-15px_rgba(52,211,153,0.5)]',
    beamGradient: 'bg-gradient-to-t from-transparent to-emerald-400/80',
    dotColor: 'bg-emerald-400',
  },
  {
    id: 'ai',
    position: 'left',
    title: 'AI Applications',
    subtitle: 'LLMs • RAG • Automation',
    description:
      'Designing AI-powered applications using large language models, retrieval-augmented generation, and automation pipelines.',
    Icon: Bot,
    iconColor: 'text-purple-400',
    iconBg: 'bg-purple-500/10',
    borderColor: 'border-purple-500/15',
    hoverBorderColor: 'hover:border-purple-400/50',
    hoverShadow: 'hover:shadow-[0_0_60px_-15px_rgba(192,132,252,0.5)]',
    beamGradient: 'bg-gradient-to-l from-transparent to-purple-400/80',
    dotColor: 'bg-purple-400',
  },
  {
    id: 'backend',
    position: 'right',
    title: 'Backend & Cloud',
    subtitle: 'Node.js • Express • PostgreSQL',
    description:
      'Architecting backend services and cloud infrastructure with Node.js, Express, and PostgreSQL.',
    Icon: ServerCog,
    iconColor: 'text-blue-400',
    iconBg: 'bg-blue-500/10',
    borderColor: 'border-blue-500/15',
    hoverBorderColor: 'hover:border-blue-400/50',
    hoverShadow: 'hover:shadow-[0_0_60px_-15px_rgba(96,165,250,0.5)]',
    beamGradient: 'bg-gradient-to-r from-transparent to-blue-400/80',
    dotColor: 'bg-blue-400',
  },
  {
    id: 'mobile',
    position: 'bottom',
    title: 'Mobile Apps',
    subtitle: 'React Native • Expo',
    description: 'Developing cross-platform mobile apps with React Native and Expo.',
    Icon: Smartphone,
    iconColor: 'text-orange-400',
    iconBg: 'bg-orange-500/10',
    borderColor: 'border-orange-500/15',
    hoverBorderColor: 'hover:border-orange-400/50',
    hoverShadow: 'hover:shadow-[0_0_60px_-15px_rgba(251,146,60,0.5)]',
    beamGradient: 'bg-gradient-to-b from-transparent to-orange-400/80',
    dotColor: 'bg-orange-400',
  },
];

const POSITION_CLASSES: Record<OrbitPosition, string> = {
  top: 'top-[calc(50%_-_var(--orbit-radius))] left-1/2 -translate-x-1/2 -translate-y-1/2',
  bottom: 'top-[calc(50%_+_var(--orbit-radius))] left-1/2 -translate-x-1/2 -translate-y-1/2',
  left: 'left-[calc(50%_-_var(--orbit-radius))] top-1/2 -translate-x-1/2 -translate-y-1/2',
  right: 'left-[calc(50%_+_var(--orbit-radius))] top-1/2 -translate-x-1/2 -translate-y-1/2',
};

const BEAM_CLASSES: Record<OrbitPosition, string> = {
  top: 'left-1/2 top-1/2 -translate-x-1/2 -translate-y-full w-px h-[var(--orbit-radius)]',
  bottom: 'left-1/2 top-1/2 -translate-x-1/2 w-px h-[var(--orbit-radius)]',
  left: 'top-1/2 left-1/2 -translate-y-1/2 -translate-x-full h-px w-[var(--orbit-radius)]',
  right: 'top-1/2 left-1/2 -translate-y-1/2 h-px w-[var(--orbit-radius)]',
};

/**
 * Decorative particles riding along the two rotating rings.
 * Outer ring: evenly spaced, one dot colored per feature accent so the
 * ring visually "carries" each card's color around with it.
 * Inner ring: evenly spaced, neutral, offset 45° from the outer set.
 */
const OUTER_PARTICLES = [
  { angle: 0, dotColor: 'bg-emerald-400/60' },
  { angle: 90, dotColor: 'bg-blue-400/60' },
  { angle: 180, dotColor: 'bg-orange-400/60' },
  { angle: 270, dotColor: 'bg-purple-400/60' },
];

const INNER_PARTICLES = [
  { angle: 45, delay: 0.3 },
  { angle: 135, delay: 1.8 },
  { angle: 225, delay: 0.9 },
  { angle: 315, delay: 1.2 },
];

// ----------------------------------------------------------------------------
// Core (center) piece
// ----------------------------------------------------------------------------

function OrbitCore({ compact = false }: { compact?: boolean }) {
  const reduceMotion = useReducedMotion();

  return (
    <div
      className={cn(
        'relative flex items-center justify-center rounded-full',
        compact ? 'h-20 w-20' : 'h-22 w-22 lg:h-24 lg:w-24',
      )}
    >
      {/* Ambient blurred glow — pure opacity fade, kept even under reduced motion */}
      <motion.div
        aria-hidden
        className="absolute -inset-10 rounded-full bg-linear-to-br from-emerald-500/20 via-purple-500/10 to-blue-500/20 blur-3xl"
        animate={{ opacity: reduceMotion ? [0.4, 0.55, 0.4] : [0.35, 0.65, 0.35] }}
        transition={{ duration: reduceMotion ? 8 : 6, repeat: Infinity, ease: 'easeInOut' }}
      />

      {/* Scale "breathing" glow — spatial, so it's dropped under reduced motion */}
      {!reduceMotion && (
        <motion.div
          aria-hidden
          className="bg-foreground/5 absolute -inset-4 rounded-full blur-2xl"
          animate={{ scale: [1, 1.08, 1] }}
          transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}
        />
      )}

      {/* Glass shell */}
      <div className="border-border bg-background/90 absolute inset-0 rounded-full border shadow-[inset_0_1px_0_rgba(255,255,255,0.06)] backdrop-blur-xl" />

      {/* Soft pulse ring — spatial (scale), dropped under reduced motion */}
      {!reduceMotion && (
        <motion.div
          aria-hidden
          className="border-foreground/20 absolute inset-0 rounded-full border"
          animate={{ scale: [1, 1.25, 1], opacity: [0.5, 0, 0.5] }}
          transition={{ duration: 3, repeat: Infinity, ease: 'easeOut' }}
        />
      )}

      {/* Inner sheen — pure opacity fade, kept even under reduced motion */}
      <motion.div
        aria-hidden
        className="from-foreground/10 absolute inset-3 rounded-full bg-linear-to-br to-transparent"
        animate={{ opacity: reduceMotion ? [0.35, 0.5, 0.35] : [0.3, 0.6, 0.3] }}
        transition={{ duration: reduceMotion ? 5 : 3.5, repeat: Infinity, ease: 'easeInOut' }}
      />

      <div className="relative z-10 text-center leading-tight">
        <p className="text-foreground text-[13px] font-semibold tracking-tight lg:text-sm">
          Full Stack
        </p>
        <p className="text-muted-foreground text-[13px] font-semibold tracking-tight lg:text-sm">
          Developer
        </p>
      </div>
    </div>
  );
}

// ----------------------------------------------------------------------------
// Rings + particles (desktop / tablet only)
// ----------------------------------------------------------------------------

function OrbitRings() {
  const reduceMotion = useReducedMotion();
  const outerRadius = 190; // px, translateX distance for outer particles
  const innerRadius = 128; // px, translateX distance for inner particles

  return (
    <>
      {/* Outer ring — carries one accent-colored dot per feature.
          Under reduced motion we stop the rotation (spatial) but keep a slow
          opacity pulse so the ring doesn't read as inert/broken. */}
      <motion.div
        aria-hidden
        className="border-border absolute top-1/2 left-1/2 h-95 w-95 -translate-x-1/2 -translate-y-1/2 rounded-full border"
        animate={reduceMotion ? { opacity: [0.6, 1, 0.6] } : { rotate: 360 }}
        transition={
          reduceMotion
            ? { duration: 5, repeat: Infinity, ease: 'easeInOut' }
            : { duration: 26, repeat: Infinity, ease: 'linear' }
        }
      >
        {OUTER_PARTICLES.map((p, i) => (
          <span
            key={i}
            aria-hidden
            className={cn('absolute top-1/2 left-1/2 h-2 w-2 rounded-full', p.dotColor)}
            style={{
              transform: `rotate(${p.angle}deg) translateX(${outerRadius}px) translate(-50%, -50%)`,
            }}
          />
        ))}
      </motion.div>

      {/* Middle dashed ring — same treatment, opposite direction */}
      <motion.div
        aria-hidden
        className="border-border absolute top-1/2 left-1/2 h-64 w-[256px] -translate-x-1/2 -translate-y-1/2 rounded-full border border-dashed"
        animate={reduceMotion ? { opacity: [0.5, 0.85, 0.5] } : { rotate: -360 }}
        transition={
          reduceMotion
            ? { duration: 6, repeat: Infinity, ease: 'easeInOut' }
            : { duration: 16, repeat: Infinity, ease: 'linear' }
        }
      >
        {INNER_PARTICLES.map((p, i) => (
          <motion.span
            key={i}
            aria-hidden
            className="bg-foreground/30 absolute top-1/2 left-1/2 h-1.5 w-1.5 rounded-full"
            style={{
              transform: `rotate(${p.angle}deg) translateX(${innerRadius}px) translate(-50%, -50%)`,
            }}
            animate={{ opacity: [0.15, 0.75, 0.15] }}
            transition={{
              duration: 3.5,
              repeat: Infinity,
              ease: 'easeInOut',
              delay: p.delay,
            }}
          />
        ))}
      </motion.div>

      {/* Innermost ring — static, plain, frames the core */}
      <div className="border-border absolute top-1/2 left-1/2 h-37 w-37 -translate-x-1/2 -translate-y-1/2 rounded-full border" />
    </>
  );
}

// ----------------------------------------------------------------------------
// Feature card
// ----------------------------------------------------------------------------

interface OrbitCardProps {
  feature: OrbitFeatureConfig;
  isHovered: boolean;
  onHoverStart: () => void;
  onHoverEnd: () => void;
}

function OrbitCard({ feature, onHoverStart, onHoverEnd }: OrbitCardProps) {
  const { Icon } = feature;

  return (
    <motion.div
      className={cn('absolute z-10 w-47', POSITION_CLASSES[feature.position])}
      whileHover={{ scale: 1.06 }}
      transition={{ duration: 0.25, ease: 'easeOut' }}
      onHoverStart={onHoverStart}
      onHoverEnd={onHoverEnd}
    >
      <div
        className={cn(
          'bg-card/40 flex items-center gap-2.5 rounded-2xl border px-3.5 py-3 shadow-[0_4px_24px_rgba(0,0,0,0.08)] backdrop-blur-xl transition-[border-color,box-shadow] duration-300 dark:shadow-[0_4px_24px_rgba(0,0,0,0.35)]',
          feature.borderColor,
          feature.hoverBorderColor,
          feature.hoverShadow,
        )}
      >
        <div
          className={cn(
            'flex h-9 w-9 shrink-0 items-center justify-center rounded-xl',
            feature.iconBg,
          )}
        >
          <Icon aria-hidden className={cn('h-4 w-4', feature.iconColor)} />
        </div>
        <div className="min-w-0">
          {/* h3: real heading, not a styled <p> — gives crawlers a content
              hierarchy (h2 section title -> h3 per service) instead of an
              orbit full of anonymous <p> tags. */}
          <h3 className="text-foreground truncate text-[13px] font-semibold">{feature.title}</h3>
          <p className="text-muted-foreground truncate text-[11px]">{feature.subtitle}</p>
        </div>
      </div>
    </motion.div>
  );
}

// ----------------------------------------------------------------------------
// Structured data (JSON-LD)
// ----------------------------------------------------------------------------

function OrbitFeaturesJsonLd() {
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'ItemList',
    itemListElement: FEATURES.map((f, i) => ({
      '@type': 'ListItem',
      position: i + 1,
      item: {
        '@type': 'Service',
        name: f.title,
        description: f.description,
      },
    })),
  };

  return (
    <script
      type="application/ld+json"
      // eslint-disable-next-line react/no-danger
      dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
    />
  );
}

// ----------------------------------------------------------------------------
// Main export
// ----------------------------------------------------------------------------

export function OrbitFeatures() {
  const [hoveredId, setHoveredId] = useState<string | null>(null);

  return (
    <section
      aria-labelledby="orbit-features-heading"
      className="relative flex w-full max-w-130 items-center justify-center"
    >
      {/* Real heading for the section. Visually hidden (the "Full Stack
          Developer" core communicates this visually) but present in the DOM
          so screen readers and search engines get an actual section title
          instead of inferring one from decorative markup. */}
      <h2 id="orbit-features-heading" className="sr-only">
        What I build: full-stack development services
      </h2>
      <p className="sr-only">
        {FEATURES.map((f) => f.description).join(' ')}
      </p>
      <OrbitFeaturesJsonLd />

      {/* Ambient background wash, centered on this component */}
      <div
        aria-hidden
        className="pointer-events-none absolute top-1/2 left-1/2 h-155 w-155 -translate-x-1/2 -translate-y-1/2 rounded-full bg-[radial-gradient(circle,_rgba(0,0,0,0.04)_0%,_transparent_65%)] dark:bg-[radial-gradient(circle,_rgba(255,255,255,0.05)_0%,_transparent_65%)]"
      />

      <div className="relative flex w-full flex-col items-center">
        {/* ---------------- Desktop / tablet orbit ---------------- */}
        <div
          aria-hidden
          className="relative hidden h-105 w-full items-center justify-center [--orbit-radius:150px] md:flex lg:h-120 lg:[--orbit-radius:180px]"
        >
          <OrbitRings />

          {FEATURES.map((feature) => (
            <div
              key={feature.id}
              aria-hidden
              className={cn(
                'pointer-events-none absolute rounded-full transition-opacity duration-300',
                BEAM_CLASSES[feature.position],
                feature.beamGradient,
                hoveredId === feature.id ? 'opacity-100' : 'opacity-0',
              )}
            />
          ))}

          <OrbitCore />

          {FEATURES.map((feature) => (
            <OrbitCard
              key={feature.id}
              feature={feature}
              isHovered={hoveredId === feature.id}
              onHoverStart={() => setHoveredId(feature.id)}
              onHoverEnd={() => setHoveredId(null)}
            />
          ))}
        </div>

        {/* ---------------- Mobile: stacked, static ---------------- */}
        <div className="flex flex-col items-center md:hidden">
          <div aria-hidden>
            <OrbitCore compact />
          </div>

          <div className="mt-10 flex w-full max-w-sm flex-col gap-3">
            {FEATURES.map((feature) => {
              const { Icon } = feature;
              return (
                <div
                  key={feature.id}
                  className={cn(
                    'bg-card/40 flex items-center gap-3 rounded-2xl border px-4 py-3.5 backdrop-blur-xl',
                    feature.borderColor,
                  )}
                >
                  <div
                    className={cn(
                      'flex h-10 w-10 shrink-0 items-center justify-center rounded-xl',
                      feature.iconBg,
                    )}
                  >
                    <Icon aria-hidden className={cn('h-4.5 w-4.5', feature.iconColor)} />
                  </div>
                  <div className="min-w-0">
                    <h3 className="text-foreground truncate text-[14px] font-semibold">
                      {feature.title}
                    </h3>
                    <p className="text-muted-foreground truncate text-[12px]">
                      {feature.subtitle}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}

export default OrbitFeatures;