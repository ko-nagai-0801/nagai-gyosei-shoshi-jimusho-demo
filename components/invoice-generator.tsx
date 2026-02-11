"use client";

import { useMemo, useState } from "react";

import { invoiceSampleMeta } from "@/lib/site-content";

type InvoiceForm = {
  invoiceNo: string;
  recipient: string;
  subject: string;
  fee: string;
  issueDate: string;
  dueDate: string;
};

const today = new Date();
const defaultIssueDate = today.toISOString().slice(0, 10);
const defaultDueDate = new Date(today.getTime() + 14 * 24 * 60 * 60 * 1000)
  .toISOString()
  .slice(0, 10);

const initialForm: InvoiceForm = {
  invoiceNo: "INV-2026-0211-001",
  recipient: "株式会社サンプル商事 御中",
  subject: "建設業許可（新規）申請サポート業務",
  fee: "120000",
  issueDate: defaultIssueDate,
  dueDate: defaultDueDate,
};

function formatDate(dateText: string) {
  const date = new Date(`${dateText}T00:00:00`);
  if (Number.isNaN(date.getTime())) return dateText;
  return `${date.getFullYear()}年${date.getMonth() + 1}月${date.getDate()}日`;
}

function formatYen(value: number) {
  return `${value.toLocaleString("ja-JP")}円`;
}

function toSafeNumber(value: string) {
  const digits = value.replace(/[^0-9]/g, "");
  return digits ? Number(digits) : 0;
}

export function InvoiceGenerator() {
  const [form, setForm] = useState<InvoiceForm>(initialForm);

  const fee = useMemo(() => toSafeNumber(form.fee), [form.fee]);
  const tax = Math.floor(fee * 0.1);
  const total = fee + tax;

  const downloadHref = useMemo(() => {
    const params = new URLSearchParams({
      invoiceNo: form.invoiceNo,
      recipient: form.recipient,
      subject: form.subject,
      fee: String(fee),
      issueDate: form.issueDate,
      dueDate: form.dueDate,
    });

    return `/api/invoice-sample?${params.toString()}`;
  }, [fee, form]);

  return (
    <div className="grid gap-4 lg:grid-cols-[1.35fr_0.85fr]">
      <article className="section-card overflow-hidden">
        <div className="flex items-center justify-between border-b border-[var(--line)] bg-[var(--base-soft)] px-5 py-3">
          <p className="text-sm font-semibold text-[var(--base-strong)]">{invoiceSampleMeta.fileName}</p>
          <p className="rounded-full border border-[var(--base)] px-2 py-1 text-xs font-semibold text-[var(--base)]">
            {invoiceSampleMeta.format}
          </p>
        </div>

        <div className="bg-[#fffefb] p-6 sm:p-8">
          <div className="mx-auto w-full max-w-2xl rounded-md border border-[var(--line)] bg-white p-5 shadow-[0_8px_20px_rgba(69,56,39,0.08)]">
            <div className="flex items-start justify-between">
              <div>
                <p className="text-xs font-semibold tracking-[0.12em] text-[var(--accent)]">SAMPLE</p>
                <h3 className="mt-1 font-serif text-xl text-[var(--base-strong)]">ご請求書</h3>
              </div>
              <p className="text-xs text-[var(--ink-soft)]">No. {form.invoiceNo}</p>
            </div>

            <dl className="mt-4 grid gap-2 text-sm sm:grid-cols-2">
              <div className="rounded-md border border-[var(--line)] px-3 py-2">
                <dt className="text-[11px] font-semibold tracking-[0.08em] text-[var(--accent)]">宛名</dt>
                <dd className="mt-1 text-xs font-medium text-[var(--ink)]">{form.recipient}</dd>
              </div>
              <div className="rounded-md border border-[var(--line)] px-3 py-2">
                <dt className="text-[11px] font-semibold tracking-[0.08em] text-[var(--accent)]">件名</dt>
                <dd className="mt-1 text-xs font-medium text-[var(--ink)]">{form.subject}</dd>
              </div>
              <div className="rounded-md border border-[var(--line)] px-3 py-2">
                <dt className="text-[11px] font-semibold tracking-[0.08em] text-[var(--accent)]">発行日</dt>
                <dd className="mt-1 text-xs font-medium text-[var(--ink)]">{formatDate(form.issueDate)}</dd>
              </div>
              <div className="rounded-md border border-[var(--line)] px-3 py-2">
                <dt className="text-[11px] font-semibold tracking-[0.08em] text-[var(--accent)]">支払期限</dt>
                <dd className="mt-1 text-xs font-medium text-[var(--ink)]">{formatDate(form.dueDate)}</dd>
              </div>
              <div className="rounded-md border border-[var(--line)] px-3 py-2">
                <dt className="text-[11px] font-semibold tracking-[0.08em] text-[var(--accent)]">業務報酬</dt>
                <dd className="mt-1 text-xs font-medium text-[var(--ink)]">{formatYen(fee)}</dd>
              </div>
              <div className="rounded-md border border-[var(--line)] px-3 py-2">
                <dt className="text-[11px] font-semibold tracking-[0.08em] text-[var(--accent)]">消費税（10%）</dt>
                <dd className="mt-1 text-xs font-medium text-[var(--ink)]">{formatYen(tax)}</dd>
              </div>
              <div className="rounded-md border border-[var(--line)] px-3 py-2 sm:col-span-2">
                <dt className="text-[11px] font-semibold tracking-[0.08em] text-[var(--accent)]">ご請求金額</dt>
                <dd className="mt-1 text-sm font-semibold text-[var(--base-strong)]">{formatYen(total)}（税込）</dd>
              </div>
            </dl>
          </div>
        </div>
      </article>

      <aside className="section-card flex flex-col gap-5 p-6">
        <div className="space-y-2">
          <p className="text-xs font-semibold tracking-[0.12em] text-[var(--accent)]">PSEUDO GENERATOR</p>
          <h3 className="font-serif text-2xl text-[var(--base-strong)]">入力連動でPDF生成</h3>
          <p className="text-sm leading-7 text-[var(--ink-soft)]">
            ここで入力した内容を反映した日本語PDFを、その場でダウンロードできます。
          </p>
        </div>

        <div className="space-y-3">
          <label className="block space-y-1">
            <span className="text-xs font-semibold text-[var(--ink-soft)]">請求書番号</span>
            <input
              value={form.invoiceNo}
              onChange={(event) =>
                setForm((prev) => ({ ...prev, invoiceNo: event.target.value }))
              }
              className="w-full rounded-lg border border-[var(--line)] bg-[#fffdf8] px-3 py-2 text-sm text-[var(--ink)]"
            />
          </label>

          <label className="block space-y-1">
            <span className="text-xs font-semibold text-[var(--ink-soft)]">宛名</span>
            <input
              value={form.recipient}
              onChange={(event) =>
                setForm((prev) => ({ ...prev, recipient: event.target.value }))
              }
              className="w-full rounded-lg border border-[var(--line)] bg-[#fffdf8] px-3 py-2 text-sm text-[var(--ink)]"
            />
          </label>

          <label className="block space-y-1">
            <span className="text-xs font-semibold text-[var(--ink-soft)]">件名</span>
            <input
              value={form.subject}
              onChange={(event) =>
                setForm((prev) => ({ ...prev, subject: event.target.value }))
              }
              className="w-full rounded-lg border border-[var(--line)] bg-[#fffdf8] px-3 py-2 text-sm text-[var(--ink)]"
            />
          </label>

          <label className="block space-y-1">
            <span className="text-xs font-semibold text-[var(--ink-soft)]">業務報酬（円）</span>
            <input
              value={form.fee}
              onChange={(event) =>
                setForm((prev) => ({ ...prev, fee: event.target.value }))
              }
              className="w-full rounded-lg border border-[var(--line)] bg-[#fffdf8] px-3 py-2 text-sm text-[var(--ink)]"
            />
          </label>

          <div className="grid grid-cols-2 gap-2">
            <label className="block space-y-1">
              <span className="text-xs font-semibold text-[var(--ink-soft)]">発行日</span>
              <input
                type="date"
                value={form.issueDate}
                onChange={(event) =>
                  setForm((prev) => ({ ...prev, issueDate: event.target.value }))
                }
                className="w-full rounded-lg border border-[var(--line)] bg-[#fffdf8] px-3 py-2 text-sm text-[var(--ink)]"
              />
            </label>

            <label className="block space-y-1">
              <span className="text-xs font-semibold text-[var(--ink-soft)]">支払期限</span>
              <input
                type="date"
                value={form.dueDate}
                onChange={(event) =>
                  setForm((prev) => ({ ...prev, dueDate: event.target.value }))
                }
                className="w-full rounded-lg border border-[var(--line)] bg-[#fffdf8] px-3 py-2 text-sm text-[var(--ink)]"
              />
            </label>
          </div>
        </div>

        <a
          href={downloadHref}
          download
          className="inline-flex justify-center rounded-full bg-[var(--base)] px-5 py-3 text-sm font-semibold text-white transition hover:brightness-95"
        >
          入力内容でPDFをダウンロード
        </a>

        <p className="text-xs leading-6 text-[var(--ink-soft)]">{invoiceSampleMeta.note}</p>
      </aside>
    </div>
  );
}
