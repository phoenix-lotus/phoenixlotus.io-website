import { Link } from 'react-router-dom'
import { ArrowUp } from 'lucide-react'
import Logo from '@/components/Logo'
import SocialLinks from '@/components/SocialLinks'
import { nav, site } from '@/data/site'

export default function Footer() {
  const year = new Date().getFullYear()
  return (
    <footer className="relative mt-24 border-t border-line">
      <div className="rule-aurora absolute inset-x-0 top-0" aria-hidden />
      <div className="container-page py-14">
        <div className="flex flex-col gap-10 md:flex-row md:items-start md:justify-between">
          <div className="max-w-sm">
            <Logo />
            <p className="mt-4 leading-relaxed text-ink-soft">{site.tagline}</p>
            <div className="mt-5">
              <SocialLinks />
            </div>
          </div>

          <div className="flex gap-14">
            <nav aria-label="Footer">
              <p className="mb-3 font-mono text-xs uppercase tracking-widest text-muted">Explore</p>
              <ul className="space-y-2">
                {nav.map((item) => (
                  <li key={item.href}>
                    <Link to={item.href} className="text-ink-soft transition-colors hover:text-phoenix-600">
                      {item.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </nav>
            <div>
              <p className="mb-3 font-mono text-xs uppercase tracking-widest text-muted">Contact</p>
              <ul className="space-y-2">
                <li>
                  <a href={site.socials.email} className="text-ink-soft transition-colors hover:text-phoenix-600">
                    {site.email}
                  </a>
                </li>
                <li className="text-ink-soft">{site.location}</li>
              </ul>
            </div>
          </div>
        </div>

        <div className="mt-12 flex flex-col items-center justify-between gap-4 border-t border-line pt-6 sm:flex-row">
          <p className="text-sm text-muted">
            © {year} {site.name} · PhoenixLotus
          </p>
          <p className="font-mono text-xs text-muted">Built with React · Vite · Tailwind · Framer Motion</p>
          <button
            onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
            className="group inline-flex items-center gap-2 rounded-full border border-line bg-surface/60 px-4 py-2 text-sm text-ink-soft transition-colors hover:text-ink"
            aria-label="Back to top"
          >
            Top
            <ArrowUp size={15} className="transition-transform group-hover:-translate-y-0.5" />
          </button>
        </div>
      </div>
    </footer>
  )
}
