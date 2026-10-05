"use client";

import { motion } from "framer-motion";

export const EASE = [0.22, 1, 0.36, 1] as const;

type Props = {
  text: string;
  className?: string;
  /** Animate each letter instead of the whole line */
  perChar?: boolean;
  delay?: number;
  stagger?: number;
  /** Play when scrolled into view instead of on mount */
  inView?: boolean;
  /** Letters nudge up in a wave when the parent `.group` is hovered */
  wave?: boolean;
  /** Hold the text hidden until this turns true */
  play?: boolean;
};

/** Text that rises out of a clipping mask. */
export default function MaskText({ text, className = "", perChar = false, delay = 0, stagger = 0.03, inView = false, wave = false, play = true }: Props) {
  const trigger = inView
    ? { initial: "hidden", whileInView: "shown", viewport: { once: true, margin: "-80px" } }
    : { initial: "hidden", animate: play ? "shown" : "hidden" };
  const rise = (i: number) => ({
    hidden: { y: "110%" },
    shown: { y: "0%", transition: { duration: 0.8, ease: EASE, delay: delay + i * stagger } },
  });

  if (!perChar) {
    return (
      <motion.span className={`block overflow-hidden pb-[0.06em] ${className}`} {...trigger}>
        <motion.span className="block" variants={rise(0)}>
          {text}
        </motion.span>
      </motion.span>
    );
  }

  return (
    <motion.span className={`block overflow-hidden pb-[0.06em] ${wave ? "pt-[0.08em]" : ""} ${className}`} aria-label={text} {...trigger}>
      {Array.from(text).map((ch, i) => (
        <span
          key={i}
          aria-hidden
          className={`inline-block ${wave ? "transition-transform duration-300 ease-out group-hover:-translate-y-[0.06em]" : ""}`}
          style={wave ? { transitionDelay: `${i * 25}ms` } : undefined}
        >
          <motion.span className="inline-block" variants={rise(i)}>
            {ch === " " ? " " : ch}
          </motion.span>
        </span>
      ))}
    </motion.span>
  );
}
