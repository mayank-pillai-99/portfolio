import { areaById, type Project } from "@/data/profile";
import ProjectGallery from "./ProjectGallery";

export default function FeaturedProject({ project, index, flip = false }: { project: Project; index: number; flip?: boolean }) {
  const area = areaById[project.area];
  return (
    <article className="cut-frame cut spot group [--frame:var(--color-line)] transition-[background-color,translate] duration-300 hover:-translate-y-1 hover:[--frame:var(--accent)]" style={{ ["--accent" as string]: area.color }}>
      <div className={`cut-inner cut grid lg:grid-cols-[1.35fr_1fr] ${flip ? "lg:[&>*:first-child]:order-2" : ""}`}>
        <div className="relative flex flex-col justify-center bg-arena p-3 sm:p-4">
          {project.images && (
            <ProjectGallery
              images={project.images}
              color={area.color}
              href={project.live ?? project.repo}
              name={project.name}
              className=""
              thumbsClassName="pt-3"
            />
          )}
        </div>

        <div className="relative flex flex-col overflow-hidden p-6 sm:p-8">
          <span aria-hidden className="outline-text pointer-events-none absolute -right-2 -top-6 select-none font-display text-[8rem] leading-none">
            {String(index).padStart(2, "0")}
          </span>
          <div className="relative flex items-center gap-3 font-mono text-[11px] tracking-[0.2em]">
            <span className="skew-tag px-3 py-0.5 font-bold text-arena" style={{ background: area.color }}>
              FEATURED
            </span>
            <span style={{ color: area.color }}>{area.name.toUpperCase()}</span>
            {project.date && <span className="text-dim">· {project.date.toUpperCase()}</span>}
          </div>
          <h3 className="relative mt-4 font-display text-5xl uppercase leading-[0.9] sm:text-6xl">{project.name}</h3>
          {project.impact && <p className="relative mt-3 text-lg leading-snug text-ink">{project.impact}</p>}

          <ul className="relative mt-5 space-y-3 text-[15px] leading-relaxed text-dim">
            {project.points.map((p) => (
              <li key={p} className="flex gap-3">
                <span className="mt-2 h-1.5 w-1.5 shrink-0 rotate-45" style={{ background: area.color }} />
                {p}
              </li>
            ))}
          </ul>

          <ul className="relative mb-6 mt-6 flex flex-wrap gap-1.5">
            {project.stack.map((t) => (
              <li key={t} className="border border-line bg-arena/60 px-2 py-0.5 font-mono text-[11px] text-dim">
                {t}
              </li>
            ))}
          </ul>

          <div className="relative mt-auto flex gap-3">
            {project.live && (
              <a
                href={project.live}
                target="_blank"
                rel="noreferrer"
                className="btn-wipe cut-sm px-5 py-2.5 font-display text-lg uppercase tracking-wide text-arena"
                style={{ background: area.color }}
                aria-label={`${project.name} live demo`}
              >
                Live Demo ↗
              </a>
            )}
            <a
              href={project.repo}
              target="_blank"
              rel="noreferrer"
              className="btn-wipe cut-sm border-2 border-line px-5 py-2.5 font-display text-lg uppercase tracking-wide hover:border-ink hover:text-arena"
              aria-label={`${project.name} source code`}
            >
              Source ↗
            </a>
          </div>
        </div>
      </div>
    </article>
  );
}
