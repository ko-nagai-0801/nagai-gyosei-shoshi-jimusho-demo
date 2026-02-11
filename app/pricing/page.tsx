import type { Metadata } from "next";
import Link from "next/link";

import { FullBleedHero } from "@/components/full-bleed-hero";
import {
  pricingDisclaimers,
  pricingOptions,
  pricingPlans,
} from "@/lib/site-content";

export const metadata: Metadata = {
  title: "Pricing",
  description:
    "永井行政書士事務所の料金表です。詳細条件、オプション費用、免責事項をご確認いただけます。",
  alternates: {
    canonical: "/pricing",
  },
};

export default function PricingPage() {
  return (
    <>
      <FullBleedHero
        eyebrow="PRICING"
        title="料金表・詳細条件・オプション費用のご案内"
        description="ご依頼前に費用の目安と適用条件を確認できるよう、基本料金・追加費用・免責事項を明記しています。"
        actions={[
          { href: "/contact", label: "見積もりを相談する" },
          { href: "/works", label: "支援事例を見る", style: "secondary" },
        ]}
      />

      <section className="space-y-6">
        <div className="space-y-2">
          <p className="text-xs font-semibold tracking-[0.14em] text-[--accent]">BASE PRICING</p>
          <h2 className="font-serif text-3xl text-[--base]">基本料金と対応範囲</h2>
        </div>

        <div className="grid gap-4 lg:grid-cols-3">
          {pricingPlans.map((plan) => (
            <article key={plan.service} className="section-card p-6">
              <h3 className="font-serif text-xl text-[--base]">{plan.service}</h3>
              <p className="mt-2 text-lg font-semibold text-[--ink]">{plan.baseFee}</p>

              <p className="mt-4 text-xs font-semibold tracking-[0.12em] text-[--accent]">基本対応</p>
              <ul className="mt-2 space-y-2 text-sm text-[--ink-soft]">
                {plan.includes.map((item) => (
                  <li key={item}>・{item}</li>
                ))}
              </ul>

              <p className="mt-4 text-xs font-semibold tracking-[0.12em] text-[--accent]">詳細条件</p>
              <ul className="mt-2 space-y-2 text-sm text-[--ink-soft]">
                {plan.conditions.map((condition) => (
                  <li key={condition}>・{condition}</li>
                ))}
              </ul>
            </article>
          ))}
        </div>
      </section>

      <section className="space-y-6">
        <div className="space-y-2">
          <p className="text-xs font-semibold tracking-[0.14em] text-[--accent]">OPTIONAL FEES</p>
          <h2 className="font-serif text-3xl text-[--base]">オプション費用</h2>
        </div>

        <div className="grid gap-4 md:grid-cols-3">
          {pricingOptions.map((option) => (
            <article key={option.option} className="section-card p-6">
              <h3 className="font-serif text-xl text-[--base]">{option.option}</h3>
              <p className="mt-2 text-lg font-semibold text-[--ink]">{option.fee}</p>
              <p className="mt-3 text-sm leading-7 text-[--ink-soft]">{option.note}</p>
            </article>
          ))}
        </div>
      </section>

      <section className="space-y-6">
        <div className="space-y-2">
          <p className="text-xs font-semibold tracking-[0.14em] text-[--accent]">DISCLAIMER</p>
          <h2 className="font-serif text-3xl text-[--base]">免責事項</h2>
        </div>

        <div className="section-card border-l-4 border-l-[--accent] p-6 sm:p-8">
          <ul className="space-y-3 text-sm leading-7 text-[--ink-soft]">
            {pricingDisclaimers.map((item) => (
              <li key={item}>・{item}</li>
            ))}
          </ul>
        </div>

        <Link
          href="/contact"
          className="inline-flex w-fit rounded-full bg-[--base] px-6 py-3 text-sm font-semibold text-white transition hover:brightness-95"
        >
          具体的な見積もりを依頼する
        </Link>
      </section>
    </>
  );
}
