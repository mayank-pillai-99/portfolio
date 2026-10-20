"use client";

import { experience, profile, stackGroups } from "@/data/profile";
import BrandIcon from "./BrandIcon";
import CountUp from "./CountUp";
import { useCopyEmail } from "./CopyEmail";
import { useIntroDone } from "./Intro";
import MaskText from "./MaskText";
import ShippingTile from "./ShippingTile";
import Tile from "./Tile";

const socials = [
  { label: "GitHub", href: profile.links.github },
  { label: "LinkedIn", href: profile.links.linkedin },
  { label: "LeetCode", href: profile.links.leetcode },
];

/** First screen: identity, current project, best metric, education, stack and contact as tiles. */
export default function Bento() {
  const ready = useIntroDone();
  const { copy, toast } = useCopyEmail();
  const [first, last] = profile.name.toUpperCase().split(" ");
  const top = experience.benchmark[0];

  return (
    <section id="top" className="relative pt-14">
      <div className="mx-auto max-w-6xl px-4 py-5 sm:px-6 lg:py-6">
        <div className="grid grid-cols-2 gap-3 sm:gap-4 lg:grid-cols-12">
          {/* Identity */}
          <Tile ready={ready} delay={0} className="col-span-2 lg:col-span-7 lg:row-span-2" innerClassName="arena-grid flex flex-col overflow-hidden sm:p-8">
            <div aria-hidden className="pointer-events-none absolute inset-0 halftone [mask-image:linear-gradient(to_top,black,transparent_70%)]" />
            <p className="relative flex flex-wrap items-center gap-x-3 gap-y-2 font-mono text-xs tracking-[0.25em] text-dim">
              <span className="skew-tag whitespace-nowrap bg-neural px-3 py-1 font-bold text-arena">AI ENGINEER</span>
              FULL-STACK DEVELOPER
            </p>
            <h1 className="group relative mt-6 w-fit font-display uppercase leading-[0.85]" aria-label={profile.name}>
              <MaskText text={first} perChar wave play={ready} delay={0.1} className="text-[20vw] sm:text-[7rem] lg:text-[8.75rem]" />
              <MaskText text={last} perChar wave play={ready} delay={0.25} className="text-[20vw] text-forge sm:text-[7rem] lg:text-[7.5rem]" />
            </h1>
            <p className="relative mt-6 max-w-lg text-lg leading-relaxed text-dim">{profile.summary}</p>
            <div className="relative mt-auto flex flex-wrap items-center gap-x-6 gap-y-5 pt-8">
              <div className="flex flex-wrap gap-3">
                <a href={profile.resume} download className="btn-wipe cut-sm bg-forge px-4 py-2.5 font-display text-lg uppercase tracking-wide text-arena sm:px-6 sm:py-3 sm:text-xl">
                  Download Resume
                </a>
                <a href="#contact" className="btn-wipe cut-sm border-2 border-ink px-4 py-2.5 font-display text-lg uppercase tracking-wide hover:text-arena sm:px-6 sm:py-3 sm:text-xl">
                  Contact
                </a>
              </div>
              <ul className="flex flex-wrap gap-5 font-mono text-sm">
                {socials.map((s) => (
                  <li key={s.label}>
                    <a href={s.href} target="_blank" rel="noreferrer" className="link-slide pb-0.5 text-dim hover:text-ink">
                      {s.label} ↗
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          </Tile>

          <ShippingTile ready={ready} delay={0.1} className="col-span-2 lg:col-span-5" />

          {/* Best metric */}
          <Tile ready={ready} delay={0.18} tone="forge" href="#experience" label="Text-to-SQL benchmark: see experience" className="col-span-1 lg:col-span-3" innerClassName="flex flex-col">
            <span className="font-mono text-xs font-bold tracking-[0.2em] opacity-75">
              TEXT-TO-SQL<span className="hidden sm:inline"> · BITS &apos;26</span>
            </span>
            <span className="mt-1 font-display text-6xl leading-none sm:text-7xl">
              <CountUp value={top.value} suffix="%" />
            </span>
            <ul className="mt-auto space-y-1.5 pt-3">
              {experience.benchmark.map((m) => (
                <li key={m.name} className="font-mono text-xs">
                  <div className="flex justify-between gap-2">
                    <span className={m.winner ? "font-bold" : "opacity-75"}>{m.name}</span>
                    <span className="hidden sm:inline">{m.value.toFixed(0)}%</span>
                  </div>
                  <div className="mt-1 h-1 bg-arena/15">
                    <div className="h-full bg-arena" style={{ width: `${m.value}%`, opacity: m.winner ? 1 : 0.45 }} />
                  </div>
                </li>
              ))}
            </ul>
          </Tile>

          {/* Education */}
          <Tile ready={ready} delay={0.24} tone="neural" className="col-span-1 lg:col-span-2" innerClassName="flex flex-col">
            <span className="font-mono text-xs font-bold tracking-[0.2em] opacity-75">CGPA</span>
            <span className="mt-1 font-display text-6xl leading-none sm:text-7xl">9.45</span>
            <span className="mt-auto pt-3 font-mono text-xs font-bold leading-relaxed tracking-wider">
              B.TECH AI
              <br />
              NEWTON SCHOOL &apos;28
            </span>
          </Tile>

          {/* Stack */}
          <Tile ready={ready} delay={0.3} className="col-span-2 lg:col-span-8" accent="var(--color-cyan)">
            <h2 className="mb-3 font-mono text-xs tracking-[0.2em] text-dim">STACK</h2>
            <ul className="flex flex-wrap items-center gap-1.5">
              {stackGroups.map((g) => [
                <li key={g.label} className="ml-1 mr-1 flex items-center gap-2 font-mono text-xs font-bold uppercase tracking-[0.15em] first:ml-0">
                  <span aria-hidden className="h-2 w-2" style={{ background: g.color }} />
                  {g.label}
                </li>,
                ...g.items.map((it) => (
                  <li key={it.name} className="flex items-center gap-2 border border-line bg-arena/60 px-2.5 py-1 font-mono text-xs text-ink">
                    <BrandIcon icon={it.icon} name={it.name} />
                    {it.name}
                  </li>
                )),
              ])}
            </ul>
          </Tile>

          {/* Contact */}
          <Tile ready={ready} delay={0.36} tone="cyan" className="col-span-2 lg:col-span-4" innerClassName="flex flex-col">
            <span className="font-mono text-xs font-bold tracking-[0.2em] opacity-75">GET IN TOUCH</span>
            <span className="mt-1 font-display text-5xl uppercase leading-none">Let&apos;s talk</span>
                        <div className="mt-auto flex flex-wrap items-center gap-x-4 gap-y-3 pt-3">
              <button onClick={copy} className="btn-wipe cut-sm bg-arena px-4 py-2 font-display text-lg uppercase tracking-wide text-cyan [--wipe:var(--color-ink)] hover:text-arena">
                Copy email
              </button>
              <a href={`mailto:${profile.links.email}`} className="link-slide pb-0.5 font-mono text-xs font-bold uppercase tracking-widest">
                Email ↗
              </a>
            </div>
            <ul className="mt-3 flex flex-wrap gap-4 font-mono text-xs font-bold uppercase tracking-widest">
              {socials.map((s) => (
                <li key={s.label}>
                  <a href={s.href} target="_blank" rel="noreferrer" className="link-slide pb-0.5">
                    {s.label} ↗
                  </a>
                </li>
              ))}
            </ul>
          </Tile>
        </div>
      </div>
      {toast}
    </section>
  );
}
