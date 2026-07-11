import { useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { Check, Loader2, Send } from 'lucide-react'
import { EASE } from '@/lib/motion'
import { cn } from '@/lib/cn'

type State = 'idle' | 'submitting' | 'success' | 'error'

const encode = (data: Record<string, string>) =>
  Object.keys(data)
    .map((k) => `${encodeURIComponent(k)}=${encodeURIComponent(data[k])}`)
    .join('&')

const field =
  'w-full rounded-md border-line bg-base/70 text-ink placeholder:text-muted focus:border-phoenix-500 focus:ring-2 focus:ring-phoenix-500/30'

export default function ContactForm() {
  const [state, setState] = useState<State>('idle')
  const [errors, setErrors] = useState<Record<string, string>>({})

  const validate = (data: Record<string, string>) => {
    const e: Record<string, string> = {}
    if (!data.name?.trim()) e.name = 'Please add your name.'
    if (!data.email?.trim()) e.email = 'Please add your email.'
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(data.email)) e.email = 'That email looks off.'
    if (!data.message?.trim() || data.message.trim().length < 10)
      e.message = 'A little more detail, please.'
    return e
  }

  const onSubmit = async (evt: React.FormEvent<HTMLFormElement>) => {
    evt.preventDefault()
    const form = evt.currentTarget
    const fd = new FormData(form)
    const data = Object.fromEntries(fd.entries()) as Record<string, string>

    // honeypot: silently succeed if a bot filled it
    if (data['bot-field']) {
      setState('success')
      return
    }

    const v = validate(data)
    setErrors(v)
    if (Object.keys(v).length) return

    setState('submitting')
    try {
      const res = await fetch('/', {
        method: 'POST',
        headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
        body: encode({ 'form-name': 'contact', ...data }),
      })
      if (!res.ok) throw new Error(String(res.status))
      setState('success')
      form.reset()
    } catch {
      setState('error')
    }
  }

  return (
    <div className="relative">
      <AnimatePresence mode="wait">
        {state === 'success' ? (
          <motion.div
            key="success"
            initial={{ opacity: 0, scale: 0.96 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.4, ease: EASE }}
            className="glass flex min-h-[22rem] flex-col items-center justify-center rounded-xl p-8 text-center"
          >
            <div className="mb-4 grid h-16 w-16 place-items-center rounded-full bg-grad-phoenix text-white shadow-phoenix">
              <Check size={30} />
            </div>
            <h3 className="font-display text-2xl font-bold text-ink">Message sent!</h3>
            <p className="mt-2 max-w-xs text-ink-soft">
              Thanks for reaching out — I’ll get back to you soon.
            </p>
            <button
              onClick={() => setState('idle')}
              className="mt-5 text-sm font-semibold text-phoenix-600 hover:underline"
            >
              Send another
            </button>
          </motion.div>
        ) : (
          <motion.form
            key="form"
            name="contact"
            method="POST"
            data-netlify="true"
            data-netlify-honeypot="bot-field"
            onSubmit={onSubmit}
            noValidate
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="glass space-y-4 rounded-xl p-6 sm:p-8"
          >
            <input type="hidden" name="form-name" value="contact" />
            <p className="hidden">
              <label>
                Don’t fill this out: <input name="bot-field" />
              </label>
            </p>

            <div className="grid gap-4 sm:grid-cols-2">
              <Field id="name" label="Name" error={errors.name}>
                <input id="name" name="name" type="text" autoComplete="name" placeholder="Jane Doe" className={field} />
              </Field>
              <Field id="email" label="Email" error={errors.email}>
                <input id="email" name="email" type="email" autoComplete="email" placeholder="jane@company.com" className={field} />
              </Field>
            </div>

            <Field id="subject" label="Subject" optional>
              <input id="subject" name="subject" type="text" placeholder="A quick project" className={field} />
            </Field>

            <Field id="message" label="Message" error={errors.message}>
              <textarea id="message" name="message" rows={5} placeholder="Tell me what you’re building…" className={cn(field, 'resize-none')} />
            </Field>

            {state === 'error' && (
              <p className="text-sm text-red-500" role="alert">
                Something went wrong sending that. Please email me directly instead.
              </p>
            )}

            <button
              type="submit"
              disabled={state === 'submitting'}
              className="group inline-flex w-full items-center justify-center gap-2 rounded-full bg-grad-phoenix px-6 py-3.5 font-semibold text-white shadow-phoenix transition-all hover:shadow-lift disabled:opacity-70 [background-size:150%_auto] hover:[background-position:100%]"
            >
              {state === 'submitting' ? (
                <>
                  <Loader2 size={18} className="animate-spin" /> Sending…
                </>
              ) : (
                <>
                  Send message
                  <Send size={16} className="transition-transform group-hover:translate-x-0.5" />
                </>
              )}
            </button>
          </motion.form>
        )}
      </AnimatePresence>
    </div>
  )
}

function Field({
  id,
  label,
  error,
  optional,
  children,
}: {
  id: string
  label: string
  error?: string
  optional?: boolean
  children: React.ReactNode
}) {
  return (
    <div>
      <label htmlFor={id} className="mb-1.5 block text-sm font-medium text-ink">
        {label}
        {optional && <span className="ml-1 text-xs font-normal text-muted">(optional)</span>}
      </label>
      {children}
      {error && (
        <p className="mt-1 text-xs text-red-500" role="alert">
          {error}
        </p>
      )}
    </div>
  )
}
