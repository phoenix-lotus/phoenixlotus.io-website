import { useEffect, useRef, useState } from 'react'
import { useReducedMotion } from 'framer-motion'
import { cn } from '@/lib/cn'

/**
 * Letter-by-letter typewriter cycling through `words`, with a visible caret.
 * Deliberately slow (Bobby, 2026-08-20: "slow the cursor effect so that it
 * is visible") — this is a display element, not a loading state. Mounts with
 * words[0] fully typed so the hero's largest text never pops in empty, then
 * starts cycling after `startDelayMs`. Static under reduced motion, same
 * contract as the reduced-motion handling this repo has always used.
 * Rendered aria-hidden by the caller, which owns
 * the sr-only static text — screen readers must never hear letter-by-letter.
 */
export default function TypewriterWords({
  words,
  className,
  typeMs = 105,
  deleteMs = 55,
  holdMs = 2600,
  startDelayMs = 2200,
}: {
  words: readonly string[]
  className?: string
  typeMs?: number
  deleteMs?: number
  holdMs?: number
  startDelayMs?: number
}) {
  const reduce = useReducedMotion()
  const [wordIndex, setWordIndex] = useState(0)
  const [chars, setChars] = useState(words[0].length)
  const [phase, setPhase] = useState<'hold' | 'deleting' | 'typing'>('hold')
  const started = useRef(false)

  useEffect(() => {
    if (reduce) return
    let delay: number
    if (phase === 'hold') {
      delay = started.current ? holdMs : startDelayMs
    } else {
      delay = phase === 'deleting' ? deleteMs : typeMs
    }
    const id = window.setTimeout(() => {
      if (phase === 'hold') {
        started.current = true
        setPhase('deleting')
      } else if (phase === 'deleting') {
        if (chars > 0) setChars(chars - 1)
        else {
          setWordIndex((wordIndex + 1) % words.length)
          setPhase('typing')
        }
      } else {
        const target = words[wordIndex].length
        if (chars < target) setChars(chars + 1)
        else setPhase('hold')
      }
    }, delay)
    return () => window.clearTimeout(id)
  }, [reduce, phase, chars, wordIndex, words, typeMs, deleteMs, holdMs, startDelayMs])

  if (reduce) {
    return <span className={cn('text-gradient', className)}>{words[0]}</span>
  }

  return (
    <span className={cn('inline-flex items-baseline', className)}>
      {/* zero-width space keeps the line height when zero chars are shown */}
      <span className="text-gradient">{words[wordIndex].slice(0, chars) || '​'}</span>
      <span
        className={cn(
          'ml-1 inline-block w-[3px] self-stretch translate-y-[0.06em] bg-grad-phoenix',
          phase === 'hold' && 'animate-blink',
        )}
        aria-hidden
      />
    </span>
  )
}
