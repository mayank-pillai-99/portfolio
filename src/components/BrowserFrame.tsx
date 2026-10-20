/** Thin browser-window chrome around a screenshot: three dots and the address. */
export default function BrowserFrame({ url, children, className = "" }: { url: string; children: React.ReactNode; className?: string }) {
  return (
    <div className={`overflow-hidden border border-line bg-panel-2 ${className}`}>
      <div className="flex items-center gap-1.5 border-b border-line bg-arena px-3 py-2">
        <span aria-hidden className="h-2 w-2 rounded-full bg-line" />
        <span aria-hidden className="h-2 w-2 rounded-full bg-line" />
        <span aria-hidden className="h-2 w-2 rounded-full bg-line" />
        <span className="ml-2 truncate font-mono text-xs text-dim">{url}</span>
      </div>
      <div className="relative">{children}</div>
    </div>
  );
}

export const displayUrl = (href: string) => href.replace(/^https?:\/\/(www\.)?/, "").replace(/\/$/, "");
