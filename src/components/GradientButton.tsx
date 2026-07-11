import { forwardRef, type ReactNode } from 'react'
import { Link } from 'react-router-dom'
import { motion, useMotionValue, useSpring } from 'framer-motion'
import { usePointerFine } from '@/lib/hooks'
import { cn } from '@/lib/cn'

type Variant = 'primary' | 'glass' | 'ghost'
type Size = 'md' | 'lg'

const base =
  'relative inline-flex select-none items-center justify-center gap-2 rounded-full font-semibold tracking-tight transition-transform duration-200 focus-visible:outline-none disabled:opacity-60'

const variants: Record<Variant, string> = {
  primary:
    'bg-grad-phoenix text-white shadow-phoenix hover:shadow-lift active:scale-[0.98] [background-size:150%_auto] hover:[background-position:100%]',
  glass:
    'glass text-ink hover:border-phoenix-600/40 active:scale-[0.98]',
  ghost: 'text-ink-soft hover:text-ink',
}

const sizes: Record<Size, string> = {
  md: 'px-5 py-2.5 text-sm',
  lg: 'px-7 py-3.5 text-base',
}

interface CommonProps {
  variant?: Variant
  size?: Size
  className?: string
  children: ReactNode
  magnetic?: boolean
}

type ButtonProps = CommonProps &
  React.ButtonHTMLAttributes<HTMLButtonElement> & { to?: undefined; href?: undefined }
type LinkProps = CommonProps & { to: string; href?: undefined } & Pick<
    React.AnchorHTMLAttributes<HTMLAnchorElement>,
    'onClick' | 'target' | 'rel' | 'aria-label' | 'title'
  >
type AnchorProps = CommonProps &
  React.AnchorHTMLAttributes<HTMLAnchorElement> & { href: string; to?: undefined }

type Props = ButtonProps | LinkProps | AnchorProps

/** Polymorphic gradient CTA that becomes a <Link>, <a>, or <button>, with an optional magnetic pull. */
const GradientButton = forwardRef<HTMLElement, Props>(function GradientButton(
  { variant = 'primary', size = 'md', className, children, magnetic = false, ...rest },
  _ref,
) {
  const fine = usePointerFine()
  const x = useMotionValue(0)
  const y = useMotionValue(0)
  const sx = useSpring(x, { stiffness: 250, damping: 18, mass: 0.4 })
  const sy = useSpring(y, { stiffness: 250, damping: 18, mass: 0.4 })

  const useMagnet = magnetic && fine
  const onMove = (e: React.MouseEvent) => {
    if (!useMagnet) return
    const r = (e.currentTarget as HTMLElement).getBoundingClientRect()
    x.set((e.clientX - (r.left + r.width / 2)) * 0.25)
    y.set((e.clientY - (r.top + r.height / 2)) * 0.35)
  }
  const reset = () => {
    x.set(0)
    y.set(0)
  }

  const classes = cn(base, variants[variant], sizes[size], className)
  const motionProps = {
    style: useMagnet ? { x: sx, y: sy } : undefined,
    onMouseMove: onMove,
    onMouseLeave: reset,
  }

  if ('to' in rest && rest.to) {
    const { to, ...linkRest } = rest as LinkProps
    return (
      <motion.span {...motionProps} className="inline-flex">
        <Link to={to} className={classes} {...(linkRest as object)}>
          {children}
        </Link>
      </motion.span>
    )
  }

  if ('href' in rest && rest.href) {
    const { href, ...anchorRest } = rest as AnchorProps
    return (
      <motion.a href={href} className={classes} {...motionProps} {...(anchorRest as object)}>
        {children}
      </motion.a>
    )
  }

  return (
    <motion.button className={classes} {...motionProps} {...(rest as object)}>
      {children}
    </motion.button>
  )
})

export default GradientButton
