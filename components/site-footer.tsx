import Link from "next/link";

export function SiteFooter() {
  return (
    <footer className="border-t border-[var(--line)] bg-[#fffaf3]">
      <div className="mx-auto flex max-w-6xl flex-col gap-3 px-4 py-8 text-sm text-[var(--ink-soft)] md:flex-row md:items-center md:justify-between md:px-8">
        <div>
          <p className="font-serif text-[var(--base-strong)]">永井行政書士事務所</p>
          <p className="text-xs">まちの身近な手続き相談窓口</p>
        </div>
        <div className="flex flex-wrap items-center gap-4">
          <Link href="/works" className="hover:text-[var(--base)]">
            取扱業務
          </Link>
          <Link href="/pricing" className="hover:text-[var(--base)]">
            料金表
          </Link>
          <Link href="/about" className="hover:text-[var(--base)]">
            事務所案内
          </Link>
          <Link href="/contact" className="hover:text-[var(--base)]">
            お問い合わせ
          </Link>
        </div>
      </div>
    </footer>
  );
}
