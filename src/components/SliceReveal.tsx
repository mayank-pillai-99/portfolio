"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import { useEffect, useRef, useState } from "react";

type Props = { index: string; kicker: string; lines: [string, string]; note?: string };

const OPEN = "polygon(0% 8%, 100% 0%, 100% 92%, 0% 100%)";

/** A yellow slab that slices open from a thin diagonal as it scrolls into view, with drifting headline text. */
export default function SliceReveal({ index, kicker, lines, note }: Props) {
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
    <div ref={ref} className="relative py-6" aria-hidden>
      <motion.div
        className="relative flex min-h-[55vh] flex-col sm:min-h-[70vh] justify-center overflow-hidden bg-forge text-arena"
        style={{ clipPath: reduce ? OPEN : clipPath }}
      >
        <div className="halftone-dark absolute inset-0" />
        <div className="relative mx-auto mb-6 flex w-full max-w-6xl items-center gap-3 px-4 font-mono text-xs font-bold tracking-[0.25em] sm:px-6">
          <span className="skew-tag bg-arena px-3 py-1 text-forge">{index}</span>
          {kicker}
          <span className="h-px flex-1 bg-arena/30" />
        </div>
        <div className="relative mx-auto w-full max-w-6xl whitespace-nowrap px-4 font-display text-[22vw] uppercase leading-[0.82] sm:px-6 sm:text-[12vw] xl:text-[11rem]">
          <motion.p style={{ x: reduce ? 0 : left }}>{lines[0]}</motion.p>
          <motion.p className="text-transparent" style={{ x: reduce ? 0 : right, WebkitTextStroke: "2px var(--color-arena)" }}>
            {lines[1]}
          </motion.p>
        </div>
        {note && (
          <motion.p
            className="relative mx-auto mt-6 w-full max-w-6xl px-4 text-right font-mono text-xs font-bold tracking-[0.25em] sm:px-6"
            style={{ opacity: reduce ? 1 : fade }}
          >
            {note}
          </motion.p>
        )}
      </motion.div>
    </div>
  );
}
