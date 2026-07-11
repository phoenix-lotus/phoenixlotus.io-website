import { motion, useScroll, useSpring } from 'framer-motion'

/** Thin aurora-gradient progress bar pinned to the top of the viewport. */
export default function ScrollProgress() {
  const { scrollYProgress } = useScroll()
  const scaleX = useSpring(scrollYProgress, { stiffness: 120, damping: 26, restDelta: 0.001 })
  return (
    <motion.div
      className="fixed inset-x-0 top-0 z-[70] h-[3px] origin-left bg-grad-aurora"
      style={{ scaleX }}
      aria-hidden
    />
  )
}
