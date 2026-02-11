import Link from "next/link";

import { navLinks } from "@/lib/site-content";

export function SiteHeader() {
  const primaryLinks = navLinks.filter((link) => link.href !== "/contact");

  return (
    <header className="sticky top-0 z-40 border-b border-[var(--line)] bg-[#fffaf3]/95 backdrop-blur">
      <div className="mx-auto flex max-w-6xl flex-wrap items-center justify-between gap-3 px-4 py-3 md:px-8">
        <Link href="/" className="group inline-flex flex-col">
          <span className="font-serif text-base font-semibold tracking-[0.08em] text-[var(--base-strong)] sm:text-lg">
            永井行政書士事務所
          </span>
          <span className="text-[10px] font-medium tracking-[0.14em] text-[var(--ink-soft)] group-hover:text-[var(--base)]">
            町の法律屋として、身近な手続きを丁寧に
          </span>
        </Link>

        <nav className="flex flex-1 flex-wrap items-center justify-end gap-1 sm:gap-2">
          {primaryLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="rounded-full px-3 py-2 text-xs font-medium text-[var(--ink)] transition hover:bg-[var(--base-soft)] sm:text-sm"
            >
              {link.label}
            </Link>
          ))}
          <Link
            href="/contact"
            className="rounded-full bg-[var(--accent)] px-4 py-2 text-xs font-semibold text-white transition hover:brightness-95 sm:text-sm"
          >
            無料相談
          </Link>
        </nav>
      </div>
    </header>
  );
}
