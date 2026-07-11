import { useState } from 'react'
import type { Project, ProjectMedia } from '@/data/projects'
import { THEME } from '@/lib/themes'
import { cn } from '@/lib/cn'

const ASPECT: Record<NonNullable<ProjectMedia['aspect']>, string> = {
  '9/19.5': 'aspect-[9/19.5]',
  '16/10': 'aspect-[16/10]',
  '16/9': 'aspect-[16/9]',
  '4/3': 'aspect-[4/3]',
}

/** macOS-style browser chrome wrapping a screenshot (or fallback). */
export function BrowserFrame({
  url,
  children,
  className,
}: {
  url?: string
  children: React.ReactNode
  className?: string
}) {
  return (
    <div className={cn('overflow-hidden rounded-lg border border-line bg-surface shadow-lift', className)}>
      <div className="flex items-center gap-2 border-b border-line bg-base/60 px-3 py-2.5">
        <span className="flex gap-1.5" aria-hidden>
          <span className="h-3 w-3 rounded-full bg-[#ff5f57]" />
          <span className="h-3 w-3 rounded-full bg-[#febc2e]" />
          <span className="h-3 w-3 rounded-full bg-[#28c840]" />
        </span>
        {url && (
          <span className="ml-2 flex-1 truncate rounded-md bg-surface px-3 py-1 text-center font-mono text-[11px] text-muted">
            {url}
          </span>
        )}
      </div>
      {children}
    </div>
  )
}

/** iPhone-style device shell wrapping a portrait screenshot (or fallback). */
export function PhoneFrame({ children, className }: { children: React.ReactNode; className?: string }) {
  return (
    <div className={cn('relative rounded-[2.2rem] border-[6px] border-ink/85 bg-ink/85 p-1 shadow-lift', className)}>
      <div className="absolute left-1/2 top-2 z-10 h-5 w-20 -translate-x-1/2 rounded-full bg-ink/90" aria-hidden />
      <div className="overflow-hidden rounded-[1.8rem] bg-surface">{children}</div>
    </div>
  )
}

/** Designed gradient card for projects without a usable screenshot. */
export function FallbackCard({ project, className }: { project: Project; className?: string }) {
  const t = THEME[project.colorTheme]
  const initials = project.title
    .replace(/[^A-Za-z ]/g, '')
    .split(' ')
    .slice(0, 2)
    .map((w) => w[0])
    .join('')
  return (
    <div
      className={cn(
        'relative grid h-full w-full place-items-center overflow-hidden text-white',
        t.gradient,
        className,
      )}
    >
      {/* floating shapes */}
      <div className="pointer-events-none absolute -right-8 -top-10 h-40 w-40 rounded-full bg-white/15 blur-2xl motion-safe-anim animate-float" aria-hidden />
      <div className="pointer-events-none absolute -bottom-10 -left-6 h-32 w-32 rounded-full bg-white/10 blur-2xl" aria-hidden />
      <div
        className="pointer-events-none absolute inset-0 opacity-[0.12]"
        style={{
          backgroundImage:
            'linear-gradient(rgba(255,255,255,.6) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,.6) 1px, transparent 1px)',
          backgroundSize: '28px 28px',
        }}
        aria-hidden
      />
      <div className="relative px-6 text-center">
        <div className="mx-auto mb-3 grid h-16 w-16 place-items-center rounded-2xl bg-white/20 font-display text-2xl font-extrabold backdrop-blur">
          {initials}
        </div>
        <p className="font-display text-xl font-bold drop-shadow-sm">{project.title}</p>
        <p className="mt-1 text-sm text-white/85">{project.tagline}</p>
      </div>
    </div>
  )
}

/** Picks the right frame for a project's primary media and renders it. */
export default function DeviceMockup({
  project,
  media,
  className,
  eager = false,
}: {
  project: Project
  media?: ProjectMedia
  className?: string
  eager?: boolean
}) {
  const m = media ?? project.media[0]
  const aspectClass = m.aspect ? ASPECT[m.aspect] : 'aspect-[16/10]'

  const inner =
    m.type === 'screenshot' && m.src ? (
      <ScreenshotOrFallback project={project} media={m} aspectClass={aspectClass} eager={eager} />
    ) : (
      <div className={aspectClass}>
        <FallbackCard project={project} />
      </div>
    )

  if (m.frame === 'phone') {
    return <PhoneFrame className={className}>{inner}</PhoneFrame>
  }
  if (m.frame === 'browser') {
    return (
      <BrowserFrame url={m.url} className={className}>
        {inner}
      </BrowserFrame>
    )
  }
  return <div className={cn('overflow-hidden rounded-lg shadow-lift', className)}>{inner}</div>
}

/** Renders the screenshot, but degrades to the designed FallbackCard if it fails to load. */
function ScreenshotOrFallback({
  project,
  media,
  aspectClass,
  eager,
}: {
  project: Project
  media: ProjectMedia
  aspectClass: string
  eager: boolean
}) {
  const [failed, setFailed] = useState(false)
  if (failed) {
    return (
      <div className={aspectClass}>
        <FallbackCard project={project} />
      </div>
    )
  }
  return (
    <img
      src={media.src}
      alt={media.alt}
      loading={eager ? 'eager' : 'lazy'}
      decoding="async"
      onError={() => setFailed(true)}
      className={cn('h-full w-full bg-base object-cover object-top', aspectClass)}
    />
  )
}
