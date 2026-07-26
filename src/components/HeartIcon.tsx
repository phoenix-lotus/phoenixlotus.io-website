/**
 * The PhoenixLotus signature mark for "Made with love in Mendocino County, CA"
 * footer credits — golden-to-ember gradient heart, sized to sit inline with
 * surrounding text. Portable: copy this file verbatim into any future
 * PhoenixLotus site alongside the same footer sentence.
 */
export default function HeartIcon() {
  return (
    <svg
      aria-hidden="true"
      viewBox="0 0 24 24"
      className="inline-block h-[0.9em] w-[0.9em] -translate-y-[0.06em] align-middle"
    >
      <defs>
        <linearGradient id="phoenixlotus-heart" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#FFD24C" />
          <stop offset="50%" stopColor="#FF7A18" />
          <stop offset="100%" stopColor="#D6291B" />
        </linearGradient>
      </defs>
      <path
        fill="url(#phoenixlotus-heart)"
        d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"
      />
    </svg>
  )
}
