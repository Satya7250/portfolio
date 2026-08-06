'use client';

import React from 'react';
import {
  SiJavascript,
  SiTypescript,
  SiCplusplus,
  SiC,
  SiSharp,
  SiPython,
  SiHtml5,
  SiCss,
  SiNextdotjs,
  SiReact,
  SiTailwindcss,
  SiFramer,
  SiShadcnui,
  SiReactquery,
  SiNodedotjs,
  SiNetlify,
  SiExpress,
  SiSpringboot,
  SiTrpc,
  SiGraphql,
  SiPrisma,
  SiPostgresql,
  SiMongodb,
  SiRedis,
  SiSupabase,
  SiDocker,
  SiGit,
  SiGithub,
  SiGithubactions,
  SiVercel,
  SiTurborepo,
  SiFastapi,
  SiGooglecloud,
  SiKubernetes,
  SiLinux,
  SiRust,
  SiGo,
  SiKotlin,
  SiSwift,
  SiFlutter,
  SiVuedotjs,
  SiAngular,
  SiSvelte,
  SiFigma,
  SiFirebase,
  SiNginx,
  SiTensorflow,
  SiPytorch,
  SiPostman,
} from 'react-icons/si';
import { GrMysql } from 'react-icons/gr';
import { VscVscodeInsiders } from 'react-icons/vsc';

import { FaJava, FaAws } from 'react-icons/fa6';

import {
  Puzzle,
  MessageSquareCode,
  Bot,
  SearchCode,
  Terminal,
  Code2,
  Binary,
  GitBranch,
} from 'lucide-react';

// OpenAI Icon SVG
function OpenAIIcon({ className = 'h-8 w-8' }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" className={className} aria-hidden="true">
      <path d="M22.2819 9.8211a5.9847 5.9847 0 0 0-.5157-4.9108 6.0462 6.0462 0 0 0-6.5098-2.9A6.0651 6.0651 0 0 0 4.9807 4.1818a5.9847 5.9847 0 0 0-3.9977 2.9 6.0462 6.0462 0 0 0 .7427 7.0966 5.98 5.98 0 0 0 .511 4.9107 6.051 6.051 0 0 0 6.5146 2.9001A5.9847 5.9847 0 0 0 13.2599 24a6.0557 6.0557 0 0 0 5.7718-4.2058 5.9894 5.9894 0 0 0 3.9977-2.9001 6.0557 6.0557 0 0 0-.7475-7.0729zm-9.022 12.6081a4.4755 4.4755 0 0 1-2.8764-1.0408l.1419-.0804 4.7783-2.7582a.7948.7948 0 0 0 .3927-.6813v-6.7369l2.02 1.1686a.071.071 0 0 1 .038.052v5.5826a4.504 4.504 0 0 1-4.4945 4.4944zm-9.6607-4.1254a4.4708 4.4708 0 0 1-.535-3.0137l.142.0852 4.783 2.7582a.7948.7948 0 0 0 .7854 0l5.833-3.3691v2.3324a.0804.0804 0 0 1-.0332.0615L9.74 19.9502a4.4992 4.4992 0 0 1-6.1408-1.6464zM2.3424 8.5856a4.466 4.466 0 0 1 2.3414-1.9727V12.15a.79.79 0 0 0 .3928.6813l5.833 3.3692-2.02 1.1685a.0757.0757 0 0 1-.071 0l-4.8303-2.7913A4.4944 4.4944 0 0 1 2.3424 8.5856zm16.0963 3.8558L12.6057 9.0723l2.02-1.1686a.0757.0757 0 0 1 .071 0l4.8303 2.7913a4.4944 4.4944 0 0 1-.6765 8.1042v-5.5352a.79.79 0 0 0-.3928-.6813zm2.0107-3.0231l-.142-.0853-4.7735-2.7581a.7948.7948 0 0 0-.7854 0L8.9156 9.9442V7.6118a.0804.0804 0 0 1 .0332-.0615l4.9194-2.8387a4.504 4.504 0 0 1 6.6758 4.6583zm-12.4601-5.64l4.835 2.7913a.79.79 0 0 0 .7855 0l5.833-3.3692V1.862a.0804.0804 0 0 1-.0332-.0615L14.73 1.0334a4.4992 4.4992 0 0 1-6.7232 4.747zM12 14.3418l-3.3692-1.9455 3.3692-1.9455 3.3692 1.9455z" />
    </svg>
  );
}

const THEME_TEXT_COLOR = 'var(--foreground)';

const brandColorMap: Record<string, string> = {
  javascript: '#F7DF1E',
  typescript: '#3178C6',
  java: '#E51F24',
  cpp: '#00599C',
  c: '#00599C',
  csharp: '#239120',
  python: '#3776AB',
  html: '#E34F26',
  html5: '#E34F26',
  css: '#1572B6',
  css3: '#1572B6',
  nextjs: '#000000',
  next: '#000000',
  react: '#61DAFB',
  reactjs: '#61DAFB',
  tailwind: '#06B6D4',
  tailwindcss: '#06B6D4',
  motion: '#0055FF',
  framer: '#0055FF',
  shadcn: '#000000',
  shadcnui: '#000000',
  nodejs: '#5FA04E',
  node: '#5FA04E',
  netlify: '#00C7B7',
  express: '#000000',
  expressjs: '#000000',
  springboot: '#6DB33F',
  spring: '#6DB33F',
  trpc: '#398CCB',
  graphql: '#E10098',
  prisma: '#2D3748',
  postgresql: '#4169E1',
  postgres: '#4169E1',
  postman: '#FF6C37',
  mongodb: '#47A248',
  mongo: '#47A248',
  mysql: '#4479A1',
  redis: '#DC382D',
  supabase: '#3ECF8E',
  docker: '#2496ED',
  git: '#F05032',
  githubactions: '#2088FF',
  github: '#181717',
  vercel: '#000000',
  turborepo: '#EF4444',
  fastapi: '#009688',
  aws: '#FF9900',
  amazonwebservices: '#FF9900',
  gcp: '#4285F4',
  googlecloud: '#4285F4',
  kubernetes: '#326CE5',
  k8s: '#326CE5',
  linux: '#FCC624',
  rust: '#000000',
  go: '#00ADD8',
  golang: '#00ADD8',
  kotlin: '#7F52FF',
  swift: '#F05138',
  flutter: '#02569B',
  vue: '#4FC08D',
  vuejs: '#4FC08D',
  angular: '#DD0031',
  svelte: '#FF3E00',
  figma: '#F24E1E',
  firebase: '#FFCA28',
  nginx: '#009639',
  tensorflow: '#FF6F00',
  pytorch: '#EE4C2C',
};

const monochromeIconKeys = new Set([
  'github',
  'nextjs',
  'next',
  'vercel',
  'express',
  'expressjs',
  'shadcn',
  'shadcnui',
  'terminal',
  'puzzle',
  'messagesquarecode',
  'bot',
  'searchcode',
  'gitbranch',
  'code2',
  'binary',
]);

// Aliases that must be resolved BEFORE the symbol-stripping regex runs,
// because stripping symbols alone would collapse them into other keys
// (e.g. "C++" -> "c", "C#" -> "c", ".NET" -> "net").
const preNormalizeAliases: Record<string, string> = {
  'c++': 'cpp',
  'c#': 'csharp',
  '.net': 'dotnet',
};

function normalizeIconKey(raw: string): string {
  const lower = raw.trim().toLowerCase();
  if (preNormalizeAliases[lower]) {
    return preNormalizeAliases[lower];
  }
  return lower.replace(/[^a-z0-9]/g, '');
}

function normalizeNeutralColor(value?: string) {
  if (!value) return undefined;
  return value.trim().toLowerCase();
}

function isNeutralBrandColor(value?: string) {
  const normalized = normalizeNeutralColor(value);
  return normalized === '#fff' || normalized === '#ffffff' || normalized === 'white';
}

function resolveIconColor({
  explicitColor,
  brandColor,
  iconKey,
}: {
  explicitColor?: string;
  brandColor?: string;
  iconKey: string;
}) {
  // An explicit color prop always wins, even for keys we'd otherwise force
  // to monochrome — callers who pass `color` explicitly are opting out.
  if (explicitColor) {
    return isNeutralBrandColor(explicitColor) ? THEME_TEXT_COLOR : explicitColor;
  }

  if (monochromeIconKeys.has(iconKey)) {
    return THEME_TEXT_COLOR;
  }

  const candidateColor = brandColor ?? brandColorMap[iconKey];

  if (isNeutralBrandColor(candidateColor)) {
    return THEME_TEXT_COLOR;
  }

  return candidateColor ?? THEME_TEXT_COLOR;
}

// Normalized lookup map for dynamic skill resolution
const normalizedMap: Record<string, React.ComponentType<{ className?: string }>> = {
  javascript: SiJavascript,
  js: SiJavascript,
  typescript: SiTypescript,
  ts: SiTypescript,
  java: FaJava,
  cpp: SiCplusplus,
  c: SiC,
  csharp: SiSharp,
  python: SiPython,
  html: SiHtml5,
  html5: SiHtml5,
  css: SiCss,
  css3: SiCss,
  nextjs: SiNextdotjs,
  next: SiNextdotjs,
  react: SiReact,
  reactjs: SiReact,
  tailwind: SiTailwindcss,
  tailwindcss: SiTailwindcss,
  motion: SiFramer,
  framer: SiFramer,
  shadcn: SiShadcnui,
  shadcnui: SiShadcnui,
  zustand: Puzzle,
  tanstack: SiReactquery,
  reactquery: SiReactquery,
  vscode: VscVscodeInsiders,
  nodejs: SiNodedotjs,
  node: SiNodedotjs,
  netlify: SiNetlify,
  express: SiExpress,
  expressjs: SiExpress,
  springboot: SiSpringboot,
  spring: SiSpringboot,
  trpc: SiTrpc,
  graphql: SiGraphql,
  prisma: SiPrisma,
  postgresql: SiPostgresql,
  postgres: SiPostgresql,
  postman: SiPostman,
  mongodb: SiMongodb,
  mysql: GrMysql,
  mongo: SiMongodb,
  redis: SiRedis,
  supabase: SiSupabase,
  openai: OpenAIIcon,
  openaidotcom: OpenAIIcon,
  langchain: MessageSquareCode,
  vercelai: Bot,
  vercelaisdk: Bot,
  pinecone: SearchCode,
  docker: SiDocker,
  git: SiGit,
  githubactions: SiGithubactions,
  github: SiGithub,
  vercel: SiVercel,
  turborepo: SiTurborepo,
  fastapi: SiFastapi,
  aws: FaAws,
  amazonwebservices: FaAws,
  gcp: SiGooglecloud,
  googlecloud: SiGooglecloud,
  kubernetes: SiKubernetes,
  k8s: SiKubernetes,
  linux: SiLinux,
  rust: SiRust,
  go: SiGo,
  golang: SiGo,
  kotlin: SiKotlin,
  swift: SiSwift,
  flutter: SiFlutter,
  vue: SiVuedotjs,
  vuejs: SiVuedotjs,
  angular: SiAngular,
  svelte: SiSvelte,
  figma: SiFigma,
  firebase: SiFirebase,
  nginx: SiNginx,
  tensorflow: SiTensorflow,
  pytorch: SiPytorch,
  // DSA fallbacks
  arraysstrings: Code2,
  treesgraphs: GitBranch,
  dynamicprogramming: Binary,
};

interface TechIconProps {
  name: string;
  icon?: string;
  className?: string;
  color?: string;
  brandColor?: string;
}

export default function TechIcon({
  name,
  icon,
  className = 'h-10 w-10',
  color,
  brandColor,
}: TechIconProps) {
  // 1. If an image or SVG URL was supplied from Admin Panel / DB.
  // Note: `color`/`brandColor` cannot tint a raster/external image via CSS
  // `color`, so we don't pretend to support that here — the wrapper's
  // `currentColor` is set in case the URL happens to be an inline `<img>`
  // of an SVG that itself uses currentColor (rare, but harmless to set).
  if (
    icon &&
    (icon.startsWith('http://') ||
      icon.startsWith('https://') ||
      icon.startsWith('/') ||
      icon.startsWith('data:'))
  ) {
    return (
      <img
        src={icon}
        alt={name}
        title={name}
        loading="lazy"
        decoding="async"
        className={`${className} object-contain`}
      />
    );
  }

  // 2. Normalize key string. C++/C#/.NET are special-cased before symbol
  // stripping so they don't collapse into "c" / "net".
  const targetKey = normalizeIconKey(icon || name);

  const IconComponent = normalizedMap[targetKey] || Terminal;
  const resolvedColor = resolveIconColor({ explicitColor: color, brandColor, iconKey: targetKey });

  return (
    <div style={{ color: resolvedColor }}>
      <IconComponent className={className} />
    </div>
  );
}
