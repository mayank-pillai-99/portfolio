"use client";

import { motion } from "framer-motion";
import { useLayoutEffect, useState } from "react";
import { profile } from "@/data/profile";
import MaskText, { EASE } from "./MaskText";

const KEY = "intro-seen";

// Diagonal panel that sweeps off to the right
const COVER = "polygon(-15% 0%, 115% 0%, 115% 100%, 0% 100%)";
const GONE = "polygon(115% 0%, 130% 0%, 130% 100%, 130% 100%)";

export default function Intro() {
  const [phase, setPhase] = useState<"off" | "in" | "out">("off");

  useLayoutEffect(() => {
    let seen = false;
    try {
      seen = sessionStorage.getItem(KEY) === "1";
    } catch {}
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (seen || reduce) return;

    document.documentElement.dataset.intro = "playing";
    setPhase("in");
    const outT = setTimeout(leave, 1050);
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && leave();
    window.addEventListener("keydown", onKey);
    return () => {
      clearTimeout(outT);
      window.removeEventListener("keydown", onKey);
    };
  }, []);

  function leave() {
    try {
      sessionStorage.setItem(KEY, "1");
    } catch {}
    setPhase((p) => (p === "in" ? "out" : p));
    if (document.documentElement.dataset.intro === "playing") {
      delete document.documentElement.dataset.intro;
      // Let the hero start rising as the panels uncover it
      setTimeout(() => window.dispatchEvent(new Event("intro:done")), 150);
    }
    setTimeout(() => setPhase("off"), 900);
  }

  if (phase === "off") return null;
  const wipe = { clipPath: phase === "out" ? GONE : COVER };
  const [first, last] = profile.name.toUpperCase().split(" ");

  return (
    <div className="fixed inset-0 z-[100]" onClick={leave} aria-hidden>
      <motion.div
        className="absolute inset-0 bg-forge"
        initial={{ clipPath: COVER }}
        animate={wipe}
        transition={{ duration: 0.6, ease: [0.7, 0, 0.25, 1], delay: 0.12 }}
      />
      <motion.div
        className="arena-grid absolute inset-0 flex flex-col items-center justify-center bg-arena"
        initial={{ clipPath: COVER }}
        animate={wipe}
        transition={{ duration: 0.6, ease: [0.7, 0, 0.25, 1] }}
      >
        <div className="text-center font-display text-7xl uppercase leading-[0.9] sm:text-9xl">
          <MaskText text={first} />
          <MaskText text={last} className="text-forge" delay={0.08} />
        </div>
        <div className="mt-6 h-[2px] w-48 overflow-hidden bg-line sm:w-64">
          <motion.div
            className="h-full origin-left bg-forge"
            initial={{ scaleX: 0 }}
            animate={{ scaleX: 1 }}
            transition={{ duration: 0.9, ease: EASE }}
          />
        </div>
        <motion.p
          className="mt-4 font-mono text-xs tracking-[0.35em] text-dim"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3, duration: 0.4 }}
        >
          {profile.role.toUpperCase()}
        </motion.p>
      </motion.div>
    </div>
  );
}

/** True once the intro has finished (or immediately if there is none). */
export function useIntroDone() {
  const [done, setDone] = useState(false);
  useLayoutEffect(() => {
    if (document.documentElement.dataset.intro !== "playing") {
      setDone(true);
      return;
    }
    const on = () => setDone(true);
    window.addEventListener("intro:done", on, { once: true });
    return () => window.removeEventListener("intro:done", on);
  }, []);
  return done;
}
