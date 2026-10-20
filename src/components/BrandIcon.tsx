import { ICONS, visibleHex } from "@/lib/icons";

/** Brand logo from Simple Icons, or a two-letter badge when there isn't one. */
export default function BrandIcon({ icon, name, size = 14 }: { icon?: string; name: string; size?: number }) {
  const si = icon ? ICONS[icon as keyof typeof ICONS] : undefined;
  if (!si) {
    return (
      <span
        aria-hidden
        className="inline-flex shrink-0 items-center justify-center bg-line font-mono text-[9px] font-bold leading-none text-ink"
        style={{ width: size, height: size }}
      >
        {name.slice(0, 2).toUpperCase()}
      </span>
    );
  }
  return (
    <svg aria-hidden viewBox="0 0 24 24" width={size} height={size} className="shrink-0" fill={visibleHex(si.hex)}>
      <path d={si.path} />
    </svg>
  );
}
