import { motion } from 'framer-motion'
import SectionHeading from '@/components/SectionHeading'
import GradientText from '@/components/GradientText'
import { skillGroups } from '@/data/skills'
import { THEME } from '@/lib/themes'
import { fadeUp, staggerContainer } from '@/lib/motion'
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
              What I <GradientText>build with</GradientText>
            </>
          }
          intro="A full-stack, AI-native toolkit — everything needed to take a product from an empty repo to a native app in the store."
          align="center"
        />

        <motion.div
          ref={ref}
          variants={staggerContainer(0.1)}
          initial="hidden"
          animate={inView ? 'show' : 'hidden'}
          className="mt-14 grid gap-5 md:grid-cols-2 lg:grid-cols-3"
        >
          {skillGroups.map((group) => {
            const t = THEME[group.theme]
            return (
              <motion.div
                key={group.title}
                variants={fadeUp}
                className="group rounded-xl border border-line bg-surface/70 p-6 backdrop-blur transition-shadow hover:shadow-soft"
              >
                <div className="mb-4 flex items-center gap-3">
                  <span className={cn('h-8 w-1.5 rounded-full', t.gradient)} aria-hidden />
                  <h3 className="font-display text-lg font-bold text-ink">{group.title}</h3>
                </div>
                <ul className="flex flex-wrap gap-2">
                  {group.skills.map((skill) => (
                    <li
                      key={skill}
                      className="rounded-lg border border-line bg-base/60 px-3 py-1.5 text-sm text-ink-soft transition-all hover:-translate-y-0.5 hover:border-transparent hover:text-ink hover:shadow-soft"
                    >
                      {skill}
                    </li>
                  ))}
                </ul>
              </motion.div>
            )
          })}
        </motion.div>
      </div>
    </section>
  )
}
