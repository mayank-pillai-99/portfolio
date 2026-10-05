"use client";

import { AnimatePresence, motion, useMotionValueEvent, useScroll } from "framer-motion";
import { useState } from "react";
import { EASE } from "./MaskText";

/** Small return-to-top control that appears once the hero is out of view. */
export default function BackToTop() {
  const { scrollY } = useScroll();
  const [show, setShow] = useState(false);
  useMotionValueEvent(scrollY, "change", (y) => setShow(y > window.innerHeight * 0.9));

  return (
    <AnimatePresence>
      {show && (
        <motion.div
          className="fixed bottom-5 right-5 z-40"
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 16 }}
          transition={{ duration: 0.35, ease: EASE }}
        >
          {/* Positioned by the wrapper: .btn-wipe sets position: relative */}
          <a
            href="#top"
            aria-label="Back to top"
            className="btn-wipe cut-sm flex h-11 w-11 items-center justify-center border border-line bg-panel font-display text-xl text-ink hover:text-arena [--wipe:var(--color-forge)]"
          >
            ↑
          </a>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
