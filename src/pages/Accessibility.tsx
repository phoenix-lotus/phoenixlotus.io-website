import { motion } from 'framer-motion'
import { ArrowRight, Keyboard, ScanEye, Eye, Type } from 'lucide-react'
import AuroraBackground from '@/components/AuroraBackground'
import GradientButton from '@/components/GradientButton'
import GradientText from '@/components/GradientText'
import SectionHeading from '@/components/SectionHeading'
import { Reveal, Stagger } from '@/components/Reveal'
import { fadeUp } from '@/lib/motion'
import { site } from '@/data/site'
import { EASE } from '@/lib/motion'

const TITLE = 'Accessibility — PhoenixLotus Web Studio'
const DESCRIPTION =
  'What this site is built to, how we check it — an automated scan against every real page, not just a claim — and what to do if something here doesn’t work for you.'

/**
 * Dated so this reads as a checked-on-a-date fact rather than a standing
 * claim that quietly goes stale. Bump it by hand alongside any real
 * `npm run check:a11y` run against a meaningfully changed page — this file
 * has no way to read that result automatically the way the page content
 * itself is generated.
 */
const LAST_CHECKED = 'August 27, 2026'

const BUILT_IN = [
  {
    Icon: Keyboard,
    title: 'A skip link, and a real one',
    body: 'The first thing focus lands on is a link straight to the main content — so getting past the header doesn’t mean tabbing through five nav items first.',
  },
  {
    Icon: ScanEye,
    title: 'Focus you can actually see',
    body: 'Every link, button, and form field gets a visible ring when you tab to it. We didn’t style it away for looking cleaner — that ring is how a keyboard user knows where they are.',
  },
  {
    Icon: Eye,
    title: 'Motion that asks first',
    body: 'If your system is set to reduce motion, this site’s animation turns off with it — that’s an operating-system preference, and we treat it as one.',
  },
  {
    Icon: Type,
    title: 'Labels, not placeholder text',
    body: 'Every field on the contact form has a real label wired to it. A placeholder disappears the moment you start typing — it was never a substitute for one.',
  },
] as const

export default function Accessibility() {
  return (
    <motion.article
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, ease: EASE }}
      className="relative overflow-hidden pt-28"
    >
      <title>{TITLE}</title>
      <meta name="description" content={DESCRIPTION} />
      <link rel="canonical" href={`${site.url}/accessibility`} />
      <meta property="og:title" content={TITLE} />
      <meta property="og:description" content={DESCRIPTION} />
      <meta property="og:url" content={`${site.url}/accessibility`} />

      <AuroraBackground intensity="soft" />

      <div className="container-page">
        <SectionHeading
          eyebrow="Accessibility"
          title={
            <>
              Built to a standard, <GradientText>checked against it</GradientText>
            </>
          }
          intro="Every PhoenixLotus build — this site included — targets WCAG 2.2 Level AA, the current published standard for what someone using a screen reader, voice control, or a keyboard alone needs from a page. “Targets” is the honest word: nobody certifies WCAG conformance, and no tool can tell you you’ve fully met it. This page says plainly what we’ve actually verified, not what we’re assuming."
        />

        {/* What's actually built in */}
        <Stagger as="ul" className="mt-16 grid gap-5 sm:grid-cols-2">
          {BUILT_IN.map(({ Icon, title, body }) => (
            <motion.li
              key={title}
              variants={fadeUp}
              className="flex flex-col rounded-2xl border border-line bg-surface/60 p-6 backdrop-blur"
            >
              <span className="grid h-11 w-11 place-items-center rounded-xl bg-grad-phoenix text-white">
                <Icon size={20} />
              </span>
              <h3 className="mt-5 font-display text-lg font-bold text-ink">{title}</h3>
              <p className="mt-2 leading-relaxed text-ink-soft">{body}</p>
            </motion.li>
          ))}
        </Stagger>

        {/* How it's checked, and what that does and doesn't prove */}
        <Reveal className="mt-16">
          <div className="glass rounded-2xl p-6 sm:p-8">
            <p className="font-mono text-xs uppercase tracking-widest text-muted">How we check it</p>
            <h2 className="mt-3 font-display text-2xl font-bold text-ink sm:text-3xl">
              An automated scan, run before anything ships
            </h2>
            <div className="mt-5 max-w-3xl space-y-4 text-lg leading-relaxed text-ink-soft">
              <p>
                Before a change goes live, every real page of this site — built for production, not
                just the source code — is scanned with axe-core, the same engine behind Chrome
                DevTools’ and Lighthouse’s accessibility audits, checked against WCAG 2.0 A and the
                2.0, 2.1, and 2.2 AA rule sets. As of {LAST_CHECKED}, every page passes that scan with
                zero flagged violations.
              </p>
              <p>
                That’s a real signal, and also a partial one. Automated tools like axe-core catch an
                estimated 20% to 50% of accessibility problems — the kind a machine can prove from
                the page’s own code, like a missing label or an image with no alternative text. The
                rest only turn up when an actual person navigates by keyboard or screen reader and
                finds where it doesn’t work. We haven’t done that manual pass yet ourselves, and
                we’re not going to say we have.
              </p>
            </div>
          </div>
        </Reveal>

        {/* Feedback */}
        <Reveal className="mt-16">
          <div className="rounded-2xl border border-line bg-warm/50 p-6 backdrop-blur sm:p-8">
            <p className="font-mono text-xs uppercase tracking-widest text-muted">Found something?</p>
            <h2 className="mt-3 font-display text-2xl font-bold text-ink sm:text-3xl">
              Tell us what didn’t work
            </h2>
            <p className="mt-4 max-w-2xl text-lg leading-relaxed text-ink-soft">
              If anything on this site got in your way — with a keyboard, a screen reader, or
              anything else — we’d genuinely like to hear about it. Email{' '}
              <a href={site.socials.email} className="font-semibold text-phoenix-600 hover:underline">
                {site.email}
              </a>{' '}
              or call{' '}
              <a href={site.socials.phone} className="font-semibold text-phoenix-600 hover:underline">
                {site.phone}
              </a>
              . We’ll fix what we can, and say plainly if we can’t.
            </p>
          </div>
        </Reveal>

        <Reveal className="mt-20">
          <div className="rounded-2xl border border-line bg-surface/60 p-8 text-center backdrop-blur sm:p-12">
            <h2 className="text-display font-extrabold text-ink">
              Want this built into <GradientText>your site too?</GradientText>
            </h2>
            <p className="mx-auto mt-4 max-w-xl text-lg leading-relaxed text-ink-soft">
              Every PhoenixLotus build targets the same standard this one does — not as an add-on,
              from the start.
            </p>
            <div className="mt-8 flex flex-col items-center justify-center gap-3 sm:flex-row">
              <GradientButton to="/#contact" size="lg" magnetic>
                Get in touch
                <ArrowRight size={18} />
              </GradientButton>
              <GradientButton to="/process" size="lg" variant="glass">
                See how we work
              </GradientButton>
            </div>
          </div>
        </Reveal>
      </div>
    </motion.article>
  )
}
