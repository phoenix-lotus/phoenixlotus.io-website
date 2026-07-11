import { STATUS_LABEL, type Status } from '@/data/projects'
import { cn } from '@/lib/cn'

const STATUS_DOT: Record<Status, string> = {
  live: 'bg-emerald-500',
  'in-development': 'bg-phoenix-500',
  mvp: 'bg-phoenix-400',
  client: 'bg-lotus-700',
  concept: 'bg-lotus-500',
  'pre-launch': 'bg-lotus-400',
  prototype: 'bg-lotus-500',
  archived: 'bg-muted',
}

export function StatusBadge({ status, className }: { status: Status; className?: string }) {
  return (
    <span
      className={cn(
        'inline-flex items-center gap-1.5 rounded-full border border-line bg-surface/70 px-2.5 py-1 font-mono text-[11px] font-medium text-ink-soft backdrop-blur',
        className,
      )}
    >
      <span className={cn('h-1.5 w-1.5 rounded-full', STATUS_DOT[status])} aria-hidden />
      {STATUS_LABEL[status]}
    </span>
  )
}

export function TechChip({ label }: { label: string }) {
  return <span className="chip whitespace-nowrap">{label}</span>
}
