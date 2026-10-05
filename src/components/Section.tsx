"use client";

import { motion } from "framer-motion";
import MaskText, { EASE } from "./MaskText";

type Props = {
  id: string;
  index: string;
  kicker: string;
  title: string;
  color?: string;
  /** Skip the built-in header (when something else introduces the section) */
  hideHeader?: boolean;
  children: React.ReactNode;
};

const view = { once: true, margin: "-100px" } as const;

export default function Section({ id, index, kicker, title, color = "var(--color-forge)", hideHeader = false, children }: Props) {
  return (
    <section id={id} className="relative mx-auto max-w-6xl px-4 py-24 sm:px-6 sm:py-32">
      {hideHeader ? (
        <h2 className="sr-only">{title}</h2>
      ) : (
        <motion.header className="relative mb-12 sm:mb-16" initial="hidden" whileInView="shown" viewport={view}>
          <motion.span
            aria-hidden
            className="outline-text pointer-events-none absolute -top-8 right-0 select-none font-display text-[7rem] leading-none sm:-top-14 sm:text-[11rem]"
            variants={{ hidden: { opacity: 0, x: -40 }, shown: { opacity: 1, x: 0, transition: { duration: 1, ease: EASE } } }}
          >
            {index}
          </motion.span>
          <div className="relative mb-4 flex items-center gap-3 font-mono text-xs tracking-[0.2em] text-dim">
            {/* Wrapper does the wipe so the tag keeps its own skewed clip-path */}
            <motion.span
              className="block"
              variants={{ hidden: { clipPath: "inset(0 100% 0 0)" }, shown: { clipPath: "inset(0 0% 0 0)", transition: { duration: 0.5, ease: EASE } } }}
            >
              <span className="skew-tag block px-3 py-1 font-bold text-arena" style={{ background: color }}>
                {index}
              </span>
            </motion.span>
            <motion.span variants={{ hidden: { opacity: 0 }, shown: { opacity: 1, transition: { duration: 0.5, delay: 0.2 } } }}>
              {kicker}
            </motion.span>
            <motion.span
              className="h-px flex-1 origin-left bg-line"
              variants={{ hidden: { scaleX: 0 }, shown: { scaleX: 1, transition: { duration: 0.9, delay: 0.15, ease: EASE } } }}
            />
          </div>
          <h2 className="relative font-display text-5xl uppercase leading-none sm:text-7xl">
            <MaskText text={title} inView delay={0.1} />
          </h2>
        </motion.header>
      )}
      {children}
    </section>
  );
}
