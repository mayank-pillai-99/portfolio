"use client";

import { useState } from "react";
import type { ProjectImage } from "@/data/profile";
import BrowserFrame, { displayUrl } from "./BrowserFrame";

type Props = { images: ProjectImage[]; href: string; name: string; color: string };

/** Screenshot in browser chrome, with larger thumbnails to switch between shots. */
export default function ProjectGallery({ images, href, name, color }: Props) {
  const [active, setActive] = useState(0);
  const img = images[active];
  const contain = img.fit === "contain";

  return (
    <div>
      <a href={href} target="_blank" rel="noreferrer" aria-label={`Open ${name}`} className="group/shot block">
        <BrowserFrame url={displayUrl(href)} className="transition-colors duration-300 group-hover/shot:border-dim">
          <div className={`relative aspect-[16/10] overflow-hidden ${contain ? "bg-white" : "bg-panel-2"}`}>
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              key={img.src}
              src={img.src}
              alt={img.alt}
              loading="lazy"
              className={`h-full w-full transition-transform duration-700 ease-out group-hover/shot:scale-[1.03] ${
                contain ? "object-contain p-4" : "object-cover object-top"
              }`}
            />
            <span
              className="skew-tag absolute bottom-3 right-3 px-3 py-1 font-mono text-xs font-bold tracking-widest text-arena opacity-0 transition-opacity duration-300 group-hover/shot:opacity-100"
              style={{ background: color }}
            >
              OPEN ↗
            </span>
          </div>
        </BrowserFrame>
      </a>
      {images.length > 1 && (
        <div className="hidden gap-2 pt-3 sm:flex" role="group" aria-label={`${name} screenshots`}>
          {images.map((im, i) => (
            <button
              key={im.src}
              onClick={() => setActive(i)}
              aria-label={im.alt}
              aria-pressed={i === active}
              className="cut-sm h-[60px] w-24 overflow-hidden border-2 transition-opacity hover:opacity-100!"
              style={{ borderColor: i === active ? color : "transparent", opacity: i === active ? 1 : 0.55 }}
            >
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src={im.src} alt="" loading="lazy" className="h-full w-full object-cover object-top" />
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
