"use client";

import { AnimatePresence, motion } from "framer-motion";
import { useState } from "react";
import { profile } from "@/data/profile";

/** Copies the email address and shows a short confirmation toast. */
export function useCopyEmail() {
  const [shown, setShown] = useState(false);

  async function copy() {
    try {
      await navigator.clipboard.writeText(profile.links.email);
      setShown(true);
      setTimeout(() => setShown(false), 2200);
    } catch {
      window.location.href = `mailto:${profile.links.email}`;
    }
  }

  const toast = (
    <AnimatePresence>
      {shown && (
        <motion.div
          role="status"
          className="cut-sm fixed bottom-6 left-1/2 z-[70] -translate-x-1/2 bg-forge px-6 py-3 font-display text-2xl uppercase text-arena shadow-2xl"
          initial={{ y: 80, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: 80, opacity: 0 }}
        >
          Email copied
        </motion.div>
      )}
    </AnimatePresence>
  );

  return { copy, toast };
}
