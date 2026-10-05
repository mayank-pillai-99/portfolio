"use client";

import { useEffect, useState } from "react";

// Section id → glow colour. The hero has its own backdrop, so the glow stays off there.
const tints: Record<string, string | null> = {
  top: null,
  work: "var(--color-forge)",
  experience: "var(--color-neural)",
  toolkit: "var(--color-cyan)",
  contact: "var(--color-forge)",
};

/** Fixed background behind the page: a faint grid plus a soft glow that takes on the current section's colour. */
export default function Ambient() {
  const [tint, setTint] = useState<string | null>(null);

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
    <div aria-hidden className="pointer-events-none fixed inset-0 -z-10 overflow-hidden">
      <div
        className="arena-grid absolute inset-0 transition-opacity duration-1000 [mask-image:radial-gradient(ellipse_at_center,black_20%,transparent_75%)]"
        style={{ opacity: on ? 0.7 : 0 }}
      />
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
