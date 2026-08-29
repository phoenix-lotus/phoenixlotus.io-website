import { motion } from 'framer-motion'
import type { PaymentOption } from '@/data/services'
import { THEME } from '@/lib/themes'
import { fadeUp } from '@/lib/motion'
import { cn } from '@/lib/cn'

/**
 * One "ways to pay" card. Rendered twice: on /services with the option's
 * full `body`, and in the home page's teaser with its one-line `summary`.
 * Shared rather than copied so the prose length is the only thing that
 * differs between the two surfaces — a second hand-built copy of this
 * markup would drift the first time either card is restyled.
 *
 * Animates with `fadeUp`, so it expects a <Stagger> parent.
 */
export default function PaymentOptionCard({
  option,
  blurb,
}: {
  option: PaymentOption
  blurb: string
}) {
  const t = THEME[option.theme]
  return (
    <motion.li
      variants={fadeUp}
      className={cn(
        'flex flex-col rounded-2xl border p-6 transition-shadow',
        option.recommended
          ? cn('border-lotus-500 bg-surface', t.shadow)
          : 'border-line bg-surface/60 backdrop-blur hover:shadow-soft',
      )}
    >
      <div className="flex items-center gap-3">
        <span className={cn('h-8 w-1.5 shrink-0 rounded-full', t.gradient)} aria-hidden />
        {/* The pill lives inside the h3 so heading navigation announces
            "Rent it Recommended" — as a sibling it was a floating word. */}
        <h3 className="flex flex-1 items-center gap-3 font-mono text-xs uppercase tracking-widest text-muted">
          {option.eyebrow}
          {option.recommended && (
            <span className="ml-auto inline-flex shrink-0 items-center gap-1.5 whitespace-nowrap rounded-full border border-lotus-500 bg-surface px-2.5 py-1 font-medium tracking-widest text-ink">
              <span className={cn('h-1.5 w-1.5 rounded-full', t.gradient)} aria-hidden />
              Recommended
            </span>
          )}
        </h3>
      </div>
      <p className="mt-5 flex items-baseline gap-1.5">
        <span className="font-display text-3xl font-extrabold text-ink">{option.price}</span>
        <span className="text-sm text-ink-soft">{option.cadence}</span>
      </p>
      {option.note && <p className="mt-1.5 text-sm text-ink-soft">{option.note}</p>}
      <p className="mt-4 leading-relaxed text-ink-soft">{blurb}</p>
    </motion.li>
  )
}
