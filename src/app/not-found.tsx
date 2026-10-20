import type { Metadata } from "next";

export const metadata: Metadata = { title: "Page not found | Mayank Pillai" };

export default function NotFound() {
  return (
    <main className="arena-grid relative flex min-h-svh flex-col items-center justify-center overflow-hidden px-4 text-center">
      <div className="hazard absolute inset-x-0 top-0 h-2" />
      <p className="flex items-center gap-3 font-mono text-xs tracking-[0.25em] text-dim">
        <span className="skew-tag bg-neural px-3 py-1 font-bold text-arena">ERROR</span>
        PAGE NOT FOUND
      </p>
      <h1 className="mt-6 font-display text-[38vw] leading-[0.8] text-forge sm:text-[16rem]">404</h1>
      <p className="mt-6 max-w-md text-lg text-dim">This page doesn&apos;t exist. The work is all on the home page.</p>
      <a href="/" className="btn-wipe cut-sm mt-8 bg-forge px-6 py-3 font-display text-xl uppercase tracking-wide text-arena">
        Back to the portfolio
      </a>
      <div className="hazard absolute inset-x-0 bottom-0 h-2" />
    </main>
  );
}
