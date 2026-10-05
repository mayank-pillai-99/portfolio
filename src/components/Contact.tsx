"use client";

import { AnimatePresence, motion } from "framer-motion";
import { useState } from "react";
import { profile } from "@/data/profile";
import Reveal from "./Reveal";
import Section from "./Section";

const channels = [
  { label: "LinkedIn", value: "in/mayank-pillai", href: profile.links.linkedin },
  { label: "GitHub", value: "mayank-pillai-99", href: profile.links.github },
  { label: "LeetCode", value: "160+ solved", href: profile.links.leetcode },
];

export default function Contact() {
  const [toast, setToast] = useState(false);

  async function copy() {
    try {
      await navigator.clipboard.writeText(profile.links.email);
      setToast(true);
      setTimeout(() => setToast(false), 2200);
    } catch {
      window.location.href = `mailto:${profile.links.email}`;
    }
  }

  return (
    <Section id="contact" index="04" kicker="GET IN TOUCH" title="Contact">
      <Reveal>
        <div className="cut-frame cut" style={{ ["--frame" as string]: "var(--color-forge)" }}>
          <div className="cut-inner cut arena-grid relative overflow-hidden p-6 sm:p-10">
            <div className="hazard absolute inset-x-0 top-0 h-1" />
            <span aria-hidden className="outline-text pointer-events-none absolute -bottom-10 right-0 select-none font-display text-[10rem] uppercase leading-none sm:text-[14rem]">
              Hello
            </span>
            <div className="relative grid gap-10 lg:grid-cols-[1.3fr_1fr] lg:items-center">
              <div>
                <p className="font-mono text-xs tracking-[0.25em] text-forge">AVAILABLE</p>
                <h3 className="mt-3 font-display text-4xl uppercase leading-none sm:text-6xl">
                  Let&apos;s build<br />
                  <span className="text-forge">something together.</span>
                </h3>
                <p className="mt-4 max-w-lg text-dim">
                  Hiring for an AI or full-stack intern, or want to talk about something I built? My inbox is open.
                </p>
                <div className="mt-8 flex flex-wrap gap-3">
                  <a
                    href={`mailto:${profile.links.email}`}
                    className="btn-wipe cut-sm bg-forge px-6 py-3 font-display text-xl uppercase tracking-wide text-arena"
                  >
                    Send Email
                  </a>
                  <button
                    onClick={copy}
                    className="btn-wipe cut-sm border-2 border-ink px-6 py-3 font-display text-xl uppercase tracking-wide hover:text-arena"
                  >
                    Copy Address
                  </button>
                </div>
                <p className="mt-3 break-all font-mono text-xs text-dim">{profile.links.email}</p>
              </div>
              <ul className="space-y-3">
                {channels.map((c) => (
                  <li key={c.label}>
                    <a
                      href={c.href}
                      target="_blank"
                      rel="noreferrer"
                      className="btn-wipe cut-sm group flex items-center justify-between bg-panel-2 px-5 py-4 [--wipe:var(--color-cyan)] hover:text-arena"
                    >
                      <span>
                        <span className="block font-display text-2xl uppercase">{c.label}</span>
                        <span className="font-mono text-xs text-dim transition-colors duration-300 group-hover:text-arena">{c.value}</span>
                      </span>
                      <span className="font-display text-2xl transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5">↗</span>
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </Reveal>

      <AnimatePresence>
        {toast && (
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
    </Section>
  );
}
