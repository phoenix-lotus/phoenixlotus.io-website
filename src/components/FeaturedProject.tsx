import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { ArrowUpRight, ExternalLink } from 'lucide-react'
import type { Project } from '@/data/projects'
import { THEME } from '@/lib/themes'
import { fadeUp, EASE } from '@/lib/motion'
import { useReveal } from '@/lib/useReveal'
import DeviceMockup from './DeviceMockup'
import { StatusBadge, TechChip } from './Badges'
import GradientButton from './GradientButton'
import { cn } from '@/lib/cn'

export default function FeaturedProject({ project, index }: { project: Project; index: number }) {
  const reverse = index % 2 === 1
  const t = THEME[project.colorTheme]
  const isPhone = project.media[0].frame === 'phone'
  const { ref, inView } = useReveal()

  return (
    <div ref={ref} className="grid items-center gap-8 lg:grid-cols-2 lg:gap-14">
      {/* Visual */}
      <motion.div
        initial={{ opacity: 0, y: 40, rotate: reverse ? 1.5 : -1.5 }}
        animate={inView ? { opacity: 1, y: 0, rotate: reverse ? 1 : -1 } : {}}
        transition={{ duration: 0.7, ease: EASE }}
        className={cn('relative', reverse && 'lg:order-2')}
      >
        {/* colored glow */}
        <div
          className="absolute inset-6 -z-10 rounded-full opacity-50 blur-3xl"
          style={{ background: t.glow }}
          aria-hidden
        />
        <div className={cn(isPhone && 'mx-auto max-w-[16rem]')}>
          <DeviceMockup project={project} eager={index === 0} />
        </div>
      </motion.div>

      {/* Copy */}
      <motion.div
        variants={fadeUp}
        initial="hidden"
        animate={inView ? 'show' : 'hidden'}
        className={cn(reverse && 'lg:order-1')}
      >
        <div className="mb-4 flex items-center gap-3">
          <span className={cn('font-mono text-sm font-semibold', t.text)}>0{index + 1}</span>
          <StatusBadge status={project.status} />
        </div>
        <h3 className="font-display text-title font-extrabold text-ink sm:text-4xl">{project.title}</h3>
        <p className={cn('mt-2 text-lg font-semibold', t.text)}>{project.tagline}</p>
        <p className="mt-4 max-w-xl leading-relaxed text-ink-soft">{project.description}</p>

        <ul className="mt-5 flex flex-wrap gap-2">
          {project.tech.slice(0, 6).map((tech) => (
            <li key={tech}>
              <TechChip label={tech} />
            </li>
          ))}
        </ul>

        <div className="mt-7 flex flex-wrap items-center gap-3">
          <GradientButton to={`/work/${project.slug}`} magnetic>
            View case study
            <ArrowUpRight size={18} />
          </GradientButton>
          {project.links.live && (
            <GradientButton href={project.links.live} target="_blank" rel="noreferrer noopener" variant="glass">
              Live demo
              <ExternalLink size={16} />
            </GradientButton>
          )}
        </div>
      </motion.div>
    </div>
  )
}

/** used by CaseStudy to link back — kept here to avoid a circular import elsewhere */
export function CaseStudyLink({ slug, label }: { slug: string; label: string }) {
  return (
    <Link to={`/work/${slug}`} className="font-semibold text-phoenix-600 hover:underline">
      {label}
    </Link>
  )
}
