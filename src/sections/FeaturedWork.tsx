import SectionHeading from '@/components/SectionHeading'
import FeaturedProject from '@/components/FeaturedProject'
import GradientText from '@/components/GradientText'
import { featuredProjects } from '@/data/projects'

export default function FeaturedWork() {
  return (
    <section id="work" className="scroll-mt-24 py-20 md:py-28">
      <div className="container-page">
        <SectionHeading
          eyebrow="Featured work"
          title={
            <>
              Products I’ve <GradientText>designed &amp; shipped</GradientText>
            </>
          }
          intro="A few flagships — each built solo, end to end, from database to native app. Tap any one for the full story."
        />

        <div className="mt-16 space-y-24 md:mt-20 md:space-y-32">
          {featuredProjects.map((project, i) => (
            <FeaturedProject key={project.slug} project={project} index={i} />
          ))}
        </div>
      </div>
    </section>
  )
}
