'use client';

import React from 'react';
import {
  SiJavascript,
  SiTypescript,
  SiCplusplus,
  SiC,
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

// Normalized lookup map for dynamic skill resolution
const normalizedMap: Record<string, React.ComponentType<{ className?: string }>> = {
  javascript: SiJavascript,
  js: SiJavascript,
  typescript: SiTypescript,
  ts: SiTypescript,
  java: FaJava,
  cpp: SiCplusplus,
  c: SiC,
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
}

export default function TechIcon({ name, icon, className = 'h-10 w-10', color }: TechIconProps) {
  // 1. If an image or SVG URL was supplied from Admin Panel / DB
  if (
    icon &&
    (icon.startsWith('http://') ||
      icon.startsWith('https://') ||
      icon.startsWith('/') ||
      icon.startsWith('data:'))
  ) {
    return (
      <img src={icon} alt={name} className={`${className} object-contain`} style={{ color }} />
    );
  }

  // 2. Normalize key string (remove spaces, dots, dashes, special chars)
  const targetKey = (icon || name).toLowerCase().replace(/[^a-z0-9]/g, '');

  const IconComponent = normalizedMap[targetKey] || Terminal;

  return (
    <div style={{ color }}>
      <IconComponent className={className} />
    </div>
  );
}
