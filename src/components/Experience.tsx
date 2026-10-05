"use client";

import { motion } from "framer-motion";
import { experience, areaById } from "@/data/profile";
import CountUp from "./CountUp";
import Reveal from "./Reveal";
import Section from "./Section";

export default function Experience() {
  const pink = areaById.neural.color;

  return (
    <Section id="experience" index="02" kicker="INTERNSHIP" title="Experience" color={pink}>
      <div className="grid gap-6 lg:grid-cols-[1.2fr_1fr]">
        <Reveal>
          <article className="cut-frame cut spot h-full" style={{ ["--frame" as string]: "var(--color-line)" }}>
            <div className="cut-inner cut relative p-6 sm:p-8">
              <span aria-hidden className="absolute inset-x-0 top-0 h-1 bg-neural" />
              <p className="font-mono text-xs tracking-[0.2em] text-neural">{experience.period.toUpperCase()} · {experience.location.toUpperCase()}</p>
              <h3 className="mt-3 font-display text-3xl uppercase leading-[0.95] sm:text-4xl">{experience.project}</h3>
              <p className="mt-2 text-dim">
                {experience.title} · {experience.org} ·{" "}
                <a href={experience.repo} target="_blank" rel="noreferrer" className="link-slide pb-0.5 text-cyan">
                  Source ↗
                </a>
              </p>
              <ul className="mt-6 space-y-4">
                {experience.points.map((p) => (
                  <li key={p} className="flex gap-3 leading-relaxed text-dim">
                    <span className="mt-2 h-2 w-2 shrink-0 rotate-45 bg-neural" />
                    {p}
                  </li>
                ))}
              </ul>
            </div>
          </article>
        </Reveal>

        <div className="flex flex-col gap-6">
          <Reveal delay={0.1}>
            <div className="cut spot bg-panel p-6">
              <div className="mb-5 flex items-center justify-between">
                <h4 className="font-display text-2xl uppercase">Model Benchmark</h4>
                <span className="font-mono text-[11px] tracking-[0.2em] text-dim">ZERO-SHOT PASS RATE</span>
              </div>
              <ol className="space-y-4">
                {experience.benchmark.map((m, i) => (
                  <li key={m.name}>
                    <div className="mb-1 flex items-baseline justify-between gap-2 font-mono text-sm">
                      <span className={m.winner ? "font-bold text-forge" : "text-dim"}>
                        {i + 1}. {m.name}
                      </span>
                      <span className="font-bold">
                        <CountUp value={m.value} decimals={1} suffix="%" />
                      </span>
                    </div>
                    <div className="h-3 bg-panel-2">
                      <motion.div
                        className="h-full"
                        style={{ background: m.winner ? "var(--color-forge)" : "var(--color-line)" }}
                        initial={{ width: 0 }}
                        whileInView={{ width: `${m.value}%` }}
                        viewport={{ once: true }}
                        transition={{ duration: 1, delay: i * 0.15, ease: "easeOut" }}
                      />
                    </div>
                  </li>
                ))}
              </ol>
            </div>
          </Reveal>

          <div className="grid grid-cols-2 gap-4">
            {experience.highlights.map((h, i) => (
              <Reveal key={h.label} delay={0.15 + i * 0.05}>
                <div className="cut-sm spot h-full bg-panel p-4">
                  <p className="font-display text-4xl text-cyan">
                    <CountUp value={h.value} decimals={h.decimals} suffix={h.suffix} />
                  </p>
                  <p className="mt-1 font-mono text-[11px] uppercase tracking-widest text-dim">{h.label}</p>
                  {h.note && <p className="mt-1 font-mono text-[11px] text-dim/80">{h.note}</p>}
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </div>
    </Section>
  );
}
