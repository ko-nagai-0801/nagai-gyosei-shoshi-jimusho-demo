import type { Metadata } from "next";

import { FullBleedHero } from "@/components/full-bleed-hero";
import { works } from "@/lib/site-content";

export const metadata: Metadata = {
  title: "Works",
  description: "永井行政書士事務所の主な支援事例と取扱業務をご紹介します。",
  alternates: {
    canonical: "/works",
  },
};

export default function WorksPage() {
  return (
    <>
      <FullBleedHero
        eyebrow="SUPPORT CASES"
        title="地域の事業者さま・個人さまを支える手続き支援"
        description="建設業許可、在留資格、法人関連手続きを中心に、相談から申請完了までの対応事例をご紹介します。"
        actions={[
          { href: "/contact", label: "相談する" },
          { href: "/pricing", label: "料金表を見る", style: "secondary" },
        ]}
      />

      <section className="space-y-6">
        <h2 className="font-serif text-3xl text-[var(--base-strong)]">支援事例</h2>
        <div className="grid gap-5 md:grid-cols-2">
          {works.map((work) => (
            <article key={work.title} className="section-card p-6">
              <p className="text-xs tracking-[0.12em] text-[var(--ink-soft)]">{work.term}</p>
              <h3 className="mt-2 font-serif text-2xl text-[var(--base-strong)]">{work.title}</h3>
              <p className="mt-3 text-sm leading-7 text-[var(--ink-soft)]">{work.summary}</p>
              <p className="mt-4 text-sm font-semibold text-[var(--ink)]">対応範囲: {work.role}</p>
              <ul className="mt-4 flex flex-wrap gap-2">
                {work.tags.map((tag) => (
                  <li
                    key={tag}
                    className="rounded-full border border-[var(--line)] bg-[var(--base-soft)] px-3 py-1 text-xs font-medium text-[var(--base-strong)]"
                  >
                    {tag}
                  </li>
                ))}
              </ul>
            </article>
          ))}
        </div>
      </section>
    </>
  );
}
