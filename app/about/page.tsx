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
        eyebrow="ABOUT"
        title="相談しやすさと正確性を両立した支援体制"
        description="初回ヒアリングで現状と期限を整理し、必要な手続きを明確にしたうえで、申請完了まで伴走します。"
        actions={[
          { href: "/works", label: "支援事例を見る" },
          { href: "/contact", label: "相談を始める", style: "secondary" },
        ]}
      />

      <section className="grid gap-6 lg:grid-cols-[1.2fr_0.8fr]">
        <article className="section-card p-6 sm:p-8">
          <h2 className="font-serif text-3xl text-[--base]">事務所概要</h2>
          <p className="mt-4 text-sm leading-8 text-[--ink-soft]">
            永井行政書士事務所では、建設業許可や在留資格関連の手続きを中心に、事業者様と個人のお客様の申請業務を支援しています。
            相談時には、必要書類・想定スケジュール・費用感を整理し、進捗が把握しやすい形でご案内します。
          </p>
        </article>

        <aside className="section-card p-6 sm:p-8">
          <h2 className="font-serif text-2xl text-[--base]">主な対応業務</h2>
          <ul className="mt-4 space-y-3 text-sm text-[--ink-soft]">
            <li>・建設業許可申請（新規・更新・変更）</li>
            <li>・在留資格関連手続き（企業向け支援含む）</li>
            <li>・法人設立後の各種届出、許認可準備</li>
          </ul>
        </aside>
      </section>

      <section className="space-y-6">
        <div className="space-y-2">
          <p className="text-xs font-semibold tracking-[0.14em] text-[--accent]">FEE GUIDE</p>
          <h2 className="font-serif text-3xl text-[--base]">料金案内（目安）</h2>
        </div>
        <div className="grid gap-4 md:grid-cols-3">
          {feeGuides.map((guide) => (
            <article key={guide.item} className="section-card p-6">
              <p className="text-xs font-semibold tracking-[0.12em] text-[--accent]">{guide.item}</p>
              <h3 className="mt-2 font-serif text-xl text-[--base]">{guide.fee}</h3>
              <p className="mt-3 text-sm leading-7 text-[--ink-soft]">{guide.note}</p>
            </article>
          ))}
        </div>
        <Link
          href="/pricing"
          className="inline-flex w-fit rounded-full border border-[--base] px-5 py-2 text-sm font-semibold text-[--base] transition hover:bg-[--base] hover:text-white"
        >
          詳細条件・オプション費用を見る
        </Link>
      </section>

      <section className="space-y-6">
        <h2 className="font-serif text-3xl text-[--base]">事務所沿革</h2>
        <ol className="space-y-4">
          {timeline.map((item) => (
            <li
              key={item.year}
              className="section-card grid gap-2 p-6 sm:grid-cols-[120px_1fr] sm:items-start"
            >
              <p className="text-sm font-semibold tracking-[0.1em] text-[--accent]">{item.year}</p>
              <div>
                <h3 className="font-serif text-xl text-[--base]">{item.title}</h3>
                <p className="mt-2 text-sm leading-7 text-[--ink-soft]">{item.detail}</p>
              </div>
            </li>
          ))}
        </ol>
      </section>
    </>
  );
}
