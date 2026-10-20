"use client";

import { AnimatePresence, motion, useMotionValueEvent, useScroll } from "framer-motion";
import { useEffect, useRef, useState } from "react";
import { EASE } from "./MaskText";

/** Return-to-top control. Shows only while scrolling back up past the hero, so it doesn't sit on content while reading. */
export default function BackToTop() {
  const { scrollY } = useScroll();
  const last = useRef(0);
  const [show, setShow] = useState(false);
  const [footer, setFooter] = useState(false);

  useMotionValueEvent(scrollY, "change", (y) => {
    const up = y < last.current - 2;
    const down = y > last.current + 2;
    last.current = y;
    if (y < window.innerHeight * 0.9) setShow(false);
    else if (up) setShow(true);
    else if (down) setShow(false);
  });

  useEffect(() => {
    const el = document.getElementById("site-footer");
    if (!el) return;
    const obs = new IntersectionObserver(([e]) => setFooter(e.isIntersecting));
    obs.observe(el);
    return () => obs.disconnect();
  }, []);

  return (
    <AnimatePresence>
      {show && !footer && (
        <motion.div
          className="fixed right-4 z-30 sm:right-5"
          style={{ bottom: "max(1rem, env(safe-area-inset-bottom))" }}
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 16 }}
          transition={{ duration: 0.3, ease: EASE }}
        >
          {/* Positioned by the wrapper: .btn-wipe sets position: relative */}
          <a
            href="#top"
            aria-label="Back to top"
            className="btn-wipe cut-sm flex h-9 w-9 items-center justify-center border border-line bg-panel font-display text-lg text-ink [--wipe:var(--color-forge)] hover:text-arena sm:h-11 sm:w-11 sm:text-xl"
          >
            ↑
          </a>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
