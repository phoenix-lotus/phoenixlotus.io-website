import { Link, useParams } from 'react-router-dom'
import { Helmet } from 'react-helmet-async'
import { motion } from 'framer-motion'
import { ArrowLeft, ArrowRight, Check, ExternalLink, Github } from 'lucide-react'
import { getProject, allProjects, STATUS_LABEL } from '@/data/projects'
import { THEME } from '@/lib/themes'
import AuroraBackground from '@/components/AuroraBackground'
import DeviceMockup from '@/components/DeviceMockup'
import { StatusBadge, TechChip } from '@/components/Badges'
import GradientButton from '@/components/GradientButton'
import { Reveal } from '@/components/Reveal'
import { site } from '@/data/site'
import { EASE } from '@/lib/motion'
import NotFound from './NotFound'
import { cn } from '@/lib/cn'

export default function CaseStudy() {
  const { slug } = useParams()
  const project = slug ? getProject(slug) : undefined
  if (!project) return <NotFound />

  const t = THEME[project.colorTheme]
  const idx = allProjects.findIndex((p) => p.slug === project.slug)
  const next = allProjects[(idx + 1) % allProjects.length]
  const isPhone = project.media[0].frame === 'phone'

  return (
    <motion.article
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, ease: EASE }}
      className="relative overflow-hidden pt-28"
    >
      <Helmet>
        <title>
          {project.title} — {site.name}
        </title>
        <meta name="description" content={project.description} />
        <link rel="canonical" href={`${site.url}/work/${project.slug}`} />
        <meta property="og:title" content={`${project.title} — ${project.tagline}`} />
        <meta property="og:description" content={project.description} />
        <meta property="og:url" content={`${site.url}/work/${project.slug}`} />
      </Helmet>

      <AuroraBackground intensity="soft" />

      <div className="container-page">
        <Link to="/#work" className="inline-flex items-center gap-2 text-sm font-medium text-ink-soft transition-colors hover:text-phoenix-600">
          <ArrowLeft size={16} /> All work
        </Link>

        {/* Header */}
        <header className="mt-8 grid items-center gap-10 lg:grid-cols-2 lg:gap-16">
          <div>
            <div className="mb-4 flex flex-wrap items-center gap-3">
              <StatusBadge status={project.status} />
              <span className="font-mono text-sm text-muted">{project.year}</span>
            </div>
            <h1 className="text-hero font-extrabold leading-[0.95] text-ink">{project.title}</h1>
            <p className={cn('mt-4 text-2xl font-semibold', t.text)}>{project.tagline}</p>
            <p className="mt-5 max-w-xl text-lg leading-relaxed text-ink-soft">{project.description}</p>

            <div className="mt-7 flex flex-wrap gap-3">
              {project.links.live && (
                <GradientButton href={project.links.live} target="_blank" rel="noreferrer noopener" magnetic>
                  Visit live <ExternalLink size={16} />
                </GradientButton>
              )}
              {project.links.github && (
                <GradientButton href={project.links.github} target="_blank" rel="noreferrer noopener" variant="glass">
                  <Github size={16} /> Source
                </GradientButton>
              )}
            </div>
          </div>

          <motion.div
            initial={{ opacity: 0, scale: 0.95, rotate: -1 }}
            animate={{ opacity: 1, scale: 1, rotate: -1 }}
            transition={{ duration: 0.7, ease: EASE, delay: 0.1 }}
            className="relative"
          >
            <div className="absolute inset-6 -z-10 rounded-full opacity-50 blur-3xl" style={{ background: t.glow }} aria-hidden />
            <div className={cn(isPhone && 'mx-auto max-w-[16rem]')}>
              <DeviceMockup project={project} eager />
            </div>
          </motion.div>
        </header>

        {/* Meta bar */}
        <div className="mt-14 grid gap-6 rounded-2xl border border-line bg-surface/60 p-6 backdrop-blur sm:grid-cols-3">
          <Meta label="Role" value={project.role} />
          <Meta label="Timeline" value={project.year} />
          <Meta label="Status" value={STATUS_LABEL[project.status]} />
        </div>

        {/* Body */}
        <div className="mt-16 grid gap-12 lg:grid-cols-[1.4fr_0.6fr]">
          <div>
            <Reveal>
              <h2 className="mb-5 font-display text-2xl font-bold text-ink">Overview</h2>
            </Reveal>
            <div className="space-y-5">
              {project.longDescription.map((para, i) => (
                <Reveal key={i} delay={i * 0.04}>
                  <p className="text-lg leading-relaxed text-ink-soft">{para}</p>
                </Reveal>
              ))}
            </div>

            <Reveal className="mt-10">
              <h2 className="mb-4 font-display text-2xl font-bold text-ink">Highlights</h2>
              <ul className="space-y-3">
                {project.highlights.map((h) => (
                  <li key={h} className="flex items-start gap-3">
                    <span className={cn('mt-0.5 grid h-6 w-6 shrink-0 place-items-center rounded-full text-white', t.gradient)}>
                      <Check size={14} />
                    </span>
                    <span className="text-ink-soft">{h}</span>
                  </li>
                ))}
              </ul>
            </Reveal>
          </div>

          {/* Sidebar */}
          <aside className="lg:sticky lg:top-28 lg:self-start">
            <div className="rounded-2xl border border-line bg-surface/60 p-6 backdrop-blur">
              <h3 className="mb-4 font-mono text-xs uppercase tracking-widest text-muted">Built with</h3>
              <ul className="flex flex-wrap gap-2">
                {project.tech.map((tech) => (
                  <li key={tech}>
                    <TechChip label={tech} />
                  </li>
                ))}
              </ul>
              {project.location && (
                <>
                  <h3 className="mb-2 mt-6 font-mono text-xs uppercase tracking-widest text-muted">Where</h3>
                  <p className="text-ink-soft">{project.location}</p>
                </>
              )}
            </div>
          </aside>
        </div>

        {/* Next project */}
        <Link
          to={`/work/${next.slug}`}
          className="group mt-20 flex items-center justify-between gap-4 rounded-2xl border border-line bg-surface/60 p-6 backdrop-blur transition-colors hover:border-phoenix-600/40 sm:p-8"
        >
          <div>
            <p className="font-mono text-xs uppercase tracking-widest text-muted">Next project</p>
            <p className="mt-1 font-display text-2xl font-bold text-ink group-hover:text-phoenix-600 sm:text-3xl">
              {next.title}
            </p>
            <p className={cn('mt-1', THEME[next.colorTheme].text)}>{next.tagline}</p>
          </div>
          <span className="grid h-12 w-12 shrink-0 place-items-center rounded-full bg-grad-phoenix text-white shadow-phoenix transition-transform group-hover:translate-x-1">
            <ArrowRight size={20} />
          </span>
        </Link>
      </div>
    </motion.article>
  )
}

function Meta({ label, value }: { label: string; value: string }) {
  return (
    <div>
      <p className="font-mono text-xs uppercase tracking-widest text-muted">{label}</p>
      <p className="mt-1.5 font-medium text-ink">{value}</p>
    </div>
  )
}
