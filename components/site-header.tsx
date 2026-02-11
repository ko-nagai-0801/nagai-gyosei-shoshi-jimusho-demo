"use client";

import Link from "next/link";
import { useState } from "react";

import { navLinks } from "@/lib/site-content";

export function SiteHeader() {
  const [menuOpen, setMenuOpen] = useState(false);

  const primaryLinks = navLinks.filter((link) => link.href !== "/contact");

  return (
    <header className="sticky top-0 z-40 border-b border-[var(--line)] bg-[#fffaf3]/95 backdrop-blur">
      <div className="mx-auto flex max-w-6xl items-center justify-between gap-3 px-4 py-3 md:px-8">
        <Link href="/" onClick={() => setMenuOpen(false)} className="group inline-flex flex-col">
          <span className="font-serif text-base font-semibold tracking-[0.08em] text-[var(--base-strong)] sm:text-lg">
            永井行政書士事務所
          </span>
          <span className="text-[10px] font-medium tracking-[0.14em] text-[var(--ink-soft)] group-hover:text-[var(--base)]">
            町の法律屋として、身近な手続きを丁寧に
          </span>
        </Link>

        <button
          type="button"
          onClick={() => setMenuOpen((prev) => !prev)}
          className="inline-flex items-center justify-center rounded-lg border border-[var(--line)] bg-white px-3 py-2 text-sm font-semibold text-[var(--base-strong)] md:hidden"
          aria-label="メニューを開く"
          aria-expanded={menuOpen}
        >
          {menuOpen ? "閉じる" : "メニュー"}
        </button>

        <nav className="hidden items-center gap-1 sm:gap-2 md:flex">
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

      {menuOpen && (
        <div className="border-t border-[var(--line)] bg-[#fffaf3] md:hidden">
          <nav className="mx-auto flex max-w-6xl flex-col gap-1 px-4 py-3">
            {primaryLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                onClick={() => setMenuOpen(false)}
                className="rounded-lg px-3 py-2 text-sm font-medium text-[var(--ink)] transition hover:bg-[var(--base-soft)]"
              >
                {link.label}
              </Link>
            ))}
            <Link
              href="/contact"
              onClick={() => setMenuOpen(false)}
              className="mt-1 inline-flex w-fit rounded-full bg-[var(--accent)] px-4 py-2 text-sm font-semibold text-white transition hover:brightness-95"
            >
              無料相談
            </Link>
          </nav>
        </div>
      )}
    </header>
  );
}
