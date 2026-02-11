"use client";

import { useMemo, useState } from "react";

import { invoiceSampleMeta, qualifiedInvoiceNumber } from "@/lib/site-content";

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
  const paymentDestination = "〇〇銀行 〇〇支店 普通 1234567 ナガイタロウ";
  const lineItems = [
    { label: "業務報酬", value: formatYen(fee) },
    { label: "消費税（10%）", value: formatYen(tax) },
    { label: "ご請求金額", value: `${formatYen(total)}（税込）` },
  ];

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

        <div className="bg-[#fffefb] p-4 sm:p-6">
          <div className="mx-auto max-w-[560px]">
            <div className="aspect-[210/297] rounded-md border border-[#b8c4d5] bg-white p-4 shadow-[0_14px_30px_rgba(32,50,77,0.14)] sm:p-6">
              <div className="flex items-start justify-between border-b border-[#c4cfde] pb-4">
                <div className="flex items-start gap-3">
                  <div className="flex h-10 w-10 items-center justify-center rounded-full bg-[#203450] text-base font-bold text-white">
                    N
                  </div>
                  <div>
                    <p className="text-[9px] font-semibold tracking-[0.16em] text-[#546178]">NAGAI OFFICE</p>
                    <p className="mt-1 text-[13px] font-semibold text-[#1f2d43]">永井行政書士事務所</p>
                    <p className="mt-0.5 text-[9px] text-[#5f6d81]">東京都港区南青山0-0-0 / TEL 03-1234-5678</p>
                  </div>
                </div>

                <div className="text-right">
                  <p className="font-serif text-[23px] leading-none text-[#1f2d43] sm:text-[26px]">請求書</p>
                  <p className="mt-2 text-[10px] text-[#44556f]">No. {form.invoiceNo}</p>
                </div>
              </div>

              <table className="mt-3 w-full border border-[#c4cfde] text-[10px] text-[#24344a]">
                <tbody>
                  <tr>
                    <th className="w-[18%] border-b border-r border-[#c4cfde] bg-[#eef3fb] px-2 py-1.5 text-left font-semibold">
                      発行日
                    </th>
                    <td className="w-[32%] border-b border-[#c4cfde] px-2 py-1.5">{formatDate(form.issueDate)}</td>
                    <th className="w-[18%] border-b border-x border-[#c4cfde] bg-[#eef3fb] px-2 py-1.5 text-left font-semibold">
                      支払期限
                    </th>
                    <td className="w-[32%] border-b border-[#c4cfde] px-2 py-1.5">{formatDate(form.dueDate)}</td>
                  </tr>
                </tbody>
              </table>

              <div className="mt-3 border border-[#c4cfde]">
                <p className="border-b border-[#c4cfde] bg-[#f9fbff] px-2 py-1.5 text-[9px] font-semibold tracking-[0.08em] text-[#495975]">
                  請求先
                </p>
                <p className="px-2 py-2 text-[11px] font-medium text-[#1f2d43]">{form.recipient}</p>
              </div>

              <div className="mt-3 grid grid-cols-[68px_1fr] border border-[#c4cfde] text-[10px]">
                <p className="border-r border-[#c4cfde] bg-[#f9fbff] px-2 py-2 font-semibold text-[#495975]">件名</p>
                <p className="px-2 py-2 text-[#24344a]">{form.subject}</p>
              </div>

              <table className="mt-4 w-full border border-[#b6c3d6] text-[10px] text-[#24344a]">
                <thead className="bg-[#e9f1fb] text-[#233a5b]">
                  <tr>
                    <th className="w-[68%] border-b border-r border-[#b6c3d6] px-2 py-2 text-left font-semibold">項目</th>
                    <th className="w-[32%] border-b border-[#b6c3d6] px-2 py-2 text-right font-semibold">金額</th>
                  </tr>
                </thead>
                <tbody>
                  {lineItems.map((item, index) => {
                    const isTotal = index === lineItems.length - 1;
                    return (
                      <tr key={item.label} className={isTotal ? "bg-[#f7fbff]" : "bg-white"}>
                        <td
                          className={`border-t border-r border-[#c4cfde] px-2 py-2 ${isTotal ? "font-semibold text-[#1f2d43]" : ""}`}
                        >
                          {item.label}
                        </td>
                        <td
                          className={`border-t border-[#c4cfde] px-2 py-2 text-right ${isTotal ? "font-semibold text-[#1f2d43]" : ""}`}
                        >
                          {item.value}
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>

              <div className="mt-4 space-y-1.5 text-[9px] text-[#4f5f74]">
                <div className="grid grid-cols-[88px_1fr] border border-[#c4cfde]">
                  <p className="border-r border-[#c4cfde] bg-[#f9fbff] px-2 py-1.5 font-semibold">支払方法</p>
                  <p className="px-2 py-1.5">銀行振込（振込手数料はご負担をお願いします）</p>
                </div>
                <div className="grid grid-cols-[88px_1fr] border border-[#c4cfde]">
                  <p className="border-r border-[#c4cfde] bg-[#f9fbff] px-2 py-1.5 font-semibold">振込先</p>
                  <p className="px-2 py-1.5">{paymentDestination}</p>
                </div>
                <div className="grid grid-cols-[88px_1fr] border border-[#c4cfde]">
                  <p className="border-r border-[#c4cfde] bg-[#f9fbff] px-2 py-1.5 font-semibold">登録番号</p>
                  <p className="px-2 py-1.5">{qualifiedInvoiceNumber}</p>
                </div>
              </div>

              <p className="mt-3 text-[8px] leading-[1.55] text-[#61728a]">
                本プレビューはデモ用の擬似請求書です。実際のご契約・税務処理には利用できません。
              </p>
            </div>
          </div>
        </div>
      </article>

      <aside className="section-card flex flex-col gap-5 p-6">
        <div className="space-y-2">
          <p className="text-xs font-semibold tracking-[0.12em] text-[var(--accent)]">PSEUDO GENERATOR</p>
          <h3 className="font-serif text-2xl text-[var(--base-strong)]">入力連動でPDF生成</h3>
          <p className="text-sm leading-7 text-[var(--ink-soft)]">
            ここで入力した内容を反映し、左のプレビューと同じ構成で日本語PDFをダウンロードできます。
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
