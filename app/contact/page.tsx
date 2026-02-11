import type { Metadata } from "next";
import Link from "next/link";

import { ContactForm } from "@/components/contact-form";
import { FullBleedHero } from "@/components/full-bleed-hero";
import { contactMethods, officeQuickFacts } from "@/lib/site-content";

export const metadata: Metadata = {
  title: "Contact",
  description: "永井行政書士事務所へのお問い合わせ方法をご案内します。",
  alternates: {
    canonical: "/contact",
  },
};

export default function ContactPage() {
  return (
    <>
      <FullBleedHero
        eyebrow="CONTACT"
        title="ご相談内容に応じた連絡方法をご用意しています"
        description="メール・電話・オンライン相談の3つの窓口からご連絡いただけます。まずは現在のお悩みをお聞かせください。"
        actions={[
          { href: "#contact-form", label: "フォームへ進む" },
          { href: "/works", label: "支援事例を見る", style: "secondary" },
        ]}
      />

      <section className="space-y-6">
        <h2 className="font-serif text-3xl text-[--base]">お問い合わせ方法</h2>
        <div className="grid gap-4 md:grid-cols-3">
          {contactMethods.map((method) => (
            <article key={method.title} className="section-card p-6">
              <h3 className="font-serif text-xl text-[--base]">{method.title}</h3>
              <p className="mt-2 text-sm text-[--ink-soft]">{method.detail}</p>
              <Link
                href={method.href}
                className="mt-4 inline-flex rounded-full border border-[--base] px-4 py-2 text-sm font-semibold text-[--base] transition hover:bg-[--base] hover:text-white"
              >
                {method.value}
              </Link>
            </article>
          ))}
        </div>
      </section>

      <section className="space-y-6">
        <div className="space-y-2">
          <p className="text-xs font-semibold tracking-[0.14em] text-[--accent]">INFORMATION</p>
          <h2 className="font-serif text-3xl text-[--base]">対応エリア・営業時間・相談料</h2>
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
      </section>

      <section id="contact-form" className="scroll-mt-20">
        <ContactForm />
      </section>
    </>
  );
}
