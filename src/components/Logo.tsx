import { cn } from '@/lib/cn'

/**
 * PhoenixLotus mark — an abstract phoenix-wing / lotus-petal glyph rendered in
 * the brand gradient. Pure SVG so it stays crisp and recolors with the theme.
 */
export default function Logo({ className, showWord = true }: { className?: string; showWord?: boolean }) {
  return (
    <span className={cn('inline-flex items-center gap-2.5', className)}>
      <svg
        viewBox="0 0 48 48"
        className="h-8 w-8 shrink-0"
        role="img"
        aria-label="PhoenixLotus"
      >
        <defs>
          <linearGradient id="pl-mark" x1="0" y1="0" x2="48" y2="48" gradientUnits="userSpaceOnUse">
            <stop offset="0" stopColor="#ffbc00" />
            <stop offset="0.5" stopColor="#ff2e7e" />
            <stop offset="1" stopColor="#a855f7" />
          </linearGradient>
        </defs>
        {/* rising centre petal / flame */}
        <path
          d="M24 3c3.6 7 3.6 13.4 0 22-3.6-8.6-3.6-15 0-22Z"
          fill="url(#pl-mark)"
        />
        {/* left wing / petal */}
        <path
          d="M24 27C16 22 9 22 4 26c6 2 9 6 11 12 3-4 6-7 9-11Z"
          fill="url(#pl-mark)"
          opacity="0.85"
        />
        {/* right wing / petal */}
        <path
          d="M24 27c8-5 15-5 20-1-6 2-9 6-11 12-3-4-6-7-9-11Z"
          fill="url(#pl-mark)"
          opacity="0.85"
        />
        {/* base pool line */}
        <path d="M13 41c7 3 15 3 22 0" stroke="url(#pl-mark)" strokeWidth="2.5" strokeLinecap="round" fill="none" />
      </svg>
      {showWord && (
        <span className="font-display text-lg font-extrabold tracking-tight text-ink">
          Phoenix<span className="text-gradient">Lotus</span>
        </span>
      )}
    </span>
  )
}
