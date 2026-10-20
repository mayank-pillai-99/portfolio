"use client";

import { profile } from "@/data/profile";
import { useCopyEmail } from "./CopyEmail";
import Reveal from "./Reveal";
import Section from "./Section";

/** Closing call to action. Channels live in the bento contact tile. */
export default function Contact() {
  const { copy, toast } = useCopyEmail();

  return (
    <Section id="contact" index="03" kicker="GET IN TOUCH" title="Contact" hideHeader>
      <Reveal>
        <div className="cut-frame cut" style={{ ["--frame" as string]: "var(--color-forge)" }}>
          <div className="cut-inner cut arena-grid relative overflow-hidden p-6 sm:p-12">
            <div className="hazard absolute inset-x-0 top-0 h-1" />
            <div className="relative flex flex-col gap-10 lg:flex-row lg:items-end lg:justify-between">
              <div>
                <p className="flex items-center gap-3 font-mono text-xs tracking-[0.2em] text-dim">
                  <span className="skew-tag bg-forge px-3 py-1 font-bold text-arena">03</span>
                  GET IN TOUCH
                </p>
                <h2 className="mt-5 font-display text-5xl uppercase leading-[0.9] sm:text-7xl">
                  Let&apos;s build
                  <br />
                  <span className="text-forge">something together.</span>
                </h2>
                <p className="mt-5 max-w-lg text-dim">
                  Hiring for an AI or full-stack intern, or want to talk about something I built? My inbox is open.
                </p>
              </div>
              <div className="shrink-0">
                <div className="flex flex-wrap gap-3">
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
            </div>
          </div>
        </div>
      </Reveal>
      {toast}
    </Section>
  );
}
