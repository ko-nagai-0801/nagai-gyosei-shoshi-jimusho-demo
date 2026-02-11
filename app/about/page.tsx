import type { Metadata } from "next";

import { FullBleedHero } from "@/components/full-bleed-hero";
import { timeline } from "@/lib/site-content";

export const metadata: Metadata = {
  title: "About",
  description: "永井行政書士事務所デモサイトのプロフィールと制作姿勢を紹介します。",
  alternates: {
    canonical: "/about",
  },
};

export default function AboutPage() {
  return (
    <>
      <FullBleedHero
        eyebrow="ABOUT"
        title="専門性と実装力を両立する制作スタンス"
        description="相談者の不安を減らす情報提示を起点に、視覚設計とコード品質を一体で扱うことを重視しています。"
        actions={[
          { href: "/works", label: "実績を確認する" },
          { href: "/contact", label: "相談を始める", style: "secondary" },
        ]}
      />

      <section className="grid gap-6 lg:grid-cols-[1.2fr_0.8fr]">
        <article className="section-card p-6 sm:p-8">
          <h2 className="font-serif text-3xl text-[--base]">プロフィール</h2>
          <p className="mt-4 text-sm leading-8 text-[--ink-soft]">
            永井行政書士事務所では、法務系サービスに必要な正確性と、Webでの伝わりやすさを同時に満たすことを目指しています。
            このデモサイトは、採用担当者が確認しやすいように、情報設計・UI・実装品質を分かりやすく提示する構成です。
          </p>
        </article>

        <aside className="section-card p-6 sm:p-8">
          <h2 className="font-serif text-2xl text-[--base]">提供領域</h2>
          <ul className="mt-4 space-y-3 text-sm text-[--ink-soft]">
            <li>・Webサイト企画と情報設計</li>
            <li>・Next.jsによるフロント実装</li>
            <li>・公開前の品質確認と運用導線整備</li>
          </ul>
        </aside>
      </section>

      <section className="space-y-6">
        <h2 className="font-serif text-3xl text-[--base]">取り組みの変遷</h2>
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
