import Hero from '@/sections/Hero'
import Studio from '@/sections/Studio'
import FeaturedWork from '@/sections/FeaturedWork'
import ProjectsGrid from '@/sections/ProjectsGrid'
import About from '@/sections/About'
import Skills from '@/sections/Skills'
import Contact from '@/sections/Contact'
import { site } from '@/data/site'

export default function Home() {
  return (
    <>
      <title>{site.homeTitle}</title>
      <meta name="description" content={site.description} />
      <link rel="canonical" href={site.url + '/'} />
      <meta property="og:title" content={site.homeTitle} />
      <meta property="og:description" content={site.description} />
      <meta property="og:url" content={site.url + '/'} />

      <Hero />
      <Studio />
      <FeaturedWork />
      <ProjectsGrid />
      <About />
      <Skills />
      <Contact />
    </>
  )
}
