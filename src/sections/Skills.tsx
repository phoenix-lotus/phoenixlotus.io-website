import { useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { ChevronDown } from 'lucide-react'
import SectionHeading from '@/components/SectionHeading'
import GradientText from '@/components/GradientText'
import { Reveal } from '@/components/Reveal'
import { skillGroups, type SkillGroup } from '@/data/skills'
import { THEME } from '@/lib/themes'
import { EASE, fadeUp, staggerContainer } from '@/lib/motion'
import { useReveal } from '@/lib/useReveal'
import { cn } from '@/lib/cn'

export default function Skills() {
  const { ref, inView } = useReveal()
  return (
    <section id="skills" className="scroll-mt-24 bg-warm/40 py-20 md:py-28">
      <div className="container-page">
        <SectionHeading
          eyebrow="Toolkit"
          title={
            <>
              What we <GradientText>build with</GradientText>
            </>
          }
          intro="The same toolkit behind a five-page site for a local shop and a marketplace built around real payment paths. Whatever gets built stays ordinary web files on ordinary hosting — not a platform account you have to keep renting to stay online."
          align="center"
        />

        <Reveal delay={0.15} className="mt-5 text-center">
          <p className="text-sm text-ink-soft">
            Tap any of these for the plain-English version.
          </p>
        </Reveal>

        <motion.div
          ref={ref}
          variants={staggerContainer(0.1)}
          initial="hidden"
          animate={inView ? 'show' : 'hidden'}
          className="mt-10 grid gap-5 md:grid-cols-2 lg:grid-cols-3"
        >
          {skillGroups.map((group) => (
            <SkillCard key={group.title} group={group} />
          ))}
        </motion.div>
      </div>
    </section>
  )
}

function SkillCard({ group }: { group: SkillGroup }) {
  const [openName, setOpenName] = useState<string | null>(null)
  const t = THEME[group.theme]
  const open = group.skills.find((s) => s.name === openName)
  const panelId = `toolkit-${group.title.toLowerCase().replace(/[^a-z]+/g, '-')}`

  return (
    <motion.div
      variants={fadeUp}
      className="group rounded-xl border border-line bg-surface/70 p-6 backdrop-blur transition-shadow hover:shadow-soft"
    >
      <div className="mb-4 flex items-center gap-3">
        <span className={cn('h-8 w-1.5 rounded-full', t.gradient)} aria-hidden />
        <h3 className="font-display text-lg font-bold text-ink">{group.title}</h3>
      </div>

      <ul
        className="flex flex-wrap gap-2"
        onKeyDown={(e) => e.key === 'Escape' && setOpenName(null)}
      >
        {group.skills.map((skill) => {
          const isOpen = skill.name === openName
          return (
            <li key={skill.name}>
              <button
                type="button"
                onClick={() => setOpenName(isOpen ? null : skill.name)}
                aria-expanded={isOpen}
                aria-controls={panelId}
                className={cn(
                  'flex items-center gap-1.5 rounded-lg border px-3 py-1.5 text-sm transition-all',
                  isOpen
                    ? 'border-transparent bg-ink/[0.07] font-medium text-ink shadow-soft'
                    : 'border-line bg-base/60 text-ink-soft hover:-translate-y-0.5 hover:border-transparent hover:text-ink hover:shadow-soft',
                )}
              >
                {skill.name}
                <ChevronDown
                  size={13}
                  aria-hidden
                  className={cn('opacity-50 transition-transform', isOpen && 'rotate-180 opacity-100')}
                />
              </button>
            </li>
          )
        })}
      </ul>

      <div id={panelId}>
        <AnimatePresence initial={false}>
          {open && (
            <motion.div
              key="panel"
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: 'auto', opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: 0.28, ease: EASE }}
              className="overflow-hidden"
            >
              <div className="mt-4 flex gap-3 rounded-lg border border-line bg-base/60 p-4">
                <span className={cn('w-1 shrink-0 rounded-full', t.gradient)} aria-hidden />
                <motion.div
                  key={open.name}
                  initial={{ opacity: 0, y: 4 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.2, ease: EASE }}
                >
                  <p className="font-mono text-xs uppercase tracking-[0.15em] text-ink">
                    {open.name}
                  </p>
                  <p className="mt-2 text-sm leading-relaxed text-ink-soft">{open.plain}</p>
                </motion.div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </motion.div>
  )
}
