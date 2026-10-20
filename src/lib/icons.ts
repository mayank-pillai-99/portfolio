// Only the logos the site uses, so the rest of Simple Icons is tree-shaken away.
import {
  siDocker,
  siFastify,
  siGithubactions,
  siHuggingface,
  siLangchain,
  siMongodb,
  siNextdotjs,
  siNodedotjs,
  siPostgresql,
  siPython,
  siPytorch,
  siReact,
  siRedis,
  siTailwindcss,
  siTypescript,
  siVitest,
} from "simple-icons";

export const ICONS = {
  siDocker,
  siFastify,
  siGithubactions,
  siHuggingface,
  siLangchain,
  siMongodb,
  siNextdotjs,
  siNodedotjs,
  siPostgresql,
  siPython,
  siPytorch,
  siReact,
  siRedis,
  siTailwindcss,
  siTypescript,
  siVitest,
} as const;

/** Dark brand colours (Next.js, Vercel, Express…) would vanish on the dark tiles. */
export function visibleHex(hex: string) {
  const n = parseInt(hex, 16);
  const lum = (0.2126 * ((n >> 16) & 255) + 0.7152 * ((n >> 8) & 255) + 0.0722 * (n & 255)) / 255;
  return lum < 0.28 ? "var(--color-ink)" : `#${hex}`;
}
