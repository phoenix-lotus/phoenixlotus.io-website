import type { ReactNode } from 'react'
import { Reveal } from './Reveal'
import { cn } from '@/lib/cn'

export default function SectionHeading({
  eyebrow,
  title,
  intro,
  align = 'left',
  className,
}: {
  eyebrow?: string
  title: ReactNode
  intro?: ReactNode
  align?: 'left' | 'center'
  className?: string
}) {
  return (
    <div className={cn(align === 'center' && 'mx-auto max-w-2xl text-center', className)}>
      {eyebrow && (
        <Reveal>
          <p
            className={cn(
              'mb-3 flex items-center gap-2 font-mono text-xs uppercase tracking-[0.2em] text-phoenix-600',
              align === 'center' && 'justify-center',
            )}
          >
            <span className="h-px w-6 bg-grad-phoenix" aria-hidden />
            {eyebrow}
          </p>
        </Reveal>
      )}
      <Reveal delay={0.05}>
        <h2 className="text-display font-extrabold text-ink">{title}</h2>
      </Reveal>
      {intro && (
        <Reveal delay={0.1}>
          <p className={cn('mt-4 text-lg leading-relaxed text-ink-soft', align === 'center' ? 'mx-auto max-w-xl' : 'max-w-2xl')}>
            {intro}
          </p>
        </Reveal>
      )}
    </div>
  )
}
