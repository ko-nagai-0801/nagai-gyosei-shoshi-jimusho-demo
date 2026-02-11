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
  { href: "/", label: "Home" },
  { href: "/works", label: "Works" },
  { href: "/about", label: "About" },
  { href: "/contact", label: "Contact" },
];

export const strengths = [
  {
    title: "信頼構築を前提にした情報設計",
    body: "法律系サービスに必要な安心感を損なわないよう、情報の優先順位と導線を先に設計します。",
  },
  {
    title: "実装とデザインの往復改善",
    body: "Figma上の見た目再現だけでなく、実装後の可読性・操作性を検証して改善サイクルを回します。",
  },
  {
    title: "公開運用を見据えた品質管理",
    body: "型安全・ESLint・ビルド確認を通して、実運用に近い品質でアウトプットをまとめます。",
  },
];

export const works: WorkItem[] = [
  {
    title: "建設業許可案内サイトの再設計",
    summary:
      "初回相談から申請完了までの流れを再構成。FAQと必要書類一覧を連動させ、問い合わせ率を改善した想定案件。",
    role: "UI設計 / フロントエンド実装",
    term: "2025.10 - 2025.12",
    tags: ["Next.js", "TypeScript", "情報設計"],
  },
  {
    title: "外国人雇用手続きLPの高速化",
    summary:
      "表示速度の改善を目的に、コンポーネント分割と画像最適化を実施。重要導線のクリック率向上を想定したデモ案件。",
    role: "要件整理 / UI改善 / 計測設計",
    term: "2025.07 - 2025.09",
    tags: ["Core Web Vitals", "SEO", "アクセシビリティ"],
  },
  {
    title: "法人設立支援サービスの採用向けサイト",
    summary:
      "採用担当向けに、制作プロセスと成果を可視化。ケーススタディ形式で技術選定の意図を伝える構成に整理した案件。",
    role: "コンテンツ設計 / フロント実装",
    term: "2025.04 - 2025.06",
    tags: ["ポートフォリオ", "レスポンシブ", "運用設計"],
  },
];

export const timeline: TimelineItem[] = [
  {
    year: "2021",
    title: "行政書士業務を軸にWeb発信を開始",
    detail: "実務で繰り返し受ける相談内容を整理し、利用者が迷いにくい情報構成の研究を開始。",
  },
  {
    year: "2023",
    title: "デジタル接点改善プロジェクトに参画",
    detail: "問い合わせ導線の改善に注力し、法律系サービス特有の不安解消表現をUIに反映。",
  },
  {
    year: "2025",
    title: "Next.jsベースで制作基盤を統一",
    detail: "再利用可能なコンポーネント設計と型安全な実装フローを確立し、制作効率を向上。",
  },
];

export const contactMethods = [
  {
    title: "メール相談",
    detail: "1営業日以内に初回返信します。",
    value: "contact@nagai-office-demo.jp",
    href: "mailto:contact@nagai-office-demo.jp",
  },
  {
    title: "電話相談",
    detail: "平日 9:00-18:00 対応（デモ）。",
    value: "03-1234-5678",
    href: "tel:0312345678",
  },
  {
    title: "オンライン面談",
    detail: "30分の初回ヒアリング枠を想定。",
    value: "日程調整を依頼する",
    href: "mailto:contact@nagai-office-demo.jp?subject=%E9%9D%A2%E8%AB%87%E4%BE%9D%E9%A0%BC",
  },
];
