import { projects } from "@/data/profile";
import ProjectRow from "./ProjectRow";
import Reveal from "./Reveal";
import Section from "./Section";
import SliceReveal from "./SliceReveal";

export default function Projects() {
  const featured = projects.slice(0, 2);
  const rest = projects.slice(2);
  const index = projects.map((p, i) => ({ n: String(i + 1).padStart(2, "0"), name: p.name, href: `#project-${p.slug}` }));

  return (
    <div id="projects" className="pt-8">
      <SliceReveal index="01" kicker="PROJECTS" lines={["Selected", "Work"]} items={index} />
      <Section id="work" index="01" kicker="PROJECTS" title="Selected Work" hideHeader>
        <div className="-mt-6 space-y-16 sm:-mt-10">
          {featured.map((p, i) => (
            <Reveal key={p.slug} className={i > 0 ? "border-t border-line pt-16" : ""}>
              <ProjectRow project={p} index={i + 1} flip={i % 2 === 1} />
            </Reveal>
          ))}
        </div>
        <div className="mt-16 grid gap-14 border-t border-line pt-16 md:grid-cols-2 md:gap-10">
          {rest.map((p, i) => (
            <Reveal key={p.slug} delay={(i % 2) * 0.08}>
              <ProjectRow project={p} index={featured.length + i + 1} compact />
            </Reveal>
          ))}
        </div>
      </Section>
    </div>
  );
}
