import Link from "next/link";

import { FullBleedHero } from "@/components/full-bleed-hero";
import { officeQuickFacts, strengths, works } from "@/lib/site-content";

export default function HomePage() {
  return (
    <>
      <FullBleedHero
        eyebrow="MACHI NO HOURITSUYA"
        title="手続きの不安を、ひとつずつ一緒に整理します"
        description="永井行政書士事務所は、建設業許可・在留資格・法人関連手続きを中心に、地域の皆さまが相談しやすい窓口を目指しています。"
        imagePriority
        actions={[
          { href: "/contact", label: "まずは相談してみる" },
          { href: "/works", label: "取扱業務を見る", style: "secondary" },
        ]}
      />

      <section className="space-y-6">
        <div className="space-y-2">
          <p className="text-xs font-semibold tracking-[0.14em] text-[var(--accent)]">FIRST GUIDE</p>
          <h2 className="font-serif text-3xl text-[var(--base-strong)]">はじめて相談される方へ</h2>
        </div>

        <div className="grid gap-4 md:grid-cols-3">
          {officeQuickFacts.map((fact) => (
            <article key={fact.label} className="section-card p-6">
              <p className="text-xs font-semibold tracking-[0.12em] text-[var(--accent)]">{fact.label}</p>
              <h3 className="mt-2 font-serif text-xl text-[var(--base-strong)]">{fact.value}</h3>
              <p className="mt-3 text-sm leading-7 text-[var(--ink-soft)]">{fact.note}</p>
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
        <div className="space-y-2">
          <p className="text-xs font-semibold tracking-[0.14em] text-[var(--accent)]">OUR STYLE</p>
          <h2 className="font-serif text-3xl text-[var(--base-strong)]">町の法律屋として大切にしていること</h2>
        </div>

        <div className="grid gap-4 md:grid-cols-3">
          {strengths.map((strength) => (
            <article key={strength.title} className="section-card p-6">
              <h3 className="font-serif text-xl text-[var(--base-strong)]">{strength.title}</h3>
              <p className="mt-3 text-sm leading-7 text-[var(--ink-soft)]">{strength.body}</p>
            </article>
          ))}
        </div>
      </section>

      <section className="space-y-6">
        <div className="flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
          <div className="space-y-2">
            <p className="text-xs font-semibold tracking-[0.14em] text-[var(--accent)]">SUPPORT CASES</p>
            <h2 className="font-serif text-3xl text-[var(--base-strong)]">ご相談事例</h2>
          </div>
          <Link
            href="/works"
            className="w-fit rounded-full border border-[var(--base)] px-5 py-2 text-sm font-semibold text-[var(--base)] transition hover:bg-[var(--base)] hover:text-white"
          >
            すべての事例を見る
          </Link>
        </div>

        <div className="grid gap-4 md:grid-cols-2">
          {works.slice(0, 2).map((work) => (
            <article key={work.title} className="section-card p-6">
              <p className="text-xs tracking-[0.12em] text-[var(--ink-soft)]">{work.term}</p>
              <h3 className="mt-2 font-serif text-xl text-[var(--base-strong)]">{work.title}</h3>
              <p className="mt-3 text-sm leading-7 text-[var(--ink-soft)]">{work.summary}</p>
              <p className="mt-4 text-sm font-semibold text-[var(--ink)]">対応内容: {work.role}</p>
            </article>
          ))}
        </div>
      </section>
    </>
  );
}
