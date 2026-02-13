import type { Metadata } from "next";
import Link from "next/link";

import { FullBleedHero } from "@/components/full-bleed-hero";
import { InvoiceGenerator } from "@/components/invoice-generator";
import {
  cancellationPolicies,
  paymentTerms,
  paymentMethods,
  pricingDisclaimers,
  pricingOptions,
  pricingPlans,
  pricingRevisedAt,
  qualifiedInvoiceNumber,
} from "@/lib/site-content";

export const metadata: Metadata = {
  title: "Pricing",
  description:
    "永井行政書士事務所の料金表です。詳細条件、オプション費用、支払条件、キャンセルポリシー、免責事項をご確認いただけます。",
  alternates: {
    canonical: "/pricing",
  },
};

export default function PricingPage() {
  return (
    <>
      <FullBleedHero
        eyebrow="PRICING"
        title="料金表とお支払い条件のご案内"
        description="ご依頼前に費用の目安と適用条件を確認できるよう、基本料金・追加費用・支払条件・免責事項を明記しています。"
        actions={[
          { href: "/contact", label: "見積もりを依頼する" },
          { href: "/works", label: "支援事例を見る", style: "secondary" },
        ]}
      />

      <section className="space-y-6">
        <div className="space-y-2">
          <p className="text-xs font-semibold tracking-[0.14em] text-[var(--accent)]">BASE PRICING</p>
          <h2 className="font-serif text-3xl text-[var(--base-strong)]">基本料金と対応範囲</h2>
        </div>

        <div className="grid gap-4 lg:grid-cols-3">
          {pricingPlans.map((plan) => (
            <article key={plan.service} className="section-card p-6">
              <h3 className="font-serif text-xl text-[var(--base-strong)]">{plan.service}</h3>
              <p className="mt-2 text-lg font-semibold text-[var(--ink)]">{plan.baseFee}</p>

              <p className="mt-4 text-xs font-semibold tracking-[0.12em] text-[var(--accent)]">基本対応</p>
              <ul className="mt-2 space-y-2 text-sm text-[var(--ink-soft)]">
                {plan.includes.map((item) => (
                  <li key={item}>・{item}</li>
                ))}
              </ul>

              <p className="mt-4 text-xs font-semibold tracking-[0.12em] text-[var(--accent)]">詳細条件</p>
              <ul className="mt-2 space-y-2 text-sm text-[var(--ink-soft)]">
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
          <p className="text-xs font-semibold tracking-[0.14em] text-[var(--accent)]">OPTIONAL FEES</p>
          <h2 className="font-serif text-3xl text-[var(--base-strong)]">オプション費用</h2>
        </div>

        <div className="grid gap-4 md:grid-cols-3">
          {pricingOptions.map((option) => (
            <article key={option.option} className="section-card p-6">
              <h3 className="font-serif text-xl text-[var(--base-strong)]">{option.option}</h3>
              <p className="mt-2 text-lg font-semibold text-[var(--ink)]">{option.fee}</p>
              <p className="mt-3 text-sm leading-7 text-[var(--ink-soft)]">{option.note}</p>
            </article>
          ))}
        </div>
      </section>

      <section className="space-y-6">
        <div className="space-y-2">
          <p className="text-xs font-semibold tracking-[0.14em] text-[var(--accent)]">PAYMENT TERMS</p>
          <h2 className="font-serif text-3xl text-[var(--base-strong)]">支払条件（着手金 / 残金）</h2>
        </div>

        <div className="grid gap-4 md:grid-cols-2">
          {paymentTerms.map((term) => (
            <article key={term.label} className="section-card p-6">
              <p className="text-xs font-semibold tracking-[0.12em] text-[var(--accent)]">{term.label}</p>
              <h3 className="mt-2 font-serif text-2xl text-[var(--base-strong)]">{term.value}</h3>
              <p className="mt-3 text-sm leading-7 text-[var(--ink-soft)]">{term.detail}</p>
            </article>
          ))}
        </div>
      </section>

      <section className="space-y-6">
        <div className="space-y-2">
          <p className="text-xs font-semibold tracking-[0.14em] text-[var(--accent)]">CANCELLATION</p>
          <h2 className="font-serif text-3xl text-[var(--base-strong)]">キャンセルポリシー</h2>
        </div>

        <div className="grid gap-4 md:grid-cols-3">
          {cancellationPolicies.map((policy) => (
            <article key={policy.phase} className="section-card p-6">
              <h3 className="font-serif text-xl text-[var(--base-strong)]">{policy.phase}</h3>
              <p className="mt-2 text-lg font-semibold text-[var(--ink)]">{policy.fee}</p>
              <p className="mt-3 text-sm leading-7 text-[var(--ink-soft)]">{policy.note}</p>
            </article>
          ))}
        </div>
      </section>

      <section className="space-y-6">
        <div className="space-y-2">
          <p className="text-xs font-semibold tracking-[0.14em] text-[var(--accent)]">INVOICE SAMPLE</p>
          <h2 className="font-serif text-3xl text-[var(--base-strong)]">請求書サンプル（1ページ目プレビュー）</h2>
        </div>

        <InvoiceGenerator />
      </section>

      <section className="space-y-6">
        <div className="space-y-2">
          <p className="text-xs font-semibold tracking-[0.14em] text-[var(--accent)]">PAYMENT METHODS</p>
          <h2 className="font-serif text-3xl text-[var(--base-strong)]">支払い方法（振込 / カード等）</h2>
        </div>

        <div className="grid gap-4 md:grid-cols-3">
          {paymentMethods.map((method) => (
            <article key={method.method} className="section-card p-6">
              <h3 className="font-serif text-xl text-[var(--base-strong)]">{method.method}</h3>
              <p className="mt-3 text-sm leading-7 text-[var(--ink-soft)]">{method.detail}</p>
            </article>
          ))}
        </div>
      </section>

      <section className="space-y-6">
        <div className="space-y-2">
          <p className="text-xs font-semibold tracking-[0.14em] text-[var(--accent)]">DISCLAIMER</p>
          <h2 className="font-serif text-3xl text-[var(--base-strong)]">免責事項</h2>
        </div>

        <div className="section-card border-l-4 border-l-[var(--accent)] p-6 sm:p-8">
          <ul className="space-y-3 text-sm leading-7 text-[var(--ink-soft)]">
            {pricingDisclaimers.map((item) => (
              <li key={item}>・{item}</li>
            ))}
          </ul>
        </div>

        <p className="text-sm font-medium text-[var(--ink-soft)]">
          適格請求書番号: <span className="font-semibold text-[var(--ink)]">{qualifiedInvoiceNumber}</span>
        </p>
        <p className="text-sm font-medium text-[var(--ink-soft)]">
          料金改定日: <span className="font-semibold text-[var(--ink)]">{pricingRevisedAt}</span>
        </p>

        <Link
          href="/contact"
          className="inline-flex w-fit rounded-full bg-[var(--accent)] px-6 py-3 text-sm font-semibold text-white transition hover:brightness-95"
        >
          見積もりを依頼する
        </Link>
      </section>
    </>
  );
}
