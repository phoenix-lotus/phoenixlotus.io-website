import { Link } from 'react-router-dom'
import { Helmet } from 'react-helmet-async'
import { Home } from 'lucide-react'
import AuroraBackground from '@/components/AuroraBackground'
import GradientText from '@/components/GradientText'

export default function NotFound() {
  return (
    <section className="relative grid min-h-[80svh] place-items-center overflow-hidden px-6 text-center">
      <Helmet>
        <title>Not found — PhoenixLotus</title>
        <meta name="robots" content="noindex" />
      </Helmet>
      <AuroraBackground />
      <div>
        <p className="font-display text-8xl font-extrabold sm:text-9xl">
          <GradientText>404</GradientText>
        </p>
        <h1 className="mt-4 font-display text-2xl font-bold text-ink">This page took flight.</h1>
        <p className="mx-auto mt-2 max-w-sm text-ink-soft">
          The page you’re after doesn’t exist — but there’s plenty to see back home.
        </p>
        <Link
          to="/"
          className="mt-8 inline-flex items-center gap-2 rounded-full bg-grad-phoenix px-6 py-3 font-semibold text-white shadow-phoenix transition-shadow hover:shadow-lift"
        >
          <Home size={18} /> Back home
        </Link>
      </div>
    </section>
  )
}
