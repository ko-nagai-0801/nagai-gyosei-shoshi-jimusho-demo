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
    <div className="rounded-2xl border border-[--line] bg-[--card] p-6 shadow-sm sm:p-8">
      <h2 className="font-serif text-2xl text-[--base]">お問い合わせフォーム（デモ）</h2>
      <p className="mt-2 text-sm text-[--ink-soft]">
        送信フロー確認のためのデモ実装です。入力後に送信完了メッセージを表示します。
      </p>

      <form className="mt-6 space-y-4" onSubmit={handleSubmit}>
        <label className="block space-y-2">
          <span className="text-sm font-medium text-[--ink]">お名前</span>
          <input
            type="text"
            required
            value={form.name}
            onChange={(event) =>
              setForm((prev) => ({ ...prev, name: event.target.value }))
            }
            className="w-full rounded-xl border border-[--line] bg-white px-4 py-3 text-sm outline-none ring-offset-2 transition focus:border-[--base] focus:ring-2 focus:ring-[--base-soft]"
            placeholder="例: 永井 太郎"
          />
        </label>

        <label className="block space-y-2">
          <span className="text-sm font-medium text-[--ink]">メールアドレス</span>
          <input
            type="email"
            required
            value={form.email}
            onChange={(event) =>
              setForm((prev) => ({ ...prev, email: event.target.value }))
            }
            className="w-full rounded-xl border border-[--line] bg-white px-4 py-3 text-sm outline-none ring-offset-2 transition focus:border-[--base] focus:ring-2 focus:ring-[--base-soft]"
            placeholder="example@example.com"
          />
        </label>

        <label className="block space-y-2">
          <span className="text-sm font-medium text-[--ink]">ご相談内容</span>
          <textarea
            required
            rows={5}
            value={form.message}
            onChange={(event) =>
              setForm((prev) => ({ ...prev, message: event.target.value }))
            }
            className="w-full rounded-xl border border-[--line] bg-white px-4 py-3 text-sm outline-none ring-offset-2 transition focus:border-[--base] focus:ring-2 focus:ring-[--base-soft]"
            placeholder="ご相談内容を入力してください"
          />
        </label>

        <button
          type="submit"
          className="rounded-full bg-[--base] px-6 py-3 text-sm font-semibold text-white transition hover:brightness-95"
        >
          送信する
        </button>
      </form>

      {submitted && (
        <p className="mt-4 rounded-xl border border-emerald-200 bg-emerald-50 px-4 py-3 text-sm text-emerald-700">
          送信ありがとうございます。デモ環境のため実送信は行われませんが、導線確認は完了です。
        </p>
      )}
    </div>
  );
}
