import type { Metadata } from "next";
import Link from "next/link";

import { FullBleedHero } from "@/components/full-bleed-hero";
import { feeGuides, timeline } from "@/lib/site-content";

export const metadata: Metadata = {
  title: "About",
  description: "永井行政書士事務所の方針と事務所概要をご案内します。",
  alternates: {
    canonical: "/about",
  },
};

export default function AboutPage() {
  return (
    <>
      <FullBleedHero
        eyebrow="ABOUT US"
        title="むずかしい手続きを、日常の言葉でわかりやすく"
        description="書類の準備や手続きの流れを丁寧に説明し、安心して進められる伴走型のサポートを大切にしています。"
        actions={[
          { href: "/contact", label: "相談する" },
          { href: "/works", label: "支援事例を見る", style: "secondary" },
        ]}
      />

      <section className="grid gap-6 lg:grid-cols-[1.2fr_0.8fr]">
        <article className="section-card p-6 sm:p-8">
          <h2 className="font-serif text-3xl text-[var(--base-strong)]">事務所概要</h2>
          <p className="mt-4 text-sm leading-8 text-[var(--ink-soft)]">
            永井行政書士事務所では、建設業許可や在留資格関連の手続きを中心に、事業者様と個人のお客様の申請業務を支援しています。
            相談時には、必要書類・想定スケジュール・費用感を整理し、進捗が把握しやすい形でご案内します。
          </p>
        </article>

        <aside className="section-card p-6 sm:p-8">
          <h2 className="font-serif text-2xl text-[var(--base-strong)]">主な対応業務</h2>
          <ul className="mt-4 space-y-3 text-sm text-[var(--ink-soft)]">
            <li>・建設業許可申請（新規・更新・変更）</li>
            <li>・在留資格関連手続き（企業向け支援含む）</li>
            <li>・法人設立後の各種届出、許認可準備</li>
          </ul>
        </aside>
      </section>

      <section className="space-y-6">
        <div className="space-y-2">
          <p className="text-xs font-semibold tracking-[0.14em] text-[var(--accent)]">FEE GUIDE</p>
          <h2 className="font-serif text-3xl text-[var(--base-strong)]">料金案内（目安）</h2>
        </div>
        <div className="grid gap-4 md:grid-cols-3">
          {feeGuides.map((guide) => (
            <article key={guide.item} className="section-card p-6">
              <p className="text-xs font-semibold tracking-[0.12em] text-[var(--accent)]">{guide.item}</p>
              <h3 className="mt-2 font-serif text-xl text-[var(--base-strong)]">{guide.fee}</h3>
              <p className="mt-3 text-sm leading-7 text-[var(--ink-soft)]">{guide.note}</p>
            </article>
          ))}
        </div>
        <Link
          href="/pricing"
          className="inline-flex w-fit rounded-full border border-[var(--base)] px-5 py-2 text-sm font-semibold text-[var(--base)] transition hover:bg-[var(--base)] hover:text-white"
        >
          料金表をくわしく見る
        </Link>
      </section>

      <section className="space-y-6">
        <h2 className="font-serif text-3xl text-[var(--base-strong)]">事務所沿革</h2>
        <ol className="space-y-4">
          {timeline.map((item) => (
            <li
              key={item.year}
              className="section-card grid gap-2 p-6 sm:grid-cols-[120px_1fr] sm:items-start"
            >
              <p className="text-sm font-semibold tracking-[0.1em] text-[var(--accent)]">{item.year}</p>
              <div>
                <h3 className="font-serif text-xl text-[var(--base-strong)]">{item.title}</h3>
                <p className="mt-2 text-sm leading-7 text-[var(--ink-soft)]">{item.detail}</p>
              </div>
            </li>
          ))}
        </ol>
      </section>
    </>
  );
}
