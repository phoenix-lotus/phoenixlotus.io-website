import { motion } from 'framer-motion'
import { MapPin } from 'lucide-react'
import SectionHeading from '@/components/SectionHeading'
import { Reveal, Stagger } from '@/components/Reveal'
import Logo from '@/components/Logo'
import GradientText from '@/components/GradientText'
import { site } from '@/data/site'
import { facts } from '@/data/skills'
import { fadeUp } from '@/lib/motion'
import { useReveal } from '@/lib/useReveal'

// site.name/site.role stay Robert-only (footer copyright, <title> tags, the
// JSON-LD founder/legalName) — this card is the one place both co-founders
// are introduced together, so it gets its own short list rather than
// repurposing those fields for two people.
const TEAM = [
  { name: 'Robert Goldberg', role: site.role },
  { name: 'Katie Goldberg', role: 'Chief writer and editor' },
]

export default function About() {
  const { ref, inView } = useReveal()
  return (
    <section id="about" className="scroll-mt-24 py-20 md:py-28">
      <div className="container-page">
        <SectionHeading
          eyebrow="About"
          title={
            <>
              Who you’d actually be <GradientText>hiring</GradientText>
            </>
          }
        />
        <Reveal className="mt-5 max-w-2xl">
          <p className="text-lg leading-relaxed text-ink-soft">{site.blurb}</p>
        </Reveal>
        <Reveal delay={0.05} className="mt-4 max-w-2xl">
          <p className="text-lg leading-relaxed text-ink-soft">{site.blurb2}</p>
        </Reveal>

        <Stagger as="ul" className="mt-8 grid max-w-2xl grid-cols-2 gap-4 sm:grid-cols-4">
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

        {/* Signature card — closes the section, so it reads as "here's who's
            actually behind everything above" rather than a leading portrait. */}
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 40 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7 }}
          className="relative mt-12"
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
            <div className="relative flex flex-col gap-8 lg:flex-row lg:items-center lg:justify-between">
              <div className="flex items-center gap-5">
                <div className="grid h-16 w-16 shrink-0 place-items-center rounded-2xl bg-white/20 backdrop-blur">
                  <Logo showWord={false} className="[&_svg]:h-9 [&_svg]:w-9" />
                </div>
                <div className="flex flex-col gap-4 sm:flex-row sm:gap-8">
                  {TEAM.map((person) => (
                    <div key={person.name}>
                      <p className="font-display text-xl font-extrabold leading-tight">
                        {person.name}
                      </p>
                      <p className="mt-0.5 text-sm text-white/85">{person.role}</p>
                    </div>
                  ))}
                </div>
              </div>

              <div className="flex flex-wrap gap-2 text-sm">
                <span className="inline-flex items-center gap-1.5 rounded-full bg-white/15 px-3 py-1 backdrop-blur">
                  <MapPin size={14} /> {site.location}
                </span>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  )
}
