"use client";

import { useEffect, useRef, useState } from "react";

// Section id → glow colour.
const tints: Record<string, string | null> = {
  top: "var(--color-forge)",
  work: "var(--color-forge)",
  experience: "var(--color-neural)",
  contact: "var(--color-forge)",
};

/**
 * Fixed background behind the page: a faint grid, a brighter grid revealed around the cursor,
 * two slow "arena spotlight" beams, and a soft glow. Colours follow the current section.
 */
export default function Ambient() {
  const [tint, setTint] = useState<string | null>(null);
  const root = useRef<HTMLDivElement>(null);

  // Cursor reveal: ease the spotlight toward the pointer and write it to CSS vars (no re-renders)
  useEffect(() => {
    const el = root.current;
    const fine = window.matchMedia("(pointer: fine)").matches;
    const still = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (!el || !fine || still) return;
    let tx = innerWidth / 2;
    let ty = innerHeight / 3;
    let x = tx;
    let y = ty;
    let raf = 0;
    const tick = () => {
      x += (tx - x) * 0.14;
      y += (ty - y) * 0.14;
      el.style.setProperty("--cx", `${x.toFixed(1)}px`);
      el.style.setProperty("--cy", `${y.toFixed(1)}px`);
      raf = Math.abs(tx - x) + Math.abs(ty - y) > 0.5 ? requestAnimationFrame(tick) : 0;
    };
    const onMove = (e: PointerEvent) => {
      tx = e.clientX;
      ty = e.clientY;
      el.dataset.cursor = "on";
      if (!raf) raf = requestAnimationFrame(tick);
    };
    const onLeave = () => delete el.dataset.cursor;
    window.addEventListener("pointermove", onMove, { passive: true });
    document.documentElement.addEventListener("pointerleave", onLeave);
    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("pointermove", onMove);
      document.documentElement.removeEventListener("pointerleave", onLeave);
    };
  }, []);

  useEffect(() => {
    const els = Object.keys(tints)
      .map((id) => document.getElementById(id))
      .filter(Boolean) as HTMLElement[];
    const obs = new IntersectionObserver(
      (entries) => entries.forEach((e) => e.isIntersecting && setTint(tints[e.target.id])),
      { rootMargin: "-45% 0px -50% 0px" }
    );
    els.forEach((el) => obs.observe(el));
    return () => obs.disconnect();
  }, []);

  const on = tint !== null;

  return (
    <div
      ref={root}
      aria-hidden
      className="ambient pointer-events-none fixed inset-0 -z-10 overflow-hidden"
      style={{ ["--tint" as string]: tint ?? "var(--color-forge)" }}
    >
      <div
        className="arena-grid absolute inset-0 transition-opacity duration-1000 [mask-image:radial-gradient(ellipse_at_center,black_20%,transparent_75%)]"
        style={{ opacity: on ? 0.7 : 0 }}
      />
      <div className="grid-reveal absolute inset-0" />
      <div className="beam beam-a" style={{ opacity: on ? undefined : 0 }} />
      <div className="beam beam-b" style={{ opacity: on ? undefined : 0 }} />
      <div
        className="ambient-drift absolute -right-[20vw] -top-[25vh] h-[90vh] w-[70vw] transition-[background-color,opacity] duration-[1200ms] ease-out [mask-image:radial-gradient(closest-side,black,transparent)]"
        style={{ backgroundColor: tint ?? "transparent", opacity: on ? 0.11 : 0 }}
      />
      <div
        className="ambient-drift-alt absolute -bottom-[30vh] -left-[20vw] h-[80vh] w-[60vw] transition-[background-color,opacity] duration-[1200ms] ease-out [mask-image:radial-gradient(closest-side,black,transparent)]"
        style={{ backgroundColor: tint ?? "transparent", opacity: on ? 0.07 : 0 }}
      />
    </div>
  );
}
