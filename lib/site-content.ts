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

export const navLinks: NavLink[] = [
  { href: "/", label: "ホーム" },
  { href: "/works", label: "取扱業務" },
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
