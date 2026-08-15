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
              What I’ve <GradientText>actually built</GradientText>
            </>
          }
          intro="My own products and one spec redesign a shop didn’t take — each one solo, end to end. The rebuilds I’ve done for local businesses aren’t here: those were built on spec, and they stay private unless the owner decides otherwise. Tap any one for the full story."
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
