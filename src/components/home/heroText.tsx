"use client";

import { motion } from "motion/react";
import { FileText } from "lucide-react";
import type { Profile } from "@/lib/profile";

type HeroTextProps = {
  profile: Profile;
};

export default function HeroText({ profile }: HeroTextProps) {
  return (
    <motion.div
      initial={{ opacity: 0, x: -40 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{
        duration: 0.8,
        ease: [0.16, 1, 0.3, 1],
      }}
      className="flex max-w-2xl flex-col items-center gap-10 text-center lg:items-start lg:text-left"
    >
      <div className="space-y-6">
        {/* <motion.span
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.15 }}
          className="text-sm font-medium uppercase tracking-[0.3em] text-muted-foreground"
        >
          Full Stack Developer
        </motion.span> */}

        <motion.h1
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.25 }}
          className="text-5xl font-extrabold leading-tight tracking-tight sm:text-6xl lg:text-7xl"
        >
          Hi, I'm{" "}
          <span className="text-emerald-700 dark:text-emerald-700">
  Satya Prakash
</span>
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.35 }}
          className="max-w-xl text-xl leading-relaxed text-muted-foreground"
        >
          A passionate{" "}
          <span className="font-semibold text-foreground">
            Full Stack Developer
          </span>{" "}
          crafting modern web experiences.
        </motion.p>
      </div>

      <motion.a
  href={profile.resumeUrl}
  target="_blank"
  rel="noopener noreferrer"
  initial={{ opacity: 0, y: 12 }}
  animate={{ opacity: 1, y: 0 }}
  transition={{ delay: 0.45 }}
  
  whileTap={{ scale: 0.97 }}
  className="group relative inline-flex items-center gap-3 overflow-hidden rounded-full border border-emerald-500/20 bg-emerald-500/5 px-7 py-3.5 text-sm font-semibold text-emerald-600 backdrop-blur-xl transition-all duration-300 hover:border-emerald-500/40 hover:bg-emerald-500/10 hover:shadow-[0_10px_40px_-15px_rgba(16,185,129,0.45)] dark:text-emerald-400"
>
  {/* Glow */}
  <span className="absolute inset-0 -z-10 bg-gradient-to-r from-emerald-500/0 via-emerald-500/10 to-emerald-500/0 opacity-0 transition-opacity duration-500 group-hover:opacity-100" />

  <FileText className="h-4 w-4 transition-transform duration-300 group-hover:rotate-6 group-hover:scale-110" />

  <span>Resume</span>

  <motion.span
    initial={{ x: 0 }}
    whileHover={{ x: 4 }}
    transition={{ type: "spring", stiffness: 300 }}
  >
    →
  </motion.span>
</motion.a>
    </motion.div>
  );
}