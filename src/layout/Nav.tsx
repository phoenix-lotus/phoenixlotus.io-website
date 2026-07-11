import { useState } from 'react'
import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { Menu, Moon, Sun } from 'lucide-react'
import Logo from '@/components/Logo'
import GradientButton from '@/components/GradientButton'
import MobileMenu from './MobileMenu'
import { nav } from '@/data/site'
import { useScrolled } from '@/lib/hooks'
import { useTheme } from '@/lib/useTheme'
import { cn } from '@/lib/cn'

export default function Nav() {
  const scrolled = useScrolled(40)
  const [menuOpen, setMenuOpen] = useState(false)
  const { theme, toggle } = useTheme()

  return (
    <>
      <motion.header
        initial={{ y: -80, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.6, ease: [0.21, 0.47, 0.32, 0.98], delay: 0.1 }}
        className="fixed inset-x-0 top-0 z-50"
      >
        <nav
          className={cn(
            'container-page mt-3 flex items-center justify-between rounded-full px-4 py-2.5 transition-all duration-300 sm:px-5',
            scrolled ? 'glass shadow-soft' : 'border border-transparent bg-transparent',
          )}
        >
          <Link to="/" aria-label="Home" className="shrink-0">
            <Logo />
          </Link>

          <ul className="hidden items-center gap-1 md:flex">
            {nav.map((item) => (
              <li key={item.href}>
                <Link
                  to={item.href}
                  className="group relative rounded-full px-3.5 py-2 text-sm font-medium text-ink-soft transition-colors hover:text-ink"
                >
                  {item.label}
                  <span className="absolute inset-x-3.5 -bottom-0.5 h-0.5 origin-left scale-x-0 rounded-full bg-grad-phoenix transition-transform duration-300 group-hover:scale-x-100" />
                </Link>
              </li>
            ))}
          </ul>

          <div className="flex items-center gap-2">
            <button
              onClick={toggle}
              aria-label={`Switch to ${theme === 'dark' ? 'light' : 'dark'} mode`}
              className="grid h-10 w-10 place-items-center rounded-full border border-line bg-surface/60 text-ink-soft transition-colors hover:text-ink"
            >
              {theme === 'dark' ? <Sun size={18} /> : <Moon size={18} />}
            </button>
            <GradientButton to="/#contact" className="hidden sm:inline-flex" magnetic>
              Let’s talk
            </GradientButton>
            <button
              onClick={() => setMenuOpen(true)}
              aria-label="Open menu"
              className="grid h-10 w-10 place-items-center rounded-full border border-line bg-surface/60 text-ink md:hidden"
            >
              <Menu size={20} />
            </button>
          </div>
        </nav>
      </motion.header>

      <MobileMenu open={menuOpen} onClose={() => setMenuOpen(false)} />
    </>
  )
}
