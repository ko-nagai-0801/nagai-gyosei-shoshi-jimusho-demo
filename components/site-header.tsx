import Link from "next/link";

import { navLinks } from "@/lib/site-content";

export function SiteHeader() {
  return (
    <header className="sticky top-0 z-40 border-b border-[--line] bg-white/90 backdrop-blur">
      <div className="mx-auto flex max-w-6xl items-center justify-between gap-4 px-4 py-3 md:px-8">
        <Link
          href="/"
          className="font-serif text-base font-semibold tracking-[0.12em] text-[--base] sm:text-lg"
        >
          永井行政書士事務所
        </Link>

        <nav className="flex items-center gap-1 sm:gap-2">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="rounded-full px-3 py-2 text-xs font-medium text-[--ink] transition hover:bg-[--base-soft] sm:text-sm"
            >
              {link.label}
            </Link>
          ))}
          <Link
            href="/contact"
            className="rounded-full bg-[--accent] px-3 py-2 text-xs font-semibold text-white transition hover:brightness-95 sm:px-4 sm:text-sm"
          >
            お問い合わせ
          </Link>
        </nav>
      </div>
    </header>
  );
}
