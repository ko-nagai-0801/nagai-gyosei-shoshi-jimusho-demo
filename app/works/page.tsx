import type { Metadata } from "next";

import { FullBleedHero } from "@/components/full-bleed-hero";
import { works } from "@/lib/site-content";

export const metadata: Metadata = {
  title: "Works",
  description: "永井行政書士事務所デモサイトの制作実績一覧ページです。",
  alternates: {
    canonical: "/works",
  },
};

export default function WorksPage() {
  return (
    <>
      <FullBleedHero
        eyebrow="WORKS"
        title="情報整理からUI実装までを通貫した制作実績"
        description="法律系サービスに求められる信頼感を損なわず、問い合わせまでの導線設計を重視したデモ案件を掲載しています。"
        actions={[
          { href: "/contact", label: "相談する" },
          { href: "/about", label: "制作姿勢を見る", style: "secondary" },
        ]}
      />

      <section className="space-y-6">
        <h2 className="font-serif text-3xl text-[--base]">案件一覧</h2>
        <div className="grid gap-5 md:grid-cols-2">
          {works.map((work) => (
            <article key={work.title} className="section-card p-6">
              <p className="text-xs tracking-[0.12em] text-[--ink-soft]">{work.term}</p>
              <h3 className="mt-2 font-serif text-2xl text-[--base]">{work.title}</h3>
              <p className="mt-3 text-sm leading-7 text-[--ink-soft]">{work.summary}</p>
              <p className="mt-4 text-sm font-semibold text-[--ink]">担当領域: {work.role}</p>
              <ul className="mt-4 flex flex-wrap gap-2">
                {work.tags.map((tag) => (
                  <li
                    key={tag}
                    className="rounded-full border border-[--line] bg-[--base-soft] px-3 py-1 text-xs font-medium text-[--base]"
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
