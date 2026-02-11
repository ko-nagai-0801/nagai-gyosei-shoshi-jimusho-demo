import Link from "next/link";

import { FullBleedHero } from "@/components/full-bleed-hero";
import { officeQuickFacts, strengths, works } from "@/lib/site-content";

export default function HomePage() {
  return (
    <>
      <FullBleedHero
        eyebrow="NAGAI OFFICE"
        title="建設業許可・在留資格・法人設立の手続きを、丁寧にサポート"
        description="永井行政書士事務所は、事業者様と個人のお客様に向けて、申請手続きの不安を減らす実務支援を提供しています。"
        actions={[
          { href: "/works", label: "取扱業務を見る" },
          { href: "/contact", label: "無料相談を予約する", style: "secondary" },
        ]}
      />

      <section className="space-y-6">
        <div className="space-y-2">
          <p className="text-xs font-semibold tracking-[0.14em] text-[--accent]">GUIDE</p>
          <h2 className="font-serif text-3xl text-[--base]">ご相談前のご案内</h2>
        </div>

        <div className="grid gap-4 md:grid-cols-3">
          {officeQuickFacts.map((fact) => (
            <article key={fact.label} className="section-card p-6">
              <p className="text-xs font-semibold tracking-[0.12em] text-[--accent]">{fact.label}</p>
              <h3 className="mt-2 font-serif text-xl text-[--base]">{fact.value}</h3>
              <p className="mt-3 text-sm leading-7 text-[--ink-soft]">{fact.note}</p>
            </article>
          ))}
        </div>

        <Link
          href="/pricing"
          className="inline-flex w-fit rounded-full border border-[--base] px-5 py-2 text-sm font-semibold text-[--base] transition hover:bg-[--base] hover:text-white"
        >
          詳細な料金表を見る
        </Link>
      </section>

      <section className="space-y-6">
        <div className="space-y-2">
          <p className="text-xs font-semibold tracking-[0.14em] text-[--accent]">STRENGTHS</p>
          <h2 className="font-serif text-3xl text-[--base]">当事務所の強み</h2>
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
            <h2 className="font-serif text-3xl text-[--base]">主な支援事例</h2>
          </div>
          <Link
            href="/works"
            className="w-fit rounded-full border border-[--base] px-5 py-2 text-sm font-semibold text-[--base] transition hover:bg-[--base] hover:text-white"
          >
            すべての事例を見る
          </Link>
        </div>

        <div className="grid gap-4 md:grid-cols-2">
          {works.slice(0, 2).map((work) => (
            <article key={work.title} className="section-card p-6">
              <p className="text-xs tracking-[0.12em] text-[--ink-soft]">{work.term}</p>
              <h3 className="mt-2 font-serif text-xl text-[--base]">{work.title}</h3>
              <p className="mt-3 text-sm leading-7 text-[--ink-soft]">{work.summary}</p>
              <p className="mt-4 text-sm font-semibold text-[--ink]">対応内容: {work.role}</p>
            </article>
          ))}
        </div>
      </section>
    </>
  );
}
