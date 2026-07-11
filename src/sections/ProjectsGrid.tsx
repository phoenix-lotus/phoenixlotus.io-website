import { useMemo, useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { FlaskConical } from 'lucide-react'
import SectionHeading from '@/components/SectionHeading'
import ProjectCard from '@/components/ProjectCard'
import { Reveal } from '@/components/Reveal'
import { allProjects, labs, type Category } from '@/data/projects'
import { fadeUp, staggerContainer } from '@/lib/motion'
import { useReveal } from '@/lib/useReveal'
import { cn } from '@/lib/cn'

type Filter = 'all' | Category

const FILTERS: { key: Filter; label: string }[] = [
  { key: 'all', label: 'All' },
  { key: 'app', label: 'Apps' },
  { key: 'ai', label: 'AI' },
  { key: 'client', label: 'Client' },
  { key: 'concept', label: 'Concept' },
]

export default function ProjectsGrid() {
  const [filter, setFilter] = useState<Filter>('all')
  const { ref, inView } = useReveal()

  const filtered = useMemo(
    () => (filter === 'all' ? allProjects : allProjects.filter((p) => p.category.includes(filter))),
    [filter],
  )

  return (
    <section id="projects" className="scroll-mt-24 py-20 md:py-28">
      <div className="container-page">
        <SectionHeading
          eyebrow="Everything"
          title="The full project shelf"
          intro="Marketplaces, AI tools, client work, and the experiments in between."
        />

        {/* filter chips */}
        <Reveal className="mt-8 flex flex-wrap gap-2">
          {FILTERS.map((f) => (
            <button
              key={f.key}
              onClick={() => setFilter(f.key)}
              aria-pressed={filter === f.key}
              className={cn(
                'relative rounded-full px-4 py-2 text-sm font-medium transition-colors',
                filter === f.key ? 'text-white' : 'border border-line bg-surface/60 text-ink-soft hover:text-ink',
              )}
            >
              {filter === f.key && (
                <motion.span
                  layoutId="filter-pill"
                  className="absolute inset-0 -z-10 rounded-full bg-grad-phoenix shadow-phoenix"
                  transition={{ type: 'spring', stiffness: 350, damping: 30 }}
                />
              )}
              {f.label}
            </button>
          ))}
        </Reveal>

        {/* grid */}
        <motion.div
          ref={ref}
          layout
          variants={staggerContainer(0.06)}
          initial="hidden"
          animate={inView ? 'show' : 'hidden'}
          className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-3"
        >
          <AnimatePresence mode="popLayout">
            {filtered.map((project) => (
              <motion.div
                key={project.slug}
                layout
                variants={fadeUp}
                exit={{ opacity: 0, scale: 0.9, transition: { duration: 0.2 } }}
              >
                <ProjectCard project={project} />
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>

        {/* Labs strip */}
        <Reveal className="mt-14">
          <div className="glass rounded-xl p-6 sm:p-8">
            <div className="mb-4 flex items-center gap-2">
              <FlaskConical size={18} className="text-lotus-500" />
              <h3 className="font-display text-lg font-bold text-ink">Labs</h3>
              <span className="font-mono text-xs text-muted">· earlier-stage experiments</span>
            </div>
            <ul className="grid gap-3 sm:grid-cols-3">
              {labs.map((lab) => (
                <li key={lab.name} className="rounded-lg border border-line bg-base/50 p-4">
                  <p className="font-semibold text-ink">{lab.name}</p>
                  <p className="mt-1 text-sm text-ink-soft">{lab.blurb}</p>
                </li>
              ))}
            </ul>
          </div>
        </Reveal>
      </div>
    </section>
  )
}
