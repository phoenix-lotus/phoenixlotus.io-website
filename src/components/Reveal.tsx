import { motion, type Variants } from 'framer-motion'
import type { ReactNode } from 'react'
import { fadeUp, staggerContainer } from '@/lib/motion'
import { useReveal } from '@/lib/useReveal'

type Tag = 'div' | 'section' | 'li' | 'span' | 'ul'

/** Scroll-reveal a single block (fade-up), backed by the robust useReveal hook. */
export function Reveal({
  children,
  className,
  delay = 0,
  as = 'div',
  variants = fadeUp,
}: {
  children: ReactNode
  className?: string
  delay?: number
  as?: Tag
  variants?: Variants
}) {
  const { ref, inView } = useReveal()
  const Comp = motion[as] as typeof motion.div
  return (
    <Comp
      ref={ref as React.Ref<HTMLDivElement>}
      className={className}
      variants={variants}
      initial="hidden"
      animate={inView ? 'show' : 'hidden'}
      transition={{ delay }}
    >
      {children}
    </Comp>
  )
}

/** Container that staggers its children (use RevealItem or motion children with fadeUp). */
export function Stagger({
  children,
  className,
  stagger = 0.08,
  as = 'div',
}: {
  children: ReactNode
  className?: string
  stagger?: number
  as?: Tag
}) {
  const { ref, inView } = useReveal()
  const Comp = motion[as] as typeof motion.div
  return (
    <Comp
      ref={ref as React.Ref<HTMLDivElement>}
      className={className}
      variants={staggerContainer(stagger)}
      initial="hidden"
      animate={inView ? 'show' : 'hidden'}
    >
      {children}
    </Comp>
  )
}
