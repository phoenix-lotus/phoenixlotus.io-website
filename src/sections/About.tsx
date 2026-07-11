import { motion } from 'framer-motion'
import { MapPin, Plane } from 'lucide-react'
import SectionHeading from '@/components/SectionHeading'
import { Reveal, Stagger } from '@/components/Reveal'
import Logo from '@/components/Logo'
import GradientText from '@/components/GradientText'
import { site } from '@/data/site'
import { facts } from '@/data/skills'
import { fadeUp } from '@/lib/motion'
import { useReveal } from '@/lib/useReveal'

export default function About() {
  const { ref, inView } = useReveal()
  return (
    <section id="about" className="scroll-mt-24 py-20 md:py-28">
      <div className="container-page grid items-center gap-12 lg:grid-cols-[0.9fr_1.1fr] lg:gap-16">
        {/* Designed portrait panel */}
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 40 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7 }}
          className="relative order-1"
        >
          <div className="relative overflow-hidden rounded-2xl bg-grad-aurora p-8 text-white shadow-lift [background-size:180%] motion-safe-anim animate-pan">
            <div className="pointer-events-none absolute -right-10 -top-10 h-44 w-44 rounded-full bg-white/20 blur-2xl motion-safe-anim animate-float" aria-hidden />
            <div
              className="pointer-events-none absolute inset-0 opacity-10"
              style={{
                backgroundImage:
                  'linear-gradient(rgba(255,255,255,.7) 1px,transparent 1px),linear-gradient(90deg,rgba(255,255,255,.7) 1px,transparent 1px)',
                backgroundSize: '32px 32px',
              }}
              aria-hidden
            />
            <div className="relative">
              <div className="grid h-20 w-20 place-items-center rounded-2xl bg-white/20 backdrop-blur">
                <Logo showWord={false} className="[&_svg]:h-12 [&_svg]:w-12" />
              </div>
              <p className="mt-6 font-display text-3xl font-extrabold leading-tight">
                {site.name}
              </p>
              <p className="mt-1 text-white/85">{site.role}</p>
              <div className="mt-6 flex flex-wrap gap-2 text-sm">
                <span className="inline-flex items-center gap-1.5 rounded-full bg-white/15 px-3 py-1 backdrop-blur">
                  <MapPin size={14} /> {site.location}
                </span>
                <span className="inline-flex items-center gap-1.5 rounded-full bg-white/15 px-3 py-1 backdrop-blur">
                  <Plane size={14} /> Licensed pilot
                </span>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Bio */}
        <div className="order-2">
          <SectionHeading
            eyebrow="About"
            title={
              <>
                Rising &amp; <GradientText>growing</GradientText> — the PhoenixLotus story
              </>
            }
          />
          <Reveal className="mt-5">
            <p className="text-lg leading-relaxed text-ink-soft">{site.blurb}</p>
          </Reveal>
          <Reveal delay={0.05} className="mt-4">
            <p className="text-lg leading-relaxed text-ink-soft">{site.blurb2}</p>
          </Reveal>

          <Stagger as="ul" className="mt-8 grid grid-cols-2 gap-4 sm:grid-cols-4">
            {facts.map((f) => (
              <motion.li
                key={f.label}
                variants={fadeUp}
                className="rounded-xl border border-line bg-surface/60 p-4 text-center backdrop-blur"
              >
                <p className="font-display text-2xl font-extrabold text-gradient sm:text-3xl">{f.value}</p>
                <p className="mt-1 text-xs text-ink-soft">{f.label}</p>
              </motion.li>
            ))}
          </Stagger>
        </div>
      </div>
    </section>
  )
}
