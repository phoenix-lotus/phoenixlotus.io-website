import { useEffect, useRef, useState } from 'react'

/**
 * Robust scroll-reveal trigger. Uses IntersectionObserver for the normal case,
 * plus a passive scroll/resize listener AND a short bounded position-poll that
 * reads getBoundingClientRect directly. The poll guarantees content is never
 * left stuck invisible on deep-link loads or programmatic jumps where a bare
 * `whileInView` observer can miss the intersection.
 */
export function useReveal<T extends HTMLElement = HTMLDivElement>(rootMarginBottom = '-10%') {
  const ref = useRef<T>(null)
  const [inView, setInView] = useState(false)

  useEffect(() => {
    if (inView) return
    const el = ref.current
    if (!el) return

    let done = false
    const nearViewport = () => {
      const r = el.getBoundingClientRect()
      return r.top < window.innerHeight * 0.92 && r.bottom > 0
    }
    const reveal = () => {
      if (done) return
      done = true
      cleanup()
      setInView(true)
    }

    // 1) Above-the-fold on mount → reveal immediately.
    if (nearViewport()) {
      setInView(true)
      return
    }

    // 2) IntersectionObserver — the efficient path for normal scrolling.
    let io: IntersectionObserver | null = null
    if ('IntersectionObserver' in window) {
      io = new IntersectionObserver(
        (entries) => entries.some((e) => e.isIntersecting) && reveal(),
        { rootMargin: `0px 0px ${rootMarginBottom} 0px` },
      )
      io.observe(el)
    }

    // 3) Passive scroll/resize listeners (belt).
    const onScroll = () => nearViewport() && reveal()
    window.addEventListener('scroll', onScroll, { passive: true })
    window.addEventListener('resize', onScroll, { passive: true })

    // 4) Bounded position-poll (suspenders): reads layout directly, so it works
    //    even when scroll events or IO don't fire (deep-links, programmatic jumps).
    const start = performance.now()
    let raf = 0
    let lastCheck = 0
    const tick = (ts: number) => {
      if (done) return
      if (ts - lastCheck > 180) {
        lastCheck = ts
        if (nearViewport()) return reveal()
      }
      if (ts - start < 4000) raf = requestAnimationFrame(tick)
    }
    raf = requestAnimationFrame(tick)

    function cleanup() {
      io?.disconnect()
      window.removeEventListener('scroll', onScroll)
      window.removeEventListener('resize', onScroll)
      cancelAnimationFrame(raf)
    }
    return cleanup
  }, [inView, rootMarginBottom])

  return { ref, inView }
}
