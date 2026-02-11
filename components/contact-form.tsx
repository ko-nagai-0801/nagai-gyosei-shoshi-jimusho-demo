"use client";

import { FormEvent, useState } from "react";

type FormState = {
  name: string;
  email: string;
  message: string;
};

const initialState: FormState = {
  name: "",
  email: "",
  message: "",
};

export function ContactForm() {
  const [form, setForm] = useState<FormState>(initialState);
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setSubmitted(true);
    setForm(initialState);
  };

  return (
    <div className="rounded-2xl border border-[var(--line)] bg-[var(--card)] p-6 shadow-sm sm:p-8">
      <h2 className="font-serif text-2xl text-[var(--base)]">お問い合わせフォーム</h2>
      <p className="mt-2 text-sm text-[var(--ink-soft)]">
        ご相談内容を確認のうえ、2営業日以内を目安に担当者よりご連絡します。
      </p>

      <form className="mt-6 space-y-4" onSubmit={handleSubmit}>
        <label className="block space-y-2">
          <span className="text-sm font-medium text-[var(--ink)]">お名前</span>
          <input
            type="text"
            required
            value={form.name}
            onChange={(event) =>
              setForm((prev) => ({ ...prev, name: event.target.value }))
            }
            className="w-full rounded-xl border border-[var(--line)] bg-white px-4 py-3 text-sm outline-none ring-offset-2 transition focus:border-[var(--base)] focus:ring-2 focus:ring-[var(--base-soft)]"
            placeholder="例: 永井 太郎"
          />
        </label>

        <label className="block space-y-2">
          <span className="text-sm font-medium text-[var(--ink)]">メールアドレス</span>
          <input
            type="email"
            required
            value={form.email}
            onChange={(event) =>
              setForm((prev) => ({ ...prev, email: event.target.value }))
            }
            className="w-full rounded-xl border border-[var(--line)] bg-white px-4 py-3 text-sm outline-none ring-offset-2 transition focus:border-[var(--base)] focus:ring-2 focus:ring-[var(--base-soft)]"
            placeholder="例: info@example.co.jp"
          />
        </label>

        <label className="block space-y-2">
          <span className="text-sm font-medium text-[var(--ink)]">ご相談内容</span>
          <textarea
            required
            rows={5}
            value={form.message}
            onChange={(event) =>
              setForm((prev) => ({ ...prev, message: event.target.value }))
            }
            className="w-full rounded-xl border border-[var(--line)] bg-white px-4 py-3 text-sm outline-none ring-offset-2 transition focus:border-[var(--base)] focus:ring-2 focus:ring-[var(--base-soft)]"
            placeholder="ご相談内容をご記入ください"
          />
        </label>

        <button
          type="submit"
          className="rounded-full bg-[var(--base)] px-6 py-3 text-sm font-semibold text-white transition hover:brightness-95"
        >
          送信する
        </button>
      </form>

      {submitted && (
        <p className="mt-4 rounded-xl border border-emerald-200 bg-emerald-50 px-4 py-3 text-sm text-emerald-700">
          お問い合わせを受け付けました。内容を確認のうえ担当者よりご連絡します。
        </p>
      )}
    </div>
  );
}
