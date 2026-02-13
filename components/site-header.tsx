"use client";

import Link from "next/link";
import { useEffect, useState } from "react";

import { trackCvEvent } from "@/lib/cv-tracking";
import { navLinks } from "@/lib/site-content";

export function SiteHeader() {
  const [menuOpen, setMenuOpen] = useState(false);

  const primaryLinks = navLinks.filter((link) => link.href !== "/contact");

  useEffect(() => {
    if (!menuOpen) return;

    const onEscape = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setMenuOpen(false);
      }
    };

    document.addEventListener("keydown", onEscape);
    return () => document.removeEventListener("keydown", onEscape);
  }, [menuOpen]);

  useEffect(() => {
    const originalOverflow = document.body.style.overflow;
    if (menuOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = originalOverflow;
    }

    return () => {
      document.body.style.overflow = originalOverflow;
    };
  }, [menuOpen]);

  return (
    <header className="sticky top-0 z-50 border-b border-[var(--line)] bg-[#fffaf3]/95 backdrop-blur">
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
          className="inline-flex h-11 w-11 items-center justify-center rounded-lg border border-[var(--line)] bg-white text-[var(--base-strong)] shadow-[0_4px_12px_rgba(69,56,39,0.08)] md:hidden"
          aria-label={menuOpen ? "メニューを閉じる" : "メニューを開く"}
          aria-expanded={menuOpen}
        >
          <span className="relative block h-4 w-5">
            <span
              className={`absolute left-0 top-0 h-0.5 w-5 rounded-full bg-current transition duration-200 ${
                menuOpen ? "translate-y-[7px] rotate-45" : ""
              }`}
            />
            <span
              className={`absolute left-0 top-[7px] h-0.5 w-5 rounded-full bg-current transition duration-200 ${
                menuOpen ? "opacity-0" : ""
              }`}
            />
            <span
              className={`absolute left-0 top-[14px] h-0.5 w-5 rounded-full bg-current transition duration-200 ${
                menuOpen ? "-translate-y-[7px] -rotate-45" : ""
              }`}
            />
          </span>
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
            onClick={() =>
              trackCvEvent("contact_cta_click", {
                placement: "header_desktop",
              })
            }
            className="rounded-full bg-[var(--accent)] px-4 py-2 text-xs font-semibold text-white transition hover:brightness-95 sm:text-sm"
          >
            相談する
          </Link>
        </nav>
      </div>

      {menuOpen && (
        <button
          type="button"
          onClick={() => setMenuOpen(false)}
          aria-label="メニューを閉じる"
          className="fixed inset-0 top-[68px] z-40 bg-black/20 md:hidden"
        />
      )}

      <div
        className={`grid transition-all duration-200 md:hidden ${
          menuOpen
            ? "relative z-50 grid-rows-[1fr] border-t border-[var(--line)] opacity-100"
            : "pointer-events-none grid-rows-[0fr] opacity-0"
        }`}
      >
        <div className="overflow-hidden bg-[#fffaf3]">
          <nav className="mx-auto flex max-w-6xl flex-col gap-1 px-4 py-4">
            {primaryLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                onClick={() => setMenuOpen(false)}
                className="rounded-lg px-3 py-2.5 text-sm font-medium text-[var(--ink)] transition hover:bg-[var(--base-soft)]"
              >
                {link.label}
              </Link>
            ))}
            <Link
              href="/contact"
              onClick={() => {
                trackCvEvent("contact_cta_click", {
                  placement: "header_mobile",
                });
                setMenuOpen(false);
              }}
              className="mt-2 inline-flex w-fit rounded-full bg-[var(--accent)] px-4 py-2.5 text-sm font-semibold text-white transition hover:brightness-95"
            >
              相談する
            </Link>
          </nav>
        </div>
      </div>
    </header>
  );
}
