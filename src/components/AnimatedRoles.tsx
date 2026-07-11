import { useEffect, useState } from 'react'
import { AnimatePresence, motion, useReducedMotion } from 'framer-motion'
import { EASE } from '@/lib/motion'
import { cn } from '@/lib/cn'

/** Cycles through roles with a vertical word-swap + blinking caret. Static under reduced motion. */
export default function AnimatedRoles({
  roles,
  className,
  interval = 2200,
}: {
  roles: readonly string[]
  className?: string
  interval?: number
}) {
  const reduce = useReducedMotion()
  const [i, setI] = useState(0)

  useEffect(() => {
    if (reduce) return
    const id = window.setInterval(() => setI((n) => (n + 1) % roles.length), interval)
    return () => window.clearInterval(id)
  }, [reduce, roles.length, interval])

  if (reduce) {
    return (
      <span className={cn('text-gradient', className)}>
        {roles[0]}
        <span className="text-phoenix-600">.</span>
      </span>
    )
  }

  return (
    <span className={cn('relative inline-flex items-baseline', className)}>
      <span className="relative inline-grid">
        <AnimatePresence mode="popLayout" initial={false}>
          <motion.span
            key={i}
            className="text-gradient col-start-1 row-start-1"
            initial={{ y: '0.6em', opacity: 0, filter: 'blur(6px)' }}
            animate={{ y: 0, opacity: 1, filter: 'blur(0px)' }}
            exit={{ y: '-0.6em', opacity: 0, filter: 'blur(6px)' }}
            transition={{ duration: 0.5, ease: EASE }}
          >
            {roles[i]}
          </motion.span>
        </AnimatePresence>
      </span>
      <span className="ml-0.5 inline-block w-[3px] self-stretch translate-y-[0.06em] bg-grad-phoenix animate-blink" aria-hidden />
    </span>
  )
}
