import { readFile } from "node:fs/promises";
import path from "node:path";

import fontkit from "@pdf-lib/fontkit";
import { PDFFont, PDFDocument, rgb } from "pdf-lib";

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

function fitTextByWidth(text: string, maxWidth: number, font: PDFFont, size: number) {
  if (font.widthOfTextAtSize(text, size) <= maxWidth) return text;

  const ellipsis = "…";
  let trimmed = text;
  while (trimmed.length > 1 && font.widthOfTextAtSize(`${trimmed}${ellipsis}`, size) > maxWidth) {
    trimmed = trimmed.slice(0, -1);
  }

  return `${trimmed}${ellipsis}`;
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
  const pageWidth = 595.28;
  const pageHeight = 841.89;
  const marginX = 46;
  const contentWidth = pageWidth - marginX * 2;

  const colors = {
    ink: rgb(0.12, 0.18, 0.26),
    inkSoft: rgb(0.29, 0.37, 0.47),
    line: rgb(0.76, 0.81, 0.87),
    headBg: rgb(0.92, 0.95, 0.99),
    subBg: rgb(0.97, 0.98, 1),
    logo: rgb(0.13, 0.2, 0.31),
  };

  const drawRightAligned = (
    value: string,
    xRight: number,
    y: number,
    size: number,
    font: PDFFont,
    color = colors.ink,
  ) => {
    const width = font.widthOfTextAtSize(value, size);
    page.drawText(value, { x: xRight - width, y, size, font, color });
  };

  let cursorY = pageHeight - 46;

  const logoCenterX = marginX + 18;
  const logoCenterY = cursorY - 16;
  page.drawCircle({
    x: logoCenterX,
    y: logoCenterY,
    size: 14,
    color: colors.logo,
  });
  page.drawText("N", {
    x: logoCenterX - 4.5,
    y: logoCenterY - 5.5,
    size: 12,
    font: boldFont,
    color: rgb(1, 1, 1),
  });

  page.drawText("NAGAI OFFICE", {
    x: marginX + 42,
    y: cursorY - 9,
    size: 8,
    font: boldFont,
    color: colors.inkSoft,
  });
  page.drawText("永井行政書士事務所", {
    x: marginX + 42,
    y: cursorY - 24,
    size: 13,
    font: boldFont,
    color: colors.ink,
  });
  page.drawText("東京都港区南青山0-0-0 / TEL 03-1234-5678", {
    x: marginX + 42,
    y: cursorY - 36,
    size: 8.5,
    font: regularFont,
    color: colors.inkSoft,
  });

  const titleSize = 26;
  drawRightAligned("請求書", pageWidth - marginX, cursorY - 30, titleSize, boldFont);
  drawRightAligned(`No. ${invoiceNo}`, pageWidth - marginX, cursorY - 44, 9.5, regularFont, colors.inkSoft);

  page.drawLine({
    start: { x: marginX, y: cursorY - 50 },
    end: { x: pageWidth - marginX, y: cursorY - 50 },
    thickness: 1,
    color: colors.line,
  });

  cursorY -= 62;

  const dateRowHeight = 24;
  const colW = [
    contentWidth * 0.18,
    contentWidth * 0.32,
    contentWidth * 0.18,
    contentWidth * 0.32,
  ];
  const colX = [
    marginX,
    marginX + colW[0],
    marginX + colW[0] + colW[1],
    marginX + colW[0] + colW[1] + colW[2],
  ];
  const dateRowBottom = cursorY - dateRowHeight;

  page.drawRectangle({
    x: marginX,
    y: dateRowBottom,
    width: contentWidth,
    height: dateRowHeight,
    borderColor: colors.line,
    borderWidth: 1,
    color: rgb(1, 1, 1),
  });

  page.drawRectangle({
    x: colX[0],
    y: dateRowBottom,
    width: colW[0],
    height: dateRowHeight,
    color: colors.headBg,
  });
  page.drawRectangle({
    x: colX[2],
    y: dateRowBottom,
    width: colW[2],
    height: dateRowHeight,
    color: colors.headBg,
  });

  for (const x of [colX[1], colX[2], colX[3]]) {
    page.drawLine({
      start: { x, y: dateRowBottom },
      end: { x, y: cursorY },
      thickness: 1,
      color: colors.line,
    });
  }

  page.drawText("発行日", {
    x: colX[0] + 7,
    y: dateRowBottom + 7,
    size: 9,
    font: boldFont,
    color: colors.inkSoft,
  });
  page.drawText(fitTextByWidth(formatDate(issueDate), colW[1] - 12, regularFont, 9), {
    x: colX[1] + 6,
    y: dateRowBottom + 7,
    size: 9,
    font: regularFont,
    color: colors.ink,
  });
  page.drawText("支払期限", {
    x: colX[2] + 7,
    y: dateRowBottom + 7,
    size: 9,
    font: boldFont,
    color: colors.inkSoft,
  });
  page.drawText(fitTextByWidth(formatDate(dueDate), colW[3] - 12, regularFont, 9), {
    x: colX[3] + 6,
    y: dateRowBottom + 7,
    size: 9,
    font: regularFont,
    color: colors.ink,
  });

  cursorY = dateRowBottom - 8;

  const recipientHeadH = 16;
  const recipientBodyH = 24;
  const recipientBottom = cursorY - (recipientHeadH + recipientBodyH);

  page.drawRectangle({
    x: marginX,
    y: recipientBottom,
    width: contentWidth,
    height: recipientHeadH + recipientBodyH,
    borderColor: colors.line,
    borderWidth: 1,
    color: rgb(1, 1, 1),
  });
  page.drawRectangle({
    x: marginX,
    y: recipientBottom + recipientBodyH,
    width: contentWidth,
    height: recipientHeadH,
    color: colors.subBg,
  });
  page.drawLine({
    start: { x: marginX, y: recipientBottom + recipientBodyH },
    end: { x: marginX + contentWidth, y: recipientBottom + recipientBodyH },
    thickness: 1,
    color: colors.line,
  });

  page.drawText("請求先", {
    x: marginX + 7,
    y: recipientBottom + recipientBodyH + 4.5,
    size: 8.5,
    font: boldFont,
    color: colors.inkSoft,
  });
  page.drawText(fitTextByWidth(recipient, contentWidth - 14, regularFont, 10.5), {
    x: marginX + 7,
    y: recipientBottom + 8,
    size: 10.5,
    font: regularFont,
    color: colors.ink,
  });

  cursorY = recipientBottom - 8;

  const subjectRowH = 24;
  const subjectLabelW = 68;
  const subjectBottom = cursorY - subjectRowH;

  page.drawRectangle({
    x: marginX,
    y: subjectBottom,
    width: contentWidth,
    height: subjectRowH,
    borderColor: colors.line,
    borderWidth: 1,
    color: rgb(1, 1, 1),
  });
  page.drawRectangle({
    x: marginX,
    y: subjectBottom,
    width: subjectLabelW,
    height: subjectRowH,
    color: colors.subBg,
  });
  page.drawLine({
    start: { x: marginX + subjectLabelW, y: subjectBottom },
    end: { x: marginX + subjectLabelW, y: subjectBottom + subjectRowH },
    thickness: 1,
    color: colors.line,
  });
  page.drawText("件名", {
    x: marginX + 8,
    y: subjectBottom + 7.5,
    size: 9,
    font: boldFont,
    color: colors.inkSoft,
  });
  page.drawText(fitTextByWidth(subject, contentWidth - subjectLabelW - 14, regularFont, 9.5), {
    x: marginX + subjectLabelW + 7,
    y: subjectBottom + 7,
    size: 9.5,
    font: regularFont,
    color: colors.ink,
  });

  cursorY = subjectBottom - 10;

  const tableX = marginX;
  const tableWidth = contentWidth;
  const itemColW = tableWidth * 0.68;
  const amountColW = tableWidth - itemColW;
  const headH = 24;
  const rowH = 26;
  const rows = [
    { label: "業務報酬", value: formatYen(fee), emphasis: false },
    { label: "消費税（10%）", value: formatYen(tax), emphasis: false },
    { label: "ご請求金額", value: `${formatYen(total)}（税込）`, emphasis: true },
  ];
  const tableHeight = headH + rowH * rows.length;
  const tableBottom = cursorY - tableHeight;

  page.drawRectangle({
    x: tableX,
    y: tableBottom,
    width: tableWidth,
    height: tableHeight,
    borderColor: rgb(0.71, 0.77, 0.84),
    borderWidth: 1,
    color: rgb(1, 1, 1),
  });
  page.drawRectangle({
    x: tableX,
    y: tableBottom + rowH * rows.length,
    width: tableWidth,
    height: headH,
    color: colors.headBg,
  });

  page.drawLine({
    start: { x: tableX + itemColW, y: tableBottom },
    end: { x: tableX + itemColW, y: tableBottom + tableHeight },
    thickness: 1,
    color: colors.line,
  });
  page.drawLine({
    start: { x: tableX, y: tableBottom + rowH * rows.length },
    end: { x: tableX + tableWidth, y: tableBottom + rowH * rows.length },
    thickness: 1,
    color: colors.line,
  });

  page.drawText("項目", {
    x: tableX + 8,
    y: tableBottom + rowH * rows.length + 7,
    size: 9,
    font: boldFont,
    color: rgb(0.14, 0.23, 0.36),
  });
  drawRightAligned("金額", tableX + tableWidth - 8, tableBottom + rowH * rows.length + 7, 9, boldFont, rgb(0.14, 0.23, 0.36));

  rows.forEach((row, index) => {
    const rowBottom = tableBottom + rowH * (rows.length - index - 1);
    if (row.emphasis) {
      page.drawRectangle({
        x: tableX,
        y: rowBottom,
        width: tableWidth,
        height: rowH,
        color: rgb(0.97, 0.99, 1),
      });
    }

    if (index > 0) {
      page.drawLine({
        start: { x: tableX, y: rowBottom + rowH },
        end: { x: tableX + tableWidth, y: rowBottom + rowH },
        thickness: 1,
        color: colors.line,
      });
    }

    page.drawText(row.label, {
      x: tableX + 8,
      y: rowBottom + 8,
      size: row.emphasis ? 9.5 : 9,
      font: row.emphasis ? boldFont : regularFont,
      color: colors.ink,
    });
    drawRightAligned(
      fitTextByWidth(row.value, amountColW - 14, row.emphasis ? boldFont : regularFont, row.emphasis ? 9.5 : 9),
      tableX + tableWidth - 8,
      rowBottom + 8,
      row.emphasis ? 9.5 : 9,
      row.emphasis ? boldFont : regularFont,
      colors.ink,
    );
  });

  cursorY = tableBottom - 10;

  const paymentRows = [
    { label: "支払方法", value: "銀行振込（振込手数料はご負担をお願いします）" },
    { label: "振込先", value: "〇〇銀行 〇〇支店 普通 1234567 ナガイタロウ" },
    { label: "登録番号", value: qualifiedInvoiceNumber },
  ];
  const paymentRowH = 22;
  const paymentLabelW = 88;

  paymentRows.forEach((row) => {
    const rowBottom = cursorY - paymentRowH;
    page.drawRectangle({
      x: marginX,
      y: rowBottom,
      width: contentWidth,
      height: paymentRowH,
      borderColor: colors.line,
      borderWidth: 1,
      color: rgb(1, 1, 1),
    });
    page.drawRectangle({
      x: marginX,
      y: rowBottom,
      width: paymentLabelW,
      height: paymentRowH,
      color: colors.subBg,
    });
    page.drawLine({
      start: { x: marginX + paymentLabelW, y: rowBottom },
      end: { x: marginX + paymentLabelW, y: rowBottom + paymentRowH },
      thickness: 1,
      color: colors.line,
    });

    page.drawText(row.label, {
      x: marginX + 8,
      y: rowBottom + 7,
      size: 8.5,
      font: boldFont,
      color: colors.inkSoft,
    });
    page.drawText(
      fitTextByWidth(row.value, contentWidth - paymentLabelW - 14, regularFont, 8.5),
      {
        x: marginX + paymentLabelW + 7,
        y: rowBottom + 7,
        size: 8.5,
        font: regularFont,
        color: colors.inkSoft,
      },
    );

    cursorY = rowBottom - 1.5;
  });

  cursorY -= 8;

  page.drawText("本書はデモ用に自動生成された仮の請求書です。実際の契約・税務処理には使用できません。", {
    x: marginX,
    y: cursorY,
    size: 8,
    font: regularFont,
    color: rgb(0.37, 0.45, 0.56),
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
