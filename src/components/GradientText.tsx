import type { ReactNode } from 'react'
import { cn } from '@/lib/cn'

export default function GradientText({
  children,
  className,
  animate = false,
}: {
  children: ReactNode
  className?: string
  animate?: boolean
}) {
  return (
    <span
      className={cn(
        'bg-grad-aurora bg-clip-text text-transparent',
        animate && 'motion-safe-anim animate-pan',
        className,
      )}
      style={{ backgroundSize: '200% auto' }}
    >
      {children}
    </span>
  )
}
