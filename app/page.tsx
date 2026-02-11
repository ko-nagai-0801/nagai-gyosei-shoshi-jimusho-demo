import Link from "next/link";

import { FullBleedHero } from "@/components/full-bleed-hero";
import { strengths, works } from "@/lib/site-content";

export default function HomePage() {
  return (
    <>
      <FullBleedHero
        eyebrow="PORTFOLIO DEMO"
        title="信頼感を軸に、相談導線まで設計する行政書士サイト"
        description="永井行政書士事務所のデモサイトです。採用担当者に向けて、情報設計・UI・実装品質を一貫して示すことを目的に構築しています。"
        actions={[
          { href: "/works", label: "制作実績を見る" },
          { href: "/contact", label: "相談導線を確認する", style: "secondary" },
        ]}
      />

      <section className="space-y-6">
        <div className="space-y-2">
          <p className="text-xs font-semibold tracking-[0.14em] text-[--accent]">STRENGTHS</p>
          <h2 className="font-serif text-3xl text-[--base]">価値提供の軸</h2>
        </div>

        <div className="grid gap-4 md:grid-cols-3">
          {strengths.map((strength) => (
            <article key={strength.title} className="section-card p-6">
              <h3 className="font-serif text-xl text-[--base]">{strength.title}</h3>
              <p className="mt-3 text-sm leading-7 text-[--ink-soft]">{strength.body}</p>
            </article>
          ))}
        </div>
      </section>

      <section className="space-y-6">
        <div className="flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
          <div className="space-y-2">
            <p className="text-xs font-semibold tracking-[0.14em] text-[--accent]">WORKS PREVIEW</p>
            <h2 className="font-serif text-3xl text-[--base]">最近のデモ案件</h2>
          </div>
          <Link
            href="/works"
            className="w-fit rounded-full border border-[--base] px-5 py-2 text-sm font-semibold text-[--base] transition hover:bg-[--base] hover:text-white"
          >
            すべての実績を見る
          </Link>
        </div>

        <div className="grid gap-4 md:grid-cols-2">
          {works.slice(0, 2).map((work) => (
            <article key={work.title} className="section-card p-6">
              <p className="text-xs tracking-[0.12em] text-[--ink-soft]">{work.term}</p>
              <h3 className="mt-2 font-serif text-xl text-[--base]">{work.title}</h3>
              <p className="mt-3 text-sm leading-7 text-[--ink-soft]">{work.summary}</p>
              <p className="mt-4 text-sm font-semibold text-[--ink]">担当: {work.role}</p>
            </article>
          ))}
        </div>
      </section>
    </>
  );
}
