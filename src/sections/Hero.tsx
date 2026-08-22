import { motion } from 'framer-motion'
import { ArrowDown, ArrowRight, Sparkles } from 'lucide-react'
import AuroraBackground from '@/components/AuroraBackground'
import GradientButton from '@/components/GradientButton'
import SocialLinks from '@/components/SocialLinks'
import TypewriterWords from '@/components/TypewriterWords'

// Module-level so the array identity is stable — TypewriterWords keys its
// timer effect on `words`, and a fresh literal per render would reschedule
// the pending timeout on every parent re-render.
const TYPEWRITER_WORDS = ['Web design', 'SEO', 'Marketing'] as const
import { site } from '@/data/site'
import { EASE } from '@/lib/motion'

const container = {
  hidden: {},
  show: { transition: { staggerChildren: 0.09, delayChildren: 0.25 } },
}
const item = {
  hidden: { opacity: 0, y: 26 },
  show: { opacity: 1, y: 0, transition: { duration: 0.65, ease: EASE } },
}

export default function Hero() {
  return (
    <section className="relative flex min-h-[100svh] items-center overflow-hidden pt-28 pb-16">
      <AuroraBackground />

      <div className="container-page">
        <motion.div variants={container} initial="hidden" animate="show" className="max-w-4xl">
          <motion.p
            variants={item}
            className="mb-6 inline-flex items-center gap-2 rounded-full border border-line bg-surface/60 px-4 py-1.5 font-mono text-xs text-ink-soft backdrop-blur"
          >
            <span className="relative flex h-2 w-2">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-phoenix-600 opacity-70" />
              <span className="relative inline-flex h-2 w-2 rounded-full bg-phoenix-600" />
            </span>
            {site.location} · Web design &amp; marketing
          </motion.p>

          {/* The animated slot sits on its own line so typing never reflows
              the rest of the sentence — the words differ in width, and a
              heading that shifts mid-sentence reads as broken, not animated. */}
          <motion.h1 variants={item} className="text-hero font-extrabold text-ink">
            <span className="sr-only">
              Web design, SEO, and marketing for your business, done right.
            </span>
            <span aria-hidden="true">
              <TypewriterWords words={TYPEWRITER_WORDS} />
              <br />
              for your business, done right.
            </span>
          </motion.h1>

          <motion.p variants={item} className="mt-6 text-xl font-medium text-ink-soft sm:text-2xl">
            {site.heroSub}
          </motion.p>

          <motion.p
            variants={item}
            className="mt-5 max-w-2xl text-lg leading-relaxed text-ink-soft"
          >
            {site.blurb}
          </motion.p>

          <motion.div
            variants={item}
            className="mt-9 flex flex-col gap-3 sm:flex-row sm:items-center"
          >
            <GradientButton to="/services" size="lg" magnetic>
              Services &amp; pricing
              <ArrowRight size={18} />
            </GradientButton>
            <GradientButton to="/process" size="lg" variant="glass">
              <Sparkles size={16} className="text-phoenix-600" />
              How we work
            </GradientButton>
          </motion.div>

          <motion.div variants={item} className="mt-10">
            <SocialLinks />
          </motion.div>
        </motion.div>
      </div>

      {/* scroll cue */}
      <motion.a
        href="#studio"
        aria-label="Scroll to what the studio does"
        className="absolute bottom-6 left-1/2 hidden -translate-x-1/2 flex-col items-center gap-1 text-muted sm:flex"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.4, duration: 0.8 }}
      >
        <span className="font-mono text-[10px] uppercase tracking-[0.25em]">Scroll</span>
        <motion.span
          animate={{ y: [0, 6, 0] }}
          transition={{ duration: 1.6, repeat: Infinity, ease: 'easeInOut' }}
        >
          <ArrowDown size={16} />
        </motion.span>
      </motion.a>
    </section>
  )
}
