"use client";

import { useState } from "react";
import { areaById, type Project } from "@/data/profile";
import ProjectGallery from "./ProjectGallery";

type Props = { project: Project; index: number; flip?: boolean; compact?: boolean };

/** An open, editorial project row: screenshot on one side, story on the other. */
export default function ProjectRow({ project, index, flip = false, compact = false }: Props) {
  const [open, setOpen] = useState(false);
  const area = areaById[project.area];
  const n = String(index).padStart(2, "0");

  return (
    <article id={`project-${project.slug}`} className={`scroll-mt-20 grid gap-8 ${compact ? "" : "lg:grid-cols-[1.3fr_1fr] lg:items-center lg:gap-12"}`}>
      <div className={flip ? "lg:order-2" : ""}>
        {project.images && <ProjectGallery images={project.images} color={area.color} href={project.live ?? project.repo} name={project.name} />}
      </div>

      <div>
        <div className="flex items-baseline gap-4">
          <span className={`font-display leading-none ${compact ? "text-4xl" : "text-6xl"}`} style={{ color: area.color }}>
            {n}
          </span>
          <span className="font-mono text-xs tracking-[0.2em] text-dim">
            {area.name.toUpperCase()}
            {project.date && ` · ${project.date.toUpperCase()}`}
          </span>
        </div>
        <h3 className={`mt-3 font-display uppercase leading-[0.9] ${compact ? "text-4xl" : "text-5xl sm:text-6xl"}`}>{project.name}</h3>
        {project.impact && <p className={`mt-4 leading-snug text-ink ${compact ? "" : "text-lg"}`}>{project.impact}</p>}

        <ul className="mt-5 space-y-3 text-[15px] leading-relaxed text-dim">
          {project.points.map((p, i) => (
            <li key={p} className={`gap-3 ${i > 0 && !open ? "hidden md:flex" : "flex"}`}>
              <span className="mt-2 h-1.5 w-1.5 shrink-0 rotate-45" style={{ background: area.color }} />
              {p}
            </li>
          ))}
        </ul>
        {project.points.length > 1 && (
          <button
            onClick={() => setOpen((o) => !o)}
            aria-expanded={open}
            className="mt-3 font-mono text-xs uppercase tracking-widest text-dim underline-offset-4 hover:text-ink hover:underline md:hidden"
          >
            {open ? "Less" : "More details"} {open ? "↑" : "↓"}
          </button>
        )}

        <ul className="mt-5 flex flex-wrap gap-1.5">
          {project.stack.map((t) => (
            <li key={t} className="border border-line px-2 py-0.5 font-mono text-xs text-dim">
              {t}
            </li>
          ))}
        </ul>

        <div className="mt-6 flex flex-wrap gap-3">
          {project.live && (
            <a
              href={project.live}
              target="_blank"
              rel="noreferrer"
              className={`btn-wipe cut-sm font-display uppercase tracking-wide text-arena ${compact ? "px-4 py-2 text-base" : "px-5 py-2.5 text-lg"}`}
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
            className={`btn-wipe cut-sm border-2 border-line font-display uppercase tracking-wide hover:border-ink hover:text-arena ${compact ? "px-4 py-2 text-base" : "px-5 py-2.5 text-lg"}`}
            aria-label={`${project.name} source code`}
          >
            Source ↗
          </a>
        </div>
      </div>
    </article>
  );
}
