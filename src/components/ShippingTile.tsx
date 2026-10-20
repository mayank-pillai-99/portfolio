"use client";

import { useEffect, useState } from "react";
import { projects } from "@/data/profile";
import BrowserFrame, { displayUrl } from "./BrowserFrame";
import Tile from "./Tile";

const shipping = projects[0];
const shots = shipping.images ?? [];

/** Bento tile that cycles through the current project's screenshots. Hover or focus pauses it. */
export default function ShippingTile({ ready, delay, className }: { ready: boolean; delay: number; className: string }) {
  const [active, setActive] = useState(0);
  const [paused, setPaused] = useState(false);
  // Read after mount so server and client render the same markup
  const [still, setStill] = useState(false);
  useEffect(() => setStill(window.matchMedia("(prefers-reduced-motion: reduce)").matches), []);

  const cycling = ready && !still && shots.length > 1;
  const next = () => setActive((i) => (i + 1) % shots.length);

  return (
    <Tile ready={ready} delay={delay} className={className} innerClassName="flex flex-col">
      <div
        onPointerEnter={() => setPaused(true)}
        onPointerLeave={() => setPaused(false)}
        onFocus={() => setPaused(true)}
        onBlur={() => setPaused(false)}
        className="flex h-full flex-col"
      >
        <div className="mb-3 flex items-center justify-between font-mono text-xs tracking-[0.2em]">
          <span className="flex items-center gap-2 text-dim">
            <span className="live-dot h-1.5 w-1.5 rounded-full bg-forge" />
            NOW SHIPPING
          </span>
          <span className="text-forge">{shipping.date?.toUpperCase()}</span>
        </div>

        <a href={shipping.live} target="_blank" rel="noreferrer" aria-label={`Open ${shipping.name} live demo`} className="block">
          <BrowserFrame url={displayUrl(shipping.live ?? shipping.repo)}>
            <div className="relative aspect-[2/1] bg-white">
              {shots.map((s, i) => (
                // eslint-disable-next-line @next/next/no-img-element
                <img
                  key={s.src}
                  src={s.src}
                  alt={i === active ? s.alt : ""}
                  aria-hidden={i !== active}
                  loading={i === 0 ? "eager" : "lazy"}
                  className="absolute inset-0 h-full w-full object-cover object-top transition-opacity duration-700"
                  style={{ opacity: i === active ? 1 : 0 }}
                />
              ))}
            </div>
          </BrowserFrame>
        </a>

        <div className="mt-2 flex items-center gap-3">
          <div className="h-0.5 flex-1 bg-line">
            {cycling && (
              <span
                key={active}
                className="cycle-bar block h-full bg-forge"
                style={{ animationPlayState: paused ? "paused" : "running" }}
                onAnimationEnd={next}
              />
            )}
          </div>
          <div className="flex gap-1.5" role="group" aria-label={`${shipping.name} screenshots`}>
            {shots.map((s, i) => (
              <button
                key={s.src}
                onClick={() => setActive(i)}
                aria-label={`Show screenshot ${i + 1} of ${shots.length}: ${s.alt}`}
                aria-pressed={i === active}
                className={`h-2 w-2 transition-colors ${i === active ? "bg-forge" : "bg-line hover:bg-dim"}`}
              />
            ))}
          </div>
        </div>

        <div className="mt-auto flex items-end justify-between gap-4 pt-3">
          <div className="min-w-0">
            <h2 className="font-display text-3xl uppercase leading-none">{shipping.name}</h2>
            <p className="mt-1.5 text-sm leading-snug text-dim">{shipping.impact}</p>
          </div>
          <a href={shipping.live} target="_blank" rel="noreferrer" className="link-slide shrink-0 pb-0.5 font-mono text-xs uppercase tracking-widest text-forge">
            Live demo ↗
          </a>
        </div>
      </div>
    </Tile>
  );
}
