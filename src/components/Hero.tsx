"use client";

import { motion, useMotionValue, useReducedMotion, useSpring, useTransform } from "framer-motion";
import { profile, projects } from "@/data/profile";
import { useIntroDone } from "./Intro";
import MaskText, { EASE } from "./MaskText";

const socials = [
  { label: "GitHub", href: profile.links.github },
  { label: "LinkedIn", href: profile.links.linkedin },
  { label: "LeetCode", href: profile.links.leetcode },
];

const shipping = projects[0];

export default function Hero() {
  const reduce = useReducedMotion();
  const ready = useIntroDone();
  const [first, last] = profile.name.toUpperCase().split(" ");
  const px = useMotionValue(0);
  const py = useMotionValue(0);
  const rotateY = useSpring(useTransform(px, [-0.5, 0.5], [-6, 6]), { stiffness: 120, damping: 18 });
  const rotateX = useSpring(useTransform(py, [-0.5, 0.5], [5, -5]), { stiffness: 120, damping: 18 });

  function onMove(e: React.PointerEvent<HTMLDivElement>) {
    if (reduce) return;
    const r = e.currentTarget.getBoundingClientRect();
    px.set((e.clientX - r.left) / r.width - 0.5);
    py.set((e.clientY - r.top) / r.height - 0.5);
  }
  function onLeave() {
    px.set(0);
    py.set(0);
  }

  const up = (delay: number) => ({
    initial: { opacity: 0, y: 24 },
    animate: ready ? { opacity: 1, y: 0 } : { opacity: 0, y: 24 },
    transition: { duration: 0.8, ease: EASE, delay },
  });

  return (
    <section id="top" className="arena-grid relative overflow-hidden pt-14">
      <div aria-hidden className="pointer-events-none absolute inset-x-0 top-1/2 -translate-y-1/2 select-none overflow-hidden opacity-50">
        <div className="marquee flex w-max whitespace-nowrap font-display text-[16rem] uppercase leading-none outline-text">
          <span className="pr-16">AI Engineer · Full-Stack Developer ·</span>
          <span className="pr-16">AI Engineer · Full-Stack Developer ·</span>
        </div>
      </div>
      <div aria-hidden className="pointer-events-none absolute inset-0 halftone [mask-image:linear-gradient(to_bottom,transparent,black_40%,transparent)]" />
      <div
        aria-hidden
        className="pointer-events-none absolute -right-48 top-0 h-[40rem] w-[40rem] rounded-full opacity-[0.12] blur-3xl"
        style={{ background: "radial-gradient(circle, var(--color-forge), transparent 65%)" }}
      />

      <div className="relative mx-auto grid max-w-6xl items-center gap-14 px-4 py-20 sm:px-6 lg:min-h-[calc(100vh-3.5rem)] lg:grid-cols-[1.15fr_1fr] lg:py-24">
        <div>
          <motion.p className="mb-6 flex flex-wrap items-center gap-x-3 gap-y-2 font-mono text-xs tracking-[0.25em] text-dim" {...up(0)}>
            <span className="skew-tag whitespace-nowrap bg-neural px-3 py-1 font-bold text-arena">AI ENGINEER</span>
            FULL-STACK DEVELOPER
          </motion.p>
          <h1 className="group w-fit font-display uppercase leading-[0.85]" aria-label={profile.name}>
            <MaskText text={first} perChar wave play={ready} delay={0.05} className="text-[22vw] sm:text-[9rem] lg:text-[10rem]" />
            <MaskText text={last} perChar wave play={ready} delay={0.2} className="text-[22vw] text-forge sm:text-[9rem] lg:text-[10rem]" />
          </h1>
          <motion.p className="mt-8 max-w-xl text-lg leading-relaxed text-dim" {...up(0.45)}>
            {profile.summary}
          </motion.p>
          <motion.ul className="mt-6 flex flex-wrap gap-x-8 gap-y-2 font-mono text-xs uppercase tracking-[0.2em]" {...up(0.55)}>
            {profile.proof.map((p) => (
              <li key={p.label} className="flex items-baseline gap-2">
                <span className="font-bold text-ink">{p.value}</span>
                <span className="text-dim">{p.label}</span>
              </li>
            ))}
          </motion.ul>
          <motion.div className="mt-10 flex flex-wrap gap-3" {...up(0.65)}>
            <a
              href={profile.resume}
              download
              className="btn-wipe cut-sm bg-forge px-6 py-3 font-display text-xl uppercase tracking-wide text-arena"
            >
              Download Resume
            </a>
            <a
              href="#contact"
              className="btn-wipe cut-sm border-2 border-ink px-6 py-3 font-display text-xl uppercase tracking-wide hover:text-arena"
            >
              Contact
            </a>
          </motion.div>
          <motion.ul className="mt-7 flex flex-wrap gap-5 font-mono text-sm" {...up(0.75)}>
            {socials.map((s) => (
              <li key={s.label}>
                <a href={s.href} target="_blank" rel="noreferrer" className="link-slide pb-0.5 text-dim hover:text-ink">
                  {s.label} ↗
                </a>
              </li>
            ))}
          </motion.ul>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={ready ? { opacity: 1, y: 0 } : { opacity: 0, y: 40 }}
          transition={{ duration: 1, ease: EASE, delay: 0.35 }}
          className="relative mx-auto w-full max-w-md [perspective:1000px]"
          onPointerMove={onMove}
          onPointerLeave={onLeave}
        >
          <motion.article
            className="cut-frame cut shadow-[14px_14px_0_rgb(255_212_0/0.12)]"
            style={{ ["--frame" as string]: "var(--color-forge)", rotateX, rotateY, transformStyle: "preserve-3d" }}
          >
            <div className="cut-inner cut relative overflow-hidden">
              <div className="hazard h-1.5" />
              <div className="flex items-center justify-between px-5 py-3 font-mono text-[11px] tracking-[0.2em]">
                <span className="flex items-center gap-2 text-dim">
                  <span className="live-dot h-1.5 w-1.5 rounded-full bg-forge" />
                  NOW SHIPPING
                </span>
                <span className="text-forge">{shipping.date?.toUpperCase()}</span>
              </div>
              <a
                href={shipping.live ?? shipping.repo}
                target="_blank"
                rel="noreferrer"
                aria-label={`Open ${shipping.name} live demo`}
                className="group/shot relative block aspect-[16/10] overflow-hidden border-y border-line bg-panel-2"
              >
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src="/projects/copilot-chat.webp"
                  alt="Codebase Copilot answering a question with file and line citations"
                  className="h-full w-full object-cover object-top transition-transform duration-700 ease-out group-hover/shot:scale-[1.04]"
                />
                <span className="skew-tag absolute bottom-3 right-3 bg-forge px-3 py-1 font-mono text-[11px] font-bold tracking-widest text-arena opacity-0 transition-opacity duration-300 group-hover/shot:opacity-100">
                  LIVE ↗
                </span>
              </a>
              <div className="p-5">
                <h2 className="font-display text-3xl uppercase leading-none">{shipping.name}</h2>
                <p className="mt-2 text-sm leading-relaxed text-dim">{shipping.impact}</p>
                <ul className="mt-4 flex flex-wrap gap-1.5">
                  {shipping.stack.slice(0, 4).map((t) => (
                    <li key={t} className="border border-line px-2 py-0.5 font-mono text-[11px] text-dim">
                      {t}
                    </li>
                  ))}
                </ul>
                <div className="mt-5 flex items-center justify-between border-t border-line pt-4 font-mono text-xs uppercase tracking-widest">
                  <a href={shipping.live} target="_blank" rel="noreferrer" className="link-slide pb-0.5 text-forge">
                    Live demo ↗
                  </a>
                  <a href="#projects" className="link-slide pb-0.5 text-dim hover:text-ink">
                    All projects ↓
                  </a>
                </div>
              </div>
            </div>
          </motion.article>
        </motion.div>
      </div>
    </section>
  );
}
