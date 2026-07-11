import forms from '@tailwindcss/forms'
import typography from '@tailwindcss/typography'

/** @type {import('tailwindcss').Config} */
export default {
  darkMode: 'class',
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        // --- Phoenix ramp (warm) ---
        phoenix: {
          50: '#fff7e6',
          100: '#ffecc2',
          200: '#ffd980',
          300: '#ffc94d',
          400: '#ffbc00', // legacy amber anchor
          500: '#ff8a1e',
          600: '#ff5e3a',
          700: '#ff2e7e', // rose — seam into lotus
        },
        // --- Lotus ramp (cool) ---
        lotus: {
          300: '#f472d0',
          400: '#d43cf0',
          500: '#a855f7',
          600: '#7c3aed',
          700: '#22d3ee',
          800: '#14b8a6',
        },
        // --- Semantic tokens (mapped to CSS vars for dark-mode swap) ---
        base: 'rgb(var(--bg-base) / <alpha-value>)',
        warm: 'rgb(var(--bg-warm) / <alpha-value>)',
        surface: 'rgb(var(--surface) / <alpha-value>)',
        ink: 'rgb(var(--ink) / <alpha-value>)',
        'ink-soft': 'rgb(var(--ink-soft) / <alpha-value>)',
        muted: 'rgb(var(--muted) / <alpha-value>)',
        line: 'rgb(var(--border) / <alpha-value>)',
      },
      fontFamily: {
        display: ['"Bricolage Grotesque"', 'ui-sans-serif', 'system-ui', 'sans-serif'],
        sans: ['"Plus Jakarta Sans"', 'ui-sans-serif', 'system-ui', 'sans-serif'],
        mono: ['"JetBrains Mono"', 'ui-monospace', 'SFMono-Regular', 'monospace'],
      },
      fontSize: {
        hero: ['clamp(2.75rem, 8vw, 6rem)', { lineHeight: '0.98', letterSpacing: '-0.03em' }],
        display: ['clamp(2rem, 5vw, 3.5rem)', { lineHeight: '1.03', letterSpacing: '-0.02em' }],
        title: ['clamp(1.35rem, 3vw, 2rem)', { lineHeight: '1.15', letterSpacing: '-0.01em' }],
      },
      borderRadius: {
        sm: '10px',
        md: '16px',
        lg: '24px',
        xl: '32px',
        '2xl': '40px',
      },
      boxShadow: {
        soft: '0 8px 30px -12px rgba(27,20,32,.18)',
        lift: '0 20px 50px -20px rgba(27,20,32,.30)',
        phoenix: '0 12px 40px -10px rgba(255,94,58,.45)',
        lotus: '0 12px 40px -10px rgba(124,58,237,.45)',
        glow: '0 0 0 1px rgba(255,255,255,.06), 0 18px 60px -18px rgba(168,85,247,.5)',
      },
      backgroundImage: {
        'grad-phoenix': 'linear-gradient(135deg, #ffbc00 0%, #ff5e3a 50%, #ff2e7e 100%)',
        'grad-lotus': 'linear-gradient(135deg, #ff2e7e 0%, #a855f7 55%, #22d3ee 100%)',
        'grad-aurora':
          'linear-gradient(120deg, #ffbc00 0%, #ff5e3a 28%, #ff2e7e 50%, #a855f7 74%, #22d3ee 100%)',
        'grad-ember': 'linear-gradient(90deg, #ffbc00 0%, #ff5e3a 100%)',
        'grad-pool': 'linear-gradient(160deg, #7c3aed 0%, #22d3ee 100%)',
        'grad-sunrise': 'radial-gradient(circle at center, #ffbc00 0%, rgba(255,188,0,0) 70%)',
        'grad-magenta': 'linear-gradient(135deg, #ff2e7e 0%, #d43cf0 100%)',
      },
      keyframes: {
        'aurora-drift': {
          '0%,100%': { transform: 'translate3d(0,0,0) scale(1)' },
          '33%': { transform: 'translate3d(6%,-8%,0) scale(1.15)' },
          '66%': { transform: 'translate3d(-7%,5%,0) scale(0.92)' },
        },
        'gradient-pan': {
          '0%,100%': { backgroundPosition: '0% 50%' },
          '50%': { backgroundPosition: '100% 50%' },
        },
        float: {
          '0%,100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(-14px)' },
        },
        blink: { '0%,100%': { opacity: '1' }, '50%': { opacity: '0' } },
        shimmer: {
          '0%': { transform: 'translateX(-120%) skewX(-12deg)' },
          '100%': { transform: 'translateX(220%) skewX(-12deg)' },
        },
        marquee: {
          '0%': { transform: 'translateX(0)' },
          '100%': { transform: 'translateX(-50%)' },
        },
      },
      animation: {
        aurora: 'aurora-drift 20s ease-in-out infinite',
        'aurora-slow': 'aurora-drift 28s ease-in-out infinite',
        pan: 'gradient-pan 8s ease infinite',
        float: 'float 6s ease-in-out infinite',
        blink: 'blink 1.05s step-end infinite',
        shimmer: 'shimmer 2.4s ease-in-out infinite',
        marquee: 'marquee 32s linear infinite',
      },
    },
  },
  plugins: [forms, typography],
}
