import { motion } from 'framer-motion'
import { ArrowRight, Check } from 'lucide-react'
import AuroraBackground from '@/components/AuroraBackground'
import GradientButton from '@/components/GradientButton'
import GradientText from '@/components/GradientText'
import SectionHeading from '@/components/SectionHeading'
import { Reveal, Stagger } from '@/components/Reveal'
import { adsAddOn, gbpSetup, plans, terms } from '@/data/services'
import { site } from '@/data/site'
import { THEME } from '@/lib/themes'
import { EASE, fadeUp } from '@/lib/motion'
import { cn } from '@/lib/cn'

const TITLE = 'Services & pricing — PhoenixLotus Web Studio'
const DESCRIPTION =
  'Published house pricing for a Mendocino County web studio: care and hosting from $99/mo, local visibility, social, and a one-time Google Business Profile setup.'

export default function Services() {
  return (
    <motion.article
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, ease: EASE }}
      className="relative overflow-hidden pt-28"
    >
      <title>{TITLE}</title>
      <meta name="description" content={DESCRIPTION} />
      <link rel="canonical" href={`${site.url}/services`} />
      <meta property="og:title" content={TITLE} />
      <meta property="og:description" content={DESCRIPTION} />
      <meta property="og:url" content={`${site.url}/services`} />

      <AuroraBackground intensity="soft" />

      <div className="container-page">
        <SectionHeading
          eyebrow="Services & pricing"
          title={
            <>
              What it costs, <GradientText>in public</GradientText>
            </>
          }
          intro="These are house prices, not opening bids. They're here so you can work out whether this is worth a conversation before either of us spends an hour on one."
        />

        {/* The build itself — deliberately unpriced */}
        <Reveal className="mt-14">
          <div className="glass rounded-2xl p-6 sm:p-8">
            <p className="font-mono text-xs uppercase tracking-widest text-muted">The site itself</p>
            <p className="mt-3 font-display text-3xl font-extrabold text-ink sm:text-4xl">
              Quoted per project
            </p>
            <p className="mt-4 max-w-2xl text-lg leading-relaxed text-ink-soft">
              We don’t publish a build price, because we don’t have an honest one to publish. A
              five-page site for a shop and a bilingual site with online booking and payments are
              not the same job, and a headline number would only be right for one of them. The quote
              comes after the audit, when we both know what’s actually being built.
            </p>
            <div className="mt-7">
              <GradientButton to="/#contact" size="lg" magnetic>
                Let’s talk
                <ArrowRight size={18} />
              </GradientButton>
            </div>
          </div>
        </Reveal>

        {/* Monthly plans */}
        <div className="mt-20">
          <SectionHeading
            eyebrow="After it’s live"
            title={
              <>
                Keeping it <GradientText>running</GradientText>
              </>
            }
            intro="Three ways we stay on after launch — hosting and updates at the bottom, search and social work stacked on top. Picking none of them is a real option; the site is yours either way."
          />

          <Stagger as="ul" className="mt-12 grid gap-5 lg:grid-cols-3">
            {plans.map((plan) => {
              const t = THEME[plan.theme]
              return (
                <motion.li
                  key={plan.key}
                  variants={fadeUp}
                  className="flex flex-col rounded-2xl border border-line bg-surface/60 p-6 backdrop-blur transition-shadow hover:shadow-soft"
                >
                  <div className="flex items-center gap-3">
                    <span className={cn('h-8 w-1.5 rounded-full', t.gradient)} aria-hidden />
                    <h3 className="font-mono text-xs uppercase tracking-widest text-muted">
                      {plan.eyebrow}
                    </h3>
                  </div>
                  <p className="mt-5 flex items-baseline gap-1.5">
                    <span className="font-display text-4xl font-extrabold text-ink">{plan.price}</span>
                    <span className="text-ink-soft">{plan.cadence}</span>
                  </p>
                  <p className="mt-4 leading-relaxed text-ink-soft">{plan.body}</p>
                  <ul className="mt-6 space-y-3 border-t border-line pt-6">
                    {plan.includes.map((line) => (
                      <li key={line} className="flex items-start gap-3">
                        <span
                          className={cn(
                            'mt-0.5 grid h-5 w-5 shrink-0 place-items-center rounded-full text-white',
                            t.gradient,
                          )}
                        >
                          <Check size={12} />
                        </span>
                        <span className="text-sm text-ink-soft">{line}</span>
                      </li>
                    ))}
                  </ul>
                </motion.li>
              )
            })}
          </Stagger>

          <Reveal className="mt-6">
            <p className="text-sm leading-relaxed text-muted">{terms}</p>
          </Reveal>
        </div>

        {/* One-time work */}
        <Reveal className="mt-20">
          <div className="grid gap-8 rounded-2xl border border-line bg-warm/50 p-6 backdrop-blur sm:p-8 lg:grid-cols-[1.1fr_0.9fr]">
            <div>
              <p className="font-mono text-xs uppercase tracking-widest text-muted">
                {gbpSetup.eyebrow} · {gbpSetup.cadence}
              </p>
              <p className="mt-3 font-display text-3xl font-extrabold text-ink sm:text-4xl">
                {gbpSetup.price}
              </p>
              <p className="mt-4 leading-relaxed text-ink-soft">{gbpSetup.body}</p>
              <p className="mt-4 leading-relaxed text-ink-soft">
                It’s a one-time job rather than part of a plan, on purpose. A profile that’s
                half-filled or wrong is a finishable piece of work; keeping it current afterwards is
                a subscription. Bundling the first into the second would mean you couldn’t buy the
                one you need without committing to the other.
              </p>
            </div>
            <ul className="space-y-3 self-center">
              {gbpSetup.includes.map((line) => (
                <li key={line} className="flex items-start gap-3">
                  <span className="mt-0.5 grid h-5 w-5 shrink-0 place-items-center rounded-full bg-grad-phoenix text-white">
                    <Check size={12} />
                  </span>
                  <span className="text-sm text-ink-soft">{line}</span>
                </li>
              ))}
            </ul>
          </div>
        </Reveal>

        {/* Add-on + close */}
        <Reveal className="mt-10">
          <p className="max-w-3xl text-sm leading-relaxed text-muted">{adsAddOn}</p>
        </Reveal>

        <Reveal className="mt-20">
          <div className="rounded-2xl border border-line bg-surface/60 p-8 text-center backdrop-blur sm:p-12">
            <h2 className="text-display font-extrabold text-ink">
              Not sure which <GradientText>you need?</GradientText>
            </h2>
            <p className="mx-auto mt-4 max-w-xl text-lg leading-relaxed text-ink-soft">
              Tell us about the business and what the current site isn’t doing for you. If it’s a
              fit we’ll say what we’d change and what it would cost. If it isn’t, we’ll say that
              too.
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
