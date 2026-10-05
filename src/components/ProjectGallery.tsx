"use client";

import { useState } from "react";
import type { ProjectImage } from "@/data/profile";

type Props = { images: ProjectImage[]; color: string; href: string; name: string; className?: string; thumbsClassName?: string };

export default function ProjectGallery({ images, color, href, name, className = "-mx-6 -mt-6 mb-5", thumbsClassName = "px-6 pt-3" }: Props) {
  const [active, setActive] = useState(0);
  const img = images[active];
  const contain = img.fit === "contain";

  return (
    <div className={className}>
      <a
        href={href}
        target="_blank"
        rel="noreferrer"
        aria-label={`Open ${name}`}
        className={`group/shot relative block aspect-[16/10] overflow-hidden border-b ${contain ? "bg-white" : "bg-panel-2"}`}
        style={{ borderColor: color }}
      >
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
          className="skew-tag absolute bottom-3 right-3 bg-forge px-3 py-1 font-mono text-[11px] font-bold tracking-widest text-arena opacity-0 transition-opacity duration-300 group-hover/shot:opacity-100"
          style={{ background: color }}
        >
          OPEN ↗
        </span>
      </a>
      {images.length > 1 && (
        <div className={`flex gap-2 ${thumbsClassName}`} role="group" aria-label={`${name} screenshots`}>
          {images.map((im, i) => (
            <button
              key={im.src}
              onClick={() => setActive(i)}
              aria-label={im.alt}
              aria-pressed={i === active}
              className="cut-sm h-10 w-16 overflow-hidden border-2 transition-opacity hover:opacity-100!"
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
