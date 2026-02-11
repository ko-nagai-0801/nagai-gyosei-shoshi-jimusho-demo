export type NavLink = {
  href: string;
  label: string;
};

export type WorkItem = {
  title: string;
  summary: string;
  role: string;
  term: string;
  tags: string[];
};

export type TimelineItem = {
  year: string;
  title: string;
  detail: string;
};

export type QuickFact = {
  label: string;
  value: string;
  note: string;
};

export type FeeGuide = {
  item: string;
  fee: string;
  note: string;
};

export type PricingPlan = {
  service: string;
  baseFee: string;
  includes: string[];
  conditions: string[];
};

export type PricingOption = {
  option: string;
  fee: string;
  note: string;
};

export type PaymentTerm = {
  label: string;
  value: string;
  detail: string;
};

export type CancellationPolicy = {
  phase: string;
  fee: string;
  note: string;
};

export type InvoiceSampleLine = {
  label: string;
  value: string;
};

export type PaymentMethod = {
  method: string;
  detail: string;
};

export const navLinks: NavLink[] = [
  { href: "/", label: "ホーム" },
  { href: "/works", label: "取扱業務" },
  { href: "/pricing", label: "料金表" },
  { href: "/about", label: "事務所案内" },
  { href: "/contact", label: "お問い合わせ" },
];

export const strengths = [
  {
    title: "許認可申請の実務経験",
    body: "建設業許可、在留資格関連、法人設立手続きを中心に、要件確認から申請まで一貫して対応します。",
  },
  {
    title: "初回相談から完了報告まで伴走",
    body: "必要書類の整理、行政庁との調整、進捗共有までを一体で行い、手続きの不安を減らします。",
  },
  {
    title: "期限管理と丁寧な説明",
    body: "更新時期や提出期限を見据えたスケジュール管理を徹底し、専門用語はわかりやすくご案内します。",
  },
];

export const officeQuickFacts: QuickFact[] = [
  {
    label: "対応エリア",
    value: "東京都・神奈川県・埼玉県・千葉県",
    note: "オンライン相談は全国対応可能です。",
  },
  {
    label: "営業時間",
    value: "平日 9:00-18:00",
    note: "土日祝は事前予約で対応します。",
  },
  {
    label: "初回相談料",
    value: "30分無料",
    note: "以降 30分 5,500円（税込）を目安にご案内します。",
  },
];

export const feeGuides: FeeGuide[] = [
  {
    item: "建設業許可（新規）",
    fee: "132,000円（税込）〜",
    note: "別途、行政庁への申請手数料等の法定費用がかかります。",
  },
  {
    item: "在留資格更新申請",
    fee: "55,000円（税込）〜",
    note: "案件内容・必要資料の量に応じて個別にお見積もりします。",
  },
  {
    item: "法人設立後の届出支援",
    fee: "88,000円（税込）〜",
    note: "設立形態・必要手続きに応じて対応範囲を調整します。",
  },
];

export const pricingPlans: PricingPlan[] = [
  {
    service: "建設業許可（新規）",
    baseFee: "132,000円（税込）〜",
    includes: [
      "要件確認ヒアリング",
      "提出書類チェックリスト作成",
      "申請書・添付書類作成支援",
      "提出前最終確認",
    ],
    conditions: [
      "法人・個人、申請区分により費用が変動します。",
      "行政庁への手数料等の法定費用は別途必要です。",
    ],
  },
  {
    service: "在留資格更新申請",
    baseFee: "55,000円（税込）〜",
    includes: [
      "必要資料の確認",
      "申請理由書作成支援",
      "申請書作成",
      "提出前の不足資料確認",
    ],
    conditions: [
      "在留資格の種類・雇用形態により見積額が変動します。",
      "翻訳や追加証明資料の取得は別料金となる場合があります。",
    ],
  },
  {
    service: "法人設立後の届出支援",
    baseFee: "88,000円（税込）〜",
    includes: [
      "必要届出の整理",
      "届出書類作成支援",
      "提出スケジュール設計",
      "実行時の進捗フォロー",
    ],
    conditions: [
      "業種・許認可の要否により対応範囲が変わります。",
      "登記関連費用や公的手数料は含みません。",
    ],
  },
];

export const pricingOptions: PricingOption[] = [
  {
    option: "特急対応（7営業日以内の初回申請）",
    fee: "+22,000円（税込）〜",
    note: "受任状況と案件内容により対応可否を判断します。",
  },
  {
    option: "追加書類作成・再提出対応",
    fee: "+11,000円（税込）〜",
    note: "追加提出の回数、資料量に応じて個別見積もりします。",
  },
  {
    option: "訪問対応（都内23区外）",
    fee: "+5,500円（税込）〜",
    note: "移動時間・距離に応じて交通費実費をお願いする場合があります。",
  },
];

export const paymentTerms: PaymentTerm[] = [
  {
    label: "着手金",
    value: "見積総額の50%",
    detail:
      "ご契約後5営業日以内のお支払いをお願いしています。入金確認後に正式着手します。",
  },
  {
    label: "残金",
    value: "残額50%",
    detail:
      "申請書類の最終確認完了後、提出前日までにお支払いください。分割希望は事前にご相談ください。",
  },
];

export const cancellationPolicies: CancellationPolicy[] = [
  {
    phase: "着手前のキャンセル",
    fee: "無料",
    note: "ヒアリング実施前のキャンセルは費用をいただきません。",
  },
  {
    phase: "着手後・書類作成前",
    fee: "見積総額の30%",
    note: "要件確認、進行計画作成まで実施した場合に適用します。",
  },
  {
    phase: "書類作成開始後",
    fee: "見積総額の50%〜100%",
    note: "進捗率に応じて精算し、作成済み成果物をお渡しします。",
  },
];

export const pricingRevisedAt = "2026年2月11日";

export const qualifiedInvoiceNumber = "T1234567890123（表記サンプル）";

export const invoiceSampleLines: InvoiceSampleLine[] = [
  { label: "請求書番号", value: "INV-2026-0211-001" },
  { label: "発行日", value: "2026年2月11日" },
  { label: "件名", value: "建設業許可（新規）申請サポート業務" },
  { label: "業務報酬", value: "120,000円" },
  { label: "消費税（10%）", value: "12,000円" },
  { label: "ご請求金額", value: "132,000円（税込）" },
  { label: "支払期限", value: "2026年2月25日" },
  { label: "支払先", value: "〇〇銀行 〇〇支店 普通 1234567 ナガイタロウ" },
];

export const paymentMethods: PaymentMethod[] = [
  {
    method: "銀行振込",
    detail:
      "請求書記載の口座へお振込みください。振込手数料はご負担をお願いしています。",
  },
  {
    method: "クレジットカード決済",
    detail:
      "Visa / Mastercard / JCB / AMEX に対応。決済リンクをメールでご案内します。",
  },
  {
    method: "法人向け請求書払い",
    detail: "月末締め翌月末払いなど、社内規程に合わせた条件調整は事前相談可能です。",
  },
];

export const pricingDisclaimers: string[] = [
  "本料金は目安であり、案件の難易度・資料状況・申請区分により変動します。",
  "公的機関へ納付する法定費用・手数料・証明書取得費用は別途ご負担いただきます。",
  "受任後に追加作業が発生する場合は、事前に内容と費用をご説明し同意の上で対応します。",
  "許認可の取得可否は審査機関の判断によるため、結果を保証するものではありません。",
];

export const works: WorkItem[] = [
  {
    title: "建設業許可（新規）申請サポート",
    summary:
      "個人事業から法人化した事業者様向けに、要件確認・必要書類収集・申請書作成までを支援した事例です。",
    role: "事前相談 / 書類作成 / 申請手続き",
    term: "2025.10",
    tags: ["建設業許可", "新規申請", "法人対応"],
  },
  {
    title: "在留資格更新申請の企業支援",
    summary:
      "雇用先企業と連携し、契約関連書類と説明資料を整理。期限前に余裕を持って更新申請を完了した事例です。",
    role: "企業ヒアリング / 申請書作成 / 入管対応",
    term: "2025.07",
    tags: ["在留資格", "更新申請", "企業支援"],
  },
  {
    title: "合同会社設立後の各種届出支援",
    summary:
      "定款作成後に必要な行政手続きと許認可準備を整理し、開業スケジュールに合わせて届出を実施した事例です。",
    role: "手続き設計 / 各種届出 / 開業支援",
    term: "2025.04",
    tags: ["法人設立", "届出", "開業サポート"],
  },
];

export const timeline: TimelineItem[] = [
  {
    year: "2020",
    title: "永井行政書士事務所を開業",
    detail: "事業者向けの許認可申請支援を中心に、東京都内で相談対応を開始。",
  },
  {
    year: "2022",
    title: "建設業許可・法人関連手続きを強化",
    detail: "新規許可申請から更新、変更届までの支援体制を拡充し、対応業務を拡大。",
  },
  {
    year: "2024",
    title: "在留資格関連の企業支援を拡大",
    detail: "企業の採用計画に合わせて、在留資格手続きの相談・申請支援を本格化。",
  },
];

export const contactMethods = [
  {
    title: "メール相談",
    detail: "2営業日以内を目安にご返信します。",
    value: "info@nagai-office.jp",
    href: "mailto:info@nagai-office.jp",
  },
  {
    title: "電話相談",
    detail: "平日 9:00-18:00 に対応しています。",
    value: "03-1234-5678",
    href: "tel:0312345678",
  },
  {
    title: "オンライン相談",
    detail: "Zoomで30分の初回相談を承ります。",
    value: "日程調整を依頼する",
    href: "mailto:info@nagai-office.jp?subject=%E3%82%AA%E3%83%B3%E3%83%A9%E3%82%A4%E3%83%B3%E7%9B%B8%E8%AB%87%E4%BE%9D%E9%A0%BC",
  },
];
