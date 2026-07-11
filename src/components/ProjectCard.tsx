import { Link } from 'react-router-dom'
import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion'
import { ArrowUpRight, Star } from 'lucide-react'
import type { Project } from '@/data/projects'
import { THEME } from '@/lib/themes'
import { usePointerFine } from '@/lib/hooks'
import DeviceMockup from './DeviceMockup'
import { StatusBadge } from './Badges'
import { cn } from '@/lib/cn'

export default function ProjectCard({ project }: { project: Project }) {
  const fine = usePointerFine()
  const t = THEME[project.colorTheme]

  const mx = useMotionValue(0)
  const my = useMotionValue(0)
  const rx = useSpring(useTransform(my, [-0.5, 0.5], [6, -6]), { stiffness: 200, damping: 18 })
  const ry = useSpring(useTransform(mx, [-0.5, 0.5], [-6, 6]), { stiffness: 200, damping: 18 })

  const onMove = (e: React.MouseEvent) => {
    if (!fine) return
    const r = e.currentTarget.getBoundingClientRect()
    mx.set((e.clientX - r.left) / r.width - 0.5)
    my.set((e.clientY - r.top) / r.height - 0.5)
  }
  const reset = () => {
    mx.set(0)
    my.set(0)
  }

  return (
    <motion.div layout className="h-full [perspective:1200px]">
      <motion.div
        style={fine ? { rotateX: rx, rotateY: ry, transformStyle: 'preserve-3d' } : undefined}
        onMouseMove={onMove}
        onMouseLeave={reset}
        whileHover={fine ? undefined : { y: -4 }}
        className="group relative h-full"
      >
        <Link
          to={`/work/${project.slug}`}
          className={cn(
            'flex h-full flex-col overflow-hidden rounded-xl border border-line bg-surface/80 shadow-soft ring-1 ring-transparent backdrop-blur transition-shadow duration-300 hover:shadow-lift',
            t.ring,
          )}
        >
          {/* media */}
          <div className="relative overflow-hidden bg-base p-4 pb-0">
            {project.featured && (
              <span className="absolute right-5 top-5 z-10 inline-flex items-center gap-1 rounded-full bg-grad-phoenix px-2.5 py-1 text-[11px] font-semibold text-white shadow-phoenix">
                <Star size={11} className="fill-white" /> Featured
              </span>
            )}
            <div className="transition-transform duration-500 group-hover:scale-[1.03]">
              <DeviceMockup project={project} className={project.media[0].frame === 'phone' ? 'mx-auto w-2/3' : ''} />
            </div>
            {/* gradient sheen sweep */}
            <div className="pointer-events-none absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-white/25 to-transparent transition-transform duration-700 group-hover:translate-x-full" aria-hidden />
          </div>

          {/* body */}
          <div className="flex flex-1 flex-col p-5">
            <div className="mb-2 flex items-center justify-between gap-3">
              <h3 className="font-display text-xl font-bold text-ink">{project.title}</h3>
              <StatusBadge status={project.status} />
            </div>
            <p className={cn('mb-1 font-medium', t.text)}>{project.tagline}</p>
            <p className="mb-4 text-sm leading-relaxed text-ink-soft line-clamp-3">{project.description}</p>

            <div className="mt-auto flex flex-wrap gap-1.5">
              {project.tech.slice(0, 4).map((tech) => (
                <span key={tech} className="chip">
                  {tech}
                </span>
              ))}
              {project.tech.length > 4 && (
                <span className="chip">+{project.tech.length - 4}</span>
              )}
            </div>

            <span className="mt-4 inline-flex items-center gap-1 text-sm font-semibold text-ink transition-colors group-hover:text-phoenix-600">
              View case study
              <ArrowUpRight size={16} className="transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
            </span>
          </div>
        </Link>
      </motion.div>
    </motion.div>
  )
}
