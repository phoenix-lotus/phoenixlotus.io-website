import { Github, Linkedin, Mail } from 'lucide-react'
import { site } from '@/data/site'
import { cn } from '@/lib/cn'

const links = [
  { href: site.socials.github, label: 'GitHub', Icon: Github },
  { href: site.socials.linkedin, label: 'LinkedIn', Icon: Linkedin },
  { href: site.socials.email, label: 'Email', Icon: Mail },
]

export default function SocialLinks({ className, size = 18 }: { className?: string; size?: number }) {
  return (
    <ul className={cn('flex items-center gap-2', className)}>
      {links.map(({ href, label, Icon }) => (
        <li key={label}>
          <a
            href={href}
            target={href.startsWith('http') ? '_blank' : undefined}
            rel={href.startsWith('http') ? 'noreferrer noopener' : undefined}
            aria-label={label}
            className="group grid h-10 w-10 place-items-center rounded-full border border-line bg-surface/60 text-ink-soft transition-colors hover:border-transparent hover:bg-grad-phoenix hover:text-white"
          >
            <Icon size={size} className="transition-transform group-hover:scale-110" />
          </a>
        </li>
      ))}
    </ul>
  )
}
