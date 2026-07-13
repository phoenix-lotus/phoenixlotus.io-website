import { useId } from 'react'
import { cn } from '@/lib/cn'

/**
 * PhoenixLotus mark — a front-facing, five-petal lotus bloom whose petals are
 * flame tongues, rising from a cool waterline. A single vertical heat gradient
 * runs white-hot amber at the base up to cool cyan/violet at the tips, so the
 * flower glows like fire where it meets the water: the phoenix → lotus story in
 * one glyph. Pure SVG so it stays crisp and recolors with the theme.
 */
export default function Logo({ className, showWord = true }: { className?: string; showWord?: boolean }) {
  const uid = useId()
  const flame = `pl-flame-${uid}`
  const water = `pl-water-${uid}`
  return (
    <span className={cn('inline-flex items-center gap-2.5', className)}>
      <svg viewBox="0 0 48 48" className="h-8 w-8 shrink-0" role="img" aria-label="PhoenixLotus">
        <defs>
          {/* heat gradient: hot amber at the waterline → cool cyan/violet at the tips */}
          <linearGradient id={flame} x1="24" y1="40" x2="24" y2="5" gradientUnits="userSpaceOnUse">
            <stop offset="0" stopColor="#ffbc00" />
            <stop offset="0.18" stopColor="#ff8a1e" />
            <stop offset="0.36" stopColor="#ff5e3a" />
            <stop offset="0.5" stopColor="#ff2e7e" />
            <stop offset="0.68" stopColor="#a855f7" />
            <stop offset="0.84" stopColor="#7c3aed" />
            <stop offset="1" stopColor="#22d3ee" />
          </linearGradient>
          <linearGradient id={water} x1="11" y1="40" x2="37" y2="40" gradientUnits="userSpaceOnUse">
            <stop offset="0" stopColor="#22d3ee" />
            <stop offset="1" stopColor="#7c3aed" />
          </linearGradient>
        </defs>

        {/* outer petals — reclined, forming the open lotus bowl (sit behind for depth) */}
        <path
          d="M24 38 C 16 37 9 34 6.8 27.5 C 5.8 24.5 6 22 6.5 20.5 C 9.5 24 15 28.5 19.5 31.5 C 22 33.5 23.2 35.5 24 38 Z"
          fill={`url(#${flame})`}
          opacity="0.85"
        />
        <path
          d="M24 38 C 32 37 39 34 41.2 27.5 C 42.2 24.5 42 22 41.5 20.5 C 38.5 24 33 28.5 28.5 31.5 C 26 33.5 24.8 35.5 24 38 Z"
          fill={`url(#${flame})`}
          opacity="0.85"
        />

        {/* inner petals — leaning out, tips licking up-and-outward */}
        <path
          d="M23 37 C 17 33 13 27 12.5 19 C 12.3 15 13 12.5 14.5 11 C 16 14 18.5 18 20.5 23 C 22 28 22.7 32.5 23 37 Z"
          fill={`url(#${flame})`}
        />
        <path
          d="M25 37 C 31 33 35 27 35.5 19 C 35.7 15 35 12.5 33.5 11 C 32 14 29.5 18 27.5 23 C 26 28 25.3 32.5 25 37 Z"
          fill={`url(#${flame})`}
        />

        {/* center petal — the candle flame, tip flicking slightly */}
        <path
          d="M24 37 C 18.5 31 18 22 20.5 14 C 22 9.5 23.5 7 25 5 C 27 9 29.5 16 29 24 C 28.7 30 27 34 24 37 Z"
          fill={`url(#${flame})`}
        />

        {/* white-hot core — the flame's heart / flower's throat */}
        <path d="M24 32 C 22 29 22 24 24 21 C 26 24 26 29 24 32 Z" fill="#fff1cf" opacity="0.9" />

        {/* cool waterline, broken beneath the bloom */}
        <path d="M11 40 L 21 40" stroke={`url(#${water})`} strokeWidth="2" strokeLinecap="round" fill="none" />
        <path d="M27 40 L 37 40" stroke={`url(#${water})`} strokeWidth="2" strokeLinecap="round" fill="none" />
      </svg>
      {showWord && (
        <span className="font-display text-lg font-extrabold tracking-tight text-ink">
          Phoenix<span className="text-gradient">Lotus</span>
        </span>
      )}
    </span>
  )
}
