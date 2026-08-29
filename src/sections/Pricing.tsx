import { ArrowRight } from 'lucide-react'
import GradientButton from '@/components/GradientButton'
import GradientText from '@/components/GradientText'
import PaymentOptionCard from '@/components/PaymentOptionCard'
import SectionHeading from '@/components/SectionHeading'
import { Reveal, Stagger } from '@/components/Reveal'
import { carePlan, paymentOptions } from '@/data/services'

/**
 * The home page's pricing teaser — the three ways to pay, the care floor,
 * and a link to /services, which stays the canonical rate card (its own
 * <title> and meta description are written around this pricing, and it
 * carries the terms, the plan contents, and the add-ons this section
 * deliberately doesn't restate).
 *
 * Every figure here is read out of src/data/services.ts rather than
 * retyped. scripts/check-prices.mjs proves each $-figure in src/ traces
 * to a rate-card constant, but it can't prove two hand-copies of the same
 * figure still agree with each other — and a prospect reading $279 here
 * and something else one click later is exactly the failure that file's
 * header comment describes.
 */
export default function Pricing() {
  return (
    <section id="pricing" className="scroll-mt-24 py-20 md:py-28">
      <div className="container-page">
        <SectionHeading
          eyebrow="Pricing"
          title={
            <>
              Start at <GradientText>$0 down</GradientText>
            </>
          }
          intro="Real numbers, on the website, before you talk to anyone. Three ways to pay for a site — and the one we recommend lets you start with nothing up front."
          align="center"
        />

        <Stagger as="ul" className="mt-12 grid gap-5 lg:grid-cols-3">
          {paymentOptions.map((option) => (
            <PaymentOptionCard key={option.key} option={option} blurb={option.summary} />
          ))}
        </Stagger>

        <Reveal className="mx-auto mt-8 max-w-3xl text-center">
          <p className="text-lg leading-relaxed text-ink-soft">
            Once it’s live, care and hosting is{' '}
            <span className="font-semibold text-ink">
              {carePlan.price}
              {carePlan.cadence}
            </span>{' '}
            — month-to-month, cancel with 30 days’ notice. A rented site already includes it.
          </p>
        </Reveal>

        <Reveal className="mx-auto mt-4 max-w-3xl text-center">
          <p className="text-sm leading-relaxed text-muted">
            The build itself is quoted per project: a five-page site for a shop and a bilingual site
            with online booking aren’t the same job, and a headline number would only be right for
            one of them. Your domain and your content are yours from day one whichever way you pay;
            a rented site itself stays ours until you buy it out. Full terms, what each care plan
            includes, and the local-visibility and social add-ons are on the pricing page.
          </p>
        </Reveal>

        <Reveal className="mt-9 flex flex-col items-center justify-center gap-3 sm:flex-row">
          <GradientButton to="/services" size="lg" magnetic>
            See full pricing
            <ArrowRight size={18} />
          </GradientButton>
          <GradientButton to="/#contact" size="lg" variant="glass">
            Tell us about your business
          </GradientButton>
        </Reveal>
      </div>
    </section>
  )
}
