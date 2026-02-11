import type { Metadata } from "next";
import Link from "next/link";

import { ContactForm } from "@/components/contact-form";
import { FullBleedHero } from "@/components/full-bleed-hero";
import { contactMethods } from "@/lib/site-content";

export const metadata: Metadata = {
  title: "Contact",
  description: "永井行政書士事務所デモサイトのお問い合わせページです。",
  alternates: {
    canonical: "/contact",
  },
};

export default function ContactPage() {
  return (
    <>
      <FullBleedHero
        eyebrow="CONTACT"
        title="ご相談内容に合わせて、最短で連絡できる導線を用意"
        description="メール・電話・オンライン面談の3導線を配置しています。採用担当者向けの問い合わせ導線デモとしてご確認ください。"
        actions={[
          { href: "#contact-form", label: "フォームへ進む" },
          { href: "/works", label: "実績を先に見る", style: "secondary" },
        ]}
      />

      <section className="space-y-6">
        <h2 className="font-serif text-3xl text-[--base]">ご連絡方法</h2>
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

      <section id="contact-form" className="scroll-mt-20">
        <ContactForm />
      </section>
    </>
  );
}
