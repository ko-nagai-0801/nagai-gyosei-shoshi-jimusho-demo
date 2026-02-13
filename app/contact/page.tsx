import type { Metadata } from "next";

import { ContactForm } from "@/components/contact-form";
import { ContactMethodsSection } from "@/components/contact-methods-section";
import { FullBleedHero } from "@/components/full-bleed-hero";
import { officeQuickFacts } from "@/lib/site-content";

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
        title="小さな疑問でも、まずはお気軽にご相談ください"
        description="メール・電話・オンライン相談の3つの窓口からご連絡いただけます。状況を伺い、必要な手続きをわかりやすくご案内します。"
        actions={[
          { href: "#contact-form", label: "フォームで相談する" },
          { href: "/pricing", label: "見積もりを依頼する", style: "secondary" },
        ]}
      />

      <ContactMethodsSection />

      <section className="space-y-6">
        <div className="space-y-2">
          <p className="text-xs font-semibold tracking-[0.14em] text-[var(--accent)]">INFORMATION</p>
          <h2 className="font-serif text-3xl text-[var(--base-strong)]">対応エリア・営業時間・相談料</h2>
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
      </section>

      <section id="contact-form" className="scroll-mt-20">
        <ContactForm />
      </section>
    </>
  );
}
