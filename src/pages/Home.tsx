import { Helmet } from 'react-helmet-async'
import Hero from '@/sections/Hero'
import FeaturedWork from '@/sections/FeaturedWork'
import ProjectsGrid from '@/sections/ProjectsGrid'
import About from '@/sections/About'
import Skills from '@/sections/Skills'
import Contact from '@/sections/Contact'
import { site } from '@/data/site'

export default function Home() {
  return (
    <>
      <Helmet>
        <title>{site.name} — Developer, Builder, Pilot · PhoenixLotus</title>
        <meta name="description" content={site.blurb} />
        <link rel="canonical" href={site.url + '/'} />
        <meta property="og:title" content={`${site.name} — ${site.role}`} />
        <meta property="og:description" content={site.tagline} />
        <meta property="og:url" content={site.url + '/'} />
      </Helmet>

      <Hero />
      <FeaturedWork />
      <ProjectsGrid />
      <About />
      <Skills />
      <Contact />
    </>
  )
}
