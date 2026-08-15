import { motion } from 'framer-motion'
import { ArrowRight, Lock } from 'lucide-react'
import AuroraBackground from '@/components/AuroraBackground'
import GradientButton from '@/components/GradientButton'
import GradientText from '@/components/GradientText'
import SectionHeading from '@/components/SectionHeading'
import { Reveal } from '@/components/Reveal'
import { steps } from '@/data/process'
import { site } from '@/data/site'
import { THEME } from '@/lib/themes'
import { EASE } from '@/lib/motion'
import { cn } from '@/lib/cn'

const TITLE = 'How I work — PhoenixLotus Web Studio'
const DESCRIPTION =
  'The method behind a PhoenixLotus rebuild: a forensic audit of your current site, a facts table where nothing unconfirmed ships as fact, a real working build, and a private preview you see first.'

export default function Process() {
  return (
    <motion.article
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, ease: EASE }}
      className="relative overflow-hidden pt-28"
    >
      <title>{TITLE}</title>
      <meta name="description" content={DESCRIPTION} />
      <link rel="canonical" href={`${site.url}/process`} />
      <meta property="og:title" content={TITLE} />
      <meta property="og:description" content={DESCRIPTION} />
      <meta property="og:url" content={`${site.url}/process`} />

      <AuroraBackground intensity="soft" />

      <div className="container-page">
        <SectionHeading
          eyebrow="How I work"
          title={
            <>
              The method, since I <GradientText>can’t show you the work</GradientText>
            </>
          }
          intro="There's no gallery of client sites on here, and that's deliberate rather than an omission. So here's the process itself instead — in enough detail that you can hold me to it."
        />

        {/* Why the work isn't shown */}
        <Reveal className="mt-12">
          <div className="glass flex flex-col gap-5 rounded-2xl p-6 sm:flex-row sm:gap-7 sm:p-8">
            <span className="grid h-12 w-12 shrink-0 place-items-center rounded-full bg-grad-lotus text-white shadow-lotus">
              <Lock size={20} />
            </span>
            <div className="max-w-3xl space-y-4 text-lg leading-relaxed text-ink-soft">
              <p>
                The rebuilds I’ve done for local businesses were built on spec — at my expense,
                before anyone was asked for anything. Each one sits on real hosting behind a
                passphrase: not indexed, disallowed in robots.txt, invisible to anyone without the
                phrase.
              </p>
              <p>
                None of those owners has agreed to have their site shown in someone else’s
                marketing, so none of them appears here — not as a screenshot, not as a link, not
                anonymized in a case study. That’s the same promise you’d be getting: your unfinished
                site is never a public claim on your name, and it doesn’t become one after the fact
                either.
              </p>
              <p className="text-ink">
                So instead of showing you work I don’t have permission to show, here is exactly how
                it gets made.
              </p>
            </div>
          </div>
        </Reveal>

        {/* The steps */}
        <ol className="mt-20 space-y-14 md:space-y-20">
          {steps.map((step) => {
            const t = THEME[step.theme]
            return (
              <li key={step.n}>
                <Reveal>
                  <div className="grid gap-6 md:grid-cols-[7rem_1fr] md:gap-10">
                    <p
                      className={cn(
                        'font-display text-5xl font-extrabold leading-none md:text-6xl',
                        t.text,
                      )}
                      aria-hidden
                    >
                      {step.n}
                    </p>
                    <div>
                      <h2 className="text-title font-bold text-ink">{step.title}</h2>
                      <p className="mt-4 max-w-2xl text-lg leading-relaxed text-ink-soft">
                        {step.body}
                      </p>
                      <ul className="mt-6 space-y-2.5">
                        {step.detail.map((line) => (
                          <li key={line} className="flex items-start gap-3">
                            <span
                              className={cn('mt-2 h-1.5 w-1.5 shrink-0 rounded-full', t.gradient)}
                              aria-hidden
                            />
                            <span className="text-ink-soft">{line}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </Reveal>
              </li>
            )
          })}
        </ol>

        {/* The objection I can't answer with a reference */}
        <Reveal className="mt-24">
          <div className="rounded-2xl border border-line bg-warm/50 p-6 backdrop-blur sm:p-8">
            <p className="font-mono text-xs uppercase tracking-widest text-muted">
              The fair question
            </p>
            <h2 className="mt-3 font-display text-2xl font-bold text-ink sm:text-3xl">
              “You’re one person. What happens if you’re not around?”
            </h2>
            <div className="mt-5 max-w-3xl space-y-4 text-lg leading-relaxed text-ink-soft">
              <p>
                That’s the right question, and I can’t answer it with a reference. PhoenixLotus is
                me. If I’m out, nothing moves — there’s no bench and no account manager. An agency
                with staff genuinely doesn’t have that problem, and if you need guaranteed coverage
                against a fixed schedule, that’s a real reason to hire one.
              </p>
              <p>
                What I can do is make being wrong about me survivable. What you end up holding is
                ordinary web files on ordinary hosting, in your own accounts, in a stack any
                competent developer can pick up — not a proprietary system only I can log into. The
                monthly plans are month-to-month for the same reason.
              </p>
            </div>
          </div>
        </Reveal>

        <Reveal className="mt-16">
          <div className="rounded-2xl border border-line bg-surface/60 p-8 text-center backdrop-blur sm:p-12">
            <h2 className="text-display font-extrabold text-ink">
              Want this pointed at <GradientText>your site?</GradientText>
            </h2>
            <p className="mx-auto mt-4 max-w-xl text-lg leading-relaxed text-ink-soft">
              Send me the address and what’s frustrating you about it. The audit is where every one
              of these starts.
            </p>
            <div className="mt-8 flex flex-col items-center justify-center gap-3 sm:flex-row">
              <GradientButton to="/#contact" size="lg" magnetic>
                Get in touch
                <ArrowRight size={18} />
              </GradientButton>
              <GradientButton to="/services" size="lg" variant="glass">
                Services &amp; pricing
              </GradientButton>
            </div>
          </div>
        </Reveal>
      </div>
    </motion.article>
  )
}
