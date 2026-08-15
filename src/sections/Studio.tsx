import { motion } from 'framer-motion'
import { ArrowRight, Hammer, MapPinned, ShieldCheck } from 'lucide-react'
import { Link } from 'react-router'
import SectionHeading from '@/components/SectionHeading'
import GradientText from '@/components/GradientText'
import { Stagger } from '@/components/Reveal'
import { THEME } from '@/lib/themes'
import { fadeUp } from '@/lib/motion'
import { cn } from '@/lib/cn'

const offers = [
  {
    Icon: Hammer,
    theme: 'phoenix',
    title: 'Build the site',
    body: 'Design, page copy, accessibility, and the structured data that tells search engines what kind of business you are. A real site, made for your trade — not a template with your name dropped into it.',
    to: '/process',
    cta: 'How it gets built',
  },
  {
    Icon: ShieldCheck,
    theme: 'lotus',
    title: 'Keep it running',
    body: 'Hosting, SSL, uptime monitoring, security and dependency updates, content changes, and a monthly health report — so certificates and dependencies don’t quietly go stale while nobody’s watching. From $149/month.',
    to: '/services',
    cta: 'See the plans',
  },
  {
    Icon: MapPinned,
    theme: 'pool',
    title: 'Get you found locally',
    body: 'Google Business Profile set up properly and kept current, local citations, SEO-tuned pages, and — if you want it — the social posting on top. Priced in public, not on a call.',
    to: '/services',
    cta: 'See the prices',
  },
] as const

export default function Studio() {
  return (
    <section id="studio" className="scroll-mt-24 bg-warm/40 py-20 md:py-28">
      <div className="container-page">
        <SectionHeading
          eyebrow="The studio"
          title={
            <>
              What PhoenixLotus <GradientText>actually does</GradientText>
            </>
          }
          intro="Websites for small businesses in and around Mendocino County — designed, built, and then looked after by the person who built them."
          align="center"
        />

        <Stagger as="ul" className="mt-14 grid gap-5 md:grid-cols-3">
          {offers.map(({ Icon, theme, title, body, to, cta }) => {
            const t = THEME[theme]
            return (
              <motion.li key={title} variants={fadeUp}>
                <Link
                  to={to}
                  className="group flex h-full flex-col rounded-xl border border-line bg-surface/70 p-6 backdrop-blur transition-all hover:-translate-y-0.5 hover:border-phoenix-600/40 hover:shadow-soft"
                >
                  <span
                    className={cn(
                      'grid h-11 w-11 place-items-center rounded-xl text-white',
                      t.gradient,
                    )}
                  >
                    <Icon size={20} />
                  </span>
                  <h3 className="mt-5 font-display text-xl font-bold text-ink">{title}</h3>
                  <p className="mt-3 leading-relaxed text-ink-soft">{body}</p>
                  <span className="mt-6 inline-flex items-center gap-1.5 text-sm font-semibold text-phoenix-600">
                    {cta}
                    <ArrowRight size={15} className="transition-transform group-hover:translate-x-1" />
                  </span>
                </Link>
              </motion.li>
            )
          })}
        </Stagger>
      </div>
    </section>
  )
}
