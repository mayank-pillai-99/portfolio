import { areaById, education, skillGroups } from "@/data/profile";
import Reveal from "./Reveal";
import Section from "./Section";

export default function Toolkit() {
  return (
    <Section id="toolkit" index="03" kicker="SKILLS & EDUCATION" title="Toolkit" color={areaById.arena.color}>
      <div className="grid gap-6 lg:grid-cols-[1.6fr_1fr]">
        <div className="grid gap-4 sm:grid-cols-2">
          {skillGroups.map((row, i) => {
            const color = areaById[row.area].color;
            return (
              <Reveal key={row.category} delay={(i % 2) * 0.06} className="h-full">
                <article className="cut-sm group relative h-full overflow-hidden bg-arena/80 p-5 transition-colors duration-300 hover:bg-arena">
                  <span
                    className="absolute inset-y-0 left-0 w-0.5 origin-top scale-y-50 transition-transform duration-500 group-hover:scale-y-100"
                    style={{ background: color }}
                  />
                  <h3 className="font-display text-2xl uppercase leading-none">{row.category}</h3>
                  <ul className="mt-4 flex flex-wrap gap-1.5">
                    {row.items.map((it) => (
                      <li key={it} className="border border-line bg-panel px-2 py-0.5 font-mono text-xs text-ink/90">
                        {it}
                      </li>
                    ))}
                  </ul>
                </article>
              </Reveal>
            );
          })}
        </div>

        <Reveal delay={0.1} className="h-full">
          <article className="cut-frame cut h-full" style={{ ["--frame" as string]: "var(--color-line)" }}>
            <div className="cut-inner cut relative flex flex-col p-6 sm:p-8" style={{ background: "var(--color-arena)" }}>
              <span aria-hidden className="absolute inset-x-0 top-0 h-1 bg-forge" />
              <p className="font-mono text-xs tracking-[0.2em] text-forge">EDUCATION · {education.period.toUpperCase()}</p>
              <h3 className="mt-3 font-display text-3xl uppercase leading-[0.95]">{education.degree}</h3>
              <p className="mt-2 text-dim">
                {education.school}, {education.location}
              </p>
              <div className="mt-6 flex items-baseline gap-3 border-y border-line py-5">
                <span className="font-display text-6xl leading-none text-forge">{education.cgpa.split(" / ")[0]}</span>
                <span className="font-mono text-xs tracking-[0.2em] text-dim">/ 10 CGPA</span>
              </div>
              <h4 className="mt-6 font-mono text-xs tracking-[0.2em] text-dim">COURSEWORK</h4>
              <ul className="mt-3 flex flex-wrap gap-1.5">
                {education.coursework.map((c) => (
                  <li key={c} className="border border-line px-2 py-0.5 font-mono text-xs text-ink/90">
                    {c}
                  </li>
                ))}
              </ul>
            </div>
          </article>
        </Reveal>
      </div>
    </Section>
  );
}
