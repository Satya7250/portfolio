"use client";

/**
 * OrbitFeatures
 * -------------
 * A premium, dark, glassmorphic "orbit" visualization for a developer
 * portfolio hero/features section. A pulsing core sits at the center,
 * surrounded by four floating feature cards (top / left / right / bottom),
 * slowly rotating rings, and drifting particles.
 *
 * Stack: Next.js 16, React 19, TypeScript, Tailwind CSS v4, motion/react, shadcn/ui
 *
 * Usage:
 *   import { OrbitFeatures } from "@/components/orbit-features";
 *   <OrbitFeatures />
 */

import { useState } from "react";
import { motion, useReducedMotion } from "motion/react";
import {
  Bot,
  MonitorSmartphone,
  ServerCog,
  Smartphone,
  type LucideIcon,
} from "lucide-react";
import { cn } from "@/lib/utils";

// ----------------------------------------------------------------------------
// Types & data
// ----------------------------------------------------------------------------

type OrbitPosition = "top" | "left" | "right" | "bottom";

interface OrbitFeatureConfig {
  id: string;
  position: OrbitPosition;
  title: string;
  subtitle: string;
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
    id: "web",
    position: "top",
    title: "Modern Web Apps",
    subtitle: "Next.js • React • TypeScript",
    Icon: MonitorSmartphone,
    iconColor: "text-emerald-400",
    iconBg: "bg-emerald-500/10",
    borderColor: "border-emerald-500/15",
    hoverBorderColor: "hover:border-emerald-400/50",
    hoverShadow: "hover:shadow-[0_0_60px_-15px_rgba(52,211,153,0.5)]",
    beamGradient: "bg-gradient-to-t from-transparent to-emerald-400/80",
    dotColor: "bg-emerald-400",
  },
  {
    id: "ai",
    position: "left",
    title: "AI Applications",
    subtitle: "LLMs • RAG • Automation",
    Icon: Bot,
    iconColor: "text-purple-400",
    iconBg: "bg-purple-500/10",
    borderColor: "border-purple-500/15",
    hoverBorderColor: "hover:border-purple-400/50",
    hoverShadow: "hover:shadow-[0_0_60px_-15px_rgba(192,132,252,0.5)]",
    beamGradient: "bg-gradient-to-l from-transparent to-purple-400/80",
    dotColor: "bg-purple-400",
  },
  {
    id: "backend",
    position: "right",
    title: "Backend & Cloud",
    subtitle: "Node.js • Spring Boot • PostgreSQL",
    Icon: ServerCog,
    iconColor: "text-blue-400",
    iconBg: "bg-blue-500/10",
    borderColor: "border-blue-500/15",
    hoverBorderColor: "hover:border-blue-400/50",
    hoverShadow: "hover:shadow-[0_0_60px_-15px_rgba(96,165,250,0.5)]",
    beamGradient: "bg-gradient-to-r from-transparent to-blue-400/80",
    dotColor: "bg-blue-400",
  },
  {
    id: "mobile",
    position: "bottom",
    title: "Mobile Apps",
    subtitle: "React Native • Expo",
    Icon: Smartphone,
    iconColor: "text-orange-400",
    iconBg: "bg-orange-500/10",
    borderColor: "border-orange-500/15",
    hoverBorderColor: "hover:border-orange-400/50",
    hoverShadow: "hover:shadow-[0_0_60px_-15px_rgba(251,146,60,0.5)]",
    beamGradient: "bg-gradient-to-b from-transparent to-orange-400/80",
    dotColor: "bg-orange-400",
  },
];

const POSITION_CLASSES: Record<OrbitPosition, string> = {
  top: "top-[calc(50%_-_var(--orbit-radius))] left-1/2 -translate-x-1/2 -translate-y-1/2",
  bottom:
    "top-[calc(50%_+_var(--orbit-radius))] left-1/2 -translate-x-1/2 -translate-y-1/2",
  left: "left-[calc(50%_-_var(--orbit-radius))] top-1/2 -translate-x-1/2 -translate-y-1/2",
  right:
    "left-[calc(50%_+_var(--orbit-radius))] top-1/2 -translate-x-1/2 -translate-y-1/2",
};

const BEAM_CLASSES: Record<OrbitPosition, string> = {
  top: "left-1/2 top-1/2 -translate-x-1/2 -translate-y-full w-px h-[var(--orbit-radius)]",
  bottom: "left-1/2 top-1/2 -translate-x-1/2 w-px h-[var(--orbit-radius)]",
  left: "top-1/2 left-1/2 -translate-y-1/2 -translate-x-full h-px w-[var(--orbit-radius)]",
  right: "top-1/2 left-1/2 -translate-y-1/2 h-px w-[var(--orbit-radius)]",
};

/**
 * Decorative particles riding along the two rotating rings.
 * Outer ring: evenly spaced, one dot colored per feature accent so the
 * ring visually "carries" each card's color around with it.
 * Inner ring: evenly spaced, neutral, offset 45° from the outer set.
 */
const OUTER_PARTICLES = [
  { angle: 0, dotColor: "bg-emerald-400/60" },
  { angle: 90, dotColor: "bg-blue-400/60" },
  { angle: 180, dotColor: "bg-orange-400/60" },
  { angle: 270, dotColor: "bg-purple-400/60" },
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
        "relative flex items-center justify-center rounded-full",
        compact ? "h-20 w-20" : "h-22 w-22 lg:h-24 lg:w-24",
      )}
    >
      {/* Ambient blurred glow layers */}
      <motion.div
        aria-hidden
        className="absolute -inset-10 rounded-full bg-linear-to-br from-emerald-500/20 via-purple-500/10 to-blue-500/20 blur-3xl"
        animate={reduceMotion ? undefined : { opacity: [0.35, 0.65, 0.35] }}
        transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
      />
      <motion.div
        aria-hidden
        className="absolute -inset-4 rounded-full bg-foreground/5 blur-2xl"
        animate={reduceMotion ? undefined : { scale: [1, 1.08, 1] }}
        transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
      />

      {/* Glass shell */}
      <div className="absolute inset-0 rounded-full border border-border bg-background/90 shadow-[inset_0_1px_0_rgba(255,255,255,0.06)] backdrop-blur-xl" />

      {/* Soft pulse ring */}
      <motion.div
        aria-hidden
        className="absolute inset-0 rounded-full border border-foreground/20"
        animate={
          reduceMotion
            ? undefined
            : { scale: [1, 1.25, 1], opacity: [0.5, 0, 0.5] }
        }
        transition={{ duration: 3, repeat: Infinity, ease: "easeOut" }}
      />

      {/* Inner sheen */}
      <motion.div
        aria-hidden
        className="absolute inset-3 rounded-full bg-linear-to-br from-foreground/10 to-transparent"
        animate={reduceMotion ? undefined : { opacity: [0.3, 0.6, 0.3] }}
        transition={{ duration: 3.5, repeat: Infinity, ease: "easeInOut" }}
      />

      <div className="relative z-10 text-center leading-tight">
        <p className="text-[13px] font-semibold tracking-tight text-foreground lg:text-sm">
          Full Stack
        </p>
        <p className="text-[13px] font-semibold tracking-tight text-muted-foreground lg:text-sm">
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
      {/* Outer ring — carries one accent-colored dot per feature */}
      <motion.div
        aria-hidden
        className="absolute left-1/2 top-1/2 h-95 w-95 -translate-x-1/2 -translate-y-1/2 rounded-full border border-border"
        animate={reduceMotion ? undefined : { rotate: 360 }}
        transition={{ duration: 26, repeat: Infinity, ease: "linear" }}
      >
        {OUTER_PARTICLES.map((p, i) => (
          <span
            key={i}
            aria-hidden
            className={cn(
              "absolute left-1/2 top-1/2 h-2 w-2 rounded-full",
              p.dotColor,
            )}
            style={{
              transform: `rotate(${p.angle}deg) translateX(${outerRadius}px) translate(-50%, -50%)`,
            }}
          />
        ))}
      </motion.div>

      {/* Middle dashed ring — neutral drifting particles, opposite direction */}
      <motion.div
        aria-hidden
        className="absolute left-1/2 top-1/2 h-64 w-[256px] -translate-x-1/2 -translate-y-1/2 rounded-full border border-dashed border-border"
        animate={reduceMotion ? undefined : { rotate: -360 }}
        transition={{ duration: 16, repeat: Infinity, ease: "linear" }}
      >
        {INNER_PARTICLES.map((p, i) => (
          <motion.span
            key={i}
            aria-hidden
            className="absolute left-1/2 top-1/2 h-1.5 w-1.5 rounded-full bg-foreground/30"
            style={{
              transform: `rotate(${p.angle}deg) translateX(${innerRadius}px) translate(-50%, -50%)`,
            }}
            animate={reduceMotion ? undefined : { opacity: [0.15, 0.75, 0.15] }}
            transition={{
              duration: 3.5,
              repeat: Infinity,
              ease: "easeInOut",
              delay: p.delay,
            }}
          />
        ))}
      </motion.div>

      {/* Innermost ring — static, plain, frames the core */}
      <div className="absolute left-1/2 top-1/2 h-37 w-37 -translate-x-1/2 -translate-y-1/2 rounded-full border border-border" />
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
      className={cn("absolute z-10 w-47", POSITION_CLASSES[feature.position])}
      whileHover={{ scale: 1.06 }}
      transition={{ duration: 0.25, ease: "easeOut" }}
      onHoverStart={onHoverStart}
      onHoverEnd={onHoverEnd}
    >
      <div
        className={cn(
          "flex items-center gap-2.5 rounded-2xl border bg-card/40 px-3.5 py-3 shadow-[0_4px_24px_rgba(0,0,0,0.08)] backdrop-blur-xl transition-[border-color,box-shadow] duration-300 dark:shadow-[0_4px_24px_rgba(0,0,0,0.35)]",
          feature.borderColor,
          feature.hoverBorderColor,
          feature.hoverShadow,
        )}
      >
        <div
          className={cn(
            "flex h-9 w-9 shrink-0 items-center justify-center rounded-xl",
            feature.iconBg,
          )}
        >
          <Icon className={cn("h-4 w-4", feature.iconColor)} />
        </div>
        <div className="min-w-0">
          <p className="truncate text-[13px] font-semibold text-foreground">
            {feature.title}
          </p>
          <p className="truncate text-[11px] text-muted-foreground">
            {feature.subtitle}
          </p>
        </div>
      </div>
    </motion.div>
  );
}

// ----------------------------------------------------------------------------
// Main export
// ----------------------------------------------------------------------------

export function OrbitFeatures() {
  const [hoveredId, setHoveredId] = useState<string | null>(null);

  return (
    <div className="relative flex w-full max-w-130 items-center justify-center">
      {/* Ambient background wash, centered on this component */}
      <div
        aria-hidden
        className="pointer-events-none absolute left-1/2 top-1/2 h-155 w-155 -translate-x-1/2 -translate-y-1/2 rounded-full bg-[radial-gradient(circle,_rgba(0,0,0,0.04)_0%,_transparent_65%)] dark:bg-[radial-gradient(circle,_rgba(255,255,255,0.05)_0%,_transparent_65%)]"
      />

      <div className="relative flex w-full flex-col items-center">
        {/* ---------------- Desktop / tablet orbit ---------------- */}
        <div
          className="relative hidden h-105 w-full items-center justify-center [--orbit-radius:150px] md:flex lg:h-120 lg:[--orbit-radius:180px]"
        >
          <OrbitRings />

          {FEATURES.map((feature) => (
            <div
              key={feature.id}
              aria-hidden
              className={cn(
                "pointer-events-none absolute rounded-full transition-opacity duration-300",
                BEAM_CLASSES[feature.position],
                feature.beamGradient,
                hoveredId === feature.id ? "opacity-100" : "opacity-0",
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
          <OrbitCore compact />

          <div className="mt-10 flex w-full max-w-sm flex-col gap-3">
            {FEATURES.map((feature) => {
              const { Icon } = feature;
              return (
                <div
                  key={feature.id}
                  className={cn(
                    "flex items-center gap-3 rounded-2xl border bg-card/40 px-4 py-3.5 backdrop-blur-xl",
                    feature.borderColor,
                  )}
                >
                  <div
                    className={cn(
                      "flex h-10 w-10 shrink-0 items-center justify-center rounded-xl",
                      feature.iconBg,
                    )}
                  >
                    <Icon className={cn("h-4.5 w-4.5", feature.iconColor)} />
                  </div>
                  <div className="min-w-0">
                    <p className="truncate text-[14px] font-semibold text-foreground">
                      {feature.title}
                    </p>
                    <p className="truncate text-[12px] text-muted-foreground">
                      {feature.subtitle}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}

export default OrbitFeatures;