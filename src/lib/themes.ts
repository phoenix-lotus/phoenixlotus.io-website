import type { ColorTheme } from '@/data/projects'

interface ThemeStyle {
  gradient: string // tailwind bg-* class
  shadow: string // tailwind shadow-* class
  ring: string // hover ring color
  text: string // solid accent text color
  glow: string // rgba for custom glow
}

export const THEME: Record<ColorTheme, ThemeStyle> = {
  phoenix: {
    gradient: 'bg-grad-phoenix',
    shadow: 'shadow-phoenix',
    ring: 'group-hover:ring-phoenix-600/50',
    text: 'text-phoenix-600',
    glow: 'rgba(255,94,58,.45)',
  },
  ember: {
    gradient: 'bg-grad-ember',
    shadow: 'shadow-phoenix',
    ring: 'group-hover:ring-phoenix-500/50',
    text: 'text-phoenix-500',
    glow: 'rgba(255,138,30,.45)',
  },
  magenta: {
    gradient: 'bg-grad-magenta',
    shadow: 'shadow-lotus',
    ring: 'group-hover:ring-phoenix-700/50',
    text: 'text-phoenix-700',
    glow: 'rgba(255,46,126,.45)',
  },
  lotus: {
    gradient: 'bg-grad-lotus',
    shadow: 'shadow-lotus',
    ring: 'group-hover:ring-lotus-500/50',
    text: 'text-lotus-500',
    glow: 'rgba(168,85,247,.45)',
  },
  pool: {
    gradient: 'bg-grad-pool',
    shadow: 'shadow-lotus',
    ring: 'group-hover:ring-lotus-700/50',
    text: 'text-lotus-700',
    glow: 'rgba(34,211,238,.4)',
  },
  aurora: {
    gradient: 'bg-grad-aurora',
    shadow: 'shadow-lift',
    ring: 'group-hover:ring-lotus-500/50',
    text: 'text-phoenix-600',
    glow: 'rgba(168,85,247,.4)',
  },
}
