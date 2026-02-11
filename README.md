# 永井行政書士事務所 サイトデモ

行政書士事務所サイトを想定した Next.js 実装デモです。  
コンセプトは「町の法律屋」。親しみやすさと信頼感を両立するUIを目指しています。

## 公開URL
- 本番: https://nagai-gyosei-shoshi-jimusho-demo.vercel.app
- GitHub: https://github.com/ko-nagai-0801/nagai-gyosei-shoshi-jimusho-demo

## 技術スタック
- Next.js 16 (App Router)
- TypeScript
- Tailwind CSS v4
- ESLint
- Vercel (デプロイ)

## ページ構成
- `/` ホーム
- `/works` 取扱業務・支援事例
- `/pricing` 料金表
  - 詳細条件 / オプション費用 / 支払条件 / キャンセルポリシー
  - 請求書サンプル（1ページ目プレビュー + 入力連動のPDF擬似生成）
  - 適格請求書番号 / 料金改定日
- `/about` 事務所案内
- `/contact` お問い合わせ

## 主な追加機能
- モバイル用ハンバーガーメニュー
  - `md` 未満でメニュー切替表示
- 請求書PDFの擬似生成 API
  - `GET /api/invoice-sample`
  - `pdf-lib` + `@pdf-lib/fontkit` + `@fontsource/noto-sans-jp` を使用
  - 日本語フォント埋め込みで、入力内容を反映したPDFを生成

## ローカル開発
```bash
npm install
npm run dev
```

`http://localhost:3000` で確認できます。

## 品質チェック
```bash
npm run lint
npm run build
```

## 環境変数
- `NEXT_PUBLIC_SITE_URL`
  - OGP / canonical 生成の基準URL
  - 未設定時は本番URL (`https://nagai-gyosei-shoshi-jimusho-demo.vercel.app`) を使用

## 実装メモ
- Hero は full-bleed 実装（親の `max-width` 制約を受けない）
- フォーム送信は UI デモ（外部送信は未接続）
- 仮PDFは `public/documents/invoice-sample.pdf` に配置（静的サンプル）
- `/pricing` の入力連動ダウンロードは `/api/invoice-sample` で動的生成

## 開発ルール
- コミットメッセージは日本語で記述する
- `main` ブランチはデプロイ対象のため、lint/build通過後に反映する
