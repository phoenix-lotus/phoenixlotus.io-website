import { useEffect } from 'react'
import { Link } from 'react-router-dom'
import { AnimatePresence, motion } from 'framer-motion'
import { X } from 'lucide-react'
import Logo from '@/components/Logo'
import SocialLinks from '@/components/SocialLinks'
import GradientButton from '@/components/GradientButton'
import { nav, site } from '@/data/site'
import { useLockBody } from '@/lib/hooks'
import { EASE } from '@/lib/motion'

const menuVariants = {
  hidden: { opacity: 0 },
  show: { opacity: 1, transition: { staggerChildren: 0.06, delayChildren: 0.08 } },
}
const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0, transition: { duration: 0.4, ease: EASE } },
}

export default function MobileMenu({ open, onClose }: { open: boolean; onClose: () => void }) {
  useLockBody(open)

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => e.key === 'Escape' && onClose()
    if (open) window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [open, onClose])

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          className="fixed inset-0 z-[60] md:hidden"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          role="dialog"
          aria-modal="true"
          aria-label="Menu"
        >
          <div className="absolute inset-0 bg-base/80 backdrop-blur-2xl" onClick={onClose} />
          <motion.div
            className="absolute inset-0 flex flex-col p-6"
            variants={menuVariants}
            initial="hidden"
            animate="show"
          >
            <div className="flex items-center justify-between">
              <Logo />
              <button
                onClick={onClose}
                aria-label="Close menu"
                className="grid h-11 w-11 place-items-center rounded-full border border-line bg-surface/60 text-ink"
              >
                <X size={22} />
              </button>
            </div>

            <nav className="mt-16 flex flex-col gap-3">
              {nav.map((item) => (
                <motion.div key={item.href} variants={itemVariants}>
                  <Link
                    to={item.href}
                    onClick={onClose}
                    className="font-display text-4xl font-extrabold tracking-tight text-ink transition-colors hover:text-phoenix-600"
                  >
                    {item.label}
                  </Link>
                </motion.div>
              ))}
            </nav>

            <motion.div variants={itemVariants} className="mt-auto space-y-6">
              <GradientButton to="/#contact" size="lg" onClick={onClose} className="w-full">
                Let’s talk
              </GradientButton>
              <div className="flex items-center justify-between">
                <SocialLinks />
                <a href={site.socials.email} className="font-mono text-xs text-muted">
                  {site.email}
                </a>
              </div>
            </motion.div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
