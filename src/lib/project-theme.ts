import type { ProjectGradient } from '@/types/project';

export const PROJECT_THEMES: Record<string, ProjectGradient> = {
  purple: {
    from: 'from-purple-500/10',
    via: 'via-purple-500/5',
    to: 'to-transparent',
    border: 'border-purple-500/20',
  },

  blue: {
    from: 'from-blue-500/10',
    via: 'via-blue-500/5',
    to: 'to-transparent',
    border: 'border-blue-500/20',
  },

  emerald: {
    from: 'from-emerald-500/10',
    via: 'via-emerald-500/5',
    to: 'to-transparent',
    border: 'border-emerald-500/20',
  },

  amber: {
    from: 'from-amber-500/10',
    via: 'via-amber-500/5',
    to: 'to-transparent',
    border: 'border-amber-500/20',
  },

  rose: {
    from: 'from-rose-500/10',
    via: 'via-rose-500/5',
    to: 'to-transparent',
    border: 'border-rose-500/20',
  },

  cyan: {
    from: 'from-cyan-500/10',
    via: 'via-cyan-500/5',
    to: 'to-transparent',
    border: 'border-cyan-500/20',
  },
};
