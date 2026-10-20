"use client";

import { motion } from "framer-motion";
import { EASE } from "./MaskText";

const SOLID = {
  forge: "var(--color-forge)",
  neural: "var(--color-neural)",
  cyan: "var(--color-cyan)",
} as const;

type Props = {
  tone?: "dark" | keyof typeof SOLID;
  /** Border colour a dark tile takes on hover */
  accent?: string;
  className?: string;
  innerClassName?: string;
  delay?: number;
  ready?: boolean;
  href?: string;
  label?: string;
  children: React.ReactNode;
};

/** One bento tile: a dark cut-corner panel, or a solid colour block with black type. */
export default function Tile({ tone = "dark", accent = "var(--color-forge)", className = "", innerClassName = "", delay = 0, ready = true, href, label, children }: Props) {
  const motionProps = {
    initial: { opacity: 0, y: 18 },
    animate: ready ? { opacity: 1, y: 0 } : { opacity: 0, y: 18 },
    transition: { duration: 0.7, ease: EASE, delay },
  };
  const Comp = href ? motion.a : motion.div;
  const linkProps = href ? { href, "aria-label": label } : {};

  if (tone === "dark") {
    return (
      <Comp
        {...motionProps}
        {...linkProps}
        className={`cut-frame cut group block transition-[background-color,translate] duration-300 [--frame:var(--color-line)] hover:-translate-y-0.5 hover:[--frame:var(--accent)] ${className}`}
        style={{ ["--accent" as string]: accent }}
      >
        <div className={`cut-inner cut relative h-full p-5 sm:p-6 ${innerClassName}`}>{children}</div>
      </Comp>
    );
  }

  return (
    <Comp
      {...motionProps}
      {...linkProps}
      className={`cut group relative block p-5 text-arena transition-[translate,box-shadow] duration-300 hover:-translate-y-0.5 hover:shadow-[inset_0_0_0_2px_var(--color-arena)] focus-visible:outline-arena sm:p-6 ${className} ${innerClassName}`}
      style={{ background: SOLID[tone] }}
    >
      {children}
    </Comp>
  );
}
