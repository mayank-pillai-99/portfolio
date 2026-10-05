export default function Divider({ color = "var(--color-forge)", flip = false }: { color?: string; flip?: boolean }) {
  return (
    <div className="relative mx-auto flex max-w-6xl items-center gap-4 px-4 sm:px-6" aria-hidden>
      <span className="hazard h-1.5 w-20 shrink-0" style={{ ["--stripe" as string]: color, order: flip ? 2 : 0 }} />
      <span className="h-px flex-1 bg-line" />
      <span className="h-2 w-2 rotate-45" style={{ background: color }} />
    </div>
  );
}
