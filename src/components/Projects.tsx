import { projects } from "@/data/profile";
import FeaturedProject from "./FeaturedProject";
import ProjectCard from "./ProjectCard";
import Reveal from "./Reveal";
import Section from "./Section";
import SliceReveal from "./SliceReveal";

export default function Projects() {
  const featured = projects.slice(0, 2);
  const rest = projects.slice(2);

  return (
    <div id="projects" className="pt-10">
      <SliceReveal index="01" kicker="PROJECTS" lines={["Selected", "Work"]} note="LIVE DEMOS · SOURCE ON GITHUB" />
      <Section id="work" index="01" kicker="PROJECTS" title="Selected Work" hideHeader>
        <div className="-mt-8 space-y-12 sm:-mt-12">
          {featured.map((p, i) => (
            <Reveal key={p.name}>
              <FeaturedProject project={p} index={i + 1} flip={i % 2 === 1} />
            </Reveal>
          ))}
        </div>

        <div className="mt-12 grid gap-6 md:grid-cols-2">
          {rest.map((p, i) => (
            <Reveal key={p.name} className="h-full">
              <ProjectCard project={p} index={featured.length + i + 1} />
            </Reveal>
          ))}
        </div>
      </Section>
    </div>
  );
}
