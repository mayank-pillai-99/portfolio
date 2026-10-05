import { areaById, type Project } from "@/data/profile";
import ProjectGallery from "./ProjectGallery";

export default function ProjectCard({ project, index, compact = false }: { project: Project; index: number; compact?: boolean }) {
  const area = areaById[project.area];
  return (
    <article
      className="cut-frame cut spot group h-full [--frame:var(--color-line)] transition-[background-color,translate] duration-300 hover:-translate-y-1 hover:[--frame:var(--accent)]"
      style={{ ["--accent" as string]: area.color }}
    >
      <div className="cut-inner cut relative flex flex-col overflow-hidden p-6">
        {project.images ? (
          <ProjectGallery images={project.images} color={area.color} href={project.live ?? project.repo} name={project.name} />
        ) : (
          <div
            className="arena-grid relative -mx-6 -mt-6 mb-5 flex aspect-[16/10] items-center justify-center overflow-hidden border-b-2 bg-panel-2"
            style={{ borderColor: area.color }}
            aria-hidden
          >
            <span className="font-display text-5xl uppercase opacity-20" style={{ color: area.color }}>
              {project.name}
            </span>
            <span className="hazard absolute bottom-0 right-0 h-2 w-24" style={{ ["--stripe" as string]: area.color }} />
          </div>
        )}
        <div className="flex items-center justify-between font-mono text-[11px] tracking-[0.2em] text-dim">
          <span>{String(index).padStart(2, "0")}</span>
          <span style={{ color: area.color }}>{area.name}</span>
        </div>
        <h3 className={`mt-3 font-display uppercase leading-none ${compact ? "text-2xl" : "text-4xl"}`}>{project.name}</h3>
        {project.date && <p className="mt-1 font-mono text-xs text-dim">{project.date}</p>}
        {project.impact && <p className="mt-3 leading-snug text-ink">{project.impact}</p>}

        <ul className="mt-4 space-y-2 text-sm leading-relaxed text-dim">
          {project.points.map((p) => (
            <li key={p} className="flex gap-2">
              <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rotate-45" style={{ background: area.color }} />
              {p}
            </li>
          ))}
        </ul>

        <ul className="mb-5 mt-5 flex flex-wrap gap-1.5">
          {project.stack.map((t) => (
            <li key={t} className="border border-line px-2 py-0.5 font-mono text-[11px] text-dim">
              {t}
            </li>
          ))}
        </ul>

        <div className="mt-auto flex gap-2">
          {project.live && (
            <a
              href={project.live}
              target="_blank"
              rel="noreferrer"
              className="skew-tag px-4 py-1.5 font-mono text-xs font-bold uppercase tracking-widest text-arena transition-opacity hover:opacity-85"
              style={{ background: area.color }}
              aria-label={`${project.name} live demo`}
            >
              Live ↗
            </a>
          )}
          <a
            href={project.repo}
            target="_blank"
            rel="noreferrer"
            className="skew-tag bg-panel-2 px-4 py-1.5 font-mono text-xs font-bold uppercase tracking-widest text-ink transition-colors hover:bg-ink hover:text-arena"
            aria-label={`${project.name} source code`}
          >
            Code ↗
          </a>
        </div>
      </div>
    </article>
  );
}
