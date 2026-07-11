import { motion } from 'framer-motion'
import { Github, Linkedin, Mail, MapPin } from 'lucide-react'
import ContactForm from '@/components/ContactForm'
import { Reveal } from '@/components/Reveal'
import GradientText from '@/components/GradientText'
import { site } from '@/data/site'
import { useReveal } from '@/lib/useReveal'

const directLinks = [
  { Icon: Mail, label: site.email, href: site.socials.email },
  { Icon: Github, label: 'github.com/phoenix-lotus', href: site.socials.github },
  { Icon: Linkedin, label: 'LinkedIn', href: site.socials.linkedin },
]

export default function Contact() {
  const { ref, inView } = useReveal()
  return (
    <section id="contact" className="scroll-mt-24 py-20 md:py-28">
      <div className="container-page">
        <div className="grid items-center gap-10 lg:grid-cols-2 lg:gap-16">
          {/* Invite */}
          <Reveal>
            <p className="mb-3 flex items-center gap-2 font-mono text-xs uppercase tracking-[0.2em] text-phoenix-600">
              <span className="h-px w-6 bg-grad-phoenix" aria-hidden />
              Contact
            </p>
            <h2 className="text-display font-extrabold text-ink">
              Have something <GradientText>worth building?</GradientText>
            </h2>
            <p className="mt-4 max-w-md text-lg leading-relaxed text-ink-soft">
              I take on a small number of projects — product builds, AI features, and thoughtful
              front-ends. Tell me what you’re working on and I’ll get back to you.
            </p>

            <ul className="mt-8 space-y-3">
              {directLinks.map(({ Icon, label, href }) => (
                <li key={label}>
                  <a
                    href={href}
                    target={href.startsWith('http') ? '_blank' : undefined}
                    rel={href.startsWith('http') ? 'noreferrer noopener' : undefined}
                    className="group inline-flex items-center gap-3 text-ink-soft transition-colors hover:text-ink"
                  >
                    <span className="grid h-10 w-10 place-items-center rounded-full border border-line bg-surface/60 text-phoenix-600 transition-colors group-hover:border-transparent group-hover:bg-grad-phoenix group-hover:text-white">
                      <Icon size={17} />
                    </span>
                    {label}
                  </a>
                </li>
              ))}
              <li className="inline-flex items-center gap-3 text-ink-soft">
                <span className="grid h-10 w-10 place-items-center rounded-full border border-line bg-surface/60 text-lotus-500">
                  <MapPin size={17} />
                </span>
                {site.location}
              </li>
            </ul>
          </Reveal>

          {/* Form */}
          <motion.div
            ref={ref}
            initial={{ opacity: 0, y: 30 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6 }}
          >
            <ContactForm />
          </motion.div>
        </div>
      </div>
    </section>
  )
}
