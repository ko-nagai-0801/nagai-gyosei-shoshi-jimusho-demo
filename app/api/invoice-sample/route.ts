import { readFile } from "node:fs/promises";
import path from "node:path";

import fontkit from "@pdf-lib/fontkit";
import { PDFDocument, rgb } from "pdf-lib";

import { qualifiedInvoiceNumber } from "@/lib/site-content";

export const dynamic = "force-dynamic";

function clampText(value: string | null, fallback: string, maxLength: number) {
  const text = (value ?? "").trim();
  if (!text) return fallback;
  return text.slice(0, maxLength);
}

function toAmount(value: string | null, fallback: number) {
  const digits = (value ?? "").replace(/[^0-9]/g, "");
  if (!digits) return fallback;

  const parsed = Number(digits);
  if (Number.isNaN(parsed)) return fallback;

  return Math.max(0, Math.min(parsed, 999999999));
}

function formatDate(dateText: string) {
  const date = new Date(`${dateText}T00:00:00`);
  if (Number.isNaN(date.getTime())) return dateText;
  return `${date.getFullYear()}年${date.getMonth() + 1}月${date.getDate()}日`;
}

function formatYen(amount: number) {
  return `${amount.toLocaleString("ja-JP")}円`;
}

export async function GET(request: Request) {
  const url = new URL(request.url);
  const invoiceNo = clampText(
    url.searchParams.get("invoiceNo"),
    "INV-2026-0211-001",
    40,
  );
  const recipient = clampText(
    url.searchParams.get("recipient"),
    "株式会社サンプル商事 御中",
    80,
  );
  const subject = clampText(
    url.searchParams.get("subject"),
    "建設業許可（新規）申請サポート業務",
    90,
  );
  const issueDate = clampText(
    url.searchParams.get("issueDate"),
    "2026-02-11",
    20,
  );
  const dueDate = clampText(url.searchParams.get("dueDate"), "2026-02-25", 20);

  const fee = toAmount(url.searchParams.get("fee"), 120000);
  const tax = Math.floor(fee * 0.1);
  const total = fee + tax;

  const regularFontPath = path.join(
    process.cwd(),
    "node_modules",
    "@fontsource",
    "noto-sans-jp",
    "files",
    "noto-sans-jp-japanese-400-normal.woff",
  );
  const boldFontPath = path.join(
    process.cwd(),
    "node_modules",
    "@fontsource",
    "noto-sans-jp",
    "files",
    "noto-sans-jp-japanese-700-normal.woff",
  );

  const [regularFontBytes, boldFontBytes] = await Promise.all([
    readFile(regularFontPath),
    readFile(boldFontPath),
  ]);

  const pdfDoc = await PDFDocument.create();
  pdfDoc.registerFontkit(fontkit);

  const regularFont = await pdfDoc.embedFont(regularFontBytes, { subset: true });
  const boldFont = await pdfDoc.embedFont(boldFontBytes, { subset: true });

  const page = pdfDoc.addPage([595.28, 841.89]);

  page.drawRectangle({
    x: 0,
    y: 760,
    width: 595.28,
    height: 82,
    color: rgb(0.91, 0.95, 0.92),
  });

  page.drawText("永井行政書士事務所", {
    x: 42,
    y: 806,
    size: 18,
    font: boldFont,
    color: rgb(0.12, 0.25, 0.19),
  });

  page.drawText("ご請求書", {
    x: 42,
    y: 776,
    size: 14,
    font: boldFont,
    color: rgb(0.18, 0.17, 0.14),
  });

  page.drawText(`請求書番号: ${invoiceNo}`, {
    x: 392,
    y: 806,
    size: 9,
    font: regularFont,
    color: rgb(0.3, 0.28, 0.24),
  });

  page.drawText(`発行日: ${formatDate(issueDate)}`, {
    x: 392,
    y: 790,
    size: 9,
    font: regularFont,
    color: rgb(0.3, 0.28, 0.24),
  });

  page.drawText(`支払期限: ${formatDate(dueDate)}`, {
    x: 392,
    y: 774,
    size: 9,
    font: regularFont,
    color: rgb(0.3, 0.28, 0.24),
  });

  page.drawRectangle({
    x: 40,
    y: 716,
    width: 515,
    height: 32,
    borderColor: rgb(0.85, 0.8, 0.72),
    borderWidth: 1,
    color: rgb(0.99, 0.98, 0.96),
  });

  page.drawText(`宛名: ${recipient}`, {
    x: 50,
    y: 728,
    size: 10,
    font: regularFont,
    color: rgb(0.18, 0.17, 0.14),
  });

  page.drawRectangle({
    x: 40,
    y: 670,
    width: 515,
    height: 32,
    borderColor: rgb(0.85, 0.8, 0.72),
    borderWidth: 1,
    color: rgb(0.99, 0.98, 0.96),
  });

  page.drawText(`件名: ${subject}`, {
    x: 50,
    y: 682,
    size: 10,
    font: regularFont,
    color: rgb(0.18, 0.17, 0.14),
  });

  const tableX = 40;
  const tableWidth = 515;
  const rowHeight = 30;
  let y = 620;

  page.drawRectangle({
    x: tableX,
    y,
    width: tableWidth,
    height: rowHeight,
    color: rgb(0.9, 0.95, 0.91),
  });

  page.drawText("項目", {
    x: tableX + 12,
    y: y + 11,
    size: 10,
    font: boldFont,
    color: rgb(0.14, 0.27, 0.21),
  });

  page.drawText("金額", {
    x: tableX + 420,
    y: y + 11,
    size: 10,
    font: boldFont,
    color: rgb(0.14, 0.27, 0.21),
  });

  const rows = [
    { label: "業務報酬", value: formatYen(fee) },
    { label: "消費税（10%）", value: formatYen(tax) },
    { label: "ご請求金額（税込）", value: formatYen(total) },
  ];

  y -= rowHeight;
  for (const row of rows) {
    page.drawRectangle({
      x: tableX,
      y,
      width: tableWidth,
      height: rowHeight,
      borderColor: rgb(0.85, 0.8, 0.72),
      borderWidth: 1,
      color: rgb(1, 1, 1),
    });

    page.drawText(row.label, {
      x: tableX + 12,
      y: y + 11,
      size: 10,
      font: row.label.includes("ご請求") ? boldFont : regularFont,
      color: rgb(0.18, 0.17, 0.14),
    });

    page.drawText(row.value, {
      x: tableX + 420,
      y: y + 11,
      size: 10,
      font: row.label.includes("ご請求") ? boldFont : regularFont,
      color: rgb(0.18, 0.17, 0.14),
    });

    y -= rowHeight;
  }

  page.drawText("適格請求書発行事業者登録番号", {
    x: 40,
    y: 446,
    size: 9,
    font: regularFont,
    color: rgb(0.3, 0.28, 0.24),
  });

  page.drawText(qualifiedInvoiceNumber, {
    x: 40,
    y: 430,
    size: 10,
    font: boldFont,
    color: rgb(0.18, 0.17, 0.14),
  });

  page.drawText("本書はデモ用に自動生成された仮の請求書です。", {
    x: 40,
    y: 82,
    size: 8,
    font: regularFont,
    color: rgb(0.36, 0.34, 0.3),
  });

  const bytes = await pdfDoc.save();
  const body = Uint8Array.from(bytes);
  const fileName = `invoice-${invoiceNo.replace(/[^0-9A-Za-z_-]/g, "") || "sample"}.pdf`;

  return new Response(body, {
    headers: {
      "Content-Type": "application/pdf",
      "Content-Disposition": `attachment; filename="${fileName}"`,
      "Cache-Control": "no-store",
    },
  });
}
