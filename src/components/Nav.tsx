"use client";

import { AnimatePresence, motion } from "framer-motion";
import { useEffect, useRef, useState } from "react";
import MaskText, { EASE } from "./MaskText";

const items = [
  { href: "#projects", label: "Projects" },
  { href: "#experience", label: "Experience" },
  { href: "#toolkit", label: "Toolkit" },
  { href: "#contact", label: "Contact" },
];

export default function Nav() {
  const [active, setActive] = useState("");
  const [open, setOpen] = useState(false);
  const toggle = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    const els = items.map((i) => document.querySelector(i.href)).filter(Boolean) as Element[];
    const obs = new IntersectionObserver(
      (entries) => entries.forEach((e) => e.isIntersecting && setActive(`#${e.target.id}`)),
      { rootMargin: "-45% 0px -50% 0px" }
    );
    els.forEach((el) => obs.observe(el));
    return () => obs.disconnect();
  }, []);

  // Lock scroll and listen for Esc while the mobile menu is open
  useEffect(() => {
    if (!open) return;
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setOpen(false);
        toggle.current?.focus();
      }
    };
    window.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = prev;
      window.removeEventListener("keydown", onKey);
    };
  }, [open]);

  return (
    <>
      <nav className="fixed inset-x-0 top-0 z-50 border-b border-line bg-arena/85 backdrop-blur" aria-label="Main">
        <div className="mx-auto flex h-14 max-w-6xl items-center justify-between px-4 sm:px-6">
          <a href="#top" className="flex items-center gap-2 font-display text-xl uppercase tracking-wide" onClick={() => setOpen(false)}>
            <span className="skew-tag bg-forge px-2 text-arena">MP</span>
            <span className="hidden sm:inline">Mayank Pillai</span>
          </a>
          <ul className="hidden items-center gap-1 md:flex">
            {items.map((i) => (
              <li key={i.href}>
                <a
                  href={i.href}
                  className={`relative block px-3 py-1.5 font-mono text-xs uppercase tracking-widest transition-colors duration-300 ${
                    active === i.href ? "text-forge" : "text-dim hover:text-ink"
                  }`}
                >
                  {i.label}
                  {active === i.href && (
                    <motion.span
                      layoutId="nav-active"
                      aria-hidden
                      className="absolute inset-x-3 -bottom-px h-px bg-forge"
                      transition={{ type: "spring", stiffness: 380, damping: 34 }}
                    />
                  )}
                </a>
              </li>
            ))}
          </ul>
          <button
            ref={toggle}
            className="font-mono text-xs uppercase tracking-widest md:hidden"
            aria-expanded={open}
            aria-controls="mobile-nav"
            onClick={() => setOpen((o) => !o)}
          >
            {open ? "Close" : "Menu"}
          </button>
        </div>
      </nav>

      <AnimatePresence>
        {open && (
          <motion.div
            id="mobile-nav"
            className="arena-grid fixed inset-x-0 bottom-0 top-14 z-40 flex flex-col bg-arena px-4 md:hidden"
            initial={{ clipPath: "inset(0 0 100% 0)" }}
            animate={{ clipPath: "inset(0 0 0% 0)" }}
            exit={{ clipPath: "inset(0 0 100% 0)" }}
            transition={{ duration: 0.45, ease: EASE }}
          >
            <div className="hazard -mx-4 h-1" />
            <ul className="mt-10 space-y-2">
              {items.map((i, n) => (
                <li key={i.href}>
                  <a href={i.href} onClick={() => setOpen(false)} className="group flex items-center gap-4 py-1">
                    <span className="w-6 font-mono text-xs text-dim">{String(n + 1).padStart(2, "0")}</span>
                    <MaskText
                      text={i.label}
                      delay={0.1 + n * 0.06}
                      className={`font-display text-6xl uppercase leading-none transition-colors ${
                        active === i.href ? "text-forge" : "group-hover:text-forge"
                      }`}
                    />
                  </a>
                </li>
              ))}
            </ul>
            <motion.div
              className="mt-auto flex items-center justify-between border-t border-line py-6 font-mono text-xs uppercase tracking-widest text-dim"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.4 }}
            >
              <span>AI Engineer · Full-Stack</span>
              <a href="/Resume.pdf" download className="text-forge">
                Resume ↓
              </a>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
