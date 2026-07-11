import { cn } from '@/lib/cn'

/**
 * CSS-driven aurora: a few big blurred gradient blobs that drift slowly on the
 * compositor (no per-frame JS). Pauses under prefers-reduced-motion.
 */
export default function AuroraBackground({
  className,
  intensity = 'full',
}: {
  className?: string
  intensity?: 'full' | 'soft'
}) {
  const opacity = intensity === 'full' ? '' : 'opacity-60'
  return (
    <div className={cn('pointer-events-none absolute inset-0 -z-10 overflow-hidden', opacity, className)} aria-hidden>
      <div className="absolute -left-[10%] -top-[15%] h-[36rem] w-[36rem] rounded-full bg-grad-phoenix opacity-30 blur-[80px] motion-safe-anim animate-aurora [will-change:transform] dark:opacity-40" />
      <div className="absolute -right-[8%] top-[6%] h-[32rem] w-[32rem] rounded-full bg-grad-lotus opacity-30 blur-[80px] motion-safe-anim animate-aurora-slow [animation-delay:-6s] [will-change:transform] dark:opacity-40" />
      <div className="absolute bottom-[-18%] left-[22%] h-[30rem] w-[30rem] rounded-full bg-grad-pool opacity-25 blur-[90px] motion-safe-anim animate-aurora [animation-delay:-12s] [will-change:transform] dark:opacity-35" />
    </div>
  )
}
