"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import { useEffect, useRef, useState } from "react";

type Item = { n: string; name: string; href: string };
type Props = { index: string; kicker: string; lines: [string, string]; items?: Item[] };

const OPEN = "polygon(0% 8%, 100% 0%, 100% 92%, 0% 100%)";

/** A yellow slab that slices open from a thin diagonal as it scrolls into view, with drifting headline text and an index of what follows. */
export default function SliceReveal({ index, kicker, lines, items = [] }: Props) {
  const ref = useRef<HTMLDivElement>(null);
  // Read after mount so server and client render the same markup
  const [reduce, setReduce] = useState(false);
  useEffect(() => setReduce(window.matchMedia("(prefers-reduced-motion: reduce)").matches), []);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] });

  // 0 → 0.4: the slit opens into the full slab; afterwards it stays open
  const open = useTransform(scrollYProgress, [0.05, 0.4], [0, 1], { clamp: true });
  const clipPath = useTransform(open, (t) => {
    const l = (a: number, b: number) => (a + (b - a) * t).toFixed(2);
    return `polygon(0% ${l(54, 8)}%, 100% ${l(46, 0)}%, 100% ${l(46, 92)}%, 0% ${l(54, 100)}%)`;
  });
  const left = useTransform(scrollYProgress, [0, 1], ["5%", "-5%"]);
  const right = useTransform(scrollYProgress, [0, 1], ["-3%", "7%"]);
  const fade = useTransform(open, [0.5, 1], [0, 1]);

  return (
    <div ref={ref} className="relative py-6">
      <motion.div
        className="relative flex min-h-[45vh] flex-col justify-center overflow-hidden bg-forge py-14 text-arena"
        style={{ clipPath: reduce ? OPEN : clipPath }}
      >
        <div aria-hidden className="halftone-dark absolute inset-0" />
        <div className="relative mx-auto grid w-full max-w-6xl gap-10 px-4 sm:px-6 lg:grid-cols-[1.35fr_1fr] lg:items-end">
          <div aria-hidden>
            <div className="mb-5 flex items-center gap-3 font-mono text-xs font-bold tracking-[0.25em]">
              <span className="skew-tag bg-arena px-3 py-1 text-forge">{index}</span>
              {kicker}
            </div>
            <div className="whitespace-nowrap font-display text-[22vw] uppercase leading-[0.82] sm:text-[11vw] lg:text-[8.5rem]">
              <motion.p style={{ x: reduce ? 0 : left }}>{lines[0]}</motion.p>
              <motion.p className="text-transparent" style={{ x: reduce ? 0 : right, WebkitTextStroke: "2px var(--color-arena)" }}>
                {lines[1]}
              </motion.p>
            </div>
          </div>
          {items.length > 0 && (
            <motion.nav aria-label="Projects on this page" style={{ opacity: reduce ? 1 : fade }}>
              <ol className="border-t-2 border-arena">
                {items.map((it) => (
                  <li key={it.href} className="border-b border-arena/25">
                    <a
                      href={it.href}
                      className="group flex items-baseline gap-4 py-2.5 focus-visible:outline-arena"
                    >
                      <span className="font-mono text-xs font-bold">{it.n}</span>
                      <span className="flex-1 font-display text-2xl uppercase leading-none sm:text-3xl">{it.name}</span>
                      <span aria-hidden className="font-display text-xl transition-transform duration-300 group-hover:translate-y-1">
                        ↓
                      </span>
                    </a>
                  </li>
                ))}
              </ol>
            </motion.nav>
          )}
        </div>
      </motion.div>
    </div>
  );
}
