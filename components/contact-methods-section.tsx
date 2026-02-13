"use client";

import Link from "next/link";
import { useEffect } from "react";

import { trackCvEvent } from "@/lib/cv-tracking";
import { contactMethods } from "@/lib/site-content";

function getChannel(href: string) {
  if (href.startsWith("tel:")) return "phone";
  if (href.startsWith("mailto:")) return "email";
  return "other";
}

export function ContactMethodsSection() {
  useEffect(() => {
    trackCvEvent("contact_page_view", { page: "/contact" });
  }, []);

  return (
    <section className="space-y-6">
      <h2 className="font-serif text-3xl text-[var(--base-strong)]">お問い合わせ方法</h2>
      <div className="grid gap-4 md:grid-cols-3">
        {contactMethods.map((method) => (
          <article key={method.title} className="section-card p-6">
            <h3 className="font-serif text-xl text-[var(--base-strong)]">{method.title}</h3>
            <p className="mt-2 text-sm text-[var(--ink-soft)]">{method.detail}</p>
            <Link
              href={method.href}
              onClick={() =>
                trackCvEvent("contact_method_click", {
                  method: method.title,
                  channel: getChannel(method.href),
                })
              }
              className="mt-4 inline-flex rounded-full border border-[var(--base)] px-4 py-2 text-sm font-semibold text-[var(--base)] transition hover:bg-[var(--base)] hover:text-white"
            >
              {method.value}
            </Link>
          </article>
        ))}
      </div>
    </section>
  );
}
